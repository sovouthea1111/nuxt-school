<template>
  <header
    class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 flex-shrink-0"
  >
    <div class="flex items-center flex-1 gap-4">
      <button class="md:hidden text-gray-500 hover:text-gray-900 focus:outline-none">
        <iconify-icon icon="solar:hamburger-menu-linear" stroke-width="1.5" class="text-xl" />
      </button>

      <div class="w-full max-w-md relative hidden sm:block">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <iconify-icon icon="solar:magnifer-linear" stroke-width="1.5" class="text-gray-400" />
        </div>
        <input
          v-model="search"
          type="text"
          class="block w-full pl-9 pr-3 py-1.5 border border-gray-200 rounded-md leading-5 bg-[#FAFAFA] text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
          placeholder="Search students, classes..."
        />
      </div>
    </div>

    <div class="flex items-center gap-4">
      <button class="text-gray-400 hover:text-gray-600 relative focus:outline-none">
        <span class="absolute top-0 right-0 block h-1.5 w-1.5 rounded-full bg-gray-900 ring-2 ring-white" />
        <iconify-icon icon="solar:bell-linear" stroke-width="1.5" class="text-xl" />
      </button>

      <div
        class="h-8 w-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 cursor-pointer"
      >
        {{ initials }}
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  initials: { type: String, default: 'JW' },
})

const search = ref('')
</script>