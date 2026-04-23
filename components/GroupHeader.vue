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
        @click="$emit('filter')"
      >
        <Filter class="w-4 h-4" :stroke-width="1.5" />
        <span>Filter</span>
      </button>

      <button
        type="button"
        class="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md text-base font-medium hover:bg-slate-800 transition-colors shadow-sm"
        @click="$emit('new-class')"
      >
        <Plus class="w-4 h-4" :stroke-width="1.5" />
        <span>New {{ title }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { Filter, Plus } from "lucide-vue-next";

defineProps({
  title:       { type: String, default: "Classes" },
  description: { type: String, default: "Manage your academic units." },
});

defineEmits(["filter", "new-class"]);
</script>