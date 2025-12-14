<template>
  <Popup v-if="subject" :open="open" title="Edit Subject" @close="handleClose">
    <SubjectForm :model-value="model" @update:model-value="onUpdate" @submit="handleUpdate" @cancel="handleClose" />
  </Popup>
  <section class="card" v-else>
    <div class="muted">Subject not found</div>
    <div class="toolbar"><NuxtLink to="/subjects" class="btn">Back</NuxtLink></div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, reactive, ref, watch } from 'vue'
import Popup from '~/components/Popup.vue'
import SubjectForm from '~/components/SubjectForm.vue'
import { useSubjects } from '~/composables/useSubjects'
import { navigateTo } from 'nuxt/app'
const route = useRoute()
const id = route.params.id as string
const { getById, update } = useSubjects()
const subject = computed(() => getById(id))
const open = ref(true)
type SubjectModel = { name: string; code: string; description: string; teacher: string }
let model = reactive<SubjectModel>({ name: subject.value?.name || '', code: subject.value?.code || 'SUBJ', description: subject.value?.description || '', teacher: subject.value?.teacher || '' })
function onUpdate(v: SubjectModel) { Object.assign(model, v) }
watch(subject, s => { if (!s) return; model.name = s.name; model.code = s.code; model.description = s.description; model.teacher = s.teacher }, { immediate: true })
function handleUpdate() { update(id, { ...model }); navigateTo('/subjects') }
function handleClose() { navigateTo('/subjects') }
</script>
