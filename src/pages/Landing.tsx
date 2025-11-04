import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground">
                CryptoPulse
              </span>
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-foreground"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </header>

        <main className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-5xl mx-auto space-y-8 animate-fade-in">
            <div className="inline-block animate-scale-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                <Zap className="w-4 h-4" />
                AI-Powered Crypto Intelligence
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight">
              Your Personalized
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Crypto Dashboard
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get AI-curated market insights, real-time prices, and trending
              news tailored to your investment style. Start your journey today.
            </p>

            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 group text-base px-8 py-6 h-auto"
            >
              Start Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-24 md:mt-32">
            <div className="group relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Live Market Data
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Real-time crypto prices and market trends from CoinGecko API,
                  updated every minute.
                </p>
              </div>
            </div>

            <div className="group relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  AI-Powered Insights
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Daily AI-generated market analysis and recommendations based
                  on your portfolio.
                </p>
              </div>
            </div>

            <div className="group relative bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border hover:border-success/50 transition-all duration-300 hover:shadow-xl hover:shadow-success/10 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-success/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Personalized Feed
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Content curated based on your interests, investment style, and
                  feedback.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
