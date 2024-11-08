import script from './sidebar.esm-DjOWB8MN.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, renderSlot, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeSidebar",
  __ssrInlineRender: true,
  props: {
    position: { default: "left" },
    headerClass: {},
    contentClass: {},
    modal: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    const transitionClasses = computed(() => {
      return props.position === "top" ? {
        enterFromClass: "tw-translate-x-0 tw--translate-y-full tw-translate-z-0",
        leaveToClass: "tw-translate-x-0 tw--translate-y-full tw-translate-z-0"
      } : props.position === "bottom" ? {
        enterFromClass: "tw-translate-x-0 tw-translate-y-full tw-translate-z-0",
        leaveToClass: "tw-translate-x-0 tw-translate-y-full tw-translate-z-0"
      } : props.position === "left" ? {
        enterFromClass: "tw--translate-x-full tw-translate-y-0 tw-translate-z-0",
        leaveToClass: "tw--translate-x-full tw-translate-y-0 tw-translate-z-0"
      } : props.position === "right" ? {
        enterFromClass: "tw-translate-x-full tw-translate-y-0 tw-translate-z-0",
        leaveToClass: "tw-translate-x-full tw-translate-y-0 tw-translate-z-0"
      } : {
        enterFromClass: "tw-opacity-0",
        enterActiveClass: "tw-transition-opacity tw-duration-400 tw-ease-in",
        leaveActiveClass: "tw-transition-opacity tw-duration-400 tw-ease-in",
        leaveToClass: "tw-opacity-0"
      };
    });
    const sidebar = ref(null);
    function close() {
      if (!sidebar.value)
        return;
      sidebar.value.hide();
    }
    __expose({
      close
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_sidebar = script;
      _push(ssrRenderComponent(_component_prime_sidebar, mergeProps({
        ref_key: "sidebar",
        ref: sidebar,
        position: _ctx.position,
        "block-scroll": true,
        modal: _ctx.modal,
        pt: {
          root: {
            class: ["de-sidebar", `de-sidebar-${props.position}`]
          },
          header: { class: ["de-sidebar-header", props.headerClass] },
          content: { class: ["de-sidebar-content", props.contentClass] },
          closeButton: { class: "de-sidebar-close" },
          mask: { class: ["de-sidebar-mask", { "is-visible": props.modal }] },
          transition: {
            ...transitionClasses.value
          }
        }
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "header")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            if (_ctx.$slots.footer) {
              _push2(`<div class="de-sidebar-footer"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              _ctx.$slots.footer ? (openBlock(), createBlock("div", {
                key: 0,
                class: "de-sidebar-footer"
              }, [
                renderSlot(_ctx.$slots, "footer")
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/sidebar/DeSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DeSidebar-CwFoj49S.mjs.map
