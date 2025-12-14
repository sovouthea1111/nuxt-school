import { _ as __nuxt_component_0 } from "./nuxt-link-CjQ1U1qT.js";
import { _ as __nuxt_component_1 } from "./page-D0XuyZ8g.js";
import { mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "D:/Bussiness/school/node_modules/ufo/dist/index.mjs";
import "vue-router";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "D:/Bussiness/school/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import "D:/Bussiness/school/node_modules/unctx/dist/index.mjs";
import "D:/Bussiness/school/node_modules/h3/dist/index.mjs";
import "D:/Bussiness/school/node_modules/radix3/dist/index.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout" }, _attrs))}><aside class="sidebar"><div class="brand"><div class="logo">👩‍🏫</div><div class="brand-text">Teacher</div></div><nav class="side-nav">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/classes",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Classes`);
      } else {
        return [
          createTextVNode("Classes")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/subjects",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Subjects`);
      } else {
        return [
          createTextVNode("Subjects")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/attendance",
    class: "nav-link"
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
    to: "/grades",
    class: "nav-link"
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
    to: "/exams",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Exams`);
      } else {
        return [
          createTextVNode("Exams")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/reports",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Reports`);
      } else {
        return [
          createTextVNode("Reports")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</nav></aside><section class="content"><header class="topbar"><input class="search" placeholder="Search..."></header><main class="container container--wide">`);
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(`</main></section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/teacher.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const teacher = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  teacher as default
};
//# sourceMappingURL=teacher-xm7-j1NW.js.map
