import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo cambiar el alimento de tu mascota sin que se enferme',
  description:
    'Cambiar de alimento de golpe causa diarrea y vómitos. Te explico el método de transición de 7 días que usan los veterinarios, paso a paso.',
  openGraph: {
    title: 'Cómo cambiar el alimento de tu mascota sin que se enferme',
    description: 'El método de transición de 7 días explicado paso a paso.',
    type: 'article',
    publishedTime: '2026-05-17T00:00:00Z',
  },
  alternates: {
    canonical: 'https://kullin.app/blog/cambio-gradual-de-alimento',
  },
};

export default function BlogCambio() {
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
              Salud digestiva · 4 min de lectura
            </div>
            <h1 className="font-display text-[36px] sm:text-[42px] text-ink leading-[1.1] tracking-tight mb-3">
              Cómo cambiar el alimento de tu mascota <em className="text-terracotta italic font-normal">sin que se enferme</em>
            </h1>
            <p className="text-ink-soft text-[17px] leading-relaxed">
              Si cambias de marca o de fórmula de un día para otro, tu mascota probablemente tendrá
              diarrea, vómitos o gases en las primeras 48 horas. La solución es simple: hacer una
              transición gradual de 7-10 días.
            </p>
            <p className="text-sm text-ink-soft mt-4">17 de mayo de 2026 · Por Kulliñ</p>
          </header>

          <div className="space-y-6 text-ink">

            <section>
              <h2 className="font-display text-2xl text-ink mt-8 mb-3">
                Por qué pasa esto
              </h2>
              <p className="text-[16px] leading-relaxed">
                La microbiota intestinal de tu mascota (las bacterias que digieren la comida) está
                adaptada a la fórmula específica que está comiendo. Cambiar de marca significa
                cambiar las proporciones de proteína, grasa, fibra y minerales, lo que obliga a la
                microbiota a <strong>reorganizarse</strong>. Mientras eso pasa, hay síntomas digestivos.
              </p>
              <p className="text-[16px] leading-relaxed">
                Las mascotas sensibles digestivamente (perros con historial de gastritis, gatos con
                bolas de pelo, cachorros y gatitos) son aún más vulnerables. Pero <strong>cualquier
                animal</strong> puede tener problemas si el cambio es brusco.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                El método estándar: 7 días
              </h2>
              <p className="text-[16px] leading-relaxed">
                Es el protocolo recomendado por WSAVA y la mayoría de fabricantes. Reemplaza el
                alimento viejo por el nuevo en proporciones crecientes:
              </p>

              <div className="overflow-x-auto -mx-6 sm:mx-0 my-4">
                <table className="w-full text-[14px] border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th className="text-left py-3 px-3 font-semibold">Día</th>
                      <th className="text-right py-3 px-3 font-semibold">Viejo</th>
                      <th className="text-right py-3 px-3 font-semibold">Nuevo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    <tr><td className="py-2.5 px-3">1-2</td><td className="text-right px-3 font-mono">75%</td><td className="text-right px-3 font-mono">25%</td></tr>
                    <tr><td className="py-2.5 px-3">3-4</td><td className="text-right px-3 font-mono">50%</td><td className="text-right px-3 font-mono">50%</td></tr>
                    <tr><td className="py-2.5 px-3">5-6</td><td className="text-right px-3 font-mono">25%</td><td className="text-right px-3 font-mono">75%</td></tr>
                    <tr><td className="py-2.5 px-3">7+</td><td className="text-right px-3 font-mono">0%</td><td className="text-right px-3 font-mono">100%</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[16px] leading-relaxed mt-4">
                Mezcla las dos comidas en el plato (o en la bolsa para que no falle). No los
                separes en horarios distintos, porque entonces el sistema digestivo no se adapta de
                forma uniforme.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Cuándo extender a 10-14 días
              </h2>
              <ul className="space-y-2 text-[16px] pl-5 list-disc marker:text-terracotta">
                <li><strong>Cachorros y gatitos</strong> menores de 6 meses</li>
                <li><strong>Senior</strong> con sistema digestivo más sensible</li>
                <li>Mascotas con <strong>historial de gastritis o colitis</strong></li>
                <li>Cambio entre <strong>tipos muy distintos</strong> (ej: pollo a salmón, croqueta a húmedo)</li>
                <li>Razas <strong>brachiocefálicas</strong> (Bulldog, Pug, Persa) que tienden a comer rápido</li>
              </ul>
              <p className="text-[16px] leading-relaxed mt-3">
                En esos casos, ajusta la tabla anterior estirando cada etapa 2-3 días en vez de 1-2.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Señales de alerta
              </h2>
              <p className="text-[16px] leading-relaxed mb-3">
                Para todo el proceso si tu mascota presenta:
              </p>
              <ul className="space-y-2 text-[16px] pl-5 list-disc marker:text-terracotta">
                <li>Diarrea persistente más de 48 horas</li>
                <li>Vómitos repetidos (más de 2 en un día)</li>
                <li>Sangre en deposiciones</li>
                <li>Letargia, no querer moverse</li>
                <li>Rechazo total del alimento</li>
              </ul>
              <p className="text-[16px] leading-relaxed mt-3">
                <strong>Vuelve al alimento anterior y consulta veterinario.</strong> No insistas con la
                transición — puede haber alergia al nuevo alimento o problema digestivo subyacente.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Errores comunes
              </h2>
              <ol className="space-y-3 text-[16px] pl-5 list-decimal marker:text-terracotta marker:font-bold">
                <li>
                  <strong>Cambiar porque está en oferta.</strong> Si tu mascota va bien con su alimento,
                  no lo cambies por ahorrar $5.000. El costo veterinario por gastritis aguda es 10 veces más.
                </li>
                <li>
                  <strong>No leer la tabla del nuevo alimento.</strong> Cada marca tiene distinta densidad
                  calórica (kcal/100g). Si pasas de uno de 380 kcal/100g a otro de 420 kcal/100g,
                  necesitas <em>menos gramos</em> aunque sea para el mismo peso.
                </li>
                <li>
                  <strong>Hacer la transición y subir cantidad al mismo tiempo.</strong> Si además quieres
                  ajustar la ración, hazlo después de completar la transición.
                </li>
                <li>
                  <strong>Premios y restos de comida humana durante la transición.</strong> Ya hay
                  suficiente cambio. Mantén el resto de la dieta estable.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-2xl text-ink mt-10 mb-3">
                Tip: recalcula la ración con el nuevo alimento
              </h2>
              <p className="text-[16px] leading-relaxed">
                Después de los 7 días, calcula los gramos exactos del nuevo alimento. La fórmula
                cambia porque cambia el kcal/100g. En Kulliñ lo hacemos automáticamente: solo
                indicas qué alimento estás dando y recalculamos.
              </p>

              <div className="mt-6 mb-12 text-center">
                <Link href="/onboarding" className="btn-primary inline-block max-w-[320px]">
                  Calcular la ración nueva →
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
                  <Link href="/blog/sobrepeso-en-mascotas" className="text-moss-deep underline">
                    Cómo saber si tu mascota tiene sobrepeso (y qué hacer)
                  </Link>
                </li>
              </ul>
            </section>

            <p className="text-[12px] text-ink-soft mt-10 pt-6 border-t border-ink/10">
              Este artículo es educativo y no reemplaza consulta veterinaria. Si tu mascota tiene
              alergias alimentarias o enfermedad gastrointestinal previa, el cambio de alimento
              debe ser supervisado por un profesional.
            </p>
          </div>
        </article>
      </main>
    </>
  );
}
