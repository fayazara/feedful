import { parse } from "@/utils/rssparser";

export default async (channelId: string) => {
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
