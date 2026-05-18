// =====================================================================
// app/api/mascotas/[id]/route.ts
// GET    /api/mascotas/:id   — detalle + barra de comida
// PATCH  /api/mascotas/:id   — actualizar perfil (recalcula MER)
// DELETE /api/mascotas/:id   — eliminar mascota
// =====================================================================
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/app/lib/supabase-server';
import {
  calcularRER,
  calcularMER,
  calcularGramosDiarios,
  diasRestantes,
  nivelBarraComida,
} from '@/app/lib/nutrition';

const PatchSchema = z
  .object({
    nombre: z.string().min(1).max(60).optional(),
    peso_kg: z.number().positive().max(100).optional(),
    edad_meses: z.number().int().min(0).max(360).optional(),
    actividad: z.enum(['bajo', 'moderado', 'alto']).optional(),
    esterilizado: z.boolean().optional(),
    condicion: z
      .enum(['ninguna', 'sobrepeso', 'sensible_digestivo', 'pelo_largo', 'articulaciones'])
      .optional(),
    producto_activo_id: z.string().uuid().nullable().optional(),
  })
  .strict();

// =====================================================================
// GET — devuelve mascota + estado actual de comida
// =====================================================================
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  const { data: mascota, error } = await supabase
    .from('mascotas')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user!.id)
    .single();

  if (error || !mascota) {
    return NextResponse.json({ error: 'Mascota no encontrada' }, { status: 404 });
  }

  // Última compra activa para calcular barra
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
      producto: ultima.productos,
      kg_comprados: ultima.cantidad_kg,
    };
  }

  return NextResponse.json({ mascota, estado_comida });
}

// =====================================================================
// PATCH — actualiza perfil y recalcula nutrición
// =====================================================================
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  const body = await request.json().catch(() => null);
  const parsed = PatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: parsed.error.format() },
      { status: 422 }
    );
  }

  // Cargar mascota actual para mezclar campos
  const { data: actual, error: err1 } = await supabase
    .from('mascotas')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user!.id)
    .single();
  if (err1 || !actual) {
    return NextResponse.json({ error: 'Mascota no encontrada' }, { status: 404 });
  }

  const merged = { ...actual, ...parsed.data };

  // Recalcular RER y MER
  const rer = calcularRER(merged.peso_kg);
  const mer = calcularMER({
    especie: merged.especie,
    tamano: merged.tamano,
    peso_kg: merged.peso_kg,
    edad_meses: merged.edad_meses,
    actividad: merged.actividad,
    esterilizado: merged.esterilizado,
    condicion: merged.condicion,
  });

  // Si tiene producto activo, recalcular gramos diarios
  let gramos_diarios_actual = null;
  if (merged.producto_activo_id) {
    const { data: prod } = await supabase
      .from('productos')
      .select('kcal_por_100g')
      .eq('id', merged.producto_activo_id)
      .single();
    if (prod) {
      gramos_diarios_actual = calcularGramosDiarios(
        {
          especie: merged.especie,
          tamano: merged.tamano,
          peso_kg: merged.peso_kg,
          edad_meses: merged.edad_meses,
          actividad: merged.actividad,
          esterilizado: merged.esterilizado,
          condicion: merged.condicion,
        },
        prod.kcal_por_100g
      );
    }
  }

  const { data: updated, error: err2 } = await supabase
    .from('mascotas')
    .update({
      ...parsed.data,
      rer_kcal: Number(rer.toFixed(2)),
      mer_kcal: Number(mer.toFixed(2)),
      gramos_diarios_actual: gramos_diarios_actual
        ? Number(gramos_diarios_actual.toFixed(2))
        : actual.gramos_diarios_actual,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .eq('user_id', user!.id)
    .select()
    .single();

  if (err2) return NextResponse.json({ error: err2.message }, { status: 500 });

  // Si cambió el peso, registrar en historial
  if (parsed.data.peso_kg && parsed.data.peso_kg !== actual.peso_kg) {
    await supabase.from('historial_peso').insert({
      mascota_id: params.id,
      peso_kg: parsed.data.peso_kg,
      condicion: merged.condicion,
    });
  }

  return NextResponse.json({ mascota: updated });
}

// =====================================================================
// DELETE
// =====================================================================
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  const { error } = await supabase
    .from('mascotas')
    .delete()
    .eq('id', params.id)
    .eq('user_id', user!.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
