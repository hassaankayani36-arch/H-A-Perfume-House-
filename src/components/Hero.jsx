import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBackgroundOne from "../assets/hero-bg-00.webp";
import heroBackgroundTwo from "../assets/hero-bg-01-clean.webp";

const heroBackgrounds = [heroBackgroundOne, heroBackgroundTwo];

export const Hero = () => {
  const [activeBackground, setActiveBackground] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBackground((current) => (current + 1) % heroBackgrounds.length);
    }, 10000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
      <div className="absolute inset-0 z-0">
        {heroBackgrounds.map((image, index) => (
          <img
            key={image}
            src={image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${activeBackground === index ? "opacity-100" : "opacity-0"}`}
            style={{ filter: "brightness(0.82) contrast(1.05)" }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B]/45 via-[#0B0B0B]/25 to-[#0B0B0B]/75" />
      </div>
      <Link
        to="/collections"
        className="hero-image-text group absolute bottom-8 left-4 z-10 inline-flex items-center gap-5 border border-[#C6A15B]/80 bg-[#0B0B0B]/45 px-5 py-3.5 text-[10px] font-light uppercase tracking-[0.22em] text-[#F5F2EC] backdrop-blur-sm transition-colors hover:border-[#DFC27D] hover:bg-[#0B0B0B]/70 sm:bottom-12 sm:left-8 sm:px-7 sm:py-4 sm:text-xs lg:left-12"
      >
        Discover Our Collection
        <ArrowRight
          className="h-4 w-4 text-[#C6A15B] transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </section>
  );
};
export default Hero;
