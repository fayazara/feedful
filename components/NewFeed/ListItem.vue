<template>
  <div>
    <button
      class="flex items-center gap-x-2 text-left w-full hover:bg-gray-50 py-3 px-4 relative"
      :class="[
        { 'opacity-50 cursor-auto': disabled },
        { 'bg-gray-50': selected },
      ]"
      :disabled="disabled"
      @click="disabled || $emit('select')"
    >
      <div
        class="bg-gray-50 ring-1 ring-gray-200 h-10 w-10 rounded-lg flex items-center justify-center"
      >
        <Icon :name="icon" class="h-6 w-6 rounded" />
      </div>
      <div class="flex-1">
        <div class="flex items-center justify-between">
          <p>{{ name }}</p>
          <UBadge
            v-if="disabled"
            variant="subtle"
            color="primary"
            size="xs"
            label="Coming soon"
          />
        </div>
        <p class="text-xs text-gray-500">{{ description }}</p>
      </div>
      <div
        v-if="selected"
        class="ml-2 flex items-center justify-center absolute right-2 inset-y-0"
      >
        <Icon name="ph:check-circle" class="h-5 w-5 text-gray-500" />
      </div>
    </button>
    <slot v-if="selected"></slot>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  description: string;
  icon: string;
  selected: boolean;
  disabled: boolean;
}>();
</script>

<style></style>
