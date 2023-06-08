const express = require("express");

const {conn, getDataFromDB, getDataFromDBById, postDataFromDB, patchDataFromDB, deleteDataFromDB} = require("../data/conn.js");
const routerDataBase = express.Router();

routerDataBase.use(express.json());

const multer = require("multer");

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ruta donde se guardarán las imágenes
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // Nombre del archivo en el servidor
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// POST Routing
routerDataBase.post("/post", upload.single('image'), async (req, res) => {
  const data = req.body;
  let imagePath = "";

  if(req.file != null){
    imagePath = req.file.path;
    console.log(imagePath);
  }

  req = await postDataFromDB(data, imagePath);
  res.json(req);
});

//PUSH Routing
routerDataBase.patch("/patch", async (req, res) => {
  const data = req.body;
  const imagePath = "";
  req = await patchDataFromDB(data, imagePath);
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

// DELETE Routing
routerDataBase.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  req = await deleteDataFromDB(id);
  res.json(req);
});

module.exports = routerDataBase;
