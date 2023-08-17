<template>
  <div>
    <UFormGroup label="Search youtube channels" :error="error.youtubeChannel">
      <UInput
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        icon="i-heroicons-magnifying-glass-20-solid"
      />
    </UFormGroup>
  </div>
</template>

<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
