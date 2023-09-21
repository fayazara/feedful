import getRssFeed from "~/lib/getRssFeed";

export default defineEventHandler(async (event) => {
  const { feedUrl } = getQuery(event) as { feedUrl: string };
  if (!feedUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: "feedUrl is required",
    });
    return;
  }
  const posts = await getRssFeed(feedUrl);
  return posts;
});
