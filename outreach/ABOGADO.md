# ⚖️ Cómo contratar revisión legal de Kulliñ

> **Cuándo:** Antes del lanzamiento público (semana 8 del roadmap), no antes.
> **Para la beta cerrada de 20 personas, los documentos actuales son suficientes.**

---

## ¿Necesito un abogado realmente?

**Sí, para 3 situaciones específicas:**

1. **Adecuación a Ley 21.719** (entra en vigencia 1 de diciembre de 2026)
   - Revisar que la Política de Privacidad cumple el estándar nuevo
   - Validar que las cláusulas de consentimiento son válidas
   - Definir si necesitas registrar un Delegado de Protección de Datos (DPD)

2. **Acuerdos comerciales con tiendas y afiliados**
   - Cuando NovaPet, Maskota o quien sea acepte un acuerdo, hay un contrato
   - Sirve para que no te cuelguen los pagos de comisiones

3. **Estructura legal personal vs empresa**
   - ¿Operas como persona natural con RUT propio? ¿O conviene crear EIRL/SpA?
   - Esto impacta IVA, impuestos a la renta, y responsabilidad legal

---

## Tipos de abogado y costos referenciales en Chile

| Perfil | Costo aproximado | Cuándo |
|---|---|---|
| **Abogado generalista** | $50.000-$80.000 CLP la hora | Revisión rápida de términos |
| **Especialista en datos personales** | $80.000-$150.000/hora | Adecuación a Ley 21.719 |
| **Estudio especializado en tech/startups** | $100.000-$200.000/hora | Setup completo (estructura + términos + acuerdos) |

**Tu opción más eficiente:** un abogado generalista para una revisión inicial de 1 hora ($50.000-$80.000), que detecta si necesitas algo más especializado.

---

## Dónde encontrar abogados

### Opción 1: Plataformas
- **Lawi** (https://lawi.cl) — abogados con precios fijos publicados
- **Mejorabogado** (https://mejorabogado.cl) — comparador
- **Justia** (https://www.justia.com/cl/) — directorio

### Opción 2: Recomendaciones
- LinkedIn buscando "abogado startups Chile" o "abogado datos personales Chile"
- Slack chileno de tech (chiletec.cl, devschile)
- Grupo de FB "Emprendedores Chile"

### Opción 3: Universidades
- Clínicas Jurídicas de la Universidad de Chile, Católica o Diego Portales — atención gratuita o muy bajo costo para emprendedores
- Suelen tomar casos de pequeños emprendimientos sin fines de lucro

---

## Plantilla de email para contactar

**Subject:** Revisión legal de plataforma web Kulliñ (1 hora, presupuesto definido)

---

```
Estimado/a [Nombre],

Me llamo Karen Anabalón y estoy lanzando Kulliñ (kullin.app), una plataforma web
gratuita que ayuda a tutores de mascotas en Chile a calcular la ración nutricional
de sus animales y recordarles cuándo recomprar alimento.

Estoy en fase de beta cerrada (20-30 usuarios) y antes de lanzar al público
necesito una revisión legal de:

1. Términos y Condiciones (12 cláusulas, redactados conforme a Ley 19.628)
2. Política de Privacidad (redactada con adecuación a Ley 21.719)
3. Recomendación sobre estructura legal (persona natural vs EIRL/SpA)
4. Modelo de afiliados con tiendas chilenas (NovaPet, Maskota): identificar
   riesgos legales del esquema actual

Características del proyecto:
- Sin venta directa de productos (solo recomendaciones con links de afiliado)
- Sin pagos procesados en plataforma
- Datos personales recolectados: email del usuario y datos del animal
- Sin datos sensibles personales
- Stack técnico: Supabase (EE.UU.) + Vercel (EE.UU.) + Resend (EE.UU.)

Tengo presupuesto definido para 1-2 horas iniciales de revisión. Si después de
eso necesito más trabajo (registro de marca, constitución de sociedad, etc.),
lo evaluamos por separado.

¿Tendría disponibilidad esta semana o la próxima? Mi preferencia es videollamada
de 30-45 minutos para que veas el producto en vivo y luego me envíe sus
observaciones por escrito.

Quedo atenta a su respuesta.

Saludos cordiales,
Karen Anabalón
kullin.app
[teléfono]
```

---

## Qué llevar a la reunión

1. **El proyecto desplegado**: kullin.app funcionando
2. **Los documentos a revisar:**
   - `app/terminos/page.tsx` exportado a PDF o link directo a /terminos
   - `app/privacidad/page.tsx` exportado a PDF o link directo a /privacidad
3. **Diagrama simple de datos:**

```
Usuario → Kulliñ (sitio web Vercel)
       → Supabase (DB en EE.UU.)
       → Resend (emails desde EE.UU.)
       → Click afiliado → Tienda externa (NovaPet/Amazon/etc)
```

4. **Preguntas concretas:**
   - ¿Mis Términos cubren los riesgos de un usuario que dice que "Kulliñ le dió mala recomendación y su mascota se enfermó"?
   - ¿La transferencia internacional a Supabase/Resend es válida bajo Ley 19.628 y Ley 21.719?
   - ¿Debo registrarme como tratante de datos en algún registro público?
   - ¿Necesito un Delegado de Protección de Datos (DPD)?
   - Para operar como persona natural, ¿qué impuestos debo declarar por comisiones de afiliado?
   - Si formo una SpA, ¿qué costos y plazos implica?

---

## Qué hacer después de la reunión

1. **Aplicar los cambios sugeridos** en los archivos correspondientes:
   - `app/terminos/page.tsx`
   - `app/privacidad/page.tsx`

2. **Si te recomienda formar SpA:**
   - Costo aproximado: $150.000-$300.000 CLP (notaría + extracto + publicación)
   - Plazo: 1-2 semanas vía Registro de Empresas y Sociedades (https://www.tuempresaenundia.cl)
   - Es online y se llama literalmente "Tu Empresa en un Día"

3. **Documentar las decisiones en un archivo `legal/DECISIONES.md`** para tener trazabilidad

---

## Costo total estimado del componente legal

| Etapa | Costo |
|---|---|
| Revisión inicial 1 hora | $50.000-$80.000 |
| Iteración de documentos (si necesario) | $30.000-$50.000 |
| Constitución SpA (opcional, recomendado si >$2M CLP/año) | $200.000 |
| **Total mínimo (sin SpA)** | **$80.000-$130.000 CLP** |
| **Total con SpA** | **$280.000-$330.000 CLP** |

Comparado con el riesgo de una multa de la APDP que parte en 5.000 UTM (~$95 millones CLP), invertir $130k es barato.

---

## Errores comunes a evitar

1. **No copiar términos de otra empresa.** Cada modelo de negocio es distinto y términos prestados pueden ser inaplicables o contradictorios.
2. **No omitir mencionar transferencia internacional de datos.** Es obligatorio bajo Ley 21.719.
3. **No olvidar publicar los términos antes de captar el primer usuario público.**
4. **No mezclar finanzas personales con las de Kulliñ** si vas a recibir comisiones — abre cuenta separada aunque sea como persona natural con giro.
