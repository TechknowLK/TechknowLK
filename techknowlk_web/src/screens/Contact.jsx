import React from 'react'
import HeroSection from '../components/ContactUs/HeroSection'
import SendMessageSection from '../components/ContactUs/SendMessageSection'
import ContactInfoSection from '../components/ContactUs/ContactInfoSection'

export default function Contact() {
  return (
    <div>
        <HeroSection />
        <div className='w-full grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
          <SendMessageSection/>
          <ContactInfoSection/>
        </div>

    </div>
  )
}
