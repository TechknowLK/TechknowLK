import React from "react";
import PropTypes from "prop-types";
import video from "../../assets/Video/Hero.mp4";
import { TypeAnimation } from "react-type-animation";
import Button01 from "../Button01";
import Spline from "@splinetool/react-spline";
import Button02 from "../Button02";
// import { motion } from "framer-motion";

const HeroSection = () => {
  {
    return (
      <div className=" relative min-h-screen ">
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
            <h1 className="text-lg  sm:text-lg md:text-lg lg:text-xl xl:text-2xl  w-full md:w-3/4 ">
              Transforming Businesses with Smart Technology
            </h1>

            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ">
              <div className="h-[80px] sm:h-[100px] md:h-[120px] lg:h-[140px] xl:h-[150px] ">
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
                  style={{ display: "inline-block", whiteSpace: "pre-line" }}
                  repeat={Infinity}
                />
              </div>
            </h1>

            <h4 className="text-lg sm:text-sm md:text-sm lg:text-xl xl:text-2xl  w-full md:w-3/4">
              Partner with Techknow Lanka to revolutionize your business
              operations with cutting-edge technology, seamless automation, and
              innovative IoT solutions.
            </h4>

            <div className="flex flex-row gap-5">
              <Button01 label={"Explore More"} />
            </div>
          </div>

          {/* <div className="w-full h-[400px] ">
          
            <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />

          </div> */}
              {/* 3D Robot Side */}
          <div className="relative w-full h-[500px] animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="absolute inset-0rounded-3xl blur-2xl" />
            <div className="relative h-full rounded-3xl overflow-hidden ">
              <Spline 
                scene="https://prod.spline.design/JeAC1-lPvdoDE8Qj/scene.splinecode"
                className="w-full h-full"
              />
              
       
     
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
