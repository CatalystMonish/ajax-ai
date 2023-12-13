import React from "react";
import VideoCardQuestion from "./VideoCardQuestion.jsx";
import StartChatButton from "./StartChatButton.jsx";
import { Link, useNavigate } from "react-router-dom";
import AICardQuestion from "./AICardQuestion.jsx";

function AICardMain({ AIName, AIDescription, AIPicture, Q1, Q2, Q3, Q4 }) {
  const navigate = useNavigate();

  const handleQuestionClick = (question) => {
    navigate("/chat", { state: { question } });
  };

  return (
    <div className="flex p-[1.5625rem] flex-col shadow-md hover:shadow-xl  bg-card rounded-[0.625rem] flex-1">
      <div className="flex flex-row">
        <div className="w-[6.25rem] h-[6.25rem] bg-[#535497] rounded-[0.625rem] flex items-center justify-center flex-shrink-0">
          <img
            className="w-[3.125rem] h-[3.125rem] "
            src={AIPicture}
            alt="AI"
          />
        </div>

        <div className="flex flex-col ml-[1.25rem]">
          <p className="font-pop font-semibold text-white text-[1.5625rem] mb-[0.3125rem] w-3/4 max-h-[4rem]">
            {AIName}
          </p>
          <p className="font-pop font-medium text-[#7B7AB7] text-[1rem]  ">
            {AIDescription}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-[0.9375rem] gap-[0.625rem] mb-[0.9375rem] ">
        <AICardQuestion q={Q1} onClick={() => handleQuestionClick(Q1)} />
        <AICardQuestion q={Q2} onClick={() => handleQuestionClick(Q2)} />
        <AICardQuestion q={Q3} onClick={() => handleQuestionClick(Q3)} />
        <AICardQuestion q={Q4} onClick={() => handleQuestionClick(Q4)} />
      </div>
      <div className="flex ml-auto mt-auto">
        <StartChatButton />
      </div>
    </div>
  );
}

export default AICardMain;
