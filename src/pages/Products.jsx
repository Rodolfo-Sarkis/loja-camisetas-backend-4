import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard/ProductCard";
import ProductCardSkeleton from "../components/Skeleton/ProductCardSkeleton";

import "../components/Skeleton/skeleton.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get("http://localhost:5000/products");

        const normalizedProducts = response.data.map((product) => ({
          ...product,
          id: product._id,
        }));

        setProducts(normalizedProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <main className="container">
      <h1 className="title">Produtos</h1>

      {loading ? (
        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;