<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight text-slate-900">
        {{ title }}
      </h1>
      <p class="text-base text-gray-500 mt-1">{{ description }}</p>
    </div>
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2 border border-gray-200 text-slate-900 bg-white rounded-md text-base font-medium hover:bg-gray-50 transition-colors"
        @click="handleFilter"
      >
        <i data-lucide="filter" class="w-4 h-4 pointer-events-none"></i>
        <span>Filter</span>
      </button>

      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-base font-medium hover:bg-slate-800 transition-colors shadow-sm"
        @click="handleNewClass"
      >
        <i data-lucide="plus" class="w-4 h-4 pointer-events-none"></i>
        <span>New {{ title.toLowerCase() }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, nextTick } from "vue";

const props = defineProps({
  title: { type: String, default: "Classes" },
  description: { type: String, default: "Manage your academic units." },
});

const emit = defineEmits(["filter", "new-class"]);

function handleFilter() {
  emit("filter");
}

function handleNewClass() {
  emit("new-class");
}

onMounted(() => {
  nextTick(() => {
    if (window.lucide) window.lucide.createIcons();
  });
});
</script>
