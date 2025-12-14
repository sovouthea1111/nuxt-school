import { _ as _sfc_main$1 } from './client-only-BxeEpOum.mjs';
import { defineComponent, reactive, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { n as navigateTo } from './server.mjs';
import { u as useStudents } from './useStudents-Cdvy9quF.mjs';
import './nuxt-link-DLn61_TA.mjs';
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
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const { create } = useStudents();
    let model = reactive({
      name: "",
      gender: "Female",
      grade: "Grade 1",
      age: 6,
      guardian: "",
      enrollmentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      address: ""
    });
    function handleCreate() {
      create({ ...model });
      navigateTo("/students");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudentForm = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><h2 class="title">Add Student</h2>`);
      _push(ssrRenderComponent(_component_StudentForm, {
        "model-value": unref(model),
        "onUpdate:modelValue": (v) => isRef(model) ? model.value = v : model = v,
        onSubmit: handleCreate
      }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/students/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-anqtthsH.mjs.map
