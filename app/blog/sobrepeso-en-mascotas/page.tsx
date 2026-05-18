import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo saber si tu mascota tiene sobrepeso (y qué hacer)',
  description:
    'El 60% de los perros y gatos en Chile tienen sobrepeso. Te explico cómo evaluarlo en casa y qué cambios concretos hacer en la alimentación.',
  openGraph: {
    title: 'Cómo saber si tu mascota tiene sobrepeso',
    description: 'Cómo evaluarlo en casa y qué hacer al respecto.',
    type: 'article',
    publishedTime: '2026-05-17T00:00:00Z',
  },
  alternates: {
    canonical: 'https://kullin.app/blog/sobrepeso-en-mascotas',
  },
};

export default function BlogSobrepeso() {
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
              Salud y peso · 5 min de lectura
            </div>
            <h1 className="font-display text-[36px] sm:text-[42px] text-ink leading-[1.1] tracking-tight mb-3">
              Cómo saber si tu mascota tiene <em className="text-terracotta italic font-normal">sobrepeso</em>
            </h1>
            <p className="text-ink-soft text-[17px] leading-relaxed">
              Según estudios veterinarios recientes, entre el 50% y 60% de los perros y gatos
              domésticos tienen sobrepeso. Pero la mayoría de tutores creen que su mascota está
              "normal". Te explico cómo evaluarlo objetivamente.
            </p>
            <p className="text-sm text-ink-soft mt-4">17 de mayo de 2026 · Por Kulliñ</p>
          </header>

          <div className="space-y-6 text-ink">

            <section>
              <h2 className="font-display text-2xl text-ink mt-8 mb-3">
                Por qué importa
              </h2>
              <p className="text-[16px] leading-relaxed">
                El sobrepeso reduce <strong>2,5 años de expectativa de vida</strong> en perros y
                aumenta el riesgo de:
              </p>
              <ul className="space-y-1.5 text-[16px] pl-5 list-disc marker:text-terracotta mt-2">
                <li>Diabetes (especialmente en gatos esterilizados)</li>
                <li>Artritis y problemas articulares (especialmente razas grandes)</li>
                <li>Cardiopatías y problemas respiratorios</li>
                <li>Cálculos urinarios (especialmente en gatos)</li>
                <li>Cáncer de mama y otros tumores</li>
              </ul>
              <p className="text-[16px] leading-relaxed mt-3">
                No es estético: es médico. Una mascota con peso ideal vive más tiempo y mejor.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                El test rápido en casa: la regla de las 3 vistas
              </h2>
              <p className="text-[16px] leading-relaxed mb-3">
                Los veterinarios usan el <strong>Body Condition Score (BCS)</strong>, una escala del
                1 al 9. Una versión simplificada que puedes hacer en casa:
              </p>

              <div className="space-y-4 my-4">
                <div className="bg-bg-card border rounded-2xl p-4">
                  <p className="font-semibold text-ink mb-1">👁️ Vista lateral</p>
                  <p className="text-[15px] text-ink-soft leading-relaxed">
                    De pie, mira a tu mascota de costado. Debes ver un <strong>"abdomen retraído"</strong>:
                    la línea desde el final de las costillas hasta la cadera debe subir, no bajar
                    ni quedar recta.
                  </p>
                </div>

                <div className="bg-bg-card border rounded-2xl p-4">
                  <p className="font-semibold text-ink mb-1">👁️ Vista superior (mirando desde arriba)</p>
                  <p className="text-[15px] text-ink-soft leading-relaxed">
                    Debes ver una <strong>"cintura"</strong> definida: las costillas terminan,
                    se forma una pequeña pinza, y luego viene la cadera. Si tu mascota es como una
                    "salchicha" recta o se ve más ancha en el medio que en los hombros, hay sobrepeso.
                  </p>
                </div>

                <div className="bg-bg-card border rounded-2xl p-4">
                  <p className="font-semibold text-ink mb-1">🤚 Tacto de costillas</p>
                  <p className="text-[15px] text-ink-soft leading-relaxed">
                    Pasa los dedos suavemente por los costados. Debes <strong>sentir las costillas
                    sin presionar fuerte</strong>, como si fueran los nudillos de tu mano cuando los
                    cubres con la otra. Si tienes que apretar para encontrarlas, hay capa de grasa.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Categorías según los 3 tests
              </h2>

              <div className="overflow-x-auto -mx-6 sm:mx-0 my-4">
                <table className="w-full text-[13px] border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th className="text-left py-3 px-2 font-semibold">Tests positivos</th>
                      <th className="text-left py-3 px-2 font-semibold">Categoría</th>
                      <th className="text-left py-3 px-2 font-semibold">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    <tr>
                      <td className="py-2.5 px-2">3 de 3 ideales</td>
                      <td className="py-2.5 px-2 text-moss-deep font-semibold">Peso ideal</td>
                      <td className="py-2.5 px-2">Mantener</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-2">2 de 3 ideales</td>
                      <td className="py-2.5 px-2 text-gold font-semibold">Levemente sobre</td>
                      <td className="py-2.5 px-2">Reducir 10%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-2">1 de 3 ideales</td>
                      <td className="py-2.5 px-2 text-terracotta font-semibold">Sobrepeso</td>
                      <td className="py-2.5 px-2">Plan de pérdida</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-2">0 de 3 ideales</td>
                      <td className="py-2.5 px-2 text-rose font-semibold">Obesidad</td>
                      <td className="py-2.5 px-2">Veterinario</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Plan de pérdida de peso seguro
              </h2>
              <p className="text-[16px] leading-relaxed">
                <strong>Nunca hagas dieta drástica</strong> con mascotas. Perder peso rápido es
                peligroso, especialmente en gatos (puede causar lipidosis hepática, fatal en 3-5 días).
              </p>

              <p className="text-[16px] leading-relaxed mt-3 mb-3">
                Lo correcto:
              </p>

              <ol className="space-y-3 text-[16px] pl-5 list-decimal marker:text-terracotta marker:font-bold">
                <li>
                  <strong>Recalcula el MER usando el factor "sobrepeso"</strong>: 1.0 para perros
                  y 0.8 para gatos. Eso reduce automáticamente la ración 20-30%.
                </li>
                <li>
                  <strong>Cambia a un alimento "light" o "weight management"</strong>: tiene menos
                  kcal/100g pero mantiene proteína. Hills Perfect Weight, Royal Canin Satiety,
                  Purina Pro Plan Weight Management.
                </li>
                <li>
                  <strong>Pesa exacto los gramos</strong> con balanza de cocina. La diferencia entre
                  un "puñado" y otro puede ser 30% de la ración diaria.
                </li>
                <li>
                  <strong>Elimina premios y restos</strong> de comida humana. O si los das, descuenta
                  del MER diario.
                </li>
                <li>
                  <strong>Pesa a tu mascota cada 2 semanas</strong>. Objetivo: bajar <strong>1-2%
                  del peso corporal por semana</strong>, no más.
                </li>
                <li>
                  <strong>Aumenta actividad gradualmente</strong>. Para perros: 10 minutos extra
                  de caminata. Para gatos: 5 minutos de juego con varilla con plumas, 2 veces al día.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Ejemplo: Toto, Labrador de 35 kg con sobrepeso
              </h2>
              <p className="text-[16px] leading-relaxed">
                Toto debería pesar 30 kg pero pesa 35. Su tutor le da 380g/día de Royal Canin Maxi Adult.
              </p>

              <div className="bg-bg-card border rounded-2xl p-5 my-4 space-y-3">
                <div>
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">RER al peso ideal (30 kg)</p>
                  <p className="font-mono text-[15px] mt-1">
                    70 × 30<sup>0.75</sup> = <strong>897 kcal/día</strong>
                  </p>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">MER pérdida de peso</p>
                  <p className="font-mono text-[15px] mt-1">
                    897 × 1.0 = <strong>897 kcal/día</strong>
                  </p>
                </div>
                <div className="border-t border-ink/10 pt-3">
                  <p className="text-[13px] uppercase tracking-wider text-ink-soft font-semibold">Gramos con alimento "weight management" (320 kcal/100g)</p>
                  <p className="font-mono text-[15px] mt-1">
                    (897 / 320) × 100 = <strong className="text-terracotta">280 g/día</strong>
                  </p>
                </div>
              </div>

              <p className="text-[16px] leading-relaxed mt-4">
                Pasamos de 380g a 280g/día (cambiando además a alimento más liviano). En 4-6 meses
                Toto debería volver a 30 kg, sin estrés digestivo.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Cuándo SÍ ir al veterinario
              </h2>
              <ul className="space-y-2 text-[16px] pl-5 list-disc marker:text-terracotta">
                <li>Si calificó "obesidad" en el test</li>
                <li>Si en 2 meses no logra bajar peso siguiendo el plan</li>
                <li>Si la mascota se ve apática, sin energía durante la dieta</li>
                <li>Si es un gato esterilizado adulto (riesgo de diabetes ya alto)</li>
                <li>Si tiene otra condición médica (cardíaca, articular, renal)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Kulliñ aplica este cálculo automáticamente
              </h2>
              <p className="text-[16px] leading-relaxed">
                En el onboarding marcamos "sobrepeso" como condición. Aplicamos el factor 1.0 (perro)
                o 0.8 (gato) automáticamente. Cada vez que actualizas el peso, recalculamos
                la ración objetivo.
              </p>

              <div className="mt-6 mb-12 text-center">
                <Link href="/onboarding" className="btn-primary inline-block max-w-[320px]">
                  Crear plan para mi mascota →
                </Link>
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
                  <Link href="/blog/cuanto-debe-comer-mi-gato" className="text-moss-deep underline">
                    Cuánto debe comer tu gato al día
                  </Link>
                </li>
                <li>
                  <Link href="/blog/cambio-gradual-de-alimento" className="text-moss-deep underline">
                    Cómo cambiar el alimento de tu mascota sin que se enferme
                  </Link>
                </li>
              </ul>
            </section>

            <p className="text-[12px] text-ink-soft mt-10 pt-6 border-t border-ink/10">
              Este artículo es educativo. Antes de iniciar plan de pérdida de peso, consulta con
              veterinario especialmente si tu mascota tiene comorbilidades o es senior.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
