import { redirect } from 'next/navigation';
import Link from 'next/link';
import { requireUser } from '@/app/lib/supabase-server';
import { AppHeader } from '@/components/AppHeader';
import { emojiOf } from '@/app/lib/species-config';

export const dynamic = 'force-dynamic';

export default async function MascotasPage() {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse || !user) redirect('/login');

  const { data: mascotas } = await supabase
    .from('mascotas')
    .select('id, nombre, especie, raza, peso_kg, avatar_url')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  // Si no tiene mascotas, al onboarding
  if (!mascotas || mascotas.length === 0) {
    redirect('/onboarding');
  }

  // Si tiene solo una, salta directo a su perfil
  if (mascotas.length === 1) {
    redirect(`/mascotas/${mascotas[0].id}`);
  }

  return (
    <>
      <AppHeader />
      <main className="container-app pt-4 animate-fade-up">
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Tus <em className="text-terracotta italic font-normal">compañeros</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-6">Selecciona uno para ver su perfil.</p>

        <div className="space-y-3 mb-6">
          {mascotas.map((m) => (
            <Link
              key={m.id}
              href={`/mascotas/${m.id}`}
              className="card flex items-center gap-4 hover:border-moss transition-colors mb-0"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-3xl flex-shrink-0">
                {emojiOf(m.especie)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-xl text-ink leading-tight">{m.nombre}</div>
                <div className="text-[13px] text-ink-soft truncate">
                  {m.raza} · {m.peso_kg} kg
                </div>
              </div>
              <span className="text-ink-soft text-xl">→</span>
            </Link>
          ))}
        </div>

        <Link href="/onboarding" className="btn-secondary text-center block">
          + Agregar otra mascota
        </Link>
      </main>
    </>
  );
}
