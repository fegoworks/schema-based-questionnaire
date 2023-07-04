import { fireEvent, render, screen } from "@testing-library/react";
import Accordion from "./Accordion";

const setup = () => {
  const defaultProps = {
    title: "Accordion Title",
    answer: "Accordion Answer",
    isExpanded: false,
    toggleExpanded: () => {},
    isStatusGreen: false,
  };

  const openedStateProps = { ...defaultProps, isExpanded: true };

  return {
    defaultProps,
    openedStateProps,
  };
};

describe("Component - Accordion", () => {
  it("should render accordion component", () => {
    const { defaultProps } = setup();
    const { container } = render(
      <Accordion {...defaultProps}>
        <div>Accordion content</div>
      </Accordion>
    );
    expect(container).toMatchSnapshot();
  });

  it("should show title and answer in closed state", async () => {
    const { defaultProps } = setup();
    const { getByText } = render(
      <Accordion {...defaultProps}>
        <div>Accordion content</div>
      </Accordion>
    );
    expect(getByText("Accordion Title")).toBeTruthy();
    expect(getByText("Accordion Answer")).toBeTruthy();
  });

  it("should open accordion on click", async () => {
    const { defaultProps } = setup();
    const { container } = render(
      <Accordion {...defaultProps}>
        <div>Accordion content</div>
      </Accordion>
    );
    fireEvent.click(container);
    expect(await screen.findByText(/Accordion content/i)).toBeInTheDocument();
  });

  it("should render only accordion answer in header when in open state", async () => {
    const { openedStateProps } = setup();
    const { getByText } = render(
      <Accordion {...openedStateProps}>
        <>Accordion content</>
      </Accordion>
    );
    const answerComponent = screen.queryByText("Accordion Answer");
    expect(getByText("Accordion content")).toHaveClass("accordion-expanded");
    expect(answerComponent).not.toBeInTheDocument();
  });
});
