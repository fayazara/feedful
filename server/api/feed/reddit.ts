import getRedditPosts from "@/lib/getRedditPosts";

export default defineEventHandler(async (event) => {
  const { subreddit } = getQuery(event) as { subreddit: string };
  if (!subreddit) {
    throw createError({
      statusCode: 400,
      statusMessage: "Subreddit is required",
    });
    return;
  }
  const posts: RedditPost[] = await getRedditPosts(subreddit);
  return posts;
});
