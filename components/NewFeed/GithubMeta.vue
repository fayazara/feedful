<template>
  <div class="pb-3 px-4 bg-gray-50 space-y-2">
    <UFormGroup label="Language" name="language" :error="languageError">
      <USelect
        :options="programmingLanguages"
        option-attribute="label"
        value-attribute="language"
        :value="language"
        @input="$emit('update:language', $event.target.value)"
      />
    </UFormGroup>
    <UFormGroup label="Since" name="since" :error="sinceError">
      <USelect
        :options="githubFrequencyOptions"
        option-attribute="label"
        :value="since"
        @input="$emit('update:since', $event.target.value)"
      />
    </UFormGroup>
  </div>
</template>

<script lang="ts" setup>
import {
  programmingLanguages,
  githubFrequencyOptions,
} from "@/constants/githubMeta";

const emit = defineEmits(["update:language", "update:since"]);
const props = defineProps<{
  language: string;
  since: string;
  languageError: string;
  sinceError: string;
}>();
</script>
