// // function ProductList({ addToCart }) {
//   const products = [
//     { id: 1, name: "PlayStation 5", price: 950000, image: "https://m.media-amazon.com/images/I/61nTEg+jz2L._SL1500_.jpg" },
//     { id: 2, name: "Xbox Series X", price: 890000, image: "https://m.media-amazon.com/images/I/71NBQ2a52CL._SL1500_.jpg" },
//     { id: 3, name: "Nintendo Switch OLED", price: 600000, image: "https://m.media-amazon.com/images/I/71eD7XWQvjL._SL1500_.jpg" },
//     { id: 4, name: "The Legend of Zelda: Tears of the Kingdom", price: 45000, image: "https://m.media-amazon.com/images/I/81aJ-R4E6HL._SL1500_.jpg" },
//     { id: 5, name: "God of War: Ragnarok", price: 38000, image: "https://m.media-amazon.com/images/I/71x0y1S2YqL._SL1500_.jpg" },
//   ];

//   return (
//     <section className="product-list">
//       <h2>Productos destacados</h2>
//       <div className="product-grid">
//         {products.map((p) => (
//           <div key={p.id} className="product-card">
//             <img src={p.image} alt={p.name} />
//             <h3>{p.name}</h3>
//             <p>${p.price.toLocaleString("es-AR")}</p>
//             <button onClick={() => addToCart(p)}>Agregar al carrito</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default ProductList;
