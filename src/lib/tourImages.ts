// Tour image imports
import whaleSharkImage from "@/assets/tour-whale-shark.jpg";
import whaleSharkMainImage from "@/assets/tour-whale-shark-main.jpg";
import divingImage from "@/assets/tour-diving.jpg";
import snorkelingImage from "@/assets/tour-snorkeling.jpg";
import dhowSunsetImage from "@/assets/tour-dhow-sunset.jpg";
import sandbankPicnicImage from "@/assets/tour-sandbank-picnic.jpg";
import culturalVillageImage from "@/assets/tour-cultural-village.jpg";
import whaleWatchingImage from "@/assets/tour-whale-watching.jpg";

// Map database image URLs to imported images
export const tourImageMap: Record<string, string> = {
  '/src/assets/tour-whale-shark.jpg': whaleSharkImage,
  '/src/assets/tour-whale-shark-main.jpg': whaleSharkMainImage,
  '/src/assets/tour-diving.jpg': divingImage,
  '/src/assets/tour-snorkeling.jpg': snorkelingImage,
  '/src/assets/tour-dhow-sunset.jpg': dhowSunsetImage,
  '/src/assets/tour-sandbank-picnic.jpg': sandbankPicnicImage,
  '/src/assets/tour-cultural-village.jpg': culturalVillageImage,
  '/src/assets/tour-whale-watching.jpg': whaleWatchingImage,
};

// Helper function to get the correct image
export const getTourImage = (imageUrl: string): string => {
  return tourImageMap[imageUrl] || imageUrl;
};
