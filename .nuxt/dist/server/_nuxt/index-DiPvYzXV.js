import { _ as __nuxt_component_0 } from "./nuxt-link-CjQ1U1qT.js";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "D:/Bussiness/school/node_modules/ufo/dist/index.mjs";
import "D:/Bussiness/school/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import "D:/Bussiness/school/node_modules/unctx/dist/index.mjs";
import "D:/Bussiness/school/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/Bussiness/school/node_modules/radix3/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><h2 class="title">Reports</h2><div class="grid">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/reports/attendance",
    class: "btn secondary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Attendance`);
      } else {
        return [
          createTextVNode("Attendance")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/reports/grades",
    class: "btn secondary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Grades`);
      } else {
        return [
          createTextVNode("Grades")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/reports/payments",
    class: "btn secondary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Payments`);
      } else {
        return [
          createTextVNode("Payments")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/reports/performance",
    class: "btn secondary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Performance`);
      } else {
        return [
          createTextVNode("Performance")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reports/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-DiPvYzXV.js.map
