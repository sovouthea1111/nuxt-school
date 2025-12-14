import { defineComponent, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "mark",
  __ssrInlineRender: true,
  setup(__props) {
    const { students } = useStudents();
    useAttendance();
    const date = ref((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const selected = reactive({});
    function getStatus(id) {
      return selected[id] || "Present";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input class="date" type="date"${ssrRenderAttr("value", date.value)}><div class="spacer"></div><button class="btn">Mark All Present</button><button class="btn secondary">Mark All Absent</button><button class="btn secondary">Save</button></div><table class="table"><thead><tr><th>Student</th><th>Grade</th><th>Status</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(students), (s) => {
        _push(`<tr><td>${ssrInterpolate(s.name)}</td><td><span class="badge">${ssrInterpolate(s.grade)}</span></td><td><div style="${ssrRenderStyle({ "display": "flex", "gap": "8px" })}"><label class="${ssrRenderClass([{ active: getStatus(s.id) === "Present" }, "chip"])}"><input type="radio"${ssrRenderAttr("name", `st-${s.id}`)} value="Present"${ssrIncludeBooleanAttr(ssrLooseEqual(selected[s.id], "Present")) ? " checked" : ""}> Present </label><label class="${ssrRenderClass([{ active: getStatus(s.id) === "Absent" }, "chip"])}"><input type="radio"${ssrRenderAttr("name", `st-${s.id}`)} value="Absent"${ssrIncludeBooleanAttr(ssrLooseEqual(selected[s.id], "Absent")) ? " checked" : ""}> Absent </label><label class="${ssrRenderClass([{ active: getStatus(s.id) === "Late" }, "chip"])}"><input type="radio"${ssrRenderAttr("name", `st-${s.id}`)} value="Late"${ssrIncludeBooleanAttr(ssrLooseEqual(selected[s.id], "Late")) ? " checked" : ""}> Late </label></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/attendance/mark.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=mark-BlP3h_pa.mjs.map
