import { FieldProps } from "../../formField";
import "./textField.scss";
import { FunctionComponent } from "react";


const TextField: FunctionComponent<FieldProps> = ({
  error,
  name,
  onBlur,
  onChange,
  touched,
  type = "text",
  value,
  disabled
}) => {
  return (
    <div className="TextField">
      <input
        role="textbox"
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        value={value}
        disabled={disabled}
      />
      {error && touched && <p className="error">{error}</p>}
    </div>
  );
};

export default TextField;
