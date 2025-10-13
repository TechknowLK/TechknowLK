import React from 'react'
import Button01 from '../Button01'
import Button02 from '../Button02'

export default function OtherSection1() {
    return (
        <div className='relative w-full flex items-center justify-center  px-20 py-6 my-20 ' data-aos="fade-up" data-aos-anchor-placement="start-start">

            <div className='w-full h-[300px] overflow-hidden bg-[#154D71] rounded-lg shadow-md flex flex-col items-center justify-center text-center px-6'>
                <h1 className='text-white text-3xl md:text-4xl lg:text-5xl font-medium mb-3'>
                    Ready to Work with Us?
                </h1>
                <p className='text-white text-md md:text-lg lg:text-xl max-w-3xl'>
                    Join our growing list of satisfied clients and discover how we can transform your business with innovative technology solutions.
                </p>
                <div className='w-full flex justify-center items-center py-4'>
                    <Button01 label="Get in Touch" onClick={() => alert("Clicked!")} />
                    

                </div>

            </div>


        </div>
    )
}
