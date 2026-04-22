<template>
  <label class="relative flex items-start cursor-pointer group">
    <div class="flex h-5 items-center">
      <input
        type="checkbox"
        class="peer sr-only"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <div
        class="h-4 w-4 rounded border border-slate-300 bg-white transition-all peer-checked:bg-indigo-600 peer-checked:border-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-600/20 peer-focus:ring-offset-1 flex items-center justify-center after:content-[''] after:w-1.5 after:h-2.5 after:border-r-[1.5px] after:border-b-[1.5px] after:border-white after:rotate-45 after:-mt-0.5 after:opacity-0 peer-checked:after:opacity-100"
      />
    </div>

    <div class="ml-2.5 text-sm">
      <span
        class="font-medium text-slate-700 group-hover:text-slate-900 transition-colors"
      >
        {{ label }}
      </span>
      <p v-if="description" class="text-xs text-slate-500 mt-0.5">
        {{ description }}
      </p>
    </div>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
