import { ref } from 'vue'
import { useState } from 'nuxt/app'
import { useStudents } from '~/composables/useStudents'

type AttendanceStatus = 'Present' | 'Absent' | 'Late'
type Attendance = {
  id: string
  studentId: string
  date: string
  status: AttendanceStatus
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useAttendance() {
  const records = useState<Attendance[]>('attendance', () => [])
  const initialized = ref(false)
  if (process.client && !initialized.value) {
    const raw = localStorage.getItem('attendance')
    if (raw) {
      records.value = JSON.parse(raw) as Attendance[]
    } else {
      const { students } = useStudents()
      const today = new Date()
      const sample: Attendance[] = []
      for (let d = 0; d < 5; d++) {
        const date = new Date(today)
        date.setDate(today.getDate() - d)
        const iso = date.toISOString()
        students.value.forEach((s, i) => {
          const roll = (i + d) % 10
          const status: AttendanceStatus = roll < 7 ? 'Present' : roll < 9 ? 'Late' : 'Absent'
          sample.push({ id: genId(), studentId: s.id, date: iso, status })
        })
      }
      records.value = sample
      localStorage.setItem('attendance', JSON.stringify(records.value))
    }
    initialized.value = true
  }
  function persist() {
    if (process.client) localStorage.setItem('attendance', JSON.stringify(records.value))
  }
  function list() {
    return records.value
  }
  function upsert(record: Omit<Attendance, 'id'>) {
    const idx = records.value.findIndex(r => r.studentId === record.studentId && r.date.slice(0,10) === record.date.slice(0,10))
    if (idx !== -1) {
      records.value[idx] = { ...records.value[idx], ...record }
    } else {
      records.value.push({ id: genId(), ...record })
    }
    persist()
  }
  function bulkMark(date: string, entries: { studentId: string; status: AttendanceStatus }[]) {
    entries.forEach(e => upsert({ studentId: e.studentId, date: new Date(date).toISOString(), status: e.status }))
  }
  function remove(id: string) {
    const idx = records.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      records.value.splice(idx, 1)
      persist()
    }
  }
  return { records, list, upsert, bulkMark, remove }
}
