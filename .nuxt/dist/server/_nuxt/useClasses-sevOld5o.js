import { defineComponent, reactive, computed, watch, useSSRContext, ref } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import { u as useState } from "./state-DBVJpStn.js";
import "D:/Bussiness/school/node_modules/klona/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "#internal/nuxt/paths";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ClassForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:model-value", "submit", "cancel"],
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
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="form-grid"><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Class</div></div><div class="field"><label class="label">Name</label><input class="${ssrRenderClass([{ invalid: !valid.name }, "input"])}"${ssrRenderAttr("value", local.name)} placeholder="Class name (e.g., Grade 3 - Red)">`);
      if (!valid.name) {
        _push(`<div class="error">Name is required</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="field"><label class="label">Grade</label><select class="select"><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 1</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 2</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 3</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 4</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 5</option><option${ssrIncludeBooleanAttr(Array.isArray(local.grade) ? ssrLooseContain(local.grade, null) : ssrLooseEqual(local.grade, null)) ? " selected" : ""}>Grade 6</option></select></div><div class="field"><label class="label">Section</label><input class="input"${ssrRenderAttr("value", local.section)} placeholder="e.g., Red"></div><div class="field"><label class="label">Teacher</label><input class="input"${ssrRenderAttr("value", local.teacher)} placeholder="Primary teacher"></div><div class="field"><label class="label">Room</label><input class="input"${ssrRenderAttr("value", local.room)} placeholder="e.g., A1"></div></div><div class="toolbar"><button class="btn" type="submit">Save</button><button class="btn secondary" type="button">Cancel</button></div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ClassForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function useClasses() {
  const classes = useState("classes", () => []);
  ref(false);
  function list() {
    return classes.value;
  }
  function getById(id) {
    return classes.value.find((c) => c.id === id);
  }
  function create(payload) {
    classes.value.push({ id: genId(), ...payload });
  }
  function update(id, payload) {
    const idx = classes.value.findIndex((c) => c.id === id);
    if (idx !== -1) {
      classes.value[idx] = { id, ...payload };
    }
  }
  function remove(id) {
    const idx = classes.value.findIndex((c) => c.id === id);
    if (idx !== -1) {
      classes.value.splice(idx, 1);
    }
  }
  return { classes, list, getById, create, update, remove };
}
export {
  _sfc_main as _,
  useClasses as u
};
//# sourceMappingURL=useClasses-sevOld5o.js.map
