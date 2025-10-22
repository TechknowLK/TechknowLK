import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/Home/HeroSection'
import ServiceSection from '../components/Home/ServiceSection'
import WhyChoose from '../components/Home/WhyChooseUsSection'
import Testimonials from '../components/Home/TestimonialsSection'
import StartProject from '../components/Home/StartProjectSection'
import Footer from '../components/Footer'
import NotFound from './NotfoundPage'
import SEOHead from '../components/SEOHead'

export const Home = () => {
  return (
    <div className='relative w-full'>
      <SEOHead 
        title="TechKnow Lanka - Smart Technology Solutions | IoT, Software & Digital Transformation" 
        description="Transform your business with TechKnow Lanka's cutting-edge technology solutions. Specializing in IoT, software development, networking, and digital transformation services in Sri Lanka."
        keywords="TechKnow Lanka, technology solutions, IoT, software development, networking, digital transformation, smart solutions, automation, tech consulting,mobile solutions, CCTV solutions, Sri Lanka"
        url="https://techknowlanka.com"
      />
      
       <HeroSection/>
       <ServiceSection/>
       <WhyChoose/>
       <StartProject/>
       <Testimonials/>
       
    </div>
  )
}
