import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    // Credenciales de ejemplo
    const validUser = "admin";
    const validPass = "1234";

    if (user.trim() === validUser && password === validPass) {
      login(user.trim());
      navigate("/");
    } else {

      setShowError(true);
    }
  };

  return (
    <div className="container text-white py-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center text-warning mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-warning w-100 fw-bold">Entrar</button>
      </form>

      {/* Modal de error simple usando Bootstrap modal markup */}
      <div className={"modal fade" + (showError ? " show d-block" : "")} tabIndex="-1" role="dialog" aria-hidden={!showError}>
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Error</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => setShowError(false)}></button>
            </div>
            <div className="modal-body">
              <p>Error al iniciar sesion. Usuario o contraseña incorrecta.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowError(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
