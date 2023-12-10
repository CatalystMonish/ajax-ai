import React from "react";

function AudioCardMain() {
  return (
    <div className="flex border-[2px] border-[#6948C9] p-[0.9375rem] rounded-full items-center min-w-[33.125rem]">
      <div className="w-[5rem] h-[5rem] bg-[#535497] rounded-full" />
      <p className="text-[1.25rem] font-pop font-medium text-[#C4C4EB] ml-[1.875rem]">
        Audio 1
      </p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-[1.75rem] h-[1.75rem] text-white  ml-auto mr-[1.875rem]"
      >
        <path
          fillRule="evenodd"
          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default AudioCardMain;
