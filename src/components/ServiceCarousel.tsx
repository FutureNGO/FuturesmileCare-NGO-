import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FlipCard from "./FlipCard";
import "./ServiceCarousel.css";

interface ServiceCarouselProps {
  services: Array<{
    title: string;
    description: string;
    image: string;
  }>;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ services }) => {
const [emblaRef, emblaApi] = useEmblaCarousel({ 
  loop: true, 
  align: "start",
  skipSnaps: false,
  dragFree: false,
  duration: 30,
  slidesToScroll: 1
}); 
const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);

    // Auto-advance carousel every 5 seconds
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);

    return () => {
      clearInterval(interval);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const onPrevClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextClick = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="service-carousel-container">
      <div className="service-carousel-viewport" ref={emblaRef}>
        <div className="service-carousel-content">
          {services.map((service, idx) => (
            <div key={idx} className="service-carousel-slide">
              <FlipCard
                title={service.title}
                description={service.description}
                icon={service.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Controls */}
      <button className="carousel-btn carousel-prev" onClick={onPrevClick} aria-label="Previous">
        <ChevronLeft size={24} />
      </button>
      <button className="carousel-btn carousel-next" onClick={onNextClick} aria-label="Next">
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="carousel-indicators">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot ${index === selectedIndex ? "active" : ""}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
