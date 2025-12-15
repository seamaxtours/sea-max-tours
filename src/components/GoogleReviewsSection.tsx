import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface GoogleReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  timeAgo: string;
}

const googleReviews: GoogleReview[] = [
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
  }
];

export default function GoogleReviewsSection() {
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

  return (
    <section className="section bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <span className="text-sm text-primary font-medium uppercase tracking-wider">
            Google Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {renderStars(5)}
            </div>
            <span className="text-2xl font-bold">4.1</span>
            <span className="text-muted-foreground">rating on Google</span>
          </div>
          <p className="text-muted-foreground">
            Read authentic reviews from travelers who have experienced our tours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {googleReviews.map((review, index) => (
            <Card
              key={review.id}
              className="animate-fade-in hover:shadow-lg transition-shadow"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
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
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
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
  );
}
