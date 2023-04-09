const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");

describe("_saveQuestion", () => {
  it("should be OK", async () => {
    const response = await _saveQuestion({
      optionOneText: "1111",
      optionTwoText: "2222",
      author: "sarahedo",
    });

    expect(response).toBeTruthy();
  });

  it("should return an error", async () => {
    const response = await _saveQuestion({
      optionOneText: "",
      optionTwoText: "2222",
      author: "sarahedo",
    }).catch((e) => e);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should be OK", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: "optionOne",
    });

    expect(response).toBeTruthy();
  });

  it("should return an error", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "6ni6ok3ym7mf1p33lnez",
      answer: null,
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
