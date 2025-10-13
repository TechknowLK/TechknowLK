import React from 'react'
import HeroSection from '../components/ContactUs/HeroSection'
import SendMessageSection from '../components/ContactUs/SendMessageSection'
import { Mail, MapPin, Phone } from 'lucide-react'
import ContactInfoCard from '../components/ContactUs/ContactInfoCard'
import MapSection from '../components/ContactUs/MapSection'

export default function Contact() {
  return (
    <div>
      <HeroSection />
      <div className='w-full flex flex-col items-center py-10 '>
        <h1 className="text-2xl px-4 md:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-sm ">
          <span className="text-[#626262]">Contact </span>
          <span className="text-[#33A1E0]">Information</span>
        </h1>
        <div className='w-full px-10 grid grid-cols-1 md:grid-cols-3 gap-8  py-10 '>
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



      <div className='w-full grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <SendMessageSection />
        <MapSection />
      </div>

    </div>
  )
}
