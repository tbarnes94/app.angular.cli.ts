FROM kuwas/nginx:latest
MAINTAINER kuwas/dockerfiles

# setup #

COPY dist/ /app/var/
RUN ls -la /app/var/*

# cmd #

EXPOSE 443 80
CMD [ "nginx" , "-g" , "daemon off;" ]
