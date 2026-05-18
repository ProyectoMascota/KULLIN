import Link from 'next/link';

export function AppHeader({ rightSlot }: { rightSlot?: React.ReactNode }) {
  return (
    <header className="px-6 pt-5 pb-4 flex items-center justify-between max-w-[440px] mx-auto">
      <Link href="/mascotas" className="font-display font-extrabold text-[22px] tracking-tight text-moss-deep">
        kulli<span className="text-terracotta">ñ</span>
      </Link>
      {rightSlot ?? (
        <Link
          href="/cuenta"
          className="w-9 h-9 rounded-full bg-bg-card border grid place-items-center text-ink-soft text-lg"
          aria-label="Cuenta"
        >
          ⋯
        </Link>
      )}
    </header>
  );
}
