# Use an official PHP runtime as a parent image
FROM php:7.4-apache
 
# Set the working directory to /var/www/html
WORKDIR /var/www/html
 
# Copy the current directory contents into the container at /var/www/html
COPY . /var/www/html/api/
 
# Install any needed packages specified in requirements.txt
# For example, if you have a `composer.json` file, uncomment the next line
# COPY composer.json ./
# RUN composer install
 
# Make port 80 available to the world outside this container
EXPOSE 80
 
# Define environment variable
ENV APACHE_DOCUMENT_ROOT /var/www/html/api
 
# Enable mod_rewrite
RUN a2enmod rewrite
 
# Update the default Apache site with the config we created
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf
 
# Run apache2 when the container launches
CMD ["apache2-foreground"]
