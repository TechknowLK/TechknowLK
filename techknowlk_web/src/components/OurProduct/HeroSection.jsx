import React from 'react'
import video from "../../assets/Video/Hero.mp4";

export default function HeroSection() {
const bgStyle = {
    backgroundImage:
      "radial-gradient(ellipse at 50% 35%, rgba(52,167,213,0.25) 0%, rgba(52,167,213,0.12) 18%, rgba(1,42,67,0.70) 60%, rgba(1,42,67,0.95) 100%), linear-gradient(180deg, #012A43 0%, #012A43 100%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  // soft vignette to darken corners and add depth
  const vignetteStyle = {
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 100%)",
  };

 

  return (
    <section
      style={bgStyle}
      className="relative w-full h-[520px] flex items-center justify-center text-center px-6 overflow-hidden "
    >
        <video
                  className="absolute top-0 left-0 w-full h-[1000px] object-cover opacity-40"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={video} type="video/mp4" />
                </video>
      {/* vignette layer (darken edges) */}
      <div style={vignetteStyle} className="absolute inset-0 pointer-events-none" />

      {/* content */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-sm">
          <span className="text-white">About </span>
          <span className="text-[#33A1E0]">TechknowLK</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-gray-200/90 font-light leading-relaxed max-w-3xl mx-auto">
          A multinational technology company dedicated to empowering businesses with
          innovative IT solutions, IoT implementations, and smart automation systems.
        </p>
      </div>

      
    </section>
  );
}
