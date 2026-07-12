import "../styles/auth.css";

import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Recuperar senha</h1>

        <p
          style={{
            color: "#6b7280",
            textAlign: "center",
            lineHeight: 1.6,
            marginBottom: "1.5rem",
          }}
        >
          Em breve você poderá recuperar sua senha informando seu e-mail.
          Enviaremos um link seguro para redefinição da senha.
        </p>

        <button
          disabled
          style={{
            width: "100%",
            opacity: 0.6,
            cursor: "not-allowed",
          }}
        >
          Funcionalidade em desenvolvimento
        </button>

        <p className="auth-text" style={{ marginTop: "1.5rem" }}>
          <Link to="/login">← Voltar para o login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;