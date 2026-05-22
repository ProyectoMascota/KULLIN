'use client';
import { useEffect } from 'react';

interface ProductoOpcion {
  producto: {
    id: string;
    marca: string;
    linea: string;
    kcal_por_100g: number;
  };
  match_pct?: number;
}

interface Props {
  abierto: boolean;
  opciones: ProductoOpcion[];
  productoIdActual?: string;
  onElegir: (producto: ProductoOpcion['producto']) => void;
  onCerrar: () => void;
}

/**
 * Bottom-sheet de selección de producto.
 * Se monta como overlay encima del modal de compra.
 * - Cierra al elegir o tocar el backdrop.
 * - Bloquea el scroll del body mientras está abierto.
 * - Slide-up animation desde abajo.
 */
export function ProductoSelectorSheet({
  abierto,
  opciones,
  productoIdActual,
  onElegir,
  onCerrar,
}: Props) {
  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (!abierto) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [abierto]);

  // ESC para cerrar
  useEffect(() => {
    if (!abierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCerrar();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="fixed inset-0 z-[300] bg-ink/50 backdrop-blur-sm flex items-end justify-center animate-fade-in"
      onClick={onCerrar}
      role="dialog"
      aria-modal="true"
      aria-label="Elegir producto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg w-full max-w-[440px] rounded-t-3xl pt-3 pb-6 max-h-[80vh] flex flex-col animate-slide-up"
      >
        {/* Handle visual */}
        <div className="w-12 h-1.5 bg-ink/15 rounded-full mx-auto mb-3" aria-hidden="true" />

        <div className="px-6 pb-3 flex items-center justify-between">
          <h3 className="font-display text-xl text-ink">Elegí un producto</h3>
          <button
            onClick={onCerrar}
            className="text-2xl text-ink-soft w-9 h-9 grid place-items-center"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-6 pt-1 space-y-2">
          {opciones.length === 0 ? (
            <p className="text-sm text-ink-soft py-4">
              No hay productos compatibles todavía.
            </p>
          ) : (
            opciones.map((o) => {
              const isActive = o.producto.id === productoIdActual;
              return (
                <button
                  key={o.producto.id}
                  onClick={() => {
                    onElegir(o.producto);
                    onCerrar();
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition-colors flex items-center gap-3 ${
                    isActive
                      ? 'border-moss-deep bg-moss-deep/10'
                      : 'border-ink/10 bg-bg-card hover:border-moss'
                  }`}
                >
                  <div className="w-11 h-11 bg-white rounded-xl border grid place-items-center text-2xl flex-shrink-0">
                    🥣
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-semibold tracking-[0.02em] text-terracotta">
                      {o.producto.marca}
                    </div>
                    <div className="text-sm text-ink truncate">{o.producto.linea}</div>
                    <div className="text-[11px] text-ink-soft mt-0.5">
                      {o.match_pct != null && (
                        <>
                          <span className="text-moss-deep font-semibold">{o.match_pct}% match</span>
                          {' · '}
                        </>
                      )}
                      {o.producto.kcal_por_100g} kcal/100g
                    </div>
                  </div>
                  {isActive && (
                    <span className="text-moss-deep text-xl" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
