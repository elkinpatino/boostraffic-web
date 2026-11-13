# Contenido propio de cada página (evita páginas casi idénticas = doorway/scaled content).
# Sectores: modelos reales que el cliente puede copiar.
SECTOR_EXTRA={
 "odontologos":dict(
  proceso="Un paciente nuevo casi nunca conoce al odontólogo: decide por la ficha. Por eso la ficha debe resolver tres dudas rápido: ¿atienden lo que necesito?, ¿puedo confiar?, ¿cómo agendo?",
  desc="Consultorio odontológico en [barrio], [ciudad]. Ortodoncia, implantes, blanqueamiento, limpieza y urgencias con atención personalizada. Primera valoración y agenda por WhatsApp. Atendemos de lunes a sábado.",
  pos="Gracias, [nombre], por confiar en nosotros. Nos alegra que tu tratamiento haya salido bien. Cuando toque tu control, aquí te esperamos.",
  neg="Lamentamos que tu experiencia no haya sido la esperada, [nombre]. Queremos entender qué pasó y ayudarte. Escríbenos al [teléfono] y te atendemos personalmente. (No menciones detalles clínicos en una respuesta pública.)",
  posts=["Disponibilidad de citas de la semana","Consejo breve de higiene oral","Explicación de un tratamiento con una foto del consultorio","Horarios especiales de festivos"],
  fotos=["Fachada con el número visible","Sala de espera y recepción","Consultorio y equipo","Foto del odontólogo y del equipo","Tratamientos o resultados, solo con autorización escrita del paciente"]),
 "restaurantes":dict(
  proceso="El cliente de restaurante decide con los ojos: fotos de platos, estrellas y distancia. Si la carta no está o las fotos son malas, se va al siguiente.",
  desc="Restaurante de [tipo de cocina] en [barrio], [ciudad]. Platos [3 platos estrella], domicilios y reservas. Abierto [días y horas]. Ideal para almuerzos, celebraciones y eventos.",
  pos="¡Gracias, [nombre]! Nos alegra que hayas disfrutado [plato]. Te esperamos pronto con tu familia.",
  neg="Gracias por contarnos, [nombre], y lamentamos que la visita no estuviera a la altura. Queremos corregirlo: escríbenos al [teléfono] y cuéntanos qué pasó para que la próxima vez sea distinta.",
  posts=["Plato del día o menú ejecutivo con foto","Evento, música o fecha especial","Horarios de festivos","Promoción de domicilios o combos"],
  fotos=["Fachada y entrada","Platos estrella con buena luz","Carta completa legible","Ambiente del salón y terraza","El equipo en cocina"]),
 "clinicas-esteticas":dict(
  proceso="En estética se compra confianza antes que precio. La ficha debe mostrar el lugar, al equipo y opiniones reales, y facilitar pedir una valoración.",
  desc="Clínica de estética en [barrio], [ciudad]. Tratamientos faciales y corporales, [servicios principales] con valoración inicial. Equipo profesional y agenda por WhatsApp.",
  pos="Gracias, [nombre], por tu confianza. Nos alegra que estés contenta con tu tratamiento. Cuando quieras tu seguimiento, estamos aquí.",
  neg="Lamentamos que no hayas quedado conforme, [nombre]. Tu opinión es importante. Escríbenos al [teléfono] para revisar tu caso con el equipo. (Evita datos de salud en respuestas públicas.)",
  posts=["Servicio de la semana, sin promesas médicas","Paquete o promoción con fecha límite","Cuidados posteriores a un tratamiento","Presentación del equipo profesional"],
  fotos=["Recepción y cabinas","Equipos y productos","Equipo profesional con su nombre","Ambiente general","Resultados solo con autorización escrita"]),
 "talleres-mecanicos":dict(
  proceso="Cuando un carro falla, la búsqueda es urgente y local. Gana el taller que aparece con teléfono, horario correcto y reseñas que digan «cumplen».",
  desc="Taller mecánico en [barrio], [ciudad]. Mantenimiento preventivo, frenos, suspensión, alineación y balanceo, diagnóstico con escáner. Presupuesto claro antes de empezar. Lunes a sábado.",
  pos="Gracias, [nombre], por confiarnos tu vehículo. Nos alegra que quedara funcionando como debe. Recuerda programar tu próximo mantenimiento.",
  neg="Lamentamos lo ocurrido, [nombre]. Queremos revisar tu caso. Comunícate con nosotros al [teléfono] con la placa del vehículo y lo resolvemos.",
  posts=["Servicio de la semana con precio de referencia","Señales de que debes revisar frenos o aceite","Horario especial de festivos","Foto de un trabajo terminado, con autorización del cliente"],
  fotos=["Fachada y entrada de vehículos","Bahías de trabajo","Equipo de diagnóstico","Los mecánicos","Zona de espera"]),
 "abogados":dict(
  proceso="Quien busca abogado necesita confianza y una respuesta clara sobre la especialidad. Una ficha genérica («todo tipo de casos») no inspira ninguna de las dos.",
  desc="Firma de abogados en [barrio], [ciudad], especializada en [especialidades]. Primera consulta, asesoría y representación. Atención con cita previa de lunes a viernes.",
  pos="Gracias, [nombre], por su confianza. Es un gusto haberle acompañado en su proceso. Quedamos atentos para lo que necesite.",
  neg="Lamentamos que su experiencia no haya sido satisfactoria, [nombre]. Por reserva profesional no podemos comentar casos en público, pero le invitamos a comunicarse al [teléfono] para atenderle.",
  posts=["Aviso sobre un cambio normativo explicado en lenguaje simple","Horarios y modalidad de consulta","Pregunta frecuente de clientes respondida","Presentación del equipo y su especialidad"],
  fotos=["Fachada y recepción","Oficina o sala de reuniones","Foto profesional de cada abogado","Entorno del edificio para ubicarlo fácil"]),
 "hoteles":dict(
  proceso="El viajero filtra por precio, calificación y comodidades, y compara fotos. Los atributos y las fotos ordenadas deciden quién recibe la reserva.",
  desc="Hotel en [barrio], [ciudad]. Habitaciones con [comodidades], desayuno, Wi-Fi y [parqueadero]. A [distancia] de [punto de referencia]. Reservas directas por WhatsApp.",
  pos="¡Gracias por hospedarte con nosotros, [nombre]! Fue un placer atenderte. Te esperamos en tu próximo viaje.",
  neg="Lamentamos que tu estadía no fuera perfecta, [nombre]. Tomamos nota para mejorar. Escríbenos al [teléfono] y con gusto revisamos lo ocurrido.",
  posts=["Oferta de temporada o puente festivo","Servicios nuevos o remodelaciones","Qué visitar cerca del hotel","Disponibilidad para fechas especiales"],
  fotos=["Fachada y recepción","Cada tipo de habitación","Baños","Zonas comunes y desayuno","Entorno y vista"]),
}

# Ciudades: descripción de cada zona + consejos propios.
CIUDAD_EXTRA={
 "bogota":dict(zonas={"Chapinero":"zona comercial, de salud, gastronomía y vida nocturna; mucha demanda de servicios profesionales.","Usaquén":"norte residencial y de restaurantes; búsquedas de gastronomía, bienestar y servicios para familias.","Teusaquillo":"centro-occidente, residencial y universitario; muchos consultorios y servicios cotidianos.","Suba":"extensa zona residencial con alta densidad; búsquedas de proximidad para servicios del día a día.","Kennedy":"una de las zonas más pobladas; comercio local y servicios con búsquedas «cerca de mí».","Fontibón":"mezcla de residencial, industrial y cercanía al aeropuerto; talleres, hoteles y servicios para viajeros."},
  consejos=["Define un área de servicio realista: en Bogotá una ficha atiende a quien está cerca, no a toda la ciudad.","Si tienes varias sedes, cada una necesita su propia ficha con su dirección, teléfono y horarios.","Revisa que el pin del mapa esté exacto: en una ciudad tan grande, un pin desplazado cuesta clientes."]),
 "medellin":dict(zonas={"El Poblado":"zona de alto flujo turístico y de negocios; mucha competencia y búsquedas también en inglés.","Laureles":"residencial y gastronómica, con comercio de barrio muy activo.","Envigado":"municipio vecino con identidad propia; muchos clientes buscan «en Envigado».","Belén":"zona residencial amplia con comercio y servicios de cercanía.","Sabaneta":"municipio del sur del Valle de Aburrá con demanda creciente de servicios.","Itagüí":"zona comercial e industrial con talleres, servicios y comercio."},
  consejos=["Si atiendes turistas, escribe la descripción y los servicios también en inglés.","El Valle de Aburrá funciona como un solo mercado: el cliente cruza de municipio, así que menciona tu zona exacta.","Responde las reseñas en el idioma en que fueron escritas."]),
 "cali":dict(zonas={"Granada":"zona gastronómica y de vida nocturna, con alta rotación de visitantes.","San Fernando":"mezcla residencial y de servicios de salud y bienestar.","Ciudad Jardín":"sur residencial y comercial, con servicios de alto ticket.","Menga":"norte con comercio, empresas y servicios.","Normandía":"zona residencial con comercio de barrio.","Unicentro":"alrededor del centro comercial; mucho tráfico de compradores y servicios."},
  consejos=["Muchos clientes de Cali deciden con una búsqueda y un mensaje de WhatsApp: pon el botón de mensajes visible.","Verifica el horario de cierre real; en comercio y restaurantes es la queja más común.","Usa fotos de tu entorno reconocible (esquina, edificio) para que te ubiquen rápido."]),
 "barranquilla":dict(zonas={"El Prado":"barrio tradicional con comercio, salud y servicios profesionales.","Alto Prado":"zona de negocios, clínicas y restaurantes.","Riomar":"norte residencial y comercial de alto flujo.","Villa Country":"zona de servicios y comercio con muchos consultorios.","Ciudad Jardín":"residencial y comercial en el norte de la ciudad.","Centro":"comercio tradicional y trámites; búsquedas de servicios básicos."},
  consejos=["En el clima de Barranquilla, indicar «aire acondicionado» y parqueadero en tus atributos influye en la decisión.","Mantén la ficha activa: la mayoría de las de tu zona están abandonadas y eso es una ventaja.","Pide reseñas justo después de entregar el servicio, cuando el cliente está más satisfecho."]),
 "bucaramanga":dict(zonas={"Cabecera":"zona de servicios de salud, comercio y restaurantes.","Floridablanca":"municipio vecino muy poblado con comercio propio.","Girón":"zona histórica y residencial con servicios de proximidad.","Piedecuesta":"municipio en crecimiento con demanda de servicios locales.","Cañaveral":"corredor comercial y de servicios.","Provenza":"zona residencial y comercial con mucha demanda."},
  consejos=["El área metropolitana se comporta como un solo mercado: indica en tu descripción a qué municipios atiendes.","En ciudades intermedias hay menos competencia trabajada: una ficha completa puede destacar rápido.","Cuida la coherencia entre tu ficha, tu web y tus redes: Google compara."]),
 "cartagena":dict(zonas={"Bocagrande":"zona hotelera y de restaurantes con mucho turista.","Centro Histórico":"corazón turístico: hoteles, restaurantes, tours y comercio.","Getsemaní":"barrio de gastronomía y hostales con público internacional.","Manga":"zona residencial y comercial con servicios para residentes.","El Laguito":"zona hotelera frente al mar.","Castillogrande":"residencial y de servicios de alto nivel."},
  consejos=["Si atiendes turistas, escribe en español e inglés y muestra el entorno que los guía hasta ti.","La temporada alta cambia el horario: usa los horarios especiales de Google para no perder clientes.","Las reseñas recientes pesan: en destinos turísticos el volumen de opiniones es alto y se renueva rápido."]),
}

# Guías (cluster de contenido)
GUIAS={
 "como-responder-resenas-google-maps":dict(
  titulo="Cómo responder reseñas en Google Maps (con plantillas)",
  desc="Aprende a responder reseñas positivas y negativas en tu ficha de Google Maps, con plantillas listas y los errores que debes evitar.",
  h1="Cómo responder <em>reseñas en Google Maps</em>",
  lead="Responder reseñas es gratis, ayuda a tu reputación y Google lo recomienda de forma oficial.",
  secc=[("Por qué importa responder","<p>Google recomienda responder a las reseñas porque muestra que valoras la opinión de tus clientes, y las reseñas y su calificación influyen en la prominencia de tu negocio. Además, quien está decidiendo si te contrata lee tus respuestas, no solo las estrellas.</p>"),
   ("Reglas básicas",["Responde todas, no solo las malas.","Hazlo en menos de 48 horas cuando puedas.","Usa el nombre de quien escribió.","Nunca reveles datos personales ni del caso o tratamiento.","No discutas en público: lleva la conversación a un canal privado.","No ofrezcas pagos ni regalos a cambio de cambiar una reseña."]),
   ("Plantilla para reseña positiva","<p><i>Gracias, [nombre], por tu opinión. Nos alegra que [lo que destacó] haya sido de tu agrado. Aquí estamos para lo que necesites.</i></p><p>Menciona algo específico de lo que dijo el cliente: suena humano y no copiado.</p>"),
   ("Plantilla para reseña negativa","<p><i>Lamentamos que tu experiencia no haya sido la esperada, [nombre]. Queremos entender qué pasó y ayudarte. Escríbenos al [teléfono] o a [correo] y lo revisamos contigo.</i></p><p>Si la reseña incumple las políticas de Google (spam, contenido falso o ofensivo), puedes reportarla desde tu ficha, pero no todas las opiniones negativas se eliminan: contesta con calma.</p>"),
   ("Cómo conseguir más reseñas reales",["Pide la reseña justo después de un buen servicio.","Comparte el enlace directo a tu ficha por WhatsApp o en el recibo.","Facilita el paso: explica en una línea cómo dejarla.","Jamás compres reseñas ni las pidas solo a amigos o familiares: Google puede eliminarlas y suspender la ficha."])],
  rel=["errores-que-suspenden-una-ficha-de-google-maps","publicaciones-en-google-business-profile"]),
 "categoria-principal-google-business-profile":dict(
  titulo="Cómo elegir la categoría principal de tu ficha de Google Maps",
  desc="La categoría principal define para qué búsquedas apareces. Aprende a elegirla, qué categorías secundarias agregar y los errores más comunes.",
  h1="Cómo elegir la <em>categoría principal</em> de tu ficha",
  lead="Es una de las decisiones que más pesan en tu relevancia local.",
  secc=[("Qué es y por qué pesa","<p>Google ordena los resultados locales por relevancia, distancia y prominencia. La categoría es la señal más directa de relevancia: le dice a Google qué es tu negocio. Las encuestas de expertos de ranking local (como las de Whitespark y BrightLocal) la ubican entre los factores más influyentes.</p>"),
   ("Cómo elegirla en 4 pasos",["Piensa qué servicio te deja más ingresos: esa debe ser tu categoría principal.","Mira qué categoría usan los 3 negocios que hoy aparecen primero en tu zona.","Elige la más específica que exista (por ejemplo «Ortodoncista» antes que «Servicio de salud»).","Revisa que el nombre de la categoría describa tu actividad real, no la que quisieras tener."]),
   ("Categorías secundarias",["Agrega solo las que correspondan a servicios que realmente prestas.","Evita llenar la lista: dilutas la señal.","Reevalúa cada cierto tiempo: Google agrega y retira categorías."]),
   ("Errores comunes",["Elegir una categoría genérica por comodidad.","Copiar la de un competidor sin que coincida con tu servicio.","Cambiarla cada semana: haz cambios con intención y mide."]),
   ("Y luego, ¿qué?","<p>La categoría es el cimiento, pero no basta: complétala con servicios, descripción, fotos y reseñas. En la <a href='/como-aparecer-primero-en-google-maps/'>guía para aparecer primero en Google Maps</a> está el paso a paso completo.</p>")],
  rel=["fotos-para-tu-ficha-de-google-maps","consistencia-de-nombre-direccion-y-telefono"]),
 "fotos-para-tu-ficha-de-google-maps":dict(
  titulo="Qué fotos subir a tu ficha de Google Maps",
  desc="Qué fotos debe tener tu ficha de Google Maps, cómo tomarlas y qué errores evitar para generar confianza y más contactos.",
  h1="Qué <em>fotos subir</em> a tu ficha de Google Maps",
  lead="Las fotos reales venden por ti: Google recomienda mostrar lo que ofreces y la historia de tu negocio.",
  secc=[("Por qué importan","<p>Quien ve tu ficha decide en segundos. Google aconseja agregar fotos y videos que muestren lo que ofreces; son parte de la información completa que ayuda a que tu perfil se vea mejor frente a otros.</p>"),
   ("Las fotos mínimas",["Logo y foto de portada.","Fachada de día, con el número visible, para que te ubiquen.","Interior del lugar.","Tu equipo trabajando.","Productos o servicios principales.","Si es de tu sector, el entorno: parqueadero, entrada, accesos."]),
   ("Cómo tomarlas",["Con luz natural y el lente limpio.","Horizontales y con buen encuadre.","Sin filtros ni textos encima.","Fotos reales de tu negocio, no de bancos de imágenes."]),
   ("Cuántas y con qué frecuencia","<p>No hay una cifra mágica: lo importante es que sean reales, buenas y se renueven. Sube fotos nuevas con regularidad para mostrar actividad.</p>"),
   ("Errores a evitar",["Fotos borrosas, oscuras o repetidas.","Mostrar clientes sin su permiso.","Fotos que no corresponden al negocio.","Dejar que las fotos de usuarios dominen la ficha sin que tú subas las tuyas."])],
  rel=["como-responder-resenas-google-maps","publicaciones-en-google-business-profile"]),
 "consistencia-de-nombre-direccion-y-telefono":dict(
  titulo="Consistencia de nombre, dirección y teléfono (NAP) en SEO local",
  desc="Por qué tu nombre, dirección y teléfono deben ser iguales en toda la web y cómo auditarlos y corregirlos.",
  h1="Nombre, dirección y teléfono: <em>consistencia (NAP)</em>",
  lead="Si Google encuentra datos distintos de tu negocio, dudará de cuál es el correcto.",
  secc=[("Qué es NAP","<p>NAP son las siglas en inglés de nombre, dirección y teléfono. La consistencia significa escribir esos tres datos igual en tu ficha de Google, tu web, tus redes y cualquier directorio donde aparezcas.</p>"),
   ("Cómo auditarlo en una hora",["Escribe cómo debe aparecer tu nombre, dirección y teléfono (la versión oficial).","Búscate en Google, Facebook, Instagram, directorios y tu web.","Anota cualquier diferencia: abreviaturas, números viejos, direcciones antiguas.","Corrige primero tu ficha de Google y tu web; luego el resto."]),
   ("Reglas prácticas",["Usa el nombre real de tu negocio, tal como se identifica en tu fachada y papelería.","No agregues palabras clave al nombre: va contra las normas de Google y puede traerte problemas.","Si te mudaste, actualiza todo; los datos viejos confunden.","Un solo número principal de contacto en todos los canales."]),
   ("Por qué ayuda","<p>Datos consistentes refuerzan que tu negocio existe y es confiable, lo que apoya la prominencia local. No es un truco: es orden.</p>")],
  rel=["errores-que-suspenden-una-ficha-de-google-maps","categoria-principal-google-business-profile"]),
 "publicaciones-en-google-business-profile":dict(
  titulo="Publicaciones en Google Business Profile: qué publicar y cada cuánto",
  desc="Ideas de publicaciones para tu ficha de Google Maps, con frecuencia recomendada y ejemplos por tipo de negocio.",
  h1="Qué <em>publicar</em> en tu Google Business Profile",
  lead="Las publicaciones muestran que tu negocio está activo y dan un motivo para llamarte.",
  secc=[("Para qué sirven","<p>Las publicaciones aparecen en tu perfil con novedades, ofertas o eventos. Mostrar una ficha activa y al día transmite confianza a quien te está evaluando.</p>"),
   ("Tipos útiles",["Novedades: un servicio o producto nuevo.","Ofertas con fecha de fin clara.","Eventos o fechas especiales.","Consejos breves relacionados con tu servicio.","Horarios especiales de festivos."]),
   ("Frecuencia","<p>Mejor poco y constante que mucho y abandonado. Una publicación por semana es una meta realista para la mayoría de los negocios.</p>"),
   ("Cómo escribirlas",["Una idea por publicación.","Foto real y buena.","Mensaje corto y un botón con acción (llamar, reservar, saber más).","Sin precios que no puedas sostener."]),
   ("Qué no publicar",["Datos personales de clientes.","Promesas médicas, legales o financieras que no puedas cumplir.","Contenido repetido o copiado."])],
  rel=["fotos-para-tu-ficha-de-google-maps","como-responder-resenas-google-maps"]),
 "errores-que-suspenden-una-ficha-de-google-maps":dict(
  titulo="Errores que pueden suspender tu ficha de Google Maps",
  desc="Las prácticas que ponen en riesgo tu Google Business Profile y cómo evitarlas: nombre, reseñas, dirección y duplicados.",
  h1="Errores que pueden <em>suspender tu ficha</em>",
  lead="Una suspensión te deja invisible en el mapa. Casi todas se evitan con orden.",
  secc=[("Antes de empezar","<p>Cada caso depende de las políticas vigentes de Google y de cómo las aplique. Esta guía recoge las prácticas de riesgo más conocidas; la fuente definitiva siempre son las normas oficiales de Google Business Profile.</p>"),
   ("Prácticas de riesgo",["Poner en el nombre palabras que no son parte del nombre real del negocio.","Comprar, inventar o intercambiar reseñas.","Crear varias fichas para el mismo negocio o la misma dirección.","Usar una dirección que no es la de tu negocio (oficinas virtuales, casas de amigos).","Cambiar muchos datos importantes a la vez.","Fichas de negocios que no existen o no atienden al público."]),
   ("Cómo protegerte",["Mantén el nombre, la dirección y el teléfono iguales a los reales.","Verifica tu ficha y conserva accesos de propietario.","Pide reseñas solo a clientes reales y sin incentivos.","Si cambias de local, actualiza la ficha en lugar de crear otra.","Documenta tu negocio: fotos de fachada, factura de servicios o registro mercantil, por si te los piden."]),
   ("Si ya te suspendieron","<p>Entra a tu cuenta, revisa el motivo que indica Google, corrige lo que incumple y solicita la revisión desde el propio panel. Si necesitas ayuda, <a href='/contacto/'>escríbenos</a> y revisamos tu caso.</p>")],
  rel=["consistencia-de-nombre-direccion-y-telefono","como-responder-resenas-google-maps"]),
}

GUIA_T={
 "como-responder-resenas-google-maps":"Cómo responder reseñas en Google Maps",
 "categoria-principal-google-business-profile":"Categoría principal de tu ficha de Google",
 "fotos-para-tu-ficha-de-google-maps":"Qué fotos subir a tu ficha de Google Maps",
 "consistencia-de-nombre-direccion-y-telefono":"Consistencia NAP: nombre, dirección y teléfono",
 "publicaciones-en-google-business-profile":"Qué publicar en tu ficha de Google",
 "errores-que-suspenden-una-ficha-de-google-maps":"Errores que suspenden una ficha de Google",
}
GUIA_FAQ={
 "como-responder-resenas-google-maps":[("¿Debo responder también las reseñas positivas?","Sí. Responder a todas muestra atención y agradece al cliente. Google recomienda responder a las reseñas porque ayuda a destacar."),("¿Puedo borrar una reseña negativa?","Solo si incumple las políticas de Google (por ejemplo, contenido falso, spam u ofensivo) y puedes reportarla. Las opiniones negativas legítimas se responden, no se eliminan."),("¿Puedo pagar o regalar algo por una reseña?","No. Incentivar reseñas va en contra de las políticas de Google y puede acarrear la eliminación de reseñas o sanciones sobre tu ficha.")],
 "categoria-principal-google-business-profile":[("¿Puedo cambiar la categoría principal cuando quiera?","Sí, pero hazlo con intención: cambios frecuentes pueden afectar tu visibilidad. Cambia, observa tus resultados algunas semanas y ajusta."),("¿Cuántas categorías secundarias debo poner?","Solo las que correspondan a servicios que prestas de verdad. Llenar la lista con categorías poco relevantes diluye la señal."),("¿La categoría influye más que las reseñas?","Son factores distintos: la categoría aporta relevancia y las reseñas aportan prominencia. Necesitas ambos.")],
 "fotos-para-tu-ficha-de-google-maps":[("¿Cuántas fotos debo subir?","No hay una cifra oficial. Prioriza fotos reales y buenas de fachada, interior, equipo y servicios, y renuévalas con regularidad."),("¿Puedo usar fotos de internet?","No te conviene: la ficha debe mostrar tu negocio real. Las fotos ajenas pueden infringir derechos y restan confianza."),("¿Qué hago si hay fotos malas de clientes?","Sube tus propias fotos de calidad para equilibrar, y reporta las que incumplan las políticas de Google.")],
 "consistencia-de-nombre-direccion-y-telefono":[("¿Qué pasa si mi dirección está escrita distinto en dos sitios?","Google puede dudar de cuál es la correcta. Unifica el formato (abreviaturas, número, barrio) en todos los canales."),("¿Debo usar el mismo teléfono en todas partes?","Sí, un número principal consistente evita confusión. Si usas otro para WhatsApp, indícalo como canal adicional, no como reemplazo."),("¿Cada cuánto debo revisar mis datos?","Al menos cada trimestre, y siempre que cambies de local, horario o teléfono.")],
 "publicaciones-en-google-business-profile":[("¿Las publicaciones mejoran mi posición?","Google no lo confirma como factor directo, pero una ficha activa y completa transmite confianza a quien te evalúa y puede aumentar contactos."),("¿Cuánto duran las publicaciones?","Las de oferta o evento tienen fecha; las novedades suelen perder visibilidad con el tiempo, por eso conviene renovarlas."),("¿Puedo publicar precios?","Sí, si puedes sostenerlos. Evita precios que cambien constantemente o promesas que no puedas cumplir.")],
 "errores-que-suspenden-una-ficha-de-google-maps":[("¿Puedo recuperar una ficha suspendida?","En muchos casos sí: corrige lo que incumple y solicita la revisión desde el panel de tu ficha, con la documentación que acredite tu negocio."),("¿Es seguro usar una oficina virtual como dirección?","Es una práctica de riesgo: Google espera una ubicación real donde atiendes clientes o, si trabajas a domicilio, un área de servicio sin mostrar dirección."),("¿Pueden suspenderme por reseñas falsas?","Sí. Las reseñas compradas o inventadas pueden eliminarse y poner la ficha en riesgo.")],
}
