import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useGrades } from './useGrades-DddZahas.mjs';
import { u as useStudents } from './useStudents-DJgsXf9t.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { grades } = useGrades();
    const { students } = useStudents();
    function studentName(id) {
      var _a;
      return ((_a = students.value.find((s) => s.id === id)) == null ? void 0 : _a.name) || "Unknown";
    }
    const now = /* @__PURE__ */ new Date();
    const from = ref(new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10));
    const to = ref("");
    const filtered = computed(() => {
      return grades.value.filter((g) => {
        const d = g.date.slice(0, 10);
        const afterFrom = !from.value || d >= from.value;
        const beforeTo = !to.value || d <= to.value;
        return afterFrom && beforeTo;
      }).sort((a, b) => b.score - a.score || b.date.localeCompare(a.date));
    });
    computed(() => {
      const arr = filtered.value;
      if (arr.length === 0) return 0;
      return Math.round(arr.reduce((a, b) => a + b.score, 0) / arr.length);
    });
    function formatDate(d) {
      return new Date(d).toLocaleDateString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><h2 class="title">Exams Overview</h2><div class="toolbar"><input class="date" type="date"${ssrRenderAttr("value", from.value)}><input class="date" type="date"${ssrRenderAttr("value", to.value)}><div class="spacer"></div><button class="btn secondary">Clear</button></div><table class="table"><thead><tr><th>Date</th><th>Student</th><th>Subject</th><th>Exam</th><th>Score</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(filtered.value, (g) => {
        _push(`<tr><td>${ssrInterpolate(formatDate(g.date))}</td><td>${ssrInterpolate(studentName(g.studentId))}</td><td>${ssrInterpolate(g.subject)}</td><td>${ssrInterpolate(g.exam)}</td><td><span class="badge">${ssrInterpolate(g.score)}</span></td></tr>`);
      });
      _push(`<!--]-->`);
      if (filtered.value.length === 0) {
        _push(`<tr><td colspan="5" class="muted">No exam results</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exams/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-nCAz6zxM.mjs.map
