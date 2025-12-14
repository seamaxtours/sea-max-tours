import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { TourProps } from "@/components/TourCard";

export default function Tours() {
  const { t } = useLanguage();
  const [allTours, setAllTours] = useState<TourProps[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourProps[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [participantsFilter, setParticipantsFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  
  // Fetch tours from database
  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('available', true);
      
      if (error) {
        console.error('Error fetching tours:', error);
      } else if (data) {
        setAllTours(data);
        setFilteredTours(data);
      }
      setLoading(false);
    };

    fetchTours();
  }, []);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = allTours;
    
    // Filter by category
    if (categoryFilter !== "all") {
      result = result.filter(tour => tour.category === categoryFilter);
    }
    
    // Filter by difficulty
    if (difficultyFilter !== "all") {
      result = result.filter(tour => tour.difficulty === difficultyFilter);
    }
    
    // Filter by participants
    if (participantsFilter !== "all") {
      const participants = parseInt(participantsFilter);
      result = result.filter(tour => tour.max_participants >= participants);
    }
    
    setFilteredTours(result);
  }, [categoryFilter, difficultyFilter, participantsFilter, allTours]);
  
  // Get unique categories and difficulties for filters
  const categories = ["all", ...new Set(allTours.map(tour => tour.category).filter(Boolean))];
  const difficulties = ["all", ...new Set(allTours.map(tour => tour.difficulty).filter(Boolean))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-20 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {t.apartments.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.apartments.subtitle}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.apartments.filters.category}
                </label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.apartments.filters.allCategories} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.apartments.filters.allCategories}</SelectItem>
                    {categories.filter(cat => cat !== "all").map(category => (
                      <SelectItem key={category} value={category as string} className="capitalize">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.apartments.filters.difficulty}
                </label>
                <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.apartments.filters.allLevels} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.apartments.filters.allLevels}</SelectItem>
                    {difficulties.filter(diff => diff !== "all").map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty as string} className="capitalize">
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Participants Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.apartments.filters.participants}
                </label>
                <Select value={participantsFilter} onValueChange={setParticipantsFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t.apartments.filters.guests} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.apartments.filters.anyGuests}</SelectItem>
                    <SelectItem value="1">{t.apartments.filters.onePlus}</SelectItem>
                    <SelectItem value="2">{t.apartments.filters.twoPlus}</SelectItem>
                    <SelectItem value="4">{t.apartments.filters.fourPlus}</SelectItem>
                    <SelectItem value="8">{t.apartments.filters.eightPlus}</SelectItem>
                    <SelectItem value="10">{t.apartments.filters.tenPlus}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6 animate-fade-in [animation-delay:200ms]">
              <p className="text-muted-foreground">
                {t.apartments.filters.showing} {filteredTours.length} {t.apartments.filters.of} {allTours.length} {t.apartments.filters.tours}
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setCategoryFilter("all");
                  setDifficultyFilter("all");
                  setParticipantsFilter("all");
                }}
              >
                {t.apartments.filters.resetFilters}
              </Button>
            </div>
          </div>
        </section>
        
        {/* Tours Grid */}
        <section className="section">
          <div className="container">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t.apartments.filters.loading}</p>
              </div>
            ) : filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour, index) => (
                  <div key={tour.id} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                    <TourCard tour={tour} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <h3 className="text-xl font-semibold mb-2">{t.apartments.filters.noMatch}</h3>
                <p className="text-muted-foreground mb-6">{t.apartments.filters.adjustFilters}</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCategoryFilter("all");
                    setDifficultyFilter("all");
                    setParticipantsFilter("all");
                  }}
                >
                  {t.apartments.filters.resetFilters}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}