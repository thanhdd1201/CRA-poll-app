import { AppDispatch } from "../app/store";
import { getInitialData } from "../utils/api";
import { allUser } from "../reducers/users";
import { allQuestions } from "../reducers/questions";

export const handleInitialData = () => {
  return async (dispatch: AppDispatch) => {
    const { users, questions } = await getInitialData();
    dispatch(allUser(users));
    dispatch(allQuestions(questions));
  };
};
