import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Answer, Question, Users } from "../types";

const initialState: Users = {};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    allUser: (state, action: PayloadAction<Users>) => ({
      ...state,
      ...action.payload,
    }),
    addAnswer: (state, action: PayloadAction<Answer>) => ({
      ...state,
      [action.payload.authorId]: {
        ...state[action.payload.authorId],
        answers: {
          ...state[action.payload.authorId].answers,
          [action.payload.questionId]: action.payload.answer,
        },
      },
    }),
    addQuestionUser: (state, action: PayloadAction<Question>) => ({
      ...state,
      [action.payload.author]: {
        ...state[action.payload.author],
        questions: state[action.payload.author].questions.concat(
          action.payload.id
        ),
      },
    }),
  },
});
export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
export const { allUser, addAnswer, addQuestionUser } = usersSlice.actions;
