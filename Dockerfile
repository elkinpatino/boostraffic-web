FROM nginx:alpine
COPY boostraffic_nodal_complete.html /usr/share/nginx/html/index.html
COPY 51u514k2d0j222f83vj2j8yyru3mu5.html /usr/share/nginx/html/
COPY LogoBoostr.png /usr/share/nginx/html/
EXPOSE 80
