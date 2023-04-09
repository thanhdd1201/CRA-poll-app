import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { selectAuth } from "../reducers/auth";
import { addQuestion } from "../reducers/questions";
import { addQuestionUser } from "../reducers/users";
import { User } from "../types";
import { saveQuestion } from "../utils/api";

const PollCreation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currUser = useAppSelector(selectAuth) as User;
  const [firstOpt, setFirstOpt] = useState("");
  const [secondOpt, setSecondOpt] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const question = await saveQuestion(firstOpt, secondOpt, currUser.id);
    dispatch(addQuestion(question));
    dispatch(addQuestionUser(question));
    navigate("/");
  };

  return (
    <>
      <div className="grid mt-10 place-items-center">
        <h2 className="text-3xl text-bold mb-5">Would You Rather</h2>
        <form
          className="grid place-items-center w-full space-y-4 md:space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="w-3/4">
            <label
              htmlFor="firstOpt"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First Option
            </label>
            <input
              value={firstOpt}
              onChange={(e) => setFirstOpt(e.target.value)}
              type="text"
              name="firstOpt"
              data-testid="firstOpt"
              id="firstOpt"
              placeholder="Option One"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          <div className="w-3/4">
            <label
              htmlFor="secondOpt"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Second Option
            </label>
            <input
              value={secondOpt}
              onChange={(e) => setSecondOpt(e.target.value)}
              type="text"
              name="secondOpt"
              data-testid="secondOpt"
              id="secondOpt"
              placeholder="Option Two"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
            />
          </div>

          <button
            type="submit"
            data-testid="submitQuestion"
            className="w-40 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PollCreation;
