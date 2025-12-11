
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// Import gallery images
import galleryBeach1 from "@/assets/gallery/gallery-beach-1.jpg";
import galleryBeach2 from "@/assets/gallery/gallery-beach-2.jpg";
import galleryBeach3 from "@/assets/gallery/gallery-beach-3.jpg";
import galleryBeach4 from "@/assets/gallery/gallery-beach-4.jpg";
import galleryTours1 from "@/assets/gallery/gallery-tours-1.jpg";
import galleryTours2 from "@/assets/gallery/gallery-tours-2.jpg";
import galleryTours3 from "@/assets/gallery/gallery-tours-3.jpg";
import galleryTours4 from "@/assets/gallery/gallery-tours-4.jpg";
import galleryBoats1 from "@/assets/gallery/gallery-boats-1.jpg";
import galleryBoats2 from "@/assets/gallery/gallery-boats-2.jpg";
import gallerySnorkeling1 from "@/assets/gallery/gallery-snorkeling-1.jpg";
import galleryFood1 from "@/assets/gallery/gallery-food-1.jpg";
import galleryFood2 from "@/assets/gallery/gallery-food-2.jpg";

// Gallery images with categories
const galleryImages = [
  {
    id: 1,
    src: galleryBeach1,
    alt: "Beautiful beach walk on Mafia Island",
    category: "beach"
  },
  {
    id: 2,
    src: galleryTours1,
    alt: "Tour group gathering on the beach",
    category: "tours"
  },
  {
    id: 3,
    src: galleryTours2,
    alt: "Island exploration through nature trails",
    category: "tours"
  },
  {
    id: 4,
    src: galleryBeach2,
    alt: "Dancing on the beach with local guides",
    category: "beach"
  },
  {
    id: 5,
    src: galleryTours3,
    alt: "Tour briefing with guests",
    category: "tours"
  },
  {
    id: 6,
    src: galleryTours4,
    alt: "Guide explaining tour details",
    category: "tours"
  },
  {
    id: 7,
    src: galleryBoats1,
    alt: "Boarding the tour boat",
    category: "boats"
  },
  {
    id: 8,
    src: galleryBoats2,
    alt: "Traditional dhow boat excursion",
    category: "boats"
  },
  {
    id: 9,
    src: galleryBeach3,
    alt: "Happy guests after snorkeling adventure",
    category: "beach"
  },
  {
    id: 10,
    src: gallerySnorkeling1,
    alt: "Snorkeling in crystal clear lagoon",
    category: "snorkeling"
  },
  {
    id: 11,
    src: galleryBeach4,
    alt: "Relaxing on the sandbank with shade",
    category: "beach"
  },
  {
    id: 12,
    src: galleryFood1,
    alt: "Fresh grilled fish with tropical fruits",
    category: "food"
  },
  {
    id: 13,
    src: galleryFood2,
    alt: "Tropical fruit platter with fresh coconut",
    category: "food"
  },
];

const categories = ["all", "beach", "tours", "boats", "snorkeling", "food"];

export default function Gallery() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [activeFilter, setActiveFilter] = useState("all");
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Filter gallery images by category
  const filterGallery = (category: string) => {
    setActiveFilter(category);
    
    if (category === "all") {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === category));
    }
  };
  
  // Handle lightbox navigation
  const navigateGallery = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex].id);
  };
  
  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowLeft") {
        navigateGallery("prev");
      } else if (e.key === "ArrowRight") {
        navigateGallery("next");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, filteredImages]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "all": return t.gallery.filters.all;
      case "beach": return "Beach";
      case "tours": return "Tours";
      case "boats": return "Boats";
      case "snorkeling": return "Snorkeling";
      case "food": return "Food";
      default: return category;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.gallery.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.gallery.subtitle}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Gallery Filters */}
        <section className="py-8">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => filterGallery(category)}
                  className={cn(
                    "px-6 py-2 rounded-full transition-all capitalize",
                    activeFilter === category
                      ? "bg-primary text-white shadow-lg"
                      : "bg-card hover:bg-muted"
                  )}
                >
                  {getCategoryLabel(category)}
                </button>
              ))}
            </div>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setSelectedImage(image.id)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
            <button 
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => navigateGallery("prev")}
            >
              <span className="sr-only">Previous</span>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="max-w-5xl max-h-[80vh] overflow-hidden">
              {filteredImages.find(img => img.id === selectedImage) && (
                <img 
                  src={filteredImages.find(img => img.id === selectedImage)?.src} 
                  alt={filteredImages.find(img => img.id === selectedImage)?.alt}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              )}
            </div>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => navigateGallery("next")}
            >
              <span className="sr-only">Next</span>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
