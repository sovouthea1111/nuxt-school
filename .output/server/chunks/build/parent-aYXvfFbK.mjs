import { _ as __nuxt_component_0 } from './nuxt-link-CjQ1U1qT.mjs';
import { _ as __nuxt_component_1 } from './page-D0XuyZ8g.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-router';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  const _component_NuxtPage = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout" }, _attrs))}><aside class="sidebar"><div class="brand"><div class="logo">\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}</div><div class="brand-text">Parent</div></div><nav class="side-nav">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/parents/dashboard",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Dashboard`);
      } else {
        return [
          createTextVNode("Dashboard")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/parents",
    class: "nav-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Overview`);
      } else {
        return [
          createTextVNode("Overview")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/payments",
    class: "nav-link"
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
    class: "nav-link"
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
  _push(`</nav></aside><section class="content"><header class="topbar"><input class="search" placeholder="Search..."></header><main class="container container--wide">`);
  _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
  _push(`</main></section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parent.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const parent = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { parent as default };
//# sourceMappingURL=parent-aYXvfFbK.mjs.map
