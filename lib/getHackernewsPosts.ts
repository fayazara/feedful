import { Hackernews } from "@/types/feeds";
import { sleep } from "@/utils";
import fixtures from "./hnPostsFixtures";

export default async () => {
  try {
    const URL = "https://api.hackerwebapp.com/news";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (process.env.NODE_ENV === "development") {
      await sleep(1000);
      return fixtures;
    } else {
      const response: Response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const posts: Hackernews[] = await response.json();
      return posts;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
