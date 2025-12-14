import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { u as useStudents } from './useStudents-DJgsXf9t.mjs';
import { u as useAttendance } from './useAttendance-Dyr7yiAa.mjs';
import { u as useGrades } from './useGrades-DddZahas.mjs';
import { _ as _export_sfc } from './server.mjs';
import './state-DBVJpStn.mjs';
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
    const { students } = useStudents();
    const { records } = useAttendance();
    const { grades } = useGrades();
    const gradeSeries = computed(() => {
      const m = /* @__PURE__ */ new Map();
      students.value.forEach((s) => m.set(s.grade, (m.get(s.grade) || 0) + 1));
      const arr = Array.from(m.entries()).map(([label, value]) => ({ label, value }));
      const max = Math.max(1, ...arr.map((a) => a.value));
      return arr.sort((a, b) => a.label.localeCompare(b.label)).map((a) => ({ ...a, pct: Math.round(a.value / max * 100) }));
    });
    const attendanceSeries = computed(() => {
      const days = 7;
      const today = /* @__PURE__ */ new Date();
      const out = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const dayRecords = records.value.filter((r) => r.date.slice(0, 10) === key);
        const total = dayRecords.length;
        const present = dayRecords.filter((r) => r.status === "Present").length;
        const rate = total ? Math.round(present / total * 100) : 0;
        out.push({ label: key.slice(5), value: rate, pct: rate });
      }
      return out;
    });
    const examSeries = computed(() => {
      const m = /* @__PURE__ */ new Map();
      grades.value.forEach((g) => {
        const arr2 = m.get(g.subject) || [];
        arr2.push(g.score);
        m.set(g.subject, arr2);
      });
      const arr = Array.from(m.entries()).map(([label, scores]) => {
        const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
        return { label, value: avg };
      });
      return arr.sort((a, b) => b.value - a.value).map((a) => ({ ...a, pct: a.value }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "grid",
        style: { "grid-template-columns": "repeat(2, minmax(0, 1fr))" }
      }, _attrs))} data-v-6f18fe63><section class="card" data-v-6f18fe63><h2 class="title" data-v-6f18fe63>Students by Grade</h2><div class="chart" data-v-6f18fe63><!--[-->`);
      ssrRenderList(gradeSeries.value, (g) => {
        _push(`<div class="chart-row" data-v-6f18fe63><div class="chart-label" data-v-6f18fe63>${ssrInterpolate(g.label)}</div><div class="chart-bar" data-v-6f18fe63><div class="chart-fill" style="${ssrRenderStyle({ width: g.pct + "%" })}" data-v-6f18fe63></div></div><div class="chart-value" data-v-6f18fe63>${ssrInterpolate(g.value)}</div></div>`);
      });
      _push(`<!--]--></div></section><section class="card" data-v-6f18fe63><h2 class="title" data-v-6f18fe63>Attendance Last 7 Days</h2><div class="chart" data-v-6f18fe63><!--[-->`);
      ssrRenderList(attendanceSeries.value, (d) => {
        _push(`<div class="chart-row" data-v-6f18fe63><div class="chart-label" data-v-6f18fe63>${ssrInterpolate(d.label)}</div><div class="chart-bar" data-v-6f18fe63><div class="chart-fill" style="${ssrRenderStyle({ width: d.pct + "%" })}" data-v-6f18fe63></div></div><div class="chart-value" data-v-6f18fe63>${ssrInterpolate(d.value)}%</div></div>`);
      });
      _push(`<!--]--></div></section><section class="card" data-v-6f18fe63><h2 class="title" data-v-6f18fe63>Exam Averages by Subject</h2><div class="chart" data-v-6f18fe63><!--[-->`);
      ssrRenderList(examSeries.value, (s) => {
        _push(`<div class="chart-row" data-v-6f18fe63><div class="chart-label" data-v-6f18fe63>${ssrInterpolate(s.label)}</div><div class="chart-bar" data-v-6f18fe63><div class="chart-fill" style="${ssrRenderStyle({ width: s.pct + "%" })}" data-v-6f18fe63></div></div><div class="chart-value" data-v-6f18fe63>${ssrInterpolate(s.value)}</div></div>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6f18fe63"]]);

export { index as default };
//# sourceMappingURL=index-DDaLcEIy.mjs.map
