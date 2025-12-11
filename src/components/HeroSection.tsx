
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import heroBeach from "@/assets/hero-beach.jpg";
import heroWhaleShark from "@/assets/hero-whale-shark.jpg";
import heroFood from "@/assets/hero-food.jpg";
import heroBeachPicnic from "@/assets/hero-beach-picnic.jpg";
import heroCoralReef from "@/assets/hero-coral-reef.jpg";
import heroAerialView from "@/assets/hero-aerial-view.jpg";

const heroImages = [
  heroBeach,
  heroWhaleShark,
  heroFood,
  heroBeachPicnic,
  heroCoralReef,
  heroAerialView
];

export default function HeroSection() {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate parallax effect
  const backgroundY = scrollY * 0.5;
  const contentY = scrollY * 0.2;
  
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background images with slideshow */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000"
          )}
          style={{
            opacity: index === currentImageIndex ? 1 : 0,
            transform: `translateY(${backgroundY}px)`
          }}
        >
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center",
              index === currentImageIndex && "animate-zoom"
            )}
            style={{
              backgroundImage: `url(${image})`,
              backgroundPosition: `center ${50 + scrollY * 0.05}%`
            }}
          />
        </div>
      ))}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60" />
      
      {/* Content */}
      <div
        className="relative h-full flex flex-col justify-center items-center text-center px-4"
        style={{ transform: `translateY(${contentY}px)` }}
      >
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-block text-white/90 text-lg mb-4 tracking-wide border-b border-white/30 pb-2">
            {t.hero.subtitle}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="heroSolid" className="min-w-[200px] rounded-full transform transition-all duration-300 hover:translate-y-[-2px]">
              <Link to="/booking">{t.hero.bookStay}</Link>
            </Button>
            <Button asChild variant="hero" size="lg" className="min-w-[200px] rounded-full transform transition-all duration-300 hover:translate-y-[-2px]">
              <Link to="/apartments">{t.hero.exploreApartments}</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a 
          href="#welcome" 
          className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
        >
          <span className="text-sm mb-2">{t.hero.scrollDown}</span>
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
      
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        {/* Wave layer 1 - back */}
        <svg 
          className="absolute bottom-0 w-[200%] h-20 animate-[wave_15s_linear_infinite]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,37.1L40,34.5C80,32,160,27,240,29.6C320,32,400,42,480,42.9C560,44,640,35,720,32.1C800,30,880,34,960,40.8C1040,47,1120,56,1200,56.6C1280,57,1360,48,1400,43.3L1440,39.1L1440,74L1400,74C1360,74,1280,74,1200,74C1120,74,1040,74,960,74C880,74,800,74,720,74C640,74,560,74,480,74C400,74,320,74,240,74C160,74,80,74,40,74L0,74Z"
            className="fill-primary/30"
          />
        </svg>
        
        {/* Wave layer 2 - middle */}
        <svg 
          className="absolute bottom-0 w-[200%] h-24 animate-[wave_10s_linear_infinite_reverse]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,50L48,47.7C96,45,192,40,288,37.2C384,35,480,35,576,38.5C672,42,768,50,864,51.8C960,54,1056,50,1152,45.3C1248,40,1344,35,1392,32.2L1440,30L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"
            className="fill-accent/40"
          />
        </svg>
        
        {/* Wave layer 3 - front */}
        <svg 
          className="absolute bottom-0 w-[200%] h-28 animate-[wave_8s_linear_infinite]"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,42L60,44.3C120,47,240,51,360,49.3C480,47,600,39,720,35.7C840,32,960,32,1080,35C1200,38,1320,44,1380,46.8L1440,50L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
