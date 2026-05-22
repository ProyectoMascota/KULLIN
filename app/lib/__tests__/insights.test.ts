import { describe, it, expect } from 'vitest';
import { calcularInsights, type CompraResumen } from '../insights';

const compra = (fecha: string, kg: number, precio?: number | null): CompraResumen => ({
  id: `${fecha}-${kg}`,
  fecha_compra: fecha,
  cantidad_kg: kg,
  precio_pagado_clp: precio,
});

describe('calcularInsights', () => {
  it('sin compras devuelve todo null/0', () => {
    const r = calcularInsights([]);
    expect(r.ultimaCompra).toBeNull();
    expect(r.totalCompras).toBe(0);
    expect(r.totalGastadoClp).toBeNull();
    expect(r.duracionPromedioDias).toBeNull();
  });

  it('una sola compra: total=1, sin duración promedio', () => {
    const r = calcularInsights([compra('2026-05-19', 7.5, 25000)]);
    expect(r.totalCompras).toBe(1);
    expect(r.ultimaCompra).toBe('2026-05-19');
    expect(r.totalGastadoClp).toBe(25000);
    expect(r.duracionPromedioDias).toBeNull();
  });

  it('dos compras: calcula días entre ellas', () => {
    const r = calcularInsights([
      compra('2026-05-19', 7.5, 25000),
      compra('2026-04-18', 7.5, 24000),
    ]);
    expect(r.totalCompras).toBe(2);
    expect(r.totalGastadoClp).toBe(49000);
    expect(r.duracionPromedioDias).toBe(31); // 18 abr → 19 may
    expect(r.ultimaCompra).toBe('2026-05-19');
  });

  it('tres compras: promedio de las dos diferencias', () => {
    const r = calcularInsights([
      compra('2026-06-20', 7.5),
      compra('2026-05-20', 7.5),
      compra('2026-04-20', 7.5),
    ]);
    expect(r.totalCompras).toBe(3);
    // diff1: 30 días, diff2: 31 días → promedio = 30.5 → 31 redondeado
    expect(r.duracionPromedioDias).toBe(31);
  });

  it('orden de entrada no importa', () => {
    const r1 = calcularInsights([
      compra('2026-05-19', 7.5),
      compra('2026-04-18', 7.5),
    ]);
    const r2 = calcularInsights([
      compra('2026-04-18', 7.5),
      compra('2026-05-19', 7.5),
    ]);
    expect(r1.duracionPromedioDias).toBe(r2.duracionPromedioDias);
    expect(r1.ultimaCompra).toBe(r2.ultimaCompra);
  });

  it('totalGastado null si ninguna tiene precio', () => {
    const r = calcularInsights([
      compra('2026-05-19', 7.5, null),
      compra('2026-04-18', 7.5, null),
    ]);
    expect(r.totalGastadoClp).toBeNull();
  });

  it('totalGastado solo suma las que tienen precio', () => {
    const r = calcularInsights([
      compra('2026-05-19', 7.5, 25000),
      compra('2026-04-18', 7.5, null),
      compra('2026-03-18', 7.5, 24000),
    ]);
    expect(r.totalGastadoClp).toBe(49000);
  });

  it('ignora compras con misma fecha (diff=0)', () => {
    const r = calcularInsights([
      compra('2026-05-19', 7.5),
      compra('2026-05-19', 5.0),
    ]);
    // Las dos son del mismo día → no hay diff > 0 → null
    expect(r.duracionPromedioDias).toBeNull();
  });
});
