import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logonaranjabit.png";
import { FaShoppingCart, FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const totalCount = cartItems.reduce((s, i) => s + (i.quantity || 1), 0);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand d-flex align-items-center">
        <img
          src={logo}
          alt="NaranjaBit logo"
          width="50"
          height="50"
          className="me-2"
        />
        <span className="fw-bold text-white">NaranjaBit</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav align-items-center">
          {/* Contact / social section */}
          <li className="nav-item d-flex align-items-center me-3 nb-presentation">
            <div className="nb-text">
              <small className="text-warning fw-bold nb-pulse">NaranjaBit </small>
              <small className="text-white" style={{ fontSize: "0.75rem" }}> Gaming & Electrónica — ¡Con onda!</small>
            </div>
            <div className="d-flex align-items-center ms-3 nb-social">
              <a title="Seguínos en Instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white me-2" aria-label="Instagram">
                <FaInstagram style={{ color: "#E1306C" }} />
              </a>
              <a title="Seguínos en Facebook" href="https://facebook.com" target="_blank" rel="noreferrer" className="text-white me-2" aria-label="Facebook">
                <FaFacebookF style={{ color: "#1877F2" }} />
              </a>
              <a title="Chatea por WhatsApp" href="https://wa.me/" target="_blank" rel="noreferrer" className="text-white" aria-label="WhatsApp">
                <FaWhatsapp style={{ color: "#25D366" }} />
              </a>
            </div>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">
              Productos
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <button className="btn btn-outline-light ms-2" onClick={logout}>
                Cerrar sesión
              </button>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-light ms-2" data-bs-toggle="modal" data-bs-target="#cartModal">
              <FaShoppingCart />
              <span className="badge bg-warning text-dark ms-1">{totalCount}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>

      <div className="container py-4">
        <div className="bg-dark text-white p-4 rounded-4 shadow-sm">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <p className="mb-3 mb-md-0">
              🍊 <strong className="text-warning">Bienvenido a NaranjaBit</strong>, donde la tecnología y la diversión van de la mano.
              <br />Somos tu punto gamer de confianza: tenemos consolas, videojuegos, accesorios, y toda la electrónica que necesitás para llevar tu setup al siguiente nivel.
              <br /><em>Desde los clásicos que nunca mueren hasta las últimas novedades del mundo tech, en NaranjaBit vas a encontrar los mejores precios! </em>
            </p>
            <Link to="/products" className="btn btn-warning fw-bold px-4">
              ¡Ver ofertas! 🎮
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

