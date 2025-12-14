import { _ as __nuxt_component_0 } from './nuxt-link-CjQ1U1qT.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent } from 'vue/server-renderer';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "layout",
    style: { "grid-template-columns": "1fr" }
  }, _attrs))}><section class="content"><main class="container" style="${ssrRenderStyle({ "max-width": "520px" })}"><section class="card"><h2 class="title">Sign In</h2><div class="field"><label class="label">Email</label><input class="input" type="email"></div><div class="field"><label class="label">Password</label><input class="input" type="password"></div><div class="toolbar"><button class="btn">Login</button>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/",
    class: "btn secondary"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Cancel`);
      } else {
        return [
          createTextVNode("Cancel")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></section></main></section></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const auth = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { auth as default };
//# sourceMappingURL=auth-Dh5u8JlC.mjs.map
