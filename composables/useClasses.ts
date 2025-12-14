import { ref } from 'vue'
import { useState } from 'nuxt/app'

type SchoolClass = {
  id: string
  name: string
  grade: string
  section: string
  teacher: string
  room: string
}

function sampleSeed(): SchoolClass[] {
  return [
    { id: genId(), name: 'Grade 3 - Red', grade: 'Grade 3', section: 'Red', teacher: 'Sokha Hun', room: 'A1' },
    { id: genId(), name: 'Grade 2 - Blue', grade: 'Grade 2', section: 'Blue', teacher: 'Borey Chhim', room: 'B2' }
  ]
}

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function useClasses() {
  const classes = useState<SchoolClass[]>('classes', () => [])
  const initialized = ref(false)
  if (process.client && !initialized.value) {
    const raw = localStorage.getItem('classes')
    classes.value = raw ? JSON.parse(raw) as SchoolClass[] : sampleSeed()
    initialized.value = true
  }
  function persist() {
    if (process.client) localStorage.setItem('classes', JSON.stringify(classes.value))
  }
  function list() {
    return classes.value
  }
  function getById(id: string) {
    return classes.value.find(c => c.id === id)
  }
  function create(payload: Omit<SchoolClass, 'id'>) {
    classes.value.push({ id: genId(), ...payload })
    persist()
  }
  function update(id: string, payload: Omit<SchoolClass, 'id'>) {
    const idx = classes.value.findIndex(c => c.id === id)
    if (idx !== -1) {
      classes.value[idx] = { id, ...payload }
      persist()
    }
  }
  function remove(id: string) {
    const idx = classes.value.findIndex(c => c.id === id)
    if (idx !== -1) {
      classes.value.splice(idx, 1)
      persist()
    }
  }
  return { classes, list, getById, create, update, remove }
}
