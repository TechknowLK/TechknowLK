import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/AboutUs/HeroSection'
import OurStorySection from '../components/AboutUs/OurStorySection'
import VMSection from '../components/AboutUs/VMSection'
import OtherSection1 from '../components/AboutUs/OtherSection1'
import Footer from '../components/Footer'
import TeamSection from '../components/AboutUs/TeamSection'
import SEOHead from '../components/SEOHead'

export const AboutUs = () => {
  return (
   <div className='relative w-full bg-[#F5F5F5]'>
       <SEOHead 
        title="About TechKnow Lanka - Leading Technology Solutions Provider in Sri Lanka"
        description="Learn about TechKnow Lanka's mission, vision, and expert team. We're dedicated to transforming businesses through innovative technology solutions and digital transformation services."
        keywords="about TechKnow Lanka, technology company Sri Lanka, tech team, mission vision, digital transformation experts, technology consulting team"
        url="https://techknowlanka.com/about"
      />
       <HeroSection/>
       <OurStorySection/>
       <VMSection/>
       <OtherSection1/>
       <TeamSection/>
    </div>
  )
}
