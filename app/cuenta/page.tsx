import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireUser } from '@/app/lib/supabase-server';
import { AppShellHeader } from '@/components/AppShellHeader';
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

  const ownerName = profile?.nombre ?? user.email ?? null;

  return (
    <>
      <AppShellHeader ownerName={ownerName} />
      <main className="container-app pt-2 animate-fade-up">
        <Link href="/mascotas" className="inline-flex items-center text-sm text-ink-soft hover:text-ink mb-4">
          ← Volver
        </Link>
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Tu <em className="text-terracotta italic font-normal">cuenta</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-6">{user.email}</p>
        <CuentaCliente initialProfile={profile} />
      </main>
    </>
  );
}
