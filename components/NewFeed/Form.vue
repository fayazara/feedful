<template>
  <div>
    <div
      class="h-12 px-4 flex items-center justify-between border-b border-gray-200 bg-gray-50"
    >
      <h2 class="text-sm">Add Feed</h2>
      <UButton
        variant="soft"
        icon="i-heroicons-x-mark"
        color="gray"
        square
        size="xs"
        @click="$emit('close')"
      />
    </div>
    <div class="sticky top-0 bg-white z-20 border-b border-gray-200">
      <UInput
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        variant="none"
        color="white"
        :trailing="false"
        placeholder="Search"
      />
    </div>
    <ul
      class="divide-y divide-gray-100 h-[65vh] pwa:h-[72vh] sm:h-[420px] overflow-auto"
    >
      <li v-for="feed in feedTypes" :key="feed.type" class="relative">
        <NewFeedListItem
          :key="feed.type"
          @select="selectFeed(feed.type)"
          :name="feed.name"
          :description="feed.description"
          :icon="feed.icon"
          :selected="selectedFeed.type === feed.type"
          :disabled="feed.disabled"
        >
          <template v-if="selectedFeed.type === feed.type">
            <NewFeedGithubMeta
              v-if="feed.type === 'github' && selectedFeed.meta"
              v-model:language="selectedGithubMeta.language"
              v-model:since="selectedGithubMeta.since"
              :language-error="errors.githubLanguage"
              :since-error="errors.githubSince"
            />
            <NewFeedYoutubeMeta
              v-else-if="feed.type === 'youtube' && selectedFeed.meta"
              @setChannel="selectYoutubeChannel"
              :error="errors.youtubeChannel"
            />
            <NewFeedRedditMeta
              v-else-if="feed.type === 'reddit' && selectedFeed.meta"
              :error="errors.subreddit"
              v-model="selectedRedditMeta.subreddit"
            />
          </template>
        </NewFeedListItem>
      </li>
    </ul>
    <footer
      class="h-12 pwa:h-20 px-4 flex items-center justify-end gap-x-3 border-t border-gray-200 bg-gray-50 pwa:pb-8"
    >
      <UButton
        type="button"
        color="gray"
        @click="$emit('close')"
        variant="soft"
        size="xs"
        >Cancel</UButton
      >
      <UButton
        @click="submit"
        color="black"
        :trailing="true"
        :disabled="!selectedFeed.type"
        size="xs"
        class="w-16 flex items-center justify-center"
      >
        <template #default>
          <span v-if="loading">
            <Spinner class="h-4 w-4" />
          </span>
          <span v-else>Add</span>
        </template>
      </UButton>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { Database } from "@/types/database.types";
import feedTypes from "@/constants/feedtypes";

import { programmingLanguages } from "@/constants/githubMeta";

const loading = ref(false);

const toast = useToast();

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

const emit = defineEmits(["save"]);
const selectedFeed = ref<Feed>({
  name: "",
  type: "",
  url: "",
  icon: "",
});

const selectedGithubMeta = computed(
  () => selectedFeed.value.meta as GithubFeedMeta
);
const selectedYoutubeMeta = computed(
  () => selectedFeed.value.meta as YoutubeFeedMeta
);

const selectedRedditMeta = computed(
  () => selectedFeed.value.meta as RedditFeedMeta
);

const errors = ref({
  githubLanguage: "",
  githubSince: "",
  youtubeChannel: "",
  subreddit: "",
});

function selectFeed(type: string) {
  const feed = feedTypes.find((feed) => feed.type === type);
  switch (type) {
    case "github":
      selectedFeed.value = {
        name: "",
        type: "github",
        url: "",
        icon: feed?.icon || "",
        meta: {
          language: "all",
          since: "daily",
        },
      };
      break;
    case "youtube":
      selectedFeed.value = {
        name: "",
        type: "youtube",
        url: "",
        icon: feed?.icon || "",
        meta: {
          channelId: "",
        },
      };
      break;
    case "reddit":
      selectedFeed.value = {
        name: "",
        type: "reddit",
        url: "",
        icon: feed?.icon || "",
        meta: {
          subreddit: "",
        },
      };
      break;
    default:
      selectedFeed.value = {
        name: feed?.name || "",
        type: feed?.type || "",
        url: feed?.url || "",
        icon: feed?.icon || "",
      };
      break;
  }
}

function resetErrors() {
  errors.value.githubLanguage = "";
  errors.value.githubSince = "";
  errors.value.youtubeChannel = "";
  errors.value.subreddit = "";
}

function validateForm() {
  resetErrors();
  const { type } = selectedFeed.value;
  const meta = selectedFeed.value.meta as any;

  if (type === "github") {
    if (!meta.language) {
      errors.value.githubLanguage = "Please select a language";
      return false;
    }
    if (!meta.since) {
      errors.value.githubSince = "Please select a frequency";
      return false;
    }
  }

  if (type === "youtube" && !meta.channelId) {
    errors.value.youtubeChannel = "Channel required";
    return false;
  }

  if (type === "reddit" && !meta.subreddit) {
    errors.value.subreddit = "Please enter a subreddit";
    return false;
  }

  return true;
}

function transformData(feed: Feed) {
  if (feed.type === "github") {
    const name = programmingLanguages.find(
      (lang) => lang.language === selectedGithubMeta.value.language
    )?.label;
    const lang = selectedGithubMeta.value.language === "all" ? "" : name;
    const since = selectedGithubMeta.value.since;
    const url = `https://github.com/trending/${lang}?since=${since}`;
    return {
      ...feed,
      name: `Github Trending (${name} - ${selectedGithubMeta.value.since})`,
      url,
    };
  }
  if (feed.type === "youtube") {
    return {
      ...feed,
      url: `https://youtube.com/channel/${selectedYoutubeMeta.value.channelId}`,
    };
  }
  if (feed.type === "reddit") {
    return {
      ...feed,
      name: `r/${selectedRedditMeta.value.subreddit}`,
      url: `https://reddit/com/r/${selectedRedditMeta.value.subreddit}`,
    };
  }
  return feed;
}

function selectYoutubeChannel(channel: YoutubeChannel) {
  console.log(channel);
  selectedYoutubeMeta.value.channelId = channel.id;
  selectedFeed.value.name = channel.name;
  selectedFeed.value.url = `https://youtube.com/channel/${channel.id}`;
}

async function submit() {
  if (!validateForm()) return;
  try {
    loading.value = true;
    const feed = transformData(JSON.parse(JSON.stringify(selectedFeed.value)));
    if (!user.value) {
      return toast.add({
        title: "Error",
        description: "You need to be logged in to add a feed",
        icon: "i-heroicons-x-circle",
        color: "red",
      });
    } else {
      const { data, error } = await client
        .from("feeds")
        .insert({ ...feed, user_id: user.value.id })
        .select("id, name, type, url, icon, meta")
        .single();
      if (error) {
        throw error;
      }
      if (data) {
        emit("save", data);
      }
    }
  } catch (error) {
    toast.add({
      title: "Error",
      description: error.message,
      icon: "i-heroicons-x-circle",
      color: "red",
    });
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
