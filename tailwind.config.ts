import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f4ede0',
        'bg-card': '#fbf6ec',
        ink: '#2a2418',
        'ink-soft': '#6b5e4a',
        moss: '#4a6741',
        'moss-deep': '#2d4127',
        terracotta: '#c4623a',
        gold: '#d4a843',
        rose: '#c97b6a',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(42,36,24,0.12)',
      },
      boxShadow: {
        card: '0 1px 3px rgba(42,36,24,0.06), 0 8px 24px -8px rgba(42,36,24,0.12)',
      },
    },
  },
  plugins: [],
};
export default config;
