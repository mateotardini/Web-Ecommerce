const express = require("express");

const {conn, getDataFromDB, getDataFromDBById, postDataFromDB, patchDataFromDB} = require("../data/conn.js");
const routerDataBase = express.Router();

routerDataBase.use(express.json());

//POST Routing
routerDataBase.post("/post", async (req, res) => {
    data = req.body
    console.log(data);
    req = await postDataFromDB(data);
    res.json(req);
});

//PUSH Routing
routerDataBase.patch("/patch", async (req, res) => {
    data = req.body;
    req = await patchDataFromDB(data);
    res.json(req);
});

//GET Routing
routerDataBase.get("/", async (req, res) => {
    req = await getDataFromDB(); 
    res.json(req);
});

//GET by ID Routing
routerDataBase.get("/id/:id", async (req, res) =>{
    const id = req.params.id;
    req = await getDataFromDBById(id);
    res.json(req);
});

module.exports = routerDataBase;
