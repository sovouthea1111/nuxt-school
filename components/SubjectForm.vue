<template>
  <form @submit.prevent="onSubmit">
    <div class="form-grid">
      <div style="grid-column: 1 / -1">
        <div class="section-title">Subject</div>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <input class="input" :class="{ invalid: !valid.name }" v-model="local.name" placeholder="Subject name" />
        <div class="error" v-if="!valid.name">Name is required</div>
      </div>
      <div class="field">
        <label class="label">Code</label>
        <input class="input" v-model="local.code" placeholder="e.g., MATH" />
      </div>
      <div class="field">
        <label class="label">Teacher</label>
        <input class="input" v-model="local.teacher" placeholder="Assigned teacher" />
      </div>
      <div class="field" style="grid-column: 1 / -1">
        <label class="label">Description</label>
        <input class="input" v-model="local.description" placeholder="Short description" />
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
type SubjectModel = {
  name: string
  code: string
  description: string
  teacher: string
}
const props = defineProps<{ modelValue: SubjectModel }>()
const emit = defineEmits<{ (e: 'update:model-value', v: SubjectModel): void; (e: 'submit'): void; (e: 'cancel'): void }>()
const local = reactive<SubjectModel>({ ...props.modelValue })
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
