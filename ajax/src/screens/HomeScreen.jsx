import React from "react";
import logo from "../images/header_logo.png";
import VideoCardMain from "../components/VideoCardMain.jsx";
import AICardMain from "../components/AICardMain.jsx";
import AudioCardMain from "../components/AudioCardMain.jsx";
import ReactPlayer from "react-player";
function HomeScreen() {
  return (
    <div className="bg-background flex items-center flex-col py-[3.125rem] px-[2.5rem]">
      <img src={logo} alt="logo" className="" />
      <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
        <div className="w-full flex items-center justify-center mb-[2.5rem]">
          <div className="rounded-lg flex justify-center items-center">
            <ReactPlayer
              url="https://link.testfile.org/iK7sKT"
              controls={true}
              width="60%"
              height="100%"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[1.25rem] overflow-x-auto">
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
        </div>
      </div>
      <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
        <div className="flex flex-row gap-[1.25rem] flex-wrap ">
          <AICardMain />
          <AICardMain />
          <AICardMain />
          <AICardMain />
        </div>
      </div>
      <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
        <div className="flex flex-row gap-[1.25rem] flex-wrap ">
          <AudioCardMain />
          <AudioCardMain />
          <AudioCardMain />
          <AudioCardMain />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
