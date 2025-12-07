import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function ProductForm({ initial = null, onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || "");
      setPrice(initial.price || 0);
      setDescription(initial.description || "");
      setImage(initial.image || "");
    }
  }, [initial]);

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "El nombre es obligatorio";
    if (!(Number(price) > 0)) e.price = "El precio debe ser mayor a 0";
    if (!description || description.trim().length < 10) e.description = "La descripción debe tener al menos 10 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Corrige los errores del formulario");
      return;
    }
    const payload = { title, price: Number(price), description, image };
    onSubmit(payload).catch((err) => {
      toast.error(err.message || "Error al enviar");
    });
  };

  return (
    <form onSubmit={submit} className="p-3 border rounded bg-light">
      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Precio</label>
        <input type="number" className={`form-control ${errors.price ? 'is-invalid' : ''}`} value={price} onChange={(e) => setPrice(e.target.value)} />
        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
      </div>

      <div className="mb-2">
        <label className="form-label">Descripción</label>
        <textarea className={`form-control ${errors.description ? 'is-invalid' : ''}`} value={description} onChange={(e) => setDescription(e.target.value)} />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Imagen (URL)</label>
        <input className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

ProductForm.propTypes = {
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};
