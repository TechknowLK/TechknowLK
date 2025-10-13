import React, { useEffect, useState } from "react";
import { ProjectCard } from "./ProductCard";
import AOS from "aos";
import "aos/dist/aos.css";

import projectNetwork from "../../assets/Img/Networking_image.png";
import projectMobile from "../../assets/Img/Networking_image.png";
import projectIot from "../../assets/Img/Networking_image.png";
import projectPharmacy from "../../assets/Img/Networking_image.png";
import projectInventory from "../../assets/Img/Networking_image.png";
import projectCloud from "../../assets/Img/Networking_image.png";
import projectCrm from "../../assets/Img/Networking_image.png";
import projectEcommerce from "../../assets/Img/Networking_image.png";
import projectSecurity from "../../assets/Img/Networking_image.png";
import projectHealthcare from "../../assets/Img/Networking_image.png";
import projectBanking from "../../assets/Img/Networking_image.png";
import projectEducation from "../../assets/Img/Networking_image.png";
import Button03 from "../Button03";

const projects = [
  {
    id: 1,
    title: "Interlock Shop System",
    description:
      "Custom ERP solution integrating inventory management, sales tracking, and financial reporting with real-time analytics.",
    image: projectInventory,
    technologies: ["JavaFX", "Java", "MySQL"],
    category: "Electrical & Networking",
  },
  {
    id: 2,
    title: "Loan Management System",
    description:
      "Custom ERP solution integrating inventory management, sales tracking, and financial reporting with real-time analytics.",
    image: projectBanking,
    technologies: ["PHP", "Java", "MySQL"],
    category: "Software Solutions",
  },
  {
    id: 3,
    title: "Smart Home System",
    description:
      "Custom ERP solution integrating inventory management, sales tracking, and financial reporting with real-time analytics.",
    image: projectIot,
    technologies: ["JavaFX", "Java", "MySQL"],
    category: "IoT & Automation",
  },
  {
    id: 4,
    title: "Pharmacy Management System",
    description:
      "Custom ERP solution integrating inventory management, sales tracking, and financial reporting with real-time analytics.",
    image: projectPharmacy,
    technologies: ["JavaFX", "Java", "MySQL"],
    category: "Software Solutions",
  },
  {
    id: 5,
    title: "Network Infrastructure System",
    description:
      "Advanced networking solution with monitoring capabilities, security protocols, and bandwidth management features.",
    image: projectNetwork,
    technologies: ["Python", "React", "PostgreSQL"],
    category: "Electrical & Networking",
  },
  {
    id: 6,
    title: "Mobile Application Suite",
    description:
      "Comprehensive mobile app development platform with cross-platform compatibility and seamless user experience.",
    image: projectMobile,
    technologies: ["React Native", "Node.js", "MongoDB"],
    category: "Software Solutions",
  },
  {
    id: 7,
    title: "Cloud Infrastructure Platform",
    description:
      "Scalable cloud computing solution with automated deployment, load balancing, and disaster recovery systems.",
    image: projectCloud,
    technologies: ["AWS", "Docker", "Kubernetes"],
    category: "Electrical & Networking",
  },
  {
    id: 8,
    title: "Customer Relationship Management",
    description:
      "Powerful CRM platform with sales pipeline management, customer analytics, and automated marketing campaigns.",
    image: projectCrm,
    technologies: ["Angular", "Spring Boot", "Oracle"],
    category: "Software Solutions",
  },
  {
    id: 9,
    title: "E-commerce Platform",
    description:
      "Full-featured online shopping platform with payment gateway integration, inventory sync, and order management.",
    image: projectEcommerce,
    technologies: ["Vue.js", "Laravel", "MySQL"],
    category: "Software Solutions",
  },
  {
    id: 10,
    title: "Security Monitoring System",
    description:
      "Comprehensive security solution with real-time surveillance, threat detection, and automated alert systems.",
    image: projectSecurity,
    technologies: ["Python", "TensorFlow", "Redis"],
    category: "IoT & Automation",
  },
  {
    id: 11,
    title: "Healthcare Management Platform",
    description:
      "Integrated healthcare system with patient records, appointment scheduling, and medical billing capabilities.",
    image: projectHealthcare,
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "Software Solutions",
  },
  {
    id: 12,
    title: "Learning Management System",
    description:
      "Interactive e-learning platform with course management, student tracking, and virtual classroom features.",
    image: projectEducation,
    technologies: ["Next.js", "Express", "MongoDB"],
    category: "Software Solutions",
  },
];

const categories = [
  "Electrical & Networking",
  "Software Solutions",
  "IoT & Automation",
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeButton, setActiveButton] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 500, once: true, easing: "ease-in-out" });
    AOS.refresh();
  }, []);

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
                image={project.image}
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
