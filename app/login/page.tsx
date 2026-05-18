'use client';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseBrowser } from '@/app/lib/supabase-browser';
import { AppHeader } from '@/components/AppHeader';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const search = useSearchParams();
  const next = search.get('next') ?? '/mascotas';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (error) {
      setStatus('error');
      setErrorMsg(error.message);
    } else {
      setStatus('sent');
    }
  }

  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/" className="text-sm text-ink-soft underline">
            ← Volver
          </Link>
        }
      />
      <main className="container-app pt-8 animate-fade-up">
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Hola de <em className="text-terracotta italic font-normal">vuelta</em>.
        </h1>
        <p className="text-ink-soft text-[15px] mb-8">
          Te enviamos un link para entrar sin contraseña.
        </p>

        {status === 'sent' ? (
          <div className="card text-center py-10">
            <div className="text-5xl mb-3">📩</div>
            <h2 className="font-display text-2xl text-ink mb-2">Revisa tu correo</h2>
            <p className="text-sm text-ink-soft">
              Te enviamos un link a <strong>{email}</strong>. <br />
              Tócalo desde el mismo dispositivo para entrar.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="label" htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'sending'}
              />
            </div>
            {errorMsg && (
              <p className="text-sm text-terracotta mb-4">⚠ {errorMsg}</p>
            )}
            <button type="submit" className="btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviarme el link →'}
            </button>
          </form>
        )}

        <p className="text-[11px] text-ink-soft text-center mt-8 px-4 leading-relaxed">
          Al continuar aceptas los{' '}
          <Link href="/terminos" className="underline">Términos</Link> y la{' '}
          <Link href="/privacidad" className="underline">Política de Privacidad</Link> de Kulliñ,
          incluyendo el envío de correos para usar el servicio.
        </p>
      </main>
    </>
  );
}
