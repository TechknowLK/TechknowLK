import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix for marker icon (Vite compatible)
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
});

export default function MapSection() {
    const position = [7.1353884715720355, 80.2859741562459]; // Kotiyakumbura, Sri Lanka

    return (
        <div className="w-full h-auto">
             <div className="w-full rounded-2xl  h-[450px] bg-[#dee9ee] overflow-hidden">
                <MapContainer
                    center={position}
                    zoom={14}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%" , zIndex:0 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            TechknowLK Engineers <br /> Open: Mon–Fri 9AM–5PM
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
            <div className="w-full h-auto mt-10 ">
                <div className="bg-[#dee9ee]/20 rounded-2xl flex flex-col items-center shadow-lg border border-[#c5e0f2]/50 p-8 text-center transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">

                    {/* Header */}
                    <h1 className="text-2xl font-bold text-[#012A3A] mb-6 tracking-wide">
                        Business Hours
                    </h1>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#012A3A]">
                        {/* Weekdays */}
                        <div className="flex flex-col items-center justify-center border border-[#b8b7b7]/50 hover:border-[#b8b7b7]/100 backdrop-blur-sm rounded-xl py-6 px-4 transition-all">
                            <p className="text-base md:text-lg font-semibold text-[#33A1E0] mb-2">
                                Weekdays
                            </p>
                            <p className="text-sm md:text-base text-gray-700">Mon – Fri</p>
                            <p className="text-sm md:text-base font-medium text-[#012A3A]">
                                9:00 AM – 5:00 PM
                            </p>
                        </div>

                        {/* Weekends */}
                        <div className="flex flex-col items-center justify-center border border-[#b8b7b7]/50 hover:border-[#b8b7b7]/100 backdrop-blur-sm rounded-xl py-6 px-4  transition-all">
                            <p className="text-base md:text-lg font-semibold text-[#33A1E0] mb-2">
                                Weekends
                            </p>
                            <p className="text-sm md:text-base text-gray-700">Saturday – Sunday</p>
                            <p className="text-sm md:text-base font-medium text-[#012A3A]">
                                9:00 AM – 1:00 PM
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-sm md:text-sm text-gray-600 w-full flex flex-row justify-start">
                        <span className="font-semibold text-[#33A1E0]">Note: &nbsp;</span> Closed on public holidays.
                    </p>
                </div>
            </div>


           
        </div>
    );
}
