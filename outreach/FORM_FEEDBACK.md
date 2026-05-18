# 📋 Google Form de feedback beta — Kulliñ

> Copia este contenido directo en un Google Form (https://forms.google.com → Blank).
> Tiempo de respuesta esperado: 3-4 minutos. No pidas más, la gente se va.

---

## Configuración del formulario

**Título:** Feedback de Kulliñ (3 minutos)

**Descripción:**

> ¡Gracias por probar Kulliñ! 🐕🐈
>
> Estamos en beta cerrada y tu feedback es lo que nos va a permitir mejorar antes de abrir al público.
> Solo 8 preguntas, te toma 3 minutos.
>
> Tus respuestas son confidenciales y nos sirven solo para mejorar el producto. No se comparten con terceros.

**Configuración:**
- ✅ Limit to 1 response: **Off** (los usuarios pueden responder múltiples mascotas)
- ✅ Edit after submit: **On**
- ✅ Email collection: **Off** (mejor sin login para más respuestas)
- ✅ Progress bar: **On**

---

## Preguntas

### Sección 1: Tu experiencia general

---

**1. ¿Cómo conociste Kulliñ?** *(Choice, required)*

- Un amigo me lo recomendó
- Lo vi en redes sociales (Instagram, Twitter, TikTok)
- Lo vi en un grupo de Facebook
- Lo encontré en Reddit
- Lo encontré en Google
- Otro

---

**2. ¿Cuántos minutos te tomó crear el perfil de tu mascota?** *(Short answer, required)*

> Ejemplo: 2 minutos

---

**3. ¿Pudiste completar el onboarding sin interrupciones?** *(Choice, required)*

- Sí, fluido todo
- Sí pero tuve dudas en algún paso
- Lo abandoné y volví después
- No pude terminar

---

### Sección 2: El producto

---

**4. Del 1 al 5, ¿qué tan claro fue el cálculo de la ración diaria?**
*(Linear scale 1-5, required)*

> 1 = No entendí qué significaba<br>
> 5 = Súper claro

---

**5. Del 1 al 5, ¿qué tan útil te pareció la recomendación de alimento?**
*(Linear scale 1-5, required)*

> 1 = Inútil o equivocada<br>
> 5 = Muy útil y precisa

---

**6. Si registraste una compra, ¿qué tan claro fue el flujo?**
*(Linear scale 1-5, optional)*

> 1 = Confuso<br>
> 5 = Perfectamente claro<br>
> Deja en blanco si todavía no registras compras

---

### Sección 3: Lo importante (feedback abierto)

---

**7. ¿Qué fue lo MÁS frustrante o confuso?** *(Paragraph, optional)*

> Sé brutalmente honesto/a. Eso es lo que más nos sirve. Si nada te frustró, déjalo en blanco.

---

**8. ¿Qué fue lo que MÁS te gustó?** *(Paragraph, optional)*

> ¿Hay algo que te hizo decir "esto es lo que necesitaba"? Cuéntanos.

---

**9. ¿Qué le falta a Kulliñ para que la uses todos los meses?** *(Paragraph, optional)*

> Ideas, features pendientes, integraciones, lo que sea.

---

### Sección 4: Recomendación

---

**10. Del 0 al 10, ¿qué tan probable es que recomiendes Kulliñ a otro dueño de mascota?**
*(Linear scale 0-10, required)*

> 0 = No lo recomendaría<br>
> 10 = Lo recomendaría sin dudar

---

**11. ¿Por qué esa nota?** *(Paragraph, optional)*

---

### Sección 5: Seguimiento (opcional)

---

**12. ¿Podemos contactarte en 1 mes para preguntar si recibiste el recordatorio de recompra?** *(Choice)*

- Sí, mi correo es: [Short answer]
- No, prefiero no

---

**13. Si tu respuesta fue "Sí", déjanos tu email** *(Short answer)*

---

## Mensaje de confirmación (después de enviar)

> ¡Gracias! 🐾
>
> Tu feedback nos ayuda muchísimo. Si tienes algo más que decirnos, escríbenos directo a hola@kullin.app.
>
> Si quieres seguir el progreso de Kulliñ, síguenos en @kullin_app en Instagram.

---

## 📊 Cómo procesar las respuestas

### Métrica principal: NPS (pregunta 10)

NPS = % Promotores (9-10) − % Detractores (0-6)

| NPS | Acción |
|---|---|
| < 0 | ALTO — Detectar fricción gruesa antes de seguir invitando |
| 0-30 | Mejorar antes de lanzar al público |
| 30-50 | Bien para una beta. Ajustar y lanzar |
| > 50 | Excelente, lanzar con confianza |

### Métricas secundarias

| Pregunta | Métrica | Objetivo |
|---|---|---|
| 2 | Tiempo medio de onboarding | < 3 minutos |
| 3 | % "Sí, fluido todo" | > 60% |
| 4 | Promedio claridad ración | > 4.0 |
| 5 | Promedio utilidad recomendación | > 4.0 |

### Cómo leer el feedback abierto (preguntas 7-9, 11)

**Categorizar cada respuesta en 4 cubetas:**

1. 🐛 **Bug evidente:** "El selector de edad no acepta meses"
   → Arreglar en sprint 1

2. 😤 **Fricción de UX:** "No entendí qué significa esterilizado"
   → Si aparece 3+ veces, iterar en sprint 1

3. 💡 **Feature request:** "Me gustaría poder registrar visitas al veterinario"
   → Anotar y priorizar, NO implementar todo

4. ❌ **Fuera de scope:** "¿Por qué no venden la comida directamente?"
   → Agradecer y archivar

### Reporte semanal (durante la beta)

Crear hoja en Google Sheets con tabla:

| Semana | Respuestas | NPS | Bugs | Fricciones top |
|---|---|---|---|---|
| 1 | 8 | 22 | 3 | "esterilizado", "kcal" |
| 2 | 18 | 35 | 1 | "tazas vs gramos" |

Esa tabla la usás vos para decidir cuándo escalar a lanzamiento público.

---

## 🎯 Cuándo cerrar la beta y lanzar al público

**Criterios para lanzar:**
- [ ] NPS > 30 con al menos 15 respuestas
- [ ] 0 bugs evidentes pendientes
- [ ] Top 3 fricciones resueltas (o priorizadas en próximo sprint)
- [ ] Tiempo medio de onboarding < 3 minutos
- [ ] Al menos 5 usuarios reportan que recibieron el recordatorio funcionando

Si no cumplís 4 de 5, ampliá la beta una semana más. No lances mal.
