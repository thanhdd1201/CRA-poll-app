import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { addAnswerForAuth, selectAuth } from "../reducers/auth";
import { addAnswerQuestion, selectQuestions } from "../reducers/questions";
import { addAnswer, selectUsers } from "../reducers/users";
import { User, options, Answer } from "../types";
import { saveQuestionAnswer } from "../utils/api";

const Poll = () => {
  const dispatch = useAppDispatch();
  const currUser = useAppSelector(selectAuth) as User;
  const questions = useAppSelector(selectQuestions);
  const users = useAppSelector(selectUsers);
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error();
  }
  const question = questions[id];
  const author = Object.values(users).find(
    (user) => user.id === question.author
  );
  if (!author) {
    throw new Error();
  }
  const hasVotedForOptionOne = question.optionOne.votes.includes(currUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(currUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOptionOne = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const answer = {
      authorId: currUser.id,
      questionId: question.id,
      answer: options[0],
    };

    await saveQuestionAnswer(currUser.id, question.id, options[0]);
    handleAddAnswer(answer);
  };

  const handleOptionTwo = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const answer = {
      authorId: currUser.id,
      questionId: question.id,
      answer: options[0],
    };

    await saveQuestionAnswer(currUser.id, question.id, options[0]);
    handleAddAnswer(answer);
  };

  const handleAddAnswer = (answer: Answer) => {
    dispatch(addAnswerQuestion(answer));
    dispatch(addAnswer(answer));
    dispatch(addAnswerForAuth(answer));
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold mt-9">Poll by {author.id}</h1>
      </div>
      <div className="flex justify-center">
        <img
          src={author.avatarURL}
          className="h-24 w-24 rounded-full"
          alt="avatar"
        />
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={handleOptionOne}
          disabled={hasVoted}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (hasVotedForOptionOne ? "bg-lime-400" : "")
          }
        >
          <p className="mb-2">{question.optionOne.text}</p>
          {!hasVoted ? (
            <p className="underline underline-offset-4 mb-3">Choose</p>
          ) : (
            <p className="text-xs">
              {hasVotedForOptionOne
                ? `Voted. Total votes: ${question.optionOne.votes.length}`
                : `Total votes: ${question.optionOne.votes.length}`}
            </p>
          )}
        </button>

        <button
          onClick={handleOptionTwo}
          disabled={hasVoted}
          className="p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition"
        >
          <p className="mb-2">{question.optionTwo.text}</p>
          {!hasVoted ? (
            <p className="underline underline-offset-4 mb-3">Choose</p>
          ) : (
            <p className="text-xs">
              {hasVotedForOptionTwo
                ? `Voted. Total votes: ${question.optionTwo.votes.length}`
                : `Total votes: ${question.optionTwo.votes.length}`}
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

export default Poll;
