'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RegistrarCompraModal } from '@/components/RegistrarCompraModal';
import { BottomNav } from '@/components/BottomNav';
import { emojiOf } from '@/app/lib/species-config';
import { formatName, dias } from '@/app/lib/format-text';
import { setActivePetId } from '@/app/lib/active-pet';
import { calcularEstadoEmocional } from '@/app/lib/emotional-state';

interface PetHomeProps {
  mascota: any;
  estado_comida: any;
  recomendaciones: any[];
}

export function PetHome({ mascota, estado_comida, recomendaciones }: PetHomeProps) {
  const router = useRouter();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);

  // Registrar esta mascota como activa al cargar
  useEffect(() => {
    if (mascota?.id) setActivePetId(mascota.id);
  }, [mascota?.id]);

  const top = recomendaciones[0];

  // Si hay producto activo, calcular ración con su kcal; si no, usar top recomendado
  const productoRacion = mascota.gramos_diarios_actual ? null : top;
  const gramos = mascota.gramos_diarios_actual
    ? Number(mascota.gramos_diarios_actual)
    : productoRacion?.gramos_diarios ?? 0;

  const tazas = (gramos / 150).toFixed(1);
  const merKcal = Math.round(Number(mascota.mer_kcal));
  const factor = (Number(mascota.mer_kcal) / Number(mascota.rer_kcal)).toFixed(2);

  // Estado emocional según % comida restante (null si no hay compra registrada)
  const emocional = calcularEstadoEmocional(estado_comida?.nivel_barra ?? null);

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
      {/* Hero — avatar + nombre */}
      <div className="text-center mb-5">
        <div className="mx-auto w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-6xl shadow-card relative">
          {emojiOf(mascota.especie)}
          <div className="absolute -inset-1 rounded-full border-2 border-terracotta/30" />
        </div>
        <h1 className="font-display text-[32px] text-ink tracking-tight mt-3.5">{formatName(mascota.nombre)}</h1>
        <p className="text-sm text-ink-soft mt-0.5">
          {mascota.raza} · {Math.floor(mascota.edad_meses / 12)} años · {mascota.peso_kg}kg
        </p>
      </div>

      {/* Card emocional — estado + barra alimento + tiempo restante */}
      <div className="card">
        {/* Estado emocional grande */}
        <div className="text-center mb-4">
          <div className="text-5xl leading-none mb-2" aria-hidden="true">
            {emocional.emoji}
          </div>
          <div className="font-display text-xl text-ink leading-tight">
            {emocional.texto}
          </div>
        </div>

        {estado_comida ? (
          <>
            {/* Barra de alimento */}
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[13px] text-ink-soft">Alimento</span>
              <span className="text-[13px] text-ink-soft font-medium">{estado_comida.nivel_barra}%</span>
            </div>
            <div className="h-3 bg-ink/10 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full bg-gradient-to-r ${emocional.barraColor} rounded-full transition-[width] duration-700`}
                style={{ width: `${estado_comida.nivel_barra}%` }}
              />
            </div>

            {/* Tiempo restante */}
            <div className="flex justify-between items-baseline">
              <span className="text-[13px] text-ink-soft">Tiempo restante</span>
              <span className="font-display text-[20px] text-ink leading-none">
                {estado_comida.dias_restantes}
                <span className="ml-1 text-[13px] text-ink-soft font-sans">
                  {dias(estado_comida.dias_restantes)}
                </span>
              </span>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-sm text-ink-soft mb-3">
              Cuando registres una compra, verás aquí su estado.
            </p>
            <button
              onClick={() => setModalAbierto(true)}
              className="btn-secondary"
            >
              Registrar primera compra
            </button>
          </div>
        )}
      </div>

      {/* Ración diaria */}
      <div className="card">
        <div className="flex justify-between items-baseline mb-1">
          <span className="section-eyebrow">
            Hoy come
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
          <span className="absolute top-3.5 -right-7 bg-moss-deep text-bg text-[10px] font-semibold tracking-[0.05em] px-8 py-1 rotate-[35deg]">
            Mejor opción
          </span>
          <div className="flex gap-3.5 items-start">
            <div className="w-[72px] h-[72px] bg-white rounded-xl border grid place-items-center text-4xl flex-shrink-0">
              🥣
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12px] font-semibold tracking-[0.02em] text-terracotta">
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
            Recomendar a {formatName(mascota.nombre)} →
          </button>
        </div>
      )}

      {/* Acciones secundarias */}
      <div className="grid grid-cols-2 gap-2.5 mt-2">
        <button
          onClick={() => setModalAbierto(true)}
          className="py-3.5 bg-bg-card border rounded-2xl text-sm font-medium text-ink text-center"
        >
          Registrar compra
        </button>
        <Link
          href={`/mascotas/${mascota.id}/historial`}
          className="py-3.5 bg-bg-card border rounded-2xl text-sm font-medium text-ink text-center"
        >
          Historial
        </Link>
      </div>

      {/* Link a Tienda: solo aparece si hay más opciones disponibles */}
      {recomendaciones.length > 1 && (
        <Link
          href="/tienda"
          className="mt-5 flex items-center justify-between px-4 py-3 rounded-2xl bg-bg-card border border-ink/10 hover:border-moss transition-colors"
        >
          <div>
            <div className="text-sm text-ink">Ver más opciones</div>
            <div className="text-[12px] text-ink-soft mt-0.5">
              {recomendaciones.length - 1} alternativa{recomendaciones.length - 1 === 1 ? '' : 's'} para {formatName(mascota.nombre)}
            </div>
          </div>
          <span className="text-ink-soft text-xl">→</span>
        </Link>
      )}

      <p className="text-[11px] text-ink-soft text-center mt-8 px-4 leading-relaxed">
        Estimación basada en sus datos actuales. <br />
        Pesarla cada 1-2 meses ayuda a mantener la ración ajustada.
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

      <BottomNav activePetId={mascota.id} />
    </main>
  );
}
