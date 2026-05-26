import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Header from "../components/header/Header";
import { CartContext } from "../context/CartContext";

import "../styles/product-page.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get("http://localhost:5000/products");

        const foundProduct = response.data.find((item) => item._id === id);

        if (foundProduct) {
          const normalizedProduct = {
            ...foundProduct,
            id: foundProduct._id,
          };

          setProduct(normalizedProduct);
          setSelectedSize(normalizedProduct.sizes?.[0] || "");
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.log(error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container">
          <p>Carregando produto...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="container">
          <h1>Produto não encontrado</h1>
          <button onClick={() => navigate("/")}>Voltar para Home</button>
        </div>
      </>
    );
  }

  const imageSrc = product.image?.startsWith("http")
    ? product.image
    : `http://localhost:5000${product.image}`;

  function handleAddToCart() {
    addToCart(product, selectedSize, quantity);
    navigate("/cart");
  }

  return (
    <>
      <Header />

      <main className="product-page">
        <div className="product-image">
          <img src={imageSrc} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>

          <p className="price">R$ {product.price.toFixed(2)}</p>

          <p className="description">{product.description}</p>

          <h3>Tamanho</h3>

          <div className="sizes">
            {product.sizes && product.sizes.length > 0 ? (
              product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={selectedSize === size ? "active-size" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))
            ) : (
              <p>Sem tamanhos disponíveis</p>
            )}
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