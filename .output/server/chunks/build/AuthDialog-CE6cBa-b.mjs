import { a as useI18n, V as AuthTab, b as useAppStore, n as _sfc_main$7$1, w as _sfc_main$c, af as _sfc_main$i, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions, _ as _sfc_main$m, as as PASSWORD_STRENGTH_REGEX, ay as _sfc_main$j, d as __nuxt_component_0$2, k as useDayjs, v as useNuxtApp, r as __nuxt_component_0, aA as ONE_MINUTE_IN_MILLISECONDS } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { useSSRContext, defineComponent, defineAsyncComponent, computed, ref, mergeProps, withCtx, unref, isRef, openBlock, createBlock, createCommentVNode, createVNode, Suspense, watch, toDisplayString, resolveComponent, createTextVNode, toRef } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _sfc_main$8 } from './DeDialog-Cpcyaeou.mjs';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { o as useErrorHandling, n as useLogin, H as errorCodes, x as DeFormGroup, A as AuthService } from './server.mjs';
import { _ as _sfc_main$9 } from './DeFormPassword-CxDsncEV.mjs';
import { i as isEmpty } from './entry-styles-1.mjs-DgBF4tXX.mjs';
import { u as useRecaptcha, _ as _sfc_main$a } from './useRecaptcha-DdgOQf95.mjs';
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
import './password.esm-F9-Vbrfa.mjs';

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "LoginForm",
  __ssrInlineRender: true,
  emits: ["forgot-password", "email-confirm-required", "wallet"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const { handleSubmit, errors, values, isSubmitting } = useForm({
      validationSchema: object({
        email: string().required(t("form.enterYourX", { field: "form.emailAddress" })).email(),
        password: string().required(t("form.enterYourX", { field: "form.password" }))
      })
    });
    const isSubmitDisabled = computed(() => {
      return !values.email || !values.password || !isEmpty(errors.value);
    });
    const store = useAppStore();
    const { getErrorMessage } = useErrorHandling();
    const backendErrorMessage = ref(null);
    const { login, makeUserLoggedIn } = useLogin();
    handleSubmit(async (values2) => {
      try {
        const response = await login(values2);
        await makeUserLoggedIn(response.access_token);
        store.toggleAuthDialog(void 0, false);
      } catch (error) {
        const { errorCode } = error;
        if (errorCode[0] === errorCodes.E_EMAIL_CONFIRMATION_REQUIRED) {
          emit("email-confirm-required", values2.email);
        } else {
          console.error(error);
          backendErrorMessage.value = getErrorMessage(errorCode);
        }
      }
    });
    watch(values, () => {
      if (!backendErrorMessage.value)
        return;
      backendErrorMessage.value = null;
    });
    function onForgotPasswordClick() {
      emit("forgot-password");
    }
    function onWalletClick() {
      emit("wallet");
    }
    const { googleLogin } = useLogin();
    const isGoogleLoginLoading = ref(false);
    const onGoogleClick = async () => {
      isGoogleLoginLoading.value = true;
      try {
        await googleLogin();
      } finally {
        isGoogleLoginLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(DeFormGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$i, {
              id: "email",
              placeholder: unref(t)("form.enterYourX", { field: "form.emailAddress" }),
              type: "email",
              "is-error": !!backendErrorMessage.value,
              label: unref(t)("form.email"),
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "password",
              placeholder: unref(t)("form.enterYourX", { field: "form.password" }),
              label: unref(t)("form.password"),
              "is-error": !!backendErrorMessage.value,
              "input-class": "tw-w-full"
            }, {
              "append-label": withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button type="button" class="tw-text-300 tw-leading-400 tw-font-semibold tw-text-primary-300 tw-ml-auto"${_scopeId2}>${ssrInterpolate(unref(t)("common.buttons.forgotPassword"))}</button>`);
                } else {
                  return [
                    createVNode("button", {
                      type: "button",
                      class: "tw-text-300 tw-leading-400 tw-font-semibold tw-text-primary-300 tw-ml-auto",
                      onClick: onForgotPasswordClick
                    }, toDisplayString(unref(t)("common.buttons.forgotPassword")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (backendErrorMessage.value) {
              _push2(`<div class="tw-text-danger-500 heading-h5 tw-text-center"${_scopeId}>${ssrInterpolate(backendErrorMessage.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$i, {
                id: "email",
                placeholder: unref(t)("form.enterYourX", { field: "form.emailAddress" }),
                type: "email",
                "is-error": !!backendErrorMessage.value,
                label: unref(t)("form.email"),
                class: "tw-w-full"
              }, null, 8, ["placeholder", "is-error", "label"]),
              createVNode(_sfc_main$9, {
                id: "password",
                placeholder: unref(t)("form.enterYourX", { field: "form.password" }),
                label: unref(t)("form.password"),
                "is-error": !!backendErrorMessage.value,
                "input-class": "tw-w-full"
              }, {
                "append-label": withCtx(() => [
                  createVNode("button", {
                    type: "button",
                    class: "tw-text-300 tw-leading-400 tw-font-semibold tw-text-primary-300 tw-ml-auto",
                    onClick: onForgotPasswordClick
                  }, toDisplayString(unref(t)("common.buttons.forgotPassword")), 1)
                ]),
                _: 1
              }, 8, ["placeholder", "label", "is-error"]),
              backendErrorMessage.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "tw-text-danger-500 heading-h5 tw-text-center"
              }, toDisplayString(backendErrorMessage.value), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        type: "submit",
        variant: unref(ButtonVariantOptions).confirm,
        size: unref(ButtonSizeOptions).medium,
        label: unref(t)("common.buttons.logIn"),
        disabled: unref(isSubmitDisabled),
        loading: unref(isSubmitting),
        class: "tw-w-full tw-mt-10"
      }, null, _parent));
      _push(`<div class="tw-my-5 tw-uppercase tw-text-center body-b1">${ssrInterpolate(unref(t)("common.or"))}</div><div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3.5">`);
      _push(ssrRenderComponent(_sfc_main$l, {
        size: unref(ButtonSizeOptions).medium,
        label: unref(t)("common.google"),
        loading: isGoogleLoginLoading.value,
        icon: "google",
        class: "tw-w-full",
        "icon-class": "tw-mr-2.5",
        onClick: onGoogleClick
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        size: unref(ButtonSizeOptions).medium,
        label: unref(t)("common.wallet"),
        icon: "wallet",
        class: "tw-w-full",
        "icon-class": "tw-mr-2.5 tw-text-accent-500",
        onClick: onWalletClick
      }, null, _parent));
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/LoginForm.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ForgotPasswordForm",
  __ssrInlineRender: true,
  emits: ["back-to-login", "forgot-password"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const { handleSubmit, errors, values, isSubmitting } = useForm({
      validationSchema: object({
        email: string().required(t("form.enterYourX", { field: "form.emailAddress" })).email()
      })
    });
    const onBackToLoginClick = () => {
      emit("back-to-login");
    };
    const { recoveryPassword } = useLogin();
    handleSubmit(async (values2) => {
      await recoveryPassword({
        email: values2.email,
        "g-recaptcha-response": (void 0).grecaptcha.getResponse()
      });
      emit("forgot-password", values2.email);
    });
    const { captchaResponseToken, onVerifyCallback } = useRecaptcha();
    const isSubmitDisabled = computed(() => {
      return !values.email || !isEmpty(errors.value) || !captchaResponseToken.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="heading-h2 tw-mb-4">${ssrInterpolate(_ctx.$t("auth.forgotPasswordDialog.title"))}</h1><p class="body-b1 tw-text-primary-200 tw-mb-7.5">${ssrInterpolate(_ctx.$t("auth.forgotPasswordDialog.text"))}</p><form>`);
      _push(ssrRenderComponent(_sfc_main$i, {
        id: "email",
        placeholder: _ctx.$t("form.enterYourX", { field: "form.emailAddress" }),
        type: "email",
        label: _ctx.$t("form.emailAddress"),
        class: "tw-w-full"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$a, { onVerifyCallback: unref(onVerifyCallback) }, null, _parent));
      _push(`<div class="tw-flex tw-flex-col tw-gap-5 tw-mt-10">`);
      _push(ssrRenderComponent(_sfc_main$l, {
        type: "submit",
        variant: unref(ButtonVariantOptions).confirm,
        size: unref(ButtonSizeOptions).medium,
        disabled: unref(isSubmitDisabled),
        loading: unref(isSubmitting),
        label: _ctx.$t("common.buttons.sendInstructions"),
        class: "tw-w-full"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        variant: unref(ButtonVariantOptions).text,
        size: unref(ButtonSizeOptions).medium,
        label: _ctx.$t("common.buttons.backToX", { field: "common.buttons.logIn" }),
        onClick: onBackToLoginClick
      }, null, _parent));
      _push(`</div></form></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/ForgotPasswordForm.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "DeFormInputCode",
  __ssrInlineRender: true,
  props: {
    fields: {
      type: Number,
      default: 3
    },
    fieldWidth: {
      type: Number,
      default: 56
    },
    fieldHeight: {
      type: Number,
      default: 56
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: true
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change", "complete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const values = ref([]);
    const iRefs = ref([]);
    const inputs = ref([]);
    const fields = toRef(props, "fields");
    const autoFocusIndex = ref(0);
    const initVals = () => {
      let vals;
      if (values.value && values.value.length) {
        vals = [];
        for (let i = 0; i < fields.value; i++) {
          vals.push(values.value[i] || "");
        }
        autoFocusIndex.value = values.value.length >= fields.value ? 0 : values.value.length;
      } else {
        vals = Array(fields.value).fill("");
      }
      iRefs.value = [];
      for (let i = 0; i < fields.value; i++) {
        iRefs.value.push(i + 1);
      }
      values.value = vals;
    };
    const clear = () => {
      values.value = Array(fields.value).fill("");
      initVals();
      inputs.value[1].focus();
    };
    __expose({
      clear
    });
    initVals();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "de-form-input-code-container" }, _attrs))}><!--[-->`);
      ssrRenderList(values.value, (v, index) => {
        _push(`<input type="tel" pattern="[0-9]" style="${ssrRenderStyle({
          width: `${props.fieldWidth}px`,
          height: `${props.fieldHeight}px`
        })}" class="${ssrRenderClass([{ "is-error": __props.isError }, "de-form-input-text de-form-input-code"])}"${ssrIncludeBooleanAttr(index === autoFocusIndex.value) ? " autofocus" : ""}${ssrRenderAttr("data-id", index)}${ssrRenderAttr("value", v)}${ssrIncludeBooleanAttr(props.required) ? " required" : ""}${ssrIncludeBooleanAttr(props.disabled) ? " disabled" : ""} maxlength="1">`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/form/DeFormInputCode.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "VerificationCode",
  __ssrInlineRender: true,
  props: {
    isError: {
      type: Boolean,
      default: false
    }
  },
  emits: ["complete"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const onCodeComplete = (code) => {
      emit("complete", code);
    };
    const verificationCode = ref(null);
    const clear = () => {
      if (!verificationCode.value)
        return;
      verificationCode.value.clear();
    };
    __expose({
      clear
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$5, mergeProps({
        ref_key: "verificationCode",
        ref: verificationCode,
        fields: 6,
        "field-width": 40,
        "field-height": 38,
        "is-error": __props.isError,
        onComplete: onCodeComplete
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/verification/VerificationCode.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const RESEND_VERIFICATION_EMAIL_DELAY = ONE_MINUTE_IN_MILLISECONDS;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "VerificationResendEmail",
  __ssrInlineRender: true,
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ["resend"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const countdownDuration = RESEND_VERIFICATION_EMAIL_DELAY;
    const dayjs = useDayjs();
    const timeLeft = ref(countdownDuration);
    const endTime = ref(dayjs().add(countdownDuration, "millisecond"));
    const resetCountdown = () => {
      timeLeft.value = countdownDuration;
      endTime.value = dayjs().add(countdownDuration, "millisecond");
    };
    let intervalId;
    const setCountDown = () => {
      intervalId = setInterval(() => {
        const millisecondsLeft = endTime.value.diff(dayjs(), "millisecond");
        if (millisecondsLeft <= 0) {
          clearInterval(intervalId);
          timeLeft.value = 0;
        } else {
          timeLeft.value = millisecondsLeft;
        }
      }, 1e3);
    };
    const formattedTimeLeft = computed(() => {
      return dayjs.duration(timeLeft.value / 1e3, "seconds").format("mm:ss");
    });
    const emit = __emit;
    const onResendClick = () => {
      emit("resend");
    };
    const reset = () => {
      resetCountdown();
      clearInterval(intervalId);
      setCountDown();
    };
    __expose({
      reset
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (timeLeft.value) {
        _push(`<p${ssrRenderAttrs(mergeProps({ class: "body-b1 tw-text-center tw-text-primary-300 tw-leading-550 tw-py-2" }, _attrs))}>${ssrInterpolate(_ctx.$t("auth.emailVerificationDialog.resendEmailCounterText"))} ${ssrInterpolate(formattedTimeLeft.value)}</p>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$l, mergeProps({
          variant: unref(ButtonVariantOptions).text,
          size: unref(ButtonSizeOptions).medium,
          loading: __props.isLoading,
          label: _ctx.$t("common.buttons.resendX", { field: "form.email" }),
          class: "tw-w-full tw-mb-5",
          onClick: onResendClick
        }, _attrs), null, _parent));
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/verification/VerificationResendEmail.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const useSignUp = () => {
  const { $customFetch } = useNuxtApp();
  const authRepo = AuthService($customFetch);
  const signUp = async (payload) => {
    return await authRepo.signUp(payload);
  };
  const { getErrorMessage } = useErrorHandling();
  const { makeUserLoggedIn } = useLogin();
  const confirmRegistration = async (payload) => {
    try {
      const response = await authRepo.confirmRegistration(payload);
      await makeUserLoggedIn(response.access_token);
    } catch (error) {
      console.error(error);
      const { errorCode } = error;
      throw getErrorMessage(errorCode);
    }
  };
  const resendVerificationEmail = async (email) => {
    return await authRepo.resendVerificationEmail({ email });
  };
  return {
    signUp,
    confirmRegistration,
    resendVerificationEmail
  };
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SignupVerification",
  __ssrInlineRender: true,
  props: {
    email: {},
    password: {}
  },
  emits: ["verification-success"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isSubmitting = ref(false);
    const { confirmRegistration, resendVerificationEmail } = useSignUp();
    const store = useAppStore();
    const backendErrorMessage = ref(null);
    const emit = __emit;
    const onSubmit = async (code) => {
      isSubmitting.value = true;
      try {
        await confirmRegistration({
          email: props.email,
          verify_code: code
        });
        emit("verification-success");
        store.toggleAuthDialog(void 0, false);
      } catch (error) {
        backendErrorMessage.value = error;
      } finally {
        isSubmitting.value = false;
      }
    };
    const isSubmitDisabled = ref(true);
    const verifCode = ref(null);
    const onVerificationCodeComplete = async (code) => {
      isSubmitDisabled.value = !isSubmitDisabled.value;
      await onSubmit(code);
    };
    const resendEmailRef = ref(null);
    const isResendPending = ref(false);
    const onResend = async () => {
      var _a, _b;
      if (!verifCode.value)
        return;
      isResendPending.value = true;
      try {
        await resendVerificationEmail(props.email);
        (_a = resendEmailRef.value) == null ? void 0 : _a.reset();
        (_b = verifCode.value) == null ? void 0 : _b.clear();
        backendErrorMessage.value = null;
      } finally {
        isResendPending.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="tw-bg-primary-600 tw-p-4 tw-rounded-full tw-w-1600 tw-h-1600 tw-mx-auto">`);
      _push(ssrRenderComponent(_sfc_main$m, {
        name: "mail",
        class: "tw-text-accent-500 tw-w-800 tw-h-800"
      }, null, _parent));
      _push(`</div><div class="tw-my-7.5"><h1 class="heading-h2 tw-text-center tw-mb-4">${ssrInterpolate(_ctx.$t("auth.emailVerificationDialog.title"))}</h1>`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "auth.emailVerificationDialog.text",
        tag: "p",
        class: "tw-text-center tw-text-primary-200 body-b1",
        scope: "global"
      }, {
        email: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="tw-text-accent-500 tw-font-bold"${_scopeId}>${ssrInterpolate(_ctx.email)}</span>`);
          } else {
            return [
              createVNode("span", { class: "tw-text-accent-500 tw-font-bold" }, toDisplayString(_ctx.email), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(DeFormGroup, { class: "tw-mb-7.5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              ref_key: "verifCode",
              ref: verifCode,
              "is-error": !!backendErrorMessage.value,
              onComplete: onVerificationCodeComplete
            }, null, _parent2, _scopeId));
            if (backendErrorMessage.value) {
              _push2(`<div class="tw-text-danger-500 heading-h5 tw-text-center"${_scopeId}>${ssrInterpolate(backendErrorMessage.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$4, {
                ref_key: "verifCode",
                ref: verifCode,
                "is-error": !!backendErrorMessage.value,
                onComplete: onVerificationCodeComplete
              }, null, 8, ["is-error"]),
              backendErrorMessage.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "tw-text-danger-500 heading-h5 tw-text-center"
              }, toDisplayString(backendErrorMessage.value), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$3, {
        ref_key: "resendEmailRef",
        ref: resendEmailRef,
        "is-loading": isResendPending.value,
        class: "tw-mb-7.5",
        onResend
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        variant: unref(ButtonVariantOptions).confirm,
        size: unref(ButtonSizeOptions).medium,
        label: _ctx.$t("common.buttons.next"),
        loading: isSubmitting.value,
        disabled: isSubmitDisabled.value,
        class: "tw-w-full",
        onClick: onSubmit
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/signup/SignupVerification.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SignupForm",
  __ssrInlineRender: true,
  emits: ["submit", "wallet", "email-already-registered"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const { handleSubmit, errors, values, isSubmitting } = useForm({
      validationSchema: object({
        email: string().required(t("form.enterYourX", { field: "form.emailAddress" })).email(),
        password: string().required(t("form.enterYourX", { field: "form.password" })).matches(PASSWORD_STRENGTH_REGEX, t("form.rules.passwordStrengthValidation"))
      })
    });
    const { signUp } = useSignUp();
    const backendErrorMessage = ref(null);
    const { getErrorMessage } = useErrorHandling();
    watch(values, () => {
      if (!backendErrorMessage.value)
        return;
      backendErrorMessage.value = null;
    });
    handleSubmit(async (values2) => {
      try {
        await signUp(values2);
        emit("submit", values2.email, values2.password);
      } catch (error) {
        console.error(error);
        const { errorCode } = error;
        if (errorCode[0] === errorCodes.E_EMAIL_ALREADY_REGISTERED) {
          emit("email-already-registered");
        } else {
          backendErrorMessage.value = getErrorMessage(errorCode);
        }
      }
    });
    const isSubmitDisabled = computed(() => {
      return !values.email || !values.password || !isEmpty(errors.value);
    });
    const onWalletClick = () => {
      emit("wallet");
    };
    const { googleLogin } = useLogin();
    const isGoogleLoginLoading = ref(false);
    const onGoogleClick = async () => {
      isGoogleLoginLoading.value = true;
      try {
        await googleLogin();
      } finally {
        isGoogleLoginLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<form${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(DeFormGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$i, {
              id: "email",
              placeholder: unref(t)("form.enterYourX", { field: "form.emailAddress" }),
              type: "email",
              label: unref(t)("form.email"),
              "is-error": !!backendErrorMessage.value,
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$9, {
              id: "password",
              placeholder: _ctx.$t("form.enterYourX", { field: "form.password" }),
              label: unref(t)("form.password"),
              "is-error": !!backendErrorMessage.value,
              "input-class": "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$j, {
              value: true,
              label: unref(t)("terms.marketingUpdatesAgreement"),
              name: "isMarketingUpdatesAccepted",
              "input-id": "marketingUpdates",
              binary: ""
            }, null, _parent2, _scopeId));
            if (backendErrorMessage.value) {
              _push2(`<div class="tw-text-danger-500 heading-h5 tw-text-center"${_scopeId}>${ssrInterpolate(backendErrorMessage.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$i, {
                id: "email",
                placeholder: unref(t)("form.enterYourX", { field: "form.emailAddress" }),
                type: "email",
                label: unref(t)("form.email"),
                "is-error": !!backendErrorMessage.value,
                class: "tw-w-full"
              }, null, 8, ["placeholder", "label", "is-error"]),
              createVNode(_sfc_main$9, {
                id: "password",
                placeholder: _ctx.$t("form.enterYourX", { field: "form.password" }),
                label: unref(t)("form.password"),
                "is-error": !!backendErrorMessage.value,
                "input-class": "tw-w-full"
              }, null, 8, ["placeholder", "label", "is-error"]),
              createVNode(_sfc_main$j, {
                value: true,
                label: unref(t)("terms.marketingUpdatesAgreement"),
                name: "isMarketingUpdatesAccepted",
                "input-id": "marketingUpdates",
                binary: ""
              }, null, 8, ["label"]),
              backendErrorMessage.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "tw-text-danger-500 heading-h5 tw-text-center"
              }, toDisplayString(backendErrorMessage.value), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        type: "submit",
        variant: unref(ButtonVariantOptions).confirm,
        size: unref(ButtonSizeOptions).medium,
        disabled: unref(isSubmitDisabled),
        loading: unref(isSubmitting),
        label: unref(t)("common.buttons.createAccount"),
        class: "tw-w-full tw-mt-10"
      }, null, _parent));
      _push(`<div class="tw-my-5 tw-uppercase tw-text-center body-b1">${ssrInterpolate(unref(t)("common.or"))}</div><div class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-3.5">`);
      _push(ssrRenderComponent(_sfc_main$l, {
        size: unref(ButtonSizeOptions).medium,
        label: unref(t)("common.google"),
        loading: isGoogleLoginLoading.value,
        icon: "google",
        class: "tw-w-full",
        "icon-class": "tw-mr-2.5",
        onClick: onGoogleClick
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        size: unref(ButtonSizeOptions).medium,
        label: unref(t)("common.wallet"),
        icon: "wallet",
        class: "tw-w-full",
        "icon-class": "tw-mr-2.5 tw-text-accent-500",
        onClick: onWalletClick
      }, null, _parent));
      _push(`</div><div class="tw-mt-7.5 tw-text-300 tw-leading-400 tw-text-primary-300 tw-text-center tw-px-10">`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "terms.agreement",
        scope: "global"
      }, {
        termsLink: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_link_locale, {
              to: "/terms-conditions",
              target: "_blank",
              class: "tw-border-b tw-font-semibold"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("terms.termsOfUse"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("terms.termsOfUse")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_nuxt_link_locale, {
                to: "/terms-conditions",
                target: "_blank",
                class: "tw-border-b tw-font-semibold"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("terms.termsOfUse")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        privacyLink: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_link_locale, {
              to: "/privacy-policy",
              target: "_blank",
              class: "tw-border-b tw-font-semibold"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(t)("terms.privacy.title"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(t)("terms.privacy.title")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_nuxt_link_locale, {
                to: "/privacy-policy",
                target: "_blank",
                class: "tw-border-b tw-font-semibold"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(t)("terms.privacy.title")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/signup/SignupForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AuthDialog",
  __ssrInlineRender: true,
  emits: ["inactive-wallet", "wallet-bound", "forgot-password", "verification-success", "email-confirm-required"],
  setup(__props, { emit: __emit }) {
    const WalletFlow = defineAsyncComponent(() => import('./WalletFlow-C9esYJCg.mjs'));
    const SignupEmailAlreadyRegisteredDialog = defineAsyncComponent(
      () => import('./SignupEmailAlreadyRegisteredDialog-D4nFkrq0.mjs')
    );
    const emit = __emit;
    const { t } = useI18n();
    const authTabs = [
      {
        id: AuthTab.login,
        label: t("common.buttons.logIn")
      },
      {
        id: AuthTab.signUp,
        label: t("common.buttons.signUp")
      }
    ];
    const getTabIndexById = (tabId) => {
      return authTabs.findIndex((item) => item.id === tabId);
    };
    const isTabsShown = computed(() => {
      return !isVerificationShown.value && !isWalletFlowActive.value && !isForgotPasswordShown.value;
    });
    const store = useAppStore();
    const activeTabIndex = computed({
      get() {
        return getTabIndexById(store.authDialog.activeTab) || 0;
      },
      set(index) {
        store.toggleAuthDialog(authTabs[index].id, true);
      }
    });
    const isLoginFormActive = computed(() => {
      return activeTabIndex.value === getTabIndexById(AuthTab.login);
    });
    const isSignupFormActive = computed(() => {
      return activeTabIndex.value === getTabIndexById(AuthTab.signUp);
    });
    const isLoginFormShown = computed(() => {
      return isLoginFormActive.value && !isForgotPasswordShown.value && !isVerificationShown.value && !isWalletFlowActive.value;
    });
    const isSignupFormShown = computed(() => {
      return isSignupFormActive.value && !isForgotPasswordShown.value && !isVerificationShown.value && !isWalletFlowActive.value;
    });
    const isForgotPasswordShown = ref(false);
    const toggleForgotPassword = () => {
      isForgotPasswordShown.value = !isForgotPasswordShown.value;
    };
    const registrationEmail = ref("");
    const registrationPassword = ref("");
    const isVerificationShown = ref(false);
    const onSignupSubmitted = (email, password) => {
      isVerificationShown.value = true;
      registrationEmail.value = email;
      registrationPassword.value = password;
    };
    const isWalletFlowActive = ref(false);
    const toggleWalletFlowState = () => {
      isWalletFlowActive.value = !isWalletFlowActive.value;
    };
    const onDialogHide = () => {
      isWalletFlowActive.value = false;
      isVerificationShown.value = false;
      isForgotPasswordShown.value = false;
    };
    const onBackToLogin = () => {
      isForgotPasswordShown.value = false;
      store.toggleAuthDialog(AuthTab.login, true);
      isWalletFlowActive.value = false;
    };
    const onInactiveWallet = () => {
      emit("inactive-wallet");
    };
    const onWalletBound = (walletAddress, email) => {
      emit("wallet-bound", walletAddress, email);
    };
    const onForgotPassword = (email) => {
      emit("forgot-password", email);
    };
    const isEmailAlreadyRegisteredDialogShown = ref(false);
    const onEmailAlreadyRegisteredError = () => {
      isEmailAlreadyRegisteredDialogShown.value = true;
    };
    const onVerificationSuccess = () => {
      emit("verification-success");
    };
    function onEmailConfirmedRequired(email) {
      emit("email-confirm-required", email);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2;
      _push(ssrRenderComponent(_sfc_main$8, mergeProps({
        class: "md:tw-min-h-3200",
        onAfterHide: onDialogHide
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isTabsShown)) {
              _push2(ssrRenderComponent(_sfc_main$7$1, {
                modelValue: unref(activeTabIndex),
                "onUpdate:modelValue": ($event) => isRef(activeTabIndex) ? activeTabIndex.value = $event : null,
                model: authTabs,
                "action-class": (tab) => tab.id === unref(AuthTab).signUp ? "tw-capitalize" : void 0,
                "menu-class": "tw-justify-center",
                class: "tw-mb-10"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(isLoginFormShown)) {
              _push2(ssrRenderComponent(_sfc_main$7, {
                onForgotPassword: toggleForgotPassword,
                onWallet: toggleWalletFlowState,
                onEmailConfirmRequired: onEmailConfirmedRequired
              }, null, _parent2, _scopeId));
            } else if (unref(isSignupFormShown)) {
              _push2(ssrRenderComponent(_sfc_main$1, {
                onSubmit: onSignupSubmitted,
                onWallet: toggleWalletFlowState,
                onEmailAlreadyRegistered: onEmailAlreadyRegisteredError
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(isEmailAlreadyRegisteredDialogShown)) {
              _push2(ssrRenderComponent(unref(SignupEmailAlreadyRegisteredDialog), {
                visible: unref(isEmailAlreadyRegisteredDialogShown),
                "onUpdate:visible": ($event) => isRef(isEmailAlreadyRegisteredDialogShown) ? isEmailAlreadyRegisteredDialogShown.value = $event : null
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_client_only, null, {}, _parent2, _scopeId));
            if (unref(isForgotPasswordShown)) {
              _push2(ssrRenderComponent(_sfc_main$6, {
                visible: unref(isForgotPasswordShown),
                "onUpdate:visible": ($event) => isRef(isForgotPasswordShown) ? isForgotPasswordShown.value = $event : null,
                onForgotPassword,
                onBackToLogin
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(isVerificationShown)) {
              _push2(ssrRenderComponent(_sfc_main$2, {
                email: unref(registrationEmail),
                password: unref(registrationPassword),
                onVerificationSuccess
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(isTabsShown) ? (openBlock(), createBlock(_sfc_main$7$1, {
                key: 0,
                modelValue: unref(activeTabIndex),
                "onUpdate:modelValue": ($event) => isRef(activeTabIndex) ? activeTabIndex.value = $event : null,
                model: authTabs,
                "action-class": (tab) => tab.id === unref(AuthTab).signUp ? "tw-capitalize" : void 0,
                "menu-class": "tw-justify-center",
                class: "tw-mb-10"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "action-class"])) : createCommentVNode("", true),
              unref(isLoginFormShown) ? (openBlock(), createBlock(_sfc_main$7, {
                key: 1,
                onForgotPassword: toggleForgotPassword,
                onWallet: toggleWalletFlowState,
                onEmailConfirmRequired: onEmailConfirmedRequired
              })) : unref(isSignupFormShown) ? (openBlock(), createBlock(_sfc_main$1, {
                key: 2,
                onSubmit: onSignupSubmitted,
                onWallet: toggleWalletFlowState,
                onEmailAlreadyRegistered: onEmailAlreadyRegisteredError
              })) : createCommentVNode("", true),
              unref(isEmailAlreadyRegisteredDialogShown) ? (openBlock(), createBlock(unref(SignupEmailAlreadyRegisteredDialog), {
                key: 3,
                visible: unref(isEmailAlreadyRegisteredDialogShown),
                "onUpdate:visible": ($event) => isRef(isEmailAlreadyRegisteredDialogShown) ? isEmailAlreadyRegisteredDialogShown.value = $event : null
              }, null, 8, ["visible", "onUpdate:visible"])) : createCommentVNode("", true),
              createVNode(_component_client_only, null, {
                default: withCtx(() => [
                  unref(isWalletFlowActive) ? (openBlock(), createBlock(Suspense, { key: 0 }, {
                    fallback: withCtx(() => [
                      createVNode(_sfc_main$c)
                    ]),
                    default: withCtx(() => [
                      createVNode(unref(WalletFlow), {
                        onBackToLogin,
                        onForgotPassword: toggleForgotPassword,
                        onInactiveWallet,
                        onWalletBound
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              unref(isForgotPasswordShown) ? (openBlock(), createBlock(_sfc_main$6, {
                key: 4,
                visible: unref(isForgotPasswordShown),
                "onUpdate:visible": ($event) => isRef(isForgotPasswordShown) ? isForgotPasswordShown.value = $event : null,
                onForgotPassword,
                onBackToLogin
              }, null, 8, ["visible", "onUpdate:visible"])) : createCommentVNode("", true),
              unref(isVerificationShown) ? (openBlock(), createBlock(_sfc_main$2, {
                key: 5,
                email: unref(registrationEmail),
                password: unref(registrationPassword),
                onVerificationSuccess
              }, null, 8, ["email", "password"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/AuthDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AuthDialog-CE6cBa-b.mjs.map
