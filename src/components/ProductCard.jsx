import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ producto }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 border-0 shadow" style={{ backgroundColor: "#1b1b1b", color: "white" }}>
        <img src={producto.image || producto.imagen} className="card-img-top p-3" alt={producto.title || producto.nombre} style={{ height: "180px", objectFit: "contain" }} />
        <div className="card-body text-center">
          <h6 className="card-title">{producto.title || producto.nombre}</h6>
          <p className="fw-bold text-warning">${producto.price ?? producto.precio}</p>
          <button
            className="btn btn-warning w-100 fw-bold"
            onClick={() => addToCart(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
