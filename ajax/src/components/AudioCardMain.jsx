import React, { useState, useRef } from "react";
import speaker from "../images/volume.png";
import interactWithElevenLabs from "../utils/interactWithElevenLabs.js"; // Adjust the path accordingly
import loadingAnimation from "../lottie/load.json";
import playingAnimation from "../lottie/playing.json";
import Lottie from "lottie-react";

function AudioCardMain({
  Audioname,
  Answer,
  selectedOption,
  selectedOptionLang,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null); // Ref to hold the audio object

  const maxCardWidth = "45.125rem";

  const handlePlayAudio = async () => {
    setIsLoading(true);
    const voiceId =
      selectedOption === 2 ? "cU7w5DuiKdTi6Il21yMF" : "YtvAvGwjGulirnsSTIgn";
    try {
      const audio = await interactWithElevenLabs(
        Answer,
        voiceId,
        () => {
          setIsPlaying(true);
          setIsLoading(false);
        },
        () => {
          setIsPlaying(false);
        },
        selectedOptionLang,
      );
      audioRef.current = audio;
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  return (
    <div
      className={`flex border-[2px] border-[#6948C9] p-[0.9375rem] bg-[#343563] rounded-full items-center shadow-sm hover:shadow-xl  cursor-pointer min-w-${maxCardWidth}`}
    >
      <div
        className="bg-[#535497] w-[5rem] h-[5rem] rounded-full flex items-center justify-center flex-shrink-0"
        onClick={
          isLoading ? undefined : isPlaying ? handleStopAudio : handlePlayAudio 
        }
      >
        {isPlaying ? (
          <Lottie
            animationData={playingAnimation}
            loop={true}
            className="w-[3rem] h-[3rem]"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
      </div>

      <p
        className={`text-[1.25rem] max-w-[31.25rem] font-pop font-medium text-[#C4C4EB] ml-[1.875rem] pr-[2rem]`}
      >
        {Audioname}
      </p>
      {isLoading ? (
        <div className="w-[1.75rem] h-[1.75rem] ml-auto mr-[1.875rem] flex-shrink-0">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
      ) : isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[2rem] h-[2rem] text-white ml-auto mr-[1.875rem] flex-shrink-0 hover:shadow-2xl hover:shadow-white cursor-pointer"
          onClick={handleStopAudio}
        >
          <path d="M5 5h14v14H5z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[2rem] h-[2rem] text-white ml-auto mr-[1.875rem] flex-shrink-0 hover:shadow-2xl hover:shadow-white cursor-pointer"
          onClick={handlePlayAudio}
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
}

export default AudioCardMain;
