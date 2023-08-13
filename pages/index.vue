<template>
  <main class="h-screen flex flex-col">
    <Navbar />
    <div class="flex-grow flex overflow-x-auto snap-x snap-mandatory">
      <Feed
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
        name="Github Trending (Javascript)"
        icon="logos:github-icon"
        url="https://github.com/trending/javascript"
      >
        <FeedGithubTrending />
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
      </Feed>
    </div>
  </main>
</template>

<script lang="ts" setup>
// import { Feed } from "@/types/feeds";
// const feeds = useState<Feed[]>("feeds", () => []);
</script>
