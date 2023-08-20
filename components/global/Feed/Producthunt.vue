<template>
  <FeedLoading v-if="pending" />
  <div v-else>
    <div v-for="post in posts" :key="post.id">
      <a
        :href="post.url"
        target="_blank"
        class="flex px-3 py-4 gap-5 hover:bg-gray-50"
      >
        <UAvatar
          :src="post.thumbnail.url"
          :alt="post.name"
          size="lg"
          class="ring-1 ring-gray-200"
          :ui="{ rounded: 'rounded-lg' }"
        />
        <div class="flex-1">
          <p class="font-medium text-sm text-gray-900">{{ post.name }}</p>
          <p class="text-xs text-gray-500 mt-1">{{ post.tagline }}</p>
        </div>
        <div
          class="h-12 w-10 flex-shrink-0 border rounded flex items-center justify-center flex-col gap-px"
        >
          <Icon
            name="ic:baseline-arrow-drop-up"
            class="h-6 w-6 flex-shrink-0 text-gray-500"
          />
          <span class="text-xs">{{ post.votesCount || "-" }}</span>
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
} = await useFetch("/api/feed/producthunt", {
  server: false,
});
</script>
