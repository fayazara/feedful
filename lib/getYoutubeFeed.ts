import { rssParser } from "@/utils";

export default async function fetchYoutubePosts(
  channelId: string
): Promise<YoutubePost[]> {
  try {
    const feed = await rssParser(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    );

    if (!feed || !feed.items || !Array.isArray(feed.items)) {
      console.error("Invalid feed structure:", feed);
      return [];
    }

    return feed.items;
  } catch (error) {
    console.error("Error fetching YouTube posts:", error);
    return [];
  }
}
