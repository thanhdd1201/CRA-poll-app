import { useEffect, useState } from "react";
import { useAppSelector } from "../common/hooks";
import QuestionsContainer from "../components/questionContainer/Container";
import { selectAuth } from "../reducers/auth";
import { selectQuestions } from "../reducers/questions";
import { Question, User } from "../types";

const Dashboard = () => {
  const questions = useAppSelector(selectQuestions);
  const currUser = useAppSelector(selectAuth) as User;
  const [unanswered, setUnawswered] = useState<Question[]>([]);
  const [answered, setAnswered] = useState<Question[]>([]);

  useEffect(() => {
    const unansweredList = [];
    const answeredList = [];
    for (const question of Object.values(questions)) {
      if (currUser.answers[question.id]) {
        answeredList.push(question);
      } else {
        unansweredList.push(question);
      }
    }

    setUnawswered(unansweredList);
    setAnswered(answeredList);
  }, [currUser.answers, currUser.questions, questions]);

  return (
    <>
      <div data-testid="dashboard" id="dashboard" className="grid place-items-center mt-10">
        <QuestionsContainer
          questions={unanswered}
          title="Unanswered Questions"
        />
        <QuestionsContainer questions={answered} title="Answered Questions" />
      </div>
    </>
  );
};

export default Dashboard;
