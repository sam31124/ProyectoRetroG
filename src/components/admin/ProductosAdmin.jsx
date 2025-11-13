import React, { useState } from "react";
import { create, update, remove } from "../../data/consoles";

export default function ProductosAdmin({ consolas }) {
  const [lista, setLista] = useState(consolas);
  const [form, setForm] = useState({
    id: "",
    name: "",
    brand: "",
    price: "",
    image: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Completa todos los campos");
      return;
    }

    if (form.id) {
      // EDITAR
      update(form.id, form);
      alert("Producto actualizado");
    } else {
      // CREAR
      const nuevo = {
        ...form,
        id: crypto.randomUUID(),
        price: Number(form.price),
      };
      create(nuevo);
      alert("Producto creado");
    }

    setLista(JSON.parse(localStorage.getItem("retro_consoles_v1")));
    setForm({ id: "", name: "", brand: "", price: "", image: "" });
  };

  const editar = (prod) => {
    setForm(prod);
  };

  const eliminar = (id) => {
    if (window.confirm("¿Eliminar producto?")) {
      remove(id);
      setLista(JSON.parse(localStorage.getItem("retro_consoles_v1")));
    }
  };

  return (
    <div>
      <h4 className="text-info mb-3">Gestión de Consolas</h4>

      {/* FORMULARIO DE CREAR / EDITAR */}
      <form className="card bg-dark p-3 border-neon mb-4" onSubmit={handleSubmit}>
        <h5 className="text-light">{form.id ? "Editar consola" : "Nueva consola"}</h5>

        <div className="row mt-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Marca"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              placeholder="Precio"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="URL Imagen"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
        </div>

        <button className="btn btn-info mt-3 w-100">
          {form.id ? "Actualizar producto" : "Crear producto"}
        </button>
      </form>

      {/* TABLA */}
      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>${Number(p.price).toLocaleString()}</td>
              <td>{p.name.includes("Boy") ? "Portátil" : "Sobremesa"}</td>

              <td className="text-center">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editar(p)}
                >
                  Editar
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminar(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
