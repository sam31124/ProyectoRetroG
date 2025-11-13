const React = require("react");
const { render, screen } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");

const ProductCard = require("../src/components/molecules/ProductCard").default;

describe("ProductCard.jsx", () => {

  const mockProduct = {
    id: "1",
    name: "NES",
    price: 10000,
    image: "/nes.jpg"
  };

  it("renderiza nombre y precio", () => {
    render(
      React.createElement(
        MemoryRouter, 
        {}, 
        React.createElement(ProductCard, { consola: mockProduct })
      )
    );

    expect(screen.getByText("NES")).toBeTruthy();
    expect(screen.getByText("$10000")).toBeTruthy();
  });

  it("renderiza la imagen", () => {
    render(
      React.createElement(
        MemoryRouter, 
        {}, 
        React.createElement(ProductCard, { consola: mockProduct })
      )
    );

    const img = screen.getByRole("img");
    expect(img).toBeTruthy();
  });
});
