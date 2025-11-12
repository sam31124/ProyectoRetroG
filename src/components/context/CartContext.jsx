import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Cargar usuario actual
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(loggedUser);
  }, []);

  // Cargar carrito al detectar usuario
  useEffect(() => {
    if (user && user.id) {
      const savedCart = JSON.parse(localStorage.getItem(`carrito_${user.id}`)) || [];
      setCart(savedCart);
    } else {
      setCart([]);
    }
  }, [user]);

  // Guardar carrito al cambiar
  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem(`carrito_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  // Agregar producto
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Cambiar cantidad
  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    if (user && user.id) {
      localStorage.removeItem(`carrito_${user.id}`);
    }
  };

  // Cargar carrito del usuario logueado
  const loadUserCart = (userData) => {
    setUser(userData);
    const savedCart = JSON.parse(localStorage.getItem(`carrito_${userData.id}`)) || [];
    setCart(savedCart);
  };

  // Limpiar al cerrar sesión
  const logoutUserCart = () => {
    setUser(null);
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        user,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        loadUserCart,
        logoutUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
