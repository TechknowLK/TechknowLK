import React from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  icon,
  bulletPoints,
}) {
  //   return (
  //     <div className="bg-[#154D71] p-5 rounded-xl shadow-md hover:shadow-xl  hover:scale-105 transition duration-500 text-center">
  //       <div className="text-4xl mb-4 ">{icon}</div>
  //       <h3 className="text-2xl text-[#ffffff] font-bold">{title}</h3>
  //       <p className="text-[#ffffff] mt-8">{description}</p>

  //       <div className="mt-4">
  //         {bulletPoints.map((point, index) => (
  //           <div key={index} className="flex items-center mb-2">
  //             <span className="text-[#ffffff] mr-2">•</span>
  //             <span className="text-[#ffffff]">{point}</span>
  //           </div>
  //         ))}
  //       </div>
  //       <button className="mt-6 mb-3 bg-transparent border-2 text-white border-white px-5 py-1  rounded-lg   hover:bg-white hover:text-black hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50 transition duration-500">
  //         Learn More
  //       </button>
  //     </div>
  //   );

  return (
    <div className="bg-[#154D71] p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition duration-500 text-center flex flex-col justify-between h-full">
      <div className=" flex flex-col items-center text-center  ">
        <div className="w-[60px] h-[60px] bg-[#33A1E0] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {icon}
        </div>

        <h3 className="text-2xl mt-3 text-white font-bold">{title}</h3>
        <p className="text-white mt-8">{description}</p>

        <div className="mt-4 ">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="text-white mr-2">•</span>
              <span className="text-white">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* <button className="mt-6 bg-transparent  text-white border-white px-5 py-1 rounded-lg hover:bg-white hover:text-black  hover:shadow-xl transition duration-500">
      Learn More 
    </button> */}
      <button className=" mt-6 text-secondary text-sm font-medium text-white hover:text-cyan-500 flex items-center hover:gap-2 transition-all">
        Learn more &nbsp;
        <ArrowRight className="ml-1 h-4 w-4 hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
