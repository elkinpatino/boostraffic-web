# Batería de verificación — Presencia en Ask Maps / Gemini IA
## Cliente: TOYO+ (Venta de Rines y Accesorios Toyota — Bogotá, Cra. 22 #7-60, Los Mártires)

> Objetivo: medir de forma **real y reproducible** si la IA de Google (Ask Maps / Gemini / Modo IA)
> referencia a TOYO+ cuando un cliente hace una búsqueda conversacional. Con esto calibramos el
> número de "Presencia IA %" del dashboard a un dato sustentable (no estimado).

---

## ⚙️ Cómo correr la prueba (importante para que sea válida)

1. **Ventana de incógnito** y **sin iniciar sesión** en Google (evita resultados personalizados).
2. **Desde Bogotá** (dispositivo físico en la ciudad, o ubicación de Bogotá). La geografía cambia todo.
3. Probar en **3 motores**:
   - **Gemini** → `gemini.google.com`
   - **Google → Modo IA / AI Overviews** → `google.com`
   - **Ask Maps** → app de Google Maps (si ya está disponible en Colombia)
4. Anotar la **fecha** de cada ronda (las respuestas de IA cambian con el tiempo).
5. Pega la consulta **tal cual**, en español, como la escribiría un cliente real.

---

## 🔍 Las 12 consultas

### A. Recomendación por categoría (descubrimiento orgánico — sin nombrar la marca)
1. ¿Dónde puedo comprar rines para Toyota Hilux en Bogotá?
2. ¿Dónde venden accesorios para Toyota 4x4 en Bogotá?
3. Necesito rines de lujo para mi Toyota Prado, ¿dónde consigo en Bogotá?
4. ¿Dónde puedo personalizar mi Toyota Fortuner en Bogotá?

### B. Marca directa (¿qué sabe la IA de la entidad TOYO+?)
5. ¿Qué sabes de TOYO+ en Bogotá?
6. ¿TOYO+ vende accesorios para Toyota? ¿Dónde queda?
7. Información sobre TOYO+, rines y accesorios Toyota en Bogotá

### C. Decisión / comparación
8. ¿Cuáles son las mejores tiendas de rines para Toyota en Bogotá?
9. Mejores lugares para comprar accesorios 4x4 Toyota en Bogotá
10. ¿Dónde comprar repuestos y accesorios para Toyota Hilux cerca del centro de Bogotá?

### D. Long-tail / específicas (zona y productos)
11. Tiendas de rines y llantas para camionetas Toyota en Los Mártires, Bogotá
12. ¿Dónde consigo defensas, estribos y parrillas para Toyota Hilux en Bogotá?

---

## 📋 Plantilla de registro — Ronda del: ____________ (fecha)

| # | Motor | ¿Apareció TOYO+? | ¿En qué posición/contexto? | ¿Info correcta? | Notas (qué dijo la IA) |
|---|-------|:---:|---|:---:|---|
| 1 | Gemini |  |  |  |  |
| 1 | Modo IA |  |  |  |  |
| 2 | Gemini |  |  |  |  |
| 2 | Modo IA |  |  |  |  |
| 3 | Gemini |  |  |  |  |
| ... | ... |  |  |  |  |

> Tip: en las de tipo **B (marca)** casi siempre debería aparecer (le preguntas por el nombre).
> El verdadero termómetro son las de tipo **A, C y D** — ahí es donde compites por ser *descubierto*.

### Qué observar en cada respuesta
- ¿**Aparece** TOYO+? (Sí / No)
- ¿La IA lo menciona **primero, entre varios, o de pasada**?
- ¿Las **fotos / reseñas** que muestra lo representan bien?
- ¿Los **enlaces de citación** llevan al perfil correcto de Google?
- ¿Hay algún **dato incorrecto** que corregir en el perfil?

---

## 🧮 Cómo calcular la "Presencia IA %" real

Cuenta solo las consultas de **descubrimiento** (tipos A, C, D = 10 consultas), por motor:

```
Presencia IA % = (consultas donde aparece TOYO+ / 10) × 100
```

Ejemplo: si aparece en 2 de las 10 → **20%**. Ese es el número que va al dashboard
(`askPresence`), y es **defendible** porque está respaldado por la prueba.

- También puedes promediar entre motores (Gemini + Modo IA) para un número global.
- El **Score Ask Maps (`askScore`, x/10)** puede reflejar calidad: precisión de la info +
  si las reseñas/fotos lo representan bien + si las citas son correctas.

---

## 📅 Frecuencia
- Correr la batería **una vez al mes** (misma fecha aprox.) para medir progreso real.
- Guardar cada ronda para mostrarle al cliente la **evolución** mes a mes.

## ♻️ Replicable
Misma estructura sirve para cualquier ficha — solo cambia las consultas por la categoría
del negocio (ej. Corlaminas → "proveedor de aluminio / láminas / oxicorte en Bogotá").
