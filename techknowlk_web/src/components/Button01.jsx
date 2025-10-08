import React from "react";
import { ArrowRight } from "lucide-react"; // ✅ import icon

export default function Button01({ label , onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-[#33A1E0] text-white px-8 py-2 rounded-xl text-lg font-medium  hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
    >
      {label}
      <ArrowRight className="w-5 h-5" />
    </button>
  );
}
