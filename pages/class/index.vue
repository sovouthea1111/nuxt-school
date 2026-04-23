<template>
  <div class="flex-1 overflow-y-auto p-4 md:p-8">
    <div class="max-w-6xl mx-auto space-y-8">

      <GroupHeader
        title="Classes"
        @filter="onFilter"
        @new-class="onNewClass"
      />

      <DataTable
        :data="classes"
        :columns="columns"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        empty-text="No classes found."
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

      <ClassFormModal
        v-model="isModalOpen"
        :editing-class="selectedClass"
        @submit="handleFormSubmit"
      />

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GroupHeader from '~/components/GroupHeader.vue'
import { Pencil, Trash2 } from 'lucide-vue-next'
import DataTable from '~/components/DataTable.vue'
import ClassFormModal from '~/pages/class/ClassFormModal.vue'

const columns = [
  { key: 'name',       label: 'Class Name',  bold: true },
  { key: 'subject',    label: 'Subject' },
  { key: 'instructor', label: 'Instructor' },
  { key: 'enrolled',   label: 'Students',    type: 'fraction', numerator: 'enrolled', denominator: 'capacity' },
  { key: 'status',     label: 'Status',      type: 'badge' },
]

const classes = ref([
  { id: 1, name: 'Advanced Mathematics',       subject: 'Algebra',  instructor: 'Dr. Alan Turing',     enrolled: 24, capacity: 30, status: 'active' },
  { id: 2, name: 'World History II',           subject: 'History',  instructor: 'Prof. Howard Zinn',    enrolled: 28, capacity: 30, status: 'active' },
  { id: 3, name: 'Physics 101',                subject: 'Science',  instructor: 'Dr. Richard Feynman',  enrolled: 18, capacity: 20, status: 'starting-soon' },
  { id: 4, name: 'Introduction to Literature', subject: 'English',  instructor: 'Ms. Virginia Woolf',   enrolled: 30, capacity: 30, status: 'full' },
])

const isModalOpen = ref(false)
const selectedClass = ref(null)

function onNewClass() {
  selectedClass.value = null 
  isModalOpen.value = true
}

function handleFormSubmit(formData) {
  if (formData.id) {
    const index = classes.value.findIndex(c => c.id === formData.id)
    if (index !== -1) classes.value[index] = { ...classes.value[index], ...formData }
  } else {
    const newId = classes.value.length + 1
    classes.value.push({
      ...formData,
      id: newId,
      enrolled: 0, 
      status: 'starting-soon'
    })
  }
}

const selectedIds = ref([])
const allSelected = computed(
  () => classes.value.length > 0 && selectedIds.value.length === classes.value.length
)

function toggleAll() {
  selectedIds.value = allSelected.value ? [] : classes.value.map(c => c.id)
}

function toggleSelect(id) {
  const idx = selectedIds.value.indexOf(id)
  idx === -1 ? selectedIds.value.push(id) : selectedIds.value.splice(idx, 1)
}

function onFilter() {}

function onRowAction(id) {
  const item = classes.value.find(c => c.id === id)
  if (item) {
    selectedClass.value = item
    isModalOpen.value = true
  }
}
</script>