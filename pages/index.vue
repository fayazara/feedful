<template>
  <main class="h-screen flex flex-col">
    <Navbar />
    <div class="flex-grow flex overflow-x-auto snap-x snap-mandatory">
      <FeedContainer
        name="Producthunt"
        icon="logos:producthunt"
        url="https://producthunt.com"
      >
        <FeedProducthunt />
      </FeedContainer>
      <FeedContainer
        name="Hackernews"
        icon="logos:ycombinator"
        url="https://news.ycombinator.com/"
      >
        <FeedHackernews />
      </FeedContainer>
      <FeedContainer
        name="Github Trending (Python)"
        icon="logos:github-icon"
        url="https://github.com/trending/javascript"
      >
        <FeedGithubTrending lang="python" since="daily" />
      </FeedContainer>
      <FeedContainer
        name="MKBHD"
        icon="logos:youtube-icon"
        url="https://youtube.com/@mkbhd"
      >
        <FeedYoutube channel-id="UCBJycsmduvYEL83R_U4JriQ" />
      </FeedContainer>
      <FeedContainer
        name="Dribbble"
        icon="logos:dribbble-icon"
        url="https://dribbble.com/"
      >
        <FeedDribbble />
      </FeedContainer>
    </div>
  </main>
</template>

<script lang="ts" setup></script>
