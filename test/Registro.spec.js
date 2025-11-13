import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import * as Router from "react-router-dom";
import Registro from "../src/components/pages/Registro";

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

describe("Registro.jsx", () => {
  let navigateMock;

  beforeEach(() => {
    navigateMock = jasmine.createSpy("navigate");

    spyOn(Router, "useNavigate").and.returnValue(navigateMock);

    localStorage.clear();
  });

  it("navega después de registrarse", async () => {
    render(<Registro />);

    fireEvent.change(screen.getByPlaceholderText("Tu nombre"), {
      target: { value: "Samuel" },
    });

    fireEvent.change(screen.getByPlaceholderText("ejemplo@correo.com"), {
      target: { value: "samuel@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Mínimo 6 caracteres"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("Registrarse"));

    await wait(1600);

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
