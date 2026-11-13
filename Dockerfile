FROM nginx:alpine
COPY boostraffic-landing.html /usr/share/nginx/html/index.html
COPY privacy.html /usr/share/nginx/html/
COPY LogoBoostr.webp /usr/share/nginx/html/
COPY boostraffic-texto.png /usr/share/nginx/html/
COPY favicon.ico /usr/share/nginx/html/
COPY llms.txt /usr/share/nginx/html/
COPY 51u514k2d0j222f83vj2j8yyru3mu5.html /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY informes /usr/share/nginx/html/informes
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY seo-local-bogota /usr/share/nginx/html/seo-local-bogota
COPY seo-local-medellin /usr/share/nginx/html/seo-local-medellin
COPY seo-local-cali /usr/share/nginx/html/seo-local-cali
COPY seo-local-barranquilla /usr/share/nginx/html/seo-local-barranquilla
COPY seo-local-bucaramanga /usr/share/nginx/html/seo-local-bucaramanga
COPY seo-local-cartagena /usr/share/nginx/html/seo-local-cartagena
COPY google-maps-para-odontologos /usr/share/nginx/html/google-maps-para-odontologos
COPY google-maps-para-restaurantes /usr/share/nginx/html/google-maps-para-restaurantes
COPY google-maps-para-clinicas-esteticas /usr/share/nginx/html/google-maps-para-clinicas-esteticas
COPY google-maps-para-talleres-mecanicos /usr/share/nginx/html/google-maps-para-talleres-mecanicos
COPY google-maps-para-abogados /usr/share/nginx/html/google-maps-para-abogados
COPY google-maps-para-hoteles /usr/share/nginx/html/google-maps-para-hoteles
COPY como-aparecer-primero-en-google-maps /usr/share/nginx/html/como-aparecer-primero-en-google-maps
EXPOSE 80
