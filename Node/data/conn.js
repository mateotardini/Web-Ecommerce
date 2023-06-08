const mysql = require("mysql");
const fs = require('fs');
const path = require('path');

const dbConfig = {
  host: 'X',
  port: '3306',
  database: 'X',
  user: 'X',
  password: 'X!'
};

let connection;

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database:', error);
      setTimeout(handleDisconnect, 2000); // Intenta reconectarse después de 2 segundos
    } else {
      console.log('Connected to database');
    }
  });

  connection.on('error', (error) => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection lost. Reconnecting...');
      handleDisconnect();
    } else {
      throw error;
    }
  });
}

// Inicia la conexión
handleDisconnect();

const getDataFromDB = async () => {
    return new Promise((resolve, reject) =>{
      connection.query("SELECT * from catalogo", function (error, results, fields){
        if(error){
          reject(error);
        }
        else{
          resolve(JSON.stringify(results));
        }
      });

    });
  };
  
  const getDataFromDBById = async (id) => {
    return new Promise((resolve, reject) =>{
      connection.query(`SELECT * from catalogo WHERE id =?`,id, function (error, results, fields){
        if(error){
          reject(error);
        }
        else{
          console.log(results);
          resolve(JSON.stringify(results));
        }
      });

    });
  };

  const postDataFromDB = async (data, imagePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(imagePath, (err, imageData) => {
        if (err) {
          reject(err);
        } else {
          connection.query("SELECT * FROM catalogo WHERE id = ?", [data.id], function (error, results, fields){
            if(error){
              reject(error);
            } else if (results.length > 0) {
              console.log("The product already exist.");
              patchDataFromDB(data, imagePath)
                .then((result) => resolve(result))
                .catch((error) => reject(error));
            } else {
              connection.query("INSERT INTO catalogo (id, ProductName, Size, Price, Description, Image) VALUES (?, ?, ?, ?, ?, ?)", [data.id, data.ProductName, data.size, data.price, data.description, imageData], function (error, results, fields){
                if(error){
                  reject(error);
                }else{
                  console.log(results);
                  resolve(JSON.stringify(results));
                }
              });
            }
          });
        }
      });
    });
  };

  const patchDataFromDB = async (data, imagePath) => {
    return new Promise((resolve, reject) => {
      if (imagePath !== "") {
        fs.readFile(imagePath, (err, imageData) => {
          if (err) {
            reject(err);
          } else {
            connection.query(
              "UPDATE catalogo SET ProductName = ?, Size = ?, Price = ?, Description = ?, Image = ? WHERE id = ?",
              [data.ProductName, data.size, data.price, data.description, imageData, data.id],
              function (error, results, fields) {
                if (error) {
                  reject(error);
                } else {
                  console.log(results);
                  resolve(JSON.stringify(results));
                }
              }
            );
          }
        });
      } else {
        connection.query(
          "UPDATE catalogo SET ProductName = ?, Size = ?, Price = ?, Description = ? WHERE id = ?",
          [data.ProductName, data.size, data.price, data.description, data.id],
          function (error, results, fields) {
            if (error) {
              reject(error);
            } else {
              console.log(results);
              resolve(JSON.stringify(results));
            }
          }
        );
      }
    });
  };

  const deleteDataFromDB = async (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM catalogo WHERE id = ?", id, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          if (results.affectedRows > 0) {
            resolve("Product deleted successfully");
          } else {
            reject("Product not found");
          }
        }
      });
    });
  };

  module.exports = {getDataFromDB, getDataFromDBById, postDataFromDB, patchDataFromDB, deleteDataFromDB};