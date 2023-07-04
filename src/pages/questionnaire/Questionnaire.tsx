import { FunctionComponent } from "react";
import { Container, Form } from "../../components";
import { QuestionnaireState, useAppSelector } from "../../store";

const Questionnaire: FunctionComponent = () => {
  const { questions, isQuestionnaireCompleted } = useAppSelector(
    (state: { questions: QuestionnaireState }) => state.questions
  );

  return (
    <Container>
      <Form
        config={questions}
        isQuestionnaireCompleted={isQuestionnaireCompleted}
      />
    </Container>
  );
};

export default Questionnaire;
