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
            Create your account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Already a member?
            <NuxtLink
              to="/login"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              login here
            </NuxtLink>
          </p>
        </div>

        <div class="mt-10">
          <div>
            <UForm
              ref="form"
              :validate="validate"
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
              <UFormGroup label="Confirm password" name="confirmPassword">
                <UInput
                  v-model="state.confirmPassword"
                  id="confirm-password"
                  type="password"
                />
              </UFormGroup>
              <UButton type="submit" block size="lg"> Register </UButton>
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
const loading = ref(false);
const state = ref({
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const validate = (state: any) => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  if (!state.confirmPassword) {
    errors.push({ path: "confirmPassword", message: "Required" });
  }
  if (state.password !== state.confirmPassword) {
    errors.push({ path: "confirmPassword", message: "Passwords do not match" });
  }
  return errors;
};

const form = ref();

async function submit() {
  loading.value = true;
  await form.value!.validate();
  try {
    console.log(state.value);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<style></style>
