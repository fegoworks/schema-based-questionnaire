import { render } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
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
  let onChange: () => void;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it("should render RadioGroup component", () => {
    const { container } = render(
      <RadioGroup onChange={() => onChange} {...defaultProps} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render a RadioGroup for each option", () => {
    const { getByRole } = render(
      <RadioGroup
        onChange={() => onChange}
        {...defaultProps}
        value="Sandwich"
      />
    );
    expect(getByRole("radio", { name: "Bread" })).toBeInTheDocument();
    expect(getByRole("radio", { name: "Pancakes" })).toBeInTheDocument();
    expect(getByRole("radio", { name: "Sandwich" })).toBeInTheDocument();
  });

  it("should check a radio option when there's for each option", () => {
    const { getByRole } = render(
      <RadioGroup onChange={() => onChange} {...defaultProps} value="bread" />
    );
    const RadioButtonOne = getByRole("radio", { name: "Bread" });
    expect(RadioButtonOne).toBeChecked();
  });

  it("should show an error message if validation is incorrect", () => {
    const { getByText } = render(
      <RadioGroup
        onChange={() => onChange}
        {...defaultProps}
        error={"Some error"}
        touched={true}
      />
    );
    expect(getByText("Some error")).toBeTruthy();
  });
});
