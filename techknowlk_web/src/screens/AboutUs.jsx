import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/AboutUs/HeroSection'
import OurStorySection from '../components/AboutUs/OurStorySection'
import VMSection from '../components/AboutUs/VMSection'
import OtherSection1 from '../components/AboutUs/OtherSection1'
import Footer from '../components/Footer'

export const AboutUs = () => {
  return (
   <div className='relative w-full bg-[#F5F5F5]'>
       <NavBar/>
       <HeroSection/>
       <OurStorySection/>
       <VMSection/>
       <OtherSection1/>
       <Footer/>
    </div>
  )
}
