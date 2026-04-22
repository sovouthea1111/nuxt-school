<template>
  <button
    v-bind="$attrs"
    :class="[
      'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 shadow-sm',
      variantClasses,
      sizeClasses,
      iconOnly ? 'p-0' : '',
    ]"
  >
    <iconify-icon
      v-if="iconLeft"
      :icon="iconLeft"
      stroke-width="1.5"
      class="text-lg"
    />
    <slot />
    <iconify-icon
      v-if="iconRight"
      :icon="iconRight"
      stroke-width="1.5"
      class="text-lg"
    />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  iconLeft: {
    type: String,
    default: "",
  },
  iconRight: {
    type: String,
    default: "",
  },
  iconOnly: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = computed(() => {
  const map = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
    secondary:
      "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-600",
    ghost: "text-slate-600 hover:bg-slate-100 focus:ring-slate-300 shadow-none",
    accent:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-600",
  };
  return map[props.variant] ?? map.primary;
});

const sizeClasses = computed(() => {
  if (props.iconOnly) {
    const map = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-10 w-10" };
    return map[props.size] ?? map.md;
  }
  const map = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };
  return map[props.size] ?? map.md;
});
</script>
