import React, { useState, useEffect, useRef } from "react";
import ChatCard from "../components/ChatCard.jsx";
import ChatMessageBubble from "../components/ChatMessageBubble.jsx";
import logo from "../images/header_logo.png";
import interactWithOpenAI from "../utils/interactWithOpenAi.js";
import Lottie from "lottie-react";
import loadingAnimation from "../lottie/load.json";
import typingAnimation from "../lottie/typing.json";
import interactWithWhisper from "../utils/interactWithWhisper";
import showPreviousThreads from "../utils/showPreviousThreads.js";
import { getThreadMetadata } from "../utils/getThreadMetadata.js";
import ajax from "../images/ajax.png";
import hse from "../images/hse.png";
import printer from "../images/3d-printer.png";
import factory from "../images/factory.png";
import StarterQuestions from "../components/StarterQuestions.jsx";
import interactWithElevenLabs from "../utils/interactWithElevenLabs.js"; // Import the function
import { AnimatePresence, motion } from "framer-motion";
import { UserAuth } from "../context/AuthContext.jsx";

import { useNavigate, useParams, useLocation } from "react-router-dom";

const aiBots = [
  {
    AIName: "AJAX Overview",
    AIPicture: ajax,
    AIDescription:
      "Your bot that offers detailed insights into Ajax's history, products and future plans.",
    Q1: "Provide detailed product walkthrough of AJAX's Paver series",
    Q2: "Provide detailed product walkthrough of AJAX's ARGO series",
    Q3: "What are some of the environmentally friendly innovations incorporated into the new CEV Stage-IV ARGO series?",
    Q4: "Briefly describe variations in ARGO series SLCM's",
    assistantID: "asst_Po9xlahc0bNt7EojFwqSPCSo",
  },
  {
    AIName: "HSE Essentials",
    AIPicture: hse,
    AIDescription:
      "Your bot to provide expert guidance on Health, Safety, and Environmental compliance and best practices.",
    Q1: "What are the legal implications of failing to adhere to HSE standards in the Indian construction sector?",
    Q2: "Develop an HSE playbook for cement & construction equipment industry",
    Q3: "HSE checklist as per Indian laws for industrial plants\n",
    Q4: "How do Indian HSE regulations address the environmental impact of large-scale construction projects?",
    assistantID: "asst_Po9xlahc0bNt7EojFwqSPCSo",
  },
  {
    AIName: "3-D Printing Basics",
    AIPicture: printer,
    AIDescription:
      "Your bot that provides comprehensive guidance on the fundamentals and intricacies of 3D printing.",
    Q1: "How will the Cement industry Value Chain adapt for the success of 3D cement printing",
    Q2: "What are the key methods and materials used in 3D concrete Printing?",
    Q3: "Blue ocean analysis of 3D printing in the construction industry",
    Q4: "Brief global adoption of 3D concrete printing across the world",
    assistantID: "asst_Po9xlahc0bNt7EojFwqSPCSo",
  },
  {
    AIName: "Industry Insights",
    AIPicture: factory,
    AIDescription:
      "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.",
    Q1: "How is the trend towards affordable housing in India influencing the cement industry?",
    Q2: "How are recent government regulations in India affecting the cement industry, particularly in areas of taxation and environmental compliance?",
    Q3: "What are the potential impacts of the Indian government's 'Smart Cities' initiative on the cement industry?",
    Q4: "What are the key challenges faced by the Indian cement industry in terms of sustainability and environmental impact?",
    assistantID: "asst_Po9xlahc0bNt7EojFwqSPCSo",
  },
];

const loadingSteps = [
  "Initializing AI assistant",
  "Analyzing your query",
  "Accessing data sources",
  "Synthesizing information",
  "Formulating response",
  "Finalizing answer",
];

function ChatScreen() {
  const { q: initialQuery } = "";
  const location = useLocation(); // Correct useLocation to get state
  const { state } = location; // Extract state from location
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false); // new state for tracking audio playing
  const audioRef = useRef(null);
  const initialIsAloud = localStorage.getItem("isAloud") === "true";
  const [isAloud, setIsAloud] = useState(initialIsAloud);
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const initialSelectedOption = parseInt(localStorage.getItem("selectedOption"), 10) || 1;
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const initialAIBotName = localStorage.getItem("selectedAIBot") || aiBots[0].AIName;

  // Find the corresponding AI bot object based on the initialAIBotName
  const initialAIBot =
    aiBots.find((aiBot) => aiBot.AIName === initialAIBotName) || aiBots[0];

  // Use initialAIBot as the initial state for activeAIBot
  const [activeAIBot, setActiveAIBot] = useState(initialAIBot);
  const [currentLoadingText, setCurrentLoadingText] = useState("");
  const [starterQuestionSelected, setStarterQuestionSelected] = useState(false);
  const [whisperActive, setWhisperActive] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const { user } = UserAuth();
  const [showThreads, setshowThreads] = useState(false);
  const [previousMessage, setPreviousMessage] = useState({});
  const [threadId, setThreadId] = useState(null);
  const userId = user ? user.uid : null;

  useEffect(() => {
    localStorage.setItem("isAloud", isAloud.toString());
  }, [isAloud]);
  const goHome = async () => {
    navigate("/");
  };
  const handleQuestionClick = (question) => {
    setQuery(question);
    setStarterQuestionSelected(true); // Add this line
  };

  useEffect(() => {
    localStorage.setItem("selectedOption", selectedOption.toString());
  }, [selectedOption]);

  const variants = {
    open: { width: "26.125rem", opacity: 1, background: "#3E3E72" }, // Adjust width to your original size
    closed: { width: "10rem", opacity: 1 },
  };

  const handlePlayAudio = async (response) => {
    setIsLoading(true);
    const voiceId =
      selectedOption === 2 ? "cU7w5DuiKdTi6Il21yMF" : "YtvAvGwjGulirnsSTIgn";

    try {
      const audio = await interactWithElevenLabs(
        response,
        voiceId,
        () => {
          setIsPlaying(true);
          setAudioPlaying(true);
          setIsLoading(false);
        },
        () => {
          setIsPlaying(false);
          setAudioPlaying(false);
        },
      );

      if (audioRef.current) {
        audioRef.current.pause();
      }

      audioRef.current = audio;
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
      setAudioPlaying(false);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioPlaying(false); // Reset this state when audio is stopped
    }
    setIsPlaying(false);
  };
  const handleGenderSelect = (genderOption) => {
    setSelectedOption(genderOption); // This will trigger the useEffect above
    setTooltipVisible(false);
  };

  useEffect(() => {
    let intervalId;
    let stepIndex = 0;

    if (isLoading) {
      setCurrentLoadingText(loadingSteps[stepIndex]);
      intervalId = setInterval(() => {
        stepIndex++;
        if (stepIndex < loadingSteps.length) {
          setCurrentLoadingText(loadingSteps[stepIndex]);
        } else {
          clearInterval(intervalId); // Stop the interval when the last step is reached
        }
      }, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoading]);

  

  const handleChatCardClick = (aiBot) => {
    localStorage.setItem("selectedAIBot", aiBot.AIName);
    localStorage.setItem("aiBot", JSON.stringify(aiBot));
    setActiveAIBot(aiBot);
    setThreadId(null);
    setMessages([]);
    setQuery(""); // Clear the input box immediately
    // window.location.replace("/chat");
  };

  const [selectedItem, setSelectedItem] = useState(null);

  const handleThreadClick = async (threadId, index) => {
    try {
      // Update the state with the selected timestamp or index
      console.log(threadId);
      setThreadId(threadId);
      setSelectedItem(threadId);
     
      // Fetch metadata from OpenAI API
      const metadata = await getThreadMetadata(threadId);
  
      // Extract messages from the metadata
      const threadMessages = metadata.messageDictionary[threadId] || [];
      setMessages([]);
      // Formatted messages array to be added to the state
      const formattedMessages = [];
  
      // Iterate over messages in forward order and add to formattedMessages array
      for (let i = 0; i < threadMessages.length; i++) {
        const message = threadMessages[i];
  
        // Determine if the message is from the user or the assistant
        const isUser = message.hasOwnProperty('message');
  
        formattedMessages.push({ isUser, message: message.message || message.response });
      }
  
      // Update the state with the formatted messages array
      setMessages((prevMessages) => [...prevMessages, ...formattedMessages]);
      // console.log(selectedItem);
      // Uncomment the line below if you want to log the thread metadata
      // console.log('Thread Metadata:', metadata);
    } catch (error) {
      // Handle the error if needed
      console.error('Error handling thread click:', error);
    }
  };
  
  


  const handleRefreshChat = () => {
    setThreadId(null);
    setMessages([]);
    setQuery(""); // This line is not necessary as the page will be reloaded
  };


  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = async () => {
    if (query.trim() === "") return;
    setIsLoading(true);
    setStarterQuestionSelected(true);

    const currentQuery = query;
    setQuery(""); // Clear the input box

    // Add user's message to messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { isUser: true, message: currentQuery },
    ]);

    try {
      console.log("Before the interact call "+ threadId);
      const response = await interactWithOpenAI(currentQuery, selectedOption, userId, threadId, setThreadId);

      if (typeof response === "string") {
        setMessages((prevMessages) => [
          ...prevMessages,
          { isUser: false, message: response },
        ]);

        if (isAloud) {
          handlePlayAudio(response);
        }
        // saveThreads(userId, threadId, runId, currentQuery, response);
      }
      // Add additional handling for complex response if needed
    } catch (error) {
      console.error("Error interacting with OpenAI:", error);
    }
    setIsLoading(false);
  };

  const handleshowthreads = async () => {
    const { threadIds, timestamps } = await showPreviousThreads(userId);

    const threadData = {};
    threadIds.forEach((threadId, index) => {
      threadData[threadId] = timestamps[index];
    });
  
    setPreviousMessage(threadData);
    setIsOpen(true);
    setshowThreads(!showThreads);
  }

  const formatTimestamp = (timestamp) => {
    // Extract seconds and nanoseconds from the timestamp object
    const { seconds, nanoseconds } = timestamp || {};

    // Implement your logic to format the timestamp to a string here
    // For example, using toLocaleString or a date library
    return seconds ? new Date(seconds * 1000).toLocaleString() : '';
  };

  const activeAIQuestions = [
    activeAIBot.Q1,
    activeAIBot.Q2,
    activeAIBot.Q3,
    activeAIBot.Q4,
  ];
  const toggleAudio = () => {
    setIsAloud(!isAloud); // This will trigger the useEffect above
  };

  useEffect(() => {
    const initialAIBotName =
      localStorage.getItem("selectedAIBot") || aiBots[0].AIName;
    const initialAIBot =
      aiBots.find((aiBot) => aiBot.AIName === initialAIBotName) || aiBots[0];
    setActiveAIBot(initialAIBot);
  }, [aiBots]);
  
  const useWhisper = async () => {
    setWhisperActive(true);
    setStarterQuestionSelected(true);

    try {
      const transcriptionText = await interactWithWhisper();
      console.log("Transcription:", transcriptionText);

      setMessages((messages) => [
        ...messages,
        { isUser: true, message: transcriptionText },
      ]);
      setIsLoading(true); // Set loading to true before interacting with OpenAI
      // Use the transcription as input to interactWithOpenAI
      const response = await interactWithOpenAI(
        transcriptionText,
        selectedOption, userId, threadId, setThreadId
      );
      setIsLoading(false); // Set loading to false after getting the response

      if (typeof response === "string") {
        setMessages((messages) => [
          ...messages,
          { isUser: false, message: response },
        ]);

        // Play audio if isAloud is true
        if (isAloud) {
          handlePlayAudio(response);
        }
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error in useWhisper:", error);
      setIsLoading(false);
    }
    setIsLoading(false); // Set loading to false after getting the response

    setWhisperActive(false);
    // It's not necessary to set isLoading to false here as it's already handled in both try and catch blocks
  };

  return (
    <div className="bg-background">
      <div className="flex flex-row w-screen">
        <div className={`h-full ${!isOpen && ""}  h-screen`}>

          <motion.div
            className="inset-y-0 left-0 z-30 p-5 bg-[#3E3E72] flex flex-col h-full"
            initial="closed"
            animate={isOpen ? "open" : "close"}
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <div
              onClick={goHome}
              className="flex items-center justify-center w-[3.125rem] h-[3.125rem] bg-white rounded-full cursor-pointer ml-[1.25rem]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-black"
              >
                <path
                  fillRule="evenodd"
                  d="M20.25 12a.75.75 0 01-.75.75H6.31l5.47 5.47a.75.75 0 11-1.06 1.06l-6.75-6.75a.75.75 0 010-1.06l6.75-6.75a.75.75 0 111.06 1.06l-5.47 5.47H19.5a.75.75 0 01.75.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button
              className="flex text-[1.5rem] bg-[#363662]  shadow-xl p-s-10 rounded-[5px] mt-[0.625rem] ml-auto mb-m-10"
              onClick={() => {setIsOpen(!isOpen); setshowThreads(false);}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-[15px] h-[15px] transform transition-transform ${!isOpen ? "rotate-180" : ""
                  }`}
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isOpen ? (
  aiBots.map((aiBot, index) => (
    <ChatCard
      key={index}
      {...aiBot}
      isActive={activeAIBot.AIName === aiBot.AIName}
      onClick={() => handleChatCardClick(aiBot)}
      
    >

      {isOpen ? aiBot.AIName : null}
    </ChatCard>
  ))
) : (
  aiBots.map((aiBot, index) => (
    <ChatCard
      key={index}
      AIPicture={aiBot.AIPicture}
      isActive={activeAIBot.AIName === aiBot.AIName}
      onClick={() => handleChatCardClick(aiBot)}
    />
  ))
)}

            <div className="flex items-center">
              <div className="text-[1.125rem] font-pop font-medium text-highlight mt-[1rem] mr-2">Previous Messages</div>
              <button
                className="flex text-[1.5rem] bg-[#363662]  shadow-xl p-s-10 rounded-[5px] mt-[0.625rem] ml-auto mb-m-10"
                onClick={() => handleshowthreads()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-[15px] h-[15px] transform transition-transform ${showThreads ? "-rotate-90" : ""
                    }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <AnimatePresence>
  {showThreads && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      style={{ overflow: 'hidden' }}
    >
      <div className="max-h-60 overflow-auto">
        <ul className="text-highlight font-pop font-medium">
          {Object.entries(previousMessage).map(([threadId, timestamp], index) => (
            <li
              key={index}
              className={`p-[1rem] ${threadId === selectedItem ? 'bg-[#343563]' : ''} hover:bg-[#343563] cursor-pointer`}
              onClick={() => handleThreadClick(threadId, index)}
            >
              {formatTimestamp(timestamp)}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )}
</AnimatePresence>

          </motion.div>
        </div>
        <div className="h-screen flex-grow flex flex-col width-subtract items-center">
          <div className="mt-[1.25rem]  w-full flex items-center justify-center">
            <img src={logo} className=" relative pb-[1.25rem]" />
            <div
              onClick={toggleAudio}
              className={`absolute flex right-0 mr-[3.75rem] cursor-pointer w-[3.375rem] h-[3.375rem] rounded-full bg-[#3E3E72] items-center justify-center ${isAloud ? "border-2" : ""
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
            <div
              className={`absolute right-0 mr-[8rem] cursor-pointer w-[3.375rem] h-[3.375rem] rounded-full bg-[#3E3E72] flex items-center justify-center`}
              onClick={() => setTooltipVisible(!isTooltipVisible)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>
            {isTooltipVisible && (
              <div className="absolute z-10 right-[11.5rem] top-0 mt-[2rem] w-40 bg-[#3e3e72]  rounded-lg shadow-md flex flex-col items-start">
                <button
                  className={`w-full text-left text-[1rem] font-pop p-4  rounded-lg ${selectedOption === 1 ? "bg-white text-black" : "text-white"
                    }`}
                  onClick={() => handleGenderSelect(1)}
                >
                  Female
                </button>
                <button
                  className={`w-full text-left mt-2 text-[1rem] font-pop p-4  rounded-lg ${selectedOption === 2 ? "bg-white text-black" : "text-white"
                    }`}
                  onClick={() => handleGenderSelect(2)}
                >
                  Male
                </button>
              </div>
            )}
            <div
              onClick={handleRefreshChat}
              className={`absolute flex right-0 mr-[12.2rem] cursor-pointer w-[3.375rem] h-[3.375rem] rounded-full bg-[#3E3E72] items-center justify-center`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white "
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Display Messages */}

          <div className="overflow-auto pb-[18.75rem] w-full">
            {messages.map((msg, index) => (
              <ChatMessageBubble
                key={index}
                isUser={msg.isUser}
                message={msg.message}
              />
            ))}
            {isLoading && (
              <div className="flex w-full flex-col px-[6.25rem] pt-[0.625rem]">
                <div className="bg-[#363662] px-[1.25rem] w-fit py-[1.25rem] rounded-tr-[1.25rem] rounded-bl-[1.25rem] rounded-br-[1.25rem] mb-[0.625rem] items-center gap-2 shadow-sm flex flex-row flex-shrink-0">
                  <div className="flex-shrink-0 w-[1.75rem] h-[1.75rem]">
                    <Lottie animationData={loadingAnimation} loop={true} />
                  </div>
                  <p className="text-white text-[1.125rem] uppercase font-pop font-medium">
                    {currentLoadingText}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className=" flex-grow flex flex-col absolute items-center mb-[1.25rem] mx-auto bottom-0 ">
            {!starterQuestionSelected && ( // This condition now covers both scenarios
              <div className="grid grid-cols-2 w-full absolute flex mx-auto bottom-0 mb-[4.375rem] gap-[0.625rem]">
                {activeAIQuestions.map((question, index) => (
                  <StarterQuestions
                    key={index}
                    q={question}
                    onClick={() => handleQuestionClick(question)}
                  />
                ))}
              </div>
            )}
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
              className="absolute bg-[#6948C9] right-0 mr-2 cursor-pointer w-[2.5rem] h-[2.5rem] rounded-[0.625rem] flex items-center justify-center bottom-0 mb-[10px]"
            >
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
              className="absolute bg-white right-0 mr-14 cursor-pointer w-[2.5rem] bottom-0 mb-[10px] h-[2.5rem] rounded-[0.625rem] flex items-center justify-center"
            >
              {whisperActive ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-[1.125rem] h-[1.125rem] animate-pulse"
                >
                  <path
                    d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    fill="#94110f"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-[1.125rem] h-[1.125rem] text-black"
                >
                  <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
                  <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
                </svg>
              )}
            </div>
            {audioPlaying && (
              <div
                onClick={handleStopAudio}
                className="absolute bg-white right-0 mr-[6.5625rem] cursor-pointer w-[2.5rem] bottom-0 mb-[10px] h-[2.5rem] rounded-[0.625rem] flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[1.125rem] h-[1.125rem] text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
