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
        value={value}
        disabled={disabled}>
        <option value="">Select</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && <p className="error">{error}</p>}
    </div>
  );
};

export default SelectField;
