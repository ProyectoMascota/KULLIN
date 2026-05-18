import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';

export default function NotFound() {
  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/" className="text-sm text-ink-soft underline">
            ← Inicio
          </Link>
        }
      />
      <main className="container-app pt-12 animate-fade-up text-center">
        <div className="flex justify-center -space-x-3 mb-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-6xl shadow-card relative z-10">
            🐕
            <div className="absolute -inset-1 rounded-full border-2 border-terracotta/30" />
          </div>
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-6xl shadow-card relative z-0">
            🐈
            <div className="absolute -inset-1 rounded-full border-2 border-moss/30" />
          </div>
        </div>

        <h1 className="font-display text-4xl text-ink leading-tight tracking-tight mb-3">
          Esta página se <em className="text-terracotta italic font-normal">escapó</em>.
        </h1>
        <p className="text-ink-soft text-[15px] mb-8 px-4">
          No encontramos lo que buscas. Tal vez quieras volver al inicio o crear el perfil de tu mascota.
        </p>

        <div className="space-y-3 max-w-[320px] mx-auto">
          <Link href="/" className="btn-primary block">
            Volver al inicio
          </Link>
          <Link href="/onboarding" className="btn-secondary block">
            Crear perfil de mi mascota
          </Link>
        </div>
      </main>
    </>
  );
}
