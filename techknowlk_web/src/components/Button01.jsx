import React from "react";
import { ArrowRight } from "lucide-react"; // ✅ import icon

export default function Button01({ label , onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-[#33A1E0] text-white px-8 py-2 lg:py-2.5 rounded-lg  lg:rounded-xl text-sm md:text-lg lg:text-lg font-medium  hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
    >
      {label}
    </button>
  );
}
