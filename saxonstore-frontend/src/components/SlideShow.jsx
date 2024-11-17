import slideshow1 from "../assets/slideshow1.jpg";
import slideshow2 from "../assets/slideshow2.jpg";
import slideshow3 from "../assets/slideshow3.jpg";
import slideshow4 from "../assets/slideshow4.jpg";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useRef, useEffect, useState } from "react";

function SlideShow() {
  const autoplay = useRef(Autoplay({ delay: 2500, stopOnInteraction: false }));
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [slideshow1, slideshow2, slideshow3, slideshow4];

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      onSelect();
    }
  }, [emblaApi]);

  const handleNext = () => emblaApi && emblaApi.scrollNext();
  const handlePrevious = () => emblaApi && emblaApi.scrollPrev();

  const handleIndicatorClick = (index) => emblaApi && emblaApi.scrollTo(index);

  return (
    <div className="relative w-full">
      <div ref={emblaRef} className="w-full overflow-hidden">
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="relative h-96 flex-[0_0_100%]">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 opacity-50 shadow-md"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white p-2 opacity-50 shadow-md"
      >
        &gt;
      </button>
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleIndicatorClick(index)}
            className={`h-2 w-2 rounded-full ${
              index === selectedIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
