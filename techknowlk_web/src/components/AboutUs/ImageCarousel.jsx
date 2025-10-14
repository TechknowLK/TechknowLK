import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const ImageCarousel = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      skipSnaps: false,
      speed: 5, // smooth sliding
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })] // auto-slide every 3s
  );

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg" ref={emblaRef}>
      <div className="flex">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] transition-all duration-700"
          >
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full h-80 object-cover brightness-90 hover:brightness-100 transition-all duration-500"
            />
            {/* Auto fade shade overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Optional buttons (can remove if you want purely auto) */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition-all"
      >
        ‹
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 transition-all"
      >
        ›
      </button>
    </div>
  );
};

export default ImageCarousel;
