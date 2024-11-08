import { a as useI18n, am as useSwitchLocalePath, an as typedLocales, ao as __nuxt_component_0$1 } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { defineComponent, mergeProps, unref, isRef, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$a } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LanguageSwitcher",
  __ssrInlineRender: true,
  props: {
    panelClass: { default: "tw-w-full" }
  },
  setup(__props) {
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link = __nuxt_component_0$1;
      _push(ssrRenderComponent(_sfc_main$a, mergeProps({
        modelValue: unref(locale),
        "onUpdate:modelValue": ($event) => isRef(locale) ? locale.value = $event : null,
        options: unref(typedLocales),
        "option-label": "name",
        "option-value": "code",
        placeholder: _ctx.$t("form.chooseLanguage"),
        "panel-class": _ctx.panelClass,
        "append-to": "self",
        "popup-alignment": "center",
        "list-item-class": "tw-p-0",
        type: "chips",
        "dropdown-icon-class": "tw-w-300 tw-h-300"
      }, _attrs), {
        option: withCtx(({ option }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_link, {
              to: unref(switchLocalePath)(option.code),
              class: "tw-inline-block tw-w-full tw-px-2 tw-py-1"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(option.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(option.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_nuxt_link, {
                to: unref(switchLocalePath)(option.code),
                class: "tw-inline-block tw-w-full tw-px-2 tw-py-1"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(option.name), 1)
                ]),
                _: 2
              }, 1032, ["to"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/LanguageSwitcher.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=LanguageSwitcher-BexZ-A2o.mjs.map
