import React from 'react'
import { NavBar } from '../components/NavBar'
import HeroSection from '../components/OurProduct/HeroSection'
import Footer from '../components/Footer'
import ShowProducts from '../components/OurProduct/ShowProducts'
import SEOHead from '../components/SEOHead'

export default function Products() {
  return (
    <div>
        
         <SEOHead 
        title="Smart Technology Products & Solutions | TechKnow Lanka Portfolio"
        description="Explore TechKnow Lanka's innovative technology products including IoT devices, custom software solutions, automation systems, and smart business applications. Discover cutting-edge products designed for modern businesses in Sri Lanka."
        keywords="technology products, IoT devices, smart solutions portfolio, custom software products, automation systems, business technology products, tech products Sri Lanka, innovative solutions, smart devices, digital products TechKnow Lanka"
        url="https://techknowlanka.com/products"
      />
        <HeroSection/>
        <ShowProducts/>
        
    </div>
  )
}
