<template>
  <section class="card">
    <div class="toolbar">
      <input class="input" v-model="q" placeholder="Filter by exam or subject" />
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Exam</th>
          <th>Subject</th>
          <th>Entries</th>
          <th>Average</th>
          <th>Best</th>
          <th>Worst</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in summary" :key="row.key">
          <td>{{ row.exam }}</td>
          <td>{{ row.subject }}</td>
          <td>{{ row.count }}</td>
          <td><span class="badge">{{ row.avg }}</span></td>
          <td>{{ row.max }}</td>
          <td>{{ row.min }}</td>
        </tr>
        <tr v-if="summary.length === 0">
          <td colspan="6" class="muted">No exam data</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGrades } from '~/composables/useGrades'
const { grades } = useGrades()
const q = ref('')
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return grades.value.filter(g => {
    const text = `${g.exam} ${g.subject}`.toLowerCase()
    return !v || text.includes(v)
  })
})
const summary = computed(() => {
  const map = new Map<string, number[]>()
  filtered.value.forEach(g => {
    const key = `${g.exam}::${g.subject}`
    const arr = map.get(key) || []
    arr.push(g.score)
    map.set(key, arr)
  })
  return Array.from(map.entries()).map(([key, scores]) => {
    const [exam, subject] = key.split('::')
    const count = scores.length
    const avg = count ? Math.round(scores.reduce((a,b) => a+b, 0) / count) : 0
    const max = count ? Math.max(...scores) : 0
    const min = count ? Math.min(...scores) : 0
    return { key, exam, subject, count, avg, max, min }
  }).sort((a,b) => b.avg - a.avg)
})
</script>
