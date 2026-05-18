import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cuánto debe comer tu gato al día (fórmula real, no la de la bolsa)',
  description:
    'Los gatos esterilizados engordan fácil porque su metabolismo cambia. Te explico la fórmula NRC 2006 para calcular gramos exactos, con ejemplo real.',
  openGraph: {
    title: 'Cuánto debe comer tu gato al día',
    description: 'La fórmula veterinaria para calcular la ración exacta de tu gato.',
    type: 'article',
    publishedTime: '2026-05-17T00:00:00Z',
  },
  alternates: {
    canonical: 'https://kullin.app/blog/cuanto-debe-comer-mi-gato',
  },
};

export default function BlogGato() {
  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/blog" className="text-sm text-ink-soft underline">
            ← Blog
          </Link>
        }
      />
      <main className="container-app pt-2 max-w-[680px] animate-fade-up">
        <article>
          <header className="mb-8">
            <div className="text-[11px] uppercase tracking-[0.1em] text-terracotta font-semibold mb-3">
              Nutrición felina · 4 min de lectura
            </div>
            <h1 className="font-display text-[36px] sm:text-[42px] text-ink leading-[1.1] tracking-tight mb-3">
              Cuánto debe comer <em className="text-terracotta italic font-normal">tu gato</em> al día
            </h1>
            <p className="text-ink-soft text-[17px] leading-relaxed">
              Si tu gato está esterilizado, sus necesidades calóricas bajan hasta un 20%. Sumado a que
              suele ser indoor y poco activo, las raciones que dice la bolsa pueden ser hasta el doble
              de lo que realmente necesita.
            </p>
            <p className="text-sm text-ink-soft mt-4">17 de mayo de 2026 · Por Kulliñ</p>
          </header>

          <div className="space-y-6 text-ink">

            <section>
              <h2 className="font-display text-2xl text-ink mt-8 mb-3">
                Por qué los gatos esterilizados engordan tan fácil
              </h2>
              <p className="text-[16px] leading-relaxed">
                Después de la esterilización, el metabolismo del gato baja entre <strong>15% y 25%</strong>
                porque las hormonas sexuales dejan de demandar energía. Al mismo tiempo, el apetito
                <strong> aumenta</strong> porque desaparece el regulador hormonal de la saciedad.
              </p>
              <p className="text-[16px] leading-relaxed">
                Resultado: si sigues dándole la misma cantidad que antes, en 6 meses tienes un gato
                con 20% más de peso. Y los gatos con sobrepeso tienen el doble de riesgo de desarrollar
                diabetes felina, problemas urinarios y dolor articular crónico.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                La fórmula correcta (NRC 2006)
              </h2>
              <p className="text-[16px] leading-relaxed">
                Los veterinarios usan dos pasos:
              </p>

              <div className="bg-moss/5 border-l-4 border-moss rounded-r-2xl p-5 my-4">
                <p className="font-semibold text-moss-deep mb-2">Paso 1 — RER (gasto en reposo)</p>
                <div className="font-mono text-[15px] my-2">
                  RER = 70 × peso_kg<sup>0.75</sup>
                </div>
              </div>

              <div className="bg-moss/5 border-l-4 border-moss rounded-r-2xl p-5 my-4">
                <p className="font-semibold text-moss-deep mb-2">Paso 2 — MER × factor</p>
                <div className="font-mono text-[15px] my-2">
                  MER = RER × factor
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Tabla de factores MER para gatos
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
                    <tr><td className="py-2.5 px-3">Gatito menor de 4 meses</td><td className="text-right px-3 font-mono">2.5</td></tr>
                    <tr><td className="py-2.5 px-3">Gatito 4-12 meses</td><td className="text-right px-3 font-mono">2.0</td></tr>
                    <tr><td className="py-2.5 px-3">Adulto indoor sedentario</td><td className="text-right px-3 font-mono">1.2</td></tr>
                    <tr><td className="py-2.5 px-3">Adulto actividad normal</td><td className="text-right px-3 font-mono">1.4</td></tr>
                    <tr><td className="py-2.5 px-3">Adulto outdoor o muy activo</td><td className="text-right px-3 font-mono">1.6</td></tr>
                    <tr><td className="py-2.5 px-3 text-ink-soft italic">Resta -0.2 si está esterilizado</td><td className="text-right px-3 font-mono text-ink-soft">-0.2</td></tr>
                    <tr><td className="py-2.5 px-3 text-ink-soft italic">Resta -0.1 si es senior (+11 años)</td><td className="text-right px-3 font-mono text-ink-soft">-0.1</td></tr>
                    <tr><td className="py-2.5 px-3">Sobrepeso (objetivo bajar)</td><td className="text-right px-3 font-mono">0.8</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Ejemplo: Pelusa, gata indoor esterilizada de 4,5 kg
              </h2>
              <p className="text-[16px] leading-relaxed">
                Pelusa es una gata mestiza adulta, vive indoor, esterilizada, peso ideal 4,5 kg.
              </p>

              <div className="bg-bg-card border rounded-2xl p-5 my-4 space-y-3">
                <div>
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">Paso 1: RER</p>
                  <p className="font-mono text-[15px] mt-1">
                    70 × 4.5<sup>0.75</sup> = 70 × 3.09 = <strong>216 kcal/día</strong>
                  </p>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">Paso 2: factor MER</p>
                  <p className="font-mono text-[15px] mt-1">
                    1.2 (indoor) − 0.2 (esterilizada) = <strong>1.0</strong>
                  </p>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">MER total</p>
                  <p className="font-mono text-[15px] mt-1">
                    216 × 1.0 = <strong>216 kcal/día</strong>
                  </p>
                </div>
              </div>

              <p className="text-[16px] leading-relaxed mt-4">
                Royal Canin Indoor 27 tiene 370 kcal/100g. Entonces:
              </p>

              <div className="bg-gold/10 border-l-4 border-gold rounded-r-2xl p-5 my-4">
                <p className="font-mono text-[16px]">
                  (216 / 370) × 100 = <strong className="text-terracotta">58 gramos al día</strong>
                </p>
                <p className="text-[14px] text-ink-soft mt-2">
                  Una pequeña medida 2 veces al día. Si dejas el plato lleno todo el día, tu gata
                  comerá 80-100g sin pestañear.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                ¿Por qué las bolsas suelen recomendar más?
              </h2>
              <p className="text-[16px] leading-relaxed">
                Las tablas del fabricante están pensadas para un gato "promedio": no esterilizado,
                con actividad moderada, peso saludable. Pero el gato chileno típico es
                <strong> esterilizado, indoor y poco activo</strong>. Si sigues la tabla literal,
                terminas con un gato esférico.
              </p>
              <p className="text-[16px] leading-relaxed">
                Para Pelusa, la tabla de Royal Canin sugiere 65-75 gramos. Nuestra fórmula dice 58.
                Esos 10-15 gramos extra parecen poco, pero son <strong>40-55 kcal diarias de exceso</strong> —
                en 6 meses, eso es medio kilo de sobrepeso en una gata que pesa 4,5 kg.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Tip: pesa al gato cada 2-3 meses
              </h2>
              <p className="text-[16px] leading-relaxed">
                A diferencia de los perros, los gatos rara vez van al veterinario para chequeos
                rutinarios. Hazlo en casa: súbete a la pesa contigo en brazos, luego solo, y resta.
                Si en 2 meses subió o bajó más de 200 gramos, ajusta la ración 10-15%.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Hazlo automático
              </h2>
              <p className="text-[16px] leading-relaxed">
                En Kulliñ haces el cálculo en 1 minuto y registramos el peso de tu gato cada vez
                que lo actualizas, recalculando la ración automáticamente.
              </p>

              <div className="mt-6 mb-12 text-center">
                <Link href="/onboarding" className="btn-primary inline-block max-w-[320px]">
                  Crear perfil de mi gato →
                </Link>
                <p className="text-[12px] text-ink-soft mt-3">
                  Gratis. Sin tarjeta. Sin venta directa.
                </p>
              </div>
            </section>

            <section className="border-t border-ink/10 pt-6 mt-12">
              <h3 className="font-display text-lg text-ink mb-3">Lee también</h3>
              <ul className="space-y-2 text-[14px]">
                <li>
                  <Link href="/blog/cuanto-debe-comer-mi-perro" className="text-moss-deep underline">
                    Cómo calcular cuánto debe comer tu perro al día
                  </Link>
                </li>
                <li>
                  <Link href="/blog/cambio-gradual-de-alimento" className="text-moss-deep underline">
                    Cómo cambiar de alimento sin que tu mascota se enferme
                  </Link>
                </li>
              </ul>
            </section>

            <p className="text-[12px] text-ink-soft mt-10 pt-6 border-t border-ink/10">
              Este artículo es educativo y no reemplaza consulta con un médico veterinario. Si tu
              gato tiene condiciones médicas (diabetes, enfermedad renal, FLUTD), consulta primero
              con un profesional.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
