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

NOS=[("sobre-nosotros","Sobre nosotros"),("contacto","Contacto")]
POLI=[("politica-de-privacidad","Privacidad"),("terminos-y-condiciones","Términos"),("politica-de-cookies","Cookies"),("garantia-y-reembolsos","Garantía y reembolsos"),("eliminacion-de-datos","Eliminar mis datos")]
POLI_LINKS=" · ".join(f'<a href="/{a}/">{b}</a>' for a,b in NOS+POLI)
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

def pagina(slug,title,desc,h1,lead,crumb,body,faqs,extra_schema=None,legal=False):
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
{"" if legal else f'<a class="btn btn-wa" href="{msg}" target="_blank" rel="noopener">Quiero mi auditoría por WhatsApp</a><a class="btn btn-o" href="/#precios">Ver planes</a>'}
</div></div>
<main><div class="c">
{body}
{"" if legal else f'<section><h2>Preguntas frecuentes</h2>{faq_html}</section><section><div class="cta"><h2>Empecemos por saber en qué estado está tu ficha</h2><p class="mut">La Auditoría Profesional te entrega tu score actual y la comparación con 5 competidores en 48 horas.</p><a class="btn btn-wa" href="{msg}" target="_blank" rel="noopener">Pedir mi auditoría</a></div></section>'}
</div></main>
<footer><p><a href="/">Boostraffic</a> · SEO local y optimización de Google Maps · Bogotá, Colombia</p><p><a href="mailto:info@boostraffic.com">info@boostraffic.com</a></p><p>{POLI_LINKS}</p></footer>
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

# ================= PÁGINAS LEGALES =================
FECHA="13 de noviembre de 2026"
EMP="Boostraffic S.A.S."
CONT='<p><b>Responsable:</b> '+EMP+', Bogotá, Colombia · <a href="mailto:info@boostraffic.com">info@boostraffic.com</a> · WhatsApp <a href="https://wa.me/573219453933">+57 321 945 3933</a> · <a href="https://boostraffic.com/">boostraffic.com</a></p>'
def sec(h,b): return f"<section><h2>{h}</h2>{b}</section>"
def lis(items): return '<ul class="ck">'+"".join(f"<li>{i}</li>" for i in items)+"</ul>"
legales={}

legales["politica-de-privacidad"]=("Política de Privacidad y Tratamiento de Datos | Boostraffic","Cómo Boostraffic recolecta, usa y protege tus datos personales conforme a la Ley 1581 de 2012 de Colombia. Tus derechos y cómo ejercerlos.","Política de privacidad y tratamiento de datos","Última actualización: "+FECHA,"Política de privacidad",
 sec("1. Quién es el responsable",CONT+"<p>Esta política aplica al sitio boostraffic.com y a la atención que prestamos por WhatsApp, correo y formulario. Se rige por la Ley 1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015) y demás normas colombianas de protección de datos personales.</p>")+
 sec("2. Qué datos recolectamos",'<p>Recolectamos únicamente los datos que tú nos entregas:</p>'+lis(["<b>Formulario de análisis gratuito:</b> nombre del negocio, teléfono, dirección del negocio y, opcionalmente, correo electrónico.","<b>Conversaciones por WhatsApp o correo:</b> el contenido de tus mensajes, tu número y el nombre de tu perfil.","<b>Datos del negocio para prestar el servicio:</b> acceso a la ficha de Google Maps (Perfil de Negocio), fotos, horarios y otra información que decidas compartir.","<b>Datos de navegación:</b> páginas visitadas, tiempo en el sitio, tipo de dispositivo y ubicación aproximada, mediante analítica (ver la <a href='/politica-de-cookies/'>política de cookies</a>)."])+"<p>No solicitamos datos de pago en el sitio, documentos de identidad ni datos sensibles. Si algún día pudiéramos requerirlos, te lo informaremos antes y será opcional.</p>")+
 sec("3. Para qué usamos tus datos (finalidades)",lis(["Responder tu solicitud y enviarte el análisis o la propuesta.","Prestar, facturar y dar soporte a los servicios contratados.","Contactarte por WhatsApp, teléfono o correo en relación con tu solicitud o tu servicio.","Medir y mejorar el funcionamiento del sitio.","Cumplir obligaciones legales, contables y tributarias."])+"<p>No usamos tus datos para fines distintos sin tu autorización previa.</p>")+
 sec("4. Con quién los compartimos",'<p><b>No vendemos ni arrendamos tus datos personales.</b> Solo los compartimos con proveedores que nos ayudan a operar, quienes los tratan bajo nuestras instrucciones:</p>'+lis(["<b>WhatsApp (Meta):</b> cuando nos escribes o envías el formulario, el mensaje viaja por WhatsApp y queda sujeto a las condiciones de esa plataforma.","<b>Web3Forms:</b> servicio que nos reenvía por correo los datos del formulario.","<b>Google (Analytics 4 y Google Fonts):</b> analítica del sitio y tipografías.","<b>StatCounter:</b> contador de visitas del sitio.","Proveedores de infraestructura y alojamiento del sitio y de correo.","Autoridades, cuando una norma o una orden judicial lo exija."])+"<p>Algunos de estos proveedores pueden tratar datos fuera de Colombia. Al usar el sitio autorizas esta transferencia y transmisión en las condiciones aquí descritas.</p>")+
 sec("5. Tus derechos como titular",'<p>De acuerdo con la Ley 1581 de 2012 puedes:</p>'+lis(["Conocer, actualizar y rectificar tus datos.","Solicitar prueba de la autorización que nos diste.","Ser informado sobre el uso que damos a tus datos.","Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).","Revocar la autorización y solicitar la supresión de tus datos, cuando no exista un deber legal de conservarlos.","Acceder gratuitamente a tus datos."]))+
 sec("6. Cómo ejercer tus derechos",'<p>Escríbenos a <a href="mailto:info@boostraffic.com">info@boostraffic.com</a> con el asunto «Datos personales», indicando tu nombre, un medio de contacto y qué quieres hacer. Respondemos las consultas en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles, prorrogables según la ley. Para borrar tus datos también puedes seguir las instrucciones de <a href="/eliminacion-de-datos/">eliminación de datos</a>.</p>')+
 sec("7. Conservación y seguridad","<p>Conservamos tus datos mientras exista una relación contigo o una obligación legal, y luego los eliminamos o anonimizamos. Aplicamos medidas razonables de seguridad técnica y organizacional, aunque ningún sistema conectado a internet es completamente invulnerable.</p>")+
 sec("8. Menores de edad","<p>Nuestros servicios están dirigidos a empresas y personas mayores de edad. No recolectamos datos de menores de forma intencional.</p>")+
 sec("9. Cambios a esta política","<p>Podemos actualizarla cuando cambien la ley o nuestras prácticas. Publicaremos la versión vigente en esta página con su fecha de actualización.</p>"))

legales["terminos-y-condiciones"]=("Términos y Condiciones del Servicio | Boostraffic","Términos y condiciones de uso del sitio y de contratación de los servicios de SEO local y optimización de Google Maps de Boostraffic.","Términos y condiciones","Última actualización: "+FECHA,"Términos y condiciones",
 sec("1. Aceptación",CONT+"<p>Al usar boostraffic.com o contratar nuestros servicios aceptas estos términos. Si no estás de acuerdo, no uses el sitio ni contrates el servicio.</p>")+
 sec("2. Qué hacemos","<p>Boostraffic presta servicios de SEO local y optimización de fichas de Google Maps (Perfil de Negocio): auditoría, ajustes técnicos y de contenido de la ficha, gestión de reseñas y publicaciones, y reportes de seguimiento. El alcance exacto de cada plan es el publicado en <a href='/#precios'>la sección de planes</a> o el acordado por escrito contigo.</p>")+
 sec("3. Planes y precios",PLANES+"<p style='margin-top:12px'>Los precios están en pesos colombianos (COP) y pueden cambiar; el precio aplicable es el que se te confirmó al contratar. El Plan Enterprise se cotiza a medida. Si requieres factura, la emitimos según la normativa vigente.</p>")+
 sec("4. Pagos","<p>La Auditoría y el Plan Básico se pagan una sola vez y el Plan Profesional mensualmente, por los medios que acordemos al contratar. El servicio inicia una vez confirmado el pago. El Plan Profesional y el Enterprise son mes a mes, sin permanencia mínima.</p>")+
 sec("5. Lo que necesitamos de ti",lis(["Información veraz y actualizada de tu negocio.","Acceso a tu ficha de Google Maps con los permisos necesarios (como administrador o propietario) y, si aplica, la verificación de la ficha.","Que seas titular o tengas autorización para gestionar el negocio y sus contenidos.","Respuesta oportuna a nuestras solicitudes de información o aprobación."])+"<p>Los retrasos por falta de acceso o de información no cuentan como incumplimiento nuestro.</p>")+
 sec("6. Resultados: sin garantía de posición","<p>El orden en Google Maps lo define Google con sus propios algoritmos, que cambian sin aviso, y depende de factores fuera de nuestro control (competencia, distancia, reseñas de terceros, decisiones de Google). Por eso <b>no garantizamos una posición, un número de llamadas o de clientes concretos</b>. Nos obligamos a ejecutar el trabajo contratado con diligencia profesional y a reportar su avance. Las garantías aplicables están en la <a href='/garantia-y-reembolsos/'>política de garantía y reembolsos</a>.</p>")+
 sec("7. Reseñas y cumplimiento de las reglas de Google","<p>Trabajamos de acuerdo con las políticas de Google. No compramos, fabricamos ni ofrecemos reseñas falsas, ni creamos fichas duplicadas o engañosas. Google puede modificar, suspender o eliminar una ficha por sus propias decisiones; no controlamos esas decisiones.</p>")+
 sec("8. Propiedad intelectual","<p>El sitio, su diseño, textos, marca y metodología son de Boostraffic. Tu marca, tus fotos y tus contenidos siguen siendo tuyos; nos autorizas a usarlos únicamente para prestar el servicio. Podremos mencionar que eres cliente solo si nos lo autorizas.</p>")+
 sec("9. Confidencialidad y datos personales","<p>Tratamos la información de tu negocio como confidencial. El tratamiento de datos personales se rige por la <a href='/politica-de-privacidad/'>política de privacidad</a>.</p>")+
 sec("10. Limitación de responsabilidad","<p>En la máxima medida permitida por la ley, nuestra responsabilidad por cualquier reclamación se limita al valor pagado por el servicio del período en que ocurrió el hecho. No respondemos por lucro cesante, por decisiones de Google ni por fallas de servicios de terceros.</p>")+
 sec("11. Terminación","<p>Puedes cancelar el Plan Profesional o Enterprise cuando quieras avisándonos por escrito (correo o WhatsApp), sin penalidad. Podemos suspender el servicio por incumplimiento de pago, uso contrario a las políticas de Google o información falsa.</p>")+
 sec("12. Ley aplicable y contacto","<p>Estos términos se rigen por las leyes de la República de Colombia. Las controversias se resolverán primero de forma directa y, si no hay acuerdo, ante los jueces competentes de Bogotá. Escríbenos a <a href='mailto:info@boostraffic.com'>info@boostraffic.com</a> para cualquier duda.</p>")+
 sec("13. Cambios","<p>Podemos actualizar estos términos; la versión vigente es la publicada en esta página. Los cambios no afectan los servicios ya pagados en su período en curso.</p>"))

legales["politica-de-cookies"]=("Política de Cookies | Boostraffic","Qué cookies y tecnologías similares usa boostraffic.com, para qué sirven y cómo desactivarlas.","Política de cookies","Última actualización: "+FECHA,"Política de cookies",
 sec("1. Qué son",CONT+"<p>Las cookies son pequeños archivos que el navegador guarda al visitar un sitio. Sirven para recordar preferencias y para medir cómo se usa la página.</p>")+
 sec("2. Cuáles usamos",'<p>Usamos únicamente cookies de analítica; no usamos cookies publicitarias ni de perfilamiento propias.</p>'+lis(["<b>Google Analytics 4 (_ga, _ga_*):</b> miden visitas, páginas vistas, tiempo en el sitio, dispositivo y ubicación aproximada, de forma agregada. Duran hasta 2 años.","<b>StatCounter:</b> contador de visitas del sitio (cookies propias del servicio para distinguir visitantes únicos).","<b>Google Fonts:</b> carga la tipografía desde servidores de Google; Google puede registrar la dirección IP para entregar el archivo."]))+
 sec("3. Cómo desactivarlas",lis(["Desde la configuración de tu navegador puedes bloquear o borrar cookies (Chrome, Safari, Firefox y Edge lo permiten).","Para Google Analytics puedes instalar el <a href='https://tools.google.com/dlpage/gaoptout' rel='noopener' target='_blank'>complemento oficial de inhabilitación</a>.","Si bloqueas las cookies, el sitio sigue funcionando; solo dejaremos de medir tu visita."]))+
 sec("4. Más información","<p>El tratamiento de los datos que se obtienen se explica en la <a href='/politica-de-privacidad/'>política de privacidad</a>. Si tienes dudas, escríbenos a <a href='mailto:info@boostraffic.com'>info@boostraffic.com</a>.</p>"))

legales["garantia-y-reembolsos"]=("Garantía y Política de Reembolsos | Boostraffic","Qué garantía tiene cada plan de Boostraffic, cuándo aplica un reembolso y cómo solicitarlo. Sin permanencia.","Garantía y política de reembolsos","Última actualización: "+FECHA,"Garantía y reembolsos",
 sec("Nuestro compromiso",CONT+"<p>Queremos que te quedes por resultados, no por contrato. Estas son las garantías de cada plan:</p>")+
 sec("Garantías por plan",lis(["<b>Auditoría Profesional:</b> es un diagnóstico con entrega en 48 horas; no incluye promesa de resultados, sino el informe con tu score y la comparación con 5 competidores.","<b>Plan Básico:</b> si en 30 días no percibes mejora, te damos soporte extendido sin costo adicional.","<b>Plan Profesional:</b> sin permanencia; puedes pausar o cancelar en cualquier momento sin penalización.","<b>Plan Enterprise:</b> si en 90 días no hay resultados medibles frente a lo pactado, reembolsamos 2 meses."])+"<p>Los «resultados medibles» se verifican con los indicadores de la ficha (impresiones, llamadas, rutas, visitas al perfil) comparados con el punto de partida del diagnóstico inicial.</p>")+
 sec("Qué no cubre la garantía",lis(["Garantizar una posición específica en Google Maps (ver <a href='/terminos-y-condiciones/'>términos</a>).","Afectaciones causadas por decisiones de Google, como suspensiones o cambios de algoritmo.","Retrasos o resultados limitados por falta de acceso a la ficha o de información de tu parte.","Servicios ya prestados y entregados conforme a lo contratado."]))+
 sec("Derecho de retracto","<p>Si contratas a distancia (por internet, WhatsApp o teléfono), puedes ejercer el derecho de retracto dentro de los 5 días hábiles siguientes a la contratación, conforme a la Ley 1480 de 2011, salvo en los casos que la ley exceptúa, como los servicios cuya prestación ya comenzó con tu consentimiento expreso. Te lo explicamos antes de iniciar.</p>")+
 sec("Cómo solicitar un reembolso","<p>Escríbenos a <a href='mailto:info@boostraffic.com'>info@boostraffic.com</a> o por <a href='https://wa.me/573219453933'>WhatsApp</a> indicando tu nombre, el plan y el motivo. Respondemos en máximo 5 días hábiles y, si procede, devolvemos el dinero por el mismo medio de pago en un plazo máximo de 30 días calendario.</p>"))

legales["eliminacion-de-datos"]=("Eliminación de Datos Personales | Boostraffic","Cómo solicitar que Boostraffic elimine tus datos personales: pasos, plazos y qué sucede con tu información.","Eliminación de datos personales","Última actualización: "+FECHA,"Eliminación de datos",
 sec("Cómo pedir que borremos tus datos",CONT+"<p>Tienes derecho a solicitar la supresión de tus datos personales (Ley 1581 de 2012). Para hacerlo:</p><ol style='margin:0 0 14px 22px'><li>Escribe a <a href='mailto:info@boostraffic.com?subject=Eliminaci%C3%B3n%20de%20datos'>info@boostraffic.com</a> con el asunto «Eliminación de datos», o por <a href='https://wa.me/573219453933?text=Quiero%20solicitar%20la%20eliminaci%C3%B3n%20de%20mis%20datos'>WhatsApp</a>.</li><li>Indica tu nombre, el negocio y el teléfono o correo con el que nos contactaste, para poder ubicar tus datos.</li><li>Te confirmamos la recepción y, en máximo 15 días hábiles, eliminamos tus datos y te avisamos.</li></ol>")+
 sec("Qué eliminamos",lis(["Los datos del formulario (nombre del negocio, teléfono, dirección y correo).","Las conversaciones y archivos que tengamos asociados a tu solicitud.","Tus datos en nuestras bases y en el correo donde se reciben los formularios."])+"<p>Si la solicitud se refiere a una conversación de WhatsApp, también puedes borrarla desde tu propio teléfono; nosotros eliminamos nuestra copia.</p>")+
 sec("Excepciones","<p>Podemos conservar los datos mínimos que una norma nos obligue a guardar (por ejemplo, soportes contables y de facturación) durante el tiempo legal, y solo para ese fin.</p>")+
 sec("Más información","<p>Consulta la <a href='/politica-de-privacidad/'>política de privacidad</a> para conocer todos tus derechos. Si no quedas satisfecho con la respuesta, puedes acudir a la Superintendencia de Industria y Comercio (SIC).</p>"))


# ================= SOBRE NOSOTROS / CONTACTO =================
CIUD_REL=rel_links([('seo-local-'+k,'SEO local en '+x['n']) for k,x in CIUDADES.items()])
about_body=(sec("Quiénes somos","<p>Boostraffic es una agencia de Bogotá, Colombia, especializada en <b>SEO local y optimización de fichas de Google Maps</b> (Perfil de Negocio). Ayudamos a negocios locales a aparecer cuando sus clientes los buscan cerca, y a que quien los encuentra decida llamar, escribir o visitar.</p><p>Combinamos ingeniería web, análisis de datos y automatización con inteligencia artificial con revisión humana, para que cada ficha se trabaje con método y se pueda medir.</p>")+
 sec("Qué hacemos",lis(["<b>Auditoría de tu ficha</b> con score y comparación frente a tus 5 competidores directos.","<b>Optimización técnica y de contenido:</b> categorías, descripción, servicios, fotos, horarios y datos de contacto.","<b>Gestión de reseñas y publicaciones</b> para ganar confianza y actividad.","<b>Seguimiento medible:</b> impresiones, llamadas, rutas y visitas al perfil."])+f"<p>Mira los <a href='/#precios'>planes y precios</a> o cómo <a href='/como-aparecer-primero-en-google-maps/'>aparecer primero en Google Maps</a>.</p>")+
 sec("Cómo trabajamos",lis(["<b>Diagnóstico primero.</b> Medimos dónde estás antes de proponer nada.","<b>Sin atajos.</b> No compramos reseñas ni creamos fichas falsas; seguimos las reglas de Google.","<b>Sin permanencia.</b> Te quedas por resultados, no por contrato.","<b>Transparencia.</b> Te mostramos qué se hizo y qué cambió en tu ficha.","<b>Sin promesas imposibles.</b> El orden en el mapa lo decide Google; nosotros optimizamos todo lo que depende de ti."]))+
 sec("Dónde trabajamos",f"<p>Atendemos negocios de toda Colombia de forma remota, con foco en:</p>{CIUD_REL}<p style='margin-top:12px'>Y en sectores como <a href='/google-maps-para-odontologos/'>odontólogos</a>, <a href='/google-maps-para-restaurantes/'>restaurantes</a>, <a href='/google-maps-para-clinicas-esteticas/'>clínicas estéticas</a>, <a href='/google-maps-para-talleres-mecanicos/'>talleres</a>, <a href='/google-maps-para-abogados/'>abogados</a> y <a href='/google-maps-para-hoteles/'>hoteles</a>.</p>")+
 sec("Datos de la empresa",CONT+"<p>Redes: <a href='https://www.facebook.com/boostraffic' rel='noopener'>Facebook</a> · <a href='https://www.instagram.com/boostraffic' rel='noopener'>Instagram</a> · <a href='https://www.linkedin.com/company/boostraffic' rel='noopener'>LinkedIn</a>. ¿Hablamos? Ve a <a href='/contacto/'>contacto</a>.</p>"))
paginas["sobre-nosotros"]=pagina("sobre-nosotros","Sobre Boostraffic: agencia de SEO local y Google Maps","Conoce a Boostraffic, agencia de Bogotá especializada en SEO local y optimización de fichas de Google Maps para negocios de toda Colombia.","Sobre <em>Boostraffic</em>","Agencia de Bogotá especializada en SEO local y fichas de Google Maps.","Sobre nosotros",about_body,[],{"@context":"https://schema.org","@type":"AboutPage","name":"Sobre Boostraffic","url":BASE+"/sobre-nosotros/","about":{"@id":BASE+"/#negocio"}},legal=True)

contact_script="""<script>
(function(){var f=document.getElementById('cf');if(!f)return;
f.addEventListener('submit',function(e){e.preventDefault();var d=Object.fromEntries(new FormData(f));
var m='Hola, quiero contactar con Boostraffic.\n\nNombre: '+d.nombre+'\nNegocio: '+d.negocio+'\nTeléfono: '+d.telefono+(d.mensaje?'\nMensaje: '+d.mensaje:'');
fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({access_key:'def4872d-b1e7-44a3-8df2-07b609020582',subject:'Contacto web Boostraffic: '+d.negocio,from_name:'Boostraffic Contacto',Nombre:d.nombre,Negocio:d.negocio,Teléfono:d.telefono,Mensaje:d.mensaje||'—'})}).catch(function(){});
f.style.display='none';document.getElementById('ok').style.display='block';
window.open('https://wa.me/573219453933?text='+encodeURIComponent(m),'_blank');});})();
</script>"""
contact_css="<style>.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}.card{border:1px solid var(--border);border-radius:var(--r);padding:18px;background:var(--bg2)}.card b{display:block;margin-bottom:4px}form#cf label{display:block;font-weight:600;font-size:15px;margin:14px 0 6px}form#cf input,form#cf textarea{width:100%;font:inherit;padding:12px 14px;border:1px solid var(--border);border-radius:10px;background:var(--bg);color:var(--text)}form#cf textarea{min-height:110px;resize:vertical}form#cf button{margin-top:18px;border:0;cursor:pointer;font:inherit;font-weight:600;background:#25d366;color:#fff;padding:14px 30px;border-radius:28px}#ok{display:none;padding:18px;border-radius:12px;background:var(--bg3)}</style>"
contact_body=(contact_css+sec("Elige cómo escribirnos",'<div class="cards"><div class="card"><b>WhatsApp (respuesta más rápida)</b><a href="https://wa.me/573219453933?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20optimizaci%C3%B3n%20de%20Google%20Maps">+57 321 945 3933</a></div><div class="card"><b>Correo</b><a href="mailto:info@boostraffic.com">info@boostraffic.com</a></div><div class="card"><b>Ubicación</b>Bogotá, Colombia · atendemos todo el país de forma remota</div></div>')+
 sec("O déjanos tus datos",'<form id="cf" method="post" action="/contacto/"><label for="n1">Tu nombre</label><input id="n1" name="nombre" required autocomplete="name"><label for="n2">Nombre del negocio</label><input id="n2" name="negocio" required><label for="n3">Teléfono</label><input id="n3" name="telefono" type="tel" required autocomplete="tel"><label for="n4">¿Qué necesitas? (opcional)</label><textarea id="n4" name="mensaje"></textarea><button type="submit">Enviar por WhatsApp</button><p class="mut" style="font-size:14px;margin-top:12px">Al enviar abrimos WhatsApp con tus datos para responderte rápido. Aceptas el tratamiento de datos según la <a href="/politica-de-privacidad/">política de privacidad</a>.</p></form><div id="ok"><b>¡Listo!</b> Abrimos WhatsApp con tus datos. Te respondemos pronto.</div>'+contact_script)+
 sec("Antes de escribir","<p>Si quieres ir directo: la <b>Auditoría Profesional</b> ($190.000 COP, entrega en 48 h) es el mejor primer paso. También puedes leer <a href='/como-aparecer-primero-en-google-maps/'>cómo aparecer primero en Google Maps</a> o conocer <a href='/sobre-nosotros/'>quiénes somos</a>.</p>"))
paginas["contacto"]=pagina("contacto","Contacto | Boostraffic SEO Local y Google Maps","Contacta a Boostraffic por WhatsApp, correo o formulario. Auditoría de tu ficha de Google Maps con entrega en 48 horas.","<em>Contacto</em>","Escríbenos y te decimos en qué estado está tu ficha de Google Maps.","Contacto",contact_body,[],{"@context":"https://schema.org","@type":"ContactPage","name":"Contacto Boostraffic","url":BASE+"/contacto/","about":{"@id":BASE+"/#negocio"}},legal=True)
for slug in ("sobre-nosotros","contacto"):
    os.makedirs(os.path.join(ROOT,slug),exist_ok=True); open(os.path.join(ROOT,slug,"index.html"),"w").write(paginas[slug])

for slug,(title,desc,h1,lead,crumb,body) in legales.items():
    paginas[slug]=pagina(slug,title,desc,h1,lead,crumb,body,[],None,legal=True)
    os.makedirs(os.path.join(ROOT,slug),exist_ok=True)
    open(os.path.join(ROOT,slug,"index.html"),"w").write(paginas[slug])

urls=[("/",1.0)]+[(f"/{s}/",0.9 if s.startswith("seo-local-bogota") or s=="como-aparecer-primero-en-google-maps" else (0.3 if s in legales else (0.6 if s in ("contacto","sobre-nosotros") else 0.8))) for s in paginas]
xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+"".join(f"  <url>\n    <loc>{BASE}{u}</loc>\n    <lastmod>{HOY}</lastmod>\n    <priority>{p}</priority>\n  </url>\n" for u,p in urls)+"</urlset>\n"
open(os.path.join(ROOT,"sitemap.xml"),"w").write(xml)
print("total",len(paginas))
