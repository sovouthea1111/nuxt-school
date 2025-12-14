<template>
  <section class="card">
    <h2 class="title">Exams Overview</h2>
    <div class="toolbar">
      <input class="date" type="date" v-model="from" />
      <input class="date" type="date" v-model="to" />
      <div class="spacer"></div>
      <button class="btn secondary" @click="clearRange">Clear</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Student</th>
          <th>Subject</th>
          <th>Exam</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="g in filtered" :key="g.id">
          <td>{{ formatDate(g.date) }}</td>
          <td>{{ studentName(g.studentId) }}</td>
          <td>{{ g.subject }}</td>
          <td>{{ g.exam }}</td>
          <td><span class="badge">{{ g.score }}</span></td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="5" class="muted">No exam results</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGrades } from '~/composables/useGrades'
import { useStudents } from '~/composables/useStudents'
const { grades } = useGrades()
const { students } = useStudents()
function studentName(id: string) {
  return students.value.find(s => s.id === id)?.name || 'Unknown'
}
const now = new Date()
const from = ref(new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0,10))
const to = ref('')
const filtered = computed(() => {
  return grades.value.filter(g => {
    const d = g.date.slice(0,10)
    const afterFrom = !from.value || d >= from.value
    const beforeTo = !to.value || d <= to.value
    return afterFrom && beforeTo
  }).sort((a,b) => b.score - a.score || b.date.localeCompare(a.date))
})
const avgScore = computed(() => {
  const arr = filtered.value
  if (arr.length === 0) return 0
  return Math.round(arr.reduce((a,b) => a + b.score, 0) / arr.length)
})
function formatDate(d: string) {
  return new Date(d).toLocaleDateString()
}
function clearRange() {
  from.value = ''
  to.value = ''
}
</script>
