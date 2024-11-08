import { useSSRContext, defineComponent, ref, mergeProps, unref, withAsyncContext, computed, onServerPrefetch, watch, withCtx, isRef, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, defineAsyncComponent } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { a as useI18n, a1 as _sfc_main$l, v as useNuxtApp, c as useUserStore, b as useAppStore, Q as useRouteQuery, T as THIRTY_MINUTES_IN_MILLISECONDS, x as useLocalePath, y as useSeoMetaData, W as _sfc_main$g, a3 as defineStore, r as __nuxt_component_0, a4 as useCookie, Y as useLazyAsyncData } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { i as itemsListRequestParamsMapper, _ as _sfc_main$a, D as DappMetric, g as getDappFieldForBackend, d as dappKeys, f as formatDappRankingData, a as _sfc_main$9, b as _sfc_main$k, c as DAPP_METRICS_OPTIONS, e as getDappMetricCategoryLabelKey, h as DAPP_METRICS_DEFAULT, T as TimeVariations, j as getLocalizedTimeLabel, k as DappService } from './server.mjs';
import { useVueTable, getCoreRowModel, createColumnHelper } from '@tanstack/vue-table';
import { useRouter } from 'vue-router';
import { isNumber } from 'remeda';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'node:url';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/schema-org';
import '@floating-ui/utils';
import 'isomorphic-dompurify';
import 'ethers';
import '@tanstack/vue-query-devtools';

function getMetricLabel(metric, t) {
  const timeVariantsPattern = Object.values(TimeVariations).join("|");
  const regex = new RegExp(`(${timeVariantsPattern})$`);
  const timeVariantMatch = metric.match(regex);
  const timeVariant = timeVariantMatch ? timeVariantMatch[0] : null;
  if (timeVariant) {
    const metricBase = metric.replace(timeVariant, "");
    const metricKey = `coins.metrics.${metricBase}`;
    const time = getLocalizedTimeLabel(timeVariant, t);
    return t("coins.metrics.metricForXTime", { metric: metricKey, time });
  }
  return t(`coins.metrics.${metric}`);
}
const DAPPS_TABLE_CUSTOMIZE_TOKEN = "de.ranking_dapps_table_customize";
const DAPP_PAGE_SIZE_TOKEN = "de.ranking_dapp_page_size";
const PAGE_SIZE_OPTIONS = [100, 50, 20];
const DEFAULT_PAGE_SIZE = 100;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetRankingTableHeader",
  __ssrInlineRender: true,
  props: {
    activeCategoryIndex: { default: 0 },
    pageSize: { default: DEFAULT_PAGE_SIZE },
    dialogPending: { type: Boolean }
  },
  emits: ["open-customize", "change-page-size"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { t } = useI18n();
    const selectedPageSize = ref(props.pageSize);
    const emit = __emit;
    function openCustomizeDialog() {
      emit("open-customize");
    }
    function onChange() {
      emit("change-page-size", selectedPageSize.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col tw-gap-7.5 lg:tw-flex-row tw-justify-between tw-mb-5" }, _attrs))}><h1 class="heading-h2">${ssrInterpolate(unref(t)("dapp.rankingTableTitle"))}</h1><div class="tw-flex tw-justify-between tw-gap-3.5"><div class="tw-flex tw-items-center tw-gap-1.5 sm:tw-order-1 lg:tw-order-none"><span class="tw-text-300 tw-leading-400 tw-text-primary-300">${ssrInterpolate(unref(t)("form.rows"))}: </span>`);
      _push(ssrRenderComponent(_sfc_main$a, {
        modelValue: selectedPageSize.value,
        "onUpdate:modelValue": ($event) => selectedPageSize.value = $event,
        options: unref(PAGE_SIZE_OPTIONS),
        "panel-class": "tw-w-[91px]",
        type: "chips",
        onChange
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$l, {
        icon: "settings-filled",
        "icon-class": "tw-w-300 tw-h-300 tw-text-primary-400 tw-mr-2",
        class: "tw-pl-2.5 tw-pr-3",
        label: unref(t)("common.buttons.customize"),
        loading: _ctx.dialogPending,
        onClick: openCustomizeDialog
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/ranking/components/DigitalAssetRankingTableHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
function createAppCurrencyModel(raw) {
  return {
    id: raw.id,
    shortName: raw.short_name,
    name: raw.name,
    sortOrder: raw.sort_order,
    status: raw.status,
    logo: raw.logo
  };
}
const AdditionalService = (fetch) => ({
  async getBlockchains(payload) {
    return await fetch("api/additional/blockchains", {
      params: itemsListRequestParamsMapper(payload)
    });
  },
  async getCategories(payload) {
    return await fetch("api/additional/categories", {
      params: itemsListRequestParamsMapper(payload)
    });
  },
  async getCurrencies() {
    const response = await fetch("api/additional/currency");
    return response.map(createAppCurrencyModel);
  }
});
const useNewCachedEntriesStore = defineStore("cacheEntries", () => {
  const { $customFetch } = useNuxtApp();
  const blockchains = ref([]);
  const categories = ref([]);
  const fetchBlockchains = async () => {
    const additionalRepository = AdditionalService($customFetch);
    const { data } = await useLazyAsyncData(
      () => additionalRepository.getBlockchains({ perPage: 1e4, page: 1 }),
      "$c1Syozrn2T"
    );
    watch(
      data,
      (newVal) => {
        blockchains.value = (newVal == null ? void 0 : newVal.blockchains) || [];
      },
      { immediate: true }
    );
  };
  const fetchCategories = async () => {
    const additionalRepository = AdditionalService($customFetch);
    const { data } = await useLazyAsyncData(
      () => additionalRepository.getCategories({ perPage: 1e4, page: 1 }),
      "$Ts6ay50WBH"
    );
    watch(
      data,
      (newVal) => {
        categories.value = (newVal == null ? void 0 : newVal.categories) || [];
      },
      { immediate: true }
    );
  };
  return {
    blockchains,
    fetchBlockchains,
    categories,
    fetchCategories
  };
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DappsRankingTable",
  __ssrInlineRender: true,
  props: {
    columns: {},
    columnVisibility: {},
    columnOrder: {},
    pageSize: { default: DEFAULT_PAGE_SIZE }
  },
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const props = __props;
    const { t } = useI18n();
    const cachedEntriesStore = useNewCachedEntriesStore();
    const promises = [];
    if (!((_a = cachedEntriesStore.blockchains) == null ? void 0 : _a.length)) {
      promises.push(cachedEntriesStore.fetchBlockchains());
    }
    if (!((_b = cachedEntriesStore.categories) == null ? void 0 : _b.length)) {
      promises.push(cachedEntriesStore.fetchCategories());
    }
    [__temp, __restore] = withAsyncContext(() => Promise.allSettled(promises)), await __temp, __restore();
    const categories = computed(() => [
      {
        id: "all",
        name: t("common.all")
      },
      ...cachedEntriesStore.categories
    ]);
    const blockchains = computed(() => [
      {
        id: "all",
        name: t("common.all")
      },
      ...cachedEntriesStore.blockchains
    ]);
    const { $customFetch } = useNuxtApp();
    const dappRepo = DappService($customFetch);
    const userStore = useUserStore();
    const appStore = useAppStore();
    const page = useRouteQuery("page", 1, { transform: Number });
    const sortBy = useRouteQuery("sortBy", DappMetric.Volume7d);
    const sortDirection = useRouteQuery("sortDirection", "desc");
    const blockchainId = useRouteQuery("blockchainId", void 0, { transform: Number });
    const categoryId = useRouteQuery("categoryId", void 0, { transform: Number });
    const tempPerPage = ref(props.pageSize);
    const params = computed(() => ({
      paginationData: {
        page: page.value,
        perPage: tempPerPage.value
      },
      sortData: {
        sortBy: getDappFieldForBackend(sortBy.value),
        sortDirection: sortDirection.value,
        blockchainId: blockchainId.value || void 0,
        categoryId: categoryId.value || void 0
      },
      currency: userStore.user.currencyShortName
    }));
    const {
      data: dappsData,
      isLoading,
      suspense
    } = useQuery({
      queryKey: computed(() => dappKeys.rankingList(params.value)),
      queryFn: (queryKey) => dappRepo.getDappsRanking(queryKey, appStore.locale),
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    const tableData = computed(
      () => {
        var _a2;
        return ((_a2 = dappsData.value) == null ? void 0 : _a2.data.map((item, idx) => ({
          position: (page.value - 1) * tempPerPage.value + idx + 1,
          ...item
        }))) || [];
      }
    );
    const table = useVueTable({
      get data() {
        return tableData.value;
      },
      get columns() {
        return props.columns;
      },
      getCoreRowModel: getCoreRowModel(),
      manualPagination: true,
      manualSorting: true,
      get rowCount() {
        var _a2;
        return ((_a2 = dappsData.value) == null ? void 0 : _a2.total) || 0;
      },
      state: {
        get columnVisibility() {
          return props.columnVisibility;
        },
        get columnOrder() {
          return props.columnOrder;
        },
        get pagination() {
          return {
            pageIndex: page.value - 1,
            pageSize: tempPerPage.value
          };
        },
        get sorting() {
          return [
            {
              id: sortBy.value,
              desc: sortDirection.value === "desc"
            }
          ];
        }
      },
      initialState: {
        columnPinning: {
          left: ["position", "title"]
        }
      }
    });
    watch(page, async (newQuery, oldQuery) => {
      if (newQuery !== oldQuery) {
        (void 0).scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
    watch(
      () => props.pageSize,
      async (val) => {
        page.value = 1;
        tempPerPage.value = val;
      }
    );
    watch(
      () => appStore.locale,
      (val) => {
        updateCache(val);
      }
    );
    const queryClient = useQueryClient();
    function updateCache(locale) {
      queryClient.setQueryData(
        dappKeys.rankingList(params.value),
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              data: oldData.data.map((item) => ({
                ...item,
                ...formatDappRankingData(item, locale, userStore.user.currencyShortName)
              }))
            };
          }
          return oldData;
        }
      );
    }
    function onSort(event) {
      sortBy.value = event.id;
      sortDirection.value = event.desc ? "asc" : "desc";
    }
    const router = useRouter();
    const localePath = useLocalePath();
    function onRowClick(row) {
      router.push(localePath(`/dapp/${row.original.slug}`));
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(ssrRenderComponent(_sfc_main$9, mergeProps({
        table: unref(table),
        loading: unref(isLoading),
        "thead-class": "tw-whitespace-nowrap",
        onSort,
        onRowClick
      }, _attrs), {
        header_category: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(categoryId),
              "onUpdate:modelValue": ($event) => isRef(categoryId) ? categoryId.value = $event : null,
              options: categories.value,
              placeholder: unref(t)("coins.metrics.category"),
              "option-value": "id",
              "option-label": "name",
              type: "chips",
              "panel-class": "tw-capitalize",
              class: "tw-capitalize"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$a, {
                modelValue: unref(categoryId),
                "onUpdate:modelValue": ($event) => isRef(categoryId) ? categoryId.value = $event : null,
                options: categories.value,
                placeholder: unref(t)("coins.metrics.category"),
                "option-value": "id",
                "option-label": "name",
                type: "chips",
                "panel-class": "tw-capitalize",
                class: "tw-capitalize"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
            ];
          }
        }),
        header_blockchain: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$a, {
              modelValue: unref(blockchainId),
              "onUpdate:modelValue": ($event) => isRef(blockchainId) ? blockchainId.value = $event : null,
              options: blockchains.value,
              placeholder: unref(t)("coins.metrics.blockchain"),
              type: "chips",
              "option-value": "id",
              "option-label": "name",
              "panel-class": "tw-capitalize",
              class: "tw-capitalize"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$a, {
                modelValue: unref(blockchainId),
                "onUpdate:modelValue": ($event) => isRef(blockchainId) ? blockchainId.value = $event : null,
                options: blockchains.value,
                placeholder: unref(t)("coins.metrics.blockchain"),
                type: "chips",
                "option-value": "id",
                "option-label": "name",
                "panel-class": "tw-capitalize",
                class: "tw-capitalize"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "placeholder"])
            ];
          }
        }),
        body_blockchain: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            _push2(`<span class="tw-capitalize"${_scopeId}>${ssrInterpolate((_b2 = (_a2 = blockchains.value) == null ? void 0 : _a2.find((item) => data.blockchain === item.id)) == null ? void 0 : _b2.name)}</span>`);
          } else {
            return [
              createVNode("span", { class: "tw-capitalize" }, toDisplayString((_d = (_c = blockchains.value) == null ? void 0 : _c.find((item) => data.blockchain === item.id)) == null ? void 0 : _d.name), 1)
            ];
          }
        }),
        body_category: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            _push2(`<span class="tw-capitalize"${_scopeId}>${ssrInterpolate((_b2 = (_a2 = categories.value) == null ? void 0 : _a2.find((item) => data.category === item.id)) == null ? void 0 : _b2.name)}</span>`);
          } else {
            return [
              createVNode("span", { class: "tw-capitalize" }, toDisplayString((_d = (_c = categories.value) == null ? void 0 : _c.find((item) => data.category === item.id)) == null ? void 0 : _d.name), 1)
            ];
          }
        }),
        body_title: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_nuxt_link_locale, {
              to: `/dapp/${data.slug}`,
              title: data.title,
              class: "tw-flex tw-items-center heading-h5"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="tw-flex tw-items-center tw-w-full"${_scopeId2}>`);
                  if (data.icon) {
                    _push3(`<img loading="lazy"${ssrRenderAttr("src", data.icon)} decoding="async" fetchpriority="low"${ssrRenderAttr("alt", `${data.title} logo`)} class="tw-w-700 tw-h-700 tw-mr-2.5 tw-rounded-full"${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span class="heading-h5 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis"${_scopeId2}>${ssrInterpolate(data.title)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "tw-flex tw-items-center tw-w-full" }, [
                      data.icon ? (openBlock(), createBlock("img", {
                        key: 0,
                        loading: "lazy",
                        src: data.icon,
                        decoding: "async",
                        fetchpriority: "low",
                        alt: `${data.title} logo`,
                        class: "tw-w-700 tw-h-700 tw-mr-2.5 tw-rounded-full"
                      }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                      createVNode("span", { class: "heading-h5 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis" }, toDisplayString(data.title), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_nuxt_link_locale, {
                to: `/dapp/${data.slug}`,
                title: data.title,
                class: "tw-flex tw-items-center heading-h5"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "tw-flex tw-items-center tw-w-full" }, [
                    data.icon ? (openBlock(), createBlock("img", {
                      key: 0,
                      loading: "lazy",
                      src: data.icon,
                      decoding: "async",
                      fetchpriority: "low",
                      alt: `${data.title} logo`,
                      class: "tw-w-700 tw-h-700 tw-mr-2.5 tw-rounded-full"
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                    createVNode("span", { class: "heading-h5 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis" }, toDisplayString(data.title), 1)
                  ])
                ]),
                _: 2
              }, 1032, ["to", "title"])
            ];
          }
        }),
        body_balanceChange24h: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.balanceChange24h)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.balanceChange24h
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.balanceChange24hFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.balanceChange24hFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.balanceChange24hFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.balanceChange24h) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.balanceChange24h
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.balanceChange24hFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.balanceChange24hFormatted), 1))
            ];
          }
        }),
        body_balanceChange7d: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.balanceChange7d)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.balanceChange7d
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.balanceChange7dFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.balanceChange7dFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.balanceChange7dFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.balanceChange7d) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.balanceChange7d
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.balanceChange7dFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.balanceChange7dFormatted), 1))
            ];
          }
        }),
        body_balanceChange30d: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.balanceChange30d)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.balanceChange30d
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.balanceChange30dFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.balanceChange30dFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.balanceChange30dFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.balanceChange30d) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.balanceChange30d
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.balanceChange30dFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.balanceChange30dFormatted), 1))
            ];
          }
        }),
        body_userChange24h: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.userChange24h)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.userChange24h
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.userChange24hFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.userChange24hFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.userChange24hFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.userChange24h) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.userChange24h
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.userChange24hFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.userChange24hFormatted), 1))
            ];
          }
        }),
        body_userChange7d: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.userChange7d)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.userChange7d
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.userChange7dFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.userChange7dFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.userChange7dFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.userChange7d) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.userChange7d
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.userChange7dFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.userChange7dFormatted), 1))
            ];
          }
        }),
        body_userChange30d: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.userChange30d)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.userChange30d
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.userChange30dFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.userChange30dFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.userChange30dFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.userChange30d) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.userChange30d
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.userChange30dFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.userChange30dFormatted), 1))
            ];
          }
        }),
        body_volumeChange24h: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.volumeChange24h)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.volumeChange24h
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.volumeChange24hFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.volumeChange24hFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.volumeChange24hFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.volumeChange24h) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.volumeChange24h
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.volumeChange24hFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.volumeChange24hFormatted), 1))
            ];
          }
        }),
        body_volumeChange7d: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.volumeChange7d)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.volumeChange7d
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.volumeChange7dFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.volumeChange7dFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.volumeChange7dFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.volumeChange7d) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.volumeChange7d
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.volumeChange7dFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.volumeChange7dFormatted), 1))
            ];
          }
        }),
        body_volumeChange30d: withCtx(({ data }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isNumber)(data.volumeChange30d)) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: data.volumeChange30d
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(data.volumeChange30dFormatted)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(data.volumeChange30dFormatted), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<span${_scopeId}>${ssrInterpolate(data.volumeChange30dFormatted)}</span>`);
            }
          } else {
            return [
              unref(isNumber)(data.volumeChange30d) ? (openBlock(), createBlock(_sfc_main$k, {
                key: 0,
                value: data.volumeChange30d
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(data.volumeChange30dFormatted), 1)
                ]),
                _: 2
              }, 1032, ["value"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(data.volumeChange30dFormatted), 1))
            ];
          }
        }),
        empty: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("form.noXFound", { field: unref(t)("coins.dapp", 2) }))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("form.noXFound", { field: unref(t)("coins.dapp", 2) })), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/dapps/components/DappsRankingTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function useDappsRankingTable() {
  const { t } = useI18n();
  const columnHelper = createColumnHelper();
  const sequenceCol = columnHelper.accessor("position", {
    id: "position",
    cell: (info) => info.getValue(),
    header: "#",
    enableHiding: false,
    size: 40,
    minSize: 40,
    maxSize: 40,
    enableSorting: false,
    meta: {
      thClass: "!tw-px-2",
      tdClass: "!tw-px-2"
    }
  });
  const titleCol = columnHelper.accessor("id", {
    id: "title",
    cell: (info) => info.getValue(),
    header: t("coins.dapp"),
    meta: {
      thClass: "!tw-max-w-[150px] md:!tw-max-w-[250px] !tw-pl-0",
      tdClass: "!tw-max-w-[150px] md:!tw-max-w-[250px] !tw-pl-0"
    }
  });
  const totalUsers24hCol = columnHelper.accessor("totalUsers24hFormatted", {
    id: DappMetric.TotalUsers24h,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.TotalUsers24h, t)
  });
  const totalUsers7dCol = columnHelper.accessor("totalUsers7dFormatted", {
    id: DappMetric.TotalUsers7d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.TotalUsers7d, t)
  });
  const totalUsers30dCol = columnHelper.accessor("totalUsers30dFormatted", {
    id: DappMetric.TotalUsers30d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.TotalUsers30d, t)
  });
  const userChange24hCol = columnHelper.accessor(DappMetric.UserChange24h, {
    id: DappMetric.UserChange24h,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.UserChange24h, t)
  });
  const userChange7dCol = columnHelper.accessor(DappMetric.UserChange7d, {
    id: DappMetric.UserChange7d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.UserChange7d, t)
  });
  const userChange30dCol = columnHelper.accessor(DappMetric.UserChange30d, {
    id: DappMetric.UserChange30d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.UserChange30d, t)
  });
  const volume24hCol = columnHelper.accessor("volume24hFormatted", {
    id: DappMetric.Volume24h,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Volume24h, t)
  });
  const volume7dCol = columnHelper.accessor("volume7dFormatted", {
    id: DappMetric.Volume7d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Volume7d, t)
  });
  const volume30dCol = columnHelper.accessor("volume30dFormatted", {
    id: DappMetric.Volume30d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Volume30d, t)
  });
  const volumeUSD24hCol = columnHelper.accessor("volumeUSD24hFormatted", {
    id: DappMetric.VolumeUSD24h,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.VolumeUSD24h, t)
  });
  const volumeUSD7dCol = columnHelper.accessor("volumeUSD7dFormatted", {
    id: DappMetric.VolumeUSD7d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.VolumeUSD7d, t)
  });
  const volumeUSD30dCol = columnHelper.accessor("volumeUSD30dFormatted", {
    id: DappMetric.VolumeUSD30d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.VolumeUSD30d, t)
  });
  const volumeChange24hCol = columnHelper.accessor(DappMetric.VolumeChange24h, {
    id: DappMetric.VolumeChange24h,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.VolumeChange24h, t)
  });
  const volumeChange7dCol = columnHelper.accessor(DappMetric.VolumeChange7d, {
    id: DappMetric.VolumeChange7d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.VolumeChange7d, t)
  });
  const volumeChange30dCol = columnHelper.accessor(DappMetric.VolumeChange30d, {
    id: DappMetric.VolumeChange30d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.VolumeChange30d, t)
  });
  const balance24hCol = columnHelper.accessor("balance24hFormatted", {
    id: DappMetric.Balance24h,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Balance24h, t)
  });
  const balance7dCol = columnHelper.accessor("balance7dFormatted", {
    id: DappMetric.Balance7d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Balance7d, t)
  });
  const balance30dCol = columnHelper.accessor("balance30dFormatted", {
    id: DappMetric.Balance30d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Balance30d, t)
  });
  const balanceChange24hCol = columnHelper.accessor(DappMetric.BalanceChange24h, {
    id: DappMetric.BalanceChange24h,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.BalanceChange24h, t)
  });
  const balanceChange7dCol = columnHelper.accessor(DappMetric.BalanceChange7d, {
    id: DappMetric.BalanceChange7d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.BalanceChange7d, t)
  });
  const balanceChange30dCol = columnHelper.accessor(DappMetric.BalanceChange30d, {
    id: DappMetric.BalanceChange30d,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.BalanceChange30d, t)
  });
  const blockchainCol = columnHelper.accessor(DappMetric.Blockchain, {
    id: DappMetric.Blockchain,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Blockchain, t),
    enableSorting: false
  });
  const categoryCol = columnHelper.accessor(DappMetric.Category, {
    id: DappMetric.Category,
    cell: (info) => info.getValue(),
    header: getMetricLabel(DappMetric.Category, t),
    enableSorting: false
  });
  const allColumns = [
    sequenceCol,
    titleCol,
    totalUsers24hCol,
    totalUsers7dCol,
    totalUsers30dCol,
    userChange24hCol,
    userChange7dCol,
    userChange30dCol,
    volume24hCol,
    volume7dCol,
    volume30dCol,
    volumeUSD24hCol,
    volumeUSD7dCol,
    volumeUSD30dCol,
    volumeChange24hCol,
    volumeChange7dCol,
    volumeChange30dCol,
    balance24hCol,
    balance7dCol,
    balance30dCol,
    balanceChange24hCol,
    balanceChange7dCol,
    balanceChange30dCol,
    blockchainCol,
    categoryCol
    // platformCol,
  ];
  const columnMap = new Map(allColumns.map((col) => [col.id, col]));
  const savedMetricsCookie = useCookie(DAPPS_TABLE_CUSTOMIZE_TOKEN);
  const customizedMetrics = ref(savedMetricsCookie.value || [...DAPP_METRICS_DEFAULT]);
  const columnVisibility = computed(() => {
    return Object.fromEntries(
      Array.from(columnMap.keys()).map((key) => [
        key,
        key === "title" || key === "position" ? true : customizedMetrics.value.includes(key)
      ])
    );
  });
  const pageSizeCookie = useCookie(DAPP_PAGE_SIZE_TOKEN);
  const pageSize = useRouteQuery("perPage", pageSizeCookie.value || DEFAULT_PAGE_SIZE, {
    transform: Number
  });
  function onChangePageSize(newPageSize) {
    pageSizeCookie.value = newPageSize;
    pageSize.value = newPageSize;
  }
  return {
    pageSize,
    onChangePageSize,
    customizedMetrics,
    savedMetricsCookie,
    columns: allColumns,
    columnVisibility
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const RankingCustomizeMetricsDialog = defineAsyncComponent(
      () => import('./DigitalAssetRankingCustomizeMetricsWrapper-MBiF2MmK.mjs')
    );
    const { t } = useI18n();
    const {
      onChangePageSize,
      pageSize,
      columns,
      customizedMetrics,
      savedMetricsCookie,
      columnVisibility
    } = useDappsRankingTable();
    const metricOptions = ref(
      Object.entries(DAPP_METRICS_OPTIONS).reduce((acc, [category, metrics]) => {
        const arr = metrics.map((metric) => ({
          key: metric,
          label: getMetricLabel(metric, t),
          category,
          categoryLabel: t(getDappMetricCategoryLabelKey(category))
        }));
        return acc.concat(arr);
      }, [])
    );
    function isDigitalAssetMetric(metric) {
      return metric !== void 0;
    }
    const selectedMetrics = computed(() => {
      return customizedMetrics.value.map((metricKey) => {
        const found = metricOptions.value.find((item) => item.key === metricKey);
        if (!found)
          console.error(`there is no table column defined with the metric ${metricKey}`);
        return found;
      }).filter(isDigitalAssetMetric);
    });
    const defaultMetrics = DAPP_METRICS_DEFAULT.map((metricKey) => {
      const found = metricOptions.value.find((item) => item.key === metricKey);
      if (!found)
        console.error(`there is no table column defined with the metric ${metricKey}`);
      return found;
    }).filter(isDigitalAssetMetric);
    const isCustomizeMetricsDialogLoaded = ref(false);
    const isCustomizeMetricsDialogOpened = ref(false);
    const isCustomizeMetricsDialogPending = ref(false);
    function openCustomizeDialog() {
      isCustomizeMetricsDialogLoaded.value = true;
      isCustomizeMetricsDialogOpened.value = true;
    }
    function onCustomizeDialogLoaded() {
      isCustomizeMetricsDialogPending.value = false;
    }
    watch(
      isCustomizeMetricsDialogLoaded,
      () => {
        isCustomizeMetricsDialogPending.value = true;
      },
      { once: true }
    );
    function onMetricsSubmit(selectedMetricKeys) {
      customizedMetrics.value = selectedMetricKeys;
      savedMetricsCookie.value = selectedMetricKeys;
    }
    useSeoMetaData({
      title: t("common.site.metadata.ranking.title"),
      description: t("common.site.metadata.ranking.description"),
      keywords: t("common.site.metadata.ranking.keywords"),
      relativeUrl: "ranking"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 class="tw-sr-only">${ssrInterpolate(unref(t)("common.site.metadata.ranking.h1"))}</h1><div class="tw-container tw-mt-7.5 tw-mb-15">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "page-size": unref(pageSize),
        "dialog-pending": isCustomizeMetricsDialogPending.value,
        onOpenCustomize: openCustomizeDialog,
        onChangePageSize: unref(onChangePageSize)
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, {
        columns: unref(columns),
        "page-size": unref(pageSize),
        "column-visibility": unref(columnVisibility),
        "column-order": unref(customizedMetrics),
        "row-hover": ""
      }, null, _parent));
      if (isCustomizeMetricsDialogLoaded.value) {
        _push(ssrRenderComponent(unref(RankingCustomizeMetricsDialog), {
          modelValue: isCustomizeMetricsDialogOpened.value,
          "onUpdate:modelValue": ($event) => isCustomizeMetricsDialogOpened.value = $event,
          "metric-options": metricOptions.value,
          "selected-metrics": selectedMetrics.value,
          "default-metrics": unref(defaultMetrics),
          onSubmit: onMetricsSubmit,
          onVnodeMounted: onCustomizeDialogLoaded
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$g, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/ranking/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { AdditionalService as A, index as i };
//# sourceMappingURL=chunk-pg-ranking-Cp9KKVZQ.mjs.map
