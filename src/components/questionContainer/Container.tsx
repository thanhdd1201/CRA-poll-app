import { Question } from "../../types";
import QuestionBox from "./Question";

const QuestionsContainer = (props: {
  questions: Question[];
}) => {
  const { questions } = props;
  return (
    <>
      <div className="border border-slate-300 border-solid w-3/4 mb-5 rounded">
        <div className="grid grid-cols-4 gap-2 p-3">
          {questions.length &&
            questions.map((question) => (
              <QuestionBox key={question.id} question={question} />
            ))}
        </div>
      </div>
    </>
  );
};

export default QuestionsContainer;
