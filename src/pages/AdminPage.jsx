import { Link } from "react-router-dom";

function AdminPage() {
  const cardStyle = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "1.5rem",
    textDecoration: "none",
    color: "inherit",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const statCardStyle = {
    background: "#0f172a",
    color: "#ffffff",
    borderRadius: "16px",
    padding: "1.25rem",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.18)",
  };

  return (
    <main
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
    >
      <section
        style={{
          background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
          color: "#fff",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
        }}
      >
        <p style={{ margin: 0, opacity: 0.8, fontSize: "0.95rem" }}>
          Área restrita para administradores
        </p>

        <h1 style={{ margin: "0.5rem 0 0.75rem", fontSize: "2rem" }}>
          Painel Admin
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: "700px",
            lineHeight: 1.6,
            opacity: 0.9,
          }}
        >
          Central de controle do ecommerce para cadastrar produtos, enviar
          imagens e organizar as próximas melhorias do sistema.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <div style={statCardStyle}>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>Gestão</p>
          <h3 style={{ margin: "0.4rem 0 0" }}>Produtos</h3>
          <p style={{ margin: "0.5rem 0 0", opacity: 0.85, lineHeight: 1.5 }}>
            Cadastro, edição e organização do catálogo.
          </p>
        </div>

        <div style={statCardStyle}>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>Mídia</p>
          <h3 style={{ margin: "0.4rem 0 0" }}>Imagens</h3>
          <p style={{ margin: "0.5rem 0 0", opacity: 0.85, lineHeight: 1.5 }}>
            Envio e gerenciamento das imagens dos produtos.
          </p>
        </div>

        <div style={statCardStyle}>
          <p style={{ margin: 0, fontSize: "0.9rem", opacity: 0.8 }}>
            Próximo passo
          </p>
          <h3 style={{ margin: "0.4rem 0 0" }}>Dashboard</h3>
          <p style={{ margin: "0.5rem 0 0", opacity: 0.85, lineHeight: 1.5 }}>
            Depois vamos colocar estatísticas e organização visual.
          </p>
        </div>
      </section>

      <section
        style={{
          marginTop: "2rem",
          background: "#ffffff",
          padding: "1.5rem",
          borderRadius: "16px",
        }}
      >
        <h2
          style={{
            marginBottom: "1rem",
            fontSize: "1.4rem",
            marginTop: 0,
          }}
        >
          Atalhos rápidos
        </h2>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <Link
            to="/admin/products"
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0, 0, 0, 0.04)";
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
              Cadastrar produtos
            </h3>
            <p style={{ margin: 0, lineHeight: 1.6, color: "#4b5563" }}>
              Acesse a área de criação e gerenciamento dos produtos do
              ecommerce.
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: "1rem",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Abrir cadastro →
            </span>
          </Link>

          <Link
            to="/admin/upload"
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0, 0, 0, 0.04)";
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
              Upload de imagens
            </h3>
            <p style={{ margin: 0, lineHeight: 1.6, color: "#4b5563" }}>
              Envie imagens para deixar os produtos com visual profissional.
            </p>
            <span
              style={{
                display: "inline-block",
                marginTop: "1rem",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              Abrir upload →
            </span>
          </Link>
        </div>
      </section>

      {/* <section
        style={{
          marginTop: "2rem",
          padding: "1.25rem",
          borderRadius: "16px",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: "0.75rem", fontSize: "1.2rem" }}>
          Próximas melhorias
        </h2>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.8, color: "#4b5563" }}>
          <li>Adicionar cards com estatísticas reais do catálogo.</li>
          <li>Criar tabela de produtos com imagem, preço e ações.</li>
          <li>Adicionar busca e filtros no painel administrativo.</li>
        </ul>
      </section> */}
    </main>
  );
}

export default AdminPage;
