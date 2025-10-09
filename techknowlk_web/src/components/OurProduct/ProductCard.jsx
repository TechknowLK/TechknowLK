import React from "react";
import Button02 from "../Button02";

export const ProjectCard = ({ title, description, image, technologies }) => {
  return (
    <div className="overflow-hidden group transition-all duration-300 hover:shadow-lg rounded-lg border border-2 border-gray-200 bg-white">
      <div className="aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-[#626262] ">{title}</h3>
        <p className=" text-sm text-[#626262] leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <div
              key={tech}
              className="text-xs text-[#33A1E0]  bg-[#E0F7FA] p-2 rounded-full font-bold "
            >
              {tech}
            </div>
          ))}
        </div>
        {/* <button className="text-accent hover:text-accent/80 font-medium text-sm transition-colors">
          View Details 
        </button> */}
        <div className="mt-8 flex justify-center">
          <Button02
            label="View Details"
            onClick={() => alert(`Viewing details for ${title}`)}
          />
        </div>
      </div>
    </div>
  );
};
