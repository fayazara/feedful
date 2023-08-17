<template>
  <main class="h-screen flex flex-col">
    <Navbar />
    <div class="flex-grow flex overflow-x-auto snap-x snap-mandatory">
      <FeedColumn
        name="Producthunt"
        icon="logos:producthunt"
        url="https://producthunt.com"
      >
        <FeedProducthunt />
      </FeedColumn>
      <FeedColumn
        name="Hackernews"
        icon="logos:ycombinator"
        url="https://news.ycombinator.com/"
      >
        <FeedHackernews />
      </FeedColumn>
      <FeedColumn
        name="Github Trending (Python)"
        icon="logos:github-icon"
        url="https://github.com/trending/javascript"
      >
        <FeedGithubTrending lang="python" since="daily" />
      </FeedColumn>
      <FeedColumn
        name="MKBHD"
        icon="logos:youtube-icon"
        url="https://youtube.com/@mkbhd"
      >
        <FeedYoutube channel-id="UCBJycsmduvYEL83R_U4JriQ" />
      </FeedColumn>
      <FeedColumn
        name="Dribbble"
        icon="logos:dribbble-icon"
        url="https://dribbble.com/"
      >
        <FeedDribbble />
      </FeedColumn>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { Database } from "@/types/database.types";
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const { data: feeds } = await useAsyncData("feeds", async () => {
  const { data } = await client
    .from("feeds")
    .select("*")
    .eq("user_id", user.value.id);
  return data;
});
</script>
