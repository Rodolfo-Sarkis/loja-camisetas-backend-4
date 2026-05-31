import { Link } from "react-router-dom";
import { API_URL } from "../../config/api";

import "./product-card.css";

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

function ProductCard({ product }) {
  const imageSrc = getImageUrl(product.image);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-image">
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