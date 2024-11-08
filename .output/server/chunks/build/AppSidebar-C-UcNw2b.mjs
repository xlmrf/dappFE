import { useSSRContext, defineComponent, defineAsyncComponent, ref, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, Fragment, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { b as useAppStore, a5 as useAuthStore, a1 as _sfc_main$l, ab as ButtonCategoryOptions, aa as ButtonVariantOptions, a2 as ButtonSizeOptions, V as AuthTab, c as useUserStore, at as ButtonIconPositionOptions, _ as _sfc_main$m } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$3 } from './AppLogo-nf5qLJNl.mjs';
import { _ as _sfc_main$4 } from './AppMainMenu-xpd5N17_.mjs';
import { _ as _sfc_main$6 } from './SocialsList-U76nsQei.mjs';
import { _ as _sfc_main$7 } from './SelectCurrencyList-B96zD89i.mjs';
import { _ as _sfc_main$2 } from './DeSidebar-CwFoj49S.mjs';
import { _ as _sfc_main$5 } from './LanguageSwitcher-BexZ-A2o.mjs';
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
import './chunk-pg-ranking-Cp9KKVZQ.mjs';
import './sidebar.esm-DjOWB8MN.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SelectCurrencyTab",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const isVisible = ref(false);
    const toggleTabState = (isOpen) => {
      isVisible.value = isOpen;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$l, {
        class: "tw-justify-between tw-px-2.5 hover:tw-ring-primary-700 hover:tw-bg-primary-700",
        label: unref(userStore).user.currencyShortName,
        "icon-pos": unref(ButtonIconPositionOptions).right,
        icon: "chevron-down-filled",
        "icon-class": "tw-w-300 tw-h-300 tw-ml-1",
        onClick: ($event) => toggleTabState(true)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, {
        visible: isVisible.value,
        "onUpdate:visible": ($event) => isVisible.value = $event,
        "show-close-icon": false,
        position: "right"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-flex"${_scopeId}><button class="tw-mr-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "chevron-down",
              class: "tw-w-600 tw-h-600 tw-text-primary-400 tw-transform tw-rotate-90"
            }, null, _parent2, _scopeId));
            _push2(`</button><div class="heading-h3"${_scopeId}>${ssrInterpolate(_ctx.$t("common.selectCurrency"))}</div></div>`);
          } else {
            return [
              createVNode("div", { class: "tw-flex" }, [
                createVNode("button", {
                  class: "tw-mr-6",
                  onClick: ($event) => toggleTabState(false)
                }, [
                  createVNode(_sfc_main$m, {
                    name: "chevron-down",
                    class: "tw-w-600 tw-h-600 tw-text-primary-400 tw-transform tw-rotate-90"
                  })
                ], 8, ["onClick"]),
                createVNode("div", { class: "heading-h3" }, toDisplayString(_ctx.$t("common.selectCurrency")), 1)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, {
              class: "tw--mt-2.5",
              onCurrencyChange: ($event) => toggleTabState(false)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$7, {
                class: "tw--mt-2.5",
                onCurrencyChange: ($event) => toggleTabState(false)
              }, null, 8, ["onCurrencyChange"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/select-currency/SelectCurrencyTab.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const AppUserMenu = defineAsyncComponent(() => import('./AppUserMenu-ATPhV3yc.mjs'));
    const store = useAppStore();
    const authStore = useAuthStore();
    const isVisible = ref(false);
    function onMenuToggle() {
      isVisible.value = !isVisible.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-card tw-flex tw-justify-content-center tw-items-center" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        visible: isVisible.value,
        "onUpdate:visible": ($event) => isVisible.value = $event,
        position: "right",
        modal: ""
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              class: "tw-flex-col tw-px-2",
              onNavigate: onMenuToggle
            }, null, _parent2, _scopeId));
            _push2(`<hr class="tw-my-7.5 tw-text-primary-600 tw-mx-2"${_scopeId}>`);
            if (unref(authStore).isLoggedIn) {
              _push2(ssrRenderComponent(unref(AppUserMenu), {
                "menu-item-classes": "tw-p-2",
                "header-classes": "tw-pb-1.5",
                onNavigate: onMenuToggle
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_sfc_main$l, {
                category: unref(ButtonCategoryOptions).secondary,
                variant: unref(ButtonVariantOptions).confirm,
                size: unref(ButtonSizeOptions).medium,
                label: _ctx.$t("common.buttons.logIn"),
                class: "tw-w-full tw-mb-2.5",
                onClick: ($event) => unref(store).toggleAuthDialog(unref(AuthTab).login, true)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).confirm,
                size: unref(ButtonSizeOptions).medium,
                label: _ctx.$t("common.buttons.signUp"),
                class: "tw-w-full",
                onClick: ($event) => unref(store).toggleAuthDialog(unref(AuthTab).signUp, true)
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
            _push2(`<hr class="tw-my-7.5 tw-mx-2 tw-text-primary-600"${_scopeId}><div class="tw-grid tw-grid-cols-2 tw-gap-4 tw-my-7.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$5, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$6, {
              center: "",
              class: "tw-flex-wrap"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_sfc_main$4, {
                  class: "tw-flex-col tw-px-2",
                  onNavigate: onMenuToggle
                }),
                createVNode("hr", { class: "tw-my-7.5 tw-text-primary-600 tw-mx-2" }),
                unref(authStore).isLoggedIn ? (openBlock(), createBlock(unref(AppUserMenu), {
                  key: 0,
                  "menu-item-classes": "tw-p-2",
                  "header-classes": "tw-pb-1.5",
                  onNavigate: onMenuToggle
                })) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                  createVNode(_sfc_main$l, {
                    category: unref(ButtonCategoryOptions).secondary,
                    variant: unref(ButtonVariantOptions).confirm,
                    size: unref(ButtonSizeOptions).medium,
                    label: _ctx.$t("common.buttons.logIn"),
                    class: "tw-w-full tw-mb-2.5",
                    onClick: ($event) => unref(store).toggleAuthDialog(unref(AuthTab).login, true)
                  }, null, 8, ["category", "variant", "size", "label", "onClick"]),
                  createVNode(_sfc_main$l, {
                    variant: unref(ButtonVariantOptions).confirm,
                    size: unref(ButtonSizeOptions).medium,
                    label: _ctx.$t("common.buttons.signUp"),
                    class: "tw-w-full",
                    onClick: ($event) => unref(store).toggleAuthDialog(unref(AuthTab).signUp, true)
                  }, null, 8, ["variant", "size", "label", "onClick"])
                ], 64)),
                createVNode("hr", { class: "tw-my-7.5 tw-mx-2 tw-text-primary-600" }),
                createVNode("div", { class: "tw-grid tw-grid-cols-2 tw-gap-4 tw-my-7.5" }, [
                  createVNode(_sfc_main$5),
                  createVNode(_sfc_main$1)
                ]),
                createVNode(_sfc_main$6, {
                  center: "",
                  class: "tw-flex-wrap"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        class: "menu-switcher tw-bg-primary-600 [@media(min-width:1140px)]:tw-hidden",
        onClick: onMenuToggle
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}></span><span${_scopeId}></span><span${_scopeId}></span>`);
          } else {
            return [
              createVNode("span"),
              createVNode("span"),
              createVNode("span")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/AppSidebar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AppSidebar-C-UcNw2b.mjs.map
