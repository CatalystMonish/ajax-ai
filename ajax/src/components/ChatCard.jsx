import React from "react";

function ChatCard({ AIName, AIPicture }) {
  return (
    <div className="flex flex-row bg-[#3E3E72] hover:bg-[#343563] p-[0.625rem]  items-center cursor-pointer">
      <div className="w-[5rem] h-[5rem] rounded-[0.625rem] bg-[#535497]" />
      <p className="ml-[1.25rem] text-[1rem] font-pop font-semibold text-white">
        {AIName}
      </p>
    </div>
  );
}

export default ChatCard;
