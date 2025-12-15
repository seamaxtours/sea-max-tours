import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GoogleReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

const allReviews: GoogleReview[] = [
  {
    id: "1",
    name: "Willbree",
    rating: 5,
    comment: "Excellent experience! The whale shark tour was absolutely incredible. Max B and his team are professional, friendly, and really know how to make the experience memorable. Highly recommend Sea Max Tours for anyone visiting Mafia Island!",
    timeAgo: "a week ago"
  },
  {
    id: "2",
    name: "Alina",
    rating: 5,
    comment: "We had an amazing time with Sea Max Tours. The snorkeling trip was beautiful and well organized. The crew was very helpful and made sure everyone was safe and having fun. Will definitely come back!",
    timeAgo: "2 weeks ago"
  },
  {
    id: "3",
    name: "Jake Langley",
    rating: 5,
    comment: "Best tour company on Mafia Island! We did the Chole Bay experience and it exceeded all expectations. Great food, beautiful locations, and the team really cares about conservation. Thank you Max!",
    timeAgo: "3 weeks ago"
  },
  {
    id: "4",
    name: "Wangi",
    rating: 5,
    comment: "Incredible whale shark experience! The guides were knowledgeable and respectful of the marine life. They took amazing photos for us. A must-do activity when visiting Mafia Island.",
    timeAgo: "a month ago"
  },
  {
    id: "5",
    name: "Melina Spitz",
    rating: 5,
    comment: "Amazing sunset dhow cruise! The food was delicious and the views were breathtaking. Max and his team are wonderful hosts. Such an authentic Mafia Island experience.",
    timeAgo: "a month ago"
  },
  {
    id: "6",
    name: "Heleen Vos",
    rating: 5,
    comment: "Perfect day trip! The sandbank picnic was like being in paradise. Crystal clear water, delicious seafood, and excellent service. Sea Max Tours made our holiday unforgettable.",
    timeAgo: "2 months ago"
  },
  {
    id: "7",
    name: "Marco Benedetti",
    rating: 5,
    comment: "Fantastica esperienza! The diving adventure was top notch. Beautiful coral reefs and amazing marine life. The equipment was in great condition and the dive master was very experienced.",
    timeAgo: "2 months ago"
  },
  {
    id: "8",
    name: "Sarah Chen",
    rating: 5,
    comment: "The turtle hatching experience was magical! Seeing baby turtles make their way to the ocean was truly emotional. Max's team is passionate about conservation and it shows.",
    timeAgo: "3 months ago"
  },
  {
    id: "9",
    name: "Thomas Müller",
    rating: 5,
    comment: "We booked the Trip to North and it was fantastic. Visited the lighthouse, had delicious lunch at Kanga Beach, and even spotted hippos! Great value for money.",
    timeAgo: "3 months ago"
  },
  {
    id: "10",
    name: "Emma Wilson",
    rating: 5,
    comment: "The cultural village tour gave us real insight into local life on Mafia Island. Max is so knowledgeable about the history and traditions. Highly recommended for anyone wanting an authentic experience.",
    timeAgo: "4 months ago"
  },
  {
    id: "11",
    name: "Yuki Tanaka",
    rating: 5,
    comment: "Swimming with whale sharks was a dream come true! The team was very professional and made sure we had a safe and respectful encounter with these gentle giants. Unforgettable!",
    timeAgo: "4 months ago"
  },
  {
    id: "12",
    name: "Pierre Dubois",
    rating: 4,
    comment: "Great snorkeling tour with beautiful coral gardens. The only reason for 4 stars is the weather wasn't perfect, but that's not something they can control! Would definitely book again.",
    timeAgo: "5 months ago"
  }
];

export default function Reviews() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-muted text-muted"
        }`}
      />
    ));
  };

  const averageRating = (allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto animate-fade-in">
              <span className="text-sm text-primary font-medium uppercase tracking-wider">
                Customer Reviews
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                What Our Guests Say
              </h1>
              
              {/* Rating Summary */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold">{averageRating}</span>
                  <div className="flex flex-col items-start">
                    <div className="flex gap-0.5">
                      {renderStars(5)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Based on {allReviews.length} reviews
                    </span>
                  </div>
                </div>
                
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <a 
                    href="https://www.google.com/search?q=Sea+Max+Tours+Reviews" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    View on Google
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
              
              <p className="text-muted-foreground">
                Read authentic reviews from travelers who have experienced our tours on Mafia Island
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allReviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="animate-fade-in hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {review.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{review.name}</h4>
                        <div className="flex gap-1 mt-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <svg className="h-6 w-6 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {review.comment}
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      {review.timeAgo}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
