import { notFound, redirect } from 'next/navigation';
import { requireUser } from '@/app/lib/supabase-server';
import { recomendarProductos, diasRestantes, nivelBarraComida, type Producto } from '@/app/lib/nutrition';
import { AppShellHeader } from '@/components/AppShellHeader';
import { PetHome } from './PetHome';

export const dynamic = 'force-dynamic';

export default async function MascotaPage({ params }: { params: { id: string } }) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse || !user) redirect('/login');

  // 1. Cargar mascota
  const { data: mascota } = await supabase
    .from('mascotas')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!mascota) notFound();

  // 1b. Cargar nombre del dueño para el avatar header
  const { data: profile } = await supabase
    .from('profiles')
    .select('nombre')
    .eq('id', user.id)
    .single();
  const ownerName = profile?.nombre ?? user.email ?? null;

  // 2. Última compra para barra de comida
  const { data: ultima } = await supabase
    .from('compras')
    .select('*, productos(*)')
    .eq('mascota_id', mascota.id)
    .order('fecha_compra', { ascending: false })
    .limit(1)
    .maybeSingle();

  let estado_comida = null;
  if (ultima) {
    const agot = new Date(ultima.fecha_estimada_agotamiento);
    const compra = new Date(ultima.fecha_compra);
    estado_comida = {
      dias_restantes: diasRestantes(agot),
      nivel_barra: Math.round(nivelBarraComida(compra, agot)),
      fecha_compra: ultima.fecha_compra,
      fecha_agotamiento: ultima.fecha_estimada_agotamiento,
      producto: ultima.productos as any,
      kg_comprados: ultima.cantidad_kg,
    };
  }

  // 3. Recomendaciones
  const { data: productos } = await supabase
    .from('productos')
    .select('*')
    .eq('especie', mascota.especie)
    .eq('activo', true);

  const recomendaciones = productos
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
        productos.length // todas las recomendaciones compatibles, no solo 3
      ).map((r) => ({
        ...r,
        match_pct: Math.min(100, Math.round((r.score / 10) * 100)),
      }))
    : [];

  return (
    <>
      <AppShellHeader ownerName={ownerName} />
      <PetHome
        mascota={mascota}
        estado_comida={estado_comida}
        recomendaciones={recomendaciones}
      />
    </>
  );
}
