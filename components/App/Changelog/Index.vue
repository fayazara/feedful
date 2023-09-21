<template>
  <div>
    <header
      class="pl-4 py-2 pr-2 flex items-center gap-x-3 border-b border-gray-100"
    >
      <Icon name="lucide:sparkles" class="text-sky-600" />
      <p>Changelog</p>
      <span class="flex-1"></span>
      <UButton
        variant="soft"
        icon="i-heroicons-x-mark"
        color="gray"
        square
        size="2xs"
        @click="$emit('close')"
      />
    </header>
    <div class="h-[600px] sm:h-96  overflow-y-auto">
      <div class="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-4">
        <AppChangelogTimeline
          v-for="(item, i) in changelog"
          :key="i"
          :top="i > 0"
          :title="item.title"
          :date="item.date"
          :description="item.description"
          :category="item.category"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const changelog = [
  {
    title: "v0.9.2 - Fix the feeds issue",
    description:
      "Fixed the weird issues feeds wont load",
    category: "Bug",
    date: "Aug 31, 2023",
  },
  {
    title: "v0.9.1 - Re enabled youtube",
    description:
      "Re enabled adding youtube channels as feeds.",
    category: "Bug",
    date: "Aug 31, 2023",
  },
  {
    title: "v0.9.0 - UI Polishing and Final Beta Updates",
    description:
      "Made several UI improvements for a smoother and more visually appealing user experience. Scroll animation to the end when a new feed is added. This concludes the beta phase.",
    category: "UI",
    date: "Aug 26, 2023",
  },
  {
    title: "v0.8.0 - Bug Fixes and Performance Enhancements",
    description:
      "Addressed various issues and improved performance for a more stable beta experience.",
    category: "Bug",
    date: "Aug 24, 2023",
  },
  {
    title: "v0.7.0 - Social Authentication Added",
    description: "Introduced login via Google and Github for beta users.",
    category: "Feature",
    date: "Aug 24, 2023",
  },
  {
    title: "v0.6.0 - Bugs and UI Improvements",
    description:
      "Fixed a lot of bugs and issues, enhancing the overall user interface as well.",
    category: "Bug",
    date: "Aug 21, 2023",
  },
  {
    title: "v0.5.0 - Subreddits as feed",
    description: "Added the ability to add any subreddit as a feed.",
    category: "Feature",
    date: "Aug 20, 2023",
  },
  {
    title: "v0.4.0 - Progressive Web App (PWA) Experience",
    description:
      "Transformed the app into a PWA, enabling installation on phones and desktops for beta users.",
    category: "Feature",
    date: "Aug 17, 2023",
  },
  {
    title: "v0.3.0 - User Authentication",
    description:
      "Implemented authentication with Supabase, allowing beta users to sign up and log in to save feeds.",
    category: "Feature",
    date: "Aug 17, 2023",
  },
  {
    title: "v0.2.0 - Feed Customization and UI Enhancements",
    description:
      "Added the modal for adding new feeds, underwent iterative design improvements.",
    category: "UI",
    date: "Aug 15, 2023",
  },
  {
    title: "v0.1.0 - Initial Beta Release",
    description:
      "Welcome to the beta version of feedful! Enjoy exploring and providing feedback.",
    category: "Kickoff",
    date: "Aug 14, 2023",
  },
];
</script>
