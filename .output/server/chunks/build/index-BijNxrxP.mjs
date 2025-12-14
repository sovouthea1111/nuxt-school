import { _ as __nuxt_component_0 } from './nuxt-link-DLn61_TA.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { u as useStudents } from './useStudents-Cdvy9quF.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
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
    const gradeCounts = computed(() => {
      const m = /* @__PURE__ */ new Map();
      for (const s of students.value) {
        m.set(s.grade, (m.get(s.grade) || 0) + 1);
      }
      return Array.from(m.entries()).map(([grade, count]) => ({ grade, count }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "row" }, _attrs))}><section class="col card"><h2 class="title">Overview</h2><div class="grid"><div><div class="muted">Total Students</div><div style="${ssrRenderStyle({ "font-size": "28px", "font-weight": "800" })}">${ssrInterpolate(unref(students).length)}</div></div><div><div class="muted">Grades</div><div class="row" style="${ssrRenderStyle({ "gap": "6px", "margin-top": "6px" })}"><!--[-->`);
      ssrRenderList(unref(gradeCounts), (g) => {
        _push(`<span class="badge">${ssrInterpolate(g.grade)}: ${ssrInterpolate(g.count)}</span>`);
      });
      _push(`<!--]--></div></div></div></section><section class="col card"><h2 class="title">Quick Actions</h2><div class="toolbar">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/students",
        class: "btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Manage Students`);
          } else {
            return [
              createTextVNode("Manage Students")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/students/new",
        class: "btn secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Add Student`);
          } else {
            return [
              createTextVNode("Add Student")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="muted">Primary school context for Cambodia</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BijNxrxP.mjs.map
