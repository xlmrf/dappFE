import { defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { b as useAppStore, _ as _sfc_main$m, a1 as _sfc_main$l, a2 as ButtonSizeOptions, aa as ButtonVariantOptions, V as AuthTab } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
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
import './dialog.esm-ClGlMgQg.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SignupEmailAlreadyRegisteredDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useAppStore();
    const dialog = ref(null);
    const onSubmit = () => {
      var _a;
      (_a = dialog.value) == null ? void 0 : _a.close();
      store.toggleAuthDialog(AuthTab.login, true);
    };
    const onGoBack = () => {
      var _a;
      (_a = dialog.value) == null ? void 0 : _a.close();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        ref_key: "dialog",
        ref: dialog
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-w-16 tw-h-16 tw-bg-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-7.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "info",
              class: "tw-w-800 tw-h-800 tw-text-accent-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="heading-h2 tw-text-center tw-mb-4"${_scopeId}>${ssrInterpolate(_ctx.$t("auth.emailAlreadyRegisteredDialog.title"))}</h1><p class="body-b1 tw-text-primary-200 tw-text-center"${_scopeId}>${ssrInterpolate(_ctx.$t("auth.emailAlreadyRegisteredDialog.text"))}</p>`);
          } else {
            return [
              createVNode("div", { class: "tw-w-16 tw-h-16 tw-bg-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-7.5" }, [
                createVNode(_sfc_main$m, {
                  name: "info",
                  class: "tw-w-800 tw-h-800 tw-text-accent-500"
                })
              ]),
              createVNode("h1", { class: "heading-h2 tw-text-center tw-mb-4" }, toDisplayString(_ctx.$t("auth.emailAlreadyRegisteredDialog.title")), 1),
              createVNode("p", { class: "body-b1 tw-text-primary-200 tw-text-center" }, toDisplayString(_ctx.$t("auth.emailAlreadyRegisteredDialog.text")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$l, {
              size: unref(ButtonSizeOptions).medium,
              variant: unref(ButtonVariantOptions).confirm,
              label: _ctx.$t("auth.emailAlreadyRegisteredDialog.submitButton"),
              class: "tw-w-full tw-mt-10",
              onClick: onSubmit
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$l, {
              variant: unref(ButtonVariantOptions).text,
              label: _ctx.$t("common.buttons.goBack"),
              class: "tw-w-full tw-mt-5",
              onClick: onGoBack
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$l, {
                size: unref(ButtonSizeOptions).medium,
                variant: unref(ButtonVariantOptions).confirm,
                label: _ctx.$t("auth.emailAlreadyRegisteredDialog.submitButton"),
                class: "tw-w-full tw-mt-10",
                onClick: onSubmit
              }, null, 8, ["size", "variant", "label"]),
              createVNode(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).text,
                label: _ctx.$t("common.buttons.goBack"),
                class: "tw-w-full tw-mt-5",
                onClick: onGoBack
              }, null, 8, ["variant", "label"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/signup/SignupEmailAlreadyRegisteredDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SignupEmailAlreadyRegisteredDialog-D4nFkrq0.mjs.map
