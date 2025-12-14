<template>
  <div class="grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
    <section class="card">
      <h2 class="title">Students by Grade</h2>
      <div class="chart">
        <div v-for="g in gradeSeries" :key="g.label" class="chart-row">
          <div class="chart-label">{{ g.label }}</div>
          <div class="chart-bar"><div class="chart-fill" :style="{ width: g.pct + '%' }"></div></div>
          <div class="chart-value">{{ g.value }}</div>
        </div>
      </div>
    </section>
    <section class="card">
      <h2 class="title">Attendance Last 7 Days</h2>
      <div class="chart">
        <div v-for="d in attendanceSeries" :key="d.label" class="chart-row">
          <div class="chart-label">{{ d.label }}</div>
          <div class="chart-bar"><div class="chart-fill" :style="{ width: d.pct + '%' }"></div></div>
          <div class="chart-value">{{ d.value }}%</div>
        </div>
      </div>
    </section>
    <section class="card">
      <h2 class="title">Exam Averages by Subject</h2>
      <div class="chart">
        <div v-for="s in examSeries" :key="s.label" class="chart-row">
          <div class="chart-label">{{ s.label }}</div>
          <div class="chart-bar"><div class="chart-fill" :style="{ width: s.pct + '%' }"></div></div>
          <div class="chart-value">{{ s.value }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudents } from '~/composables/useStudents'
import { useAttendance } from '~/composables/useAttendance'
import { useGrades } from '~/composables/useGrades'
const { students } = useStudents()
const { records } = useAttendance()
const { grades } = useGrades()
const gradeSeries = computed(() => {
  const m = new Map<string, number>()
  students.value.forEach(s => m.set(s.grade, (m.get(s.grade) || 0) + 1))
  const arr = Array.from(m.entries()).map(([label, value]) => ({ label, value }))
  const max = Math.max(1, ...arr.map(a => a.value))
  return arr.sort((a,b) => a.label.localeCompare(b.label)).map(a => ({ ...a, pct: Math.round((a.value / max) * 100) }))
})
const attendanceSeries = computed(() => {
  const days = 7
  const today = new Date()
  const out: { label: string; value: number; pct: number }[] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = d.toISOString().slice(0,10)
    const dayRecords = records.value.filter(r => r.date.slice(0,10) === key)
    const total = dayRecords.length
    const present = dayRecords.filter(r => r.status === 'Present').length
    const rate = total ? Math.round((present / total) * 100) : 0
    out.push({ label: key.slice(5), value: rate, pct: rate })
  }
  return out
})
const examSeries = computed(() => {
  const m = new Map<string, number[]>()
  grades.value.forEach(g => {
    const arr = m.get(g.subject) || []
    arr.push(g.score)
    m.set(g.subject, arr)
  })
  const arr = Array.from(m.entries()).map(([label, scores]) => {
    const avg = scores.length ? Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) : 0
    return { label, value: avg }
  })
  return arr.sort((a,b) => b.value - a.value).map(a => ({ ...a, pct: a.value }))
})
</script>

<style scoped>
.chart { display: grid; gap: 10px }
.chart-row { display: grid; grid-template-columns: 120px 1fr 60px; align-items: center; gap: 10px }
.chart-label { color: #666 }
.chart-bar { background: #f1f3f5; height: 12px; border-radius: 6px; overflow: hidden }
.chart-fill { background: linear-gradient(90deg,#4f46e5,#06b6d4); height: 100% }
.chart-value { font-weight: 700 }
</style>
