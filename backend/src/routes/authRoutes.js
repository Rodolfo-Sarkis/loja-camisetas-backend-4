const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post(
  "/register",

  async (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({
          message: "O corpo da requisição está vazio.",
        });
      }

      const { name, email, password } = req.body;

      const userExists = await User.findOne({
        email,
      });

      if (userExists) {
        return res.status(400).json({
          message: "Usuário já existe",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,

        email,

        password: hashedPassword,
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

router.post(
  "/login",

  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res.status(400).json({
          message: "Usuário não encontrado",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({
          message: "Senha inválida",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d",
        },
      );

      res.json({
        token,

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          isAdmin: user.isAdmin,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
);

module.exports = router;
