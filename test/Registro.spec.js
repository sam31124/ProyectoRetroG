const React = require("react");
const { render, screen, fireEvent } = require("@testing-library/react");
const { MemoryRouter } = require("react-router-dom");

// 🟢 MOCK DE useNavigate (OBLIGATORIO)
const reactRouter = require("react-router-dom");
reactRouter.useNavigate = () => () => {}; // navegación falsa

const Registro = require("../src/components/pages/Registro").default;

describe("Registro.jsx", () => {

  it("muestra error si faltan datos", () => {
    render(
      React.createElement(
        MemoryRouter,
        {},
        React.createElement(Registro)
      )
    );

    fireEvent.click(screen.getByText("Registrarse"));

    expect(
      screen.getByText("Por favor completa todos los campos.")
    ).toBeTruthy();
  });

  it("guarda usuario en localStorage", () => {
    localStorage.clear();

    render(
      React.createElement(
        MemoryRouter,
        {},
        React.createElement(Registro)
      )
    );

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "Samuel" },
    });
    fireEvent.change(screen.getByPlaceholderText("ejemplo@correo.com"), {
      target: { value: "sam@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Mínimo 6 caracteres"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    const usuarios = JSON.parse(localStorage.getItem("usuarios_retroG"));
    expect(usuarios.length).toBe(1);
  });
});
