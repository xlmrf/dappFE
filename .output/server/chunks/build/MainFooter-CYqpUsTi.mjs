import { useSSRContext, defineComponent, mergeProps, unref, defineAsyncComponent, withCtx, createTextVNode, toDisplayString, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$3, A as APP_LOGO_VARIANT_OPTIONS, a as APP_LOGO_SIZE_OPTIONS } from './AppLogo-nf5qLJNl.mjs';
import { b as useAppStore, r as __nuxt_component_0 } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$4 } from './SocialsList-U76nsQei.mjs';
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
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import '@tanstack/vue-table';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/schema-org';
import '@floating-ui/utils';
import 'isomorphic-dompurify';
import 'ethers';
import '@tanstack/vue-query-devtools';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppFooterMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const AppContactUs = defineAsyncComponent(() => import('./AppContactUs-B-14loH_.mjs'));
    const store = useAppStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<!--[--><nav class="tw-w-full md:tw-w-auto"><ul class="tw-flex tw-gap-7.5 tw-justify-center"><li class="heading-h4"><button>${ssrInterpolate(_ctx.$t("menu.footer.items.submit"))}</button></li><li class="heading-h4">`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("menu.footer.items.deFight"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("menu.footer.items.deFight")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li class="heading-h4"><button>${ssrInterpolate(_ctx.$t("menu.footer.items.contactUs"))}</button></li></ul></nav>`);
      if (unref(store).customerService.isVisible) {
        _push(ssrRenderComponent(unref(AppContactUs), {
          modelValue: unref(store).customerService.isVisible,
          "onUpdate:modelValue": ($event) => unref(store).customerService.isVisible = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/menu/AppFooterMenu.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppCopyright",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-text-300 tw-leading-400 tw-text-center tw-text-primary-300" }, _attrs))}>${ssrInterpolate(_ctx.$t("common.copyright", { currentYear: currentYear.value }))}</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/AppCopyright.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MainFooter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "tw-pt-10 md:tw-pt-7.5 tw-pb-7.5 xl:tw-py-20 tw-bg-primary-900 tw-mt-auto" }, _attrs))}><div class="tw-px-4 md:tw-px-8 xl:tw-px-10"><div class="tw-flex tw-flex-col xl:tw-flex-row tw-justify-between"><div class="tw-flex tw-flex-col md:tw-flex-row tw-items-center md:tw-justify-between tw-border-b xl:tw-border-b-0 tw-border-primary-600 tw-gap-10 xl:tw-gap-15 tw-pb-10 xl:tw-pb-0 md:tw-pb-7.5">`);
      _push(ssrRenderComponent(_sfc_main$3, {
        variant: unref(APP_LOGO_VARIANT_OPTIONS).withText,
        size: unref(APP_LOGO_SIZE_OPTIONS).large
      }, null, _parent));
      _push(`<div class="tw-flex tw-flex-col tw-items-start tw-gap-5 tw-relative xl:tw-pl-15 before:tw-content-none before:xl:tw-content-[&#39;&#39;] before:tw-w-px before:tw-h-2500 before:tw-absolute before:tw-left-0 before:tw-top-1/2 before:tw-bg-primary-600 before:tw-transform before:tw--translate-y-1/2">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { class: "tw-hidden xl:tw-block" }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        "show-header": false,
        class: "tw-mt-10 tw-mb-7.5"
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "xl:tw-hidden" }, null, _parent));
      _push(`</div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/MainFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=MainFooter-CYqpUsTi.mjs.map
