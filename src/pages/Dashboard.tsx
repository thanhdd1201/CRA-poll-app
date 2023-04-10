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
  const [openTab, setOpenTab] = useState(0);

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
    const sortedUnansweredList = unansweredList.sort(
      (first: Question, second: Question) => second.timestamp - first.timestamp
    );
    const sortedAnsweredList = answeredList.sort(
      (first: Question, second: Question) => second.timestamp - first.timestamp
    );

    setUnawswered(sortedUnansweredList);
    setAnswered(sortedAnsweredList);
  }, [currUser.answers, currUser.questions, questions]);

  const handleTab = (e: React.MouseEvent<HTMLElement>, value: number) => {
    e.preventDefault();
    setOpenTab(value);
  };

  return (
    <>
      <div
        data-testid="dashboard"
        className="mb-4 border-b border-gray-200 dark:border-gray-700"
      >
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="myTab"
          data-tabs-toggle="#myTabContent"
          role="tablist"
        >
          <li className="mr-2" role="presentation">
            <button
              className={
                "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 " +
                (openTab === 0 && "text-blue-600")
              }
              id="unanswered-tab"
              data-testid="unanswered-tab"
              type="button"
              role="tab"
              data-toggle="tab"
              onClick={(e) => {
                handleTab(e, 0);
              }}
            >
              Unanswered Questions
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button
              className={
                "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 " +
                (openTab === 1 && "text-blue-600")
              }
              id="answered-tab"
              data-testid="answered-tab"
              type="button"
              role="tab"
              data-toggle="tab"
              onClick={(e) => {
                handleTab(e, 1);
              }}
            >
              Answered Questions
            </button>
          </li>
        </ul>
      </div>

      <div id="myTabContent">
        {openTab === 0 ? (
          <div
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="unanswered"
            data-testid="unanswered-questions-tab"
            role="tabpanel"
            aria-labelledby="unanswered-tab"
          >
            <QuestionsContainer questions={unanswered} />
          </div>
        ) : (
          <div
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="answered"
            data-testid="answered-questions-tab"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          >
            <QuestionsContainer questions={answered} />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
