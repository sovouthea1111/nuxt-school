import { _ as __nuxt_component_0 } from "./nuxt-link-CjQ1U1qT.js";
import { defineComponent, computed, ref, reactive, watch, mergeProps, withCtx, unref, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttrs } from "vue/server-renderer";
import { useRoute } from "vue-router";
import { _ as _sfc_main$1 } from "./Popup-xwGmmZB2.js";
import { u as useClasses, _ as _sfc_main$2 } from "./useClasses-sevOld5o.js";
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
    const { getById, update } = useClasses();
    const klass = computed(() => getById(id));
    const open = ref(true);
    let model = reactive({
      name: klass.value?.name || "",
      grade: klass.value?.grade || "Grade 1",
      section: klass.value?.section || "Red",
      teacher: klass.value?.teacher || "",
      room: klass.value?.room || ""
    });
    function onUpdate(v) {
      Object.assign(model, v);
    }
    watch(klass, (c) => {
      if (!c) return;
      model.name = c.name;
      model.grade = c.grade;
      model.section = c.section;
      model.teacher = c.teacher;
      model.room = c.room;
    }, { immediate: true });
    function handleUpdate() {
      update(id, { ...model });
      navigateTo("/classes");
    }
    function handleClose() {
      navigateTo("/classes");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (klass.value) {
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          open: open.value,
          title: "Edit Class",
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
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="muted">Class not found</div><div class="toolbar">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/classes",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/classes/edit/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-BEeaIA5I.js.map
