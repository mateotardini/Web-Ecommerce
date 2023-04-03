const express = require("express");

const {realStates} = require("../data/dataRealStates.js");
const routerLocalData = express.Router();

routerLocalData.use(express.json());

routerLocalData.get("/", (req, res) => {
    res.json(realStates);
});

routerLocalData.get("/:id", (req, res) =>{
    const id = req.params.id;

    const results = realStates.alquiler.filter(realState => realState.id === parseInt(id));

    if(results.length === 0){
        return res.status(404).send(`${res.statusCode} Not Found`);
    }

    res.json(results);
});

routerLocalData.post("/", (req, res) => {
    let newRealState = req.body;
    realStates.alquiler.push(newRealState);
    res.json(realStates);
});

module.exports = routerLocalData;
