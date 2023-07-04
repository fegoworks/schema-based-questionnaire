import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../models";
import { QuestionnaireState } from "../store";
import { fields } from "../data";

const initialState: QuestionnaireState = {
  questions: fields.map((field, index) => ({
    ...field,
    accordionConfig: {
      isAnswerGiven: false,
      isDisabled: false,
      isExpanded: index === 0 ? true : false,
      ctaSubmitState: "Submit",
    },
  })),
  isQuestionnaireCompleted: false,
};

const ReducerActions = {
  setQuestions: <T extends QuestionnaireState>(
    state: T,
    action: PayloadAction<Question[]>
  ) => {
    state.questions = [...action.payload];
  },
  submitQuestion: <T extends QuestionnaireState>(
    state: T,
    action: PayloadAction<{ currentQuestionIndex: number; value: any }>
  ) => {
    const currentPosition = action.payload.currentQuestionIndex;
    const currentQuestion = state.questions[currentPosition];
    let nextQuestion: Question = state.questions[currentPosition + 1];

    currentQuestion.value = action.payload.value;
    currentQuestion.accordionConfig = {
      isAnswerGiven: true,
      isDisabled: true,
      isExpanded: false,
      ctaSubmitState: "Edit",
    };
    if (
      nextQuestion?.parent &&
      !nextQuestion.parent?.inputValue?.includes(currentQuestion.value)
    ) {
      nextQuestion = state.questions[currentPosition + 2];
      if (state.questions[currentPosition + 2]) {
        nextQuestion.accordionConfig.isExpanded = true;
      }
    } else if (currentPosition + 1 < state.questions.length) {
      nextQuestion.accordionConfig.isExpanded = true;
    }

    if (!nextQuestion) {
      state.isQuestionnaireCompleted = true;
    }
  },
  cancelQuestiom: <T extends QuestionnaireState>(
    state: T,
    action: PayloadAction<{ currentQuestionIndex: number }>
  ) => {
    state.isQuestionnaireCompleted = false;
    const currentPosition = action.payload.currentQuestionIndex;
    const currentQuestion = state.questions[currentPosition];
    let previousQuestion = state.questions[currentPosition - 1];

    currentQuestion.value = "";
    currentQuestion.accordionConfig = {
      isAnswerGiven: false,
      isDisabled: false,
      isExpanded: false,
      ctaSubmitState: "Submit",
    };

    if (
      previousQuestion?.parent &&
      !previousQuestion.parent?.inputValue?.includes(currentQuestion.value)
    ) {
      previousQuestion = state.questions[currentPosition - 2];
      if (state.questions[currentPosition - 2]) {
        previousQuestion.accordionConfig.isExpanded = true;
      }
    } else if (currentPosition - 1 >= 0) {
      previousQuestion.accordionConfig.isExpanded = true;
    }
  },
  editQuestion: <T extends QuestionnaireState>(
    state: T,
    action: PayloadAction<{ currentQuestionIndex: number }>
  ) => {
    const question = state.questions[action.payload.currentQuestionIndex];
    question.accordionConfig.isDisabled = false;
    question.accordionConfig.ctaSubmitState = "Submit";
  },
  toggleQuestionExpand: <T extends QuestionnaireState>(
    state: T,
    action: PayloadAction<{ currentQuestionIndex: number }>
  ) => {
    const question = state.questions[action.payload.currentQuestionIndex];
    if (question.value || action.payload.currentQuestionIndex === 0) {
      question.accordionConfig.isExpanded =
        !question.accordionConfig.isExpanded;
    }
  },
  resetState: <T extends QuestionnaireState>(state: T) => {
    state.questions = [...initialState.questions];
    state.isQuestionnaireCompleted = false;
  },
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: ReducerActions,
});

export const {
  setQuestions,
  editQuestion,
  cancelQuestiom,
  submitQuestion,
  toggleQuestionExpand,
  resetState,
} = questionSlice.actions;

export default questionSlice.reducer;
