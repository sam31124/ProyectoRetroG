import React, { useState, useEffect } from "react";
import ProductoService from "../../services/ProductoService";

export default function ProductosAdmin({ consolas }) {
  // Estado local para la lista (se inicializa con lo que llega del padre, pero se actualiza)
  const [lista, setLista] = useState([]);
  
  // Estado para el formulario
  const [form, setForm] = useState({
    id: "",
    nombre: "", // Ojo: BD usa 'nombre', no 'name'
    precio: "",
    stock: "",
    imagen_url: "",
    categoria_id: 1 // Por defecto 1 (Consolas)
  });

  // Cargar la lista inicial cuando cambian las props
  useEffect(() => {
    setLista(consolas);
  }, [consolas]);

  // Función para recargar datos desde el servidor
  const recargarProductos = () => {
    ProductoService.getAllProductos()
      .then(res => setLista(res.data))
      .catch(err => console.error("Error recargando:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio) {
      alert("Completa el nombre y precio al menos");
      return;
    }

    const productoData = {
      nombre: form.nombre,
      precio: Number(form.precio),
      stock: Number(form.stock) || 0,
      imagen_url: form.imagen_url || "/assets/portadatienda.jpg",
      categoria_id: Number(form.categoria_id)
    };

    if (form.id) {
      // ✏️ EDITAR EN AWS
      ProductoService.updateProducto(form.id, productoData)
        .then(() => {
          alert("Producto actualizado en la Base de Datos");
          recargarProductos();
          limpiarForm();
        })
        .catch(err => alert("Error al actualizar: " + err));
    } else {
      // ➕ CREAR EN AWS
      ProductoService.createProducto(productoData)
        .then(() => {
          alert("Producto creado en la Base de Datos");
          recargarProductos();
          limpiarForm();
        })
        .catch(err => alert("Error al crear: " + err));
    }
  };

  const editar = (prod) => {
    // Adaptamos los datos para el formulario
    setForm({
      id: prod.id,
      nombre: prod.nombre || prod.name,
      precio: prod.precio || prod.price,
      stock: prod.stock || 0,
      imagen_url: prod.imagen_url || prod.image,
      categoria_id: prod.categoria_id || 1
    });
  };

  const eliminar = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto de la Base de Datos?")) {
      // 🗑️ ELIMINAR EN AWS
      ProductoService.deleteProducto(id)
        .then(() => {
          recargarProductos(); // Actualizar tabla visualmente
        })
        .catch(err => alert("Error al eliminar: " + err));
    }
  };

  const limpiarForm = () => {
    setForm({ id: "", nombre: "", precio: "", stock: "", imagen_url: "", categoria_id: 1 });
  };

  return (
    <div>
      <h4 className="text-info mb-3">Gestión de Inventario (AWS)</h4>

      {/* FORMULARIO DE CREAR / EDITAR */}
      <form className="card bg-dark p-3 border-neon mb-4" onSubmit={handleSubmit}>
        <h5 className="text-light">{form.id ? "Editar producto" : "Nuevo producto"}</h5>

        <div className="row mt-3">
          <div className="col-md-3 mb-2">
            <input
              className="form-control"
              placeholder="Nombre (Ej: PS5)"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
          </div>

          <div className="col-md-2 mb-2">
            <input
              className="form-control"
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
            />
          </div>

          <div className="col-md-2 mb-2">
            <input
              className="form-control"
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>

          <div className="col-md-5 mb-2">
            <input
              className="form-control"
              placeholder="URL Imagen (/assets/... o https://...)"
              value={form.imagen_url}
              onChange={(e) => setForm({ ...form, imagen_url: e.target.value })}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-3">
            <button className="btn btn-info w-100">
            {form.id ? "Guardar Cambios" : "Crear Producto"}
            </button>
            {form.id && (
                <button type="button" className="btn btn-secondary" onClick={limpiarForm}>
                    Cancelar
                </button>
            )}
        </div>
      </form>

      {/* TABLA */}
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
            <thead>
            <tr>
                <th>IMG</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th className="text-center">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {lista.map((p) => (
                <tr key={p.id}>
                <td>
                    <img 
                        src={p.imagen_url || p.image || "/assets/portadatienda.jpg"} 
                        alt="mini"
                        style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px'}}
                        onError={(e) => e.target.style.display = 'none'}
                    />
                </td>
                <td>{p.nombre || p.name}</td>
                <td>${Number(p.precio || p.price).toLocaleString()}</td>
                <td>{p.stock || 0}</td>

                <td className="text-center">
                    <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editar(p)}
                    >
                    ✏️
                    </button>

                    <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(p.id)}
                    >
                    🗑️
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
}