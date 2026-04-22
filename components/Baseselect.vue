<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="block text-xs font-medium text-slate-700">
      {{ label }}
    </label>

    <div class="relative flex items-center w-full">
      <select
        :value="modelValue"
        class="w-full pl-3 pr-10 py-2 bg-white border border-slate-300 rounded-md text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none text-slate-700 cursor-pointer"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <iconify-icon
        icon="solar:alt-arrow-down-linear"
        stroke-width="1.5"
        class="absolute right-3 text-slate-400 text-lg pointer-events-none"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "Select an option...",
  },
  options: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["update:modelValue"]);
</script>
