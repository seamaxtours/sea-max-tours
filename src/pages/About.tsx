import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Heart, Anchor, Fish, Waves } from "lucide-react";
import founderImage from "@/assets/founder-hero.jpg";
import aboutHeroImage from "@/assets/about-hero.jpg";
import whaleSharkImage from "@/assets/about-whale-shark.jpg";
import beachImage from "@/assets/about-beach.jpg";
import lighthouseImage from "@/assets/about-lighthouse.jpg";
import swimmingImage from "@/assets/about-swimming.jpg";

export default function About() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Passion for the Ocean",
      description: "Our love for Mafia Island's pristine waters drives everything we do."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Local Expertise",
      description: "Our guides are born and raised on Mafia Island, knowing every secret spot."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Sustainable Tourism",
      description: "We're committed to preserving the island's natural beauty for future generations."
    },
    {
      icon: <Anchor className="h-8 w-8 text-primary" />,
      title: "Safety First",
      description: "All our tours prioritize your safety with professional equipment and trained staff."
    }
  ];

  const experiences = [
    {
      icon: <Fish className="h-6 w-6" />,
      title: "Whale Shark Encounters",
      description: "Swim alongside gentle giants in their natural habitat from October to March."
    },
    {
      icon: <Waves className="h-6 w-6" />,
      title: "World-Class Diving",
      description: "Explore vibrant coral reefs teeming with marine life at pristine dive sites."
    },
    {
      icon: <Anchor className="h-6 w-6" />,
      title: "Traditional Dhow Sailing",
      description: "Experience the island's maritime heritage aboard authentic wooden dhows."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-top"
            style={{
              backgroundImage: `url(${aboutHeroImage})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
          
          <div className="relative h-full flex flex-col justify-end pb-16 px-4">
            <div className="container animate-fade-in">
              <div className="max-w-2xl">
                <span className="inline-block text-xs md:text-sm text-primary-foreground/90 font-medium uppercase tracking-wider mb-2 bg-primary/80 px-3 py-1 rounded-full">
                  Meet The Founder
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  Born on Mafia Island
                </h1>
                <p className="text-base md:text-lg text-white/90">
                  A lifetime of island knowledge, shared with the world
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Spotlight */}
        <section className="section bg-card">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={founderImage}
                    alt="Makame Kombo - Founder of Sea Max Tours" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              
              <div className="animate-fade-in [animation-delay:200ms]">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  The Heart Behind Sea Max Tours
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">
                  Makame Kombo
                </h2>
                <p className="text-lg text-primary font-medium mb-6">Widely known as "Max B"</p>
                <blockquote className="relative pl-6 border-l-4 border-primary mb-6">
                  <p className="text-xl md:text-2xl italic text-foreground/90 leading-relaxed">
                    "Mafia Island isn't just where I work—it's where my heart belongs. Every wave, 
                    every coral reef, every whale shark has been my teacher. Now I want to share 
                    these lessons with the world."
                  </p>
                </blockquote>
                <p className="text-muted-foreground mb-4">
                  Born and raised on Mafia Island, Makame spent his childhood exploring every 
                  hidden cove, learning traditional dhow sailing from his father, and diving into 
                  the crystal-clear waters that would become his life's passion.
                </p>
                <p className="text-muted-foreground">
                  With over 15 years of experience guiding visitors through the island's wonders, 
                  Max B founded Sea Max Tours to share authentic Mafia Island experiences while 
                  preserving the pristine environment he calls home.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  The Sea Max Tours Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  A Lifetime on Mafia Island
                </h2>
                <p className="text-muted-foreground mb-6">
                  Sea Max Tours was born from a simple love story—the love of a local islander for 
                  his home. Our founder grew up on Mafia Island, spending his childhood diving into 
                  crystal-clear lagoons, learning to navigate by the stars aboard traditional dhows, 
                  and discovering secret spots where whale sharks gather each season.
                </p>
                <p className="text-muted-foreground mb-6">
                  What began as casually showing friends the island's hidden gems evolved into something 
                  greater. Visitors kept returning, not just for the pristine beaches and marine life, 
                  but for the authentic connection to Mafia Island that only a true local could provide. 
                  That's when Sea Max Tours was born—a bridge between this untouched paradise and 
                  travelers seeking genuine experiences.
                </p>
                <p className="text-muted-foreground">
                  Today, we're proud to be one of Mafia Island's most trusted tour operators, offering 
                  everything from whale shark encounters to cultural village visits. Every tour is guided 
                  by locals who know these waters, reefs, and communities intimately—because this isn't 
                  just our workplace, it's our home.
                </p>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:200ms]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src={lighthouseImage}
                    alt="Mafia Island landmark" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={swimmingImage}
                    alt="Swimming in crystal clear waters" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section bg-card">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                What Drives Us
              </h2>
              <p className="text-muted-foreground">
                These core principles guide every decision we make and every tour we create
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 rounded-xl animate-fade-in flex flex-col items-center text-center"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="mb-4 p-3 rounded-full bg-primary/10">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Mafia Island */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative animate-fade-in order-2 lg:order-1">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src={beachImage}
                    alt="Mafia Island beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={whaleSharkImage}
                    alt="Marine life" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="animate-fade-in order-1 lg:order-2 [animation-delay:200ms]">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  Why Mafia Island
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Tanzania's Hidden Treasure
                </h2>
                <p className="text-muted-foreground mb-6">
                  While Zanzibar attracts crowds, Mafia Island remains blissfully undiscovered by 
                  mass tourism. This pristine archipelago off Tanzania's southern coast is home to 
                  some of the world's most spectacular marine biodiversity, including the protected 
                  Mafia Island Marine Park.
                </p>
                <p className="text-muted-foreground mb-6">
                  The island's remote location has preserved its authentic charm. Here, you'll find 
                  traditional Swahili villages where dhow building continues as it has for centuries, 
                  ancient baobab trees standing sentinel over pristine beaches, and coral reefs so 
                  vibrant they rival any in the world.
                </p>
                
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-lg bg-primary/10 text-primary">
                        {exp.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-primary/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Explore Mafia Island?
              </h2>
              <p className="text-muted-foreground mb-8">
                Let our experienced local guides show you the magic of this untouched paradise. 
                From whale shark encounters to cultural village tours, we create memories that last a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="btn-primary min-w-[200px]">
                  <Link to="/apartments">Explore Tours</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
