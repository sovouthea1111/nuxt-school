<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-6">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">System Users</h1>
          <p class="text-sm text-slate-500">Manage administrative access levels and staff credentials.</p>
        </div>
        <button 
          @click="openCreate"
          class="flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-sm text-sm font-medium"
        >
          <i data-lucide="user-plus" class="w-4 h-4"></i>
          Add New User
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div class="p-3 bg-blue-50 text-blue-600 rounded-full">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Users</p>
            <p class="text-xl font-bold text-slate-900">{{ activeUsersCount }}</p>
          </div>
        </div>
      </div>

      <DataTable 
        :data="users" 
        :columns="userColumns" 
        row-key="id"
        :selectable="true"
        @action="onTableAction"
      >
        <template #cell-name="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
              {{ row.name.charAt(0) }}
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-slate-900 leading-none">{{ row.name }}</span>
              <span class="text-[11px] text-slate-400 mt-1">{{ row.email }}</span>
            </div>
          </div>
        </template>

        <template #cell-role="{ row }">
          <span 
            class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest"
            :class="row.role === 'Super Admin' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'"
          >
            {{ row.role }}
          </span>
        </template>

        <template #cell-status="{ row }">
          <div class="flex items-center gap-2">
            <div 
              class="w-2 h-2 rounded-full" 
              :class="row.isActive ? 'bg-emerald-500' : 'bg-slate-300'"
            ></div>
            <span class="text-sm font-medium" :class="row.isActive ? 'text-slate-900' : 'text-slate-400'">
              {{ row.isActive ? 'Active' : 'Disabled' }}
            </span>
          </div>
        </template>

        <template #actions="{ row }">
          <div class="flex items-center justify-end gap-1">
            <button 
              class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all" 
              title="Edit User"
              @click.stop="openEdit(row)"
            >
              <i data-lucide="pencil" class="w-4 h-4"></i>
            </button>
            <button 
              class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-all"
              title="Reset Password"
            >
              <i data-lucide="key-round" class="w-4 h-4"></i>
            </button>
          </div>
        </template>

        <template #empty>
          <div class="flex flex-col items-center justify-center py-12">
            <i data-lucide="users" class="w-12 h-12 text-slate-200 mb-4"></i>
            <p class="text-slate-500 font-medium">No system users found.</p>
          </div>
        </template>
      </DataTable>
    </div>

    <UserFormModal 
      v-model="showModal"
      :user="selectedUser"
      :branches="branches"
      @submit="handleUserSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DataTable from "~/components/DataTable.vue"
import UserFormModal from "~/pages/system-user/UserFormModal.vue"

const userColumns = [
  { key: 'name', label: 'Identity' },
  { key: 'role', label: 'Access Level' },
  { key: 'branchName', label: 'Branch Assignment' },
  { key: 'lastLogin', label: 'Last Activity' },
  { key: 'status', label: 'Status' }
]

const branches = ref([
  { id: 1, name: 'Main Campus' },
  { id: 2, name: 'North Branch' }
])

const users = ref([
  { 
    id: 1, 
    name: 'Hoeun Sovouthea', 
    email: 'vouthea@idea.edu.kh', 
    role: 'Super Admin', 
    branchId: 0, 
    branchName: 'All Branches', 
    lastLogin: 'Active Now', 
    isActive: true 
  },
  { 
    id: 2, 
    name: 'Sok Dara', 
    email: 'dara.sok@idea.edu.kh', 
    role: 'Accountant', 
    branchId: 1, 
    branchName: 'Main Campus', 
    lastLogin: '2 hours ago', 
    isActive: true 
  },
  { 
    id: 3, 
    name: 'Keo Mesa', 
    email: 'mesa.keo@idea.edu.kh', 
    role: 'Receptionist', 
    branchId: 2, 
    branchName: 'North Branch', 
    lastLogin: '3 days ago', 
    isActive: false 
  }
])

const showModal = ref(false)
const selectedUser = ref(null)

const activeUsersCount = computed(() => users.value.filter(u => u.isActive).length)

const openCreate = () => {
  selectedUser.value = null
  showModal.value = true
}

const openEdit = (user) => {
  selectedUser.value = { ...user }
  showModal.value = true
}

const handleUserSubmit = (formData) => {
  const branchObj = branches.value.find(b => b.id === formData.branchId)
  const branchName = formData.branchId === 0 ? 'All Branches' : (branchObj?.name || 'Unknown')

  const userPayload = {
    ...formData,
    branchName: branchName,
    lastLogin: 'Never'
  }

  if (selectedUser.value) {
    const index = users.value.findIndex(u => u.id === selectedUser.value.id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...userPayload }
    }
  } else {
    users.value.unshift({
      id: Date.now(),
      ...userPayload
    })
  }
}

const onTableAction = (event) => {
  console.log('Table action triggered:', event)
}
</script>