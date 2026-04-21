<template>
  <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
    <div class="flex justify-between items-start">
      <p class="text-sm font-medium text-gray-500">{{ label }}</p>
      <div class="p-2 bg-gray-50 rounded-lg">
        <iconify-icon :icon="icon" stroke-width="1.5" class="text-gray-700 text-lg" />
      </div>
    </div>
    <div class="mt-4 flex items-baseline gap-2">
      <p class="text-2xl font-medium tracking-tight text-gray-900">{{ value }}</p>
      <span class="text-xs font-medium text-gray-500 flex items-center">
        <iconify-icon :icon="trendIcon" class="mr-0.5" />
        {{ change }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label:  { type: String, required: true },
  value:  { type: [String, Number], required: true },
  change: { type: String, required: true },
  trend:  { type: String, default: 'up' },
  icon:   { type: String, required: true },
})

const trendIcon = computed(() => {
  if (props.trend === 'up')   return 'solar:arrow-right-up-linear'
  if (props.trend === 'down') return 'solar:arrow-right-down-linear'
  return 'solar:minus-linear'
})
</script>