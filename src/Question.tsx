import React, { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { getQuestion, questions } from "./data/questions";
import { addOrEditAnswer, selectAnswers } from "./redux/slices/answersSlice";
import { RootState, useAppDispatch, useAppSelector } from "./redux/store";

type StarProps = {
  filled: boolean;
};

const Star = (props: StarProps) => {
  return props.filled ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-8 h-8 fill-yellow-500"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      className="w-8 h-8 stroke-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
};

const Question = () => {
  const navigate = useNavigate();
  const { questionId } = useParams();
  const questionIdInt = Number.parseInt(questionId!!);
  const question = getQuestion(questionIdInt);

  const answers = useAppSelector(selectAnswers);
  const dispatch = useAppDispatch();
  const existingAnswer = answers.at(questionIdInt - 1);

  const [stars, setStars] = useState<number>(
    existingAnswer ? existingAnswer.answer : 0
  );

  useEffect(() => {
    const found = answers.at(questionIdInt - 1);
    if (found) {
      setStars(found.answer);
    }
  }, [questionIdInt, answers]);

  const switchQuestion = (question: number) => {
    dispatch(
      addOrEditAnswer({
        questionNo: questionIdInt,
        answer: stars,
      })
    );

    if (question > questions.length) {
      navigate("/vragen/finished");
    } else {
      navigate("/vragen/" + question);
      setStars(0);
    }
  };

  if (!questionId || !question) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-400 to-cyan-600 flex justify-center items-center relative">
      <div className="bg-slate-700 rounded-md p-10 shadow-md flex flex-col gap-y-10">
        <div className="flex justify-between items-center gap-x-10">
          <div className="flex items-center gap-x-5">
            <span className="w-16 h-16 text-2xl flex items-center justify-center bg-cyan-300 rounded-full font-bold shadow-md text-slate-700">
              #{questionId}
            </span>
          </div>

          <div>
            <div>
              <span className="text-white font-semibold">{question}</span>
            </div>

            <div className="flex gap-x-2">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <button
                    onClick={() =>
                      setStars((stars) => (stars - 1 === index ? 0 : index + 1))
                    }
                  >
                    <Star filled={index < stars} key={index} />
                  </button>
                ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-x-10">
          <button
            disabled={questionIdInt === 1}
            onClick={() => switchQuestion(questionIdInt - 1)}
            className="disabled:cursor-not-allowed disabled:bg-slate-500 rounded-md px-4 py-1 bg-cyan-400 flex items-center gap-x-3 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clipRule="evenodd"
              />
            </svg>
            Vorige vraag
          </button>
          <button
            disabled={stars === 0}
            onClick={() => switchQuestion(questionIdInt + 1)}
            className="disabled:cursor-not-allowed disabled:bg-slate-500 rounded-md px-4 py-1 bg-cyan-400 flex items-center gap-x-3 transition-all duration-300 disabled:hover-scale-100"
          >
            {questionIdInt === questions.length
              ? "Naar resultaten"
              : "Volgende vraag"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="absolute bottom-20 right-20">
        <span className="text-4xl font-bold text-white">
          {questionId}/{questions.length}
        </span>
      </div>
    </div>
  );
};

export default Question;
