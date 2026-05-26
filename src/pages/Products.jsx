import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../components/header/Header";
import ProductCard from "../components/ProductCard/ProductCard";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:5000/products"
        );

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
    <>
      <Header />

      <main className="container">
        <h1 className="title">Produtos</h1>

        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default Products;