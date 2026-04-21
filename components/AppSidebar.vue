<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex flex-shrink-0 z-20">
    <div class="h-14 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
      <span class="text-lg font-semibold tracking-tighter text-gray-900">ACAD.</span>
    </div>

    <nav
      class="flex-1 overflow-y-auto py-5 px-3 space-y-6"
      style="scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;"
    >
      <div class="space-y-0.5">
        <p class="px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Overview</p>
        <SidebarLink href="#" icon="solar:widget-linear" label="Dashboard" :active="true" />
        <SidebarLink href="#" icon="solar:chat-round-line-linear" label="Messages" :badge="3" />
      </div>

      <div class="space-y-0.5">
        <p class="px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Academics</p>
        <SidebarLink href="#" icon="solar:notebook-minimalistic-linear" label="Classes" />
        <SidebarLink href="#" icon="solar:book-linear" label="Subjects" />
        <SidebarLink href="#" icon="solar:calendar-linear" label="Schedule" />
        <SidebarLink href="#" icon="solar:checklist-minimalistic-linear" label="Attendance" />
        <SidebarLink href="#" icon="solar:document-text-linear" label="Assignments" />
        <SidebarLink href="#" icon="solar:diploma-linear" label="Exams & Grades" />
      </div>

      <div class="space-y-0.5">
        <p class="px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">People</p>
        <SidebarLink href="#" icon="solar:users-group-rounded-linear" label="Students" />
        <SidebarLink href="#" icon="solar:user-id-linear" label="Teachers" />
        <SidebarLink href="#" icon="solar:users-group-two-rounded-linear" label="Parents" />
      </div>

      <div class="space-y-0.5">
        <p class="px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Administration</p>
        <SidebarLink href="#" icon="solar:user-plus-linear" label="Admissions" />
        <SidebarLink href="#" icon="solar:library-linear" label="Library" />
        <SidebarLink href="#" icon="solar:bus-linear" label="Transport" />
        <SidebarLink href="#" icon="solar:box-linear" label="Inventory" />
      </div>

      <div class="space-y-0.5">
        <p class="px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Finance</p>
        <SidebarLink href="#" icon="solar:wallet-linear" label="Fee Management" />
        <SidebarLink href="#" icon="solar:calculator-linear" label="Expenses" />
      </div>
    </nav>

    <div class="p-4 border-t border-gray-100 flex-shrink-0 bg-white space-y-0.5">
      <SidebarLink href="#" icon="solar:settings-linear" label="Settings" />
      <SidebarLink href="#" icon="solar:logout-2-linear" label="Log out" :danger="true" />
    </div>
  </aside>
</template>

<script setup>
import SidebarLink from "~/components/SidebarLink.vue";
</script>