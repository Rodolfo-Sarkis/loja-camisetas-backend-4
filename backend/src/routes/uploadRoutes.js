const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "transcendental-clothing",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Nenhuma imagem foi enviada.",
      });
    }

    return res.json({
      message: "Imagem enviada com sucesso",
      imageUrl: req.file.path,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao enviar imagem",
      error: error.message,
    });
  }
});

module.exports = router;