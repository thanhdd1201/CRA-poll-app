import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { login } from "../reducers/auth";
import Header from "./Header";
import store from "../app/store";

describe("Dashboard", () => {
  it("Load Dashboard when login", () => {
    store.dispatch(login({ id: "sarahedo", password: "password123" }));

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });
});
