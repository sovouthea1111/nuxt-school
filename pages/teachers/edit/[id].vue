<template>
  <Popup v-if="teacher" :open="open" title="Edit Teacher" @close="handleClose">
    <TeacherForm :model-value="model" @update:model-value="onUpdate" @submit="handleUpdate" @cancel="handleClose" />
  </Popup>
  <section class="card" v-else>
    <div class="muted">Teacher not found</div>
    <div class="toolbar"><NuxtLink to="/teachers" class="btn">Back</NuxtLink></div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, reactive, ref, watch } from 'vue'
import Popup from '~/components/Popup.vue'
import TeacherForm from '~/components/TeacherForm.vue'
import { useTeachers } from '~/composables/useTeachers'
import { navigateTo } from 'nuxt/app'
const route = useRoute()
const id = route.params.id as string
const { getById, update } = useTeachers()
const teacher = computed(() => getById(id))
const open = ref(true)
type TeacherModel = {
  name: string
  subject: string
  phone: string
  email: string
  hireDate: string
  address: string
}
let model = reactive<TeacherModel>({
  name: teacher.value?.name || '',
  subject: teacher.value?.subject || 'Mathematics',
  phone: teacher.value?.phone || '',
  email: teacher.value?.email || '',
  hireDate: (teacher.value?.hireDate || new Date().toISOString().slice(0, 10)).slice(0,10),
  address: teacher.value?.address || ''
})
function onUpdate(v: TeacherModel) {
  Object.assign(model, v)
}
watch(teacher, t => {
  if (!t) return
  model.name = t.name
  model.subject = t.subject
  model.phone = t.phone
  model.email = t.email
  model.hireDate = t.hireDate.slice(0,10)
  model.address = t.address
}, { immediate: true })
function handleUpdate() {
  update(id, { ...model })
  navigateTo('/teachers')
}
function handleClose() {
  navigateTo('/teachers')
}
</script>
