import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Popup-xwGmmZB2.mjs';
import { u as useTeachers, _ as _sfc_main$2 } from './useTeachers-BaxSvnJX.mjs';
import { n as navigateTo } from './server.mjs';
import './state-DBVJpStn.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(true);
    const { create } = useTeachers();
    let model = reactive({
      name: "",
      subject: "Mathematics",
      phone: "",
      email: "",
      hireDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      address: ""
    });
    function onUpdate(v) {
      Object.assign(model, v);
    }
    function handleCreate() {
      create({ ...model });
      navigateTo("/teachers");
    }
    function handleClose() {
      navigateTo("/teachers");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        open: open.value,
        title: "Add Teacher",
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              "model-value": unref(model),
              "onUpdate:modelValue": onUpdate,
              onSubmit: handleCreate,
              onCancel: handleClose
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                "model-value": unref(model),
                "onUpdate:modelValue": onUpdate,
                onSubmit: handleCreate,
                onCancel: handleClose
              }, null, 8, ["model-value"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teachers/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=create-fAuoA019.mjs.map
