import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((s, i) => s + (i.price ?? i.precio ?? 0) * (i.quantity || 1), 0);

  return (
    <div className="container py-5 text-white">
      <h2 className="text-warning">Finalizar compra</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((it) => (
              <li key={it.id}>{it.title ?? it.nombre} x {it.quantity} - ${ (it.price ?? it.precio) * (it.quantity || 1) }</li>
            ))}
          </ul>
          <h4>Total: ${total}</h4>
          <button className="btn btn-warning mt-3" onClick={clearCart}>Pagar (simulado)</button>
        </div>
      )}
    </div>
  );
}
