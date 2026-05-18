'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowser } from '@/app/lib/supabase-browser';

export function CuentaCliente({ initialProfile }: { initialProfile: any }) {
  const router = useRouter();
  const [nombre, setNombre] = useState(initialProfile?.nombre ?? '');
  const [notifEmail, setNotifEmail] = useState(initialProfile?.notif_email ?? true);
  const [diasAntes, setDiasAntes] = useState<number>(initialProfile?.notif_dias_antes ?? 5);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  async function guardar() {
    setGuardando(true);
    setMensaje('');
    const supabase = getSupabaseBrowser();
    const { error } = await supabase
      .from('profiles')
      .update({
        nombre,
        notif_email: notifEmail,
        notif_dias_antes: diasAntes,
      })
      .eq('id', initialProfile.id);
    setGuardando(false);
    setMensaje(error ? `⚠ ${error.message}` : '✓ Guardado');
    setTimeout(() => setMensaje(''), 2500);
  }

  async function cerrarSesion() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  return (
    <>
      <div className="card space-y-5">
        <div>
          <label className="label">Tu nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input"
          />
        </div>

        <div className="border-t border-ink/10 pt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="label mb-0">Recordatorios por email</span>
            <button
              onClick={() => setNotifEmail(!notifEmail)}
              className={`w-12 h-7 rounded-full transition-colors relative ${
                notifEmail ? 'bg-moss-deep' : 'bg-ink/20'
              }`}
              aria-pressed={notifEmail}
            >
              <span
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  notifEmail ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          <p className="text-[12px] text-ink-soft">
            Te avisamos cuando a tu mascota le queden pocos días de comida.
          </p>
        </div>

        {notifEmail && (
          <div className="border-t border-ink/10 pt-5">
            <label className="label">Avisar con N días de anticipación</label>
            <input
              type="number"
              min="1"
              max="30"
              value={diasAntes}
              onChange={(e) => setDiasAntes(parseInt(e.target.value) || 5)}
              className="input"
            />
          </div>
        )}
      </div>

      {mensaje && (
        <p className={`text-sm text-center mt-3 ${mensaje.startsWith('✓') ? 'text-moss-deep' : 'text-terracotta'}`}>
          {mensaje}
        </p>
      )}

      <button onClick={guardar} disabled={guardando} className="btn-primary mt-4">
        {guardando ? 'Guardando…' : 'Guardar cambios'}
      </button>

      <div className="mt-12 pt-6 border-t border-ink/10">
        <button onClick={cerrarSesion} className="text-sm text-terracotta underline">
          Cerrar sesión
        </button>
      </div>

      <p className="text-[11px] text-ink-soft text-center mt-12 leading-relaxed px-4">
        Para eliminar tu cuenta y todos tus datos, escribe a soporte@kullin.app
      </p>
    </>
  );
}
