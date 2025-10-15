import React from 'react'
import Button01 from './Button01'
import logo from "/assets/Img/logo.png";

import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Twitter } from 'lucide-react';

import { PhoneCall } from 'lucide-react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';

import { useNavigate } from 'react-router-dom';


export default function Footer() {
    const navigate = useNavigate();

    return (
        <section className="w-full bg-gradient-to-r from-[#012A43] to-[#033d5f] py-8 px-6">
            <div className="w-full ">

                {/* Company Info */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-start'>
                    <div className='flex flex-row gap-3 items-center'>
                        <div className="hidden md:flex w-17 h-17 bg-[#F5F5F5] rounded-full items-center justify-center hover:shadow-lg hover:shadow-cyan-500/50">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-16 h-16 rounded-full"
                            />
                        </div>
                        <div>
                            <h1 className="text-[#F5F5F5] text-2xl font-bold">
                                TECHKNOW LANKA ENGINEERS
                            </h1>
                            <p className="text-[#a9abad] text-lg">Pvt (Ltd)</p>
                        </div>
                    </div>

                    <div className=' flex flex-col items-center justify-center md:items-end md:justify-end lg:me-10 mt-4 md:mt-0'>
                        <Button01 label="Subscribe to Newsletter" onClick={() => window.location.href = '/contact'} />
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10'>
                    <div className='flex flex-col items-center'>
                        <p className='text-[#a9abad] text-md'>Empowering businesses across Sri Lanka with innovative IT, IoT, and automation solutions for over a decade.</p>
                        <div className="w-full flex  justify-center md:justify-start gap-8 mt-8">
                            <Facebook className="w-6 h-6 text-[#a9abad] cursor-pointer hover:scale-110 transition-transform"  onClick={() => (window.location.href = "https://www.facebook.com/share/16M8QTiZDD/")} />
                            <Instagram className="w-6 h-6 text-[#a9abad] cursor-pointer hover:scale-110 transition-transform" onClick={() => (window.location.href = "https://www.instagram.com/tech_knowlk?igsh=dnN6ODRjOTl5a3dn")} />
                            <Linkedin className="w-6 h-6 text-[#a9abad] cursor-pointer hover:scale-110 transition-transform" />
                            <Twitter className="w-6 h-6 text-[#a9abad] cursor-pointer hover:scale-110 transition-transform" />
                        </div>
                    </div>

                    <div className='flex flex-col items-start md:items-center '>
                        <div className='flex flex-col items-start  md:px-4 '>
                            <h2 className="text-white text-lg font-bold mb-2">Service</h2>
                            <ul className="text-[#a9abad] text-sm">
                                <li className="mb-1 text-base">Electrical & Networking</li>
                                <li className="mb-1 text-base">Software Solutions</li>
                                <li className="mb-1 text-base">IoT & Automation</li>
                                <li className="mb-1 text-base">IT Consultation</li>
                            </ul>
                        </div>

                    </div>
                    <div className='flex flex-col items-start  md:items-center '>
                        <div className='flex flex-col items-start md:px-4'>
                            <h2 className="text-white text-lg font-bold mb-2">Contact</h2>
                            <ul className="text-[#a9abad] text-sm space-y-2">
                                <li className="flex items-center gap-2 text-base">
                                    <Mail className="w-5 h-5 text-[#a9abad]" />
                                    <span>techknowlkinfo@gmail.com</span>
                                </li>
                                <li className="flex items-center gap-2 text-base">
                                    <PhoneCall className="w-5 h-5 text-[#a9abad]" />
                                    <span>+94 771336735 / +94 719707674</span>
                                </li>
                                <li className="flex items-center gap-2 text-base">
                                    <MapPin className="w-5 h-5 text-[#a9abad]" />
                                    <span>E 22/5 Ampe kotiyakumbura.</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="border-t border-[#33A1E0]/30 mt-8 mb-4"></div>

                {/* Footer Links or Tagline (optional) */}
                <div className="mt-4 md:mt-0 w-full flex justify-center">
                    <p className="text-[#a9abad] text-sm">
                        © {new Date().getFullYear()} Techknow Lanka Engineers. All Rights Reserved.
                    </p>
                </div>
            </div>
        </section>
    )
}
