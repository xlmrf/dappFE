import { useSSRContext, defineComponent, defineAsyncComponent, ref, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, Fragment, computed, onServerPrefetch, watch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { b as useAppStore, a5 as useAuthStore, c as useUserStore, o as _sfc_main$k, a1 as _sfc_main$l, aa as ButtonVariantOptions, ab as ButtonCategoryOptions, V as AuthTab, at as ButtonIconPositionOptions, a as useI18n, v as useNuxtApp, I as TWENTY_FOUR_HOURS_IN_MILLISECONDS } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$4 } from './LanguageSwitcher-BexZ-A2o.mjs';
import _sfc_main$5 from './AppUserMenu-ATPhV3yc.mjs';
import { q as _sfc_main$b, r as useDevice, n as useLogin, t as formatPrice, v as formatNumber } from './server.mjs';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'node:url';
import 'vue-router';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SelectCurrency",
  __ssrInlineRender: true,
  setup(__props) {
    const SelectCurrencyDialog = defineAsyncComponent(
      () => import('./SelectCurrencyDialog-CdwWXzrI.mjs')
    );
    const userStore = useUserStore();
    const isVisible = ref(false);
    const shouldDialogShow = ref(false);
    const onCurrencySwitcherClick = () => {
      shouldDialogShow.value = true;
      isVisible.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$l, {
        class: "tw-text-primary-400 tw-ring-0 hover:tw-bg-inherit",
        label: unref(userStore).user.currencyShortName,
        icon: "chevron-down-filled",
        "icon-pos": unref(ButtonIconPositionOptions).right,
        "icon-class": "tw-w-300 tw-h-300 tw-text-primary-50 tw-ml-1",
        onClick: onCurrencySwitcherClick
      }, null, _parent));
      if (shouldDialogShow.value) {
        _push(ssrRenderComponent(unref(SelectCurrencyDialog), {
          modelValue: isVisible.value,
          "onUpdate:modelValue": ($event) => isVisible.value = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/select-currency/SelectCurrency.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const globalStatsKeys = {
  all: [{ scope: "globalStats" }],
  header: (currency) => [{ ...globalStatsKeys.all[0], entity: "header", currency }]
};
function formatGlobalStatisticsModel(model, locale, currency) {
  var _a, _b, _c, _d, _e;
  const format = (number, isPrice) => {
    const options = {
      notation: "compact",
      maximumFractionDigits: 2
    };
    if (isPrice)
      return formatPrice(number, locale, currency, options);
    return formatNumber(number, locale, options);
  };
  return {
    dappsFormatted: format((_a = model.dapps) != null ? _a : 0),
    blockchainsFormatted: format((_b = model.blockchains) != null ? _b : 0),
    activeUsersFormatted: format((_c = model.activeUsers) != null ? _c : 0),
    volume30dFormatted: format((_d = model.volume30d) != null ? _d : 0, true),
    transactions30dFormatted: format((_e = model.transactions30d) != null ? _e : 0, true)
  };
}
function createGlobalStatisticsModel(raw, locale, currency) {
  var _a, _b, _c, _d, _e;
  const baseModel = {
    dapps: (_a = raw.dapps) != null ? _a : 0,
    blockchains: (_b = raw.blockchains) != null ? _b : 0,
    activeUsers: (_c = raw.active_users) != null ? _c : 0,
    volume30d: (_d = raw["30d_volume"]) != null ? _d : 0,
    transactions30d: (_e = raw["30d_transactions"]) != null ? _e : 0
  };
  return {
    ...baseModel,
    ...formatGlobalStatisticsModel(baseModel, locale, currency)
  };
}
const GlobalStatisticsService = (fetch) => ({
  async getInfo({
    queryKey: [{ currency }]
  }, locale) {
    const data = await fetch("api/board/header-summary-info", {
      credentials: "include"
    });
    return createGlobalStatisticsModel(data.header_summary_data, locale, currency);
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "GlobalStatistics",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    const appStore = useAppStore();
    const { t } = useI18n();
    const { isDesktop } = useDevice();
    const isGreaterThan1140 = ref(false);
    const { $customFetch } = useNuxtApp();
    const GlobalStatisticsRepo = GlobalStatisticsService($customFetch);
    const {
      data: statistics,
      refetch,
      isLoading
    } = useQuery({
      queryKey: computed(() => globalStatsKeys.header(userStore.user.currencyShortName)),
      queryFn: async (queryKey) => await GlobalStatisticsRepo.getInfo(queryKey, appStore.locale),
      staleTime: TWENTY_FOUR_HOURS_IN_MILLISECONDS,
      enabled: computed(() => isDesktop || isGreaterThan1140.value)
    });
    onServerPrefetch(async () => {
      if (isDesktop) {
        await refetch();
      }
    });
    const headerStats = computed(() => {
      var _a2, _b2, _c2, _d2, _e2;
      var _a, _b, _c, _d, _e;
      return {
        dapps: {
          value: (_a2 = (_a = statistics.value) == null ? void 0 : _a.dappsFormatted) != null ? _a2 : null,
          label: t("common.globalStats.dapps")
        },
        blockchains: {
          value: (_b2 = (_b = statistics.value) == null ? void 0 : _b.blockchainsFormatted) != null ? _b2 : null,
          label: t("common.globalStats.blockchains")
        },
        activeUsers: {
          value: (_c2 = (_c = statistics.value) == null ? void 0 : _c.activeUsersFormatted) != null ? _c2 : null,
          label: t("common.globalStats.activeUsers")
        },
        volume30d: {
          value: (_d2 = (_d = statistics.value) == null ? void 0 : _d.volume30dFormatted) != null ? _d2 : null,
          label: t("common.globalStats.volume30d")
        },
        transactions30d: {
          value: (_e2 = (_e = statistics.value) == null ? void 0 : _e.transactions30dFormatted) != null ? _e2 : null,
          label: t("common.globalStats.transactions30d")
        }
      };
    });
    const queryClient = useQueryClient();
    const updateCache = (locale) => {
      queryClient.setQueryData(
        globalStatsKeys.header(userStore.user.currencyShortName),
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              ...formatGlobalStatisticsModel(oldData, locale, userStore.user.currencyShortName)
            };
          }
          return oldData;
        }
      );
    };
    watch(
      () => appStore.locale,
      (val) => {
        updateCache(val);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-items-center tw-gap-8" }, _attrs))}><!--[-->`);
      ssrRenderList(headerStats.value, (item) => {
        _push(`<li class="tw-flex tw-gap-2.5 tw-items-center tw-justify-center tw-text-225 tw-font-semibold tw-tracking-widest tw-leading-300"><span class="tw-uppercase tw-whitespace-nowrap">${ssrInterpolate(item.label)}: </span>`);
        _push(ssrRenderComponent(_sfc_main$b, {
          style: unref(isLoading) ? null : { display: "none" },
          class: "!tw-w-800 tw-flex-shrink-0 !tw-bg-primary-500"
        }, null, _parent));
        _push(`<span style="${ssrRenderStyle(!unref(isLoading) ? null : { display: "none" })}" class="tw-text-accent-500">${ssrInterpolate(item.value)}</span></li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/global-stats/components/GlobalStatistics.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeAuthState",
  __ssrInlineRender: true,
  setup(__props) {
    const { authReadyState } = useLogin();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(authReadyState)) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      } else {
        ssrRenderSlot(_ctx.$slots, "placeholder", {}, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/DeAuthState.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HeaderTopBar",
  __ssrInlineRender: true,
  setup(__props) {
    const DeOverlayPanel = defineAsyncComponent(
      () => import('./DeOverlayPanel-Bg8dzZvW.mjs')
    );
    const store = useAppStore();
    const authStore = useAuthStore();
    const userStore = useUserStore();
    function onAuthButtonClick(activeTab) {
      store.toggleAuthDialog(activeTab);
    }
    const userMenu = ref();
    function toggleUserMenu(event) {
      if (!userMenu.value)
        return;
      userMenu.value.toggle(event);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-justify-between tw-px-10 tw-py-2.5 tw-bg-primary-700 tw-border-b-2 tw-border-primary-800" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="tw-flex tw-gap-2.5">`);
      _push(ssrRenderComponent(_sfc_main$1, null, {
        placeholder: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-flex tw-gap-x-2.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$b, {
              "size-classes": "tw-w-2000 tw-h-750",
              class: "tw-mr-2.5"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              "size-classes": "tw-w-2400 tw-h-750",
              class: "tw-mr-2.5"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$b, {
              "size-classes": "tw-w-5200 tw-h-750",
              class: "tw-mr-2.5"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tw-flex tw-gap-x-2.5" }, [
                createVNode(_sfc_main$b, {
                  "size-classes": "tw-w-2000 tw-h-750",
                  class: "tw-mr-2.5"
                }),
                createVNode(_sfc_main$b, {
                  "size-classes": "tw-w-2400 tw-h-750",
                  class: "tw-mr-2.5"
                }),
                createVNode(_sfc_main$b, {
                  "size-classes": "tw-w-5200 tw-h-750",
                  class: "tw-mr-2.5"
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-flex tw-items-center tw-gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, { "panel-class": "tw-w-2400" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(authStore).isLoggedIn) {
              _push2(`<!--[--><button class="tw-flex"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$k, {
                src: unref(userStore).user.profile.photo
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
              _push2(ssrRenderComponent(unref(DeOverlayPanel), {
                ref_key: "userMenu",
                ref: userMenu,
                class: "tw-w-80"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$5, {
                      "menu-item-classes": "tw-p-2",
                      "header-classes": "tw-border-b tw-border-primary-600",
                      onNavigate: toggleUserMenu
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$5, {
                        "menu-item-classes": "tw-p-2",
                        "header-classes": "tw-border-b tw-border-primary-600",
                        onNavigate: toggleUserMenu
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<!--]-->`);
            } else {
              _push2(`<!--[-->`);
              _push2(ssrRenderComponent(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).confirm,
                category: unref(ButtonCategoryOptions).secondary,
                label: _ctx.$t("common.buttons.logIn"),
                onClick: ($event) => onAuthButtonClick(unref(AuthTab).login)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$l, {
                variant: unref(ButtonVariantOptions).confirm,
                label: _ctx.$t("common.buttons.signUp"),
                onClick: ($event) => onAuthButtonClick(unref(AuthTab).signUp)
              }, null, _parent2, _scopeId));
              _push2(`<!--]-->`);
            }
          } else {
            return [
              createVNode("div", { class: "tw-flex tw-items-center tw-gap-1" }, [
                createVNode(_sfc_main$3),
                createVNode(_sfc_main$4, { "panel-class": "tw-w-2400" })
              ]),
              unref(authStore).isLoggedIn ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createVNode("button", {
                  class: "tw-flex",
                  onClick: toggleUserMenu
                }, [
                  createVNode(_sfc_main$k, {
                    src: unref(userStore).user.profile.photo
                  }, null, 8, ["src"])
                ]),
                createVNode(unref(DeOverlayPanel), {
                  ref_key: "userMenu",
                  ref: userMenu,
                  class: "tw-w-80"
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$5, {
                      "menu-item-classes": "tw-p-2",
                      "header-classes": "tw-border-b tw-border-primary-600",
                      onNavigate: toggleUserMenu
                    })
                  ]),
                  _: 1
                }, 512)
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createVNode(_sfc_main$l, {
                  variant: unref(ButtonVariantOptions).confirm,
                  category: unref(ButtonCategoryOptions).secondary,
                  label: _ctx.$t("common.buttons.logIn"),
                  onClick: ($event) => onAuthButtonClick(unref(AuthTab).login)
                }, null, 8, ["variant", "category", "label", "onClick"]),
                createVNode(_sfc_main$l, {
                  variant: unref(ButtonVariantOptions).confirm,
                  label: _ctx.$t("common.buttons.signUp"),
                  onClick: ($event) => onAuthButtonClick(unref(AuthTab).signUp)
                }, null, 8, ["variant", "label", "onClick"])
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/header/HeaderTopBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HeaderTopBar-C3yuotEY.mjs.map
