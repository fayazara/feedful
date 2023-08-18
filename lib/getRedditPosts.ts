// reddit url example - "https://www.reddit.com/r/popular/.json";

function cleanMediaUrl(url: string) {
  if (!url || url === "self" || url === "nsfw") return "";
  return url.replace(/&amp;/g, "&");
}

export default async (subreddit: string): Promise<RedditPost[]> => {
  try {
    if (!subreddit) return [];
    const URL = `https://www.reddit.com/r/${subreddit}/.json`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response: Response = await fetch(URL, options);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const feed = await response.json();
    const posts: RedditPost[] = feed.data.children.map((item: any) => {
      return {
        id: item.data.id,
        title: item.data.title,
        subreddit: item.data.subreddit_name_prefixed,
        author: item.data.author,
        votes: item.data.ups,
        text: item.data.selftext,
        nsfw: item.data.over_18,
        url: `https://reddit.com/${item.data.permalink}`,
        is_video: item.data.is_video,
        is_image:
          item.data.thumbnail !== "self" &&
          item.data.thumbnail !== "nsfw" &&
          item.data.thumbnail !== "default" &&
          item.data.is_video === false,
        thumbnail: cleanMediaUrl(item.data.thumbnail),
        video_url: item.data.media?.reddit_video?.fallback_url,
        comments: item.data.num_comments,
        created_at: item.data.created_utc,
      };
    });
    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
};
