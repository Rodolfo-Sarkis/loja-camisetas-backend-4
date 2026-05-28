import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";

function Header({ user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const userName =
    user?.name ||
    user?.nome ||
    user?.fullName ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "Usuário";

  const isAdmin = Boolean(user?.isAdmin || user?.role === "admin");

  return (
    <>
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo" onClick={closeMenu}>
            Transcedental Clothing
          </Link>

          <nav className={`header__nav ${menuOpen ? "active" : ""}`}>
            <NavLink to="/" className="header__link" onClick={closeMenu}>
              Home
            </NavLink>

            <NavLink to="/products" className="header__link" onClick={closeMenu}>
              Produtos
            </NavLink>

            <NavLink to="/cart" className="header__link" onClick={closeMenu}>
              Carrinho
            </NavLink>

            {isAdmin && (
              <NavLink to="/admin" className="header__link" onClick={closeMenu}>
                Admin
              </NavLink>
            )}

            {user ? (
              <button
                className="header__logout-button"
                onClick={() => {
                  onLogout?.();
                  closeMenu();
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="header__link"
                  onClick={closeMenu}
                >
                  Entrar
                </NavLink>

                <NavLink
                  to="/register"
                  className="header__link"
                  onClick={closeMenu}
                >
                  Cadastrar
                </NavLink>
              </>
            )}
          </nav>

          {user && (
            <div className="header__user-area">
              <span className="header__welcome">Olá, {userName}</span>
            </div>
          )}

          <button
            className={`header__menu-button ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span className="header__menu-icon"></span>
            <span className="header__menu-icon"></span>
            <span className="header__menu-icon"></span>
          </button>
        </div>
      </header>

      <div
        className={`header__overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />
    </>
  );
}

export default Header;