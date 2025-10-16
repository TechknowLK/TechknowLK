import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Button02 from "../Button02";

export const ProjectCard = ({ title, description, images = [], technologies }) => {
  return (
    <div className="overflow-hidden group transition-all duration-300 hover:shadow-lg rounded-lg border-2 border-gray-200 bg-white h-full flex flex-col">

      {/* 🔹 Swiper Image Slider Section */}
      <div className="aspect-video overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${title} ${index}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔹 Info Section */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#626262]">{title}</h3>
          <p className="text-sm text-[#626262] leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <div
                key={tech}
                className="text-xs text-[#33A1E0] bg-[#E0F7FA] p-2 rounded-full font-bold"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

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
