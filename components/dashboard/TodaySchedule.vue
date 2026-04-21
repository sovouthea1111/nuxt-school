<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
    <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
      <h2 class="text-base font-medium text-gray-900">Today's Schedule</h2>
      <button class="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        View full
      </button>
    </div>
    <div class="overflow-x-auto flex-1">
      <table class="min-w-full divide-y divide-gray-100">
        <thead class="bg-gray-50/50">
          <tr>
            <th class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            <th class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
            <th class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
            <th class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
            <th class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="row in schedule"
            :key="row.time"
            class="hover:bg-gray-50/50 transition-colors"
          >
            <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500">{{ row.time }}</td>
            <td class="px-5 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{{ row.class }}</td>
            <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-600">{{ row.subject }}</td>
            <td class="px-5 py-3 whitespace-nowrap text-sm text-gray-500">{{ row.room }}</td>
            <td class="px-5 py-3 whitespace-nowrap">
              <span
                v-if="row.status === 'Completed'"
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600"
              >
                Completed
              </span>
              <span
                v-else-if="row.status === 'In Progress'"
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-gray-200 text-gray-900 relative"
              >
                <span class="absolute -left-1 w-2 h-2 rounded-full bg-gray-900" />
                <span class="ml-1.5">In Progress</span>
              </span>
              <span
                v-else
                class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-500"
              >
                Upcoming
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  schedule: {
    type: Array,
    default: () => [
      { time: '08:00 - 09:30', class: 'Grade 10-A', subject: 'Advanced Mathematics', room: 'Lab 302',  status: 'Completed'  },
      { time: '09:45 - 11:15', class: 'Grade 11-B', subject: 'Physics',              room: 'Room 104', status: 'In Progress' },
      { time: '11:30 - 13:00', class: 'Grade 9-C',  subject: 'World History',        room: 'Room 201', status: 'Upcoming'    },
      { time: '14:00 - 15:30', class: 'Grade 12-A', subject: 'Computer Science',     room: 'Lab 405',  status: 'Upcoming'    },
    ],
  },
})
</script>