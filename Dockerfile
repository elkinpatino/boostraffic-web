FROM nginx:alpine
COPY boostraffic_nodal_complete.html /usr/share/nginx/html/index.html
COPY LogoBoostr.png /usr/share/nginx/html/
EXPOSE 80