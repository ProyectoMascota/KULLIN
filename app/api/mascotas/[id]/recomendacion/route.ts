// =====================================================================
// app/api/mascotas/[id]/recomendacion/route.ts
// GET — devuelve top 3 productos recomendados para la mascota
// =====================================================================
import { NextResponse } from 'next/server';
import { requireUser } from '@/app/lib/supabase-server';
import { recomendarProductos, type Producto } from '@/app/lib/nutrition';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  // 1. Cargar mascota
  const { data: mascota, error } = await supabase
    .from('mascotas')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user!.id)
    .single();

  if (error || !mascota) {
    return NextResponse.json({ error: 'Mascota no encontrada' }, { status: 404 });
  }

  // 2. Cargar catálogo filtrado por especie (en SQL para reducir payload)
  const { data: productos } = await supabase
    .from('productos')
    .select('*')
    .eq('especie', mascota.especie)
    .eq('activo', true);

  if (!productos || productos.length === 0) {
    return NextResponse.json({ recomendaciones: [] });
  }

  // 3. Aplicar algoritmo de ranking
  const recomendaciones = recomendarProductos(
    {
      especie: mascota.especie,
      tamano: mascota.tamano,
      peso_kg: mascota.peso_kg,
      edad_meses: mascota.edad_meses,
      actividad: mascota.actividad,
      esterilizado: mascota.esterilizado,
      condicion: mascota.condicion,
    },
    productos as Producto[],
    3
  );

  // 4. Para cada recomendación incluir duración estimada del formato más grande
  const enriquecidas = recomendaciones.map((r) => {
    const formatos = (r.producto.formatos as any[]) || [];
    const conDuracion = formatos.map((f) => ({
      ...f,
      dias_duracion: Math.floor((f.kg * 1000) / r.gramos_diarios),
      costo_dia_clp: Math.round(f.precio_clp / Math.floor((f.kg * 1000) / r.gramos_diarios)),
    }));
    return {
      producto: { ...r.producto, formatos: conDuracion },
      score: r.score,
      match_pct: Math.min(100, Math.round((r.score / 10) * 100)),
      gramos_diarios: Number(r.gramos_diarios.toFixed(1)),
      razones: r.razones,
    };
  });

  return NextResponse.json({
    mascota_id: mascota.id,
    recomendaciones: enriquecidas,
  });
}
