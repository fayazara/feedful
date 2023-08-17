<template>
  <div class="flex min-h-screen flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gray-50 border-r-0 lg:border-r"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-10 w-auto" src="/logo-full.svg" alt="Feedful logo" />
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Not a member?
            <NuxtLink
              to="/auth/register"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              register here
            </NuxtLink>
          </p>
        </div>

        <div class="mt-10">
          <div>
            <UForm
              ref="form"
              :schema="schema"
              :state="state"
              @submit.prevent="submit"
              class="space-y-6"
            >
              <UFormGroup label="Email address" name="email">
                <UInput
                  v-model="state.email"
                  id="email"
                  type="email"
                  autocomplete="email"
                />
              </UFormGroup>
              <UFormGroup label="Password" name="password">
                <UInput
                  v-model="state.password"
                  id="password"
                  type="password"
                  autocomplete="current-password"
                />
              </UFormGroup>
              <UButton
                type="submit"
                block
                size="lg"
                :label="loading ? 'Signing in' : 'Sign in'"
                :loading="loading"
                :disabled="loading"
              />
            </UForm>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:flex items-center justify-center">
      <img src="/newspaper.png" alt="News Paper" />
    </div>
  </div>
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
  loading.value = true;
  await form.value!.validate();
  const { error } = await supabase.auth.signInWithPassword({
    email: state.value.email!,
    password: state.value.password!,
  });
  if (error) {
    console.error(error);
    toast.add({ title: error.message, icon: "i-heroicons-x-circle" });
    return;
  }
  toast.add({ title: "Logged in", icon: "i-heroicons-check-badge" });
  navigateTo("/");
}
</script>
