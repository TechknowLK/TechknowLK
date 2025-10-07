import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/Home/HeroSection'

export const Home = () => {
  return (
    <div className='relative w-full'>
       <NavBar/>
       <HeroSection/>
    </div>
  )
}
