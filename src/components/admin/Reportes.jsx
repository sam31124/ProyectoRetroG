import React from "react";
import { FaChartPie, FaCoins, FaUsers, FaBox } from "react-icons/fa";

export default function ReportesAdmin({ consolas }) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios_retroG")) || [];
  const pedido = JSON.parse(localStorage.getItem("pedido")) || {};
  const compras = pedido.carrito || [];

  // 📌 Estadísticas
  const totalConsolas = consolas.length;
  const totalUsuarios = usuarios.length;
  const totalCompras = compras.length;

  const totalVentas = compras.reduce(
    (acc, p) => acc + p.price * p.cantidad,
    0
  );

  const promedioPrecio = (
    consolas.reduce((acc, p) => acc + p.price, 0) / totalConsolas
  ).toFixed(0);

  const portatiles = consolas.filter((c) => c.name.includes("Boy")).length;
  const sobremesa = totalConsolas - portatiles;

  return (
    <div className="text-light">
      <h4 className="text-info mb-4">📊 Reportes del Sistema</h4>

      {/* 🔹 Tarjetas estadísticas */}
      <div className="row g-4 mb-4">
        
        {/* Consolas */}
        <div className="col-md-4">
          <div className="card bg-dark border-neon p-3 text-light">
            <h5><FaBox /> Consolas Registradas</h5>
            <h2 className="text-light">{totalConsolas}</h2>
            <p className="text-secondary">
              {sobremesa} de sobremesa • {portatiles} portátiles
            </p>
          </div>
        </div>

        {/* Usuarios */}
        <div className="col-md-4">
          <div className="card bg-dark border-neon p-3 text-light">
            <h5><FaUsers /> Usuarios Registrados</h5>
            <h2 className="text-light">{totalUsuarios}</h2>
            <p className="text-secondary">Clientes + Admins</p>
          </div>
        </div>

        {/* Promedio */}
        <div className="col-md-4">
          <div className="card bg-dark border-neon p-3 text-light">
            <h5><FaChartPie /> Precio Promedio</h5>
            <h2 className="text-light">${Number(promedioPrecio).toLocaleString()}</h2>
            <p className="text-secondary">Entre todas las consolas</p>
          </div>
        </div>
      </div>

      {/* 🔹 Reporte de compras */}
      <div className="card bg-dark border-neon p-4 mb-4 text-light">
        <h5><FaCoins /> Reporte de Compras</h5>

        {totalCompras === 0 ? (
          <p className="text-secondary">No hay compras registradas.</p>
        ) : (
          <>
            <p>Total de compras: <strong>{totalCompras}</strong></p>
            <p>Total vendido: <strong>${totalVentas.toLocaleString()}</strong></p>

            {/* Tabla con textos visibles */}
            <table className="table table-dark table-striped text-light mt-3">
              <thead>
                <tr className="text-light">
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="text-light">
                {compras.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.cantidad}</td>
                    <td>${(item.price * item.cantidad).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {/* 🔹 Resumen general */}
      <div className="card bg-dark border-neon p-3 text-light">
        <h5>📌 Resumen general</h5>
        <ul className="text-light">
          <li>Consolas registradas: {totalConsolas}</li>
          <li>Usuarios registrados: {totalUsuarios}</li>
          <li>Compras totales: {totalCompras}</li>
          <li>Ventas totales: ${totalVentas.toLocaleString()}</li>
          <li>Portátiles: {portatiles}</li>
          <li>Sobremesa: {sobremesa}</li>
        </ul>
      </div>
    </div>
  );
}
