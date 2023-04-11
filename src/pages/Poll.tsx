import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
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
  const [percentageOptOne, setPercentageOptOne] = useState("");
  const [percentageOptTwo, setPercentageOptTwo] = useState("");

  const question = questions[id as string];
  const author =
    question &&
    Object.values(users).find((user) => user.id === question.author);
  if (!author || !question) {
    return <Navigate to="/404" />;
  }
  const hasVotedForOptionOne = question.optionOne.votes.includes(currUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(currUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    setPercentageOptOne(
      Math.round(
        (question.optionOne.votes.length / numberVotesTotal) * 100
      ).toFixed(2) + "%"
    );
    setPercentageOptTwo(
      Math.round(
        (question.optionTwo.votes.length / numberVotesTotal) * 100
      ).toFixed(2) + "%"
    );
  }, [question.optionOne.votes.length, question.optionTwo.votes.length]);

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
        <h1 className="text-3xl font-bold mt-9">Poll by {author?.id}</h1>
      </div>
      <div className="flex justify-center">
        <img
          src={author?.avatarURL}
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
                ? `Voted. Total votes: ${question.optionOne.votes.length}. Total percent: ${percentageOptOne}`
                : `Total votes: ${question.optionOne.votes.length}. Total percent: ${percentageOptOne}`}
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
                ? `Voted. Total votes: ${question.optionTwo.votes.length}. Total percent: ${percentageOptTwo}`
                : `Total votes: ${question.optionTwo.votes.length}. Total percent: ${percentageOptTwo}`}
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

export default Poll;
