<template>
  <div class="p-4 space-y-3">
    <ul class="divide-y divide-gray-100">
      <li v-for="feed in feedTypes" :key="feed.type">
        <button
          @click="selectedFeed = feed.type"
          class="flex items-center gap-x-2 text-left w-full rounded-lg hover:bg-gray-50 py-3 px-2 relative"
          :class="[
            { 'opacity-50 cursor-auto': feed.disabled },
            { 'bg-gray-50': selectedFeed === feed.type },
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
            v-if="selectedFeed === feed.type"
            class="ml-2 flex items-center justify-center absolute right-2 inset-y-0"
          >
            <Icon name="ph:check-circle" class="h-5 w-5 text-gray-500" />
          </div>
        </button>
      </li>
      <li class="pt-3 flex items-center justify-end gap-x-3">
        <UButton color="gray" @click="$emit('close')" variant="soft"
          >Cancel</UButton
        >
        <UButton
          color="black"
          icon="i-heroicons-arrow-small-right-20-solid"
          :trailing="true"
          :disabled="!selectedFeed"
        >
          Add
        </UButton>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const selectedFeed = ref("");
const feedTypes = [
  {
    type: "producthunt",
    name: "Producthunt",
    icon: "logos:producthunt",
    description: "Top products of the day",
  },
  {
    type: "hackernews",
    name: "Hackernews",
    icon: "logos:ycombinator",
    description: "Hackernews home page",
  },
  {
    type: "github",
    name: "Github Trending",
    icon: "logos:github-icon",
    description: "Trending repositories on Github",
  },
  {
    type: "youtube",
    name: "Youtube",
    icon: "logos:youtube-icon",
    description: "Pick a channel and watch the latest videos",
  },
  {
    type: "dribbble",
    name: "Dribbble",
    icon: "logos:dribbble-icon",
    description: "Trending shots on Dribbble",
  },
  {
    type: "rss",
    name: "Publication or Blog",
    icon: "ph:rss-simple-bold",
    description: "Subscribe via RSS feed",
  },
  {
    type: "newsletter",
    name: "Newsletter",
    icon: "logos:google-gmail",
    description: "via Gmail (coming soon)",
    disabled: true,
  },
  {
    type: "substack",
    name: "Substack publication",
    icon: "simple-icons:substack",
    description: "Subscribe to a Substack publication",
    disabled: true,
  },
];
</script>
