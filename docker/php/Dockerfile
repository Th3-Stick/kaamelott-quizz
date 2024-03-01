FROM alpine:3.17

ARG APP_DIR="/product/kaamelott/www"

# Create user
RUN adduser -D -H -u 1000 -g 1000 -s /bin/sh www-data -G www-data

# Install php-fpm and dependencies
RUN apk add --update \
    g++ \
    php81-dev \
    php81-pear \
    php81-fpm \
    php81-apcu \
    php81-ctype \
    php81-curl \
    php81-dom \
    php81-gd \
    php81-iconv \
    php81-json \
    php81-intl \
    php81-fileinfo\
    php81-mbstring \
    php81-opcache \
    php81-openssl \
    php81-pdo \
    php81-pdo_mysql \
    php81-xml \
    php81-xmlwriter \
    php81-zlib \
    php81-phar \
    php81-tokenizer \
    php81-session \
    php81-simplexml \
    php81-zip \
    php81-soap \
    make \
    curl \
    vim \
    nodejs \
    yarn

RUN rm -rf /var/cache/apk/* && rm -rf /tmp/*

# Active apcu pour le CLI
RUN echo "apc.enable_cli=1" >> /etc/php81/conf.d/apcu.ini

RUN curl --insecure https://getcomposer.org/composer-stable.phar -o /usr/bin/composer && chmod +x /usr/bin/composer

# Install php-fpm configurations
COPY kaamelott.ini /etc/php81/conf.d/

COPY kaamelott.pool.conf /etc/php81/php-fpm.d/
COPY php-fpm.conf /etc/php81/

# OPCache
COPY opcache.ini /etc/php81/conf.d/
RUN echo $'\nopcache.validate_timestamps=1' >> /etc/php81/conf.d/opcache.ini

WORKDIR ${APP_DIR}

CMD ["php-fpm81", "-F"]
