import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Heart, Anchor, Fish, Waves } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import founderImage from "@/assets/founder-hero.jpg";
import aboutHeroImage from "@/assets/about-hero.jpg";
import whaleSharkImage from "@/assets/about-whale-shark.jpg";
import beachImage from "@/assets/about-beach.jpg";
import lighthouseImage from "@/assets/about-lighthouse.jpg";
import swimmingImage from "@/assets/about-swimming.jpg";

export default function About() {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: t.about.values.passion.title,
      description: t.about.values.passion.description
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: t.about.values.expertise.title,
      description: t.about.values.expertise.description
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: t.about.values.sustainable.title,
      description: t.about.values.sustainable.description
    },
    {
      icon: <Anchor className="h-8 w-8 text-primary" />,
      title: t.about.values.safety.title,
      description: t.about.values.safety.description
    }
  ];

  const experiences = [
    {
      icon: <Fish className="h-6 w-6" />,
      title: t.about.whyMafia.experiences.whaleShark.title,
      description: t.about.whyMafia.experiences.whaleShark.description
    },
    {
      icon: <Waves className="h-6 w-6" />,
      title: t.about.whyMafia.experiences.diving.title,
      description: t.about.whyMafia.experiences.diving.description
    },
    {
      icon: <Anchor className="h-6 w-6" />,
      title: t.about.whyMafia.experiences.dhow.title,
      description: t.about.whyMafia.experiences.dhow.description
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
                  {t.about.hero.badge}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
                  {t.about.hero.title}
                </h1>
                <p className="text-base md:text-lg text-white/90">
                  {t.about.hero.subtitle}
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
                  {t.about.founder.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-2">
                  {t.about.founder.name}
                </h2>
                <p className="text-lg text-primary font-medium mb-6">{t.about.founder.nickname}</p>
                <blockquote className="relative pl-6 border-l-4 border-primary mb-6">
                  <p className="text-xl md:text-2xl italic text-foreground/90 leading-relaxed">
                    "{t.about.founder.quote}"
                  </p>
                </blockquote>
                <p className="text-muted-foreground mb-4">
                  {t.about.founder.bio1}
                </p>
                <p className="text-muted-foreground">
                  {t.about.founder.bio2}
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
                  {t.about.story.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  {t.about.story.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t.about.story.paragraph1}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t.about.story.paragraph2}
                </p>
                <p className="text-muted-foreground">
                  {t.about.story.paragraph3}
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
                {t.about.values.subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                {t.about.values.title}
              </h2>
              <p className="text-muted-foreground">
                {t.about.values.description}
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
                  {t.about.whyMafia.subtitle}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                  {t.about.whyMafia.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t.about.whyMafia.paragraph1}
                </p>
                <p className="text-muted-foreground mb-6">
                  {t.about.whyMafia.paragraph2}
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
                {t.about.cta.title}
              </h2>
              <p className="text-muted-foreground mb-8">
                {t.about.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="btn-primary min-w-[200px]">
                  <Link to="/tours">{t.about.cta.exploreTours}</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-w-[200px]">
                  <Link to="/contact">{t.about.cta.contactUs}</Link>
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
