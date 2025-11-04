import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  TrendingDown,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useCoinGecko from "@/components/hooks/useCoinGecko";
import { useCryptoNews } from "@/components/hooks/useCryptoNews";
import { useAIInsight } from "@/components/hooks/useAIInsight";
import api from "@/services/api.service";

const mockMeme =
  "https://pbs.twimg.com/profile_images/953381776474476544/2y22y5d0_400x400.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { coins } = useCoinGecko();
  const { news } = useCryptoNews();
  const { insight } = useAIInsight();

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diff = Math.floor((now.getTime() - published.getTime()) / 1000); // שניות

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const [votes, setVotes] = useState<{ [key: string]: "up" | "down" | null }>({
    news: null,
    prices: null,
    ai: null,
    meme: null,
  });

  const handleVote = async (section: string, vote: "up" | "down") => {
    setVotes({ ...votes, [section]: vote });

    try {
      await api.post("/api/feedback", {
        section,
        vote,
        timestamp: new Date(),
      });

      toast({
        title:
          vote === "up" ? "Thanks for the feedback!" : "We'll improve this",
        description: "Your preferences help us personalize your feed",
      });
    } catch (err) {
      toast({
        title: "Failed to send feedback",
        description: err.response?.data?.msg || err.message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            CryptoPulse
          </h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-4xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here's your personalized crypto digest for today
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Market News Section */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Market News</CardTitle>
                  <CardDescription>Latest crypto headlines</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={votes.news === "up" ? "default" : "ghost"}
                    onClick={() => handleVote("news", "up")}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={votes.news === "down" ? "destructive" : "ghost"}
                    onClick={() => handleVote("news", "down")}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth"
                >
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.kind} • {timeAgo(item.published_at)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Coin Prices Section */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Coin Prices</CardTitle>
                  <CardDescription>Real-time market data</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={votes.prices === "up" ? "default" : "ghost"}
                    onClick={() => handleVote("prices", "up")}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={votes.prices === "down" ? "destructive" : "ghost"}
                    onClick={() => handleVote("prices", "down")}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {coins.map((coin) => {
                const isPositive = coin.change24h >= 0;

                return (
                  <div
                    key={coin.name}
                    className="flex justify-between items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth"
                  >
                    <div>
                      <h4 className="font-semibold">{coin.name}</h4>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${coin.price.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm flex items-center gap-1 ${
                          isPositive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {coin.change24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* AI Insight Section */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>AI Insight of the Day</CardTitle>
                  <CardDescription>
                    Personalized market analysis
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={votes.ai === "up" ? "default" : "ghost"}
                    onClick={() => handleVote("ai", "up")}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={votes.ai === "down" ? "destructive" : "ghost"}
                    onClick={() => handleVote("ai", "down")}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <p className="leading-relaxed">{insight}</p>
              </div>
            </CardContent>
          </Card>

          {/* Crypto Meme Section */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Daily Crypto Meme</CardTitle>
                  <CardDescription>
                    Because crypto needs fun too
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={votes.meme === "up" ? "default" : "ghost"}
                    onClick={() => handleVote("meme", "up")}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={votes.meme === "down" ? "destructive" : "ghost"}
                    onClick={() => handleVote("meme", "down")}
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with dynamic meme
                  Option 1: Scrape r/CryptoCurrency or r/CryptoMemes
                  Option 2: Use static JSON array of meme URLs
                  Rotate based on date or random selection */}
              <img
                src={mockMeme}
                alt="Crypto meme"
                className="w-full rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
