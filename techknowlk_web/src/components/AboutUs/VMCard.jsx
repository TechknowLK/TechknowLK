import React from 'react'

export default function VMCard({ title, icon, text, titleColor = '#33A1E0' }) {
    return (
        <div className='p-2 w-full  rounded-lg '>
            <div className='flex  items-center justify-start gap-4 '>
                <div className='flex items-center justify-start p-2 rounded-lg'>
                    <div className='w-15 h-15 bg-[#33A1E0] shadow-[0_0_35px_rgba(0,0,0,0.25)] shadow-cyan-500/50 grid justify-center items-center rounded-lg'>
                        <img src={icon} alt={`${title} icon`} className='w-10 h-10' />
                    </div>
                </div>
                <div className='flex w-full items-center justify-start'>
                    <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-sm">
                        <span className="text-white">{title.split(' ')[0]} </span>
                        <span className="text-[#33A1E0]">{title.split(' ')[1]}</span>
                    </h1>
                </div>
            </div>
            <div className='w-full py-4 '>
                <p className='text-white text-lg'>{text}</p>            
                </div>

        </div>
    )
}
