<script setup lang="ts">
const user = useSupabaseUser();
watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>
<template>
  <main
    class="h-screen flex items-center justify-center flex-col gap-5 text-gray-700 animate-pop-in"
  >
    <Spinner class="h-5 w-5 animate-1" />
    <div class="animate-2">validating your login...</div>
  </main>
</template>

<style scoped>
.animate-1 {
  animation: fade-up 0.9s 0.1s cubic-bezier(0, 0.9, 0.3, 1.15) forwards;
  opacity: 0;
}
.animate-2 {
  animation: fade-up 0.9s 0.3s cubic-bezier(0, 0.9, 0.3, 1.15) forwards;
  opacity: 0;
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(4rem);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
</style>
