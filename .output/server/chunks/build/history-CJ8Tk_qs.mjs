import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useStudents } from './useStudents-DJgsXf9t.mjs';
import { u as useAttendance } from './useAttendance-Dyr7yiAa.mjs';
import './state-DBVJpStn.mjs';
import './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "history",
  __ssrInlineRender: true,
  setup(__props) {
    const { students } = useStudents();
    const { records } = useAttendance();
    const q = ref("");
    const from = ref("");
    const to = ref("");
    function getStudent(id) {
      return students.value.find((s) => s.id === id);
    }
    const filtered = computed(() => {
      const v = q.value.trim().toLowerCase();
      return records.value.filter((r) => {
        var _a;
        const name = ((_a = getStudent(r.studentId)) == null ? void 0 : _a.name.toLowerCase()) || "";
        const dateStr = r.date.slice(0, 10);
        const afterFrom = !from.value || dateStr >= from.value;
        const beforeTo = !to.value || dateStr <= to.value;
        const matchesText = !v || name.includes(v);
        return afterFrom && beforeTo && matchesText;
      }).sort((a, b) => a.date.localeCompare(b.date));
    });
    function formatDate(d) {
      return new Date(d).toLocaleDateString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input class="date" type="date"${ssrRenderAttr("value", from.value)}><input class="date" type="date"${ssrRenderAttr("value", to.value)}><input class="input"${ssrRenderAttr("value", q.value)} placeholder="Search student name"><div class="spacer"></div><button class="btn secondary">Clear</button></div><table class="table"><thead><tr><th>Date</th><th>Student</th><th>Grade</th><th>Status</th><th class="actions">Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(filtered.value, (r) => {
        var _a, _b;
        _push(`<tr><td>${ssrInterpolate(formatDate(r.date))}</td><td>${ssrInterpolate(((_a = getStudent(r.studentId)) == null ? void 0 : _a.name) || "Unknown")}</td><td>${ssrInterpolate(((_b = getStudent(r.studentId)) == null ? void 0 : _b.grade) || "-")}</td><td><span class="badge">${ssrInterpolate(r.status)}</span></td><td class="actions"><button class="btn danger">Delete</button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (filtered.value.length === 0) {
        _push(`<tr><td colspan="5" class="muted">No attendance records</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/attendance/history.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=history-CJ8Tk_qs.mjs.map
