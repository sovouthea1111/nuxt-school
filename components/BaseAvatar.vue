<template>
  <div
    :class="[
      'rounded-full flex items-center justify-center font-medium flex-shrink-0 overflow-hidden',
      sizeClasses,
      !src ? colorClasses : 'bg-slate-300 border-2 border-white shadow-sm',
    ]"
  >
    <img
      v-if="src"
      :src="src"
      :alt="initials || 'avatar'"
      class="w-full h-full object-cover"
    />

    <span v-else-if="initials">{{ initials }}</span>

    <iconify-icon
      v-else
      icon="solar:user-linear"
      stroke-width="1.5"
      :class="iconSizeClass"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  initials: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  color: {
    type: String,
    default: "indigo",
  },
});

const sizeClasses = computed(() => {
  const map = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };
  return map[props.size] ?? map.md;
});

const iconSizeClass = computed(() => {
  const map = { sm: "text-sm", md: "text-lg", lg: "text-xl" };
  return map[props.size] ?? map.md;
});

const colorClasses = computed(() => {
  const textSizeMap = { sm: "text-[10px]", md: "text-xs", lg: "text-sm" };
  const textSize = textSizeMap[props.size] ?? "text-xs";

  const colorMap = {
    slate: `bg-slate-200   text-slate-600   ${textSize}`,
    indigo: `bg-indigo-100  text-indigo-700  ${textSize}`,
    emerald: `bg-emerald-100 text-emerald-700 ${textSize}`,
  };
  return colorMap[props.color] ?? colorMap.indigo;
});
</script>
