import { fireEvent, render } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import Button from "./Button";

describe("Component - Button", () => {
  let onClick: () => void;

  beforeEach(() => {
    onClick = vi.fn();
  });

  it("should render button component", () => {
    const { container } = render(<Button text="Click Me!" type="button" />);
    expect(container).toMatchSnapshot();
  });

  it("should render the link button", () => {
    const { getByRole } = render(<Button text="Click Me!" type="link" />);
    expect(getByRole("link")).toHaveClass("link-button");
  });

  it("should fire the onClick function when clicked for active button", () => {
    const { getByRole } = render(
      <Button onClick={onClick} text="Click me" type="button" />
    );

    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should not fire the onClick function for disabled buttons", () => {
    const { getByRole } = render(
      <Button onClick={onClick} text="Click Me!" type="button" disabled />
    );
    fireEvent.click(getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
