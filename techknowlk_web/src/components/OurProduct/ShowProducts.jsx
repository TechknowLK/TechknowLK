import React, { useEffect, useState } from "react";
import { ProjectCard } from "./ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";

import { useLocation } from "react-router-dom";


import projectInventory from "/assets/Img/Networking_image.png";
import projectEducation from "/assets/Img/Networking_image.png";
import Button03 from "../Button03";


import interlock_system_01 from "/assets/Img/ProductImages/interlock_system_01.jfif";
import interlock_system_02 from "/assets/Img/ProductImages/interlock_system_02.jfif";
import interlock_system_03 from "/assets/Img/ProductImages/interlock_system_03.jfif";

import loanSystem_01 from "/assets/Img/ProductImages/loan_system_01.jpg";
import loanSystem_02 from "/assets/Img/ProductImages/loan_system_02.jpg";
import loanSystem_03 from "/assets/Img/ProductImages/loan_system_03.jpg";

import homeSystem_01 from "/assets/Img/ProductImages/smart_home_system_03.jfif";
import homeSystem_02 from "/assets/Img/ProductImages/smart_home_system_02.jfif";
import homeSystem_03 from "/assets/Img/ProductImages/smart_home_system_01.jfif";

import cctvSetup01 from "/assets/Img/ProductImages/cctv_setup_01.jfif";
import cctvSetup02 from "/assets/Img/ProductImages/cctv_setup_02.jfif";

import It_Comsultion_01 from "/assets/Img/ProductImages/It_consulting_01.jpg";
import It_Comsultion_02 from "/assets/Img/ProductImages/It_consulting_02.jpg";



const projects = [
  {
    id: 1,
    title: "Interlock Shop System",
    description:
      "Custom ERP solution integrating inventory management, sales tracking, and financial reporting with real-time analytics.",
    images: [interlock_system_01, interlock_system_02, interlock_system_03],
    technologies: ["JavaFX", "Java", "MySQL"],
    category: "Electrical & Networking",
  },
  {
    id: 2,
    title: "Loan Management System",
    description:
      "Smart financial solution for managing money collections, client verifications, and data analysis with automated reporting and insights.",
    images: [loanSystem_01, loanSystem_02, loanSystem_03],
    technologies: ["Java", "MySQL"],
    category: "Software Solutions",
  },
  {
    id: 3,
    title: "Smart Home System",
    description:
      "IoT-based home automation system with remote control, energy management, and security features accessible via mobile app.",
    images: [homeSystem_01, homeSystem_02, homeSystem_03],
    technologies: ["Arduino", "Raspberry Pi", "MQTT"],
    category: "IoT & Automation",
  },
  {
    id: 4,
    title: "Pharmacy Management System",
    description:
      "Comprehensive pharmacy platform for handling prescriptions, inventory, and billing with secure role-based access and real-time stock tracking.",
    images: [projectInventory, projectEducation, projectEducation],
    technologies: ["JavaFX", "Java", "MySQL"],
    category: "Software Solutions",
  },
  {
    id: 5,
    title: "CCTV Surveillance System",
    description:
      "Advanced security solution with monitoring capabilities, threat detection, and real-time alerts.",
    images: [cctvSetup01, cctvSetup02],
    technologies: ["IP Cameras", "NVR", "Networking"],
    category: "Electrical & Networking",
  },
  {
    id: 6,
    title: "E-commerce Platform",
    description:
      "Full-featured online shopping platform with payment gateway integration, inventory sync, and order management.",
    images: [projectInventory, projectEducation, projectEducation],
    technologies: ["Vue.js", "Laravel", "MySQL"],
    category: "Software Solutions",
  },

  {
    id: 7,
    title: "Learning Management System",
    description:
      "Interactive e-learning platform with course management, student tracking, and virtual classroom features.",
    images: [projectInventory, projectEducation, projectEducation],
    technologies: ["Next.js", "Express", "MongoDB"],
    category: "Software Solutions",
  },

  {
    id: 8,
    title: "IT Consulting",
    description:
      "Strategic IT consulting services to optimize infrastructure, enhance cybersecurity, and drive digital transformation for business growth.",
    images: [It_Comsultion_01, It_Comsultion_02],
    technologies: ["IT Strategy", "Cybersecurity", "Cloud Solutions"],
    category: "IT Consulting",
  },
];

const categories = [
  "Electrical & Networking",
  "Software Solutions",
  "IoT & Automation",
  "IT Consulting",
];

const Index = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeButton, setActiveButton] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: "ease-in-out" });
    AOS.refresh();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromURL = params.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
      setActiveButton(categoryFromURL);
    }
  }, [location.search]);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-6" >
        <div className="flex flex-wrap justify-center gap-4">
     
          <Button03
            label="View All Products"
            state={activeButton === "All"}
            onClick={() => {
              setSelectedCategory("All");
              setActiveButton("All");
            }}
          />

      
          {categories.map((category) => (
            <Button03
              key={category}
              label={category}
              state={activeButton === category} 
              onClick={() => {
                setSelectedCategory(category);
                setActiveButton(category);
              }}
            />
          ))}
        </div>
      </section>
      <hr className=" border-gray-300 mb-6 mx-10" />

      <section className="container mx-auto px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                images={project.images}
                technologies={project.technologies}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
