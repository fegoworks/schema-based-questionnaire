import "./Form.scss";
import { FormikProvider, useFormikContext } from "formik";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { Accordion, Button, FormField } from "..";
import { useFormHandler } from "../../hooks";
import { Question } from "../../models";
import {
  cancelQuestiom,
  editQuestion,
  resetState,
  submitQuestion,
  toggleQuestionExpand,
} from "../../reducers/questionsReducer";
import { FormConfig } from "../../data";
import { getAnswer } from "../../utils";

interface FormActionProps {
  index: number;
  name: string;
  ctaSubmitState: "Submit" | "Edit";
}

interface FormProps {
  config: Question[];
  isQuestionnaireCompleted: boolean;
}

export interface Validation {
  type: "required" | "minLength" | "maxLength" | "isTrue";
  value?: string | number | boolean;
  message: string;
}

const FormWrapper: FunctionComponent<FormProps> = ({
  config,
  isQuestionnaireCompleted,
}) => {
  const { formik } = useFormHandler(config);
  return (
    <FormikProvider value={formik}>
      <Form
        config={config}
        isQuestionnaireCompleted={isQuestionnaireCompleted}
      />
    </FormikProvider>
  );
};

export const Form: FunctionComponent<FormProps> = ({
  config,
  isQuestionnaireCompleted,
}) => {
  const dispatch = useDispatch();
  const { values, errors, getFieldProps, resetForm, touched } =
    useFormikContext<FormConfig>();

  return (
    <form className="Form">
      {config.map(({ label, name, type, parent, ...props }, index) => {
        const { isExpanded, isDisabled } = props.accordionConfig;
        if (
          !parent ||
          parent.inputValue?.includes(values[parent.inputKey as keyof {}])
        ) {
          return (
            <Accordion
              key={name}
              title={label}
              answer={getAnswer({
                value: props.value,
                type,
                options: props.options,
              })}
              isExpanded={isExpanded}
              toggleExpanded={() =>
                dispatch(toggleQuestionExpand({ currentQuestionIndex: index }))
              }
              isStatusGreen={props.value && !isQuestionnaireCompleted}>
              <>
                <FormField
                  key={name}
                  type={type}
                  {...getFieldProps(name)}
                  error={errors[name as keyof {}]}
                  touched={touched[name as keyof {}]}
                  options={props.options}
                  disabled={isDisabled}
                />
                <FormActions
                  index={index}
                  name={name}
                  ctaSubmitState={props.accordionConfig.ctaSubmitState}
                />
              </>
            </Accordion>
          );
        }
      })}
      {isQuestionnaireCompleted && (
        <div className="button-container">
          <Button
            text={"Reset"}
            type="reset"
            onClick={() => {
              dispatch(resetState());
              resetForm();
            }}
          />
        </div>
      )}
    </form>
  );
};

const FormActions = ({ index, name, ctaSubmitState }: FormActionProps) => {
  const dispatch = useDispatch();
  const { values, errors, setFieldValue } = useFormikContext<Question[]>();

  const onSubmit = () => {
    dispatch(
      submitQuestion({
        currentQuestionIndex: index,
        value: values[name as keyof {}],
      })
    );
  };

  const onEdit = () => {
    dispatch(
      editQuestion({
        currentQuestionIndex: index,
      })
    );
  };

  const onCancel = () => {
    setFieldValue(name, "");
    dispatch(
      cancelQuestiom({
        currentQuestionIndex: index,
      })
    );
  };

  return (
    <div>
      <Button
        type="button"
        text={ctaSubmitState}
        onClick={
          ctaSubmitState === "Submit" && values[name as keyof {}]
            ? () => onSubmit()
            : () => onEdit()
        }
        disabled={
          ctaSubmitState === "Edit"
            ? false
            : !!errors[name as keyof {}] || !values[name as keyof {}]
        }
      />
      <Button type="link" text="Cancel" onClick={() => onCancel()} />
    </div>
  );
};

export default FormWrapper;
