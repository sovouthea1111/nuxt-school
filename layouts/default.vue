<template>
  <div class="bg-[#FAFAFA] text-gray-900 antialiased h-screen flex overflow-hidden selection:bg-gray-200 selection:text-gray-900">
    <AppSidebar />
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <AppHeader :initials="userInitials" />
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const userInitials = 'JW'
import AppSidebar from "~/components/AppSidebar.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>

<style>
</style>