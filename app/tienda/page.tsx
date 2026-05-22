// =====================================================================
// app/tienda/page.tsx
//
// Catálogo de productos afiliados.
// Filtra por especie de la mascota activa (cookie+localStorage en cliente).
// Esta es la mejor ruta para descubrir nuevos productos.
// =====================================================================
import { redirect } from 'next/navigation';
import { requireUser } from '@/app/lib/supabase-server';
import { recomendarProductos, type Producto } from '@/app/lib/nutrition';
import { AppShellHeader } from '@/components/AppShellHeader';
import { TiendaClient } from './TiendaClient';

export const dynamic = 'force-dynamic';

export default async function TiendaPage() {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse || !user) redirect('/login');

  // 1. Cargar mascotas del usuario (necesitamos al menos una para saber qué mostrar)
  const { data: mascotas } = await supabase
    .from('mascotas')
    .select('id, nombre, especie, tamano, peso_kg, edad_meses, actividad, esterilizado, condicion')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (!mascotas || mascotas.length === 0) {
    redirect('/onboarding');
  }

  // 2. Profile del dueño para el avatar
  const { data: profile } = await supabase
    .from('profiles')
    .select('nombre')
    .eq('id', user.id)
    .single();
  const ownerName = profile?.nombre ?? user.email ?? null;

  // 3. Cargar TODOS los productos activos (se filtran en el cliente por mascota activa)
  const { data: productos } = await supabase
    .from('productos')
    .select('*')
    .eq('activo', true)
    .order('marca', { ascending: true });

  return (
    <>
      <AppShellHeader ownerName={ownerName} />
      <TiendaClient
        mascotas={mascotas}
        productos={(productos ?? []) as unknown as Producto[]}
      />
    </>
  );
}
