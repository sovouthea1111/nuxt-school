import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { u as useStudents } from "./useStudents-DJgsXf9t.js";
import { _ as _sfc_main$1 } from "./Popup-xwGmmZB2.js";
import { _ as _sfc_main$2 } from "./StudentForm-yshwDBWz.js";
import "D:/Bussiness/school/node_modules/hookable/dist/index.mjs";
import "../server.mjs";
import "D:/Bussiness/school/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "D:/Bussiness/school/node_modules/unctx/dist/index.mjs";
import "D:/Bussiness/school/node_modules/h3/dist/index.mjs";
import "vue-router";
import "D:/Bussiness/school/node_modules/radix3/dist/index.mjs";
import "D:/Bussiness/school/node_modules/defu/dist/defu.mjs";
import "D:/Bussiness/school/node_modules/ufo/dist/index.mjs";
import "./state-DBVJpStn.js";
import "D:/Bussiness/school/node_modules/klona/dist/index.mjs";
import "./nuxt-link-CjQ1U1qT.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { students, create, update } = useStudents();
    const q = ref("");
    const grade = ref("");
    const gender = ref("");
    const filtered = computed(() => {
      const v = q.value.trim().toLowerCase();
      return students.value.filter((s) => {
        const matchesText = !v || s.name.toLowerCase().includes(v) || s.guardian.toLowerCase().includes(v);
        const matchesGrade = !grade.value || s.grade === grade.value;
        const matchesGender = !gender.value || s.gender === gender.value;
        return matchesText && matchesGrade && matchesGender;
      });
    });
    const showCreate = ref(false);
    const showEdit = ref(false);
    const editId = ref(null);
    let createModel = reactive({
      name: "",
      gender: "Female",
      grade: "Grade 1",
      age: 6,
      guardian: "",
      enrollmentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      address: ""
    });
    let editModel = reactive({
      name: "",
      gender: "Female",
      grade: "Grade 1",
      age: 6,
      guardian: "",
      enrollmentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      address: ""
    });
    function closeModal() {
      showCreate.value = false;
      showEdit.value = false;
    }
    function onUpdateCreate(v) {
      Object.assign(createModel, v);
    }
    function onUpdateEdit(v) {
      Object.assign(editModel, v);
    }
    function formatDate(d) {
      return new Date(d).toLocaleDateString();
    }
    function handleCreate() {
      create({ ...createModel });
      closeModal();
    }
    function handleUpdate() {
      if (!editId.value) return;
      update(editId.value, { ...editModel });
      closeModal();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input${ssrRenderAttr("value", q.value)} class="input" placeholder="Search name or guardian"><select class="select" style="${ssrRenderStyle({ "max-width": "180px" })}"><option value=""${ssrIncludeBooleanAttr(Array.isArray(grade.value) ? ssrLooseContain(grade.value, "") : ssrLooseEqual(grade.value, "")) ? " selected" : ""}>All Grades</option><option${ssrIncludeBooleanAttr(Array.isArray(grade.value) ? ssrLooseContain(grade.value, null) : ssrLooseEqual(grade.value, null)) ? " selected" : ""}>Grade 1</option><option${ssrIncludeBooleanAttr(Array.isArray(grade.value) ? ssrLooseContain(grade.value, null) : ssrLooseEqual(grade.value, null)) ? " selected" : ""}>Grade 2</option><option${ssrIncludeBooleanAttr(Array.isArray(grade.value) ? ssrLooseContain(grade.value, null) : ssrLooseEqual(grade.value, null)) ? " selected" : ""}>Grade 3</option><option${ssrIncludeBooleanAttr(Array.isArray(grade.value) ? ssrLooseContain(grade.value, null) : ssrLooseEqual(grade.value, null)) ? " selected" : ""}>Grade 4</option><option${ssrIncludeBooleanAttr(Array.isArray(grade.value) ? ssrLooseContain(grade.value, null) : ssrLooseEqual(grade.value, null)) ? " selected" : ""}>Grade 5</option><option${ssrIncludeBooleanAttr(Array.isArray(grade.value) ? ssrLooseContain(grade.value, null) : ssrLooseEqual(grade.value, null)) ? " selected" : ""}>Grade 6</option></select><select class="select" style="${ssrRenderStyle({ "max-width": "160px" })}"><option value=""${ssrIncludeBooleanAttr(Array.isArray(gender.value) ? ssrLooseContain(gender.value, "") : ssrLooseEqual(gender.value, "")) ? " selected" : ""}>All Genders</option><option${ssrIncludeBooleanAttr(Array.isArray(gender.value) ? ssrLooseContain(gender.value, null) : ssrLooseEqual(gender.value, null)) ? " selected" : ""}>Female</option><option${ssrIncludeBooleanAttr(Array.isArray(gender.value) ? ssrLooseContain(gender.value, null) : ssrLooseEqual(gender.value, null)) ? " selected" : ""}>Male</option></select><div class="spacer"></div><button class="btn">Add Student</button></div><table class="table"><thead><tr><th>Name</th><th>Gender</th><th>Grade</th><th>Age</th><th>Guardian</th><th>Enrolled</th><th class="actions">Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(filtered.value, (s) => {
        _push(`<tr><td>${ssrInterpolate(s.name)}</td><td><span class="badge">${ssrInterpolate(s.gender)}</span></td><td>${ssrInterpolate(s.grade)}</td><td>${ssrInterpolate(s.age)}</td><td>${ssrInterpolate(s.guardian)}</td><td>${ssrInterpolate(formatDate(s.enrollmentDate))}</td><td class="actions"><button class="btn secondary">Edit</button><button class="btn danger">Delete</button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (filtered.value.length === 0) {
        _push(`<tr><td colspan="7" class="muted">No students found</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showCreate.value,
        title: "Add Student",
        onClose: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              "model-value": unref(createModel),
              "onUpdate:modelValue": onUpdateCreate,
              onSubmit: handleCreate
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                "model-value": unref(createModel),
                "onUpdate:modelValue": onUpdateCreate,
                onSubmit: handleCreate
              }, null, 8, ["model-value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showEdit.value,
        title: "Edit Student",
        onClose: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              "model-value": unref(editModel),
              "onUpdate:modelValue": onUpdateEdit,
              onSubmit: handleUpdate
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                "model-value": unref(editModel),
                "onUpdate:modelValue": onUpdateEdit,
                onSubmit: handleUpdate
              }, null, 8, ["model-value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/students/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=index-BaHsOEeu.js.map
