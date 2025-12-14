<template>
  <Popup :open="open" title="Add Teacher" @close="handleClose">
    <TeacherForm :model-value="model" @update:model-value="onUpdate" @submit="handleCreate" @cancel="handleClose" />
  </Popup>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Popup from '~/components/Popup.vue'
import TeacherForm from '~/components/TeacherForm.vue'
import { useTeachers } from '~/composables/useTeachers'
import { navigateTo } from 'nuxt/app'
const open = ref(true)
const { create } = useTeachers()
type TeacherModel = {
  name: string
  subject: string
  phone: string
  email: string
  hireDate: string
  address: string
}
let model = reactive<TeacherModel>({
  name: '',
  subject: 'Mathematics',
  phone: '',
  email: '',
  hireDate: new Date().toISOString().slice(0, 10),
  address: ''
})
function onUpdate(v: TeacherModel) {
  Object.assign(model, v)
}
function handleCreate() {
  create({ ...model })
  navigateTo('/teachers')
}
function handleClose() {
  navigateTo('/teachers')
}
</script>
