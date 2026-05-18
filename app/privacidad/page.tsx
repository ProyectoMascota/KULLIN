import Link from 'next/link';
import { AppHeader } from '@/components/AppHeader';

export const metadata = {
  title: 'Política de Privacidad — Kulliñ',
  description: 'Cómo Kulliñ trata tus datos personales conforme a la Ley 21.719 de Chile.',
};

export default function PrivacidadPage() {
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
          Política de <em className="text-terracotta italic font-normal">Privacidad</em>
        </h1>
        <p className="text-ink-soft text-sm mb-2">Última actualización: 17 de mayo de 2026</p>
        <p className="text-ink-soft text-sm mb-8">
          Versión 1.0 · Cumple Ley 19.628 y se adecúa a Ley 21.719 (vigente desde 1 de diciembre de 2026).
        </p>

        <article className="prose prose-sm max-w-none space-y-6 text-ink">

          <section>
            <h2 className="font-display text-xl text-ink mb-3">1. Quiénes somos</h2>
            <p className="text-[15px] leading-relaxed">
              <strong>Kulliñ</strong> es una plataforma web operada por
              <strong> [NOMBRE LEGAL O RUT DE LA PERSONA RESPONSABLE]</strong>,
              con domicilio en <strong>[CIUDAD]</strong>, Chile. Para efectos de la
              Ley 21.719 sobre protección de datos personales,
              actuamos como <em>Responsable del Tratamiento</em> de los datos personales
              que recolectamos a través del sitio kullin.app.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              Contacto: <a href="mailto:hola@kullin.app" className="text-moss-deep underline">hola@kullin.app</a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">2. Qué datos recolectamos</h2>
            <p className="text-[15px] leading-relaxed mb-3">
              Recolectamos solo lo mínimo necesario para entregarte el servicio:
            </p>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta">
              <li>
                <strong>Datos de identificación:</strong> tu correo electrónico (obligatorio para crear cuenta)
                y tu nombre (opcional).
              </li>
              <li>
                <strong>Datos de tu mascota:</strong> nombre, especie, raza, peso, edad, nivel de actividad,
                estado reproductivo (esterilización) y condición de salud declarada. Estos datos
                son sobre el animal, no sobre ti, y no son datos sensibles en el sentido legal.
              </li>
              <li>
                <strong>Datos de uso:</strong> compras que registras manualmente, historial de pesajes de tu mascota,
                clicks en recomendaciones de productos, configuración de notificaciones.
              </li>
              <li>
                <strong>Datos técnicos:</strong> dirección IP, tipo de navegador y dispositivo, fecha y hora
                de tus visitas. Estos se usan solo para seguridad y análisis agregado.
              </li>
            </ul>
            <p className="text-[15px] leading-relaxed mt-3">
              <strong>No recolectamos datos personales sensibles</strong> sobre ti (origen étnico, salud,
              orientación sexual, opiniones políticas, datos biométricos).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">3. Para qué usamos tus datos</h2>
            <p className="text-[15px] leading-relaxed mb-3">
              Tratamos tus datos personales con las siguientes finalidades específicas:
            </p>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta">
              <li>Autenticarte en la plataforma (envío de magic link).</li>
              <li>Calcular la ración nutricional ideal y recomendar productos para tu mascota.</li>
              <li>Enviarte recordatorios cuando estimamos que se acerca el agotamiento del alimento.</li>
              <li>Permitirte registrar y consultar tu historial de compras y pesajes.</li>
              <li>Mejorar el servicio mediante análisis agregado y anonimizado.</li>
              <li>Cumplir obligaciones legales cuando corresponda.</li>
            </ul>
            <p className="text-[15px] leading-relaxed mt-3">
              <strong>No vendemos tus datos a terceros</strong> bajo ninguna circunstancia. <strong>No
              entrenamos modelos de inteligencia artificial</strong> con tus datos personales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">4. Base de licitud del tratamiento</h2>
            <p className="text-[15px] leading-relaxed">
              Procesamos tus datos bajo las siguientes bases legales (Art. 12 Ley 21.719):
            </p>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta mt-2">
              <li><strong>Consentimiento</strong> libre, informado y específico que otorgas al crear cuenta.</li>
              <li><strong>Ejecución del servicio</strong> que solicitas (cálculos, recomendaciones, recordatorios).</li>
              <li><strong>Interés legítimo</strong> en mejorar el servicio (análisis agregado).</li>
            </ul>
            <p className="text-[15px] leading-relaxed mt-3">
              Puedes retirar tu consentimiento en cualquier momento desde tu cuenta o escribiéndonos.
              Retirarlo no afecta la legalidad del tratamiento anterior.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">5. Con quién compartimos tus datos</h2>
            <p className="text-[15px] leading-relaxed mb-3">
              Usamos proveedores tecnológicos que actúan como <em>Encargados del Tratamiento</em>
              y solo procesan tus datos siguiendo nuestras instrucciones:
            </p>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta">
              <li>
                <strong>Supabase</strong> (PostgreSQL gestionado) — almacenamiento de base de datos.
                Servidores en EE.UU. Cumple SOC 2 Type II.
              </li>
              <li>
                <strong>Vercel</strong> — hosting de la aplicación web. Servidores globales.
              </li>
              <li>
                <strong>Resend</strong> — envío de correos transaccionales (magic links y recordatorios).
                Servidores en EE.UU.
              </li>
            </ul>
            <p className="text-[15px] leading-relaxed mt-3">
              Al usar Kulliñ, autorizas expresamente la <strong>transferencia internacional de tus datos</strong>
              a estos proveedores fuera de Chile, los cuales mantienen estándares de seguridad equivalentes
              o superiores a los exigidos por la legislación chilena.
            </p>
            <p className="text-[15px] leading-relaxed mt-3">
              <strong>Links de afiliados:</strong> cuando haces click en "Recomendar a tu mascota",
              te redirigimos a tiendas de terceros (Amazon, MercadoLibre, NovaPet u otras). Esas tiendas
              tienen sus propias políticas de privacidad. No les compartimos tu correo ni datos personales,
              solo un identificador anónimo de click para medir conversiones.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">6. Cuánto tiempo guardamos tus datos</h2>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta">
              <li><strong>Cuenta activa:</strong> mientras la mantengas activa.</li>
              <li><strong>Cuenta inactiva 24 meses:</strong> te enviamos aviso y, sin respuesta, eliminamos los datos.</li>
              <li><strong>Solicitud de eliminación:</strong> ejecutamos en máximo 15 días hábiles.</li>
              <li><strong>Logs técnicos:</strong> 12 meses por razones de seguridad.</li>
              <li><strong>Datos anonimizados:</strong> podemos conservarlos sin límite para análisis agregado.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">7. Tus derechos</h2>
            <p className="text-[15px] leading-relaxed mb-3">
              Conforme a la Ley 21.719, tienes derecho a:
            </p>
            <ul className="space-y-2 text-[15px] pl-5 list-disc marker:text-terracotta">
              <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos.</li>
              <li><strong>Supresión (olvido):</strong> que eliminemos tus datos.</li>
              <li><strong>Oposición:</strong> oponerte a tratamientos específicos.</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado y legible (JSON o CSV).</li>
              <li><strong>Limitación:</strong> que restrinjamos ciertos usos.</li>
              <li><strong>No ser objeto de decisiones automatizadas</strong> que te afecten significativamente.</li>
            </ul>
            <p className="text-[15px] leading-relaxed mt-3">
              Para ejercer cualquier derecho, escríbenos a
              <a href="mailto:hola@kullin.app" className="text-moss-deep underline"> hola@kullin.app</a> con tu correo registrado.
              Responderemos en máximo 15 días hábiles. Si no quedas conforme, puedes reclamar ante la
              <strong> Agencia de Protección de Datos Personales</strong> (a partir de diciembre de 2026)
              o ante los tribunales chilenos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">8. Seguridad</h2>
            <p className="text-[15px] leading-relaxed">
              Aplicamos medidas técnicas razonables: cifrado en tránsito (HTTPS/TLS), cifrado en reposo de la base
              de datos, autenticación sin contraseñas (magic link), Row Level Security en PostgreSQL, mínimo
              privilegio de acceso. En caso de brecha de seguridad que comprometa tus datos personales,
              notificaremos a la Agencia de Protección de Datos y a los afectados sin demora indebida,
              conforme a la ley.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">9. Menores de edad</h2>
            <p className="text-[15px] leading-relaxed">
              Kulliñ no está dirigido a menores de 14 años. No recolectamos datos personales de niños/as
              a sabiendas. Si eres menor de 18 años, debes tener autorización de tu madre, padre o tutor legal
              para usar el servicio.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">10. Cookies y tecnologías similares</h2>
            <p className="text-[15px] leading-relaxed">
              Usamos cookies estrictamente necesarias para mantener tu sesión iniciada y por seguridad.
              No usamos cookies de marketing ni rastreadores de terceros sin tu consentimiento.
              Puedes desactivar cookies en tu navegador, pero esto puede afectar tu capacidad de iniciar sesión.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">11. Cambios a esta política</h2>
            <p className="text-[15px] leading-relaxed">
              Podemos actualizar esta política cuando cambien leyes aplicables o nuestras prácticas.
              Notificaremos cambios significativos al menos 30 días antes vía correo electrónico o
              aviso destacado en el sitio. Tu uso continuado tras cambios constituye aceptación de los mismos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl text-ink mb-3">12. Contacto</h2>
            <p className="text-[15px] leading-relaxed">
              Para preguntas sobre privacidad o ejercicio de derechos:<br />
              <a href="mailto:hola@kullin.app" className="text-moss-deep underline">hola@kullin.app</a>
            </p>
          </section>

          <p className="text-[12px] text-ink-soft mt-12 pt-6 border-t border-ink/10">
            Este documento se rige por la legislación chilena, en particular la Ley 19.628 sobre Protección
            de la Vida Privada y, a partir del 1 de diciembre de 2026, la Ley 21.719. Cualquier controversia
            se someterá a los tribunales con jurisdicción en Chile.
          </p>
        </article>
      </main>
    </>
  );
}
