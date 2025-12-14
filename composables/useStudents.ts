import { ref } from 'vue'
import { useState } from 'nuxt/app'

type Student = {
  id: string
  name: string
  gender: string
  grade: string
  age: number
  guardian: string
  enrollmentDate: string
  address: string
}

function sampleSeed(): Student[] {
  return [
    { id: genId(), name: 'Sophea Chan', gender: 'Female', grade: 'Grade 3', age: 9, guardian: 'Chan Dara', enrollmentDate: new Date('2023-10-01').toISOString(), address: 'Phnom Penh' },
    { id: genId(), name: 'Vannak Sok', gender: 'Male', grade: 'Grade 2', age: 8, guardian: 'Sok Lina', enrollmentDate: new Date('2024-01-15').toISOString(), address: 'Siem Reap' },
    { id: genId(), name: 'Sreyneang Kim', gender: 'Female', grade: 'Grade 1', age: 7, guardian: 'Kim Phalla', enrollmentDate: new Date('2024-05-20').toISOString(), address: 'Battambang' }
  ]
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useStudents() {
  const students = useState<Student[]>('students', () => [])
  const initialized = ref(false)
  if (process.client && !initialized.value) {
    const raw = localStorage.getItem('students')
    students.value = raw ? JSON.parse(raw) as Student[] : sampleSeed()
    initialized.value = true
  }
  function persist() {
    if (process.client) localStorage.setItem('students', JSON.stringify(students.value))
  }
  function list() {
    return students.value
  }
  function getById(id: string) {
    return students.value.find(s => s.id === id)
  }
  function create(payload: Omit<Student, 'id'>) {
    students.value.push({ id: genId(), ...payload, enrollmentDate: new Date(payload.enrollmentDate).toISOString() })
    persist()
  }
  function update(id: string, payload: Omit<Student, 'id'>) {
    const idx = students.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      students.value[idx] = { id, ...payload, enrollmentDate: new Date(payload.enrollmentDate).toISOString() }
      persist()
    }
  }
  function remove(id: string) {
    const idx = students.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      students.value.splice(idx, 1)
      persist()
    }
  }
  return { students, list, getById, create, update, remove }
}
