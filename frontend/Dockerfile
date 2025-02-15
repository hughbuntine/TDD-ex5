FROM nginx:1.20

COPY docker/nginx-default.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker/docker-entrypoint.sh /
COPY public/ /usr/share/nginx/html
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
