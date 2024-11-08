import { useSSRContext, defineComponent, mergeProps, withCtx, unref, renderSlot, createVNode, useModel, openBlock, createBlock, Fragment, renderList, toDisplayString, ref, computed } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { ab as ButtonCategoryOptions, a as useI18n, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions, t as USER_AVATAR_STUMP_PATH, a6 as useToast, aw as IMAGE_STUMP_PATH } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { B as _sfc_main$h, C as _export_sfc, E as useTypedLocale } from './server.mjs';

const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-bg-primary-600 tw-w-1500 tw-h-1500 tw-rounded-full" }, _attrs))}></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/components/UserProfilePresetAvatar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const UserProfilePresetAvatar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const ONE_MB_IN_BYTES = 1 * 1e3 * 1e3;
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DeFileUpload",
  __ssrInlineRender: true,
  props: {
    accept: { default: "image/*" },
    maxFileSize: { default: 5 * ONE_MB_IN_BYTES },
    multiple: { type: Boolean },
    fileLimit: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const input = ref(null);
    function onClick() {
      var _a;
      (_a = input.value) == null ? void 0 : _a.click();
    }
    useI18n();
    useToast();
    useTypedLocale();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><input type="file" hidden${ssrIncludeBooleanAttr(_ctx.multiple) ? " multiple" : ""}${ssrRenderAttr("accept", _ctx.accept)}>`);
      ssrRenderSlot(_ctx.$slots, "header", { chooseCallback: onClick }, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/upload/DeFileUpload.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const AVAILABLE_IMAGE_FORMATS = ".jpg, .png, .jpeg";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UploadButton",
  __ssrInlineRender: true,
  props: {
    showChooseIcon: { type: Boolean, default: true },
    chooseIcon: { default: "upload-cloud" },
    chooseLabelKey: { default: "common.buttons.upload" },
    accept: { default: AVAILABLE_IMAGE_FORMATS },
    buttonCategory: { default: ButtonCategoryOptions.primary },
    multiple: { type: Boolean },
    fileLimit: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const { t } = useI18n();
    const emit = __emit;
    const onSelect = (file) => {
      emit("change", file);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$3, mergeProps({
        "choose-icon": _ctx.chooseIcon,
        accept: _ctx.accept,
        multiple: _ctx.multiple,
        "file-limit": _ctx.fileLimit,
        onSelect
      }, _attrs), {
        header: withCtx(({ chooseCallback }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "header", {
              scope: { chooseCallback }
            }, () => {
              _push2(ssrRenderComponent(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).confirm,
                category: _ctx.buttonCategory,
                size: unref(ButtonSizeOptions).medium,
                icon: _ctx.showChooseIcon ? _ctx.chooseIcon : void 0,
                "icon-class": _ctx.showChooseIcon ? "tw-w-3 tw-h-3 tw-mr-2" : void 0,
                label: unref(t)(_ctx.chooseLabelKey),
                class: "tw-w-full",
                onClick: chooseCallback
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "header", {
                scope: { chooseCallback }
              }, () => [
                createVNode(_sfc_main$l, {
                  variant: unref(ButtonVariantOptions).confirm,
                  category: _ctx.buttonCategory,
                  size: unref(ButtonSizeOptions).medium,
                  icon: _ctx.showChooseIcon ? _ctx.chooseIcon : void 0,
                  "icon-class": _ctx.showChooseIcon ? "tw-w-3 tw-h-3 tw-mr-2" : void 0,
                  label: unref(t)(_ctx.chooseLabelKey),
                  class: "tw-w-full",
                  onClick: chooseCallback
                }, null, 8, ["variant", "category", "size", "icon", "icon-class", "label", "onClick"])
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/upload/UploadButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UploadImageWithButton",
  __ssrInlineRender: true,
  props: {
    imageUrl: {},
    imageClass: { default: "tw-h-2000 tw-w-2000" },
    imageWrapClass: {},
    uploadBtnClass: {},
    type: { default: "circle" },
    isLoading: { type: Boolean },
    fallbackImg: {},
    accept: {},
    hintMessage: {},
    buttonCategory: {},
    chooseLabelKey: {},
    showChooseIcon: { type: Boolean, default: true }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fallbackImgSrc = computed(() => {
      return props.fallbackImg || IMAGE_STUMP_PATH;
    });
    function onChange(file) {
      emit("change", file);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["upload-image-with-button", `upload-image-with-button-${_ctx.type}`]
      }, _attrs))}><div class="${ssrRenderClass([_ctx.imageWrapClass, "upload-image-with-button-image-wrap"])}">`);
      if (_ctx.imageUrl) {
        _push(`<img class="${ssrRenderClass([_ctx.imageClass, "upload-image-with-button-image"])}"${ssrRenderAttr("src", _ctx.imageUrl)}>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<img style="${ssrRenderStyle(fallbackImgSrc.value && !_ctx.imageUrl ? null : { display: "none" })}" class="${ssrRenderClass([_ctx.imageClass, "upload-image-with-button-image"])}"${ssrRenderAttr("src", fallbackImgSrc.value)}></div>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        accept: _ctx.accept,
        "button-category": _ctx.buttonCategory,
        "choose-label-key": _ctx.chooseLabelKey,
        "show-choose-icon": _ctx.showChooseIcon,
        class: _ctx.uploadBtnClass,
        onChange
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "hint", {}, () => {
        _push(`<p class="body-b1">${ssrInterpolate(_ctx.hintMessage)}</p>`);
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/upload/UploadImageWithButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const useFilesUpload = () => {
  const uploadFilesEntities = ref([]);
  const deleteUploadedFile = (index) => {
    uploadFilesEntities.value = uploadFilesEntities.value.filter(
      (_, currentIndex) => index !== currentIndex
    );
  };
  const uploadFiles = (files) => {
    files.forEach((f) => {
      const imageUrl = URL.createObjectURL(f);
      const data = new FormData();
      data.append("profile_picture", f);
      const current = {
        raw: data,
        imageUrl
      };
      uploadFilesEntities.value = [...uploadFilesEntities.value, current];
    });
  };
  return {
    uploadFiles,
    uploadFilesEntities,
    deleteUploadedFile
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserProfileAvatarUploader",
  __ssrInlineRender: true,
  props: {
    "modelValue": { required: true },
    "modelModifiers": {},
    "raw": {},
    "rawModifiers": {}
  },
  emits: ["update:modelValue", "update:raw"],
  setup(__props) {
    const { t } = useI18n();
    const tabs = [
      {
        id: "presetAvatar",
        title: t("user.settings.profile.completeProfile.presetAvatar")
      }
    ];
    const hintList = [
      "user.settings.profile.completeProfile.hint.0",
      "user.settings.profile.completeProfile.hint.1",
      "user.settings.profile.completeProfile.hint.2"
    ];
    const model = useModel(__props, "modelValue");
    const modelRaw = useModel(__props, "raw");
    const { uploadFiles, deleteUploadedFile, uploadFilesEntities } = useFilesUpload();
    function onImageUpload(file) {
      var _a, _b;
      deleteUploadedFile(0);
      uploadFiles([file]);
      model.value = (_a = uploadFilesEntities.value[0]) == null ? void 0 : _a.imageUrl;
      modelRaw.value = (_b = uploadFilesEntities.value[0]) == null ? void 0 : _b.raw;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h2 class="heading-h5 tw-mb-4">${ssrInterpolate(unref(t)("form.yourX", { field: "common.avatar" }))}</h2><form>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "image-url": model.value,
        "fallback-img": unref(USER_AVATAR_STUMP_PATH),
        class: "tw-justify-between",
        onChange: onImageUpload
      }, {
        hint: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="tw-list-disc tw-list-inside tw-mt-4.5 tw-mb-2 body-b1"${_scopeId}><!--[-->`);
            ssrRenderList(hintList, (item, idx) => {
              _push2(`<li${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t)(item))}</span></li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "tw-list-disc tw-list-inside tw-mt-4.5 tw-mb-2 body-b1" }, [
                (openBlock(), createBlock(Fragment, null, renderList(hintList, (item, idx) => {
                  return createVNode("li", { key: idx }, [
                    createVNode("span", null, toDisplayString(unref(t)(item)), 1)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$h, {
        tabs,
        class: "tw-text-accent-500",
        "header-icon-position": "end",
        "header-icon-class": "!tw-text-accent-500"
      }, {
        header: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="heading-h5"${_scopeId}>${ssrInterpolate(item.title)}</div>`);
          } else {
            return [
              createVNode("div", { class: "heading-h5" }, toDisplayString(item.title), 1)
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="tw-flex tw-justify-between tw-gap-4 tw-mt-6"${_scopeId}><!--[-->`);
            ssrRenderList(7, (i) => {
              _push2(`<li${_scopeId}>`);
              _push2(ssrRenderComponent(UserProfilePresetAvatar, null, null, _parent2, _scopeId));
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "tw-flex tw-justify-between tw-gap-4 tw-mt-6" }, [
                (openBlock(), createBlock(Fragment, null, renderList(7, (i) => {
                  return createVNode("li", { key: i }, [
                    createVNode(UserProfilePresetAvatar)
                  ]);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/components/UserProfileAvatarUploader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=UserProfileAvatarUploader-CzRx3hcf.mjs.map
