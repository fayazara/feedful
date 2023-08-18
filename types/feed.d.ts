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
  name: string;
  type: string;
  icon?: string;
  url?: string;
  description?: string;
  meta?: GithubFeedMeta | YoutubeFeedMeta | RssFeedMeta;
  user_id?: string;
  created_at?: string;
}
