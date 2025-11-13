import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../src/components/atoms/Button";

describe("Button", () => {
  it("renderiza el texto correctamente", () => {
    render(<Button text="Probar" />);
    expect(screen.getByText("Probar")).toBeTruthy();
  });

  it("ejecuta onClick al presionar", () => {
    const mockFn = jasmine.createSpy("click");
    render(<Button text="Click" onClick={mockFn} />);

    fireEvent.click(screen.getByText("Click"));
    expect(mockFn).toHaveBeenCalled();
  });
});
