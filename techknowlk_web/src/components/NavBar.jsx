import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div className='bg-slate-700 w-full min-h-auto'>
            <div className='w-full flex flex-row items-center justify-between px-[2%] py-4'>
                <div className='w-[40px] h-[40px] bg-yellow-600 rounded-full'>

                </div>
                <div className='w-fit flex flex-row items-center gap-x-10'>
                    <Link to="/" className='text-white font-normal text-[18px]'>Home</Link>
                    <Link to="/about" className='text-white font-normal text-[18px]'>About</Link>
                    <Link to="/" className='text-white font-normal text-[18px]'>Contact</Link>
                    <Link to="/" className='text-white font-normal text-[18px]'>Products</Link>
                </div>
            </div>
        </div>
    )
}
