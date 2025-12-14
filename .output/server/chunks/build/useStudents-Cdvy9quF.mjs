import { ref, toRef, isRef } from 'vue';
import { u as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
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
//# sourceMappingURL=useStudents-Cdvy9quF.mjs.map
