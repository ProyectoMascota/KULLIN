import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { requireUser } from '@/app/lib/supabase-server';
import { AppShellHeader } from '@/components/AppShellHeader';
import { BottomNav } from '@/components/BottomNav';
import { formatName, plural } from '@/app/lib/format-text';
import { calcularInsights } from '@/app/lib/insights';

export const dynamic = 'force-dynamic';

export default async function HistorialPage({ params }: { params: { id: string } }) {
  const { user, supabase, errorResponse } = await requireUser();
  if (errorResponse || !user) redirect('/login');

  const { data: mascota } = await supabase
    .from('mascotas')
    .select('id, nombre, especie')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();
  if (!mascota) notFound();

  // Nombre del dueño para avatar header
  const { data: profile } = await supabase
    .from('profiles')
    .select('nombre')
    .eq('id', user.id)
    .single();
  const ownerName = profile?.nombre ?? user.email ?? null;

  const [{ data: compras }, { data: pesos }] = await Promise.all([
    supabase
      .from('compras')
      .select('id, fecha_compra, cantidad_kg, precio_pagado_clp, fecha_estimada_agotamiento, productos(marca, linea)')
      .eq('mascota_id', mascota.id)
      .order('fecha_compra', { ascending: false })
      .limit(20),
    supabase
      .from('historial_peso')
      .select('id, peso_kg, fecha, condicion')
      .eq('mascota_id', mascota.id)
      .order('fecha', { ascending: false })
      .limit(20),
  ]);

  // Insights derivados (función pura)
  const insights = calcularInsights(
    (compras ?? []).map((c: any) => ({
      id: c.id,
      fecha_compra: c.fecha_compra,
      cantidad_kg: c.cantidad_kg,
      precio_pagado_clp: c.precio_pagado_clp,
    }))
  );

  return (
    <>
      <AppShellHeader ownerName={ownerName} />
      <main className="container-app pt-2 animate-fade-up">
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Historial de <em className="text-terracotta italic font-normal">{formatName(mascota.nombre)}</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-6">
          {plural(compras?.length ?? 0, 'compra')} · {plural(pesos?.length ?? 0, 'pesaje')}
        </p>

        {/* Insights — 4 cards en grid 2x2 */}
        {insights.totalCompras > 0 && (
          <div className="bg-bg-card border rounded-3xl p-4 mb-6">
            <span className="section-eyebrow block mb-3">Resumen</span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <Insight
                titulo="Última compra"
                valor={insights.ultimaCompra ? fmtFechaCorta(insights.ultimaCompra) : '—'}
              />
              <Insight
                titulo="Duración promedio"
                valor={
                  insights.duracionPromedioDias != null
                    ? `${insights.duracionPromedioDias} ${insights.duracionPromedioDias === 1 ? 'día' : 'días'}`
                    : '—'
                }
              />
              <Insight
                titulo="Total compras"
                valor={String(insights.totalCompras)}
              />
              <Insight
                titulo="Total gastado"
                valor={insights.totalGastadoClp != null ? fmtCLP(insights.totalGastadoClp) : '—'}
              />
            </div>
          </div>
        )}

        {/* Compras */}
        <h2 className="font-display text-lg text-ink mt-2 mb-3 px-1">Compras</h2>
        {compras && compras.length > 0 ? (
          <div className="space-y-2">
            {compras.map((c: any) => (
              <div key={c.id} className="bg-bg-card border rounded-2xl p-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <div className="text-[12px] font-semibold tracking-[0.02em] text-terracotta">
                      {c.productos?.marca}
                    </div>
                    <div className="text-sm text-ink truncate">{c.productos?.linea}</div>
                    <div className="text-[12px] text-ink-soft mt-1">
                      {fmtFecha(c.fecha_compra)} · {c.cantidad_kg} kg
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {c.precio_pagado_clp ? (
                      <div className="font-display text-base text-ink">
                        {fmtCLP(c.precio_pagado_clp)}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-soft px-1">Aún no hay compras registradas.</p>
        )}

        {/* Pesajes */}
        <h2 className="font-display text-lg text-ink mt-8 mb-3 px-1">Pesajes</h2>
        {pesos && pesos.length > 0 ? (
          <div className="space-y-2">
            {pesos.map((p: any) => (
              <div key={p.id} className="bg-bg-card border rounded-2xl p-3 flex justify-between items-center">
                <div>
                  <div className="font-display text-lg text-ink">{p.peso_kg} kg</div>
                  {p.condicion && p.condicion !== 'ninguna' && (
                    <div className="text-[11px] text-terracotta capitalize">
                      {p.condicion.replace('_', ' ')}
                    </div>
                  )}
                </div>
                <div className="text-[12px] text-ink-soft">{fmtFecha(p.fecha)}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-soft px-1">Sin pesajes registrados.</p>
        )}
      </main>
      <BottomNav activePetId={mascota.id} />
    </>
  );
}

function fmtFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtFechaCorta(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
}
function fmtCLP(n: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
  }).format(n);
}

function Insight({ titulo, valor }: { titulo: string; valor: string }) {
  return (
    <div>
      <div className="text-[12px] text-ink-soft mb-1">{titulo}</div>
      <div className="font-display text-[20px] text-ink leading-tight">{valor}</div>
    </div>
  );
}
