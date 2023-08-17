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
        <FeedAddItem
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
              <UFormGroup label="Language" name="language">
                <USelect
                  v-model="selectedGithubMeta.language"
                  :options="programmingLanguages"
                  option-attribute="label"
                  value-attribute="language"
                />
              </UFormGroup>
              <UFormGroup label="Since" name="since">
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
              <UFormGroup label="Channel" name="channel">
                <UInput v-model="selectedYoutubeMeta.channel" />
              </UFormGroup>
            </div>
            <div
              v-else-if="feed.type === 'rss' && selectedFeed.meta"
              class="pb-3 px-4 bg-gray-50"
            >
              <UFormGroup label="Feed URL" name="feedUrl">
                <UInput v-model="selectedRssMeta.feedUrl" />
              </UFormGroup>
            </div>
          </template>
        </FeedAddItem>
      </li>
    </ul>
    <div
      class="h-12 px-4 flex items-center justify-end gap-x-3 border-t border-gray-200 bg-gray-50"
    >
      <UButton color="gray" @click="$emit('close')" variant="soft" size="xs"
        >Cancel</UButton
      >
      <UButton
        @click="submit()"
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
import {
  Feed,
  GithubFeedMeta,
  YoutubeFeedMeta,
  RssFeedMeta,
} from "@/types/feeds";
import feedTypes from "@/constants/feedtypes";
import programmingLanguages from "@/constants/programming-languages";
const githubFrequencyOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];
const selectedFeed = ref<Feed>({
  name: "",
  type: "",
  url: "",
});

const selectedGithubMeta = computed(
  () => selectedFeed.value.meta as GithubFeedMeta
);
const selectedYoutubeMeta = computed(
  () => selectedFeed.value.meta as YoutubeFeedMeta
);
const selectedRssMeta = computed(() => selectedFeed.value.meta as RssFeedMeta);

function selectFeed(type: string) {
  switch (type) {
    case "github":
      selectedFeed.value = {
        name: "Github",
        type: "github",
        url: "",
        meta: {
          language: "",
          since: "daily",
        },
      };
      break;
    case "youtube":
      selectedFeed.value = {
        name: "Youtube",
        type: "youtube",
        url: "",
        meta: {
          channel: "",
        },
      };
      break;
    case "rss":
      selectedFeed.value = {
        name: "RSS",
        type: "rss",
        url: "",
        meta: {
          feedUrl: "",
        },
      };
      break;
    default:
      const feed = feedTypes.find((feed) => feed.type === type);
      selectedFeed.value = {
        name: feed?.name || "",
        type: feed?.type || "",
        url: feed?.url || "",
      };
      break;
  }
}

function submit() {
  console.log(selectedFeed.value);
}
</script>
