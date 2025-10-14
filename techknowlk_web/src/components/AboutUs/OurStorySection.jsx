import React from 'react'
import ImageCarousel from './ImageCarousel';



export default function OurStorySection() {

    const images = [
        "/assets/Img/aboutusImg1.jpg",
        "/assets/Img/aboutusImg2.webp",

    ];

    return (
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  mt-16  '>
            <div className='w-full'>
                <h1 className="text-3xl px-4 md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-sm" data-aos="fade-right">
                    <span className="text-[#626262]">Our </span>
                    <span className="text-[#33A1E0]">Story</span>
                </h1>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 " data-aos="fade-right">
                        <div className='w-full h-full text-base lg:text-xl text-[#626262]'>

                            Founded in 2020, TechknowLK emerged from a vision to bridge the gap between traditional business operations and cutting-edge technology. Our journey began with a small team of passionate engineers who believed that smart technology could transform businesses of all sizes.<br /><br />

                            Over the years, we've evolved into a multinational technology company, serving clients across industries from smart homes and energy management to manufacturing and healthcare. Our commitment to innovation and excellence has made us a trusted partner for businesses seeking digital transformation.<br /><br />

                            Today, we continue to push boundaries, exploring new frontiers in AI, IoT, and automation while maintaining our core values of integrity, innovation, and client success.
                        </div>
                    </div>
                    <div className="bg-[#626262]  rounded-lg" data-aos="fade-left">
                        <ImageCarousel images={images} />
                    </div>
                </div>
            </div>

        </div>
    )
}
