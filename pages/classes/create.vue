<template>
  <Popup :open="open" title="Add Class" @close="handleClose">
    <ClassForm :model-value="model" @update:model-value="onUpdate" @submit="handleCreate" @cancel="handleClose" />
  </Popup>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Popup from '~/components/Popup.vue'
import ClassForm from '~/components/ClassForm.vue'
import { useClasses } from '~/composables/useClasses'
import { navigateTo } from 'nuxt/app'
const open = ref(true)
const { create } = useClasses()
type ClassModel = { name: string; grade: string; section: string; teacher: string; room: string }
let model = reactive<ClassModel>({ name: '', grade: 'Grade 1', section: 'Red', teacher: '', room: '' })
function onUpdate(v: ClassModel) { Object.assign(model, v) }
function handleCreate() { create({ ...model }); navigateTo('/classes') }
function handleClose() { navigateTo('/classes') }
</script>
