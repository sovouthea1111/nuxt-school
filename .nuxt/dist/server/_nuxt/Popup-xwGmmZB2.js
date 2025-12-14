import { defineComponent, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Popup",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    title: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.open) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "popup-overlay" }, _attrs))}><div class="popup"><div class="popup-header">`);
        ssrRenderSlot(_ctx.$slots, "header", {}, () => {
          _push(`<div class="modal-title">${ssrInterpolate(__props.title)}</div>`);
        }, _push, _parent);
        _push(`<button class="icon-btn" aria-label="Close" title="Close">×</button></div><div class="popup-body">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div><div class="popup-footer">`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Popup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=Popup-xwGmmZB2.js.map
