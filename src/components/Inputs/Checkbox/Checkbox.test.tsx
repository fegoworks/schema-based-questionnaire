import { fireEvent, render } from "@testing-library/react";
import { describe, expect } from "vitest";
import Checkbox from "./Checkbox";

const opt = [
  { label: "Check", value: "check" },
  { label: "Text", value: "text" },
  { label: "Select", value: "select" },
];
const defaultProps = {
  name: "types",
  options: opt,
  disabled: false,
};

describe("Component - Checkbox", () => {
  it("should render checkbox component", () => {
    const { container } = render(<Checkbox {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a checkbox for each option", () => {
    const { getByRole } = render(<Checkbox {...defaultProps} value="text" />);
    expect(getByRole("checkbox", { name: "Check" })).toBeInTheDocument();
    expect(getByRole("checkbox", { name: "Select" })).toBeInTheDocument();
    expect(getByRole("checkbox", { name: "Text" })).toBeInTheDocument();
  });

  it("should render a checkbox for each option", () => {
    const { getByRole } = render(<Checkbox {...defaultProps} />);
    const TextOption = getByRole("checkbox", { name: "Check" });

    expect(TextOption).not.toBeChecked();
    fireEvent.click(getByRole("checkbox", { name: "Check" }));
    expect(TextOption).toBeChecked();
  });

  it("should show an error message if validation is incorrect", () => {
    const { getByText } = render(
      <Checkbox {...defaultProps} error={"Some error"} touched={true} />
    );
    expect(getByText("Some error")).toBeTruthy();
  });
});
