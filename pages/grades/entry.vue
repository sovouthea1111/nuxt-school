<template>
  <Popup :open="open" title="Add Grade" @close="handleClose">
    <GradeForm :model-value="model" @update:model-value="onUpdate" @submit="handleCreate" @cancel="handleClose" />
  </Popup>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Popup from '~/components/Popup.vue'
import GradeForm from '~/components/GradeForm.vue'
import { useGrades } from '~/composables/useGrades'
import { useStudents } from '~/composables/useStudents'
import { navigateTo } from 'nuxt/app'
const open = ref(true)
const { create } = useGrades()
const { students } = useStudents()
type GradeModel = { studentId: string; subject: string; exam: string; score: number; date: string }
let model = reactive<GradeModel>({ studentId: students.value[0]?.id || '', subject: 'Mathematics', exam: 'Midterm', score: 80, date: new Date().toISOString().slice(0,10) })
function onUpdate(v: GradeModel) { Object.assign(model, v) }
function handleCreate() { create({ ...model }); navigateTo('/grades') }
function handleClose() { navigateTo('/grades') }
</script>
