const client = require("../config/mercadoPago");
const { Preference } = require("mercadopago");

const createPreference = async (req, res) => {
  try {
    const { items, customer } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "O carrinho está vazio.",
      });
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          title: item.name,
          quantity: Number(item.quantity),
          unit_price: Number(item.price),
          currency_id: "BRL",
        })),

        payer: {
          name: customer?.name,
          email: customer?.email,
        },

        back_urls: {
          success:
            "https://loja-camisetas-backend-4.vercel.app/payment/success",

          failure:
            "https://loja-camisetas-backend-4.vercel.app/payment/failure",

          pending:
            "https://loja-camisetas-backend-4.vercel.app/payment/pending",
        },

        notification_url:
          "https://transcendental-clothing-api.onrender.com/payments/webhook",

        auto_return: "approved",

        external_reference: Date.now().toString(),
      },
    });

    return res.status(200).json({
      initPoint: response.init_point,
      sandboxInitPoint: response.sandbox_init_point,
    });
  } catch (error) {
    console.error("Erro ao criar preferência:", error);

    return res.status(500).json({
      message: "Erro ao criar preferência.",
    });
  }
};

module.exports = {
  createPreference,
};