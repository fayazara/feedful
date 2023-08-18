<template>
  <div class="flex items-center pt-4 gap-x-5 text-xs text-gray-500">
    <div class="flex items-center gap-x-1">
      <Icon name="heroicons:arrows-up-down-20-solid" class="h-4 w-4" />
      <span>{{ votes }}</span>
    </div>
    <div class="flex items-center gap-x-1">
      <Icon name="heroicons:chat-bubble-left-ellipsis" class="h-4 w-4" />
      <span>{{ comments }}</span>
    </div>
    <div class="flex items-center gap-x-1 min-w-0">
      <Icon name="heroicons:chat-bubble-left-ellipsis" class="h-4 w-4" />
      <span class="truncate">{{ timeAgo }}</span>
    </div>
    <div class="flex items-center gap-x-1 min-w-0">
      <Icon name="heroicons:user" class="h-4 w-4" />
      <span class="truncate">{{ author }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatTimeAgo } from "@vueuse/core";

const props = defineProps<{
  votes: number;
  comments: number;
  author: string;
  createdAt: number;
}>();

const timeAgo = computed(() => {
  const time = new Date(props.createdAt * 1000);
  return formatTimeAgo(time);
});
</script>
