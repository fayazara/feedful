<template>
  <main class="grid place-items-center min-h-screen">
    <div class="mx-auto w-full max-w-sm px-4 md:px-12">
      <div class="mb-4 flex justify-center">
        <LogoFull class="h-10 w-auto" />
      </div>
      <UForm
        ref="form"
        :schema="schema"
        :state="state"
        @submit.prevent="submit"
        class="space-y-3"
      >
        <UFormGroup name="email">
          <UInput
            v-model="state.email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            size="lg"
            variant="none"
            :ui="{
              rounded: 'rounded-lg',
              placeholder: 'text-gray-600',
              variant: {
                none: 'bg-gray-100 focus:ring focus:ring-black focus:ring-opacity-10',
              },
            }"
          />
        </UFormGroup>
        <UFormGroup name="password">
          <UInput
            v-model="state.password"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            size="lg"
            variant="none"
            :ui="{
              icon: { trailing: { pointer: '' } },
              rounded: 'rounded-lg',
              placeholder: 'text-gray-600',
              variant: {
                none: 'bg-gray-100 focus:ring focus:ring-black focus:ring-opacity-10',
              },
            }"
          >
            <template #trailing>
              <UTooltip text="Forgot your password?">
                <UButton
                  variant="ghost"
                  size="sm"
                  :padded="false"
                  :square="true"
                  color="gray"
                  icon="i-heroicons-question-mark-circle-20-solid"
                />
              </UTooltip>
            </template>
          </UInput>
        </UFormGroup>
        <UButton
          type="submit"
          :ui="{ rounded: 'rounded-lg' }"
          size="lg"
          block
          color="black"
          class="transition-transform active:scale-[0.98]"
          :disabled="loading"
        >
          <template #default>
            <span v-if="loading">
              <Spinner class="h-5 w-5" />
            </span>
            <span v-else>Sign in</span>
          </template>
        </UButton>
      </UForm>
      <div class="flex gap-2 items-center justify-center mt-4 p-4 text-center">
        <p class="text-gray-500">
          or,
          <NuxtLink
            to="/auth/register"
            class="underline underline-offset-[3px] decoration-gray-300 focus:outline-none focus:text-black hover:text-black"
            >create an account</NuxtLink
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { z } from "zod";
const toast = useToast();
const supabase = useSupabaseClient();
const loading = ref(false);

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const state = ref({
  email: undefined,
  password: undefined,
});

const form = ref();

async function submit() {
  await form.value!.validate();
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: state.value.email!,
      password: state.value.password!,
    });
    if (error) {
      console.error(error);
      toast.add({ title: error.message, icon: "i-heroicons-x-circle" });
      return;
    }
    navigateTo("/");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
