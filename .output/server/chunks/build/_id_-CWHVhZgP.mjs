import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const id = route.params.id;
    const { getById } = useStudents();
    const student = computed(() => getById(id));
    function formatDate(d) {
      return new Date(d).toLocaleDateString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><h2 class="title">Report Card</h2>`);
      if (student.value) {
        _push(`<div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "12px", "margin-bottom": "12px" })}"><div class="chip active">${ssrInterpolate(student.value.name)}</div><span class="badge">${ssrInterpolate(student.value.grade)}</span></div><div class="grid"><div class="field"><label class="label">Guardian</label><div>${ssrInterpolate(student.value.guardian)}</div></div><div class="field"><label class="label">Enrolled</label><div>${ssrInterpolate(formatDate(student.value.enrollmentDate))}</div></div></div><div class="section-title">Subjects</div><div class="grid"><div class="card" style="${ssrRenderStyle({ "padding": "12px" })}"><div class="muted">No grades yet</div></div></div></div>`);
      } else {
        _push(`<div class="muted">Student not found</div>`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/students/report-card/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CWHVhZgP.mjs.map
