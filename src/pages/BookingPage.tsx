
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Check, Loader2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TourProps } from "@/components/TourCard";
import { supabase } from "@/integrations/supabase/client";
import { getTourImage } from "@/lib/tourImages";

export default function BookingPage() {
  const [toursData, setToursData] = useState<TourProps[]>([]);
  const [tourDate, setTourDate] = useState<Date | undefined>(new Date());
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedTours, setSelectedTours] = useState<TourProps[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    specialRequests: ""
  });
  
  // Fetch tours from database
  useEffect(() => {
    const fetchTours = async () => {
      const { data } = await supabase
        .from('tours')
        .select('*')
        .eq('available', true);
      
      if (data) {
        setToursData(data);
      }
    };
    fetchTours();
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate total price based on participants
  const totalParticipants = parseInt(adults) + parseInt(children);
  const totalPrice = selectedTours.reduce((sum, tour) => sum + tour.price * totalParticipants, 0);
  
  // Toggle tour selection
  const toggleTourSelection = (tour: TourProps) => {
    setSelectedTours(prev => {
      const isSelected = prev.some(t => t.id === tour.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tour.id);
      } else {
        return [...prev, tour];
      }
    });
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit booking
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedTours.length === 0 || !tourDate) {
      toast.error("Please select at least one tour and a date");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const participants = parseInt(adults) + parseInt(children);

      // Create WhatsApp message with booking details
      const toursList = selectedTours.map(t => `• ${t.name} ($${t.price}/person)`).join('\n');
      const whatsappMessage = encodeURIComponent(
        `🏝️ *New Tour Booking Request*\n\n` +
        `*Tours:*\n${toursList}\n\n` +
        `*Date:* ${format(tourDate, 'EEEE, MMMM d, yyyy')}\n` +
        `*Participants:* ${participants}\n` +
        `*Total Price:* $${totalPrice}\n\n` +
        `*Guest Details:*\n` +
        `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n` +
        `${formData.specialRequests ? `Special Requests: ${formData.specialRequests}` : ''}\n\n` +
        `Please confirm my booking. Thank you!`
      );
      
      window.open(`https://wa.me/255715333801?text=${whatsappMessage}`, '_blank');
      
      toast.success("Redirecting to WhatsApp to complete your booking!");
      setIsBookingConfirmed(true);
      
      setTimeout(() => {
        setSelectedTours([]);
        setTourDate(new Date());
        setAdults("2");
        setChildren("0");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          country: "",
          specialRequests: ""
        });
        setIsBookingConfirmed(false);
      }, 5000);
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Header Section */}
        <section className="relative py-16 bg-gradient-to-r from-sea-light to-white dark:from-sea-dark dark:to-background overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Book Your Tour
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose your adventure and reserve your spot.
              </p>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Booking Form */}
        <section className="container py-8">
          {!isBookingConfirmed ? (
            <form onSubmit={handleSubmitBooking} className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Tour Selection */}
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Select Your Tours</h2>
                    <p className="text-sm text-muted-foreground mb-4">You can select multiple tours for your trip</p>
                    <div className="space-y-4">
                      {toursData.map((tour) => {
                        const isSelected = selectedTours.some(t => t.id === tour.id);
                        return (
                          <div 
                            key={tour.id}
                            className={cn(
                              "border rounded-lg p-4 cursor-pointer transition-all flex gap-4",
                              isSelected 
                                ? "border-primary bg-primary/5" 
                                : "border-border hover:border-primary/50"
                            )}
                            onClick={() => toggleTourSelection(tour)}
                          >
                            <img 
                              src={getTourImage(tour.image_url)} 
                              alt={tour.name}
                              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold">{tour.name}</h3>
                                {isSelected && (
                                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">{tour.description}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <span className="text-sm text-muted-foreground">{tour.duration_hours}h</span>
                                <span className="font-semibold text-primary">${tour.price}/person</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date & Participants */}
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Date & Participants</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Tour Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !tourDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {tourDate ? format(tourDate, "PPP") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={tourDate}
                              onSelect={setTourDate}
                              initialFocus
                              disabled={(date) => date < new Date()}
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Adults</Label>
                        <Select value={adults} onValueChange={setAdults}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Adult" : "Adults"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Children</Label>
                        <Select value={children} onValueChange={setChildren}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 1, 2, 3, 4].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Child" : "Children"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Details</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone *</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select value={formData.country} onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent>
                            {[
                              { name: "Argentina", flag: "🇦🇷" }, { name: "Australia", flag: "🇦🇺" }, { name: "Austria", flag: "🇦🇹" },
                              { name: "Belgium", flag: "🇧🇪" }, { name: "Brazil", flag: "🇧🇷" }, { name: "Canada", flag: "🇨🇦" },
                              { name: "Chile", flag: "🇨🇱" }, { name: "China", flag: "🇨🇳" }, { name: "Colombia", flag: "🇨🇴" },
                              { name: "Czech Republic", flag: "🇨🇿" }, { name: "Denmark", flag: "🇩🇰" }, { name: "Egypt", flag: "🇪🇬" },
                              { name: "Ethiopia", flag: "🇪🇹" }, { name: "Finland", flag: "🇫🇮" }, { name: "France", flag: "🇫🇷" },
                              { name: "Germany", flag: "🇩🇪" }, { name: "Ghana", flag: "🇬🇭" }, { name: "India", flag: "🇮🇳" },
                              { name: "Ireland", flag: "🇮🇪" }, { name: "Israel", flag: "🇮🇱" }, { name: "Italy", flag: "🇮🇹" },
                              { name: "Japan", flag: "🇯🇵" }, { name: "Kenya", flag: "🇰🇪" }, { name: "Malaysia", flag: "🇲🇾" },
                              { name: "Mexico", flag: "🇲🇽" }, { name: "Morocco", flag: "🇲🇦" }, { name: "Netherlands", flag: "🇳🇱" },
                              { name: "New Zealand", flag: "🇳🇿" }, { name: "Nigeria", flag: "🇳🇬" }, { name: "Norway", flag: "🇳🇴" },
                              { name: "Peru", flag: "🇵🇪" }, { name: "Poland", flag: "🇵🇱" }, { name: "Portugal", flag: "🇵🇹" },
                              { name: "Qatar", flag: "🇶🇦" }, { name: "Russia", flag: "🇷🇺" }, { name: "Rwanda", flag: "🇷🇼" },
                              { name: "Saudi Arabia", flag: "🇸🇦" }, { name: "Singapore", flag: "🇸🇬" }, { name: "South Africa", flag: "🇿🇦" },
                              { name: "South Korea", flag: "🇰🇷" }, { name: "Spain", flag: "🇪🇸" }, { name: "Sweden", flag: "🇸🇪" },
                              { name: "Switzerland", flag: "🇨🇭" }, { name: "Tanzania", flag: "🇹🇿" }, { name: "Thailand", flag: "🇹🇭" },
                              { name: "Turkey", flag: "🇹🇷" }, { name: "Uganda", flag: "🇺🇬" }, { name: "United Arab Emirates", flag: "🇦🇪" },
                              { name: "United Kingdom", flag: "🇬🇧" }, { name: "United States", flag: "🇺🇸" }
                            ].map((country) => (
                              <SelectItem key={country.name} value={country.name}>
                                <span className="flex items-center gap-2">
                                  <span>{country.flag}</span>
                                  <span>{country.name}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <textarea 
                          id="specialRequests" 
                          name="specialRequests" 
                          value={formData.specialRequests} 
                          onChange={handleInputChange}
                          className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Any special requests or notes"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="glass-card p-6">
                    <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <MessageCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800 dark:text-green-200">Pay via WhatsApp</h4>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          After submitting, you'll be redirected to WhatsApp to confirm your reservation and arrange payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Summary Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Important Fees Notice */}
                  <div className="glass-card p-6 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
                    <h3 className="text-lg font-semibold mb-3 text-amber-800 dark:text-amber-200">
                      Important Fees
                    </h3>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                      The following fees are paid directly at the location:
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-800 dark:text-amber-200">Marine Park Fee</span>
                        <span className="font-semibold text-amber-900 dark:text-amber-100">$23.60/person</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-amber-800 dark:text-amber-200">Whale Shark Conservation Fee</span>
                        <span className="font-semibold text-amber-900 dark:text-amber-100">$12/person</span>
                      </div>
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
                      * Fees vary depending on activities selected
                    </p>
                  </div>

                  <div className="glass-card p-6 sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                    
                    {selectedTours.length > 0 ? (
                      <>
                        <div className="pb-4 border-b space-y-3">
                          {selectedTours.map((tour) => (
                            <div key={tour.id} className="flex gap-3">
                              <img 
                                src={getTourImage(tour.image_url)} 
                                alt={tour.name}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <h3 className="font-medium text-sm">{tour.name}</h3>
                                <p className="text-xs text-muted-foreground">${tour.price}/person</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="py-4 border-b space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span>Tour Date</span>
                            <span className="font-medium">
                              {tourDate ? format(tourDate, "MMM d, yyyy") : "Not selected"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span>Participants</span>
                            <span className="font-medium">{totalParticipants}</span>
                          </div>
                        </div>
                        
                        <div className="py-4 border-b space-y-1">
                          {selectedTours.map((tour) => (
                            <div key={tour.id} className="flex justify-between items-center text-sm">
                              <span className="truncate mr-2">{tour.name}</span>
                              <span className="font-medium flex-shrink-0">${tour.price * totalParticipants}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-4 mb-6">
                          <div className="flex justify-between items-center font-bold text-lg">
                            <span>Total</span>
                            <span className="text-primary">${totalPrice}</span>
                          </div>
                        </div>

                        <Button 
                          type="submit"
                          className="w-full btn-primary"
                          disabled={isSubmitting || selectedTours.length === 0}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              Confirm Booking <Check className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <p className="text-muted-foreground text-center py-8">
                        Select a tour to see pricing
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="max-w-lg mx-auto glass-card p-8 text-center animate-fade-in">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Booking Submitted!</h2>
              <p className="text-muted-foreground mb-6">
                Please complete your reservation via WhatsApp. We'll confirm your booking shortly.
              </p>
              <Button asChild className="btn-primary">
                <Link to="/">Return to Homepage</Link>
              </Button>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
