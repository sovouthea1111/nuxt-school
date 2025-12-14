import { _ as _sfc_main$2 } from './StudentForm-yshwDBWz.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CjQ1U1qT.mjs';
import { defineComponent, computed, ref, reactive, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useStudents } from './useStudents-DJgsXf9t.mjs';
import { n as navigateTo } from './server.mjs';
import { _ as _sfc_main$1 } from './Popup-xwGmmZB2.mjs';
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
    var _a, _b, _c, _d, _e, _f, _g;
    const route = useRoute();
    const id = route.params.id;
    const { getById, update } = useStudents();
    const student = computed(() => getById(id));
    const open = ref(true);
    let model = reactive({
      name: ((_a = student.value) == null ? void 0 : _a.name) || "",
      gender: ((_b = student.value) == null ? void 0 : _b.gender) || "Female",
      grade: ((_c = student.value) == null ? void 0 : _c.grade) || "Grade 1",
      age: ((_d = student.value) == null ? void 0 : _d.age) || 6,
      guardian: ((_e = student.value) == null ? void 0 : _e.guardian) || "",
      enrollmentDate: (((_f = student.value) == null ? void 0 : _f.enrollmentDate) || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).slice(0, 10),
      address: ((_g = student.value) == null ? void 0 : _g.address) || ""
    });
    function onUpdate(v) {
      Object.assign(model, v);
    }
    watch(student, (s) => {
      if (!s) return;
      model.name = s.name;
      model.gender = s.gender;
      model.grade = s.grade;
      model.age = s.age;
      model.guardian = s.guardian;
      model.enrollmentDate = s.enrollmentDate.slice(0, 10);
      model.address = s.address;
    }, { immediate: true });
    async function handleUpdate() {
      update(id, { ...model });
      await navigateTo("/students");
    }
    function handleClose() {
      navigateTo("/students");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_StudentForm = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      if (student.value) {
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          open: open.value,
          title: "Edit Student",
          onClose: handleClose
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_StudentForm, {
                "model-value": unref(model),
                "onUpdate:modelValue": onUpdate,
                onSubmit: handleUpdate
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_StudentForm, {
                  "model-value": unref(model),
                  "onUpdate:modelValue": onUpdate,
                  onSubmit: handleUpdate
                }, null, 8, ["model-value"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="muted">Student not found</div><div class="toolbar">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/students",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/students/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-D1ARNo1f.mjs.map
