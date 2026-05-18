// =====================================================================
// app/api/mascotas/route.ts
// GET   /api/mascotas              — listar mascotas del usuario
// POST  /api/mascotas              — crear nueva mascota
// =====================================================================
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/app/lib/supabase-server';
import { calcularRER, calcularMER } from '@/app/lib/nutrition';

// --------- Schema de validación con Zod ---------
// NOTA: Si agregas una especie nueva en species-config.ts,
// también debes agregarla aquí en el enum de Zod (no podemos hacerlo
// dinámico por limitaciones del sistema de tipos de Zod).
const MascotaInputSchema = z.object({
  nombre: z.string().min(1).max(60),
  avatar_url: z.string().url().optional().nullable(),
  especie: z.enum(['perro', 'gato']),
  raza: z.string().min(1).max(80),
  tamano: z.enum(['pequeno', 'mediano', 'grande']),
  peso_kg: z.number().positive().max(100),
  edad_meses: z.number().int().min(0).max(360),
  actividad: z.enum(['bajo', 'moderado', 'alto']).default('moderado'),
  esterilizado: z.boolean().default(false),
  condicion: z
    .enum(['ninguna', 'sobrepeso', 'sensible_digestivo', 'pelo_largo', 'articulaciones'])
    .default('ninguna'),
});

// =====================================================================
// GET /api/mascotas
// =====================================================================
export async function GET() {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  const { data, error } = await supabase
    .from('mascotas')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ mascotas: data });
}

// =====================================================================
// POST /api/mascotas
// =====================================================================
export async function POST(request: Request) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse) return errorResponse;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = MascotaInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', detalles: parsed.error.format() },
      { status: 422 }
    );
  }
  const input = parsed.data;

  // Pre-calcular RER y MER (cacheado en la fila)
  const rer = calcularRER(input.peso_kg);
  const mer = calcularMER({
    especie: input.especie,
    tamano: input.tamano,
    peso_kg: input.peso_kg,
    edad_meses: input.edad_meses,
    actividad: input.actividad,
    esterilizado: input.esterilizado,
    condicion: input.condicion,
  });

  const { data, error } = await supabase
    .from('mascotas')
    .insert({
      user_id: user!.id,
      ...input,
      rer_kcal: Number(rer.toFixed(2)),
      mer_kcal: Number(mer.toFixed(2)),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Registrar peso inicial en historial
  await supabase.from('historial_peso').insert({
    mascota_id: data.id,
    peso_kg: input.peso_kg,
    condicion: input.condicion,
  });

  return NextResponse.json({ mascota: data }, { status: 201 });
}
