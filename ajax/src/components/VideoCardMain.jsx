import React from "react";
import test from "../images/video_card_main.png";
import VideoCardQuestion from "./VideoCardQuestion.jsx";

function VideoCardMain() {
  return (
    <div className="bg-card flex-shrink-0 rounded-[0.625rem] py-[1.25rem] pl-[1.5625rem] pr-[1.875rem] w-fit max-w-[33.5625rem] flex flex-row shadow-md hover:shadow-xl ">
      <img src={test} className="" />
      <div className="flex flex-col ml-[1.5625rem]">
        <p className="font-pop font-semibold text-white text-[1.5625rem]">
          HSE
        </p>
        <p className="font-pop font-medium text-[#7B7AB7] text-[1rem] mb-[0.75rem]">
          This is some sample text about the assistant and what does it do
        </p>
        <div className="flex flex-col gap-[0.625rem]">
          <VideoCardQuestion />
          <VideoCardQuestion />
        </div>
      </div>
    </div>
  );
}

export default VideoCardMain;
