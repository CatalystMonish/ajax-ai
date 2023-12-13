import React, { useState } from "react";
import logo from "../images/header_logo.png";
import VideoCardMain from "../components/VideoCardMain.jsx";
import AICardMain from "../components/AICardMain.jsx";
import AudioCardMain from "../components/AudioCardMain.jsx";
import ReactPlayer from "react-player";
import ajax from "../images/ajax.png";
import hse from "../images/hse.png";
import printer from "../images/3d-printer.png";
import { motion, AnimatePresence } from "framer-motion";
import industry from "../images/industry.png";
import sana from "../images/sana.png";
import rohit from "../images/rohit.png";
import siddharth from "../images/siddharth.png";
import simran from "../images/simran.png";
import ChatMessageBubble from "../components/ChatMessageBubble.jsx";
import Lottie from "lottie-react";
import typingAnimation from "../lottie/typing.json";
import loadingAnimation from "../lottie/load.json";
import { useNavigate } from "react-router-dom";

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
    AIName: "Industrial Insights",
    AIPicture: industry,
    AIDescription:
      "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.",
    Q1: "How is the trend towards affordable housing in India influencing the cement industry?",
    Q2: "How are recent government regulations in India affecting the cement industry, particularly in areas of taxation and environmental compliance?",
    Q3: "What are the potential impacts of the Indian government's 'Smart Cities' initiative on the cement industry?",
    Q4: "What are the key challenges faced by the Indian cement industry in terms of sustainability and environmental impact?",

    assistantID: "asst_Po9xlahc0bNt7EojFwqSPCSo",
  },
];

const videoData = [
  {
    name: "AJAX Overview",
    description:
      "Your bot that offers detailed insights into Ajax's history, products and future plans.",
    q1: "Corporate Overview of AJAX Engineering",
    q2: "AJAX's Digital Vision Powered by AI",
    q3: 'How does AJAX uphold its "CUSTOMER FIRST" philosophy in terms of product design, manufacturing, and after-sales support?',
    q1URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2Fsiddharth%20timeline.mp4?alt=media&token=15e4a802-aea0-4a13-8dc5-52fff489f83d",
    q2URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2Fsiddharth%20timeline.mp4?alt=media&token=15e4a802-aea0-4a13-8dc5-52fff489f83d",
    q3URL: "https://link.testfile.org/iK7sKT",
    img: sana,
  },
  {
    name: "HSE Essentials",
    description:
      "Your bot to provide expert guidance on Health, Safety, and Environmental compliance and best practices.",
    q1: "How do cultural aspects influence safety practices in the Indian concrete construction industry?",
    q2: "What are the most common workplace hazards found in the Indian concrete construction industry?",
    q3: "Describe the process of incident and accident reporting on construction sites in India.",
    q1URL: "https://link.testfile.org/iK7sKT",
    q2URL:
      "https://file-examples.com/storage/fed2530f4765780b09aff74/2017/04/file_example_MP4_1920_18MG.mp4",
    q3URL: "https://link.testfile.org/iK7sKT",
    img: rohit,
  },
  {
    name: "3D Printing Basics",
    description:
      "Your bot that provides comprehensive guidance on the fundamentals and intricacies of 3D printing.",
    q1: "How would 3D printing benefit across the construction value chain in India",
    q2: "Top environmental impacts of 3D CP",
    q3: "Future roadmap of 3d Prinitng in Indian Economy",
    q1URL: "https://link.testfile.org/iK7sKT",
    q2URL: "https://link.testfile.org/iK7sKT",
    q3URL: "https://link.testfile.org/iK7sKT",
    img: siddharth,
  },
  {
    name: "Industry Insights",
    description:
      "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.",
    q1: "Overview of Indian Cement and Construction Industry",
    q2: "How is electric mobility shaping the future of construction equipment in India?",
    q3: "What role is technology playing in transforming cement manufacturing processes in India?",
    q1URL: "https://link.testfile.org/iK7sKT",
    q2URL: "https://link.testfile.org/iK7sKT",
    q3URL: "https://link.testfile.org/iK7sKT",
    img: simran,
  },
];

const audio = [
  {
    Audioname:
      "How does ConcreteAI ensure data security and privacy in its operations?",
    Answer:
      "ConcreteAI ensures data security and privacy in its operations through the following measures: Encryption of data both in transit and at rest to prevent unauthorized access, regular security audits to assess and enhance security measures, compliance with international data protection regulations, and strict access controls to monitor who can access sensitive information. These security protocols are part of a comprehensive approach designed to safeguard sensitive information and protect user data against unauthorized access and breaches.",
  },
  {
    Audioname:
      "Can ConcreteAI be integrated with existing technology platforms within our organization?",
    Answer:
      "Yes, ConcreteAI can integrate seamlessly with your organization's existing technology platforms. It is designed for flexibility and compatibility, allowing it to connect effortlessly with existing ERP systems, CRM platforms, and other technological tools. Through its integration capabilities, ConcreteAI fosters unified operations across different systems and ensures a cohesive technological ecosystem within your organization.",
  },
  {
    Audioname:
      "How does ConcreteAI adapt to the constantly evolving needs and trends of the construction industry?",
    Answer:
      "ConcreteAI adapts to the constantly evolving needs and trends of the construction industry through regular updates to its knowledge base and algorithms, machine learning capabilities that evolve based on user interactions, and a focus on maintaining relevance and effectiveness in addressing the dynamic challenges of the industry.",
  },
  {
    Audioname:
      "What kind of support and training does AJAX provide for new ConcreteAI users?",
    Answer:
      "AJAX offers a comprehensive support and training program for new users of ConcreteAI, designed to facilitate a seamless onboarding experience. This includes detailed user manuals, online tutorials, hands-on training sessions, and ongoing customer support to address any issues and ensure users can maximize the benefits of ConcreteAI in their operations.",
  },
];

function HomeScreen() {
  const [query, setQuery] = useState(""); // State to hold the selected question
  const navigate = useNavigate();
  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [isTooltipVisibleLang, setTooltipVisibleLang] = useState(false);
  const [selectedOption, setSelectedOption] = useState(1); // Assuming 1 and 2 are option identifiers
  const [selectedOptionLang, setSelectedOptionLang] = useState(1); // Assuming 1 and 2 are option identifiers
  const [selectedVideoURL, setSelectedVideoURL] = useState("");
  const [isVideoPlayerVisible, setIsVideoPlayerVisible] = useState(false);

  const goChat = async () => {
    navigate("/chat");
  };
  const handleVideoSelect = (url) => {
    setSelectedVideoURL(url);
    console.log("URL Changed: ", url);
    setIsVideoPlayerVisible(true);
  };

  const handleQuestionClick = (question) => {
    setQuery(question); // Update the state with the selected question
  };

  const handleQuerySubmit = () => {
    if (query.trim() === "") return;
    navigate("/chat", { state: { question: query } }); // Navigate to chat with the question
  };

  const toggleVideoPlayer = () => {
    setIsVideoPlayerVisible(!isVideoPlayerVisible);
  };

  return (
    <AnimatePresence>
      <div className="bg-background flex items-center flex-col py-[3.125rem] px-[2.5rem] pb-[12.5rem]">
        <p className="absolute text-[3.125rem] text-white font-bold font-pop">
          ConcreteAI
        </p>
        <div className="w-full ">
          <img src={logo} alt="logo" className="w-[12.5rem] h-fit" />
        </div>

        <div className="bg-container rounded-[0.625rem] py-[2.5rem] px-[1.875rem] w-full mt-[2.5rem]">
          <p className=" text-[1.875rem] uppercase w-full text-white font-bold font-pop">
            Expert Series
          </p>
          <div className="w-full flex items-center justify-center mb-[1.25rem]">
            {isVideoPlayerVisible && (
              <motion.div
                initial={{ y: 300 }} // Start below the view (adjust value as needed)
                animate={{ y: 0 }} // Animate to its original position
                exit={{ y: 300 }} // Exit towards the bottom
                transition={{ type: "tween" }} // Configure the transition
                className="rounded-lg flex justify-center items-center relative bg-black mt-[1.25rem]"
              >
                <div
                  onClick={toggleVideoPlayer}
                  className=" w-[2.8125rem] h-[2.8125rem] rounded-full bg-white cursor-pointer absolute top-0 right-0 m-[0.625rem] flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 h-6 text-black"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
                <ReactPlayer
                  url={selectedVideoURL}
                  controls={true}
                  width="60%"
                  height="100%"
                />
              </motion.div>
            )}
          </div>
          <div className="flex flex-row gap-[1.25rem] justify-center">
            {videoData.map((video, index) => (
              <VideoCardMain
                key={index}
                name={video.name}
                description={video.description}
                q1={video.q1}
                q2={video.q2}
                q3={video.q3}
                q1URL={video.q1URL}
                q2URL={video.q2URL}
                q3URL={video.q3URL}
                img={video.img}
                onQuestionClick={handleVideoSelect} // Pass the function here
              />
            ))}
          </div>
        </div>
        <div className="bg-container rounded-[0.625rem] py-[2.5rem] px-[1.875rem] w-full mt-[2.5rem]">
          <p className=" text-[1.875rem] uppercase w-full text-white font-bold font-pop mb-[1.25rem]">
            Specialised Modules
          </p>
          <div className="flex flex-row justify-center gap-[1.25rem] ">
            {aiBots.map((AI, index) => (
              <AICardMain key={index} {...AI} />
            ))}
          </div>
        </div>
        <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
          <p className=" text-[1.875rem] uppercase w-full text-white font-bold font-pop mb-[1.25rem]">
            About CONCRETEAI
          </p>
          <div className="flex flex-row gap-[1.25rem] justify-center ">
            <div className="grid grid-cols-2 gap-[1.25rem] justify-items-center">
              {audio.map((audio, index) => (
                <AudioCardMain
                  key={index}
                  {...audio}
                  selectedOption={selectedOption}
                />
              ))}
            </div>
            <div
              className={`cursor-pointer w-[3.375rem] h-[3.375rem] rounded-full bg-[#343563] flex items-center justify-center`}
              onClick={() => setTooltipVisible(!isTooltipVisible)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
                />
              </svg>
            </div>
            {isTooltipVisible && (
              <div className="absolute right-[6.6rem]   w-40 bg-[#343563]  rounded-lg shadow-md flex flex-col items-start">
                <button
                  className={`w-full text-left text-[1rem] font-pop p-4  rounded-lg ${
                    selectedOption === 1 ? "bg-white text-black" : "text-white"
                  }`}
                  onClick={() => setSelectedOption(1)}
                >
                  Sanika
                </button>
                <button
                  className={`w-full text-left mt-2 text-[1rem] font-pop p-4  rounded-lg ${
                    selectedOption === 2 ? "bg-white text-black" : "text-white"
                  }`}
                  onClick={() => setSelectedOption(2)}
                >
                  Sanjay
                </button>
              </div>
            )}
            <div
              className={`mr-[1rem] cursor-pointer w-[3.375rem] h-[3.375rem] rounded-full bg-[#343563] flex items-center justify-center`}
              onClick={() => setTooltipVisibleLang(!isTooltipVisibleLang)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {isTooltipVisibleLang && (
              <div className="absolute right-[2.6rem]   w-40 bg-[#343563]  rounded-lg shadow-md flex flex-col items-start">
                <button
                  className={`w-full text-left text-[1rem] font-pop p-4  rounded-lg ${
                    selectedOptionLang === 1
                      ? "bg-white text-black"
                      : "text-white"
                  }`}
                  onClick={() => setSelectedOptionLang(1)}
                >
                  English
                </button>
                <button
                  className={`w-full text-left mt-2 text-[1rem] font-pop p-4  rounded-lg ${
                    selectedOptionLang === 2
                      ? "bg-white text-black"
                      : "text-white"
                  }`}
                  onClick={() => setSelectedOptionLang(2)}
                >
                  Hindi
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 w-full  flex items-center justify-center bg-red-600">
          <div className=" flex-grow flex shadow-md shadow-[#ffffff30] rounded-[0.625rem]  fixed items-center mb-[1.25rem] mx-auto bottom-0">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleQuerySubmit();
                }
              }}
              placeholder="Type your message here"
              className="relative px-[1.5625rem] py-[0.9375rem] font-pop font-medium text-[1.0625rem] border-[#6948C9] rounded-[0.625rem] border-2 bg-[#3E3E72] text-white focus:outline-none w-[75rem]"
            />
            <div
              onClick={handleQuerySubmit}
              className="absolute bg-[#6948C9] right-0 mr-2 cursor-pointer w-[2.5rem] h-[2.5rem] rounded-[0.625rem] flex items-center justify-center"
            >
              <svg
                onClick={goChat}
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
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

export default HomeScreen;
