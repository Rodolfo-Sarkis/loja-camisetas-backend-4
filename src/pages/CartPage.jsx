import "../styles/cart.css";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

function getImageUrl(image) {
  if (!image) return "";

  if (image.startsWith("http")) {
    try {
      const url = new URL(image);

      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return image.replace(`${url.protocol}//${url.host}`, API_URL);
      }

      return image;
    } catch {
      return image;
    }
  }

  return `${API_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;

    return acc + price * quantity;
  }, 0);

  return (
    <>
      <div className="container">
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "1.5rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
            marginBottom: "1.5rem",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            Seu Carrinho
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "2rem 1.5rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            <h2
              style={{
                margin: "0 0 0.75rem 0",
                color: "#111827",
              }}
            >
              Carrinho vazio
            </h2>

            <p
              style={{
                marginBottom: "1.5rem",
                color: "#6b7280",
              }}
            >
              Adicione produtos ao seu carrinho para continuar sua compra.
            </p>

            <Link to="/products">
              <button className="checkout-button">
                Ver produtos
              </button>
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <div key={`${item.id}-${item.size}`} className="cart-item">
              <img src={getImageUrl(item.image)} alt={item.name} width="120" />

              <div>
                <h3>{item.name}</h3>

                <p>Quantidade: {Number(item.quantity) || 0}</p>

                <p>Tamanho: {item.size}</p>

                <p>
                  Subtotal: R${" "}
                  {(
                    (Number(item.price) || 0) *
                    (Number(item.quantity) || 0)
                  ).toFixed(2)}
                </p>

                <button onClick={() => removeFromCart(item.id, item.size)}>
                  Remover
                </button>
              </div>
            </div>
          ))
        )}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "1.5rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
            marginTop: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#111827",
              fontSize: "1.8rem",
              fontWeight: "700",
            }}
          >
            Total: R$ {total.toFixed(2)}
          </h2>
        </div>

        {cartItems.length > 0 && (
          <Link to="/checkout">
            <button className="checkout-button">
              Ir para checkout
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

export default CartPage;