import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, ArrowLeft } from "lucide-react";
import api from "@/services/api.service";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    cryptoAssets: [] as string[],
    investorType: "",
    contentTypes: [] as string[],
  });

  const cryptoOptions = [
    "Bitcoin (BTC)",
    "Ethereum (ETH)",
    "Solana (SOL)",
    "Cardano (ADA)",
    "Dogecoin (DOGE)",
  ];
  const investorTypes = [
    { value: "hodler", label: "HODLer", description: "Long-term investor" },
    { value: "trader", label: "Day Trader", description: "Active trading" },
    { value: "nft", label: "NFT Collector", description: "Focus on NFTs" },
  ];
  const contentOptions = [
    "Market News",
    "Price Charts",
    "Social Trends",
    "Fun Memes",
  ];

  const handleCryptoToggle = (crypto: string) => {
    setPreferences((prev) => ({
      ...prev,
      cryptoAssets: prev.cryptoAssets.includes(crypto)
        ? prev.cryptoAssets.filter((c) => c !== crypto)
        : [...prev.cryptoAssets, crypto],
    }));
  };

  const handleContentToggle = (content: string) => {
    setPreferences((prev) => ({
      ...prev,
      contentTypes: prev.contentTypes.includes(content)
        ? prev.contentTypes.filter((c) => c !== content)
        : [...prev.contentTypes, content],
    }));
  };

  const handleComplete = async () => {
    try {
      const { data } = await api.post("/api/user/preferences", preferences);

      toast({
        title: "Preferences saved!",
        description: "Your dashboard is being personalized...",
      });

      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Failed to save preferences",
        description: err.response?.data?.msg || err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Let's Personalize Your Experience
          </h1>
          <p className="text-muted-foreground">Step {step} of 3</p>
        </div>

        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle>
              {step === 1 && "What crypto assets interest you?"}
              {step === 2 && "What type of investor are you?"}
              {step === 3 && "What content would you like to see?"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Select all that apply"}
              {step === 2 && "Choose the one that fits best"}
              {step === 3 && "Choose your preferred content types"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Crypto Assets */}
            {step === 1 && (
              <div className="space-y-3">
                {cryptoOptions.map((crypto) => (
                  <div
                    key={crypto}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth"
                  >
                    <Checkbox
                      id={crypto}
                      checked={preferences.cryptoAssets.includes(crypto)}
                      onCheckedChange={() => handleCryptoToggle(crypto)}
                    />
                    <Label htmlFor={crypto} className="cursor-pointer flex-1">
                      {crypto}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Investor Type */}
            {step === 2 && (
              <RadioGroup
                value={preferences.investorType}
                onValueChange={(value) =>
                  setPreferences({ ...preferences, investorType: value })
                }
              >
                {investorTypes.map((type) => (
                  <div
                    key={type.value}
                    className="flex items-center space-x-3 p-4 rounded-lg hover:bg-secondary/50 transition-smooth"
                  >
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label
                      htmlFor={type.value}
                      className="cursor-pointer flex-1"
                    >
                      <div className="font-semibold">{type.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {type.description}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {/* Step 3: Content Types */}
            {step === 3 && (
              <div className="space-y-3">
                {contentOptions.map((content) => (
                  <div
                    key={content}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-smooth"
                  >
                    <Checkbox
                      id={content}
                      checked={preferences.contentTypes.includes(content)}
                      onCheckedChange={() => handleContentToggle(content)}
                    />
                    <Label htmlFor={content} className="cursor-pointer flex-1">
                      {content}
                    </Label>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="secondary"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>

              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="glow-primary"
                >
                  Next
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleComplete} className="glow-primary">
                  Complete Setup
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
