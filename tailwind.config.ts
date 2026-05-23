import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // === FONDOS ===
        bg: '#FBF3E7',
        'bg-soft': '#F7EDDD',
        'bg-card': '#FFF8EC',
        'bg-card-warm': '#FAEDDB',

        // === TINTA / TEXTO ===
        ink: '#3B2A1E',
        'ink-soft': '#7A6552',
        'ink-faded': '#A99581',

        // === MARRONES PRINCIPALES ===
        coffee: '#5C3A1F',
        'coffee-soft': '#7A4E2D',
        cocoa: '#8A5A36',
        'cocoa-soft': '#A36B3F',

        // === ACENTOS NARANJA / DURAZNO ===
        peach: '#E8A669',
        'peach-deep': '#D98C4B',
        apricot: '#F0C189',

        // === VERDES SUAVES ===
        sage: '#A8BD96',
        'sage-deep': '#7F9A6B',
        'sage-soft': '#C8D6B8',

        // === ALERTAS ===
        coral: '#D17656',
        'coral-deep': '#B85838',

        // === LEGACY ALIASES (no romper código existente) ===
        moss: '#7F9A6B',
        'moss-deep': '#5C7548',
        terracotta: '#A36B3F',
        gold: '#E8A669',
        rose: '#D17656',
      },
      fontFamily: {
        display: ['Nunito', 'SF Pro Rounded', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Nunito', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(59, 42, 30, 0.10)',
        soft: 'rgba(59, 42, 30, 0.06)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(59, 42, 30, 0.04)',
        card: '0 2px 6px rgba(59, 42, 30, 0.05), 0 8px 24px -10px rgba(59, 42, 30, 0.08)',
        elevated: '0 4px 12px rgba(59, 42, 30, 0.08), 0 16px 40px -16px rgba(59, 42, 30, 0.12)',
        'inset-soft': 'inset 0 1px 2px rgba(59, 42, 30, 0.04)',
      },
    },
  },
  plugins: [],
};
export default config;
