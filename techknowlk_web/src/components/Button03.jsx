import React from "react";

export default function Button03({ label, onClick, state }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-8 py-2 rounded-xl text-sm md:text-md lg:text-lg  font-medium border-2 transition-all w-full md:w-auto duration-300
    ${
      state
        ? "bg-[#33A1E0]  text-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
        : "bg-transparent border-[#33A1E0] text-[#33A1E0] hover:bg-[#33A1E0]  hover:text-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105"
    }`}
    >
      {label}
    </button>
  );
}
