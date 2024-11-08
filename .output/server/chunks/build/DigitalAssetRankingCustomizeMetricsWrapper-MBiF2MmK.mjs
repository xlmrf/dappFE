import { useSSRContext, defineComponent, mergeModels, useModel, computed, ref, createVNode, resolveDynamicComponent, mergeProps, unref, withCtx, resolveComponent, toDisplayString } from 'vue';
import { ssrRenderVNode, ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { isDeepEqual, groupBy } from 'remeda';
import { _ as _sfc_main$6 } from './DeDialog-Cpcyaeou.mjs';
import { G as useDeBreakpoints, M as MAX_RANKING_METRICS_NUMBER } from './server.mjs';
import { ay as _sfc_main$j, a6 as useToast, a as useI18n, _ as _sfc_main$m, a1 as _sfc_main$l, ab as ButtonCategoryOptions, a2 as ButtonSizeOptions, aa as ButtonVariantOptions, az as toastInfoNotification } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { _ as _sfc_main$5 } from './DeSidebar-CwFoj49S.mjs';
import { useForm } from 'vee-validate';
import { array, string } from 'yup';
import './dialog.esm-ClGlMgQg.mjs';
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
import 'dayjs';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/schema-org';
import '@floating-ui/utils';
import 'isomorphic-dompurify';
import 'ethers';
import '@tanstack/vue-query-devtools';
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isToday.js';
import './sidebar.esm-DjOWB8MN.mjs';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetRankingCustomizeMetricsHeader",
  __ssrInlineRender: true,
  props: {
    selectedMetricsNumber: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "coins.customizeMetricsDialog.title",
        tag: "p",
        class: "heading-h3 lg:heading-h2 tw-pb-3 sm:tw-pb-0 xl:tw-pb-2",
        scope: "global"
      }, {
        number: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="tw-bg-primary-700 heading-h3 tw-text-accent-500 tw-py-0.5 tw-px-2 tw-rounded-md tw-mx-1.5"${_scopeId}>${ssrInterpolate(__props.selectedMetricsNumber)}/${ssrInterpolate(unref(MAX_RANKING_METRICS_NUMBER))}</span>`);
          } else {
            return [
              createVNode("span", { class: "tw-bg-primary-700 heading-h3 tw-text-accent-500 tw-py-0.5 tw-px-2 tw-rounded-md tw-mx-1.5" }, toDisplayString(__props.selectedMetricsNumber) + "/" + toDisplayString(unref(MAX_RANKING_METRICS_NUMBER)), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="tw-text-350 tw-leading-500 tw-text-primary-300 tw-mt-2 tw-mb-7.5 tw-hidden lg:tw-block">${ssrInterpolate(_ctx.$t("coins.customizeMetricsDialog.subtitle"))}</p><!--]-->`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/ranking/components/customize-metrics/DigitalAssetRankingCustomizeMetricsHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetRankingCustomizeMetricsCheckboxListMobile",
  __ssrInlineRender: true,
  props: {
    groupedMetricOptions: {},
    defaultValues: {},
    validateFn: { type: Function }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { values } = useForm({
      validationSchema: {
        metrics: array().of(string().required()).required()
      },
      initialValues: {
        metrics: [...props.defaultValues]
      }
    });
    const emit = __emit;
    function onBeforeChange(isChecked) {
      return props.validateFn(isChecked);
    }
    function onChange() {
      emit("change", values.metrics);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><!--[-->`);
      ssrRenderList(_ctx.groupedMetricOptions, (metricOptions, metricCategory) => {
        _push(`<div><p class="heading-h5.1 tw-text-primary-300 tw-mb-2.5">${ssrInterpolate(metricCategory)}:</p><div class="tw-flex tw-flex-col tw-mb-5"><!--[-->`);
        ssrRenderList(metricOptions, (item) => {
          _push(ssrRenderComponent(_sfc_main$j, {
            key: item.key,
            "before-change": onBeforeChange,
            name: "metrics",
            value: item.key,
            label: item.label,
            "input-id": item.key,
            "input-class": "tw-w-500 tw-h-500",
            "label-class": "tw-text-primary-50 heading-h5",
            class: "tw-py-2.5",
            onChange
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/ranking/components/customize-metrics/DigitalAssetRankingCustomizeMetricsCheckboxListMobile.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetRankingCustomizeMetricsContent",
  __ssrInlineRender: true,
  props: {
    metrics: {},
    selectedMetrics: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const chosenMetrics = computed({
      get() {
        return props.selectedMetrics;
      },
      set(newValue) {
        emit("change", newValue);
      }
    });
    const transformedMetrics = computed(() => {
      return props.metrics.map((metric) => {
        return {
          ...metric,
          selected: !!chosenMetrics.value.find((item) => item.key === metric.key)
        };
      });
    });
    const groupedMetricOptions = computed(
      () => groupBy(transformedMetrics.value, (item) => item.categoryLabel)
    );
    const chosenMetricsQty = computed(() => chosenMetrics.value.length);
    function checkIfMaxLimitReached(selectedMetricsNumber) {
      return selectedMetricsNumber >= MAX_RANKING_METRICS_NUMBER;
    }
    const toast = useToast();
    const { t } = useI18n();
    function showLimitReachedNotification(type) {
      const text = type === "min" ? t("form.rules.minParamsRequred") : t("form.rules.maxFieldsReached", { count: MAX_RANKING_METRICS_NUMBER });
      toastInfoNotification(toast, {
        body: text,
        iconName: "attention",
        iconClass: "tw-text-warning-500"
      });
    }
    const { isTablet } = useDeBreakpoints();
    const metricsComponentMobile = computed(() => {
      if (isTablet.value)
        return _sfc_main$5;
      return _sfc_main$6;
    });
    const isMetricsComponentMobileVisible = ref(false);
    const defaultValues = computed(
      () => chosenMetrics.value.map((item) => item.key)
    );
    const tempSelectedMetrics = ref([...defaultValues.value]);
    function validateMobileMetricsQty(isChecked) {
      const isMaxLimitReached = checkIfMaxLimitReached(tempSelectedMetrics.value.length);
      if (isMaxLimitReached) {
        if (!isChecked) {
          showLimitReachedNotification("max");
        }
        return isChecked;
      } else if (tempSelectedMetrics.value.length === 1 && isChecked) {
        showLimitReachedNotification("min");
        return !isChecked;
      }
      return true;
    }
    function onChange(newValues) {
      tempSelectedMetrics.value = newValues;
    }
    const metricsComponentMobileRef = ref(
      null
    );
    function onMobileCustomizeMetricsApply() {
      var _a;
      chosenMetrics.value = tempSelectedMetrics.value.map((metricKey) => {
        const found = props.metrics.find((item) => item.key === metricKey);
        if (!found)
          throw new Error(`${metricKey} metric key is not fount in metrics arr`);
        return found;
      });
      (_a = metricsComponentMobileRef.value) == null ? void 0 : _a.close();
    }
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><p class="tw-text-350 tw-leading-500 tw-text-primary-300 tw-mb-5 lg:tw-hidden">${ssrInterpolate(unref(t)("coins.customizeMetricsDialog.subtitle"))}</p><div class="tw-bg-primary-900 tw-p-4 lg:tw-mb-7.5"><div class="tw-flex tw-justify-between tw-text-primary-300 heading-h5.1 lg:tw-hidden tw-mb-2.5"><span>${ssrInterpolate(unref(t)("coins.customizeMetricsDialog.yourTable"))}</span><span>${ssrInterpolate(chosenMetricsQty.value)}/${ssrInterpolate(unref(MAX_RANKING_METRICS_NUMBER))} ${ssrInterpolate(unref(t)("common.metrics"))}</span></div><div class="tw-flex tw-flex-col lg:tw-flex-row tw-flex-wrap tw-gap-2.5 tw-relative"><!--[-->`);
      ssrRenderList(chosenMetrics.value, (item, index) => {
        _push(`<span class="tw-flex lg:tw-inline-flex tw-items-center tw-gap-2 tw-bg-primary-700 tw-py-3 lg:tw-py-1.5 tw-pl-2.5 tw-pr-3 tw-relative">`);
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "grip",
          class: "tw-w-450 tw-h-450 tw-text-primary-400 lg:tw-order-1 tw-cursor-move"
        }, null, _parent));
        _push(`<span class="tw-w-400 tw-h-400 tw-text-center tw-bg-primary-500 tw-p-0.5 tw-text-250 tw-font-bold tw-leading-300">${ssrInterpolate(index + 1)}</span><span class="tw-text-350 tw-leading-450 tw-font-medium tw-tracking-wide">${ssrInterpolate(item.label)}</span><button class="tw-absolute tw-right-0 tw-pr-3 tw-h-full lg:tw-hidden">`);
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "trash",
          class: "tw-w-450 tw-h-450 tw-text-primary-400"
        }, null, _parent));
        _push(`</button></span>`);
      });
      _push(`<!--]--></div><button class="tw-bg-primary-700 tw-py-3.5 tw-px-4 tw-flex tw-items-center tw-gap-4 tw-w-full tw-mt-2.5 lg:tw-hidden">`);
      _push(ssrRenderComponent(_sfc_main$m, {
        name: "plus-circle",
        class: "tw-text-primary-400"
      }, null, _parent));
      _push(`<span class="tw-flex tw-flex-col tw-items-start tw-gap-0.5"><span class="heading-h5">${ssrInterpolate(unref(t)("common.buttons.addMetric"))}</span><span class="tw-text-300 tw-leading-400 tw-text-primary-300">${ssrInterpolate(unref(t)("coins.customizeMetricsDialog.fromLibraryOfOurMetrics"))}</span><span></span></span></button></div><div class="tw-hidden lg:tw-flex tw-flex-col tw-gap-6"><!--[-->`);
      ssrRenderList(groupedMetricOptions.value, (metricOptions, metricCategory) => {
        _push(`<div class="tw-flex tw-items-center"><p class="tw-text-300 tw-leading-400 tw-whitespace-nowrap tw-w-1/6 tw-flex-shrink-0">${ssrInterpolate(metricCategory)}: </p><div class="tw-flex tw-flex-wrap tw-gap-2.5"><!--[-->`);
        ssrRenderList(metricOptions, (item) => {
          _push(`<button class="${ssrRenderClass([item.selected ? "tw-bg-primary-600" : "tw-bg-primary-700", "tw-py-1.5 tw-pl-3 tw-pr-3.5 tw-leading-350"])}"><span class="tw-text-300 tw-font-medium tw-leading-450 tw-whitespace-nowrap tw-tracking-wide">${ssrInterpolate(item.label)}</span>`);
          if (item.selected) {
            _push(ssrRenderComponent(_sfc_main$m, {
              name: "close-circle",
              class: "tw-w-300 tw-h-300 tw-ml-2 tw-text-primary-400"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]--></div>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(metricsComponentMobile.value), {
        ref_key: "metricsComponentMobileRef",
        ref: metricsComponentMobileRef,
        visible: isMetricsComponentMobileVisible.value,
        "onUpdate:visible": ($event) => isMetricsComponentMobileVisible.value = $event,
        position: "right",
        modal: false,
        "header-class": "tw-border-none tw-pt-5",
        "content-class": "tw-pt-5 sm:tw-px-5",
        "footer-class": "sm:tw-px-5 sm:tw--mx-5 tw-border-t tw-border-primary-600",
        class: "lg:tw-hidden"
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              "selected-metrics-number": tempSelectedMetrics.value.length
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                "selected-metrics-number": tempSelectedMetrics.value.length
              }, null, 8, ["selected-metrics-number"])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$l, {
              label: unref(t)("common.buttons.applyX", { field: "common.metrics" }),
              category: unref(ButtonCategoryOptions).primary,
              size: unref(ButtonSizeOptions).medium,
              variant: unref(ButtonVariantOptions).confirm,
              class: "tw-w-full",
              onClick: onMobileCustomizeMetricsApply
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$l, {
                label: unref(t)("common.buttons.applyX", { field: "common.metrics" }),
                category: unref(ButtonCategoryOptions).primary,
                size: unref(ButtonSizeOptions).medium,
                variant: unref(ButtonVariantOptions).confirm,
                class: "tw-w-full",
                onClick: onMobileCustomizeMetricsApply
              }, null, 8, ["label", "category", "size", "variant"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, {
              "grouped-metric-options": groupedMetricOptions.value,
              "default-values": defaultValues.value,
              "validate-fn": validateMobileMetricsQty,
              onChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3, {
                "grouped-metric-options": groupedMetricOptions.value,
                "default-values": defaultValues.value,
                "validate-fn": validateMobileMetricsQty,
                onChange
              }, null, 8, ["grouped-metric-options", "default-values"])
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/ranking/components/customize-metrics/DigitalAssetRankingCustomizeMetricsContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetRankingCustomizeMetricsFooter",
  __ssrInlineRender: true,
  props: {
    isResetDisabled: { type: Boolean }
  },
  emits: ["apply", "reset", "cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function onReset() {
      emit("reset");
    }
    function onCancel() {
      emit("cancel");
    }
    function onApply() {
      emit("apply");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-gap-2.5 tw-justify-between" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$l, {
        disabled: _ctx.isResetDisabled,
        size: unref(ButtonSizeOptions).medium,
        label: _ctx.$t("common.buttons.resetToDefault"),
        icon: "refresh",
        "icon-class": "tw-w-300 tw-h-300 tw-mr-2 tw-text-primary-400",
        class: "max-md:tw-flex-grow",
        onClick: onReset
      }, null, _parent));
      _push(`<div class="tw-flex tw-gap-2.5 max-md:tw-flex-grow">`);
      _push(ssrRenderComponent(_sfc_main$l, {
        size: unref(ButtonSizeOptions).medium,
        label: _ctx.$t("common.buttons.cancel"),
        class: "tw-hidden lg:tw-block",
        onClick: onCancel
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l, {
        label: _ctx.$t("common.buttons.applyX", { field: "common.changes" }),
        category: unref(ButtonCategoryOptions).primary,
        size: unref(ButtonSizeOptions).medium,
        variant: unref(ButtonVariantOptions).confirm,
        class: "max-md:tw-flex-grow",
        onClick: onApply
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/ranking/components/customize-metrics/DigitalAssetRankingCustomizeMetricsFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetRankingCustomizeMetricsWrapper",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    metricOptions: {},
    selectedMetrics: {},
    defaultMetrics: {}
  }, {
    "modelValue": { type: Boolean, ...{ required: true } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["submit", "reset"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isVisible = useModel(__props, "modelValue");
    const { isTablet } = useDeBreakpoints();
    const wrapperComponent = computed(() => {
      if (isTablet.value)
        return _sfc_main$5;
      return _sfc_main$6;
    });
    const emit = __emit;
    const toggledMetrics = ref([...props.selectedMetrics]);
    const selectedMetricsNumber = computed(() => toggledMetrics.value.length);
    const wrapper = ref(null);
    function onCancel() {
      var _a;
      (_a = wrapper.value) == null ? void 0 : _a.close();
    }
    const selectedMetricKeys = computed(() => toggledMetrics.value.map((item) => item.key));
    const isDirty = computed(() => {
      return isDeepEqual(
        selectedMetricKeys.value,
        props.defaultMetrics.map((item) => item.key)
      );
    });
    function onReset() {
      toggledMetrics.value = [...props.defaultMetrics];
    }
    function onApply() {
      emit("submit", selectedMetricKeys.value);
      onCancel();
    }
    function onChange(val) {
      toggledMetrics.value = val;
    }
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(wrapperComponent.value), mergeProps({
        ref_key: "wrapper",
        ref: wrapper,
        visible: isVisible.value,
        "onUpdate:visible": ($event) => isVisible.value = $event,
        modal: "",
        class: "tw-w-full sm:tw-w-auto tw-max-w-full tw-min-w-[400px] lg:tw-w-[1084px] tw-h-full lg:tw-h-[764px]",
        "header-class": "tw-pt-5 sm:tw-px-5 sm:tw-border-0 lg:tw-px-7.5 lg:tw-pt-7.5",
        "content-class": "tw-pt-2 sm:tw-px-5 lg:tw-px-7.5 xl:tw-pt-0 tw-mb-auto",
        "footer-class": "max-lg:tw-p-4 lg:tw-px-7.5 max-lg:tw-border-t tw-border-primary-600",
        position: unref(isTablet) ? "right" : "center"
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, { "selected-metrics-number": selectedMetricsNumber.value }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, { "selected-metrics-number": selectedMetricsNumber.value }, null, 8, ["selected-metrics-number"])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              "is-reset-disabled": isDirty.value,
              class: "lg:tw-mb-7.5",
              onReset,
              onCancel,
              onApply
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, {
                "is-reset-disabled": isDirty.value,
                class: "lg:tw-mb-7.5",
                onReset,
                onCancel,
                onApply
              }, null, 8, ["is-reset-disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              "selected-metrics": toggledMetrics.value,
              metrics: _ctx.metricOptions,
              onChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                "selected-metrics": toggledMetrics.value,
                metrics: _ctx.metricOptions,
                onChange
              }, null, 8, ["selected-metrics", "metrics"])
            ];
          }
        }),
        _: 1
      }), _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/ranking/components/customize-metrics/DigitalAssetRankingCustomizeMetricsWrapper.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DigitalAssetRankingCustomizeMetricsWrapper-MBiF2MmK.mjs.map
