import { Question } from "../types";
import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => {
      return {
        users,
        questions,
      };
    }
  );
}

export function saveQuestion(
  optionOneText: string,
  optionTwoText: string,
  author: string
): Promise<Question> {
  return _saveQuestion({
    optionOneText,
    optionTwoText,
    author,
  });
}

export function saveQuestionAnswer(
  authedUser: string,
  qid: string,
  answer: string
) {
  return _saveQuestionAnswer({
    authedUser,
    qid,
    answer,
  });
}
