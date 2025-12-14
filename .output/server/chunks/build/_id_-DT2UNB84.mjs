import { _ as __nuxt_component_0 } from './nuxt-link-CjQ1U1qT.mjs';
import { defineComponent, computed, ref, reactive, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _sfc_main$1 } from './Popup-xwGmmZB2.mjs';
import { u as useTeachers, _ as _sfc_main$2 } from './useTeachers-BaxSvnJX.mjs';
import { n as navigateTo } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './state-DBVJpStn.mjs';
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
    var _a, _b, _c, _d, _e, _f;
    const route = useRoute();
    const id = route.params.id;
    const { getById, update } = useTeachers();
    const teacher = computed(() => getById(id));
    const open = ref(true);
    let model = reactive({
      name: ((_a = teacher.value) == null ? void 0 : _a.name) || "",
      subject: ((_b = teacher.value) == null ? void 0 : _b.subject) || "Mathematics",
      phone: ((_c = teacher.value) == null ? void 0 : _c.phone) || "",
      email: ((_d = teacher.value) == null ? void 0 : _d.email) || "",
      hireDate: (((_e = teacher.value) == null ? void 0 : _e.hireDate) || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).slice(0, 10),
      address: ((_f = teacher.value) == null ? void 0 : _f.address) || ""
    });
    function onUpdate(v) {
      Object.assign(model, v);
    }
    watch(teacher, (t) => {
      if (!t) return;
      model.name = t.name;
      model.subject = t.subject;
      model.phone = t.phone;
      model.email = t.email;
      model.hireDate = t.hireDate.slice(0, 10);
      model.address = t.address;
    }, { immediate: true });
    function handleUpdate() {
      update(id, { ...model });
      navigateTo("/teachers");
    }
    function handleClose() {
      navigateTo("/teachers");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (teacher.value) {
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          open: open.value,
          title: "Edit Teacher",
          onClose: handleClose
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                "model-value": unref(model),
                "onUpdate:modelValue": onUpdate,
                onSubmit: handleUpdate,
                onCancel: handleClose
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$2, {
                  "model-value": unref(model),
                  "onUpdate:modelValue": onUpdate,
                  onSubmit: handleUpdate,
                  onCancel: handleClose
                }, null, 8, ["model-value"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="muted">Teacher not found</div><div class="toolbar">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/teachers",
          class: "btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Back`);
            } else {
              return [
                createTextVNode("Back")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teachers/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DT2UNB84.mjs.map
