import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, Users, Star } from "lucide-react";

export interface TourProps {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_hours: number;
  max_participants: number;
  image_url: string;
  location: string;
  category?: string;
  difficulty?: string;
  features: string[];
  available?: boolean;
}

interface TourCardProps {
  tour: TourProps;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="p-0 relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden">
          <img 
            src={tour.image_url} 
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        {tour.category && (
          <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur">
            {tour.category}
          </Badge>
        )}
        {tour.difficulty && (
          <Badge variant="secondary" className="absolute top-4 left-4 bg-secondary/90 backdrop-blur">
            {tour.difficulty}
          </Badge>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {tour.name}
          </h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">4.8</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {tour.description}
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {tour.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            {tour.duration_hours} {tour.duration_hours === 1 ? 'hour' : 'hours'}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-primary" />
            Max {tour.max_participants} participants
          </div>
        </div>
        
        {tour.features && tour.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tour.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {tour.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tour.features.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-primary">${tour.price}</span>
          <span className="text-sm text-muted-foreground ml-1">per person</span>
        </div>
        <Button asChild className="btn-primary">
          <Link to={`/booking?tour=${tour.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
