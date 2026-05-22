'use client';
import { useState, useEffect, useMemo } from 'react';
import { recomendarProductos, type Producto } from '@/app/lib/nutrition';
import { emojiOf } from '@/app/lib/species-config';
import { formatName } from '@/app/lib/format-text';
import { BottomNav } from '@/components/BottomNav';
import { getActivePetId, setActivePetId } from '@/app/lib/active-pet';

interface Mascota {
  id: string;
  nombre: string;
  especie: 'perro' | 'gato';
  tamano: any;
  peso_kg: number;
  edad_meses: number;
  actividad: any;
  esterilizado: boolean;
  condicion: any;
}

interface Props {
  mascotas: Mascota[];
  productos: Producto[];
}

export function TiendaClient({ mascotas, productos }: Props) {
  // 1. Resolver mascota activa
  const [activeId, setActiveId] = useState<string>(mascotas[0]?.id ?? '');

  useEffect(() => {
    const stored = getActivePetId();
    // Usar la guardada si todavía existe en la lista del usuario
    if (stored && mascotas.some((m) => m.id === stored)) {
      setActiveId(stored);
    } else if (mascotas[0]) {
      setActiveId(mascotas[0].id);
      setActivePetId(mascotas[0].id);
    }
  }, [mascotas]);

  const mascotaActiva = mascotas.find((m) => m.id === activeId) ?? mascotas[0];

  // 2. Calcular ranking de productos para esa mascota
  const ranking = useMemo(() => {
    if (!mascotaActiva) return [];
    return recomendarProductos(
      {
        especie: mascotaActiva.especie,
        tamano: mascotaActiva.tamano,
        peso_kg: mascotaActiva.peso_kg,
        edad_meses: mascotaActiva.edad_meses,
        actividad: mascotaActiva.actividad,
        esterilizado: mascotaActiva.esterilizado,
        condicion: mascotaActiva.condicion,
      },
      productos,
      productos.length
    ).map((r) => ({
      ...r,
      match_pct: Math.min(100, Math.round((r.score / 10) * 100)),
    }));
  }, [mascotaActiva, productos]);

  if (!mascotaActiva) {
    return (
      <main className="container-app pt-4 animate-fade-up">
        <p className="text-ink-soft">Cargando…</p>
      </main>
    );
  }

  const nombre = formatName(mascotaActiva.nombre);

  // ID del top recomendado (badge "Mejor para X")
  const topId = ranking[0]?.producto.id;

  async function abrirAfiliado(producto: Producto) {
    const formato = producto.formatos?.sort((a, b) => b.kg - a.kg)[
      Math.min(1, producto.formatos.length - 1)
    ];
    try {
      const res = await fetch('/api/click-afiliado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          producto_id: producto.id,
          formato_kg: formato?.kg,
          mascota_id: mascotaActiva.id,
          origen: 'tienda',
        }),
      });
      const j = await res.json();
      if (j.redirect_url) {
        window.open(j.redirect_url, '_blank', 'noopener,noreferrer');
      } else {
        alert('Este producto aún no tiene tienda asociada. Pronto.');
      }
    } catch {
      alert('No pudimos abrir el link. Intenta de nuevo.');
    }
  }

  return (
    <>
      <main className="container-app pt-2 animate-fade-up">
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Tienda
        </h1>
        <p className="text-ink-soft text-[15px] mb-6">
          Recomendado para <em className="text-terracotta italic font-normal">{nombre}</em>{' '}
          {emojiOf(mascotaActiva.especie)}
        </p>

        {/* Selector de mascota si hay >1 */}
        {mascotas.length > 1 && (
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
            {mascotas.map((m) => {
              const isActive = m.id === activeId;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveId(m.id);
                    setActivePetId(m.id);
                  }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-moss-deep border-moss-deep text-bg'
                      : 'bg-bg-card text-ink-soft'
                  }`}
                >
                  <span>{emojiOf(m.especie)}</span>
                  {formatName(m.nombre)}
                </button>
              );
            })}
          </div>
        )}

        {/* Catálogo */}
        {ranking.length === 0 ? (
          <div className="card text-center py-10">
            <p className="text-sm text-ink-soft">
              No hay productos compatibles con el perfil de {nombre} todavía.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {ranking.map((r) => {
              const esTop = r.producto.id === topId && r.match_pct >= 70;
              return (
                <div key={r.producto.id} className="bg-bg-card border rounded-2xl p-4">
                  <div className="flex gap-3 items-start">
                    <div className="w-[60px] h-[60px] bg-white rounded-xl border grid place-items-center text-3xl flex-shrink-0">
                      🥣
                    </div>
                    <div className="flex-1 min-w-0">
                      {esTop && (
                        <div className="inline-block bg-moss-deep text-bg text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1">
                          Mejor para {nombre}
                        </div>
                      )}
                      <div className="text-[12px] font-semibold tracking-[0.02em] text-terracotta">
                        {r.producto.marca}
                      </div>
                      <div className="font-display text-base text-ink leading-tight">
                        {r.producto.linea}
                      </div>
                      <div className="text-[12px] text-ink-soft mt-0.5">
                        Match {r.match_pct}% · {r.producto.kcal_por_100g} kcal/100g
                      </div>
                    </div>
                  </div>

                  {r.razones.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {r.razones.slice(0, 3).map((razon, i) => (
                        <span key={i} className="reason-tag">
                          {razon}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => abrirAfiliado(r.producto)}
                    className="btn-moss mt-3"
                  >
                    Ver donde comprarlo →
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <p className="text-[11px] text-ink-soft text-center mt-8 px-4 leading-relaxed">
          Al tocar &quot;Ver donde comprarlo&quot; te llevamos al sitio del vendedor.
          <br />
          Los precios y stock pueden variar.
        </p>
      </main>
      <BottomNav activePetId={mascotaActiva.id} />
    </>
  );
}
