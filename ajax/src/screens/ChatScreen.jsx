import React, { useState, useEffect } from "react";
import ChatCard from "../components/ChatCard.jsx";
import ChatMessageBubble from "../components/ChatMessageBubble.jsx";
import logo from "../images/header_logo.png";
import interactWithOpenAI from "../utils/interactWithOpenAi.js";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/load.json";
import typingAnimation from "../lottie/typing.json";
import interactWithWhisper from "../utils/interactWithWhisper";
import { useParams } from "react-router-dom";

const aiBots = {
  "Ajax Overview":
    "Your bot that offers detailed insights into Ajax's history, products and future plans.",
  "HSE Essentials":
    "Your bot to provide expert guidance on Health, Safety, and Environmental compliance and best practices.",
  "3-D Printing Basics":
    "Your bot that provides comprehensive guidance on the fundamentals and intricacies of 3D printing.",
  "Industrial Insights":
    "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.",
};

function ChatScreen(route) {
  const { q: initialQuery } = useParams();  // Use useParams to get route parameters
  const [query, setQuery] = useState(initialQuery || "");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAloud, setIsAloud] = useState(false);

  useEffect(() => {
    // Check if q1 is provided in the route params
    if (route.params && route.params.q) {
      // Set q1 as the initial value for the query state
      setQuery(route.params.q);

      // Trigger the submit button functionality
      handleQuerySubmit();
    }
  }, [route.params]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async () => {
    if (query.trim() === "") return;
    setIsLoading(true);

    const currentQuery = query; // Store the current query
    setQuery(""); // Clear the input box immediately

    // Add user's message to messages array using the stored query
    setMessages((messages) => [
      ...messages,
      { isUser: true, message: currentQuery },
    ]);

    try {
      const response = await interactWithOpenAI(currentQuery, isAloud);
      if (typeof response === "string") {
        setMessages((messages) => [
          ...messages,
          { isUser: false, message: response },
        ]);
      } else if (response && response.content) {
        setMessages((messages) => [
          ...messages,
          { isUser: false, message: response.content },
        ]);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error interacting with OpenAI:", error);
    }

    setIsLoading(false); // This will be executed after the response is received
  };

  const toggleAudio = () => {
    setIsAloud(!isAloud);
  };
  const useWhisper = async () => {
    setIsLoading(true); // Start loading

    try {
      const transcriptionText = await interactWithWhisper();
      console.log("Transcription:", transcriptionText);

      setMessages((messages) => [
        ...messages,
        { isUser: true, message: transcriptionText },
      ]);
      // Use the transcription as input to interactWithOpenAI
      const response = await interactWithOpenAI(transcriptionText, isAloud);
      if (typeof response === "string") {
        setMessages((messages) => [
          ...messages,
          { isUser: false, message: response },
        ]);
      } else if (response && response.content) {
        setMessages((messages) => [
          ...messages,
          { isUser: false, message: response.content },
        ]);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false); // Stop loading
  };
  return (
    
    <div className="bg-background">
      <div className="flex flex-row w-screen">
        <div className=" bg-[#3E3E72] flex-shrink-0 w-[26.125rem] h-screen pt-[5rem] ">
          {Object.entries(aiBots).map(([AIName, AIDescription], index) => (
            <ChatCard AIName={AIName} key={index} />
          ))}
        </div>
        <div className="h-screen flex-shrink-0 flex flex-col width-subtract items-center">
          <div className="mt-[1.25rem]  w-full flex items-center justify-center">
            <img src={logo} className=" relative pb-[1.25rem]" />
            <div
              onClick={toggleAudio}
              className={`absolute flex right-0 mr-[1.25rem] cursor-pointer w-[3.375rem] h-[3.375rem] rounded-full bg-[#3E3E72] items-center justify-center ${
                isAloud ? "border-2" : ""
              }`}
            >
              {isAloud ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
                  <path d="M13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path d="M9.547 3.062A.75.75 0 0110 3.75v12.5a.75.75 0 01-1.264.546L4.703 13H3.167a.75.75 0 01-.7-.48A6.985 6.985 0 012 10c0-.887.165-1.737.468-2.52a.75.75 0 01.7-.48h1.535l4.033-3.796a.75.75 0 01.811-.142zM13.28 7.22a.75.75 0 10-1.06 1.06L13.94 10l-1.72 1.72a.75.75 0 001.06 1.06L15 11.06l1.72 1.72a.75.75 0 101.06-1.06L16.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L15 8.94l-1.72-1.72z" />
                </svg>
              )}
            </div>
          </div>
          {/* Display Messages */}

          <div className="overflow-y-auto pb-[12.5rem] w-full">
            {messages.map((msg, index) => (
              <ChatMessageBubble
                key={index}
                isUser={msg.isUser}
                message={msg.message}
              />
            ))}
            {isLoading && (
              <div className="flex w-full flex-col px-[6.25rem] pt-[0.625rem]">
                <div className="bg-[#363662] px-[1.25rem] w-fit py-[0.625rem] rounded-tr-[1.25rem] rounded-bl-[1.25rem] rounded-br-[1.25rem] mb-[0.625rem] max-w-[6.25rem] shadow-sm ">
                  <Lottie animationData={typingAnimation} loop={true} />
                </div>
              </div>
            )}
          </div>

          <div className=" flex-grow flex absolute items-center mb-[1.25rem] mx-auto bottom-0">
            <input
              type="text"
              value={query}
              disabled={isLoading}
              onChange={handleQueryChange}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleQuerySubmit();
                }
              }}
              placeholder={` ${!isLoading ? "Type your message here" : ""} `}
              className=" relative px-[1.5625rem] py-[0.9375rem] font-pop font-medium text-[1.0625rem] border-[#6948C9] rounded-[0.625rem] border-2 bg-[#3E3E72] text-white focus:outline-none w-[75rem] "
            />
            <div
              onClick={handleQuerySubmit}
              className="absolute bg-[#6948C9] right-0 mr-2 cursor-pointer w-[2.5rem] h-[2.5rem] rounded-[0.625rem] flex items-center justify-center"
            >
              {" "}
              {isLoading ? (
                <div className="w-[1.875rem] h-[1.875rem]">
                  <Lottie animationData={loadingAnimation} loop={true} />
                </div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-[1.875rem] h-[1.875rem] text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15a.75.75 0 01-.75-.75V7.612L7.29 9.77a.75.75 0 01-1.08-1.04l3.25-3.5a.75.75 0 011.08 0l3.25 3.5a.75.75 0 11-1.08 1.04l-1.96-2.158v6.638A.75.75 0 0110 15z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div
              onClick={useWhisper}
              className="absolute bg-white right-0 mr-14 cursor-pointer w-[2.5rem] h-[2.5rem] rounded-[0.625rem] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-[1.125rem] h-[1.125rem] text-black"
              >
                <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
