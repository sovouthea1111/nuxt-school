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
function useAttendance() {
  const records = useState("attendance", () => []);
  ref(false);
  function list() {
    return records.value;
  }
  function upsert(record) {
    const idx = records.value.findIndex((r) => r.studentId === record.studentId && r.date.slice(0, 10) === record.date.slice(0, 10));
    if (idx !== -1) {
      records.value[idx] = { ...records.value[idx], ...record };
    } else {
      records.value.push({ id: genId(), ...record });
    }
  }
  function bulkMark(date, entries) {
    entries.forEach((e) => upsert({ studentId: e.studentId, date: new Date(date).toISOString(), status: e.status }));
  }
  function remove(id) {
    const idx = records.value.findIndex((r) => r.id === id);
    if (idx !== -1) {
      records.value.splice(idx, 1);
    }
  }
  return { records, list, upsert, bulkMark, remove };
}
export {
  useAttendance as u
};
//# sourceMappingURL=useAttendance-Dyr7yiAa.js.map
