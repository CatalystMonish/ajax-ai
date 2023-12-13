import React from "react";

function ChatCard({ AIName, AIPicture, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-row  hover:bg-[#343563] p-[0.625rem]  items-center cursor-pointer ${
        isActive ? "bg-[#343563]" : "bg-[#3E3E72]"
      }`}
    >
      <div className="w-[5rem] h-[5rem] rounded-[0.625rem] bg-[#535497] flex items-center justify-center">
        <img className="w-[3.125rem] h-[3.125rem] " src={AIPicture} alt="AI" />
      </div>
      <p className="ml-[1.25rem] text-[1.125rem] font-pop font-medium text-white">
        {AIName}
      </p>
    </div>
  );
}

export default ChatCard;
