import {
  YouTubeSearchItem,
  YouTubeSearchResponse,
  YoutubeChannel,
} from "@/types/feeds";

const URL = `https://youtube.googleapis.com/youtube/v3/search`;

export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);
  if (!search) {
    throw createError({
      statusCode: 400,
      statusMessage: "Please provide a search query",
    });
  }

  const data: YouTubeSearchResponse = await $fetch(URL, {
    params: {
      part: "snippet",
      q: search,
      type: "channel",
      key: process.env.YOUTUBE_KEY,
    },
  });

  const formattedData: YoutubeChannel[] = data.items.map(
    (item: YouTubeSearchItem) => ({
      id: item.id.channelId,
      label: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    })
  );

  return formattedData;
});
