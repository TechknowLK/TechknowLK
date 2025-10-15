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
    <div className="relative  overflow-hidden rounded-2xl shadow-lg flex-grow" ref={emblaRef}>
      <div className="flex w-full h-full ">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative h-full  w-full flex-[0_0_100%] sm:flex-[0_0_100%] lg:flex-[0_0_100%] transition-all ease-in-out duration-700"
          >
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full h-full  object-cover brightness-90 hover:brightness-100 transition-all duration-500"
            />
            {/* Auto fade shade overlay */}
            <div className="absolute w-full h-full inset-0 bg-black/20 pointer-events-none"></div>
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
