import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { requireUser } from '@/app/lib/supabase-server';
import { AppHeader } from '@/components/AppHeader';
import { recomendarProductos, type Producto } from '@/app/lib/nutrition';
import { emojiOf } from '@/app/lib/species-config';

export const dynamic = 'force-dynamic';

export default async function BienvenidaPage({
  searchParams,
}: {
  searchParams: { mascota?: string };
}) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse || !user) redirect('/login');

  const mascotaId = searchParams.mascota;
  if (!mascotaId) redirect('/mascotas');

  const { data: mascota } = await supabase
    .from('mascotas')
    .select('*')
    .eq('id', mascotaId)
    .eq('user_id', user.id)
    .single();

  if (!mascota) notFound();

  // Recomendación rápida para mostrar
  const { data: productos } = await supabase
    .from('productos')
    .select('*')
    .eq('especie', mascota.especie)
    .eq('activo', true);

  const top = productos
    ? recomendarProductos(
        {
          especie: mascota.especie,
          tamano: mascota.tamano,
          peso_kg: mascota.peso_kg,
          edad_meses: mascota.edad_meses,
          actividad: mascota.actividad,
          esterilizado: mascota.esterilizado,
          condicion: mascota.condicion,
        },
        productos as unknown as Producto[],
        1
      )[0]
    : null;

  return (
    <>
      <AppHeader />
      <main className="container-app pt-4 animate-fade-up">
        <div className="text-center mb-10">
          <div className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-7xl shadow-card mb-6 relative">
            {emojiOf(mascota.especie)}
            <div className="absolute -inset-1 rounded-full border-2 border-terracotta/30" />
          </div>

          <h1 className="font-display text-3xl text-ink leading-tight tracking-tight mb-2">
            ¡Bienvenido/a, <em className="text-terracotta italic font-normal">{mascota.nombre}</em>!
          </h1>
          <p className="text-ink-soft text-[15px]">
            Ya tenemos su perfil listo. Te contamos qué viene ahora.
          </p>
        </div>

        {/* Lo que ya calculamos */}
        <div className="card">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-2xl">✓</span>
            <div className="flex-1">
              <h2 className="font-semibold text-ink mb-0.5">Ración diaria calculada</h2>
              <p className="text-[14px] text-ink-soft leading-relaxed">
                {mascota.nombre} debería consumir <strong>{Math.round(Number(mascota.mer_kcal))} kcal al día</strong>.
                {top && ' Eso son aproximadamente '}
                {top && (
                  <strong>
                    {Math.round(top.gramos_diarios)} gramos
                  </strong>
                )}
                {top && ' del alimento que recomendamos.'}
              </p>
            </div>
          </div>
        </div>

        {/* Lo que sigue */}
        <h2 className="font-display text-xl text-ink mb-3 mt-6">Lo que sigue</h2>

        <div className="space-y-3">
          <div className="card flex items-start gap-3 mb-0">
            <span className="font-display text-2xl text-terracotta leading-none mt-0.5">01</span>
            <div>
              <p className="font-medium text-ink mb-0.5">Mira el alimento que recomendamos</p>
              <p className="text-[14px] text-ink-soft leading-relaxed">
                Basado en la edad, raza y condición de {mascota.nombre}.
                Si ya compras otra marca, también puedes registrarla.
              </p>
            </div>
          </div>

          <div className="card flex items-start gap-3 mb-0">
            <span className="font-display text-2xl text-terracotta leading-none mt-0.5">02</span>
            <div>
              <p className="font-medium text-ink mb-0.5">Registra cuando compres alimento</p>
              <p className="text-[14px] text-ink-soft leading-relaxed">
                Te mostramos cuántos días dura la bolsa y cuándo conviene recomprar.
              </p>
            </div>
          </div>

          <div className="card flex items-start gap-3 mb-0">
            <span className="font-display text-2xl text-terracotta leading-none mt-0.5">03</span>
            <div>
              <p className="font-medium text-ink mb-0.5">Recibe un aviso antes de que se acabe</p>
              <p className="text-[14px] text-ink-soft leading-relaxed">
                Te enviamos un email con anticipación para que nunca te quedes sin comida.
              </p>
            </div>
          </div>

          <div className="card flex items-start gap-3 mb-0">
            <span className="font-display text-2xl text-terracotta leading-none mt-0.5">04</span>
            <div>
              <p className="font-medium text-ink mb-0.5">Pesa a {mascota.nombre} cada 1-2 meses</p>
              <p className="text-[14px] text-ink-soft leading-relaxed">
                Si cambia de peso, actualiza el perfil y recalculamos la ración automáticamente.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-6">
          <Link href={`/mascotas/${mascota.id}`} className="btn-primary block text-center">
            Ver perfil de {mascota.nombre} →
          </Link>
        </div>

        <p className="text-[11px] text-ink-soft text-center px-4 leading-relaxed">
          Si tienes dudas, escríbenos a{' '}
          <a href="mailto:hola@kullin.app" className="underline">hola@kullin.app</a>.
          Estamos en beta y nos sirve mucho tu feedback.
        </p>
      </main>
    </>
  );
}
