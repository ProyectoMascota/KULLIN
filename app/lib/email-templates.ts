// =====================================================================
// app/lib/email-templates.ts
// Templates HTML compatibles con Gmail, Outlook, Apple Mail, Yahoo.
// Reglas: tablas (no flex/grid), inline styles, ancho máx 600px,
// fuentes web-safe con fallback, imágenes con alt y width fijos.
// =====================================================================

import { emojiOf, getSpecies, type Especie } from './species-config';

interface RecordatorioParams {
  nombre_dueno: string;
  nombre_mascota: string;
  especie: Especie;
  dias_restantes: number;
  producto: {
    marca: string;
    linea: string;
    formatos: { kg: number; precio_clp: number; link_afiliado: string }[];
  };
  click_url: string;
}

export function templateRecordatorio(p: RecordatorioParams): string {
  const emoji = emojiOf(p.especie);
  const config = getSpecies(p.especie);
  const urgente = p.dias_restantes <= 2;
  const acabado = p.dias_restantes <= 0;

  const colorAcento = acabado ? '#c4623a' : urgente ? '#d4a843' : '#4a6741';
  const tituloPrincipal = acabado
    ? `Se acabó la comida de ${p.nombre_mascota}`
    : urgente
    ? `${p.dias_restantes} días de comida`
    : `Faltan ${p.dias_restantes} días`;

  // Barra de comida en HTML usando tabla (compatible con todos los clientes)
  const totalDias = 45; // duración promedio referencial
  const pctRestante = Math.max(0, Math.min(100, (p.dias_restantes / totalDias) * 100));

  // Elegir formato sugerido (segundo más grande = más popular)
  const formatoSugerido =
    p.producto.formatos.sort((a, b) => b.kg - a.kg)[
      Math.min(1, p.producto.formatos.length - 1)
    ];
  const precioFmt = formatoSugerido?.precio_clp
    ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(formatoSugerido.precio_clp)
    : '';

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${tituloPrincipal}</title>
<!--[if mso]>
<style type="text/css">
  table { border-collapse: collapse; }
  td { font-family: Arial, sans-serif; }
</style>
<![endif]-->
<style type="text/css">
  body, table, td, div, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
  body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
  a { color: ${colorAcento}; text-decoration: none; }
  @media screen and (max-width: 600px) {
    .container { width: 100% !important; }
    .pad-mobile { padding-left: 20px !important; padding-right: 20px !important; }
    .ration-number { font-size: 44px !important; }
    .pet-name { font-size: 26px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background-color:#f4ede0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#2a2418;">

<!-- Preheader (texto oculto que aparece en preview) -->
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all;">
  ${acabado ? `${p.nombre_mascota} ya no tiene comida` : `Pídela ahora para que ${p.nombre_mascota} no se quede sin comer`}
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</div>

<!-- Wrapper -->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4ede0;">
  <tr>
    <td align="center" style="padding: 24px 12px;">

      <!-- Container -->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="container" style="max-width:600px; width:100%; background-color:#fbf6ec; border-radius:20px; overflow:hidden;">

        <!-- Header -->
        <tr>
          <td class="pad-mobile" style="padding: 24px 32px 8px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <div style="font-family: Georgia, 'Times New Roman', serif; font-weight:bold; font-size:20px; color:#2d4127; letter-spacing:-0.5px;">
                    kulli<span style="color:#c4623a;">ñ</span>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hero: mascota + estado -->
        <tr>
          <td class="pad-mobile" align="center" style="padding: 16px 32px 8px;">
            <!-- Avatar grande -->
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" width="120" height="120" style="background-color:#e8d4b0; border-radius:60px; font-size:64px; line-height:120px; text-align:center;">
                  ${emoji}
                </td>
              </tr>
            </table>

            <h1 class="pet-name" style="margin: 16px 0 4px; font-family: Georgia, 'Times New Roman', serif; font-weight:normal; font-size:30px; color:#2a2418; letter-spacing:-0.5px;">
              ${p.nombre_mascota}
            </h1>
            <p style="margin:0 0 24px; color:#6b5e4a; font-size:14px;">
              ${config.conArticulo.charAt(0).toUpperCase() + config.conArticulo.slice(1)} necesita atención
            </p>
          </td>
        </tr>

        <!-- Barra de comida -->
        <tr>
          <td class="pad-mobile" style="padding: 8px 32px 24px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f4ede0; border-radius:14px; padding:18px;">
              <tr>
                <td style="padding: 18px;">
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="font-size:12px; font-weight:bold; color:#6b5e4a; letter-spacing:1px; text-transform:uppercase;">
                        Comida restante
                      </td>
                      <td align="right" class="ration-number" style="font-family: Georgia, serif; font-size:32px; font-weight:bold; color:${colorAcento}; line-height:1;">
                        ${p.dias_restantes}<span style="font-size:14px; font-family:Arial, sans-serif; color:#6b5e4a; font-weight:normal;"> días</span>
                      </td>
                    </tr>
                  </table>

                  <!-- Barra visual con tabla -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:14px; background-color:#e8d4b0; border-radius:6px; height:12px; line-height:0;">
                    <tr>
                      <td style="background-color:${colorAcento}; height:12px; line-height:0; border-radius:6px; width:${pctRestante}%; mso-line-height-rule:exactly;">
                        &nbsp;
                      </td>
                      <td style="width:${100 - pctRestante}%;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Mensaje principal -->
        <tr>
          <td class="pad-mobile" style="padding: 0 32px 24px;">
            <p style="margin:0 0 12px; font-size:16px; line-height:1.5; color:#2a2418;">
              Hola ${p.nombre_dueno},
            </p>
            <p style="margin:0; font-size:16px; line-height:1.5; color:#2a2418;">
              ${
                acabado
                  ? `<strong>${p.nombre_mascota} ya no tiene comida</strong>. Pídele su alimento ahora para que pueda comer esta noche.`
                  : urgente
                  ? `Solo quedan <strong>${p.dias_restantes} días</strong> de comida. Te conviene pedir ahora para que no haya cortes.`
                  : `Faltan <strong>${p.dias_restantes} días</strong> para que se le acabe el alimento. Aprovecha de pedirlo cuando te quede tiempo.`
              }
            </p>
          </td>
        </tr>

        <!-- Card de producto -->
        <tr>
          <td class="pad-mobile" style="padding: 0 32px 24px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:linear-gradient(135deg,#fbf6ec 0%,#f0e6d2 100%); background-color:#f0e6d2; border:1px solid #d4a843; border-radius:16px;">
              <tr>
                <td style="padding: 20px;">
                  <p style="margin:0 0 4px; font-size:11px; font-weight:bold; color:#c4623a; letter-spacing:1px; text-transform:uppercase;">
                    ${p.producto.marca}
                  </p>
                  <p style="margin:0 0 14px; font-family: Georgia, serif; font-size:18px; font-weight:normal; color:#2a2418; line-height:1.2;">
                    ${p.producto.linea}
                  </p>

                  ${
                    formatoSugerido
                      ? `<p style="margin:0 0 16px; font-size:13px; color:#6b5e4a;">
                          Formato sugerido: <strong>${formatoSugerido.kg} kg</strong> · ${precioFmt}
                        </p>`
                      : ''
                  }

                  <!-- Botón CTA -->
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background-color:#2d4127; border-radius:10px;">
                        <a href="${p.click_url}"
                           style="display:inline-block; padding:14px 28px; font-family:Arial, sans-serif; font-size:15px; font-weight:bold; color:#fbf6ec; text-decoration:none; border-radius:10px;">
                          Pedir para ${p.nombre_mascota} →
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Tip de cuidado -->
        <tr>
          <td class="pad-mobile" style="padding: 0 32px 24px;">
            <p style="margin:0; font-size:13px; color:#6b5e4a; line-height:1.5; border-left:3px solid #d4a843; padding-left:14px;">
              💡 <strong>Tip:</strong> ${config.tipCambioAlimento}
            </p>
          </td>
        </tr>

        <!-- Acción secundaria -->
        <tr>
          <td class="pad-mobile" align="center" style="padding: 0 32px 24px;">
            <a href="https://kullin.app/mascotas" style="font-size:13px; color:#6b5e4a; text-decoration:underline;">
              Cambiar de alimento o ajustar perfil
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color:#f4ede0; padding: 24px 32px;">
            <p style="margin:0 0 8px; font-size:11px; color:#6b5e4a; text-align:center; line-height:1.5;">
              Kulliñ · Cuidamos a tu compañero, no vendemos cosas.
            </p>
            <p style="margin:0; font-size:11px; color:#6b5e4a; text-align:center; line-height:1.5;">
              <a href="https://kullin.app/cuenta/notificaciones" style="color:#6b5e4a; text-decoration:underline;">Cambiar frecuencia</a>
              &nbsp;·&nbsp;
              <a href="https://kullin.app/cuenta/notificaciones?off=1" style="color:#6b5e4a; text-decoration:underline;">Desactivar recordatorios</a>
            </p>
            <p style="margin:14px 0 0; font-size:10px; color:#9b8e7a; text-align:center; line-height:1.4;">
              Las estimaciones se basan en NRC 2006 y WSAVA 2011. No reemplazan consulta veterinaria.
            </p>
          </td>
        </tr>

      </table>
      <!-- /Container -->

    </td>
  </tr>
</table>

</body>
</html>`;
}
