import getYoutubeFeed from "@/lib/getYoutubeFeed";

export default defineEventHandler(async (event) => {
  const { channel } = getQuery(event) as { channel: string };
  if (!channel) {
    throw createError({
      statusCode: 400,
      statusMessage: "Channel is required",
    });
    return;
  }
  const posts = await getYoutubeFeed(channel);
  return posts;
});
