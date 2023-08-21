// reddit url example - "https://www.reddit.com/r/popular/.json";

const EXCLUDE_IMAGE_TYPES = ["self", "nsfw", "default", "spoiler", "image"];

function cleanMediaUrl(url: string): string {
  if (!url || url === "self" || url === "nsfw") {
    return "";
  }
  return url.replace(/&amp;/g, "&");
}

export default async function fetchRedditPosts(
  subreddit: string
): Promise<RedditPost[]> {
  try {
    if (!subreddit) {
      return [];
    }

    const URL = `https://www.reddit.com/r/${subreddit}/.json`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const feed = await response.json();
    const posts: RedditPost[] = feed.data.children
      .map((item: any) => {
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
            !EXCLUDE_IMAGE_TYPES.includes(item.data.thumbnail) &&
            !item.data.is_video,
          thumbnail: cleanMediaUrl(item.data.thumbnail),
          video_url: item.data.media?.reddit_video?.fallback_url,
          comments: item.data.num_comments,
          created_at: item.data.created_utc,
        };
      })
      .filter(
        (post: RedditPost) => !post.author.toLowerCase().includes("moderator")
      );

    return posts;
  } catch (error) {
    console.error(error);
    return [];
  }
}
