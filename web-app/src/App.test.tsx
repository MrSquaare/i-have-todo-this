import { render, screen } from "@testing-library/react";

import { App } from "./App";

describe("App", () => {
  it("should render", () => {
    render(<App />);

    expect(true).toBe(true);
  });

  it("should render a heading", () => {
    render(<App />);

    const heading = screen.getByTestId("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("I have TODO this");
  });
});
