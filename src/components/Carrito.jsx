import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <div
      className="modal fade"
      id="cartModal"
      tabIndex="-1"
      aria-labelledby="cartModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-end">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">
              🛒 Carrito
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {cartItems.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2"
                >
                  <div>
                    <strong>{item.title}</strong>
                    <p className="mb-0 text-muted">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Quitar
                  </button>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="modal-footer d-flex justify-content-between">
              <button className="btn btn-outline-light" onClick={clearCart}>
                Vaciar carrito
              </button>
              <button className="btn btn-warning text-dark">
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Carrito;
