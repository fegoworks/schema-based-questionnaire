import "./container.scss";
import { FunctionComponent, ReactElement } from "react";

interface ContainerProps {
  children?: ReactElement;
  className?: string;
}
const Container: FunctionComponent<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`Container ${className ? className : ""}`}>{children}</div>
  );
};

export default Container;
