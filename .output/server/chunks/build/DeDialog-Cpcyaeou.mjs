import script from './dialog.esm-ClGlMgQg.mjs';
import { defineComponent, useAttrs, computed, ref, mergeProps, unref, createSlots, renderList, withCtx, renderSlot, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeDialog",
  __ssrInlineRender: true,
  props: {
    contentClass: {},
    headerClass: {},
    footerClass: {},
    iconsClass: {},
    header: {},
    dismissableMask: { type: Boolean, default: true },
    closeOnEscape: { type: Boolean, default: true },
    closable: { type: Boolean, default: true }
  },
  setup(__props, { expose: __expose }) {
    const attrs = useAttrs();
    const props = __props;
    const dialogClasses = computed(() => {
      return {
        root: ["de-dialog", attrs.class],
        content: ["de-dialog-content", props.contentClass],
        title: "de-dialog-title",
        icons: ["de-dialog-icons", props.iconsClass],
        closeButton: "de-dialog-close-button",
        mask: "de-dialog-mask",
        transition: {
          enterFromClass: "de-dialog-enter-from",
          enterActiveClass: "de-dialog-enter-active",
          leaveActiveClass: "de-dialog-leave-active",
          leaveToClass: "de-dialog-leave-to"
        }
      };
    });
    const dialogRef = ref(null);
    const close = () => {
      if (!dialogRef.value)
        return;
      dialogRef.value.close();
    };
    __expose({
      close
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_dialog = script;
      _push(ssrRenderComponent(_component_prime_dialog, mergeProps({
        ref_key: "dialogRef",
        ref: dialogRef
      }, _ctx.$attrs, {
        modal: true,
        "dismissable-mask": _ctx.dismissableMask,
        "close-on-escape": _ctx.closeOnEscape,
        closable: _ctx.closable,
        pt: unref(dialogClasses)
      }, _attrs), createSlots({ _: 2 }, [
        renderList(_ctx.$slots, (_, slot) => {
          return {
            name: slot,
            fn: withCtx((scope, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, slot, scope || {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, slot, scope || {})
                ];
              }
            })
          };
        }),
        _ctx.$slots.header || _ctx.header ? {
          name: "header",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([_ctx.headerClass, "de-dialog-header"])}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header", {
                props: { class: unref(dialogClasses).title }
              }, () => {
                _push2(`<div class="${ssrRenderClass(unref(dialogClasses).title)}"${_scopeId}>${ssrInterpolate(_ctx.header)}</div>`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["de-dialog-header", _ctx.headerClass]
                }, [
                  renderSlot(_ctx.$slots, "header", {
                    props: { class: unref(dialogClasses).title }
                  }, () => [
                    createVNode("div", {
                      class: unref(dialogClasses).title
                    }, toDisplayString(_ctx.header), 3)
                  ])
                ], 2)
              ];
            }
          }),
          key: "0"
        } : void 0,
        _ctx.$slots.footer ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass(_ctx.footerClass)}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: _ctx.footerClass }, [
                  renderSlot(_ctx.$slots, "footer")
                ], 2)
              ];
            }
          }),
          key: "1"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/dialog/DeDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DeDialog-Cpcyaeou.mjs.map
