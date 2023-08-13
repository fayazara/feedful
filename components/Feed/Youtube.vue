<template>
  <div>
    <div
      v-for="(post, id) in posts"
      :key="id"
      class="px-3 py-4 group hover:bg-gray-100"
    >
      <a :href="post.link" target="_blank">
        <img
          :src="post.enclosures[0]"
          :alt="post.title"
          class="aspect-[16/9] border object-cover rounded-xl group-hover:rounded transition-all"
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
</template>

<script lang="ts" setup>
import getYoutubeFeed from "@/lib/getYoutubeFeed";
const props = defineProps<{
  channelId: string;
}>();
const {
  data: posts,
  pending,
  error,
  refresh,
} = await useAsyncData("youtube", () => getYoutubeFeed(props.channelId));
</script>
