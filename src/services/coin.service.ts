import axios from "axios";

export const getMockCoinData = async () => {
    console.log("here")
  try {
    const { data } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "bitcoin,ethereum,solana,cardano,dogecoin",
          vs_currencies: "usd",
        },
      }
    );

    return data;
  } catch (err) {
    console.error("Error fetching coin data:", err.message);
    return null;
  }
};
