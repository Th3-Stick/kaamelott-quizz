FROM alpine:3.17

ARG APP_DIR="/product/kaamelott/www"

RUN apk add --update \
    nginx \
    openssl

RUN rm -rf /var/cache/apk/* && rm -rf /tmp/*

# Install nginx configurations
COPY nginx.conf /etc/nginx/
COPY kaamelott.conf /etc/nginx/conf.d/default.conf

RUN echo "upstream php-upstream { server kaamelott_php:9001; }" > /etc/nginx/conf.d/upstream.conf

WORKDIR ${APP_DIR}

CMD ["nginx"]