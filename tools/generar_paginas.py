#!/usr/bin/env python3
"""Genera las páginas SEO (ciudades, sectores, guía) de boostraffic.com.
Uso: python3 tools/generar_paginas.py   (escribe carpetas /slug/index.html y sitemap.xml)"""
import json, os, html
from urllib.parse import quote
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE="https://boostraffic.com"
WA="573219453933"
HOY="2026-11-13"

CIUDADES={
 "bogota":dict(n="Bogotá",z=["Chapinero","Usaquén","Teusaquillo","Suba","Kennedy","Fontibón"],
  p="Bogotá es el mercado más competido del país: en una sola búsqueda como «dentista en Chapinero» o «restaurante en Usaquén» compiten decenas de fichas, y Google solo muestra tres en el mapa principal. Con tantas zonas distintas, quien aparece en su barrio gana al que solo aparece «en Bogotá».",
  t="El tráfico y las distancias de Bogotá hacen que la gente busque casi siempre por localidad o barrio: «cerca de mí», «en Chapinero», «en Suba». Por eso una ficha bien optimizada debe hablarle a su zona, no a la ciudad entera."),
 "medellin":dict(n="Medellín",z=["El Poblado","Laureles","Envigado","Belén","Sabaneta","Itagüí"],
  p="En Medellín la demanda de servicios y turismo es alta y la competencia en El Poblado y Laureles es intensa. Los negocios que aparecen en el mapa reciben llamadas y visitas de residentes y de visitantes que buscan sobre la marcha, muchas veces desde el celular.",
  t="Entre residentes, turistas y extranjeros, las búsquedas en Medellín mezclan español e inglés («best dentist El Poblado»). Una ficha completa y bien categorizada capta ambos públicos."),
 "cali":dict(n="Cali",z=["Granada","San Fernando","Ciudad Jardín","Menga","Normandía","Unicentro"],
  p="Cali tiene una economía de servicios muy activa y un público que decide rápido desde el celular. Las zonas como Granada, San Fernando y Ciudad Jardín concentran negocios que compiten por las mismas búsquedas locales.",
  t="En Cali muchas decisiones de compra se toman con una búsqueda en el mapa y una llamada o un mensaje de WhatsApp. La ficha tiene que facilitar justo eso: teléfono visible, horarios correctos y reseñas recientes."),
 "barranquilla":dict(n="Barranquilla",z=["El Prado","Alto Prado","Riomar","Villa Country","Ciudad Jardín","Centro"],
  p="Barranquilla vive un crecimiento fuerte de comercio y servicios, y cada vez más negocios compiten por las búsquedas locales de Alto Prado, Riomar o Villa Country. La mayoría de las fichas están a medias, lo que abre espacio a quien la trabaja bien.",
  t="Un negocio de Barranquilla que mantiene su ficha activa (fotos nuevas, publicaciones, reseñas respondidas) suele destacar frente a competidores que la abandonaron después de crearla."),
 "bucaramanga":dict(n="Bucaramanga",z=["Cabecera","Floridablanca","Girón","Piedecuesta","Cañaveral","Provenza"],
  p="Bucaramanga y su área metropolitana (Floridablanca, Girón, Piedecuesta) funcionan como un solo mercado: el cliente busca «cerca de mí» sin importar el municipio. Una ficha que cubre bien su zona aparece ante todos esos vecinos.",
  t="En ciudades intermedias como Bucaramanga hay menos fichas trabajadas profesionalmente, por lo que una optimización seria puede llevarlo al mapa principal más rápido que en las capitales más saturadas."),
 "cartagena":dict(n="Cartagena",z=["Bocagrande","Centro Histórico","Getsemaní","Manga","El Laguito","Castillogrande"],
  p="Cartagena combina residentes y un flujo constante de turistas que buscan hoteles, restaurantes, tours y servicios con el celular en la mano. Quien está en el mapa con buenas fotos y reseñas recibe esa demanda; quien no, la pierde.",
  t="Para negocios turísticos de Cartagena, la ficha es la vitrina principal: fotos de calidad, descripción en español e inglés y reseñas recientes marcan la diferencia en Bocagrande, el Centro y Getsemaní."),
}

SECTORES={
 "odontologos":dict(n="odontólogos",s="Odontólogos",un="consultorios odontológicos",
  b=["dentista cerca de mí","ortodoncia {c}","blanqueamiento dental {c}","urgencias odontológicas {c}"],
  cat="Dentista, Ortodoncista o Clínica dental (la principal debe ser la que más ingresos le deja)",
  serv=["Ortodoncia","Implantes dentales","Blanqueamiento","Limpieza y profilaxis","Urgencias","Odontopediatría"],
  err=["Elegir «Consultorio médico» como categoría principal en vez de «Dentista»","Fotos del consultorio vacías y oscuras, sin el equipo ni el trato real","Reseñas sin responder, sobre todo las de dolor o mal servicio","Horario de urgencias que no coincide con el real"],
  p="El paciente que busca dentista decide casi siempre entre las tres primeras fichas: mira las estrellas, las fotos y si contestan. Un consultorio con ficha incompleta pierde pacientes de alto valor (ortodoncia, implantes) frente a uno bien posicionado.",
  faq=[("¿Cuántas reseñas necesita un consultorio odontológico?","No hay un número mágico. Lo que pesa es que sean reales, recientes y se respondan. Pedirlas de forma ordenada después de cada tratamiento exitoso suele funcionar mejor que pedirlas todas de golpe."),
   ("¿Puedo mostrar fotos de antes y después en la ficha?","Puede mostrar fotos de instalaciones, equipo y resultados con autorización escrita del paciente. Evitamos cualquier contenido que comprometa la privacidad o incumpla las reglas de Google para el sector salud.")]),
 "restaurantes":dict(n="restaurantes",s="Restaurantes",un="restaurantes",
  b=["restaurante cerca de mí","dónde almorzar en {c}","restaurante con terraza {c}","domicilios de comida {c}"],
  cat="Restaurante + categorías secundarias por tipo de cocina (parrilla, pizzería, comida de mar)",
  serv=["Carta y platos destacados","Domicilios","Reservas","Eventos y celebraciones","Menú ejecutivo","Opciones vegetarianas"],
  err=["Carta sin subir o en foto borrosa","Horarios de festivos mal puestos y clientes que llegan con el local cerrado","Fotos de cliente de mala calidad dominando la ficha","Sin enlace de reservas ni de domicilios"],
  p="En restaurantes la decisión es rápida y visual: el cliente ve fotos, estrellas y distancia en segundos. Una ficha con platos bien fotografiados, carta visible y reseñas recientes convierte búsquedas en mesas llenas.",
  faq=[("¿Debo subir la carta a Google Maps?","Sí. La carta con precios y platos destacados responde la primera duda del cliente y evita que se vaya a otro restaurante. Además ayuda a que Google relacione su ficha con búsquedas por plato."),
   ("¿Sirve la ficha si ya tengo Rappi o Instagram?","Sí, son canales distintos. La ficha captura a quien busca activamente en el mapa y llega sin comisión de plataforma, directo a su teléfono o a su puerta.")]),
 "clinicas-esteticas":dict(n="clínicas estéticas",s="Clínicas estéticas",un="clínicas y centros de estética",
  b=["clínica estética cerca de mí","botox {c}","depilación láser {c}","tratamientos faciales {c}"],
  cat="Clínica de medicina estética, Spa o Centro de depilación láser, según su servicio principal",
  serv=["Botox y rellenos","Depilación láser","Tratamientos faciales","Tratamientos corporales","Valoración inicial","Paquetes y promociones"],
  err=["Mezclar demasiados servicios sin una categoría principal clara","Fotos genéricas de banco de imágenes en lugar de las instalaciones reales","Sin servicios ni precios de referencia cargados","No mostrar al equipo profesional ni sus credenciales"],
  p="Quien busca un tratamiento estético compara confianza antes que precio: quiere ver la clínica, al equipo y opiniones reales. Una ficha cuidada transmite esa seguridad y lleva a la persona a pedir su valoración.",
  faq=[("¿Cómo gestionar reseñas negativas en una clínica estética?","Respondiendo con calma, sin discutir y ofreciendo continuar la conversación por un canal privado. Una respuesta profesional a una mala reseña suele generar más confianza que ignorarla."),
   ("¿Puedo publicar promociones en la ficha?","Sí. Las publicaciones de Google permiten mostrar ofertas, paquetes y novedades que aparecen directamente en su perfil.")]),
 "talleres-mecanicos":dict(n="talleres mecánicos",s="Talleres mecánicos",un="talleres mecánicos y de servicios automotrices",
  b=["taller mecánico cerca de mí","alineación y balanceo {c}","revisión técnico-mecánica {c}","cambio de aceite {c}"],
  cat="Taller mecánico (y categorías secundarias como Taller de alineación o Servicio de frenos)",
  serv=["Mantenimiento preventivo","Frenos","Alineación y balanceo","Suspensión","Diagnóstico con escáner","Cambio de aceite"],
  err=["Dirección imprecisa y pin del mapa mal ubicado","Sin fotos del taller, de las bahías ni del equipo","Servicios no listados, así que no aparece en búsquedas específicas","Teléfono que no recibe WhatsApp"],
  p="Cuando un carro falla, la búsqueda es urgente y local: «taller mecánico cerca de mí». El taller con ficha completa, buenas reseñas y teléfono a la mano recibe esa llamada. El que no aparece, simplemente no existe para ese cliente.",
  faq=[("¿Un taller pequeño puede competir con uno grande en el mapa?","Sí. El mapa pondera cercanía y relevancia, no tamaño. Un taller bien categorizado, con reseñas reales y ficha activa puede superar a cadenas descuidadas en su zona."),
   ("¿Conviene listar cada servicio por separado?","Sí. Cada servicio cargado en la ficha es una oportunidad de aparecer en búsquedas específicas como «alineación y balanceo» o «cambio de pastillas de freno».")]),
 "abogados":dict(n="abogados",s="Abogados",un="firmas y consultorios jurídicos",
  b=["abogado cerca de mí","abogado laboral {c}","abogado de familia {c}","divorcio {c}"],
  cat="Abogado o Bufete de abogados, con la especialidad principal en la descripción y en los servicios",
  serv=["Derecho laboral","Derecho de familia","Derecho penal","Derecho comercial","Cobro jurídico","Primera consulta"],
  err=["Anunciarse como «todo tipo de casos» sin especialidad clara","Ficha sin foto del abogado ni de la oficina, que genera desconfianza","Reseñas sin responder o respuestas que revelan datos del caso","Dirección sin indicar piso u oficina"],
  p="El cliente que necesita un abogado busca confianza y cercanía. Una ficha con especialidad definida, foto real del profesional y reseñas serias lo diferencia del resto y le trae consultas de quien ya decidió contratar.",
  faq=[("¿Qué debo cuidar al responder reseñas de clientes en un despacho?","Nunca mencionar detalles del caso ni datos personales. Responder de forma breve, cordial y profesional, invitando a continuar por un canal privado."),
   ("¿Una ficha de Google Maps reemplaza mi página web?","No la reemplaza, la complementa. La ficha aparece en el mapa y en búsquedas locales; la web profundiza. Lo ideal es que ambas estén alineadas en datos y especialidades.")]),
 "hoteles":dict(n="hoteles y hostales",s="Hoteles y hostales",un="hoteles, hostales y alojamientos",
  b=["hotel cerca de mí","hotel económico {c}","hostal {c}","dónde hospedarse en {c}"],
  cat="Hotel, Hostal o Alojamiento, según el tipo, con las comodidades marcadas como atributos",
  serv=["Habitaciones y tarifas","Desayuno incluido","Wi-Fi y parqueadero","Check-in 24 h","Traslados","Tours y servicios"],
  err=["Atributos incompletos (Wi-Fi, parqueadero, mascotas) que excluyen al hotel de filtros","Fotos desordenadas y sin categorizar por habitación, zonas comunes y entorno","Sin enlace directo de reservas, lo que empuja al cliente a plataformas con comisión","Reseñas de huéspedes sin respuesta"],
  p="Los viajeros buscan alojamiento en el mapa y filtran por precio, calificación y comodidades. Un hotel con ficha completa recibe reservas directas, sin pagar comisión a intermediarios.",
  faq=[("¿Puedo recibir reservas directas desde la ficha?","Sí. Se puede agregar el enlace de reservas y el botón de contacto. Cada reserva directa evita la comisión de las plataformas intermediarias."),
   ("¿Los atributos del hotel realmente influyen?","Sí. Marcar correctamente Wi-Fi, parqueadero, desayuno o acepta mascotas lo hace aparecer cuando el huésped filtra por esas necesidades.")]),
}

def esc(s): return html.escape(s,quote=True)
def wa(msg): return f"https://wa.me/{WA}?text={quote(msg)}"

CSS="""
:root{--blue:#1a73e8;--blue-d:#1557b0;--text:#202124;--muted:#5f6368;--border:#dadce0;--bg:#fff;--bg2:#f8f9fa;--bg3:#e8f0fe;--green:#34a853;--r:12px}
@media(prefers-color-scheme:dark){:root{--text:#e8eaed;--muted:#aab0b8;--border:#33384a;--bg:#0f1320;--bg2:#161b2e;--bg3:#1a2a4a;--blue:#6ea8ff;--blue-d:#9cc2ff}}
*{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
body{font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);line-height:1.65;font-size:17px}
a{color:var(--blue);text-decoration:none}a:hover{text-decoration:underline}
.c{max-width:880px;margin:0 auto;padding:0 20px}
header.top{background:#0a0f1e;padding:14px 20px}
header.top .in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px}
header.top img{height:26px;width:auto}
.nav-cta{background:#25d366;color:#fff!important;font-weight:600;font-size:14px;padding:9px 18px;border-radius:22px}
.nav-cta:hover{text-decoration:none;background:#1da851}
.hero{background:linear-gradient(135deg,#0a0f1e,#1a1f3a 55%,#0d1635);color:#fff;padding:64px 20px 56px}
.hero .c{max-width:880px}
.crumbs{font-size:13px;color:rgba(255,255,255,.6);margin-bottom:18px}.crumbs a{color:rgba(255,255,255,.75)}
.hero h1{font-size:clamp(30px,5.5vw,50px);font-weight:800;line-height:1.1;letter-spacing:-.02em;margin-bottom:18px}
.hero h1 em{font-style:normal;color:#5ef2ff}
.hero p{font-size:18px;color:rgba(255,255,255,.78);max-width:660px;margin-bottom:28px}
.btn{display:inline-block;font-weight:600;font-size:16px;padding:14px 30px;border-radius:28px}
.btn:hover{text-decoration:none}
.btn-wa{background:#25d366;color:#fff}.btn-wa:hover{background:#1da851}
.btn-o{border:1.5px solid rgba(255,255,255,.4);color:#fff;margin-left:10px}
main section{padding:44px 0;border-bottom:1px solid var(--border)}
main section:last-of-type{border-bottom:0}
h2{font-size:clamp(24px,3.6vw,31px);line-height:1.2;letter-spacing:-.015em;margin-bottom:16px}
h3{font-size:19px;margin:22px 0 8px}
p{margin-bottom:14px}.mut{color:var(--muted)}
ul.ck{list-style:none;margin:10px 0 6px}
ul.ck li{padding:9px 0 9px 32px;position:relative;border-bottom:1px solid var(--border)}
ul.ck li::before{content:"✓";position:absolute;left:0;top:9px;color:var(--green);font-weight:800}
ul.er li::before{content:"✕";color:#ea4335}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0 4px}
.chips span,.chips a{background:var(--bg3);color:var(--blue);font-size:14px;font-weight:600;padding:6px 14px;border-radius:20px}
.plans{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-top:14px}
.plan{border:1px solid var(--border);border-radius:var(--r);padding:18px;background:var(--bg2)}
.plan b{display:block;font-size:15px}.plan .pr{font-size:22px;font-weight:800;margin:4px 0}.plan small{color:var(--muted);font-size:14px}
details{border:1px solid var(--border);border-radius:var(--r);padding:14px 18px;margin-bottom:10px;background:var(--bg2)}
summary{cursor:pointer;font-weight:600}details p{margin:10px 0 2px}
.cta{background:var(--bg3);border-radius:16px;padding:34px 26px;text-align:center}
.cta h2{margin-bottom:10px}.cta .btn{margin-top:8px}
.rel{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:8px;margin-top:8px}
.rel a{border:1px solid var(--border);border-radius:10px;padding:10px 14px;font-size:15px;font-weight:600}
footer{background:#0a0f1e;color:rgba(255,255,255,.65);padding:34px 20px;font-size:14px;text-align:center}
footer a{color:rgba(255,255,255,.85)}footer p{margin-bottom:6px}
@media(max-width:600px){.btn-o{margin:12px 0 0}.hero{padding:44px 20px 40px}}
"""

PLANES="""<div class="plans">
<div class="plan"><b>Auditoría Profesional</b><div class="pr">$190.000</div><small>COP · entrega en 48 h · score y comparación con 5 competidores</small></div>
<div class="plan"><b>Plan Básico</b><div class="pr">$600.000</div><small>COP · pago único · ficha optimizada en 72 h</small></div>
<div class="plan"><b>Plan Profesional</b><div class="pr">$1.200.000</div><small>COP / mes · sin permanencia · gestión continua</small></div>
</div>"""

def pagina(slug,title,desc,h1,lead,crumb,body,faqs,extra_schema=None):
    url=f"{BASE}/{slug}/"
    bc=[("Inicio",BASE+"/"),(crumb,url)] if crumb else []
    ld=[]
    ld.append({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":i+1,"name":n,"item":u} for i,(n,u) in enumerate(bc)]})
    if faqs: ld.append({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q,"acceptedAnswer":{"@type":"Answer","text":a}} for q,a in faqs]})
    if extra_schema: ld.append(extra_schema)
    faq_html="".join(f"<details><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q,a in faqs)
    ldt="\n".join(f'<script type="application/ld+json">{json.dumps(x,ensure_ascii=False)}</script>' for x in ld)
    msg=wa(f"Hola, vi su página sobre {crumb or 'Google Maps'} y quiero optimizar mi ficha de Google Maps")
    return f"""<!DOCTYPE html>
<html lang="es-CO">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large">
<link rel="alternate" hreflang="es-CO" href="{url}">
<link rel="alternate" hreflang="x-default" href="{url}">
<link rel="icon" href="/favicon.ico" sizes="any">
<meta name="theme-color" content="#0a0f1e">
<meta property="og:type" content="website"><meta property="og:site_name" content="Boostraffic"><meta property="og:locale" content="es_CO">
<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}"><meta property="og:image" content="{BASE}/LogoBoostr.webp">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{esc(title)}"><meta name="twitter:description" content="{esc(desc)}"><meta name="twitter:image" content="{BASE}/LogoBoostr.webp">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-6E7PS47XZQ"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments);}}gtag('js',new Date());gtag('config','G-6E7PS47XZQ');</script>
<style>{CSS}</style>
{ldt}
</head>
<body>
<header class="top"><div class="in"><a href="/" aria-label="Boostraffic, inicio"><img src="/boostraffic-texto.png" alt="Boostraffic" width="456" height="96"></a><a class="nav-cta" href="{msg}" target="_blank" rel="noopener">Escribir por WhatsApp</a></div></header>
<div class="hero"><div class="c">
<nav class="crumbs" aria-label="Ruta"><a href="/">Inicio</a> › {esc(crumb)}</nav>
<h1>{h1}</h1>
<p>{lead}</p>
<a class="btn btn-wa" href="{msg}" target="_blank" rel="noopener">Quiero mi auditoría por WhatsApp</a><a class="btn btn-o" href="/#precios">Ver planes</a>
</div></div>
<main><div class="c">
{body}
<section><h2>Preguntas frecuentes</h2>{faq_html}</section>
<section><div class="cta"><h2>Empecemos por saber en qué estado está tu ficha</h2><p class="mut">La Auditoría Profesional te entrega tu score actual y la comparación con 5 competidores en 48 horas.</p><a class="btn btn-wa" href="{msg}" target="_blank" rel="noopener">Pedir mi auditoría</a></div></section>
</div></main>
<footer><p><a href="/">Boostraffic</a> · SEO local y optimización de Google Maps · Bogotá, Colombia</p><p><a href="mailto:info@boostraffic.com">info@boostraffic.com</a> · <a href="/privacy.html">Privacidad</a></p></footer>
</body></html>"""

def rel_links(items): return '<div class="rel">'+"".join(f'<a href="/{s}/">{esc(t)}</a>' for s,t in items)+'</div>'

paginas={}  # slug -> html

# ---- CIUDADES
for cs,c in CIUDADES.items():
    slug=f"seo-local-{cs}"; n=c["n"]
    sec_items=[(f"google-maps-para-{k}",f"{v['s']}") for k,v in SECTORES.items()]
    otras=[(f"seo-local-{k}",f"SEO local en {v['n']}") for k,v in CIUDADES.items() if k!=cs]
    body=f"""<section><h2>Por qué importa la ficha de Google Maps en {n}</h2>
<p>{c['p']}</p><p>{c['t']}</p>
<p>En Boostraffic optimizamos la ficha de Google Maps (Perfil de Negocio) de negocios de {n} para que aparezcan cuando un cliente cercano busca lo que ofrecen, y para que al verlos decida llamar, escribir o visitar.</p></section>
<section><h2>Zonas de {n} donde trabajamos tu visibilidad</h2>
<p>Una búsqueda local casi siempre incluye la zona. Optimizamos tu ficha para las zonas que realmente te traen clientes:</p>
<div class="chips">{''.join(f'<span>{esc(z)}</span>' for z in c['z'])}</div>
<p class="mut" style="margin-top:12px">¿Tu zona no está en la lista? Trabajamos cualquier barrio o municipio cercano.</p></section>
<section><h2>Qué optimizamos en tu ficha</h2>
<ul class="ck"><li><b>Categoría principal y secundarias</b> alineadas con lo que realmente vendes.</li>
<li><b>Descripción, servicios y productos</b> con las palabras que buscan tus clientes en {n}.</li>
<li><b>Fotos y portada</b> que muestran tu negocio real y generan confianza.</li>
<li><b>Reseñas:</b> un sistema para pedirlas y respuestas profesionales a cada una.</li>
<li><b>Publicaciones y datos de contacto</b> consistentes en toda la web (nombre, dirección y teléfono).</li>
<li><b>Informe comparativo</b> contra tus 5 competidores directos en {n}.</li></ul></section>
<section><h2>Planes y precios</h2><p>Empieza con una auditoría y decide con datos. Sin permanencia.</p>{PLANES}</section>
<section><h2>Optimización de Google Maps por sector en {n}</h2>
<p>Cada sector tiene sus propias búsquedas. Mira cómo trabajamos el tuyo:</p>{rel_links(sec_items)}
<h3>Otras ciudades</h3>{rel_links(otras)}</section>"""
    faqs=[(f"¿Cuánto cuesta optimizar una ficha de Google Maps en {n}?","La Auditoría Profesional cuesta $190.000 COP, el Plan Básico $600.000 COP en pago único y el Plan Profesional $1.200.000 COP al mes sin permanencia. Los precios son los mismos para todo el país."),
     (f"¿Necesito tener oficina en {n} para aparecer en el mapa?",f"Para aparecer en el mapa de {n} la ficha debe corresponder a un negocio con ubicación física o con un área de servicio en la ciudad. Si tu negocio ofrece servicio a domicilio, se configura un área de cobertura en lugar de mostrar la dirección."),
     (f"¿Cuánto tarda en verse la mejora en {n}?","El Plan Básico aplica los cambios técnicos en 72 horas y el score se refleja en los primeros 30 días. Los resultados en posición dependen de la competencia de tu zona y de tus reseñas, por eso el diagnóstico inicial compara a tus competidores directos."),
     ("¿Trabajan con negocios de otras ciudades?","Sí. Trabajamos de forma remota con negocios de toda Colombia y de otros países de habla hispana.")]
    desc=f"Optimización de fichas de Google Maps y SEO local en {n}. Aparece en el mapa cuando tus clientes te buscan. Auditoría en 48 h desde $190.000 COP."
    schema={"@context":"https://schema.org","@type":"Service","name":f"SEO local y optimización de Google Maps en {n}","provider":{"@id":BASE+"/#negocio"},"areaServed":{"@type":"City","name":n,"containedInPlace":{"@type":"Country","name":"Colombia"}},"serviceType":"Local SEO"}
    paginas[slug]=pagina(slug,f"SEO Local en {n} y Google Maps | Boostraffic",desc,f"SEO local en {n}: tu ficha de Google Maps <em>trabajando por ti</em>",f"Optimizamos tu ficha de Google Maps para que los clientes de {n} te encuentren, te llamen y te visiten.",f"SEO local en {n}",body,faqs,schema)

# ---- SECTORES
for ks,v in SECTORES.items():
    slug=f"google-maps-para-{ks}"; n=v["n"]
    busq=[b.format(c="Bogotá") for b in v["b"]]
    ciudades_l=[(f"seo-local-{k}",f"SEO local en {x['n']}") for k,x in CIUDADES.items()]
    otros=[(f"google-maps-para-{k}",x['s']) for k,x in SECTORES.items() if k!=ks]
    body=f"""<section><h2>Cómo te buscan los clientes de {n}</h2>
<p>{v['p']}</p><p>Estas son búsquedas típicas en las que tu negocio debería aparecer:</p>
<div class="chips">{''.join(f'<span>{esc(b)}</span>' for b in busq)}</div></section>
<section><h2>Qué optimizamos en la ficha de {v['un']}</h2>
<ul class="ck"><li><b>Categoría principal:</b> {esc(v['cat'])}.</li>
<li><b>Servicios y productos cargados uno a uno:</b> {esc(', '.join(v['serv']))}.</li>
<li><b>Fotos reales</b> del lugar, el equipo y el trabajo, organizadas por categoría.</li>
<li><b>Reseñas:</b> proceso para pedirlas y respuestas profesionales.</li>
<li><b>Publicaciones periódicas</b> con novedades y ofertas.</li>
<li><b>Datos de contacto consistentes</b> (nombre, dirección y teléfono) en todo internet.</li></ul></section>
<section><h2>Errores que hacen perder clientes</h2>
<ul class="ck er">{''.join(f'<li>{esc(e)}</li>' for e in v['err'])}</ul>
<p style="margin-top:14px">La Auditoría Profesional los detecta en tu ficha y te dice cuáles corregir primero.</p></section>
<section><h2>Planes y precios</h2>{PLANES}</section>
<section><h2>Trabajamos en tu ciudad</h2>{rel_links(ciudades_l)}<h3>Otros sectores</h3>{rel_links(otros)}</section>"""
    faqs=list(v["faq"])+[(f"¿Cuánto cuesta optimizar la ficha de Google Maps de {v['un']}?","La Auditoría Profesional cuesta $190.000 COP, el Plan Básico $600.000 COP en pago único y el Plan Profesional $1.200.000 COP al mes sin permanencia."),
        ("¿Garantizan el primer lugar en Google Maps?","No. Nadie puede garantizarlo, porque el orden lo decide Google según relevancia, distancia y prominencia. Lo que sí hacemos es optimizar cada factor que depende de ti y medir la evolución de tu ficha con un score claro.")]
    desc=f"Optimización de Google Maps para {n}: más llamadas, visitas y clientes desde tu ficha. SEO local con auditoría en 48 h desde $190.000 COP."
    schema={"@context":"https://schema.org","@type":"Service","name":f"Optimización de Google Maps para {n}","provider":{"@id":BASE+"/#negocio"},"areaServed":{"@type":"Country","name":"Colombia"},"serviceType":"Local SEO"}
    paginas[slug]=pagina(slug,f"Google Maps para {v['s']}: más clientes | Boostraffic",desc,f"Google Maps para {n}: que te encuentren <em>antes que a tu competencia</em>",f"Optimizamos la ficha de Google Maps de {v['un']} para convertir búsquedas cercanas en llamadas, mensajes y visitas.",f"Google Maps para {n}",body,faqs,schema)

# ---- GUÍA
slug="como-aparecer-primero-en-google-maps"
body=f"""<section><h2>Cómo decide Google quién aparece primero</h2>
<p>Google Maps ordena los negocios locales con tres factores que el propio Google documenta: <b>relevancia</b> (qué tan bien tu ficha coincide con lo que se busca), <b>distancia</b> (qué tan cerca estás de quien busca) y <b>prominencia</b> (qué tan conocido y bien valorado eres, según reseñas, enlaces y presencia en la web).</p>
<p>La distancia no se puede cambiar, pero la relevancia y la prominencia sí. Ahí está tu trabajo.</p></section>
<section><h2>Checklist: 10 pasos para subir tu ficha</h2>
<ul class="ck"><li><b>1. Reclama y verifica tu ficha.</b> Sin verificación no puedes gestionarla.</li>
<li><b>2. Elige bien la categoría principal.</b> Es el factor de relevancia más fuerte.</li>
<li><b>3. Completa nombre, dirección y teléfono</b> y mantenlos idénticos en tu web y directorios.</li>
<li><b>4. Escribe una descripción útil</b> con tus servicios y tu zona, sin relleno de palabras.</li>
<li><b>5. Carga todos tus servicios o productos</b> con descripción.</li>
<li><b>6. Define horarios correctos</b>, incluidos festivos.</li>
<li><b>7. Sube fotos reales y nuevas</b> con regularidad: fachada, interior, equipo, trabajo.</li>
<li><b>8. Pide reseñas a clientes reales</b> y responde todas, también las negativas.</li>
<li><b>9. Publica novedades u ofertas</b> de forma periódica.</li>
<li><b>10. Mide:</b> llamadas, rutas solicitadas y búsquedas con las que te encuentran.</li></ul></section>
<section><h2>Lo que no debes hacer</h2>
<ul class="ck er"><li>Comprar reseñas o pedirlas a familiares: Google las elimina y puede suspender la ficha.</li>
<li>Poner palabras clave en el nombre del negocio que no son parte de su nombre real.</li>
<li>Crear varias fichas para la misma dirección.</li>
<li>Abandonar la ficha después de crearla.</li></ul></section>
<section><h2>¿Prefieres que lo hagamos por ti?</h2>
<p>Empieza con la Auditoría Profesional: te decimos exactamente qué corregir y qué tan lejos estás de tus competidores.</p>{PLANES}
<h3>Por ciudad</h3>{rel_links([(f"seo-local-{k}",f"SEO local en {x['n']}") for k,x in CIUDADES.items()])}
<h3>Por sector</h3>{rel_links([(f"google-maps-para-{k}",x['s']) for k,x in SECTORES.items()])}</section>"""
faqs=[("¿Cuánto tarda una ficha de Google Maps en subir de posición?","Depende de la competencia de tu zona y del estado inicial de la ficha. Los cambios técnicos se aplican en días; la mejora en posición y en llamadas suele notarse en semanas, no de un día para otro."),
 ("¿Pagar anuncios hace que aparezca primero en el mapa?","Los anuncios aparecen marcados como patrocinados. El posicionamiento orgánico del mapa, el que se gana con una buena ficha, no se compra."),
 ("¿Necesito página web para aparecer en Google Maps?","No es obligatoria, pero ayuda a la prominencia. Una web alineada con tu ficha refuerza tu visibilidad local."),
 ("¿Cuántas reseñas necesito?","No hay un número fijo. Pesan la calidad, la recencia y que respondas. Compárate con los 3 negocios que hoy aparecen primero en tu zona.")]
paginas[slug]=pagina(slug,"Cómo aparecer primero en Google Maps (guía 2026) | Boostraffic","Guía práctica para aparecer primero en Google Maps: cómo decide Google, checklist de 10 pasos para tu ficha y errores que debes evitar.","Cómo aparecer primero en <em>Google Maps</em>: guía práctica","Qué factores decide Google, qué puedes cambiar tú y una lista de 10 pasos para subir tu ficha en tu zona.","Cómo aparecer primero en Google Maps",body,faqs,{"@context":"https://schema.org","@type":"Article","headline":"Cómo aparecer primero en Google Maps","inLanguage":"es-CO","dateModified":HOY,"author":{"@id":BASE+"/#negocio"},"publisher":{"@id":BASE+"/#negocio"},"mainEntityOfPage":BASE+f"/{slug}/"})

for slug,h in paginas.items():
    os.makedirs(os.path.join(ROOT,slug),exist_ok=True)
    open(os.path.join(ROOT,slug,"index.html"),"w").write(h)

urls=[("/",1.0)]+[(f"/{s}/",0.9 if s.startswith("seo-local-bogota") or s=="como-aparecer-primero-en-google-maps" else 0.8) for s in paginas]+[("/privacy.html",0.3)]
xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+"".join(f"  <url>\n    <loc>{BASE}{u}</loc>\n    <lastmod>{HOY}</lastmod>\n    <priority>{p}</priority>\n  </url>\n" for u,p in urls)+"</urlset>\n"
open(os.path.join(ROOT,"sitemap.xml"),"w").write(xml)
print(len(paginas),"páginas:",", ".join(paginas))
