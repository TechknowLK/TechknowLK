import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ServiceCard({
  title,
  description,
  icon,
  bulletPoints,
  index = 0,
}) {
  const [hovered, setHovered] = useState(false);

  // Staggered animation delay based on card index
  const delayClass = ["delay-0", "delay-75", "delay-150", "delay-300"][index % 4];

  return (
    <div
      className={`group relative flex flex-col h-full rounded-2xl transition-all duration-500 cursor-pointer`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animated gradient border wrapper */}
      <div
        className="absolute inset-0 rounded-2xl transition-all duration-500 z-0"
        style={{
          background: hovered
            ? "linear-gradient(135deg, #33A1E0, #012A43, #33A1E0)"
            : "linear-gradient(135deg, #1e5f87, #154D71)",
          padding: "1.5px",
        }}
      >
        <div className="w-full h-full rounded-2xl bg-[#0d3a57]" />
      </div>

      {/* Card content */}
      <div
        className="relative z-10 flex flex-col h-full rounded-2xl px-6 pt-8 pb-6 overflow-hidden"
        style={{
          background: hovered
            ? "linear-gradient(160deg, #0f4060 0%, #0a2d45 60%, #082338 100%)"
            : "linear-gradient(160deg, #154D71 0%, #0f3a55 60%, #0a2d45 100%)",
          transition: "background 0.5s ease",
        }}
      >
        {/* Subtle background glow blob */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
          style={{
            background: hovered
              ? "radial-gradient(circle, rgba(51,161,224,0.25) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(51,161,224,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Glowing top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-[2px] rounded-full transition-all duration-500"
          style={{
            background: hovered
              ? "linear-gradient(90deg, transparent, #33A1E0, transparent)"
              : "linear-gradient(90deg, transparent, rgba(51,161,224,0.3), transparent)",
            boxShadow: hovered ? "0 0 12px rgba(51,161,224,0.6)" : "none",
          }}
        />

        {/* Icon */}
        <div className="flex flex-col items-center text-center">
          <div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
            style={{
              background: hovered
                ? "linear-gradient(135deg, #33A1E0, #1e7ab8)"
                : "linear-gradient(135deg, #1e7ab8, #154D71)",
              boxShadow: hovered
                ? "0 0 30px rgba(51,161,224,0.5), 0 8px 24px rgba(0,0,0,0.3)"
                : "0 4px 16px rgba(0,0,0,0.3)",
              transform: hovered ? "translateY(-4px) scale(1.08)" : "translateY(0) scale(1)",
            }}
          >
            {/* Icon inner glow ring */}
            <div
              className="absolute inset-0 rounded-2xl transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)",
                opacity: hovered ? 1 : 0.5,
              }}
            />
            <div className="relative z-10 text-white">{icon}</div>
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold mt-5 transition-colors duration-300"
            style={{ color: hovered ? "#7dd3f8" : "#ffffff" }}
          >
            {title}
          </h3>

          {/* Thin divider */}
          <div
            className="w-12 h-[2px] rounded-full mt-3 mb-4 transition-all duration-500"
            style={{
              background: hovered
                ? "#33A1E0"
                : "rgba(51,161,224,0.4)",
              width: hovered ? "3rem" : "2rem",
            }}
          />

          {/* Description */}
          <p
            className="text-sm leading-relaxed text-start transition-colors duration-300"
            style={{ color: hovered ? "#b8d9ed" : "#93c5d8" }}
          >
            {description}
          </p>

          {/* Bullet Points */}
          <div className="mt-5 w-full space-y-2">
            {bulletPoints.map((point, i) => (
              <div key={i} className="flex items-center gap-2 text-start">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    background: hovered ? "#33A1E0" : "rgba(51,161,224,0.6)",
                    boxShadow: hovered ? "0 0 6px rgba(51,161,224,0.8)" : "none",
                  }}
                />
                <span
                  className="text-sm transition-colors duration-300"
                  style={{ color: hovered ? "#d0eaf8" : "#a8cfe0" }}
                >
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Learn More button */}
        <div className="mt-auto pt-6 flex justify-center">
          <button
            className="group/btn flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-lg"
            style={{
              color: hovered ? "#ffffff" : "#33A1E0",
              background: hovered
                ? "rgba(51,161,224,0.2)"
                : "rgba(51,161,224,0.08)",
              border: `1px solid ${hovered ? "rgba(51,161,224,0.5)" : "rgba(51,161,224,0.2)"}`,
            }}
          >
            Learn more
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

