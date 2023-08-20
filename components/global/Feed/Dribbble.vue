<template>
  <FeedLoading v-if="pending" />
  <div v-else>
    <div
      v-for="(post, id) in posts"
      :key="id"
      class="px-3 py-4 group hover:bg-gray-50"
    >
      <a :href="post.url" target="_blank">
        <img
          :src="post.image"
          :alt="post.title"
          class="aspect-[4/3] w-full h-auto border object-cover rounded-xl"
        />
        <p class="font-medium text-sm text-gray-900 break-words mt-3">
          {{ post.title }}
        </p>
        <div class="flex items-center justify-end gap-x-2 text-gray-500 mt-3">
          <img
            class="h-5 w-5 rounded-full"
            :src="post.authorAvatar"
            :alt="post.author"
          />
          <p class="text-xs">{{ post.author }}</p>
          <Icon name="ph:heart-duotone" class="h-4 w-4" />
          <span class="text-xs">{{ post.likes }}</span>
          <Icon name="ph:eye-duotone" class="h-4 w-4" />
          <span class="text-xs">{{ post.views }}</span>
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
} = await useFetch("/api/feed/dribbble", {
  server: false,
});
</script>
