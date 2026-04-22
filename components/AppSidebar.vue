<template>
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex flex-shrink-0 z-20">
    <div class="h-14 flex items-center px-6 border-b border-gray-100 flex-shrink-0">
      <span class="text-lg font-semibold tracking-tighter text-gray-900">Idea International School</span>
    </div>

    <nav
      class="flex-1 overflow-y-auto py-5 px-3 space-y-6"
      style="scrollbar-width: thin; scrollbar-color: #e5e7eb transparent;"
    >
      <div class="space-y-0.5">
        <p class="uppercase px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Overview</p>
        <SidebarLink to="/" icon="solar:widget-linear" label="Dashboard" :active="isActive('/')" />
        <SidebarLink to="/report" icon="solar:chart-square-linear" label="Reports" :badge="3" :active="isActive('/report')" />
      </div>

      <div class="space-y-0.5">
        <p class="uppercase px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Academics</p>
        <SidebarLink to="/student" icon="solar:users-group-rounded-linear" label="Students" :active="isActive('/student')" />
        <SidebarLink to="/subject" icon="solar:notebook-minimalistic-linear" label="Subjects" :active="isActive('/subject')" />
        <SidebarLink to="/room" icon="solar:school-linear" label="Rooms" :active="isActive('/room')" />
      </div>

      <div class="space-y-0.5">
        <p class="uppercase px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Administration</p>
        <SidebarLink to="/branch" icon="solar:structure-linear" label="Branches" :active="isActive('/branch')" />
        <SidebarLink to="/staff" icon="solar:user-id-linear" label="Staff" :active="isActive('/staff')" />
        <SidebarLink to="/system-user" icon="solar:shield-user-linear" label="System Users" :active="isActive('/system-user')" />
      </div>

      <div class="space-y-0.5">
        <p class="uppercase px-3 mb-2 text-xs font-medium text-gray-400 tracking-wider">Finance & ops</p>
        <SidebarLink to="/payment" icon="solar:bill-list-linear" label="Student Payments" :active="isActive('/payment')" />
        <SidebarLink to="/accounting" icon="solar:wallet-money-linear" label="Accounting" :active="isActive('/accounting')" />
        <SidebarLink to="/payroll" icon="solar:banknote-linear" label="Payroll" :active="isActive('/payroll')" />
        <SidebarLink to="/expense" icon="solar:card-transfer-linear" label="Expenses" :active="isActive('/expense')" />
        <SidebarLink to="/stock-control" icon="solar:box-linear" label="Stock Control" :active="isActive('/stock-control')" />
      </div>
    </nav>

    <div class="p-4 border-t border-gray-100 flex-shrink-0 bg-white space-y-0.5">
      <SidebarLink to="/settings" icon="solar:settings-linear" label="Settings" :active="isActive('/settings')" />
      <SidebarLink to="#" icon="solar:logout-2-linear" label="Log out" :danger="true" />
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import SidebarLink from "~/components/SidebarLink.vue";

const route = useRoute()
const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>