import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="inline-block animate-scale-in mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            404 Error
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight text-foreground">
          Page Not Found
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Oops! The page you are looking for does not exist. It might have been
          removed or you typed an incorrect URL.
        </p>

        <Button
          size="lg"
          onClick={() => navigate("/")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/30 group px-8 py-6"
        >
          Go Home
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
