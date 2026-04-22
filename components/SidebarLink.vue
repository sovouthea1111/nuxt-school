<template>
  <NuxtLink
    :to="to"
    :class="[
      'flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium',
      active
        ? 'bg-gray-100 text-gray-900'
        : danger
          ? 'text-gray-500 hover:text-red-600 hover:bg-red-50'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50',
    ]"
  >
    <Icon :name="icon" class="text-lg flex-shrink-0" />
    <span>{{ label }}</span>
    <span
      v-if="badge"
      class="ml-auto bg-gray-900 text-white text-xs font-medium px-1.5 py-0.5 rounded-full"
    >
      {{ badge }}
    </span>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: { type: String, default: "/" },
  icon: { type: String, required: true },
  label: { type: String, required: true },
  active: { type: Boolean, default: false },
  danger: { type: Boolean, default: false },
  badge: { type: Number, default: null },
});
</script>
