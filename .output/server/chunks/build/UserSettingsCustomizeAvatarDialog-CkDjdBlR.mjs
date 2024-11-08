import { defineComponent, useModel, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { a as useI18n, v as useNuxtApp, c as useUserStore, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { _ as _sfc_main$2 } from './UserProfileAvatarUploader-CzRx3hcf.mjs';
import { U as UserService } from './server.mjs';
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
  __name: "UserSettingsCustomizeAvatarDialog",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean, ...{ required: true } },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const { t } = useI18n();
    const { $customFetch } = useNuxtApp();
    const userStore = useUserStore();
    const isVisible = useModel(__props, "modelValue");
    const profilePhoto = ref(userStore.user.profile.photo);
    const profilePhotoRaw = ref(null);
    const isSubmitting = ref(false);
    const userRepository = UserService($customFetch);
    async function onSubmit() {
      isSubmitting.value = true;
      if (!profilePhotoRaw.value)
        return;
      try {
        const data = await userRepository.uploadUserPhoto(profilePhotoRaw.value);
        userStore.updateUserPhoto(data.path);
        isVisible.value = false;
      } finally {
        isSubmitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        visible: isVisible.value,
        "onUpdate:visible": ($event) => isVisible.value = $event,
        class: "tw-w-[600px]"
      }, _attrs), {
        header: withCtx(({ props }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="${ssrRenderClass(props.class)}"${_scopeId}>${ssrInterpolate(unref(t)("user.settings.profile.customizeYourAvatar.title"))}</h2><p class="body-b1 tw-text-primary-200 tw-whitespace-break-spaces tw-mt-4"${_scopeId}>${ssrInterpolate(unref(t)("user.settings.profile.customizeYourAvatar.subtitle"))}</p>`);
          } else {
            return [
              createVNode("h2", {
                class: props.class
              }, toDisplayString(unref(t)("user.settings.profile.customizeYourAvatar.title")), 3),
              createVNode("p", { class: "body-b1 tw-text-primary-200 tw-whitespace-break-spaces tw-mt-4" }, toDisplayString(unref(t)("user.settings.profile.customizeYourAvatar.subtitle")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              modelValue: profilePhoto.value,
              "onUpdate:modelValue": ($event) => profilePhoto.value = $event,
              raw: profilePhotoRaw.value,
              "onUpdate:raw": ($event) => profilePhotoRaw.value = $event,
              loading: isSubmitting.value
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$l, {
              type: "submit",
              variant: unref(ButtonVariantOptions).confirm,
              size: unref(ButtonSizeOptions).medium,
              label: _ctx.$t("common.buttons.submit"),
              loading: isSubmitting.value,
              disabled: !profilePhotoRaw.value,
              class: "tw-w-full tw-mt-10",
              onClick: onSubmit
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                modelValue: profilePhoto.value,
                "onUpdate:modelValue": ($event) => profilePhoto.value = $event,
                raw: profilePhotoRaw.value,
                "onUpdate:raw": ($event) => profilePhotoRaw.value = $event,
                loading: isSubmitting.value
              }, null, 8, ["modelValue", "onUpdate:modelValue", "raw", "onUpdate:raw", "loading"]),
              createVNode(_sfc_main$l, {
                type: "submit",
                variant: unref(ButtonVariantOptions).confirm,
                size: unref(ButtonSizeOptions).medium,
                label: _ctx.$t("common.buttons.submit"),
                loading: isSubmitting.value,
                disabled: !profilePhotoRaw.value,
                class: "tw-w-full tw-mt-10",
                onClick: onSubmit
              }, null, 8, ["variant", "size", "label", "loading", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/settings/profile/components/UserSettingsCustomizeAvatarDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=UserSettingsCustomizeAvatarDialog-CkDjdBlR.mjs.map
