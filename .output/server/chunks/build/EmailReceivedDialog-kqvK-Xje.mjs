import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, unref, toDisplayString, openBlock, createBlock, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { I as maskEmail } from './server.mjs';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { a as useI18n, _ as _sfc_main$m } from './chunk-pg-(articles)-D5MrPPlE.mjs';
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
import './dialog.esm-ClGlMgQg.mjs';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isToday.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EmailReceivedDialog",
  __ssrInlineRender: true,
  props: {
    email: {},
    showHint: { type: Boolean }
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ "header-class": "tw-pb-0" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-w-16 tw-h-16 tw-bg-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "mail-check",
              class: "tw-w-800 tw-h-800 tw-text-accent-500"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tw-w-16 tw-h-16 tw-bg-primary-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-mx-auto" }, [
                createVNode(_sfc_main$m, {
                  name: "mail-check",
                  class: "tw-w-800 tw-h-800 tw-text-accent-500"
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="heading-h2 tw-text-center tw-mb-4"${_scopeId}>${ssrInterpolate(unref(t)("auth.emailReceivedDialog.title"))}</h1>`);
            if (_ctx.showHint) {
              _push2(`<p class="tw-text-center tw-text-primary-200 body-b1 tw-mb-4"${_scopeId}>${ssrInterpolate(unref(t)("auth.emailReceivedDialog.hint"))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_i18n_t, {
              keypath: "auth.emailReceivedDialog.subtitle",
              tag: "p",
              class: "tw-text-center tw-text-primary-200 body-b1",
              scope: "global"
            }, {
              email: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="tw-text-accent-500 tw-font-bold"${_scopeId2}>${ssrInterpolate(unref(maskEmail)(_ctx.email))}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "tw-text-accent-500 tw-font-bold" }, toDisplayString(unref(maskEmail)(_ctx.email)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<p class="tw-text-center tw-text-primary-200 body-b1 tw-mt-4"${_scopeId}>${ssrInterpolate(unref(t)("auth.emailReceivedDialog.text"))}</p>`);
            ssrRenderSlot(_ctx.$slots, "submitButton", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("h1", { class: "heading-h2 tw-text-center tw-mb-4" }, toDisplayString(unref(t)("auth.emailReceivedDialog.title")), 1),
              _ctx.showHint ? (openBlock(), createBlock("p", {
                key: 0,
                class: "tw-text-center tw-text-primary-200 body-b1 tw-mb-4"
              }, toDisplayString(unref(t)("auth.emailReceivedDialog.hint")), 1)) : createCommentVNode("", true),
              createVNode(_component_i18n_t, {
                keypath: "auth.emailReceivedDialog.subtitle",
                tag: "p",
                class: "tw-text-center tw-text-primary-200 body-b1",
                scope: "global"
              }, {
                email: withCtx(() => [
                  createVNode("span", { class: "tw-text-accent-500 tw-font-bold" }, toDisplayString(unref(maskEmail)(_ctx.email)), 1)
                ]),
                _: 1
              }),
              createVNode("p", { class: "tw-text-center tw-text-primary-200 body-b1 tw-mt-4" }, toDisplayString(unref(t)("auth.emailReceivedDialog.text")), 1),
              renderSlot(_ctx.$slots, "submitButton")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/dialogs/EmailReceivedDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=EmailReceivedDialog-kqvK-Xje.mjs.map
