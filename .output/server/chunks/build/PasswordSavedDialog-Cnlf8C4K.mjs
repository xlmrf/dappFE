import { defineComponent, computed, ref, mergeProps, withCtx, createVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { a as useI18n, b as useAppStore, a5 as useAuthStore, _ as _sfc_main$m, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions, V as AuthTab } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { n as useLogin } from './server.mjs';
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
  __name: "PasswordSavedDialog",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const dialogTitle = computed(() => {
      var _a;
      return (_a = props.title) != null ? _a : t("auth.passwordSavedDialog.title");
    });
    const appStore = useAppStore();
    const authStore = useAuthStore();
    const { makeUserLoggedOut } = useLogin();
    const dialog = ref(null);
    const onLogInClick = () => {
      var _a;
      if (authStore.isLoggedIn) {
        makeUserLoggedOut();
      }
      appStore.toggleAuthDialog(AuthTab.login, true);
      (_a = dialog.value) == null ? void 0 : _a.close();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        ref_key: "dialog",
        ref: dialog,
        closable: false,
        "close-on-escape": false
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-bg-primary-600 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "check-circle",
              class: "tw-w-8 tw-h-8 tw-text-accent-500"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tw-bg-primary-600 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto" }, [
                createVNode(_sfc_main$m, {
                  name: "check-circle",
                  class: "tw-w-8 tw-h-8 tw-text-accent-500"
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="heading-h2 tw-text-center tw-mb-4"${_scopeId}>${ssrInterpolate(dialogTitle.value)}</h1><p class="tw-text-center tw-text-primary-200 body-b1"${_scopeId}>${ssrInterpolate(unref(t)("auth.passwordSavedDialog.text"))}</p>`);
            _push2(ssrRenderComponent(_sfc_main$l, {
              variant: unref(ButtonVariantOptions).confirm,
              size: unref(ButtonSizeOptions).medium,
              label: unref(t)("common.buttons.logIn"),
              class: "tw-w-full tw-mt-10",
              onClick: onLogInClick
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("h1", { class: "heading-h2 tw-text-center tw-mb-4" }, toDisplayString(dialogTitle.value), 1),
              createVNode("p", { class: "tw-text-center tw-text-primary-200 body-b1" }, toDisplayString(unref(t)("auth.passwordSavedDialog.text")), 1),
              createVNode(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).confirm,
                size: unref(ButtonSizeOptions).medium,
                label: unref(t)("common.buttons.logIn"),
                class: "tw-w-full tw-mt-10",
                onClick: onLogInClick
              }, null, 8, ["variant", "size", "label"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/change-password/PasswordSavedDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=PasswordSavedDialog-Cnlf8C4K.mjs.map
