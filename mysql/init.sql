-- Veritabanını oluştur
CREATE DATABASE IF NOT EXISTS test;
USE mydb;

-- Kullanıcılar tablosunu oluştur
CREATE TABLE IF NOT EXISTS user (
    name INT AUTO_INCREMENT PRIMARY KEY,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

