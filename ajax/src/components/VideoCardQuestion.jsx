// VideoCardQuestion.jsx
import React from "react";

function VideoCardQuestion({ q, onClick, isSelected }) {
  const bgColor = isSelected ? "bg-[#FFFFFF]" : "bg-[#3E3E72]";
  return (
    <div
      className={`flex flex-shrink-0 p-[0.9375rem] border-[2px] border-[#6948C9] rounded-[0.75rem] ${bgColor} shadow-inner h-[6rem] overflow-hidden`}
      onClick={onClick}
    >
      <p className="text-[1rem] font-medium font-pop text-[#C4C4EB] ">{q}</p>
    </div>
  );
}

export default VideoCardQuestion;
