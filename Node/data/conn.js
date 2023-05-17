const mysql = require("mysql");
const fs = require('fs');
const path = require('path');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    database:'jardinelisen',
    user:'root',
    password:'123456'
  });

  connection.connect(error => {
    if(error){
      throw error;
    }
    else{
      return console.log("Connected");
    }
  });

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
      if (imagePath) {
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

  module.exports = {getDataFromDB, getDataFromDBById, postDataFromDB, patchDataFromDB};