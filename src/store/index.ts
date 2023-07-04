import { configureStore } from "@reduxjs/toolkit";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Question } from "../models";
import reducers from "../reducers";

export interface QuestionnaireState {
  questions: Question[];
  isQuestionnaireCompleted: boolean;
}

export const store: ToolkitStore = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
