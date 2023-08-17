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
              to="/register"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              register here
            </NuxtLink>
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form action="#" method="POST" class="space-y-6">
              <UFormGroup label="Email address">
                <UInput
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                />
              </UFormGroup>
              <UFormGroup label="Password">
                <UInput
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                />
              </UFormGroup>
              <UButton type="submit" block size="lg">Sign in</UButton>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:flex items-center justify-center">
      <img src="/newspaper.png" alt="News Paper" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
