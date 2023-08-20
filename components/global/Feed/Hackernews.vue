<template>
  <FeedLoading v-if="pending" />
  <div v-else>
    <div v-for="post in posts" :key="post.id">
      <a
        :href="post.url"
        target="_blank"
        class="flex gap-2 px-3 py-4 hover:bg-gray-50"
      >
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm text-gray-900 break-words">
            {{ post.title }}
          </p>
          <p class="text-xs text-gray-500 mt-1 truncate min-w-0 flex-1">
            {{ post.url }}
          </p>
        </div>
        <div
          class="h-12 w-10 flex-shrink-0 border rounded flex items-center justify-center flex-col gap-px"
        >
          <Icon
            name="ic:baseline-arrow-drop-up"
            class="h-6 w-6 flex-shrink-0 text-gray-500"
          />
          <span class="text-xs">{{ post.points || "-" }}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
  data: posts,
  pending,
  error,
  refresh,
} = await useFetch("/api/feed/hackernews", {
  server: false,
});
</script>
