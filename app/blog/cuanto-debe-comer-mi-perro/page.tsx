import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo calcular cuánto debe comer tu perro al día (fórmula veterinaria)',
  description:
    'Las tablas de las bolsas y la regla del 2-3% son imprecisas. Te explico la fórmula que usan los veterinarios para calcular gramos exactos de alimento.',
  openGraph: {
    title: 'Cómo calcular cuánto debe comer tu perro al día',
    description: 'La fórmula que usan los veterinarios (NRC 2006) explicada paso a paso.',
    type: 'article',
    publishedTime: '2026-05-17T00:00:00Z',
  },
  alternates: {
    canonical: 'https://kullin.app/blog/cuanto-debe-comer-mi-perro',
  },
};

export default function BlogPostPage() {
  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/" className="text-sm text-ink-soft underline">
            ← Volver
          </Link>
        }
      />
      <main className="container-app pt-2 max-w-[680px] animate-fade-up">

        <article>
          <header className="mb-8">
            <div className="text-[11px] uppercase tracking-[0.1em] text-terracotta font-semibold mb-3">
              Nutrición canina · 5 min de lectura
            </div>
            <h1 className="font-display text-[36px] sm:text-[42px] text-ink leading-[1.1] tracking-tight mb-3">
              Cómo calcular <em className="text-terracotta italic font-normal">cuánto debe comer</em> tu perro al día
            </h1>
            <p className="text-ink-soft text-[17px] leading-relaxed">
              Las tablas de las bolsas dan rangos muy amplios. La regla del "2-3% del peso" es para
              dieta BARF, no para alimento seco. Te explico la fórmula real que usan los veterinarios
              y cómo aplicarla en menos de un minuto.
            </p>
            <p className="text-sm text-ink-soft mt-4">
              17 de mayo de 2026 · Por Kulliñ
            </p>
          </header>

          <div className="prose prose-sm max-w-none space-y-6 text-ink">

            <section>
              <h2 className="font-display text-2xl text-ink mt-8 mb-3">
                El problema con las tablas de las bolsas
              </h2>
              <p className="text-[16px] leading-relaxed">
                Si miras la parte trasera de una bolsa de Royal Canin, Hills o Purina, vas a encontrar
                una tabla que dice algo como esto:
              </p>
              <div className="bg-bg-card border rounded-2xl p-4 my-4 text-[14px] font-mono text-ink-soft">
                Perro de 25-35 kg → entre 280 y 360 gramos al día
              </div>
              <p className="text-[16px] leading-relaxed">
                Esa diferencia de <strong>80 gramos diarios</strong> son aproximadamente
                <strong> 290 kcal</strong> — el equivalente a una porción extra de croquetas que, repetida
                todos los días durante un año, son <strong>29 kilos extra de alimento</strong>. La tabla no
                miente, pero es <em>tan general</em> que termina siendo inútil para tu mascota específica.
              </p>
              <p className="text-[16px] leading-relaxed">
                La regla del "2-3% del peso corporal" que circula en redes está diseñada para
                <strong> dieta cruda BARF</strong>, donde la comida tiene mucha más agua y menos densidad
                calórica que el pienso seco. Aplicarla al alimento balanceado seco da resultados
                <strong> 30-40% más altos</strong> de lo que tu perro realmente necesita.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                La fórmula que sí funciona (NRC 2006)
              </h2>
              <p className="text-[16px] leading-relaxed">
                Los veterinarios usan una fórmula desarrollada por el
                <strong> National Research Council</strong> de Estados Unidos, publicada en 2006 en el
                documento <em>Nutrient Requirements of Dogs and Cats</em>. La World Small Animal Veterinary
                Association (WSAVA) la confirmó como estándar global en 2011.
              </p>
              <p className="text-[16px] leading-relaxed">
                La fórmula tiene 2 pasos:
              </p>

              <div className="bg-moss/5 border-l-4 border-moss rounded-r-2xl p-5 my-4">
                <p className="font-semibold text-moss-deep mb-2">Paso 1 — RER (Resting Energy Requirement)</p>
                <div className="font-mono text-[15px] text-ink my-2">
                  RER = 70 × peso_kg<sup>0.75</sup>
                </div>
                <p className="text-[14px] text-ink-soft mt-2">
                  Son las calorías que tu perro quemaría si estuviera todo el día sin moverse.
                </p>
              </div>

              <div className="bg-moss/5 border-l-4 border-moss rounded-r-2xl p-5 my-4">
                <p className="font-semibold text-moss-deep mb-2">Paso 2 — MER (Maintenance Energy Requirement)</p>
                <div className="font-mono text-[15px] text-ink my-2">
                  MER = RER × factor
                </div>
                <p className="text-[14px] text-ink-soft mt-2">
                  El factor depende de edad, actividad y esterilización (tabla abajo).
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Tabla de factores MER para perros
              </h2>

              <div className="overflow-x-auto -mx-6 sm:mx-0 my-4">
                <table className="w-full text-[14px] border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th className="text-left py-3 px-3 font-semibold">Etapa / condición</th>
                      <th className="text-right py-3 px-3 font-semibold">Factor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    <tr><td className="py-2.5 px-3">Cachorro menor de 4 meses</td><td className="text-right px-3 font-mono">3.0</td></tr>
                    <tr><td className="py-2.5 px-3">Cachorro 4-12 meses</td><td className="text-right px-3 font-mono">2.0</td></tr>
                    <tr><td className="py-2.5 px-3">Adulto sedentario</td><td className="text-right px-3 font-mono">1.4</td></tr>
                    <tr><td className="py-2.5 px-3">Adulto actividad normal</td><td className="text-right px-3 font-mono">1.6</td></tr>
                    <tr><td className="py-2.5 px-3">Adulto muy activo / atleta</td><td className="text-right px-3 font-mono">1.8</td></tr>
                    <tr><td className="py-2.5 px-3 text-ink-soft italic">Resta -0.2 si está esterilizado</td><td className="text-right px-3 font-mono text-ink-soft">-0.2</td></tr>
                    <tr><td className="py-2.5 px-3 text-ink-soft italic">Resta -0.2 si es senior (+7 años)</td><td className="text-right px-3 font-mono text-ink-soft">-0.2</td></tr>
                    <tr><td className="py-2.5 px-3">Sobrepeso (objetivo bajar)</td><td className="text-right px-3 font-mono">1.0</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Ejemplo real: Luna, Golden Retriever de 28 kg
              </h2>
              <p className="text-[16px] leading-relaxed">
                Vamos a calcular cuánto debe comer Luna, una Golden Retriever adulta de 28 kilos,
                esterilizada, con nivel de actividad normal.
              </p>

              <div className="bg-bg-card border rounded-2xl p-5 my-4 space-y-3">
                <div>
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">Paso 1: RER</p>
                  <p className="font-mono text-[15px] mt-1">
                    70 × 28<sup>0.75</sup> = 70 × 12.18 = <strong>853 kcal/día</strong>
                  </p>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">Paso 2: factor MER</p>
                  <p className="font-mono text-[15px] mt-1">
                    1.6 (adulto normal) − 0.2 (esterilizada) = <strong>1.4</strong>
                  </p>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">MER total</p>
                  <p className="font-mono text-[15px] mt-1">
                    853 × 1.4 = <strong>1.194 kcal/día</strong>
                  </p>
                </div>
              </div>

              <p className="text-[16px] leading-relaxed mt-4">
                Ahora dividimos esas calorías entre las kcal/100g del alimento de Luna. Royal Canin
                Maxi Adult Sterilised tiene <strong>337 kcal/100g</strong>:
              </p>

              <div className="bg-gold/10 border-l-4 border-gold rounded-r-2xl p-5 my-4">
                <p className="font-mono text-[16px]">
                  (1.194 / 337) × 100 = <strong className="text-terracotta">354 gramos al día</strong>
                </p>
                <p className="text-[14px] text-ink-soft mt-2">
                  Eso son aproximadamente 2,4 tazas medidoras estándar, divididas en 2 comidas.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Por qué importa la precisión
              </h2>
              <p className="text-[16px] leading-relaxed">
                Volvamos al rango que decía la bolsa: 280-360 gramos. La fórmula NRC dice 354 gramos
                para Luna. Está en el límite superior del rango, no en el medio, porque la bolsa
                <strong> no sabe que Luna está esterilizada</strong> ni cuál es su nivel exacto de actividad.
              </p>
              <p className="text-[16px] leading-relaxed">
                En un perro pequeño la diferencia es menos crítica. En un Golden de 28 kg, darle
                300 gramos (el "promedio" que muchos eligen) significaría <strong>180 kcal de déficit
                diario</strong>, que en 6 meses se traduce en pérdida de masa muscular y bajada de energía.
                Al revés, darle 360 gramos a una mascota sedentaria genera sobrepeso silencioso que
                el dueño no nota hasta el control veterinario.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Lo que la fórmula NO contempla
              </h2>
              <p className="text-[16px] leading-relaxed mb-3">
                Estos casos requieren ajuste personalizado con tu veterinario:
              </p>
              <ul className="space-y-2 text-[16px] pl-5 list-disc marker:text-terracotta">
                <li><strong>Perras gestantes o lactando:</strong> necesitan 2-4 veces el MER normal.</li>
                <li><strong>Perros con enfermedad renal, hepática o diabetes:</strong> dieta médica específica.</li>
                <li><strong>Recuperación post-cirugía:</strong> requerimientos elevados.</li>
                <li><strong>Razas con metabolismo atípico:</strong> Galgos y Huskies pueden necesitar +10-20%.</li>
                <li><strong>Premios y snacks:</strong> deben ser menos del 10% del MER total.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Calcula la ración de tu perro en 1 minuto
              </h2>
              <p className="text-[16px] leading-relaxed">
                Si no quieres hacer el cálculo a mano cada vez que cambias de alimento o tu perro
                cambia de peso, en Kulliñ lo hacemos automáticamente. Solo creas el perfil de tu
                mascota (peso, edad, actividad, esterilización, condición) y te entregamos los gramos
                exactos al día para el alimento que estás usando o el que recomendamos.
              </p>
              <p className="text-[16px] leading-relaxed">
                Además te avisamos cuando se está acabando la bolsa, para que no te quedes sin
                comida un domingo a las 9 de la noche.
              </p>

              <div className="mt-6 mb-12 text-center">
                <Link href="/onboarding" className="btn-primary inline-block max-w-[320px]">
                  Crear el perfil de mi perro →
                </Link>
                <p className="text-[12px] text-ink-soft mt-3">
                  Gratis. Sin tarjeta. Sin venta directa.
                </p>
              </div>
            </section>

            <section className="border-t border-ink/10 pt-6 mt-12">
              <h3 className="font-display text-lg text-ink mb-3">Fuentes</h3>
              <ul className="space-y-1.5 text-[13px] text-ink-soft">
                <li>
                  National Research Council (2006). <em>Nutrient Requirements of Dogs and Cats</em>.
                  National Academies Press.
                </li>
                <li>
                  WSAVA Global Nutrition Committee (2011). <em>Global Nutrition Guidelines</em>.
                </li>
                <li>
                  American Animal Hospital Association (2010). <em>Nutritional Assessment Guidelines for Dogs and Cats</em>.
                </li>
              </ul>
            </section>

            <p className="text-[12px] text-ink-soft mt-10 pt-6 border-t border-ink/10">
              Este artículo es educativo y no reemplaza consulta con un médico veterinario. Si tu
              perro tiene condiciones médicas, está gestante, lactando, o cambias significativamente
              su dieta, consulta primero con un profesional.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
