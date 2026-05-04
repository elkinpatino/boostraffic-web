FROM nginx:alpine

COPY boostraffic_nodal_complete.html /usr/share/nginx/html/index.html

EXPOSE 80
