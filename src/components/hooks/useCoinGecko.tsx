import { useEffect, useState } from "react";

interface Coin {
  name: string;
  price: number;
  change24h: number;
}

const COIN_IDS = "bitcoin,ethereum,solana,cardano,dogecoin";

const NAMES_MAP: Record<string, string> = {
  bitcoin: "Bitcoin (BTC)",
  ethereum: "Ethereum (ETH)",
  solana: "Solana (SOL)",
  cardano: "Cardano (ADA)",
  dogecoin: "Dogecoin (DOGE)",
};

export default function useCoinGecko() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${COIN_IDS}&vs_currencies=usd&include_24hr_change=true`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coin data");
        }

        const data = await response.json();

        const coinsList: Coin[] = Object.entries(data).map(
          ([key, value]: [string, any]) => ({
            name: NAMES_MAP[key],
            price: value.usd,
            change24h: value.usd_24h_change,
          })
        );

        setCoins(coinsList);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return { coins, loading, error };
}
