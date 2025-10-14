import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import MemberCard from "./MemberCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";

const TeamCarousel = ({ members }) => {



    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
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
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
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
        <div className="relative w-full ">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex py-5 gap-5  ">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] "
                        >
                            <MemberCard
                                name={member.name}
                                role={member.role}
                                experience={member.experience}
                                description={member.description}
                                image={member.image}
                                bgColor={member.bgColor}
                            />

                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                variant="outline"
                size="icon"
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white rounded-full p-2 transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <button
                variant="outline"
                size="icon"
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/60 text-white rounded-full p-2 transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots Navigation */}
            <div className="mt-8 flex justify-center gap-2">
                {members.map((_, index) => (
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

export default TeamCarousel;