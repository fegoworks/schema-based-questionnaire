import "./selectField.scss";
import { FunctionComponent } from "react";
import { FieldProps } from "../../formField";

const SelectField: FunctionComponent<FieldProps> = ({
  error,
  name,
  onBlur,
  onChange,
  touched,
  value,
  options,
  disabled,
}) => {
  return (
    <div className="SelectField">
      <select
        id={name}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        disabled={disabled}>
        <option value="" disabled={disabled}>
          Select
        </option>
        {options?.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === value}
            disabled={disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && <p className="error">{error}</p>}
    </div>
  );
};

export default SelectField;
