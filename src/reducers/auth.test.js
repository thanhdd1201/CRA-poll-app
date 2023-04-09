import authReducer, { login, logout } from "./auth";

describe("authentication reducer", () => {
  const initialState = {
    id: "",
    password: "",
    name: "",
    avatarURL: "",
    answers: {},
    questions: [],
  };
  const user = {
    id: "sarahedo",
    password: "password123",
    name: "Sarah Edo",
    avatarURL: null,
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  };

  it("should handle initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle login", () => {
    const actual = authReducer(initialState, login(user));
    expect(actual).toEqual(user);
  });

  it("should handle logout", () => {
    const actual = authReducer(initialState, logout());
    expect(actual).toEqual(initialState);
  });
});
