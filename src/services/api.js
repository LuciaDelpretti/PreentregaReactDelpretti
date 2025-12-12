const API_BASE = import.meta.env.VITE_API_URL || "";

const jsonHeaders = { "Content-Type": "application/json" };

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Error al cargar productos");
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error("Error fetching product");
  return res.json();
}

export async function createProduct(payload) {
  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
}

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
