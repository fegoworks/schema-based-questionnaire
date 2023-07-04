import { fireEvent, render } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import SelectField from "./SelectField";

const opt = [
  { label: "Onions", value: "onions" },
  { label: "Veggies", value: "veggies" },
  { label: "Carrots", value: "carrots" },
];
const defaultProps = {
  name: "types",
  options: opt,
  disabled: false,
};

describe("Component - SelectField", () => {
  let onChange: () => void;

  beforeEach(() => {
    onChange = vi.fn();
  });

  it("should render SelectField component", () => {
    const { container } = render(<SelectField {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should render a SelectField with a dropdown of options", () => {
    const { container } = render(
      <SelectField {...defaultProps} onChange={() => onChange} />
    );
    const select = container.getElementsByTagName("select")[0];
    const options = select.getElementsByTagName("option");
    // 4 options including "Select"
    expect(options[0]).toBeInTheDocument();
    expect(options[1]).toBeInTheDocument();
    expect(options[2]).toBeInTheDocument();
    expect(options[3]).toBeInTheDocument();
    expect(options).toHaveLength(4);
  });

  it("should select the correct option from dropdown", () => {
    const { container } = render(<SelectField {...defaultProps} />);
    const select = container.getElementsByTagName("select")[0];
    fireEvent.change(select, {
      target: { value: "carrots" },
    });
    let options = select.getElementsByTagName("option");
    // 4 options including "Select"
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeFalsy();
    expect(options[2].selected).toBeFalsy();
    // selected option => carrots
    expect(options[3].selected).toBeTruthy();
  });

  it("should show an error message if validation fails", () => {
    const { getByText } = render(
      <SelectField {...defaultProps} error={"Some error"} touched={true} />
    );
    expect(getByText("Some error")).toBeTruthy();
  });
});
