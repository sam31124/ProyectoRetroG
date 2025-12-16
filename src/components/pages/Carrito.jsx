import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import api from "../../services/AxiosConfig"; // 1. Importamos Axios configurado
import "../../styles/main.css";

export default function Carrito() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [catalogo, setCatalogo] = useState([]);
  const [total, setTotal] = useState(0);

  // Estados para el Modal y Recibo
  const [showModal, setShowModal] = useState(false);
  const [ultimaCompra, setUltimaCompra] = useState([]);
  const [idPedido, setIdPedido] = useState("");

  // 2. CARGAR CATÁLOGO DESDE LA BASE DE DATOS (YA NO LOCAL)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const { data } = await api.get("/productos");
        setCatalogo(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };
    fetchProductos();
  }, []);

  // Calcular total
  useEffect(() => {
    const nuevoTotal = cart.reduce(
      // Nota: Ajustamos 'precio' o 'price' según venga de tu BD
      (acc, item) => acc + (Number(item.price || item.precio) || 0) * (item.quantity || 1),
      0
    );
    setTotal(nuevoTotal);
  }, [cart]);

  // 3. FUNCIÓN COMPRAR QUE DESCUENTA STOCK
  // --- FUNCIÓN COMPRAR CORREGIDA (Para que descuente bien) ---
  const comprar = async () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    try {
      // A. Crear copia de seguridad para el recibo
      const copiaSegura = [...cart];
      
      // B. ACTUALIZAR STOCK
      await Promise.all(
        copiaSegura.map(async (item) => {
          // 1. BUSCAR EL PRODUCTO ORIGINAL EN EL CATÁLOGO PARA SABER EL STOCK REAL
          const productoOriginal = catalogo.find(p => p.id === item.id);
          
          // Si no lo encuentra, asume 0. Si lo encuentra, usa su stock.
          const stockReal = productoOriginal ? (productoOriginal.stock || 0) : 0;
          
          // 2. CALCULAR EL NUEVO STOCK
          const nuevoStock = stockReal - item.quantity;
          
          // 3. ENVIAR AL BACKEND
          await api.put(`/productos/${item.id}`, {
            ...productoOriginal, // Enviamos todos los datos originales
            stock: nuevoStock < 0 ? 0 : nuevoStock // Evitamos negativos
          });
        })
      );

      // C. Generar recibo
      const nuevoId = "PED-" + Math.floor(Math.random() * 1000000);
      setIdPedido(nuevoId);
      setUltimaCompra(copiaSegura);
      
      // D. Guardar y limpiar
      localStorage.setItem("pedido", JSON.stringify({ cart: copiaSegura, total }));
      clearCart();
      
      // E. Mostrar éxito
      setShowModal(true);
      
      // F. Recargar el catálogo para ver el cambio visualmente
      const { data } = await api.get("/productos");
      setCatalogo(data);

    } catch (error) {
      console.error("Error al comprar:", error);
      alert("Error al procesar la compra. Revisa la consola.");
    }
  };

  const cerrarModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5 text-light position-relative">
      <h2 className="neon-title mb-4 text-center">🕹️ Carrito de Compras</h2>

      <div className="row">
        {/* Catálogo REAL desde BD */}
        <div className="col-lg-6 mb-4">
          <div className="border-neon p-3 bg-dark rounded">
            <h4 className="text-info mb-3">Catálogo (Stock Real)</h4>
            <div className="row">
              {catalogo.map((p) => (
                <div key={p.id} className="col-6 col-md-4 mb-4">
                  <div className="card bg-dark text-light border-neon h-100 text-center">
                    {/* Ajusta nombres de variables según tu BD (ej: p.imagen o p.image) */}
                    <img
                      src={p.image || p.imagen || "https://via.placeholder.com/150"}
                      alt={p.name || p.nombre}
                      className="card-img-top"
                      style={{ height: "100px", objectFit: "cover" }}
                    />
                    <div className="card-body p-2">
                      <h6 style={{ fontSize: "0.9rem" }}>{p.name || p.nombre}</h6>
                      <p className="mb-1">${Number(p.price || p.precio).toLocaleString()}</p>
                      
                      {/* MOSTRAR STOCK */}
                      <small className={p.stock < 5 ? "text-danger" : "text-muted"}>
                        Stock: {p.stock}
                      </small>

                      <button
                        className="btn btn-outline-info btn-sm w-100 mt-2"
                        onClick={() => addToCart(p)}
                        disabled={p.stock <= 0} // Bloquear si no hay stock
                      >
                        {p.stock > 0 ? "Agregar" : "Agotado"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carrito */}
        <div className="col-lg-6">
          <div className="border-neon p-3 bg-dark rounded">
            <h4 className="text-info mb-3">Tu Carrito</h4>
            {cart.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <>
                <table className="table table-dark table-striped align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cant.</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name || item.nombre}</td>
                        <td>${Number(item.price || item.precio).toLocaleString()}</td>
                        <td>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-sm btn-outline-info me-2"
                              onClick={() => updateQuantity(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className="btn btn-sm btn-outline-info ms-2"
                              onClick={() => updateQuantity(item.id, 1)}
                              // Validar que no agregue más del stock disponible
                              disabled={item.quantity >= item.stock}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          ${((item.price || item.precio) * item.quantity).toLocaleString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeFromCart(item.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="text-end mt-3">
                  <h5 className="text-info">
                    Total: ${total.toLocaleString()}
                  </h5>
                  <button
                    className="btn btn-outline-danger me-2"
                    onClick={clearCart}
                  >
                    Vaciar
                  </button>
                  <button className="btn btn-success" onClick={comprar}>
                    Comprar ahora
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.8)" }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark border-neon text-light">
              <div className="modal-header border-bottom-0">
                <h5 className="modal-title text-success">
                  ✅ Compra Exitosa — N° {idPedido}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>El stock ha sido actualizado en la base de datos.</p>
                <table className="table table-dark table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cant.</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ultimaCompra.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name || item.nombre}</td>
                        <td>{item.quantity}</td>
                        <td>${((item.price || item.precio) * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h4 className="text-end text-info mt-3">
                  Total Pagado: ${ultimaCompra.reduce((acc, item) => acc + ((item.price || item.precio) * item.quantity), 0).toLocaleString()}
                </h4>
              </div>
              <div className="modal-footer border-top-0">
                <button className="btn btn-success w-100" onClick={cerrarModal}>
                  Seguir Comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}