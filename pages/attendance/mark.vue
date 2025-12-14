<template>
  <section class="card">
    <div class="toolbar">
      <input class="date" type="date" v-model="date" />
      <div class="spacer"></div>
      <button class="btn" @click="markAll('Present')">Mark All Present</button>
      <button class="btn secondary" @click="markAll('Absent')">Mark All Absent</button>
      <button class="btn secondary" @click="save">Save</button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Student</th>
          <th>Grade</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="s in students" :key="s.id">
          <td>{{ s.name }}</td>
          <td><span class="badge">{{ s.grade }}</span></td>
          <td>
            <div style="display:flex; gap:8px">
              <label class="chip" :class="{ active: getStatus(s.id) === 'Present' }">
                <input type="radio" :name="`st-${s.id}`" value="Present" v-model="selected[s.id]" /> Present
              </label>
              <label class="chip" :class="{ active: getStatus(s.id) === 'Absent' }">
                <input type="radio" :name="`st-${s.id}`" value="Absent" v-model="selected[s.id]" /> Absent
              </label>
              <label class="chip" :class="{ active: getStatus(s.id) === 'Late' }">
                <input type="radio" :name="`st-${s.id}`" value="Late" v-model="selected[s.id]" /> Late
              </label>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useStudents } from '~/composables/useStudents'
import { useAttendance } from '~/composables/useAttendance'
const { students } = useStudents()
const { bulkMark } = useAttendance()
const date = ref(new Date().toISOString().slice(0,10))
const selected = reactive<Record<string, 'Present' | 'Absent' | 'Late'>>({})
function markAll(status: 'Present' | 'Absent' | 'Late') {
  students.value.forEach(s => { selected[s.id] = status })
}
function getStatus(id: string) { return selected[id] || 'Present' }
function save() {
  const entries = students.value.map(s => ({ studentId: s.id, status: getStatus(s.id) }))
  bulkMark(date.value, entries)
}
</script>
