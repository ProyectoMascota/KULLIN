import { describe, it, expect } from 'vitest';
import { formatName, plural, dias } from '../format-text';

describe('formatName', () => {
  it('normaliza nombres todo en mayúsculas', () => {
    expect(formatName('MERIDA')).toBe('Merida');
    expect(formatName('LUNA')).toBe('Luna');
  });

  it('normaliza nombres todo en minúsculas', () => {
    expect(formatName('merida')).toBe('Merida');
  });

  it('respeta nombres ya bien capitalizados', () => {
    expect(formatName('Mérida')).toBe('Mérida');
  });

  it('capitaliza nombres compuestos con espacio', () => {
    expect(formatName('luis felipe')).toBe('Luis Felipe');
    expect(formatName('MARY ANN')).toBe('Mary Ann');
  });

  it('capitaliza nombres compuestos con guión', () => {
    expect(formatName('mary-ann')).toBe('Mary-Ann');
  });

  it('respeta ñ y acentos', () => {
    expect(formatName('ÑOÑA')).toBe('Ñoña');
    expect(formatName('SOFÍA')).toBe('Sofía');
  });

  it('maneja entradas vacías o null', () => {
    expect(formatName('')).toBe('');
    expect(formatName(null)).toBe('');
    expect(formatName(undefined)).toBe('');
  });

  it('limpia espacios al principio y final', () => {
    expect(formatName('  merida  ')).toBe('Merida');
  });
});

describe('plural', () => {
  it('usa singular cuando n === 1', () => {
    expect(plural(1, 'compra')).toBe('1 compra');
    expect(plural(1, 'pesaje')).toBe('1 pesaje');
  });

  it('usa plural cuando n !== 1', () => {
    expect(plural(0, 'compra')).toBe('0 compras');
    expect(plural(2, 'compra')).toBe('2 compras');
    expect(plural(5, 'pesaje')).toBe('5 pesajes');
  });

  it('acepta plural irregular explícito', () => {
    expect(plural(2, 'mes', 'meses')).toBe('2 meses');
    expect(plural(1, 'mes', 'meses')).toBe('1 mes');
  });
});

describe('dias', () => {
  it('singular para 1', () => {
    expect(dias(1)).toBe('día');
  });

  it('plural para 0 y >1', () => {
    expect(dias(0)).toBe('días');
    expect(dias(2)).toBe('días');
    expect(dias(28)).toBe('días');
  });
});
