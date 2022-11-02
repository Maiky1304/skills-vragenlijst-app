import React from "react";
import { selectAnswers } from "./redux/slices/answersSlice";
import { useAppSelector } from "./redux/store";

import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  registry,
} from "chart.js";
import { questions } from "./data/questions";
import { Navigate } from "react-router-dom";

registry.addElements(PointElement, BarElement);
registry.addScales(CategoryScale, LinearScale);

type Props = {};

const Finished = (props: Props) => {
  const answers = useAppSelector(selectAnswers);

  if (answers.length !== questions.length) {
    return <Navigate to={`/vragen/${answers.length + 1}`} />;
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-400 to-cyan-600 flex justify-center items-center">
      <div className="bg-white shadow-md p-5 w-1/2 rounded-md">
        <Bar
          datasetIdKey="id"
          data={{
            labels: answers.map((answer) => `Vraag #${answer.questionNo}`),
            datasets: [
              {
                data: answers.map((answer) => answer.answer),
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Finished;
