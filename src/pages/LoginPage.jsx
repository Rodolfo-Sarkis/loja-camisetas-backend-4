import "../styles/auth.css";

import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AuthContext } from "../context/AuthContext";
import { API_URL } from "../config/api";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Preencha e-mail e senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      login(response.data.user, response.data.token);

      toast.success("Login realizado com sucesso!");

      navigate("/");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        toast.error("E-mail ou senha inválidos.");
      } else {
        toast.error("Não foi possível fazer login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin} className="auth-form">
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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          <Link
            to="/forgot-password"
            style={{
              color: "#111827",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Esqueceu sua senha?
          </Link>
        </p>

        <p className="auth-text">
          Não tem uma conta? <Link to="/register">Criar conta</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;