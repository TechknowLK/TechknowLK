import React from "react";
import {
  Cpu,
  AppWindow,
  Cog,
  HelpingHand,
  Headphones,
  Mic,
  ArrowRight,
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

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 
            px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 mx-auto mb-12"
        >
          <ServiceCard
            title="Electronics & Networking"
            description="Professional network infrastructure, hardware solutions, and system integration for optimal business connectivity."
            icon={<Cpu size={42} color="white" />}
            bulletPoints={[
              "Network Design",
              "Hardware Setup",
              "System Integration",
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
            //    icon={<Mic size={42} color="white" />}
            // icon={<HelpingHand size={42} color="white" />}
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

// import { Cpu, Wifi, Cog, Headphones, ArrowRight } from "lucide-react";
// // import { Button } from "@/components/ui/button";

// const services = [
//   {
//     icon: Cpu,
//     title: "Electronics & Networking",
//     description: "Professional design and support services including network infrastructure solutions.",
//     features: [
//       "Network Design",
//       "Infrastructure Setup",
//       "Security Solutions",
//       "Maintenance & Support"
//     ]
//   },
//   {
//     icon: Wifi,
//     title: "Software Solutions",
//     description: "Custom software development tailored to your business needs.",
//     features: [
//       "Custom Development",
//       "Enterprise Solutions",
//       "Mobile Applications",
//       "Digital Solutions"
//     ]
//   },
//   {
//     icon: Cog,
//     title: "IoT & Automation",
//     description: "Smart IoT implementations and industrial automation systems.",
//     features: [
//       "Smart Devices",
//       "Industrial IoT",
//       "Process Automation",
//       "IoT Integration"
//     ]
//   },
//   {
//     icon: Headphones,
//     title: "IT Support & Consulting",
//     description: "24/7 technical support and strategic IT consulting services.",
//     features: [
//       "24/7 Support",
//       "Technical Consulting",
//       "IT Infrastructure",
//       "Strategic Planning"
//     ]
//   }
// ];

// const Services = () => {
//   return (
//     <section id="services" className="py-20 bg-muted">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
//             Our <span className="text-secondary">Services</span>
//           </h2>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Comprehensive technology solutions designed to transform your business operations and drive growth.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="group bg-[#154D71] rounded-lg p-6 text-white hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-1"
//             >
//               <div className="bg-secondary/20 w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
//                 <service.icon className="w-8 h-8 text-secondary" />
//               </div>
//               <h3 className="text-xl font-bold mb-3">{service.title}</h3>
//               <p className="text-white/70 mb-4 text-sm">{service.description}</p>
//               <ul className="space-y-2 mb-6">
//                 {service.features.map((feature, idx) => (
//                   <li key={idx} className="text-sm text-white/60 flex items-center">
//                     <span className="w-1 h-1 bg-secondary rounded-full mr-2"></span>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//               <button className="text-secondary text-sm font-medium flex items-center group-hover:gap-2 transition-all">
//                 Learn more
//                 <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <p className="text-muted-foreground mb-6">
//             Ready to transform your business with our comprehensive solutions?
//           </p>
//           {/* <Button variant="hero" size="lg">
//             View All Services
//           </Button> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;
