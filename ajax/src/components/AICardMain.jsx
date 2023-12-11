import React from "react";
import VideoCardQuestion from "./VideoCardQuestion.jsx";
import StartChatButton from "./StartChatButton.jsx";
import { Link } from "react-router-dom"; 

function AICardMain({ AIName, AIDescription, AIPicture, Q1, Q2, Q3, Q4 }) {
  return (
    <div className="flex flex-col shadow-md hover:shadow-xl bg-card rounded-[0.625rem] max-w-[28rem] p-6">
      <div className="flex flex-row">
        <div className="w-[6.25rem] h-[6.25rem] bg-[#535497] rounded-[0.625rem] flex-shrink-0">
          <img src={AIPicture} alt={AIName} className="max-w-full max-h-full" />
        </div> 

        <div className="flex flex-col ml-[1.25rem]">
          <p className="font-pop font-semibold text-white text-[1.5625rem] mb-[0.3125rem]">
            {AIName}
          </p>
          <p className="font-pop font-medium text-[#7B7AB7] text-[1rem]">
            {AIDescription}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-[0.625rem] mb-auto mt-[0.9375rem]">
        <Link to={{ pathname: "/chat", state: { q: Q1 } }} className="cursor-pointer"> <VideoCardQuestion q={Q1}/></Link>
        <Link to={{ pathname: "/chat", state: { q: Q2 } }} className="cursor-pointer"> <VideoCardQuestion q={Q2}/></Link>
        <Link to={{ pathname: "/chat", state: { q: Q3 } }} className="cursor-pointer"><VideoCardQuestion q={Q3}/></Link>
        <Link to={{ pathname: "/chat", state: { q: Q4 } }} className="cursor-pointer"><VideoCardQuestion q={Q4}/></Link>
      </div>
      
      <div className="flex justify-end mt-5">
        <StartChatButton />
      </div>
    </div>
  );
}

export default AICardMain;
