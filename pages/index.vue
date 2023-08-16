<template>
  <main class="h-screen flex flex-col">
    <Navbar />
    <div class="flex-grow flex overflow-x-auto divide-x snap-x snap-mandatory">
      <!-- <Feed
        name="Producthunt"
        icon="logos:producthunt"
        url="https://producthunt.com"
      >
        <FeedProducthunt />
      </Feed>
      <Feed
        name="Hackernews"
        icon="logos:ycombinator"
        url="https://news.ycombinator.com/"
      >
        <FeedHackernews />
      </Feed>
      <Feed
        name="Github Trending (Python)"
        icon="logos:github-icon"
        url="https://github.com/trending/javascript"
      >
        <FeedGithubTrending lang="python" since="daily" />
      </Feed>
      <Feed
        name="MKBHD"
        icon="logos:youtube-icon"
        url="https://youtube.com/@mkbhd"
      >
        <FeedYoutube channel-id="UCBJycsmduvYEL83R_U4JriQ" />
      </Feed>
      <Feed
        name="Dribbble"
        icon="logos:dribbble-icon"
        url="https://dribbble.com/"
      >
        <FeedDribbble />
      </Feed> -->

      <Feed
        v-for="feed in feeds"
        :key="feed.type"
        :name="feed.name"
        :icon="feed.icon"
        :url="feed.url"
      >
        <!-- <component :is="`Feed${feed.type}`" /> -->
      </Feed>
    </div>
  </main>
</template>

<script lang="ts" setup>
const feeds = [
  {
    type: "producthunt",
    name: "Producthunt",
    icon: "logos:producthunt",
    url: "https://producthunt.com",
  },
  {
    type: "hackernews",
    name: "Hackernews",
    icon: "logos:ycombinator",
    url: "https://news.ycombinator.com/",
  },
  {
    type: "github",
    name: "Github Trending (Javascript - Today)",
    url: "https://github.com/trending/javascript",
    icon: "logos:github-icon",
    meta: {
      language: "Javascript",
      since: "Today",
    },
  },
  {
    type: "youtube",
    name: "MKBHD",
    url: "https://youtube.com/@mkbhd",
    icon: "logos:youtube-icon",
    meta: {
      channelId: "UC8butISFwT-Wl7EV0hUK0BQ",
    },
  },
  {
    type: "dribbble",
    name: "Dribbble",
    url: "https://dribbble.com/",
    icon: "logos:dribbble-icon",
  },
];
</script>
