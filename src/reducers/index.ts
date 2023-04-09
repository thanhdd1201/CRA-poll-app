import { loadingBarReducer } from "react-redux-loading-bar";
import authedUserReducer from "./auth";
import usersReducer from "./users";
import questionsReducer from "./questions";

const reducer = {
  authedUser: authedUserReducer,
  users: usersReducer,
  questions: questionsReducer,
  loadingBar: loadingBarReducer,
};
export default reducer;
