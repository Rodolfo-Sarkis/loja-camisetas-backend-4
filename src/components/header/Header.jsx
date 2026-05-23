import "./header.css";

import { FaShoppingCart } from "react-icons/fa";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

function Header() {
  const { cartItems } = useContext(CartContext);
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => {
    const quantity = Number(item.quantity) || 0;
    return acc + quantity;
  }, 0);

  const isAdmin = user?.isAdmin === true || user?.isAdmin === "true";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="header">
      <h2>DripStore</h2>

      <nav className="header-nav">
        <Link to="/">Home</Link>
        <Link to="/products">Produtos</Link>

        <Link to="/cart" className="cart-link">
          Carrinho
          <FaShoppingCart />
          <span className="cart-count">{totalItems}</span>
        </Link>

        {isAuthenticated && isAdmin && <Link to="/admin">Admin</Link>}

        {isAuthenticated ? (
          <>
            <span className="user-name">Olá, {user?.name || "usuário"}</span>

            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registrar</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;