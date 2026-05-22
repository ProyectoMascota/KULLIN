// =====================================================================
// app/api/click-afiliado/route.ts
// POST — registrar click en link de afiliado y redirigir
//
// Uso: cuando el usuario toca "Recomendar a Luna" en la UI:
//   1. Frontend hace POST con { producto_id, mascota_id, origen }
//   2. Backend devuelve { redirect_url, click_id }
//   3. Frontend abre redirect_url (link de afiliado)
//   4. Si el usuario completa la compra, registra compra con click_afiliado_id
// =====================================================================
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/app/lib/supabase-server';

const ClickSchema = z.object({
  producto_id: z.string().uuid(),
  formato_kg: z.number().positive().optional(),
  mascota_id: z.string().uuid().optional(),
  origen: z.enum(['recomendacion', 'recordatorio_email', 'busqueda_directa', 'home', 'tienda']).default('recomendacion'),
});

export async function POST(request: Request) {
  const supabase = getSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  const body = await request.json().catch(() => null);
  const parsed = ClickSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 422 });
  }

  const { data: producto } = await supabase
    .from('productos')
    .select('formatos, marca, linea')
    .eq('id', parsed.data.producto_id)
    .single();

  if (!producto) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });

  // Elegir formato: el que coincide con formato_kg, o el más popular (segundo más grande)
  const formatos = (producto.formatos as any[]) || [];
  const formato =
    formatos.find((f) => f.kg === parsed.data.formato_kg) ??
    formatos.sort((a, b) => b.kg - a.kg)[Math.min(1, formatos.length - 1)];

  if (!formato?.link_afiliado) {
    return NextResponse.json({ error: 'Producto sin link disponible' }, { status: 422 });
  }

  // Registrar click
  const userAgent = request.headers.get('user-agent') ?? null;
  const { data: click } = await supabase
    .from('clicks_afiliado')
    .insert({
      user_id: user?.id ?? null,
      mascota_id: parsed.data.mascota_id ?? null,
      producto_id: parsed.data.producto_id,
      origen: parsed.data.origen,
      user_agent: userAgent,
    })
    .select('id')
    .single();

  // Construir URL final con UTM
  const url = new URL(formato.link_afiliado);
  url.searchParams.set('utm_source', 'kullin');
  url.searchParams.set('utm_medium', parsed.data.origen);
  if (click?.id) url.searchParams.set('utm_content', click.id);

  return NextResponse.json({
    click_id: click?.id,
    redirect_url: url.toString(),
    formato,
  });
}
