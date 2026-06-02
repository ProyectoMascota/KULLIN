// =====================================================================
// app/lib/email.ts
// Integración con Resend (https://resend.com)
// Free tier: 3.000 emails/mes, 100/día — suficiente para validación.
// =====================================================================
import { Resend } from 'resend';
import { templateRecordatorio } from './email-templates';
import { emojiOf, type Especie } from './species-config';

// Lazy init para que el build no falle si la env var no está aún
function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY no configurada');
  return new Resend(key);
}

// Remitente y reply-to configurables vía env vars.
// Si EMAIL_FROM no está seteada, usamos el dominio de prueba de Resend
// (onboarding@resend.dev) — funciona sin verificación de dominio pero
// SOLO permite enviar al email dueño de la cuenta Resend.
// Cuando tengas dominio propio verificado, setear en Vercel:
//   EMAIL_FROM=Kulliñ <hola@mikullin.cl>
//   EMAIL_REPLY_TO=soporte@mikullin.cl
const FROM = process.env.EMAIL_FROM ?? 'Kulliñ <onboarding@resend.dev>';
const REPLY_TO = process.env.EMAIL_REPLY_TO ?? 'onboarding@resend.dev';

interface RecordatorioParams {
  to: string;
  nombre_dueno: string;
  nombre_mascota: string;
  especie: Especie;
  dias_restantes: number;
  producto: {
    id: string;
    marca: string;
    linea: string;
    formatos: { kg: number; precio_clp: number; link_afiliado: string }[];
  };
  click_url: string;
}

export async function enviarEmailRecordatorio(p: RecordatorioParams) {
  const emoji = emojiOf(p.especie);
  // Construir asunto según urgencia
  let subject: string;
  if (p.dias_restantes <= 0) {
    subject = `A ${p.nombre_mascota} se le acabó la comida ${emoji}`;
  } else if (p.dias_restantes <= 2) {
    subject = `Solo quedan ${p.dias_restantes} días de comida para ${p.nombre_mascota}`;
  } else {
    subject = `A ${p.nombre_mascota} le quedan ${p.dias_restantes} días de comida ${emoji}`;
  }

  const html = templateRecordatorio(p);
  const text = textPlano(p);

  const res = await getResend().emails.send({
    from: FROM,
    to: p.to,
    replyTo: REPLY_TO,
    subject,
    html,
    text,
    tags: [
      { name: 'tipo', value: 'recordatorio_recompra' },
      { name: 'urgencia', value: p.dias_restantes <= 2 ? 'alta' : 'normal' },
    ],
  });

  if (res.error) throw new Error(`Resend error: ${res.error.message}`);
  return res.data;
}

function textPlano(p: RecordatorioParams): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://kullin-six.vercel.app';
  return `Hola ${p.nombre_dueno},

A ${p.nombre_mascota} le quedan ${p.dias_restantes} días de comida.

Su alimento habitual: ${p.producto.marca} ${p.producto.linea}.

Pídelo ahora para que no se quede sin comer:
${p.click_url}

— Kulliñ
Si no quieres recibir estos avisos: ${appUrl}/cuenta`;
}
