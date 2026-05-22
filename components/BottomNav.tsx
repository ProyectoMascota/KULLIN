'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  /** ID de la mascota activa para construir links de Tienda e Historial */
  activePetId: string;
}

/**
 * Bottom navigation con 3 tabs: Inicio · Tienda · Historial.
 * Fija en la parte inferior, max-width 440px.
 * Marca el tab activo según la URL actual.
 */
export function BottomNav({ activePetId }: Props) {
  const pathname = usePathname() ?? '';

  // Detectar tab activo
  const isInicio = pathname === `/mascotas/${activePetId}` || pathname === '/mascotas';
  const isTienda = pathname.startsWith('/tienda');
  const isHistorial = pathname.includes('/historial');

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur border-t border-border"
    >
      <div className="max-w-[440px] mx-auto grid grid-cols-3">
        <Tab href={`/mascotas/${activePetId}`} label="Inicio" active={isInicio}>
          <IconHome active={isInicio} />
        </Tab>
        <Tab href="/tienda" label="Tienda" active={isTienda}>
          <IconBag active={isTienda} />
        </Tab>
        <Tab href={`/mascotas/${activePetId}/historial`} label="Historial" active={isHistorial}>
          <IconClipboard active={isHistorial} />
        </Tab>
      </div>
      {/* safe-area iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

// ---------- Subcomponente Tab ----------

function Tab({
  href,
  label,
  active,
  children,
}: {
  href: string;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
        active ? 'text-terracotta' : 'text-ink-soft'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
      <span className={`text-[11px] ${active ? 'font-semibold' : 'font-normal'}`}>{label}</span>
    </Link>
  );
}

// ---------- Iconos SVG inline (sin librería) ----------

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
      <path d="M3 11.5L12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-8.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function IconBag({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
      <path d="M5 8h14l-1 11.5a1.5 1.5 0 0 1-1.5 1.4h-9A1.5 1.5 0 0 1 6 19.5L5 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function IconClipboard({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  );
}
