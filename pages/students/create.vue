<template>
  <Popup :open="open" title="Add Student" @close="handleClose">
    <StudentForm :model-value="model" @update:model-value="onUpdate" @submit="handleCreate" />
  </Popup>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { navigateTo } from 'nuxt/app'
import { useStudents } from '~/composables/useStudents'
import Popup from '~/components/Popup.vue'
const { create } = useStudents()
const open = ref(true)
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
function handleClose() {
  navigateTo('/students')
}
</script>
