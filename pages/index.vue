<template>
  <main class="h-screen flex flex-col">
    <Navbar
      @openNewFeedModal="newFeedModal = true"
      :user="user"
      @signOut="signOut"
    />
    <div
      v-if="feeds && feeds.length"
      class="flex-grow flex overflow-x-auto snap-x snap-mandatory bg-white"
    >
      <FeedColumn
        v-for="feed in feeds"
        :key="feed.id"
        :name="feed.name!"
        :icon="feed.icon!"
        :url="feed.url!"
        @delete="deleteFeed(feed)"
        @refresh="
          () => {
            console.log('refresh');
          }
        "
      >
        <component :is="components(feed.type)" v-bind="{ ...feed.meta }" />
      </FeedColumn>
    </div>
    <div
      v-else
      class="flex-grow flex items-center justify-center flex-col gap-3"
    >
      <EmptyState />
      <h2 class="text-lg">You have not added feeds yet</h2>
      <UButton
        @click="newFeedModal = true"
        variant="solid"
        color="gray"
        size="sm"
      >
        Add a feed now
      </UButton>
    </div>
    <UModal
      v-model="newFeedModal"
      :ui="{
        padding: 'p-0',
        rounded: 'rounded-t-xl sm:rounded-xl',
        overlay: {
          background: 'bg-[rgba(0,8,47,.275)] saturate-50',
        },
        transition: {
          enterFrom: 'opacity-0 translate-y-full sm:translate-y-0 sm:scale-95',
          leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
        },
      }"
    >
      <NewFeedForm @close="newFeedModal = false" @save="pushNewFeed" />
    </UModal>
  </main>
</template>

<script lang="ts" setup>
import { Database } from "@/types/database.types";
const client = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();
const newFeedModal = ref(false);

const { data: feeds } = await useAsyncData("feeds", async () => {
  const { data } = await client
    .from("feeds")
    .select("*")
    .eq("user_id", user.value.id)
    .order("created_at", { ascending: true });
  return data as Feed[];
});

const components = (type: string) => {
  const feedMap: Record<string, string> = {
    producthunt: "FeedProducthunt",
    hackernews: "FeedHackernews",
    github: "FeedGithubTrending",
    youtube: "FeedYoutube",
    dribbble: "FeedDribbble",
    reddit: "FeedReddit",
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
  toast.add({ title: `${feed.name} deleted` });
};

const signOut = async () => {
  const { error } = await client.auth.signOut();
  if (error) console.log(error);
  feeds.value = [];
};
</script>
