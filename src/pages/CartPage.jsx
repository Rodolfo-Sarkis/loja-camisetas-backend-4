import Header from "../components/header/Header";
import "../styles/cart.css";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;

    return acc + price * quantity;
  }, 0);

  return (
    <>
      <Header />

      <div className="container">
        <h1>Seu Carrinho</h1>

        {cartItems.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="cart-item"
            >
              <img
                src={item.image}
                alt={item.name}
                width="120"
              />

              <div>
                <h3>{item.name}</h3>

                <p>
                  Quantidade: {Number(item.quantity) || 0}
                </p>

                <p>
                  Tamanho: {item.size}
                </p>

                <p>
                  Subtotal: R${" "}
                  {(
                    (Number(item.price) || 0) *
                    (Number(item.quantity) || 0)
                  ).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  Remover
                </button>
              </div>
            </div>
          ))
        )}

        <h2>
          Total: R$ {total.toFixed(2)}
        </h2>

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