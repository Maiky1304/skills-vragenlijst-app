import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Welcome = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-gradient-to-r from-cyan-400 to-cyan-600 flex justify-center items-center">
      <button
        onClick={() => navigate("/vragen/1")}
        className="px-10 py-5 bg-slate-700 text-white rounded-md text-2xl font-semibold"
      >
        Start vragenlijst
      </button>
    </div>
  );
};

export default Welcome;
