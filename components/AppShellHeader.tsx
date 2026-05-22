import Link from 'next/link';

interface Props {
  /** Nombre del dueño (de profiles.nombre o fallback email) — para sacar la inicial */
  ownerName?: string | null;
}

/**
 * Header para rutas autenticadas (Inicio, Tienda, Historial, Cuenta).
 * Muestra logo + avatar con la inicial del dueño que lleva a /cuenta.
 */
export function AppShellHeader({ ownerName }: Props) {
  const inicial = (ownerName?.trim()?.[0] ?? '?').toUpperCase();

  return (
    <header className="px-6 pt-5 pb-4 flex items-center justify-between max-w-[440px] mx-auto">
      <Link
        href="/mascotas"
        className="font-display font-extrabold text-[22px] tracking-tight text-moss-deep"
        aria-label="Kulliñ — inicio"
      >
        kulli<span className="text-terracotta">ñ</span>
      </Link>
      <Link
        href="/cuenta"
        className="w-9 h-9 rounded-full bg-bg-card border grid place-items-center text-[14px] font-semibold text-ink-soft hover:text-ink hover:border-moss transition-colors"
        aria-label={`Cuenta de ${ownerName ?? 'usuario'}`}
      >
        {inicial}
      </Link>
    </header>
  );
}
