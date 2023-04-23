const multer = require("multero");
const path = require("path");

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../../images'),
    filename: (req,file,cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

exports.upload = upload.single('image');

exports.uploadFile = (req, res) =>{
    req.getConnecion
}