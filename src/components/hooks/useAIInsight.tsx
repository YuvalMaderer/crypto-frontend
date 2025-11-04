// useAIInsight.ts
import { useEffect, useState } from "react";
import axios from "axios";

const OPENROUTER_API_KEY =
  "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"; // עדיף להכניס ל-.env

export const useAIInsight = () => {
  const [insight, setInsight] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsight = async () => {
      try {
        const response = await axios.post(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: "Give me an AI Insight of the Day in 1 sentence.",
              },
            ],
            temperature: 0.7,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: `Bearer ${OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        const result = response.data.choices[0].message.content;
        setInsight(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInsight();
  }, []);

  return { insight };
};
