import React from "react";
import { marked } from "marked"; // Import marked library

function ChatMessageBubble({ isUser, message }) {
  // Clean the text by removing specified patterns
  const cleanText = (text) => {
    // Regular expression to match patterns like &#8203;``【oaicite:1】``&#8203;
    const regex = /【\d+†source】/g;
    return text.replace(regex, "");
  };
  // Converts Markdown to HTML after cleaning the text
  const createMarkup = () => {
    const cleanedMessage = cleanText(message);
    return { __html: marked(cleanedMessage) };
  };

  return (
    <div className="flex w-full flex-col px-[6.25rem] pt-[0.625rem]">
      {isUser ? (
        <div className="bg-white px-[1.25rem] w-fit ml-auto py-[1.25rem] rounded-tl-[1.25rem] rounded-bl-[1.25rem] rounded-br-[1.25rem] mb-[0.625rem] max-w-[70rem] shadow-sm">
          <p
            className="font-pop text-[1.125rem] font-normal text-black"
            dangerouslySetInnerHTML={createMarkup()}
          ></p>
        </div>
      ) : (
        <div className="bg-[#363662] px-[1.25rem] w-fit py-[1.25rem] rounded-tr-[1.25rem] rounded-bl-[1.25rem] rounded-br-[1.25rem] mb-[0.625rem] max-w-[70rem] shadow-sm">
          <p
            className="font-pop text-[1.125rem] font-normal text-white"
            dangerouslySetInnerHTML={createMarkup()}
          ></p>
        </div>
      )}
    </div>
  );
}

export default ChatMessageBubble;
