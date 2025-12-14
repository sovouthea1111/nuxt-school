import { ref } from 'vue'
import { useState } from 'nuxt/app'

type Subject = {
  id: string
  name: string
  code: string
  description: string
  teacher: string
}

function sampleSeed(): Subject[] {
  return [
    { id: genId(), name: 'Mathematics', code: 'MATH', description: 'Numbers and operations', teacher: 'Sokha Hun' },
    { id: genId(), name: 'Khmer', code: 'KHMR', description: 'Language and literature', teacher: 'Borey Chhim' }
  ]
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useSubjects() {
  const subjects = useState<Subject[]>('subjects', () => [])
  const initialized = ref(false)
  if (process.client && !initialized.value) {
    const raw = localStorage.getItem('subjects')
    subjects.value = raw ? JSON.parse(raw) as Subject[] : sampleSeed()
    initialized.value = true
  }
  function persist() {
    if (process.client) localStorage.setItem('subjects', JSON.stringify(subjects.value))
  }
  function list() {
    return subjects.value
  }
  function getById(id: string) {
    return subjects.value.find(s => s.id === id)
  }
  function create(payload: Omit<Subject, 'id'>) {
    subjects.value.push({ id: genId(), ...payload })
    persist()
  }
  function update(id: string, payload: Omit<Subject, 'id'>) {
    const idx = subjects.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      subjects.value[idx] = { id, ...payload }
      persist()
    }
  }
  function remove(id: string) {
    const idx = subjects.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      subjects.value.splice(idx, 1)
      persist()
    }
  }
  return { subjects, list, getById, create, update, remove }
}
