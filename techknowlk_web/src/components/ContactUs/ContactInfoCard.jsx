import React from 'react'

export default function ContactInfoCard({ icon, contact, info }) {
    return (
        <div className="bg-card border border-[#b8b7b7]/50 rounded-2xl px-2 py-8 md:px-8 text-center hover:shadow-xl hover:shadow-primary/20 hover:border-[#33A1E0] transition-all duration-300 hover:-translate-y-1">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl  bg-[#dee9ee]  mb-6">
                {icon}
            </div>
            <h4 className="text-base font-bold mb-3 lg:whitespace-pre-line md:text-lg text-[#626262] overflow-hidden text-ellipsis whitespace-nowrap">
                {contact}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-[#626262]">
                {info}
            </p>
        </div>
    )
}
