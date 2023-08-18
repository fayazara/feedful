<template>
  <main class="h-screen flex flex-col">
    <Navbar @openNewFeedModal="newFeedModal = true" />
    <div class="flex-grow flex overflow-x-auto snap-x snap-mandatory">
      <FeedColumn
        v-for="feed in feeds"
        :key="feed.id"
        :name="feed.name!"
        :icon="feed.icon!"
        :url="feed.url!"
        @delete="deleteFeed(feed)"
      >
        <component :is="components(feed.type)" v-bind="{ ...feed.meta }" />
      </FeedColumn>
    </div>
    <UModal v-model="newFeedModal">
      <NewFeedForm @close="newFeedModal = false" @save="pushNewFeed" />
    </UModal>
  </main>
</template>

<script lang="ts" setup>
import { Database } from "@/types/database.types";
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const newFeedModal = ref(false);

const { data: feeds } = await useAsyncData("feeds", async () => {
  const { data } = await client
    .from("feeds")
    .select("*")
    .eq("user_id", user.value.id);
  return data as Feed[];
});

const components = (type: string) => {
  const feedMap: Record<string, string> = {
    producthunt: "FeedProducthunt",
    hackernews: "FeedHackernews",
    github: "FeedGithubTrending",
    youtube: "FeedYoutube",
    dribbble: "FeedDribbble",
  };
  return feedMap[type] as string;
};

const pushNewFeed = (feed: Feed) => {
  if (feed) {
    feeds.value?.push(feed);
    newFeedModal.value = false;
  }
};

const deleteFeed = async (feed: Feed) => {
  if (feeds.value) {
    feeds.value = feeds.value.filter((f) => f.id !== feed.id);
  }
  await client.from("feeds").delete().match({ id: feed.id });
};
</script>
