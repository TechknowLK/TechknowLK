// import React from 'react'
import MemberCard from './MemberCard'

import supunImg from "/assets/Img/TeamImages/Supun.png";
import ravishkaImg from "/assets/Img/TeamImages/Ravishka.png";
import vihangaImg from "/assets/Img/TeamImages/Vihanga.png";
import lakshanImg from "/assets/Img/TeamImages/Lakshan.png";
import kushanImg from "/assets/Img/TeamImages/Kushan.png";  
import IsuruImg from "/assets/Img/TeamImages/Isuru.png";
import LalithImg from "/assets/Img/TeamImages/Lalith.png";
import NandanaImg from "/assets/Img/TeamImages/Nandana.png";
import TeamCarousel from './TeamCarousel';
import DirectorCarousel from './DirectorCarousel';



export default function TeamSection() {

    const directors = [
        {
            id: 1,
            name: "Isuru Savindya",
            role: "Chief Technology Officer",
            experience: "5+ years in IoT and Embedded Systems",
            description:
                "Leading innovative projects and driving strategic growth at Techknow Lanka.",
            image: IsuruImg,
            bgColor: "#6790a8",
        },
        {
            id: 2,
            name: "Lalith Pathmakumara",
            role: "Chief Executive Officer",
            experience: "35+ years administrative and managerial experience",
            description:
                "Steering the company's vision and fostering a culture of excellence.",
            image: LalithImg,
            bgColor: "#6790a8",
        },
        {
            id: 3,
            name: "Nandana Athauda",
            role: "Chief Financial Officer",
            experience: "20+ years in corporate finance and investments",
            description:
                "Ensures fiscal excellence and strategic allocation of resources.",
            image: NandanaImg,
            bgColor: "#6790a8",
        },
    ];


    const members = [
        {
            id: 1,
            name: "Supun Sulakshana",
            role: "Software Engineer",
            experience: "4+ years in Software Engineering",
            description:
                "Passionate about IoT, crafting smart solutions that connect devices and enhance lives.",
            image: supunImg,
            bgColor: "#33A1E0",
        },
        {
            id: 2,
            name: "Vihanga Fernando",
            role: "Software Engineer",
            experience: "4+ years in Software Engineering",
            description:
                "Specializes in backend development, creating robust APIs and efficient server-side solutions.",
            image: vihangaImg,
            bgColor: "#33A1E0",
        },
        {
            id: 3,
            name: "Ravishka Indraji",
            role: "Software Engineer",
            experience: "4+ years in Software Engineering ",
            description:
                "Expert in full-stack development, creating dynamic web applications with a focus on performance and usability.",
            image: ravishkaImg,
            bgColor: "#33A1E0",
        },
        {
            id: 4,
            name: "Lakshan Maduranga",
            role: "Software Engineer",
            experience: "4+ years in IoT and Embedded Systems",
            description:
                "Focused on modern web apps, building smooth, scalable user experiences with React and Node.js.",
            image: lakshanImg,
            bgColor: "#33A1E0",
        },
        {
            id: 4,
            name: "Kushan Thiwanka",
            role: "Marketing Engineer",
            experience: "+5 years in Digital Marketing",
            description:
                "Specializes in SEO, content marketing, and social media strategies to boost brand visibility and engagement.",
            image: kushanImg,
            bgColor: "#33A1E0",
        },

    ];


    return (
        <div className='w-full relative flex flex-col py-16'>
            <div className='w-full p-4 flex flex-col items-center '>
                <h1 className="text-3xl px-4 md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm">
                    <span className="text-[#626262]">Leadership </span>
                    <span className="text-[#33A1E0]">Team</span>
                </h1>
                <p className='text-base lg:text-lg text-[#626262]'>Meet the visionary leaders driving innovation and excellence at Techknow Lanka.</p>

                <div className="w-full mt-10 md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 hidden">
                    {directors.map((director) => (
                        <MemberCard
                            key={director.id}
                            name={director.name}
                            role={director.role}
                            experience={director.experience}
                            description={director.description}
                            image={director.image}
                            bgColor={director.bgColor}
                        />
                    ))}

                    {members.map((member) => (
                        <MemberCard
                            key={member.id}
                            name={member.name}
                            role={member.role}
                            experience={member.experience}
                            description={member.description}
                            image={member.image}
                            bgColor={member.bgColor}
                        />
                    ))}
                </div>


                <div className='w-full lg:hidden md:hidden '>
                    <DirectorCarousel directors={directors} />
                </div>

                <div className='w-full mt-5 md:hidden lg:hidden py-5'>
                    <TeamCarousel members={members} />
                </div>
            </div>
        </div>
    )
}
