import * as Yup from "yup";
import { useFormik } from "formik";
import { FormConfig } from "../../data";

const getInputs = (formFields: FormConfig[]) => {
  let initialValues: { [key: string]: any } = {};
  let validationsFields: { [key: string]: any } = {};

  for (const field of formFields) {
    initialValues[field.name] = field.initialValue;
    const schema = generateValidations(field);
    validationsFields[field.name] = schema;
  }

  return {
    validationSchema: Yup.object({ ...validationsFields }),
    initialValues,
    inputs: formFields,
  };
};

const generateValidations = (field: FormConfig) => {
  const { typeValue, validations } = field;
  let schema = typeValue === "number" ? Yup.number() : Yup.string();

  if (typeValue === "array") {
    return Yup.array().of(Yup.string());
  }

  for (const rule of validations) {
    if (rule.type === "minLength") {
      schema = schema.min(rule?.value as number, rule.message);
    }
    if (rule.type === "maxLength") {
      schema = schema.max(rule?.value as number, rule.message);
    }
    if (typeValue === "string" && rule.type === "required") {
      schema = schema.required(rule.message);
    }
  }
  return schema;
};

const useFormikFormHandler = (formFields: FormConfig[]) => {
  const { initialValues, validationSchema } = getInputs(formFields);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  return { formik };
};

export default useFormikFormHandler;
