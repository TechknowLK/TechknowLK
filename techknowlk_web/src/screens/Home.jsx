import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/Home/HeroSection'
import ServiceSection from '../components/Home/ServiceSection'
import WhyChoose from '../components/Home/WhyChooseUsSection'
import Testimonials from '../components/Home/TestimonialsSection'
import StartProject from '../components/Home/StartProjectSection'
import Footer from '../components/Footer'

export const Home = () => {
  return (
    <div className='relative w-full'>
       <NavBar/>
       <HeroSection/>
       <ServiceSection/>
       <WhyChoose/>
       <StartProject/>
       <Testimonials/>
       <Footer/>
    </div>
  )
}
