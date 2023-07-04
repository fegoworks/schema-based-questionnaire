import "./radioGroup.scss";
import { FunctionComponent } from "react";
import { FieldProps } from "../../formField";

const RadioGroup: FunctionComponent<FieldProps> = ({
  error,
  name,
  onBlur,
  onChange,
  touched,
  options,
  disabled,
  value,
}) => {
  return (
    <div className="RadioGroup" role="group">
      {options?.map((option) => (
        <label key={option.value}>
          <input
            onChange={onChange}
            onBlur={onBlur}
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            disabled={disabled}
          />
          <span className={disabled ? "disabled" : ""}>{option.label}</span>
        </label>
      ))}
      {error && touched && <p className="error">{error}</p>}
    </div>
  );
};

export default RadioGroup;
