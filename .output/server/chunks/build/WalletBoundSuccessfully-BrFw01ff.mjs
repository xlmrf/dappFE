import { defineComponent, ref, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$m, a1 as _sfc_main$l, aa as ButtonVariantOptions } from './chunk-pg-(articles)-D5MrPPlE.mjs';
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
  __name: "WalletBoundSuccessfully",
  __ssrInlineRender: true,
  props: {
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const dialog = ref(null);
    const onGotItClick = () => {
      var _a;
      (_a = dialog.value) == null ? void 0 : _a.close();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        ref_key: "dialog",
        ref: dialog
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-w-16 tw-h-16 tw-bg-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-7.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "check-circle",
              class: "tw-w-800 tw-h-800 tw-text-accent-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="heading-h2 tw-text-center"${_scopeId}>${ssrInterpolate(_ctx.$t("auth.wallet.boundSuccessfullyDialog.title"))}</h1>`);
          } else {
            return [
              createVNode("div", { class: "tw-w-16 tw-h-16 tw-bg-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto tw-mb-7.5" }, [
                createVNode(_sfc_main$m, {
                  name: "check-circle",
                  class: "tw-w-800 tw-h-800 tw-text-accent-500"
                })
              ]),
              createVNode("h1", { class: "heading-h2 tw-text-center" }, toDisplayString(_ctx.$t("auth.wallet.boundSuccessfullyDialog.title")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_i18n_t, {
              keypath: "auth.wallet.boundSuccessfullyDialog.text",
              tag: "p",
              class: "tw-text-center tw-text-primary-200 body-b1",
              scope: "global"
            }, {
              walletId: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="tw-text-accent-500 tw-font-bold"${_scopeId2}>${ssrInterpolate(__props.address)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "tw-text-accent-500 tw-font-bold" }, toDisplayString(__props.address), 1)
                  ];
                }
              }),
              email: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.email)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.email), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$l, {
              variant: unref(ButtonVariantOptions).confirm,
              label: _ctx.$t("common.buttons.gotIt"),
              class: "tw-w-full tw-mt-10",
              onClick: onGotItClick
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_i18n_t, {
                keypath: "auth.wallet.boundSuccessfullyDialog.text",
                tag: "p",
                class: "tw-text-center tw-text-primary-200 body-b1",
                scope: "global"
              }, {
                walletId: withCtx(() => [
                  createVNode("span", { class: "tw-text-accent-500 tw-font-bold" }, toDisplayString(__props.address), 1)
                ]),
                email: withCtx(() => [
                  createTextVNode(toDisplayString(__props.email), 1)
                ]),
                _: 1
              }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/wallet/WalletBoundSuccessfully.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=WalletBoundSuccessfully-BrFw01ff.mjs.map
