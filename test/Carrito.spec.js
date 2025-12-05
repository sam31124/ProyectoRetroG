const React = require("react");
const { render, screen } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");

// --- Mock manual del contexto sin Jest ---
let mockUseCart;

// Simulamos el módulo manualmente
jest = undefined; // evita conflictos si Karma lo detecta
const cartContext = require("../src/context/CartContext");
cartContext.useCart = () => mockUseCart();

const Carrito = require("../src/components/pages/Carrito").default;

describe("Carrito.jsx", () => {
  beforeEach(() => {
    mockUseCart = () => ({
      cart: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {}
    });
  });

  it("renderiza productos del carrito", () => {
    mockUseCart = () => ({
      cart: [{ id: 1, name: "NES", price: 10000, quantity: 1 }],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {}
    });

    render(
      React.createElement(MemoryRouter, {}, React.createElement(Carrito))
    );

    expect(screen.getByText("NES")).toBeTruthy();
  });

  it("muestra el total correcto", () => {
    mockUseCart = () => ({
      cart: [{ id: 1, name: "NES", price: 10000, quantity: 2 }],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {}
    });

    render(
      React.createElement(MemoryRouter, {}, React.createElement(Carrito))
    );

    expect(screen.getByText(/20000/)).toBeTruthy();
  });
});
