import React from "react";
import PropTypes from "prop-types";
import video from "../../assets/Video/Hero.mp4";
import { TypeAnimation } from "react-type-animation";
// import { motion } from "framer-motion";

const HeroSection = () => {
  {
    return (
      <div className=" relative min-h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className=" min-h-screen relative z-10 flex flex-row items-center  justify-between px-5 md:px-14 bg-[#012A43]/50 text-white">
          <div className="flex flex-col gap-5">
            <h1 className="text-xl w-full  md:w-3/4">
              Transforming Businesses with Smart Technology
            </h1>
            <h1 className="text-7xl font-bold">
              <TypeAnimation 
                sequence={[
                  "Smart Solutions \n For every Business.",
                  2000,
                  "Intelligent Systems \n For Growth.",
                  2000,
                  "Connecting Ideas \n with Technology.",
                  2000,
                ]}
                wrapper="span"
                speed={40}
                style={{ height: "150px" , display: "inline-block" , whiteSpace: "pre-line"}}
                repeat={Infinity}
              />
            </h1>

            <h4 className="text-xl  w-full  md:w-3/4">
              Partner with Techknow Lanka to revolutionize your business
              operations with cutting-edge technology, seamless automation, and
              innovative IoT solutions.
            </h4>
          

            <div className="flex flex-row gap-5">
              <button className="w-1/5 bg-[#33A1E0] px-5 py-3 rounded-xl text-lg  hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition duration-500">
                Contact Us 
              </button>
              <button className="w-1/5 bg-transparent border-2 border-white px-5 py-3 rounded-xl text-lg  hover:bg-white hover:text-black hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/50 transition duration-500">
                Learn More
              </button>
            </div>
          </div>
          {/* <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden  lg:flex w-3/4 rounded-fill   justify-center"
        >
       
          <img className="h-140 text-center" src={img} alt="img" />
        </motion.div> */}
        </div>
      </div>
    );
  }
};

export default HeroSection;
