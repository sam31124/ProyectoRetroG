import React from "react";
import { readAll } from "../../data/consoles";
import { useCart } from "../../context/CartContext";
import "../../styles/main.css";

export default function Ofertas() {
  const { addToCart } = useCart();
  const productos = readAll();

  // 🔹 Seleccionar solo algunos productos con oferta (por ejemplo, los de id par)
  const ofertas = productos
    .filter((p) => parseInt(p.id) % 2 === 0) // 👈 puedes cambiar la lógica
    .map((p) => {
      const descuento = p.price > 80000 ? 0.3 : 0.2; // 30% o 20% según el precio
      const precioOferta = Math.round(p.price * (1 - descuento));
      return { ...p, descuento, precioOferta };
    });

  return (
    <div className="container mt-5 text-light">
      <h2 className="neon-title text-center mb-4">🔥 Ofertas Retro 🔥</h2>
      <p className="text-center text-info mb-5">
        ¡Solo las mejores consolas con descuentos especiales!
      </p>

      {ofertas.length === 0 ? (
        <p className="text-center text-muted">No hay ofertas disponibles en este momento.</p>
      ) : (
        <div className="row">
          {ofertas.map((p) => (
            <div key={p.id} className="col-6 col-md-4 col-lg-3 mb-4">
              <div className="card bg-dark text-light border-neon h-100 text-center position-relative">
                <span
                  className="badge bg-danger position-absolute top-0 start-0 m-2 p-2"
                  style={{ fontSize: "0.8rem" }}
                >
                  -{Math.round(p.descuento * 100)}%
                </span>
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6>{p.name}</h6>
                  <p className="text-decoration-line-through text-muted">
                    ${p.price.toLocaleString()}
                  </p>
                  <h5 className="text-success">
                    ${p.precioOferta.toLocaleString()}
                  </h5>
                  <button
                    className="btn btn-outline-info btn-sm w-100 mt-2"
                    onClick={() =>
                      addToCart({
                        ...p,
                        price: p.precioOferta,
                      })
                    }
                  >
                    Agregar al carrito 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
