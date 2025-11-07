import React from 'react';
import { Link } from 'react-router-dom';

export default function CompraExitosa() {
  const pedido = JSON.parse(localStorage.getItem('pedido')) || {};
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  return (
    <div className="container mt-5 text-light">
      <div className="card bg-dark p-4">
        <div className="alert alert-success text-dark">
          ✅ <strong>Se ha realizado la compra</strong> — N° {pedido.numero || '20240705'}
        </div>

        <h5 className="mt-3">Datos del cliente</h5>
        <p><strong>Nombre:</strong> {pedido.nombre}</p>
        <p><strong>Correo:</strong> {pedido.correo}</p>

        <h5 className="mt-4">Dirección de entrega</h5>
        <p>{pedido.direccion}, {pedido.comuna}, {pedido.region}</p>

        <h5 className="mt-4">Productos comprados</h5>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cant.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.cantidad}</td>
                <td>${item.price * item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-end mt-3">
          <h5>Total pagado: ${pedido.total?.toLocaleString()}</h5>
          <Link to="/" className="btn btn-success mt-3">Volver a la tienda</Link>
        </div>
      </div>
    </div>
  );
}
