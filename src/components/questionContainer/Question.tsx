import { Link } from "react-router-dom";
import { Question } from "../../types";

const QuestionBox = (props: { question: Question }) => {
  const { question } = props;
  const dateTime = new Date(question.timestamp);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1;
  const date = dateTime.getDate();
  const hour = dateTime.getHours();
  const min = dateTime.getMinutes();
  const sec = dateTime.getSeconds();
  const dateFormat = `${hour}:${min}:${sec} | ${date}/${month}/${year}`;

  return (
    <>
      <div className="grid place-items-center border border-slate-300 border-solid rounded-md">
        <span className="text-lg">{question.author}</span>
        <span className="text-base">{dateFormat}</span>
        <Link
          to={`/questions/${question.id}`}
          className="mt-4 mb-3 text-cyan-800 text-xl border w-3/4 border-stone-700 text-center hover:bg-primary-700 rounded-md hover:text-white"
        >
          Detail
        </Link>
      </div>
    </>
  );
};

export default QuestionBox;
