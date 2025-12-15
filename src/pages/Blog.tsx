import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
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
    excerpt: "Discover the magic of swimming with the gentle giants in the open waters outside the marine park. From October to March, whale sharks gather near Mafia Island, offering an unforgettable snorkeling experience in crystal-clear waters.",
    category: "Marine Life",
    date: "November 15, 2024",
    author: "Max B",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Best Time to Visit Mafia Island: A Complete Seasonal Guide",
    excerpt: "Plan your perfect Mafia Island trip with our guide. Whale shark season runs October to March, while June to October offers the best diving conditions. Each season brings unique experiences and marine encounters.",
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
    category: "Conservation",
    date: "October 20, 2024",
    author: "Max B",
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop",
    readTime: "6 min read"
  },
  {
    id: "6",
    title: "Diving in Mafia Island Marine Park: A Complete Guide",
    excerpt: "The Mafia Island Marine Park offers world-class diving with vibrant coral walls, sea turtles, reef sharks, and colorful tropical fish. Perfect for beginners and experienced divers alike.",
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                    <Button className="btn-primary w-fit">
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
                        <Button variant="ghost" size="sm" className="group-hover:text-primary">
                          Read <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Newsletter Section */}
            <div className="mt-16 animate-fade-in [animation-delay:400ms]">
              <Card className="bg-gradient-to-r from-primary/10 to-sea-light/10 border-primary/20">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Stay Updated with Our Latest Stories
                  </h2>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Subscribe to our newsletter and get the latest travel tips, tour updates, and exclusive insights delivered directly to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 rounded-lg border bg-background"
                    />
                    <Button className="btn-primary whitespace-nowrap">
                      Subscribe Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
