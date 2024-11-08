import { useSSRContext, defineComponent, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, computed, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './DeDialog-Cpcyaeou.mjs';
import { n as useLogin, o as useErrorHandling, x as DeFormGroup } from './server.mjs';
import { useForm } from 'vee-validate';
import { object, string, ref as ref$1 } from 'yup';
import { a as useI18n, as as PASSWORD_STRENGTH_REGEX, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$3 } from './DeFormPassword-CxDsncEV.mjs';
import { i as isEmpty } from './entry-styles-1.mjs-DgBF4tXX.mjs';
import './dialog.esm-ClGlMgQg.mjs';
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
import '@tanstack/vue-query-devtools';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isToday.js';
import './password.esm-F9-Vbrfa.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ChangePasswordForm",
  __ssrInlineRender: true,
  props: {
    error: {},
    pending: { type: Boolean }
  },
  emits: ["submit"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { t } = useI18n();
    const { handleSubmit, errors, values } = useForm({
      validationSchema: object({
        password: string().required(t("form.enterYourX", { field: "form.password" })).matches(PASSWORD_STRENGTH_REGEX, t("form.rules.passwordStrengthValidation")),
        repeatPassword: string().required("Please repeat your password").oneOf([ref$1("password")], t("form.rules.passwordDoestMatch"))
      })
    });
    const isSubmitDisabled = computed(() => {
      return !values.password || !values.repeatPassword || !isEmpty(errors.value);
    });
    handleSubmit((values2) => {
      emit("submit", values2.password, values2.repeatPassword);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<form${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(DeFormGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "password",
              placeholder: unref(t)("form.enterYourX", { field: "form.password", subj: "common.new" }),
              label: unref(t)("form.password"),
              "input-class": "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "repeatPassword",
              placeholder: unref(t)("form.enterYourX", { field: "form.confirmPassword" }),
              label: unref(t)("form.confirmPassword"),
              "input-class": "tw-w-full"
            }, null, _parent2, _scopeId));
            if (_ctx.error) {
              _push2(`<div class="tw-text-danger-500 heading-h5 tw-text-center"${_scopeId}>${ssrInterpolate(_ctx.error)}</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$3, {
                id: "password",
                placeholder: unref(t)("form.enterYourX", { field: "form.password", subj: "common.new" }),
                label: unref(t)("form.password"),
                "input-class": "tw-w-full"
              }, null, 8, ["placeholder", "label"]),
              createVNode(_sfc_main$3, {
                id: "repeatPassword",
                placeholder: unref(t)("form.enterYourX", { field: "form.confirmPassword" }),
                label: unref(t)("form.confirmPassword"),
                "input-class": "tw-w-full"
              }, null, 8, ["placeholder", "label"]),
              _ctx.error ? (openBlock(), createBlock("div", {
                key: 0,
                class: "tw-text-danger-500 heading-h5 tw-text-center"
              }, toDisplayString(_ctx.error), 1)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        type: "submit",
        variant: unref(ButtonVariantOptions).confirm,
        size: unref(ButtonSizeOptions).medium,
        label: unref(t)("auth.changePassword.submit"),
        loading: _ctx.pending,
        disabled: isSubmitDisabled.value,
        class: "tw-w-full tw-mt-10"
      }, null, _parent));
      _push(`</form>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/ChangePasswordForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChangePasswordDialog",
  __ssrInlineRender: true,
  props: {
    hash: {}
  },
  emits: ["password-saved"],
  setup(__props, { emit: __emit }) {
    const componentProps = __props;
    const emit = __emit;
    const { t } = useI18n();
    const dialog = ref(null);
    const { changePassword } = useLogin();
    const { getErrorMessage } = useErrorHandling();
    const backendErrorMessage = ref();
    async function onSubmit(password, repeatPassword) {
      var _a;
      try {
        await changePassword({
          hash: componentProps.hash,
          password,
          confirm_password: repeatPassword
        });
        emit("password-saved");
        (_a = dialog.value) == null ? void 0 : _a.close();
      } catch (error) {
        console.error(error);
        const { errorCode } = error;
        backendErrorMessage.value = getErrorMessage(errorCode);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({
        ref_key: "dialog",
        ref: dialog
      }, _attrs), {
        header: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="${ssrRenderClass(props.class)}"${_scopeId}>${ssrInterpolate(unref(t)("auth.changePassword.title"))}</h1><p class="body-b1 tw-text-primary-200 tw-mt-4"${_scopeId}>${ssrInterpolate(unref(t)("auth.changePassword.subtitle"))}</p>`);
          } else {
            return [
              createVNode("h1", {
                class: props.class
              }, toDisplayString(unref(t)("auth.changePassword.title")), 3),
              createVNode("p", { class: "body-b1 tw-text-primary-200 tw-mt-4" }, toDisplayString(unref(t)("auth.changePassword.subtitle")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              error: backendErrorMessage.value,
              onSubmit
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                error: backendErrorMessage.value,
                onSubmit
              }, null, 8, ["error"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/change-password/ChangePasswordDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=ChangePasswordDialog-Z5K9-Zgj.mjs.map
