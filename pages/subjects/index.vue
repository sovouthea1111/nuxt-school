<template>
  <section class="card">
    <div class="toolbar">
      <input v-model="q" class="input" placeholder="Search name, code or teacher" />
      <div class="spacer"></div>
      <button class="btn" @click="openCreate">Add Subject</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Code</th>
          <th>Teacher</th>
          <th>Description</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in filtered" :key="s.id">
          <td>{{ s.name }}</td>
          <td><span class="badge">{{ s.code }}</span></td>
          <td>{{ s.teacher }}</td>
          <td>{{ s.description }}</td>
          <td class="actions">
            <button class="btn secondary" @click="openEdit(s.id)">Edit</button>
            <button class="btn danger" @click="handleDelete(s.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="5" class="muted">No subjects found</td>
        </tr>
      </tbody>
    </table>
    <Popup :open="showCreate" title="Add Subject" @close="closeModal">
      <SubjectForm :model-value="createModel" @update:model-value="onUpdateCreate" @submit="handleCreate" @cancel="closeModal" />
    </Popup>
    <Popup :open="showEdit" title="Edit Subject" @close="closeModal">
      <SubjectForm :model-value="editModel" @update:model-value="onUpdateEdit" @submit="handleUpdate" @cancel="closeModal" />
    </Popup>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import Popup from '~/components/Popup.vue'
import SubjectForm from '~/components/SubjectForm.vue'
import { useSubjects } from '~/composables/useSubjects'
const { subjects, create, update, remove, getById } = useSubjects()
const q = ref('')
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return subjects.value.filter(s => {
    const text = `${s.name} ${s.code} ${s.teacher} ${s.description}`.toLowerCase()
    return !v || text.includes(v)
  })
})
type SubjectModel = {
  name: string
  code: string
  description: string
  teacher: string
}
const showCreate = ref(false)
const showEdit = ref(false)
const editId = ref<string | null>(null)
let createModel = reactive<SubjectModel>({
  name: '',
  code: 'SUBJ',
  description: '',
  teacher: ''
})
let editModel = reactive<SubjectModel>({
  name: '',
  code: 'SUBJ',
  description: '',
  teacher: ''
})
function openCreate() {
  showCreate.value = true
}
function openEdit(id: string) {
  const s = getById(id)
  if (!s) return
  editId.value = id
  editModel.name = s.name
  editModel.code = s.code
  editModel.description = s.description
  editModel.teacher = s.teacher
  showEdit.value = true
}
function closeModal() {
  showCreate.value = false
  showEdit.value = false
}
function onUpdateCreate(v: SubjectModel) {
  Object.assign(createModel, v)
}
function onUpdateEdit(v: SubjectModel) {
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
</script>
