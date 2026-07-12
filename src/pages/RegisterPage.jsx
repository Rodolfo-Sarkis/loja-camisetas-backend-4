import "../styles/auth.css";

import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { API_URL } from "../config/api";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      toast.success("Conta criada com sucesso!");

      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 409) {
        toast.error("Este e-mail já está cadastrado.");
      } else {
        toast.error("Não foi possível criar a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Criar Conta</h1>

        <form onSubmit={handleRegister} className="auth-form">
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.95rem",
            lineHeight: 1.5,
          }}
        >
          Após a integração do sistema de e-mails, você receberá uma confirmação
          de cadastro no seu e-mail.
        </p>

        <p className="auth-text">
          Já tem uma conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;