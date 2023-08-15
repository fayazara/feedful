<template>
  <div>
    <div class="space-y-2 p-4">
      <UFormGroup name="type" label="Feed type">
        <USelectMenu v-model="selected" :options="feedTypes">
          <template #label>
            <UIcon v-if="selected.icon" :name="selected.icon" class="w-4 h-4" />

            {{ selected.label }}
          </template>
        </USelectMenu>
      </UFormGroup>
      <div class="min-h-[200px] space-y-2">
        <template v-if="selected.id === 'github'">
          <UFormGroup name="programming-language" label="Language">
            <USelectMenu
              v-model="selectedLanguage"
              searchable
              searchable-placeholder="Searcg programming languages..."
              :options="programmingLanguages"
            />
          </UFormGroup>
          <UFormGroup name="since" label="Since">
            <USelectMenu v-model="selectedSince" :options="githubFrequency" />
          </UFormGroup>
        </template>
        <template v-if="selected.id === 'youtube'">
          <div>
            <UFormGroup name="youtube-channel" label="Search youtube channel">
              <UInput
                icon="i-heroicons-magnifying-glass-20-solid"
                placeholder="Start searching..."
                v-model="youtubeUrl"
              />
            </UFormGroup>
            <ul
              v-if="youtubeChannels.length > 0"
              class="relative overflow-y-auto scroll-py-1 ring-1 ring-gray-200 rounded-md shadow-sm mt-2 bg-white p-1 max-h-60"
            >
              <li
                v-for="channel in youtubeChannels"
                class="cursor-pointer select-none relative flex items-center justify-between gap-1 rounded-md px-2 py-1.5 text-sm text-gray-900 hover:bg-gray-100"
                :class="{
                  'bg-gray-100': selectedYoutubeChannel?.id === channel.id,
                }"
                @click="selectedYoutubeChannel = channel"
              >
                <div class="flex items-center gap-2 min-w-0">
                  <UAvatar
                    :src="channel.thumbnail"
                    size="2xs"
                    :alt="channel.label"
                  />
                  <span class="truncate">{{ channel.label }}</span>
                </div>
                <span
                  v-if="selectedYoutubeChannel?.id === channel.id"
                  class="absolute inset-y-0 end-0 flex items-center pe-2"
                >
                  <span
                    class="i-heroicons-check-20-solid h-4 w-4 text-gray-900 dark:text-white flex-shrink-0"
                    aria-hidden="true"
                  >
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <div class="flex items-center justify-end gap-x-2 px-4 py-3 border-t">
      <UButton
        @click="$emit('close')"
        size="xs"
        label="Cancel"
        color="gray"
        variant="soft"
      />
      <UButton
        @click="submit"
        size="xs"
        label="Add"
        class="px-5"
        color="black"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { refDebounced } from "@vueuse/core";

import programmingLanguages from "@/constants/programming-languages";
import { YoutubeChannel, Feed } from "@/types/feeds";

const feedTypes = [
  {
    id: "producthunt",
    label: "Producthunt",
    icon: "i-logos-producthunt",
  },
  {
    id: "hackernews",
    label: "Hackernews",
    icon: "i-logos-ycombinator",
  },
  {
    id: "github",
    label: "Github trending",
    icon: "i-logos-github-icon",
  },
  {
    id: "youtube",
    label: "Youtube",
    icon: "i-logos-youtube-icon",
  },
  {
    id: "dribbble",
    label: "Dribbble Popular",
    icon: "i-logos-dribbble-icon",
  },
];

const githubFrequency = [
  {
    id: "daily",
    label: "Daily",
  },
  {
    id: "weekly",
    label: "Weekly",
  },
  {
    id: "monthly",
    label: "Monthly",
  },
];

const feeds = useState<Feed[]>("feeds");
const selectedLanguage = ref(programmingLanguages[0]);
const selectedSince = ref(githubFrequency[0]);
const selected = ref(feedTypes[0]);
const youtubeUrl = ref("");
const youtubeChannels = ref<YoutubeChannel[]>([]);

const debounced = refDebounced(youtubeUrl, 350);

watch(debounced, async () => {
  if (youtubeUrl.value.length > 3) {
    const channels = await searchYoutube(youtubeUrl.value);
    youtubeChannels.value = channels;
  }
});

const searchYoutube = async (search: string) => {
  const channels = await $fetch("/api/youtube", { params: { search } });
  return channels;
};

const selectedYoutubeChannel = ref({});

const meta = computed(() => {
  if (selected.value.id === "github") {
    return {
      language: selectedLanguage.value,
      since: selectedSince.value,
    };
  }
  if (selected.value.id === "youtube") {
    return selectedYoutubeChannel.value;
  }
  return {};
});

async function submit() {
  const feed = {
    type: selected.value,
    meta: meta.value,
  };
  console.log(feed);
}
</script>
