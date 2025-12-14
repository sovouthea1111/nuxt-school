import { _ as __nuxt_component_0 } from './nuxt-link-CjQ1U1qT.mjs';
import { _ as __nuxt_component_1 } from './page-D0XuyZ8g.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
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
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const studentsOpen = ref(true);
    const teachersOpen = ref(false);
    const attendanceOpen = ref(false);
    const examsOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "layout" }, _attrs))}><aside class="sidebar"><div class="brand"><div class="logo">\u{1F4DA}</div><div class="brand-text">Idea International</div></div><nav class="side-nav">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
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
      _push(`<div class="nav-group"><button class="nav-trigger"><span>Students</span><span class="${ssrRenderClass([{ open: studentsOpen.value }, "chev"])}">\u25B8</span></button><div class="nav-sub" style="${ssrRenderStyle(studentsOpen.value ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/students",
        class: "nav-sublink"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Students`);
          } else {
            return [
              createTextVNode("Students")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/students/report-card/abc",
        class: "nav-sublink"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Report Card`);
          } else {
            return [
              createTextVNode("Report Card")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="nav-group"><button class="nav-trigger"><span>Teachers</span><span class="${ssrRenderClass([{ open: teachersOpen.value }, "chev"])}">\u25B8</span></button><div class="nav-sub" style="${ssrRenderStyle(teachersOpen.value ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/teachers",
        class: "nav-sublink"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Teachers`);
          } else {
            return [
              createTextVNode("Teachers")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
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
      _push(`<div class="nav-group"><button class="nav-trigger"><span>Attendance</span><span class="${ssrRenderClass([{ open: attendanceOpen.value }, "chev"])}">\u25B8</span></button><div class="nav-sub" style="${ssrRenderStyle(attendanceOpen.value ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/attendance/mark",
        class: "nav-sublink"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mark`);
          } else {
            return [
              createTextVNode("Mark")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/attendance/history",
        class: "nav-sublink"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`History`);
          } else {
            return [
              createTextVNode("History")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/attendance/reports",
        class: "nav-sublink"
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
      _push(`</div></div>`);
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
      _push(`<div class="nav-group"><button class="nav-trigger"><span>Exams</span><span class="${ssrRenderClass([{ open: examsOpen.value }, "chev"])}">\u25B8</span></button><div class="nav-sub" style="${ssrRenderStyle(examsOpen.value ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/exams",
        class: "nav-sublink"
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
        to: "/exams/reports",
        class: "nav-sublink"
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
      _push(`</div></div>`);
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
        to: "/announcements",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Announcements`);
          } else {
            return [
              createTextVNode("Announcements")
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
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile",
        class: "nav-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Account`);
          } else {
            return [
              createTextVNode("Account")
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
            _push2(`Parents`);
          } else {
            return [
              createTextVNode("Parents")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></aside><section class="content"><header class="topbar"><input class="search" placeholder="What do you want to find?"><div class="topbar-actions"><button class="icon-btn">\u{1F514}</button><button class="icon-btn">\u{1F4AC}</button><div class="avatar-chip"><div class="avatar">P</div><div><div style="${ssrRenderStyle({ "font-weight": "700" })}">Priscilla Lily</div><div class="help">Admin</div></div><span>\u25BE</span></div></div></header><main class="container container--wide">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</main></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-CEji7ywY.mjs.map
