<template>
  <div>
    <UFormGroup label="Language" :error="error.githubLanguage">
      <USelect
        v-model="language"
        :options="programmingLanguages"
        option-attribute="label"
        value-attribute="language"
      />
    </UFormGroup>
    <UFormGroup label="Since" :error="error.githubSince">
      <USelect
        v-model="since"
        :options="githubFrequencyOptions"
        option-attribute="label"
      />
    </UFormGroup>
  </div>
</template>

<script setup>
import programmingLanguages from "@/constants/programming-languages";
const githubFrequencyOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  language: String,
  since: String,
  error: Object,
});

const emit = defineEmits(["update:language", "update:since"]);
</script>
constants/githubMeta
