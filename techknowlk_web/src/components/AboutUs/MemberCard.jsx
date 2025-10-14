import React from 'react'



export default function MemberCard({ 
    name, 
    role, 
    experience, 
    description, 
    image, 
    bgColor = "#33A1E0" 
}) {
    return (
        <div className="bg-card rounded-lg h-[400px] shadow-[5px_5px_15px_rgba(0,0,0,0.13)] transition-all duration-1000 hover:scale-105 px-10" data-aos="fade-up" data-aos-anchor-placement="start-center">
            <div className=" h-full flex flex-col items-center mb-4">
                <div
                    className="relative w-30 h-32 shadow shadow-gray-700 mb-2 rounded-2xl overflow-visible flex justify-center items-end mt-10"
                    style={{ backgroundColor: bgColor }}
                >
                    <img
                        src={image}
                        alt={name}
                        className="absolute bottom-0 h-[120%]  object-cover"
                    />
                </div>

                <p className="text-muted-foreground text-sm lg:text-xl font-bold leading-relaxed text-[#626262]">
                    {name}
                </p>
                <p className="text-muted-foreground text-sm lg:text-lg font-semibold leading-relaxed" style={{ color: bgColor }}>
                    {role}
                </p>
                <p className="font-normal mb-6 text-sm text-foreground">{experience}</p>
               <p className="font-normal text-[#626262] text-foreground line-clamp-3">{description}</p>

            </div>

            <div className="flex items-center gap-3">
                {/* Optional area for social links or icons */}
            </div>
        </div>
    );
}
