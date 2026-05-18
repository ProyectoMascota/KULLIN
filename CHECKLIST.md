# ✅ Checklist final pre-lanzamiento — Kulliñ

> Versión consolidada de TODO lo que falta para llegar al lanzamiento público.
> Sigue el orden. Cada bloque depende del anterior.

---

## 🟡 BLOQUE 1: Setup técnico (45 minutos — HOY o MAÑANA)

### Supabase
- [ ] Crear cuenta en https://supabase.com
- [ ] Crear proyecto "kullin" en región más cercana (us-east-1)
- [ ] SQL Editor → New query → pegar `sql/01_schema.sql` → Run
- [ ] SQL Editor → New query → pegar `sql/02_seed_productos.sql` → Run
- [ ] Verificar: Table Editor → `productos` debe tener 30 filas
- [ ] Verificar: Table Editor → `razas` debe tener 29 filas
- [ ] Settings → API → copiar `URL`, `anon public`, `service_role`
- [ ] Authentication → Providers → Email → confirmar que está ON
- [ ] Authentication → Providers → Email → desactivar "Confirm email" (más fluido en beta)
- [ ] Authentication → URL Configuration → Site URL: `https://kullin.vercel.app`
- [ ] Authentication → URL Configuration → Redirect URLs: agregar `https://kullin.vercel.app/auth/callback`

### Resend
- [ ] Crear cuenta en https://resend.com
- [ ] API Keys → Create API key → nombre "kullin-production" → copiar `re_xxxxx`
- [ ] (Producción más adelante) Domains → agregar `kullin.app` cuando compres el dominio

### Vercel
- [ ] Conectar el repo GitHub a Vercel (Project → Add New)
- [ ] Settings → Environment Variables → agregar las 6 variables:

```
NEXT_PUBLIC_SUPABASE_URL=<copia de Supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<copia de Supabase>
SUPABASE_SERVICE_ROLE_KEY=<copia de Supabase, marca "Sensitive">
RESEND_API_KEY=<copia de Resend>
CRON_SECRET=<genera con: openssl rand -base64 32>
NEXT_PUBLIC_APP_URL=https://kullin.vercel.app
```

- [ ] Cada variable: aplicar a Production, Preview y Development
- [ ] Trigger Deploy → esperar a que termine (3-5 minutos)
- [ ] Settings → Cron Jobs → confirmar que aparece `/api/cron/recordatorios` con schedule `0 13 * * *`

### Reemplazos en código (5 minutos)

- [ ] Abrir `app/terminos/page.tsx`:
  - Buscar `[NOMBRE LEGAL O RUT]` → reemplazar por tu nombre + RUT
  - Buscar `[CIUDAD]` → reemplazar por tu ciudad
- [ ] Abrir `app/privacidad/page.tsx`:
  - Mismos reemplazos
- [ ] Commit y push → Vercel re-despliega automáticamente

---

## 🟢 BLOQUE 2: Test end-to-end con tu email real (30 minutos)

- [ ] Abrir `https://kullin.vercel.app` desde tu celular
- [ ] Tocar "Crear el perfil de mi mascota"
- [ ] Onboarding completo con datos de prueba (tu mascota real es mejor)
- [ ] Verificar que llega el magic link a tu inbox
- [ ] Hacer click en el magic link → debe volver a kullin.vercel.app autenticado
- [ ] Completar onboarding hasta el resumen → tocar "Crear perfil"
- [ ] Verificar que aparece el home de mascota con:
  - [ ] Avatar y nombre correctos
  - [ ] Ración diaria calculada (debe coincidir con NRC 2006)
  - [ ] 3 recomendaciones de producto
  - [ ] Match % visible
- [ ] Tocar "Marcar compra" → registrar una compra ficticia hace 40 días
- [ ] Volver al home → la barra de comida debe estar en rojo (pocos días restantes)
- [ ] Forzar el cron desde terminal:

```bash
curl https://kullin.vercel.app/api/cron/recordatorios \
  -H "Authorization: Bearer $CRON_SECRET"
```

- [ ] Verificar respuesta: `{ "procesados": 1, "enviados": 1 }`
- [ ] **Revisar tu inbox** — debe llegar el email de recordatorio con diseño de marca
- [ ] Tocar el link "Pedir para [mascota]" → debe abrir tienda con UTMs en URL
- [ ] En Supabase → Table Editor → `clicks_afiliado` → debe haber un registro

**Si algo falla en este bloque, parar y resolver antes de seguir.**

---

## 🔵 BLOQUE 3: Outreach comercial (1 hora — en paralelo)

Plantillas en `outreach/PLANTILLAS.md`.

- [ ] Enviar email a NovaPet (https://novapet.cl/contacto)
- [ ] Enviar email a Maskota
- [ ] Enviar email a PetCity
- [ ] Postular a Amazon Associates (México o USA)
- [ ] Crear hoja Google Sheets de tracking con columnas:
      Contacto | Empresa | Email enviado | Follow-up 1 | Follow-up 2 | Estado

Programa follow-ups a 5 días hábiles. Si no contestan al segundo, archivar.

---

## 🟣 BLOQUE 4: Beta cerrada (Semana 6 — 14 días)

Plan completo en `outreach/BETA_RECLUTAMIENTO.md`.

### Preparación (días 1-3)
- [ ] Crear Google Form de feedback (template en `outreach/FORM_FEEDBACK.md`)
- [ ] Pegar link del Form al final del onboarding (componente Resumen)
- [ ] Crear Instagram @kullin_app (post de bienvenida + 1 reel)
- [ ] (Opcional) Crear Twitter/X @kullin_app
- [ ] Definir lista de 5-8 amigos cercanos para soft launch

### Soft launch (días 4-7)
- [ ] Mandar mensaje WhatsApp a los 5-8 amigos cercanos
- [ ] Responder en menos de 4 horas a cualquier feedback
- [ ] Arreglar bugs evidentes detectados

### Reclutamiento abierto (días 8-14)
- [ ] Publicar en r/perros y r/Chile (Reddit)
- [ ] Publicar en 4-6 grupos de Facebook (1-2 por día, no todos juntos)
- [ ] Publicar thread en Twitter
- [ ] Compartir en Instagram

### Métricas a trackear (Google Sheets diario)

| Día | Visitas | Onboarding completo | Compras | Recordatorios |
|---|---|---|---|---|

**Objetivo final:** 30+ onboardings completos, NPS > 30 con 15+ respuestas.

---

## 🟤 BLOQUE 5: Iteración (Semana 7)

- [ ] Exportar respuestas del Google Form a Sheets
- [ ] Categorizar feedback en 4 cubetas (bug, fricción, feature request, fuera de scope)
- [ ] Hacer release con bugs + top 3 fricciones (NO todo lo solicitado)
- [ ] Notificar a beta testers que se aplicaron sus sugerencias
- [ ] Configurar Vercel Analytics o Plausible
- [ ] Decidir: ¿lanzar al público en semana 8 o ampliar beta 1 semana más?
- [ ] (Opcional) Configurar WhatsApp con wa.me para recordatorios

---

## 🔴 BLOQUE 6: Lanzamiento público (Semana 8)

### Legal
- [ ] Contratar abogado para revisión 1 hora (plantilla en `outreach/ABOGADO.md`)
- [ ] Aplicar correcciones sugeridas
- [ ] Decidir estructura: persona natural vs EIRL/SpA

### Dominio
- [ ] Comprar dominio (.cl ~$10.000/año o .app ~$14 USD/año)
- [ ] Configurar dominio en Vercel
- [ ] Configurar dominio en Resend (verificar con DNS records DKIM/SPF)
- [ ] Actualizar `NEXT_PUBLIC_APP_URL` en Vercel a dominio final
- [ ] Actualizar Site URL y Redirect URLs en Supabase

### SEO + analítica
- [ ] Crear cuenta en Google Search Console
- [ ] Verificar propiedad del dominio (vía DNS o HTML tag)
- [ ] Enviar sitemap.xml
- [ ] (Opcional) Bing Webmaster Tools
- [ ] Verificar que /blog y /blog/cuanto-debe-comer-mi-perro están indexables
- [ ] Crear Google Analytics 4 o Plausible

### Marketing de lanzamiento
- [ ] Preparar post de Product Hunt
- [ ] Preparar email para tus contactos
- [ ] Programar 3-5 posts en Instagram para semana de lanzamiento
- [ ] Compartir el blog post "Cómo calcular cuánto debe comer tu perro"
- [ ] Avisar a los 30 beta testers que pueden compartir con conocidos

---

## 📊 Métricas para Fase 2 (acuerdo directo con distribuidor)

Esperá a tener estas métricas antes de pasar al siguiente nivel:

- [ ] 100+ usuarios activos mensuales
- [ ] 30+ compras registradas/mes
- [ ] Tasa click-afiliado > 15%
- [ ] Al menos 1 marca confirmando que las ventas vienen de Kulliñ
- [ ] NPS > 40 con 50+ respuestas

---

## 🎯 Resumen del calendario

| Semana | Foco | Tiempo tuyo |
|---|---|---|
| **5** (esta) | Setup técnico + outreach | 3-4 horas |
| **6** (próxima) | Beta cerrada con 20-30 personas | 4-6 horas |
| **7** | Iteración basada en feedback | 3-4 horas |
| **8** | Lanzamiento público | 4-6 horas |

**Total: ~15-20 horas de trabajo distribuidas en 4 semanas.**

---

## 📞 Cuando algo falle

Errores comunes y soluciones:

| Problema | Solución |
|---|---|
| Magic link no llega | Verificar RESEND_API_KEY en Vercel; revisar Spam |
| Cron no se dispara | Verificar `vercel.json` en raíz; verificar que Vercel detectó cron job |
| "Mascota no encontrada" | RLS en Supabase requiere sesión activa; logout y reintentar |
| Build falla en Vercel | Faltan env vars; verificar las 6 estén configuradas |
| OG image no carga | Esperar 1-2 minutos tras deploy; chequear /opengraph-image directo |
| Magic link envía a localhost | Configurar Site URL en Supabase Auth |
