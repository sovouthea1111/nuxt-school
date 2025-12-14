import { _ as __nuxt_component_0 } from "./nuxt-link-CjQ1U1qT.js";
import { mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from "vue/server-renderer";
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
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><h2 class="title">Attendance</h2><div class="grid" style="${ssrRenderStyle({ "grid-template-columns": "repeat(3, minmax(0,1fr))" })}">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/attendance/mark",
    class: "panel"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="panel-title"${_scopeId}>Mark Attendance</div><div class="muted"${_scopeId}>Set status for each student by date</div>`);
      } else {
        return [
          createVNode("div", { class: "panel-title" }, "Mark Attendance"),
          createVNode("div", { class: "muted" }, "Set status for each student by date")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/attendance/history",
    class: "panel"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="panel-title"${_scopeId}>History</div><div class="muted"${_scopeId}>Browse records by date range and student</div>`);
      } else {
        return [
          createVNode("div", { class: "panel-title" }, "History"),
          createVNode("div", { class: "muted" }, "Browse records by date range and student")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/attendance/reports",
    class: "panel"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="panel-title"${_scopeId}>Reports</div><div class="muted"${_scopeId}>Summary of Present, Absent, Late and rate</div>`);
      } else {
        return [
          createVNode("div", { class: "panel-title" }, "Reports"),
          createVNode("div", { class: "muted" }, "Summary of Present, Absent, Late and rate")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/attendance/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  index as default
};
//# sourceMappingURL=index-BnQ9c3s5.js.map
