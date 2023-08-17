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
    <ul class="divide-y divide-gray-100 h-[50vh] sm:h-[420px] overflow-auto">
      <li>
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          size="xl"
          variant="none"
          color="white"
          :trailing="false"
          placeholder="Search"
        />
      </li>
      <li v-for="feed in feedTypes" :key="feed.type">
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
            <div
              v-if="feed.type === 'github' && selectedFeed.meta"
              class="pb-3 px-4 bg-gray-50 space-y-2"
            >
              <UFormGroup
                label="Language"
                name="language"
                :error="errors.githubLanguage"
              >
                <USelect
                  v-model="selectedGithubMeta.language"
                  :options="programmingLanguages"
                  option-attribute="label"
                  value-attribute="language"
                />
              </UFormGroup>
              <UFormGroup
                label="Since"
                name="since"
                :error="errors.githubSince"
              >
                <USelect
                  v-model="selectedGithubMeta.since"
                  :options="githubFrequencyOptions"
                  option-attribute="label"
                />
              </UFormGroup>
            </div>
            <div
              v-else-if="feed.type === 'youtube' && selectedFeed.meta"
              class="pb-3 px-4 bg-gray-50"
            >
              <div class="relative">
                <div
                  v-if="selectedYoutubeMeta.channelId"
                  class="flex items-center gap-x-2 border-0 rounded-md text-sm px-2.5 py-1.5 shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-gray-300"
                >
                  <UAvatar
                    v-if="selectedYoutubeChannel.thumbnail"
                    :src="selectedYoutubeChannel.thumbnail"
                    size="2xs"
                  />
                  <div class="min-w-0">
                    <p class="truncate">{{ selectedYoutubeChannel.name }}</p>
                  </div>
                  <span class="flex-1"></span>
                  <UButton
                    icon="i-heroicons-x-mark"
                    square
                    color="gray"
                    variant="soft"
                    size="2xs"
                    @click="clearYoutubeChannel"
                  />
                </div>
                <UFormGroup
                  v-else
                  label="Search youtube channels"
                  name="channel"
                  :error="errors.youtubeChannel"
                >
                  <UInput
                    v-model="youtubeQuery"
                    @blur="validateForm"
                    icon="i-heroicons-magnifying-glass-20-solid"
                  />
                </UFormGroup>
                <div
                  v-if="youtubeChannels.length"
                  class="mt-1 border rounded-lg w-full bg-white"
                >
                  <button
                    v-for="channel in youtubeChannels"
                    type="button"
                    @click="selectYoutubeChannel(channel)"
                    class="text-left flex items-cente gap-1 px-2 py-1.5 text-sm text-gray-900 hover:bg-gray-100 w-full"
                  >
                    <div class="flex items-center gap-2 min-w-0">
                      <UAvatar :src="channel.thumbnail" size="2xs" />
                      <span class="truncate">{{ channel.name }}</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div
              v-else-if="feed.type === 'rss' && selectedFeed.meta"
              class="pb-3 px-4 bg-gray-50"
            >
              <UFormGroup
                label="Feed URL"
                name="feedUrl"
                :error="errors.rssFeedUrl"
              >
                <UInput v-model="selectedRssMeta.feedUrl" />
              </UFormGroup>
            </div>
          </template>
        </NewFeedListItem>
      </li>
    </ul>
    <div
      class="h-12 px-4 flex items-center justify-end gap-x-3 border-t border-gray-200 bg-gray-50"
    >
      <UButton color="gray" @click="$emit('close')" variant="soft" size="xs"
        >Cancel</UButton
      >
      <UButton
        @click="submit"
        color="black"
        icon="i-heroicons-arrow-small-right-20-solid"
        :trailing="true"
        :disabled="!selectedFeed.type"
        size="xs"
      >
        Add
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Database } from "@/types/database.types";
import {
  Feed,
  GithubFeedMeta,
  YoutubeFeedMeta,
  RssFeedMeta,
  YoutubeChannel,
} from "@/types/feeds";
import feedTypes from "@/constants/feedtypes";
import {
  programmingLanguages,
  githubFrequencyOptions,
} from "@/constants/githubMeta";
import { refDebounced } from "@vueuse/core";

const client = useSupabaseClient<Database>();
const user = useSupabaseUser();

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
const selectedRssMeta = computed(() => selectedFeed.value.meta as RssFeedMeta);

const errors = ref({
  githubLanguage: "",
  githubSince: "",
  youtubeChannel: "",
  rssFeedUrl: "",
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
    case "rss":
      selectedFeed.value = {
        name: "",
        type: "rss",
        url: "",
        icon: feed?.icon || "",
        meta: {
          feedUrl: "",
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
  errors.value.rssFeedUrl = "";
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

  if (type === "rss" && !meta.feedUrl) {
    errors.value.rssFeedUrl = "Please enter a feed url";
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
  return feed;
}

const youtubeQuery = ref("");
const youtubeChannels = ref<YoutubeChannel[]>([]);

async function searchYoutube(search: string) {
  const channels = await $fetch("/api/youtube", { params: { search } });
  return channels;
}

const debounced = refDebounced(youtubeQuery, 350);

watch(debounced, async () => {
  if (youtubeQuery.value.length > 2) {
    const channels = await searchYoutube(youtubeQuery.value);
    youtubeChannels.value = channels;
  }
});

const selectedYoutubeChannel = ref<YoutubeChannel>({
  id: "",
  name: "",
  thumbnail: "",
});

function selectYoutubeChannel(channel: YoutubeChannel) {
  selectedYoutubeChannel.value = channel;
  selectedYoutubeMeta.value.channelId = channel.id;
  selectedFeed.value.name = channel.name;
  selectedFeed.value.url = `https://youtube.com/channel/${channel.id}`;
  youtubeQuery.value = "";
  youtubeChannels.value = [];
}

function clearYoutubeChannel() {
  selectedYoutubeChannel.value = {
    id: "",
    name: "",
    thumbnail: "",
  };
  selectedYoutubeMeta.value.channelId = "";
  selectedFeed.value.name = "";
  selectedFeed.value.url = "";
}

async function submit() {
  if (!validateForm()) return;
  const feed = transformData(JSON.parse(JSON.stringify(selectedFeed.value)));
  const { data, error } = await client
    .from("feeds")
    .insert({ ...feed, user_id: user.value.id })
    .select("*")
    .single();
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    console.log(data);
  }
}
</script>
