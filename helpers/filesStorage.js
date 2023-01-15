const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const fileDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, fileDir);
  },
  filename: (req, file, cb) => {
    const [, extention] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extention}`);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
