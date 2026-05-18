// =====================================================================
// app/api/cron/recordatorios/route.ts
// GET — corre diariamente vía Vercel Cron (vercel.json: "0 13 * * *" = 10am CL)
//
// Para autorizar: Vercel envía Authorization: Bearer ${CRON_SECRET}
// Configurar en vercel.json y en variables de entorno.
// =====================================================================
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/app/lib/supabase-server';
import { enviarEmailRecordatorio } from '@/app/lib/email';
import { diasRestantes } from '@/app/lib/nutrition';

export async function GET(request: Request) {
  // Validar token de Vercel Cron
  const auth = request.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  const hoy = new Date().toISOString().split('T')[0];

  // 1. Buscar recordatorios pendientes con fecha_disparo <= hoy
  const { data: pendientes, error } = await supabase
    .from('recordatorios')
    .select(`
      id, user_id, mascota_id, compra_id, tipo, canal,
      mascotas ( nombre, especie, avatar_url ),
      compras ( fecha_estimada_agotamiento, cantidad_kg,
        productos ( id, marca, linea, kcal_por_100g, formatos ) ),
      profiles!recordatorios_user_id_fkey ( email, nombre, notif_email )
    `)
    .eq('estado', 'pendiente')
    .lte('fecha_disparo', hoy)
    .limit(100); // batch máximo por ejecución

  if (error) {
    console.error('[cron] error consultando recordatorios:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let enviados = 0;
  let omitidos = 0;
  let fallidos = 0;

  for (const rec of pendientes ?? []) {
    const mascota = (rec.mascotas as any);
    const compra = (rec.compras as any);
    const profile = (rec.profiles as any);

    if (!profile?.notif_email || !profile?.email) {
      // Usuario desactivó emails — marcar como descartado
      await supabase
        .from('recordatorios')
        .update({ estado: 'descartado' })
        .eq('id', rec.id);
      omitidos++;
      continue;
    }

    const dias = diasRestantes(new Date(compra.fecha_estimada_agotamiento));
    try {
      await enviarEmailRecordatorio({
        to: profile.email,
        nombre_dueno: profile.nombre ?? 'Hola',
        nombre_mascota: mascota.nombre,
        especie: mascota.especie,
        dias_restantes: dias,
        producto: compra.productos,
        click_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/click-afiliado/redirect?producto=${compra.productos.id}&origen=recordatorio_email&recordatorio=${rec.id}`,
      });

      await supabase
        .from('recordatorios')
        .update({ estado: 'enviado', enviado_at: new Date().toISOString() })
        .eq('id', rec.id);

      enviados++;
    } catch (err) {
      console.error('[cron] error enviando recordatorio', rec.id, err);
      fallidos++;
    }
  }

  return NextResponse.json({
    procesados: pendientes?.length ?? 0,
    enviados,
    omitidos,
    fallidos,
  });
}
