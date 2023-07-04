import { Question } from "../models";

export type FormConfig = Pick<
  Question,
  | "name"
  | "description"
  | "initialValue"
  | "label"
  | "type"
  | "validations"
  | "value"
  | "options"
  | "parent"
  | "placeholder"
> & {
  typeValue?: string;
};

export const fields: FormConfig[] = [
  {
    name: "name",
    type: "text",
    label: "What is your name?",
    description: "a paragraph of random text...!",
    placeholder: "Name",
    initialValue: "",
    value: "",
    typeValue: "string",
    validations: [
      {
        type: "minLength",
        value: 3,
        message: "Your name must not be shorter than 3 characters.",
      },
      {
        value: 25,
        type: "maxLength",
        message: "Your name must not be longer than 25 characters.",
      },
      {
        type: "required",
        message: "Your name is required",
      },
    ],
  },
  {
    name: "gender",
    type: "radio-group",
    label: "What is your gender?",
    description: "a paragraph of random text...!",
    placeholder: "",
    initialValue: "",
    value: "",
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "other", label: "Other" },
    ],
    validations: [],
  },
  {
    name: "date_of_birth",
    type: "date",
    label: "What is your date of birth?",
    description: "a paragraph of random text...!",
    placeholder: "",
    initialValue: "",
    value: "",
    validations: [],
    parent: {
      inputKey: "gender",
      inputValue: ["male", "female"],
    },
  },
  {
    name: "insurance_type",
    type: "checkbox",
    label: "What insurance do you use?",
    description: "a paragraph of random text...!",
    placeholder: "",
    initialValue: [],
    typeValue: "array",
    options: [
      { value: "health", label: "Health" },
      { value: "liability", label: "Liability" },
      { value: "legal", label: "Legal" },
      { value: "car", label: "Car" },
    ],
    validations: [],
  },
  {
    name: "employment_status",
    type: "select",
    label: "What is your employment status?",
    description: "a paragraph of random text...!",
    placeholder: "",
    initialValue: "",
    value: "",
    options: [
      { value: "employee", label: "Employee" },
      { value: "business_owner", label: "Business Owner" },
      { value: "house_spouse", label: "Housewife / Househusband" },
      { value: "retiree", label: "Retiree" },
      { value: "student", label: "Student" },
      { value: "self_employed", label: "Self-Employed" },
      { value: "unemployed", label: "Unemployed" },
    ],
    validations: [],
  },
  {
    name: "phone_number",
    type: "number",
    label: "What is your phone number?",
    description: "a paragraph of random text...!",
    placeholder: "Phone number",
    initialValue: "",
    value: "",
    typeValue: "string",
    validations: [
      {
        value: 7,
        type: "minLength",
        message: "Your number must be only digits and not shorter than 7.",
      },
      {
        value: 12,
        type: "maxLength",
        message: "Your number must be only digits and not longer than 12.",
      },
    ],
    parent: {
      inputKey: "employment_status",
      inputValue: ["employee", "business_owner", "student"],
    },
  },
];

export default fields;
