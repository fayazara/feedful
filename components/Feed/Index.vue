<template>
  <section
    class="h-full w-full max-w-md flex flex-col flex-shrink-0 snap-center"
    style="-webkit-tap-highlight-color: transparent"
  >
    <header class="py-2 px-4 bg-white flex items-center space-x-3 border-b">
      <Icon v-if="icon" :name="icon" class="h-5 w-5" />
      <h2 class="">
        <a v-if="url" :href="url" target="_blank"> {{ name }} </a>
        <span v-else>{{ name }}</span>
      </h2>
      <span class="flex-1"></span>

      <slot name="actions"></slot>
    </header>
    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </section>
</template>

<script lang="ts" setup>
const props = defineProps<{
  name: string;
  icon?: string;
  url?: string;
}>();
</script>
