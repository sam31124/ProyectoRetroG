import React from "react";
import { useParams } from "react-router-dom";
import { readAll } from "../../data/consoles";

export default function ProductoDetalle() {
  const { id } = useParams();
  const productos = readAll();
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return <h2 className="text-light text-center mt-5">Producto no encontrado</h2>;
  }

  return (
    <div className="container text-light mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.image}
            alt={producto.name}
            className="img-fluid border-neon rounded"
          />
        </div>

        <div className="col-md-6">
          <h2 className="neon-title">{producto.name}</h2>
          <h4 className="text-success">${producto.price.toLocaleString()}</h4>

          {/* 🔥 ESTA ES LA LINEA IMPORTANTE */}
          <p className="mt-3">{producto.description}</p>

          <button
            className="btn btn-outline-info mt-3"
            onClick={() => alert(`Agregado: ${producto.name}`)}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
