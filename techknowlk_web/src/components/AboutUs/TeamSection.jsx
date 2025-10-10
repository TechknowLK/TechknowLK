import React from 'react'
import MemberCard from './MemberCard'

import supunImg from "../../assets/img/TeamImages/Supun.png";
import ravishkaImg from "../../assets/img/TeamImages/Ravishka.png";
import vihangaImg from "../../assets/img/TeamImages/Vihanga.png";
import IsuruImg from "../../assets/img/TeamImages/Isuru.png";

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
                            experience="4+ years in Software Development"
                            description="Crafts responsive, high-performance user interfaces with a focus on accessibility and seamless user experience."
                            image={supunImg}
                            bgColor="#33A1E0"
                        />
                    {/* Team Member 2 */}
                        <MemberCard
                            name="Vihaga Heshan"
                            role="Backend Developer"
                            experience="4+ years in Software Development"
                            description="Specializes in building robust server-side applications and APIs."
                            image={vihangaImg}
                            bgColor="#33A1E0"
                        />

                    {/* Team Member 3 */}
                        <MemberCard
                            name="Ravishka Indraji"
                            role="Fullstack Developer"
                            experience="4+ years in Software Development"
                            description="Expert in both frontend and backend development, delivering end-to-end solutions."
                            image={ravishkaImg}
                            bgColor="#33A1E0"
                        />
                        <MemberCard
                            name="Lakshan Vlogs"
                            role="Frontend Developer"
                            experience="4+ years in Software Development"
                            description="Expert in both frontend and backend development, delivering end-to-end solutions."
                            image={vihangaImg}
                            bgColor="#33A1E0"
                        />


                        <MemberCard
                            name="Isuru Savindya"
                            role="Director (Technical)"
                            experience="5+ years in Electronic and Networking"
                            description="Leads the technical vision and strategy, ensuring cutting-edge solutions."
                            image={IsuruImg}
                            bgColor="#33A1E0"
                        />

                        <MemberCard
                            name="Lalith Pathmakumara"
                            role="Director (Human Resources)"
                            experience="25+ years in Human Resource Management"
                            description="Oversees talent acquisition and employee development, fostering a positive workplace culture."
                            image={vihangaImg}
                            bgColor="#33A1E0"
                        />

                        <MemberCard
                            name="Nandana Athauda"
                            role="Director (Accounting)"
                            experience="25+ years in Accounting and Finance"
                            description="Manages financial planning, reporting, and compliance to drive organizational success."
                            image={vihangaImg}
                            bgColor="#33A1E0"
                        />

                </div>
            </div>
        </div>
    )
}
