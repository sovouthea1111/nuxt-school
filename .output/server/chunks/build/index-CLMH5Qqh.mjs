import { defineComponent, ref, computed, reactive, mergeProps, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Popup-xwGmmZB2.mjs';
import { u as useClasses, _ as _sfc_main$2 } from './useClasses-sevOld5o.mjs';
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
    const { classes, create, update } = useClasses();
    const q = ref("");
    const filtered = computed(() => {
      const v = q.value.trim().toLowerCase();
      return classes.value.filter((c) => {
        const text = `${c.name} ${c.grade} ${c.section} ${c.teacher} ${c.room}`.toLowerCase();
        return !v || text.includes(v);
      });
    });
    const showCreate = ref(false);
    const showEdit = ref(false);
    const editId = ref(null);
    let createModel = reactive({ name: "", grade: "Grade 1", section: "Red", teacher: "", room: "" });
    let editModel = reactive({ name: "", grade: "Grade 1", section: "Red", teacher: "", room: "" });
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))}><div class="toolbar"><input${ssrRenderAttr("value", q.value)} class="input" placeholder="Search name, grade, teacher or room"><div class="spacer"></div><button class="btn">Add Class</button></div><table class="table"><thead><tr><th>Name</th><th>Grade</th><th>Section</th><th>Teacher</th><th>Room</th><th class="actions">Actions</th></tr></thead><tbody><!--[-->`);
      ssrRenderList(filtered.value, (c) => {
        _push(`<tr><td>${ssrInterpolate(c.name)}</td><td><span class="badge">${ssrInterpolate(c.grade)}</span></td><td>${ssrInterpolate(c.section)}</td><td>${ssrInterpolate(c.teacher)}</td><td>${ssrInterpolate(c.room)}</td><td class="actions"><button class="btn secondary">Edit</button><button class="btn danger">Delete</button></td></tr>`);
      });
      _push(`<!--]-->`);
      if (filtered.value.length === 0) {
        _push(`<tr><td colspan="6" class="muted">No classes found</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        open: showCreate.value,
        title: "Add Class",
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
        title: "Edit Class",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/classes/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CLMH5Qqh.mjs.map
