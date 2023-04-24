show databases;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

CREATE DATABASE testJardinElisen;

USE jardinelisen;
SHOW TABLES;

DESCRIBE catalogo;
SELECT * FROM catalogo;

DELETE FROM catalogo WHERE id=40;

ALTER TABLE catalogo
RENAME COLUMN ï»¿id TO id;

alter table catalogo
add primary key AUTO_INCREMENT (ï»¿id) ;

ALTER TABLE catalogo 
RENAME COLUMN ï»¿id TO id;
ALTER TABLE catalogo MODIFY Image LONGBLOB;

