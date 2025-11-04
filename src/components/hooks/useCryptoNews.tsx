import { useEffect, useState } from "react";

export interface NewsItem {
  id: number;
  title: string;
  kind: string;
  published_at: string;
}

export const useCryptoNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const token = import.meta.env.VITE_CRYPTOPANIC_TOKEN;
        const res = await fetch(
          `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${token}`
        );
        const data = await res.json();

        const formattedNews = data.results
          .map((item) => ({
            id: item.id,
            title: item.title,
            kind: item.kind,
            published_at: item.published_at,
          }))
          .sort(
            (a: NewsItem, b: NewsItem) =>
              new Date(b.published_at).getTime() -
              new Date(a.published_at).getTime()
          )
          .slice(0, 5);

        setNews(formattedNews);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNews();
  }, []);

  return { news };
};
