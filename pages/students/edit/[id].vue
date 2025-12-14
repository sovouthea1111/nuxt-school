<template>
  <Popup v-if="student" :open="open" title="Edit Student" @close="handleClose">
    <StudentForm :model-value="model" @update:model-value="onUpdate" @submit="handleUpdate" />
  </Popup>
  <section class="card" v-else>
    <div class="muted">Student not found</div>
    <div class="toolbar"><NuxtLink to="/students" class="btn">Back</NuxtLink></div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, reactive, watch, ref } from 'vue'
import { useStudents } from '~/composables/useStudents'
import { navigateTo } from 'nuxt/app'
import Popup from '~/components/Popup.vue'

const route = useRoute()
const id = route.params.id as string
const { getById, update } = useStudents()
const student = computed(() => getById(id))
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
  name: student.value?.name || '',
  gender: student.value?.gender || 'Female',
  grade: student.value?.grade || 'Grade 1',
  age: student.value?.age || 6,
  guardian: student.value?.guardian || '',
  enrollmentDate: (student.value?.enrollmentDate || new Date().toISOString().slice(0, 10)).slice(0,10),
  address: student.value?.address || ''
})
function onUpdate(v: StudentModel) {
  Object.assign(model, v)
}
watch(student, s => {
  if (!s) return
  model.name = s.name
  model.gender = s.gender
  model.grade = s.grade
  model.age = s.age
  model.guardian = s.guardian
  model.enrollmentDate = s.enrollmentDate.slice(0,10)
  model.address = s.address
}, { immediate: true })
async function handleUpdate() {
  update(id, { ...model })
  await navigateTo('/students')
}
function handleClose() {
  navigateTo('/students')
}
</script>
