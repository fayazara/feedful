<template>
  <ul>
    <li v-for="n in 10" class="flex items-center space-x-4">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-lg' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup></script>

<style></style>
