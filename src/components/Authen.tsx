import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../common/hooks";
import { selectAuth } from "../reducers/auth";

const Authen = () => {
  const redirectUrl = window.location.href
    .toString()
    .split(window.location.host)[1];
  const authedUser = useAppSelector(selectAuth);
  if (!authedUser.id) {
    return <Navigate to={`/login?redirectTo=${redirectUrl}`} />;
  }
  return <Outlet />;
};

export default Authen;
