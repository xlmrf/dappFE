import { useSSRContext, defineComponent, computed, withCtx, createVNode, toDisplayString, mergeModels, useModel, mergeProps, unref, renderSlot, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { a as useI18n, au as locales, _ as _sfc_main$m, a1 as _sfc_main$l, at as ButtonIconPositionOptions } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$a } from './server.mjs';

const COLLAPSIBLE_LISTBOX_CATEGORY_OPTIONS = {
  primary: "primary",
  secondary: "secondary"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeCollapsibleListbox",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    options: {},
    optionLabel: {},
    optionValue: {},
    appendTo: {},
    popupAlignment: { default: "left" },
    placeholder: {},
    category: { default: COLLAPSIBLE_LISTBOX_CATEGORY_OPTIONS.primary },
    iconName: { default: "chevron-down-filled" },
    panelClass: {}
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const model = useModel(__props, "modelValue");
    const emit = __emit;
    function onChange(event) {
      emit("change", event);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$a, mergeProps({
        modelValue: model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        options: _ctx.options,
        class: ["de-collapsible-listbox", `de-collapsible-listbox-${_ctx.category}`],
        placeholder: _ctx.placeholder,
        "option-label": _ctx.optionLabel,
        "option-value": _ctx.optionValue,
        "panel-class": _ctx.panelClass,
        "append-to": _ctx.appendTo,
        "popup-alignment": _ctx.popupAlignment,
        onChange
      }, _attrs), {
        value: withCtx((slotProps, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "trigger", { slotProps }, () => {
              _push2(ssrRenderComponent(_sfc_main$l, {
                label: slotProps.value ? slotProps.value : slotProps.placeholder,
                icon: _ctx.iconName,
                "icon-pos": unref(ButtonIconPositionOptions).right,
                class: "tw-w-full tw-justify-between"
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "trigger", { slotProps }, () => [
                createVNode(_sfc_main$l, {
                  label: slotProps.value ? slotProps.value : slotProps.placeholder,
                  icon: _ctx.iconName,
                  "icon-pos": unref(ButtonIconPositionOptions).right,
                  class: "tw-w-full tw-justify-between"
                }, null, 8, ["label", "icon", "icon-pos"])
              ])
            ];
          }
        }),
        option: withCtx(({ option }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "option", { option }, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "option", { option })
            ];
          }
        }),
        dropdownicon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(null)}`);
          } else {
            return [
              createTextVNode(toDisplayString(null))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/dropdown/DeCollapsibleListbox.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SocialsList",
  __ssrInlineRender: true,
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const communityList = [
      {
        id: "facebook",
        icon: "socials--facebook-round",
        link: "https://www.facebook.com/dappexpert",
        linkRu: "https://www.facebook.com/dapp.expert_russian"
      },
      {
        id: "telegram",
        icon: "socials--telegram-round",
        link: "https://t.me/dappexpert",
        linkRu: "https://t.me/dappexpert_russia"
      },
      {
        id: "instagram",
        icon: "socials--instagram",
        link: "https://www.instagram.com/dapp.expert/",
        linkRu: "https://www.instagram.com/dapp.expert_russian/"
      },
      {
        id: "vk",
        icon: "socials--ru--vk",
        link: "https://vk.com/dappexpert"
      },
      { id: "twitter", icon: "socials--twitter", link: "https://twitter.com/Dappexpert" },
      {
        id: "youtube",
        icon: "socials--youtube",
        link: "https://www.youtube.com/@dappexpert"
      },
      {
        id: "discord",
        icon: "socials--discord",
        link: "https://discord.com/channels/873147314410237983/873147315408490568"
      },
      { id: "reddit", icon: "socials--reddit", link: "https://www.reddit.com/user/DappExpert/" },
      { id: "medium", icon: "socials--medium", link: "https://medium.com/@Dapp.Expert" }
    ];
    const { t } = useI18n();
    const socialLocales = computed(
      () => locales.map((item) => ({
        ...item,
        label: item.code === "ru" ? t("common.shortLocale.ru") : t("common.shortLocale.en")
      }))
    );
    function onChange(event, item) {
      if (event.value === "ru") {
        (void 0).open(item.linkRu, "_blank");
      } else {
        (void 0).open(item.link, "_blank");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.showHeader) {
        _push(`<h2 class="heading-h5.1 tw-font-normal tw-mb-5 tw-text-primary-300 tw-text-center">${ssrInterpolate(_ctx.$t("mainPage.subscribe.joinCommunity"))}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ "md:tw-flex-row": !__props.center }, "tw-flex tw-flex-col tw-gap-5 tw-items-center tw-justify-center xl:tw-flex-col"])}"><ul class="tw-flex tw-gap-2 tw-flex-wrap"><!--[-->`);
      ssrRenderList(communityList, (item) => {
        _push(`<li class="tw-p-1">`);
        if (item.linkRu) {
          _push(ssrRenderComponent(_sfc_main$1, {
            options: socialLocales.value,
            "append-to": "self",
            "popup-alignment": "center",
            "panel-class": "tw-p-0",
            "list-item-class": "tw-py-0.5 tw-bg-primary-800",
            class: "tw-leading-600",
            style: { "--p-anchor-gutter": "6px" },
            onChange: ($event) => onChange($event, item)
          }, {
            trigger: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button${ssrRenderAttr("aria-label", item.id)}${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$m, {
                  name: item.icon,
                  class: "tw-w-500 tw-h-500"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createVNode("button", {
                    "aria-label": item.id
                  }, [
                    createVNode(_sfc_main$m, {
                      name: item.icon,
                      class: "tw-w-500 tw-h-500"
                    }, null, 8, ["name"])
                  ], 8, ["aria-label"])
                ];
              }
            }),
            option: withCtx(({ option }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<a${ssrRenderAttr("href", option.code === "ru" ? item.linkRu : item.link)}${ssrRenderAttr("title", item.id)} target="_blank" rel="noopener" class="tw-inline-block tw-text-300 tw-leading-400 tw-uppercase"${_scopeId}>${ssrInterpolate(option.label)}</a>`);
              } else {
                return [
                  createVNode("a", {
                    href: option.code === "ru" ? item.linkRu : item.link,
                    title: item.id,
                    target: "_blank",
                    rel: "noopener",
                    class: "tw-inline-block tw-text-300 tw-leading-400 tw-uppercase"
                  }, toDisplayString(option.label), 9, ["href", "title"])
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<a${ssrRenderAttr("href", item.link)}${ssrRenderAttr("title", item.id)} target="_blank" rel="noopener">`);
          _push(ssrRenderComponent(_sfc_main$m, {
            name: item.icon,
            class: "tw-w-500 tw-h-500"
          }, null, _parent));
          _push(`</a>`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/SocialsList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SocialsList-U76nsQei.mjs.map
