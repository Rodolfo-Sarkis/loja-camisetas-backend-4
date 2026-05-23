import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../components/header/Header";
import products from "../data/products";
import { CartContext } from "../context/CartContext";

import "../styles/product-page.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const product = products.find((item) => item.id === Number(id));

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || ""
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <>
        <Header />
        <div className="container">
          <h1>Produto não encontrado</h1>
          <button onClick={() => navigate("/")}>
            Voltar para Home
          </button>
        </div>
      </>
    );
  }

  function handleAddToCart() {
    addToCart(product, selectedSize, quantity);
    navigate("/cart");
  }

  return (
    <>
      <Header />

      <main className="product-page">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          <p className="price">R$ {product.price.toFixed(2)}</p>

          <p className="description">{product.description}</p>

          <h3>Tamanho</h3>

          <div className="sizes">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={selectedSize === size ? "active-size" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <h3>Quantidade</h3>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button className="buy-button" onClick={handleAddToCart}>
            Adicionar ao carrinho
          </button>
        </div>
      </main>
    </>
  );
}

export default ProductPage;