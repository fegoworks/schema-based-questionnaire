import { Opt } from "../components/Inputs/Checkbox/Checkbox";
import { Validation } from "../components/form/Form";

export interface Question {
  name: string;
  description?: string;
  type: "number" | "text" | "radio-group" | "select" | "checkbox" | "date";
  options?: Opt[];
  validations: Validation[];
  value?: string | any;
  initialValue: any;
  placeholder?: string;
  label?: string;
  accordionConfig: {
    isExpanded: boolean;
    isAnswerGiven: boolean;
    isDisabled: boolean;
    ctaSubmitState: "Submit" | "Edit";
  };
  parent?: {
    inputKey: string;
    inputValue: string[] | null;
  };
}
