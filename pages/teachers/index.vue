<template>
  <section class="card">
    <div class="toolbar">
      <input v-model="q" class="input" placeholder="Search name, subject or email" />
      <div class="spacer"></div>
      <button class="btn" @click="openCreate">Add Teacher</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Subject</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Hire Date</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in filtered" :key="t.id">
          <td>{{ t.name }}</td>
          <td>{{ t.subject }}</td>
          <td>{{ t.phone }}</td>
          <td>{{ t.email }}</td>
          <td>{{ formatDate(t.hireDate) }}</td>
          <td class="actions">
            <button class="btn secondary" @click="openEdit(t.id)">Edit</button>
            <button class="btn danger" @click="handleDelete(t.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="6" class="muted">No teachers found</td>
        </tr>
      </tbody>
    </table>
    <Popup :open="showCreate" title="Add Teacher" @close="closeModal">
      <TeacherForm :model-value="createModel" @update:model-value="onUpdateCreate" @submit="handleCreate" @cancel="closeModal" />
    </Popup>
    <Popup :open="showEdit" title="Edit Teacher" @close="closeModal">
      <TeacherForm :model-value="editModel" @update:model-value="onUpdateEdit" @submit="handleUpdate" @cancel="closeModal" />
    </Popup>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import Popup from '~/components/Popup.vue'
import TeacherForm from '~/components/TeacherForm.vue'
import { useTeachers } from '~/composables/useTeachers'
const { teachers, create, update, remove, getById } = useTeachers()
const q = ref('')
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return teachers.value.filter(t => {
    const text = `${t.name} ${t.subject} ${t.email}`.toLowerCase()
    return !v || text.includes(v)
  })
})
type TeacherModel = {
  name: string
  subject: string
  phone: string
  email: string
  hireDate: string
  address: string
}
const showCreate = ref(false)
const showEdit = ref(false)
const editId = ref<string | null>(null)
let createModel = reactive<TeacherModel>({
  name: '',
  subject: 'Mathematics',
  phone: '',
  email: '',
  hireDate: new Date().toISOString().slice(0, 10),
  address: ''
})
let editModel = reactive<TeacherModel>({
  name: '',
  subject: 'Mathematics',
  phone: '',
  email: '',
  hireDate: new Date().toISOString().slice(0, 10),
  address: ''
})
function openCreate() {
  showCreate.value = true
}
function openEdit(id: string) {
  const t = getById(id)
  if (!t) return
  editId.value = id
  editModel.name = t.name
  editModel.subject = t.subject
  editModel.phone = t.phone
  editModel.email = t.email
  editModel.hireDate = t.hireDate.slice(0, 10)
  editModel.address = t.address
  showEdit.value = true
}
function closeModal() {
  showCreate.value = false
  showEdit.value = false
}
function onUpdateCreate(v: TeacherModel) {
  Object.assign(createModel, v)
}
function onUpdateEdit(v: TeacherModel) {
  Object.assign(editModel, v)
}
function handleCreate() {
  create({ ...createModel })
  closeModal()
}
function handleUpdate() {
  if (!editId.value) return
  update(editId.value, { ...editModel })
  closeModal()
}
function handleDelete(id: string) {
  remove(id)
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString()
}
</script>
