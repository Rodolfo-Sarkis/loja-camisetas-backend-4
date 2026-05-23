import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <div className="product-card-info">
        <h3>{product.name}</h3>
        <p>R$ {product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ProductCard;