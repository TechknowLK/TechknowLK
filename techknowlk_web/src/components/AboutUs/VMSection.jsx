import React from 'react'
import VMCard from './VMCard'

import VisionIcon from '/assets/Img/vision-icon.png'
import MissionIcon from '/assets/Img/mission-icon.png'


export default function VMSection() {
    return (
        <div className='w-full relative bg-[#DDE0E2] my-16'>
            <div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 '>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='p-6 bg-[#154D71] rounded-lg shadow-md' data-aos="fade-up" data-aos-delay="100">
                        <VMCard
                            title="Our Vision"
                            icon={VisionIcon}
                            text="To be the global leader in smart technology solutions, empowering businesses worldwide to achieve unprecedented efficiency, sustainability, and growth through innovative IoT, AI, and automation technologies."
                        />
                    </div>
                    <div className='p-6 bg-[#154D71] rounded-lg shadow-md' data-aos="fade-up" data-aos-delay="300">
                        <VMCard
                            title="Our Mission"
                            icon={MissionIcon}
                            text="To deliver cutting-edge technology solutions that transform business operations, enhance productivity, and create sustainable value for our clients while fostering innovation and maintaining the highest standards of excellence."
                        />
                    </div>
                </div>


            </div>
        </div>

    )
}
