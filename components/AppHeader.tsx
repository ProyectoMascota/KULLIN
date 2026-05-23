import Link from 'next/link';

/**
 * Header para rutas públicas (landing, login, blog, etc).
 * Variante simple del logo KULLIÑ, sin avatar.
 */
export function AppHeader({ rightSlot }: { rightSlot?: React.ReactNode }) {
  return (
    <header className="px-6 pt-5 pb-4 flex items-center justify-between max-w-[440px] mx-auto">
      <Link
        href="/"
        className="font-display font-extrabold text-[24px] tracking-tight text-coffee leading-none"
        style={{ letterSpacing: '-0.01em' }}
      >
        KULLI<span className="text-cocoa-soft">Ñ</span>
      </Link>
      {rightSlot ?? (
        <Link
          href="/cuenta"
          className="w-10 h-10 rounded-full bg-bg-card border border-cocoa-soft/20 grid place-items-center text-ink-soft text-lg shadow-soft"
          aria-label="Cuenta"
        >
          ⋯
        </Link>
      )}
    </header>
  );
}
