<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-black/30 backdrop-blur-sm"
        @click="$emit('update:modelValue', false)"
      />

      <div
        class="relative bg-white rounded-xl shadow-xl w-full max-w-sm z-10 p-6 space-y-4"
      >
        <div
          class="flex items-center justify-center w-11 h-11 rounded-full bg-rose-50 mx-auto"
        >
          <i
            data-lucide="trash-2"
            stroke-width="1.5"
            class="w-5 h-5 text-rose-600"
          ></i>
        </div>

        <div class="text-center space-y-1">
          <h2 class="text-base font-semibold text-slate-900">{{ title }}</h2>
          <p class="text-sm text-gray-500">{{ description }}</p>
        </div>

        <div class="flex items-center gap-3 pt-1">
          <button
            class="flex-1 px-4 py-2 text-sm font-medium border border-gray-200 text-gray-600 rounded-md hover:bg-gray-50 transition-colors"
            @click="$emit('update:modelValue', false)"
          >
            Cancel
          </button>
          <button
            class="flex-1 px-4 py-2 text-sm font-medium bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
            @click="onConfirm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { onMounted } from "vue";

defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "Delete Record" },
  description: { type: String, default: "This action cannot be undone." },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

function onConfirm() {
  emit("confirm");
  emit("update:modelValue", false);
}

onMounted(() => {
  if (window.lucide) window.lucide.createIcons();
});
</script>
