import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';

export const metadata = {
  title: 'Términos y Condiciones — Kulliñ',
  description: 'Condiciones de uso del servicio Kulliñ.',
};

export default function TerminosPage() {
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
        <h1 className="font-display text-3xl text-ink leading-tight mb-2">
          Términos y <em className="text-terracotta italic font-normal">Condiciones</em>
        </h1>
        <p className="text-ink-soft text-sm mb-8">
          Última actualización: 17 de mayo de 2026 · Versión 1.0
        </p>

        <article className="prose prose-sm max-w-none space-y-6 text-ink">

          <section>
            <h2 className="font-display text-xl text-ink mb-3">1. Qué es Kulliñ</h2>
            <p className="text-[15px] leading-relaxed">
              Kulliñ es una plataforma web (en adelante "el Servicio") que ayuda a dueños de mascotas
              a calcular la ración nutricional diaria de sus animales, recomendar alimentos compatibles
              con su perfil y recibir recordatorios cuando se acerque el agotamiento del alimento.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              El Servicio es operado por <strong>[NOMBRE LEGAL O RUT]</strong>, con domicilio en
              <strong> [CIUDAD]</strong>, Chile. Estos términos rigen tu uso del Servicio.
              <strong> Al crear una cuenta, aceptas estos términos.</strong> Si no estás de acuerdo,
              no uses el Servicio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">2. Quién puede usar el Servicio</h2>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta">
              <li>Debes ser mayor de 18 años, o tener autorización de tu tutor legal si eres menor.</li>
              <li>Debes proporcionar información veraz, actualizada y completa.</li>
              <li>Eres responsable de mantener segura tu cuenta y dispositivo.</li>
              <li>No puedes usar el Servicio para fines ilegales ni en violación de estos términos.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">3. Naturaleza de las recomendaciones</h2>
            <div className="bg-gold/10 border-l-4 border-gold p-4 rounded-r-xl">
              <p className="text-[15px] leading-relaxed font-medium">
                ⚠️ <strong>Importante:</strong> Kulliñ NO es un servicio veterinario.
              </p>
            </div>
            <p className="text-[15px] leading-relaxed mt-3">
              Las raciones nutricionales y recomendaciones de productos que entrega el Servicio se basan en
              fórmulas estándar publicadas (National Research Council 2006 — Nutrient Requirements of Dogs and Cats,
              y World Small Animal Veterinary Association — WSAVA Global Nutrition Guidelines 2011) y en los datos
              que tú declaras sobre tu mascota.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              Estas recomendaciones son <strong>estimaciones generales</strong> y no constituyen diagnóstico,
              tratamiento ni consejo veterinario individualizado. <strong>No reemplazan la consulta con un
              médico veterinario</strong>, especialmente si tu mascota tiene condiciones médicas (diabetes,
              enfermedad renal, alergias, enfermedad gastrointestinal, etc.), está gestante, lactante, o se
              recupera de cirugía.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              <strong>Eres responsable de validar las recomendaciones</strong> con tu veterinario antes de
              hacer cambios significativos en la alimentación de tu mascota.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">4. Exactitud de los datos de productos</h2>
            <p className="text-[15px] leading-relaxed">
              Los datos nutricionales (kcal/100g, proteína, grasa) de los alimentos en nuestro catálogo
              provienen de las fichas técnicas oficiales de cada marca. Los <strong>precios son referenciales</strong>
              y pueden no estar actualizados al momento de tu visita. El precio final lo establece la tienda donde
              realices la compra (Amazon, MercadoLibre, NovaPet u otras). Kulliñ no vende productos directamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">5. Links de afiliados</h2>
            <p className="text-[15px] leading-relaxed">
              Al hacer click en "Recomendar a [tu mascota]", te redirigimos a tiendas de terceros. Si compras
              ahí, <strong>Kulliñ puede recibir una comisión de afiliado</strong> sin costo adicional para ti.
              Esta comisión nos permite mantener el Servicio gratuito.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              <strong>Importante:</strong> nuestras recomendaciones se ordenan por compatibilidad con el perfil
              de tu mascota (algoritmo basado en peso, edad, condición), <strong>no por comisión recibida</strong>.
              Si esto cambia en el futuro, lo declararemos explícitamente.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">6. Propiedad intelectual</h2>
            <p className="text-[15px] leading-relaxed">
              El diseño, código, algoritmo de recomendación y marca <strong>Kulliñ</strong> son propiedad
              exclusiva de su titular. Los nombres y marcas de productos (Royal Canin®, Hill's Science Diet®,
              Purina Pro Plan®, Eukanuba®) son marcas registradas de sus respectivos propietarios. Las usamos
              bajo uso nominativo de buena fe, sin implicar respaldo o asociación.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              Si eres titular de una marca y quieres que retiremos tu producto del catálogo, escribe a
              <a href="mailto:hola@kullin.app" className="text-moss-deep underline"> hola@kullin.app</a>.
              Lo retiraremos en máximo 48 horas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">7. Limitación de responsabilidad</h2>
            <p className="text-[15px] leading-relaxed">
              Kulliñ se entrega "tal cual" sin garantías de ningún tipo. En la máxima medida permitida por la
              ley chilena, no somos responsables de:
            </p>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta mt-2">
              <li>Daños o consecuencias derivadas de seguir recomendaciones sin consulta veterinaria.</li>
              <li>Errores en datos declarados por ti sobre tu mascota.</li>
              <li>Indisponibilidad temporal del Servicio por mantenimiento o problemas técnicos.</li>
              <li>Acciones o productos de tiendas de terceros a las que te redirigimos.</li>
              <li>Cambios en precios, disponibilidad o composición de productos por parte de las marcas.</li>
            </ul>
            <p className="text-[15px] leading-relaxed mt-3">
              Lo anterior <strong>no limita</strong> nuestra responsabilidad por dolo o culpa grave, conforme
              al Art. 1547 del Código Civil chileno.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">8. Suspensión y terminación</h2>
            <p className="text-[15px] leading-relaxed">
              Puedes cerrar tu cuenta cuando quieras desde
              <Link href="/cuenta" className="text-moss-deep underline"> tu página de cuenta</Link> o
              escribiéndonos. Eliminaremos tus datos según se describe en la Política de Privacidad.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              Podemos suspender o cerrar cuentas que violen estos términos, intenten manipular el sistema
              (cuentas falsas, abuso de afiliados), o pongan en riesgo la seguridad del Servicio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">9. Modificaciones</h2>
            <p className="text-[15px] leading-relaxed">
              Podemos actualizar estos términos cuando lo consideremos necesario. Notificaremos cambios
              significativos por correo electrónico al menos 30 días antes. Tu uso continuado tras el plazo
              implica aceptación. Si no aceptas los cambios, puedes cerrar tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">10. Ley aplicable y jurisdicción</h2>
            <p className="text-[15px] leading-relaxed">
              Estos términos se rigen por la <strong>legislación chilena</strong>. Cualquier controversia
              se someterá a los tribunales ordinarios de justicia con jurisdicción en
              <strong> [CIUDAD]</strong>, Chile, renunciando expresamente a cualquier otro fuero.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">11. Derecho de retracto</h2>
            <p className="text-[15px] leading-relaxed">
              Conforme a la Ley 19.496 sobre Protección de los Derechos de los Consumidores, si has aceptado
              algún servicio pago (por ejemplo, suscripciones premium futuras), tienes derecho a retractarte
              dentro de 10 días desde la contratación, sin expresar causa.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              Actualmente Kulliñ es <strong>gratuito</strong>. Si introducimos servicios pagos en el futuro,
              te informaremos claramente las condiciones antes de cobrar.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">12. Contacto</h2>
            <p className="text-[15px] leading-relaxed">
              <a href="mailto:hola@kullin.app" className="text-moss-deep underline">hola@kullin.app</a>
            </p>
          </section>

          <p className="text-[12px] text-ink-soft mt-12 pt-6 border-t border-ink/10">
            Ver también nuestra <Link href="/privacidad" className="text-moss-deep underline">Política de Privacidad</Link>.
          </p>
        </article>
      </main>
    </>
  );
}
