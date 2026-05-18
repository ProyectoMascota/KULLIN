import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { requireUser } from '@/app/lib/supabase-server';
import { AppHeader } from '@/components/AppHeader';

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

  const totalGastado = (compras ?? []).reduce(
    (s, c: any) => s + (c.precio_pagado_clp ?? 0),
    0
  );

  return (
    <>
      <AppHeader
        rightSlot={
          <Link href={`/mascotas/${mascota.id}`} className="text-sm text-ink-soft underline">
            ← Volver
          </Link>
        }
      />
      <main className="container-app pt-2 animate-fade-up">
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Historial de <em className="text-terracotta italic font-normal">{mascota.nombre}</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-6">
          {compras?.length ?? 0} compras · {pesos?.length ?? 0} pesajes
        </p>

        {/* Total gastado */}
        {totalGastado > 0 && (
          <div className="card text-center">
            <span className="text-[12px] uppercase tracking-[0.08em] text-ink-soft font-semibold">
              Total gastado en alimento
            </span>
            <div className="font-display text-[40px] text-ink leading-none mt-2">
              {fmtCLP(totalGastado)}
            </div>
          </div>
        )}

        {/* Compras */}
        <h2 className="font-display text-lg text-ink mt-8 mb-3 px-1">Compras</h2>
        {compras && compras.length > 0 ? (
          <div className="space-y-2">
            {compras.map((c: any) => (
              <div key={c.id} className="bg-bg-card border rounded-2xl p-4">
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-terracotta">
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
    </>
  );
}

function fmtFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
}
function fmtCLP(n: number) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
  }).format(n);
}
