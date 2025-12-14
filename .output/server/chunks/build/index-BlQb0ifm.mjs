import { _ as __nuxt_component_0 } from './nuxt-link-DLn61_TA.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
    const q = ref("");
    const filtered = computed(() => {
      const v = q.value.trim().toLowerCase();
      if (!v) return students.value;
      return students.value.filter(
        (s) => s.name.toLowerCase().includes(v) || s.guardian.toLowerCase().includes(v)
      );
    });
    function formatDate(d) {
      return new Date(d).toLocaleDateString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input${ssrRenderAttr("value", unref(q))} class="input" placeholder="Search name or guardian"><div class="spacer"></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/students/new",
        class: "btn"
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
      _push(`</div><table class="table"><thead><tr><th>Name</th><th>Gender</th><th>Grade</th><th>Age</th><th>Guardian</th><th>Enrolled</th><th class="actions">Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filtered), (s) => {
        _push(`<tr><td>${ssrInterpolate(s.name)}</td><td><span class="badge">${ssrInterpolate(s.gender)}</span></td><td>${ssrInterpolate(s.grade)}</td><td>${ssrInterpolate(s.age)}</td><td>${ssrInterpolate(s.guardian)}</td><td>${ssrInterpolate(formatDate(s.enrollmentDate))}</td><td class="actions">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/students/${s.id}`,
          class: "btn secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Edit`);
            } else {
              return [
                createTextVNode("Edit")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<button class="btn danger">Delete</button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (unref(filtered).length === 0) {
        _push(`<tr><td colspan="7" class="muted">No students found</td></tr>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/students/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BlQb0ifm.mjs.map
