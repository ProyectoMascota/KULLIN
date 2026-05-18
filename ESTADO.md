# 📊 Estado de Kulliñ — 17 de mayo de 2026

> Roadmap original: 8 semanas. **Hoy estamos al final de semana 5 / inicio semana 6.**

---

## ✅ HECHO

### Producto core (Semanas 1-4)
- [x] Arquitectura $0 hasta 500 usuarios
- [x] Schema SQL con 7 tablas + RLS + triggers
- [x] Seed de 30 productos reales (Royal Canin, Hills, Purina, Eukanuba)
- [x] 29 razas de Chile pre-cargadas
- [x] Motor nutricional NRC 2006 + WSAVA 2011 (validado con casos reales)
- [x] Algoritmo de recomendación con scoring
- [x] Landing pública en español
- [x] Login con magic link (Supabase)
- [x] Onboarding conversacional de 10 pasos
- [x] Home de mascota con barra de comida + ración diaria + producto recomendado
- [x] Modal de registro de compra
- [x] Historial de compras y pesajes
- [x] Página de cuenta (preferencias + logout)
- [x] 8 endpoints REST con validación Zod
- [x] Sistema de recordatorios con Resend
- [x] Cron job de Vercel (10am Chile diario)
- [x] Tracking de clicks de afiliado con UTMs
- [x] Middleware de auth y rutas protegidas
- [x] Identidad visual (Fraunces + DM Sans + paleta tierra/verde/terracotta)

### Marca y legales (Semana 5 — ENTREGADO HOY)
- [x] Renombre completo a **Kulliñ**
- [x] Términos y Condiciones (Ley 19.628 + adecuación a Ley 21.719)
- [x] Política de Privacidad (cumple GDPR-style por Ley 21.719)
- [x] Footer del landing con links legales
- [x] Consentimiento explícito en login (Términos + Privacidad)

### SEO y previews (Semana 5 — ENTREGADO HOY)
- [x] `robots.txt` configurado (bloquea áreas privadas)
- [x] `sitemap.xml` dinámico
- [x] Meta tags completos (Open Graph + Twitter Card)
- [x] OG image dinámica generada por Next.js (preview en WhatsApp, Twitter, FB)
- [x] Theme color para PWA
- [x] Keywords para SEO en español chileno
- [x] Locale `es_CL`

### Outreach (Semana 5 — ENTREGADO HOY)
- [x] Plantillas comerciales (NovaPet, Amazon Associates, Maskota/PetCity, veterinarios)
- [x] Plan completo de reclutamiento beta para Chile
- [x] Cronograma de 14 días
- [x] Plantillas de posts para WhatsApp, Facebook, Reddit, Twitter

---

## ⚠️ PENDIENTE DE TI ESTA SEMANA (45 minutos de setup técnico)

Sin esto NADA funciona en producción. Es el bloqueador #1.

- [ ] **Crear proyecto Supabase** y ejecutar `01_schema.sql` + `02_seed_productos.sql`
- [ ] **Crear cuenta Resend** y obtener API key
- [ ] **Configurar 6 env vars** en Vercel
- [ ] **Configurar URL de callback** en Supabase Auth
- [ ] **Reemplazar [NOMBRE LEGAL O RUT] y [CIUDAD]** en `app/terminos/page.tsx` y `app/privacidad/page.tsx`
- [ ] **Probar end-to-end con tu email real** (crear cuenta, mascota, compra, forzar cron)

Tiempo estimado: **45 minutos** siguiendo el README.

---

## 🚧 PENDIENTE COMERCIAL ESTA SEMANA (en paralelo, 1 hora)

- [ ] **Postular a Amazon Associates** (México o USA) — plantilla lista en `outreach/PLANTILLAS.md`
- [ ] **Enviar email a NovaPet** (el más importante)
- [ ] **Enviar email a Maskota** y **PetCity**
- [ ] Hacer hoja de tracking en Google Sheets con: contacto, fecha enviado, fecha follow-up, estado

---

## 🎯 SEMANA 6 — Beta cerrada (próxima semana)

Plan completo en `outreach/BETA_RECLUTAMIENTO.md`. Resumen:

- [ ] **Días 1-3:** Setup formal (Google Form de feedback, IG/Twitter de marca)
- [ ] **Días 4-7:** Soft launch con 5-8 amigos cercanos
- [ ] **Días 8-14:** Reclutamiento abierto (Reddit r/perros y r/Chile, grupos FB, Twitter)

**Métricas mínimas objetivo:**
- 50+ inicios de onboarding
- 30+ onboardings completados (>70%)
- 15+ compras registradas
- 5+ recordatorios disparados y abiertos
- NPS > 30

Si no alcanzas la mitad: NO escalar aún, iterar primero el flujo.

---

## ❌ PENDIENTE SEMANAS 7-8

### Semana 7 — Iteración
- [ ] Procesar feedback de la beta (4 cubetas: bug, fricción, feature request, fuera de scope)
- [ ] Release con bugs + top 3 fricciones
- [ ] (Opcional) WhatsApp para recordatorios vía wa.me
- [ ] Configurar Plausible o Vercel Analytics

### Semana 8 — Lanzamiento público
- [ ] Comprar dominio `.cl` (~$10.000 CLP/año) o usar `kullin.app`
- [ ] Configurar dominio en Vercel + Resend (DKIM/SPF)
- [ ] Verificar dominio en Resend para enviar emails desde `@kullin.app`
- [ ] Submit a Google Search Console + Bing Webmaster Tools
- [ ] Publicar en Product Hunt
- [ ] Blog post SEO: "Cómo calcular cuánto debe comer tu perro" (objetivo: keyword principal)
- [ ] Compartir con primeros 200 usuarios

---

## 📈 CRITERIO PARA PASAR A FASE 2

Pasar de afiliados a acuerdo directo con distribuidor cuando:
- 100+ usuarios activos mensuales
- 30+ compras registradas/mes
- Tasa click-afiliado > 15%
- Al menos 1 marca confirmando ventas vía nuestros UTMs

---

## 📋 LO QUE ENTREGAMOS HOY (resumen)

| Archivo | Qué hace |
|---|---|
| `app/privacidad/page.tsx` | Política de Privacidad Ley 21.719 |
| `app/terminos/page.tsx` | Términos y Condiciones Chile |
| `app/sitemap.ts` | Sitemap para Google |
| `app/opengraph-image.tsx` | Preview dinámico de la marca |
| `app/twitter-image.tsx` | Preview para Twitter |
| `app/layout.tsx` | Meta tags completos para SEO |
| `public/robots.txt` | Reglas de crawling |
| `outreach/PLANTILLAS.md` | 4 plantillas comerciales |
| `outreach/BETA_RECLUTAMIENTO.md` | Plan de 14 días para 20-30 beta testers |
| `ESTADO.md` | Este documento |

---

## 🎯 PRÓXIMO PASO INMEDIATO

**Hoy o mañana:** los 45 minutos de setup técnico en Supabase + Resend + Vercel.

**En paralelo (hoy mismo):** enviar el email a NovaPet (plantilla #1 en `PLANTILLAS.md`).

Una vez funcionando con tu email real → arrancar Semana 6 (beta) el lunes.

**Faltan ~3 semanas de trabajo distribuidas en ~12 horas tuyas** para llegar al lanzamiento público.
