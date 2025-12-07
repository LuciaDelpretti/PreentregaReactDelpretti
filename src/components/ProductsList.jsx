import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const fallbackGaming = [
  { id: "g1", title: "PlayStation 5", price: 950000, image: "https://m.media-amazon.com/images/I/61nTEg+jz2L._SL1500_.jpg", description: "Consola PS5" },
  { id: "g2", title: "Xbox Series X", price: 890000, image: "https://m.media-amazon.com/images/I/71NBQ2a52CL._SL1500_.jpg", description: "Consola Xbox" },
  { id: "g3", title: "Nintendo Switch OLED", price: 600000, image: "https://m.media-amazon.com/images/I/71eD7XWQvjL._SL1500_.jpg", description: "Consola Nintendo Switch" },
  { id: "g4", title: "God of War: Ragnarok (PS5)", price: 38000, image: "https://m.media-amazon.com/images/I/71x0y1S2YqL._SL1500_.jpg", description: "Juego God of War" },
];

const keywords = [
  "game",
  "playstation",
  "ps5",
  "ps4",
  "xbox",
  "nintendo",
  "switch",
  "controller",
  "console",
  "gamer",
  "video",
  "gamepad",
  "fifa",
  "zelda",
  "ragnarok",
  "play",
];

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // items per page

  useEffect(() => {
    setLoading(true);
    const allFetch = fetch("https://fakestoreapi.com/products").then((r) => {
      if (!r.ok) throw new Error("Error fetching products");
      return r.json();
    });
    const electronicsFetch = fetch("https://fakestoreapi.com/products/category/electronics").then((r) => {
      if (!r.ok) return [];
      return r.json();
    });

    Promise.all([allFetch, electronicsFetch])
      .then(([allData, electronics]) => {
        const gaming = allData.filter((p) => {
          const hay = (p.title + " " + (p.description || "")).toLowerCase();
          return keywords.some((k) => hay.includes(k));
        });

  // Weighted mix: default 60% electronics, 40% gaming, limit total items
  const limit = 12;
  const electronicsTarget = Math.round(limit * 0.6);
  const gamingTarget = limit - electronicsTarget;

  const uniqueById = (arr) => {
    const seen = new Set();
    return arr.filter((it) => {
      if (seen.has(it.id)) return false;
      seen.add(it.id);
      return true;
    });
  };

  const uniqElectronics = uniqueById(electronics || []);
  const uniqGaming = uniqueById(gaming || []);

  const chosen = [];
  chosen.push(...uniqElectronics.slice(0, electronicsTarget));
  const takenIds = new Set(chosen.map((c) => c.id));
  const gamingToAdd = uniqGaming.filter((g) => !takenIds.has(g.id)).slice(0, gamingTarget);
  chosen.push(...gamingToAdd);

  if (chosen.length < limit) {
    const remaining = limit - chosen.length;
    const extraFromElectronics = uniqElectronics.filter((e) => !takenIds.has(e.id)).slice(0, remaining);
    chosen.push(...extraFromElectronics);

    extraFromElectronics.forEach((e) => takenIds.add(e.id));

    if (chosen.length < limit) {
      const stillRem = limit - chosen.length;
      const extraFromGaming = uniqGaming.filter((g) => !takenIds.has(g.id)).slice(0, stillRem);
      chosen.push(...extraFromGaming);
    }
  }

  if (chosen.length > 0) setProducts(chosen);
  else if (uniqGaming.length > 0) setProducts(uniqGaming);
  else setProducts(fallbackGaming);
      })
      .catch((err) => {
        setError(err.message);
        setProducts(fallbackGaming);
      })
      .finally(() => setLoading(false));
  }, []);

  // debounce query to avoid filtering on every keystroke
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // reset page when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return products;
    return products.filter((p) => {
      const hay = (p.title + " " + (p.category || "") + " " + (p.description || "")).toLowerCase();
      return hay.includes(debouncedQuery);
    });
  }, [products, debouncedQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  if (loading) return <p className="text-center mt-5 text-white">Cargando productos...</p>;
  if (error) console.warn("ProductsList fetch error:", error);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-warning">Catálogo Electrónica y Gaming</h2>

      <div className="row mb-3">
        <div className="col-12 col-md-6 mx-auto">
          <label htmlFor="search" className="form-label text-white">Buscar productos</label>
          <input
            id="search"
            aria-label="Buscar productos por nombre o categoría"
            className="form-control"
            placeholder="Buscar por nombre, categoría o descripción..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {(pageItems.length === 0) ? (
          <p className="text-white">No se encontraron productos.</p>
        ) : (
          pageItems.map((prod) => <ProductCard key={prod.id} producto={prod} />)
        )}
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center mt-4">
        <nav aria-label="Paginación de productos">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" aria-label="Página anterior" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>Anterior</button>
            </li>

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(page)} aria-current={currentPage === page ? 'page' : undefined}>{page}</button>
                </li>
              );
            })}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" aria-label="Página siguiente" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>Siguiente</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
