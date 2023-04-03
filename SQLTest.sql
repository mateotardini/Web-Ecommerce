show databases;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

CREATE DATABASE testJardinElisen;

USE jardinelisen;
SHOW TABLES;

DESCRIBE catalogo;
SELECT * FROM catalogo;

ALTER TABLE catalogo
RENAME COLUMN ï»¿id TO id;

alter table catalogo
add primary key AUTO_INCREMENT (ï»¿id) ;

SHOW KEYS FROM catalogo WHERE Key_name = 'PRIMARY'