<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
    <div class="px-5 py-4 border-b border-gray-100">
      <h2 class="text-base font-medium text-gray-900">Recent Activity</h2>
    </div>
    <div class="p-5 flex-1 overflow-y-auto">
      <div class="space-y-6">
        <div v-for="(item, index) in activities" :key="index" class="flex gap-4">
          <div class="mt-0.5 relative">
            <div class="h-8 w-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
              <Icon :icon="item.icon" class="text-gray-600" />
            </div>
            <div
              v-if="index < activities.length - 1"
              class="absolute top-8 left-4 bottom-[-24px] w-px bg-gray-100"
            />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ item.title }}</p>
            <p class="text-sm text-gray-500 mt-0.5">{{ item.description }}</p>
            <p class="text-xs text-gray-400 mt-1">{{ item.time }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

defineProps({
  activities: {
    type: Array,
    default: () => [
      {
        icon: "solar:document-add-linear",
        title: "Term 1 Results Published",
        description: "Grades for all senior classes have been updated.",
        time: "10 minutes ago",
      },
      {
        icon: "solar:user-check-linear",
        title: "New Student Enrollment",
        description: "Sarah Jenkins enrolled in Grade 10-A.",
        time: "2 hours ago",
      },
      {
        icon: "solar:calendar-add-linear",
        title: "Staff Meeting Scheduled",
        description: "Monthly academic review set for Friday.",
        time: "Yesterday",
      },
    ],
  },
});
</script>