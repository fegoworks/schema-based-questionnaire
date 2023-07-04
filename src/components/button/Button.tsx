import "./button.scss";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface ButtonArgs {
  isLoading?: boolean;
  onClick?: (e: any) => void;
  text: string;
  to?: string;
  type: "button" | "link" | "submit" | "reset";
  disabled?: boolean;
}
const Button: FunctionComponent<ButtonArgs> = ({
  isLoading,
  onClick,
  text,
  to = "#",
  type = "button",
  disabled,
}) => {
  return type === "link" ? (
    <a onClick={onClick} href={to} className="link-button">
      {text}
    </a>
  ) : (
    <button
      disabled={isLoading || disabled}
      type={type}
      onClick={onClick && onClick}>
      {isLoading ? "Loading..." : text}
    </button>
  );
};

export default Button;
