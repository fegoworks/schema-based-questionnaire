import { FunctionComponent } from "react";
import { Checkbox, RadioGroup, SelectField, TextField } from "..";
import { FormikTouched } from "formik";

export type Opt = { value: string | number; label: string };

export interface FieldProps {
  error?: any;
  name: string;
  onBlur?: (e: any) => void;
  onChange?: (e: any) => void;
  touched?: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
  type?: string;
  value?: string;
  placeholder?: string;
  options?: Opt[];
  checked?: boolean;
  disabled: boolean;
}

const FormField: FunctionComponent<FieldProps> = ({ type, ...props }) => {
  switch (type) {
    case "text":
    case "number":
    case "date":
      return <TextField type={type} {...props} />;

    case "select":
      return <SelectField {...props} />;
    case "radio-group":
      return <RadioGroup {...props} />;

    case "checkbox":
      return <Checkbox {...props} />;
    default:
      return <div></div>;
  }
};

export default FormField;
