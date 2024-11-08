import { defineComponent, useModel, computed, ref, mergeProps, createSlots, withCtx, unref, createVNode, openBlock, createBlock, withModifiers, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { i as isEmpty } from './entry-styles-1.mjs-DgBF4tXX.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { a as useI18n, c as useUserStore, v as useNuxtApp, af as _sfc_main$i, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions, _ as _sfc_main$m, X as DE_EMAIL } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { x as DeFormGroup, y as DISPLAY_NAME_MAX_LENGTH, z as _sfc_main$3 } from './server.mjs';
import { u as useRecaptcha, _ as _sfc_main$2 } from './useRecaptcha-DdgOQf95.mjs';
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

const ContactService = (fetch) => ({
  async sendMessage(payload) {
    return await fetch("api/contact/send-message", { method: "POST", body: payload });
  }
});
const EMAIL_FIELD_LENGTH = 255;
const MESSAGE_FIELD_LENGTH = 4999;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppContactUs",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean, ...{ required: true } },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const model = useModel(__props, "modelValue");
    const { t } = useI18n();
    const userStore = useUserStore();
    const { handleSubmit, errors, values, isSubmitting } = useForm({
      validationSchema: object({
        name: string().required(t("form.enterYourX", { field: "form.name" })),
        message: string().required(t("form.enterYourX", { field: "form.message" })),
        email: string().required(t("form.enterYourX", { field: "form.emailAddress" })).email()
      }),
      initialValues: {
        email: userStore.user.email || "",
        message: "",
        name: ""
      }
    });
    const { captchaResponseToken, onVerifyCallback } = useRecaptcha();
    const isSubmitDisabled = computed(() => {
      return !values.email || !values.message || !values.name || !isEmpty(errors.value) || !captchaResponseToken.value;
    });
    const { $customFetch } = useNuxtApp();
    const contactRepository = ContactService($customFetch);
    const isSent = ref(false);
    const onSubmit = handleSubmit(async (values2) => {
      var _a;
      const payload = {
        ...values2,
        "g-recaptcha-response": (_a = (void 0).grecaptcha) == null ? void 0 : _a.getResponse()
      };
      await contactRepository.sendMessage(payload);
      isSent.value = true;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        visible: model.value,
        "onUpdate:visible": ($event) => model.value = $event,
        class: "md:tw-w-12000",
        "content-class": "tw-relative tw-h-full"
      }, _attrs), createSlots({
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!isSent.value) {
              _push2(`<form${_scopeId}>`);
              _push2(ssrRenderComponent(DeFormGroup, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$i, {
                      id: "name",
                      placeholder: unref(t)("form.enterYourX", { field: "form.name" }),
                      label: unref(t)("form.name"),
                      maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
                      class: "tw-w-full"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$i, {
                      id: "email",
                      placeholder: unref(t)("form.enterYourX", { field: "form.emailAddress" }),
                      type: "email",
                      maxlength: EMAIL_FIELD_LENGTH,
                      label: unref(t)("form.email"),
                      class: "tw-w-full"
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_sfc_main$3, {
                      id: "message",
                      rows: "5",
                      resize: "none",
                      label: unref(t)("form.message"),
                      placeholder: unref(t)("form.enterYourX", { field: "form.message" }),
                      maxlength: MESSAGE_FIELD_LENGTH,
                      class: "tw-w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$i, {
                        id: "name",
                        placeholder: unref(t)("form.enterYourX", { field: "form.name" }),
                        label: unref(t)("form.name"),
                        maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
                        class: "tw-w-full"
                      }, null, 8, ["placeholder", "label", "maxlength"]),
                      createVNode(_sfc_main$i, {
                        id: "email",
                        placeholder: unref(t)("form.enterYourX", { field: "form.emailAddress" }),
                        type: "email",
                        maxlength: EMAIL_FIELD_LENGTH,
                        label: unref(t)("form.email"),
                        class: "tw-w-full"
                      }, null, 8, ["placeholder", "label"]),
                      createVNode(_sfc_main$3, {
                        id: "message",
                        rows: "5",
                        resize: "none",
                        label: unref(t)("form.message"),
                        placeholder: unref(t)("form.enterYourX", { field: "form.message" }),
                        maxlength: MESSAGE_FIELD_LENGTH,
                        class: "tw-w-full"
                      }, null, 8, ["label", "placeholder"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$2, { onVerifyCallback: unref(onVerifyCallback) }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$l, {
                type: "submit",
                variant: unref(ButtonVariantOptions).confirm,
                size: unref(ButtonSizeOptions).medium,
                label: unref(t)("common.buttons.send"),
                loading: unref(isSubmitting),
                disabled: unref(isSubmitDisabled),
                class: "tw-w-full tw-mt-10",
                onClick: unref(onSubmit)
              }, null, _parent2, _scopeId));
              _push2(`</form>`);
            } else {
              _push2(`<div class="tw-flex tw-flex-col tw-gap-y-7.5 tw-items-center max-md:tw-absolute tw-left-0 tw-w-full tw-top-1/2 max-md:tw--translate-y-2/3 max-md:tw-px-4"${_scopeId}><div class="tw-bg-primary-600 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$m, {
                name: "check-circle",
                class: "tw-w-8 tw-h-8 tw-text-accent-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="tw-text-center"${_scopeId}><div class="heading-h2 tw-mb-4"${_scopeId}>${ssrInterpolate(unref(t)("mainPage.contactUs.sendSuccessfully.title"))}</div><p class="body-b1 tw-text-primary-200"${_scopeId}>${ssrInterpolate(unref(t)("mainPage.contactUs.sendSuccessfully.text"))}</p></div>`);
              _push2(ssrRenderComponent(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).confirm,
                size: unref(ButtonSizeOptions).medium,
                label: unref(t)("common.buttons.gotIt"),
                class: "tw-min-w-2500",
                onClick: ($event) => model.value = false
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              !isSent.value ? (openBlock(), createBlock("form", {
                key: 0,
                onSubmit: withModifiers(unref(onSubmit), ["prevent"])
              }, [
                createVNode(DeFormGroup, null, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$i, {
                      id: "name",
                      placeholder: unref(t)("form.enterYourX", { field: "form.name" }),
                      label: unref(t)("form.name"),
                      maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
                      class: "tw-w-full"
                    }, null, 8, ["placeholder", "label", "maxlength"]),
                    createVNode(_sfc_main$i, {
                      id: "email",
                      placeholder: unref(t)("form.enterYourX", { field: "form.emailAddress" }),
                      type: "email",
                      maxlength: EMAIL_FIELD_LENGTH,
                      label: unref(t)("form.email"),
                      class: "tw-w-full"
                    }, null, 8, ["placeholder", "label"]),
                    createVNode(_sfc_main$3, {
                      id: "message",
                      rows: "5",
                      resize: "none",
                      label: unref(t)("form.message"),
                      placeholder: unref(t)("form.enterYourX", { field: "form.message" }),
                      maxlength: MESSAGE_FIELD_LENGTH,
                      class: "tw-w-full"
                    }, null, 8, ["label", "placeholder"])
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$2, { onVerifyCallback: unref(onVerifyCallback) }, null, 8, ["onVerifyCallback"]),
                createVNode(_sfc_main$l, {
                  type: "submit",
                  variant: unref(ButtonVariantOptions).confirm,
                  size: unref(ButtonSizeOptions).medium,
                  label: unref(t)("common.buttons.send"),
                  loading: unref(isSubmitting),
                  disabled: unref(isSubmitDisabled),
                  class: "tw-w-full tw-mt-10",
                  onClick: unref(onSubmit)
                }, null, 8, ["variant", "size", "label", "loading", "disabled", "onClick"])
              ], 40, ["onSubmit"])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "tw-flex tw-flex-col tw-gap-y-7.5 tw-items-center max-md:tw-absolute tw-left-0 tw-w-full tw-top-1/2 max-md:tw--translate-y-2/3 max-md:tw-px-4"
              }, [
                createVNode("div", { class: "tw-bg-primary-600 tw-w-16 tw-h-16 tw-rounded-full tw-flex tw-items-center tw-justify-center" }, [
                  createVNode(_sfc_main$m, {
                    name: "check-circle",
                    class: "tw-w-8 tw-h-8 tw-text-accent-500"
                  })
                ]),
                createVNode("div", { class: "tw-text-center" }, [
                  createVNode("div", { class: "heading-h2 tw-mb-4" }, toDisplayString(unref(t)("mainPage.contactUs.sendSuccessfully.title")), 1),
                  createVNode("p", { class: "body-b1 tw-text-primary-200" }, toDisplayString(unref(t)("mainPage.contactUs.sendSuccessfully.text")), 1)
                ]),
                createVNode(_sfc_main$l, {
                  variant: unref(ButtonVariantOptions).confirm,
                  size: unref(ButtonSizeOptions).medium,
                  label: unref(t)("common.buttons.gotIt"),
                  class: "tw-min-w-2500",
                  onClick: ($event) => model.value = false
                }, null, 8, ["variant", "size", "label", "onClick"])
              ]))
            ];
          }
        }),
        _: 2
      }, [
        !isSent.value ? {
          name: "header",
          fn: withCtx(({ props }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h1 class="${ssrRenderClass(props.class)}"${_scopeId}>${ssrInterpolate(unref(t)("mainPage.contactUs.title"))}</h1><p class="body-b1 tw-text-primary-200 tw-mt-4"${_scopeId}>${ssrInterpolate(unref(t)("mainPage.contactUs.subtitle"))}</p><a${ssrRenderAttr("href", `mailto:${unref(DE_EMAIL)}`)} class="tw-inline-block body-b1 tw-mt-4"${_scopeId}><span class="tw-text-primary-200"${_scopeId}>${ssrInterpolate(unref(t)("form.email"))}:</span> ${ssrInterpolate(unref(DE_EMAIL))}</a>`);
            } else {
              return [
                createVNode("h1", {
                  class: props.class
                }, toDisplayString(unref(t)("mainPage.contactUs.title")), 3),
                createVNode("p", { class: "body-b1 tw-text-primary-200 tw-mt-4" }, toDisplayString(unref(t)("mainPage.contactUs.subtitle")), 1),
                createVNode("a", {
                  href: `mailto:${unref(DE_EMAIL)}`,
                  class: "tw-inline-block body-b1 tw-mt-4"
                }, [
                  createVNode("span", { class: "tw-text-primary-200" }, toDisplayString(unref(t)("form.email")) + ":", 1),
                  createTextVNode(" " + toDisplayString(unref(DE_EMAIL)), 1)
                ], 8, ["href"])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/AppContactUs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AppContactUs-B-14loH_.mjs.map
