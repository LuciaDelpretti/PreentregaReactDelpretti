import React, { useEffect, useState } from "react";
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

  if (loading) return <p className="text-center mt-5 text-white">Cargando productos...</p>;
  if (error) console.warn("ProductsList fetch error:", error);

  return (
    <div className="container py-5">
  <h2 className="text-center mb-4 text-warning">Catálogo Electrónica y Gaming</h2>
      <div className="row">
        {products.map((prod) => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  );
}
