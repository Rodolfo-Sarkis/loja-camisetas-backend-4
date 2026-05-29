import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Checkout from "./pages/Checkout";
import AdminPage from "./pages/AdminPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import AdminUploadPage from "./pages/AdminUploadPage";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./components/ProtectedRoute";

import logo from "./assets/logo2.png";

function getStoredUser() {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch {
    return null;
  }
}

function App() {
  const navigate = useNavigate();

  const user = getStoredUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const normalizedUser = user
    ? {
        ...user,
        isAdmin: Boolean(user.isAdmin || user.role === "admin"),
      }
    : null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${logo})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "800px",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <Header user={normalizedUser} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/product/:id" element={<ProductPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<AdminPage />} />

            <Route
              path="/admin/products"
              element={<AdminProductsPage />}
            />

            <Route
              path="/admin/upload"
              element={<AdminUploadPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          theme="dark"
        />
      </div>
    </>
  );
}

export default App;