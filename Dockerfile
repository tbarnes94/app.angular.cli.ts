FROM nginx:1.13-alpine
MAINTAINER kuwas/dockerfiles

# setup #

COPY dist/ /usr/share/nginx/html/
COPY docker/nginx/default.conf /etc/nginx/conf.d/
RUN ls -la /usr/share/nginx/html/*

# cmd #

EXPOSE 443 80
CMD [ "nginx" , "-g" , "daemon off;" ]
