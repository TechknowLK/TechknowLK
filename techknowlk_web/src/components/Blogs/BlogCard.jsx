import React from "react";
import { Calendar } from "lucide-react";
import Button02 from "../Button02";
 // assuming your custom button

const BlogCard = ({ title, excerpt, category, date, image, slug }) => {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white group hover:shadow-lg transition-shadow flex flex-col h-full">
      
      {/* Image Section */}
      <div className="p-0">
        <div className="relative overflow-hidden h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4 bg-[#33A1E0] rounded-full text-white px-3 py-1 text-sm font-medium drop-shadow-2xl">
            {category}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-semibold mb-3 text-[#626262] text-card-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground line-clamp-3 text-[#626262]">{excerpt}</p>
      </div>

      {/* Button Section */}
      <div className="p-6 pt-0 mt-auto flex justify-center">
        <Button02
          label={"Read More"}
          onClick={() => console.log(`Read more about: ${slug}`)}
        />
      </div>
    </div>
  );
};

export default BlogCard;
