'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { AppHeader } from '@/components/AppHeader';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Loguear el error (a Vercel logs si está en prod)
    console.error('[error boundary]', error);
  }, [error]);

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
        <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-7xl shadow-card mb-6">
          🤕
        </div>

        <h1 className="font-display text-4xl text-ink leading-tight tracking-tight mb-3">
          Algo salió <em className="text-terracotta italic font-normal">mal</em>.
        </h1>
        <p className="text-ink-soft text-[15px] mb-2 px-4">
          Tuvimos un problema procesando tu solicitud. No te preocupes, tus datos están seguros.
        </p>
        {error.digest && (
          <p className="text-[11px] text-ink-soft mb-8 font-mono">
            Código: {error.digest}
          </p>
        )}

        <div className="space-y-3 max-w-[320px] mx-auto mt-8">
          <button onClick={reset} className="btn-primary">
            Intentar de nuevo
          </button>
          <Link href="/" className="btn-secondary block">
            Volver al inicio
          </Link>
        </div>

        <p className="text-[12px] text-ink-soft mt-8 px-4">
          Si el problema persiste, escríbenos a{' '}
          <a href="mailto:hola@kullin.app" className="underline">hola@kullin.app</a>
        </p>
      </main>
    </>
  );
}
