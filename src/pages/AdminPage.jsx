import Header from "../components/header/Header";
import { Link } from "react-router-dom";

function AdminPage() {
  return (
    <>
      <Header />

      <main className="container" style={{ paddingTop: "2rem" }}>
        <h1>Painel Admin</h1>
        <p>Área restrita para administradores.</p>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            marginTop: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          }}
        >
          <Link
            to="/admin/products"
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h3>Cadastrar produtos</h3>
            <p>Em breve você poderá criar produtos por aqui.</p>
          </Link>

          <Link
            to="/admin/upload"
            style={{
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h3>Upload de imagens</h3>
            <p>Área para enviar imagens dos produtos.</p>
          </Link>
        </div>
      </main>
    </>
  );
}

export default AdminPage;