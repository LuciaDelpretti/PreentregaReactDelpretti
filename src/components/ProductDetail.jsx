import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProducto(data));
  }, [id]);

  if (!producto) return <p className="text-center text-white mt-5">Cargando...</p>;

  return (
    <div className="container py-5 text-white">
      <div className="row">
        <div className="col-md-6 text-center">
          <img src={producto.image} alt={producto.title} style={{ maxWidth: "300px" }} />
        </div>
        <div className="col-md-6">
          <h2 className="text-warning">{producto.title}</h2>
          <p>{producto.description}</p>
          <h4 className="text-warning">${producto.price}</h4>
          <button
            className="btn btn-warning fw-bold mt-3"
            onClick={() => addToCart(producto)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
