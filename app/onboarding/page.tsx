'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import { SPECIES, SPECIES_LIST, type Especie } from '@/app/lib/species-config';
import { useSpecies } from '@/app/lib/hooks/useSpecies';

type Tamano = 'pequeno' | 'mediano' | 'grande';
type Actividad = 'bajo' | 'moderado' | 'alto';
type Condicion = 'ninguna' | 'sobrepeso' | 'sensible_digestivo' | 'pelo_largo' | 'articulaciones';

interface Perfil {
  especie?: Especie;
  nombre: string;
  raza: string;
  tamano?: Tamano;
  peso_kg: number;
  edad_anios: number;
  edad_meses_extra: number;
  actividad: Actividad;
  esterilizado: boolean;
  condicion: Condicion;
}

const PASOS = [
  'especie', 'nombre', 'raza', 'tamano', 'peso',
  'edad', 'actividad', 'esterilizado', 'condicion', 'resumen',
] as const;

export default function OnboardingPage() {
  const router = useRouter();
  const [paso, setPaso] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [perfil, setPerfil] = useState<Perfil>({
    nombre: '',
    raza: '',
    peso_kg: 0,
    edad_anios: 0,
    edad_meses_extra: 0,
    actividad: 'moderado',
    esterilizado: false,
    condicion: 'ninguna',
  });

  // Carga razas desde DB (con fallback a species-config si red falla)
  const { razas: razasDisponibles, cargandoRazas } = useSpecies(perfil.especie);

  const update = (patch: Partial<Perfil>) => setPerfil((p) => ({ ...p, ...patch }));
  const avanzar = () => setPaso((p) => Math.min(p + 1, PASOS.length - 1));
  const retroceder = () => setPaso((p) => Math.max(p - 1, 0));

  // Validación de avance por paso
  const puedeAvanzar = () => {
    const actual = PASOS[paso];
    if (actual === 'especie') return !!perfil.especie;
    if (actual === 'nombre') return perfil.nombre.trim().length > 0;
    if (actual === 'raza') return !!perfil.raza;
    if (actual === 'tamano') return !!perfil.tamano;
    if (actual === 'peso') return perfil.peso_kg > 0 && perfil.peso_kg < 100;
    if (actual === 'edad') return perfil.edad_anios > 0 || perfil.edad_meses_extra > 0;
    return true;
  };

  async function guardar() {
    if (!perfil.especie || !perfil.tamano) return;
    setEnviando(true);
    setError('');
    const body = {
      nombre: perfil.nombre,
      especie: perfil.especie,
      raza: perfil.raza,
      tamano: perfil.tamano,
      peso_kg: perfil.peso_kg,
      edad_meses: perfil.edad_anios * 12 + perfil.edad_meses_extra,
      actividad: perfil.actividad,
      esterilizado: perfil.esterilizado,
      condicion: perfil.condicion,
    };
    const res = await fetch('/api/mascotas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error ?? 'Error al guardar');
      setEnviando(false);
      return;
    }
    const { mascota } = await res.json();
    router.push(`/bienvenida?mascota=${mascota.id}`);
  }

  const progreso = ((paso + 1) / PASOS.length) * 100;

  return (
    <>
      <AppHeader
        rightSlot={
          paso > 0 ? (
            <button onClick={retroceder} className="text-sm text-ink-soft underline">
              ← Atrás
            </button>
          ) : (
            <Link href="/" className="text-sm text-ink-soft underline">
              Cancelar
            </Link>
          )
        }
      />

      {/* Progress bar */}
      <div className="container-app pt-0 pb-0">
        <div className="h-1.5 bg-ink/5 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-moss-deep transition-all duration-500 rounded-full"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      <main className="container-app">
        <div key={paso} className="animate-fade-up">

          {/* Paso 1: especie */}
          {PASOS[paso] === 'especie' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                Empecemos. <em className="text-terracotta italic font-normal">¿Perro o gato?</em>
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Por ahora solo trabajamos con estas dos especies.
              </p>
              <div className="flex gap-3 mb-6">
                {SPECIES_LIST.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => update({ especie: s.key })}
                    className={`pill-big ${perfil.especie === s.key ? 'pill-big-active' : ''}`}
                  >
                    <span className="block text-4xl mb-2">{s.emoji}</span>
                    <span className="block text-[15px] font-semibold capitalize">{s.singular}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Paso 2: nombre */}
          {PASOS[paso] === 'nombre' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿Cómo se <em className="text-terracotta italic font-normal">llama</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Lo usaremos para los recordatorios.
              </p>
              <input
                autoFocus
                type="text"
                placeholder="Luna, Toto, Pelusa…"
                value={perfil.nombre}
                onChange={(e) => update({ nombre: e.target.value })}
                className="input text-2xl font-display py-5"
                maxLength={60}
              />
            </section>
          )}

          {/* Paso 3: raza */}
          {PASOS[paso] === 'raza' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿De qué <em className="text-terracotta italic font-normal">raza</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Si es mestizo, elige el tamaño que más se le parece.
              </p>
              <select
                value={perfil.raza}
                onChange={(e) => update({ raza: e.target.value })}
                className="input"
                disabled={cargandoRazas}
              >
                <option value="">
                  {cargandoRazas ? 'Cargando razas…' : 'Selecciona una raza…'}
                </option>
                {razasDisponibles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </section>
          )}

          {/* Paso 4: tamaño */}
          {PASOS[paso] === 'tamano' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿De qué <em className="text-terracotta italic font-normal">tamaño</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Es la base para calcular cuánta comida necesita.
              </p>
              <div className="space-y-2">
                {perfil.especie && SPECIES[perfil.especie].tamanos.map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => update({ tamano: opt.v })}
                    className={`w-full p-4 text-left border rounded-2xl transition-all ${
                      perfil.tamano === opt.v
                        ? 'bg-moss-deep text-bg border-moss-deep'
                        : 'bg-bg-card text-ink'
                    }`}
                  >
                    <div className="font-semibold">{opt.label}</div>
                    <div className={`text-sm mt-0.5 ${perfil.tamano === opt.v ? 'text-bg/70' : 'text-ink-soft'}`}>
                      {opt.descripcion}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Paso 5: peso */}
          {PASOS[paso] === 'peso' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿Cuánto <em className="text-terracotta italic font-normal">pesa</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Aproximado está bien. Lo iremos ajustando con el tiempo.
              </p>
              <div className="relative">
                <input
                  autoFocus
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="80"
                  inputMode="decimal"
                  value={perfil.peso_kg || ''}
                  onChange={(e) => update({ peso_kg: parseFloat(e.target.value) || 0 })}
                  className="input text-3xl font-display py-5 pr-16"
                  placeholder="0"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-ink-soft">kg</span>
              </div>
            </section>
          )}

          {/* Paso 6: edad */}
          {PASOS[paso] === 'edad' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿Qué <em className="text-terracotta italic font-normal">edad</em> tiene?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Sus necesidades cambian según etapa de vida.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Años</label>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    inputMode="numeric"
                    value={perfil.edad_anios || ''}
                    onChange={(e) => update({ edad_anios: parseInt(e.target.value) || 0 })}
                    className="input text-2xl font-display py-4"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="label">Meses extra</label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    inputMode="numeric"
                    value={perfil.edad_meses_extra || ''}
                    onChange={(e) => update({ edad_meses_extra: parseInt(e.target.value) || 0 })}
                    className="input text-2xl font-display py-4"
                    placeholder="0"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Paso 7: actividad */}
          {PASOS[paso] === 'actividad' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿Cómo es de <em className="text-terracotta italic font-normal">activa</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Más actividad = más comida diaria.
              </p>
              <div className="space-y-2">
                {([
                  { v: 'bajo', l: 'Duerme mucho', d: 'Pocas salidas o juego mínimo' },
                  { v: 'moderado', l: 'Normal', d: 'Salidas diarias, energía estable' },
                  { v: 'alto', l: 'Atleta', d: 'Corre, juega, mucho ejercicio' },
                ] as const).map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => update({ actividad: opt.v })}
                    className={`w-full p-4 text-left border rounded-2xl transition-all ${
                      perfil.actividad === opt.v
                        ? 'bg-moss-deep text-bg border-moss-deep'
                        : 'bg-bg-card text-ink'
                    }`}
                  >
                    <div className="font-semibold">{opt.l}</div>
                    <div className={`text-sm mt-0.5 ${perfil.actividad === opt.v ? 'text-bg/70' : 'text-ink-soft'}`}>
                      {opt.d}
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Paso 8: esterilizado */}
          {PASOS[paso] === 'esterilizado' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿Está <em className="text-terracotta italic font-normal">esterilizado</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Afecta su metabolismo. Mascotas esterilizadas necesitan menos calorías.
              </p>
              <div className="flex gap-3">
                {[
                  { v: true, l: 'Sí, esterilizado/a' },
                  { v: false, l: 'No, entero/a' },
                ].map((opt) => (
                  <button
                    key={String(opt.v)}
                    onClick={() => update({ esterilizado: opt.v })}
                    className={`flex-1 p-5 text-center border rounded-2xl transition-all font-semibold ${
                      perfil.esterilizado === opt.v
                        ? 'bg-moss-deep text-bg border-moss-deep'
                        : 'bg-bg-card text-ink'
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Paso 9: condición */}
          {PASOS[paso] === 'condicion' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿Alguna <em className="text-terracotta italic font-normal">condición</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Esto refina qué alimento recomendamos.
              </p>
              <div className="space-y-2">
                {([
                  { v: 'ninguna', l: 'Ninguna', e: '🟢' },
                  { v: 'sobrepeso', l: 'Sobrepeso', e: '⚖️' },
                  { v: 'sensible_digestivo', l: 'Sensible digestivo', e: '🪴' },
                  { v: 'pelo_largo', l: 'Pelo largo', e: '✨' },
                  { v: 'articulaciones', l: 'Articulaciones', e: '🦴' },
                ] as const).map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => update({ condicion: opt.v })}
                    className={`w-full p-4 text-left border rounded-2xl transition-all flex items-center gap-3 ${
                      perfil.condicion === opt.v
                        ? 'bg-moss-deep text-bg border-moss-deep'
                        : 'bg-bg-card text-ink'
                    }`}
                  >
                    <span className="text-2xl">{opt.e}</span>
                    <span className="font-semibold">{opt.l}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Paso 10: resumen + guardar */}
          {PASOS[paso] === 'resumen' && (
            <section>
              <h1 className="font-display text-3xl text-ink leading-tight mb-2">
                ¿Todo <em className="text-terracotta italic font-normal">correcto</em>?
              </h1>
              <p className="text-ink-soft text-[15px] mb-8">
                Revisa los datos. Podrás cambiarlos cuando quieras.
              </p>

              <div className="card space-y-2 text-sm">
                <Resumen label="Nombre" value={perfil.nombre} />
                <Resumen label="Especie" value={perfil.especie} />
                <Resumen label="Raza" value={perfil.raza} />
                <Resumen label="Tamaño" value={perfil.tamano} />
                <Resumen label="Peso" value={`${perfil.peso_kg} kg`} />
                <Resumen
                  label="Edad"
                  value={`${perfil.edad_anios}a ${perfil.edad_meses_extra}m`}
                />
                <Resumen label="Actividad" value={perfil.actividad} />
                <Resumen label="Esterilizado" value={perfil.esterilizado ? 'Sí' : 'No'} />
                <Resumen label="Condición" value={perfil.condicion.replace('_', ' ')} />
              </div>

              {error && (
                <p className="text-sm text-terracotta my-3">⚠ {error}</p>
              )}

              <button
                onClick={guardar}
                disabled={enviando}
                className="btn-primary mt-4 disabled:opacity-60"
              >
                {enviando ? 'Creando perfil…' : `Crear perfil de ${perfil.nombre || 'mi mascota'} →`}
              </button>
              <p className="text-[11px] text-ink-soft text-center mt-4 px-4 leading-relaxed">
                Cálculos basados en NRC 2006 y WSAVA 2011. No reemplazan consulta veterinaria.
              </p>
            </section>
          )}
        </div>

        {/* Botón continuar (fijo abajo, salvo en último paso) */}
        {PASOS[paso] !== 'resumen' && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-bg via-bg to-transparent pt-8 pb-6 px-6 z-50">
            <button
              onClick={avanzar}
              disabled={!puedeAvanzar()}
              className="btn-primary max-w-[392px] mx-auto block disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuar →
            </button>
          </div>
        )}
      </main>
    </>
  );
}

function Resumen({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 border-b border-ink/5 last:border-0">
      <span className="text-ink-soft uppercase text-[11px] tracking-wider font-medium pt-0.5">{label}</span>
      <span className="text-ink font-medium capitalize text-right">{value}</span>
    </div>
  );
}
