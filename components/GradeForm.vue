<template>
  <form @submit.prevent="onSubmit">
    <div class="form-grid">
      <div style="grid-column: 1 / -1">
        <div class="section-title">Grade Entry</div>
      </div>
      <div class="field">
        <label class="label">Student</label>
        <select class="select" v-model="local.studentId">
          <option v-for="s in students" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>
      <div class="field">
        <label class="label">Subject</label>
        <input class="input" v-model="local.subject" placeholder="Subject name" />
      </div>
      <div class="field">
        <label class="label">Exam</label>
        <input class="input" v-model="local.exam" placeholder="Exam name (e.g., Midterm)" />
      </div>
      <div class="field">
        <label class="label">Score</label>
        <input class="input" type="number" min="0" max="100" v-model.number="local.score" />
      </div>
      <div class="field">
        <label class="label">Date</label>
        <input class="date" type="date" v-model="local.date" />
      </div>
    </div>
    <div class="toolbar">
      <button class="btn" type="submit">Save</button>
      <button class="btn secondary" type="button" @click="emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useStudents } from '~/composables/useStudents'
const { students } = useStudents()
type GradeModel = { studentId: string; subject: string; exam: string; score: number; date: string }
const props = defineProps<{ modelValue: GradeModel }>()
const emit = defineEmits<{ (e: 'update:model-value', v: GradeModel): void; (e: 'submit'): void; (e: 'cancel'): void }>()
const local = reactive<GradeModel>({ ...props.modelValue })
watch(() => props.modelValue, v => { Object.assign(local, v) })
watch(local, v => { emit('update:model-value', { ...v }) }, { deep: true })
function onSubmit() { emit('submit') }
</script>
