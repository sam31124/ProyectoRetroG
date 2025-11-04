import React from 'react';
import { consolesData } from '../../data/consoles';
import '../../styles/main.css';

export default function Productos() {
  return (
    <div className="container mt-5 mb-5 text-center">
      <h2 className="fw-bold text-start mb-4">Lista de Productos</h2>
      <div className="row">
        {consolesData.length > 0 ? (
          consolesData.map((c) => (
            <div key={c.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-light">
                <img
                  src={c.imagen}
                  alt={c.nombre}
                  className="card-img-top p-3"
                  style={{ height: '180px', objectFit: 'contain' }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{c.nombre}</h5>
                  <p className="text-muted mb-2">
                    ${c.precio.toLocaleString('es-CL')}
                  </p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-primary btn-sm">Detalle</button>
                    <button className="btn btn-primary btn-sm">Añadir al carrito</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
