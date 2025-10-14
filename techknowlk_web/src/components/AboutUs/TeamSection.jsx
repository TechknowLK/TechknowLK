// import React from 'react'
import MemberCard from './MemberCard'

import supunImg from "../../assets/img/TeamImages/Supun.png";
import ravishkaImg from "../../assets/img/TeamImages/Ravishka.png";
import vihangaImg from "../../assets/img/TeamImages/Vihanga.png";
import IsuruImg from "../../assets/img/TeamImages/Isuru.png";
import LalithImg from "../../assets/img/TeamImages/Lalith.png";
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
            image: ravishkaImg,
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
                "Focused on modern web apps, building smooth, scalable user experiences with React and Node.js.",
            image: supunImg,
            bgColor: "#33A1E0",
        },
        {
            id: 2,
            name: "Ravishka Perera",
            role: "Software Engineer",
            experience: "4+ years in Software Engineering ",
            description:
                "Designing intuitive and human-centered interfaces that elevate brand experiences.",
            image: ravishkaImg,
            bgColor: "#33A1E0",
        },
        {
            id: 3,
            name: "Vihanga Fernando",
            role: "Software Engineer",
            experience: "4+ years in Software Engineering",
            description:
                "Bridging communication between clients and devs, ensuring timely and quality delivery.",
            image: vihangaImg,
            bgColor: "#33A1E0",
        },
        {
            id: 4,
            name: "Lakshan Maduranga",
            role: "Software Engineer",
            experience: "4+ years in IoT and Embedded Systems",
            description:
                "Designing and optimizing smart electronic solutions for modern industries.",
            image: IsuruImg,
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

                <div className='w-full  '>
                    <DirectorCarousel directors={directors} />
                </div>

                <div className='w-full mt-5  '>
                    <TeamCarousel members={members} />
                </div>
            </div>
        </div>
    )
}
