<template>
  <div class="space-y-3 mt-3">
    <div class="relative">
      <div class="absolute inset-0 flex items-center" aria-hidden="true">
        <div class="w-full border-t border-gray-200" />
      </div>
      <div class="relative flex justify-center text-sm font-medium leading-6">
        <span class="bg-white px-6 text-gray-900">or continue with</span>
      </div>
    </div>
    <UButton
      @click="login('github')"
      type="button"
      :ui="{ rounded: 'rounded-lg' }"
      size="lg"
      block
      color="black"
      class="transition-transform active:scale-[0.98] h-10"
      :padded="false"
    >
      <Icon name="i-bi-github" class="h-5 w-5" />
      Github
    </UButton>
    <UButton
      @click="login('google')"
      type="button"
      :ui="{ rounded: 'rounded-lg' }"
      size="lg"
      block
      color="black"
      class="transition-transform active:scale-[0.98] h-10"
      :padded="false"
    >
      <Icon name="logos:google-icon" class="h-5 w-5" />
      Google
    </UButton>
  </div>
</template>

<script lang="ts" setup>
const supabase = useSupabaseClient();
const login = async (provider: string) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider as any,
    options: { redirectTo: `${useRuntimeConfig().public.baseUrl}/auth/confirm` },
  });
  if (error) console.log(error);
};
</script>
