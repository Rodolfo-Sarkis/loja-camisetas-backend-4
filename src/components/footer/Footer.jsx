import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h2 className="footer__title">Transcedental Clothing</h2>
          <p className="footer__text">
            Camisetas, estilo e identidade em um só lugar.
          </p>
        </div>

        <div className="footer__links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link to="/products" className="footer__link">
            Produtos
          </Link>
          <Link to="/cart" className="footer__link">
            Carrinho
          </Link>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {year} Transcedental Clothing</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;