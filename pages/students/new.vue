<template>
  <section class="card">
    <h2 class="title">Add Student</h2>
    <StudentForm :model-value="model" @update:model-value="onUpdate" @submit="handleCreate" />
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { navigateTo } from 'nuxt/app'
import { useStudents } from '~/composables/useStudents'
const { create } = useStudents()
type StudentModel = {
  name: string
  gender: string
  grade: string
  age: number
  guardian: string
  enrollmentDate: string
  address: string
}
let model = reactive<StudentModel>({
  name: '',
  gender: 'Female',
  grade: 'Grade 1',
  age: 6,
  guardian: '',
  enrollmentDate: new Date().toISOString().slice(0, 10),
  address: ''
})
function onUpdate(v: StudentModel) {
  Object.assign(model, v)
}
function handleCreate() {
  create({ ...model })
  navigateTo('/students')
}
</script>
