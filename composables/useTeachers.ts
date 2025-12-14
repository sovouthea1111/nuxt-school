import { ref } from 'vue'
import { useState } from 'nuxt/app'

type Teacher = {
  id: string
  name: string
  subject: string
  phone: string
  email: string
  hireDate: string
  address: string
}

function sampleSeed(): Teacher[] {
  return [
    { id: genId(), name: 'Sokha Hun', subject: 'Mathematics', phone: '012345678', email: 'sokha@example.com', hireDate: new Date('2022-09-01').toISOString(), address: 'Phnom Penh' },
    { id: genId(), name: 'Borey Chhim', subject: 'Khmer', phone: '098765432', email: 'borey@example.com', hireDate: new Date('2023-01-10').toISOString(), address: 'Siem Reap' }
  ]
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useTeachers() {
  const teachers = useState<Teacher[]>('teachers', () => [])
  const initialized = ref(false)
  if (process.client && !initialized.value) {
    const raw = localStorage.getItem('teachers')
    teachers.value = raw ? JSON.parse(raw) as Teacher[] : sampleSeed()
    initialized.value = true
  }
  function persist() {
    if (process.client) localStorage.setItem('teachers', JSON.stringify(teachers.value))
  }
  function list() {
    return teachers.value
  }
  function getById(id: string) {
    return teachers.value.find(t => t.id === id)
  }
  function create(payload: Omit<Teacher, 'id'>) {
    teachers.value.push({ id: genId(), ...payload, hireDate: new Date(payload.hireDate).toISOString() })
    persist()
  }
  function update(id: string, payload: Omit<Teacher, 'id'>) {
    const idx = teachers.value.findIndex(t => t.id === id)
    if (idx !== -1) {
      teachers.value[idx] = { id, ...payload, hireDate: new Date(payload.hireDate).toISOString() }
      persist()
    }
  }
  function remove(id: string) {
    const idx = teachers.value.findIndex(t => t.id === id)
    if (idx !== -1) {
      teachers.value.splice(idx, 1)
      persist()
    }
  }
  return { teachers, list, getById, create, update, remove }
}
