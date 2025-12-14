import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useStudents } from "./useStudents-DJgsXf9t.js";
import { u as useAttendance } from "./useAttendance-Dyr7yiAa.js";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "D:/Bussiness/school/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/Bussiness/school/node_modules/unctx/dist/index.mjs";
import "D:/Bussiness/school/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/Bussiness/school/node_modules/radix3/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "D:/Bussiness/school/node_modules/ufo/dist/index.mjs";
import "./state-DBVJpStn.js";
import "D:/Bussiness/school/node_modules/klona/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reports",
  __ssrInlineRender: true,
  setup(__props) {
    const { students } = useStudents();
    const { records } = useAttendance();
    const from = ref("");
    const to = ref("");
    const filtered = computed(() => {
      return records.value.filter((r) => {
        const dateStr = r.date.slice(0, 10);
        const afterFrom = !from.value || dateStr >= from.value;
        const beforeTo = !to.value || dateStr <= to.value;
        return afterFrom && beforeTo;
      });
    });
    const summary = computed(() => {
      const map = /* @__PURE__ */ new Map();
      filtered.value.forEach((r) => {
        const m = map.get(r.studentId) || { present: 0, absent: 0, late: 0, total: 0 };
        if (r.status === "Present") m.present++;
        if (r.status === "Absent") m.absent++;
        if (r.status === "Late") m.late++;
        m.total++;
        map.set(r.studentId, m);
      });
      return Array.from(map.entries()).map(([id, m]) => {
        const s = students.value.find((x) => x.id === id);
        const rate = m.total ? Math.round(m.present / m.total * 100) : 0;
        return { studentId: id, name: s?.name || "Unknown", grade: s?.grade || "-", present: m.present, absent: m.absent, late: m.late, rate };
      }).sort((a, b) => b.rate - a.rate);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input class="date" type="date"${ssrRenderAttr("value", from.value)}><input class="date" type="date"${ssrRenderAttr("value", to.value)}><div class="spacer"></div><button class="btn secondary">Clear Range</button></div><table class="table"><thead><tr><th>Student</th><th>Grade</th><th>Present</th><th>Absent</th><th>Late</th><th>Attendance Rate</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(summary.value, (row) => {
        _push(`<tr><td>${ssrInterpolate(row.name)}</td><td><span class="badge">${ssrInterpolate(row.grade)}</span></td><td>${ssrInterpolate(row.present)}</td><td>${ssrInterpolate(row.absent)}</td><td>${ssrInterpolate(row.late)}</td><td>${ssrInterpolate(row.rate)}%</td></tr>`);
      });
      _push(`<!--]-->`);
      if (summary.value.length === 0) {
        _push(`<tr><td colspan="6" class="muted">No data</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/attendance/reports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=reports-KyGclYM-.js.map
