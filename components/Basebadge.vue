<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 border font-medium',
      dot ? 'px-2.5 py-1 rounded-full text-sm' : 'px-2 py-0.5 rounded text-xs',
      resolved.container,
    ]"
  >
    <span
      v-if="dot"
      class="w-1.5 h-1.5 rounded-full flex-shrink-0"
      :class="resolved.dot"
    />
    {{ displayLabel }}<slot />
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  status: {
    type: String,
    default: "neutral",
  },
  label: {
    type: String,
    default: "",
  },
  dot: {
    type: Boolean,
    default: false,
  },
});

const STATUS_MAP = {
  success: {
    container: "bg-emerald-50  text-emerald-700 border-emerald-200/60",
    dot: "bg-emerald-500",
    label: "Success",
  },
  warning: {
    container: "bg-amber-50    text-amber-700   border-amber-200/60",
    dot: "bg-amber-500",
    label: "Warning",
  },
  error: {
    container: "bg-rose-50     text-rose-700    border-rose-200/60",
    dot: "bg-rose-500",
    label: "Error",
  },
  info: {
    container: "bg-indigo-50   text-indigo-700  border-indigo-200/60",
    dot: "bg-indigo-500",
    label: "Info",
  },
  neutral: {
    container: "bg-slate-100   text-slate-700   border-slate-200",
    dot: "bg-slate-400",
    label: "Neutral",
  },

  active: {
    container: "bg-green-50    text-green-700   border-green-200/60",
    dot: "bg-green-500",
    label: "Active",
  },
  inactive: {
    container: "bg-rose-50     text-rose-700    border-rose-200/60",
    dot: "bg-rose-500",
    label: "Inactive",
  },
  "starting-soon": {
    container: "bg-yellow-50   text-yellow-700  border-yellow-200/60",
    dot: "bg-yellow-500",
    label: "Starting Soon",
  },
  full: {
    container: "bg-gray-100    text-gray-700    border-gray-200",
    dot: "bg-gray-500",
    label: "Full",
  },
  pending: {
    container: "bg-amber-50    text-amber-700   border-amber-200/60",
    dot: "bg-amber-500",
    label: "Pending",
  },
  overdue: {
    container: "bg-rose-100    text-rose-800    border-rose-200/60",
    dot: "bg-rose-600",
    label: "Overdue",
  },
  draft: {
    container: "bg-slate-100   text-slate-700   border-slate-200",
    dot: "bg-slate-400",
    label: "Draft",
  },
  processing: {
    container: "bg-indigo-50   text-indigo-700  border-indigo-200/60",
    dot: "bg-indigo-500",
    label: "Processing",
  },
  paid: {
    container: "bg-emerald-50  text-emerald-700 border-emerald-200/60",
    dot: "bg-emerald-500",
    label: "Paid",
  },
  cancelled: {
    container: "bg-slate-100   text-slate-600   border-slate-200",
    dot: "bg-slate-400",
    label: "Cancelled",
  },
};

const resolved = computed(() => STATUS_MAP[props.status] ?? STATUS_MAP.neutral);
const displayLabel = computed(() => props.label || resolved.value.label);
</script>
