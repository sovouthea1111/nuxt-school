import { ref } from 'vue'
import { useState } from 'nuxt/app'
import { useStudents } from '~/composables/useStudents'

type GradeEntry = {
  id: string
  studentId: string
  subject: string
  exam: string
  score: number
  date: string
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useGrades() {
  const grades = useState<GradeEntry[]>('grades', () => [])
  const initialized = ref(false)
  if (process.client && !initialized.value) {
    const raw = localStorage.getItem('grades')
    if (raw) {
      grades.value = JSON.parse(raw) as GradeEntry[]
    } else {
      const { students } = useStudents()
      const subjects = ['Mathematics', 'Khmer', 'Science']
      const exams = ['Midterm', 'Final']
      const today = new Date()
      const sample: GradeEntry[] = []
      students.value.slice(0, 5).forEach((s, i) => {
        subjects.forEach((subj, si) => {
          exams.forEach((ex, ei) => {
            const date = new Date(today)
            date.setDate(today.getDate() - (si + ei + i))
            const base = 60 + ((i * 7 + si * 9 + ei * 11) % 40)
            const score = Math.min(100, Math.max(0, base))
            sample.push({ id: genId(), studentId: s.id, subject: subj, exam: ex, score, date: date.toISOString() })
          })
        })
      })
      grades.value = sample
      localStorage.setItem('grades', JSON.stringify(grades.value))
    }
    initialized.value = true
  }
  function persist() {
    if (process.client) localStorage.setItem('grades', JSON.stringify(grades.value))
  }
  function list() {
    return grades.value
  }
  function getById(id: string) {
    return grades.value.find(g => g.id === id)
  }
  function create(payload: Omit<GradeEntry, 'id'>) {
    grades.value.push({ id: genId(), ...payload, date: new Date(payload.date).toISOString() })
    persist()
  }
  function update(id: string, payload: Omit<GradeEntry, 'id'>) {
    const idx = grades.value.findIndex(g => g.id === id)
    if (idx !== -1) {
      grades.value[idx] = { id, ...payload, date: new Date(payload.date).toISOString() }
      persist()
    }
  }
  function remove(id: string) {
    const idx = grades.value.findIndex(g => g.id === id)
    if (idx !== -1) {
      grades.value.splice(idx, 1)
      persist()
    }
  }
  return { grades, list, getById, create, update, remove }
}
