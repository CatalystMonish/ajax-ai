import React, { useRef, useState } from "react";
import speaker from "../images/volume.png";
import interactWithElevenLabs from "../utils/interactWithElevenLabs.js"; // Adjust the path accordingly
import loadingAnimation from "../lottie/load.json";
import Lottie from "lottie-react";
function AudioCardMain({ Audioname, Answer, selectedOption }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null); // Ref to hold the audio object
  const maxCardWidth = "37.125rem";

  const handleStartAudio = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const handleEndAudio = () => {
    setIsPlaying(false);
  };

  const handlePlayAudio = async () => {
    setIsLoading(true);
    const voiceId =
      selectedOption === 2 ? "LrYtPz3RwneBN65UhzNl" : "2zRM7PkgwBPiau2jvVXc";
    try {
      const audio = await interactWithElevenLabs(
        Answer,
        voiceId,
        handleStartAudio,
        handleEndAudio,
      );
      audioRef.current = audio; // Store the audio object
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  const handleStopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Optionally reset the audio to the start
    }
    setIsPlaying(false);
  };
  return (
    <div
      className={`flex border-[2px] border-[#6948C9] p-[0.9375rem] rounded-full items-center min-w-${maxCardWidth}`}
    >
      <div
        className="bg-[#535497] w-[5rem] h-[5rem] rounded-full flex items-center justify-center flex-shrink-0"
        onClick={
          isLoading ? undefined : isPlaying ? handleStopAudio : handlePlayAudio
        }
      >
        <img
          src={speaker}
          alt="audio"
          className="w-[3rem] h-[3rem] object-fit"
        />
      </div>
      <p
        className={`text-[1.25rem] font-pop font-medium text-[#C4C4EB] ml-[1.875rem] pr-[2rem]`}
        style={{ maxWidth: maxCardWidth }}
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
          className="w-[1.75rem] h-[1.75rem] text-white ml-auto mr-[1.875rem] flex-shrink-0"
          onClick={handleStopAudio}
        >
          <path d="M5 5h14v14H5z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-[1.75rem] h-[1.75rem] text-white ml-auto mr-[1.875rem] flex-shrink-0"
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
