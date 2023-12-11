import React from "react";

function VideoCardQuestion({q}) {
  return (
    <div className="flex flex-shrink-0 p-[0.9375rem] border-[2px] border-[#6948C9] rounded-[0.75rem] bg-[#3E3E72] shadow-inner ">
      <p className="text-[1rem] font-medium font-pop text-[#C4C4EB]">
        {q}
      </p>
    </div>
  );
}

export default VideoCardQuestion;
