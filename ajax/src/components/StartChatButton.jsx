import React from "react";
import { useNavigate } from "react-router-dom";

function StartChatButton() {
  const navigate = useNavigate();
  const goChat = async () => {
    navigate("/chat");
  };

  return (
    <div>
      <button
        onClick={goChat}
        className="rounded-[1.5625rem] border-[0.125rem] border-[#6244B8] bg-gradient-to-t from-[#322E78] to-[#918DFC] py-[1.25rem] px-[3.75rem]"
      >
        <p className="text-[0.9375rem] font-pop font-medium text-white">
          Start Chatting
        </p>
      </button>
    </div>
  );
}

export default StartChatButton;
