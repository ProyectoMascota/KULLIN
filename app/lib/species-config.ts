// =====================================================================
// app/lib/species-config.ts
//
// FUENTE ÚNICA DE VERDAD para todo lo relacionado a especies.
//
// Cualquier característica diferenciadora entre perro y gato (o futuras
// especies) debe declararse aquí, no en componentes individuales.
//
// Reglas:
// 1. Los componentes NUNCA hardcodean lógica por especie.
//    Consumen este módulo via SPECIES[especie].
// 2. Los textos visibles tampoco se hardcodean: usan los labels de aquí.
// 3. Agregar una especie nueva solo requiere agregar una entrada aquí
//    y agregarla al enum SQL.
// =====================================================================

export type Especie = 'perro' | 'gato';

export interface RangoTamano {
  v: 'pequeno' | 'mediano' | 'grande';
  label: string;
  descripcion: string;
}

export interface FactorMER {
  cachorroMenor4m: number;
  cachorro4a12m: number;
  adultoBajo: number;
  adultoModerado: number;
  adultoAlto: number;
  ajusteEsterilizado: number;
  ajusteSenior: number;
  edadSeniorMeses: number;
  sobrepeso: number;
  factorMinimo: number;
  /** Piso del factor cuando ya se aplicó el ajuste senior */
  factorMinimoSenior: number;
}

export interface DiasTransicionAlimento {
  normal: number;
  sensible: number;
}

export interface SpeciesConfig {
  /** Identificador interno */
  key: Especie;
  /** Nombre singular para UI ("perro" / "gato") */
  singular: string;
  /** Nombre plural ("perros" / "gatos") */
  plural: string;
  /** Forma con artículo ("tu perro" / "tu gato") */
  conArticulo: string;
  /** Emoji representativo */
  emoji: string;
  /** Tonalidad para CTAs específicos */
  tagline: string;
  /** Tamaños y sus descripciones (mostrar rangos correctos en UI) */
  tamanos: RangoTamano[];
  /** Razas más comunes en Chile (fallback si DB no carga) */
  razas: string[];
  /** Factores MER específicos de la especie (NRC 2006 + WSAVA 2011) */
  factoresMER: FactorMER;
  /** Días de transición recomendados al cambiar de alimento */
  diasTransicion: DiasTransicionAlimento;
  /** Frecuencia recomendada de pesaje (en meses) */
  frecuenciaPesajeMeses: number;
  /** Tip personalizado para email de recordatorio */
  tipCambioAlimento: string;
}

// =====================================================================
// CONFIGURACIÓN POR ESPECIE
// =====================================================================
export const SPECIES: Record<Especie, SpeciesConfig> = {
  perro: {
    key: 'perro',
    singular: 'perro',
    plural: 'perros',
    conArticulo: 'tu perro',
    emoji: '🐕',
    tagline: 'Tu compañero canino',
    tamanos: [
      { v: 'pequeno', label: 'Pequeño', descripcion: 'Hasta 10 kg' },
      { v: 'mediano', label: 'Mediano', descripcion: '10-25 kg' },
      { v: 'grande', label: 'Grande', descripcion: 'Más de 25 kg' },
    ],
    razas: [
      'Mestizo pequeño', 'Mestizo mediano', 'Mestizo grande',
      'Golden Retriever', 'Labrador', 'Pastor Alemán', 'Bulldog Francés',
      'Beagle', 'Border Collie', 'Chihuahua', 'Cocker Spaniel', 'Dálmata',
      'Husky Siberiano', 'Pug', 'Poodle', 'Rottweiler', 'Schnauzer',
      'Shih Tzu', 'Yorkshire Terrier',
    ],
    factoresMER: {
      cachorroMenor4m: 3.0,
      cachorro4a12m: 2.0,
      adultoBajo: 1.4,
      adultoModerado: 1.6,
      adultoAlto: 1.8,
      ajusteEsterilizado: -0.2,
      ajusteSenior: -0.2,
      edadSeniorMeses: 84,  // 7 años
      sobrepeso: 1.0,
      factorMinimo: 1.0,
      factorMinimoSenior: 1.2,
    },
    diasTransicion: {
      normal: 7,
      sensible: 10,
    },
    frecuenciaPesajeMeses: 1,
    tipCambioAlimento:
      'Si quieres cambiar a otro alimento, hazlo gradualmente durante 7 días mezclando proporciones — ayuda a evitar problemas digestivos.',
  },
  gato: {
    key: 'gato',
    singular: 'gato',
    plural: 'gatos',
    conArticulo: 'tu gato',
    emoji: '🐈',
    tagline: 'Tu compañero felino',
    tamanos: [
      { v: 'pequeno', label: 'Pequeño', descripcion: 'Hasta 4 kg aprox.' },
      { v: 'mediano', label: 'Mediano', descripcion: '4-7 kg' },
      { v: 'grande', label: 'Grande', descripcion: 'Más de 7 kg' },
    ],
    razas: [
      'Mestizo', 'Siamés', 'Persa', 'Maine Coon', 'Bengal',
      'British Shorthair', 'Ragdoll', 'Sphynx',
      'Common Domestic Shorthair', 'Common Domestic Longhair',
      'Bombay', 'Sagrado de Birmania', 'Abisinio', 'American Shorthair',
    ],
    factoresMER: {
      cachorroMenor4m: 2.5,
      cachorro4a12m: 2.0,
      adultoBajo: 1.2,
      adultoModerado: 1.4,
      adultoAlto: 1.6,
      ajusteEsterilizado: -0.2,
      ajusteSenior: -0.1,
      edadSeniorMeses: 132,  // 11 años
      sobrepeso: 0.8,
      factorMinimo: 0.8,
      factorMinimoSenior: 1.1,
    },
    diasTransicion: {
      normal: 10,
      sensible: 14,
    },
    frecuenciaPesajeMeses: 2,
    tipCambioAlimento:
      'Los gatos son sensibles a cambios. Si cambias de alimento, hazlo en 10 días mezclando porciones crecientes.',
  },
};

// =====================================================================
// HELPERS
// =====================================================================

/** Obtiene la config con seguridad de tipos */
export function getSpecies(especie: Especie): SpeciesConfig {
  const config = SPECIES[especie];
  if (!config) {
    throw new Error(`Especie no soportada: ${especie}`);
  }
  return config;
}

/** Lista de especies habilitadas (para selectores) */
export const SPECIES_LIST: SpeciesConfig[] = Object.values(SPECIES);

/** Emoji por especie - shortcut común */
export function emojiOf(especie: Especie): string {
  return getSpecies(especie).emoji;
}

/** Nombre singular - shortcut común */
export function nombreOf(especie: Especie): string {
  return getSpecies(especie).singular;
}

/** Devuelve si una edad en meses corresponde a etapa senior */
export function esSenior(especie: Especie, edad_meses: number): boolean {
  return edad_meses >= getSpecies(especie).factoresMER.edadSeniorMeses;
}

/** Devuelve si una edad en meses corresponde a etapa cachorro */
export function esCachorro(edad_meses: number): boolean {
  return edad_meses < 12;
}

// =====================================================================
// NOTA PARA FUTURAS ESPECIES
// =====================================================================
// Para agregar una nueva especie (ej: 'conejo'):
// 1. Agregar 'conejo' al tipo Especie aquí
// 2. Agregar una entrada en SPECIES con su config completa
// 3. Agregar 'conejo' al enum especie_enum en sql/01_schema.sql
// 4. Agregar razas y productos al seed
// 5. (Opcional) Crear post de blog específico
// Nada más necesita cambiar.
