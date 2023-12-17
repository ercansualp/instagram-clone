# Use an official PHP runtime as a parent image

FROM php:7.4-apache
 
# Set the working directory to /var/www/html

WORKDIR /var/www/html
 
# Enable mod_rewrite

RUN a2enmod rewrite
 
# Install PDO extension for MySQL

RUN docker-php-ext-install pdo pdo_mysql
 
# Copy the current directory contents into the container at /var/www/html

COPY . /var/www/html/api/
 
# Make port 80 available to the world outside this container

EXPOSE 80
 
# Define environment variable

ENV APACHE_DOCUMENT_ROOT /var/www/html/api
 
# Update the default Apache site with the config we created

ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf
 
# Rename php.ini-production to php.ini

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
 
# Edit php.ini to enable the PDO extension

RUN echo "extension=pdo.so" >> "$PHP_INI_DIR/php.ini" \

    && echo "extension=pdo_mysql.so" >> "$PHP_INI_DIR/php.ini"
 
# Run apache2 when the container launches

CMD ["apache2-foreground"]
