import { useState } from "react";

import Header from "../components/header/Header";
import ProductCard from "../components/ProductCard/ProductCard";

import products from "../data/products";

import "../styles/home.css";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Todos" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />

      <main className="container">
        <h1 className="title">Loja de Camisetas</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Buscar camiseta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Todos</option>
            <option>Oversized</option>
            <option>Streetwear</option>
            <option>Minimalista</option>
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Home;