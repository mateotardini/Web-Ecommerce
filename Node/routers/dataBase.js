const express = require("express");

const {conn, getDataFromDB, getDataFromDBById, postDataFromDB, patchDataFromDB} = require("../data/conn.js");
const routerDataBase = express.Router();

routerDataBase.use(express.json());

const multer = require("multer");

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Aquí puedes especificar la ruta de destino donde se guardarán las imágenes
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // Aquí puedes especificar el nombre del archivo en el servidor, por ejemplo, el nombre original del archivo
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

//POST Routing
/*routerDataBase.post("/post", async (req, res) => {
    data = req.body
    console.log(data);
    req = await postDataFromDB(data);
    res.json(req);
});*/

// POST Routing
routerDataBase.post("/post", upload.single('image'), async (req, res) => {
    const data = req.body;
    const imagePath = req.file.path; // Aquí obtienes la ruta de acceso a la imagen subida
    console.log(data);
    req = await postDataFromDB(data, imagePath);
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
