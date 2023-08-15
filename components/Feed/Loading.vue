<template>
  <ul class="space-y-6 p-2">
    <li v-for="n in 10" class="grid grid-cols-12 gap-3">
      <USkeleton class="col-span-2 h-16" :ui="{ rounded: 'rounded-xl' }" />
      <div class="col-span-10 space-y-2 mt-1">
        <USkeleton class="h-4 w-full" />
        <USkeleton class="h-4 w-[90%]" />
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup></script>

<style></style>
