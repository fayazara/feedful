<template>
  <main class="grid place-items-center min-h-screen">
    <div class="mx-auto w-full max-w-sm px-4 md:px-12">
      <div class="mb-4 flex justify-center">
        <LogoFull class="h-10 w-auto" />
      </div>
      <UForm
        ref="form"
        :validate="validate"
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
              rounded: 'rounded-lg',
              placeholder: 'text-gray-600',
              variant: {
                none: 'bg-gray-100 focus:ring focus:ring-black focus:ring-opacity-10',
              },
            }"
          />
        </UFormGroup>
        <UFormGroup name="confirmPassword">
          <UInput
            id="confirm-password"
            v-model="state.confirmPassword"
            type="password"
            placeholder="Confirm password"
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
            <span v-else>Create account</span>
          </template>
        </UButton>
      </UForm>
      <div class="flex gap-2 items-center justify-center mt-4 p-4 text-center">
        <p class="text-gray-500">
          or,
          <NuxtLink
            to="/auth/login"
            class="underline underline-offset-[3px] decoration-gray-300 focus:outline-none focus:text-black hover:text-black"
            >login.</NuxtLink
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { FormError } from "@nuxthq/ui/dist/runtime/types";
const toast = useToast();
const supabase = useSupabaseClient();
const loading = ref(false);

interface State {
  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

const state = ref<State>({
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const validate = (state: any): FormError[] => {
  const errors: { path: string; message: string }[] = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  if (state.password && state.password.length < 6) {
    errors.push({ path: "password", message: "Must be at least 6 characters" });
  }
  if (!state.confirmPassword) {
    errors.push({ path: "confirmPassword", message: "Required" });
  }
  if (state.password !== state.confirmPassword) {
    errors.push({ path: "confirmPassword", message: "Passwords do not match" });
  }
  return errors;
};

const form = ref<any>(null);

async function submit() {
  await form.value!.validate();
  try {
    loading.value = true;
    const { error } = await supabase.auth.signUp({
      email: state.value.email!,
      password: state.value.password!,
    });
    if (error) {
      console.error(error);
      toast.add({ title: error.message, icon: "i-heroicons-x-circle" });
      return;
    }
    toast.add({
      title: "Account created",
      description: "Check your email for the confirmation link",
      icon: "i-heroicons-check-badge",
    });
    navigateTo("/auth/login");
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
}
</script>
