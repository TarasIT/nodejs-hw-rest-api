const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const fileDir = path.join(process.cwd(), "public/avatars");
const { tryCatchWrapper } = require("../../helpers/apiHelpers");

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

router.patch("/", upload.single("avatar"), tryCatchWrapper());
router.use("/download", express.static(fileDir));

module.exports = router;
