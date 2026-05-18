import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes — Kulliñ',
  description: 'Respuestas a las preguntas más comunes sobre Kulliñ: cálculos, datos, privacidad, afiliados.',
};

const FAQS = [
  {
    cat: 'Sobre el producto',
    qa: [
      {
        q: '¿Kulliñ es gratis?',
        a: 'Sí, completamente. No pedimos tarjeta, no tenemos versión paga oculta, no mostramos publicidad. Nos sostenemos con comisiones de afiliado de tiendas como NovaPet, Amazon y MercadoLibre cuando compras un alimento recomendado — sin costo extra para ti.',
      },
      {
        q: '¿Necesito instalar una app?',
        a: 'No. Kulliñ funciona como sitio web desde cualquier celular o computador. Si la usas mucho desde el celular, puedes agregarla al inicio (en iPhone: Compartir → Agregar a inicio; en Android: menú del navegador → Agregar a pantalla de inicio).',
      },
      {
        q: '¿Puedo agregar varias mascotas?',
        a: 'Sí, cuantas quieras. Cada mascota tiene su propio perfil, ración diaria, historial y recordatorios independientes.',
      },
      {
        q: '¿Por qué solo perros y gatos?',
        a: 'Las fórmulas nutricionales para otras especies (conejos, hurones, aves) son muy distintas y específicas. Preferimos hacer dos cosas bien antes de hacer muchas a medias. Si tienes otra especie y te interesa que la agreguemos, escríbenos.',
      },
    ],
  },
  {
    cat: 'Sobre los cálculos',
    qa: [
      {
        q: '¿Las recomendaciones son confiables?',
        a: 'Usamos las fórmulas estándar de la veterinaria moderna: National Research Council (NRC) 2006 y WSAVA Global Nutrition Guidelines 2011. Son las mismas que usan los veterinarios. Pero Kulliñ es una estimación, no diagnóstico. Si tu mascota tiene condiciones médicas, consulta primero con tu veterinario.',
      },
      {
        q: '¿Por qué la cifra de Kulliñ es distinta a la de la bolsa?',
        a: 'Las tablas de las bolsas están calculadas para un animal "promedio": no esterilizado, actividad moderada, sin condiciones. Kulliñ ajusta por esterilización, nivel real de actividad, edad exacta y condición de salud. Por eso la cifra suele ser más precisa (y normalmente menor en mascotas esterilizadas indoor).',
      },
      {
        q: '¿Y si mi mascota tiene una condición médica?',
        a: 'Para sobrepeso, sensibilidad digestiva, pelo largo o problemas articulares, Kulliñ ajusta la recomendación. Para diabetes, enfermedad renal, alergias específicas, cáncer, gestación o lactancia, la ración debe definirla tu veterinario.',
      },
      {
        q: '¿Cómo recalculan si mi mascota baja o sube de peso?',
        a: 'Cuando actualizas el peso en el perfil, recalculamos automáticamente la ración. Te recomendamos pesar a tu mascota cada 1-2 meses y actualizar el dato.',
      },
    ],
  },
  {
    cat: 'Sobre la barra de comida',
    qa: [
      {
        q: '¿Cómo funciona el recordatorio?',
        a: 'Cuando registras una compra (por ejemplo: 15 kg de Royal Canin Maxi Adult el 1 de mayo), calculamos cuántos días dura esa cantidad según los gramos diarios de tu mascota. Te enviamos un email N días antes de que se acabe (por defecto 5, ajustable en tu cuenta).',
      },
      {
        q: '¿Qué pasa si compré el alimento en una tienda física?',
        a: 'Igual puedes registrarlo manualmente. Toca "Marcar compra" en el perfil de tu mascota, elige producto, formato, fecha y listo. La barra de comida se actualiza igual.',
      },
      {
        q: '¿Y si mi mascota come distinto cada día o tiene snacks?',
        a: 'La barra es una estimación basada en los gramos ideales. Si das más o menos, la fecha de agotamiento real variará un poco. Recomendamos al menos pesar la ración base con balanza de cocina.',
      },
    ],
  },
  {
    cat: 'Datos y privacidad',
    qa: [
      {
        q: '¿Qué datos guardan?',
        a: 'Tu correo electrónico, nombre (opcional), datos de tu mascota (peso, edad, raza, etc.), tus compras registradas y clicks en recomendaciones. Nada más. No guardamos información sensible tuya.',
      },
      {
        q: '¿Venden mis datos?',
        a: 'No. Y no lo haremos. Ver detalles en nuestra Política de Privacidad.',
      },
      {
        q: '¿Puedo borrar mi cuenta?',
        a: 'Sí, escribe a hola@kullin.app y eliminamos tus datos en máximo 15 días hábiles, conforme a la Ley 21.719 de protección de datos personales de Chile.',
      },
      {
        q: '¿Cumplen con la nueva ley chilena de datos (21.719)?',
        a: 'Sí. Aunque la Ley 21.719 entra en vigencia el 1 de diciembre de 2026, ya redactamos nuestros documentos para cumplirla desde el inicio.',
      },
    ],
  },
  {
    cat: 'Sobre las marcas y links',
    qa: [
      {
        q: '¿Por qué recomiendan estas marcas y no otras?',
        a: 'Nuestro catálogo actual incluye las 4 marcas premium más distribuidas en Chile: Royal Canin, Hill\'s Science Diet, Purina Pro Plan y Eukanuba. Tienen fichas técnicas claras, distribución amplia y son las que más recomiendan los veterinarios. Iremos agregando más marcas con el tiempo.',
      },
      {
        q: '¿Reciben dinero de las marcas?',
        a: 'No directamente. Recibimos una pequeña comisión cuando compras a través de tiendas afiliadas (Amazon, MercadoLibre, NovaPet). El monto varía entre 1% y 8% del precio según la tienda, y no influye en cuál te recomendamos primero — eso lo decide nuestro algoritmo según el perfil de tu mascota.',
      },
      {
        q: '¿Puedo registrar una compra de una marca que no está en el catálogo?',
        a: 'Por ahora no, pero estamos trabajando en eso. Si tu marca habitual no está, escríbenos a hola@kullin.app y la agregamos.',
      },
    ],
  },
  {
    cat: 'Problemas y soporte',
    qa: [
      {
        q: 'No me llegó el link mágico para entrar.',
        a: 'Revisa tu carpeta de spam. Si tampoco está, espera 2-3 minutos y vuelve a solicitarlo. Si el problema persiste, escríbenos a hola@kullin.app con tu correo y lo resolvemos.',
      },
      {
        q: 'La ración no me parece correcta.',
        a: 'Si la cifra te parece muy alta o muy baja, primero verifica que el peso, edad, esterilización y actividad estén bien registrados en el perfil. Si todo está bien y aún así no te calza, escríbenos — puede ser un caso particular que vale la pena revisar.',
      },
      {
        q: 'Encontré un error o tengo una sugerencia.',
        a: 'Escríbenos a hola@kullin.app. Estamos en beta, el feedback nos sirve mucho.',
      },
    ],
  },
];

export default function FAQPage() {
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
          Preguntas <em className="text-terracotta italic font-normal">frecuentes</em>
        </h1>
        <p className="text-ink-soft text-[15px] mb-10">
          Respuestas a las dudas más comunes. ¿No encuentras la tuya?{' '}
          <a href="mailto:hola@kullin.app" className="underline text-moss-deep">Escríbenos</a>.
        </p>

        <div className="space-y-10">
          {FAQS.map((seccion) => (
            <section key={seccion.cat}>
              <h2 className="font-display text-2xl text-ink mb-4">{seccion.cat}</h2>
              <div className="space-y-3">
                {seccion.qa.map((item) => (
                  <details
                    key={item.q}
                    className="bg-bg-card border rounded-2xl p-4 group cursor-pointer transition-colors hover:border-moss/40"
                  >
                    <summary className="font-semibold text-ink flex justify-between items-start gap-3 list-none">
                      <span className="flex-1">{item.q}</span>
                      <span className="text-ink-soft text-xl group-open:rotate-45 transition-transform leading-none mt-0.5">
                        +
                      </span>
                    </summary>
                    <p className="text-[15px] text-ink-soft leading-relaxed mt-3 pt-3 border-t border-ink/10">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-[15px] text-ink-soft mb-4">
            ¿Listo para empezar?
          </p>
          <Link href="/onboarding" className="btn-primary inline-block max-w-[320px]">
            Crear perfil de mi mascota →
          </Link>
        </div>
      </main>
    </>
  );
}
