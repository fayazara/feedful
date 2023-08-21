<template>
  <nav class="h-10 px-4 border-b flex items-center space-x-3">
    <img src="/logo-full.svg" alt="Logo" class="h-9 w-auto" />
    <div class="flex-grow"></div>
    <div class="flex items-center">
      <p class="text-xs text-gray-600 mr-2">{{ date }}</p>
      <UTooltip text="Add Feed">
        <UButton
          icon="i-heroicons-plus-circle"
          size="sm"
          :square="true"
          variant="ghost"
          color="gray"
          @click="$emit('openNewFeedModal')"
        />
      </UTooltip>
      <UDropdown
        v-if="user"
        :items="items"
        :ui="{
          item: { disabled: 'cursor-text select-text' },
          container: 'z-50',
          width: 'w-56',
        }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UButton
          icon="i-heroicons-ellipsis-vertical"
          size="sm"
          :square="true"
          variant="ghost"
          color="gray"
        />

        <template #account="{ item }">
          <div class="flex items-center justify-between w-full">
            <div class="text-left flex flex-col space-y-1">
              <p class="text-xs font-medium leading-none text-gray-900">
                Signed in as
              </p>
              <p class="text-xs leading-none text-gray-500 truncate">
                {{ item.label }}
              </p>
            </div>
            <UAvatar
              src="https://api.dicebear.com/6.x/notionists/svg?seed=Cali"
              alt="user"
            />
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
      <template v-else>
        <UTooltip text="Login">
          <UButton
            to="/auth/login"
            icon="i-lucide-user"
            size="sm"
            :square="true"
            variant="ghost"
            color="gray"
          />
        </UTooltip>
      </template>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const emit = defineEmits(["signOut"]);
const props = defineProps(["user"]);

const date = computed(() => {
  return new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

const items = computed(() => {
  const userLabel = props.user.email ?? "Unknown User";
  return [
    [
      {
        label: userLabel,
        slot: "account",
        disabled: true,
      },
    ],
    [
      {
        label: "Profile",
        icon: "i-lucide-user",
      },
      {
        label: "Feed settings",
        icon: "i-lucide-menu-square",
      },
      {
        label: "Email digest",
        icon: "i-lucide-mail",
      },
      {
        label: "What's new",
        icon: "i-lucide-sparkles",
      },
    ],
    [
      {
        label: "Sign out",
        icon: "i-lucide-log-out",
        click: () => {
          emit("signOut");
        },
      },
    ],
  ];
});
</script>
