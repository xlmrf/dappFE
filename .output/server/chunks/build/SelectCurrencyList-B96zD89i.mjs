import { defineComponent, withAsyncContext, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { v as useNuxtApp, Y as useLazyAsyncData, c as useUserStore, a5 as useAuthStore, w as _sfc_main$c } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { A as AdditionalService } from './chunk-pg-ranking-Cp9KKVZQ.mjs';
import { U as UserService } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectCurrencyList",
  __ssrInlineRender: true,
  emits: ["currency-change"],
  async setup(__props, { emit: __emit }) {
    let __temp, __restore;
    const nuxtApp = useNuxtApp();
    const additionalRepository = AdditionalService(nuxtApp.$customFetch);
    const { data, status } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(() => additionalRepository.getCurrencies(), {
      getCachedData(key) {
        const data2 = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        if (!data2) {
          return;
        }
        return data2;
      }
    }, "$xI7EWjk7iC")), __temp = await __temp, __restore(), __temp);
    UserService(nuxtApp.$customFetch);
    useUserStore();
    useAuthStore();
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(status) === "pending") {
        _push(ssrRenderComponent(_sfc_main$c, mergeProps({ class: "tw-w-1000 tw-h-1000" }, _attrs), null, _parent));
      } else if (unref(data)) {
        _push(`<ul${ssrRenderAttrs(mergeProps({ class: "tw-grid xl:tw-gap-5 xl:tw-grid-cols-3" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(data), (currency) => {
          _push(`<li class="tw-flex tw-items-center tw-p-2.5 tw-cursor-pointer hover:tw-bg-primary-600">`);
          if (currency.logo) {
            _push(`<img class="tw-w-750 tw-h-750 tw-mr-2.5"${ssrRenderAttr("src", currency.logo)}${ssrRenderAttr("alt", currency.shortName)} loading="lazy">`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="tw-flex tw-flex-col"><span class="heading-h5 xl:heading-h4">${ssrInterpolate(currency.name)}</span><span class="tw-text-primary-300 heading-h6">${ssrInterpolate(currency.shortName)}</span></div></li>`);
        });
        _push(`<!--]--></ul>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/select-currency/SelectCurrencyList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SelectCurrencyList-B96zD89i.mjs.map
