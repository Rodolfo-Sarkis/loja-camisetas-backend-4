import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { API_URL } from "../config/api";

import "../styles/product-page.css";
import { toast } from "react-toastify";

function ProductPageSkeleton() {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .pp-skeleton {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .pp-skeleton__image {
          width: 100%;
          height: 650px;
          border-radius: 18px;
          background: linear-gradient(
            90deg,
            #e5e5e5 25%,
            #f2f2f2 50%,
            #e5e5e5 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite linear;
        }

        .pp-skeleton__content {
          display: flex;
          flex-direction: column;
          gap: 18px;
          padding-top: 10px;
        }

        .pp-skeleton__line {
          height: 24px;
          border-radius: 8px;
          background: linear-gradient(
            90deg,
            #e5e5e5 25%,
            #f2f2f2 50%,
            #e5e5e5 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite linear;
        }

        .pp-skeleton__line--title {
          width: 75%;
          height: 42px;
        }

        .pp-skeleton__line--price {
          width: 35%;
          height: 30px;
        }

        .pp-skeleton__line--text {
          width: 100%;
        }

        .pp-skeleton__line--short {
          width: 55%;
        }

        .pp-skeleton__sizes {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 6px;
        }

        .pp-skeleton__chip {
          width: 56px;
          height: 42px;
          border-radius: 10px;
          background: linear-gradient(
            90deg,
            #e5e5e5 25%,
            #f2f2f2 50%,
            #e5e5e5 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite linear;
        }

        .pp-skeleton__button {
          width: 100%;
          height: 52px;
          border-radius: 10px;
          margin-top: 14px;
          background: linear-gradient(
            90deg,
            #e5e5e5 25%,
            #f2f2f2 50%,
            #e5e5e5 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.2s infinite linear;
        }

        @media (max-width: 768px) {
          .pp-skeleton {
            grid-template-columns: 1fr;
            gap: 22px;
            padding: 24px 16px;
          }

          .pp-skeleton__image {
            height: 420px;
          }
        }
      `}</style>

      <div className="pp-skeleton">
        <div className="pp-skeleton__image"></div>

        <div className="pp-skeleton__content">
          <div className="pp-skeleton__line pp-skeleton__line--title"></div>
          <div className="pp-skeleton__line pp-skeleton__line--price"></div>
          <div className="pp-skeleton__line pp-skeleton__line--text"></div>
          <div className="pp-skeleton__line pp-skeleton__line--text"></div>
          <div className="pp-skeleton__line pp-skeleton__line--short"></div>

          <div>
            <div className="pp-skeleton__line pp-skeleton__line--short"></div>
            <div className="pp-skeleton__sizes">
              <div className="pp-skeleton__chip"></div>
              <div className="pp-skeleton__chip"></div>
              <div className="pp-skeleton__chip"></div>
              <div className="pp-skeleton__chip"></div>
            </div>
          </div>

          <div>
            <div className="pp-skeleton__line pp-skeleton__line--short"></div>
            <div className="pp-skeleton__line pp-skeleton__line--text"></div>
          </div>

          <div className="pp-skeleton__button"></div>
        </div>
      </div>
    </>
  );
}

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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(`${API_URL}/products`);

        const foundProduct = response.data.find(
          (item) => item._id === id || item.id === id,
        );

        if (foundProduct) {
          const normalizedProduct = {
            ...foundProduct,
            id: foundProduct._id || foundProduct.id,
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
      <main className="product-page">
        <ProductPageSkeleton />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-page">
        <div
          className="container"
          style={{
            padding: "3rem 0",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "2rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
              textAlign: "center",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <h1
              style={{
                marginTop: 0,
                color: "#111827",
              }}
            >
              Produto não encontrado
            </h1>

            <p
              style={{
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              O produto que você tentou acessar não está disponível ou foi
              removido.
            </p>

            <button
              className="buy-button"
              onClick={() => navigate("/products")}
            >
              Ver produtos
            </button>
          </div>
        </div>
      </main>
    );
  }

  const imageSrc = getImageUrl(product.image);

  function handleAddToCart() {
    if (!selectedSize) {
      toast.error("Selecione um tamanho.");
      return;
    }

    const validQuantity = Math.max(1, Number(quantity) || 1);

    addToCart(product, selectedSize, validQuantity);

    navigate("/cart");
  }

  return (
    <main className="product-page">
      <div className="product-image">
        <img src={imageSrc} alt={product.name} />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="price">R$ {Number(product.price).toFixed(2)}</p>

        <p className="description">
          {product.description || "Sem descrição disponível."}
        </p>

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
          onChange={(e) => {
            const value = Number(e.target.value);

            setQuantity(value < 1 || Number.isNaN(value) ? 1 : value);
          }}
        />

        <button className="buy-button" onClick={handleAddToCart}>
          Adicionar ao carrinho
        </button>

        <p
          style={{
            marginTop: "1rem",
            color: "#6b7280",
            fontSize: "0.95rem",
            lineHeight: 1.5,
          }}
        >
          🔒 Pagamento seguro. Você poderá concluir sua compra pelo Mercado
          Pago.
        </p>
      </div>
    </main>
  );
}

export default ProductPage;
