import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Send } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number is required").max(20),
  tourType: z.string().min(1, "Please select a tour type"),
  date: z.date({ required_error: "Please select a date" }),
  participants: z.number().min(1, "At least 1 participant required").max(50),
  message: z.string().max(500).optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const tourTypes = [
  "Whale Shark Swimming",
  "Coral Reef Snorkeling",
  "Scuba Diving",
  "Sandbank Picnic",
  "Dhow Sunset Cruise",
  "Cultural Village Tour",
];

export default function BookingFormWidget() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tourType: "",
    participants: 1,
    message: "",
  });
  const [date, setDate] = useState<Date>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    try {
      const validatedData = bookingSchema.parse({
        ...formData,
        date,
        participants: Number(formData.participants),
      });

      // Format WhatsApp message
      const message = `
🌊 *NEW TOUR BOOKING REQUEST* 🌊

📋 *Tour Details:*
Tour Type: ${validatedData.tourType}
Date: ${format(validatedData.date, "PPP")}
Participants: ${validatedData.participants}

👤 *Guest Information:*
Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}

${validatedData.message ? `💬 *Special Requests:*\n${validatedData.message}` : ""}

Please confirm availability for this booking.
      `.trim();

      // WhatsApp business number (without + or spaces)
      const whatsappNumber = "255715333801";
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      toast.success("Redirecting to WhatsApp to complete your booking!");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        tourType: "",
        participants: 1,
        message: "",
      });
      setDate(undefined);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("Please fill in all required fields correctly");
      }
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-bold mb-6">Quick Booking Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
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
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+255 123 456 789"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tourType">Tour Type *</Label>
            <Select
              value={formData.tourType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, tourType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a tour" />
              </SelectTrigger>
              <SelectContent>
                {tourTypes.map((tour) => (
                  <SelectItem key={tour} value={tour}>
                    {tour}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Preferred Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Number of Participants *</Label>
            <Input
              id="participants"
              name="participants"
              type="number"
              min="1"
              max="50"
              value={formData.participants}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Special Requests (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Any special requirements or questions?"
            className="min-h-[100px]"
            maxLength={500}
          />
        </div>

        <Button type="submit" className="w-full btn-primary">
          <Send className="mr-2 h-4 w-4" />
          Send Booking via WhatsApp
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          You'll be redirected to WhatsApp to complete your booking request
        </p>
      </form>
    </div>
  );
}
