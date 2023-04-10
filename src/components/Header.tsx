import { Link, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { logout, selectAuth } from "../reducers/auth";

const Header = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authedUser = useAppSelector(selectAuth);

  const handleSignout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(logout());
    return <Navigate replace to="/login" />;
  };

  return (
    <header>
      <nav
        id="header"
        data-testid="header"
        className="bg-white border-gray-200 px-4 lg:px-6 py-2.5"
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Poll Application
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/"
              className="text-gray-80 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
            >
              {authedUser.name || ""}
            </Link>

            <span
              onClick={handleSignout}
              className="text-gray-800 cursor-pointer hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
            >
              Logout
            </span>
          </div>

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className={
                    "block py-2 pr-4 pl-3 text-gray-700 rounded bg-primary-700 lg:bg-transparent lg:p-0 " +
                    (location.pathname === "/" && "text-primary-700")
                  }
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/leaderboard"
                  className={
                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 " +
                    (location.pathname === "/leaderboard" && "text-primary-700")
                  }
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  to="/add"
                  className={
                    "block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0 " +
                    (location.pathname === "/add" && "text-primary-700")
                  }
                >
                  Create Poll
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
