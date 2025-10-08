import React from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  icon,
  bulletPoints,
}) {


  return (
    <div className="bg-[#154D71] p-7 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-500 text-center flex flex-col justify-between h-full">
      <div className=" flex flex-col items-center text-center  ">
        <div className="w-[60px] h-[60px] bg-[#33A1E0] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {icon}
        </div>

        <h3 className={`text-2xl mt-3 text-white font-bold `}>{title}</h3>
        <p className="text-white mt-8 text-start">{description}</p>

        <div className="mt-8 w-full  ">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex justify-start  mb-2">
              <span className="text-white mr-2">•</span>
              <span className="text-white">{point}</span>
            </div>
          ))}
        </div>
      </div>

      <button className=" mt-6 text-secondary text-sm font-medium text-white hover:text-cyan-500 flex  self-center items-end" >
        Learn more 
        <ArrowRight className="ml-1 h-4 w-4 " />
      </button>
    </div>
  );
}
