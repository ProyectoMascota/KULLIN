// =====================================================================
// app/lib/format-text.ts
//
// Helpers de formato de texto cozy.
// Fase A — Refinamiento de Tono.
// =====================================================================

/**
 * Normaliza un nombre propio a sentence case.
 * Respeta apóstrofes y guiones internos.
 *
 *   "MERIDA"      -> "Merida"
 *   "merida"      -> "Merida"
 *   "Merida"      -> "Merida"
 *   "MARY-ANN"    -> "Mary-Ann"
 *   "luis felipe" -> "Luis Felipe"
 */
export function formatName(raw: string | null | undefined): string {
  if (!raw) return '';
  return raw
    .trim()
    .toLowerCase()
    .replace(/(^|[\s\-'])([a-záéíóúñü])/g, (_, sep, ch) => sep + ch.toUpperCase());
}

/**
 * Pluralización condicional simple.
 *
 *   plural(1, 'compra')           -> '1 compra'
 *   plural(2, 'compra')           -> '2 compras'
 *   plural(1, 'pesaje', 'pesajes')-> '1 pesaje'
 *   plural(0, 'día')              -> '0 días'
 */
export function plural(n: number, singular: string, plural?: string): string {
  const p = plural ?? `${singular}s`;
  return `${n} ${n === 1 ? singular : p}`;
}

/**
 * Pluralización solo de "día/días" para contadores de comida restante.
 */
export function dias(n: number): string {
  return n === 1 ? 'día' : 'días';
}
