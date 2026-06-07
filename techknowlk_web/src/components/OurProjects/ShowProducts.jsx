import React, { useEffect, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import ProjectDetailsModal from "./ProjectDetailsModal";

import projectInventory from "/assets/Img/Networking_image.png";
import projectEducation from "/assets/Img/Networking_image.png";
import Button03 from "../Button03";


import interlock_system_01 from "/assets/Img/ProjectImages/interlock_system_01.jfif";
import interlock_system_02 from "/assets/Img/ProjectImages/interlock_system_02.jfif";
import interlock_system_03 from "/assets/Img/ProjectImages/interlock_system_03.jfif";

import loanSystem_01 from "/assets/Img/ProjectImages/loan_system_01.jpg";
import loanSystem_02 from "/assets/Img/ProjectImages/loan_system_02.jpg";
import loanSystem_03 from "/assets/Img/ProjectImages/loan_system_03.jpg";

import homeSystem_01 from "/assets/Img/ProjectImages/smart_home_system_03.jfif";
import homeSystem_02 from "/assets/Img/ProjectImages/smart_home_system_02.jfif";
import homeSystem_03 from "/assets/Img/ProjectImages/smart_home_system_01.jfif";

import cctvSetup01 from "/assets/Img/ProjectImages/cctv_setup_01.jfif";
import cctvSetup02 from "/assets/Img/ProjectImages/cctv_setup_02.jfif";

import It_Comsultion_01 from "/assets/Img/ProjectImages/It_consulting_01.jpg";
import It_Comsultion_02 from "/assets/Img/ProjectImages/It_consulting_02.jpg";

import PharmacySystem_01 from "/assets/Img/ProjectImages/ph_System_01.jpeg";
import PharmacySystem_02 from "/assets/Img/ProjectImages/ph_System_02.png";
import PharmacySystem_03 from "/assets/Img/ProjectImages/ph_System_03.png";

import tourism_01 from "/assets/Img/ProjectImages/tourism_01.jfif";
import tourism_02 from "/assets/Img/ProjectImages/tourism_02.jfif";
import tourism_03 from "/assets/Img/ProjectImages/tourism_03.jfif";

import arbitem_01 from "/assets/Img/ProjectImages/arbitem_01.png";
import arbitem_02 from "/assets/Img/ProjectImages/arbitem_02.png";

import computer_shop_01 from "/assets/Img/ProjectImages/computer_shop_01.PNG";
import computer_shop_02 from "/assets/Img/ProjectImages/computer_shop_02.PNG";

import lms_01 from "/assets/Img/ProjectImages/lms_01.PNG";
import lms_02 from "/assets/Img/ProjectImages/lms_02.PNG";



// Dynamic projects will be loaded below

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
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching projects:', err);
        setProjects([]);
        setLoading(false);
      });
  }, []);

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
      ? [...projects].sort((a, b) => b.id - a.id)
      : projects.filter((project) => project.category === selectedCategory).sort((a, b) => b.id - a.id);

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-6" >
        <div className="flex flex-wrap justify-center gap-4">

          <Button03
            label="View All Projects"
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
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500">Loading projects...</p>
          </div>
        ) : (
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
                onViewDetails={() => setSelectedProject(project)}
              />
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No projects found in this category.
            </div>
          )}
        </div>
        )}
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default Index;
