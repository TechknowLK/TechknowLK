import React from 'react'
import MemberCard from './MemberCard'

import supunImg from "../../assets/img/TeamImages/Supun.png";
import ravishkaImg from "../../assets/img/TeamImages/Ravishka.png";
import vihangaImg from "../../assets/img/TeamImages/Vihanga.png";

export default function TeamSection() {
    return (
        <div className='w-full relative flex flex-col py-16'>
            <div className='w-full p-4 flex flex-col items-center '>
                <h1 className="text-3xl px-4 md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm">
                    <span className="text-[#626262]">Leadership </span>
                    <span className="text-[#33A1E0]">Team</span>
                </h1>
                <p className='text-base lg:text-lg text-[#626262]'>Meet the visionary leaders driving innovation and excellence at Techknow Lanka.</p>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-10 px-10'>
                    {/* Team Member 1 */}
                        <MemberCard
                            name="Supun Sulakshana"
                            role="Frontend Developer"
                            experience="12+ years in Software Development"
                            description="Crafts responsive, high-performance user interfaces with a focus on accessibility and seamless user experience."
                            image={supunImg}
                            bgColor="#33A1E0"
                        />
                    {/* Team Member 2 */}
                        <MemberCard
                            name="Vihaga Heshan"
                            role="Backend Developer"
                            experience="10+ years in Software Development"
                            description="Specializes in building robust server-side applications and APIs."
                            image={ravishkaImg}
                            bgColor="#33A1E0"
                        />

                    {/* Team Member 3 */}
                        <MemberCard
                            name="Ravishka Inderji"
                            role="Fullstack Developer"
                            experience="8+ years in Software Development"
                            description="Expert in both frontend and backend development, delivering end-to-end solutions."
                            image={vihangaImg}
                            bgColor="#33A1E0"
                        />

                </div>
            </div>
        </div>
    )
}
