import { _ as __nuxt_component_0 } from "./nuxt-link-CjQ1U1qT.js";
import { defineComponent, reactive, computed, watch, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StudentForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:model-value", "submit"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const local = reactive({ ...props.modelValue });
    const valid = reactive({
      name: computed(() => local.name.trim().length > 0)
    });
    watch(() => props.modelValue, (v) => {
      Object.assign(local, v);
    });
    watch(local, (v) => {
      emit("update:model-value", { ...v });
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="form-grid"><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Personal</div></div><div class="field"><label class="label">Name</label><input class="${ssrRenderClass([{ invalid: !valid.name }, "input"])}"${ssrRenderAttr("value", local.name)} placeholder="Student full name">`);
      if (!valid.name) {
        _push(`<div class="error">Name is required</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="field"><label class="label">Gender</label><select class="select"><option${ssrIncludeBooleanAttr(Array.isArray(local.gender) ? ssrLooseContain(local.gender, null) : ssrLooseEqual(local.gender, null)) ? " selected" : ""}>Female</option><option${ssrIncludeBooleanAttr(Array.isArray(local.gender) ? ssrLooseContain(local.gender, null) : ssrLooseEqual(local.gender, null)) ? " selected" : ""}>Male</option></select></div><div class="field"><label class="label">Age</label><input class="input" type="number" min="5" max="12"${ssrRenderAttr("value", local.age)} placeholder="5–12"><div class="help">Typical ages for primary school</div></div><div class="field"><label class="label">Grade</label><select class="select"><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 1</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 2</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 3</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 4</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 5</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 6</option></select></div><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Enrollment</div></div><div class="field"><label class="label">Enrollment Date</label><input class="date" type="date"${ssrRenderAttr("value", local.enrollmentDate)}></div><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Contact</div></div><div class="field"><label class="label">Guardian</label><input class="input"${ssrRenderAttr("value", local.guardian)} placeholder="Parent or guardian name"></div><div class="field" style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><label class="label">Address</label><input class="input"${ssrRenderAttr("value", local.address)} placeholder="City, district or village"></div></div><div class="toolbar"><button class="btn" type="submit">Save</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/students",
        class: "btn secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cancel`);
          } else {
            return [
              createTextVNode("Cancel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StudentForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=StudentForm-yshwDBWz.js.map
