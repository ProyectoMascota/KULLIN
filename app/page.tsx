import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';

export default function LandingPage() {
  return (
    <>
      <AppHeader
        rightSlot={
          <Link href="/login" className="text-sm text-ink-soft underline">
            Entrar
          </Link>
        }
      />
      <main className="container-app pt-8 animate-fade-up">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex justify-center -space-x-4 mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-7xl shadow-card relative z-10">
              🐕
              <div className="absolute -inset-1 rounded-full border-2 border-terracotta/30" />
            </div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#e8d4b0] to-gold grid place-items-center text-7xl shadow-card relative z-0">
              🐈
              <div className="absolute -inset-1 rounded-full border-2 border-moss/30" />
            </div>
          </div>
          <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-ink mb-3">
            Que nunca le falte <em className="text-terracotta italic font-normal">comida</em> a tu compañero.
          </h1>
          <p className="text-ink-soft text-[15px] mb-8 px-4">
            Para perros y gatos. Calcula su ración ideal en 1 minuto y nunca te quedes sin comida.
          </p>

          <Link href="/onboarding" className="btn-primary inline-block max-w-[320px]">
            Crear el perfil de mi mascota →
          </Link>
        </div>

        {/* Cómo funciona */}
        <div className="mb-12 px-2">
          <h2 className="font-display text-2xl text-ink mb-6 text-center">
            Cómo funciona
          </h2>

          <div className="space-y-4">
            {[
              { n: '01', t: 'Contanos sobre tu mascota', d: 'Especie, raza, peso, edad y actividad.' },
              { n: '02', t: 'Calculamos su ración exacta', d: 'Usando fórmulas veterinarias NRC 2006.' },
              { n: '03', t: 'Recomendamos su alimento', d: 'Marcas premium ajustadas a su perfil.' },
              { n: '04', t: 'Te avisamos antes que se acabe', d: 'Sin spam. Solo cuando lo necesita.' },
            ].map((s) => (
              <div key={s.n} className="card flex gap-4 items-start mb-0">
                <span className="font-display text-3xl text-terracotta leading-none mt-1">{s.n}</span>
                <div>
                  <h3 className="font-medium text-ink mb-1">{s.t}</h3>
                  <p className="text-sm text-ink-soft">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-ink-soft text-center px-4 leading-relaxed">
          Kulliñ entrega estimaciones basadas en NRC 2006 y WSAVA 2011. <br />
          No reemplaza consulta veterinaria, especialmente en condiciones médicas.
        </p>

        <div className="text-[11px] text-ink-soft text-center mt-6 space-x-3">
          <Link href="/sobre" className="underline">Sobre</Link>
          <span>·</span>
          <Link href="/blog" className="underline">Blog</Link>
          <span>·</span>
          <Link href="/preguntas-frecuentes" className="underline">FAQ</Link>
          <span>·</span>
          <Link href="/terminos" className="underline">Términos</Link>
          <span>·</span>
          <Link href="/privacidad" className="underline">Privacidad</Link>
        </div>
      </main>
    </>
  );
}
