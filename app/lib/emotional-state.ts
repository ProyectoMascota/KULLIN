// =====================================================================
// app/lib/emotional-state.ts
//
// Calcula el estado emocional de la mascota a partir del % de comida
// restante. Función pura, fácil de testear, sin side effects.
// =====================================================================

export type EstadoEmocional = 'feliz' | 'bien' | 'pronto' | 'poco' | 'sin_comida';

export interface EstadoEmocionalInfo {
  estado: EstadoEmocional;
  emoji: string;
  texto: string;
  /** Color de la barra de alimento — clases Tailwind */
  barraColor: string;
  /** Si conviene resaltar urgencia (true cuando el estado es 'poco' o 'sin_comida') */
  urgente: boolean;
}

/**
 * Mapa de estados.
 * Los nombres usan tu (la mascota) implícito porque ya viene precedido por el nombre.
 */
const ESTADOS: Record<EstadoEmocional, Omit<EstadoEmocionalInfo, 'estado'>> = {
  feliz: {
    emoji: '😊',
    texto: 'Está feliz',
    barraColor: 'from-moss to-[#6b8c5a]',
    urgente: false,
  },
  bien: {
    emoji: '🙂',
    texto: 'Está bien',
    barraColor: 'from-moss to-[#6b8c5a]',
    urgente: false,
  },
  pronto: {
    emoji: '🤔',
    texto: 'Pronto necesita más',
    barraColor: 'from-gold to-[#e8c060]',
    urgente: false,
  },
  poco: {
    emoji: '😟',
    texto: 'Le queda poco',
    barraColor: 'from-terracotta to-rose',
    urgente: true,
  },
  sin_comida: {
    emoji: '😢',
    texto: 'Necesita comida',
    barraColor: 'from-terracotta to-rose',
    urgente: true,
  },
};

/**
 * Resuelve el estado emocional desde el % de comida restante.
 *
 * @param porcentajeComida — 0 a 100, o null si no hay compra registrada
 *
 * Reglas:
 *   null / 0     → 'sin_comida'
 *   1-19         → 'poco'
 *   20-39        → 'pronto'
 *   40-70        → 'bien'
 *   71-100       → 'feliz'
 */
export function calcularEstadoEmocional(porcentajeComida: number | null): EstadoEmocionalInfo {
  let estado: EstadoEmocional;

  if (porcentajeComida === null || porcentajeComida <= 0) {
    estado = 'sin_comida';
  } else if (porcentajeComida < 20) {
    estado = 'poco';
  } else if (porcentajeComida < 40) {
    estado = 'pronto';
  } else if (porcentajeComida <= 70) {
    estado = 'bien';
  } else {
    estado = 'feliz';
  }

  return {
    estado,
    ...ESTADOS[estado],
  };
}
