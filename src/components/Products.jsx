import React from 'react';
import ProductoCard from './ProductCard';

const productosData = [
  { nombre: 'PS5', precio: 150000, imagen: 'https://via.placeholder.com/150' },
  { nombre: 'Xbox Series X', precio: 140000, imagen: 'https://via.placeholder.com/150' },
  { nombre: 'Switch', precio: 90000, imagen: 'https://via.placeholder.com/150' },
  { nombre: 'FIFA 25', precio: 12000, imagen: 'https://via.placeholder.com/150' },
];

const Productos = ({ agregarAlCarrito }) => {
  return (
    <div id="productos" className="container py-5">
      <h2 className="mb-4">Nuestros Productos</h2>
      <div className="row">
        {productosData.map((prod, index) => (
          <ProductoCard key={index} producto={prod} agregarAlCarrito={agregarAlCarrito} />
        ))}
      </div>
    </div>
  );
};

export default Productos;
