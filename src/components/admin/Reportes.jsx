import React, { useState } from "react";

const ReportesAdmin = ({ consolas = [] }) => {
  const [busqueda, setBusqueda] = useState("");

  // 🛡️ Helpers para leer datos seguros
  const getNombre = (p) => (p.nombre || p.name || "Sin Nombre").toUpperCase();
  const getPrecio = (p) => Number(p.precio || p.price || 0);
  const getStock = (p) => Number(p.stock || 0);

  // 📊 CÁLCULOS ESTADÍSTICOS
  const totalProductos = consolas.length;
  
  const totalUnidades = consolas.reduce((acc, p) => acc + getStock(p), 0);
  
  const valorInventario = consolas.reduce((acc, p) => {
    return acc + (getPrecio(p) * getStock(p));
  }, 0);

  // Filtro de bajo stock (Menos de 5 unidades)
  const productosBajoStock = consolas.filter(p => getStock(p) < 5);

  // Filtro para la tabla de búsqueda
  const reporteFiltrado = consolas.filter((p) =>
    getNombre(p).includes(busqueda.toUpperCase())
  );

  return (
    <div className="container-fluid p-0">
      <h3 className="text-info mb-4">📊 Reportes de Inventario</h3>

      {/* TARJETAS DE RESUMEN */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white mb-3 h-100">
            <div className="card-body">
              <h5 className="card-title">Valor del Inventario</h5>
              <p className="card-text display-6 fw-bold">
                ${valorInventario.toLocaleString()}
              </p>
              <small>Suma de (Precio × Stock)</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white mb-3 h-100">
            <div className="card-body">
              <h5 className="card-title">Total Unidades</h5>
              <p className="card-text display-6 fw-bold">
                {totalUnidades}
              </p>
              <small>Productos físicos en bodega</small>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-warning text-dark mb-3 h-100">
            <div className="card-body">
              <h5 className="card-title">⚠️ Bajo Stock</h5>
              <p className="card-text display-6 fw-bold">
                {productosBajoStock.length}
              </p>
              <small>Productos con menos de 5 unidades</small>
            </div>
          </div>
        </div>
      </div>

      {/* TABLA DE DETALLES */}
      <div className="card bg-dark border-neon p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-light">Detalle General</h4>
          <button className="btn btn-outline-light btn-sm" onClick={() => window.print()}>
            🖨️ Imprimir Reporte
          </button>
        </div>

        <input
          type="text"
          className="form-control bg-secondary text-light border-0 mb-3"
          placeholder="Filtrar reporte por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <div className="table-responsive">
          <table className="table table-dark table-hover table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th className="text-end">Precio Unit.</th>
                <th className="text-center">Stock</th>
                <th className="text-end">Valor Total</th>
                <th className="text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {reporteFiltrado.map((p) => {
                const stock = getStock(p);
                const precio = getPrecio(p);
                const total = stock * precio;
                
                return (
                  <tr key={p.id}>
                    <td>{getNombre(p)}</td>
                    <td className="text-end">${precio.toLocaleString()}</td>
                    <td className="text-center">{stock}</td>
                    <td className="text-end text-info">${total.toLocaleString()}</td>
                    <td className="text-center">
                      {stock === 0 ? (
                        <span className="badge bg-danger">Agotado</span>
                      ) : stock < 5 ? (
                        <span className="badge bg-warning text-dark">Bajo</span>
                      ) : (
                        <span className="badge bg-success">Ok</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportesAdmin;