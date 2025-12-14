import { _ as __nuxt_component_0 } from "./nuxt-link-CjQ1U1qT.js";
import { defineComponent, computed, ref, reactive, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { _ as _sfc_main$1 } from "./Popup-xwGmmZB2.js";
import { u as useTeachers, _ as _sfc_main$2 } from "./useTeachers-BaxSvnJX.js";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import { n as navigateTo } from "../server.mjs";
import "./state-DBVJpStn.js";
import "D:/Bussiness/school/node_modules/klona/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
import "D:/Bussiness/school/node_modules/ufo/dist/index.mjs";
import "D:/Bussiness/school/node_modules/ofetch/dist/node.mjs";
import "D:/Bussiness/school/node_modules/unctx/dist/index.mjs";
import "D:/Bussiness/school/node_modules/h3/dist/index.mjs";
import "D:/Bussiness/school/node_modules/radix3/dist/index.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const id = route.params.id;
    const { getById, update } = useTeachers();
    const teacher = computed(() => getById(id));
    const open = ref(true);
    let model = reactive({
      name: teacher.value?.name || "",
      subject: teacher.value?.subject || "Mathematics",
      phone: teacher.value?.phone || "",
      email: teacher.value?.email || "",
      hireDate: (teacher.value?.hireDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)).slice(0, 10),
      address: teacher.value?.address || ""
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teachers/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-BC6KsiFu.js.map
