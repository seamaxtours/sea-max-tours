import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Heart, Anchor, Fish, Waves } from "lucide-react";

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
        <section className="relative h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
          
          <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
            <div className="max-w-4xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                About Sea Max Tours
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Your gateway to discovering the untouched paradise of Mafia Island, Tanzania
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in">
                <span className="text-sm text-primary font-medium uppercase tracking-wider">
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  Sharing Mafia Island's Magic
                </h2>
                <p className="text-muted-foreground mb-6">
                  Sea Max Tours was founded by a passionate local who grew up exploring 
                  every corner of Mafia Island. From childhood days swimming in crystal-clear lagoons 
                  to diving the legendary Chole Bay, he lived and breathed this island paradise 
                  his entire life.
                </p>
                <p className="text-muted-foreground mb-6">
                  What started as sharing our favorite spots with visiting friends has grown into a 
                  professional tour operation dedicated to showcasing the very best of Mafia Island. 
                  We believe that authentic experiences come from deep local knowledge, genuine 
                  passion, and a commitment to preserving the natural wonders that make this island 
                  so special.
                </p>
                <p className="text-muted-foreground">
                  Today, Sea Max Tours is recognized as one of the leading tour operators on Mafia 
                  Island, offering everything from thrilling whale shark encounters to peaceful 
                  sandbank picnics, always with a focus on sustainability and unforgettable experiences.
                </p>
              </div>
              
              <div className="relative animate-fade-in [animation-delay:200ms]">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop"
                    alt="Team on beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-2/3 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
                    alt="Diving experience" 
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
                    src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop"
                    alt="Mafia Island beach" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-1/2 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400&h=300&fit=crop"
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
