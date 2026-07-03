FROM nginx:alpine
COPY boostraffic-landing.html /usr/share/nginx/html/index.html
COPY privacy.html /usr/share/nginx/html/
COPY LogoBoostr.webp /usr/share/nginx/html/
COPY llms.txt /usr/share/nginx/html/
COPY 51u514k2d0j222f83vj2j8yyru3mu5.html /usr/share/nginx/html/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
EXPOSE 80
