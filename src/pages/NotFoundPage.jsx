import { Link } from "react-router-dom";
import "../styles/not-found.css";

function NotFoundPage() {
  return (
    <main className="not-found">
      <div className="not-found__content">
        <h1 className="not-found__title">404</h1>

        <p className="not-found__text">
          Página não encontrada
        </p>

        <p className="not-found__subtitle">
          A página que você tentou acessar não existe
          ou foi removida.
        </p>

        <Link to="/" className="not-found__button">
          Voltar para Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;