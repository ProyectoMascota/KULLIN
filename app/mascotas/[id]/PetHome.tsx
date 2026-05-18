'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RegistrarCompraModal } from '@/components/RegistrarCompraModal';
import { emojiOf } from '@/app/lib/species-config';

interface PetHomeProps {
  mascota: any;
  estado_comida: any;
  recomendaciones: any[];
}

export function PetHome({ mascota, estado_comida, recomendaciones }: PetHomeProps) {
  const router = useRouter();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);

  const top = recomendaciones[0];

  // Si hay producto activo, calcular ración con su kcal; si no, usar top recomendado
  const productoRacion = mascota.gramos_diarios_actual ? null : top;
  const gramos = mascota.gramos_diarios_actual
    ? Number(mascota.gramos_diarios_actual)
    : productoRacion?.gramos_diarios ?? 0;

  const tazas = (gramos / 150).toFixed(1);
  const merKcal = Math.round(Number(mascota.mer_kcal));
  const factor = (Number(mascota.mer_kcal) / Number(mascota.rer_kcal)).toFixed(2);

  // Barra de comida — colores según urgencia
  let barraColor = 'from-moss to-[#6b8c5a]';
  if (estado_comida) {
    if (estado_comida.nivel_barra < 20) barraColor = 'from-terracotta to-rose';
    else if (estado_comida.nivel_barra < 40) barraColor = 'from-gold to-[#e8c060]';
  }

  async function recomendar(producto: any) {
    const formato = producto.formatos?.sort((a: any, b: any) => b.kg - a.kg)[
      Math.min(1, producto.formatos.length - 1)
    ];
    try {
      const res = await fetch('/api/click-afiliado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto_id: producto.id,
          formato_kg: formato?.kg,
          mascota_id: mascota.id,
          origen: 'recomendacion',
        }),
      });
      const j = await res.json();
      if (j.redirect_url) {
        window.open(j.redirect_url, '_blank', 'noopener,noreferrer');
      }
    } catch {
      // sin link configurado todavía — abrir modal de registro manual
      setProductoSeleccionado(producto);
      setModalAbierto(true);
    }
  }

  return (
    <main className="container-app pt-2 animate-fade-up">
      {/* Hero */}
      <div className="text-center mb-6">
        <div className="mx-auto w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-6xl shadow-card relative">
          {emojiOf(mascota.especie)}
          <div className="absolute -inset-1 rounded-full border-2 border-terracotta/30" />
        </div>
        <h1 className="font-display text-[32px] text-ink tracking-tight mt-3.5">{mascota.nombre}</h1>
        <p className="text-sm text-ink-soft mt-0.5">
          {mascota.raza} · {Math.floor(mascota.edad_meses / 12)} años · {mascota.peso_kg}kg
        </p>
      </div>

      {/* Barra de comida */}
      <div className="card">
        <div className="flex justify-between items-baseline mb-3.5">
          <span className="text-[12px] uppercase tracking-[0.08em] text-ink-soft font-semibold">
            🍽️ Comida restante
          </span>
          {estado_comida ? (
            <span className="font-display text-[28px] text-ink leading-none">
              {estado_comida.dias_restantes}
              <span className="ml-1 text-[15px] text-ink-soft font-sans">días</span>
            </span>
          ) : (
            <span className="text-sm text-ink-soft">Sin registrar</span>
          )}
        </div>

        {estado_comida ? (
          <>
            <div className="h-3.5 bg-ink/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${barraColor} rounded-full transition-[width] duration-700`}
                style={{ width: `${estado_comida.nivel_barra}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[13px] text-ink-soft">
              <span>Comprado: {fmtFecha(estado_comida.fecha_compra)}</span>
              <span>Hasta: {fmtFecha(estado_comida.fecha_agotamiento)}</span>
            </div>
          </>
        ) : (
          <div className="py-1">
            <p className="text-sm text-ink-soft mb-3">
              Aún no has registrado ninguna compra. Cuando lo hagas, verás aquí cuánta comida le queda.
            </p>
            <button
              onClick={() => setModalAbierto(true)}
              className="btn-secondary"
            >
              + Registrar primera compra
            </button>
          </div>
        )}
      </div>

      {/* Ración diaria */}
      <div className="card">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[12px] uppercase tracking-[0.08em] text-ink-soft font-semibold">
            📊 Hoy debe comer
          </span>
        </div>
        <div className="font-display text-[56px] leading-none tracking-tight text-ink my-2">
          {Math.round(gramos)}
          <span className="ml-1 text-xl text-ink-soft font-sans">g</span>
        </div>
        <p className="text-[13px] text-ink-soft">
          ≈ {tazas} tazas · {merKcal} kcal/día
          <span className="ml-2 inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-moss/10 text-moss-deep">
            MER = RER × {factor}
          </span>
        </p>
      </div>

      {/* Producto recomendado (top) */}
      {top && (
        <div className="relative overflow-hidden rounded-3xl border border-gold bg-gradient-to-br from-bg-card to-[#f0e6d2] p-[18px] mb-3.5">
          <span className="absolute top-3.5 -right-7 bg-moss-deep text-bg text-[10px] font-bold tracking-[0.1em] px-8 py-1 rotate-[35deg]">
            TOP MATCH
          </span>
          <div className="flex gap-3.5 items-start">
            <div className="w-[72px] h-[72px] bg-white rounded-xl border grid place-items-center text-4xl flex-shrink-0">
              🥣
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-terracotta">
                {top.producto.marca}
              </div>
              <div className="font-display text-lg text-ink leading-tight my-1">
                {top.producto.linea}
              </div>
              <div className="text-xs text-ink-soft">
                Match <strong className="text-moss-deep">{top.match_pct}%</strong>
                {' · '}
                {top.producto.kcal_por_100g} kcal/100g
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {top.razones.slice(0, 3).map((r: string, i: number) => (
              <span key={i} className="reason-tag">{r}</span>
            ))}
          </div>
          <button
            onClick={() => recomendar(top.producto)}
            className="btn-moss mt-3.5"
          >
            Recomendar a {mascota.nombre} →
          </button>
        </div>
      )}

      {/* Acciones secundarias */}
      <div className="grid grid-cols-2 gap-2.5 mt-2">
        <button
          onClick={() => setModalAbierto(true)}
          className="py-3.5 bg-bg-card border rounded-2xl text-sm font-medium text-ink text-center"
        >
          + Marcar compra
        </button>
        <Link
          href={`/mascotas/${mascota.id}/historial`}
          className="py-3.5 bg-bg-card border rounded-2xl text-sm font-medium text-ink text-center"
        >
          📈 Historial
        </Link>
      </div>

      {/* Otras recomendaciones */}
      {recomendaciones.length > 1 && (
        <div className="mt-6">
          <h2 className="font-display text-lg text-ink mb-3 px-1">Otras opciones</h2>
          <div className="space-y-2">
            {recomendaciones.slice(1).map((r) => (
              <div key={r.producto.id} className="bg-bg-card border rounded-2xl p-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg border grid place-items-center text-xl flex-shrink-0">
                  🥣
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-terracotta">
                    {r.producto.marca}
                  </div>
                  <div className="text-sm text-ink truncate">{r.producto.linea}</div>
                  <div className="text-[11px] text-ink-soft">
                    {r.match_pct}% match · {Math.round(r.gramos_diarios)}g/día
                  </div>
                </div>
                <button
                  onClick={() => recomendar(r.producto)}
                  className="text-[12px] text-moss-deep font-semibold underline px-2"
                >
                  Ver
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-[11px] text-ink-soft text-center mt-8 px-4 leading-relaxed">
        Estimación basada en peso y actividad reportados. <br />
        Pesa a tu mascota mensualmente para mantener la ración ajustada.
      </p>

      {modalAbierto && (
        <RegistrarCompraModal
          mascota={mascota}
          productoPreseleccionado={productoSeleccionado ?? top?.producto}
          recomendaciones={recomendaciones}
          onClose={() => {
            setModalAbierto(false);
            setProductoSeleccionado(null);
          }}
          onSuccess={() => {
            setModalAbierto(false);
            router.refresh();
          }}
        />
      )}
    </main>
  );
}

function fmtFecha(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { day: 'numeric', month: 'short' });
}
