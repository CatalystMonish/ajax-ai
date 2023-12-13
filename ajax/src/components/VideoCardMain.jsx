import React from "react";
import test from "../images/video_card_main.png";
import VideoCardQuestion from "./VideoCardQuestion.jsx";

function VideoCardMain({
  name,
  description,
  q1,
  q2,
  q3,
  q1URL,
  q2URL,
  q3URL,
  img,
  onQuestionClick,
}) {
  return (
    <div className="bg-card flex-shrink-0 rounded-[0.625rem] py-[1.25rem] pl-[1.5625rem] pr-[1.875rem] flex-1  flex flex-col shadow-md hover:shadow-xl ">
      <div className="flex flex-row">
        <img
          src={img}
          className="object-cover w-[6.5625rem] h-[6.5625rem] rounded-[0.625rem]"
        />
        <div className="flex flex-col ml-[0.625rem]">
          <p className="font-pop font-semibold text-white text-[1.5625rem]">
            {name}
          </p>
          <p className="font-pop font-medium text-[#7B7AB7] text-[1rem] mb-[0.75rem]">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-auto">
        <div className="flex flex-col gap-[0.625rem] mt-auto">
          <VideoCardQuestion q={q1} onClick={() => onQuestionClick(q1URL)} />
          <VideoCardQuestion q={q2} onClick={() => onQuestionClick(q2URL)} />
          <VideoCardQuestion q={q3} onClick={() => onQuestionClick(q3URL)} />
        </div>
      </div>
    </div>
  );
}

export default VideoCardMain;
