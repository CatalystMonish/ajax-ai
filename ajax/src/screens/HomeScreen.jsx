import React from "react";
import logo from "../images/header_logo.png";
import VideoCardMain from "../components/VideoCardMain.jsx";
import AICardMain from "../components/AICardMain.jsx";
import AudioCardMain from "../components/AudioCardMain.jsx";
import ReactPlayer from "react-player";
import ajax from "../images/ajax.png";
import hse from "../images/hse.png";
import printer from "../images/3d-printer.png";
import industry from "../images/industry.png";
import sana from "../images/sana.png";
import rohit from "../images/rohit.png";
import siddharth from "../images/siddharth.png";
import simran from "../images/simran.png";

const aiBots = [
  {
    AIName: 'Ajax Overview',
    AIPicture: ajax,
    AIDescription: "Your bot that offers detailed insights into Ajax's history, products and future plans.",
    Q1: "Provide detailed product walkthrough of AJAX's Paver series",
    Q2: "Provide detailed product walkthrough of AJAX's ARGO series",
    Q3: "What are some of the environmentally friendly innovations incorporated into the new CEV Stage-IV ARGO series?",
    Q4: "What are the main technical specifications of the ARGO series SLCMs and how do they vary across different models such as the ARGO 1000, ARGO 2000, and ARGO 4000?",
  },
  {
    AIName: "HSE Essentials",
    AIPicture: hse,
    AIDescription: "Your bot to provide expert guidance on Health, Safety, and Environmental compliance and best practices.",
    Q1: "What are the legal implications of failing to adhere to HSE standards in the Indian construction sector?",
    Q2: "How will the Cement industry Value Chain adapt for the success of 3D cement printing?",
    Q3: "How is the trend towards affordable housing in India influencing the cement industry?",
    Q4: "Develop an HSE playbook for the cement & construction equipment industry",
  },
  {
    AIName: "3-D Printing Basics",
    AIPicture: printer,
    AIDescription: "Your bot that provides comprehensive guidance on the fundamentals and intricacies of 3D printing.",
    Q1: "How will the Cement industry Value Chain adapt for the success of 3D cement printing",
    Q2: "What are the key methods and materials used in 3D concrete Printing?",
    Q3: "Blue ocean analysis of 3D printing in the construction industry",
    Q4: "Brief global adoption of 3D concrete printing across the world",
  },
  {
    AIName: "Industrial Insights",
    AIPicture: industry,
    AIDescription: "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.",
    Q1: "How is the trend towards affordable housing in India influencing the cement industry?",
    Q2: "How are recent government regulations in India affecting the cement industry, particularly in areas of taxation and environmental compliance?",
    Q3: "What are the potential impacts of the Indian government's 'Smart Cities' initiative on the cement industry?",
    Q4: "What are the key challenges faced by the Indian cement industry in terms of sustainability and environmental impact?",
  },
];


const videoData = [
  { name: 'AJAX Overview', description: "Your bot that offers detailed insights into Ajax's history, products and future plans.", q1: 'Corporate Overview of AJAX Engineering', q2: '', img:sana },
  { name: 'AJAX Overview', description: "Your bot that offers detailed insights into Ajax's history, products and future plans.", q1: "AJAX's Digital Vision Powered by AI", q2: '', img:sana },
  { name: 'HSE Essentials', description: 'Your bot to provide expert guidance on Health, Safety, and Environmental compliance and best practices.', q1: 'How do cultural aspects influence safety practices in the Indian concrete construction industry?', q2: '', img:rohit },
  { name: 'HSE Essentials', description: 'Your bot to provide expert guidance on Health, Safety, and Environmental compliance and best practices.', q1: 'What are the most common workplace hazards found in the Indian concrete construction industry?', q2: '', img:rohit  },
  { name: '3D Printing Basics', description: 'Your bot that provides comprehensive guidance on the fundamentals and intricacies of 3D printing.', q1: 'How would 3D printing benefit across the construction value chain in India', q2: '', img: siddharth},
  { name: '3D Printing Basics', description: 'Your bot that provides comprehensive guidance on the fundamentals and intricacies of 3D printing.', q1: 'Top environmental impacts of 3D CP', q2: '',img: siddharth },
  { name: 'Industry Insights', description: "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.", q1: 'Overview of Indian Cement and Construction Industry', q2: '',img: simran },
  { name: 'Industry Insights', description: "Your AI bot offering in-depth, detailed guidance on Ajax's industrial insights.", q1: 'How is electric mobility shaping the future of construction equipment in India?', q2: '', img:simran },
];


const audio=[
  {Audioname:"How does CONCRETE.AI ensure data security and privacy in its operations?  "},
  {Audioname:"Can CONCRETE.AI be integrated with existing technology platforms within our organization?"},
  {Audioname:"How does CONCRETE.AI adapt to the constantly evolving needs and trends of the construction industry?"},
  {Audioname:"What kind of support and training does AJAX provide for new CONCRETE.AI users?"}
];
function HomeScreen() {
  return (
    <div className="bg-background flex items-center flex-col py-[3.125rem] px-[2.5rem]">
      <img src={logo} alt="logo" className="" />
      <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
        <div className="w-full flex items-center justify-center mb-[2.5rem]">
          <div className="rounded-lg flex justify-center items-center ">
            <ReactPlayer
              url="https://link.testfile.org/iK7sKT"
              controls={true}
              width="60%"
              height="100%"
            />
          </div>
        </div>
        <div className="flex flex-row gap-[1.25rem] overflow-x-auto">
        {videoData.map((video, index) => (
        <VideoCardMain key={index} {...video} />
      ))}
          </div>
      </div>
      <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
        <div className="flex flex-row gap-[1.25rem] flex-wrap ">
          {aiBots.map((AI, index) => (
            <AICardMain
            key={index} {...AI}
            />
          ))}
        </div>
      </div>
      <div className="bg-container rounded-[0.625rem] py-[2.5rem] pl-[1.875rem] w-full mt-[2.5rem]">
        <div className="flex flex-row gap-[1.25rem] flex-wrap ">
        {audio.map((audio, index) => (<AudioCardMain 
        key={index} {...audio}
        />
        ))}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
