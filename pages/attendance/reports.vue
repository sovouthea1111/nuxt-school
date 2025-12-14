<template>
  <section class="card">
    <div class="toolbar">
      <input class="date" type="date" v-model="from" />
      <input class="date" type="date" v-model="to" />
      <div class="spacer"></div>
      <button class="btn secondary" @click="clearRange">Clear Range</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Grade</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Late</th>
          <th>Attendance Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in summary" :key="row.studentId">
          <td>{{ row.name }}</td>
          <td><span class="badge">{{ row.grade }}</span></td>
          <td>{{ row.present }}</td>
          <td>{{ row.absent }}</td>
          <td>{{ row.late }}</td>
          <td>{{ row.rate }}%</td>
        </tr>
        <tr v-if="summary.length === 0">
          <td colspan="6" class="muted">No data</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStudents } from '~/composables/useStudents'
import { useAttendance } from '~/composables/useAttendance'
const { students } = useStudents()
const { records } = useAttendance()
const from = ref('')
const to = ref('')
const filtered = computed(() => {
  return records.value.filter(r => {
    const dateStr = r.date.slice(0,10)
    const afterFrom = !from.value || dateStr >= from.value
    const beforeTo = !to.value || dateStr <= to.value
    return afterFrom && beforeTo
  })
})
const summary = computed(() => {
  const map = new Map<string, { present: number; absent: number; late: number; total: number }>()
  filtered.value.forEach(r => {
    const m = map.get(r.studentId) || { present: 0, absent: 0, late: 0, total: 0 }
    if (r.status === 'Present') m.present++
    if (r.status === 'Absent') m.absent++
    if (r.status === 'Late') m.late++
    m.total++
    map.set(r.studentId, m)
  })
  return Array.from(map.entries()).map(([id, m]) => {
    const s = students.value.find(x => x.id === id)
    const rate = m.total ? Math.round((m.present / m.total) * 100) : 0
    return { studentId: id, name: s?.name || 'Unknown', grade: s?.grade || '-', present: m.present, absent: m.absent, late: m.late, rate }
  }).sort((a,b) => b.rate - a.rate)
})
function clearRange() { from.value = ''; to.value = '' }
</script>
