import { Fragment, useEffect } from "react";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import Authen from "../components/Authen";
import ErrorPage from "../pages/Error";
import Dashboard from "../pages/Dashboard";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import Poll from "../pages/Poll";
import PollCreation from "../pages/PollCreation";
import { handleInitialData } from "../actions";
import { useAppDispatch } from "../common/hooks";
import Layout from "../layouts";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Routes>
          <Route element={<Authen />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/questions/:id" element={<Poll />} />
              <Route path="/add" element={<PollCreation />} />
            </Route>
          </Route>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Fragment>
  );
};

export default App;
