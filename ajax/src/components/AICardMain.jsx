import React from "react";
import VideoCardQuestion from "./VideoCardQuestion.jsx";
import StartChatButton from "./StartChatButton.jsx";

function AICardMain({ AIName, AIDescription, AIPicture, AIQuestions }) {
  return (
    <div className="flex p-[1.5625rem] flex-col shadow-md hover:shadow-xl  bg-card rounded-[0.625rem] max-w-[28rem]">
      <div className="flex flex-row">
        <div className="w-[6.25rem] h-[6.25rem] bg-[#535497] rounded-[0.625rem] flex-shrink-0" />

        <div className="flex flex-col ml-[1.25rem]">
          <p className="font-pop font-semibold text-white text-[1.5625rem] mb-[0.3125rem]">
            {AIName}
          </p>
          <p className="font-pop font-medium text-[#7B7AB7] text-[1rem]">
            {AIDescription}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-[0.9375rem] gap-[0.625rem] mb-[0.9375rem]">
        <VideoCardQuestion />
        <VideoCardQuestion />
        <VideoCardQuestion />
        <VideoCardQuestion />
      </div>
      <div className="flex ml-auto">
        <StartChatButton />
      </div>
    </div>
  );
}

export default AICardMain;
