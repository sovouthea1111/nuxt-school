<template>
  <Popup v-if="klass" :open="open" title="Edit Class" @close="handleClose">
    <ClassForm :model-value="model" @update:model-value="onUpdate" @submit="handleUpdate" @cancel="handleClose" />
  </Popup>
  <section class="card" v-else>
    <div class="muted">Class not found</div>
    <div class="toolbar"><NuxtLink to="/classes" class="btn">Back</NuxtLink></div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, reactive, ref, watch } from 'vue'
import Popup from '~/components/Popup.vue'
import ClassForm from '~/components/ClassForm.vue'
import { useClasses } from '~/composables/useClasses'
import { navigateTo } from 'nuxt/app'
const route = useRoute()
const id = route.params.id as string
const { getById, update } = useClasses()
const klass = computed(() => getById(id))
const open = ref(true)
type ClassModel = { name: string; grade: string; section: string; teacher: string; room: string }
let model = reactive<ClassModel>({
  name: klass.value?.name || '',
  grade: klass.value?.grade || 'Grade 1',
  section: klass.value?.section || 'Red',
  teacher: klass.value?.teacher || '',
  room: klass.value?.room || ''
})
function onUpdate(v: ClassModel) { Object.assign(model, v) }
watch(klass, c => { if (!c) return; model.name = c.name; model.grade = c.grade; model.section = c.section; model.teacher = c.teacher; model.room = c.room }, { immediate: true })
function handleUpdate() { update(id, { ...model }); navigateTo('/classes') }
function handleClose() { navigateTo('/classes') }
</script>
