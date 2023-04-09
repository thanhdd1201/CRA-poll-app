import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../app/store";
import Login from './Login'

describe("Login", () => {
  it("Load Login and display", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(screen).toBeDefined();
    const username = screen.getByTestId("username");
    expect(username).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
