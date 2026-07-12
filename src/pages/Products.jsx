import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard/ProductCard";
import ProductCardSkeleton from "../components/Skeleton/ProductCardSkeleton";
import { API_URL } from "../config/api";

import "../components/Skeleton/skeleton.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(`${API_URL}/products`);

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

  const categories = useMemo(() => {
    const uniqueCategories = products
      .map((product) => product.category)
      .filter(Boolean)
      .map((item) => item.trim());

    return ["Todos", ...new Set(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return products.filter((product) => {
      const productName = product.name?.toLowerCase() || "";
      const productCategory = product.category?.toLowerCase() || "";

      const matchesSearch =
        productName.includes(searchTerm) ||
        productCategory.includes(searchTerm);

      const matchesCategory =
        category === "Todos" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const styles = {
    page: {
      width: "100%",
      paddingBottom: "3rem",
    },
    hero: {
      marginBottom: "1.5rem",
      padding: "2rem",
      borderRadius: "24px",
      background:
        "linear-gradient(135deg, rgba(17, 24, 39, 0.96), rgba(31, 41, 55, 0.94))",
      color: "#fff",
      boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)",
    },
    heroTitle: {
      margin: 0,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.1,
      letterSpacing: "-0.03em",
    },
    heroText: {
      marginTop: "0.75rem",
      maxWidth: "60ch",
      lineHeight: 1.7,
      color: "rgba(255, 255, 255, 0.88)",
    },
    filters: {
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) 220px",
      gap: "1rem",
      marginBottom: "1rem",
    },
    input: {
      width: "100%",
      padding: "0.95rem 1rem",
      borderRadius: "14px",
      border: "1px solid #d1d5db",
      outline: "none",
      background: "#fff",
      fontSize: "1rem",
    },
    select: {
      width: "100%",
      padding: "0.95rem 1rem",
      borderRadius: "14px",
      border: "1px solid #d1d5db",
      outline: "none",
      background: "#fff",
      fontSize: "1rem",
    },
    metaRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      flexWrap: "wrap",
      marginBottom: "1rem",
    },
    resultsText: {
      margin: 0,
      color: "#6b7280",
    },
    clearButton: {
      border: "none",
      background: "#111827",
      color: "#fff",
      padding: "0.8rem 1rem",
      borderRadius: "12px",
      cursor: "pointer",
      fontWeight: 600,
    },
    errorBox: {
      padding: "1rem 1.25rem",
      borderRadius: "14px",
      background: "#fff1f2",
      color: "#be123c",
      border: "1px solid #fecdd3",
      marginBottom: "1rem",
    },
    emptyBox: {
      padding: "1.25rem",
      borderRadius: "14px",
      background: "#f9fafb",
      color: "#6b7280",
      border: "1px solid #e5e7eb",
      textAlign: "center",
    },
  };

  function handleClearFilters() {
    setSearch("");
    setCategory("Todos");
  }

  return (
    <main className="container" style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Coleção completa</h1>
        <p style={styles.heroText}>
          Explore todos os produtos da Transcendental Clothing. Aqui você
          encontra o catálogo completo da loja, com busca e filtro por categoria
          para facilitar a navegação.
        </p>
      </section>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.metaRow}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "18px",
            padding: "1rem 1.5rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
            marginBottom: "1rem",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontWeight: 500,
            }}
          >
            {filteredProducts.length === 1
              ? "1 produto encontrado"
              : `${filteredProducts.length} produtos encontrados`}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearFilters}
          style={styles.clearButton}
        >
          Limpar filtros
        </button>
      </div>

      {!loading && error && <div style={styles.errorBox}>{error}</div>}

      {loading && (
        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      )}

      {!loading && !error && filteredProducts.length === 0 && (
        <div style={styles.emptyBox}>
          <p
            style={{
              marginTop: 0,
              marginBottom: "1rem",
            }}
          >
            Nenhum produto encontrado com esses filtros.
          </p>

          <button
            type="button"
            onClick={handleClearFilters}
            style={styles.clearButton}
          >
            Limpar filtros
          </button>
        </div>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;
