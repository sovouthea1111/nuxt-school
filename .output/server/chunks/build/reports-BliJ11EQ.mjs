import { defineComponent, ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "reports",
  __ssrInlineRender: true,
  setup(__props) {
    const { grades } = useGrades();
    const { students } = useStudents();
    function studentName(id) {
      var _a;
      return ((_a = students.value.find((s) => s.id === id)) == null ? void 0 : _a.name) || "Unknown";
    }
    const q = ref("");
    const exam = ref("");
    const exams = computed(() => Array.from(new Set(grades.value.map((g) => g.exam))).sort());
    const filtered = computed(() => {
      const v = q.value.trim().toLowerCase();
      return grades.value.filter((g) => {
        const text = `${studentName(g.studentId)} ${g.subject}`.toLowerCase();
        const matchesExam = !exam.value || g.exam === exam.value;
        return (!v || text.includes(v)) && matchesExam;
      });
    });
    const summary = computed(() => {
      const map = /* @__PURE__ */ new Map();
      filtered.value.forEach((g) => {
        const key = `${g.studentId}::${g.subject}`;
        const cur = map.get(key) || { scores: [], latestExam: "" };
        cur.scores.push(g.score);
        cur.latestExam = g.exam;
        map.set(key, cur);
      });
      return Array.from(map.entries()).map(([key, v]) => {
        const [studentId, subject] = key.split("::");
        const avg = v.scores.length ? Math.round(v.scores.reduce((a, b) => a + b, 0) / v.scores.length) : 0;
        const max = v.scores.length ? Math.max(...v.scores) : 0;
        return { key, student: studentName(studentId), subject, avg, max, latestExam: v.latestExam };
      }).sort((a, b) => b.avg - a.avg);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input class="input"${ssrRenderAttr("value", q.value)} placeholder="Filter by student or subject"><div class="spacer"></div><select class="select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(exam.value) ? ssrLooseContain(exam.value, "") : ssrLooseEqual(exam.value, "")) ? " selected" : ""}>All Exams</option><!--[-->`);
      ssrRenderList(exams.value, (e) => {
        _push(`<option${ssrIncludeBooleanAttr(Array.isArray(exam.value) ? ssrLooseContain(exam.value, null) : ssrLooseEqual(exam.value, null)) ? " selected" : ""}>${ssrInterpolate(e)}</option>`);
      });
      _push(`<!--]--></select></div><table class="table"><thead><tr><th>Student</th><th>Subject</th><th>Avg</th><th>Best</th><th>Latest Exam</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(summary.value, (row) => {
        _push(`<tr><td>${ssrInterpolate(row.student)}</td><td>${ssrInterpolate(row.subject)}</td><td><span class="badge">${ssrInterpolate(row.avg)}</span></td><td>${ssrInterpolate(row.max)}</td><td>${ssrInterpolate(row.latestExam)}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (summary.value.length === 0) {
        _push(`<tr><td colspan="5" class="muted">No grades</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/grades/reports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reports-BliJ11EQ.mjs.map
