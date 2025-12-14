<template>
  <section class="card">
    <div class="toolbar">
      <input v-model="q" class="input" placeholder="Search name or guardian" />
      <select v-model="grade" class="select" style="max-width:180px">
        <option value="">All Grades</option>
        <option>Grade 1</option>
        <option>Grade 2</option>
        <option>Grade 3</option>
        <option>Grade 4</option>
        <option>Grade 5</option>
        <option>Grade 6</option>
      </select>
      <select v-model="gender" class="select" style="max-width:160px">
        <option value="">All Genders</option>
        <option>Female</option>
        <option>Male</option>
      </select>
      <div class="spacer"></div>
      <button class="btn" @click="openCreate">Add Student</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Grade</th>
          <th>Age</th>
          <th>Guardian</th>
          <th>Enrolled</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in filtered" :key="s.id">
          <td>{{ s.name }}</td>
          <td><span class="badge">{{ s.gender }}</span></td>
          <td>{{ s.grade }}</td>
          <td>{{ s.age }}</td>
          <td>{{ s.guardian }}</td>
          <td>{{ formatDate(s.enrollmentDate) }}</td>
          <td class="actions">
            <button class="btn secondary" @click="openEdit(s.id)">Edit</button>
            <button class="btn danger" @click="handleDelete(s.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="7" class="muted">No students found</td>
        </tr>
      </tbody>
    </table>
    <Popup :open="showCreate" title="Add Student" @close="closeModal">
      <StudentForm :model-value="createModel" @update:model-value="onUpdateCreate" @submit="handleCreate" />
    </Popup>
    <Popup :open="showEdit" title="Edit Student" @close="closeModal">
      <StudentForm :model-value="editModel" @update:model-value="onUpdateEdit" @submit="handleUpdate" />
    </Popup>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useStudents } from '~/composables/useStudents'
import Popup from '~/components/Popup.vue'
import StudentForm from '~/components/StudentForm.vue'
const { students, remove, create, update, getById } = useStudents()
const q = ref('')
const grade = ref('')
const gender = ref('')
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return students.value.filter(s => {
    const matchesText = !v || s.name.toLowerCase().includes(v) || s.guardian.toLowerCase().includes(v)
    const matchesGrade = !grade.value || s.grade === grade.value
    const matchesGender = !gender.value || s.gender === gender.value
    return matchesText && matchesGrade && matchesGender
  })
})
type StudentModel = {
  name: string
  gender: string
  grade: string
  age: number
  guardian: string
  enrollmentDate: string
  address: string
}
const showCreate = ref(false)
const showEdit = ref(false)
const editId = ref<string | null>(null)
let createModel = reactive<StudentModel>({
  name: '',
  gender: 'Female',
  grade: 'Grade 1',
  age: 6,
  guardian: '',
  enrollmentDate: new Date().toISOString().slice(0, 10),
  address: ''
})
let editModel = reactive<StudentModel>({
  name: '',
  gender: 'Female',
  grade: 'Grade 1',
  age: 6,
  guardian: '',
  enrollmentDate: new Date().toISOString().slice(0, 10),
  address: ''
})
function openCreate() {
  showCreate.value = true
}
function openEdit(id: string) {
  const s = getById(id)
  if (!s) return
  editId.value = id
  editModel.name = s.name
  editModel.gender = s.gender
  editModel.grade = s.grade
  editModel.age = s.age
  editModel.guardian = s.guardian
  editModel.enrollmentDate = s.enrollmentDate.slice(0, 10)
  editModel.address = s.address
  showEdit.value = true
}
function closeModal() {
  showCreate.value = false
  showEdit.value = false
}
function onUpdateCreate(v: StudentModel) {
  Object.assign(createModel, v)
}
function onUpdateEdit(v: StudentModel) {
  Object.assign(editModel, v)
}
function handleDelete(id: string) {
  remove(id)
}
function formatDate(d: string) {
  return new Date(d).toLocaleDateString()
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
</script>
