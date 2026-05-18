// =====================================================================
// app/api/razas/route.ts
// GET /api/razas?especie=perro
//
// Lista de razas desde la tabla DB. Es pública (no requiere auth)
// porque las razas son catálogo común.
// =====================================================================
import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/app/lib/supabase-server';
import { SPECIES_LIST, type Especie } from '@/app/lib/species-config';

// Cache de Next.js: las razas cambian raramente, ~1 hora
export const revalidate = 3600;

export async function GET(request: Request) {
  const supabase = getSupabaseServer();
  const url = new URL(request.url);
  const especieParam = url.searchParams.get('especie');

  const especiesValidas = SPECIES_LIST.map((s) => s.key);
  const especie = especiesValidas.includes(especieParam as Especie)
    ? (especieParam as Especie)
    : null;

  let query = supabase
    .from('razas')
    .select('id, especie, nombre, tamano_tipico, peso_min_kg, peso_max_kg')
    .order('nombre', { ascending: true });

  if (especie) {
    query = query.eq('especie', especie);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ razas: data ?? [] });
}
