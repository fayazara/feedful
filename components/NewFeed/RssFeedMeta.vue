<template>
  <div class="pb-3 px-4 bg-gray-50">
    <UFormGroup label="Rss Feed URL" name="rssFeedUrl" :error="error">
      <UInput
        :value="modelValue"
        type="url"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </UFormGroup>
  </div>
</template>

<script lang="ts" setup>
defineProps(["modelValue", "error"]);
defineEmits(["update:modelValue"]);
</script>
