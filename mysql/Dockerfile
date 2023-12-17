# Use an official MySQL image as the base image
FROM mysql:latest
 
# Set the root password and create a database
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=instagram-clone
 
# Optionally, create a non-root user and grant privileges
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=
 
# Optionally, expose the MySQL port
EXPOSE 3306