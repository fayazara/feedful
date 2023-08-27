<template>
  <div>
    <UForm
      ref="form"
      :validate="validate"
      :state="report"
      @submit.prevent="submit"
      class="p-4"
    >
      <p class="font-medium">Have a question or found a bug?</p>
      <p class="text-sm text-gray-500 mt-4">Let us know!</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-3 gap-y-2 mt-2">
        <UButton
          icon="i-lucide-bug"
          square
          type="button"
          :color="report.type === 'Bug' ? 'black' : 'gray'"
          label="Bug"
          @click="report.type = 'Bug'"
          class="transition-transform active:scale-[0.98]"
        />
        <UButton
          icon="i-lucide-lightbulb"
          square
          type="button"
          :color="report.type === 'Feature' ? 'black' : 'gray'"
          label="Feature request"
          @click="report.type = 'Feature'"
          class="transition-transform active:scale-[0.98]"
        />
        <UButton
          icon="i-lucide-help-circle"
          square
          type="button"
          :color="report.type === 'Other' ? 'black' : 'gray'"
          label="Something else"
          @click="report.type = 'Other'"
          class="transition-transform active:scale-[0.98]"
        />
      </div>
      <UFormGroup name="message">
        <UTextarea
          v-model="report.message"
          class="mt-2"
          :placeholder="
            report.type === 'Bug'
              ? 'Describe the bug'
              : report.type === 'Feature'
              ? 'Describe the feature you would like to see'
              : 'Write your message here'
          "
        />
      </UFormGroup>
      <div class="flex items-center justify-end mt-2">
        <UButton
          type="submit"
          color="black"
          size="xs"
          class="transition-transform active:scale-[0.98]"
          :disabled="loading"
          :ui="{ rounded: 'rounded-md' }"
        >
          <template #default>
            <span v-if="loading">
              <Spinner class="h-4 w-4" />
            </span>
            <span v-else>Submit</span>
          </template>
        </UButton>
      </div>
    </UForm>
    <div class="items-center justify-center flex text-xs py-1 text-gray-400">
      <p>Widget powered by <a class="underline">Feedbackjar</a></p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const toast = useToast();
const emit = defineEmits(["close"]);
import type { FormError } from "@nuxthq/ui/dist/runtime/types";
const loading = ref(false);
const user = useSupabaseUser();
const report = ref({
  type: "Bug",
  message: undefined,
  email: user.value.email ?? undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.message) {
    errors.push({ path: "message", message: "Required" });
  } else if (state.message.length < 10) {
    errors.push({
      path: "message",
      message: "Message should be at least 10 characters",
    });
  } else if (state.message.length > 500) {
    errors.push({
      path: "message",
      message: "Message should be less than 500 characters",
    });
  }
  return errors;
};
const form = ref();

async function submit() {
  await form.value!.validate();
  try {
    loading.value = true;
    await useFetch("/api/report", {
      method: "POST",
      body: JSON.stringify(report.value),
    });
    toast.add({
      title: "Report submitted",
      description: "Thank you for your feedback!",
    });
    report.value.message = undefined;
    emit("close");
  } catch (err) {
    console.error(err);
    toast.add({
      title: "An error occured, please email us at hi@feedful.app",
      icon: "i-heroicons-x-circle",
    });
  } finally {
    loading.value = false;
  }
}
</script>
