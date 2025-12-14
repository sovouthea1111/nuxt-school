<template>
  <form @submit.prevent="onSubmit">
    <div class="form-grid">
      <div style="grid-column: 1 / -1">
        <div class="section-title">Class</div>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <input class="input" :class="{ invalid: !valid.name }" v-model="local.name" placeholder="Class name (e.g., Grade 3 - Red)" />
        <div class="error" v-if="!valid.name">Name is required</div>
      </div>
      <div class="field">
        <label class="label">Grade</label>
        <select class="select" v-model="local.grade">
          <option>Grade 1</option>
          <option>Grade 2</option>
          <option>Grade 3</option>
          <option>Grade 4</option>
          <option>Grade 5</option>
          <option>Grade 6</option>
        </select>
      </div>
      <div class="field">
        <label class="label">Section</label>
        <input class="input" v-model="local.section" placeholder="e.g., Red" />
      </div>
      <div class="field">
        <label class="label">Teacher</label>
        <input class="input" v-model="local.teacher" placeholder="Primary teacher" />
      </div>
      <div class="field">
        <label class="label">Room</label>
        <input class="input" v-model="local.room" placeholder="e.g., A1" />
      </div>
    </div>
    <div class="toolbar">
      <button class="btn" type="submit">Save</button>
      <button class="btn secondary" type="button" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
type ClassModel = {
  name: string
  grade: string
  section: string
  teacher: string
  room: string
}
const props = defineProps<{ modelValue: ClassModel }>()
const emit = defineEmits<{ (e: 'update:model-value', v: ClassModel): void; (e: 'submit'): void; (e: 'cancel'): void }>()
const local = reactive<ClassModel>({ ...props.modelValue })
const valid = reactive({
  name: computed(() => local.name.trim().length > 0)
})
watch(() => props.modelValue, v => {
  Object.assign(local, v)
})
watch(local, v => {
  emit('update:model-value', { ...v })
}, { deep: true })
function onSubmit() {
  emit('submit')
}
</script>
