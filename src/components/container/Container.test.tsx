import { render } from "@testing-library/react";
import Container from ".";

const setup = () => {
  function ChildComponent() {
    return <div>Child Element</div>;
  }
  return { ChildComponent };
};

describe("Component - Container", () => {
  it("renders Container component", () => {
    const { ChildComponent } = setup();
    const { container } = render(
      <Container>
        <ChildComponent />
      </Container>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders single react child", () => {
    const { ChildComponent } = setup();
    const { getByText } = render(
      <Container>
        <ChildComponent />
      </Container>
    );
    expect(getByText("Child Element")).toBeInTheDocument();
  });

  it("should render a container with max width 800px", () => {
    const { getByText } = render(
      <Container>
        <>Test</>
      </Container>
    );

    const styles = getComputedStyle(getByText("Test"));
    expect(styles.maxWidth).toBe("800px");
  });

  it("should have a class name of Container", () => {
    const { getByText } = render(
      <Container>
        <>Test</>
      </Container>
    );
    expect(getByText("Test")).toHaveClass("Container");
  });
});
