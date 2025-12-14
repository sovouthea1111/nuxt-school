<template>
  <section class="card">
    <div class="toolbar">
      <input v-model="q" class="input" placeholder="Search student, subject or exam" />
      <div class="spacer"></div>
      <button class="btn" @click="openCreate">Add Grade</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Subject</th>
          <th>Exam</th>
          <th>Score</th>
          <th>Date</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="g in filtered" :key="g.id">
          <td>{{ studentName(g.studentId) }}</td>
          <td>{{ g.subject }}</td>
          <td>{{ g.exam }}</td>
          <td><span class="badge">{{ g.score }}</span></td>
          <td>{{ formatDate(g.date) }}</td>
          <td class="actions">
            <button class="btn secondary" @click="openEdit(g.id)">Edit</button>
            <button class="btn danger" @click="handleDelete(g.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="6" class="muted">No grades found</td>
        </tr>
      </tbody>
    </table>
    <Popup :open="showCreate" title="Add Grade" @close="closeModal">
      <GradeForm :model-value="createModel" @update:model-value="onUpdateCreate" @submit="handleCreate" @cancel="closeModal" />
    </Popup>
    <Popup :open="showEdit" title="Edit Grade" @close="closeModal">
      <GradeForm :model-value="editModel" @update:model-value="onUpdateEdit" @submit="handleUpdate" @cancel="closeModal" />
    </Popup>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Popup from '~/components/Popup.vue'
import GradeForm from '~/components/GradeForm.vue'
import { useGrades } from '~/composables/useGrades'
import { useStudents } from '~/composables/useStudents'
const { grades, create, update, remove, getById } = useGrades()
const { students } = useStudents()
function studentName(id: string) { return students.value.find(s => s.id === id)?.name || 'Unknown' }
const q = ref('')
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return grades.value.filter(g => {
    const text = `${studentName(g.studentId)} ${g.subject} ${g.exam} ${g.score}`.toLowerCase()
    return !v || text.includes(v)
  }).sort((a,b) => b.date.localeCompare(a.date))
})
type GradeModel = { studentId: string; subject: string; exam: string; score: number; date: string }
const showCreate = ref(false)
const showEdit = ref(false)
const editId = ref<string | null>(null)
let createModel = reactive<GradeModel>({ studentId: students.value[0]?.id || '', subject: 'Mathematics', exam: 'Midterm', score: 80, date: new Date().toISOString().slice(0,10) })
let editModel = reactive<GradeModel>({ studentId: students.value[0]?.id || '', subject: 'Mathematics', exam: 'Midterm', score: 80, date: new Date().toISOString().slice(0,10) })
function openCreate() { showCreate.value = true }
function openEdit(id: string) {
  const g = getById(id); if (!g) return
  editId.value = id
  editModel.studentId = g.studentId
  editModel.subject = g.subject
  editModel.exam = g.exam
  editModel.score = g.score
  editModel.date = g.date.slice(0,10)
  showEdit.value = true
}
function closeModal() { showCreate.value = false; showEdit.value = false }
function onUpdateCreate(v: GradeModel) { Object.assign(createModel, v) }
function onUpdateEdit(v: GradeModel) { Object.assign(editModel, v) }
function handleCreate() { create({ ...createModel }); closeModal() }
function handleUpdate() { if (!editId.value) return; update(editId.value, { ...editModel }); closeModal() }
function handleDelete(id: string) { remove(id) }
function formatDate(d: string) { return new Date(d).toLocaleDateString() }
</script>
