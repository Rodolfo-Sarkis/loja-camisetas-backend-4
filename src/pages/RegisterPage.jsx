import "../styles/auth.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      alert("Cadastro realizado com sucesso");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Erro no cadastro");
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
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Criar Conta</button>
        </form>

        <p className="auth-text">
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
