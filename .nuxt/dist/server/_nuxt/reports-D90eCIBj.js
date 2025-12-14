import { defineComponent, ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { u as useGrades } from "./useGrades-DddZahas.js";
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
    const { grades } = useGrades();
    const q = ref("");
    const filtered = computed(() => {
      const v = q.value.trim().toLowerCase();
      return grades.value.filter((g) => {
        const text = `${g.exam} ${g.subject}`.toLowerCase();
        return !v || text.includes(v);
      });
    });
    const summary = computed(() => {
      const map = /* @__PURE__ */ new Map();
      filtered.value.forEach((g) => {
        const key = `${g.exam}::${g.subject}`;
        const arr = map.get(key) || [];
        arr.push(g.score);
        map.set(key, arr);
      });
      return Array.from(map.entries()).map(([key, scores]) => {
        const [exam, subject] = key.split("::");
        const count = scores.length;
        const avg = count ? Math.round(scores.reduce((a, b) => a + b, 0) / count) : 0;
        const max = count ? Math.max(...scores) : 0;
        const min = count ? Math.min(...scores) : 0;
        return { key, exam, subject, count, avg, max, min };
      }).sort((a, b) => b.avg - a.avg);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input class="input"${ssrRenderAttr("value", q.value)} placeholder="Filter by exam or subject"></div><table class="table"><thead><tr><th>Exam</th><th>Subject</th><th>Entries</th><th>Average</th><th>Best</th><th>Worst</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(summary.value, (row) => {
        _push(`<tr><td>${ssrInterpolate(row.exam)}</td><td>${ssrInterpolate(row.subject)}</td><td>${ssrInterpolate(row.count)}</td><td><span class="badge">${ssrInterpolate(row.avg)}</span></td><td>${ssrInterpolate(row.max)}</td><td>${ssrInterpolate(row.min)}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (summary.value.length === 0) {
        _push(`<tr><td colspan="6" class="muted">No exam data</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exams/reports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=reports-D90eCIBj.js.map
