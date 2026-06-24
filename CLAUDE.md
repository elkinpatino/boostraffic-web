# BOOSTRAFFIC — Sistema de Inteligencia Local

## Estructura de proyectos
- `~/Documents/BoostraffecWeb/` → Dashboard worker principal (`worker-v7-kpis.js`)
- `~/radar-boostraffic/` → Radar worker de auditorías (`src/index.js`)

---

## Workers desplegados

| Worker | Subdominio(s) | Archivo |
|---|---|---|
| `dashboard-boostraffic` | `htl.boostraffic.com`, `atielec.boostraffic.com`, `demo.boostraffic.com`, `toyo.boostraffic.com`, `corlaminas.boostraffic.com` | `worker-v7-kpis.js` |
| `radar-boostraffic` | `radar.boostraffic.com` | `src/index.js` |

Desplegar dashboard:
```bash
cd ~/Documents/BoostraffecWeb && npx wrangler deploy
```

Desplegar radar:
```bash
cd ~/radar-boostraffic && npx wrangler deploy
```

---

## Credenciales críticas

| Recurso | Valor |
|---|---|
| Account ID Cloudflare | `df7b1bae8b0736eef3fa8ba52be2ed71` |
| KV Namespace binding | `RADAR_KV` |
| KV Namespace ID | `47a79e38a48046c6ba8facd533e81d04` |
| MASTER_KEY (radar) | `BT2025!Radar#Secure` — **migrar a Cloudflare Secret** |
| PLACES_API_KEY | Cloudflare Secrets (no está en código) |

---

## Cuentas activas en KV

### HTL2026 — Cesar Silva Vesga
- URL: `htl.boostraffic.com`
- KV: `dash:account:HTL2026`
- Fichas: `HTL2026-PRINCIPAL`, `HOME59-PRINCIPAL` (Hotel Home 59)

### ATL2026 — Fredy (Atielec)
- URL: `atielec.boostraffic.com`
- KV: `dash:account:ATL2026`
- Fichas: `ATL2026-1778201837372`

### DEMO — Demo público
- URL: `demo.boostraffic.com`
- Clave de acceso: `DEMO2026`
- KV: `dash:account:DEMO`
- Fichas: `DEMO-PRINCIPAL` (La Cazuela de La 24 S.A.S — Bogotá)

### TOYO2026 — TOYO+
- URL: `toyo.boostraffic.com`
- KV: `dash:account:TOYO2026`
- Fichas: `TOYO2026-PRINCIPAL` (TOYO+ - Venta de Rines y Accesorios Toyota — Bogotá, Cra. 22 #7-60)

### CORL2026 — Corlaminas Franco y Cardenas S.A.S
- URL: `corlaminas.boostraffic.com`
- Clave de acceso: `CORL2026`
- KV: `dash:account:CORL2026`
- Fichas: `CORL2026-PRINCIPAL` (Proveedor de aluminio — Bogotá, Cra. 26 #7-28)

---

## KV — Esquema de claves

```
dash:account:{KEY}            → Datos de la cuenta (nombre, subdomain, fichas[])
dash:subdomain:{SUBDOMAIN}    → Mapeo subdomain → accountKey
dash:ficha:{ID}               → Datos de la ficha (score, métricas, acciones)
dash:session:{TOKEN}          → Sesión admin
dash:client_session:{SUB}:{TOKEN} → Sesión cliente
```

KV compartido entre ambos workers (`RADAR_KV`, id: `47a79e38a48046c6ba8facd533e81d04`).

---

## Servidor Ubuntu (Landing)

- **IP:** `178.156.139.120`
- **Container ID:** `kh7vvrv9c3j9skhs7i3ews58-035927351202`
- **Deploy landing:**
```bash
scp ~/Documents/BoostraffecWeb-Landing/boostraffic-landing.html root@178.156.139.120:/tmp/landing.html && \
ssh root@178.156.139.120 'docker cp /tmp/landing.html kh7vvrv9c3j9skhs7i3ews58-035927351202:/ruta/destino'
```
> ⚠️ Verificar ruta de destino dentro del container.

---

## ACTUALIZACIÓN SEMANAL DE MÉTRICAS

### Comando base para actualizar cualquier ficha:
```bash
cd ~/Documents/BoostraffecWeb && npx wrangler kv key get --remote --binding=RADAR_KV "dash:ficha:{ID}" 2>/dev/null > /tmp/ficha.json && python3 -c "
import json
with open('/tmp/ficha.json') as f:
    d = json.load(f)
# Modificar campos aquí
d['calls'] = 0
d['directions'] = 0
d['web'] = 0
d['impressions_new'] = 0
d['stars'] = 0.0
d['totalReviews'] = 0
with open('/tmp/ficha_updated.json', 'w') as f:
    json.dump(d, f)
print('OK')
" && npx wrangler kv key put --remote --binding=RADAR_KV "dash:ficha:{ID}" --path /tmp/ficha_updated.json && echo "ACTUALIZADO"
```

### Fichas activas y sus IDs:
- Hotel HTL → `dash:ficha:HTL2026-PRINCIPAL`
- Atielec → `dash:ficha:ATL2026-1778201837372`
- Home 59 → `dash:ficha:HOME59-PRINCIPAL`
- TOYO+ → `dash:ficha:TOYO2026-PRINCIPAL`
- Corlaminas → `dash:ficha:CORL2026-PRINCIPAL`

### Datos a sacar de GBP cada semana:
- Impresiones nuevas del período
- Rutas totales del período
- Llamadas totales del período
- Clics web del período
- Rating actual
- Total reseñas

### Places API (automático diario 7AM):
- Rating y reseñas se sincronizan solos
- Solo actualizar manualmente: impresiones, rutas, llamadas, web

---

## PALABRAS CLAVE (búsquedas Google) — sección del dashboard cliente

La sección aparece en el dashboard del cliente (debajo de "Acciones del mes") y es
una **tarjeta de dos columnas** (rediseño 2026-06-24):
- **Izquierda — "Cómo te encontraron en Google"**: búsquedas reales con volumen,
  desde el campo `keywords`.
- **Derecha — "Palabras clave que estamos posicionando"**: etiquetas objetivo
  (palabras clave de alto valor que optimizamos vía etiquetas GBP), desde el campo
  `tags`.

La tarjeta se muestra si existe `keywords` **o** `tags`. Si solo hay uno de los dos,
esa columna ocupa el ancho completo (no se fuerza el grid). En móvil (≤760px) las
dos columnas se apilan. Construcción en `buildFichaDetail`: variables server-side
`kwCol` / `tagCol` / `kwBlock` (fuera del template literal, sin gotcha de backslash).

### Cómo agregarlas (desde el panel admin):
1. Abrir la ficha en el admin → sección **"Palabras clave (búsquedas Google)"**
   (debajo de "Registro diario").
2. En GBP ir a **«Cómo encuentran tu empresa»** y copiar/pegar directo en el textarea.
3. Clic en **GUARDAR PALABRAS CLAVE**.

El parser (`parseKeywords` en el worker) acepta:
- Pegado crudo de GBP: término en una línea, número en la siguiente, con la
  numeración `2.` `3.` incluida (se ignora).
- Formato editado de una línea: `toyo 1964`.
- `1,964` → `1964` · `< 15` se conserva como string · términos con comas intactos.

Guardar reemplaza la lista completa. Guardar vacío la borra (la sección desaparece
del cliente).

### Esquema del campo en KV:
```json
"keywords": [
  {"term": "toyo", "count": 1964},
  {"term": "accesorios toyota", "count": "< 15"}
]
```
- `count` numérico → barra proporcional + valor verde.
- `count` string con `<` → barra y valor en gris atenuado.
- Top 3 (no-`<`) se resaltan con rank verde degradado.

### Etiquetas (columna derecha) — campo `tags`
```json
"tags": ["Rines de Lujo para Toyota, repuestos", "Llantas Todoterreno para Toyota, Toyo+"]
```
- Array de strings (una etiqueta = una palabra clave objetivo). Se renderiza como
  filas con check verde (`.tag-row` / `.tag-dot`), sin barras ni volumen.
- Admin: sección **"Etiquetas (palabras clave que estamos posicionando)"** (debajo
  de "Palabras clave"). Textarea, una por línea → `saveTags()` → POST `{tags:[...]}`.
- Guardar reemplaza la lista completa; guardar vacío la borra.
- Fuente típica: las **Etiquetas de GBP** (no públicas) del negocio.

Backend: `/api/ficha/{id}/metrics` hace `Object.assign`, así que acepta `keywords`
y `tags` sin cambios adicionales en el handler.

---

## CÓMO DESCUBRIERON TU EMPRESA (donut por plataforma) — campo `platforms`

Tarjeta con **gráfico de anillo (donut SVG)** + leyenda, en el dashboard cliente
(debajo de la tarjeta de keywords/etiquetas). Replica el módulo de GBP «Cómo
descubrieron tu empresa las personas → Desglose por plataforma y dispositivo».
Aparece solo si la ficha tiene `platforms`.

### Esquema en KV:
```json
"platforms": [
  {"label": "Búsqueda de Google – dispositivos móviles", "count": 4445},
  {"label": "Google Maps – dispositivos móviles", "count": 1269}
]
```
- Array de `{label, count}`. El **total** (centro del donut) y los **porcentajes**
  (leyenda) se calculan solos a partir de los `count`.
- Colores asignados por orden (paleta Google): dorado `#f9ab00`, azul `#4285f4`,
  rojo `#ea4335`, verde `#34a853`, luego morado/cian/naranja. Ciclan si hay >7.
- Donut: `<circle>` con `stroke-dasharray` + `stroke-dashoffset` acumulado,
  `rotate(-90)` para empezar arriba. Construido server-side en `buildFichaDetail`
  (variable `platBlock`, fuera del template literal → sin gotcha de backslash).

### Cómo agregarlas (admin):
Sección **"Cómo descubrieron tu empresa (plataforma / dispositivo)"** (debajo de
Etiquetas). `parsePlatforms` acepta:
- **Pegado crudo de GBP**: línea `4,445·62%` y debajo la plataforma. Ignora solo
  las líneas de cabecera (título, total suelto, descripciones) — el `%` se descarta,
  se recalcula.
- **Editado**: `Plataforma | 4445` por línea.

Guardar reemplaza la lista; guardar vacío borra la sección. POST `{platforms:[...]}`
al mismo `/metrics` (Object.assign lo acepta).

### Panel "Lectura rápida" (tercera columna, derecha)
El grid del donut tiene 3 columnas: donut · leyenda · **insights automáticos**
(`platInsights`). Se calcula server-side agrupando los labels (sin datos extra):
- **Por dispositivo**: Móvil vs Escritorio (regex `/m[oó]vil/` y `/escritorio|computador/`).
- **Por canal**: Búsqueda Google vs Google Maps (regex `/maps/` → Maps, resto → Búsqueda).
- **Titular** (`pins-hero`): dispositivo dominante, ej. "79% te encontró desde el celular".
- Dos barras split de 2 segmentos (`pins-bar`) con %.

Solo aparece si `devMobile+devDesktop>0` (si los labels no son los de GBP, no se muestra
y el donut+leyenda quedan igual). Responsive: 3 col → 2 col (insights abajo, `grid-column:1/-1`)
→ 1 col apilado.

---

## ESTRUCTURA DEL DASHBOARD CLIENTE (`buildFichaDetail`)

Orden actual de bloques (rediseñado 2026-06-23):

1. **Encabezado** — `${negocio||name} · ${zona||'Bogotá, Colombia'}` +
   `Trabajando contigo desde el ${startedLabel}`. (Ya NO muestra "días activos / de referencia".)
2. **Crecimiento interanual** — bloque verde condicional (ver abajo).
3. **Score** — Índice de Visibilidad Google + barras (autoridad / estrellas / Ask Maps).
4. **Acciones del mes** — `kpi-grid` de tarjetas (llamadas, rutas, web, WhatsApp + reservas si hotel).
5. **Donut "Cómo descubrieron tu empresa"** — desglose por plataforma/dispositivo (`platforms`). Condicional. Va ENCIMA de la tarjeta de keywords.
5b. **Tarjeta keywords (2 columnas)** — izq "Cómo te encontraron en Google" (`keywords`) · der "Palabras clave que estamos posicionando" (`tags`). Condicional: aparece si hay `keywords` o `tags`.
6. **Ask Maps** · **Reputación + Sentimiento** · **Actividad del servicio** · **Proyección 30d**.

> Eliminados en el rediseño: tabla "Antes vs Ahora", "Actividad diaria", "Referencia mes anterior".

### Tarjetas KPI (`.kpi-card`)
Diseño: sin borde, sombra suave, barra de color superior vía `--kc`, hover con elevación,
ícono SVG inline (toma color de `--kc`), número grande animado (`animNum`).
Colores: llamadas `#1d9e75` · rutas `#378add` · web `#7c5cbf` · WhatsApp `#25d366` · reservas `#ba7517`.

### Crecimiento interanual (campos manuales desde GBP)
Comparación año-contra-año que Google ya calcula. Campos en la ficha:
- `yoy_impressions_pct` → "personas que vieron tu perfil"
- `yoy_searches_pct` → "búsquedas que te mostraron"
- `yoy_interactions_pct` → "interacciones totales"

Cada línea se oculta si su campo es null/undefined. Si los 3 faltan, el bloque entero no aparece.
Valores con signo, ej. `18.0` → muestra "+18.0%".

### Score / Autoridad digital (métrica propietaria Boostraffic)
- `score` (0-100) = valor actual · `baseline_score` = punto de partida.
- Delta mostrado = `score - baseline_score` ("↑ +N pts desde que empezamos a trabajar juntos").
- Barra "Autoridad digital" = `score%`.
- Estado por texto: <30 "Fase inicial" · <50 "Autoridad en construcción activa" · ≥50 "Visibilidad consolidándose".
- NO es dato verificable de Google — se asigna como parte del servicio.

---

## CREAR UN CLIENTE NUEVO (proceso en KV)

3 claves en KV + custom domain. El subdominio se guarda en **MAYÚSCULAS** en el mapeo.
Ejemplo (Corlaminas, key `CORL2026`, subdominio `corlaminas`):

```bash
# 1. Cuenta
dash:account:CORL2026 → {"name","key":"CORL2026","subdomain":"corlaminas","fichas":["CORL2026-PRINCIPAL"],"created":...,"type":"client"}
# 2. Mapeo subdominio (MAYÚSCULAS) → accountKey
dash:subdomain:CORLAMINAS → "CORL2026"
# 3. Ficha
dash:ficha:CORL2026-PRINCIPAL → {datos métricas, keywords, actions...}
```

Luego agregar el dominio a `wrangler.toml` (`routes`) y `npx wrangler deploy`.
La **clave de acceso del cliente ES la `key` de la cuenta** (CORL2026, TOYO2026, etc.).
Login resuelve: host → subdomain MAYÚS → `dash:subdomain:{SUB}` → accountKey → valida `key`.

> ⚠️ Custom domains nuevos tardan minutos en propagar DNS + emitir certificado SSL en Cloudflare.

### Acciones del servicio (`actions`)
Array de `{date:"23/jun/2026", text, public, status:"done"|"prog"|"plan"}`.
El dashboard las muestra en orden inverso (última del array = arriba). Para progresión,
fechas ascendentes en el array. Redactar `text` orientado al cliente (estilo TOYO/Corlaminas).

---

## ⚠️ GOTCHA CRÍTICO — Backslashes dentro de los `<script>` embebidos

Las páginas se generan como **template literals** (backticks) dentro de las funciones
`build*` (`buildFichaDetailAdmin`, `buildFichaDetail`, etc.). Todo el JS del navegador
vive **embebido** en esos backticks. Por eso, **cualquier `\` dentro de ese JS debe ir
duplicado** (`\\`) en el código fuente, o el template literal se lo come al evaluarse:

- `'\n'`  → al renderizar se vuelve un **salto de línea real** → **rompe el string → cae
  TODO el `<script>` → ninguna función se define** (los `onclick` lanzan "X is not defined").
- `\d` `\s` `\w` `\.` `\+` en regex → pierden el `\` → el regex cambia de significado
  (no rompe sintaxis, pero valida/parsea mal en silencio).

**Excepción:** dentro de `${...}` (interpolación) el código es JS real evaluado en el
servidor, ahí los `\` van **normales** (ej. `...join('\n')` en el textarea de keywords).

### Bug resuelto 2026-06-23
`parseKeywords` (feature de palabras clave, nueva ese día) se escribió con `\n` y regex
sin duplicar dentro del template del admin → el `\n` rompía el `<script>` entero →
`saveAction()`/`saveDailyLog()` no se definían → **el botón "Agregar acción" no guardaba
nada** (fallo silencioso). Fix: duplicar backslashes en `parseKeywords` (`split('\\n')`,
regex `\\d \\s \\+`) y en la validación de fecha de `saveDailyLog` (`/^\\d{4}-...$/`).

> Verificación antes de desplegar: renderizar la función `build*` con una ficha real,
> extraer el `<script>` y correr `node --check` sobre él (`node --check` del worker NO
> detecta errores dentro de los template literals, son strings para él).

---

## Pendientes

- [ ] Migrar `MASTER_KEY` de vars a Cloudflare Secret (`wrangler secret put MASTER_KEY`)
- [ ] Completar comando deploy landing con la ruta correcta del container
- [ ] Confirmar ruta de destino en container Docker para el HTML de la landing
