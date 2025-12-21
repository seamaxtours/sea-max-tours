
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Check, Loader2, MessageCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
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
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [toursData, setToursData] = useState<TourProps[]>([]);
  const [tourDate, setTourDate] = useState<Date | undefined>(new Date());
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedTour, setSelectedTour] = useState<TourProps | null>(null);
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
  const totalPrice = selectedTour ? selectedTour.price * totalParticipants : 0;
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Redirect to auth if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please log in to book a tour");
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Submit booking
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !selectedTour || !tourDate) {
      toast.error("Please select a tour and date");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const participants = parseInt(adults) + parseInt(children);
      const calculatedTotal = selectedTour.price * participants;

      const { error } = await supabase
        .from('bookings')
        .insert({
          tour_id: selectedTour.id,
          user_id: user.id,
          booking_date: format(tourDate, 'yyyy-MM-dd'),
          participants: totalParticipants,
          total_price: calculatedTotal,
          guest_name: `${formData.firstName} ${formData.lastName}`,
          guest_email: formData.email,
          guest_phone: formData.phone || null,
          special_requests: formData.specialRequests || null,
          status: 'pending'
        });

      if (error) throw error;

      // Create WhatsApp message with booking details
      const whatsappMessage = encodeURIComponent(
        `🏝️ *New Tour Booking Request*\n\n` +
        `*Tour:* ${selectedTour.name}\n` +
        `*Date:* ${format(tourDate, 'EEEE, MMMM d, yyyy')}\n` +
        `*Participants:* ${participants}\n` +
        `*Total Price:* $${calculatedTotal}\n\n` +
        `*Guest Details:*\n` +
        `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n` +
        `${formData.specialRequests ? `Special Requests: ${formData.specialRequests}` : ''}\n\n` +
        `Please confirm my booking. Thank you!`
      );
      
      window.open(`https://wa.me/255715333801?text=${whatsappMessage}`, '_blank');
      
      toast.success("Booking saved! Complete payment via WhatsApp.");
      setIsBookingConfirmed(true);
      
      setTimeout(() => {
        setSelectedTour(null);
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
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
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
                    <h2 className="text-xl font-semibold mb-4">Select Your Tour</h2>
                    <div className="space-y-4">
                      {toursData.map((tour) => (
                        <div 
                          key={tour.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all flex gap-4",
                            selectedTour?.id === tour.id 
                              ? "border-primary bg-primary/5" 
                              : "border-border hover:border-primary/50"
                          )}
                          onClick={() => setSelectedTour(tour)}
                        >
                          <img 
                            src={getTourImage(tour.image_url)} 
                            alt={tour.name}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold">{tour.name}</h3>
                              {selectedTour?.id === tour.id && (
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
                      ))}
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
                        <Input 
                          id="country" 
                          name="country" 
                          value={formData.country} 
                          onChange={handleInputChange} 
                        />
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
                <div className="lg:col-span-1">
                  <div className="glass-card p-6 sticky top-24">
                    <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                    
                    {selectedTour ? (
                      <>
                        <div className="pb-4 border-b">
                          <img 
                            src={getTourImage(selectedTour.image_url)} 
                            alt={selectedTour.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-medium">{selectedTour.name}</h3>
                          <p className="text-sm text-muted-foreground">{selectedTour.location}</p>
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
                        
                        <div className="py-4 border-b">
                          <div className="flex justify-between items-center text-sm">
                            <span>${selectedTour.price} x {totalParticipants}</span>
                            <span className="font-medium">${totalPrice}</span>
                          </div>
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
                          disabled={isSubmitting || !selectedTour}
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
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your reservation has been saved. A confirmation email has been sent to {formData.email}.
              </p>
              <p className="font-medium mb-8">
                Booking Reference: <span className="text-primary">MRS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
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
