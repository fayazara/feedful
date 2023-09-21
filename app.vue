<template>
  <VitePwaManifest />
  <NuxtLoadingIndicator color="#334155" />
  <NuxtPage />
  <UNotifications />
</template>

<script setup>
useSeoMeta({
  title: "Feedful - a modern news reader",
  ogTitle: "Feedful - a modern news reader",
  description:
    "A tweet deck styled modern news reader that helps you stay up to date with your favorite websites.",
  ogDescription:
    "A tweet deck styled modern news reader that helps you stay up to date with your favorite websites.",
  ogImage: "https://feedful.app/banner.png",
  twitterCard: "summary_large_image",
});
</script>
