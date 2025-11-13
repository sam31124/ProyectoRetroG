import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import * as ConsolesModule from "../src/data/consoles";
import Productos from "../src/components/pages/Productos";

describe("Productos.jsx", () => {
  let mockAddToCart;

  beforeEach(() => {
    // Mock de productos
    spyOn(ConsolesModule, "readAll").and.returnValue([
      { id: 1, name: "NES", price: 50000, image: "/nes.jpg" },
      { id: 2, name: "SNES", price: 60000, image: "/snes.jpg" },
      { id: 3, name: "Nintendo 64", price: 70000, image: "/n64.jpg" },
    ]);

    mockAddToCart = jasmine.createSpy("addToCart");

    spyOn(localStorage, "getItem").and.returnValue("[]");
    spyOn(localStorage, "setItem");
  });

  it("renderiza los productos correctamente", () => {
    render(<Productos />);

    expect(screen.getByText("NES")).toBeTruthy();
    expect(screen.getByText("SNES")).toBeTruthy();
    expect(screen.getByText("Nintendo 64")).toBeTruthy();
  });

  it("renderiza exactamente 3 imágenes", () => {
    render(<Productos />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBe(3);
  });

  it("agrega un producto al carrito", () => {
    render(<Productos />);

    fireEvent.click(screen.getAllByText("Agregar al carrito")[0]);

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
