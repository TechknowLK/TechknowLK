import React from 'react'
import { ArrowRight } from 'lucide-react' // ✅ import the icon

export default function Button02({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-transparent border-2 border-[#33A1E0] text-[#33A1E0] px-8 py-1.5 lg:py-2.5  rounded-lg  lg:rounded-xl text-sm md:text-lg lg:text-lg font-medium hover:bg-[#33A1E0]  hover:text-white hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300"
    >
      {label}
      <ArrowRight className="w-5 h-5" />
    </button>
  )
}
