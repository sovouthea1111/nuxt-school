import { defineComponent, ref, reactive, computed, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { u as useState } from './state-DBVJpStn.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SubjectForm",
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
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="form-grid"><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Subject</div></div><div class="field"><label class="label">Name</label><input class="${ssrRenderClass([{ invalid: !valid.name }, "input"])}"${ssrRenderAttr("value", local.name)} placeholder="Subject name">`);
      if (!valid.name) {
        _push(`<div class="error">Name is required</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="field"><label class="label">Code</label><input class="input"${ssrRenderAttr("value", local.code)} placeholder="e.g., MATH"></div><div class="field"><label class="label">Teacher</label><input class="input"${ssrRenderAttr("value", local.teacher)} placeholder="Assigned teacher"></div><div class="field" style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><label class="label">Description</label><input class="input"${ssrRenderAttr("value", local.description)} placeholder="Short description"></div></div><div class="toolbar"><button class="btn" type="submit">Save</button><button class="btn secondary" type="button">Cancel</button></div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SubjectForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function useSubjects() {
  const subjects = useState("subjects", () => []);
  ref(false);
  function list() {
    return subjects.value;
  }
  function getById(id) {
    return subjects.value.find((s) => s.id === id);
  }
  function create(payload) {
    subjects.value.push({ id: genId(), ...payload });
  }
  function update(id, payload) {
    const idx = subjects.value.findIndex((s) => s.id === id);
    if (idx !== -1) {
      subjects.value[idx] = { id, ...payload };
    }
  }
  function remove(id) {
    const idx = subjects.value.findIndex((s) => s.id === id);
    if (idx !== -1) {
      subjects.value.splice(idx, 1);
    }
  }
  return { subjects, list, getById, create, update, remove };
}

export { _sfc_main as _, useSubjects as u };
//# sourceMappingURL=useSubjects-B2vExr-f.mjs.map
