
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingFormWidget from "@/components/BookingFormWidget";
import { MapPin, Phone, Mail, Clock, Send, Check, Instagram, Facebook } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send the form data to a server
    console.log("Form submitted:", formData);
    
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
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
                {t.contact.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                {t.contact.subtitle}
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Quick Booking Section */}
        <section className="section bg-muted/50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">Quick Booking via WhatsApp</h2>
              <p className="text-muted-foreground">
                Send us a booking request directly through WhatsApp for the fastest response!
              </p>
            </div>
            <div className="max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
              <BookingFormWidget />
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="animate-fade-in [animation-delay:100ms]">
                <h2 className="text-2xl font-bold mb-6">{t.contact.getInTouch}</h2>
                
                <div className="glass-card p-6 space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.contact.address}</h3>
                      <p className="text-muted-foreground">
                        61701<br />
                        Kilindoni, Mafia Island<br />
                        Tanzania
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.contact.phone}</h3>
                      <a href="tel:+255715333801" className="text-muted-foreground hover:text-primary transition-colors">
                        +255 715 333 801
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.contact.email}</h3>
                      <a href="mailto:info@seamaxtours.com" className="text-muted-foreground hover:text-primary transition-colors">
                        info@seamaxtours.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t.contact.socialMedia}</h3>
                      <div className="flex gap-4 mt-2">
                        <a 
                          href="https://instagram.com/seamaxtours" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                        <a 
                          href="https://facebook.com/seamaxtours" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Facebook"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                        <a 
                          href="https://tiktok.com/@seamaxtours" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                          aria-label="TikTok"
                        >
                          <SiTiktok className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.04587850144!2d39.67586397910155!3d-7.929452900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185d5f3e9c5f3b7d%3A0x3e4b7e0b5f5c0b8d!2sKilindoni%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1628613152777!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Location Map"
                  />
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="animate-fade-in [animation-delay:300ms]">
                <h2 className="text-2xl font-bold mb-6">{t.contact.sendMessage}</h2>
                
                <div className="glass-card p-6">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t.contact.fullName}</Label>
                          <Input 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe" 
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">{t.contact.email}</Label>
                          <Input 
                            id="email" 
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t.contact.phoneNumber}</Label>
                          <Input 
                            id="phone" 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 234 567 8900" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">{t.contact.subject}</Label>
                          <Input 
                            id="subject" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Reservation Inquiry" 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">{t.contact.message}</Label>
                        <textarea 
                          id="message" 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder={t.contact.howCanWeHelp} 
                          className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background"
                          required 
                        />
                      </div>
                      
                      <Button type="submit" className="w-full btn-primary">
                        <Send className="mr-2 h-4 w-4" />
                        {t.contact.send}
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{t.contact.messageSent}</h3>
                      <p className="text-muted-foreground mb-6">
                        {t.contact.thankYou}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="section bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold mb-4">{t.contact.faq}</h2>
              <p className="text-muted-foreground">
                {t.contact.faqSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in [animation-delay:200ms]">
              {[
                {
                  questionKey: "checkInOut",
                  icon: <Clock className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "parking",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "pets",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "breakfast",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "transfers",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
                {
                  questionKey: "amenities",
                  icon: <MapPin className="h-5 w-5 text-primary" />
                },
              ].map((faq, index) => (
                <div key={index} className="glass-card p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {t.contact.questions[faq.questionKey].question}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.contact.questions[faq.questionKey].answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
