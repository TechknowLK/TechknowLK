import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { X, CheckCircle, ExternalLink, Sparkles } from "lucide-react";

const ProjectDetailsModal = ({ project, onClose }) => {
    if (!project) return null;

    // Prevent background scrolling when modal is open
    useEffect(() => {
        // Save the original overflow value
        const originalOverflow = document.body.style.overflow;

        // Disable scrolling on the body
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop with Blur */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md transition-all duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Container */}
            <div
                className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden transform transition-all duration-300 animate-slideUp"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header with Brand Color */}
                <div className="relative bg-[#33A1E0] p-8 text-white">
                    <div className="absolute inset-0 bg-black/5"></div>
                    <div className="relative z-10 flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-5 h-5 text-white/90" />
                                <span className="text-sm font-medium text-white/90 uppercase tracking-wider">{project.category}</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{project.title}</h2>
                            <p className="text-white/90 text-sm md:text-base max-w-2xl">{project.description}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 group flex-shrink-0"
                        >
                            <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-8">

                        {/* Gallery Section */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation]}
                                spaceBetween={0}
                                slidesPerView={1}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: true
                                }}
                                navigation
                                loop={true}
                                className="w-full aspect-video md:aspect-[21/9]"
                            >
                                {project.images?.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img
                                            src={img}
                                            alt={`${project.title} screenshot ${index + 1} `}
                                            className="w-full h-full object-cover"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* System Overview - Takes 2 columns */}
                            <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-1 h-8 bg-[#33A1E0] rounded-full"></div>
                                    <h3 className="text-2xl font-bold text-[#626262]">System Overview</h3>
                                </div>
                                <p className="text-[#626262] leading-relaxed text-base md:text-lg">
                                    {project.overview || project.description}
                                </p>
                            </div>

                            {/* Technologies - Takes 1 column */}
                            <div className=" rounded-2xl p-6 shadow-lg border border-[#33A1E0]/20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-1 h-8 bg-[#33A1E0] rounded-full"></div>
                                    <h3 className="text-xl font-bold text-[#626262]">Tech Stack</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies?.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-white text-[#33A1E0] text-sm font-bold rounded-full border-2 border-[#33A1E0]/30 shadow-sm hover:shadow-md hover:scale-105 hover:border-[#33A1E0] transition-all duration-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1 h-8 bg-[#33A1E0] rounded-full"></div>
                                <h3 className="text-2xl font-bold text-[#626262]">Key Features</h3>
                            </div>

                            {project.features && project.features.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-[#E0F7FA] border border-[#33A1E0]/20 hover:shadow-md hover:scale-[1.02] hover:border-[#33A1E0]/40 transition-all duration-200 group"
                                        >
                                            <CheckCircle className="w-5 h-5 text-[#33A1E0] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                            <span className="text-[#626262] font-medium text-sm leading-relaxed">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-400 italic">Feature list not available.</div>
                            )}
                        </div> 

                        {/* Call to Action */}
                        <div className="flex justify-center md:justify-end pt-4">
                            <button className="group relative px-8 py-4 bg-[#33A1E0] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#33A1E0]/30 transition-all duration-300 hover:scale-105 overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                <div className="relative flex items-center gap-2">
                                    <span>View Live Project</span>
                                    <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </div>
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <style jsx>{`
@keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
}
@keyframes slideUp {
          from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
          to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
        .animate - fadeIn {
    animation: fadeIn 0.2s ease - out;
}
        .animate - slideUp {
    animation: slideUp 0.3s ease - out;
}
`}</style>
        </div>
    );
};

export default ProjectDetailsModal;
