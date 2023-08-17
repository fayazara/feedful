<template>
  <div>
    <UFormGroup label="Feed URL" :error="error.rssFeedUrl">
      <UInput
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </UFormGroup>
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
