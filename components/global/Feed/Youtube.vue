<template>
  <FeedHeader
    :name="name"
    :icon="icon"
    :url="url"
    @refresh="refresh"
    @delete="$emit('delete')"
  />
  <div class="flex-1 overflow-auto">
    <FeedLoading v-if="pending" />
    <div v-else>
      <div
        v-for="(post, id) in posts"
        :key="id"
        class="px-3 py-4 group hover:bg-gray-50"
      >
        <a :href="post.link" target="_blank">
          <img
            :src="post.enclosures[0]"
            :alt="post.title"
            class="aspect-[16/9] border object-cover rounded-xl"
          />
          <p class="font-medium text-sm text-gray-900 break-words mt-3">
            {{ post.title }}
          </p>
          <p
            class="text-xs text-gray-500 mt-1 min-w-0 flex-1 break-words line-clamp-3"
          >
            {{ post.description }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  channelId: string;
  name: string;
  url: string;
  icon: string;
}>();
const {
  data: posts,
  pending,
  error,
  refresh,
} = await useFetch("/api/feed/youtube", {
  params: {
    channel: props.channelId,
  },
  server: false,
  lazy: true,
});
</script>
