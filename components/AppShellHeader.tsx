import Link from 'next/link';

interface Props {
  /** Nombre del dueño (de profiles.nombre o fallback email) — para sacar la inicial */
  ownerName?: string | null;
}

/**
 * Header para rutas autenticadas (Inicio, Tienda, Historial, Cuenta).
 * Logo: KULLIÑ mayúsculas en marrón chocolate, peso bold, rounded.
 * Avatar a la derecha lleva a /cuenta.
 */
export function AppShellHeader({ ownerName }: Props) {
  const inicial = (ownerName?.trim()?.[0] ?? '?').toUpperCase();

  return (
    <header className="px-6 pt-5 pb-4 flex items-center justify-between max-w-[440px] mx-auto">
      <Link
        href="/mascotas"
        className="font-display font-extrabold text-[24px] tracking-tight text-coffee leading-none"
        aria-label="Kulliñ — inicio"
        style={{ letterSpacing: '-0.01em' }}
      >
        KULLI<span className="text-cocoa-soft">Ñ</span>
      </Link>
      <Link
        href="/cuenta"
        className="w-10 h-10 rounded-full bg-bg-card border border-cocoa-soft/20 grid place-items-center text-[15px] font-bold text-cocoa hover:border-cocoa transition-colors shadow-soft"
        aria-label={`Cuenta de ${ownerName ?? 'usuario'}`}
      >
        {inicial}
      </Link>
    </header>
  );
}
