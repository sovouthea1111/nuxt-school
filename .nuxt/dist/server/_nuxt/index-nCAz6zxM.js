import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useGrades } from "./useGrades-DddZahas.js";
import { u as useStudents } from "./useStudents-DJgsXf9t.js";
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { grades } = useGrades();
    const { students } = useStudents();
    function studentName(id) {
      return students.value.find((s) => s.id === id)?.name || "Unknown";
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-nCAz6zxM.js.map
