<template>
  <section class="card">
    <h2 class="title">Report Card</h2>
    <div v-if="student">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px">
        <div class="chip active">{{ student.name }}</div>
        <span class="badge">{{ student.grade }}</span>
      </div>
      <div class="grid">
        <div class="field">
          <label class="label">Guardian</label>
          <div>{{ student.guardian }}</div>
        </div>
        <div class="field">
          <label class="label">Enrolled</label>
          <div>{{ formatDate(student.enrollmentDate) }}</div>
        </div>
      </div>
      <div class="section-title">Subjects</div>
      <div class="grid">
        <div class="card" style="padding:12px">
          <div class="muted">No grades yet</div>
        </div>
      </div>
    </div>
    <div v-else class="muted">Student not found</div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStudents } from '~/composables/useStudents'
const route = useRoute()
const id = route.params.id as string
const { getById } = useStudents()
const student = computed(() => getById(id))
function formatDate(d: string) {
  return new Date(d).toLocaleDateString()
}
</script>
