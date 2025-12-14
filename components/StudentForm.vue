<template>
  <form @submit.prevent="onSubmit">
    <div class="form-grid">
      <div style="grid-column: 1 / -1">
        <div class="section-title">Personal</div>
      </div>
      <div class="field">
        <label class="label">Name</label>
        <input class="input" :class="{ invalid: !valid.name }" v-model="local.name" placeholder="Student full name" />
        <div class="error" v-if="!valid.name">Name is required</div>
      </div>
      <div class="field">
        <label class="label">Gender</label>
        <select class="select" v-model="local.gender">
          <option>Female</option>
          <option>Male</option>
        </select>
      </div>
      <div class="field">
        <label class="label">Age</label>
        <input class="input" type="number" min="5" max="12" v-model.number="local.age" placeholder="5–12" />
        <div class="help">Typical ages for primary school</div>
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
      <div style="grid-column: 1 / -1">
        <div class="section-title">Enrollment</div>
      </div>
      <div class="field">
        <label class="label">Enrollment Date</label>
        <input class="date" type="date" v-model="local.enrollmentDate" />
      </div>
      <div style="grid-column: 1 / -1">
        <div class="section-title">Contact</div>
      </div>
      <div class="field">
        <label class="label">Guardian</label>
        <input class="input" v-model="local.guardian" placeholder="Parent or guardian name" />
      </div>
      <div class="field" style="grid-column: 1 / -1">
        <label class="label">Address</label>
        <input class="input" v-model="local.address" placeholder="City, district or village" />
      </div>
    </div>
    <div class="toolbar">
      <button class="btn" type="submit">Save</button>
      <NuxtLink to="/students" class="btn secondary">Cancel</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
type StudentModel = {
  name: string
  gender: string
  grade: string
  age: number
  guardian: string
  enrollmentDate: string
  address: string
}
const props = defineProps<{ modelValue: StudentModel }>()
const emit = defineEmits<{ (e: 'update:model-value', v: StudentModel): void; (e: 'submit'): void }>()
const local = reactive<StudentModel>({ ...props.modelValue })
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
