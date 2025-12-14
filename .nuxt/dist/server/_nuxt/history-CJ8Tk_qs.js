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
        const name = getStudent(r.studentId)?.name.toLowerCase() || "";
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
        _push(`<tr><td>${ssrInterpolate(formatDate(r.date))}</td><td>${ssrInterpolate(getStudent(r.studentId)?.name || "Unknown")}</td><td>${ssrInterpolate(getStudent(r.studentId)?.grade || "-")}</td><td><span class="badge">${ssrInterpolate(r.status)}</span></td><td class="actions"><button class="btn danger">Delete</button></td></tr>`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=history-CJ8Tk_qs.js.map
