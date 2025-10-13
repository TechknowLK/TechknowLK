import React from 'react'

import { PhoneCall, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactInfoSection() {


    const contactDetails = [
        {
            icon: <PhoneCall className="w-12 h-12 text-white p-2" />,
            title: "Phone",
            lines: ["+94 77 133 6735 / +94 71 970 7674"],
        },
        {
            icon: <Mail className="w-12 h-12 text-white p-2" />,
            title: "Email",
            lines: ["techknowlkinfo@gmail.com"],
        },
        {
            icon: <MessageCircle className="w-12 h-12 text-white p-2" />,
            title: "WhatsApp",
            lines: ["Chat with us on WhatsApp"],
        },
        {
            icon: <MapPin className="w-12 h-12 text-white p-2" />,
            title: "Address",
            lines: ["E 22 /4 Ampe, kotiyakumbura."],
        },
        {
            icon: <Clock className="w-12 h-12 text-white p-2" />,
            title: "Business Hours",
            lines: ["Mon - Fri: 9:00 AM - 6:00 PM"],
        },
    ];

    return (
        <div className="w-full px-3 flex flex-col justify-start space-y-6">
      <h1 className="text-2xl px-4 md:text-3xl lg:text-3xl font-bold leading-tight drop-shadow-sm ">
        <span className="text-[#626262]">Contact </span>
        <span className="text-[#33A1E0]">Information</span>
      </h1>

      <p className="text-[#626262] px-4">
        Have questions? We're here to help. Reach out to us through any of the channels below.
      </p>

      {contactDetails.map((item, index) => (
        <div
          key={index}
          className="w-full h-28 flex flex-row rounded-2xl border-[0.1px]  border-[#c7c7c7] hover:shadow-cyan-500/30 transition-all duration-200"
        >
          <div className="w-24 flex justify-center items-center flex-col rounded-l-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#33A1E0] flex items-center justify-center">
              {item.icon}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center">
            <h1 className="text-lg font-bold text-[#626262]">{item.title}</h1>
            {item.lines.map((line, i) => (
              <p key={i} className="text-sm md:text-lg text-[#626262]">
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
    )
}
