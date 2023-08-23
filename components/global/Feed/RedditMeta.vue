<template>
  <div class="flex items-center pt-4 gap-x-5 text-xs text-gray-500">
    <div class="flex items-center gap-x-1">
      <Icon name="lucide:arrow-up-down" class="h-4 w-4" />
      <span>{{ votes }}</span>
    </div>
    <div class="flex items-center gap-x-1">
      <Icon name="lucide:message-square" class="h-4 w-4" />
      <span>{{ comments }}</span>
    </div>
    <div class="flex items-center gap-x-1 min-w-0">
      <Icon name="lucide:clock-3" class="h-4 w-4" />
      <span class="truncate">{{ getTimeAgo(createdAt) }}</span>
    </div>
    <div class="flex items-center gap-x-1 min-w-0">
      <Icon name="lucide:user" class="h-4 w-4" />
      <span class="truncate">{{ author }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTimeAgo } from "@/utils";

const props = defineProps<{
  votes: number;
  comments: number;
  author: string;
  createdAt: number;
}>();
</script>
