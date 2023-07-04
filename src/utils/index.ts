import { Opt } from "../components";

interface AnswerProps {
  type: "number" | "text" | "radio-group" | "select" | "checkbox" | "date";
  value: string | string[] | number;
  options?: Opt[];
}

export const getAnswer = ({ type, value, options }: AnswerProps) => {
  if (type === "radio-group" || type === "select") {
    return options?.find((opt) => opt.value == value)?.label;
  }
  if (type === "checkbox") {
    return options
      ?.filter((item) => (value as string[])?.includes(item.value as string))
      .map((o) => o.label)
      .join(", ");
  }
  return value;
};
