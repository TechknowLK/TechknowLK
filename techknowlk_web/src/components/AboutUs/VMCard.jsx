import React from 'react'

export default function VMCard({ title, icon, text, titleColor = '#33A1E0' }) {
    return (
        <div className='p-2 w-full h-48  rounded-lg '>
            <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-4 '>
                <div className='flex items-center justify-start'>
                    <div className='w-15 h-15 bg-[#33A1E0] grid justify-center items-center rounded-lg'>
                        <img src={icon} alt={`${title} icon`} className='w-10 h-10' />
                    </div>
                </div>
                <div className='flex w-full items-center justify-start'>
                    <h1 className="text-1xl md:text-2xl lg:text-3xl font-bold leading-tight drop-shadow-sm">
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
