import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MemberCard from "./MemberCard"; // reusing your existing MemberCard

const DirectorCarousel = ({ directors }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "center",
        loop: true,
        skipSnaps: false,
        slidesToScroll: 1,
    });

    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollTo = useCallback(
        (index) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    const scrollPrev = useCallback(() => {
        emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        emblaApi?.scrollNext();
    }, [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative w-full">
            {/* Carousel container */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {directors.map((director) => (
                        <div
                            key={director.id}
                            className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]  "
                        >
                            <MemberCard
                                name={director.name}
                                role={director.role}
                                experience={director.experience}
                                description={director.description}
                                image={director.image}
                                bgColor={director.bgColor || "#0A84FF"}
                            />

                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white rounded-full p-2 transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white rounded-full p-2 transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="mt-8 flex justify-center gap-2">
                {directors.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default DirectorCarousel;
