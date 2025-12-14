<template>
  <section class="card">
    <div class="toolbar">
      <input class="input" v-model="q" placeholder="Filter by student or subject" />
      <div class="spacer"></div>
      <select class="select" v-model="exam">
        <option value="">All Exams</option>
        <option v-for="e in exams" :key="e">{{ e }}</option>
      </select>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Subject</th>
          <th>Avg</th>
          <th>Best</th>
          <th>Latest Exam</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in summary" :key="row.key">
          <td>{{ row.student }}</td>
          <td>{{ row.subject }}</td>
          <td><span class="badge">{{ row.avg }}</span></td>
          <td>{{ row.max }}</td>
          <td>{{ row.latestExam }}</td>
        </tr>
        <tr v-if="summary.length === 0">
          <td colspan="5" class="muted">No grades</td>
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
function studentName(id: string) { return students.value.find(s => s.id === id)?.name || 'Unknown' }
const q = ref('')
const exam = ref('')
const exams = computed(() => Array.from(new Set(grades.value.map(g => g.exam))).sort())
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return grades.value.filter(g => {
    const text = `${studentName(g.studentId)} ${g.subject}`.toLowerCase()
    const matchesExam = !exam.value || g.exam === exam.value
    return (!v || text.includes(v)) && matchesExam
  })
})
const summary = computed(() => {
  const map = new Map<string, { scores: number[]; latestExam: string }>()
  filtered.value.forEach(g => {
    const key = `${g.studentId}::${g.subject}`
    const cur = map.get(key) || { scores: [], latestExam: '' }
    cur.scores.push(g.score)
    cur.latestExam = g.exam
    map.set(key, cur)
  })
  return Array.from(map.entries()).map(([key, v]) => {
    const [studentId, subject] = key.split('::')
    const avg = v.scores.length ? Math.round(v.scores.reduce((a,b) => a+b, 0) / v.scores.length) : 0
    const max = v.scores.length ? Math.max(...v.scores) : 0
    return { key, student: studentName(studentId), subject, avg, max, latestExam: v.latestExam }
  }).sort((a,b) => b.avg - a.avg)
})
</script>
