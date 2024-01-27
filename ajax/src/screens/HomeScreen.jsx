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
import factory from "../images/factory.png";
import sana from "../images/sana.png";
import rohit from "../images/rohit.png";
import siddharth from "../images/siddharth.png";
import simran from "../images/simran.png";
import thse from "../images/thse.png";
import t3d from "../images/t3d.png";
import tindustry from "../images/tindustry.png";
import ChatMessageBubble from "../components/ChatMessageBubble.jsx";
import Lottie from "lottie-react";
import typingAnimation from "../lottie/typing.json";
import loadingAnimation from "../lottie/load.json";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar.jsx";

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

const videoData = [
  {
    name: "AJAX Overview",
    description:
      "Your bot that offers detailed insights into Ajax's history, products and future plans.",
    q1: "Corporate Overview of AJAX Engineering",
    q2: "AJAX's Digital Vision Powered by AI",
    q3: 'How does AJAX uphold its "CUSTOMER FIRST" philosophy?',
    q1URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FCorporate%20Overview%20of%20AJAX%20Engineering.mp4?alt=media&token=009522b7-b29a-48a5-8fd0-96f8bcc4aa6a",
    q2URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FDigital%20Vision%20Powered%20by%20AI.mp4?alt=media&token=b92ba8a3-5967-4e2d-acb2-02bffba5eff6",
    q3URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FCustomer%20First.mp4?alt=media&token=8db2258d-a308-4dab-a2e5-7c52bff7a5b8",
    img: sana,
  },
  {
    name: "HSE Essentials",
    description:
      "Your bot to provide expert guidance on Health, Safety, and Environmental compliance and best practices.",
    q1: "How do cultural aspects influence safety practices in the Indian concrete construction industry?",
    q2: "What are the most common workplace hazards found in the Indian concrete construction industry?",
    q3: "Describe the process of incident and accident reporting on construction sites in India.",
    q1URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FCultural%20Aspects.mp4?alt=media&token=36a90bfd-68ec-446c-bb4e-c910395f8808",
    q2URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FRisk%20Management%20.mp4?alt=media&token=86b66bdb-3d8d-4b74-9eba-81d3baccd780",
    q3URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2Fincident%20and%20accident%20reporting.mp4?alt=media&token=021e7977-bd8f-4c3a-8502-e08611a20d38",
    img: thse,
  },
  {
    name: "3D Printing Basics",
    description:
      "Your bot that provides comprehensive guidance on the fundamentals and intricacies of 3D printing.",
    q1: "How would 3D printing benefit across the construction value chain in India?",
    q2: "Top environmental impacts of 3DCP",
    q3: "Future roadmap of 3D Prinitng in Indian Economy",
    q1URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FBenefits%20of%203D%20printing.mp4?alt=media&token=cb5cb148-9674-4188-b879-9cc5da3848e8",
    q2URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FEnvironmental%20Impact%20of%203D%20printing.mp4?alt=media&token=a5e3591f-5325-4be9-bd6f-96a7b0937e3d",
    q3URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FFuture%20of%203D%20printing.mp4?alt=media&token=be5601eb-105c-432d-a19e-08720a42afe1",
    img: t3d,
  },
  {
    name: "Industry Insights",
    description:
      "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.",
    q1: "What are different types of concrete equipment?",
    q2: "How is electric mobility shaping the future of construction equipment in India?",
    q3: "What role is technology playing in transforming cement manufacturing processes?",
    q1URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2Fconcrete%20equipment.mp4?alt=media&token=43be2c1f-91ee-424a-bf57-0a61ee250560",
    q2URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2FElectric%20mobility.mp4?alt=media&token=04796cf4-af86-4e2f-9b8c-fbb4f2709e8a",
    q3URL:
      "https://firebasestorage.googleapis.com/v0/b/render-ai.appspot.com/o/Ajax%20Files%2Frole%20of%20technology.mp4?alt=media&token=46c001b0-1fac-4e8c-b990-d5679975161f",
    img: tindustry,
  },
];

const audio = [
  {
    Audioname:
      "How does ConcreteAI ensure data security and privacy in its operations?",
    Answer:
      "Concrete AI Hub\n" +
      "ConreteAI ensures data security and privacy in its operations through the following measures:\n" +
      "\n" +
      "Encryption: Data is encrypted both in transit and at rest to prevent unauthorized access and ensure secure communication channels.\n" +
      "Regular Security Audits: Routine audits are conducted to assess and enhance security measures.\n" +
      "Compliance with International Data Protection Regulations: Adherence to global standards and regulations to ensure data protection and user privacy.\n" +
      "Strict Access Controls: Implementation of stringent access policies to control and monitor who can access sensitive information.\n" +
      "These security protocols are part of a comprehensive approach designed to safeguard sensitive information and protect user data against unauthorized access and breaches, demonstrating their commitment to maintaining high data integrity and confidentiality standards.\n",
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

const audioHin = [
  {
    Audioname: "ConcreteAI अपने संचालन में डेटा सुरक्षा कैसे करता है?\n",
    Answer:
      "ConcreteAI अपने संचालन में डेटा सुरक्षा करता है इस प्रकार:\n" +
      "\n" +
      "एन्क्रिप्शन: डेटा को सुरक्षित संचार चैनलों को सुनिश्चित करने और अनधिकृत पहुँच से बचाने के लिए ट्रांजिट और आराम के दौरान एन्क्रिप्ट किया जाता है।\n" +
      "नियमित सुरक्षा ऑडिट: सुरक्षा उपायों का आकलन और उन्हें बढ़ाने के लिए नियमित ऑडिट किए जाते हैं।\n" +
      "अंतर्राष्ट्रीय डेटा संरक्षण नियमों का पालन: डेटा संरक्षण और उपयोगकर्ता गोपनीयता को सुनिश्चित करने के लिए वैश्विक मानकों और नियमों का पालन किया जाता है।\n" +
      "सख्त पहुँच नियंत्रण: संवेदनशील जानकारी तक पहुँच को नियंत्रित और निगरानी करने के लिए कड़ी पहुँच नीतियाँ लागू की जाती हैं।\n" +
      "ये सुरक्षा प्रोटोकॉल एक व्यापक दृष्टिकोण का हिस्सा हैं जो संवेदनशील जानकारी की सुरक्षा को सुनिश्चित करने और अनधिकृत पहुँच और उल्लंघनों के खिलाफ उपयोगकर्ता डेटा की रक्षा करने के लिए बनाया गया है, उच्च डेटा अखंडता और गोपनीयता मानकों को बनाए रखने के उनके प्रतिबद्धता को दर्शाता है\n",
  },
  {
    Audioname:
      "क्या ConcreteAI को हमारे संगठन के मौजूदा प्रौद्योगिकी प्लेटफॉर्म्स के साथ एकीकृत किया जा सकता है?\n",
    Answer:
      "हां, ConcreteAI आपके संगठन के मौजूदा प्रौद्योगिकी प्लेटफॉर्म्स के साथ आसानी से एकीकृत किया जा सकता है। यह इस प्रकार से संभव है:\n" +
      "\n" +
      "लचीलापन और संगतता: ConcreteAI, आपके ERP सिस्टम्स, CRM प्लेटफॉर्म्स और अन्य प्रौद्योगिकी उपकरणों के साथ बिना किसी बाधा के जोड़ा जा सकता है।\n" +
      "संयुक्त संचालन: यह विभिन्न सिस्टम्स के बीच एक संयुक्त संचालन को बढ़ावा देता है।\n" +
      "सहज प्रौद्योगिकी पारिस्थितिकी तंत्र: अन्य सिस्टम्स के साथ एकीकरण की क्षमता कई अलग-अलग सिस्टम्स की आवश्यकता को कम करती है, आपके संगठन के भीतर एक सहज और सुसंगत प्रौद्योगिकी वातावरण सुनिश्चित करती है।\n" +
      "क्या ConcreteAI के बारे में और कुछ जानने में मैं आपकी सहायता कर सकता हूँ?\n" +
      "\n",
  },
  {
    Audioname:
      "ConcreteAI निर्माण उद्योग की लगातार बदलती जरूरतों और रुझानों के अनुसार कैसे अनुकूलित होता है?\n",
    Answer:
      "ConcreteAI निर्माण उद्योग की लगातार बदलती जरूरतों और रुझानों के अनुसार इस प्रकार अनुकूलित होता है:\n" +
      "\n" +
      "नियमित अपडेट्स: ConcreteAI का ज्ञान आधार और एल्गोरिदम नियमित रूप से अपडेट होते हैं। ये अपडेट नवीनतम निर्माण उद्योग के रुझानों और तकनीकी प्रगति के अनुरूप होते हैं।\n" +
      "मशीन लर्निंग क्षमताएं: सिस्टम उपयोगकर्ता इंटरैक्शन के आधार पर विकसित होता है, औद्योगिक कार्यप्रणाली में स्वाभाविक रूप से होने वाली विभिन्न जरूरतों और समस्या समाधान प्रक्रियाओं से सीखता है।\n" +
      "प्रासंगिकता और प्रभावशीलता: इसकी अनुकूलन क्षमता सुनिश्चित करती है कि ConcreteAI निर्माण क्षेत्र में आमतौर पर होने वाली चुनौतियों और अवसरों का सामना करने में सक्षम और प्रासंगिक बना रहता है।\n" +
      "क्या आप जानना चाहेंगे कि ConcreteAI को आपकी कंपनी के संचालन के विशिष्ट पहलुओं के अनुरूप कैसे ढाला जा सकता है?\n",
  },
  {
    Audioname:
      "AJAX ConcreteAI के नए उपयोगकर्ताओं के लिए किस प्रकार का समर्थन और प्रशिक्षण प्रदान करता है?\n",
    Answer:
      "AJAX ConcreteAI के नए उपयोगकर्ताओं के लिए एक व्यापक समर्थन और प्रशिक्षण कार्यक्रम प्रदान करता है:\n" +
      "\n" +
      "विस्तृत उपयोगकर्ता मैनुअल: ConcreteAI की विशेषताओं को समझने में मदद के लिए संपूर्ण गाइड।\n" +
      "ऑनलाइन ट्यूटोरियल: प्रभावी रूप से सिस्टम का उपयोग करने के तरीके पर शिक्षाप्रद सामग्री।\n" +
      "हाथों पर प्रशिक्षण सत्र: सिस्टम कार्यक्षमताओं के साथ प्रत्यक्ष अनुभव प्रदान करना।\n" +
      "निरंतर ग्राहक सहायता: किसी भी समस्या का समाधान करने के लिए लगातार सहायता, ताकि उपयोगकर्ता अपने संचालन में ConcreteAI का अधिकतम लाभ उठा सकें।\n" +
      "ConcreteAI के बारे में और कोई प्रश्न हो तो पूछने में संकोच न करें।\n",
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

  const handleGenderSelect = (genderOption) => {
    setSelectedOption(genderOption);
    setTooltipVisible(false); // Close the gender selection popup
  };

  const handleLanguageSelect = (languageOption) => {
    setSelectedOptionLang(languageOption);
    setTooltipVisibleLang(false); // Close the language selection popup
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
      <TopBar />
      <div className="bg-background flex items-center flex-col py-[3.125rem] px-[2.5rem] pb-[12.5rem]">
        <p className="absolute text-[3.125rem] text-white font-bold font-pop">
          ConcreteAI
        </p>
        <div className="w-full ">
          <img src={logo} alt="logo" className="w-[12.5rem] h-fit" />
        </div>

        <div className="bg-container rounded-[0.625rem] py-[2.5rem] px-[1.875rem] w-full mt-[2.5rem]">
          <p className=" text-[1.875rem] uppercase w-full text-white font-bold font-pop ml-[1.25rem]">
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
          <div className=" overflow-auto ">
            <div className=" w-fit flex flex-row pb-[0.625rem] gap-[1.25rem] mx-auto">
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
          
        </div>
        <div className="bg-container rounded-[0.625rem] py-[2.5rem] px-[1.875rem] w-full mt-[2.5rem]">
          <p className=" text-[1.875rem] uppercase w-full text-white font-bold font-pop mb-[1.25rem] ml-[1.25rem]">
            Specialised Modules
          </p>
          <div className="overflow-auto">
            <div className="flex w-fit mx-auto pb-[0.625rem]  flex-row gap-[1.25rem] ">
              {aiBots.map((AI, index) => (
                <AICardMain key={index} {...AI} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
          <p className=" text-[1.875rem] w-full text-white font-bold font-pop mb-[1.25rem] ml-[1.25rem]">
            ABOUT ConcreteAI
          </p>
          <div className="flex flex-row gap-[1.25rem] justify-center ">
            <div className="overflow-auto">
              <div className="grid grid-cols-2  gap-[1.25rem] justify-items-center">
                {(selectedOptionLang === 1 ? audio : audioHin).map(
                  (audio, index) => (
                    <AudioCardMain
                      key={index}
                      {...audio}
                      selectedOption={selectedOption}
                      selectedOptionLang={selectedOptionLang}
                    />
                  ),
                )}
              </div>
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
                  onClick={() => handleGenderSelect(1)}
                >
                  Female
                </button>
                <button
                  className={`w-full text-left mt-2 text-[1rem] font-pop p-4  rounded-lg ${
                    selectedOption === 2 ? "bg-white text-black" : "text-white"
                  }`}
                  onClick={() => handleGenderSelect(2)}
                >
                  Male
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
                  className={`w-full text-left text-[1rem] font-pop p-4 rounded-lg ${
                    selectedOptionLang === 1
                      ? "bg-white text-black"
                      : "text-white"
                  }`}
                  onClick={() => handleLanguageSelect(1)}
                >
                  English
                </button>
                <button
                  className={`w-full text-left mt-2 text-[1rem] font-pop p-4 rounded-lg ${
                    selectedOptionLang === 2
                      ? "bg-white text-black"
                      : "text-white"
                  }`}
                  onClick={() => handleLanguageSelect(2)}
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
