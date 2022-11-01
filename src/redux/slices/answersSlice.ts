import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Answer = {
  questionNo: number;
  answer: number;
};

type AnswersState = {
  values: Answer[];
};

const initialState: AnswersState = {
  values: [],
};

export const questionsSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addOrEditAnswer: (state, action: PayloadAction<Answer>) => {
      const copy = [...state.values];
      const index = copy.findIndex(
        (value) => value.questionNo === action.payload.questionNo
      );

      if (index === -1) {
        state.values = [...state.values, action.payload];
      } else {
        copy[index] = action.payload;
        state.values = copy;
      }
    },
  },
});

export const selectAnswers = (state: RootState) => state.answers.values;
export const { addOrEditAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;
