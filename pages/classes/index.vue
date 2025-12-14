<template>
  <section class="card">
    <div class="toolbar">
      <input v-model="q" class="input" placeholder="Search name, grade, teacher or room" />
      <div class="spacer"></div>
      <button class="btn" @click="openCreate">Add Class</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Grade</th>
          <th>Section</th>
          <th>Teacher</th>
          <th>Room</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in filtered" :key="c.id">
          <td>{{ c.name }}</td>
          <td><span class="badge">{{ c.grade }}</span></td>
          <td>{{ c.section }}</td>
          <td>{{ c.teacher }}</td>
          <td>{{ c.room }}</td>
          <td class="actions">
            <button class="btn secondary" @click="openEdit(c.id)">Edit</button>
            <button class="btn danger" @click="handleDelete(c.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="6" class="muted">No classes found</td>
        </tr>
      </tbody>
    </table>
    <Popup :open="showCreate" title="Add Class" @close="closeModal">
      <ClassForm :model-value="createModel" @update:model-value="onUpdateCreate" @submit="handleCreate" @cancel="closeModal" />
    </Popup>
    <Popup :open="showEdit" title="Edit Class" @close="closeModal">
      <ClassForm :model-value="editModel" @update:model-value="onUpdateEdit" @submit="handleUpdate" @cancel="closeModal" />
    </Popup>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Popup from '~/components/Popup.vue'
import ClassForm from '~/components/ClassForm.vue'
import { useClasses } from '~/composables/useClasses'
const { classes, create, update, remove, getById } = useClasses()
const q = ref('')
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return classes.value.filter(c => {
    const text = `${c.name} ${c.grade} ${c.section} ${c.teacher} ${c.room}`.toLowerCase()
    return !v || text.includes(v)
  })
})
type ClassModel = { name: string; grade: string; section: string; teacher: string; room: string }
const showCreate = ref(false)
const showEdit = ref(false)
const editId = ref<string | null>(null)
let createModel = reactive<ClassModel>({ name: '', grade: 'Grade 1', section: 'Red', teacher: '', room: '' })
let editModel = reactive<ClassModel>({ name: '', grade: 'Grade 1', section: 'Red', teacher: '', room: '' })
function openCreate() { showCreate.value = true }
function openEdit(id: string) {
  const c = getById(id)
  if (!c) return
  editId.value = id
  editModel.name = c.name
  editModel.grade = c.grade
  editModel.section = c.section
  editModel.teacher = c.teacher
  editModel.room = c.room
  showEdit.value = true
}
function closeModal() { showCreate.value = false; showEdit.value = false }
function onUpdateCreate(v: ClassModel) { Object.assign(createModel, v) }
function onUpdateEdit(v: ClassModel) { Object.assign(editModel, v) }
function handleCreate() { create({ ...createModel }); closeModal() }
function handleUpdate() { if (!editId.value) return; update(editId.value, { ...editModel }); closeModal() }
function handleDelete(id: string) { remove(id) }
</script>
