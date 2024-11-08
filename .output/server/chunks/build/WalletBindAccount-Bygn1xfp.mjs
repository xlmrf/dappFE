import { useSSRContext, defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { _ as _sfc_main$m, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions, ab as ButtonCategoryOptions, a as useI18n, as as PASSWORD_STRENGTH_REGEX, af as _sfc_main$i } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { L as useWallet, x as DeFormGroup } from './server.mjs';
import { _ as _sfc_main$2 } from './DeFormPassword-CxDsncEV.mjs';
import { i as isEmpty } from './entry-styles-1.mjs-DgBF4tXX.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@tanstack/vue-query';
import 'dayjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isToday.js';
import 'remeda';
import '@tanstack/vue-table';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/schema-org';
import '@floating-ui/utils';
import 'isomorphic-dompurify';
import 'ethers';
import '@tanstack/vue-query-devtools';
import './password.esm-F9-Vbrfa.mjs';

const _imports_0 = publicAssetsURL("/images/logos/logo-static.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WalletBindAccountForm",
  __ssrInlineRender: true,
  props: {
    address: {},
    signature: {},
    walletType: {}
  },
  emits: ["back", "forgot-password", "wallet-bound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const onBackClick = () => {
      emit("back");
    };
    const { t } = useI18n();
    const { handleSubmit, errors, values, isSubmitting } = useForm({
      validationSchema: object({
        email: string().required(t("form.enterYourX", { field: "form.emailAddress" })).email(),
        password: string().required(t("form.enterYourX", { field: "form.password" })).matches(PASSWORD_STRENGTH_REGEX, t("form.rules.passwordStrengthValidation"))
      })
    });
    const isSubmitted = ref(false);
    const { bindWalletToExistingAccount } = useWallet();
    const backendErrorMessage = ref("");
    handleSubmit(async (values2) => {
      isSubmitted.value = true;
      try {
        await bindWalletToExistingAccount({
          walletType: props.walletType,
          address: props.address,
          signature: props.signature,
          email: values2.email,
          password: values2.password
        });
        emit("wallet-bound", props.address, values2.email);
      } catch (error) {
        backendErrorMessage.value = error;
      }
    });
    const isSubmitDisabled = computed(() => {
      return !values.email || !values.password || values.password.length < 8 || !isEmpty(errors.value);
    });
    const onForgotPasswordClick = () => {
      onBackClick();
      emit("forgot-password");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><button class="tw-absolute tw-top-5 tw-left-5">`);
      _push(ssrRenderComponent(_sfc_main$m, {
        name: "arrow-left",
        class: "tw-w-600 tw-h-600 tw-text-primary-400"
      }, null, _parent));
      _push(`</button><form><h1 class="heading-h2 tw-text-center tw-mb-7.5">${ssrInterpolate(_ctx.$t("auth.wallet.bindingForm.title"))}</h1>`);
      _push(ssrRenderComponent(DeFormGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$i, {
              id: "walletId",
              disabled: "",
              label: _ctx.$t("auth.wallet.walletAddress"),
              class: "tw-w-full",
              value: _ctx.address
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$i, {
              id: "email",
              label: _ctx.$t("form.emailAddress"),
              "is-error": !!unref(backendErrorMessage),
              placeholder: _ctx.$t("form.enterYourX", { field: "form.emailAddress" }),
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, {
              id: "password",
              placeholder: _ctx.$t("form.enterYourX", { field: "form.password" }),
              label: _ctx.$t("form.password"),
              "is-error": !!unref(backendErrorMessage),
              "input-class": "tw-w-full"
            }, {
              "append-label": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button type="button" class="tw-text-300 tw-leading-400 tw-font-semibold tw-text-primary-300 tw-ml-auto"${_scopeId2}>${ssrInterpolate(_ctx.$t("common.buttons.forgotPassword"))}</button>`);
                } else {
                  return [
                    createVNode("button", {
                      type: "button",
                      class: "tw-text-300 tw-leading-400 tw-font-semibold tw-text-primary-300 tw-ml-auto",
                      onClick: onForgotPasswordClick
                    }, toDisplayString(_ctx.$t("common.buttons.forgotPassword")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(backendErrorMessage)) {
              _push2(`<div class="tw-text-danger-500 heading-h5 tw-text-center"${_scopeId}>${ssrInterpolate(unref(backendErrorMessage))}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$i, {
                id: "walletId",
                disabled: "",
                label: _ctx.$t("auth.wallet.walletAddress"),
                class: "tw-w-full",
                value: _ctx.address
              }, null, 8, ["label", "value"]),
              createVNode(_sfc_main$i, {
                id: "email",
                label: _ctx.$t("form.emailAddress"),
                "is-error": !!unref(backendErrorMessage),
                placeholder: _ctx.$t("form.enterYourX", { field: "form.emailAddress" }),
                class: "tw-w-full"
              }, null, 8, ["label", "is-error", "placeholder"]),
              createVNode(_sfc_main$2, {
                id: "password",
                placeholder: _ctx.$t("form.enterYourX", { field: "form.password" }),
                label: _ctx.$t("form.password"),
                "is-error": !!unref(backendErrorMessage),
                "input-class": "tw-w-full"
              }, {
                "append-label": withCtx(() => [
                  createVNode("button", {
                    type: "button",
                    class: "tw-text-300 tw-leading-400 tw-font-semibold tw-text-primary-300 tw-ml-auto",
                    onClick: onForgotPasswordClick
                  }, toDisplayString(_ctx.$t("common.buttons.forgotPassword")), 1)
                ]),
                _: 1
              }, 8, ["placeholder", "label", "is-error"]),
              unref(backendErrorMessage) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "tw-text-danger-500 heading-h5 tw-text-center"
              }, toDisplayString(unref(backendErrorMessage)), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        type: "submit",
        variant: unref(ButtonVariantOptions).confirm,
        size: unref(ButtonSizeOptions).medium,
        label: _ctx.$t("common.buttons.bindNow"),
        loading: unref(isSubmitting),
        disabled: unref(isSubmitDisabled),
        class: "tw-w-full tw-mt-10"
      }, null, _parent));
      _push(`</form></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/wallet/WalletBindAccountForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletBindAccount",
  __ssrInlineRender: true,
  props: {
    walletId: {},
    address: {},
    signature: {}
  },
  emits: ["back", "forgot-password", "inactive-wallet", "wallet-bound"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const walletImageSrc = computed(() => {
      const fileName = props.walletId.split("_").join("");
      return `/images/wallets/${fileName}.svg`;
    });
    const emit = __emit;
    const isBindAccountFormShown = ref(false);
    const isBindAccountShown = ref(true);
    const toggleBindAccountFormVisibility = () => {
      isBindAccountFormShown.value = !isBindAccountFormShown.value;
    };
    const onSubmit = () => {
      toggleBindAccountFormVisibility();
    };
    const onForgotPassword = () => {
      isBindAccountFormShown.value = false;
      isBindAccountShown.value = false;
      emit("forgot-password");
    };
    const { registerByWallet } = useWallet();
    const onCancel = () => {
      {
        registerByWallet({
          walletType: props.walletId,
          address: props.address,
          signature: props.signature
        });
      }
    };
    const onWalletBound = (walletAddress, email) => {
      emit("wallet-bound", walletAddress, email);
    };
    return (_ctx, _push, _parent, _attrs) => {
      if (isBindAccountFormShown.value) {
        _push(ssrRenderComponent(_sfc_main$1, mergeProps({
          "wallet-type": _ctx.walletId,
          address: _ctx.address,
          signature: _ctx.signature,
          onBack: toggleBindAccountFormVisibility,
          onWalletBound,
          onForgotPassword
        }, _attrs), null, _parent));
      } else if (isBindAccountShown.value) {
        _push(`<div${ssrRenderAttrs(_attrs)}><button class="tw-absolute tw-top-5 tw-left-5">`);
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "arrow-left",
          class: "tw-w-600 tw-h-600 tw-text-primary-400"
        }, null, _parent));
        _push(`</button><div class="tw-flex tw-items-center tw-justify-center tw-gap-2.5 tw-mb-7.5">`);
        if (_ctx.walletId) {
          _push(`<img${ssrRenderAttr("src", walletImageSrc.value)}${ssrRenderAttr("alt", `${_ctx.walletId} logo`)}${ssrRenderAttr("width", 60)}${ssrRenderAttr("height", 60)}>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "arrow-right-left",
          class: "tw-w-600 tw-h-600 tw-text-primary-400"
        }, null, _parent));
        _push(`<div class="tw-bg-primary-700 tw-w-1500 tw-h-1500 tw-rounded-full tw-flex tw-items-center tw-justify-center"><img${ssrRenderAttr("src", _imports_0)} alt="Dapp main logo"${ssrRenderAttr("width", 36)}${ssrRenderAttr("height", 36)}></div></div><div class="tw-text-center body-b1 tw-text-primary-200 tw-mb-7.5"><h1 class="heading-h2 tw-text-primary-50 tw-mb-4">${ssrInterpolate(_ctx.$t("auth.wallet.bindingDialog.title"))}</h1><p class="tw-mb-4">${ssrInterpolate(_ctx.$t("auth.wallet.bindingDialog.text"))}</p><p>${ssrInterpolate(_ctx.$t("auth.wallet.bindingDialog.note"))}</p></div>`);
        _push(ssrRenderComponent(_sfc_main$l, {
          variant: unref(ButtonVariantOptions).confirm,
          size: unref(ButtonSizeOptions).medium,
          label: _ctx.$t("auth.wallet.bindingDialog.buttons.submit"),
          class: "tw-w-full tw-mb-3.5",
          onClick: onSubmit
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$l, {
          type: "button",
          category: unref(ButtonCategoryOptions).secondary,
          variant: unref(ButtonVariantOptions).confirm,
          size: unref(ButtonSizeOptions).medium,
          label: _ctx.$t("auth.wallet.bindingDialog.buttons.cancel"),
          class: "tw-w-full",
          onClick: onCancel
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/wallet/WalletBindAccount.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=WalletBindAccount-Bygn1xfp.mjs.map
