import React from 'react'
import HeroSection from '../components/ContactUs/HeroSection'
import SendMessageSection from '../components/ContactUs/SendMessageSection'
import { Mail, MapPin, Phone } from 'lucide-react'
import ContactInfoCard from '../components/ContactUs/ContactInfoCard'
import MapSection from '../components/ContactUs/MapSection'

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from '../components/SEOHead'

export default function Contact() {

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <div>
       <SEOHead 
        title="Contact TechKnowLK - Get Tech Solutions Quote | Call +94 77 133 6735"
        description="Contact TechKnowLK for technology solutions consultation. Located in Kotiyakumbura, Sri Lanka. Call +94 77 133 6735 or email techknowlkinfo@gmail.com. Free consultation available for IoT, software development and digital transformation projects."
        keywords="contact TechKnowLK, technology solutions Sri Lanka, tech consultation Kotiyakumbura, IoT solutions contact, software development quote, digital transformation consultation, tech company Sri Lanka contact, +94 77 133 6735, techknowlkinfo@gmail.com"
        url="https://techknowlk.com/contact"
      />
      <HeroSection />
      <div className='w-full flex flex-col items-center py-10 '>
        <h1 className="text-2xl px-4 md:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-sm ">
          <span className="text-[#626262]">Contact </span>
          <span className="text-[#33A1E0]">Information</span>
        </h1>
        <div className='w-full px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8  py-10 '>
          <ContactInfoCard
            icon={<Mail className="w-8 h-8 text-[#33A1E0]" />}
            contact="techknowlkinfo@gmail.com"
            info="Send us your queries and we'll respond within 24 hours"
          />
          <ContactInfoCard
            icon={<Phone className="w-8 h-8  text-[#33A1E0]" />}
            contact={`+94 77 133 6735
+94 71 970 7674`}

            info="Available from 9 AM to 5 PM (GMT+5:30)"
          />
          <ContactInfoCard
            icon={<MapPin className="w-8 h-8 text-[#33A1E0]" />}
            contact="E 22/ 4 Ampe, kotiyakumbura."
            info="Visit us for a face-to-face consultation"
          />
        </div>
      </div>



      <div className='w-full grid grid-cols-1 md:grid-cols-2 p-5 md:p-10 gap-10' id="form">
        <SendMessageSection />
        <MapSection />
      </div>

    </div>
  )
}
