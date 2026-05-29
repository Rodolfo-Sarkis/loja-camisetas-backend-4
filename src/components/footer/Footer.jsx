import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

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
          <a
            href="https://wa.me/5511913628354"
            target="_blank"
            rel="noreferrer"
            className="footer__icon footer__whatsapp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="mailto:rodolforequiao@gmail.com"
            className="footer__icon footer__email"
          >
            <MdEmail />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="footer__icon footer__instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {year} Transcedental Clothing
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;