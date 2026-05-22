// =====================================================================
// app/lib/insights.ts
//
// Cálculos de insights a partir de compras registradas.
// Funciones puras y testeables.
// =====================================================================

export interface CompraResumen {
  id: string;
  fecha_compra: string;
  cantidad_kg: number;
  precio_pagado_clp?: number | null;
}

export interface Insights {
  /** Fecha ISO de la última compra, o null si no hay compras */
  ultimaCompra: string | null;

  /** Cantidad total de compras registradas */
  totalCompras: number;

  /** Suma de los precios pagados (CLP). null si ninguna tiene precio */
  totalGastadoClp: number | null;

  /**
   * Promedio de días que dura una bolsa, calculado como días entre compras.
   * null si hay menos de 2 compras.
   */
  duracionPromedioDias: number | null;
}

/**
 * Calcula los insights a partir del listado de compras.
 *
 * Las compras deben venir ordenadas (la función ordena por las dudas).
 */
export function calcularInsights(compras: CompraResumen[]): Insights {
  const totalCompras = compras.length;

  if (totalCompras === 0) {
    return {
      ultimaCompra: null,
      totalCompras: 0,
      totalGastadoClp: null,
      duracionPromedioDias: null,
    };
  }

  // Ordenar por fecha desc (más reciente primero) para "última compra"
  const sortedDesc = [...compras].sort(
    (a, b) => new Date(b.fecha_compra).getTime() - new Date(a.fecha_compra).getTime()
  );

  const ultimaCompra = sortedDesc[0].fecha_compra;

  // Total gastado: suma de las compras CON precio. null si ninguna tiene.
  const conPrecio = compras.filter((c) => c.precio_pagado_clp != null);
  const totalGastadoClp =
    conPrecio.length === 0
      ? null
      : conPrecio.reduce((s, c) => s + (c.precio_pagado_clp ?? 0), 0);

  // Duración promedio: días entre compras (necesita >= 2)
  let duracionPromedioDias: number | null = null;
  if (totalCompras >= 2) {
    const sortedAsc = [...compras].sort(
      (a, b) => new Date(a.fecha_compra).getTime() - new Date(b.fecha_compra).getTime()
    );
    const diferencias: number[] = [];
    for (let i = 1; i < sortedAsc.length; i++) {
      const t1 = new Date(sortedAsc[i - 1].fecha_compra).getTime();
      const t2 = new Date(sortedAsc[i].fecha_compra).getTime();
      const dias = Math.round((t2 - t1) / (1000 * 60 * 60 * 24));
      if (dias > 0) diferencias.push(dias);
    }
    if (diferencias.length > 0) {
      const suma = diferencias.reduce((s, d) => s + d, 0);
      duracionPromedioDias = Math.round(suma / diferencias.length);
    }
  }

  return {
    ultimaCompra,
    totalCompras,
    totalGastadoClp,
    duracionPromedioDias,
  };
}
