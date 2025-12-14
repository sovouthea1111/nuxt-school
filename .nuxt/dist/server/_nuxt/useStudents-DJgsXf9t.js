import { ref } from "vue";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import { u as useState } from "./state-DBVJpStn.js";
import "D:/Bussiness/school/node_modules/klona/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
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
export {
  useStudents as u
};
//# sourceMappingURL=useStudents-DJgsXf9t.js.map
