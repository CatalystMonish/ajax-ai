import React from "react";
import ChatCard from "../components/ChatCard.jsx";

function ChatScreen() {
  return (
    <div className="bg-background">
      <div className="flex flex-row">
        <div className=" bg-[#3E3E72] flex-shrink-0 w-[26.125rem] h-screen pt-[5rem]">
          <ChatCard />
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
