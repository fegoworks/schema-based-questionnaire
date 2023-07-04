import "./checkbox.scss";
import { FunctionComponent } from "react";
import { FieldProps } from "../../formField";

export type Opt = { value: string | number; label: string };

const Checkbox: FunctionComponent<FieldProps> = ({
  error,
  name,
  onBlur,
  onChange,
  touched,
  options,
  disabled,
}) => {
  return (
    <div className="Checkbox" role="checkbox">
      {options?.map((option) => (
        <label key={option.value}>
          <input
            onChange={onChange}
            onBlur={onBlur}
            type="checkbox"
            name={name}
            value={option.value}
            disabled={disabled}
          />
          <span>{option.label}</span>
        </label>
      ))}
      {error && touched && <p className="error">{error}</p>}
    </div>
  );
};

export default Checkbox;
