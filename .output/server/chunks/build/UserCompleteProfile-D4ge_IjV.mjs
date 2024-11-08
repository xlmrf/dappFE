import { defineComponent, computed, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, isRef, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useForm } from 'vee-validate';
import { a as useI18n, v as useNuxtApp, af as _sfc_main$i, a1 as _sfc_main$l, a2 as ButtonSizeOptions, aa as ButtonVariantOptions } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { object, string } from 'yup';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { n as useLogin, y as DISPLAY_NAME_MAX_LENGTH, U as UserService } from './server.mjs';
import { i as isEmpty } from './entry-styles-1.mjs-DgBF4tXX.mjs';
import { _ as _sfc_main$2 } from './UserProfileAvatarUploader-CzRx3hcf.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserCompleteProfile",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { handleSubmit, errors, values, isSubmitting } = useForm({
      validationSchema: object({
        name: string().required(t("form.enterYourX", { field: "form.displayName" }))
      })
    });
    const isSubmitDisabled = computed(() => {
      return !values.name || !isEmpty(errors.value);
    });
    const { $customFetch } = useNuxtApp();
    const { getUser } = useLogin();
    const dialog = ref(null);
    const imageUrl = ref("");
    const imageRaw = ref(null);
    const userRepository = UserService($customFetch);
    const onSubmit = handleSubmit(async (values2) => {
      var _a;
      const promises = [userRepository.updateUserName(values2.name)];
      if (imageRaw.value) {
        const uploadPhotoPromise = userRepository.uploadUserPhoto(imageRaw.value);
        promises.push(uploadPhotoPromise);
      }
      await Promise.allSettled(promises);
      await getUser();
      (_a = dialog.value) == null ? void 0 : _a.close();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        ref_key: "dialog",
        ref: dialog,
        class: "md:tw-w-[600px]"
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="heading-h2 tw-mb-4"${_scopeId}>${ssrInterpolate(unref(t)("user.settings.profile.completeProfile.title"))}</div><p class="body-b1 tw-text-primary-200"${_scopeId}>${ssrInterpolate(unref(t)("user.settings.profile.completeProfile.subtitle"))}</p>`);
          } else {
            return [
              createVNode("div", { class: "heading-h2 tw-mb-4" }, toDisplayString(unref(t)("user.settings.profile.completeProfile.title")), 1),
              createVNode("p", { class: "body-b1 tw-text-primary-200" }, toDisplayString(unref(t)("user.settings.profile.completeProfile.subtitle")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<form${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: unref(imageUrl),
              "onUpdate:modelValue": ($event) => isRef(imageUrl) ? imageUrl.value = $event : null,
              raw: unref(imageRaw),
              "onUpdate:raw": ($event) => isRef(imageRaw) ? imageRaw.value = $event : null
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$i, {
              id: "name",
              placeholder: unref(t)("form.chooseYourOwnNickname"),
              label: unref(t)("form.displayName"),
              maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
              "hint-message": unref(t)("form.rules.maxXChars", { max: unref(DISPLAY_NAME_MAX_LENGTH) }),
              "show-word-limit": "",
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$l, {
              size: unref(ButtonSizeOptions).medium,
              variant: unref(ButtonVariantOptions).confirm,
              disabled: unref(isSubmitDisabled),
              loading: unref(isSubmitting),
              type: "submit",
              label: unref(t)("common.buttons.saveAndProceed"),
              class: "tw-w-full tw-mt-10"
            }, null, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                onSubmit: withModifiers(unref(onSubmit), ["prevent"])
              }, [
                createVNode(_sfc_main$2, {
                  modelValue: unref(imageUrl),
                  "onUpdate:modelValue": ($event) => isRef(imageUrl) ? imageUrl.value = $event : null,
                  raw: unref(imageRaw),
                  "onUpdate:raw": ($event) => isRef(imageRaw) ? imageRaw.value = $event : null
                }, null, 8, ["modelValue", "onUpdate:modelValue", "raw", "onUpdate:raw"]),
                createVNode(_sfc_main$i, {
                  id: "name",
                  placeholder: unref(t)("form.chooseYourOwnNickname"),
                  label: unref(t)("form.displayName"),
                  maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
                  "hint-message": unref(t)("form.rules.maxXChars", { max: unref(DISPLAY_NAME_MAX_LENGTH) }),
                  "show-word-limit": "",
                  class: "tw-w-full"
                }, null, 8, ["placeholder", "label", "maxlength", "hint-message"]),
                createVNode(_sfc_main$l, {
                  size: unref(ButtonSizeOptions).medium,
                  variant: unref(ButtonVariantOptions).confirm,
                  disabled: unref(isSubmitDisabled),
                  loading: unref(isSubmitting),
                  type: "submit",
                  label: unref(t)("common.buttons.saveAndProceed"),
                  class: "tw-w-full tw-mt-10"
                }, null, 8, ["size", "variant", "disabled", "loading", "label"])
              ], 40, ["onSubmit"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/components/UserCompleteProfile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=UserCompleteProfile-D4ge_IjV.mjs.map
