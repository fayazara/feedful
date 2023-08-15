import { parse } from "@/utils/rssparser";
import { YoutubePost } from "@/types/feeds";

export default async (channelId: string): Promise<YoutubePost[]> => {
  try {
    const feed = await parse(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    );
    return feed.items;
  } catch (error) {
    console.error(error);
    return [];
  }
};
