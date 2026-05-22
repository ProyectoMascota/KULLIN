// =====================================================================
// app/api/compras/route.ts
// POST — registrar una compra (manual o desde callback de afiliado)
// =====================================================================
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/app/lib/supabase-server';
import { calcularGramosDiarios, calcularFechaAgotamiento } from '@/app/lib/nutrition';

const CompraSchema = z.object({
  mascota_id: z.string().uuid(),
  producto_id: z.string().uuid(),
  cantidad_kg: z.number().positive().max(50),
  precio_pagado_clp: z.number().int().positive().optional(),
  fecha_compra: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  origen: z.enum(['amazon', 'mercadolibre', 'veterinaria', 'manual', 'otro']).default('manual'),
  click_afiliado_id: z.string().uuid().optional(),
  notas: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  const body = await request.json().catch(() => null);
  const parsed = CompraSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: parsed.error.format() },
      { status: 422 }
    );
  }
  const input = parsed.data;

  // 1. Cargar mascota y producto para calcular gramos diarios y duración
  const [mascotaRes, productoRes] = await Promise.all([
    supabase.from('mascotas').select('*').eq('id', input.mascota_id).eq('user_id', user!.id).single(),
    supabase.from('productos').select('*').eq('id', input.producto_id).single(),
  ]);

  if (mascotaRes.error || !mascotaRes.data) {
    return NextResponse.json({ error: 'Mascota no encontrada' }, { status: 404 });
  }
  if (productoRes.error || !productoRes.data) {
    return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
  }

  const mascota = mascotaRes.data;
  const producto = productoRes.data;

  // 2. Calcular gramos diarios para este producto y mascota
  const gramos = calcularGramosDiarios(
    {
      especie: mascota.especie,
      tamano: mascota.tamano,
      peso_kg: mascota.peso_kg,
      edad_meses: mascota.edad_meses,
      actividad: mascota.actividad,
      esterilizado: mascota.esterilizado,
      condicion: mascota.condicion,
    },
    producto.kcal_por_100g
  );

  // 3. Calcular fecha de agotamiento
  const fecha_compra = input.fecha_compra ? new Date(input.fecha_compra) : new Date();
  const { fecha: fecha_agot, dias_totales } = calcularFechaAgotamiento(
    fecha_compra,
    input.cantidad_kg,
    gramos
  );

  // 4. Insertar compra
  const { data: compra, error: errInsert } = await supabase
    .from('compras')
    .insert({
      user_id: user!.id,
      mascota_id: input.mascota_id,
      producto_id: input.producto_id,
      cantidad_kg: input.cantidad_kg,
      precio_pagado_clp: input.precio_pagado_clp,
      fecha_compra: fecha_compra.toISOString().split('T')[0],
      fecha_estimada_agotamiento: fecha_agot.toISOString().split('T')[0],
      origen: input.origen,
      click_afiliado_id: input.click_afiliado_id,
      notas: input.notas,
    })
    .select()
    .single();

  if (errInsert) {
    return NextResponse.json({ error: errInsert.message }, { status: 500 });
  }

  // 5. Actualizar mascota: producto_activo_id y gramos_diarios_actual
  await supabase
    .from('mascotas')
    .update({
      producto_activo_id: input.producto_id,
      gramos_diarios_actual: Number(gramos.toFixed(2)),
      updated_at: new Date().toISOString(),
    })
    .eq('id', input.mascota_id);

  // 6. Crear recordatorio de recompra
  const { data: profile } = await supabase
    .from('profiles')
    .select('notif_dias_antes, notif_email')
    .eq('id', user!.id)
    .single();

  const diasAntes = profile?.notif_dias_antes ?? 5;
  const fecha_disparo = new Date(fecha_agot);
  fecha_disparo.setDate(fecha_disparo.getDate() - diasAntes);

  if (profile?.notif_email) {
    await supabase.from('recordatorios').insert({
      user_id: user!.id,
      mascota_id: input.mascota_id,
      compra_id: compra.id,
      tipo: 'recompra',
      fecha_disparo: fecha_disparo.toISOString().split('T')[0],
      canal: 'email',
    });
  }

  return NextResponse.json(
    {
      compra,
      gramos_diarios: Number(gramos.toFixed(1)),
      dias_duracion: dias_totales,
      fecha_agotamiento: fecha_agot.toISOString().split('T')[0],
    },
    { status: 201 }
  );
}
