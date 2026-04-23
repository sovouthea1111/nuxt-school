<template>
  <div
    class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between"
  >
    <div class="flex justify-between items-start">
      <p class="text-sm font-medium text-gray-500">{{ label }}</p>
      <div class="p-2 bg-gray-50 rounded-lg">
        <component
          :is="icon"
          class="w-4 h-4 text-gray-700"
          :stroke-width="1.5"
        />
      </div>
    </div>
    <div class="mt-4 flex items-baseline gap-2">
      <p class="text-2xl font-medium tracking-tight text-gray-900">
        {{ value }}
      </p>
      <span
        class="text-xs font-medium flex items-center gap-0.5"
        :class="
          trend === 'up'
            ? 'text-emerald-600'
            : trend === 'down'
              ? 'text-rose-500'
              : 'text-gray-500'
        "
      >
        <component :is="trendIcon" class="w-3 h-3" :stroke-width="2" />
        {{ change }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { TrendingUp, TrendingDown, Minus } from "lucide-vue-next";

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  change: { type: String, required: true },
  trend: { type: String, default: "up" },
  icon: { type: Object, required: true },
});

const trendIcon = computed(() => {
  if (props.trend === "up") return TrendingUp;
  if (props.trend === "down") return TrendingDown;
  return Minus;
});
</script>
