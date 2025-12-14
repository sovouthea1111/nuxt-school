import { _ as _sfc_main$2 } from "./StudentForm-yshwDBWz.js";
import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import { n as navigateTo } from "../server.mjs";
import "./state-DBVJpStn.js";
import "D:/Bussiness/school/node_modules/klona/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import { u as useStudents } from "./useStudents-DJgsXf9t.js";
import { _ as _sfc_main$1 } from "./Popup-xwGmmZB2.js";
import "./nuxt-link-CjQ1U1qT.js";
import "D:/Bussiness/school/node_modules/ufo/dist/index.mjs";
import "D:/Bussiness/school/node_modules/ofetch/dist/node.mjs";
import "D:/Bussiness/school/node_modules/unctx/dist/index.mjs";
import "D:/Bussiness/school/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/Bussiness/school/node_modules/radix3/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const { create } = useStudents();
    const open = ref(true);
    let model = reactive({
      name: "",
      gender: "Female",
      grade: "Grade 1",
      age: 6,
      guardian: "",
      enrollmentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      address: ""
    });
    function onUpdate(v) {
      Object.assign(model, v);
    }
    function handleCreate() {
      create({ ...model });
      navigateTo("/students");
    }
    function handleClose() {
      navigateTo("/students");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudentForm = _sfc_main$2;
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        open: open.value,
        title: "Add Student",
        onClose: handleClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_StudentForm, {
              "model-value": unref(model),
              "onUpdate:modelValue": onUpdate,
              onSubmit: handleCreate
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_StudentForm, {
                "model-value": unref(model),
                "onUpdate:modelValue": onUpdate,
                onSubmit: handleCreate
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/students/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=create-D4JYCZ5p.js.map
