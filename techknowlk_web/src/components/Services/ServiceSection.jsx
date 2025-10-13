import React from "react";
import {
  Network,
  ShieldCheck,
  Wrench,
  Cpu,
  MonitorSmartphone,
  Workflow,
  ServerCog,
} from "lucide-react";

import NetworkinOmage from "../../assets/img/Networking_image.png";
import SoftwareImage from "../../assets/img/Software_image.png";
import IotImage from "../../assets/img/Iot_image.png";
import ConsultingImage from "../../assets/img/Cunsulting_image.png";
import Button01 from "../Button01";


const services = [
  {
    title: "Electrical & Networking",
    description: "Robust electrical and networking solutions to keep your business connected and secure.",
    features: [
      { icon: Network, text: "Network Design & Implementation" },
      { icon: ServerCog, text: "System Integration Services" },
      { icon: ShieldCheck, text: "Security Implementation" },
      { icon: Wrench, text: "Maintenance & Support" },
    ],
    technologies: ["Cisco", "Juniper", "HP Enterprise", "Dell Technologies"],
    image: NetworkinOmage,
  },
  {
    title: "Software Solutions",
    description: "Custom software built to automate and optimize your business processes.",
    features: [
      { icon: Workflow, text: "Custom Application Development" },
      { icon: Cpu, text: "System Integration" },
      { icon: ShieldCheck, text: "Quality Assurance & Security" },
      { icon: Wrench, text: "Ongoing Support & Maintenance" },
    ],
    technologies: ["React", "Node.js", "Java", ".NET"],
    image: SoftwareImage,
  },
  {
    title: "IoT & Automation",
    description: "Smart automation and IoT systems to streamline your operations.",
    features: [
      { icon: Cpu, text: "IoT Device Integration" },
      { icon: Workflow, text: "Automation Systems" },
      { icon: ShieldCheck, text: "Data Security" },
      { icon: Wrench, text: "Predictive Maintenance" },
    ],
    technologies: ["Arduino", "Raspberry Pi", "ESP32", "MQTT"],
    image: IotImage,
  },
  {
    title: "IT Consulting",
    description: "Strategic IT advice and guidance to help your business grow efficiently.",
    features: [
      { icon: MonitorSmartphone, text: "IT Infrastructure Planning" },
      { icon: Workflow, text: "Digital Transformation" },
      { icon: ShieldCheck, text: "Cybersecurity Consulting" },
      { icon: Wrench, text: "Cloud Migration Support" },
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "VMware"],
    image: ConsultingImage,
  },
];

export default function ServiceSection() {
  return (
    <section className="w-full flex flex-col gap-20 px-6 lg:px-16 py-10">
      {services.map((service, index) => {
        const FirstIcon = service.features[0]?.icon;
        const isReversed = index % 2 === 1;

        return (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              isReversed ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Left Content */}
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-row items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#33A1E0] flex items-center justify-center shadow-[0_0_20px_rgba(51,161,224,0.4)]">
                  {FirstIcon && <FirstIcon className="text-white w-6 h-6" />}
                </div>
                <h1 className="text-2xl font-bold text-[#012A43]">{service.title}</h1>
              </div>

              <p className="text-lg text-[#626262]">{service.description}</p>

              <p className="text-lg font-semibold  text-[#012A43]">Key Features:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 ">
                {service.features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <li key={i} className="flex items-center gap-2 text-[#626262] text-base">
                      <Icon className="text-[#33A1E0] w-5 h-5" />
                      {feature.text}
                    </li>
                  );
                })}
              </ul>

              <p className="text-lg font-semibold mt-2 text-[#012A43]">Technologies:</p>
              <div className="flex flex-wrap gap-2 ">
                {service.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-[#DDE0E2] text-[#33A1E0] px-3 py-1 rounded-3xl text-sm font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div>
                <Button01 label="Read More" onClick={() => window.location.href = '/product'} />
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center flex-1 ">
              <img
                src={service.image}
                alt={service.title}
                className="rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.15)] w-full max-w-[500px]"
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
