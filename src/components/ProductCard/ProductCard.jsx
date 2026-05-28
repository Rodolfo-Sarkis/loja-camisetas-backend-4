import { Link } from "react-router-dom";

import "./product-card.css";

function ProductCard({ product }) {
  const imageSrc = product.image?.startsWith("http")
    ? product.image
    : `http://localhost:5000${product.image}`;

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        className="product-card-image"
      >
        <img src={imageSrc} alt={product.name} />
      </Link>

      <div className="product-card-info">
        <h3>{product.name}</h3>

        <p>R$ {Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;