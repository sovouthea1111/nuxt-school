<template>
  <section class="card">
    <div class="toolbar">
      <input class="date" type="date" v-model="from" />
      <input class="date" type="date" v-model="to" />
      <input class="input" v-model="q" placeholder="Search student name" />
      <div class="spacer"></div>
      <button class="btn secondary" @click="clearFilters">Clear</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Student</th>
          <th>Grade</th>
          <th>Status</th>
          <th class="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in filtered" :key="r.id">
          <td>{{ formatDate(r.date) }}</td>
          <td>{{ getStudent(r.studentId)?.name || 'Unknown' }}</td>
          <td>{{ getStudent(r.studentId)?.grade || '-' }}</td>
          <td><span class="badge">{{ r.status }}</span></td>
          <td class="actions">
            <button class="btn danger" @click="remove(r.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="filtered.length === 0">
          <td colspan="5" class="muted">No attendance records</td>
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
const { records, remove } = useAttendance()
const q = ref('')
const from = ref('')
const to = ref('')
function getStudent(id: string) { return students.value.find(s => s.id === id) }
const filtered = computed(() => {
  const v = q.value.trim().toLowerCase()
  return records.value.filter(r => {
    const name = getStudent(r.studentId)?.name.toLowerCase() || ''
    const dateStr = r.date.slice(0,10)
    const afterFrom = !from.value || dateStr >= from.value
    const beforeTo = !to.value || dateStr <= to.value
    const matchesText = !v || name.includes(v)
    return afterFrom && beforeTo && matchesText
  }).sort((a,b) => a.date.localeCompare(b.date))
})
function clearFilters() { q.value = ''; from.value = ''; to.value = '' }
function formatDate(d: string) { return new Date(d).toLocaleDateString() }
</script>
