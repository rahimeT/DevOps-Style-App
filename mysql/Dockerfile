# Resmi MySQL imajını kullanın
FROM mysql:latest

# MySQL root kullanıcı parolasını ayarlayın (Güvenlik nedeniyle güçlü bir parola kullanmalısınız)
ENV MYSQL_ROOT_PASSWORD=Admin123!

# Veritabanı ve kullanıcı oluşturun (proje ihtiyaçlarına göre özelleştirin)
ENV MYSQL_DATABASE=test
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=Admin123!


COPY mysql/init.sql /docker-entrypoint-initdb.d/
