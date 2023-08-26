<template>
  <div class="relative flex gap-x-4">
    <div
      v-if="trail"
      class="absolute -bottom-6 left-0 top-0 flex w-6 justify-center"
    >
      <div class="w-px bg-gray-200 dark:bg-gray-800" />
    </div>
    <div
      className="relative flex h-6 w-6 flex-none items-center justify-center bg-white"
    >
      <div
        className="h-1.5 w-1.5 rounded-full bg-gray-300 ring-1 ring-gray-400"
      ></div>
    </div>
    <div class="w-full">
      <div class="flex items-center min-w-0 justify-between">
        <p
          class="py-0.5 leading-5 text-gray-800 text-sm dark:text-gray-300 font-semibold truncate"
        >
          {{ title }}
        </p>
        <UBadge
          variant="subtle"
          size="xs"
          :label="category"
          :color="category === 'Bug' ? 'red' : 'primary'"
        />
      </div>
      <p class="text-gray-600 dark:text-gray-400 mt-2 text-xs">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  trail: Boolean,
  category: String,
});
</script>
