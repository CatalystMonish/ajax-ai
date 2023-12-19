import React, { useState, useEffect, useRef } from "react";

function AICardQuestion({ q, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-shrink-0 p-[0.9375rem] border-[2px] border-[#6948C9] rounded-[0.75rem] bg-[#3E3E72] shadow-inner h-[6rem] overflow-hidden cursor-pointer"
    >
      <p className="text-[1rem] font-medium font-pop text-[#C4C4EB] ">{q}</p>
    </div>
  );
}

export default AICardQuestion;
