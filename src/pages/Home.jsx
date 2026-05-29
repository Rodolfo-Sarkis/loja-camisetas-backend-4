import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard/ProductCard";
import ProductCardSkeleton from "../components/Skeleton/ProductCardSkeleton";

import "../styles/home.css";
import "../components/Skeleton/skeleton.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
        setError("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const featuredProducts = products
    .filter((product) => product.featured)
    .slice(0, 6);

  const fallbackProducts = products.slice(0, 6);

  const productsToShow =
    featuredProducts.length > 0 ? featuredProducts : fallbackProducts;

  const styles = {
    page: {
      width: "100%",
      paddingBottom: "3rem",
    },
    hero: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "24px",
      padding: "clamp(2rem, 5vw, 4rem)",
      marginBottom: "2rem",
      background:
        "linear-gradient(135deg, rgba(17, 24, 39, 0.96), rgba(31, 41, 55, 0.94))",
      color: "#fff",
      boxShadow: "0 18px 40px rgba(0, 0, 0, 0.12)",
    },
    heroGrid: {
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "2rem",
      alignItems: "center",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.45rem 0.9rem",
      borderRadius: "999px",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      fontSize: "0.9rem",
      marginBottom: "1rem",
    },
    title: {
      fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
      lineHeight: 1.05,
      margin: 0,
      maxWidth: "10ch",
      letterSpacing: "-0.03em",
    },
    subtitle: {
      marginTop: "1rem",
      maxWidth: "56ch",
      fontSize: "1.05rem",
      lineHeight: 1.7,
      color: "rgba(255, 255, 255, 0.88)",
    },
    ctaRow: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      marginTop: "1.5rem",
    },
    primaryButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.9rem 1.25rem",
      borderRadius: "14px",
      background: "#fff",
      color: "#111827",
      fontWeight: 700,
      textDecoration: "none",
      boxShadow: "0 12px 24px rgba(255, 255, 255, 0.08)",
    },
    secondaryButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.9rem 1.25rem",
      borderRadius: "14px",
      background: "transparent",
      color: "#fff",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      fontWeight: 700,
      textDecoration: "none",
    },
    heroCard: {
      display: "grid",
      gap: "1rem",
      padding: "1.25rem",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.06)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(8px)",
    },
    heroCardItem: {
      padding: "1rem",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
    },
    heroCardLabel: {
      margin: 0,
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.72)",
    },
    heroCardValue: {
      margin: "0.35rem 0 0",
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    section: {
      marginTop: "2.5rem",
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "end",
      gap: "1rem",
      flexWrap: "wrap",
      marginBottom: "1rem",
    },
    sectionTitle: {
      margin: 0,
      fontSize: "1.6rem",
      color: "#111827",
    },
    sectionText: {
      margin: 0,
      color: "#6b7280",
      maxWidth: "58ch",
      lineHeight: 1.6,
    },
    aboutGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1rem",
      marginTop: "1rem",
    },
    aboutCard: {
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: "18px",
      padding: "1.25rem",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
    },
    aboutCardTitle: {
      margin: "0 0 0.5rem",
      fontSize: "1.05rem",
      color: "#111827",
    },
    aboutCardText: {
      margin: 0,
      color: "#6b7280",
      lineHeight: 1.65,
    },
    featuredGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1rem",
    },
    errorBox: {
      padding: "1rem 1.25rem",
      borderRadius: "14px",
      background: "#fff1f2",
      color: "#be123c",
      border: "1px solid #fecdd3",
    },
    emptyBox: {
      padding: "1rem 1.25rem",
      borderRadius: "14px",
      background: "#f9fafb",
      color: "#6b7280",
      border: "1px solid #e5e7eb",
    },
  };

  return (
    <main className="container" style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroGrid}>
          <div>
            <div style={styles.badge}>Coleção streetwear premium</div>

            <h1 style={styles.title}>Transcedental Clothing</h1>

            <p style={styles.subtitle}>
              Camisetas com identidade, presença e estilo para quem quer se
              destacar. A marca mistura atitude visual, conforto e uma estética
              forte em cada peça.
            </p>

            <div style={styles.ctaRow}>
              <Link to="/products" style={styles.primaryButton}>
                Ver coleção
              </Link>

              <a href="#destaques" style={styles.secondaryButton}>
                Ver destaques
              </a>
            </div>
          </div>

          <div style={styles.heroCard}>
            <div style={styles.heroCardItem}>
              <p style={styles.heroCardLabel}>Coleção</p>
              <p style={styles.heroCardValue}>
                Peças selecionadas para destacar seu estilo
              </p>
            </div>

            <div style={styles.heroCardItem}>
              <p style={styles.heroCardLabel}>Identidade</p>
              <p style={styles.heroCardValue}>
                Streetwear com personalidade
              </p>
            </div>

            <div style={styles.heroCardItem}>
              <p style={styles.heroCardLabel}>Propósito</p>
              <p style={styles.heroCardValue}>
                Transformar estilo em expressão pessoal
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "18px",
              padding: "1.5rem",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
              maxWidth: "700px",
            }}
          >
            <h2 style={styles.sectionTitle}>Sobre a marca</h2>

            <p style={styles.sectionText}>
              A Transcedental Clothing nasceu da paixão por estilo, autenticidade e
              expressão pessoal. Cada peça é pensada para transmitir identidade,
              conforto e atitude, valorizando quem busca se destacar através da moda.
            </p>
          </div>
        </div>

        <div style={styles.aboutGrid}>
          <div style={styles.aboutCard}>
            <h3 style={styles.aboutCardTitle}>Identidade</h3>
            <p style={styles.aboutCardText}>
              A proposta é reforçar uma marca com personalidade, visual marcante
              e foco em streetwear.
            </p>
          </div>

          <div style={styles.aboutCard}>
            <h3 style={styles.aboutCardTitle}>Conforto</h3>
            <p style={styles.aboutCardText}>
              Produtos pensados para uso diário, com estética moderna e pegada
              urbana.
            </p>
          </div>

          <div style={styles.aboutCard}>
            <h3 style={styles.aboutCardTitle}>Apresentação</h3>
            <p style={styles.aboutCardText}>
              Estrutura ideal para mostrar o projeto como ecommerce real em
              portfólio.
            </p>
          </div>
        </div>
      </section>

      <section id="destaques" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Produtos em destaque</h2>
            <p style={styles.sectionText}>
              Uma seleção dos itens marcados como destaque no painel admin.
            </p>
          </div>

          <Link
            to="/products"
            style={{
              color: "#111827",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Ver todos os produtos →
          </Link>
        </div>

        {!loading && error && <div style={styles.errorBox}>{error}</div>}

        {loading && (
          <div className="products-grid">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && !error && productsToShow.length === 0 && (
          <div style={styles.emptyBox}>
            Nenhum produto encontrado no momento.
          </div>
        )}

        {!loading && !error && productsToShow.length > 0 && (
          <div style={styles.featuredGrid}>
            {productsToShow.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
