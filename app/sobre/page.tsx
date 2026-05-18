import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre Kulliñ',
  description:
    'Kulliñ es una plataforma chilena que ayuda a tutores de mascotas a alimentar a sus compañeros con precisión, sin marketing disfrazado.',
};

export default function SobrePage() {
  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/" className="text-sm text-ink-soft underline">
            ← Volver
          </Link>
        }
      />
      <main className="container-app pt-2 max-w-[640px] animate-fade-up">
        <h1 className="font-display text-4xl text-ink leading-tight tracking-tight mb-2">
          Sobre <em className="text-terracotta italic font-normal">Kulliñ</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-10">
          La mascota es la interfaz, no el carrito.
        </p>

        <div className="space-y-8 text-ink">

          <section>
            <h2 className="font-display text-2xl mb-3">Qué es</h2>
            <p className="text-[16px] leading-relaxed">
              Kulliñ es una plataforma web que ayuda a tutores chilenos de perros y gatos a calcular
              exactamente cuánta comida necesita su mascota cada día y a recordarles cuándo
              recomprar el alimento antes de que se acabe.
            </p>
            <p className="text-[16px] leading-relaxed mt-3">
              El nombre viene del mapudungún <strong>küllin</strong>, que significa <em>animal</em>.
              Nos pareció el nombre más coherente para un producto que pone al animal en el centro.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Por qué existe</h2>
            <p className="text-[16px] leading-relaxed">
              Las tablas de alimentación de las bolsas dan rangos amplísimos. Los grupos de
              Facebook dan consejos contradictorios. Los influencers recomiendan lo que les pagan.
              Los e-commerce te empujan a comprar lo más caro.
            </p>
            <p className="text-[16px] leading-relaxed mt-3">
              Mientras tanto, <strong>el 60% de las mascotas en Chile tienen sobrepeso</strong> —
              porque la mayoría comemos a ojo. Y los tutores que sí quieren hacerlo bien terminan
              haciendo cálculos en cuadernos.
            </p>
            <p className="text-[16px] leading-relaxed mt-3">
              Kulliñ resuelve eso aplicando fórmulas veterinarias estándar (NRC 2006 y WSAVA 2011) a
              datos reales de cada mascota: peso, raza, edad, actividad, esterilización, condición
              de salud.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Cómo nos sostenemos</h2>
            <p className="text-[16px] leading-relaxed">
              Kulliñ es gratis para el usuario final. Cuando recomendamos un alimento y compras a
              través de nuestro link, recibimos una pequeña comisión de afiliado del comercio (Amazon,
              MercadoLibre, NovaPet u otros). Sin costo adicional para ti.
            </p>
            <p className="text-[16px] leading-relaxed mt-3">
              <strong>Lo que NO hacemos:</strong>
            </p>
            <ul className="space-y-1.5 text-[16px] pl-5 list-disc marker:text-terracotta mt-2">
              <li>No vendemos tus datos</li>
              <li>No mostramos publicidad de terceros</li>
              <li>No ordenamos recomendaciones por comisión recibida</li>
              <li>No entrenamos modelos de IA con tus datos</li>
              <li>No recibimos pagos por destacar marcas</li>
            </ul>
            <p className="text-[16px] leading-relaxed mt-3">
              Las recomendaciones se ordenan estrictamente por compatibilidad con el perfil de tu
              mascota. Si cambiamos esa regla en el futuro, lo declararemos explícitamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">En qué creemos</h2>
            <div className="space-y-3">
              <div className="bg-bg-card border rounded-2xl p-4">
                <p className="font-semibold text-ink mb-1">Las mascotas no son productos.</p>
                <p className="text-[15px] text-ink-soft leading-relaxed">
                  Por eso nuestro flujo gira alrededor del perfil del animal, no de un catálogo.
                </p>
              </div>
              <div className="bg-bg-card border rounded-2xl p-4">
                <p className="font-semibold text-ink mb-1">La precisión importa.</p>
                <p className="text-[15px] text-ink-soft leading-relaxed">
                  Cien gramos extra al día son varios kilos de sobrepeso al año. La diferencia entre
                  cifras vagas y cifras exactas son años de vida saludable.
                </p>
              </div>
              <div className="bg-bg-card border rounded-2xl p-4">
                <p className="font-semibold text-ink mb-1">La confianza se gana.</p>
                <p className="text-[15px] text-ink-soft leading-relaxed">
                  Por eso citamos las fuentes (NRC 2006, WSAVA 2011), explicamos los cálculos, y
                  decimos abiertamente cuándo deberías ir al veterinario en vez de seguir a una app.
                </p>
              </div>
              <div className="bg-bg-card border rounded-2xl p-4">
                <p className="font-semibold text-ink mb-1">Hecho en Chile, para Latinoamérica.</p>
                <p className="text-[15px] text-ink-soft leading-relaxed">
                  Por ahora operamos en Chile. Los precios y los acuerdos con tiendas están pensados
                  para acá. Cuando expandamos, lo haremos sin perder el contexto local.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Quién está detrás</h2>
            <p className="text-[16px] leading-relaxed">
              Kulliñ es un proyecto independiente. No tiene inversores, no está afiliada a ninguna
              marca de alimento, no recibe pagos por destacar productos. Es un proyecto chico que
              quiere hacer las cosas bien y que crezca por boca a boca de tutores satisfechos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-3">Contacto</h2>
            <p className="text-[16px] leading-relaxed">
              Para preguntas, sugerencias, reportar errores, o si quieres colaborar:
            </p>
            <p className="text-[16px] mt-2">
              <a href="mailto:hola@kullin.app" className="text-moss-deep underline">hola@kullin.app</a>
            </p>
          </section>

          <section className="border-t border-ink/10 pt-6 mt-12">
            <h3 className="font-display text-lg text-ink mb-3">¿Empezar?</h3>
            <div className="flex flex-col gap-3 max-w-[320px]">
              <Link href="/onboarding" className="btn-primary text-center">
                Crear perfil de mi mascota →
              </Link>
              <Link href="/blog" className="btn-secondary text-center">
                Leer el blog
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
