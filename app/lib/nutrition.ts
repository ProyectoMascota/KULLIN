// =====================================================
// kullin/lib/nutrition.ts
// Motor de cálculo nutricional basado en NRC 2006 + WSAVA 2011
// =====================================================

export type Especie = 'perro' | 'gato';
export type Tamano = 'pequeno' | 'mediano' | 'grande';
export type Actividad = 'bajo' | 'moderado' | 'alto';
export type Condicion =
  | 'ninguna'
  | 'sobrepeso'
  | 'sensible_digestivo'
  | 'pelo_largo'
  | 'articulaciones';

export interface PerfilMascota {
  especie: Especie;
  tamano: Tamano;
  peso_kg: number;
  edad_meses: number;
  actividad: Actividad;
  esterilizado: boolean;
  condicion: Condicion;
}

export interface Producto {
  id: string;
  marca: string;
  linea: string;
  especie: Especie;
  tamano_objetivo: Tamano[];
  edad_min_meses: number;
  edad_max_meses: number;
  condicion_objetivo: Condicion[];
  esterilizado_objetivo: boolean | null;
  kcal_por_100g: number;
  formatos: { kg: number; precio_clp: number; link_afiliado: string }[];
}

// =====================================================
// 1. CÁLCULO DE RER (Resting Energy Requirement)
// Fórmula NRC 2006: RER = 70 × (peso_kg)^0.75
// =====================================================
export function calcularRER(peso_kg: number): number {
  if (peso_kg <= 0) throw new Error('peso_kg debe ser positivo');
  return 70 * Math.pow(peso_kg, 0.75);
}

// =====================================================
// 2. FACTOR MER (Maintenance Energy Requirement)
// MER = RER × factor
//
// Tabla de factores: NRC 2006 + WSAVA 2011 + AAHA 2010
// Para perros y gatos por separado.
// =====================================================

import { getSpecies } from './species-config';

interface ContextoFactor {
  especie: Especie;
  edad_meses: number;
  actividad: Actividad;
  esterilizado: boolean;
  condicion: Condicion;
}

/**
 * Calcula el factor MER para cualquier especie.
 *
 * Esta función es ESPECIE-AGNÓSTICA: toda la lógica diferenciadora
 * vive en species-config.ts. Agregar una especie nueva no requiere
 * tocar esta función.
 */
export function calcularFactorMER(ctx: ContextoFactor): number {
  const { especie, edad_meses, actividad, esterilizado, condicion } = ctx;
  const f = getSpecies(especie).factoresMER;

  // Cachorro/gatito: factor fijo por etapa, sin más ajustes
  if (edad_meses < 4) return f.cachorroMenor4m;
  if (edad_meses < 12) return f.cachorro4a12m;

  // Adulto: base por nivel de actividad
  let factor: number;
  if (actividad === 'bajo') factor = f.adultoBajo;
  else if (actividad === 'moderado') factor = f.adultoModerado;
  else factor = f.adultoAlto;

  // Ajuste por esterilización
  if (esterilizado) factor += f.ajusteEsterilizado;

  // Ajuste por etapa senior
  if (edad_meses >= f.edadSeniorMeses) {
    factor = Math.max(f.factorMinimoSenior, factor + f.ajusteSenior);
  }

  // Sobrepeso: anula los demás ajustes (override total)
  if (condicion === 'sobrepeso') factor = f.sobrepeso;

  return Math.max(f.factorMinimo, factor);
}

// =====================================================
// 3. MER en kcal/día
// =====================================================
export function calcularMER(perfil: PerfilMascota): number {
  const rer = calcularRER(perfil.peso_kg);
  const factor = calcularFactorMER(perfil);
  return rer * factor;
}

// =====================================================
// 4. GRAMOS DIARIOS según producto seleccionado
// gramos = (MER_kcal / kcal_por_100g) × 100
// =====================================================
export function calcularGramosDiarios(
  perfil: PerfilMascota,
  kcal_por_100g: number
): number {
  if (kcal_por_100g <= 0) throw new Error('kcal_por_100g debe ser positivo');
  const mer = calcularMER(perfil);
  return (mer / kcal_por_100g) * 100;
}

// =====================================================
// 5. RECOMENDACIÓN DE PRODUCTO
// Filtra productos compatibles con el perfil y los rankea.
// =====================================================
interface ProductoRecomendado {
  producto: Producto;
  score: number;
  gramos_diarios: number;
  razones: string[];
}

export function recomendarProductos(
  perfil: PerfilMascota,
  catalogo: Producto[],
  topN: number = 3
): ProductoRecomendado[] {
  const candidatos = catalogo
    .filter((p) => p.especie === perfil.especie)
    .filter(
      (p) =>
        perfil.edad_meses >= p.edad_min_meses &&
        perfil.edad_meses <= p.edad_max_meses
    );

  const scored = candidatos.map((p) => {
    let score = 0;
    const razones: string[] = [];

    // +3 por tamaño compatible
    if (p.tamano_objetivo.includes(perfil.tamano)) {
      score += 3;
      razones.push(`Formulado para tamaño ${perfil.tamano}`);
    }

    // +4 por condición de salud específica
    if (p.condicion_objetivo.includes(perfil.condicion) && perfil.condicion !== 'ninguna') {
      score += 4;
      razones.push(`Tratamiento para ${perfil.condicion.replace('_', ' ')}`);
    }

    // +2 por estado reproductivo
    if (p.esterilizado_objetivo === perfil.esterilizado) {
      score += 2;
      razones.push(
        perfil.esterilizado
          ? 'Adaptado a mascotas esterilizadas'
          : 'Adecuado para mascotas no esterilizadas'
      );
    } else if (p.esterilizado_objetivo === null) {
      score += 1; // neutral
    }

    // +1 por etapa de vida ajustada (cachorro/adulto/senior)
    const esCachorro = perfil.edad_meses < 12;
    const esSenior =
      (perfil.especie === 'perro' && perfil.edad_meses >= 84) ||
      (perfil.especie === 'gato' && perfil.edad_meses >= 132);
    if (esCachorro && p.edad_max_meses <= 12) {
      score += 2;
      razones.push('Específico para cachorros');
    } else if (esSenior && p.edad_min_meses >= 84) {
      score += 2;
      razones.push('Específico para etapa senior');
    }

    return {
      producto: p,
      score,
      gramos_diarios: calcularGramosDiarios(perfil, p.kcal_por_100g),
      razones,
    };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

// =====================================================
// 6. FECHA ESTIMADA DE AGOTAMIENTO
// dias = (kg_comprados × 1000) / gramos_diarios
// =====================================================
export function calcularFechaAgotamiento(
  fecha_compra: Date,
  cantidad_kg: number,
  gramos_diarios: number
): { fecha: Date; dias_totales: number } {
  if (gramos_diarios <= 0) throw new Error('gramos_diarios debe ser positivo');
  const dias = (cantidad_kg * 1000) / gramos_diarios;
  const fecha = new Date(fecha_compra);
  fecha.setDate(fecha.getDate() + Math.floor(dias));
  return { fecha, dias_totales: Math.floor(dias) };
}

// =====================================================
// 7. DÍAS RESTANTES (para la barra visual)
// =====================================================
export function diasRestantes(fecha_agotamiento: Date): number {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fin = new Date(fecha_agotamiento);
  fin.setHours(0, 0, 0, 0);
  const ms = fin.getTime() - hoy.getTime();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

// =====================================================
// 8. DEBE ENVIARSE ALERTA DE REPOSICIÓN
// =====================================================
export function debeEnviarAlerta(
  fecha_agotamiento: Date,
  notif_dias_antes: number,
  ya_enviado: boolean
): boolean {
  if (ya_enviado) return false;
  return diasRestantes(fecha_agotamiento) <= notif_dias_antes;
}

// =====================================================
// 9. NIVEL DE BARRA VISUAL (0-100)
// 100 = recién comprado, 0 = agotado
// =====================================================
export function nivelBarraComida(
  fecha_compra: Date,
  fecha_agotamiento: Date
): number {
  const total = fecha_agotamiento.getTime() - fecha_compra.getTime();
  const transcurrido = Date.now() - fecha_compra.getTime();
  if (total <= 0) return 0;
  const pct = 100 - (transcurrido / total) * 100;
  return Math.max(0, Math.min(100, pct));
}
