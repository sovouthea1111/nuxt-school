<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-8">
      <GroupHeader 
        title="Students" 
        description="Enroll and manage student academic records and payment schedules."
        @filter="onFilter" 
        @new-class="openCreate" 
      />

      <DataTable
        :data="students"
        :columns="columns"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        empty-text="No students found."
        @toggle-all="toggleAll"
        @toggle-select="toggleSelect"
        @action="onRowAction"
      >
         <template #actions="{ row }">
          <div class="flex items-center justify-end gap-1">
            <button
              class="p-1.5 text-gray-400 hover:text-slate-900 hover:bg-gray-100 rounded transition-colors"
              title="Edit"
              @click.stop="openEdit(row)"
            >
              <Pencil class="w-4 h-4" :stroke-width="1.5" />
            </button>
            <button
              class="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
              title="Delete"
              @click.stop="openDelete(row)"
            >
              <Trash2 class="w-4 h-4" :stroke-width="1.5" />
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <StudentFormModal
      v-model="showForm"
      :student="activeStudent"
      @submit="onFormSubmit"
    />

    <DeleteConfirmModal
      v-model="showDelete"
      title="Delete Student"
      :description="`Are you sure you want to delete '${activeStudent?.name}'?` "
      @confirm="onDeleteConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import GroupHeader from '~/components/GroupHeader.vue'
import StudentFormModal from '~/pages/student/StudentFormModal.vue'
import DeleteConfirmModal from '~/components/DeleteConfirmModal.vue'
import DataTable from '~/components/DataTable.vue'

const columns = [
  { key: 'code', label: 'Code', thClass: 'w-24' },
  { key: 'name', label: 'Name', bold: true },
  { key: 'gender', label: 'Gender' },
  { key: 'grade', label: 'Grade' },
  { key: 'nextPaymentDate', label: 'Next Payment', type: 'badge' },
  { key: 'status', label: 'Status', type: 'badge' },
]

const students = ref([
  { 
    id: 1, code: 'S-2026-001', name: 'Sok Mesa', latinName: 'Sok Mesa', gender: 'Male',
    grade: 'Grade 10', studentPhone: '099 123 456', shift: 'Full Time', status: 'active',
    nextPaymentDate: '2026-05-22' 
  }
])

const selectedIds = ref([])
const showForm = ref(false)
const showDelete = ref(false)
const activeStudent = ref(null)

const allSelected = computed(() => students.value.length > 0 && selectedIds.value.length === students.value.length)

function toggleAll() {
  selectedIds.value = allSelected.value ? [] : students.value.map(s => s.id)
}

function toggleSelect(id) {
  const idx = selectedIds.value.indexOf(id)
  idx === -1 ? selectedIds.value.push(id) : selectedIds.value.splice(idx, 1)
}

function openCreate() {
  activeStudent.value = null
  showForm.value = true
}

function openEdit(row) {
  activeStudent.value = { ...row }
  showForm.value = true
}

function openDelete(row) {
  activeStudent.value = { ...row }
  showDelete.value = true
}

function onRowAction(id) {
  const row = students.value.find(s => s.id === id)
  if (row) openEdit(row)
}

function onFormSubmit(payload) {
  const now = new Date().toISOString().split('T')[0]
  if (payload.id) {
    const idx = students.value.findIndex(s => s.id === payload.id)
    if (idx !== -1) students.value[idx] = { ...students.value[idx], ...payload, updatedAt: now }
  } else {
    students.value.push({ id: Date.now(), ...payload, createdAt: now, updatedAt: now })
  }
}

function onDeleteConfirm() {
  students.value = students.value.filter(s => s.id !== activeStudent.value.id)
  showDelete.value = false
}

function onFilter() {}

onMounted(() => {
  nextTick(() => { if (window.lucide) window.lucide.createIcons() })
})
</script>