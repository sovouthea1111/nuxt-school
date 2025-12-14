import { defineComponent, ref, reactive, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Popup-xwGmmZB2.js";
import { _ as _sfc_main$2 } from "./GradeForm-D2FFbGyP.js";
import { u as useGrades } from "./useGrades-DddZahas.js";
import { u as useStudents } from "./useStudents-DJgsXf9t.js";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import { n as navigateTo } from "../server.mjs";
import "./state-DBVJpStn.js";
import "D:/Bussiness/school/node_modules/klona/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "D:/Bussiness/school/node_modules/ofetch/dist/node.mjs";
import "D:/Bussiness/school/node_modules/unctx/dist/index.mjs";
import "D:/Bussiness/school/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/Bussiness/school/node_modules/radix3/dist/index.mjs";
import "D:/Bussiness/school/node_modules/ufo/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "entry",
  __ssrInlineRender: true,
  setup(__props) {
    const open = ref(true);
    const { create } = useGrades();
    const { students } = useStudents();
    let model = reactive({ studentId: students.value[0]?.id || "", subject: "Mathematics", exam: "Midterm", score: 80, date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) });
    function onUpdate(v) {
      Object.assign(model, v);
    }
    function handleCreate() {
      create({ ...model });
      navigateTo("/grades");
    }
    function handleClose() {
      navigateTo("/grades");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        open: open.value,
        title: "Add Grade",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/grades/entry.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=entry-Dz28O1jC.js.map
