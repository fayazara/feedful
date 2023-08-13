<template>
  <nav class="h-12 px-4 border-b flex items-center space-x-3">
    <img src="/logo-full.svg" alt="Logo" class="h-10 w-auto" />
    <p class="text-sm text-gray-600">{{ date }}</p>
    <div class="flex-grow"></div>
    <div class="flex items-center gap-x-2">
      <UTooltip text="Add Feed">
        <UButton
          icon="i-heroicons-plus-circle"
          size="sm"
          :square="true"
          variant="soft"
          color="gray"
          @click="newFeedModal = true"
        />
      </UTooltip>
      <UDropdown
        :items="items"
        :ui="{
          item: { disabled: 'cursor-text select-text' },
          container: 'z-50',
        }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar
          src="https://github.com/fayazara.png"
          class="ring-2 ring-gray-200"
          size="xs"
        />

        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>
          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-500 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </div>
    <UModal v-model="newFeedModal">
      <FeedNew @close="newFeedModal = false" />
    </UModal>
  </nav>
</template>

<script lang="ts" setup>
const newFeedModal = ref(false);

const date = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

const items = [
  [
    {
      label: "fayaz@feedful.app",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
    },
    {
      label: "Changelog",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];
</script>

<style></style>
