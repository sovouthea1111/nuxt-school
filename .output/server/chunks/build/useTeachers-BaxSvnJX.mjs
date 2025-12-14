import { defineComponent, ref, reactive, computed, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { u as useState } from './state-DBVJpStn.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TeacherForm",
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
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="form-grid"><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Profile</div></div><div class="field"><label class="label">Name</label><input class="${ssrRenderClass([{ invalid: !valid.name }, "input"])}"${ssrRenderAttr("value", local.name)} placeholder="Teacher full name">`);
      if (!valid.name) {
        _push(`<div class="error">Name is required</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="field"><label class="label">Subject</label><input class="input"${ssrRenderAttr("value", local.subject)} placeholder="Subject taught"></div><div class="field"><label class="label">Phone</label><input class="input"${ssrRenderAttr("value", local.phone)} placeholder="Primary phone"></div><div class="field"><label class="label">Email</label><input class="input" type="email"${ssrRenderAttr("value", local.email)} placeholder="Primary email"></div><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Employment</div></div><div class="field"><label class="label">Hire Date</label><input class="date" type="date"${ssrRenderAttr("value", local.hireDate)}></div><div class="field" style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><label class="label">Address</label><input class="input"${ssrRenderAttr("value", local.address)} placeholder="City or district"></div></div><div class="toolbar"><button class="btn" type="submit">Save</button><button class="btn secondary" type="button">Cancel</button></div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TeacherForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function useTeachers() {
  const teachers = useState("teachers", () => []);
  ref(false);
  function list() {
    return teachers.value;
  }
  function getById(id) {
    return teachers.value.find((t) => t.id === id);
  }
  function create(payload) {
    teachers.value.push({ id: genId(), ...payload, hireDate: new Date(payload.hireDate).toISOString() });
  }
  function update(id, payload) {
    const idx = teachers.value.findIndex((t) => t.id === id);
    if (idx !== -1) {
      teachers.value[idx] = { id, ...payload, hireDate: new Date(payload.hireDate).toISOString() };
    }
  }
  function remove(id) {
    const idx = teachers.value.findIndex((t) => t.id === id);
    if (idx !== -1) {
      teachers.value.splice(idx, 1);
    }
  }
  return { teachers, list, getById, create, update, remove };
}

export { _sfc_main as _, useTeachers as u };
//# sourceMappingURL=useTeachers-BaxSvnJX.mjs.map
