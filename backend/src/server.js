require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.json({
    message: "API funcionando",
  });
});

app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});