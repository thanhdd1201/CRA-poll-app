export enum AUTHED_USER {
  SET = "SET_AUTHED_USER",
  LOGOUT = "LOGOUT_AUTHED_USER",
}

export type User = {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: Record<string, string>;
  questions: string[];
};

export type Users = Record<string, User>;

export type Question = {
  id: string;
  author: string;
  timestamp: number;
  optionOne: Option;
  optionTwo: Option;
};

export type Questions = Record<string, Question>;

export type Option = {
  votes: string[];
  text: string;
};

export type Answer = {
  authorId: string;
  questionId: string;
  answer: typeof options[number];
};

export const options = ["optionOne", "optionTwo"];
