import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireUser } from '@/app/lib/supabase-server';
import { AppHeader } from '@/components/AppHeader';
import { CuentaCliente } from './CuentaCliente';

export const dynamic = 'force-dynamic';

export default async function CuentaPage() {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse || !user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/mascotas" className="text-sm text-ink-soft underline">
            ← Volver
          </Link>
        }
      />
      <main className="container-app pt-2 animate-fade-up">
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Tu <em className="text-terracotta italic font-normal">cuenta</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-6">{user.email}</p>
        <CuentaCliente initialProfile={profile} />
      </main>
    </>
  );
}
