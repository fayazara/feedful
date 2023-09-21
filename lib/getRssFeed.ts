import { rssParser } from "@/utils";

export default async function getRssFeed(feedUrl: string): Promise<[]> {
  try {
    const feed = await rssParser(feedUrl);

    if (!feed || !feed.items || !Array.isArray(feed.items)) {
      console.error("Invalid feed structure:", feed);
      return [];
    }
    console.log(feed.link)
    return {
      title: feed.title,
      icon: feed.icon,
      link: feed.link,
      items: feed.items,
    };
  } catch (error) {
    console.error("Error fetching Rss feed:", error);
    return [];
  }
}
