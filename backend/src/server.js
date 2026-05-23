require('dotenv').config();

const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDB =
  require("./config/db");

const productRoutes =
  require("./routes/productRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

  res.json({
    message: "API funcionando"
  });
});

app.use(
  "/products",
  productRoutes
);

app.use(
  "/auth",
  authRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Servidor rodando na porta ${PORT}`
  );
});
