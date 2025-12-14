import { defineComponent, reactive, watch, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { u as useStudents } from "./useStudents-DJgsXf9t.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GradeForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:model-value", "submit", "cancel"],
  setup(__props, { emit: __emit }) {
    const { students } = useStudents();
    const props = __props;
    const emit = __emit;
    const local = reactive({ ...props.modelValue });
    watch(() => props.modelValue, (v) => {
      Object.assign(local, v);
    });
    watch(local, (v) => {
      emit("update:model-value", { ...v });
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}><div class="form-grid"><div style="${ssrRenderStyle({ "grid-column": "1 / -1" })}"><div class="section-title">Grade Entry</div></div><div class="field"><label class="label">Student</label><select class="select"><!--[-->`);
      ssrRenderList(unref(students), (s) => {
        _push(`<option${ssrRenderAttr("value", s.id)}${ssrIncludeBooleanAttr(Array.isArray(local.studentId) ? ssrLooseContain(local.studentId, s.id) : ssrLooseEqual(local.studentId, s.id)) ? " selected" : ""}>${ssrInterpolate(s.name)}</option>`);
      });
      _push(`<!--]--></select></div><div class="field"><label class="label">Subject</label><input class="input"${ssrRenderAttr("value", local.subject)} placeholder="Subject name"></div><div class="field"><label class="label">Exam</label><input class="input"${ssrRenderAttr("value", local.exam)} placeholder="Exam name (e.g., Midterm)"></div><div class="field"><label class="label">Score</label><input class="input" type="number" min="0" max="100"${ssrRenderAttr("value", local.score)}></div><div class="field"><label class="label">Date</label><input class="date" type="date"${ssrRenderAttr("value", local.date)}></div></div><div class="toolbar"><button class="btn" type="submit">Save</button><button class="btn secondary" type="button">Cancel</button></div></form>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GradeForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=GradeForm-D2FFbGyP.js.map
