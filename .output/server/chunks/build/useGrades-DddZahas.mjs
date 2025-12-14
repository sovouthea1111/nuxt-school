import { ref } from 'vue';
import { u as useState } from './state-DBVJpStn.mjs';

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function useGrades() {
  const grades = useState("grades", () => []);
  ref(false);
  function list() {
    return grades.value;
  }
  function getById(id) {
    return grades.value.find((g) => g.id === id);
  }
  function create(payload) {
    grades.value.push({ id: genId(), ...payload, date: new Date(payload.date).toISOString() });
  }
  function update(id, payload) {
    const idx = grades.value.findIndex((g) => g.id === id);
    if (idx !== -1) {
      grades.value[idx] = { id, ...payload, date: new Date(payload.date).toISOString() };
    }
  }
  function remove(id) {
    const idx = grades.value.findIndex((g) => g.id === id);
    if (idx !== -1) {
      grades.value.splice(idx, 1);
    }
  }
  return { grades, list, getById, create, update, remove };
}

export { useGrades as u };
//# sourceMappingURL=useGrades-DddZahas.mjs.map
