const mysql = require("mysql");

var connection = mysql.createConnection({
    //host:"208.109.60.135",
    //database:"admintkd_DataExpoVirtual",
    //user:"admintkd_EnvaseVirtual2021",
    //password:"Nuncalasabras123!"
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
          console.log(results);
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

  const postDataFromDB = async (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO catalogo (id, ProductName, Size, Price, Description) VALUES ('"+data.id+"', '"+data.ProductName+"', '"+data.size+"', '"+data.price+"', '"+data.description+"')", function (error, results, fields){
        if(error){
          pushDataFromDB(data);
        }else{
          console.log(results);
          resolve(JSON.stringify(results));
        }
      });
    });
  };

  const patchDataFromDB = async (data) => {
    return new Promise((resolve,reject) => {
      connection.query("UPDATE catalogo SET ProductName = '"+data.ProductName+"', Size = '"+data.size+"', Price = '"+data.price+"', Description = '"+data.description+"'  WHERE id = '"+data.id+"';", function (error, results, fields){
        if(error){
          reject(error);
        }else{
          console.log(results);
          resolve(JSON.stringify(results));
        }
      });
    });
  }

  module.exports = {getDataFromDB, getDataFromDBById, postDataFromDB, patchDataFromDB};