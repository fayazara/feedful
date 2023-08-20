<template>
  <section
    class="h-full w-full max-w-md flex border-r flex-col flex-shrink-0 snap-center"
    style="-webkit-tap-highlight-color: transparent"
  >
    <header class="h-10 px-4 pe-2 bg-white flex items-center space-x-3 border-b">
      <Icon v-if="icon" :name="icon" class="h-5 w-5" />
      <h2 class="">
        <a v-if="url" :href="url" target="_blank"> {{ name }} </a>
        <span v-else>{{ name }}</span>
      </h2>
      <span class="flex-1"></span>
      <UDropdown :items="actions">
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          size="sm"
          :square="true"
          variant="ghost"
          color="gray"
        />
      </UDropdown>
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
const emit = defineEmits(["edit", "delete"]);
const actions = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      disabled: true,
      click: () => {
        emit("delete");
      },
    },
    {
      label: "Delete",
      icon: "i-lucide-trash-2",
      click: () => {
        emit("delete");
      },
    },
  ],
];
</script>
