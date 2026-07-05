# BOOSTRAFFIC — Sistema de Inteligencia Local

## Estructura de proyectos
- `~/Documents/BoostraffecWeb/` → Dashboard worker principal (`worker-v7-kpis.js`) **y** landing de `boostraffic.com` (`boostraffic-landing.html`, desplegado vía Coolify — ver sección "Servidor Ubuntu / Landing").
- `~/radar-boostraffic/` → Radar worker de auditorías (`src/index.js`). Tiene su propio repo en GitHub (`elkinpatino/radar-boostraffic`) desde el 2026-07-02.

> **Nota (2026-07-02):** se evaluó separar el dashboard (`worker-v7-kpis.js`) a su propio repo, como está `radar-boostraffic`. Se decidió **dejarlo donde está**: Coolify y `wrangler deploy` leen archivos completamente distintos dentro de este repo (nunca se pisan entre sí, a diferencia del incidente de la landing), así que mezclarlos aquí no es un riesgo real — separarlo sería solo estético y tiene el costo/riesgo de mover archivos de algo que ya está desplegado y funcionando. Revisar esta decisión solo si surge una razón concreta (ej. dar acceso al código de uno sin el otro).

> ⚠️ **Fuente única de verdad para la landing:** `boostraffic-landing.html` en ESTE repo (`BoostraffecWeb`) es el diseño oficial (blanco/elegante, con SEO completo: OG, Twitter Card, geo, hreflang, JSON-LD). El `Dockerfile` lo copia como `index.html`.
> El directorio `~/Documents/BoostraffecWeb-Landing/` (con `scp`+`docker cp` manual) quedó **obsoleto el 2026-07-02** — tener dos mecanismos de deploy al mismo contenedor causó que un push normal (vía Coolify, que reconstruye desde este repo) sobreescribiera un diseño nuevo que se había subido a mano por el otro camino. Si necesitas editar la landing, hazlo aquí y sigue el flujo normal de git push (ver abajo); no vuelvas a usar `scp`/`docker cp` a mano.

---

## Workers desplegados

| Worker | Subdominio(s) | Archivo |
|---|---|---|
| `dashboard-boostraffic` | `htl.boostraffic.com`, `atielec.boostraffic.com`, `demo.boostraffic.com`, `toyo.boostraffic.com`, `corlaminas.boostraffic.com`, `fundeqs.boostraffic.com`, `qpturbos.boostraffic.com`, `reyes.boostraffic.com` | `worker-v7-kpis.js` |
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

### FDQ2026 — Industrias Fundeqs S.A.S
- URL: `fundeqs.boostraffic.com`
- Clave de acceso: `FDQ2026`
- KV: `dash:account:FDQ2026`
- Fichas: `FDQ2026-PRINCIPAL` (Gabinetes contra incendio — Bogotá, Cra. 23 Los Mártires)
- Score inicial: 42 · Rating: 4.2 ⭐ · 5 reseñas
- Ref. Radar: BT·AE7866ED
- Creado: 02/jul/2026

### QPT2026 — QP Turbos S.A.S.
- URL: `qpturbos.boostraffic.com`
- Clave de acceso: `QPT2026`
- KV: `dash:account:QPT2026`
- Fichas: `QPT2026-PRINCIPAL` (Turboalimentadores / repuestos de carro — Bogotá, Cra. 17 #6a-12, Los Mártires)
- Score inicial: 47 · Rating: 4.7 ⭐ · 23 reseñas
- Ref. Radar: BT·DD212BB8
- Perfil ya reclamado/administrado por el cliente
- ⚠️ Pendiente: la dirección en GBP aparece duplicada/inconsistente (`Cra 17 #6a-49` y `Cra. 17 #6a-12` juntas) — corrección programada como acción de servicio (`status:"plan"` en la ficha)
- Creado: 03/jul/2026

### REYES2026 — Los reyes de la cazuela
- URL: `reyes.boostraffic.com`
- Clave de acceso: `REYES2026`
- KV: `dash:account:REYES2026`
- Fichas: `REYES2026-PRINCIPAL` (Marisquería/Cevichería — Bogotá, Calle 23, Edif. Mónaco, La Macarena)
- Score inicial: 49 · Rating: 4.7 ⭐ · 189 reseñas · `starsTarget`: 4.8
- Métricas reales cargadas: feb-jul 2026 (`keywords_period`) y junio 2026 (`month_label`) por separado
  — ver sección "PROYECCIÓN..." y "PALABRAS CLAVE" abajo para cómo conviven ambos períodos en la misma ficha.
- Creado: 04/jul/2026

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
- **Panel Coolify:** `http://178.156.139.120:8000` (proyecto "My first project" → app `boostraffic-web:main-kh7vvrv9c3j9skhs7i3ews58`, server `localhost`, dominio `https://boostraffic.com`)
- **Container ID:** `kh7vvrv9c3j9skhs7i3ews58-035927351202`
- **Deploy landing (único método válido):** editar `boostraffic-landing.html` en este repo → `git commit` → `git push origin main`. Coolify detecta el push vía webhook y reconstruye el contenedor automáticamente desde el `Dockerfile`.
- Verificación rápida post-deploy: `curl -s https://boostraffic.com | grep -o '<title>[^<]*</title>'` y comparar con el título esperado; o revisar la pestaña **Deployments** del panel Coolify.
> ⚠️ NO usar `scp`/`docker cp` manual al container — eso fue lo que causó que un deploy normal por Coolify sobreescribiera un diseño nuevo subido a mano (incidente 2026-07-02).

---

## Incidente 2026-07-02 — boostraffic.com mostraba un diseño viejo

### Síntoma
El dominio mostraba el diseño oscuro "Silicon Valley Tech" (sin SEO), en vez del
diseño blanco/elegante que ya se había subido antes.

### Causa raíz
Existían **dos mecanismos de deploy distintos apuntando al mismo container**:
1. Coolify, conectado al repo `boostraffic-web` (este repo), reconstruye el
   container automáticamente en cada `git push` usando el `Dockerfile`, que
   copiaba `boostraffic_nodal_complete.html` (diseño viejo).
2. Un flujo manual (`scp` + `docker cp` documentado en `~/Documents/BoostraffecWeb-Landing/CLAUDE-WEB.md`)
   con el que se había subido a mano el diseño nuevo (`boostraffic-landing.html`)
   directo al container, sin pasar por git ni por Coolify.

Cualquier push normal a este repo (aunque fuera un cambio no relacionado, como
un fix de SEO) hacía que Coolify reconstruyera el container **desde cero** con
el `Dockerfile` viejo, borrando el diseño subido a mano por el flujo 2. Por eso
"un push" parecía causar que volviera "una versión anterior".

### Diagnóstico (pasos que sirvieron, en orden)
1. `git log --oneline`, `git status`, `git fetch` + `git log origin/main..HEAD`
   → confirmar que local/remoto/HEAD estaban sincronizados (descartó "falta push").
2. `git show HEAD:archivo | grep -c "marcador de contenido"` vs el mismo grep en
   el working tree → detectó que el working tree tenía el archivo **corrupto**
   (contenía JS de un worker viejo en vez de HTML) — no relacionado al síntoma
   principal, pero un riesgo real si se llegaba a commitear por accidente.
3. `curl -sI https://boostraffic.com` → sin headers de Cloudflare/CDN, `server: nginx`
   directo → descartó caché de CDN.
4. `dig +short boostraffic.com` contra resolver local, `8.8.8.8` y `1.1.1.1` →
   los tres coincidían con la IP real del servidor → descartó DNS.
5. Entrar al panel Coolify (`http://178.156.139.120:8000`) → **Resources → la
   app → Deployments/Logs** → el log del deploy mostró explícitamente qué
   commit SHA se estaba construyendo y si reusaba una imagen cacheada
   ("No configuration changed & image found... Build step skipped").
6. Comparar visualmente el sitio en vivo contra los archivos en
   `~/Documents/BoostraffecWeb-Landing/` → encontrar cuál archivo local tenía
   el diseño "correcto" (`--bg: #ffffff` en el CSS) que el usuario esperaba ver.

### Fix aplicado
- Se migró `boostraffic-landing.html` (+ `privacy.html`, `LogoBoostr.webp`,
  `llms.txt`, `favicon.ico`, `robots.txt`, `sitemap.xml`) a este repo como
  única fuente de verdad, y se actualizó el `Dockerfile` para copiarlo como
  `index.html`. El directorio `BoostraffecWeb-Landing` y su flujo `scp`/`docker cp`
  quedaron obsoletos (ver sección "Servidor Ubuntu (Landing)" arriba).

### Runbook rápido — "el sitio muestra una versión vieja" (cualquiera de los 3 proyectos)

| Proyecto | Cómo verificar en 1 minuto | Cómo forzar el deploy correcto |
|---|---|---|
| **Landing** (`boostraffic.com`, Coolify) | `curl -s https://boostraffic.com \| grep -o '<title>[^<]*</title>'` y comparar con el título esperado del archivo local (`grep '<title>' boostraffic-landing.html`) | Confirmar que el cambio esté en `boostraffic-landing.html` de ESTE repo → `git push` → si no reconstruye solo, entrar al panel Coolify → la app → botón **Redeploy**, y revisar la pestaña **Logs** |
| **Dashboard** (subdominios `*.boostraffic.com`, Cloudflare Worker) | `git log -1 -- worker-v7-kpis.js` vs `npx wrangler deployments list` (comparar fecha del último commit vs último deploy) | `git push` **NO despliega el Worker**. Hay que correr `npx wrangler deploy` manualmente después de cada push con cambios en `worker-v7-kpis.js` (ver truco EPERM abajo si falla) |
| **Radar** (`radar.boostraffic.com`, Cloudflare Worker) | Mismo método que Dashboard, con `src/index.js` | Igual: `cd ~/radar-boostraffic && npx wrangler deploy` a mano tras cada cambio. **Ojo:** este proyecto hoy no tiene git (no hay `.git`) — no hay forma de comparar commits ni de revertir si algo sale mal. Pendiente inicializarlo. |

**Reglas generales para no repetir esto:**
- Nunca editar/desplegar el mismo sitio por dos caminos distintos (git+Coolify vs scp manual, o cualquier combinación similar). Un solo camino por proyecto.
- Cuando algo "no se actualiza", diagnosticar en este orden: (1) ¿el commit está pusheado? (2) ¿el mecanismo de deploy de ESE proyecto específico requiere un paso manual (Workers) o es automático (Coolify)? (3) ¿DNS/CDN están cacheando? (4) ¿el navegador está cacheando (favicon, HTML, Open Graph vía WhatsApp/Facebook)?
- Verificar siempre con `curl`/`dig` (headers, DNS, contenido) antes de asumir que el problema está en el código — la mayoría de estos incidentes fueron de infraestructura/proceso, no de bugs en el HTML.

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
- Fundeqs → `dash:ficha:FDQ2026-PRINCIPAL`
- QP Turbos → `dash:ficha:QPT2026-PRINCIPAL`
- Los reyes de la cazuela → `dash:ficha:REYES2026-PRINCIPAL`

### Datos a sacar de GBP cada semana:
- Impresiones nuevas del período
- Rutas totales del período
- Llamadas totales del período
- Clics web del período
- Rating actual
- Total reseñas

### Campos de período — `month_label` y `keywords_period`
Los totales que se pegan de GBP a veces cubren **un mes** y otras veces un **rango de
varios meses** (según qué filtro de fecha haya usado quien exportó los datos). El
dashboard NO asume un período fijo — dos campos opcionales en la ficha lo hacen explícito:
- `month_label` (string, ej. `"Junio 2026"`) → cambia el texto "Total del mes" de las
  tarjetas KPI (llamadas/rutas/web/WhatsApp) a `"Total de {month_label}"`. Si no está,
  se queda el texto genérico "Total del mes".
- `keywords_period` (string, ej. `"feb-jul 2026"`) → cambia el subtítulo de la columna
  "Cómo te encontraron en Google" de "este mes" (afirmación que puede ser falsa) a
  "Búsquedas que mostraron tu perfil (**{keywords_period}**)". Si no está, queda un texto
  neutral sin afirmar ningún período.
- **Antes de escribir cualquiera de los dos, verifica el período real que dice la UI de
  GBP** ("Período de tiempo: X–Y") — no asumas que es "este mes" solo porque así decía
  el texto viejo hardcodeado.

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
6. **Ask Maps** · **Reputación + Sentimiento** · **Actividad del servicio** · **Proyección de acuerdo a lo contratado** (ver sección propia abajo, renombrada 2026-07-04, antes "Proyección 30 días").

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

### Barra "Objetivo estrellas" (dentro del bloque Score)
- `% = min(100, round(stars / starsTarget × 100))`. **`starsTarget` se debe fijar por
  cliente** al crearlo (campo del formulario admin) — el default en código es `4.3`,
  pensado para negocios que arrancan bajos.
- ⚠️ Bug corregido 2026-07-04: si un cliente ya tiene un rating real por encima del
  default (ej. Reyes con 4.7 vs el default 4.3), sin fijar `starsTarget` a mano la barra
  mostraba **109%** (una "meta" ya superada antes de definirla) y se desbordaba
  visualmente porque el cálculo no tenía tope. Ahora el `%` está limitado a 100 en el
  código (`Math.min(100,...)`, worker-v7-kpis.js), pero igual **hay que fijar un
  `starsTarget` realista y por encima del rating actual** en cada ficha nueva, o el
  100% aparece de inmediato sin reflejar ningún objetivo real.

---

## PROYECCIÓN DE ACUERDO A LO CONTRATADO (antes "Proyección 30 días") — campo `projScore`/`projStars`/`projAsk`

Tarjeta al final del dashboard cliente (`buildFichaDetail`, variable `projBlock`).

### Historia — por qué se rediseñó (2026-07-04)
La versión original mostraba 3 "proyecciones" con **fórmulas fijas e inventadas**,
iguales para absolutamente todos los clientes sin importar sus datos reales:
```
Score estimado      = score_actual + 18       (siempre +18 puntos)
Calificación         = min(5, stars_actual + 0.3)  (siempre +0.3 estrellas)
Presencia Ask Maps  = "12%"                    (texto literal fijo)
```
Nadie llenaba esto a mano porque **no existía ningún input en el admin** para hacerlo —
en la práctica, cada cliente veía siempre estos 3 números falsos. Se detectó al revisar
el dashboard de Reyes y se corrigió el mismo día.

### Cómo funciona ahora
El cálculo por defecto usa **datos reales ya existentes en la ficha** (no hay que cargar
nada nuevo para que deje de ser falso):
```
scoreTrend  = (baseline_score existe) ? (score - baseline_score) : 0
Score estimado = clamp(0,100, score + scoreTrend) + "/100"

starsTrend  = (baseline_stars existe) ? (stars - baseline_stars) : 0
Calificación   = clamp(0,5, stars + starsTrend).toFixed(1) + " ★"

Presencia Ask Maps = askProgress (el mismo campo real que ya se usa en
                      "Progreso Ask Maps" en otra sección) + "%"
```
Si un cliente no tiene aún un baseline de score/estrellas distinto del valor actual (caso
típico de una ficha recién creada), la proyección sale **plana** (igual al valor actual) —
es honesto: "si no ha habido tendencia medida todavía, no hay base para proyectar
crecimiento". Esto es preferible a inventar un número optimista fijo.

### Override manual (opcional)
En el admin, sección "Proyección próximos 30 días" (debajo de Ask Maps), 3 inputs de
texto libre: `projScore`, `projStars`, `projAsk`. Si el analista los llena a mano
(criterio propio, ej. por una campaña puntual que se sabe que va a mover el número más
de lo que el cálculo automático reflejaría), ese valor manual **gana sobre el cálculo**.
Guardar vacío vuelve a activar el cálculo automático.

> La tarjeta **siempre se muestra** (no es condicional como keywords/platforms) — con
> datos calculados de verdad o con el override, nunca queda oculta ni con fórmula falsa.

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
dash:ficha:CORL2026-PRINCIPAL → {"id":"CORL2026-PRINCIPAL","accountKey":"CORL2026", datos métricas, keywords, actions...}
```

> ⚠️ **La ficha debe incluir `id` (igual al sufijo de su propia key en KV) y
> `accountKey` (igual a la key de la cuenta dueña).** Cuando la ficha se crea desde el
> formulario del admin (`/api/ficha/{id}/create`) estos campos se agregan solos. Pero si
> se crea escribiendo directo en KV con `wrangler kv key put` (como se hizo con Fundeqs,
> QP Turbos y Reyes) es fácil olvidarlos — sin `id`, el link de la tarjeta en
> `/detail-account/{key}` apunta a `/detail-ficha/undefined` y al hacer clic el admin
> muestra **"Ficha no encontrada"** (bug real, ocurrió con las 3 fichas de arriba el
> 2026-07-04, se arregló agregando los 2 campos faltantes por KV, sin necesidad de
> redeploy).

Luego agregar el dominio a `wrangler.toml` (`routes`) y `npx wrangler deploy`.
La **clave de acceso del cliente ES la `key` de la cuenta** (CORL2026, TOYO2026, etc.).
Login resuelve: host → subdomain MAYÚS → `dash:subdomain:{SUB}` → accountKey → valida `key`.

> ⚠️ Custom domains nuevos tardan minutos en propagar DNS + emitir certificado SSL en Cloudflare.

### Truco para correr wrangler desde Claude Code (sandbox EPERM)
Cuando `npx wrangler` falla con EPERM, usar node directamente:
```bash
/Users/elkin/.nvm/versions/node/v24.11.1/bin/node -e "
const {execFileSync} = require('child_process');
execFileSync('/Users/elkin/.nvm/versions/node/v24.11.1/bin/node',
  ['/Users/elkin/.nvm/versions/node/v24.11.1/lib/node_modules/wrangler/bin/wrangler.js',
   'kv','key','put','CLAVE', 'VALOR',
   '--remote','--namespace-id=47a79e38a48046c6ba8facd533e81d04'],
  {env:{...process.env,PWD:'/Users/elkin'},cwd:'/Users/elkin',stdio:'inherit'}
);
"
```

### Acciones del servicio (`actions`)
Array de `{date:"23/jun/2026", text, public, status:"done"|"prog"|"plan"}`.
El dashboard las muestra en orden inverso (última del array = arriba). Para progresión,
fechas ascendentes en el array. Redactar `text` orientado al cliente (estilo TOYO/Corlaminas).

---

## MANTENIMIENTO — Auditoría y limpieza de KV

### Cómo auditar (repetible en cualquier sesión futura)
```bash
cd ~/Documents/BoostraffecWeb
npx wrangler kv key list --remote --binding=RADAR_KV --prefix "dash:" 2>/dev/null | python3 -c "
import json,sys
for k in sorted(k['name'] for k in json.load(sys.stdin)): print(k)
"
```
Con la lista completa, revisar:
1. **Cada `dash:ficha:{ID}` debe tener `id` y `accountKey` propios** (ver gotcha en
   "CREAR UN CLIENTE NUEVO" arriba) — si falta, el admin muestra "Ficha no encontrada".
2. **Cada `dash:ficha:{ID}` debe estar referenciada en el `fichas[]` de algún
   `dash:account:{KEY}`** — si no, es una ficha huérfana inalcanzable desde el admin
   (probablemente dato de prueba viejo).
3. **No debería haber keys `dash:client:{KEY}`** (formato legacy pre-migración, de antes
   de que existiera la separación cuenta/ficha) — el endpoint `/migrate` del worker las lee
   una sola vez para convertirlas a `dash:account:`+`dash:ficha:`; si ya se migraron
   (comparar `updated` del `dash:ficha:` resultante, debería ser más reciente), el
   `dash:client:` original queda muerto y se puede borrar.
4. `dash:session:*` y `dash:client_session:{SUB}:*` son sesiones de login reales — no
   tocar salvo que se sepa que están vencidas/abandonadas.

### Limpieza hecha el 2026-07-04
Se encontraron y borraron 2 keys muertas (sin código que las lea, sin cuenta que las
referencie):
- `dash:ficha:DEMO-001` ("Restaurante La Macarena", datos de abril-mayo 2026) — huérfana,
  `dash:account:DEMO.fichas` solo apuntaba a `DEMO-PRINCIPAL`. Basura de prueba.
- `dash:client:HTL2026` — formato legacy pre-migración de Hotel HTL. Ya estaba migrado
  hacía tiempo a `dash:account:HTL2026` + `dash:ficha:HTL2026-PRINCIPAL` (con datos más
  recientes que la copia vieja). Sobrante del endpoint `/migrate`, ya sin uso.

Ninguna de las dos requirió `wrangler deploy` (son solo datos en KV, no código).

### Segunda ronda de limpieza — 2026-07-04 (dentro de fichas activas, no keys huérfanas)
Al revisar el contenido completo de cada ficha (no solo las keys huérfanas) aparecieron
2 problemas más, esta vez **dentro de fichas de clientes activos**:
- **Atielec (`dash:ficha:ATL2026-1778201837372`)**: una entrada duplicada/corrupta en
  `actions` y `actions_pro` — texto concatenado por error ("Registro completo de
  acciones" + el texto de otra entrada + "Completado" + fecha), visible tal cual en
  "Actividad del servicio" del dashboard del cliente. Se eliminó la entrada de ambos
  arrays (quedaron en 8 en vez de 9).
- **TOYO+ (`dash:ficha:TOYO2026-PRINCIPAL`)**: 4 campos que ningún código del worker lee
  nunca (verificado con `grep`) — basura acumulada de ediciones manuales pasadas:
  - `fichas: []` — campo que solo pertenece a `dash:account:*`, quedó pegado por error
    en una ficha.
  - `images: [...]` — 7 nombres de archivo (`toyo_plus_01.jpg`...) sin ningún consumidor.
  - `direccion` — el dashboard usa `zona`, nunca `direccion`.
  - `created` (20/jun/**2024**, dos años antes que todo lo demás) — el dashboard usa
    `started` (correcto, 2026) para "Trabajando contigo desde el...". Este `created`
    parece ser también el origen del timestamp raro en `dash:account:TOYO2026.created`
    (mismo valor 2024) — no se corrigió el del account porque no se lee en ningún lado
    tampoco, solo se documenta aquí por si extraña en una futura auditoría.
  Se borraron los 4 campos de la ficha; no se tocó `dash:account:TOYO2026`.

> **Lección para próximas auditorías:** revisar solo las *keys* de KV (huérfanas,
> legacy) no es suficiente — hay que abrir el JSON completo de cada ficha activa y
> comparar sus campos contra lo que el código realmente lee (`grep` del nombre del
> campo en `worker-v7-kpis.js`). Los 2 hallazgos de esta ronda solo aparecieron al
> inspeccionar el contenido, no la lista de keys.

### Tercera ronda — 2026-07-04 (auditoría completa de las 9 fichas, campo por campo)
Se extrajeron **todos** los nombres de campo que el código realmente lee (`grep -oE`
sobre `c.`/`ficha.`/`f.` en `worker-v7-kpis.js`) y se compararon contra el JSON completo
de cada una de las 9 fichas activas. Esto encontró un **bug real** (no solo basura
cosmética) y varios campos muertos más:

- ⚠️ **Bug real: `whatsapp` vs `waConversations`.** El campo que el dashboard
  efectivamente lee para la tarjeta "Chats WhatsApp" es `waConversations`. Tres fichas
  (Fundeqs, QP Turbos, Reyes) tenían el dato guardado bajo el nombre equivocado
  `whatsapp`. Para **QP Turbos esto ocultaba un dato real** (`whatsapp: 7`) — su tarjeta
  de WhatsApp mostraba 0 en el dashboard del cliente aunque el valor real ya estaba
  cargado. Fix: renombrado `whatsapp` → `waConversations` en las 3 fichas (Fundeqs y
  Reyes quedaron en 0, sin cambio visible; QP Turbos ahora muestra 7 correctamente).
  **Al cargar WhatsApp chats a mano, usar siempre `waConversations`, nunca `whatsapp`.**
- **HTL2026-PRINCIPAL (Hotel HTL)** tenía **dos campos de reservas distintos y
  desincronizados**: `bookingClicks: 19` (el que el dashboard sí muestra en "Clics de
  Reserva") y `reservas: 39` (campo muerto, ningún código lo lee). El usuario confirmó
  que 39 es el dato correcto → se migró `bookingClicks` a 39 y se borró `reservas`.
  También se limpiaron 2 campos muertos más de esta ficha: `key` (redundante con
  `accountKey`) y `avgRate`/`marketRate` (sin ningún consumidor en el código).
- **HOME59-PRINCIPAL**: mismos `avgRate: 0`/`marketRate: 0` muertos, sin impacto (valor
  cero) — eliminados por consistencia.
- El resto de fichas (Demo, Corlaminas, Atielec ya limpiada en ronda 2, TOYO+ ya limpiada
  en ronda 2) no tenían campos fuera del set real de campos leídos por el código.

> **Lección reforzada:** un campo "muerto" no siempre es inofensivo — cuando el nombre
> del campo muerto es *parecido* al campo real que sí se usa (`whatsapp` vs
> `waConversations`, `reservas` vs `bookingClicks`), es señal de que alguien cargó un
> dato real con el nombre equivocado y ese dato nunca llegó a mostrarse. Ante un campo
> muerto con un nombre "vecino" de uno real, siempre preguntar antes de borrarlo si no
> debería migrarse en vez de eliminarse.

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
regex `\\d \\s \\+`) y en la validación de fecha de `saveDailyLog` (`/^\\d{4}-...$`/).

> Verificación antes de desplegar: renderizar la función `build*` con una ficha real,
> extraer el `<script>` y correr `node --check` sobre él (`node --check` del worker NO
> detecta errores dentro de los template literals, son strings para él).

---

## Pendientes

- [ ] Migrar `MASTER_KEY` de vars a Cloudflare Secret (`wrangler secret put MASTER_KEY`)
- [ ] Completar comando deploy landing con la ruta correcta del container
- [ ] Confirmar ruta de destino en container Docker para el HTML de la landing
