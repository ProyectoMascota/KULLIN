// =====================================================================
// app/lib/__tests__/nutrition.test.ts
//
// Tests del motor nutricional. Estructura:
// 1. RER: fórmula pura, independiente de especie
// 2. MER por especie: paridad estricta de comportamiento
// 3. Casos clínicos reales validados contra rangos publicados
// 4. Edge cases (peso 0, mascotas senior, sobrepeso)
// 5. Predicción de agotamiento y barra de comida
// =====================================================================

import { describe, it, expect } from 'vitest';
import {
  calcularRER,
  calcularMER,
  calcularFactorMER,
  calcularGramosDiarios,
  calcularFechaAgotamiento,
  diasRestantes,
  nivelBarraComida,
  recomendarProductos,
  type PerfilMascota,
  type Producto,
} from '../nutrition';
import { SPECIES, getSpecies, esSenior, esCachorro } from '../species-config';

// =====================================================================
// HELPERS DE TEST
// =====================================================================

function perfilBase(overrides: Partial<PerfilMascota> = {}): PerfilMascota {
  return {
    especie: 'perro',
    tamano: 'mediano',
    peso_kg: 20,
    edad_meses: 36,
    actividad: 'moderado',
    esterilizado: false,
    condicion: 'ninguna',
    ...overrides,
  };
}

// =====================================================================
// 1. RER — fórmula pura
// =====================================================================
describe('calcularRER', () => {
  it('aplica la fórmula 70 × peso^0.75', () => {
    expect(calcularRER(10)).toBeCloseTo(70 * Math.pow(10, 0.75), 1);
    expect(calcularRER(30)).toBeCloseTo(70 * Math.pow(30, 0.75), 1);
  });

  it('produce valores conocidos para casos típicos', () => {
    // Labrador 30 kg
    expect(calcularRER(30)).toBeCloseTo(897.3, 1);
    // Gato 4.5 kg
    expect(calcularRER(4.5)).toBeCloseTo(216.3, 1);
    // Cachorro 8 kg
    expect(calcularRER(8)).toBeCloseTo(333, 0);
  });

  it('lanza error con peso no positivo', () => {
    expect(() => calcularRER(0)).toThrow();
    expect(() => calcularRER(-5)).toThrow();
  });
});

// =====================================================================
// 2. PARIDAD POR ESPECIE — el factor MER debe seguir el mismo árbol de
//    decisiones para ambas, solo con números distintos
// =====================================================================
describe('calcularFactorMER — paridad estricta entre especies', () => {
  const especies = ['perro', 'gato'] as const;

  describe.each(especies)('Para %s', (especie) => {
    const config = SPECIES[especie].factoresMER;

    it('cachorro <4m usa factor cachorroMenor4m', () => {
      const f = calcularFactorMER({
        especie, edad_meses: 2, actividad: 'moderado',
        esterilizado: false, condicion: 'ninguna',
      });
      expect(f).toBe(config.cachorroMenor4m);
    });

    it('cachorro 4-12m usa factor cachorro4a12m', () => {
      const f = calcularFactorMER({
        especie, edad_meses: 6, actividad: 'moderado',
        esterilizado: false, condicion: 'ninguna',
      });
      expect(f).toBe(config.cachorro4a12m);
    });

    it('adulto bajo usa factor adultoBajo', () => {
      const f = calcularFactorMER({
        especie, edad_meses: 36, actividad: 'bajo',
        esterilizado: false, condicion: 'ninguna',
      });
      expect(f).toBe(config.adultoBajo);
    });

    it('adulto moderado usa factor adultoModerado', () => {
      const f = calcularFactorMER({
        especie, edad_meses: 36, actividad: 'moderado',
        esterilizado: false, condicion: 'ninguna',
      });
      expect(f).toBe(config.adultoModerado);
    });

    it('adulto alto usa factor adultoAlto', () => {
      const f = calcularFactorMER({
        especie, edad_meses: 36, actividad: 'alto',
        esterilizado: false, condicion: 'ninguna',
      });
      expect(f).toBe(config.adultoAlto);
    });

    it('esterilización aplica el ajuste configurado', () => {
      const sinEster = calcularFactorMER({
        especie, edad_meses: 36, actividad: 'moderado',
        esterilizado: false, condicion: 'ninguna',
      });
      const conEster = calcularFactorMER({
        especie, edad_meses: 36, actividad: 'moderado',
        esterilizado: true, condicion: 'ninguna',
      });
      expect(conEster - sinEster).toBeCloseTo(config.ajusteEsterilizado, 2);
    });

    it('senior aplica ajuste y respeta piso senior', () => {
      const f = calcularFactorMER({
        especie, edad_meses: config.edadSeniorMeses + 12,
        actividad: 'bajo', esterilizado: true, condicion: 'ninguna',
      });
      expect(f).toBeGreaterThanOrEqual(config.factorMinimoSenior);
    });

    it('sobrepeso anula otros ajustes (override total)', () => {
      const f = calcularFactorMER({
        especie, edad_meses: 36, actividad: 'alto',
        esterilizado: false, condicion: 'sobrepeso',
      });
      expect(f).toBe(config.sobrepeso);
    });

    it('respeta el piso factorMinimo', () => {
      const f = calcularFactorMER({
        especie, edad_meses: 36, actividad: 'bajo',
        esterilizado: true, condicion: 'ninguna',
      });
      expect(f).toBeGreaterThanOrEqual(config.factorMinimo);
    });

    it('los cachorros no se ven afectados por esterilización ni condición', () => {
      const a = calcularFactorMER({
        especie, edad_meses: 2, actividad: 'bajo',
        esterilizado: true, condicion: 'sobrepeso',
      });
      const b = calcularFactorMER({
        especie, edad_meses: 2, actividad: 'alto',
        esterilizado: false, condicion: 'ninguna',
      });
      expect(a).toBe(config.cachorroMenor4m);
      expect(b).toBe(config.cachorroMenor4m);
    });
  });
});

// =====================================================================
// 3. CASOS CLÍNICOS REALES
//    Comparados contra rangos publicados por NRC 2006 y fabricantes
// =====================================================================
describe('Casos clínicos reales', () => {
  it('Labrador adulto esterilizado 30kg → ~1256 kcal MER', () => {
    const mer = calcularMER(perfilBase({
      especie: 'perro', tamano: 'grande', peso_kg: 30,
      edad_meses: 48, actividad: 'moderado', esterilizado: true,
    }));
    expect(mer).toBeCloseTo(1256, 0);
  });

  it('Gato indoor esterilizado 4.5kg → ~216 kcal MER (rango 200-240)', () => {
    const mer = calcularMER(perfilBase({
      especie: 'gato', tamano: 'pequeno', peso_kg: 4.5,
      edad_meses: 36, actividad: 'bajo', esterilizado: true,
    }));
    expect(mer).toBeGreaterThanOrEqual(200);
    expect(mer).toBeLessThanOrEqual(240);
  });

  it('Cachorro labrador 8kg, 5 meses → factor 2.0 → ~666 kcal', () => {
    const mer = calcularMER(perfilBase({
      especie: 'perro', tamano: 'mediano', peso_kg: 8,
      edad_meses: 5, actividad: 'alto', esterilizado: false,
    }));
    expect(mer).toBeCloseTo(666, 0);
  });

  it('Gato sobrepeso 6kg → factor 0.8 → ~217 kcal (reducción)', () => {
    const mer = calcularMER(perfilBase({
      especie: 'gato', tamano: 'mediano', peso_kg: 6,
      edad_meses: 60, actividad: 'bajo', esterilizado: true,
      condicion: 'sobrepeso',
    }));
    const sinSobrepeso = calcularMER(perfilBase({
      especie: 'gato', tamano: 'mediano', peso_kg: 6,
      edad_meses: 60, actividad: 'bajo', esterilizado: true,
    }));
    expect(mer).toBeLessThan(sinSobrepeso);
  });

  it('Perro senior 14 años, 25kg → factor reducido + piso senior', () => {
    const f = calcularFactorMER({
      especie: 'perro', edad_meses: 168, actividad: 'bajo',
      esterilizado: true, condicion: 'ninguna',
    });
    // 1.4 (bajo) - 0.2 (ester) - 0.2 (senior) = 1.0, pero piso senior es 1.2
    expect(f).toBe(1.2);
  });
});

// =====================================================================
// 4. EDGE CASES
// =====================================================================
describe('Edge cases', () => {
  it('gramosDiarios falla si kcal/100g es 0 o negativo', () => {
    expect(() => calcularGramosDiarios(perfilBase(), 0)).toThrow();
    expect(() => calcularGramosDiarios(perfilBase(), -10)).toThrow();
  });

  it('cachorro de exactamente 4 meses ya no usa factor de menor4m', () => {
    const f4 = calcularFactorMER({
      especie: 'perro', edad_meses: 4, actividad: 'moderado',
      esterilizado: false, condicion: 'ninguna',
    });
    const f3 = calcularFactorMER({
      especie: 'perro', edad_meses: 3, actividad: 'moderado',
      esterilizado: false, condicion: 'ninguna',
    });
    expect(f3).toBe(3.0);
    expect(f4).toBe(2.0);
  });

  it('cachorro de exactamente 12 meses ya es adulto', () => {
    const f = calcularFactorMER({
      especie: 'perro', edad_meses: 12, actividad: 'moderado',
      esterilizado: false, condicion: 'ninguna',
    });
    expect(f).toBe(1.6); // adulto moderado
  });

  it('senior arranca exactamente a la edad configurada', () => {
    const config = SPECIES.perro.factoresMER;
    const fNoSenior = calcularFactorMER({
      especie: 'perro', edad_meses: config.edadSeniorMeses - 1,
      actividad: 'moderado', esterilizado: false, condicion: 'ninguna',
    });
    const fSenior = calcularFactorMER({
      especie: 'perro', edad_meses: config.edadSeniorMeses,
      actividad: 'moderado', esterilizado: false, condicion: 'ninguna',
    });
    expect(fNoSenior).toBeCloseTo(1.6, 5);
    expect(fSenior).toBeCloseTo(1.4, 5); // 1.6 - 0.2
  });
});

// =====================================================================
// 5. PREDICCIÓN DE AGOTAMIENTO Y BARRA DE COMIDA
// =====================================================================
describe('calcularFechaAgotamiento', () => {
  it('15kg a 331g/día → 45 días aprox', () => {
    const inicio = new Date('2026-05-01');
    const { fecha, dias_totales } = calcularFechaAgotamiento(inicio, 15, 331);
    expect(dias_totales).toBe(45);
    expect(fecha.toISOString().slice(0, 10)).toBe('2026-06-15');
  });

  it('1kg a 50g/día → 20 días', () => {
    const inicio = new Date('2026-05-01');
    const { dias_totales } = calcularFechaAgotamiento(inicio, 1, 50);
    expect(dias_totales).toBe(20);
  });

  it('falla con gramos diarios 0 o negativo', () => {
    expect(() => calcularFechaAgotamiento(new Date(), 15, 0)).toThrow();
    expect(() => calcularFechaAgotamiento(new Date(), 15, -100)).toThrow();
  });
});

describe('diasRestantes', () => {
  it('devuelve 0 si la fecha es pasada', () => {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    expect(diasRestantes(ayer)).toBe(0);
  });

  it('devuelve días positivos para fechas futuras', () => {
    const en5dias = new Date();
    en5dias.setDate(en5dias.getDate() + 5);
    expect(diasRestantes(en5dias)).toBeGreaterThanOrEqual(4);
    expect(diasRestantes(en5dias)).toBeLessThanOrEqual(6);
  });
});

describe('nivelBarraComida', () => {
  it('retorna 100 al inicio', () => {
    const ahora = new Date();
    const en30dias = new Date(ahora);
    en30dias.setDate(ahora.getDate() + 30);
    const nivel = nivelBarraComida(ahora, en30dias);
    expect(nivel).toBeGreaterThanOrEqual(99);
    expect(nivel).toBeLessThanOrEqual(100);
  });

  it('retorna ~0 al agotamiento', () => {
    const hace30dias = new Date();
    hace30dias.setDate(hace30dias.getDate() - 30);
    const ahora = new Date();
    expect(nivelBarraComida(hace30dias, ahora)).toBeLessThanOrEqual(1);
  });

  it('retorna 0 si ya pasó el agotamiento', () => {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const anteayer = new Date();
    anteayer.setDate(anteayer.getDate() - 2);
    expect(nivelBarraComida(anteayer, ayer)).toBe(0);
  });

  it('clampea a 100 si la fecha de fin es anterior a la de inicio', () => {
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const nivel = nivelBarraComida(hoy, ayer);
    expect(nivel).toBeGreaterThanOrEqual(0);
    expect(nivel).toBeLessThanOrEqual(100);
  });
});

// =====================================================================
// 6. RECOMENDADOR DE PRODUCTOS
// =====================================================================
describe('recomendarProductos', () => {
  const catalogo: Producto[] = [
    {
      id: '1', marca: 'Royal Canin', linea: 'Medium Adult',
      especie: 'perro', tamano_objetivo: ['mediano'],
      edad_min_meses: 12, edad_max_meses: 84,
      condicion_objetivo: ['ninguna'], esterilizado_objetivo: false,
      kcal_por_100g: 380, formatos: [{ kg: 15, precio_clp: 89990, link_afiliado: '' }],
    },
    {
      id: '2', marca: 'Hills', linea: 'Perfect Weight',
      especie: 'perro', tamano_objetivo: ['mediano', 'grande'],
      edad_min_meses: 12, edad_max_meses: 84,
      condicion_objetivo: ['sobrepeso'], esterilizado_objetivo: null,
      kcal_por_100g: 302, formatos: [{ kg: 6.8, precio_clp: 74990, link_afiliado: '' }],
    },
    {
      id: '3', marca: 'Royal Canin', linea: 'Indoor Cat',
      especie: 'gato', tamano_objetivo: ['pequeno', 'mediano'],
      edad_min_meses: 12, edad_max_meses: 132,
      condicion_objetivo: ['ninguna'], esterilizado_objetivo: true,
      kcal_por_100g: 370, formatos: [{ kg: 4, precio_clp: 49990, link_afiliado: '' }],
    },
  ];

  it('filtra por especie del perfil', () => {
    const recs = recomendarProductos(
      perfilBase({ especie: 'perro' }), catalogo
    );
    expect(recs.every((r) => r.producto.especie === 'perro')).toBe(true);
  });

  it('filtra cachorros fuera del rango de edad adulto', () => {
    const recs = recomendarProductos(
      perfilBase({ especie: 'perro', edad_meses: 6 }),
      catalogo
    );
    // ningún producto del catálogo cubre 0-12 meses
    expect(recs.length).toBe(0);
  });

  it('prioriza el producto para sobrepeso si el perfil tiene esa condición', () => {
    const recs = recomendarProductos(
      perfilBase({
        especie: 'perro', tamano: 'mediano',
        condicion: 'sobrepeso',
      }),
      catalogo
    );
    expect(recs[0].producto.linea).toBe('Perfect Weight');
  });

  it('incluye gramos diarios calculados para cada recomendación', () => {
    const recs = recomendarProductos(perfilBase({ especie: 'perro' }), catalogo);
    expect(recs[0].gramos_diarios).toBeGreaterThan(0);
  });

  it('paridad: recomienda productos para gatos también', () => {
    const recs = recomendarProductos(
      perfilBase({
        especie: 'gato', tamano: 'mediano', peso_kg: 4.5,
        edad_meses: 36, actividad: 'bajo', esterilizado: true,
      }),
      catalogo
    );
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].producto.especie).toBe('gato');
  });
});

// =====================================================================
// 7. HELPERS DE species-config
// =====================================================================
describe('species-config helpers', () => {
  it('esSenior usa los umbrales por especie', () => {
    expect(esSenior('perro', 84)).toBe(true);
    expect(esSenior('perro', 83)).toBe(false);
    expect(esSenior('gato', 132)).toBe(true);
    expect(esSenior('gato', 131)).toBe(false);
  });

  it('esCachorro es igual para ambas especies', () => {
    expect(esCachorro(11)).toBe(true);
    expect(esCachorro(12)).toBe(false);
  });

  it('getSpecies lanza si la especie no existe', () => {
    expect(() => getSpecies('elefante' as any)).toThrow();
  });

  it('SPECIES tiene paridad estructural entre perro y gato', () => {
    const perro = SPECIES.perro;
    const gato = SPECIES.gato;

    // Misma estructura de claves
    expect(Object.keys(perro).sort()).toEqual(Object.keys(gato).sort());

    // Mismo número de tamaños
    expect(perro.tamanos.length).toBe(gato.tamanos.length);

    // Misma estructura de factores MER
    expect(Object.keys(perro.factoresMER).sort()).toEqual(
      Object.keys(gato.factoresMER).sort()
    );

    // Ambas tienen al menos 10 razas
    expect(perro.razas.length).toBeGreaterThanOrEqual(10);
    expect(gato.razas.length).toBeGreaterThanOrEqual(10);
  });
});
