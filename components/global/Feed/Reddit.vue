<template>
  <FeedLoading v-if="pending" />
  <div v-else class="divide-y">
    <div
      v-for="(post, id) in posts"
      :key="id"
      class="px-3 py-4 group hover:bg-gray-100"
    >
      <a :href="post.url" target="_blank">
        <div v-if="post.is_image" class="flex flex-col gap-2">
          <div class="flex gap-x-2">
            <img
              :src="post.thumbnail"
              :alt="post.title"
              class="h-20 w-20 rounded-lg ring-1 ring-gray-200"
            />
            <div>
              <p class="text-xs text-gray-500">{{ post.subreddit }}</p>
              <p
                v-if="post.title"
                class="font-medium text-sm text-gray-900 break-words"
              >
                {{ post.title }}
              </p>
              <p
                v-if="post.text"
                class="text-xs text-gray-500 mt-1 min-w-0 flex-1 break-words line-clamp-3"
              >
                {{ post.text }}
              </p>
            </div>
          </div>
          <FeedRedditMeta
            :votes="post.votes"
            :comments="post.comments"
            :author="post.author"
            :created-at="post.created_at"
          />
        </div>
        <div v-else-if="post.is_video" class="flex flex-col gap-2">
          <p
            v-if="post.title"
            class="font-medium text-sm text-gray-900 break-words"
          >
            {{ post.title }}
          </p>
          <video
            preload="metadata"
            :poster="post.thumbnail"
            :src="post.video_url"
            controls
            class="w-full aspect-[16/9] rounded-lg ring-1 ring-gray-200"
          />
          <p class="text-xs text-gray-500">{{ post.subreddit }}</p>

          <p
            v-if="post.text"
            class="text-xs text-gray-500 mt-1 min-w-0 flex-1 break-words line-clamp-3"
          >
            {{ post.text }}
          </p>
          <FeedRedditMeta
            :votes="post.votes"
            :comments="post.comments"
            :author="post.author"
            :created-at="post.created_at"
          />
        </div>
        <div v-else class="flex flex-col gap-2">
          <p class="text-xs text-gray-500">{{ post.subreddit }}</p>
          <p
            v-if="post.title"
            class="font-medium text-sm text-gray-900 break-words"
          >
            {{ post.title }}
          </p>
          <p
            v-if="post.text"
            class="text-xs text-gray-500 mt-1 min-w-0 flex-1 break-words line-clamp-3"
          >
            {{ post.text }}
          </p>
          <FeedRedditMeta
            :votes="post.votes"
            :comments="post.comments"
            :author="post.author"
            :created-at="post.created_at"
          />
        </div>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  subreddit: string;
}>();
const {
  data: posts,
  pending,
  error,
  refresh,
} = await useFetch("/api/feed/reddit", {
  params: {
    subreddit: props.subreddit,
  },
  server: false,
});
</script>
