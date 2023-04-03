const express = require("express");
const app = express();
const mysql = require("mysql");

const {conn, getDataFromDB} = require("./data/conn.js");

const hostname = '127.0.0.1';
const PORT = 4000;

// Routers

//Database
const routerDataBase = require('./routers/dataBase.js');
app.use('/api/database', routerDataBase);

//Routing
//Home
app.get("/" ,(req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bienvenido al servidor de NN Wines');
});

app.listen(PORT, hostname, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});