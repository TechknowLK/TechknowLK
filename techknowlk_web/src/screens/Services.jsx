import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/Services/HeroSection'
import ServiceSection from '../components/Services/ServiceSection'
import Footer from '../components/Footer'

export default function Services() {
  return (
    <div className='relative w-full bg-[#F5F5F5]'>
        <HeroSection/>
        <ServiceSection/>
    </div>
  )
}
