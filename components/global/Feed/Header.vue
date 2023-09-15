<template>
  <header
    class="h-10 px-4 pe-2 bg-white flex items-center space-x-3 border-b min-w-0"
  >
    <Icon :name="icon" class="h-5 w-5" />
    <h2 class="truncate">
      <a :href="url" target="_blank"> {{ name }} </a>
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
</template>

<script lang="ts" setup>
defineProps<{
  name: string;
  url: string;
  icon: string;
}>();
const emit = defineEmits(["delete", "refresh"]);
const actions = [
  [
    {
      label: "Refresh",
      icon: "i-lucide-rotate-cw",
      click: () => {
        emit("refresh");
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
