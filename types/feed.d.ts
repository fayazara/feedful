interface GithubFeedMeta {
  language: string;
  since: string;
}

interface YoutubeFeedMeta {
  channelId: string;
}

interface RssFeedMeta {
  feedUrl: string;
}

declare interface Feed {
  id: number;
  order: number;
  name: string;
  type: string;
  icon?: string;
  url?: string;
  description?: string;
  meta?: GithubFeedMeta | YoutubeFeedMeta | RssFeedMeta;
  user_id?: string;
  created_at?: string;
}

declare interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  votes: number;
  text: string;
  nsfw: boolean;
  url: string;
  is_video: boolean;
  is_image: boolean;
  thumbnail: string;
  comments: number;
  video_url: string;
  created_at: number;
}
