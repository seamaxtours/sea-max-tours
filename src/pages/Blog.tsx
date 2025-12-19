import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import blogTurtleHatching from "@/assets/blog-turtle-hatching.jpg";
import blogWhaleShark from "@/assets/blog-whale-shark.jpg";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  fullContent: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Swimming with Whale Sharks: Mafia Island's Greatest Adventure",
    excerpt: "Discover the magic of swimming with the gentle giants in the open waters outside the marine park. From September to March, whale sharks gather near Mafia Island, offering an unforgettable snorkeling experience in crystal-clear waters.",
    fullContent: `Swimming with whale sharks is one of the most magical experiences you can have on Mafia Island. These gentle giants, the largest fish in the ocean, gather in the warm waters around our island from September to March each year.

Our whale shark excursions begin early in the morning when we head out to the open waters outside the marine park. The boat ride itself is spectacular, with views of the coastline and often dolphins playing in our wake.

When we spot a whale shark, we carefully approach and guests have the opportunity to slip into the water and swim alongside these magnificent creatures. Despite their enormous size—some reaching up to 12 meters—whale sharks are completely harmless filter feeders.

The experience of floating in the crystal-clear water while a whale shark glides past you is truly unforgettable. Our experienced guides ensure both your safety and the welfare of the animals, maintaining respectful distances and following strict guidelines.

We provide all necessary equipment including masks, snorkels, and fins. No diving certification is required—just basic swimming ability and a sense of adventure!`,
    category: "Marine Life",
    date: "November 15, 2024",
    author: "Max B",
    image: blogWhaleShark,
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Best Time to Visit Mafia Island: A Complete Seasonal Guide",
    excerpt: "Plan your perfect Mafia Island trip with our guide. Whale shark season runs September to March, while June to October offers the best diving conditions. Each season brings unique experiences and marine encounters.",
    fullContent: `Planning your trip to Mafia Island? Understanding the seasons will help you make the most of your visit. Each time of year offers unique experiences and marine encounters.

**Whale Shark Season (September - March)**
This is the peak season for swimming with whale sharks. These magnificent creatures congregate in the waters around Mafia Island, feeding on plankton blooms. Water visibility is excellent, and the weather is generally warm and sunny.

**Diving Season (June - October)**
The dry season offers the best diving conditions with calm seas and exceptional visibility often exceeding 30 meters. This is ideal for exploring the coral gardens and encountering sea turtles, reef sharks, and countless tropical fish.

**Turtle Nesting Season (March - August)**
Green and hawksbill turtles nest on Mafia's beaches during these months. Witnessing baby turtles hatching and making their way to the ocean is a truly moving experience.

**Rainy Season (March - May)**
Short rains bring lush vegetation and fewer tourists. While some activities may be limited, this is a great time for birdwatching and cultural experiences.

No matter when you visit, Mafia Island has something special to offer!`,
    category: "Travel Tips",
    date: "November 10, 2024",
    author: "Sea Max Tours",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "Exploring Chole Bay: Ancient Ruins and Vibrant Coral Gardens",
    excerpt: "Venture to Chole Bay for a full-day adventure featuring snorkeling in pristine waters, sandbank picnics, and visits to the historic Chole Island ruins. Discover mangrove forests and the famous blue lagoon.",
    fullContent: `Chole Bay is one of Mafia Island's most treasured destinations, offering a perfect blend of natural beauty and cultural heritage. Our full-day Chole Bay excursion is one of our most popular tours.

**Snorkeling Paradise**
The coral gardens of Chole Bay are among the healthiest in the Western Indian Ocean. The protected waters are home to an incredible diversity of marine life including colorful reef fish, octopuses, and sea turtles.

**Sandbank Picnic**
We'll take you to a pristine sandbank that emerges at low tide, where you can enjoy a delicious Swahili lunch surrounded by turquoise waters. It's the perfect spot for photos and relaxation.

**Chole Island Ruins**
Step back in time as we explore the atmospheric ruins on Chole Island. These remnants of a once-thriving trading settlement date back centuries and are now beautifully overgrown with tropical vegetation.

**Mangrove Forest**
A boat ride through the mangrove channels reveals a unique ecosystem. These forests are nurseries for many fish species and home to various bird species.

**The Blue Lagoon**
Our journey includes a stop at the famous blue lagoon, where the water takes on an almost surreal turquoise color. Swimming here is an absolute delight!`,
    category: "Destinations",
    date: "November 5, 2024",
    author: "Max B",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Swahili Culture on Mafia Island: Traditions and Hospitality",
    excerpt: "Experience authentic Swahili village life on Mafia Island. Visit local craftsmen, learn about traditional dhow building, and discover the warm hospitality that has welcomed travelers for centuries.",
    fullContent: `Mafia Island is not just about marine adventures—it's also a place rich in Swahili culture and traditions that have remained largely unchanged for centuries.

**Village Life**
Our cultural village tours take you into the heart of local communities. You'll meet fishermen mending their nets, women preparing traditional meals, and children playing in the sandy lanes between coral stone houses.

**Dhow Building**
The traditional sailing vessels called dhows have been built on Mafia Island for generations. Watch skilled craftsmen construct these beautiful boats using techniques passed down through families, using only hand tools and local timber.

**Local Cuisine**
Swahili cuisine is a delicious fusion of African, Arabic, and Indian influences. Try freshly caught seafood prepared with coconut, local spices, and served with pilau rice or chapati.

**Music and Dance**
Traditional taarab music and ngoma dances are still performed during celebrations. If you're lucky, you might witness a local wedding or festival.

**Warm Hospitality**
The Swahili concept of "karibu" (welcome) is deeply ingrained in the culture. Visitors are treated as honored guests, and the genuine warmth of the local people is one of the highlights of any visit to Mafia Island.`,
    category: "Culture",
    date: "October 28, 2024",
    author: "Sea Max Tours",
    image: "https://images.unsplash.com/photo-1568849676085-51415703900f?w=800&h=600&fit=crop",
    readTime: "8 min read"
  },
  {
    id: "5",
    title: "Turtle Hatching Season: Witness Nature's Miracle on Mafia Island",
    excerpt: "From March to August, sea turtles nest on Mafia Island's beaches. Join our guided tours to witness baby turtles making their journey to the ocean—a magical experience for nature lovers.",
    fullContent: `Every year, Mafia Island becomes a nursery for green and hawksbill sea turtles. Witnessing the hatching of baby turtles is one of nature's most moving spectacles.

**Nesting Season**
From March to August, female turtles come ashore at night to lay their eggs in the sandy beaches. Each turtle can lay up to 200 eggs, which incubate for about 60 days.

**The Hatching**
When the eggs hatch, dozens of tiny turtles emerge from the sand and instinctively make their way toward the ocean. This usually happens at night or early morning when the sand is cooler.

**Conservation Efforts**
Mafia Island Marine Park works with local communities to protect nesting sites. Turtle eggs are sometimes relocated to protected hatcheries to increase survival rates.

**Guided Tours**
Our turtle hatching tours are conducted responsibly with trained guides. We use red lights (which don't disturb the turtles) and maintain appropriate distances to minimize impact.

**A Life-Changing Experience**
Watching these tiny creatures take their first steps into the vast ocean is profoundly moving. Only about 1 in 1,000 will survive to adulthood, making each hatching precious.

Join us for this unforgettable experience and support turtle conservation on Mafia Island!`,
    category: "Conservation",
    date: "October 20, 2024",
    author: "Max B",
    image: blogTurtleHatching,
    readTime: "6 min read"
  },
  {
    id: "6",
    title: "Diving in Mafia Island Marine Park: A Complete Guide",
    excerpt: "The Mafia Island Marine Park offers world-class diving with vibrant coral walls, sea turtles, reef sharks, and colorful tropical fish. Perfect for beginners and experienced divers alike.",
    fullContent: `Mafia Island Marine Park is one of East Africa's best-kept secrets for scuba diving. Established in 1995, the park protects some of the most pristine coral reefs in the Indian Ocean.

**Dive Sites**
The park features over 20 dive sites suitable for all experience levels. Highlights include:
- **Chole Wall**: A dramatic drop-off covered in soft corals
- **Kinasi Pass**: Known for reef sharks and large pelagics
- **Dindini Wall**: Perfect for macro photography

**Marine Life**
The diversity of marine life is astounding. You'll encounter green and hawksbill turtles, white-tip reef sharks, giant groupers, moray eels, and hundreds of species of colorful reef fish.

**Coral Gardens**
The coral formations here are exceptionally healthy, with both hard and soft corals creating underwater gardens of incredible beauty.

**Diving Conditions**
- Visibility: 15-30+ meters
- Water temperature: 25-29°C
- Best season: June to October

**For All Levels**
Whether you're a beginner or an experienced diver, Mafia Island has something for you. We offer PADI certification courses and guided dives for all levels.

Come discover why Mafia Island is considered one of the top diving destinations in Africa!`,
    category: "Diving",
    date: "October 15, 2024",
    author: "Sea Max Tours",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
    readTime: "10 min read"
  }
];

const categories = ["All", "Marine Life", "Travel Tips", "Destinations", "Culture", "Conservation", "Diving"];

export default function Blog() {
  const { t } = useLanguage();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
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
                Travel Blog & Stories
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Discover inspiring stories, travel tips, and insider insights about Mafia Island adventures
              </p>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10">
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-primary/50 blur-3xl" />
            <div className="absolute top-10 right-40 w-48 h-48 rounded-full bg-sea-light blur-3xl" />
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 border-b">
          <div className="container">
            <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
              {categories.map((category) => (
                <Badge 
                  key={category}
                  variant={category === "All" ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="section">
          <div className="container">
            <div className="mb-12 animate-fade-in">
              <h2 className="text-2xl font-bold mb-8">Featured Story</h2>
              <Card className="overflow-hidden hover:shadow-xl transition-all group">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img 
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary">
                      {blogPosts[0].category}
                    </Badge>
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {blogPosts[0].date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {blogPosts[0].author}
                      </div>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {blogPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {blogPosts[0].excerpt}
                    </p>
                    <Button className="btn-primary w-fit" onClick={() => handleReadMore(blogPosts[0])}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>

            {/* Blog Grid */}
            <div className="mb-8 animate-fade-in [animation-delay:200ms]">
              <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(1).map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden hover:shadow-xl transition-all group animate-fade-in"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                  >
                    <CardHeader className="p-0">
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur">
                          {post.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{post.author}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="group-hover:text-primary" onClick={() => handleReadMore(post)}>
                          Read <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
      
      <Footer />

      {/* Blog Post Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                  <Badge>{selectedPost.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedPost.date}
                  </div>
                  <span>{selectedPost.readTime}</span>
                </div>
                <DialogTitle className="text-2xl">{selectedPost.title}</DialogTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  {selectedPost.author}
                </div>
              </DialogHeader>
              <div className="mt-4">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {selectedPost.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph.startsWith('**') ? (
                        <strong className="text-foreground">{paragraph.replace(/\*\*/g, '')}</strong>
                      ) : paragraph.startsWith('- ') ? (
                        <span className="block ml-4">• {paragraph.substring(2)}</span>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
