import React from "react";
import {
  Cpu,
  AppWindow,
  Cog,
  Headphones,
} from "lucide-react";
import ServiceCard from "./ServiceCard";
import Button01 from "../Button01";

export default function ServiceSection() {
  return (
    <>
      <div className="w-full relative bg-[#F5F5F5] justify-center text-center  overflow-hidden py-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm">
          <span className="text-[#626262]">Our </span>
          <span className="text-[#33A1E0]">Services</span>
        </h1>

        <p className="text-xl mt-6 text-muted-foreground max-w-2xl mx-auto text-[#626262]">
          Comprehensive technology solutions designed to transform your business
          operations and drive growth.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 
            px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mx-auto mb-12"
        >
          <ServiceCard
            title="Electrical & Networking"
            description="Professional electrical installations, network infrastructure setup, and maintenance services to ensure seamless connectivity."
            icon={<Cpu size={42} color="white" />}
            bulletPoints={[
             "Electrical Installations",
              "Network Setup",
              "Maintenance Services",
            ]}
          />

          <ServiceCard
            title="Software Solutions"
            description="Custom software development, web applications, and digital transformation solutions tailored to your business needs."
            icon={<AppWindow size={42} color="white" />}
            bulletPoints={[
              "Custom Development",
              "Web Applications",
              "Digital Solutions",
            ]}
          />

          <ServiceCard
            title="IoT & Automation"
            description="Smart IoT implementations and automation systems that optimize operations and enhance efficiency across industries."
            icon={<Cog size={42} color="white" />}
            bulletPoints={[
              "Smart Devices",
              "Process Automation",
              "IoT Integration",
            ]}
          />

          <ServiceCard
            title="IT Support & Consulting"
            description="24/7 technical support, IT consulting, and strategic technology planning to keep your business running smoothly."
            icon={<Headphones size={42} color="white" />}
            bulletPoints={[
              "24/7 Support",
              "IT Consulting",
              "Strategic Planning",
            ]}
          />
        </div>

        <p className="text-xl mt-6 text-muted-foreground max-w-2xl mx-auto text-[#626262] px-8">
          Ready to transform your business with our comprehensive solutions?
        </p>
        <div className="flex justify-center mt-6  ">
          <Button01 label={"Get Started"} />
        </div>
      </div>
    </>
  );
}

