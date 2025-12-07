import React, { useEffect, useState } from "react";
import * as api from "../services/api";
import ProductForm from "../components/ProductForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      toast.error(err.message || "Error cargando productos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const handleCreate = async (payload) => {
    const created = await api.createProduct(payload);
    toast.success("Producto creado");
    setProducts((p) => [...p, created]);
    setShowForm(false);
  };

  const handleUpdate = async (payload) => {
    if (!editing) return;
    const updated = await api.updateProduct(editing.id, payload);
    setProducts((p) => p.map((it) => (String(it.id) === String(editing.id) ? updated : it)));
    toast.success("Producto actualizado");
    setEditing(null);
    setShowForm(false);
  };

  const promptDelete = (prod) => {
    setDeleteTarget(prod);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.deleteProduct(deleteTarget.id);
      setProducts((p) => p.filter((it) => String(it.id) !== String(deleteTarget.id)));
      toast.success("Producto eliminado");
    } catch (err) {
      toast.error(err.message || "Error eliminando");
    } finally {
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="container py-4">
      <Helmet>
        <title>Admin - Productos</title>
        <meta name="description" content="Panel administrativo de productos" />
      </Helmet>

      <ToastContainer />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Administrar Productos</h2>
        <div>
          <button className="btn btn-success me-2" onClick={() => { setEditing(null); setShowForm(true); }}>
            Agregar producto
          </button>
          <button className="btn btn-secondary" onClick={load}>Recargar</button>
        </div>
      </div>

      {showForm && (
        <div className="mb-3">
          <ProductForm initial={editing} onSubmit={editing ? handleUpdate : handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="row">
          {products.map((prod) => (
            <div className="col-md-4 mb-3" key={prod.id}>
              <div className="card h-100">
                {prod.image && <img src={prod.image} className="card-img-top" alt={prod.title} />}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{prod.title}</h5>
                  <p className="card-text text-truncate">{prod.description}</p>
                  <p className="mt-auto"><strong>${prod.price}</strong></p>
                  <div className="d-flex gap-2 mt-2">
                    <button className="btn btn-primary btn-sm" onClick={() => { setEditing(prod); setShowForm(true); }}>
                      Editar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => promptDelete(prod)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Delete confirmation modal (Bootstrap-like) */}
      <div className={"modal fade" + (showDeleteModal ? " show d-block" : "")} tabIndex="-1" role="dialog" aria-hidden={!showDeleteModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar eliminación</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro que deseas eliminar <strong>{deleteTarget?.title}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowDeleteModal(false); setDeleteTarget(null); }}>Cancelar</button>
              <button className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
