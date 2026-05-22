import { describe, it, expect } from 'vitest';
import { calcularEstadoEmocional } from '../emotional-state';

describe('calcularEstadoEmocional', () => {
  describe('sin comida registrada', () => {
    it('null devuelve sin_comida', () => {
      expect(calcularEstadoEmocional(null).estado).toBe('sin_comida');
    });

    it('0% devuelve sin_comida', () => {
      expect(calcularEstadoEmocional(0).estado).toBe('sin_comida');
    });

    it('negativo (edge case) devuelve sin_comida', () => {
      expect(calcularEstadoEmocional(-10).estado).toBe('sin_comida');
    });

    it('sin_comida es urgente', () => {
      expect(calcularEstadoEmocional(null).urgente).toBe(true);
    });
  });

  describe('estado poco (1-19%)', () => {
    it('1% es poco', () => {
      expect(calcularEstadoEmocional(1).estado).toBe('poco');
    });

    it('19% es poco', () => {
      expect(calcularEstadoEmocional(19).estado).toBe('poco');
    });

    it('poco es urgente', () => {
      expect(calcularEstadoEmocional(15).urgente).toBe(true);
    });
  });

  describe('estado pronto (20-39%)', () => {
    it('20% es pronto', () => {
      expect(calcularEstadoEmocional(20).estado).toBe('pronto');
    });

    it('39% es pronto', () => {
      expect(calcularEstadoEmocional(39).estado).toBe('pronto');
    });

    it('pronto NO es urgente', () => {
      expect(calcularEstadoEmocional(30).urgente).toBe(false);
    });
  });

  describe('estado bien (40-70%)', () => {
    it('40% es bien', () => {
      expect(calcularEstadoEmocional(40).estado).toBe('bien');
    });

    it('65% es bien (mockup)', () => {
      expect(calcularEstadoEmocional(65).estado).toBe('bien');
    });

    it('70% es bien', () => {
      expect(calcularEstadoEmocional(70).estado).toBe('bien');
    });
  });

  describe('estado feliz (>70%)', () => {
    it('71% es feliz', () => {
      expect(calcularEstadoEmocional(71).estado).toBe('feliz');
    });

    it('100% es feliz', () => {
      expect(calcularEstadoEmocional(100).estado).toBe('feliz');
    });

    it('feliz NO es urgente', () => {
      expect(calcularEstadoEmocional(95).urgente).toBe(false);
    });
  });

  describe('campos del retorno', () => {
    it('siempre incluye emoji', () => {
      [null, 0, 15, 30, 60, 90].forEach((p) => {
        expect(calcularEstadoEmocional(p).emoji).toBeTruthy();
      });
    });

    it('siempre incluye texto', () => {
      [null, 0, 15, 30, 60, 90].forEach((p) => {
        expect(calcularEstadoEmocional(p).texto).toBeTruthy();
      });
    });

    it('siempre incluye barraColor', () => {
      [null, 0, 15, 30, 60, 90].forEach((p) => {
        const info = calcularEstadoEmocional(p);
        expect(info.barraColor).toContain('from-');
      });
    });
  });
});
