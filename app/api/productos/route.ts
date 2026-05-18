// =====================================================================
// app/api/productos/route.ts
// GET — lista de productos del catálogo, filtrable
// =====================================================================
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/app/lib/supabase-server';
import { SPECIES_LIST, type Especie } from '@/app/lib/species-config';

export async function GET(request: Request) {
  const supabase = getSupabaseServer();
  const url = new URL(request.url);
  const especieParam = url.searchParams.get('especie');
  const marca = url.searchParams.get('marca');
  const q = url.searchParams.get('q');

  // Validar contra especies habilitadas (centralizado, escalable a futuras especies)
  const especiesValidas = SPECIES_LIST.map((s) => s.key);
  const especie = especiesValidas.includes(especieParam as Especie) ? (especieParam as Especie) : null;

  let query = supabase.from('productos').select('*').eq('activo', true);
  if (especie) query = query.eq('especie', especie);
  if (marca) query = query.eq('marca', marca);
  if (q) query = query.or(`linea.ilike.%${q}%,marca.ilike.%${q}%`);

  const { data, error } = await query.order('marca').order('linea');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ productos: data });
}
