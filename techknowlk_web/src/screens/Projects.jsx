import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/OurProjects/HeroSection'
import Footer from '../components/Footer'
import ShowProducts from '../components/OurProjects/ShowProducts'
import SEOHead from '../components/SEOHead'

export default function Projects() {
  return (
    <div>
        
         <SEOHead 
        title="Smart Technology Projects & Solutions | TechKnowLK Portfolio"
        description="Explore TechKnowLK's innovative technology projects including IoT devices, custom software solutions, automation systems, and smart business applications. Discover cutting-edge projects designed for modern businesses in Sri Lanka."
        keywords="technology projects, IoT devices, smart solutions portfolio, custom software projects, automation systems, business technology projects, tech projects Sri Lanka, innovative solutions, smart devices, digital projects TechKnowLK"
        url="https://techknowlk.com/projects"
      />
        <HeroSection/>
        <ShowProducts/>
        
    </div>
  )
}
