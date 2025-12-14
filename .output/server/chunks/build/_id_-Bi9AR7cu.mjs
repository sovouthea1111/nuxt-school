import { _ as __nuxt_component_0 } from './nuxt-link-CjQ1U1qT.mjs';
import { defineComponent, computed, ref, reactive, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { _ as _sfc_main$1 } from './Popup-xwGmmZB2.mjs';
import { u as useSubjects, _ as _sfc_main$2 } from './useSubjects-B2vExr-f.mjs';
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
    var _a, _b, _c, _d;
    const route = useRoute();
    const id = route.params.id;
    const { getById, update } = useSubjects();
    const subject = computed(() => getById(id));
    const open = ref(true);
    let model = reactive({ name: ((_a = subject.value) == null ? void 0 : _a.name) || "", code: ((_b = subject.value) == null ? void 0 : _b.code) || "SUBJ", description: ((_c = subject.value) == null ? void 0 : _c.description) || "", teacher: ((_d = subject.value) == null ? void 0 : _d.teacher) || "" });
    function onUpdate(v) {
      Object.assign(model, v);
    }
    watch(subject, (s) => {
      if (!s) return;
      model.name = s.name;
      model.code = s.code;
      model.description = s.description;
      model.teacher = s.teacher;
    }, { immediate: true });
    function handleUpdate() {
      update(id, { ...model });
      navigateTo("/subjects");
    }
    function handleClose() {
      navigateTo("/subjects");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (subject.value) {
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          open: open.value,
          title: "Edit Subject",
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
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="muted">Subject not found</div><div class="toolbar">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/subjects",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/subjects/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-Bi9AR7cu.mjs.map
