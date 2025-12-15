import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

interface Tour {
  id: string;
  name: string;
}

const reviewSchema = z.object({
  userName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  tourId: z.string().uuid("Please select a tour"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().trim().min(10, "Review must be at least 10 characters").max(1000, "Review must be less than 1000 characters"),
});

export default function ReviewForm({ onReviewSubmitted }: { onReviewSubmitted?: () => void }) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  const [formData, setFormData] = useState({
    userName: "",
    tourId: "",
    rating: 0,
    comment: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchTours = async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("id, name")
        .eq("available", true)
        .order("name");
      
      if (!error && data) {
        setTours(data);
      }
    };
    
    fetchTours();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const result = reviewSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        user_name: formData.userName.trim(),
        tour_id: formData.tourId,
        rating: formData.rating,
        comment: formData.comment.trim(),
      });

      if (error) throw error;

      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your experience",
      });

      // Reset form
      setFormData({
        userName: "",
        tourId: "",
        rating: 0,
        comment: "",
      });
      
      onReviewSubmitted?.();
    } catch (error: any) {
      toast({
        title: "Error submitting review",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Your Name</Label>
              <Input
                id="userName"
                placeholder="Enter your name"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                maxLength={100}
              />
              {errors.userName && (
                <p className="text-sm text-destructive">{errors.userName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tour">Tour Experienced</Label>
              <Select
                value={formData.tourId}
                onValueChange={(value) => setFormData({ ...formData, tourId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a tour" />
                </SelectTrigger>
                <SelectContent>
                  {tours.map((tour) => (
                    <SelectItem key={tour.id} value={tour.id}>
                      {tour.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tourId && (
                <p className="text-sm text-destructive">{errors.tourId}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Your Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setFormData({ ...formData, rating: star })}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || formData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-destructive">{errors.rating}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with us..."
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              maxLength={1000}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              {errors.comment ? (
                <p className="text-destructive">{errors.comment}</p>
              ) : (
                <span>Minimum 10 characters</span>
              )}
              <span>{formData.comment.length}/1000</span>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
