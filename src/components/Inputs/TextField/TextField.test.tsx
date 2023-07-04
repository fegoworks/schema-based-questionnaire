import { fireEvent, render } from "@testing-library/react";
import { describe, expect } from "vitest";
import TextField from "./TextField";

const defaultProps = {
  name: "FirstName",
  disabled: false,
};

describe("Component - TextField", () => {
  it("should render TextField component", () => {
    const { container } = render(<TextField {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should allow text input", () => {
    const { container } = render(<TextField {...defaultProps} />);
    const input = container.getElementsByTagName("input")[0];

    fireEvent.change(input, { target: { value: "Oghenefego" } });
    expect(input).toHaveDisplayValue("Oghenefego");
  });

  it("should show an error message if validation fails", () => {
    const { getByText } = render(
      <TextField {...defaultProps} error={"Some error"} touched={true} />
    );
    expect(getByText("Some error")).toBeTruthy();
  });
});
