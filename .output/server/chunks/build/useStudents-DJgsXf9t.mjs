import { ref } from 'vue';
import { u as useState } from './state-DBVJpStn.mjs';

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function useStudents() {
  const students = useState("students", () => []);
  ref(false);
  function list() {
    return students.value;
  }
  function getById(id) {
    return students.value.find((s) => s.id === id);
  }
  function create(payload) {
    students.value.push({ id: genId(), ...payload, enrollmentDate: new Date(payload.enrollmentDate).toISOString() });
  }
  function update(id, payload) {
    const idx = students.value.findIndex((s) => s.id === id);
    if (idx !== -1) {
      students.value[idx] = { id, ...payload, enrollmentDate: new Date(payload.enrollmentDate).toISOString() };
    }
  }
  function remove(id) {
    const idx = students.value.findIndex((s) => s.id === id);
    if (idx !== -1) {
      students.value.splice(idx, 1);
    }
  }
  return { students, list, getById, create, update, remove };
}

export { useStudents as u };
//# sourceMappingURL=useStudents-DJgsXf9t.mjs.map
