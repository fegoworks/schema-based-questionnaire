import { fireEvent, render } from "@testing-library/react";
import { describe, expect } from "vitest";
import RadioGroup from "./RadioGroup";

const opt = [
  { label: "Bread", value: "bread" },
  { label: "Sandwich", value: "sandwich" },
  { label: "Pancakes", value: "pancakes" },
];
const defaultProps = {
  name: "breakfast",
  options: opt,
  disabled: false,
};

describe("Component - RadioGroup", () => {
  it("should render RadioGroup component", () => {
    const { container } = render(<RadioGroup {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a RadioGroup for each option", () => {
    const { getByRole } = render(
      <RadioGroup {...defaultProps} value="Sandwich" />
    );
    expect(getByRole("radio", { name: "Bread" })).toBeInTheDocument();
    expect(getByRole("radio", { name: "Pancakes" })).toBeInTheDocument();
    expect(getByRole("radio", { name: "Sandwich" })).toBeInTheDocument();
  });

  it("should render a RadioGroup for each option", () => {
    const { getByRole } = render(<RadioGroup {...defaultProps} />);
    const TextOption = getByRole("radio", { name: "Bread" });

    expect(TextOption).not.toBeChecked();
    fireEvent.click(getByRole("radio", { name: "Bread" }));
    expect(TextOption).toBeChecked();
  });

  it("should show an error message if validation is incorrect", () => {
    const { getByText } = render(
      <RadioGroup {...defaultProps} error={"Some error"} touched={true} />
    );
    expect(getByText("Some error")).toBeTruthy();
  });
});
