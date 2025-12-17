
import { useEffect, useState } from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, Users, Check, ChevronRight, Loader2, MessageCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TourProps } from "@/components/TourCard";
import { supabase } from "@/integrations/supabase/client";
import { getTourImage } from "@/lib/tourImages";

export default function BookingPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [toursData, setToursData] = useState<TourProps[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), 7));
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [selectedApartment, setSelectedApartment] = useState<TourProps | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    specialRequests: ""
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate nights and total price
  const nightsCount = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const totalPrice = selectedApartment ? selectedApartment.price * nightsCount : 0;
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
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
    
    if (!user || !selectedApartment || !startDate) {
      toast.error("Missing required booking information");
      return;
    }

    setIsSubmitting(true);

    try {
      const totalParticipants = parseInt(adults) + parseInt(children);
      const calculatedTotal = selectedApartment.price * totalParticipants;

      const { error } = await supabase
        .from('bookings')
        .insert({
          tour_id: selectedApartment.id,
          user_id: user.id,
          booking_date: format(startDate, 'yyyy-MM-dd'),
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
      const totalParticipantsDisplay = parseInt(adults) + parseInt(children);
      const whatsappMessage = encodeURIComponent(
        `🏝️ *New Tour Booking Request*\n\n` +
        `*Tour:* ${selectedApartment.name}\n` +
        `*Date:* ${format(startDate, 'EEEE, MMMM d, yyyy')}\n` +
        `*Participants:* ${totalParticipantsDisplay}\n` +
        `*Total Price:* $${calculatedTotal}\n\n` +
        `*Guest Details:*\n` +
        `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || 'Not provided'}\n` +
        `${formData.specialRequests ? `Special Requests: ${formData.specialRequests}` : ''}\n\n` +
        `Please confirm my booking. Thank you!`
      );
      
      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/255715333801?text=${whatsappMessage}`, '_blank');
      
      toast.success("Booking saved! Complete payment via WhatsApp.");
      setIsBookingConfirmed(true);
      
      // Reset form after booking is confirmed
      setTimeout(() => {
        setCurrentStep(1);
        setSelectedApartment(null);
        setStartDate(new Date());
        setEndDate(addDays(new Date(), 7));
        setAdults("2");
        setChildren("0");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zipCode: "",
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

  // Show loading while checking auth
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
                Choose your adventure and reserve your spot in just a few steps.
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute bottom-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>
        
        {/* Booking Steps */}
        <section className="container py-8">
          <div className="relative animate-fade-in [animation-delay:200ms]">
            <div className="flex justify-between items-center mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
                      currentStep >= step
                        ? "bg-primary text-white"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-medium",
                      currentStep >= step
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step === 1 ? "Choose Tour" : step === 2 ? "Your Details" : "Confirmation"}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Progress line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted z-0">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Step 1: Choose Room */}
          {currentStep === 1 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                {/* Date and Guests Selection */}
                <div className="glass-card p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Select Tour Date & Participants</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Tour Date */}
                    <div className="space-y-2">
                      <label htmlFor="tour-date" className="block text-sm font-medium">
                        Tour Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="tour-date"
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    {/* Number of Participants */}
                    <div className="space-y-2">
                      <label htmlFor="adults" className="block text-sm font-medium">
                        Adults
                      </label>
                      <Select value={adults} onValueChange={setAdults}>
                        <SelectTrigger id="adults" className="w-full">
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
                    
                    {/* Children */}
                    <div className="space-y-2">
                      <label htmlFor="children" className="block text-sm font-medium">
                        Children
                      </label>
                      <Select value={children} onValueChange={setChildren}>
                        <SelectTrigger id="children" className="w-full">
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
                
                {/* Tours Selection */}
                <h2 className="text-xl font-semibold mb-4">Select Your Tour</h2>
                <div className="space-y-6">
                  {toursData.map((apartment) => (
                    <div 
                      key={apartment.id}
                      className={cn(
                        "border rounded-xl overflow-hidden transition-all flex flex-col md:flex-row",
                        selectedApartment?.id === apartment.id 
                          ? "border-primary shadow-md" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <img 
                          src={getTourImage(apartment.image_url)} 
                          alt={apartment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{apartment.name}</h3>
                          <p className="text-muted-foreground mb-4">{apartment.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="text-sm bg-muted px-3 py-1 rounded-full">
                              {apartment.max_participants} Max Participants
                            </div>
                            <div className="text-sm bg-muted px-3 py-1 rounded-full">
                              {apartment.duration_hours} hours
                            </div>
                            <div className="text-sm bg-muted px-3 py-1 rounded-full">
                              {apartment.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div>
                            <span className="text-xl font-bold">${apartment.price}</span>
                            <span className="text-muted-foreground text-sm"> / person</span>
                          </div>
                          <Button 
                            variant={selectedApartment?.id === apartment.id ? "default" : "outline"}
                            className={selectedApartment?.id === apartment.id ? "btn-primary" : ""}
                            onClick={() => setSelectedApartment(apartment)}
                          >
                            {selectedApartment?.id === apartment.id ? (
                              <>
                                <Check className="mr-2 h-4 w-4" />
                                Selected
                              </>
                            ) : (
                              "Select"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-end mt-8">
                  <Button 
                    className="btn-primary"
                    disabled={!selectedApartment}
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Guest Details */}
          {currentStep === 2 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Guest Information Form */}
                  <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
                    <form className="space-y-6">
                      <div className="glass-card p-6 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              name="firstName" 
                              value={formData.firstName} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
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
                            <Label htmlFor="email">Email</Label>
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
                            <Label htmlFor="phone">Phone</Label>
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
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            required 
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="city" 
                              value={formData.city} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input 
                              id="zipCode" 
                              name="zipCode" 
                              value={formData.zipCode} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Input 
                              id="country" 
                              name="country" 
                              value={formData.country} 
                              onChange={handleInputChange} 
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="specialRequests">Special Requests</Label>
                          <textarea 
                            id="specialRequests" 
                            name="specialRequests" 
                            value={formData.specialRequests} 
                            onChange={handleInputChange}
                            className="w-full h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Any special requests or notes for your stay"
                          />
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                      <div className="glass-card p-6">
                        <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                          <MessageCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-200">Pay via WhatsApp</h4>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                              After submitting your booking, you'll be redirected to WhatsApp to confirm your reservation and arrange payment securely with our team.
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  
                  {/* Booking Summary */}
                  <div className="md:col-span-1">
                    <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                    <div className="glass-card p-6 sticky top-24">
                      {selectedApartment && (
                        <>
                          <div className="pb-4 border-b">
                            <h3 className="font-medium mb-1">{selectedApartment.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedApartment.location}</p>
                          </div>
                          
                          <div className="py-4 border-b space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Check-in</span>
                              <span className="font-medium">
                                {startDate ? format(startDate, "EEE, MMM d, yyyy") : "Not selected"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Check-out</span>
                              <span className="font-medium">
                                {endDate ? format(endDate, "EEE, MMM d, yyyy") : "Not selected"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Guests</span>
                              <span className="font-medium">
                                {adults} {parseInt(adults) === 1 ? "Adult" : "Adults"}
                                {parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? "Child" : "Children"}`}
                              </span>
                            </div>
                          </div>
                          
                          <div className="py-4 border-b space-y-2">
                            <div className="flex justify-between items-center">
                              <span>
                                ${selectedApartment.price} x {nightsCount} {nightsCount === 1 ? "night" : "nights"}
                              </span>
                              <span className="font-medium">${selectedApartment.price * nightsCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Cleaning fee</span>
                              <span className="font-medium">$50</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Service fee</span>
                              <span className="font-medium">$30</span>
                            </div>
                          </div>
                          
                          <div className="pt-4">
                            <div className="flex justify-between items-center font-bold">
                              <span>Total</span>
                              <span>${totalPrice + 50 + 30}</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </Button>
                  <Button 
                    className="btn-primary"
                    onClick={() => setCurrentStep(3)}
                  >
                    Review & Confirm <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <div className="animate-fade-in [animation-delay:300ms]">
              <div className="max-w-4xl mx-auto">
                {!isBookingConfirmed ? (
                  <>
                    <h2 className="text-xl font-semibold mb-6">Review Booking Details</h2>
                    
                    <div className="glass-card p-6 mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Apartment Details */}
                        <div>
                          <h3 className="text-lg font-medium mb-4">Accommodation Details</h3>
                          {selectedApartment && (
                            <div className="space-y-4">
                              <div className="rounded-lg overflow-hidden">
                                <img 
                                  src={getTourImage(selectedApartment.image_url)} 
                                  alt={selectedApartment.name}
                                  className="w-full h-48 object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold">{selectedApartment.name}</h4>
                                <p className="text-sm text-muted-foreground">{selectedApartment.location}</p>
                              </div>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span>Check-in:</span>
                                  <span className="font-medium">
                                    {startDate ? format(startDate, "EEE, MMM d, yyyy") : "Not selected"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Check-out:</span>
                                  <span className="font-medium">
                                    {endDate ? format(endDate, "EEE, MMM d, yyyy") : "Not selected"}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Guests:</span>
                                  <span className="font-medium">
                                    {adults} {parseInt(adults) === 1 ? "Adult" : "Adults"}
                                    {parseInt(children) > 0 && `, ${children} ${parseInt(children) === 1 ? "Child" : "Children"}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Guest Details */}
                        <div>
                          <h3 className="text-lg font-medium mb-4">Guest Details</h3>
                          <div className="space-y-4">
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Name:</span>
                                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Email:</span>
                                <span className="font-medium">{formData.email}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Phone:</span>
                                <span className="font-medium">{formData.phone}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Address:</span>
                                <span className="font-medium">{formData.address}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>City:</span>
                                <span className="font-medium">{formData.city}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Country:</span>
                                <span className="font-medium">{formData.country}</span>
                              </div>
                            </div>
                            
                            {formData.specialRequests && (
                              <div>
                                <h4 className="font-medium mb-1">Special Requests:</h4>
                                <p className="text-sm text-muted-foreground">{formData.specialRequests}</p>
                              </div>
                            )}
                            
                            <div>
                              <h4 className="font-medium mb-1">Payment Method:</h4>
                              <p className="text-sm flex items-center">
                                <MessageCircle className="h-4 w-4 mr-2 text-green-600" />
                                Pay via WhatsApp
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price Summary */}
                    <div className="glass-card p-6 mb-8">
                      <h3 className="text-lg font-medium mb-4">Price Summary</h3>
                      <div className="space-y-2">
                        {selectedApartment && (
                          <>
                            <div className="flex justify-between items-center">
                              <span>
                                ${selectedApartment.price} x {nightsCount} {nightsCount === 1 ? "night" : "nights"}
                              </span>
                              <span className="font-medium">${selectedApartment.price * nightsCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Cleaning fee</span>
                              <span className="font-medium">$50</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Service fee</span>
                              <span className="font-medium">$30</span>
                            </div>
                            <div className="flex justify-between items-center pt-4 border-t mt-4">
                              <span className="font-semibold">Total</span>
                              <span className="font-bold text-xl">${totalPrice + 50 + 30}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div className="mb-8">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 mr-3"
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                          I agree to the <a href="#" className="text-primary underline">Terms and Conditions</a> and <a href="#" className="text-primary underline">Privacy Policy</a>. I understand that my booking is subject to the property's cancellation policy.
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                      >
                        Back
                      </Button>
                      <Button 
                        className="btn-primary"
                        onClick={handleSubmitBooking}
                        disabled={isSubmitting}
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
                    </div>
                  </>
                ) : (
                  <div className="glass-card p-8 text-center animate-fade-in">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mb-6">
                      Your reservation has been successfully confirmed. A confirmation email has been sent to {formData.email}.
                    </p>
                    <p className="font-medium mb-8">
                      Booking Reference: <span className="text-primary">MRS-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                    </p>
                    <Button asChild className="btn-primary">
                      <Link to="/">Return to Homepage</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
