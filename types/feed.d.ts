declare interface GithubFeedMeta {
  language: string;
  since: string;
}

declare interface YoutubeFeedMeta {
  channelId: string;
}

declare interface RedditFeedMeta {
  subreddit: string;
}

declare interface RssFeedMeta {
  feedUrl: string;
}

declare interface Feed {
  id?: number;
  name: string;
  type: string;
  icon?: string;
  url?: string;
  description?: string;
  meta?: GithubFeedMeta | YoutubeFeedMeta | RssFeedMeta | RedditFeedMeta;
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

interface ProducthuntThumbnail {
  type: string;
  url: string;
}
declare interface Producthunt {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  votesCount: number;
  thumbnail: ProducthuntThumbnail;
  website: string;
  reviewsRating: number;
}

declare interface Hackernews {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}

declare interface Github {
  title: string;
  description: string;
  url: string;
  stars: string;
}

declare interface Dribbble {
  image: string;
  title: string;
  likes: string;
  views: string;
  author: string;
  authorAvatar: string;
  url: string;
}

declare interface YoutubeChannel {
  id: string;
  name: string;
  thumbnail: string;
}

declare interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchItem[];
}

declare interface YoutubePost {
  id?: string;
  enclosures: any[];
  title: string;
  link: string;
  thumbnail: string;
  description: string;
}

declare interface YouTubeSearchItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    channelId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}
