const express = require("express");

const router = express.Router();

const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product =
      await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontrado",
      });
    }

    res.json({
      message:
        "Produto excluído com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;