<template>
  <div class="pb-3 px-4 bg-gray-50">
    <div class="relative">
      <div v-if="selectedChannel.id">
        <label class="text-sm block font-medium text-gray-700">
          Search youtube channels
        </label>
        <div
          class="flex items-center gap-x-2 border-0 rounded-md text-sm px-2.5 h-8 shadow-sm bg-white text-gray-900 ring-1 ring-inset ring-gray-300 mt-1"
        >
          <UAvatar
            v-if="selectedChannel.thumbnail"
            :src="selectedChannel.thumbnail"
            size="2xs"
          />
          <div class="min-w-0">
            <p class="truncate">{{ selectedChannel.name }}</p>
          </div>
          <span class="flex-1"></span>
          <UButton
            icon="i-heroicons-x-mark"
            square
            color="gray"
            variant="soft"
            size="2xs"
            @click="clearSelection"
          />
        </div>
      </div>
      <UFormGroup
        v-else
        label="Search youtube channels"
        name="channel"
        :error="error"
      >
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        />
      </UFormGroup>
      <div
        v-if="channels.length && searchQuery.length > 2"
        class="mt-1 border border-gray-200 rounded-lg w-full bg-white absolute z-20 shadow-lg"
      >
        <button
          v-for="channel in channels"
          type="button"
          @click="setChannel(channel)"
          class="text-left flex items-cente gap-1 px-2 py-1.5 text-sm text-gray-900 hover:bg-gray-50 w-full"
        >
          <div class="flex items-center gap-2 min-w-0">
            <UAvatar :src="channel.thumbnail" size="2xs" />
            <span class="truncate">{{ channel.name }}</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { refDebounced } from "@vueuse/core";
const emit = defineEmits(["setChannel"]);
const props = defineProps<{
  error: string;
}>();
const selectedChannel = ref<YoutubeChannel>({
  id: "",
  name: "",
  thumbnail: "",
});

const searchQuery = ref("");
const channels = ref<YoutubeChannel[]>([]);
const debounced = refDebounced(searchQuery, 350);

watch(debounced, async () => {
  if (searchQuery.value.length > 2) {
    const response = await searchYoutube(searchQuery.value);
    channels.value = response;
  }
});

async function searchYoutube(search: string) {
  const channels = await $fetch("/api/youtube", { params: { search } });
  return channels;
}

function setChannel(channel: YoutubeChannel) {
  selectedChannel.value = channel;
  searchQuery.value = "";
  channels.value = [];
  emit("setChannel", channel);
}

function clearSelection() {
  selectedChannel.value = {
    id: "",
    name: "",
    thumbnail: "",
  };
  searchQuery.value = "";
  channels.value = [];
}
</script>
