<template>
  <Popup :open="open" title="Add Subject" @close="handleClose">
    <SubjectForm :model-value="model" @update:model-value="onUpdate" @submit="handleCreate" @cancel="handleClose" />
  </Popup>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Popup from '~/components/Popup.vue'
import SubjectForm from '~/components/SubjectForm.vue'
import { useSubjects } from '~/composables/useSubjects'
import { navigateTo } from 'nuxt/app'
const open = ref(true)
const { create } = useSubjects()
type SubjectModel = { name: string; code: string; description: string; teacher: string }
let model = reactive<SubjectModel>({ name: '', code: 'SUBJ', description: '', teacher: '' })
function onUpdate(v: SubjectModel) { Object.assign(model, v) }
function handleCreate() { create({ ...model }); navigateTo('/subjects') }
function handleClose() { navigateTo('/subjects') }
</script>
