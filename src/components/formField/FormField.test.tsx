import { render } from "@testing-library/react";
import FormField from "./FormField";

const setup = () => {
  const defaultProps = {
    name: "name",
    disabled: false,
  };

  return {
    defaultProps,
  };
};

describe("Component - FormField", () => {
  it("renders FormField component", () => {
    const { defaultProps } = setup();
    const { container } = render(<FormField type="text" {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it("renders textField component when the type is text, number or date", () => {
    const { defaultProps } = setup();
    [
      { type: "text", name: "FirstName" },
      { type: "number", name: "PhoneNumber" },
      { type: "date", name: "Date" },
    ].forEach((input) => {
      const { container } = render(
        <FormField type={input.type} {...defaultProps} name={input.name} />
      );
      const textFields = container.getElementsByClassName("TextField");
      expect(textFields).toHaveLength(1);
    });
  });

  it("renders selectField component when the type is select", () => {
    const { defaultProps } = setup();
    const { container } = render(
      <FormField type="select" {...defaultProps} name="Companies" />
    );
    const selectFields = container.getElementsByClassName("SelectField");
    expect(selectFields).toHaveLength(1);
  });

  it("renders checkbox component when the type is checkbox", () => {
    const { defaultProps } = setup();
    const { container } = render(
      <FormField type="checkbox" {...defaultProps} name="Companies" />
    );
    const checkboxField = container.getElementsByClassName("Checkbox");
    expect(checkboxField).toHaveLength(1);
  });

  it("renders radioGroup component when the type is RadioGroup", () => {
    const { defaultProps } = setup();
    const { container } = render(
      <FormField type="radio-group" {...defaultProps} name="Companies" />
    );
    const radioGroup = container.getElementsByClassName("RadioGroup");
    expect(radioGroup).toHaveLength(1);
  });
});
