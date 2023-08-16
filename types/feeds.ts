interface ProducthuntThumbnail {
  type: string;
  url: string;
}
export interface Producthunt {
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

export interface Hackernews {
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

export interface Github {
  title: string;
  description: string;
  url: string;
  stars: string;
}

export interface Dribbble {
  image: string;
  title: string;
  likes: string;
  views: string;
  author: string;
  authorAvatar: string;
  url: string;
}

export interface YoutubeChannel {
  id: string;
  label: string;
  thumbnail: string;
}

export interface YouTubeSearchResponse {
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

export interface YoutubePost {
  id?: string;
  enclosures: any[];
  title: string;
  link: string;
  thumbnail: string;
  description: string;
}

export interface YouTubeSearchItem {
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

export interface GithubFeedMeta {
  language: string;
  since: string;
}

export interface YoutubeFeedMeta {
  channel: string;
}

export interface RssFeedMeta {
  feedUrl: string;
}

export interface Feed {
  id: string;
  label: string;
  type:
    | "github"
    | "youtube"
    | "rss"
    | "producthunt"
    | "hackernews"
    | "dribbble";
  icon?: string;
  url: string;
  meta?: GithubFeedMeta | YoutubeFeedMeta | RssFeedMeta;
}
