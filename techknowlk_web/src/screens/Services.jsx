import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/Services/HeroSection'
import ServiceSection from '../components/Services/ServiceSection'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'

export default function Services() {
  return (
    <div className='relative w-full bg-[#F5F5F5]'>
        <SEOHead 
          title="Technology Services - IoT, Software Development & Digital Solutions | TechKnowLK"
          description="Explore TechKnowLK's comprehensive technology services including IoT solutions, custom software development, networking, and digital transformation services for businesses in Sri Lanka."
          keywords="TechKnowLK, technology solutions, IoT, software development, networking, digital transformation, smart solutions, automation, tech consulting,mobile solutions, CCTV solutions, Sri Lanka"
          url="https://techknowlk.com/services"
        />
        <HeroSection/>
        <ServiceSection/>
    </div>
  )
}
