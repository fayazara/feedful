<template>
  <section>
    <h2 class="text-gray-500 leading-6 text-sm pl-8 m-0">
      <span>{{ date }}</span>
    </h2>
    <div class="pt-2 pl-8 pb-16 relative">
      <div
        class="absolute bottom-0 left-0 w-px bg-slate-200"
        :class="top ? '-top-6' : '-top-3'"
      ></div>
      <div
        class="bg-white border-slate-300 border-2 rounded-full w-[0.5625rem] h-[0.5625rem] -left-1 -top-[1.0625rem] absolute"
      ></div>

      <div
        class="max-w-none prose-h3:mb-4 prose-h3:text-base prose-h3:leading-6 prose-sm prose prose-slate prose-a:font-semibold prose-a:text-sky-500 hover:prose-a:text-sky-600"
      >
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <UBadge
          :label="category"
          variant="subtle"
          :color="category === 'Bug' ? 'red' : 'primary'"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  trail: Boolean,
  category: String,
  top: Boolean,
  date: String,
});
</script>
