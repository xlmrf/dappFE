import { a as useI18n, r as __nuxt_component_0 } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const APP_MAIN_MENU = [
  {
    label: "menu.header.ranking",
    to: "/ranking"
  },
  {
    label: "menu.header.news",
    to: "/news"
  },
  {
    label: "menu.header.articles",
    to: "/analytics"
  },
  {
    label: "menu.header.defight"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppMainMenu",
  __ssrInlineRender: true,
  emits: ["navigate"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-gap-7.5" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(APP_MAIN_MENU), (item) => {
        _push(`<li class="tw-italic tw-uppercase tw-font-bold tw-leading-500">`);
        if (item.to) {
          _push(ssrRenderComponent(_component_nuxt_link_locale, {
            to: item.to,
            onClick: ($event) => emit("navigate")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(t)(item.label))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(t)(item.label)), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span>${ssrInterpolate(unref(t)(item.label))}</span>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/menu/AppMainMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AppMainMenu-xpd5N17_.mjs.map
