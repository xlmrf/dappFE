import { a as useI18n, b as useAppStore, a1 as _sfc_main$l, ab as ButtonCategoryOptions, a2 as ButtonSizeOptions, r as __nuxt_component_0 } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'node:url';
import 'vue-router';
import '@tanstack/vue-query';
import 'unhead';
import '@unhead/shared';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isToday.js';
import 'yup';
import 'vee-validate';
import 'remeda';

const _imports_0 = "" + __buildAssetsURL("cookie.AW29jHYJ.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppCookiesNotification",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { setCookieConsent } = useAppStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-bg-primary-900 tw-fixed tw-bottom-0 md:tw-bottom-5 md:tw-left-1/2 md:tw-min-w-[680px] tw-w-full md:tw-w-auto md:tw--translate-x-1/2 tw-z-20" }, _attrs))}><div class="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-p-4 md:tw-p-6"><div class="tw-flex tw-items-center tw-gap-5 tw-flex-grow"><img loading="lazy" alt="cookie image"${ssrRenderAttr("src", _imports_0)} class="tw-w-900 tw-h-900 max-sm:tw-hidden">`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "terms.cookie",
        tag: "p",
        class: "heading-h5.1 tw-flex-shrink",
        scope: "global"
      }, {
        link: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_link_locale, {
              to: "/privacy-policy",
              class: "tw-underline tw-font-semibold tw-lowercase"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("terms.privacy.title", 2))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("terms.privacy.title", 2)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_nuxt_link_locale, {
                to: "/privacy-policy",
                class: "tw-underline tw-font-semibold tw-lowercase"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("terms.privacy.title", 2)), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$l, {
        type: "submit",
        category: unref(ButtonCategoryOptions).secondary,
        size: unref(ButtonSizeOptions).medium,
        label: `${_ctx.$t("common.buttons.gotIt")}!`,
        class: "tw-flex-shrink-0",
        onClick: unref(setCookieConsent)
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/AppCookiesNotification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AppCookiesNotification-ZRtfifmf.mjs.map
