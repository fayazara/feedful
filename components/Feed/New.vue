<template>
  <div>
    <div
      class="py-2 px-4 flex items-center justify-between border-b border-gray-200 bg-gray-50"
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
      <li v-for="feed in feedTypes" :key="feed.type">
        <button
          @click="selectedFeed.type = feed.type"
          class="flex items-center gap-x-2 text-left w-full hover:bg-gray-50 py-3 px-4 relative"
          :class="[
            { 'opacity-50 cursor-auto': feed.disabled },
            { 'bg-gray-50': selectedFeed.type === feed.type },
          ]"
          :disabled="feed.disabled"
        >
          <div
            class="bg-gray-50 ring-1 ring-gray-200 h-10 w-10 rounded-lg flex items-center justify-center"
          >
            <Icon :name="feed.icon" class="h-6 w-6 rounded" />
          </div>
          <div>
            <p>{{ feed.name }}</p>
            <p class="text-xs text-gray-500">{{ feed.description }}</p>
          </div>
          <div
            v-if="selectedFeed.type === feed.type"
            class="ml-2 flex items-center justify-center absolute right-2 inset-y-0"
          >
            <Icon name="ph:check-circle" class="h-5 w-5 text-gray-500" />
          </div>
        </button>
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
      </li>
    </ul>
    <div
      class="py-3 px-4 flex items-center justify-end gap-x-3 border-t border-gray-200 bg-gray-50"
    >
      <UButton color="gray" @click="$emit('close')" variant="soft" size="xs"
        >Cancel</UButton
      >
      <UButton
        color="black"
        icon="i-heroicons-arrow-small-right-20-solid"
        :trailing="true"
        :disabled="!selectedFeed"
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
  type: "producthunt",
  url: "",
});

const selectedGithubMeta = computed(
  () => selectedFeed.value.meta as GithubFeedMeta
);
const selectedYoutubeMeta = computed(
  () => selectedFeed.value.meta as YoutubeFeedMeta
);
const selectedRssMeta = computed(() => selectedFeed.value.meta as RssFeedMeta);

watch(selectedFeed.value, (newFeed) => {
  if (newFeed.type === "github") {
    newFeed.meta = {
      language: "all",
      since: "daily",
    };
  } else if (newFeed.type === "youtube") {
    newFeed.meta = {
      channel: "",
    };
  } else if (newFeed.type === "rss") {
    newFeed.meta = {
      feedUrl: "",
    };
  } else {
    if (newFeed.meta) {
      delete newFeed.meta;
    }
  }
});
</script>
