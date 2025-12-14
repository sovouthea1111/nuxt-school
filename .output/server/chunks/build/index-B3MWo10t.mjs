import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Popup-xwGmmZB2.mjs';
import { _ as _sfc_main$2 } from './GradeForm-D2FFbGyP.mjs';
import { u as useGrades } from './useGrades-DddZahas.mjs';
import { u as useStudents } from './useStudents-DJgsXf9t.mjs';
import './state-DBVJpStn.mjs';
import './server.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b;
    const { grades, create, update } = useGrades();
    const { students } = useStudents();
    function studentName(id) {
      var _a2;
      return ((_a2 = students.value.find((s) => s.id === id)) == null ? void 0 : _a2.name) || "Unknown";
    }
    const q = ref("");
    const filtered = computed(() => {
      const v = q.value.trim().toLowerCase();
      return grades.value.filter((g) => {
        const text = `${studentName(g.studentId)} ${g.subject} ${g.exam} ${g.score}`.toLowerCase();
        return !v || text.includes(v);
      }).sort((a, b) => b.date.localeCompare(a.date));
    });
    const showCreate = ref(false);
    const showEdit = ref(false);
    const editId = ref(null);
    let createModel = reactive({ studentId: ((_a = students.value[0]) == null ? void 0 : _a.id) || "", subject: "Mathematics", exam: "Midterm", score: 80, date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) });
    let editModel = reactive({ studentId: ((_b = students.value[0]) == null ? void 0 : _b.id) || "", subject: "Mathematics", exam: "Midterm", score: 80, date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) });
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
    function handleCreate() {
      create({ ...createModel });
      closeModal();
    }
    function handleUpdate() {
      if (!editId.value) return;
      update(editId.value, { ...editModel });
      closeModal();
    }
    function formatDate(d) {
      return new Date(d).toLocaleDateString();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input${ssrRenderAttr("value", q.value)} class="input" placeholder="Search student, subject or exam"><div class="spacer"></div><button class="btn">Add Grade</button></div><table class="table"><thead><tr><th>Student</th><th>Subject</th><th>Exam</th><th>Score</th><th>Date</th><th class="actions">Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(filtered.value, (g) => {
        _push(`<tr><td>${ssrInterpolate(studentName(g.studentId))}</td><td>${ssrInterpolate(g.subject)}</td><td>${ssrInterpolate(g.exam)}</td><td><span class="badge">${ssrInterpolate(g.score)}</span></td><td>${ssrInterpolate(formatDate(g.date))}</td><td class="actions"><button class="btn secondary">Edit</button><button class="btn danger">Delete</button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (filtered.value.length === 0) {
        _push(`<tr><td colspan="6" class="muted">No grades found</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showCreate.value,
        title: "Add Grade",
        onClose: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              "model-value": unref(createModel),
              "onUpdate:modelValue": onUpdateCreate,
              onSubmit: handleCreate,
              onCancel: closeModal
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                "model-value": unref(createModel),
                "onUpdate:modelValue": onUpdateCreate,
                onSubmit: handleCreate,
                onCancel: closeModal
              }, null, 8, ["model-value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showEdit.value,
        title: "Edit Grade",
        onClose: closeModal
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              "model-value": unref(editModel),
              "onUpdate:modelValue": onUpdateEdit,
              onSubmit: handleUpdate,
              onCancel: closeModal
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                "model-value": unref(editModel),
                "onUpdate:modelValue": onUpdateEdit,
                onSubmit: handleUpdate,
                onCancel: closeModal
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/grades/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B3MWo10t.mjs.map
