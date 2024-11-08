import { r as __nuxt_component_0 } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';

const APP_LOGO_SIZE_OPTIONS = {
  small: "sm",
  large: "lg"
};
const APP_LOGO_VARIANT_OPTIONS = {
  default: "default",
  withText: "with-text"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppLogo",
  __ssrInlineRender: true,
  props: {
    variant: { default: APP_LOGO_VARIANT_OPTIONS.default },
    size: { default: APP_LOGO_SIZE_OPTIONS.small },
    lazyLoaded: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const imagePath = computed(() => `logos/logo-${props.variant}`);
    const logoClasses = computed(() => {
      switch (props.size) {
        case APP_LOGO_SIZE_OPTIONS.small:
          return "tw-w-750 lg:tw-w-950 tw-h-auto";
        case APP_LOGO_SIZE_OPTIONS.large:
          return "tw-w-4500 lg:tw-w-5750 tw-h-auto";
        default:
          throw new Error("Unknown app logo size value " + props.size);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(ssrRenderComponent(_component_nuxt_link_locale, mergeProps({ to: "/" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", `/images/${imagePath.value}.gif`)} alt="dapp expert logo" class="${ssrRenderClass(logoClasses.value)}"${ssrRenderAttr("loading", _ctx.lazyLoaded ? "lazy" : "eager")}${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: `/images/${imagePath.value}.gif`,
                alt: "dapp expert logo",
                class: logoClasses.value,
                loading: _ctx.lazyLoaded ? "lazy" : "eager"
              }, null, 10, ["src", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/logo/AppLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { APP_LOGO_VARIANT_OPTIONS as A, _sfc_main as _, APP_LOGO_SIZE_OPTIONS as a };
//# sourceMappingURL=AppLogo-nf5qLJNl.mjs.map
