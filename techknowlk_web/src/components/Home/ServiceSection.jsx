import React from "react";
import {
  Cpu,
  AppWindow,
  Cog,
  Headphones,
} from "lucide-react";
import ServiceCard from "./ServiceCard";
import Button01 from "../Button01";
import { useNavigate } from "react-router-dom";



export default function ServiceSection() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full relative overflow-hidden py-20"
        style={{
          background: "linear-gradient(180deg, #f0f6fb 0%, #e8f3fa 50%, #f5f5f5 100%)",
        }}
      >
        {/* Decorative background blobs */}
        <div
          className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(51,161,224,0.08) 0%, transparent 70%)",
            transform: "translate(-30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(1,42,67,0.06) 0%, transparent 70%)",
            transform: "translate(30%, 30%)",
          }}
        />

        {/* Section header */}
        <div className="relative text-center px-4">
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(51,161,224,0.1)",
              border: "1px solid rgba(51,161,224,0.25)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#33A1E0]" />
            <span className="text-[#33A1E0] text-sm font-semibold tracking-widest uppercase">What We Offer</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[#33A1E0]" />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#626262]">Our </span>
            <span
              style={{
                background: "linear-gradient(135deg, #33A1E0, #1e7ab8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h1>

          {/* Underline accent */}
          <div className="flex justify-center mt-3 mb-6">
            <div
              className="h-1 w-16 rounded-full"
              style={{
                background: "linear-gradient(90deg, #33A1E0, #012A43)",
              }}
            />
          </div>

          <p className="text-base md:text-lg text-[#4a6a7c] max-w-2xl mx-auto leading-relaxed">
            Comprehensive technology solutions designed to transform your business
            operations and drive growth.
          </p>
        </div>

        {/* Cards grid */}
        <div className="relative mt-14 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6
            px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mx-auto mb-14"
        >
          <ServiceCard
            index={0}
            title="Electrical & Networking"
            description="Professional electrical installations, network infrastructure setup, and maintenance services to ensure seamless connectivity."
            icon={<Cpu size={32} color="white" />}
            bulletPoints={[
             "Electrical Installations",
              "Network Setup",
              "Maintenance Services",
            ]}
          />

          <ServiceCard
            index={1}
            title="Software Solutions"
            description="Custom software development, web applications, and digital transformation solutions tailored to your business needs."
            icon={<AppWindow size={32} color="white" />}
            bulletPoints={[
              "Custom Development",
              "Web Applications",
              "Digital Solutions",
            ]}
          />

          <ServiceCard
            index={2}
            title="IoT & Automation"
            description="Smart IoT implementations and automation systems that optimize operations and enhance efficiency across industries."
            icon={<Cog size={32} color="white" />}
            bulletPoints={[
              "Smart Devices",
              "Process Automation",
              "IoT Integration",
            ]}
          />

          <ServiceCard
            index={3}
            title="IT Support & Consulting"
            description="24/7 technical support, IT consulting, and strategic technology planning to keep your business running smoothly."
            icon={<Headphones size={32} color="white" />}
            bulletPoints={[
              "24/7 Support",
              "IT Consulting",
              "Strategic Planning",
            ]}
          />
        </div>

        {/* Bottom CTA */}
        <div className="relative text-center px-4">
          <p className="text-base md:text-lg text-[#4a6a7c] max-w-xl mx-auto mb-6">
            Ready to transform your business with our comprehensive solutions?
          </p>
          <div className="flex justify-center">
            <Button01 label={"Get Started"} onClick={() => navigate("/services")} />
          </div>
        </div>
      </div>
    </>
  );
}

