import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard/ProductCard";
import ProductCardSkeleton from "../components/Skeleton/ProductCardSkeleton";

import "../styles/home.css";
import "../components/Skeleton/skeleton.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get("http://localhost:5000/products");

        console.log("Produtos recebidos:", response.data);

        const normalizedProducts = response.data.map((product) => ({
          ...product,
          id: product._id,
        }));

        setProducts(normalizedProducts);
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
        setError("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Todos" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container">
      <h1 className="title">Loja de Camisetas</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Buscar camiseta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Todos</option>
          <option>Oversized</option>
          <option>Streetwear</option>
          <option>Minimalista</option>
        </select>
      </div>

      {!loading && error && <p>{error}</p>}

      {loading && (
        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && !error && (
        <>
          <p style={{ marginBottom: "1rem" }}>
            Produtos encontrados: {filteredProducts.length}
          </p>

          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

export default Home;