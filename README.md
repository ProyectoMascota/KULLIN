# 🐕 Kulliñ

Plataforma de cuidado de mascotas con motor nutricional y recordatorios automáticos.
La mascota es la interfaz, no el carrito.

**Stack:** Next.js 14 (App Router) · Supabase · Resend · Tailwind · TypeScript
**Costo:** $0 hasta ~500 usuarios activos. Máximo $45/mes a escala.

---

## 📁 Estructura

```
kullin/
├── app/
│   ├── api/                          ← 8 endpoints REST
│   │   ├── mascotas/                 GET, POST, PATCH, DELETE
│   │   ├── compras/                  POST (registra y crea recordatorio)
│   │   ├── productos/                GET (catálogo)
│   │   ├── click-afiliado/           POST (tracking)
│   │   └── cron/recordatorios/       Vercel Cron diario
│   ├── auth/callback/                Procesa magic link
│   ├── login/                        Magic link login
│   ├── onboarding/                   10 pasos conversacionales
│   ├── mascotas/
│   │   ├── page.tsx                  Lista o redirect a única
│   │   └── [id]/
│   │       ├── page.tsx              HOME mascota (server)
│   │       ├── PetHome.tsx           Interactividad (client)
│   │       └── historial/            Compras y pesajes
│   ├── cuenta/                       Perfil + notificaciones + logout
│   ├── layout.tsx                    Fuentes Fraunces + DM Sans
│   ├── globals.css                   Variables y utilidades Tailwind
│   └── lib/
│       ├── nutrition.ts              ★ Motor RER/MER/recomendación
│       ├── email.ts                  Integración Resend
│       ├── email-templates.ts        Template HTML responsive
│       ├── supabase-server.ts        Cliente server + requireUser()
│       └── supabase-browser.ts       Cliente browser
├── components/
│   ├── AppHeader.tsx
│   └── RegistrarCompraModal.tsx
├── sql/
│   ├── 01_schema.sql                 ← Ejecutar PRIMERO
│   └── 02_seed_productos.sql         ← Ejecutar SEGUNDO (30 productos)
├── middleware.ts                     Auth gate
├── tailwind.config.ts
├── vercel.json                       Cron: 0 13 * * *
├── .env.example
└── package.json
```

---

## 🚀 Despliegue paso a paso (45 minutos)

### Paso 1 — Supabase (10 min)

1. Crear proyecto en https://supabase.com (free tier, plan Hobby).
2. **SQL Editor → New query** → pegar todo `sql/01_schema.sql` → Run.
3. **SQL Editor → New query** → pegar todo `sql/02_seed_productos.sql` → Run.
4. Verificar: tabla `productos` tiene 30 filas.
5. **Authentication → Providers → Email**: dejar activado (magic link). Desactivar "Confirm email" si quieres saltarlo en validación.
6. **Settings → API**: copiar `URL`, `anon public`, `service_role` (este último es secreto).

### Paso 2 — Resend (5 min)

1. Cuenta en https://resend.com (free 3.000 emails/mes).
2. **API Keys** → crear → copiar `re_xxxxx`.
3. (Producción) **Domains** → agregar `kullin.app` (o tu dominio) y agregar los registros DNS.
   - Sin dominio verificado solo puedes enviar emails a la cuenta del owner.

### Paso 3 — Repo local (5 min)

```bash
git clone <tu-repo> kullin
cd kullin
npm install
cp .env.example .env.local
# editar .env.local con valores de Supabase + Resend
```

Generar `CRON_SECRET`:
```bash
openssl rand -base64 32
```

### Paso 4 — Probar local (5 min)

```bash
npm run dev
```
Abrir http://localhost:3000:
- Tocar "Crear el perfil de mi mascota" → login → magic link → revisar email → onboarding completo → home de mascota.
- Verificar que se muestre una recomendación real desde la DB.

### Paso 5 — Deploy Vercel (10 min)

```bash
git push origin main
```
1. Conectar repo en https://vercel.com.
2. **Settings → Environment Variables** → pegar todas las del `.env.local`.
   - ⚠️ Marcar `NEXT_PUBLIC_*` como visibles en cliente. El resto solo server.
3. **Deploy**.
4. **Settings → Cron Jobs**: confirmar que `0 13 * * *` aparece (Vercel lo detecta de `vercel.json`).
5. Actualizar `NEXT_PUBLIC_APP_URL` con el dominio final y redeploy.

### Paso 6 — Supabase Auth Callback (2 min)

En **Supabase → Authentication → URL Configuration**:
- **Site URL:** `https://tu-dominio.vercel.app`
- **Redirect URLs:** agregar `https://tu-dominio.vercel.app/auth/callback`

Sin esto, el magic link mandará a localhost.

---

## ✅ Probar end-to-end (Sub-paso 3 del roadmap)

Una vez desplegado, probar el flujo completo en producción:

### Test 1 — Onboarding
1. Crear cuenta con tu email real.
2. Crear mascota: Luna, perro, Golden Retriever, grande, 28kg, 4 años, moderado, esterilizada.
3. Verificar pantalla de home con:
   - Ración ≈ 331g/día
   - 3 recomendaciones (Royal Canin Maxi Adult Sterilised debería ser TOP)

### Test 2 — Compra y barra de comida
1. Tocar "Marcar compra".
2. Seleccionar Royal Canin Maxi Adult Sterilised, formato 15kg, fecha **hace 40 días**.
3. Volver al home → la barra debe estar al ~10% (~5 días restantes).

### Test 3 — Forzar el cron (sin esperar)
Desde terminal:
```bash
curl https://tu-dominio.vercel.app/api/cron/recordatorios \
  -H "Authorization: Bearer $CRON_SECRET"
```
Respuesta esperada:
```json
{ "procesados": 1, "enviados": 1, "omitidos": 0, "fallidos": 0 }
```
Y debes recibir el email en tu inbox real.

### Test 4 — Click de afiliado
1. Tocar "Recomendar a Luna".
2. Se abre en nueva pestaña la URL del producto con UTMs.
3. En Supabase `Table Editor → clicks_afiliado` debe haber un registro nuevo.

---

## 🧠 Motor nutricional

El núcleo está en `app/lib/nutrition.ts`. Fórmulas basadas en:
- **NRC 2006** (National Research Council, "Nutrient Requirements of Dogs and Cats")
- **WSAVA 2011** (Global Nutrition Guidelines)

**RER** (Resting Energy Requirement):
```
RER = 70 × peso_kg^0.75
```

**MER** (Maintenance Energy Requirement) = RER × factor:

| Etapa | Perro | Gato |
|---|---|---|
| Cachorro <4m | 3.0 | 2.5 |
| Cachorro 4-12m | 2.0 | 2.0 |
| Adulto bajo | 1.4 | 1.2 |
| Adulto moderado | 1.6 | 1.4 |
| Adulto alto | 1.8 | 1.6 |
| Esterilizado | -0.2 | -0.2 |
| Senior (7+ perro, 11+ gato) | -0.2 | -0.1 |
| Sobrepeso (override) | 1.0 | 0.8 |

**Gramos diarios** = (MER × 100) / kcal_por_100g del producto.

---

## 💰 Modelo de afiliados — estado mayo 2026

| País | Plan |
|---|---|
| 🇨🇱 Chile | MercadoLibre Afiliados NO disponible. Plan: registrar clicks sin comisión + postular Amazon Associates US/MX + contacto directo con NovaPet / Maskota / PetCity. |
| 🇲🇽 México | MercadoLibre Afiliados activo (12-24% comisión). Reemplazar links del seed con `mercadolibre.com.mx`. |
| 🇧🇷 Brasil | MercadoLibre Afiliados activo. |

Los links del seed tienen placeholders `{AFF_ID}` para reemplazar tras alta.

---

## 🛡️ Seguridad

- **RLS habilitado** en todas las tablas de usuario. Un usuario nunca puede leer/modificar datos de otro.
- **Service role** solo se usa en el cron (server-side).
- **CRON_SECRET** protege el endpoint `/api/cron/recordatorios`.
- **Validación con Zod** en todos los inputs de los API routes.

---

## 📋 Checklist post-despliegue (semanas 5-8 del roadmap)

- [ ] Dominio personalizado (.cl ~$10.000/año)
- [ ] Postular Amazon Associates
- [ ] Contactar NovaPet/Maskota/PetCity para acuerdo de referidos
- [ ] Reclutar 20 usuarios beta (Reddit, FB groups)
- [ ] Configurar Vercel Analytics o Plausible
- [ ] Implementar reset de password (si se desactiva magic link)
- [ ] Página de Términos y Política de Privacidad
- [ ] Schema markup para SEO (Product, Recipe)

---

## 🐛 Troubleshooting

**Magic link no llega:** verificar que el dominio esté verificado en Resend, o usar email del owner.

**"Mascota no encontrada":** RLS está bien configurado pero el `auth.uid()` puede ser null si el cookie expiró. Forzar logout y reintentar.

**Cron no se dispara:** verificar `vercel.json` está en raíz del proyecto y que aparezca en Dashboard → Cron Jobs.

**Build falla en Vercel:** verificar que todas las env vars estén configuradas para el environment `Production`.

---

Construido siguiendo el principio: *cuidamos al compañero, no vendemos cosas.*
