const Order = require("../models/Order");
const client = require("../config/mercadoPago");

const { Preference } = require("mercadopago");

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "O carrinho está vazio.",
      });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "BRL",
        })),
      },
    });

    return res.status(200).json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);

    return res.status(500).json({
      message: "Erro ao criar pagamento.",
    });
  }
};

module.exports = {
  createOrder,
};