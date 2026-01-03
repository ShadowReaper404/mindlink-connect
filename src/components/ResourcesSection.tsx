import { useState } from "react";
import { Book, FileText, Headphones, Phone, Play, Pause, ChevronRight, Globe, ExternalLink, Sparkles, Brain, Heart, Zap, X, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const articles = [
  { 
    id: 1, 
    title: "Understanding Anxiety", 
    category: "Anxiety", 
    readTime: "5 min", 
    description: "Learn about the signs, symptoms, and coping strategies for anxiety.",
    fullDescription: "Anxiety is a natural response to stress, but when it becomes overwhelming, it can interfere with daily life. This comprehensive guide explores the different types of anxiety disorders, common symptoms like persistent worry, rapid heartbeat, and difficulty concentrating, and evidence-based coping strategies including breathing exercises, cognitive behavioral techniques, and lifestyle modifications.",
    keyTakeaways: [
      "Recognize early warning signs of anxiety",
      "Practice grounding techniques during anxious moments",
      "Build a personalized coping toolkit",
      "Understand when to seek professional help"
    ],
    author: "Dr. Sarah Mitchell",
    publishDate: "Dec 15, 2025"
  },
  { 
    id: 2, 
    title: "Coping with Depression", 
    category: "Depression", 
    readTime: "7 min", 
    description: "Practical steps to manage depression and find hope.",
    fullDescription: "Depression affects millions worldwide, but recovery is possible. This article discusses the biological, psychological, and social factors contributing to depression, explores effective treatment options including therapy and medication, and provides practical daily strategies for managing symptoms. Learn how to create structure, maintain social connections, and develop self-compassion during difficult times.",
    keyTakeaways: [
      "Understand the science behind depression",
      "Create a daily routine that supports mental health",
      "Challenge negative thought patterns",
      "Build a support network"
    ],
    author: "Dr. James Thompson",
    publishDate: "Dec 10, 2025"
  },
  { 
    id: 3, 
    title: "Building Resilience", 
    category: "Self-Care", 
    readTime: "4 min", 
    description: "Strengthen your mental resilience with proven techniques.",
    fullDescription: "Resilience is the ability to bounce back from adversity and adapt to challenging circumstances. This guide teaches you how to develop mental toughness through mindfulness practices, positive relationships, realistic goal-setting, and self-care routines. Discover how to reframe setbacks as learning opportunities and build lasting emotional strength.",
    keyTakeaways: [
      "Develop a growth mindset",
      "Practice self-compassion during setbacks",
      "Build strong social connections",
      "Maintain healthy habits during stress"
    ],
    author: "Maria Rodriguez, LCSW",
    publishDate: "Dec 8, 2025"
  },
  { 
    id: 4, 
    title: "Mindfulness Basics", 
    category: "Mindfulness", 
    readTime: "6 min", 
    description: "An introduction to mindfulness and its benefits.",
    fullDescription: "Mindfulness is the practice of being fully present in the moment without judgment. This beginner-friendly guide introduces core mindfulness concepts, explains the neuroscience behind its benefits, and provides simple exercises you can start today. Learn how mindfulness can reduce stress, improve focus, enhance emotional regulation, and promote overall well-being.",
    keyTakeaways: [
      "Start with just 5 minutes of daily practice",
      "Learn body scan and breathing techniques",
      "Bring mindfulness into everyday activities",
      "Understand the research-backed benefits"
    ],
    author: "Dr. Emily Chen",
    publishDate: "Dec 5, 2025"
  },
  { 
    id: 5, 
    title: "Sleep & Mental Health", 
    category: "Wellness", 
    readTime: "5 min", 
    description: "The connection between quality sleep and mental wellbeing.",
    fullDescription: "Sleep and mental health are deeply interconnected. Poor sleep can worsen mental health conditions, while mental health issues can disrupt sleep patterns. This article explores the bidirectional relationship between sleep and mental wellbeing, explains the stages of sleep and their importance, and provides evidence-based strategies for improving sleep quality including sleep hygiene practices, relaxation techniques, and when to seek help for sleep disorders.",
    keyTakeaways: [
      "Understand your sleep cycles and their importance",
      "Create an optimal sleep environment",
      "Develop a consistent bedtime routine",
      "Address common sleep disruptors"
    ],
    author: "Dr. Michael Park",
    publishDate: "Dec 1, 2025"
  },
  { 
    id: 6, 
    title: "Stress Management", 
    category: "Stress", 
    readTime: "8 min", 
    description: "Effective strategies to reduce and manage daily stress.",
    fullDescription: "Chronic stress can take a toll on both physical and mental health. This comprehensive guide teaches you to identify your stress triggers, understand the body's stress response, and implement practical coping strategies. Learn time management techniques, boundary setting, relaxation exercises, and how to transform your relationship with stress from one of avoidance to skillful management.",
    keyTakeaways: [
      "Identify your personal stress triggers",
      "Practice the 4 A's: Avoid, Alter, Accept, Adapt",
      "Use progressive muscle relaxation",
      "Build stress-resistant habits"
    ],
    author: "Lisa Anderson, PhD",
    publishDate: "Nov 28, 2025"
  },
];

const guides = [
  { id: 1, title: "Self-Care Workbook", pages: 24, format: "PDF", description: "A comprehensive guide to building daily self-care habits." },
  { id: 2, title: "Anxiety Relief Journal", pages: 30, format: "PDF", description: "Journaling prompts and exercises for managing anxiety." },
  { id: 3, title: "Mindfulness Starter Kit", pages: 18, format: "PDF", description: "Everything you need to begin your mindfulness journey." },
  { id: 4, title: "Crisis Coping Cards", pages: 12, format: "PDF", description: "Portable coping strategies for difficult moments." },
];

const meditations = [
  { id: 1, title: "Morning Calm", duration: "10:00", category: "Morning", isPlaying: false },
  { id: 2, title: "Anxiety Relief", duration: "15:00", category: "Anxiety", isPlaying: false },
  { id: 3, title: "Deep Sleep", duration: "20:00", category: "Sleep", isPlaying: false },
  { id: 4, title: "Stress Release", duration: "12:00", category: "Stress", isPlaying: false },
  { id: 5, title: "Body Scan", duration: "18:00", category: "Relaxation", isPlaying: false },
  { id: 6, title: "Gratitude Practice", duration: "8:00", category: "Positivity", isPlaying: false },
];

const hotlines = [
  { country: "Sri Lanka", name: "1926 - National Mental Health Helpline", number: "1926", available: "24/7" },
  { country: "Sri Lanka", name: "Women In Need Helpline", number: "+94 77 567 65 55", available: "24/7" },
  { country: "Sri Lanka", name: "Ministry of Women and Child Affairs Women’s Helpline", number: "1938", available: "24/7" },
  { country: "Australia", name: "Lifeline Australia", number: "13 11 14", available: "24/7" },
  { country: "India", name: "iCall", number: "9152987821", available: "Mon-Sat 8am-10pm" },
  { country: "Germany", name: "Telefonseelsorge", number: "0800 111 0 111", available: "24/7" },
  { country: "France", name: "SOS Amitié", number: "09 72 39 40 50", available: "24/7" },
  { country: "Japan", name: "TELL Lifeline", number: "03-5774-0992", available: "24/7" },
];

const ResourcesSection = () => {
  const isVisible = useScrollReveal();
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  const categories = ["all", "Anxiety", "Depression", "Self-Care", "Mindfulness", "Wellness", "Stress"];
  const filteredArticles = activeCategory === "all" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  // Category color themes
  const categoryColors: Record<string, string> = {
    Anxiety: "from-blue-500/10 to-blue-600/10 border-blue-500/20",
    Depression: "from-purple-500/10 to-purple-600/10 border-purple-500/20",
    "Self-Care": "from-pink-500/10 to-pink-600/10 border-pink-500/20",
    Mindfulness: "from-green-500/10 to-green-600/10 border-green-500/20",
    Wellness: "from-amber-500/10 to-amber-600/10 border-amber-500/20",
    Stress: "from-red-500/10 to-red-600/10 border-red-500/20",
    all: "from-primary/10 to-primary/10 border-primary/20"
  };

  const categoryIcons: Record<string, any> = {
    Anxiety: Brain,
    Depression: Heart,
    "Self-Care": Sparkles,
    Mindfulness: Zap,
    Wellness: Heart,
    Stress: Brain
  };

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={isVisible.ref}
          className={`text-center mb-12 transition-all duration-700 ${isVisible.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 backdrop-blur-sm bg-primary/5">
            <Book className="w-3 h-3 mr-1.5 inline" />
            Resources
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            Mental Health Resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our curated collection of articles, guides, meditations, and crisis support resources.
          </p>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 h-auto p-2 backdrop-blur-lg bg-card/50 border border-border/50">
            <TabsTrigger value="articles" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10">
              <Book className="w-4 h-4" />
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Guides</span>
            </TabsTrigger>
            <TabsTrigger value="meditations" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10">
              <Headphones className="w-4 h-4" />
              <span className="hidden sm:inline">Meditations</span>
            </TabsTrigger>
            <TabsTrigger value="hotlines" className="flex items-center gap-2 py-3 data-[state=active]:bg-primary/10">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Hotlines</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <ScrollArea className="w-full whitespace-nowrap pb-4">
              <div className="flex gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                    className="capitalize"
                  >
                    {cat}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => {
                const CategoryIcon = categoryIcons[article.category] || Book;
                return (
                  <Card 
                    key={article.id} 
                    className={`group cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm bg-gradient-to-br ${categoryColors[article.category] || categoryColors.all} border relative overflow-hidden`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedArticle(article)}
                  >
                    {/* Decorative Icon Background */}
                    <div className="absolute -right-4 -top-4 opacity-10">
                      <CategoryIcon className="w-24 h-24" />
                    </div>
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary" className="backdrop-blur-sm">
                          <CategoryIcon className="w-3 h-3 mr-1" />
                          {article.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground font-medium">{article.readTime}</span>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors text-xl">
                        {article.title}
                      </CardTitle>
                      <CardDescription>{article.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <Button variant="ghost" className="group/btn p-0 h-auto hover:bg-transparent text-primary font-semibold">
                        Read More 
                        <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-2 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Article Detail Dialog */}
            <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                {selectedArticle && (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="backdrop-blur-sm">
                          {(() => {
                            const CategoryIcon = categoryIcons[selectedArticle.category] || Book;
                            return <CategoryIcon className="w-3 h-3 mr-1" />;
                          })()}
                          {selectedArticle.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedArticle.readTime}
                        </span>
                      </div>
                      <DialogTitle className="text-2xl md:text-3xl">{selectedArticle.title}</DialogTitle>
                      <DialogDescription className="text-base pt-2">
                        {selectedArticle.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-6 py-4">
                      {/* Article Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground border-l-4 border-primary/30 pl-4 bg-primary/5 py-3 rounded-r">
                        <span>By {selectedArticle.author}</span>
                        <span>•</span>
                        <span>{selectedArticle.publishDate}</span>
                      </div>

                      {/* Full Description */}
                      <div className="prose prose-sm max-w-none">
                        <p className="text-foreground leading-relaxed text-base">
                          {selectedArticle.fullDescription}
                        </p>
                      </div>

                      {/* Key Takeaways */}
                      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6">
                        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-foreground">
                          <Sparkles className="w-5 h-5 text-primary" />
                          Key Takeaways
                        </h3>
                        <ul className="space-y-3">
                          {selectedArticle.keyTakeaways.map((takeaway, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-foreground">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-sm leading-relaxed">{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1" size="lg">
                          <Book className="w-4 h-4 mr-2" />
                          Read Full Article
                        </Button>
                        <Button variant="outline" size="lg">
                          <Heart className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {guides.map((guide, index) => (
                <Card 
                  key={guide.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription className="mt-1">{guide.description}</CardDescription>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline">{guide.format}</Badge>
                          <span className="text-sm text-muted-foreground">{guide.pages} pages</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full group-hover:bg-primary/90">
                      Download Free Guide
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meditations" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {meditations.map((meditation, index) => (
                <Card 
                  key={meditation.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm ${
                    playingId === meditation.id ? 'ring-2 ring-primary bg-gradient-to-br from-primary/20 to-primary/10 border-primary/30' : 'bg-gradient-to-br from-card to-muted/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => togglePlay(meditation.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        playingId === meditation.id 
                          ? 'bg-primary text-primary-foreground animate-pulse' 
                          : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                      }`}>
                        {playingId === meditation.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{meditation.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{meditation.category}</Badge>
                          <span className="text-sm text-muted-foreground">{meditation.duration}</span>
                        </div>
                      </div>
                    </div>
                    {playingId === meditation.id && (
                      <div className="mt-4">
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '35%' }} />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="hotlines" className="space-y-6">
            <Card className="border-destructive/30 bg-gradient-to-r from-destructive/10 to-destructive/5 backdrop-blur-sm">
              <CardContent className="p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse">
                  <Phone className="w-5 h-5 text-destructive" />
                </div>
                <p className="text-sm text-destructive font-semibold">
                  🚨 If you're in immediate danger, please call your local emergency services immediately.
                </p>
              </CardContent>
            </Card>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {hotlines.map((hotline, index) => (
                <Card 
                  key={hotline.country}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm bg-gradient-to-br from-card to-muted/30 border-primary/20 hover:border-primary/40"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{hotline.country}</span>
                    </div>
                    <h4 className="text-sm text-muted-foreground mb-2">{hotline.name}</h4>
                    <a 
                      href={`tel:${hotline.number.replace(/\s/g, '')}`}
                      className="text-lg font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      {hotline.number}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {hotline.available}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ResourcesSection;
