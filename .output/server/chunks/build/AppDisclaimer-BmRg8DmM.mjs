import { useSSRContext, defineComponent, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { e as _sfc_main$b } from './chunk-pg-(articles)-D5MrPPlE.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeClampedText",
  __ssrInlineRender: true,
  setup(__props) {
    const textContainer = ref(null);
    const isOverflowing = ref(false);
    const isOpen = ref(false);
    function onShowMoreClick() {
      isOpen.value = !isOpen.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        ref_key: "textContainer",
        ref: textContainer,
        class: ["show-more-wrapper", {
          "tw-line-clamp-[--line-clamp]": !isOpen.value
        }]
      }, _attrs))}>`);
      if (!isOpen.value && isOverflowing.value) {
        _push(ssrRenderComponent(_sfc_main$b, {
          type: "link",
          label: _ctx.$t("common.buttons.readMore"),
          class: "show-more",
          onClick: onShowMoreClick
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (isOverflowing.value) {
        _push(`<button class="tw-text-primary-300 tw-font-semibold tw-text-300 tw-leading-400 tw-underline tw-ml-1">${ssrInterpolate(_ctx.$t("common.buttons.showLess"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/DeClampedText.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppDisclaimer",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-p-4 md:tw-px-5 lg:tw-px-10 tw-bg-primary-800" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "tw-text-primary-300 tw-text-300" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="tw-uppercase tw-text-white tw-leading-400"${_scopeId}>${ssrInterpolate(_ctx.$t("common.disclaimer.label"))}: </span> ${ssrInterpolate(_ctx.$t("common.disclaimer.content"))}`);
          } else {
            return [
              createVNode("span", { class: "tw-uppercase tw-text-white tw-leading-400" }, toDisplayString(_ctx.$t("common.disclaimer.label")) + ": ", 1),
              createTextVNode(" " + toDisplayString(_ctx.$t("common.disclaimer.content")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/AppDisclaimer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AppDisclaimer-BmRg8DmM.mjs.map
