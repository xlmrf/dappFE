import { defineComponent, ref, mergeProps, withCtx, createVNode, toDisplayString, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { ar as WALLET_CRYPTOS, _ as _sfc_main$m, a1 as _sfc_main$l, aa as ButtonVariantOptions } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import './dialog.esm-ClGlMgQg.mjs';
import './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@tanstack/vue-query';
import '@tanstack/vue-table';
import 'remeda';
import 'dayjs';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/schema-org';
import '@floating-ui/utils';
import 'isomorphic-dompurify';
import 'ethers';
import 'vee-validate';
import 'yup';
import '@tanstack/vue-query-devtools';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isToday.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletInactiveWalletDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const walletCryptos = WALLET_CRYPTOS.join(", ");
    const dialog = ref(null);
    const onGotItClick = () => {
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
              class: "tw-w-650 tw-h-650 tw-text-accent-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="heading-h2 tw-text-center"${_scopeId}>${ssrInterpolate(_ctx.$t("auth.wallet.bindingActiveWalletDialog.title"))}</h1>`);
          } else {
            return [
              createVNode("div", { class: "tw-w-16 tw-h-16 tw-bg-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-7.5" }, [
                createVNode(_sfc_main$m, {
                  name: "info",
                  class: "tw-w-650 tw-h-650 tw-text-accent-500"
                })
              ]),
              createVNode("h1", { class: "heading-h2 tw-text-center" }, toDisplayString(_ctx.$t("auth.wallet.bindingActiveWalletDialog.title")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="body-b1 tw-text-primary-200 tw-text-center"${_scopeId}>${ssrInterpolate(_ctx.$t("auth.wallet.bindingActiveWalletDialog.text"))} <span class="tw-font-bold"${_scopeId}>${ssrInterpolate(unref(walletCryptos))}</span></p>`);
            _push2(ssrRenderComponent(_sfc_main$l, {
              variant: unref(ButtonVariantOptions).confirm,
              label: _ctx.$t("common.buttons.gotIt"),
              class: "tw-w-full tw-mt-10",
              onClick: onGotItClick
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("p", { class: "body-b1 tw-text-primary-200 tw-text-center" }, [
                createTextVNode(toDisplayString(_ctx.$t("auth.wallet.bindingActiveWalletDialog.text")) + " ", 1),
                createVNode("span", { class: "tw-font-bold" }, toDisplayString(unref(walletCryptos)), 1)
              ]),
              createVNode(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).confirm,
                label: _ctx.$t("common.buttons.gotIt"),
                class: "tw-w-full tw-mt-10",
                onClick: onGotItClick
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/wallet/WalletInactiveWalletDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=WalletInactiveWalletDialog-44XkAdo5.mjs.map
