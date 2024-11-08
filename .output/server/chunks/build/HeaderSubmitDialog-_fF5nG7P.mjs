import { b as useAppStore, _ as _sfc_main$m, V as AuthTab } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { defineComponent, computed, mergeProps, withCtx, createVNode, toDisplayString, unref, resolveDynamicComponent, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { s as submitDialogButtonsConfig } from './entry-styles-1.mjs-DgBF4tXX.mjs';
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
  __name: "HeaderSubmitDialog",
  __ssrInlineRender: true,
  setup(__props) {
    const listItemComponent = computed(() => {
      return "button";
    });
    const store = useAppStore();
    const onSubmitBtnClick = () => {
      store.toggleAuthDialog(AuthTab.login, true);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ class: "sm:tw-w-[525px]" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="heading-h2 tw-mb-1.5"${_scopeId}>${ssrInterpolate(_ctx.$t("common.submitDialog.title"))}</h1><p class="body-b1 tw-text-primary-300"${_scopeId}>${ssrInterpolate(_ctx.$t("common.submitDialog.subtitle"))}</p>`);
          } else {
            return [
              createVNode("h1", { class: "heading-h2 tw-mb-1.5" }, toDisplayString(_ctx.$t("common.submitDialog.title")), 1),
              createVNode("p", { class: "body-b1 tw-text-primary-300" }, toDisplayString(_ctx.$t("common.submitDialog.subtitle")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<ul class="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(submitDialogButtonsConfig), (item) => {
              _push2(`<li class="tw-w-full"${_scopeId}>`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(listItemComponent.value), {
                class: "tw-flex sm:tw-flex-col tw-items-center sm:tw-justify-center tw-gap-3 tw-w-full tw-bg-primary-700 hover:tw-bg-primary-600 tw-transition-all tw-p-6 tw-cursor-pointer",
                to: item.href,
                onClick: ($event) => onSubmitBtnClick()
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$m, {
                      name: item.icon,
                      class: "tw-w-6 tw-h-6 tw-text-primary-400"
                    }, null, _parent3, _scopeId2));
                    _push3(`<span class="tw-leading-500"${_scopeId2}>${ssrInterpolate(_ctx.$t(item.label))}</span>`);
                  } else {
                    return [
                      createVNode(_sfc_main$m, {
                        name: item.icon,
                        class: "tw-w-6 tw-h-6 tw-text-primary-400"
                      }, null, 8, ["name"]),
                      createVNode("span", { class: "tw-leading-500" }, toDisplayString(_ctx.$t(item.label)), 1)
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
              _push2(`</li>`);
            });
            _push2(`<!--]--></ul>`);
          } else {
            return [
              createVNode("ul", { class: "tw-flex tw-flex-col sm:tw-flex-row tw-gap-4" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(submitDialogButtonsConfig), (item) => {
                  return openBlock(), createBlock("li", {
                    key: item.id,
                    class: "tw-w-full"
                  }, [
                    (openBlock(), createBlock(resolveDynamicComponent(listItemComponent.value), {
                      class: "tw-flex sm:tw-flex-col tw-items-center sm:tw-justify-center tw-gap-3 tw-w-full tw-bg-primary-700 hover:tw-bg-primary-600 tw-transition-all tw-p-6 tw-cursor-pointer",
                      to: item.href,
                      onClick: ($event) => onSubmitBtnClick()
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$m, {
                          name: item.icon,
                          class: "tw-w-6 tw-h-6 tw-text-primary-400"
                        }, null, 8, ["name"]),
                        createVNode("span", { class: "tw-leading-500" }, toDisplayString(_ctx.$t(item.label)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to", "onClick"]))
                  ]);
                }), 128))
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/header/HeaderSubmitDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HeaderSubmitDialog-_fF5nG7P.mjs.map
