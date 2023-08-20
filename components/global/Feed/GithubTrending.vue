<template>
  <FeedLoading v-if="pending" />
  <div v-else>
    <div v-for="(repo, id) in repos" :key="id">
      <a
        :href="repo.url"
        target="_blank"
        class="flex px-3 gap-2 py-4 hover:bg-gray-50"
      >
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm text-gray-900 break-words">
            {{ repo.title }}
          </p>
          <p class="text-xs text-gray-500 mt-1 min-w-0 flex-1 break-words">
            {{ repo.description }}
          </p>
        </div>
        <div
          class="h-12 w-12 flex-shrink-0 border rounded flex items-center justify-center flex-col gap-px"
        >
          <Icon name="heroicons:star-20-solid" class="h-3 w-3 flex-shrink-0" />
          <span class="text-xs">{{ repo.stars || "-" }}</span>
        </div>
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  language: string;
  since: string;
}>();

const {
  data: repos,
  pending,
  error,
  refresh,
} = await useFetch("/api/feed/github-trending", {
  params: {
    lang: props.language,
    since: props.since,
  },
  server: false,
});
</script>
