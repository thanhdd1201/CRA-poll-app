import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Answer, User } from "../types";

const initialState: User = {
  id: "",
  password: "",
  name: "",
  avatarURL: "",
  answers: {},
  questions: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (_state, action: PayloadAction<User>) => action.payload,
    logout: () => initialState,
    addAnswerForAuth: (state, action: PayloadAction<Answer>) => ({
      ...state,
      answers: {
        ...state.answers,
        [action.payload.questionId]: action.payload.answer,
      },
    }),
  },
});

export const selectAuth = (state: RootState) => state.authedUser;
export const { logout, login, addAnswerForAuth } = authSlice.actions;

export default authSlice.reducer;
