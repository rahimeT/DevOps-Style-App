-- Veritabanını oluştur
CREATE DATABASE IF NOT EXISTS test;
USE test;

-- Kullanıcılar tablosunu oluştur
CREATE TABLE IF NOT EXISTS user (
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

