<template>
  <main class="h-screen flex flex-col">
    <Navbar
      @openNewFeedModal="newFeedModal = true"
      :user="user"
      @signOut="signOut"
      @changelog="changelogModal = true"
      @account="accountModal = true"
      @emailDigest="emailDigestModal = true"
      @feedSettings="feedSettingsModal = true"
      @report="reportModal = true"
    />
    <div
      v-if="pending"
      class="flex-grow flex items-center justify-center flex-col gap-3 text-gray-700 animate-pop-in"
    >
      <Spinner class="h-5 w-5 animate-1" />
      <div class="animate-2">Fetching your feeds...</div>
    </div>
    <div
      v-else-if="feeds && feeds.length"
      class="flex-grow flex overflow-x-auto snap-x snap-mandatory bg-white"
      ref="feedContainer"
    >
      <FeedColumn v-for="(feed, i) in feeds" :key="feed.id">
        <component
          ref="feedcomponent"
          :is="components(feed.type)"
          v-bind="{ ...feed.meta }"
          @delete="deleteFeed(feed)"
          :name="feed.name!"
          :icon="feed.icon!"
          :url="feed.url!"
        />
      </FeedColumn>
    </div>
    <div
      v-else
      class="flex-grow flex items-center justify-center flex-col gap-3"
    >
      <EmptyState />
      <h2 class="text-lg">
        {{
          !user
            ? "Please login to add some columns"
            : "You have not added feeds yet"
        }}
      </h2>
      <UButton
        v-if="user"
        @click="newFeedModal = true"
        variant="solid"
        color="gray"
        size="sm"
      >
        Add a feed now
      </UButton>
      <UButton v-else to="/auth/login" variant="solid" color="gray" size="sm">
        Login
      </UButton>
    </div>
    <UModal
      v-model="newFeedModal"
      :ui="{
        padding: 'p-0',
        rounded: 'rounded-t-xl sm:rounded-xl',
        transition: {
          enterFrom: 'opacity-0 translate-y-full sm:translate-y-0 sm:scale-95',
          leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
        },
      }"
    >
      <NewFeedForm @close="newFeedModal = false" @save="pushNewFeed" />
    </UModal>
    <UModal v-model="changelogModal">
      <AppChangelog @close="changelogModal = false" />
    </UModal>
    <UModal v-model="reportModal">
      <AppReportIssue @close="reportModal = false" />
    </UModal>
    <UModal v-model="emailDigestModal">
      <AppEmailDigest @close="emailDigestModal = false" />
    </UModal>
  </main>
</template>

<script lang="ts" setup>
import { Database } from "@/types/database.types";

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const toast = useToast();

const newFeedModal = ref(false);
const changelogModal = ref(false);
const accountModal = ref(false);
const emailDigestModal = ref(false);
const feedSettingsModal = ref(false);
const reportModal = ref(false);
const feedContainer = ref<HTMLDivElement>();
const feedcomponent = ref(null);

const { data: feeds, pending } = await useAsyncData(
  "feeds",
  async () => {
    const { data } = await client
      .from("feeds")
      .select("*")
      .eq("user_id", user.value.id)
      .order("created_at", { ascending: true });
    return data as Feed[];
  },
  {
    lazy: true,
    server: false,
  }
);

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
    if (feedContainer.value) {
      setTimeout(() => {
        feedContainer.value?.scrollTo({
          left: feedContainer.value.scrollWidth,
          behavior: "smooth",
        });
      }, 200);
    }
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
  else {
    window.location.reload();
  }
};
</script>
