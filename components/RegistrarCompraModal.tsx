'use client';
import { useState } from 'react';

interface Props {
  mascota: any;
  productoPreseleccionado?: any;
  recomendaciones: any[];
  onClose: () => void;
  onSuccess: () => void;
}

export function RegistrarCompraModal({
  mascota,
  productoPreseleccionado,
  recomendaciones,
  onClose,
  onSuccess,
}: Props) {
  const [productoId, setProductoId] = useState<string>(productoPreseleccionado?.id ?? '');
  const [cantidadKg, setCantidadKg] = useState<number>(
    productoPreseleccionado?.formatos?.[Math.min(1, (productoPreseleccionado.formatos?.length ?? 1) - 1)]?.kg ?? 0
  );
  const [fechaCompra, setFechaCompra] = useState(new Date().toISOString().split('T')[0]);
  const [precio, setPrecio] = useState<number | ''>('');
  const [origen, setOrigen] = useState<'manual' | 'mercadolibre' | 'veterinaria' | 'otro'>('manual');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const productoSel = recomendaciones.find((r) => r.producto.id === productoId)?.producto ?? productoPreseleccionado;
  const formatos = productoSel?.formatos ?? [];

  async function submit() {
    if (!productoId || !cantidadKg) {
      setError('Selecciona producto y cantidad');
      return;
    }
    setEnviando(true);
    setError('');
    const res = await fetch('/api/compras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mascota_id: mascota.id,
        producto_id: productoId,
        cantidad_kg: cantidadKg,
        precio_pagado_clp: precio === '' ? undefined : precio,
        fecha_compra: fechaCompra,
        origen,
      }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? 'Error al guardar');
      setEnviando(false);
      return;
    }
    onSuccess();
  }

  return (
    <div
      className="fixed inset-0 z-[200] bg-ink/40 backdrop-blur-sm flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-bg w-full max-w-[440px] rounded-t-3xl sm:rounded-3xl p-6 max-h-[90vh] overflow-y-auto animate-fade-up"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-ink">Registrar compra</h2>
          <button onClick={onClose} className="text-2xl text-ink-soft w-9 h-9 grid place-items-center" aria-label="Cerrar">×</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="label-cozy">Producto</label>
            <select
              value={productoId}
              onChange={(e) => {
                setProductoId(e.target.value);
                const found = recomendaciones.find((r) => r.producto.id === e.target.value)?.producto;
                if (found) {
                  const f = found.formatos?.sort((a: any, b: any) => b.kg - a.kg)[Math.min(1, found.formatos.length - 1)];
                  setCantidadKg(f?.kg ?? 0);
                }
              }}
              className="input"
            >
              <option value="">Seleccionar…</option>
              {recomendaciones.map((r) => (
                <option key={r.producto.id} value={r.producto.id}>
                  {r.producto.marca} — {r.producto.linea}
                </option>
              ))}
            </select>
          </div>

          {formatos.length > 0 ? (
            <div>
              <label className="label-cozy">Formato</label>
              <div className="grid grid-cols-3 gap-2">
                {formatos.map((f: any) => (
                  <button
                    key={f.kg}
                    onClick={() => setCantidadKg(f.kg)}
                    className={`p-3 border rounded-xl text-center transition-all ${
                      cantidadKg === f.kg ? 'bg-moss-deep text-bg border-moss-deep' : 'bg-bg-card text-ink'
                    }`}
                  >
                    <div className="font-display text-lg leading-none">{f.kg}<span className="text-xs ml-0.5">kg</span></div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="label-cozy">Cantidad (kg)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={cantidadKg || ''}
                onChange={(e) => setCantidadKg(parseFloat(e.target.value) || 0)}
                className="input"
              />
            </div>
          )}

          <div>
            <label className="label-cozy">¿Cuándo la compraste?</label>
            <input
              type="date"
              value={fechaCompra}
              onChange={(e) => setFechaCompra(e.target.value)}
              className="input"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="label-cozy">
              Precio <span className="text-ink-soft/60 font-normal">(opcional)</span>
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={precio}
              onChange={(e) => setPrecio(e.target.value === '' ? '' : parseInt(e.target.value))}
              placeholder="En pesos chilenos"
              className="input"
            />
          </div>

          <div>
            <label className="label-cozy">¿Dónde la compraste?</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { v: 'manual', l: 'Tienda física' },
                { v: 'mercadolibre', l: 'MercadoLibre' },
                { v: 'veterinaria', l: 'Veterinaria' },
                { v: 'otro', l: 'Otro' },
              ].map((o: any) => (
                <button
                  key={o.v}
                  onClick={() => setOrigen(o.v)}
                  className={`py-2.5 px-3 border rounded-xl text-sm transition-all ${
                    origen === o.v ? 'bg-moss-deep text-bg border-moss-deep' : 'bg-bg-card text-ink'
                  }`}
                >
                  {o.l}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-terracotta my-4">⚠ {error}</p>}

        <button
          onClick={submit}
          disabled={enviando || !productoId || !cantidadKg}
          className="btn-primary mt-6 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {enviando ? 'Guardando…' : 'Guardar compra'}
        </button>
        <p className="text-[12px] text-ink-soft text-center mt-3">
          Al guardar, recalculamos los días de comida restante.
        </p>
      </div>
    </div>
  );
}
