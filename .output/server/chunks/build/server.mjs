import { defineComponent, nextTick, h as h$1, createCommentVNode, useSSRContext, resolveComponent, mergeProps, unref, withCtx, renderSlot, computed, mergeModels, useModel, ref, createSlots, createVNode, withModifiers, toDisplayString, renderList, resolveDirective, withDirectives, watch, openBlock, createElementBlock, createBlock, Teleport, onServerPrefetch, withAsyncContext, createTextVNode, createElementVNode, Fragment, normalizeClass, resolveDynamicComponent, Transition, provide, shallowReactive, inject, Suspense, vShow, isRef, toHandlers, defineAsyncComponent, normalizeProps, guardReactiveProps, withKeys, pushScopeId, popScopeId, createApp, onErrorCaptured, shallowRef, reactive, isReadonly, withScopeId, normalizeStyle, isShallow, isReactive, toRaw, toValue, effectScope } from 'vue';
import { p as defu, $ as $fetch$1, h as createError$1, J as toRouteMatcher, K as createRouter$1, Y as setCookie } from '../runtime.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { D as DEFAULT_LOCALE, A as AppCurrency, u as useId, _ as _sfc_main$m$1, g as getResponsiveImageUrl, s as script$8$1, p as primebus, f as DomHandler, B as BaseStyle, a as useI18n, l as useBreakpoints, m as breakpointsTailwind, o as _sfc_main$k$1, q as AVATAR_SIZE_OPTIONS, b as useAppStore, c as useUserStore, e as _sfc_main$b$3, U as UniqueComponentId, Z as ZIndexUtils, O as ObjectUtils$1, C as ConnectedOverlayScrollHandler, R as Ripple, h as script$7$2, j as script$5$2, n as _sfc_main$7$3, r as __nuxt_component_0$2, t as USER_AVATAR_STUMP_PATH, v as useNuxtApp, F as FIFTEEN_MINUTES_IN_MILLISECONDS, w as _sfc_main$c$2, x as useLocalePath, y as useSeoMetaData, z as DEFAULT_CURRENCY, d as __nuxt_component_0$2$1, i as script$a, S as SHORT_DATE_WITH_YEAR, T as THIRTY_MINUTES_IN_MILLISECONDS, k as useDayjs, P as PageRouteSymbol, L as LayoutMetaSymbol, E as appPageTransition, G as appKeepalive, H as _wrapIf, I as TWENTY_FOUR_HOURS_IN_MILLISECONDS, J as TabVariantOptions, K as _sfc_main$a$3, M as ArticleService, N as articleKeys, Q as useRouteQuery, V as AuthTab, W as _sfc_main$g$2, X as DE_EMAIL, Y as useLazyAsyncData, $ as _sfc_main$f$2, a0 as _sfc_main$d$2, a1 as _sfc_main$l$1, a2 as ButtonSizeOptions, a5 as useAuthStore, a6 as useToast, a7 as useState, a8 as createUserModelBase, a9 as toastErrorNotification, aa as ButtonVariantOptions, ab as ButtonCategoryOptions, ac as script$6$2, ad as toastSuccessNotification, ae as BACKEND_DATE_FORMAT, af as _sfc_main$i$2, aG as __nuxt_page_meta$1$1, aH as __nuxt_page_meta$5, aN as useRequestEvent, av as useRuntimeConfig, b5 as BaseDirective, aS as useRoute$1, bO as appLayoutTransition, bP as clearError, bQ as createNuxtApp, bR as applyPlugins, aq as createError, aL as useError, aK as showError, aC as definePayloadPlugin, aD as definePayloadReducer, aE as defineNuxtPlugin, aF as setHeadInjectionHandler, ai as navigateTo, aM as getRouteRules, aP as createPinia, aQ as setActivePinia, aR as useRequestHeaders, aT as withoutTrailingSlash, ak as useHead$1, ap as injectHead, a_ as useServerHead, al as parseURL, am as useSwitchLocalePath, bm as parallelPlugin, bn as getHost, aI as useRouter$1, bo as runtimeDetectBrowserLanguage, bp as createLocaleFromRouteGetter, bq as getI18nCookie, br as detectLocale, bs as getLocaleCookie, bt as createI18n, bA as localeCodes, bC as normalizedLocales, bD as loadAndSetLocale, bE as detectRedirect, bF as navigate, bG as loadLocale, bB as localeLoaders, bH as getBrowserLocale, bI as setLocaleCookie, bJ as setLocale, bu as injectNuxtHelpers, bv as addRouteMiddleware, ag as defineNuxtRouteMiddleware, bK as getLocale$1, aO as isNuxtError, aY as stringifyQuery, aZ as useSeoMeta, aU as hasProtocol, a$ as withHttps, b3 as withoutBase, b4 as PrimeVueToastSymbol, b6 as SWITCH_LOCALE_PATH_LINK_IDENTIFIER, b7 as assign, b8 as getComposer$3, b9 as isFunction, ba as isVueI18n, bb as initCommonComposableOptions, bc as wrapComposable, bd as getRouteBaseName, be as resolveRoute, bf as localePath, bg as localeRoute, bh as localeLocation, bi as switchLocalePath, bj as localeHead, bk as resolveBaseUrl, bl as isObject$1, bw as extendBaseUrl, bx as loadVueI18nOptions, by as vueI18nConfigs, bz as loadInitialMessages, bL as mergeLocaleMessage, bM as DEFAULT_LOCALE_ID_COOKIE, aJ as isChangingPage, aV as withLeadingSlash, aW as withBase, aX as withTrailingSlash, b0 as joinURL, b1 as withQuery, bN as getLocaleId, b2 as resolveUnrefHeadInput } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { useHead, CapoPlugin } from 'unhead';
import { useRoute, useRouter, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderStyle, ssrGetDirectiveProps, ssrRenderList, ssrGetDynamicModelProps, ssrRenderVNode, ssrRenderSuspense } from 'vue/server-renderer';
import { useQuery, useQueryClient, useInfiniteQuery, QueryClient, VueQueryPlugin, dehydrate } from '@tanstack/vue-query';
import { FlexRender, createColumnHelper, useVueTable, getCoreRowModel } from '@tanstack/vue-table';
import { isNonNullish, isNullish, splitAt, isDeepEqual } from 'remeda';
import dayjs from 'dayjs';
import { InferSeoMetaPlugin } from '@unhead/addons';
import { defineWebSite, defineWebPage, definePerson, defineOrganization } from '@unhead/schema-org/vue';
import { SchemaOrgUnheadPlugin } from '@unhead/schema-org';
import { parse, stringify } from 'devalue';
import { evaluate, getPaddingObject, getAlignmentAxis, getAxisLength, min as min$1, clamp, getAlignment, placements, getAlignmentSides, getSide, getSideAxis, getOppositePlacement, getExpandedPlacements, getOppositeAxisPlacements, getOppositeAxis, max as max$1, rectToClientRect, getOppositeAlignmentPlacement } from '@floating-ui/utils';
import DOMPurify from 'isomorphic-dompurify';
import { ethers } from 'ethers';
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';
import { unpackMeta } from '@unhead/shared';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';

var t=Object.assign;var i=defineComponent({name:"VueHorizontal",data:()=>({left:0,width:0,scrollWidth:0,hasPrev:!1,hasNext:!1,debounceId:void 0}),props:{button:{type:Boolean,default:()=>!0},buttonBetween:{type:Boolean,default:()=>!0},scroll:{type:Boolean,default:()=>!1},displacement:{type:Number,default:()=>1},snap:{type:String,default:()=>"start"}},mounted(){this.onScrollDebounce();},beforeDestroy(){clearTimeout(this.debounceId);},methods:{children(){return this.$refs.container.children},findPrevSlot(t){const e=this.children();for(let o=0;o<e.length;o++){const l=e[o].getBoundingClientRect();if(l.left<=t&&t<=l.right)return e[o];if(t<=l.left)return e[o]}},findNextSlot(t){const e=this.children();for(let o=0;o<e.length;o++){const l=e[o].getBoundingClientRect();if(!(l.right<=t)){if(l.left<=t)return e[o];if(t<=l.left)return e[o]}}},prev(t){t.stopPropagation(),this.$emit("prev");const e=this.$refs.container,o=e.getBoundingClientRect().left,l=o+e.clientWidth*-this.displacement-2.5,n=this.findPrevSlot(l);if(n){const t=n.getBoundingClientRect().left-o;return void this.scrollToLeft(e.scrollLeft+t)}const i=e.clientWidth*this.displacement;this.scrollToLeft(e.scrollLeft-i);},next(t){t.stopPropagation(),this.$emit("next");const e=this.$refs.container,o=e.getBoundingClientRect().left,l=o+e.clientWidth*this.displacement+2.5,n=this.findNextSlot(l);if(n){const t=n.getBoundingClientRect().left-o;if(t>2.5)return void this.scrollToLeft(e.scrollLeft+t)}const i=e.clientWidth*this.displacement;this.scrollToLeft(e.scrollLeft+i);},scrollToIndex(t){const e=this.children();if(e[t]){const o=this.$refs.container,l=e[t].getBoundingClientRect().left-o.getBoundingClientRect().left;this.scrollToLeft(o.scrollLeft+l);}},scrollToLeft(t,e="smooth"){this.$refs.container.scrollTo({left:t,behavior:e});},onScroll(){const t=this.$refs.container;t&&(this.$emit("scroll",{left:t.scrollLeft}),clearTimeout(this.debounceId),this.debounceId=setTimeout(this.onScrollDebounce,100));},onScrollDebounce(){return this.refresh((t=>{this.$emit("scroll-debounce",t);}))},refresh(t){return nextTick((()=>{const e=this.calculate();this.left=e.left,this.width=e.width,this.scrollWidth=e.scrollWidth,this.hasNext=e.hasNext,this.hasPrev=e.hasPrev,null==t||t(e);}))},calculate(){const t=this.$refs.container,e=this.children()[0];return {left:t.scrollLeft,width:t.clientWidth,scrollWidth:t.scrollWidth,hasNext:t.scrollWidth>t.scrollLeft+t.clientWidth+2.5,hasPrev:function(){var o,l;if(0===t.scrollLeft)return !1;const n=t.getBoundingClientRect().left,i=null!=(l=null==(o=null==e?void 0:e.getBoundingClientRect())?void 0:o.left)?l:0;return Math.abs(n-i)>=2.5}()}}},render(){const e=t=>{const e=h$1("path",{d:"m9.8 12 5 5a1 1 0 1 1-1.4 1.4l-5.7-5.7a1 1 0 0 1 0-1.4l5.7-5.7a1 1 0 0 1 1.4 1.4l-5 5z"}),o=h$1("path",{d:"m14.3 12.1-5-5a1 1 0 0 1 1.4-1.4l5.7 5.7a1 1 0 0 1 0 1.4l-5.7 5.7a1 1 0 0 1-1.4-1.4l5-5z"});return h$1("svg",{class:"v-hl-svg",viewBox:"0 0 24 24","aria-label":`horizontal scroll area button for navigation to ${"prev"===t?"previous":"next"} section`,style:{width:"40px",height:"40px",margin:"6px",padding:"6px","border-radius":"20px","box-sizing":"border-box",background:"white",color:"black",fill:"currentColor","box-shadow":"0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)"}},["prev"===t?e:o])},o=o=>this.button&&("prev"!==o||this.hasPrev)&&("next"!==o||this.hasNext)?h$1("div",{key:"prev"===o?0:1,class:`v-hl-btn v-hl-btn-${o}`,onClick:"prev"===o?this.prev:this.next,role:"button",style:t(t(t({},"prev"===o?{left:0,transform:this.buttonBetween?"translateX(-50%)":"none"}:{right:0,transform:this.buttonBetween?"translateX(50%)":"none"}),{cursor:"pointer",position:"absolute",top:0,bottom:0,display:"flex","align-self":"center","z-index":1,"align-items":"center"}),this.scroll?{}:{"overflow-x":"scroll","scrollbar-width":"none","-ms-overflow-style":"none","padding-bottom":"30px","margin-bottom":"-30px","clip-path":"inset(0 0 30px 0)"})},["prev"===o?this.$slots["btn-prev"]?this.$slots["btn-prev"]():e("prev"):this.$slots["btn-next"]?this.$slots["btn-next"]():e("next")]):createCommentVNode("",!0);return h$1("div",{class:"vue-horizontal",style:{position:"relative",display:"flex"}},[o("prev"),o("next"),h$1("div",{class:"v-hl-container",ref:"container",onScrollPassive:this.onScroll,style:t({display:"flex",width:"100%",margin:0,padding:0,border:"none","box-sizing":"content-box","overflow-x":"scroll","overflow-y":"hidden","scroll-snap-type":"x mandatory","-webkit-overflow-scrolling":"touch"},this.scroll?{}:{"scrollbar-width":"none","-ms-overflow-style":"none","padding-bottom":"30px","margin-bottom":"-30px","clip-path":"inset(0 0 30px 0)"})},(()=>{if(!this.$slots.default)return [];const t=t=>{t.props=t.props||{},t.props.style=t.props.style||{},t.props.style={"flex-shrink":0,"box-sizing":"border-box","min-height":"1px","scroll-snap-align":this.snap};},e=this.$slots.default();return e.forEach((e=>{if(e.el)return t(e);e.children&&Array.isArray(e.children)&&e.children.forEach((e=>{t(e);}));})),e})())])}});

var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$1$1(o)) || allowArrayLike) {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$1$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1$1(o, minLen);
}
function _arrayLikeToArray$1$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var FilterService = {
  filter: function filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    var filteredItems = [];
    if (!value) {
      return filteredItems;
    }
    var _iterator = _createForOfIteratorHelper$1(value), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var item2 = _step.value;
        if (typeof item2 === "string") {
          if (this.filters[filterMatchMode](item2, filterValue, filterLocale)) {
            filteredItems.push(item2);
            continue;
          }
        } else {
          var _iterator2 = _createForOfIteratorHelper$1(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              var fieldValue = ObjectUtils$1.resolveFieldData(item2, field);
              if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                filteredItems.push(item2);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return filteredItems;
  },
  filters: {
    startsWith: function startsWith(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils$1.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils$1.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains: function contains(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils$1.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils$1.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains: function notContains(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils$1.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils$1.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith: function endsWith(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = ObjectUtils$1.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = ObjectUtils$1.removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals: function equals(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() === filter2.getTime();
      else
        return ObjectUtils$1.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == ObjectUtils$1.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals: function notEquals(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() !== filter2.getTime();
      else
        return ObjectUtils$1.removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != ObjectUtils$1.removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
    },
    "in": function _in(value, filter2) {
      if (filter2 === void 0 || filter2 === null || filter2.length === 0) {
        return true;
      }
      for (var i = 0; i < filter2.length; i++) {
        if (ObjectUtils$1.equals(value, filter2[i])) {
          return true;
        }
      }
      return false;
    },
    between: function between(value, filter2) {
      if (filter2 == null || filter2[0] == null || filter2[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime)
        return filter2[0].getTime() <= value.getTime() && value.getTime() <= filter2[1].getTime();
      else
        return filter2[0] <= value && value <= filter2[1];
    },
    lt: function lt(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() < filter2.getTime();
      else
        return value < filter2;
    },
    lte: function lte(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() <= filter2.getTime();
      else
        return value <= filter2;
    },
    gt: function gt(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() > filter2.getTime();
      else
        return value > filter2;
    },
    gte: function gte(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime)
        return value.getTime() >= filter2.getTime();
      else
        return value >= filter2;
    },
    dateIs: function dateIs(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter2.toDateString();
    },
    dateIsNot: function dateIsNot(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter2.toDateString();
    },
    dateBefore: function dateBefore(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter2.getTime();
    },
    dateAfter: function dateAfter(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() > filter2.getTime();
    }
  },
  register: function register(rule, fn) {
    this.filters[rule] = fn;
  }
};
var ToastSeverities = {
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
  SUCCESS: "success"
};
const defaultOptions$1 = {
  maximumFractionDigits: 0,
  notation: "standard"
};
function formatNumber(number, locale = DEFAULT_LOCALE, options2 = defaultOptions$1) {
  const formatter = new Intl.NumberFormat(locale, {
    ...options2
  });
  return formatter.format(number);
}
function formatPrice(number, locale = DEFAULT_LOCALE, currency = AppCurrency.USD, options2 = defaultOptions$1) {
  if (currency === AppCurrency.Fantic) {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: AppCurrency.BTC,
      // Use a placeholder currency
      currencyDisplay: "symbol",
      ...defaultOptions$1,
      ...options2
    });
    const formattedNumberWithPlaceholder = formatter.format(number);
    return formattedNumberWithPlaceholder.replace(AppCurrency.BTC, AppCurrency.Fantic);
  } else {
    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currencyDisplay: "narrowSymbol",
      currency,
      ...defaultOptions$1,
      ...options2
    });
    return formatter.format(number);
  }
}
function formatPercentage(number, options2) {
  const formatOptions = {
    fractionDigits: 2,
    showPercentSign: true,
    modular: false,
    showPlusMinusSign: false,
    ...options2
  };
  const stringifiedNumber = +number.toFixed(formatOptions.fractionDigits);
  const modularValue = Math.abs(+stringifiedNumber);
  const formattedNumber = formatOptions.showPlusMinusSign ? `${number >= 0 ? "+" : "-"}${modularValue}` : formatOptions.modular ? modularValue : stringifiedNumber;
  return formatOptions.showPercentSign ? `${formattedNumber}%` : formattedNumber.toString();
}
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetStatsSlider",
  __ssrInlineRender: true,
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    },
    rank: {
      type: Number,
      default: null
    },
    showValue: {
      type: Boolean,
      default: null
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-items-center tw-justify-between tw-gap-5" }, _attrs))}><div class="tw-bg-primary-500 tw-h-100 tw-w-full tw-relative"><span style="${ssrRenderStyle(`width: ${__props.value}%`)}" class="tw-bg-primary-300 tw-absolute tw-left-0 tw-h-full tw-top-0 before:tw-content-[&#39;&#39;] before:tw-absolute before:tw-right-0 before:tw-w-50 before:tw-h-250 before:tw-bg-primary-50 before:tw--top-1"></span></div>`);
      if (__props.showValue) {
        _push(`<span class="heading-h5">${ssrInterpolate(__props.value)}%</span>`);
      } else if (__props.rank) {
        _push(`<span class="heading-h5 tw-bg-primary-600 tw-text-primary-300 tw-py-0.5 tw-px-1"> #${ssrInterpolate(__props.rank)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/stats/components/DigitalAssetStatsSlider.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "DeTooltip",
  __ssrInlineRender: true,
  props: {
    distance: {
      type: Number,
      default: 6
    },
    placement: {
      type: String,
      default: "top"
    },
    autoHide: {
      type: Boolean,
      default: true
    },
    popperClass: {
      type: String,
      default: "tw-max-w-96"
    }
  },
  setup(__props) {
    const ariaId = useId("$qqW35fB9dK");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_menu = resolveComponent("v-menu");
      _push(ssrRenderComponent(_component_v_menu, mergeProps({
        "aria-id": unref(ariaId),
        distance: __props.distance,
        placement: __props.placement,
        "auto-hide": __props.autoHide,
        "popper-class": __props.popperClass,
        theme: "info-tooltip"
      }, _attrs), {
        popper: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "content", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "content")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/tooltip/DeTooltip.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "DeMetricChangeIndicator",
  __ssrInlineRender: true,
  props: {
    value: {},
    numberClass: {},
    iconClass: { default: "tw-w-300 tw-h-300" },
    showIcon: { type: Boolean, default: true },
    showPercentSign: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const isSuccess = computed(() => {
      return props.value >= 0;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["tw-flex tw-items-center", isSuccess.value ? "tw-text-success-500" : "tw-text-accent-500"]
      }, _attrs))}>`);
      if (_ctx.showIcon) {
        _push(ssrRenderComponent(_sfc_main$m$1, {
          name: "chevron-down-filled",
          class: ["tw-mr-0.5", [{ "tw-rotate-180": isSuccess.value }, _ctx.iconClass]]
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="${ssrRenderClass(_ctx.numberClass)}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></div>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/DeMetricChangeIndicator.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetStatsMetricLayout",
  __ssrInlineRender: true,
  props: {
    metricName: {},
    metricValue: {},
    metricDescription: {},
    metricChangeValue: {},
    coinRankNumber: {},
    coinRankPercentage: {},
    showRankingValue: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_safe_html = resolveDirective("safe-html");
      let _temp0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="tw-flex tw-justify-between tw-items-center tw-gap-x-4"><dt class="tw-flex tw-gap-1.5"><div class="heading-h5 tw-text-primary-300 tw-overflow-hidden tw-text-ellipsis">${ssrInterpolate(_ctx.metricName)}</div>`);
      if (_ctx.metricDescription) {
        _push(ssrRenderComponent(_sfc_main$l, {
          placement: "right",
          class: "tw-flex tw-items-center"
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a;
            if (_push2) {
              _push2(`<span${ssrRenderAttrs(_temp0 = ssrGetDirectiveProps(_ctx, _directive_safe_html, _ctx.metricDescription))}${_scopeId}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</span>`);
            } else {
              return [
                withDirectives(createVNode("span", null, null, 512), [
                  [_directive_safe_html, _ctx.metricDescription]
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: "info",
                class: "tw-text-primary-400"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$m$1, {
                  name: "info",
                  class: "tw-text-primary-400"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</dt><dd class="tw-flex tw-items-center tw-gap-2.5">`);
      if (_ctx.metricChangeValue) {
        _push(ssrRenderComponent(_sfc_main$k, { value: _ctx.metricChangeValue }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="heading-h5"${_scopeId}>${ssrInterpolate(unref(formatPercentage)(_ctx.metricChangeValue))}</span>`);
            } else {
              return [
                createVNode("span", { class: "heading-h5" }, toDisplayString(unref(formatPercentage)(_ctx.metricChangeValue)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="heading-h5">${ssrInterpolate(_ctx.metricValue)}</div></dd></div>`);
      if (_ctx.coinRankPercentage) {
        _push(ssrRenderComponent(_sfc_main$m, {
          value: _ctx.coinRankPercentage,
          rank: _ctx.coinRankNumber,
          class: "tw-mt-1.5",
          "show-value": _ctx.showRankingValue
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/stats/components/DigitalAssetStatsMetricLayout.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
var CryptoMetric = /* @__PURE__ */ ((CryptoMetric2) => {
  CryptoMetric2["Price"] = "price";
  CryptoMetric2["High24h"] = "high24H";
  CryptoMetric2["Low24h"] = "low24H";
  CryptoMetric2["Low1m"] = "low1M";
  CryptoMetric2["High1m"] = "high1M";
  CryptoMetric2["High1y"] = "high1Y";
  CryptoMetric2["Low1y"] = "low1Y";
  CryptoMetric2["PricePercentChange1h"] = "pricePercentChange1H";
  CryptoMetric2["PricePercentChange24h"] = "pricePercentChange24H";
  CryptoMetric2["PricePercentChange7d"] = "pricePercentChange7D";
  CryptoMetric2["PricePercentChange30d"] = "pricePercentChange30D";
  CryptoMetric2["PricePercentChange60d"] = "pricePercentChange60D";
  CryptoMetric2["PricePercentChange90d"] = "pricePercentChange90D";
  CryptoMetric2["YtdPriceChangePercentage"] = "ytdPriceChangePercentage";
  CryptoMetric2["MarketCap"] = "marketCap";
  CryptoMetric2["FullyDilluttedMarketCap"] = "fullyDilluttedMarketCap";
  CryptoMetric2["Volume24h"] = "volume24h";
  CryptoMetric2["Volume7d"] = "volume7d";
  CryptoMetric2["Volume30d"] = "volume30d";
  CryptoMetric2["VolumeMCap"] = "volumeMCap";
  CryptoMetric2["CirculatingSupply"] = "circulatingSupply";
  CryptoMetric2["TotalSupply"] = "totalSupply";
  CryptoMetric2["MaxSupply"] = "maxSupply";
  CryptoMetric2["ATH"] = "ath";
  CryptoMetric2["ATL"] = "atl";
  CryptoMetric2["ATHChangePercentage"] = "athChangePercentage";
  CryptoMetric2["ATLChangePercentage"] = "atlChangePercentage";
  CryptoMetric2["Chart24h"] = "chart24h";
  CryptoMetric2["Chart7d"] = "chart7d";
  CryptoMetric2["Chart30d"] = "chart30d";
  CryptoMetric2["Chart60d"] = "chart60d";
  CryptoMetric2["Chart90d"] = "chart90d";
  CryptoMetric2["Audited"] = "audited";
  CryptoMetric2["Dominance"] = "dominance";
  CryptoMetric2["Tvl"] = "tvl";
  return CryptoMetric2;
})(CryptoMetric || {});
const _sfc_main$i$1 = /* @__PURE__ */ defineComponent({
  __name: "CryptoStatsMetrics",
  __ssrInlineRender: true,
  props: {
    crypto: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const appStore = useAppStore();
    const userStore = useUserStore();
    const priceFormatter = (value) => {
      return formatPrice(value, appStore.locale, userStore.user.currencyShortName);
    };
    const numberFormatter = (value) => {
      return `${formatNumber(value, appStore.locale)} ${props.crypto.symbol}`;
    };
    const marketCap = computed(() => {
      const value = props.crypto[CryptoMetric.MarketCap];
      return value ? priceFormatter(value) : null;
    });
    const volume24h = computed(() => {
      const value = props.crypto[CryptoMetric.Volume24h];
      return value ? priceFormatter(value) : null;
    });
    const volumeMCap = computed(() => {
      const value = props.crypto[CryptoMetric.VolumeMCap];
      return value ? formatPercentage(value) : null;
    });
    const circulatingSupply = computed(() => {
      const value = props.crypto[CryptoMetric.CirculatingSupply];
      return value ? numberFormatter(value) : null;
    });
    const totalSupply = computed(() => {
      const value = props.crypto[CryptoMetric.TotalSupply];
      return value ? numberFormatter(value) : null;
    });
    const maxSupply = computed(() => {
      const value = props.crypto[CryptoMetric.MaxSupply];
      return value ? numberFormatter(value) : null;
    });
    const fullyDilluttedMarketCap = computed(() => {
      const value = props.crypto[CryptoMetric.FullyDilluttedMarketCap];
      return value ? priceFormatter(value) : null;
    });
    const isAtLeastOneMetricAvailable = computed(() => {
      return marketCap.value || volume24h.value || volumeMCap.value || circulatingSupply.value || totalSupply.value || maxSupply.value || fullyDilluttedMarketCap.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (isAtLeastOneMetricAvailable.value) {
        _push(`<dl${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col tw-gap-5" }, _attrs))}>`);
        if (marketCap.value) {
          _push(ssrRenderComponent(_sfc_main$j, {
            "metric-name": unref(t)("coins.metrics.marketCap"),
            "metric-description": unref(t)("coins.metrics.explanations.marketCap"),
            "metric-value": marketCap.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (volume24h.value) {
          _push(ssrRenderComponent(_sfc_main$j, {
            "metric-name": unref(t)("coins.metrics.volume"),
            "metric-description": unref(t)("coins.metrics.explanations.volume"),
            "metric-value": volume24h.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (volumeMCap.value) {
          _push(ssrRenderComponent(_sfc_main$j, {
            "metric-name": `${unref(t)("coins.metrics.volume")}/${unref(t)("coins.metrics.marketCap")} (24${unref(t)("common.time.h")})`,
            "metric-description": unref(t)("coins.metrics.explanations.volumeMarketCap"),
            "metric-value": volumeMCap.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (circulatingSupply.value) {
          _push(ssrRenderComponent(_sfc_main$j, {
            "metric-name": unref(t)("coins.metrics.circulatingSupply"),
            "metric-description": unref(t)("coins.metrics.explanations.circulatingSupply"),
            "metric-value": circulatingSupply.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (totalSupply.value) {
          _push(ssrRenderComponent(_sfc_main$j, {
            "metric-name": unref(t)("coins.metrics.totalSupply"),
            "metric-description": unref(t)("coins.metrics.explanations.totalSupply"),
            "metric-value": totalSupply.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (maxSupply.value) {
          _push(ssrRenderComponent(_sfc_main$j, {
            "metric-name": unref(t)("coins.metrics.maxSupply"),
            "metric-description": unref(t)("coins.metrics.explanations.maxSupply"),
            "metric-value": maxSupply.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (fullyDilluttedMarketCap.value) {
          _push(ssrRenderComponent(_sfc_main$j, {
            "metric-name": unref(t)("coins.metrics.fullyDilluttedMarketCap"),
            "metric-description": unref(t)("coins.metrics.explanations.fullyDilluttedMarketCap"),
            "metric-value": fullyDilluttedMarketCap.value
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</dl>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$i$1 = _sfc_main$i$1.setup;
_sfc_main$i$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/crypto/components/stats/CryptoStatsMetrics.vue");
  return _sfc_setup$i$1 ? _sfc_setup$i$1(props, ctx) : void 0;
};
const _sfc_main$h$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetStatsShareBtn",
  __ssrInlineRender: true,
  props: {
    name: {},
    price: {},
    image: {}
  },
  setup(__props) {
    const isDialogVisible = ref(false);
    function openShareDialog() {
      isDialogVisible.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2$1;
      _push(`<!--[--><button${ssrRenderAttrs(_ctx.$attrs)}>`);
      _push(ssrRenderComponent(_sfc_main$m$1, {
        name: "social-share",
        class: "tw-w-500 tw-h-500 tw-text-primary-400",
        onClick: openShareDialog
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$h$1 = _sfc_main$h$1.setup;
_sfc_main$h$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/stats/components/DigitalAssetStatsShareBtn.vue");
  return _sfc_setup$h$1 ? _sfc_setup$h$1(props, ctx) : void 0;
};
const _sfc_main$g$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetIcon",
  __ssrInlineRender: true,
  props: {
    src: {},
    alt: {}
  },
  setup(__props) {
    const props = __props;
    const responsiveIconSrc = computed(() => ({
      x1: getResponsiveImageUrl(props.src, 28, 28, 1),
      x2: getResponsiveImageUrl(props.src, 28, 28, 2)
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<img${ssrRenderAttrs(mergeProps({
        src: responsiveIconSrc.value.x1,
        srcset: `${responsiveIconSrc.value.x2} 2x, ${responsiveIconSrc.value.x1} 1x`,
        alt: `${_ctx.alt} logo`,
        loading: "lazy",
        decoding: "async",
        fetchpriority: "low",
        class: "tw-w-700 tw-h-700 tw-rounded-full"
      }, _attrs))}>`);
    };
  }
});
const _sfc_setup$g$1 = _sfc_main$g$1.setup;
_sfc_main$g$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/components/DigitalAssetIcon.vue");
  return _sfc_setup$g$1 ? _sfc_setup$g$1(props, ctx) : void 0;
};
const _sfc_main$f$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetStatsHeader",
  __ssrInlineRender: true,
  props: {
    name: {},
    image: {},
    price: {},
    symbol: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "lg:tw-sticky tw-top-0 tw-z-10 tw-p-5 tw-bg-primary-700" }, _attrs))}><div class="tw-grid tw-grid-cols-[max-content_1fr_min-content] tw-items-center tw-gap-2.5 tw-mb-5">`);
      if (_ctx.image) {
        _push(`<div class="tw-rounded-full tw-overflow-hidden">`);
        _push(ssrRenderComponent(_sfc_main$g$1, {
          src: _ctx.image,
          alt: _ctx.name
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-flex tw-gap-2.5"><h1 class="heading-h5">${ssrInterpolate(_ctx.name)}</h1>`);
      if (_ctx.symbol) {
        _push(`<span class="tw-text-primary-300 tw-text-350 tw-leading-450">${ssrInterpolate(_ctx.symbol)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$h$1, {
        image: _ctx.image,
        name: _ctx.name,
        price: _ctx.price,
        class: "tw-ml-auto"
      }, null, _parent));
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$f$1 = _sfc_main$f$1.setup;
_sfc_main$f$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/stats/components/DigitalAssetStatsHeader.vue");
  return _sfc_setup$f$1 ? _sfc_setup$f$1(props, ctx) : void 0;
};
const _sfc_main$e$1 = /* @__PURE__ */ defineComponent({
  __name: "DeTag",
  __ssrInlineRender: true,
  props: {
    value: {},
    hoverable: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["tw-bg-primary-700 tw-transition-colors tw-py-1.5 tw-pl-1.5 tw-pr-2 tw-leading-400", { "hover:tw-bg-primary-600": _ctx.hoverable }]
      }, _attrs))}>`);
      if (_ctx.value || _ctx.$slots.default) {
        ssrRenderSlot(_ctx.$slots, "default", {}, () => {
          _push(`${ssrInterpolate(_ctx.value)}`);
        }, _push, _parent);
      } else {
        _push(`<!---->`);
      }
      _push(`</span>`);
    };
  }
});
const _sfc_setup$e$1 = _sfc_main$e$1.setup;
_sfc_main$e$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/tags/DeTag.vue");
  return _sfc_setup$e$1 ? _sfc_setup$e$1(props, ctx) : void 0;
};
const digitalAssetSocialLinkIconMapper = {
  discord: "socials--discord",
  twitter: "socials--twitter",
  facebook: "socials--facebook-round",
  reddit: "socials--reddit",
  telegram: "socials--telegram-round",
  instagram: "socials--instagram",
  medium: "socials--medium",
  youtube: "socials--youtube",
  github: "socials--github",
  other: "globe"
};
const _sfc_main$d$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetSocialLinks",
  __ssrInlineRender: true,
  props: {
    socialMediaLinks: {},
    website: {},
    whitepaper: {},
    github: {}
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[-->`);
      if (_ctx.website || _ctx.whitepaper || _ctx.github) {
        _push(`<div><div class="heading-h5 tw-mb-5">${ssrInterpolate(unref(t)("common.officialLinks"))}</div><div class="tw-flex tw-gap-2.5">`);
        if (_ctx.website) {
          _push(ssrRenderComponent(_sfc_main$e$1, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<a${ssrRenderAttr("href", _ctx.website)} rel="nofollow noopener" target="_blank" class="tw-whitespace-nowrap"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$m$1, {
                  name: "globe",
                  class: "tw-mr-1 tw-text-primary-400"
                }, null, _parent2, _scopeId));
                _push2(`<span class="heading-h5"${_scopeId}>${ssrInterpolate(unref(t)("form.website"))}</span></a>`);
              } else {
                return [
                  createVNode("a", {
                    href: _ctx.website,
                    rel: "nofollow noopener",
                    target: "_blank",
                    class: "tw-whitespace-nowrap"
                  }, [
                    createVNode(_sfc_main$m$1, {
                      name: "globe",
                      class: "tw-mr-1 tw-text-primary-400"
                    }),
                    createVNode("span", { class: "heading-h5" }, toDisplayString(unref(t)("form.website")), 1)
                  ], 8, ["href"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.whitepaper) {
          _push(ssrRenderComponent(_sfc_main$e$1, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<a${ssrRenderAttr("href", _ctx.whitepaper)} rel="nofollow noopener" target="_blank" class="tw-whitespace-nowrap"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$m$1, {
                  name: "file",
                  class: "tw-mr-1 tw-text-primary-400"
                }, null, _parent2, _scopeId));
                _push2(`<span class="heading-h5"${_scopeId}>${ssrInterpolate(unref(t)("digitalAsset.whitepaper"))}</span></a>`);
              } else {
                return [
                  createVNode("a", {
                    href: _ctx.whitepaper,
                    rel: "nofollow noopener",
                    target: "_blank",
                    class: "tw-whitespace-nowrap"
                  }, [
                    createVNode(_sfc_main$m$1, {
                      name: "file",
                      class: "tw-mr-1 tw-text-primary-400"
                    }),
                    createVNode("span", { class: "heading-h5" }, toDisplayString(unref(t)("digitalAsset.whitepaper")), 1)
                  ], 8, ["href"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.github) {
          _push(ssrRenderComponent(_sfc_main$e$1, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<a${ssrRenderAttr("href", _ctx.github)} rel="nofollow noopener" target="_blank" class="tw-whitespace-nowrap"${_scopeId}>`);
                _push2(ssrRenderComponent(_sfc_main$m$1, {
                  name: "socials--github",
                  class: "tw-mr-1 tw-text-primary-400"
                }, null, _parent2, _scopeId));
                _push2(`<span class="heading-h5"${_scopeId}>Github</span></a>`);
              } else {
                return [
                  createVNode("a", {
                    href: _ctx.github,
                    rel: "nofollow noopener",
                    target: "_blank",
                    class: "tw-whitespace-nowrap"
                  }, [
                    createVNode(_sfc_main$m$1, {
                      name: "socials--github",
                      class: "tw-mr-1 tw-text-primary-400"
                    }),
                    createVNode("span", { class: "heading-h5" }, "Github")
                  ], 8, ["href"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_a = _ctx.socialMediaLinks) == null ? void 0 : _a.length) {
        _push(`<div><div class="heading-h5 tw-mb-5">${ssrInterpolate(unref(t)("common.socialMedia"))}</div><div class="tw-flex tw-gap-2.5"><!--[-->`);
        ssrRenderList(_ctx.socialMediaLinks, (item2, idx) => {
          _push(`<a${ssrRenderAttr("href", item2.url)} rel="nofollow noopener" target="_blank" class="tw-bg-primary-600 hover:tw-bg-primary-700 tw-rounded-full tw-w-800 tw-h-800 tw-flex tw-items-center tw-justify-center">`);
          _push(ssrRenderComponent(_sfc_main$m$1, {
            name: unref(digitalAssetSocialLinkIconMapper)[item2.type]
          }, null, _parent));
          _push(`</a>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$d$1 = _sfc_main$d$1.setup;
_sfc_main$d$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/social-link/components/DigitalAssetSocialLinks.vue");
  return _sfc_setup$d$1 ? _sfc_setup$d$1(props, ctx) : void 0;
};
const _sfc_main$c$1 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetConverter",
  __ssrInlineRender: true,
  props: {
    symbol: {},
    conversionRate: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const userStore = useUserStore();
    const amountCoin = ref("1");
    const amountUserCurrency = ref("");
    watch(
      () => props.conversionRate,
      (val) => {
        amountUserCurrency.value = (+val * +amountCoin.value).toFixed(2);
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_number_input = resolveDirective("number-input");
      let _temp0, _temp1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="heading-h5 tw-mb-5">${ssrInterpolate(unref(t)("digitalAsset.assetToUserCurrencyConverter", {
        asset: _ctx.symbol,
        userCurrency: unref(userStore).user.currencyShortName
      }))}</div><div class="tw-grid tw-grid-cols-[1fr_min-content_1fr] tw-items-center"><div class="tw-flex tw-items-center tw-border tw-border-primary-500 hover:tw-border-primary-400 tw-transition tw-px-3 tw-py-2 tw-text-350 tw-leading-500"><span class="tw-mr-2 tw-text-primary-300">${ssrInterpolate(_ctx.symbol)}</span><input${ssrRenderAttrs((_temp0 = mergeProps({
        value: amountCoin.value,
        class: "tw-text-right tw-bg-transparent tw-w-full tw-outline-none"
      }, ssrGetDirectiveProps(_ctx, _directive_number_input)), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, amountCoin.value))))}></div>`);
      _push(ssrRenderComponent(_sfc_main$m$1, {
        name: "arrow-right-left",
        class: "tw-w-450 tw-h-450 tw-mx-1.5 tw-text-2xl tw-text-primary-400"
      }, null, _parent));
      _push(`<div class="tw-flex tw-items-center tw-border tw-border-primary-500 hover:tw-border-primary-400 tw-transition tw-px-3 tw-py-2 tw-text-350 tw-leading-500"><span class="tw-mr-2 tw-text-primary-300">${ssrInterpolate(unref(userStore).user.currencyShortName)}</span><input${ssrRenderAttrs((_temp1 = mergeProps({
        value: amountUserCurrency.value,
        class: "tw-text-right tw-bg-transparent tw-w-full tw-outline-none"
      }, ssrGetDirectiveProps(_ctx, _directive_number_input)), mergeProps(_temp1, ssrGetDynamicModelProps(_temp1, amountUserCurrency.value))))}></div></div></div>`);
    };
  }
});
const _sfc_setup$c$1 = _sfc_main$c$1.setup;
_sfc_main$c$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/components/DigitalAssetConverter.vue");
  return _sfc_setup$c$1 ? _sfc_setup$c$1(props, ctx) : void 0;
};
function capitalizeWord(word) {
  if (!word)
    return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}
const _sfc_main$b$2 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetTags",
  __ssrInlineRender: true,
  props: {
    tags: {}
  },
  setup(__props) {
    const props = __props;
    const isAllTagsShown = ref(false);
    function toggleTagsVisibility() {
      isAllTagsShown.value = !isAllTagsShown.value;
    }
    const tagsToShow = computed(() => {
      var _a;
      return isAllTagsShown.value ? props.tags : (_a = props.tags) == null ? void 0 : _a.slice(0, 3);
    });
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="heading-h5 tw-mb-5">${ssrInterpolate(unref(t)("common.tags"))}</div><div class="tw-flex tw-flex-wrap tw-items-center lg:tw-justify-between tw-gap-2.5"><div class="tw-flex tw-flex-wrap tw-gap-2.5"><!--[-->`);
      ssrRenderList(tagsToShow.value, (item2, idx) => {
        _push(ssrRenderComponent(_sfc_main$e$1, { key: idx }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tw-text-350 tw-font-medium tw-leading-450 tw-tracking-wide tw-whitespace-nowrap"${_scopeId}>${ssrInterpolate(unref(capitalizeWord)(item2.name || item2))}</span>`);
            } else {
              return [
                createVNode("span", { class: "tw-text-350 tw-font-medium tw-leading-450 tw-tracking-wide tw-whitespace-nowrap" }, toDisplayString(unref(capitalizeWord)(item2.name || item2)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (((_a = _ctx.tags) == null ? void 0 : _a.length) > 3) {
        _push(ssrRenderComponent(_sfc_main$b$3, {
          type: "link",
          onClick: toggleTagsVisibility
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="tw-text-350 tw-leading-500"${_scopeId}>${ssrInterpolate(isAllTagsShown.value ? unref(t)("common.buttons.showLess") : unref(t)("common.buttons.showAll"))}</span>`);
            } else {
              return [
                createVNode("span", { class: "tw-text-350 tw-leading-500" }, toDisplayString(isAllTagsShown.value ? unref(t)("common.buttons.showLess") : unref(t)("common.buttons.showAll")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$b$2 = _sfc_main$b$2.setup;
_sfc_main$b$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/tags/components/DigitalAssetTags.vue");
  return _sfc_setup$b$2 ? _sfc_setup$b$2(props, ctx) : void 0;
};
var script$7$1 = {
  name: "BlankIcon",
  "extends": script$8$1
};
var _hoisted_1$5$1 = /* @__PURE__ */ createElementVNode("rect", {
  width: "1",
  height: "1",
  fill: "currentColor",
  "fill-opacity": "0"
}, null, -1);
var _hoisted_2$4$1 = [_hoisted_1$5$1];
function render$6$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$4$1, 16);
}
script$7$1.render = render$6$1;
var script$6$1 = {
  name: "ChevronDownIcon",
  "extends": script$8$1
};
var _hoisted_1$4$1 = /* @__PURE__ */ createElementVNode("path", {
  d: "M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$3$1 = [_hoisted_1$4$1];
function render$5$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$3$1, 16);
}
script$6$1.render = render$5$1;
var script$5$1 = {
  name: "SearchIcon",
  "extends": script$8$1
};
var _hoisted_1$3$1 = /* @__PURE__ */ createElementVNode("path", {
  "fill-rule": "evenodd",
  "clip-rule": "evenodd",
  d: "M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$2$1 = [_hoisted_1$3$1];
function render$4$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$2$1, 16);
}
script$5$1.render = render$4$1;
var script$4$1 = {
  name: "TimesIcon",
  "extends": script$8$1
};
var _hoisted_1$2$1 = /* @__PURE__ */ createElementVNode("path", {
  d: "M8.01186 7.00933L12.27 2.75116C12.341 2.68501 12.398 2.60524 12.4375 2.51661C12.4769 2.42798 12.4982 2.3323 12.4999 2.23529C12.5016 2.13827 12.4838 2.0419 12.4474 1.95194C12.4111 1.86197 12.357 1.78024 12.2884 1.71163C12.2198 1.64302 12.138 1.58893 12.0481 1.55259C11.9581 1.51625 11.8617 1.4984 11.7647 1.50011C11.6677 1.50182 11.572 1.52306 11.4834 1.56255C11.3948 1.60204 11.315 1.65898 11.2488 1.72997L6.99067 5.98814L2.7325 1.72997C2.59553 1.60234 2.41437 1.53286 2.22718 1.53616C2.03999 1.53946 1.8614 1.61529 1.72901 1.74767C1.59663 1.88006 1.5208 2.05865 1.5175 2.24584C1.5142 2.43303 1.58368 2.61419 1.71131 2.75116L5.96948 7.00933L1.71131 11.2675C1.576 11.403 1.5 11.5866 1.5 11.7781C1.5 11.9696 1.576 12.1532 1.71131 12.2887C1.84679 12.424 2.03043 12.5 2.2219 12.5C2.41338 12.5 2.59702 12.424 2.7325 12.2887L6.99067 8.03052L11.2488 12.2887C11.3843 12.424 11.568 12.5 11.7594 12.5C11.9509 12.5 12.1346 12.424 12.27 12.2887C12.4053 12.1532 12.4813 11.9696 12.4813 11.7781C12.4813 11.5866 12.4053 11.403 12.27 11.2675L8.01186 7.00933Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$1$2 = [_hoisted_1$2$1];
function render$3$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$1$2, 16);
}
script$4$1.render = render$3$1;
var OverlayEventBus = primebus();
var script$3$2 = {
  name: "Portal",
  props: {
    appendTo: {
      type: [String, Object],
      "default": "body"
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  },
  data: function data() {
    return {
      mounted: false
    };
  },
  mounted: function mounted() {
    this.mounted = DomHandler.isClient();
  },
  computed: {
    inline: function inline() {
      return this.disabled || this.appendTo === "self";
    }
  }
};
function render$2$2(_ctx, _cache, $props, $setup, $data, $options) {
  return $options.inline ? renderSlot(_ctx.$slots, "default", {
    key: 0
  }) : $data.mounted ? (openBlock(), createBlock(Teleport, {
    key: 1,
    to: $props.appendTo
  }, [renderSlot(_ctx.$slots, "default")], 8, ["to"])) : createCommentVNode("", true);
}
script$3$2.render = render$2$2;
var css = "\n@layer primevue {\n    .p-virtualscroller {\n        position: relative;\n        overflow: auto;\n        contain: strict;\n        transform: translateZ(0);\n        will-change: scroll-position;\n        outline: 0 none;\n    }\n\n    .p-virtualscroller-content {\n        position: absolute;\n        top: 0;\n        left: 0;\n        /* contain: content; */\n        min-height: 100%;\n        min-width: 100%;\n        will-change: transform;\n    }\n\n    .p-virtualscroller-spacer {\n        position: absolute;\n        top: 0;\n        left: 0;\n        height: 1px;\n        width: 1px;\n        transform-origin: 0 0;\n        pointer-events: none;\n    }\n\n    .p-virtualscroller .p-virtualscroller-loader {\n        position: sticky;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n    }\n\n    .p-virtualscroller-loader.p-component-overlay {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n    }\n\n    .p-virtualscroller-loading-icon {\n        font-size: 2rem;\n    }\n\n    .p-virtualscroller-loading-icon.p-icon {\n        width: 2rem;\n        height: 2rem;\n    }\n\n    .p-virtualscroller-horizontal > .p-virtualscroller-content {\n        display: flex;\n    }\n\n    /* Inline */\n    .p-virtualscroller-inline .p-virtualscroller-content {\n        position: static;\n    }\n}\n";
var VirtualScrollerStyle = BaseStyle.extend({
  name: "virtualscroller",
  css
});
var script$1$1$2 = {
  name: "BaseVirtualScroller",
  "extends": script$a,
  props: {
    id: {
      type: String,
      "default": null
    },
    style: null,
    "class": null,
    items: {
      type: Array,
      "default": null
    },
    itemSize: {
      type: [Number, Array],
      "default": 0
    },
    scrollHeight: null,
    scrollWidth: null,
    orientation: {
      type: String,
      "default": "vertical"
    },
    numToleratedItems: {
      type: Number,
      "default": null
    },
    delay: {
      type: Number,
      "default": 0
    },
    resizeDelay: {
      type: Number,
      "default": 10
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    loaderDisabled: {
      type: Boolean,
      "default": false
    },
    columns: {
      type: Array,
      "default": null
    },
    loading: {
      type: Boolean,
      "default": false
    },
    showSpacer: {
      type: Boolean,
      "default": true
    },
    showLoader: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    inline: {
      type: Boolean,
      "default": false
    },
    step: {
      type: Number,
      "default": 0
    },
    appendOnly: {
      type: Boolean,
      "default": false
    },
    autoSize: {
      type: Boolean,
      "default": false
    }
  },
  style: VirtualScrollerStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  },
  beforeMount: function beforeMount() {
    var _this$$primevueConfig;
    VirtualScrollerStyle.loadStyle({
      nonce: (_this$$primevueConfig = this.$primevueConfig) === null || _this$$primevueConfig === void 0 || (_this$$primevueConfig = _this$$primevueConfig.csp) === null || _this$$primevueConfig === void 0 ? void 0 : _this$$primevueConfig.nonce
    });
  }
};
function _typeof$2$1(o) {
  "@babel/helpers - typeof";
  return _typeof$2$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2$1(o);
}
function ownKeys$2$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2$1(Object(t), true).forEach(function(r2) {
      _defineProperty$2$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2$1(obj, key, value) {
  key = _toPropertyKey$2$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2$1(t) {
  var i = _toPrimitive$2$1(t, "string");
  return "symbol" == _typeof$2$1(i) ? i : String(i);
}
function _toPrimitive$2$1(t, r) {
  if ("object" != _typeof$2$1(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2$1(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$2$2 = {
  name: "VirtualScroller",
  "extends": script$1$1$2,
  inheritAttrs: false,
  emits: ["update:numToleratedItems", "scroll", "scroll-index-change", "lazy-load"],
  data: function data2() {
    var both = this.isBoth();
    return {
      first: both ? {
        rows: 0,
        cols: 0
      } : 0,
      last: both ? {
        rows: 0,
        cols: 0
      } : 0,
      page: both ? {
        rows: 0,
        cols: 0
      } : 0,
      numItemsInViewport: both ? {
        rows: 0,
        cols: 0
      } : 0,
      lastScrollPos: both ? {
        top: 0,
        left: 0
      } : 0,
      d_numToleratedItems: this.numToleratedItems,
      d_loading: this.loading,
      loaderArr: [],
      spacerStyle: {},
      contentStyle: {}
    };
  },
  element: null,
  content: null,
  lastScrollPos: null,
  scrollTimeout: null,
  resizeTimeout: null,
  defaultWidth: 0,
  defaultHeight: 0,
  defaultContentWidth: 0,
  defaultContentHeight: 0,
  isRangeChanged: false,
  lazyLoadState: {},
  resizeListener: null,
  initialized: false,
  watch: {
    numToleratedItems: function numToleratedItems(newValue) {
      this.d_numToleratedItems = newValue;
    },
    loading: function loading(newValue, oldValue) {
      if (this.lazy && newValue !== oldValue && newValue !== this.d_loading) {
        this.d_loading = newValue;
      }
    },
    items: function items(newValue, oldValue) {
      if (!oldValue || oldValue.length !== (newValue || []).length) {
        this.init();
        this.calculateAutoSize();
      }
    },
    itemSize: function itemSize() {
      this.init();
      this.calculateAutoSize();
    },
    orientation: function orientation() {
      this.lastScrollPos = this.isBoth() ? {
        top: 0,
        left: 0
      } : 0;
    },
    scrollHeight: function scrollHeight() {
      this.init();
      this.calculateAutoSize();
    },
    scrollWidth: function scrollWidth() {
      this.init();
      this.calculateAutoSize();
    }
  },
  mounted: function mounted2() {
    this.viewInit();
    this.lastScrollPos = this.isBoth() ? {
      top: 0,
      left: 0
    } : 0;
    this.lazyLoadState = this.lazyLoadState || {};
  },
  updated: function updated() {
    !this.initialized && this.viewInit();
  },
  unmounted: function unmounted() {
    this.unbindResizeListener();
    this.initialized = false;
  },
  methods: {
    viewInit: function viewInit() {
      if (DomHandler.isVisible(this.element)) {
        this.setContentEl(this.content);
        this.init();
        this.calculateAutoSize();
        this.bindResizeListener();
        this.defaultWidth = DomHandler.getWidth(this.element);
        this.defaultHeight = DomHandler.getHeight(this.element);
        this.defaultContentWidth = DomHandler.getWidth(this.content);
        this.defaultContentHeight = DomHandler.getHeight(this.content);
        this.initialized = true;
      }
    },
    init: function init() {
      if (!this.disabled) {
        this.setSize();
        this.calculateOptions();
        this.setSpacerSize();
      }
    },
    isVertical: function isVertical() {
      return this.orientation === "vertical";
    },
    isHorizontal: function isHorizontal() {
      return this.orientation === "horizontal";
    },
    isBoth: function isBoth() {
      return this.orientation === "both";
    },
    scrollTo: function scrollTo(options2) {
      this.element && this.element.scrollTo(options2);
    },
    scrollToIndex: function scrollToIndex(index) {
      var _this = this;
      var behavior = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "auto";
      var both = this.isBoth();
      var horizontal = this.isHorizontal();
      var valid = both ? index.every(function(i) {
        return i > -1;
      }) : index > -1;
      if (valid) {
        var first = this.first;
        var _this$element = this.element, _this$element$scrollT = _this$element.scrollTop, scrollTop = _this$element$scrollT === void 0 ? 0 : _this$element$scrollT, _this$element$scrollL = _this$element.scrollLeft, scrollLeft = _this$element$scrollL === void 0 ? 0 : _this$element$scrollL;
        var _this$calculateNumIte = this.calculateNumItems(), numToleratedItems2 = _this$calculateNumIte.numToleratedItems;
        var contentPos = this.getContentPosition();
        var itemSize2 = this.itemSize;
        var calculateFirst = function calculateFirst2() {
          var _index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          var _numT = arguments.length > 1 ? arguments[1] : void 0;
          return _index <= _numT ? 0 : _index;
        };
        var calculateCoord = function calculateCoord2(_first, _size, _cpos) {
          return _first * _size + _cpos;
        };
        var scrollTo2 = function scrollTo3() {
          var left = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          var top = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          return _this.scrollTo({
            left,
            top,
            behavior
          });
        };
        var newFirst = both ? {
          rows: 0,
          cols: 0
        } : 0;
        var isRangeChanged = false, isScrollChanged = false;
        if (both) {
          newFirst = {
            rows: calculateFirst(index[0], numToleratedItems2[0]),
            cols: calculateFirst(index[1], numToleratedItems2[1])
          };
          scrollTo2(calculateCoord(newFirst.cols, itemSize2[1], contentPos.left), calculateCoord(newFirst.rows, itemSize2[0], contentPos.top));
          isScrollChanged = this.lastScrollPos.top !== scrollTop || this.lastScrollPos.left !== scrollLeft;
          isRangeChanged = newFirst.rows !== first.rows || newFirst.cols !== first.cols;
        } else {
          newFirst = calculateFirst(index, numToleratedItems2);
          horizontal ? scrollTo2(calculateCoord(newFirst, itemSize2, contentPos.left), scrollTop) : scrollTo2(scrollLeft, calculateCoord(newFirst, itemSize2, contentPos.top));
          isScrollChanged = this.lastScrollPos !== (horizontal ? scrollLeft : scrollTop);
          isRangeChanged = newFirst !== first;
        }
        this.isRangeChanged = isRangeChanged;
        isScrollChanged && (this.first = newFirst);
      }
    },
    scrollInView: function scrollInView(index, to) {
      var _this2 = this;
      var behavior = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "auto";
      if (to) {
        var both = this.isBoth();
        var horizontal = this.isHorizontal();
        var valid = both ? index.every(function(i) {
          return i > -1;
        }) : index > -1;
        if (valid) {
          var _this$getRenderedRang = this.getRenderedRange(), first = _this$getRenderedRang.first, viewport = _this$getRenderedRang.viewport;
          var scrollTo2 = function scrollTo3() {
            var left = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
            var top = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            return _this2.scrollTo({
              left,
              top,
              behavior
            });
          };
          var isToStart = to === "to-start";
          var isToEnd = to === "to-end";
          if (isToStart) {
            if (both) {
              if (viewport.first.rows - first.rows > index[0]) {
                scrollTo2(viewport.first.cols * this.itemSize[1], (viewport.first.rows - 1) * this.itemSize[0]);
              } else if (viewport.first.cols - first.cols > index[1]) {
                scrollTo2((viewport.first.cols - 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
              }
            } else {
              if (viewport.first - first > index) {
                var pos = (viewport.first - 1) * this.itemSize;
                horizontal ? scrollTo2(pos, 0) : scrollTo2(0, pos);
              }
            }
          } else if (isToEnd) {
            if (both) {
              if (viewport.last.rows - first.rows <= index[0] + 1) {
                scrollTo2(viewport.first.cols * this.itemSize[1], (viewport.first.rows + 1) * this.itemSize[0]);
              } else if (viewport.last.cols - first.cols <= index[1] + 1) {
                scrollTo2((viewport.first.cols + 1) * this.itemSize[1], viewport.first.rows * this.itemSize[0]);
              }
            } else {
              if (viewport.last - first <= index + 1) {
                var _pos2 = (viewport.first + 1) * this.itemSize;
                horizontal ? scrollTo2(_pos2, 0) : scrollTo2(0, _pos2);
              }
            }
          }
        }
      } else {
        this.scrollToIndex(index, behavior);
      }
    },
    getRenderedRange: function getRenderedRange() {
      var calculateFirstInViewport = function calculateFirstInViewport2(_pos, _size) {
        return Math.floor(_pos / (_size || _pos));
      };
      var firstInViewport = this.first;
      var lastInViewport = 0;
      if (this.element) {
        var both = this.isBoth();
        var horizontal = this.isHorizontal();
        var _this$element2 = this.element, scrollTop = _this$element2.scrollTop, scrollLeft = _this$element2.scrollLeft;
        if (both) {
          firstInViewport = {
            rows: calculateFirstInViewport(scrollTop, this.itemSize[0]),
            cols: calculateFirstInViewport(scrollLeft, this.itemSize[1])
          };
          lastInViewport = {
            rows: firstInViewport.rows + this.numItemsInViewport.rows,
            cols: firstInViewport.cols + this.numItemsInViewport.cols
          };
        } else {
          var scrollPos = horizontal ? scrollLeft : scrollTop;
          firstInViewport = calculateFirstInViewport(scrollPos, this.itemSize);
          lastInViewport = firstInViewport + this.numItemsInViewport;
        }
      }
      return {
        first: this.first,
        last: this.last,
        viewport: {
          first: firstInViewport,
          last: lastInViewport
        }
      };
    },
    calculateNumItems: function calculateNumItems() {
      var both = this.isBoth();
      var horizontal = this.isHorizontal();
      var itemSize2 = this.itemSize;
      var contentPos = this.getContentPosition();
      var contentWidth = this.element ? this.element.offsetWidth - contentPos.left : 0;
      var contentHeight = this.element ? this.element.offsetHeight - contentPos.top : 0;
      var calculateNumItemsInViewport = function calculateNumItemsInViewport2(_contentSize, _itemSize) {
        return Math.ceil(_contentSize / (_itemSize || _contentSize));
      };
      var calculateNumToleratedItems = function calculateNumToleratedItems2(_numItems) {
        return Math.ceil(_numItems / 2);
      };
      var numItemsInViewport = both ? {
        rows: calculateNumItemsInViewport(contentHeight, itemSize2[0]),
        cols: calculateNumItemsInViewport(contentWidth, itemSize2[1])
      } : calculateNumItemsInViewport(horizontal ? contentWidth : contentHeight, itemSize2);
      var numToleratedItems2 = this.d_numToleratedItems || (both ? [calculateNumToleratedItems(numItemsInViewport.rows), calculateNumToleratedItems(numItemsInViewport.cols)] : calculateNumToleratedItems(numItemsInViewport));
      return {
        numItemsInViewport,
        numToleratedItems: numToleratedItems2
      };
    },
    calculateOptions: function calculateOptions() {
      var _this3 = this;
      var both = this.isBoth();
      var first = this.first;
      var _this$calculateNumIte2 = this.calculateNumItems(), numItemsInViewport = _this$calculateNumIte2.numItemsInViewport, numToleratedItems2 = _this$calculateNumIte2.numToleratedItems;
      var calculateLast = function calculateLast2(_first, _num, _numT) {
        var _isCols = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
        return _this3.getLast(_first + _num + (_first < _numT ? 2 : 3) * _numT, _isCols);
      };
      var last = both ? {
        rows: calculateLast(first.rows, numItemsInViewport.rows, numToleratedItems2[0]),
        cols: calculateLast(first.cols, numItemsInViewport.cols, numToleratedItems2[1], true)
      } : calculateLast(first, numItemsInViewport, numToleratedItems2);
      this.last = last;
      this.numItemsInViewport = numItemsInViewport;
      this.d_numToleratedItems = numToleratedItems2;
      this.$emit("update:numToleratedItems", this.d_numToleratedItems);
      if (this.showLoader) {
        this.loaderArr = both ? Array.from({
          length: numItemsInViewport.rows
        }).map(function() {
          return Array.from({
            length: numItemsInViewport.cols
          });
        }) : Array.from({
          length: numItemsInViewport
        });
      }
      if (this.lazy) {
        Promise.resolve().then(function() {
          var _this3$items;
          _this3.lazyLoadState = {
            first: _this3.step ? both ? {
              rows: 0,
              cols: first.cols
            } : 0 : first,
            last: Math.min(_this3.step ? _this3.step : last, ((_this3$items = _this3.items) === null || _this3$items === void 0 ? void 0 : _this3$items.length) || 0)
          };
          _this3.$emit("lazy-load", _this3.lazyLoadState);
        });
      }
    },
    calculateAutoSize: function calculateAutoSize() {
      var _this4 = this;
      if (this.autoSize && !this.d_loading) {
        Promise.resolve().then(function() {
          if (_this4.content) {
            var both = _this4.isBoth();
            var horizontal = _this4.isHorizontal();
            var vertical = _this4.isVertical();
            _this4.content.style.minHeight = _this4.content.style.minWidth = "auto";
            _this4.content.style.position = "relative";
            _this4.element.style.contain = "none";
            var _ref = [DomHandler.getWidth(_this4.element), DomHandler.getHeight(_this4.element)], width = _ref[0], height = _ref[1];
            (both || horizontal) && (_this4.element.style.width = width < _this4.defaultWidth ? width + "px" : _this4.scrollWidth || _this4.defaultWidth + "px");
            (both || vertical) && (_this4.element.style.height = height < _this4.defaultHeight ? height + "px" : _this4.scrollHeight || _this4.defaultHeight + "px");
            _this4.content.style.minHeight = _this4.content.style.minWidth = "";
            _this4.content.style.position = "";
            _this4.element.style.contain = "";
          }
        });
      }
    },
    getLast: function getLast() {
      var _ref2, _this$items;
      var last = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      var isCols = arguments.length > 1 ? arguments[1] : void 0;
      return this.items ? Math.min(isCols ? ((_ref2 = this.columns || this.items[0]) === null || _ref2 === void 0 ? void 0 : _ref2.length) || 0 : ((_this$items = this.items) === null || _this$items === void 0 ? void 0 : _this$items.length) || 0, last) : 0;
    },
    getContentPosition: function getContentPosition() {
      if (this.content) {
        var style = getComputedStyle(this.content);
        var left = parseFloat(style.paddingLeft) + Math.max(parseFloat(style.left) || 0, 0);
        var right = parseFloat(style.paddingRight) + Math.max(parseFloat(style.right) || 0, 0);
        var top = parseFloat(style.paddingTop) + Math.max(parseFloat(style.top) || 0, 0);
        var bottom = parseFloat(style.paddingBottom) + Math.max(parseFloat(style.bottom) || 0, 0);
        return {
          left,
          right,
          top,
          bottom,
          x: left + right,
          y: top + bottom
        };
      }
      return {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        x: 0,
        y: 0
      };
    },
    setSize: function setSize() {
      var _this5 = this;
      if (this.element) {
        var both = this.isBoth();
        var horizontal = this.isHorizontal();
        var parentElement = this.element.parentElement;
        var width = this.scrollWidth || "".concat(this.element.offsetWidth || parentElement.offsetWidth, "px");
        var height = this.scrollHeight || "".concat(this.element.offsetHeight || parentElement.offsetHeight, "px");
        var setProp = function setProp2(_name, _value) {
          return _this5.element.style[_name] = _value;
        };
        if (both || horizontal) {
          setProp("height", height);
          setProp("width", width);
        } else {
          setProp("height", height);
        }
      }
    },
    setSpacerSize: function setSpacerSize() {
      var _this6 = this;
      var items2 = this.items;
      if (items2) {
        var both = this.isBoth();
        var horizontal = this.isHorizontal();
        var contentPos = this.getContentPosition();
        var setProp = function setProp2(_name, _value, _size) {
          var _cpos = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
          return _this6.spacerStyle = _objectSpread$2$1(_objectSpread$2$1({}, _this6.spacerStyle), _defineProperty$2$1({}, "".concat(_name), (_value || []).length * _size + _cpos + "px"));
        };
        if (both) {
          setProp("height", items2, this.itemSize[0], contentPos.y);
          setProp("width", this.columns || items2[1], this.itemSize[1], contentPos.x);
        } else {
          horizontal ? setProp("width", this.columns || items2, this.itemSize, contentPos.x) : setProp("height", items2, this.itemSize, contentPos.y);
        }
      }
    },
    setContentPosition: function setContentPosition(pos) {
      var _this7 = this;
      if (this.content && !this.appendOnly) {
        var both = this.isBoth();
        var horizontal = this.isHorizontal();
        var first = pos ? pos.first : this.first;
        var calculateTranslateVal = function calculateTranslateVal2(_first, _size) {
          return _first * _size;
        };
        var setTransform = function setTransform2() {
          var _x = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          var _y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
          return _this7.contentStyle = _objectSpread$2$1(_objectSpread$2$1({}, _this7.contentStyle), {
            transform: "translate3d(".concat(_x, "px, ").concat(_y, "px, 0)")
          });
        };
        if (both) {
          setTransform(calculateTranslateVal(first.cols, this.itemSize[1]), calculateTranslateVal(first.rows, this.itemSize[0]));
        } else {
          var translateVal = calculateTranslateVal(first, this.itemSize);
          horizontal ? setTransform(translateVal, 0) : setTransform(0, translateVal);
        }
      }
    },
    onScrollPositionChange: function onScrollPositionChange(event) {
      var _this8 = this;
      var target = event.target;
      var both = this.isBoth();
      var horizontal = this.isHorizontal();
      var contentPos = this.getContentPosition();
      var calculateScrollPos = function calculateScrollPos2(_pos, _cpos) {
        return _pos ? _pos > _cpos ? _pos - _cpos : _pos : 0;
      };
      var calculateCurrentIndex = function calculateCurrentIndex2(_pos, _size) {
        return Math.floor(_pos / (_size || _pos));
      };
      var calculateTriggerIndex = function calculateTriggerIndex2(_currentIndex, _first, _last, _num, _numT, _isScrollDownOrRight) {
        return _currentIndex <= _numT ? _numT : _isScrollDownOrRight ? _last - _num - _numT : _first + _numT - 1;
      };
      var calculateFirst = function calculateFirst2(_currentIndex, _triggerIndex, _first, _last, _num, _numT, _isScrollDownOrRight) {
        if (_currentIndex <= _numT)
          return 0;
        else
          return Math.max(0, _isScrollDownOrRight ? _currentIndex < _triggerIndex ? _first : _currentIndex - _numT : _currentIndex > _triggerIndex ? _first : _currentIndex - 2 * _numT);
      };
      var calculateLast = function calculateLast2(_currentIndex, _first, _last, _num, _numT, _isCols) {
        var lastValue = _first + _num + 2 * _numT;
        if (_currentIndex >= _numT) {
          lastValue += _numT + 1;
        }
        return _this8.getLast(lastValue, _isCols);
      };
      var scrollTop = calculateScrollPos(target.scrollTop, contentPos.top);
      var scrollLeft = calculateScrollPos(target.scrollLeft, contentPos.left);
      var newFirst = both ? {
        rows: 0,
        cols: 0
      } : 0;
      var newLast = this.last;
      var isRangeChanged = false;
      var newScrollPos = this.lastScrollPos;
      if (both) {
        var isScrollDown = this.lastScrollPos.top <= scrollTop;
        var isScrollRight = this.lastScrollPos.left <= scrollLeft;
        if (!this.appendOnly || this.appendOnly && (isScrollDown || isScrollRight)) {
          var currentIndex = {
            rows: calculateCurrentIndex(scrollTop, this.itemSize[0]),
            cols: calculateCurrentIndex(scrollLeft, this.itemSize[1])
          };
          var triggerIndex = {
            rows: calculateTriggerIndex(currentIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
            cols: calculateTriggerIndex(currentIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
          };
          newFirst = {
            rows: calculateFirst(currentIndex.rows, triggerIndex.rows, this.first.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0], isScrollDown),
            cols: calculateFirst(currentIndex.cols, triggerIndex.cols, this.first.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], isScrollRight)
          };
          newLast = {
            rows: calculateLast(currentIndex.rows, newFirst.rows, this.last.rows, this.numItemsInViewport.rows, this.d_numToleratedItems[0]),
            cols: calculateLast(currentIndex.cols, newFirst.cols, this.last.cols, this.numItemsInViewport.cols, this.d_numToleratedItems[1], true)
          };
          isRangeChanged = newFirst.rows !== this.first.rows || newLast.rows !== this.last.rows || newFirst.cols !== this.first.cols || newLast.cols !== this.last.cols || this.isRangeChanged;
          newScrollPos = {
            top: scrollTop,
            left: scrollLeft
          };
        }
      } else {
        var scrollPos = horizontal ? scrollLeft : scrollTop;
        var isScrollDownOrRight = this.lastScrollPos <= scrollPos;
        if (!this.appendOnly || this.appendOnly && isScrollDownOrRight) {
          var _currentIndex2 = calculateCurrentIndex(scrollPos, this.itemSize);
          var _triggerIndex2 = calculateTriggerIndex(_currentIndex2, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
          newFirst = calculateFirst(_currentIndex2, _triggerIndex2, this.first, this.last, this.numItemsInViewport, this.d_numToleratedItems, isScrollDownOrRight);
          newLast = calculateLast(_currentIndex2, newFirst, this.last, this.numItemsInViewport, this.d_numToleratedItems);
          isRangeChanged = newFirst !== this.first || newLast !== this.last || this.isRangeChanged;
          newScrollPos = scrollPos;
        }
      }
      return {
        first: newFirst,
        last: newLast,
        isRangeChanged,
        scrollPos: newScrollPos
      };
    },
    onScrollChange: function onScrollChange(event) {
      var _this$onScrollPositio = this.onScrollPositionChange(event), first = _this$onScrollPositio.first, last = _this$onScrollPositio.last, isRangeChanged = _this$onScrollPositio.isRangeChanged, scrollPos = _this$onScrollPositio.scrollPos;
      if (isRangeChanged) {
        var newState = {
          first,
          last
        };
        this.setContentPosition(newState);
        this.first = first;
        this.last = last;
        this.lastScrollPos = scrollPos;
        this.$emit("scroll-index-change", newState);
        if (this.lazy && this.isPageChanged(first)) {
          var _this$items2, _this$items3;
          var lazyLoadState = {
            first: this.step ? Math.min(this.getPageByFirst(first) * this.step, (((_this$items2 = this.items) === null || _this$items2 === void 0 ? void 0 : _this$items2.length) || 0) - this.step) : first,
            last: Math.min(this.step ? (this.getPageByFirst(first) + 1) * this.step : last, ((_this$items3 = this.items) === null || _this$items3 === void 0 ? void 0 : _this$items3.length) || 0)
          };
          var isLazyStateChanged = this.lazyLoadState.first !== lazyLoadState.first || this.lazyLoadState.last !== lazyLoadState.last;
          isLazyStateChanged && this.$emit("lazy-load", lazyLoadState);
          this.lazyLoadState = lazyLoadState;
        }
      }
    },
    onScroll: function onScroll(event) {
      var _this9 = this;
      this.$emit("scroll", event);
      if (this.delay) {
        if (this.scrollTimeout) {
          clearTimeout(this.scrollTimeout);
        }
        if (this.isPageChanged()) {
          if (!this.d_loading && this.showLoader) {
            var _this$onScrollPositio2 = this.onScrollPositionChange(event), isRangeChanged = _this$onScrollPositio2.isRangeChanged;
            var changed = isRangeChanged || (this.step ? this.isPageChanged() : false);
            changed && (this.d_loading = true);
          }
          this.scrollTimeout = setTimeout(function() {
            _this9.onScrollChange(event);
            if (_this9.d_loading && _this9.showLoader && (!_this9.lazy || _this9.loading === void 0)) {
              _this9.d_loading = false;
              _this9.page = _this9.getPageByFirst();
            }
          }, this.delay);
        }
      } else {
        this.onScrollChange(event);
      }
    },
    onResize: function onResize() {
      var _this10 = this;
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(function() {
        if (DomHandler.isVisible(_this10.element)) {
          var both = _this10.isBoth();
          var vertical = _this10.isVertical();
          var horizontal = _this10.isHorizontal();
          var _ref3 = [DomHandler.getWidth(_this10.element), DomHandler.getHeight(_this10.element)], width = _ref3[0], height = _ref3[1];
          var isDiffWidth = width !== _this10.defaultWidth, isDiffHeight = height !== _this10.defaultHeight;
          var reinit = both ? isDiffWidth || isDiffHeight : horizontal ? isDiffWidth : vertical ? isDiffHeight : false;
          if (reinit) {
            _this10.d_numToleratedItems = _this10.numToleratedItems;
            _this10.defaultWidth = width;
            _this10.defaultHeight = height;
            _this10.defaultContentWidth = DomHandler.getWidth(_this10.content);
            _this10.defaultContentHeight = DomHandler.getHeight(_this10.content);
            _this10.init();
          }
        }
      }, this.resizeDelay);
    },
    bindResizeListener: function bindResizeListener() {
      if (!this.resizeListener) {
        this.resizeListener = this.onResize.bind(this);
        (void 0).addEventListener("resize", this.resizeListener);
        (void 0).addEventListener("orientationchange", this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        (void 0).removeEventListener("resize", this.resizeListener);
        (void 0).removeEventListener("orientationchange", this.resizeListener);
        this.resizeListener = null;
      }
    },
    getOptions: function getOptions(renderedIndex) {
      var count = (this.items || []).length;
      var index = this.isBoth() ? this.first.rows + renderedIndex : this.first + renderedIndex;
      return {
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0
      };
    },
    getLoaderOptions: function getLoaderOptions(index, extOptions) {
      var count = this.loaderArr.length;
      return _objectSpread$2$1({
        index,
        count,
        first: index === 0,
        last: index === count - 1,
        even: index % 2 === 0,
        odd: index % 2 !== 0
      }, extOptions);
    },
    getPageByFirst: function getPageByFirst(first) {
      return Math.floor(((first !== null && first !== void 0 ? first : this.first) + this.d_numToleratedItems * 4) / (this.step || 1));
    },
    isPageChanged: function isPageChanged(first) {
      return this.step ? this.page !== this.getPageByFirst(first !== null && first !== void 0 ? first : this.first) : true;
    },
    setContentEl: function setContentEl(el) {
      this.content = el || this.content || DomHandler.findSingle(this.element, '[data-pc-section="content"]');
    },
    elementRef: function elementRef(el) {
      this.element = el;
    },
    contentRef: function contentRef(el) {
      this.content = el;
    }
  },
  computed: {
    containerClass: function containerClass() {
      return ["p-virtualscroller", this["class"], {
        "p-virtualscroller-inline": this.inline,
        "p-virtualscroller-both p-both-scroll": this.isBoth(),
        "p-virtualscroller-horizontal p-horizontal-scroll": this.isHorizontal()
      }];
    },
    contentClass: function contentClass() {
      return ["p-virtualscroller-content", {
        "p-virtualscroller-loading": this.d_loading
      }];
    },
    loaderClass: function loaderClass() {
      return ["p-virtualscroller-loader", {
        "p-component-overlay": !this.$slots.loader
      }];
    },
    loadedItems: function loadedItems() {
      var _this11 = this;
      if (this.items && !this.d_loading) {
        if (this.isBoth())
          return this.items.slice(this.appendOnly ? 0 : this.first.rows, this.last.rows).map(function(item2) {
            return _this11.columns ? item2 : item2.slice(_this11.appendOnly ? 0 : _this11.first.cols, _this11.last.cols);
          });
        else if (this.isHorizontal() && this.columns)
          return this.items;
        else
          return this.items.slice(this.appendOnly ? 0 : this.first, this.last);
      }
      return [];
    },
    loadedRows: function loadedRows() {
      return this.d_loading ? this.loaderDisabled ? this.loaderArr : [] : this.loadedItems;
    },
    loadedColumns: function loadedColumns() {
      if (this.columns) {
        var both = this.isBoth();
        var horizontal = this.isHorizontal();
        if (both || horizontal) {
          return this.d_loading && this.loaderDisabled ? both ? this.loaderArr[0] : this.loaderArr : this.columns.slice(both ? this.first.cols : this.first, both ? this.last.cols : this.last);
        }
      }
      return this.columns;
    }
  },
  components: {
    SpinnerIcon: script$7$2
  }
};
var _hoisted_1$1$2 = ["tabindex"];
function render$1$2(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  return !_ctx.disabled ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    ref: $options.elementRef,
    "class": $options.containerClass,
    tabindex: _ctx.tabindex,
    style: _ctx.style,
    onScroll: _cache[0] || (_cache[0] = function() {
      return $options.onScroll && $options.onScroll.apply($options, arguments);
    })
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "content", {
    styleClass: $options.contentClass,
    items: $options.loadedItems,
    getItemOptions: $options.getOptions,
    loading: $data.d_loading,
    getLoaderOptions: $options.getLoaderOptions,
    itemSize: _ctx.itemSize,
    rows: $options.loadedRows,
    columns: $options.loadedColumns,
    contentRef: $options.contentRef,
    spacerStyle: $data.spacerStyle,
    contentStyle: $data.contentStyle,
    vertical: $options.isVertical(),
    horizontal: $options.isHorizontal(),
    both: $options.isBoth()
  }, function() {
    return [createElementVNode("div", mergeProps({
      ref: $options.contentRef,
      "class": $options.contentClass,
      style: $data.contentStyle
    }, _ctx.ptm("content")), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.loadedItems, function(item2, index) {
      return renderSlot(_ctx.$slots, "item", {
        key: index,
        item: item2,
        options: $options.getOptions(index)
      });
    }), 128))], 16)];
  }), _ctx.showSpacer ? (openBlock(), createElementBlock("div", mergeProps({
    key: 0,
    "class": "p-virtualscroller-spacer",
    style: $data.spacerStyle
  }, _ctx.ptm("spacer")), null, 16)) : createCommentVNode("", true), !_ctx.loaderDisabled && _ctx.showLoader && $data.d_loading ? (openBlock(), createElementBlock("div", mergeProps({
    key: 1,
    "class": $options.loaderClass
  }, _ctx.ptm("loader")), [_ctx.$slots && _ctx.$slots.loader ? (openBlock(true), createElementBlock(Fragment, {
    key: 0
  }, renderList($data.loaderArr, function(_, index) {
    return renderSlot(_ctx.$slots, "loader", {
      key: index,
      options: $options.getLoaderOptions(index, $options.isBoth() && {
        numCols: _ctx.d_numItemsInViewport.cols
      })
    });
  }), 128)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "loadingicon", {}, function() {
    return [createVNode(_component_SpinnerIcon, mergeProps({
      spin: "",
      "class": "p-virtualscroller-loading-icon"
    }, _ctx.ptm("loadingIcon")), null, 16)];
  })], 16)) : createCommentVNode("", true)], 16, _hoisted_1$1$2)) : (openBlock(), createElementBlock(Fragment, {
    key: 1
  }, [renderSlot(_ctx.$slots, "default"), renderSlot(_ctx.$slots, "content", {
    items: _ctx.items,
    rows: _ctx.items,
    columns: $options.loadedColumns
  })], 64));
}
script$2$2.render = render$1$2;
var classes$5 = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props, state = _ref.state;
    return ["p-dropdown p-component p-inputwrapper", {
      "p-disabled": props.disabled,
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled",
      "p-dropdown-clearable": props.showClear,
      "p-focus": state.focused,
      "p-inputwrapper-filled": instance.hasSelectedOption,
      "p-inputwrapper-focus": state.focused || state.overlayVisible,
      "p-overlay-open": state.overlayVisible
    }];
  },
  input: function input(_ref2) {
    var _instance$label;
    var instance = _ref2.instance, props = _ref2.props;
    return ["p-dropdown-label p-inputtext", {
      "p-placeholder": !props.editable && instance.label === props.placeholder,
      "p-dropdown-label-empty": !props.editable && !instance.$slots["value"] && (instance.label === "p-emptylabel" || ((_instance$label = instance.label) === null || _instance$label === void 0 ? void 0 : _instance$label.length) === 0)
    }];
  },
  clearIcon: "p-dropdown-clear-icon",
  trigger: "p-dropdown-trigger",
  loadingicon: "p-dropdown-trigger-icon",
  dropdownIcon: "p-dropdown-trigger-icon",
  panel: function panel(_ref3) {
    _ref3.props;
    var instance = _ref3.instance;
    return ["p-dropdown-panel p-component", {
      "p-ripple-disabled": instance.$primevue.config.ripple === false
    }];
  },
  header: "p-dropdown-header",
  filterContainer: "p-dropdown-filter-container",
  filterInput: function filterInput(_ref4) {
    var props = _ref4.props, instance = _ref4.instance;
    return ["p-dropdown-filter p-inputtext p-component", {
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled"
    }];
  },
  filterIcon: "p-dropdown-filter-icon",
  wrapper: "p-dropdown-items-wrapper",
  list: "p-dropdown-items",
  itemGroup: "p-dropdown-item-group",
  itemGroupLabel: "p-dropdown-item-group-label",
  item: function item(_ref5) {
    var instance = _ref5.instance, props = _ref5.props, state = _ref5.state, option = _ref5.option, focusedOption = _ref5.focusedOption;
    return ["p-dropdown-item", {
      "p-highlight": instance.isSelected(option) && props.highlightOnSelect,
      "p-focus": state.focusedOptionIndex === focusedOption,
      "p-disabled": instance.isOptionDisabled(option)
    }];
  },
  itemLabel: "p-dropdown-item-label",
  checkIcon: "p-dropdown-check-icon",
  blankIcon: "p-dropdown-blank-icon",
  emptyMessage: "p-dropdown-empty-message"
};
var DropdownStyle = BaseStyle.extend({
  name: "dropdown",
  classes: classes$5
});
var script$1$4 = {
  name: "BaseDropdown",
  "extends": script$a,
  props: {
    modelValue: null,
    options: Array,
    optionLabel: [String, Function],
    optionValue: [String, Function],
    optionDisabled: [String, Function],
    optionGroupLabel: [String, Function],
    optionGroupChildren: [String, Function],
    scrollHeight: {
      type: String,
      "default": "200px"
    },
    filter: Boolean,
    filterPlaceholder: String,
    filterLocale: String,
    filterMatchMode: {
      type: String,
      "default": "contains"
    },
    filterFields: {
      type: Array,
      "default": null
    },
    editable: Boolean,
    placeholder: {
      type: String,
      "default": null
    },
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    dataKey: null,
    showClear: {
      type: Boolean,
      "default": false
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    filterInputProps: {
      type: null,
      "default": null
    },
    clearIconProps: {
      type: null,
      "default": null
    },
    appendTo: {
      type: [String, Object],
      "default": "body"
    },
    loading: {
      type: Boolean,
      "default": false
    },
    clearIcon: {
      type: String,
      "default": void 0
    },
    dropdownIcon: {
      type: String,
      "default": void 0
    },
    filterIcon: {
      type: String,
      "default": void 0
    },
    loadingIcon: {
      type: String,
      "default": void 0
    },
    resetFilterOnHide: {
      type: Boolean,
      "default": false
    },
    resetFilterOnClear: {
      type: Boolean,
      "default": false
    },
    virtualScrollerOptions: {
      type: Object,
      "default": null
    },
    autoOptionFocus: {
      type: Boolean,
      "default": false
    },
    autoFilterFocus: {
      type: Boolean,
      "default": false
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    },
    focusOnHover: {
      type: Boolean,
      "default": true
    },
    highlightOnSelect: {
      type: Boolean,
      "default": true
    },
    checkmark: {
      type: Boolean,
      "default": false
    },
    filterMessage: {
      type: String,
      "default": null
    },
    selectionMessage: {
      type: String,
      "default": null
    },
    emptySelectionMessage: {
      type: String,
      "default": null
    },
    emptyFilterMessage: {
      type: String,
      "default": null
    },
    emptyMessage: {
      type: String,
      "default": null
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    ariaLabel: {
      type: String,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    }
  },
  style: DropdownStyle,
  provide: function provide2() {
    return {
      $parentInstance: this
    };
  }
};
function _typeof$1$2(o) {
  "@babel/helpers - typeof";
  return _typeof$1$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1$2(o);
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$3(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3(o, minLen);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$3(arr);
}
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function ownKeys$1$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1$1(obj, key, value) {
  key = _toPropertyKey$1$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1$1(t) {
  var i = _toPrimitive$1$1(t, "string");
  return "symbol" == _typeof$1$2(i) ? i : String(i);
}
function _toPrimitive$1$1(t, r) {
  if ("object" != _typeof$1$2(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1$2(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$8 = {
  name: "Dropdown",
  "extends": script$1$4,
  inheritAttrs: false,
  emits: ["update:modelValue", "change", "focus", "blur", "before-show", "before-hide", "show", "hide", "filter"],
  outsideClickListener: null,
  scrollHandler: null,
  resizeListener: null,
  labelClickListener: null,
  overlay: null,
  list: null,
  virtualScroller: null,
  searchTimeout: null,
  searchValue: null,
  isModelValueChanged: false,
  data: function data3() {
    return {
      id: this.$attrs.id,
      clicked: false,
      focused: false,
      focusedOptionIndex: -1,
      filterValue: null,
      overlayVisible: false
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    modelValue: function modelValue() {
      this.isModelValueChanged = true;
    },
    options: function options() {
      this.autoUpdateModel();
    }
  },
  mounted: function mounted3() {
    this.id = this.id || UniqueComponentId();
    this.autoUpdateModel();
    this.bindLabelClickListener();
  },
  updated: function updated2() {
    if (this.overlayVisible && this.isModelValueChanged) {
      this.scrollInView(this.findSelectedOptionIndex());
    }
    this.isModelValueChanged = false;
  },
  beforeUnmount: function beforeUnmount() {
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    this.unbindLabelClickListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay) {
      ZIndexUtils.clear(this.overlay);
      this.overlay = null;
    }
  },
  methods: {
    getOptionIndex: function getOptionIndex(index, fn) {
      return this.virtualScrollerDisabled ? index : fn && fn(index)["index"];
    },
    getOptionLabel: function getOptionLabel(option) {
      return this.optionLabel ? ObjectUtils$1.resolveFieldData(option, this.optionLabel) : option;
    },
    getOptionValue: function getOptionValue(option) {
      return this.optionValue ? ObjectUtils$1.resolveFieldData(option, this.optionValue) : option;
    },
    getOptionRenderKey: function getOptionRenderKey(option, index) {
      return (this.dataKey ? ObjectUtils$1.resolveFieldData(option, this.dataKey) : this.getOptionLabel(option)) + "_" + index;
    },
    getPTItemOptions: function getPTItemOptions(option, itemOptions, index, key) {
      return this.ptm(key, {
        context: {
          option,
          index,
          selected: this.isSelected(option),
          focused: this.focusedOptionIndex === this.getOptionIndex(index, itemOptions),
          disabled: this.isOptionDisabled(option)
        }
      });
    },
    isOptionDisabled: function isOptionDisabled(option) {
      return this.optionDisabled ? ObjectUtils$1.resolveFieldData(option, this.optionDisabled) : false;
    },
    isOptionGroup: function isOptionGroup(option) {
      return this.optionGroupLabel && option.optionGroup && option.group;
    },
    getOptionGroupLabel: function getOptionGroupLabel(optionGroup) {
      return ObjectUtils$1.resolveFieldData(optionGroup, this.optionGroupLabel);
    },
    getOptionGroupChildren: function getOptionGroupChildren(optionGroup) {
      return ObjectUtils$1.resolveFieldData(optionGroup, this.optionGroupChildren);
    },
    getAriaPosInset: function getAriaPosInset(index) {
      var _this = this;
      return (this.optionGroupLabel ? index - this.visibleOptions.slice(0, index).filter(function(option) {
        return _this.isOptionGroup(option);
      }).length : index) + 1;
    },
    show: function show(isFocus) {
      this.$emit("before-show");
      this.overlayVisible = true;
      this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.editable ? -1 : this.findSelectedOptionIndex();
      isFocus && DomHandler.focus(this.$refs.focusInput);
    },
    hide: function hide(isFocus) {
      var _this2 = this;
      var _hide = function _hide2() {
        _this2.$emit("before-hide");
        _this2.overlayVisible = false;
        _this2.clicked = false;
        _this2.focusedOptionIndex = -1;
        _this2.searchValue = "";
        _this2.resetFilterOnHide && (_this2.filterValue = null);
        isFocus && DomHandler.focus(_this2.$refs.focusInput);
      };
      setTimeout(function() {
        _hide();
      }, 0);
    },
    onFocus: function onFocus(event) {
      if (this.disabled) {
        return;
      }
      this.focused = true;
      if (this.overlayVisible) {
        this.focusedOptionIndex = this.focusedOptionIndex !== -1 ? this.focusedOptionIndex : this.autoOptionFocus ? this.findFirstFocusedOptionIndex() : this.editable ? -1 : this.findSelectedOptionIndex();
        this.scrollInView(this.focusedOptionIndex);
      }
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.focused = false;
      this.focusedOptionIndex = -1;
      this.searchValue = "";
      this.$emit("blur", event);
    },
    onKeyDown: function onKeyDown(event) {
      if (this.disabled || DomHandler.isAndroid()) {
        event.preventDefault();
        return;
      }
      var metaKey = event.metaKey || event.ctrlKey;
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event, this.editable);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event, this.editable);
          break;
        case "Home":
          this.onHomeKey(event, this.editable);
          break;
        case "End":
          this.onEndKey(event, this.editable);
          break;
        case "PageDown":
          this.onPageDownKey(event);
          break;
        case "PageUp":
          this.onPageUpKey(event);
          break;
        case "Space":
          this.onSpaceKey(event, this.editable);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event);
          break;
        case "Backspace":
          this.onBackspaceKey(event, this.editable);
          break;
        case "ShiftLeft":
        case "ShiftRight":
          break;
        default:
          if (!metaKey && ObjectUtils$1.isPrintableCharacter(event.key)) {
            !this.overlayVisible && this.show();
            !this.editable && this.searchOptions(event, event.key);
          }
          break;
      }
      this.clicked = false;
    },
    onEditableInput: function onEditableInput(event) {
      var value = event.target.value;
      this.searchValue = "";
      var matched = this.searchOptions(event, value);
      !matched && (this.focusedOptionIndex = -1);
      this.updateModel(event, value);
      !this.overlayVisible && ObjectUtils$1.isNotEmpty(value) && this.show();
    },
    onContainerClick: function onContainerClick(event) {
      if (this.disabled || this.loading) {
        return;
      }
      if (event.target.tagName === "INPUT" || event.target.getAttribute("data-pc-section") === "clearicon" || event.target.closest('[data-pc-section="clearicon"]')) {
        return;
      } else if (!this.overlay || !this.overlay.contains(event.target)) {
        this.overlayVisible ? this.hide(true) : this.show(true);
      }
      this.clicked = true;
    },
    onClearClick: function onClearClick(event) {
      this.updateModel(event, null);
      this.resetFilterOnClear && (this.filterValue = null);
    },
    onFirstHiddenFocus: function onFirstHiddenFocus(event) {
      var focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getFirstFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onLastHiddenFocus: function onLastHiddenFocus(event) {
      var focusableEl = event.relatedTarget === this.$refs.focusInput ? DomHandler.getLastFocusableElement(this.overlay, ':not([data-p-hidden-focusable="true"])') : this.$refs.focusInput;
      DomHandler.focus(focusableEl);
    },
    onOptionSelect: function onOptionSelect(event, option) {
      var isHide = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      var value = this.getOptionValue(option);
      this.updateModel(event, value);
      isHide && this.hide(true);
    },
    onOptionMouseMove: function onOptionMouseMove(event, index) {
      if (this.focusOnHover) {
        this.changeFocusedOptionIndex(event, index);
      }
    },
    onFilterChange: function onFilterChange(event) {
      var value = event.target.value;
      this.filterValue = value;
      this.focusedOptionIndex = -1;
      this.$emit("filter", {
        originalEvent: event,
        value
      });
      !this.virtualScrollerDisabled && this.virtualScroller.scrollToIndex(0);
    },
    onFilterKeyDown: function onFilterKeyDown(event) {
      switch (event.code) {
        case "ArrowDown":
          this.onArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onArrowUpKey(event, true);
          break;
        case "ArrowLeft":
        case "ArrowRight":
          this.onArrowLeftKey(event, true);
          break;
        case "Home":
          this.onHomeKey(event, true);
          break;
        case "End":
          this.onEndKey(event, true);
          break;
        case "Enter":
        case "NumpadEnter":
          this.onEnterKey(event);
          break;
        case "Escape":
          this.onEscapeKey(event);
          break;
        case "Tab":
          this.onTabKey(event, true);
          break;
      }
    },
    onFilterBlur: function onFilterBlur() {
      this.focusedOptionIndex = -1;
    },
    onFilterUpdated: function onFilterUpdated() {
      if (this.overlayVisible) {
        this.alignOverlay();
      }
    },
    onOverlayClick: function onOverlayClick(event) {
      OverlayEventBus.emit("overlay-click", {
        originalEvent: event,
        target: this.$el
      });
    },
    onOverlayKeyDown: function onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          this.onEscapeKey(event);
          break;
      }
    },
    onArrowDownKey: function onArrowDownKey(event) {
      if (!this.overlayVisible) {
        this.show();
        this.editable && this.changeFocusedOptionIndex(event, this.findSelectedOptionIndex());
      } else {
        var optionIndex = this.focusedOptionIndex !== -1 ? this.findNextOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findFirstOptionIndex() : this.findFirstFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
      }
      event.preventDefault();
    },
    onArrowUpKey: function onArrowUpKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (event.altKey && !pressedInInputText) {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.overlayVisible && this.hide();
        event.preventDefault();
      } else {
        var optionIndex = this.focusedOptionIndex !== -1 ? this.findPrevOptionIndex(this.focusedOptionIndex) : this.clicked ? this.findLastOptionIndex() : this.findLastFocusedOptionIndex();
        this.changeFocusedOptionIndex(event, optionIndex);
        !this.overlayVisible && this.show();
        event.preventDefault();
      }
    },
    onArrowLeftKey: function onArrowLeftKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      pressedInInputText && (this.focusedOptionIndex = -1);
    },
    onHomeKey: function onHomeKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (pressedInInputText) {
        var target = event.currentTarget;
        if (event.shiftKey) {
          target.setSelectionRange(0, event.target.selectionStart);
        } else {
          target.setSelectionRange(0, 0);
          this.focusedOptionIndex = -1;
        }
      } else {
        this.changeFocusedOptionIndex(event, this.findFirstOptionIndex());
        !this.overlayVisible && this.show();
      }
      event.preventDefault();
    },
    onEndKey: function onEndKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (pressedInInputText) {
        var target = event.currentTarget;
        if (event.shiftKey) {
          target.setSelectionRange(event.target.selectionStart, target.value.length);
        } else {
          var len = target.value.length;
          target.setSelectionRange(len, len);
          this.focusedOptionIndex = -1;
        }
      } else {
        this.changeFocusedOptionIndex(event, this.findLastOptionIndex());
        !this.overlayVisible && this.show();
      }
      event.preventDefault();
    },
    onPageUpKey: function onPageUpKey(event) {
      this.scrollInView(0);
      event.preventDefault();
    },
    onPageDownKey: function onPageDownKey(event) {
      this.scrollInView(this.visibleOptions.length - 1);
      event.preventDefault();
    },
    onEnterKey: function onEnterKey(event) {
      if (!this.overlayVisible) {
        this.focusedOptionIndex = -1;
        this.onArrowDownKey(event);
      } else {
        if (this.focusedOptionIndex !== -1) {
          this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
        }
        this.hide();
      }
      event.preventDefault();
    },
    onSpaceKey: function onSpaceKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      !pressedInInputText && this.onEnterKey(event);
    },
    onEscapeKey: function onEscapeKey(event) {
      this.overlayVisible && this.hide(true);
      event.preventDefault();
      event.stopPropagation();
    },
    onTabKey: function onTabKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (!pressedInInputText) {
        if (this.overlayVisible && this.hasFocusableElements()) {
          DomHandler.focus(this.$refs.firstHiddenFocusableElementOnOverlay);
          event.preventDefault();
        } else {
          if (this.focusedOptionIndex !== -1) {
            this.onOptionSelect(event, this.visibleOptions[this.focusedOptionIndex]);
          }
          this.overlayVisible && this.hide(this.filter);
        }
      }
    },
    onBackspaceKey: function onBackspaceKey(event) {
      var pressedInInputText = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      if (pressedInInputText) {
        !this.overlayVisible && this.show();
      }
    },
    onOverlayEnter: function onOverlayEnter(el) {
      ZIndexUtils.set("overlay", el, this.$primevue.config.zIndex.overlay);
      DomHandler.addStyles(el, {
        position: "absolute",
        top: "0",
        left: "0"
      });
      this.alignOverlay();
      this.scrollInView();
      this.autoFilterFocus && DomHandler.focus(this.$refs.filterInput);
    },
    onOverlayAfterEnter: function onOverlayAfterEnter() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
      this.$emit("show");
    },
    onOverlayLeave: function onOverlayLeave() {
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      this.overlay = null;
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      ZIndexUtils.clear(el);
    },
    alignOverlay: function alignOverlay() {
      if (this.appendTo === "self") {
        DomHandler.relativePosition(this.overlay, this.$el);
      } else {
        this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
        DomHandler.absolutePosition(this.overlay, this.$el);
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this3 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function(event) {
          if (_this3.overlayVisible && _this3.overlay && !_this3.$el.contains(event.target) && !_this3.overlay.contains(event.target)) {
            _this3.hide();
          }
        };
        (void 0).addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        (void 0).removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this4 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, function() {
          if (_this4.overlayVisible) {
            _this4.hide();
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener2() {
      var _this5 = this;
      if (!this.resizeListener) {
        this.resizeListener = function() {
          if (_this5.overlayVisible && !DomHandler.isTouchDevice()) {
            _this5.hide();
          }
        };
        (void 0).addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener2() {
      if (this.resizeListener) {
        (void 0).removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    bindLabelClickListener: function bindLabelClickListener() {
      var _this6 = this;
      if (!this.editable && !this.labelClickListener) {
        var label2 = (void 0).querySelector('label[for="'.concat(this.inputId, '"]'));
        if (label2 && DomHandler.isVisible(label2)) {
          this.labelClickListener = function() {
            DomHandler.focus(_this6.$refs.focusInput);
          };
          label2.addEventListener("click", this.labelClickListener);
        }
      }
    },
    unbindLabelClickListener: function unbindLabelClickListener() {
      if (this.labelClickListener) {
        var label2 = (void 0).querySelector('label[for="'.concat(this.inputId, '"]'));
        if (label2 && DomHandler.isVisible(label2)) {
          label2.removeEventListener("click", this.labelClickListener);
        }
      }
    },
    hasFocusableElements: function hasFocusableElements() {
      return DomHandler.getFocusableElements(this.overlay, ':not([data-p-hidden-focusable="true"])').length > 0;
    },
    isOptionMatched: function isOptionMatched(option) {
      var _this$getOptionLabel;
      return this.isValidOption(option) && ((_this$getOptionLabel = this.getOptionLabel(option)) === null || _this$getOptionLabel === void 0 ? void 0 : _this$getOptionLabel.toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue.toLocaleLowerCase(this.filterLocale)));
    },
    isValidOption: function isValidOption(option) {
      return ObjectUtils$1.isNotEmpty(option) && !(this.isOptionDisabled(option) || this.isOptionGroup(option));
    },
    isValidSelectedOption: function isValidSelectedOption(option) {
      return this.isValidOption(option) && this.isSelected(option);
    },
    isSelected: function isSelected(option) {
      return this.isValidOption(option) && ObjectUtils$1.equals(this.modelValue, this.getOptionValue(option), this.equalityKey);
    },
    findFirstOptionIndex: function findFirstOptionIndex() {
      var _this7 = this;
      return this.visibleOptions.findIndex(function(option) {
        return _this7.isValidOption(option);
      });
    },
    findLastOptionIndex: function findLastOptionIndex() {
      var _this8 = this;
      return ObjectUtils$1.findLastIndex(this.visibleOptions, function(option) {
        return _this8.isValidOption(option);
      });
    },
    findNextOptionIndex: function findNextOptionIndex(index) {
      var _this9 = this;
      var matchedOptionIndex = index < this.visibleOptions.length - 1 ? this.visibleOptions.slice(index + 1).findIndex(function(option) {
        return _this9.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex + index + 1 : index;
    },
    findPrevOptionIndex: function findPrevOptionIndex(index) {
      var _this10 = this;
      var matchedOptionIndex = index > 0 ? ObjectUtils$1.findLastIndex(this.visibleOptions.slice(0, index), function(option) {
        return _this10.isValidOption(option);
      }) : -1;
      return matchedOptionIndex > -1 ? matchedOptionIndex : index;
    },
    findSelectedOptionIndex: function findSelectedOptionIndex() {
      var _this11 = this;
      return this.hasSelectedOption ? this.visibleOptions.findIndex(function(option) {
        return _this11.isValidSelectedOption(option);
      }) : -1;
    },
    findFirstFocusedOptionIndex: function findFirstFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findFirstOptionIndex() : selectedIndex;
    },
    findLastFocusedOptionIndex: function findLastFocusedOptionIndex() {
      var selectedIndex = this.findSelectedOptionIndex();
      return selectedIndex < 0 ? this.findLastOptionIndex() : selectedIndex;
    },
    searchOptions: function searchOptions(event, _char) {
      var _this12 = this;
      this.searchValue = (this.searchValue || "") + _char;
      var optionIndex = -1;
      var matched = false;
      if (ObjectUtils$1.isNotEmpty(this.searchValue)) {
        if (this.focusedOptionIndex !== -1) {
          optionIndex = this.visibleOptions.slice(this.focusedOptionIndex).findIndex(function(option) {
            return _this12.isOptionMatched(option);
          });
          optionIndex = optionIndex === -1 ? this.visibleOptions.slice(0, this.focusedOptionIndex).findIndex(function(option) {
            return _this12.isOptionMatched(option);
          }) : optionIndex + this.focusedOptionIndex;
        } else {
          optionIndex = this.visibleOptions.findIndex(function(option) {
            return _this12.isOptionMatched(option);
          });
        }
        if (optionIndex !== -1) {
          matched = true;
        }
        if (optionIndex === -1 && this.focusedOptionIndex === -1) {
          optionIndex = this.findFirstFocusedOptionIndex();
        }
        if (optionIndex !== -1) {
          this.changeFocusedOptionIndex(event, optionIndex);
        }
      }
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }
      this.searchTimeout = setTimeout(function() {
        _this12.searchValue = "";
        _this12.searchTimeout = null;
      }, 500);
      return matched;
    },
    changeFocusedOptionIndex: function changeFocusedOptionIndex(event, index) {
      if (this.focusedOptionIndex !== index) {
        this.focusedOptionIndex = index;
        this.scrollInView();
        if (this.selectOnFocus) {
          this.onOptionSelect(event, this.visibleOptions[index], false);
        }
      }
    },
    scrollInView: function scrollInView2() {
      var _this13 = this;
      var index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : -1;
      this.$nextTick(function() {
        var id = index !== -1 ? "".concat(_this13.id, "_").concat(index) : _this13.focusedOptionId;
        var element = DomHandler.findSingle(_this13.list, 'li[id="'.concat(id, '"]'));
        if (element) {
          element.scrollIntoView && element.scrollIntoView({
            block: "nearest"
          });
        } else if (!_this13.virtualScrollerDisabled) {
          _this13.virtualScroller && _this13.virtualScroller.scrollToIndex(index !== -1 ? index : _this13.focusedOptionIndex);
        }
      });
    },
    autoUpdateModel: function autoUpdateModel() {
      if (this.selectOnFocus && this.autoOptionFocus && !this.hasSelectedOption) {
        this.focusedOptionIndex = this.findFirstFocusedOptionIndex();
        this.onOptionSelect(null, this.visibleOptions[this.focusedOptionIndex], false);
      }
    },
    updateModel: function updateModel(event, value) {
      this.$emit("update:modelValue", value);
      this.$emit("change", {
        originalEvent: event,
        value
      });
    },
    flatOptions: function flatOptions(options2) {
      var _this14 = this;
      return (options2 || []).reduce(function(result, option, index) {
        result.push({
          optionGroup: option,
          group: true,
          index
        });
        var optionGroupChildren = _this14.getOptionGroupChildren(option);
        optionGroupChildren && optionGroupChildren.forEach(function(o) {
          return result.push(o);
        });
        return result;
      }, []);
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    listRef: function listRef(el, contentRef2) {
      this.list = el;
      contentRef2 && contentRef2(el);
    },
    virtualScrollerRef: function virtualScrollerRef(el) {
      this.virtualScroller = el;
    }
  },
  computed: {
    visibleOptions: function visibleOptions() {
      var _this15 = this;
      var options2 = this.optionGroupLabel ? this.flatOptions(this.options) : this.options || [];
      if (this.filterValue) {
        var filteredOptions = FilterService.filter(options2, this.searchFields, this.filterValue, this.filterMatchMode, this.filterLocale);
        if (this.optionGroupLabel) {
          var optionGroups = this.options || [];
          var filtered = [];
          optionGroups.forEach(function(group) {
            var groupChildren = _this15.getOptionGroupChildren(group);
            var filteredItems = groupChildren.filter(function(item2) {
              return filteredOptions.includes(item2);
            });
            if (filteredItems.length > 0)
              filtered.push(_objectSpread$1$1(_objectSpread$1$1({}, group), {}, _defineProperty$1$1({}, typeof _this15.optionGroupChildren === "string" ? _this15.optionGroupChildren : "items", _toConsumableArray$1(filteredItems))));
          });
          return this.flatOptions(filtered);
        }
        return filteredOptions;
      }
      return options2;
    },
    hasSelectedOption: function hasSelectedOption() {
      return ObjectUtils$1.isNotEmpty(this.modelValue);
    },
    label: function label() {
      var selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.placeholder || "p-emptylabel";
    },
    editableInputValue: function editableInputValue() {
      var selectedOptionIndex = this.findSelectedOptionIndex();
      return selectedOptionIndex !== -1 ? this.getOptionLabel(this.visibleOptions[selectedOptionIndex]) : this.modelValue || "";
    },
    equalityKey: function equalityKey() {
      return this.optionValue ? null : this.dataKey;
    },
    searchFields: function searchFields() {
      return this.filterFields || [this.optionLabel];
    },
    filterResultMessageText: function filterResultMessageText() {
      return ObjectUtils$1.isNotEmpty(this.visibleOptions) ? this.filterMessageText.replaceAll("{0}", this.visibleOptions.length) : this.emptyFilterMessageText;
    },
    filterMessageText: function filterMessageText() {
      return this.filterMessage || this.$primevue.config.locale.searchMessage || "";
    },
    emptyFilterMessageText: function emptyFilterMessageText() {
      return this.emptyFilterMessage || this.$primevue.config.locale.emptySearchMessage || this.$primevue.config.locale.emptyFilterMessage || "";
    },
    emptyMessageText: function emptyMessageText() {
      return this.emptyMessage || this.$primevue.config.locale.emptyMessage || "";
    },
    selectionMessageText: function selectionMessageText() {
      return this.selectionMessage || this.$primevue.config.locale.selectionMessage || "";
    },
    emptySelectionMessageText: function emptySelectionMessageText() {
      return this.emptySelectionMessage || this.$primevue.config.locale.emptySelectionMessage || "";
    },
    selectedMessageText: function selectedMessageText() {
      return this.hasSelectedOption ? this.selectionMessageText.replaceAll("{0}", "1") : this.emptySelectionMessageText;
    },
    listAriaLabel: function listAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.listLabel : void 0;
    },
    focusedOptionId: function focusedOptionId() {
      return this.focusedOptionIndex !== -1 ? "".concat(this.id, "_").concat(this.focusedOptionIndex) : null;
    },
    ariaSetSize: function ariaSetSize() {
      var _this16 = this;
      return this.visibleOptions.filter(function(option) {
        return !_this16.isOptionGroup(option);
      }).length;
    },
    virtualScrollerDisabled: function virtualScrollerDisabled() {
      return !this.virtualScrollerOptions;
    }
  },
  directives: {
    ripple: Ripple
  },
  components: {
    VirtualScroller: script$2$2,
    Portal: script$3$2,
    TimesIcon: script$4$1,
    ChevronDownIcon: script$6$1,
    SpinnerIcon: script$7$2,
    SearchIcon: script$5$1,
    CheckIcon: script$5$2,
    BlankIcon: script$7$1
  }
};
function _typeof$7(o) {
  "@babel/helpers - typeof";
  return _typeof$7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$7(o);
}
function ownKeys$6(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$6(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$6(Object(t), true).forEach(function(r2) {
      _defineProperty$6(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$6(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$6(obj, key, value) {
  key = _toPropertyKey$6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$6(t) {
  var i = _toPrimitive$6(t, "string");
  return "symbol" == _typeof$7(i) ? i : String(i);
}
function _toPrimitive$6(t, r) {
  if ("object" != _typeof$7(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$7(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1$7 = ["id"];
var _hoisted_2$6 = ["id", "value", "placeholder", "tabindex", "disabled", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-invalid"];
var _hoisted_3$2 = ["id", "tabindex", "aria-label", "aria-labelledby", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-disabled"];
var _hoisted_4$2 = ["value", "placeholder", "aria-owns", "aria-activedescendant"];
var _hoisted_5$1 = ["id", "aria-label"];
var _hoisted_6$1 = ["id"];
var _hoisted_7$1 = ["id", "aria-label", "aria-selected", "aria-disabled", "aria-setsize", "aria-posinset", "onClick", "onMousemove", "data-p-highlight", "data-p-focused", "data-p-disabled"];
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_CheckIcon = resolveComponent("CheckIcon");
  var _component_BlankIcon = resolveComponent("BlankIcon");
  var _component_VirtualScroller = resolveComponent("VirtualScroller");
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    ref: "container",
    id: $data.id,
    "class": _ctx.cx("root"),
    onClick: _cache[16] || (_cache[16] = function() {
      return $options.onContainerClick && $options.onContainerClick.apply($options, arguments);
    })
  }, _ctx.ptmi("root")), [_ctx.editable ? (openBlock(), createElementBlock("input", mergeProps({
    key: 0,
    ref: "focusInput",
    id: _ctx.inputId,
    type: "text",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: $options.editableInputValue,
    placeholder: _ctx.placeholder,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    disabled: _ctx.disabled,
    autocomplete: "off",
    role: "combobox",
    "aria-label": _ctx.ariaLabel,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $data.id + "_list",
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
    "aria-invalid": _ctx.invalid || void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[2] || (_cache[2] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    }),
    onInput: _cache[3] || (_cache[3] = function() {
      return $options.onEditableInput && $options.onEditableInput.apply($options, arguments);
    })
  }, _objectSpread$6(_objectSpread$6({}, _ctx.inputProps), _ctx.ptm("input"))), null, 16, _hoisted_2$6)) : (openBlock(), createElementBlock("span", mergeProps({
    key: 1,
    ref: "focusInput",
    id: _ctx.inputId,
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    tabindex: !_ctx.disabled ? _ctx.tabindex : -1,
    role: "combobox",
    "aria-label": _ctx.ariaLabel || ($options.label === "p-emptylabel" ? void 0 : $options.label),
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-haspopup": "listbox",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $data.id + "_list",
    "aria-activedescendant": $data.focused ? $options.focusedOptionId : void 0,
    "aria-disabled": _ctx.disabled,
    onFocus: _cache[4] || (_cache[4] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[5] || (_cache[5] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[6] || (_cache[6] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, _objectSpread$6(_objectSpread$6({}, _ctx.inputProps), _ctx.ptm("input"))), [renderSlot(_ctx.$slots, "value", {
    value: _ctx.modelValue,
    placeholder: _ctx.placeholder
  }, function() {
    return [createTextVNode(toDisplayString($options.label === "p-emptylabel" ? "\xA0" : $options.label || "empty"), 1)];
  })], 16, _hoisted_3$2)), _ctx.showClear && _ctx.modelValue != null ? renderSlot(_ctx.$slots, "clearicon", {
    key: 2,
    "class": normalizeClass(_ctx.cx("clearIcon")),
    onClick: $options.onClearClick,
    clearCallback: $options.onClearClick
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.clearIcon ? "i" : "TimesIcon"), mergeProps({
      ref: "clearIcon",
      "class": [_ctx.cx("clearIcon"), _ctx.clearIcon],
      onClick: $options.onClearClick
    }, _objectSpread$6(_objectSpread$6({}, _ctx.clearIconProps), _ctx.ptm("clearIcon")), {
      "data-pc-section": "clearicon"
    }), null, 16, ["class", "onClick"]))];
  }) : createCommentVNode("", true), createElementVNode("div", mergeProps({
    "class": _ctx.cx("trigger")
  }, _ctx.ptm("trigger")), [_ctx.loading ? renderSlot(_ctx.$slots, "loadingicon", {
    key: 0,
    "class": normalizeClass(_ctx.cx("loadingIcon"))
  }, function() {
    return [_ctx.loadingIcon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 0,
      "class": [_ctx.cx("loadingIcon"), "pi-spin", _ctx.loadingIcon],
      "aria-hidden": "true"
    }, _ctx.ptm("loadingIcon")), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
      key: 1,
      "class": _ctx.cx("loadingIcon"),
      spin: "",
      "aria-hidden": "true"
    }, _ctx.ptm("loadingIcon")), null, 16, ["class"]))];
  }) : renderSlot(_ctx.$slots, "dropdownicon", {
    key: 1,
    "class": normalizeClass(_ctx.cx("dropdownIcon"))
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.dropdownIcon ? "span" : "ChevronDownIcon"), mergeProps({
      "class": [_ctx.cx("dropdownIcon"), _ctx.dropdownIcon],
      "aria-hidden": "true"
    }, _ctx.ptm("dropdownIcon")), null, 16, ["class"]))];
  })], 16), createVNode(_component_Portal, {
    appendTo: _ctx.appendTo
  }, {
    "default": withCtx(function() {
      return [createVNode(Transition, mergeProps({
        name: "p-connected-overlay",
        onEnter: $options.onOverlayEnter,
        onAfterEnter: $options.onOverlayAfterEnter,
        onLeave: $options.onOverlayLeave,
        onAfterLeave: $options.onOverlayAfterLeave
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [$data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            "class": [_ctx.cx("panel"), _ctx.panelClass],
            style: _ctx.panelStyle,
            onClick: _cache[14] || (_cache[14] = function() {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            onKeydown: _cache[15] || (_cache[15] = function() {
              return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
            })
          }, _objectSpread$6(_objectSpread$6({}, _ctx.panelProps), _ctx.ptm("panel"))), [createElementVNode("span", mergeProps({
            ref: "firstHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            "class": "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: _cache[7] || (_cache[7] = function() {
              return $options.onFirstHiddenFocus && $options.onFirstHiddenFocus.apply($options, arguments);
            })
          }, _ctx.ptm("hiddenFirstFocusableEl"), {
            "data-p-hidden-accessible": true,
            "data-p-hidden-focusable": true
          }), null, 16), renderSlot(_ctx.$slots, "header", {
            value: _ctx.modelValue,
            options: $options.visibleOptions
          }), _ctx.filter ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            "class": _ctx.cx("header")
          }, _ctx.ptm("header")), [createElementVNode("div", mergeProps({
            "class": _ctx.cx("filterContainer")
          }, _ctx.ptm("filterContainer")), [createElementVNode("input", mergeProps({
            ref: "filterInput",
            type: "text",
            value: $data.filterValue,
            onVnodeMounted: _cache[8] || (_cache[8] = function() {
              return $options.onFilterUpdated && $options.onFilterUpdated.apply($options, arguments);
            }),
            onVnodeUpdated: _cache[9] || (_cache[9] = function() {
              return $options.onFilterUpdated && $options.onFilterUpdated.apply($options, arguments);
            }),
            "class": _ctx.cx("filterInput"),
            placeholder: _ctx.filterPlaceholder,
            role: "searchbox",
            autocomplete: "off",
            "aria-owns": $data.id + "_list",
            "aria-activedescendant": $options.focusedOptionId,
            onKeydown: _cache[10] || (_cache[10] = function() {
              return $options.onFilterKeyDown && $options.onFilterKeyDown.apply($options, arguments);
            }),
            onBlur: _cache[11] || (_cache[11] = function() {
              return $options.onFilterBlur && $options.onFilterBlur.apply($options, arguments);
            }),
            onInput: _cache[12] || (_cache[12] = function() {
              return $options.onFilterChange && $options.onFilterChange.apply($options, arguments);
            })
          }, _objectSpread$6(_objectSpread$6({}, _ctx.filterInputProps), _ctx.ptm("filterInput"))), null, 16, _hoisted_4$2), renderSlot(_ctx.$slots, "filtericon", {
            "class": normalizeClass(_ctx.cx("filterIcon"))
          }, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.filterIcon ? "span" : "SearchIcon"), mergeProps({
              "class": [_ctx.cx("filterIcon"), _ctx.filterIcon]
            }, _ctx.ptm("filterIcon")), null, 16, ["class"]))];
          })], 16), createElementVNode("span", mergeProps({
            role: "status",
            "aria-live": "polite",
            "class": "p-hidden-accessible"
          }, _ctx.ptm("hiddenFilterResult"), {
            "data-p-hidden-accessible": true
          }), toDisplayString($options.filterResultMessageText), 17)], 16)) : createCommentVNode("", true), createElementVNode("div", mergeProps({
            "class": _ctx.cx("wrapper"),
            style: {
              "max-height": $options.virtualScrollerDisabled ? _ctx.scrollHeight : ""
            }
          }, _ctx.ptm("wrapper")), [createVNode(_component_VirtualScroller, mergeProps({
            ref: $options.virtualScrollerRef
          }, _ctx.virtualScrollerOptions, {
            items: $options.visibleOptions,
            style: {
              height: _ctx.scrollHeight
            },
            tabindex: -1,
            disabled: $options.virtualScrollerDisabled,
            pt: _ctx.ptm("virtualScroller")
          }), createSlots({
            content: withCtx(function(_ref) {
              var styleClass = _ref.styleClass, contentRef2 = _ref.contentRef, items2 = _ref.items, getItemOptions = _ref.getItemOptions, contentStyle = _ref.contentStyle, itemSize2 = _ref.itemSize;
              return [createElementVNode("ul", mergeProps({
                ref: function ref2(el) {
                  return $options.listRef(el, contentRef2);
                },
                id: $data.id + "_list",
                "class": [_ctx.cx("list"), styleClass],
                style: contentStyle,
                role: "listbox",
                "aria-label": $options.listAriaLabel
              }, _ctx.ptm("list")), [(openBlock(true), createElementBlock(Fragment, null, renderList(items2, function(option, i) {
                return openBlock(), createElementBlock(Fragment, {
                  key: $options.getOptionRenderKey(option, $options.getOptionIndex(i, getItemOptions))
                }, [$options.isOptionGroup(option) ? (openBlock(), createElementBlock("li", mergeProps({
                  key: 0,
                  id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                  style: {
                    height: itemSize2 ? itemSize2 + "px" : void 0
                  },
                  "class": _ctx.cx("itemGroup"),
                  role: "option"
                }, _ctx.ptm("itemGroup")), [renderSlot(_ctx.$slots, "optiongroup", {
                  option: option.optionGroup,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function() {
                  return [createElementVNode("span", mergeProps({
                    "class": _ctx.cx("itemGroupLabel")
                  }, _ctx.ptm("itemGroupLabel")), toDisplayString($options.getOptionGroupLabel(option.optionGroup)), 17)];
                })], 16, _hoisted_6$1)) : withDirectives((openBlock(), createElementBlock("li", mergeProps({
                  key: 1,
                  id: $data.id + "_" + $options.getOptionIndex(i, getItemOptions),
                  "class": _ctx.cx("item", {
                    option,
                    focusedOption: $options.getOptionIndex(i, getItemOptions)
                  }),
                  style: {
                    height: itemSize2 ? itemSize2 + "px" : void 0
                  },
                  role: "option",
                  "aria-label": $options.getOptionLabel(option),
                  "aria-selected": $options.isSelected(option),
                  "aria-disabled": $options.isOptionDisabled(option),
                  "aria-setsize": $options.ariaSetSize,
                  "aria-posinset": $options.getAriaPosInset($options.getOptionIndex(i, getItemOptions)),
                  onClick: function onClick($event) {
                    return $options.onOptionSelect($event, option);
                  },
                  onMousemove: function onMousemove($event) {
                    return $options.onOptionMouseMove($event, $options.getOptionIndex(i, getItemOptions));
                  },
                  "data-p-highlight": $options.isSelected(option),
                  "data-p-focused": $data.focusedOptionIndex === $options.getOptionIndex(i, getItemOptions),
                  "data-p-disabled": $options.isOptionDisabled(option)
                }, $options.getPTItemOptions(option, getItemOptions, i, "item")), [_ctx.checkmark ? (openBlock(), createElementBlock(Fragment, {
                  key: 0
                }, [$options.isSelected(option) ? (openBlock(), createBlock(_component_CheckIcon, mergeProps({
                  key: 0,
                  "class": _ctx.cx("checkIcon")
                }, _ctx.ptm("checkIcon")), null, 16, ["class"])) : (openBlock(), createBlock(_component_BlankIcon, mergeProps({
                  key: 1,
                  "class": _ctx.cx("blankIcon")
                }, _ctx.ptm("blankIcon")), null, 16, ["class"]))], 64)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "option", {
                  option,
                  index: $options.getOptionIndex(i, getItemOptions)
                }, function() {
                  return [createElementVNode("span", mergeProps({
                    "class": _ctx.cx("itemLabel")
                  }, _ctx.ptm("itemLabel")), toDisplayString($options.getOptionLabel(option)), 17)];
                })], 16, _hoisted_7$1)), [[_directive_ripple]])], 64);
              }), 128)), $data.filterValue && (!items2 || items2 && items2.length === 0) ? (openBlock(), createElementBlock("li", mergeProps({
                key: 0,
                "class": _ctx.cx("emptyMessage"),
                role: "option"
              }, _ctx.ptm("emptyMessage"), {
                "data-p-hidden-accessible": true
              }), [renderSlot(_ctx.$slots, "emptyfilter", {}, function() {
                return [createTextVNode(toDisplayString($options.emptyFilterMessageText), 1)];
              })], 16)) : !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (openBlock(), createElementBlock("li", mergeProps({
                key: 1,
                "class": _ctx.cx("emptyMessage"),
                role: "option"
              }, _ctx.ptm("emptyMessage"), {
                "data-p-hidden-accessible": true
              }), [renderSlot(_ctx.$slots, "empty", {}, function() {
                return [createTextVNode(toDisplayString($options.emptyMessageText), 1)];
              })], 16)) : createCommentVNode("", true)], 16, _hoisted_5$1)];
            }),
            _: 2
          }, [_ctx.$slots.loader ? {
            name: "loader",
            fn: withCtx(function(_ref2) {
              var options2 = _ref2.options;
              return [renderSlot(_ctx.$slots, "loader", {
                options: options2
              })];
            }),
            key: "0"
          } : void 0]), 1040, ["items", "style", "disabled", "pt"])], 16), renderSlot(_ctx.$slots, "footer", {
            value: _ctx.modelValue,
            options: $options.visibleOptions
          }), !_ctx.options || _ctx.options && _ctx.options.length === 0 ? (openBlock(), createElementBlock("span", mergeProps({
            key: 1,
            role: "status",
            "aria-live": "polite",
            "class": "p-hidden-accessible"
          }, _ctx.ptm("hiddenEmptyMessage"), {
            "data-p-hidden-accessible": true
          }), toDisplayString($options.emptyMessageText), 17)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
            role: "status",
            "aria-live": "polite",
            "class": "p-hidden-accessible"
          }, _ctx.ptm("hiddenSelectedMessage"), {
            "data-p-hidden-accessible": true
          }), toDisplayString($options.selectedMessageText), 17), createElementVNode("span", mergeProps({
            ref: "lastHiddenFocusableElementOnOverlay",
            role: "presentation",
            "aria-hidden": "true",
            "class": "p-hidden-accessible p-hidden-focusable",
            tabindex: 0,
            onFocus: _cache[13] || (_cache[13] = function() {
              return $options.onLastHiddenFocus && $options.onLastHiddenFocus.apply($options, arguments);
            })
          }, _ctx.ptm("hiddenLastFocusableEl"), {
            "data-p-hidden-accessible": true,
            "data-p-hidden-focusable": true
          }), null, 16)], 16)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onLeave", "onAfterLeave"])];
    }),
    _: 3
  }, 8, ["appendTo"])], 16, _hoisted_1$7);
}
script$8.render = render$7;
const dropdown_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a$2 = /* @__PURE__ */ defineComponent({
  __name: "DeDropdown",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    options: {},
    optionLabel: {},
    optionValue: {},
    type: { default: "default" },
    filter: { type: Boolean },
    appendTo: {},
    popupAlignment: { default: "left" },
    listItemClass: {},
    panelClass: {},
    dropdownIconClass: {},
    placeholder: {},
    filterPlaceholder: {},
    showClear: { type: Boolean },
    autoFilterFocus: { type: Boolean },
    resetFilterOnClear: { type: Boolean },
    resetFilterOnHide: { type: Boolean },
    label: {},
    inputId: {},
    id: {},
    disabled: { type: Boolean }
  }, {
    "modelValue": { required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["change"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { t } = useI18n();
    const model = useModel(__props, "modelValue");
    const dropdownClasses = computed(() => {
      const classes2 = {
        root: ["de-dropdown", `de-dropdown-${props.type}`],
        input: ["de-dropdown-input", { "de-dropdown-input-placeholder": !model.value }],
        panel: [
          "de-dropdown-panel",
          { "tw-right-0 !tw-left-auto": props.popupAlignment === "right" },
          { "!tw-left-1/2 tw-transform tw--translate-x-1/2": props.popupAlignment === "center" },
          { "de-dropdown-panel-filter": props.filter }
        ],
        wrapper: ["de-dropdown-panel-wrapper"],
        list: ["de-dropdown-list"],
        item: ["de-dropdown-list-item"],
        filterContainer: ["de-dropdown-filter-container"],
        filterInput: ["de-dropdown-filter-input"],
        filterIcon: ["de-dropdown-filter-icon"],
        transition: {
          enterFromClass: "de-connected-overlay-enter-from",
          enterActiveClass: "de-connected-overlay-enter-active",
          leaveActiveClass: "de-connected-overlay-leave-active",
          leaveToClass: "de-connected-overlay-leave-to"
        }
      };
      if (props.listItemClass) {
        classes2.item.push(props.listItemClass);
      }
      if (props.panelClass) {
        classes2.panel.push(props.panelClass);
      }
      return classes2;
    });
    const dropdownIcon = computed(() => {
      return props.type === "form" ? "chevron-down" : "chevron-down-filled";
    });
    const isOpened = ref(false);
    const isFocused = ref(false);
    function onShow() {
      isOpened.value = true;
    }
    function onHide() {
      isOpened.value = false;
    }
    function onFocus2() {
      isFocused.value = true;
    }
    function onBlur2() {
      isFocused.value = false;
    }
    function onChange(event) {
      emit("change", event);
    }
    const filterValue = ref(null);
    function onFilter(event) {
      filterValue.value = event.value;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_dropdown = script$8;
      _push(ssrRenderComponent(_component_prime_dropdown, mergeProps({
        modelValue: model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        options: _ctx.options,
        "option-label": _ctx.optionLabel,
        "option-value": _ctx.optionValue,
        filter: _ctx.filter,
        class: [
          _ctx.$attrs.class,
          { "de-overlay-opened": isOpened.value, "is-focused": isFocused.value, "is-disabled": _ctx.disabled }
        ],
        placeholder: _ctx.placeholder,
        "filter-placeholder": _ctx.filterPlaceholder,
        "show-clear": _ctx.showClear,
        "auto-filter-focus": _ctx.autoFilterFocus,
        "reset-filter-on-clear": _ctx.resetFilterOnClear,
        "reset-filter-on-hide": _ctx.resetFilterOnHide,
        disabled: _ctx.disabled,
        "popup-alignment": _ctx.popupAlignment,
        "append-to": _ctx.appendTo,
        pt: unref(dropdownClasses),
        onChange,
        onBeforeShow: onShow,
        onBeforeHide: onHide,
        onFilter,
        onFocus: onFocus2,
        onBlur: onBlur2
      }, _attrs), createSlots({
        filtericon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$m$1, {
              name: "search",
              class: ["tw-w-3.5 tw-h-3.5", unref(dropdownClasses).filterIcon]
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$m$1, {
                name: "search",
                class: ["tw-w-3.5 tw-h-3.5", unref(dropdownClasses).filterIcon]
              }, null, 8, ["class"])
            ];
          }
        }),
        dropdownicon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="de-dropdown-trigger"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "dropdownIcon", {
              props: { opened: isOpened.value }
            }, () => {
              _push2(`<button class="tw-w-full tw-h-full tw-flex tw-items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: unref(dropdownIcon),
                class: ["tw-transform", [{ "tw-rotate-180": isOpened.value }, _ctx.dropdownIconClass]]
              }, null, _parent2, _scopeId));
              _push2(`</button>`);
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "de-dropdown-trigger" }, [
                renderSlot(_ctx.$slots, "dropdownIcon", {
                  props: { opened: isOpened.value }
                }, () => [
                  createVNode("button", { class: "tw-w-full tw-h-full tw-flex tw-items-center" }, [
                    createVNode(_sfc_main$m$1, {
                      name: unref(dropdownIcon),
                      class: ["tw-transform", [{ "tw-rotate-180": isOpened.value }, _ctx.dropdownIconClass]]
                    }, null, 8, ["name", "class"])
                  ])
                ])
              ])
            ];
          }
        }),
        clearicon: withCtx(({ clearCallback }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m$1, {
              name: "close-circle",
              class: "tw-w-3 tw-h-3"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                onClick: withModifiers(clearCallback, ["stop"])
              }, [
                createVNode(_sfc_main$m$1, {
                  name: "close-circle",
                  class: "tw-w-3 tw-h-3"
                })
              ], 8, ["onClick"])
            ];
          }
        }),
        emptyfilter: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="tw-text-300 tw-leading-400 tw-text-primary-300 tw-text-center tw-py-2.5"${_scopeId}>${ssrInterpolate(unref(t)("form.noResultsFor", { text: filterValue.value }))}</div>`);
          } else {
            return [
              createVNode("div", { class: "tw-text-300 tw-leading-400 tw-text-primary-300 tw-text-center tw-py-2.5" }, toDisplayString(unref(t)("form.noResultsFor", { text: filterValue.value })), 1)
            ];
          }
        }),
        _: 2
      }, [
        renderList(_ctx.$slots, (_, slot) => {
          return {
            name: slot,
            fn: withCtx((scope, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, slot, scope || {}, null, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, slot, scope || {})
                ];
              }
            })
          };
        })
      ]), _parent));
    };
  }
});
const _sfc_setup$a$2 = _sfc_main$a$2.setup;
_sfc_main$a$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/dropdown/DeDropdown.vue");
  return _sfc_setup$a$2 ? _sfc_setup$a$2(props, ctx) : void 0;
};
var TimeVariations = /* @__PURE__ */ ((TimeVariations2) => {
  TimeVariations2["Hours1"] = "1h";
  TimeVariations2["Hours24"] = "24h";
  TimeVariations2["Days7"] = "7d";
  TimeVariations2["Days30"] = "30d";
  TimeVariations2["Months1"] = "1m";
  TimeVariations2["Days60"] = "60d";
  TimeVariations2["Days90"] = "90d";
  TimeVariations2["Years1"] = "1y";
  return TimeVariations2;
})(TimeVariations || {});
function separateNumbersAndLetters(timeLabel) {
  const matches = timeLabel.match(/(\d+)([a-zA-Z]+)/);
  return matches ? { number: matches[1], letters: matches[2] } : null;
}
function getLocalizedTimeLabel(timeVariation, t) {
  const separatedArr = separateNumbersAndLetters(timeVariation);
  if (!separatedArr)
    return "";
  return `${separatedArr.number}${t(`common.time.${separatedArr.letters}`)}`;
}
const _sfc_main$9$2 = /* @__PURE__ */ defineComponent({
  __name: "CryptoStatsPricePerformance",
  __ssrInlineRender: true,
  props: {
    crypto: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const appStore = useAppStore();
    const userStore = useUserStore();
    const pricePerformanceOptions = computed(() => {
      const options2 = [];
      const is24hDataPresent = isNonNullish(props.crypto[CryptoMetric.High24h]) && isNonNullish(props.crypto[CryptoMetric.Low24h]);
      if (is24hDataPresent) {
        options2.push({
          id: TimeVariations.Hours24,
          label: `24${t("common.time.h")}`
        });
      }
      const is1mDataPresent = isNonNullish(props.crypto[CryptoMetric.High1m]) && isNonNullish(props.crypto[CryptoMetric.Low1m]);
      if (is1mDataPresent) {
        options2.push({
          id: TimeVariations.Months1,
          label: `1${t("common.time.m")}`
        });
      }
      const is1yDataPresent = isNonNullish(props.crypto[CryptoMetric.High1y]) && isNonNullish(props.crypto[CryptoMetric.Low1y]);
      if (is1yDataPresent) {
        options2.push({
          id: TimeVariations.Years1,
          label: `1${t("common.time.y")}`
        });
      }
      return options2;
    });
    const selectedPerformanceTimeOption = ref(pricePerformanceOptions.value[0]);
    const metrics = computed(() => {
      return {
        [TimeVariations.Hours24]: {
          high: props.crypto[CryptoMetric.High24h],
          low: props.crypto[CryptoMetric.Low24h]
        },
        [TimeVariations.Months1]: {
          high: props.crypto[CryptoMetric.High1m],
          low: props.crypto[CryptoMetric.Low1m]
        },
        [TimeVariations.Years1]: {
          high: props.crypto[CryptoMetric.High1y],
          low: props.crypto[CryptoMetric.Low1y]
        }
      };
    });
    const coinPriceLow = computed(() => metrics.value[selectedPerformanceTimeOption.value.id].low);
    const coinPriceHigh = computed(() => metrics.value[selectedPerformanceTimeOption.value.id].high);
    const coinPercentagePosition = computed(() => {
      if (isNullish(props.crypto[CryptoMetric.Price]) || isNullish(coinPriceLow.value) || isNullish(coinPriceHigh.value))
        return null;
      return (props.crypto[CryptoMetric.Price] - coinPriceLow.value) / (coinPriceHigh.value - coinPriceLow.value) * 100;
    });
    function getCoinPriceFormatted(price) {
      return formatPrice(price, appStore.locale, userStore.user.currencyShortName, {
        maximumFractionDigits: 2
      });
    }
    function getCoinPriceChangeFormatted(price) {
      return formatPercentage(price, {
        showPlusMinusSign: true
      });
    }
    const dayjs2 = useDayjs();
    function getFormattedDate(dateUtc) {
      const date = dayjs2.utc(dateUtc);
      const durationFromNow = date.diff(Date.now());
      const formattedDate = date.format(SHORT_DATE_WITH_YEAR);
      const formattedDuration = dayjs2.duration(durationFromNow, "milliseconds").locale(appStore.locale).humanize(true);
      return `${formattedDate} (${formattedDuration})`;
    }
    const isPricePerformanceShown = computed(
      () => pricePerformanceOptions.value.length && (coinPriceLow.value || coinPriceHigh.value)
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (isPricePerformanceShown.value || _ctx.crypto.athDate || _ctx.crypto.atlDate) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        if (isPricePerformanceShown.value) {
          _push(`<!--[--><div class="tw-flex tw-items-center tw-justify-between tw-mb-5"><div class="heading-h5">${ssrInterpolate(unref(t)("coins.metrics.pricePerformance"))}</div>`);
          if (pricePerformanceOptions.value.length > 1) {
            _push(ssrRenderComponent(_sfc_main$a$2, {
              modelValue: selectedPerformanceTimeOption.value,
              "onUpdate:modelValue": ($event) => selectedPerformanceTimeOption.value = $event,
              options: pricePerformanceOptions.value,
              "option-label": "label",
              type: "chips",
              class: "tw-py-0.5",
              "list-item-class": "tw-text-300 tw-py-1 tw-px-1.5 tw-leading-400"
            }, null, _parent));
          } else {
            _push(`<div class="tw-text-350 tw-font-medium tw-leading-450 tw-tracking-wide tw-py-0.5 tw-px-1.5 tw-bg-primary-700">${ssrInterpolate(selectedPerformanceTimeOption.value.label)}</div>`);
          }
          _push(`</div><div class="tw-flex tw-items-center tw-justify-between">`);
          if (coinPriceLow.value) {
            _push(`<div class="heading-h5"><div class="tw-text-primary-300 tw-mb-0.5">${ssrInterpolate(unref(t)("coins.metrics.low"))}</div><span>${ssrInterpolate(getCoinPriceFormatted(coinPriceLow.value))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          if (coinPriceHigh.value) {
            _push(`<div class="heading-h5 tw-text-right"><div class="tw-text-primary-300 tw-mb-0.5">${ssrInterpolate(unref(t)("coins.metrics.high"))}</div><span>${ssrInterpolate(getCoinPriceFormatted(coinPriceHigh.value))}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
          if (coinPercentagePosition.value) {
            _push(ssrRenderComponent(_sfc_main$m, {
              value: coinPercentagePosition.value,
              class: "tw-mt-2.5"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.crypto.athDate) {
          _push(`<div class="tw-flex tw-items-center tw-justify-between tw-mt-5"><div class="tw-text-primary-300"><span class="heading-h5">${ssrInterpolate(unref(t)("coins.metrics.allTimeHigh"))}</span><div class="heading-h5.1">${ssrInterpolate(getFormattedDate(_ctx.crypto.athDate))}</div></div>`);
          if (unref(isNonNullish)(_ctx.crypto.ath)) {
            _push(`<div class="tw-text-right"><span class="heading-h5">${ssrInterpolate(getCoinPriceFormatted(_ctx.crypto.ath))}</span>`);
            if (unref(isNonNullish)(_ctx.crypto[unref(CryptoMetric).ATHChangePercentage])) {
              _push(ssrRenderComponent(_sfc_main$k, {
                "show-icon": false,
                value: _ctx.crypto[unref(CryptoMetric).ATHChangePercentage],
                class: "tw-justify-end"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span class="heading-h5.1"${_scopeId}>${ssrInterpolate(getCoinPriceChangeFormatted(_ctx.crypto[unref(CryptoMetric).ATHChangePercentage]))}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "heading-h5.1" }, toDisplayString(getCoinPriceChangeFormatted(_ctx.crypto[unref(CryptoMetric).ATHChangePercentage])), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (_ctx.crypto.atlDate) {
          _push(`<div class="tw-flex tw-items-center tw-justify-between tw-mt-5"><div class="tw-text-primary-300"><span class="heading-h5">${ssrInterpolate(unref(t)("coins.metrics.allTimeLow"))}</span><div class="heading-h5.1">${ssrInterpolate(getFormattedDate(_ctx.crypto.atlDate))}</div></div>`);
          if (unref(isNonNullish)(_ctx.crypto[unref(CryptoMetric).ATL])) {
            _push(`<div class="tw-text-right"><span class="heading-h5">${ssrInterpolate(getCoinPriceFormatted(_ctx.crypto[unref(CryptoMetric).ATL]))}</span>`);
            if (unref(isNonNullish)(_ctx.crypto[unref(CryptoMetric).ATLChangePercentage])) {
              _push(ssrRenderComponent(_sfc_main$k, {
                "show-icon": false,
                value: _ctx.crypto[unref(CryptoMetric).ATLChangePercentage],
                "show-percent-sign": "",
                class: "tw-justify-end"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`<span class="heading-h5.1"${_scopeId}>${ssrInterpolate(getCoinPriceChangeFormatted(_ctx.crypto[unref(CryptoMetric).ATLChangePercentage]))}</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "heading-h5.1" }, toDisplayString(getCoinPriceChangeFormatted(_ctx.crypto[unref(CryptoMetric).ATLChangePercentage])), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$9$2 = _sfc_main$9$2.setup;
_sfc_main$9$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/crypto/components/stats/CryptoStatsPricePerformance.vue");
  return _sfc_setup$9$2 ? _sfc_setup$9$2(props, ctx) : void 0;
};
const _sfc_main$8$2 = /* @__PURE__ */ defineComponent({
  __name: "CryptoStats",
  __ssrInlineRender: true,
  props: {
    crypto: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const appStore = useAppStore();
    const userStore = useUserStore();
    const price = computed(
      () => props.crypto.price ? formatPrice(props.crypto.price, appStore.locale, userStore.user.currencyShortName, {
        maximumFractionDigits: 2
      }) : null
    );
    const pricePercentageChange = computed(() => {
      const priceChange = props.crypto[CryptoMetric.PricePercentChange24h];
      return priceChange ? formatPercentage(props.crypto[CryptoMetric.PricePercentChange24h]) : null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col tw-gap-7.5 lg:tw-overflow-scroll tw-scrollbar tw-scrollbar-none lg:tw-max-h-screen lg:tw-sticky tw-top-7.5" }, _attrs))}><section class="tw-contents">`);
      _push(ssrRenderComponent(_sfc_main$f$1, {
        image: _ctx.crypto.icon,
        name: _ctx.crypto.title,
        symbol: _ctx.crypto.symbol,
        price: _ctx.crypto.price
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (price.value) {
              _push2(`<div class="heading-h2"${_scopeId}>${ssrInterpolate(price.value)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="tw-mt-1"${_scopeId}>`);
            if (pricePercentageChange.value) {
              _push2(ssrRenderComponent(_sfc_main$k, {
                value: _ctx.crypto[unref(CryptoMetric).PricePercentChange24h]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="tw-text-350 tw-font-medium tw-leading-500"${_scopeId2}>${ssrInterpolate(pricePercentageChange.value)} (1${ssrInterpolate(unref(t)("common.time.d"))}) </span>`);
                  } else {
                    return [
                      createVNode("span", { class: "tw-text-350 tw-font-medium tw-leading-500" }, toDisplayString(pricePercentageChange.value) + " (1" + toDisplayString(unref(t)("common.time.d")) + ") ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              price.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "heading-h2"
              }, toDisplayString(price.value), 1)) : createCommentVNode("", true),
              createVNode("div", { class: "tw-mt-1" }, [
                pricePercentageChange.value ? (openBlock(), createBlock(_sfc_main$k, {
                  key: 0,
                  value: _ctx.crypto[unref(CryptoMetric).PricePercentChange24h]
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "tw-text-350 tw-font-medium tw-leading-500" }, toDisplayString(pricePercentageChange.value) + " (1" + toDisplayString(unref(t)("common.time.d")) + ") ", 1)
                  ]),
                  _: 1
                }, 8, ["value"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="tw-contents">`);
      _push(ssrRenderComponent(_sfc_main$i$1, { crypto: _ctx.crypto }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d$1, {
        website: _ctx.crypto.website,
        whitepaper: _ctx.crypto.whitepaper,
        github: _ctx.crypto.sourcecode
      }, null, _parent));
      if (_ctx.crypto.price) {
        _push(ssrRenderComponent(_sfc_main$c$1, {
          "conversion-rate": _ctx.crypto.price,
          symbol: _ctx.crypto.symbol
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$9$2, { crypto: _ctx.crypto }, null, _parent));
      if ((_a = _ctx.crypto.tags) == null ? void 0 : _a.length) {
        _push(ssrRenderComponent(_sfc_main$b$2, {
          tags: _ctx.crypto.tags
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup$8$2 = _sfc_main$8$2.setup;
_sfc_main$8$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/crypto/components/stats/CryptoStats.vue");
  return _sfc_setup$8$2 ? _sfc_setup$8$2(props, ctx) : void 0;
};
function itemsListRequestParamsMapper(paginationData) {
  return {
    page: paginationData.page,
    per_page: paginationData.perPage
  };
}
function createCryptoModel(raw) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
  return {
    title: raw.name,
    titleH1: (_a = raw.title_h1) != null ? _a : null,
    slug: raw.slug,
    symbol: raw.symbol ? raw.symbol.toUpperCase() : null,
    fullDescription: (_b = raw.full_description) != null ? _b : null,
    shortDescription: (_c = raw.short_description) != null ? _c : null,
    website: (_d = raw.website) != null ? _d : null,
    whitepaper: (_e = raw.whitepaper) != null ? _e : null,
    sourcecode: (_f = raw.sourcecode) != null ? _f : null,
    icon: (_g = raw.icon) != null ? _g : null,
    tags: (_h = raw.tags) != null ? _h : null,
    athDate: (_i = raw.ath_date) != null ? _i : null,
    atlDate: (_j = raw.atl_date) != null ? _j : null,
    translations: (_k = raw.translations) != null ? _k : null,
    [CryptoMetric.Price]: (_l = raw.current_price) != null ? _l : null,
    [CryptoMetric.PricePercentChange24h]: (_m = raw.price_change_24h) != null ? _m : null,
    [CryptoMetric.MarketCap]: (_n = raw.market_cap) != null ? _n : null,
    [CryptoMetric.Volume24h]: (_o = raw.volume_24h) != null ? _o : null,
    [CryptoMetric.VolumeMCap]: (_p = raw.volume_mcap) != null ? _p : null,
    [CryptoMetric.CirculatingSupply]: (_q = raw.circulating_supply) != null ? _q : null,
    [CryptoMetric.TotalSupply]: (_r = raw.total_supply) != null ? _r : null,
    [CryptoMetric.MaxSupply]: (_s = raw.max_supply) != null ? _s : null,
    [CryptoMetric.FullyDilluttedMarketCap]: (_t = raw.fully_diluted_mcap) != null ? _t : null,
    [CryptoMetric.High24h]: (_u = raw.high_24h) != null ? _u : null,
    [CryptoMetric.Low24h]: (_v = raw.low_24h) != null ? _v : null,
    [CryptoMetric.High1m]: raw.high_1m || null,
    [CryptoMetric.Low1m]: raw.low_1m || null,
    [CryptoMetric.High1y]: raw.high_1y || null,
    [CryptoMetric.Low1y]: raw.low_1y || null,
    [CryptoMetric.ATH]: (_w = raw.ath) != null ? _w : null,
    [CryptoMetric.ATL]: (_x = raw.atl) != null ? _x : null,
    [CryptoMetric.ATHChangePercentage]: (_y = raw.ath_change_percentage) != null ? _y : null,
    [CryptoMetric.ATLChangePercentage]: (_z = raw.atl_change_percentage) != null ? _z : null
  };
}
const CryptoService = (fetch) => ({
  async getCryptoRanking(params) {
    return await fetch("api/ranking/cryptocurrency", {
      params: itemsListRequestParamsMapper(params)
    });
  },
  async getCrypto({
    queryKey: [{ slug }]
  }) {
    const crypto = await fetch(`api/page/crypto/${slug}`, {
      credentials: "include"
    });
    return createCryptoModel(crypto);
  }
});
const cryptoKeys = {
  all: [{ scope: "crypto" }],
  lists: () => [{ ...cryptoKeys.all[0], entity: "list" }],
  // rankingList: ({ paginationData, sortData, currency }: RankigListParams) =>
  //   [
  //     { ...dappKeys.lists()[0], entity: 'rankingList', paginationData, sortData, currency },
  //   ] as const,
  details: () => [{ ...cryptoKeys.all[0], entity: "detail" }],
  detail: (slug, currency, locale) => [{ ...cryptoKeys.details()[0], slug, currency, locale }]
};
const useDeBreakpoints = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const smWidth = ref("sm");
  const lgWidth = ref("lg");
  const xlWidth = ref("xl");
  const isGreaterThanSm = computed(() => breakpoints.greaterOrEqual(() => smWidth.value));
  const isGreaterThanXl = computed(() => breakpoints.greaterOrEqual(() => xlWidth.value));
  const isSmallerThanLg = computed(() => breakpoints.smallerOrEqual(() => lgWidth.value));
  const isTablet = computed(() => breakpoints.between("sm", "lg"));
  return {
    isSmallerThanLg: isSmallerThanLg.value,
    isGreaterThanSm: isGreaterThanSm.value,
    isGreaterThanXl: isGreaterThanXl.value,
    isTablet: isTablet.value
  };
};
const _sfc_main$7$2 = /* @__PURE__ */ defineComponent({
  __name: "DigitalAssetLayout",
  __ssrInlineRender: true,
  props: {
    tabs: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const tabsWithOverview = computed(() => [
      {
        id: "coin-overview",
        label: t("common.overview"),
        class: "lg:tw-hidden"
      },
      ...props.tabs
    ]);
    computed(() => tabsWithOverview.value.map((tab) => tab.id));
    const scrollToSection = (sectionIdx) => {
      const el = (void 0).getElementById(tabsWithOverview.value[sectionIdx].id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    };
    const { isSmallerThanLg } = useDeBreakpoints();
    const activeTabIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-container tw-mb-15" }, _attrs))}><div class="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[370px_minmax(0,1fr)] tw-gap-x-7.5"><section${ssrRenderAttr("id", unref(isSmallerThanLg) ? `coin-overview` : void 0)} class="tw-row-start-2 tw-row-end-3 lg:tw-row-start-1 lg:tw-row-end-13 tw-mb-10 lg:tw-pt-7.5 tw-bg-primary-800 tw-scroll-mt-28">`);
      ssrRenderSlot(_ctx.$slots, "stats", {}, null, _push, _parent);
      _push(`</section><div class="tw-sticky tw-top-[53px] lg:tw-top-0 tw-pt-4 lg:tw-pt-7.5 tw-mt-3 lg:tw-mt-0 tw-mb-7.5 tw-z-20 tw-bg-primary-800 max-lg:tw-row-start-1 max-lg:tw-row-end-2">`);
      _push(ssrRenderComponent(_sfc_main$7$3, {
        modelValue: activeTabIndex.value,
        "onUpdate:modelValue": ($event) => activeTabIndex.value = $event,
        model: tabsWithOverview.value,
        onTabChange: scrollToSection
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(_ctx.tabs, (item2) => {
        _push(`<section${ssrRenderAttr("id", item2.id)} class="tw-mb-10 tw-scroll-mt-28 lg:tw-scroll-mt-20">`);
        ssrRenderSlot(_ctx.$slots, item2.id, {}, null, _push, _parent);
        _push(`</section>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$7$2 = _sfc_main$7$2.setup;
_sfc_main$7$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/shared/components/DigitalAssetLayout.vue");
  return _sfc_setup$7$2 ? _sfc_setup$7$2(props, ctx) : void 0;
};
const _sfc_main$6$2 = /* @__PURE__ */ defineComponent({
  __name: "NewsGridItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    imageClass: {}
  },
  setup(__props) {
    ref(null);
    const numberOfLines = ref(3);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-relative tw-flex-wrap md:tw-flex-nowrap tw-gap-5" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, {
        to: `/news/${_ctx.item.slug}`,
        class: "tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full"
      }, null, _parent));
      if (_ctx.item.image) {
        _push(`<img loading="lazy"${ssrRenderAttr("src", _ctx.item.image)}${ssrRenderAttr("alt", _ctx.item.title)}${ssrRenderAttr("title", _ctx.item.title)} class="${ssrRenderClass([_ctx.imageClass, "xl:tw-flex-shrink-0 tw-w-full md:tw-min-w-[275px] md:tw-w-[275px] tw-object-cover"])}">`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-flex tw-flex-col tw-h-full"><span class="tw-inline-block heading-h3 tw-mb-2.5">${ssrInterpolate(_ctx.item.title)}</span><span class="${ssrRenderClass([`tw-line-clamp-${numberOfLines.value}`, "max-md:tw-hidden body-b1 tw-text-primary-300 tw-mb-auto js-content"])}">${ssrInterpolate(_ctx.item.shortDescription)}</span>`);
      if (_ctx.item.author) {
        _push(`<div class="tw-flex tw-items-center tw-gap-1.5 tw-text-300 tw-leading-400 tw-mt-2.5"><div class="tw-relative tw-flex tw-gap-1.5">`);
        _push(ssrRenderComponent(_sfc_main$k$1, {
          size: unref(AVATAR_SIZE_OPTIONS).small,
          src: _ctx.item.author.image
        }, null, _parent));
        _push(`<p class="tw-font-semibold">${ssrInterpolate(_ctx.item.author.name)}</p></div><i class="tw-w-100 tw-h-100 tw-inline-block tw-rounded-full tw-bg-primary-400"></i><p class="tw-text-primary-300">${ssrInterpolate(_ctx.item.publishedAtFormatted)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6$2 = _sfc_main$6$2.setup;
_sfc_main$6$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/news/components/NewsGridItem.vue");
  return _sfc_setup$6$2 ? _sfc_setup$6$2(props, ctx) : void 0;
};
const newsKeys = {
  all: [{ scope: "news" }],
  mainPage: (locale) => [{ ...newsKeys.all[0], entity: "mainPage", locale }],
  lists: () => [{ ...newsKeys.all[0], entity: "list" }],
  list: (locale) => [{ ...newsKeys.lists()[0], locale }],
  dappList: (slug, locale) => [{ ...newsKeys.lists()[0], entity: "dappList", slug, locale }],
  cryptoList: (slug, locale) => [{ ...newsKeys.lists()[0], entity: "cryptoList", slug, locale }],
  otherNewsList: (slug, locale) => [{ ...newsKeys.lists()[0], entity: "otherNewsList", slug, locale }],
  details: () => [{ ...newsKeys.all[0], entity: "detail" }],
  detail: (slug) => [{ ...newsKeys.details()[0], slug }]
};
function createNewsModelBase(raw, locale) {
  var _a;
  return {
    id: raw.id,
    title: raw.title,
    shortDescription: raw.short_description,
    image: raw.image,
    publishedAt: raw.published_at,
    publishedAtFormatted: dayjs(raw.published_at).locale(locale).fromNow(),
    author: {
      image: (_a = raw.author_avatar) != null ? _a : USER_AVATAR_STUMP_PATH,
      name: raw.author_name
    },
    slug: raw.slug
  };
}
function createNewsModel(raw, locale) {
  const baseModel = createNewsModelBase(raw, locale);
  return {
    ...baseModel,
    content: raw.content,
    likes: raw.likes,
    pageviews: raw.pageviews,
    isLiked: raw.isLiked
  };
}
const NewsService = (fetch) => ({
  async getNewsMainPage({
    queryKey: [{ locale }]
  }) {
    const news = await fetch("api/main-page/top-news", {
      credentials: "include"
    });
    return news.map((item2) => createNewsModelBase(item2, locale));
  },
  async getNewsList([{ locale }], page) {
    const res = await fetch(
      "api/list/news",
      {
        credentials: "include",
        params: {
          page
        }
      }
    );
    const data4 = res.data.map((item2) => createNewsModelBase(item2, locale));
    const nextCursor = res.current_page < res.last_page ? res.current_page + 1 : void 0;
    return {
      data: data4,
      nextCursor
    };
  },
  async getNewsItemBySlug({ queryKey: [{ slug }] }, locale) {
    const newsItem = await fetch(`api/page/news/${slug}`, {
      credentials: "include"
    });
    return createNewsModel(newsItem, locale);
  },
  async getOtherNewsList({
    queryKey: [{ slug, locale }]
  }) {
    const news = await fetch(`api/page/news/${slug}/other`, {
      credentials: "include"
    });
    return news.map((item2) => createNewsModelBase(item2, locale));
  },
  async like(id, like = true) {
    const apiPath = like ? `api/v1/like/news/${id}` : `api/v1/unlike/news/${id}`;
    return await fetch(apiPath, {
      localError: true,
      method: "POST"
    });
  },
  async getNewsDapp({
    queryKey: [{ slug, locale }]
  }) {
    const news = await fetch(`api/page/dapp/${slug}/recommend-news`, {
      credentials: "include"
    });
    return news.map((item2) => createNewsModelBase(item2, locale));
  },
  async getNewsCrypto({
    queryKey: [{ slug, locale }]
  }) {
    const news = await fetch(`api/page/crypto/${slug}/news`, {
      credentials: "include"
    });
    return news.map((item2) => createNewsModelBase(item2, locale));
  }
});
const _sfc_main$5$2 = /* @__PURE__ */ defineComponent({
  __name: "CryptoNews",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { $customFetch } = useNuxtApp();
    const route = useRoute();
    const appStore = useAppStore();
    const newsRepo = NewsService($customFetch);
    const {
      data: news,
      isLoading,
      suspense
    } = useQuery({
      queryKey: computed(() => newsKeys.cryptoList(route.params.slug, appStore.locale)),
      queryFn: (queryKey) => newsRepo.getNewsCrypto(queryKey),
      staleTime: FIFTEEN_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><h2 class="heading-h2">${ssrInterpolate(unref(t)("news.title"))}</h2>`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_sfc_main$c$2, { class: "tw-my-5 tw-w-1000 tw-h-1000" }, null, _parent));
      } else {
        _push(`<div class="tw-mt-7.5 tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-1 tw-gap-7.5"><!--[-->`);
        ssrRenderList(unref(news), (item2) => {
          _push(ssrRenderComponent(_sfc_main$6$2, {
            key: item2.id,
            item: item2,
            class: "lg:tw-max-h-[180px]",
            "image-class": "max-lg:tw-hidden"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if ((_a = unref(news)) == null ? void 0 : _a.length) {
        _push(`<div class="tw-text-center tw-mt-7.5">`);
        _push(ssrRenderComponent(_sfc_main$b$3, { href: "/news" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$5$2 = _sfc_main$5$2.setup;
_sfc_main$5$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/news/components/sections/CryptoNews.vue");
  return _sfc_setup$5$2 ? _sfc_setup$5$2(props, ctx) : void 0;
};
const _sfc_main$4$2 = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const { t } = useI18n();
    const route = useRoute();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const queryClient = useQueryClient();
    const { $customFetch } = useNuxtApp();
    const cryptoRepo = CryptoService($customFetch);
    const isLoading = ref(false);
    const crypto = ref(null);
    async function fetchData() {
      try {
        isLoading.value = true;
        crypto.value = await queryClient.fetchQuery({
          queryKey: cryptoKeys.detail(
            route.params.slug,
            userStore.user.currencyShortName,
            appStore.locale
          ),
          queryFn: async (queryKey) => await cryptoRepo.getCrypto(queryKey),
          staleTime: THIRTY_MINUTES_IN_MILLISECONDS
        });
      } finally {
        isLoading.value = false;
      }
    }
    [__temp, __restore] = withAsyncContext(() => fetchData()), await __temp, __restore();
    const cryptoTabs = computed(() => {
      var _a2;
      const tabs = [{ id: "coin-news", label: t("news.title") }];
      if ((_a2 = crypto.value) == null ? void 0 : _a2.fullDescription)
        tabs.push({
          id: "coin-about",
          label: t("common.about")
        });
      return tabs;
    });
    watch(() => userStore.user.currencyShortName, fetchData);
    const router = useRouter();
    const localePath = useLocalePath();
    const redirectToLocalizedCryptoPage = () => {
      var _a2;
      const localizedSlug = (_a2 = crypto.value) == null ? void 0 : _a2.translations[appStore.locale];
      if (localizedSlug) {
        router.push(localePath(`/crypto/${localizedSlug}`));
      } else {
        router.push(localePath("/"));
      }
    };
    watch(() => appStore.locale, redirectToLocalizedCryptoPage);
    useSeoMetaData({
      title: (_a = crypto.value) == null ? void 0 : _a.titleH1,
      description: (_b = crypto.value) == null ? void 0 : _b.shortDescription,
      image: (_c = crypto.value) == null ? void 0 : _c.icon,
      relativeUrl: `crypto/${(_d = crypto.value) == null ? void 0 : _d.slug}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_safe_html = resolveDirective("safe-html");
      let _temp0;
      if (crypto.value) {
        _push(ssrRenderComponent(_sfc_main$7$2, mergeProps({ tabs: cryptoTabs.value }, _attrs), createSlots({
          stats: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (crypto.value) {
                _push2(ssrRenderComponent(_sfc_main$8$2, { crypto: crypto.value }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                crypto.value ? (openBlock(), createBlock(_sfc_main$8$2, {
                  key: 0,
                  crypto: crypto.value
                }, null, 8, ["crypto"])) : createCommentVNode("", true)
              ];
            }
          }),
          "coin-news": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$5$2, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$5$2)
              ];
            }
          }),
          _: 2
        }, [
          crypto.value && crypto.value.fullDescription ? {
            name: "coin-about",
            fn: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a2;
              if (_push2) {
                _push2(`<h2 class="heading-h2 tw-mb-7.5"${_scopeId}>${ssrInterpolate(unref(t)("digitalAsset.about", { title: crypto.value.title }))}</h2><div${ssrRenderAttrs(_temp0 = mergeProps({ class: "text-content" }, ssrGetDirectiveProps(_ctx, _directive_safe_html, crypto.value.fullDescription)))}${_scopeId}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a2 = _temp0.innerHTML) != null ? _a2 : ""}</div>`);
              } else {
                return [
                  createVNode("h2", { class: "heading-h2 tw-mb-7.5" }, toDisplayString(unref(t)("digitalAsset.about", { title: crypto.value.title })), 1),
                  withDirectives(createVNode("div", { class: "text-content" }, null, 512), [
                    [_directive_safe_html, crypto.value.fullDescription]
                  ])
                ];
              }
            }),
            key: "0"
          } : void 0
        ]), _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4$2 = _sfc_main$4$2.setup;
_sfc_main$4$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(ranking)/crypto/[slug].vue");
  return _sfc_setup$4$2 ? _sfc_setup$4$2(props, ctx) : void 0;
};
const _slug_$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$4$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3$3 = /* @__PURE__ */ defineComponent({
  __name: "DappNews",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { $customFetch } = useNuxtApp();
    const route = useRoute();
    const appStore = useAppStore();
    const newsRepo = NewsService($customFetch);
    const {
      data: news,
      isLoading,
      suspense
    } = useQuery({
      queryKey: computed(() => newsKeys.dappList(route.params.slug, appStore.locale)),
      queryFn: (queryKey) => newsRepo.getNewsDapp(queryKey),
      staleTime: FIFTEEN_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<!--[--><h2 class="heading-h2">${ssrInterpolate(unref(t)("news.title"))}</h2>`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_sfc_main$c$2, { class: "tw-my-5 tw-w-1000 tw-h-1000" }, null, _parent));
      } else {
        _push(`<div class="tw-mt-7.5 tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-1 tw-gap-7.5"><!--[-->`);
        ssrRenderList(unref(news), (item2) => {
          _push(ssrRenderComponent(_sfc_main$6$2, {
            key: item2.id,
            item: item2,
            class: "lg:tw-max-h-[180px]",
            "image-class": "max-lg:tw-hidden"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if ((_a = unref(news)) == null ? void 0 : _a.length) {
        _push(`<div class="tw-text-center tw-mt-7.5">`);
        _push(ssrRenderComponent(_sfc_main$b$3, { href: "/news" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3$3 = _sfc_main$3$3.setup;
_sfc_main$3$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/news/components/sections/DappNews.vue");
  return _sfc_setup$3$3 ? _sfc_setup$3$3(props, ctx) : void 0;
};
var DappMetric = /* @__PURE__ */ ((DappMetric2) => {
  DappMetric2["TotalUsers24h"] = "totalUsers24h";
  DappMetric2["TotalUsers7d"] = "totalUsers7d";
  DappMetric2["TotalUsers30d"] = "totalUsers30d";
  DappMetric2["UserChange24h"] = "userChange24h";
  DappMetric2["UserChange7d"] = "userChange7d";
  DappMetric2["UserChange30d"] = "userChange30d";
  DappMetric2["Volume24h"] = "volume24h";
  DappMetric2["Volume7d"] = "volume7d";
  DappMetric2["Volume30d"] = "volume30d";
  DappMetric2["VolumeUSD24h"] = "volumeUSD24h";
  DappMetric2["VolumeUSD7d"] = "volumeUSD7d";
  DappMetric2["VolumeUSD30d"] = "volumeUSD30d";
  DappMetric2["VolumeChange24h"] = "volumeChange24h";
  DappMetric2["VolumeChange7d"] = "volumeChange7d";
  DappMetric2["VolumeChange30d"] = "volumeChange30d";
  DappMetric2["Balance24h"] = "balance24h";
  DappMetric2["Balance7d"] = "balance7d";
  DappMetric2["Balance30d"] = "balance30d";
  DappMetric2["BalanceChange24h"] = "balanceChange24h";
  DappMetric2["BalanceChange7d"] = "balanceChange7d";
  DappMetric2["BalanceChange30d"] = "balanceChange30d";
  DappMetric2["Blockchain"] = "blockchain";
  DappMetric2["Category"] = "category";
  DappMetric2["Platform"] = "platform";
  return DappMetric2;
})(DappMetric || {});
const DappMetricCategoryLabels = {
  [
    "totalUsers"
    /* TotalUsers */
  ]: "coins.metrics.totalUsers",
  [
    "userChange"
    /* UserChange */
  ]: "coins.metrics.userChange",
  [
    "volume"
    /* Volume */
  ]: "coins.metrics.volume",
  [
    "volumeChange"
    /* VolumeChange */
  ]: "coins.metrics.volumeChange",
  [
    "balance"
    /* Balance */
  ]: "coins.metrics.balance",
  [
    "balanceChange"
    /* BalanceChange */
  ]: "coins.metrics.balanceChange",
  [
    "other"
    /* Other */
  ]: "coins.metrics.other"
};
function getDappMetricCategoryLabelKey(metricCategory) {
  return DappMetricCategoryLabels[metricCategory];
}
const DAPP_METRICS_OPTIONS = {
  [
    "totalUsers"
    /* TotalUsers */
  ]: [
    "totalUsers24h",
    "totalUsers7d",
    "totalUsers30d"
    /* TotalUsers30d */
  ],
  [
    "userChange"
    /* UserChange */
  ]: [
    "userChange24h",
    "userChange7d",
    "userChange30d"
    /* UserChange30d */
  ],
  [
    "volume"
    /* Volume */
  ]: [
    "volume24h",
    "volume7d",
    "volume30d",
    "volumeUSD24h",
    "volumeUSD7d",
    "volumeUSD30d"
    /* VolumeUSD30d */
  ],
  [
    "volumeChange"
    /* VolumeChange */
  ]: [
    "volumeChange24h",
    "volumeChange7d",
    "volumeChange30d"
    /* VolumeChange30d */
  ],
  [
    "balance"
    /* Balance */
  ]: [
    "balance24h",
    "balance7d",
    "balance30d"
    /* Balance30d */
  ],
  [
    "balanceChange"
    /* BalanceChange */
  ]: [
    "balanceChange24h",
    "balanceChange7d",
    "balanceChange30d"
    /* BalanceChange30d */
  ],
  [
    "other"
    /* Other */
  ]: [
    "blockchain",
    "category"
    /* Category */
    // DappMetric.Platform
  ]
};
const DAPP_METRICS_DEFAULT = [
  "category",
  "blockchain",
  "balance24h",
  "balanceChange24h",
  "totalUsers24h",
  "userChange24h",
  "volume24h"
  /* Volume24h */
];
function useTypedLocale() {
  const { locale } = useI18n();
  return locale.value;
}
const _sfc_main$2$4 = /* @__PURE__ */ defineComponent({
  __name: "DappMetrics",
  __ssrInlineRender: true,
  props: {
    dapp: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const typedLocale = useTypedLocale();
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<dl${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col tw-gap-5" }, _attrs))}><div><div class="tw-flex tw-justify-between tw-items-center"><dt class="tw-flex tw-gap-1.5"><div class="heading-h5 tw-text-primary-300 tw-overflow-hidden tw-text-ellipsis">${ssrInterpolate(unref(t)("coins.metrics.volume"))}</div>`);
      _push(ssrRenderComponent(_sfc_main$l, {
        placement: "right",
        class: "tw-flex tw-items-center"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("dapp.hints.volume"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("dapp.hints.volume")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$m$1, {
              name: "info",
              class: "tw-text-primary-400"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$m$1, {
                name: "info",
                class: "tw-text-primary-400"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</dt><dd class="tw-flex tw-items-center tw-gap-2.5">`);
      if (!unref(isNullish)(_ctx.dapp[unref(DappMetric).Balance24h])) {
        _push(`<!--[-->`);
        if (_ctx.dapp[unref(DappMetric).VolumeChange24h]) {
          _push(ssrRenderComponent(_sfc_main$k, {
            value: _ctx.dapp[unref(DappMetric).VolumeChange24h]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="heading-h5"${_scopeId}>${ssrInterpolate(unref(formatPercentage)(_ctx.dapp[unref(DappMetric).VolumeChange24h]))}</span>`);
              } else {
                return [
                  createVNode("span", { class: "heading-h5" }, toDisplayString(unref(formatPercentage)(_ctx.dapp[unref(DappMetric).VolumeChange24h])), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="heading-h5">${ssrInterpolate(unref(formatPrice)(
          _ctx.dapp[unref(DappMetric).Volume24h],
          unref(typedLocale),
          unref(userStore).user.currencyShortName
        ))}</div><!--]-->`);
      } else {
        _push(`<div class="tw-flex tw-items-center tw-gap-x-2.5"> - `);
        _push(ssrRenderComponent(_sfc_main$l, {
          placement: "right",
          class: "tw-flex tw-items-center"
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("common.noDataAvailable"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("common.noDataAvailable")), 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: "info",
                class: "tw-text-primary-400"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$m$1, {
                  name: "info",
                  class: "tw-text-primary-400"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</dd></div></div><div class="tw-flex tw-justify-between tw-items-center"><dt class="tw-flex tw-gap-1.5"><div class="heading-h5 tw-text-primary-300 tw-overflow-hidden tw-text-ellipsis">${ssrInterpolate(unref(t)("coins.metrics.contractBalance"))}</div>`);
      _push(ssrRenderComponent(_sfc_main$l, {
        placement: "right",
        class: "tw-flex tw-items-center"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("dapp.hints.balance"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("dapp.hints.balance")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$m$1, {
              name: "info",
              class: "tw-text-primary-400"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$m$1, {
                name: "info",
                class: "tw-text-primary-400"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</dt><div class="tw-flex tw-items-center tw-gap-2.5">`);
      if (!unref(isNullish)(_ctx.dapp[unref(DappMetric).Balance24h])) {
        _push(`<dd class="heading-h5">${ssrInterpolate(unref(formatPrice)(_ctx.dapp[unref(DappMetric).Balance24h], unref(typedLocale), unref(userStore).user.currencyShortName))}</dd>`);
      } else {
        _push(`<div class="tw-flex tw-items-center tw-gap-x-2.5"> - `);
        _push(ssrRenderComponent(_sfc_main$l, {
          placement: "right",
          class: "tw-flex tw-items-center"
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("common.noDataAvailable"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("common.noDataAvailable")), 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: "info",
                class: "tw-text-primary-400"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$m$1, {
                  name: "info",
                  class: "tw-text-primary-400"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div><div class="tw-flex tw-justify-between tw-items-center"><dt class="tw-flex tw-gap-1.5"><div class="heading-h5 tw-text-primary-300 tw-overflow-hidden tw-text-ellipsis">${ssrInterpolate(unref(t)("coins.metrics.category"))}</div></dt><dd class="heading-h5">`);
      if (_ctx.dapp[unref(DappMetric).Category]) {
        _push(`<!--[-->${ssrInterpolate(_ctx.dapp[unref(DappMetric).Category])}<!--]-->`);
      } else {
        _push(`<div class="tw-flex tw-items-center tw-gap-x-2.5"> - `);
        _push(ssrRenderComponent(_sfc_main$l, {
          placement: "right",
          class: "tw-flex tw-items-center"
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("common.noDataAvailable"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("common.noDataAvailable")), 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: "info",
                class: "tw-text-primary-400"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$m$1, {
                  name: "info",
                  class: "tw-text-primary-400"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</dd></div><div class="tw-flex tw-justify-between tw-items-center"><dt class="tw-flex tw-gap-1.5"><div class="heading-h5 tw-text-primary-300 tw-overflow-hidden tw-text-ellipsis">${ssrInterpolate(unref(t)("coins.metrics.blockchain"))}</div></dt><dd class="heading-h5">`);
      if (_ctx.dapp[unref(DappMetric).Blockchain]) {
        _push(`<!--[-->${ssrInterpolate(_ctx.dapp[unref(DappMetric).Blockchain])}<!--]-->`);
      } else {
        _push(`<div class="tw-flex tw-items-center tw-gap-x-2.5"> - `);
        _push(ssrRenderComponent(_sfc_main$l, {
          placement: "right",
          class: "tw-flex tw-items-center"
        }, {
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("common.noDataAvailable"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("common.noDataAvailable")), 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: "info",
                class: "tw-text-primary-400"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$m$1, {
                  name: "info",
                  class: "tw-text-primary-400"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</dd></div></dl>`);
    };
  }
});
const _sfc_setup$2$4 = _sfc_main$2$4.setup;
_sfc_main$2$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/dapps/components/DappMetrics.vue");
  return _sfc_setup$2$4 ? _sfc_setup$2$4(props, ctx) : void 0;
};
const _sfc_main$1$4 = /* @__PURE__ */ defineComponent({
  __name: "DappStats",
  __ssrInlineRender: true,
  props: {
    dapp: {}
  },
  setup(__props) {
    const { t } = useI18n();
    const typedLocale = useTypedLocale();
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col tw-gap-7.5 lg:tw-overflow-scroll tw-scrollbar tw-scrollbar-none lg:tw-max-h-screen lg:tw-sticky tw-top-7.5" }, _attrs))}><section class="tw-contents">`);
      _push(ssrRenderComponent(_sfc_main$f$1, {
        image: _ctx.dapp.icon,
        name: _ctx.dapp.title
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="tw-text-300 tw-leading-400 tw-mb-1"${_scopeId}>${ssrInterpolate(unref(t)("coins.metrics.totalUsers"))}</div>`);
            if (!unref(isNullish)(_ctx.dapp[unref(DappMetric).TotalUsers24h])) {
              _push2(`<div class="heading-h2"${_scopeId}>${ssrInterpolate(unref(formatNumber)((_a2 = _ctx.dapp[unref(DappMetric).TotalUsers24h]) != null ? _a2 : 0, unref(typedLocale)))}</div>`);
            } else {
              _push2(`<div class="tw-flex tw-items-center tw-gap-x-2.5"${_scopeId}> - `);
              _push2(ssrRenderComponent(_sfc_main$l, {
                placement: "right",
                class: "tw-flex tw-items-center"
              }, {
                content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(t)("common.noDataAvailable"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(t)("common.noDataAvailable")), 1)
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$m$1, {
                      name: "info",
                      class: "tw-text-primary-400"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$m$1, {
                        name: "info",
                        class: "tw-text-primary-400"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              createVNode("div", { class: "tw-text-300 tw-leading-400 tw-mb-1" }, toDisplayString(unref(t)("coins.metrics.totalUsers")), 1),
              !unref(isNullish)(_ctx.dapp[unref(DappMetric).TotalUsers24h]) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "heading-h2"
              }, toDisplayString(unref(formatNumber)((_b2 = _ctx.dapp[unref(DappMetric).TotalUsers24h]) != null ? _b2 : 0, unref(typedLocale))), 1)) : (openBlock(), createBlock("div", {
                key: 1,
                class: "tw-flex tw-items-center tw-gap-x-2.5"
              }, [
                createTextVNode(" - "),
                createVNode(_sfc_main$l, {
                  placement: "right",
                  class: "tw-flex tw-items-center"
                }, {
                  content: withCtx(() => [
                    createTextVNode(toDisplayString(unref(t)("common.noDataAvailable")), 1)
                  ]),
                  default: withCtx(() => [
                    createVNode(_sfc_main$m$1, {
                      name: "info",
                      class: "tw-text-primary-400"
                    })
                  ]),
                  _: 1
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><div class="tw-flex tw-flex-col tw-gap-7.5 tw--mt-2.5">`);
      if ((_a = _ctx.dapp.token) == null ? void 0 : _a.title) {
        _push(`<section class="tw-contents"><div class="tw-p-5 tw-border tw-border-primary-600"><div class="tw-text-300 tw-leading-400 tw-pb-3.5 tw-border-b tw-border-primary-600">${ssrInterpolate(unref(t)("coins.metrics.token"))}</div><div class="tw-mt-3.5"><div class="tw-grid tw-grid-cols-[max-content_1fr_repeat(2,min-content)] tw-items-center tw-gap-2.5">`);
        if (_ctx.dapp.token.icon) {
          _push(`<img${ssrRenderAttr("src", _ctx.dapp.token.icon)}${ssrRenderAttr("height", 26)}${ssrRenderAttr("width", 26)}${ssrRenderAttr("alt", _ctx.dapp.token.title)} loading="lazy" decoding="async" fetchpriority="low">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="heading-h5">${ssrInterpolate(_ctx.dapp.token.title)}</div>`);
        if (_ctx.dapp.token.priceChange) {
          _push(ssrRenderComponent(_sfc_main$k, {
            value: _ctx.dapp.token.priceChange
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="heading-h5"${_scopeId}>${ssrInterpolate(unref(formatPercentage)(_ctx.dapp.token.priceChange))}</span>`);
              } else {
                return [
                  createVNode("span", { class: "heading-h5" }, toDisplayString(unref(formatPercentage)(_ctx.dapp.token.priceChange)), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (_ctx.dapp.token.volume) {
          _push(`<div class="heading-h5">${ssrInterpolate(unref(formatPrice)(_ctx.dapp.token.volume, unref(typedLocale), unref(userStore).user.currencyShortName, {
            maximumFractionDigits: 1,
            notation: "compact"
          }))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="tw-contents">`);
      _push(ssrRenderComponent(_sfc_main$2$4, { dapp: _ctx.dapp }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$d$1, {
        "social-media-links": _ctx.dapp.socialLinks,
        website: _ctx.dapp.website
      }, null, _parent));
      if ((_b = _ctx.dapp.tags) == null ? void 0 : _b.length) {
        _push(ssrRenderComponent(_sfc_main$b$2, {
          tags: _ctx.dapp.tags
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section></div></div>`);
    };
  }
});
const _sfc_setup$1$4 = _sfc_main$1$4.setup;
_sfc_main$1$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/dapps/components/DappStats.vue");
  return _sfc_setup$1$4 ? _sfc_setup$1$4(props, ctx) : void 0;
};
const DEFAULT_METRIC_NULLISH_VALUE = "-";
function resolveMetricNullishValue(value, formatter, options2 = {}) {
  const { formatterArgs = [], defaultValue = DEFAULT_METRIC_NULLISH_VALUE } = options2;
  return isNullish(value) ? defaultValue : formatter(value, ...formatterArgs);
}
function dappPriceFormatter(value, maximumFractionDigits = 0, locale, currency) {
  return resolveMetricNullishValue(value, formatPrice, {
    formatterArgs: [locale, currency, { notation: "compact", maximumFractionDigits }]
  });
}
function formatDappRankingModelShortMetrics(baseModel, locale, currency) {
  return {
    balance24hFormatted: dappPriceFormatter(baseModel[DappMetric.Balance24h], 2, locale, currency),
    volume24hFormatted: dappPriceFormatter(baseModel[DappMetric.Volume24h], 1, locale, currency)
  };
}
function createDappRankingModelShort(raw, locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY) {
  var _a, _b;
  const baseModel = {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    icon: raw.icon,
    [DappMetric.Volume24h]: (_a = raw.volume_24h) != null ? _a : null,
    [DappMetric.Balance24h]: (_b = raw.balance_24h) != null ? _b : null
  };
  return {
    ...baseModel,
    ...formatDappRankingModelShortMetrics(baseModel, locale, currency)
  };
}
function formatDappRankingData(model, locale, currency) {
  const formatDappPrice = (value, maximumFractionDigits = 0) => dappPriceFormatter(value, maximumFractionDigits, locale, currency);
  return {
    balance24hFormatted: formatDappPrice(model[DappMetric.Balance24h], 2),
    balance7dFormatted: formatDappPrice(model[DappMetric.Balance7d], 2),
    balance30dFormatted: formatDappPrice(model[DappMetric.Balance30d], 2),
    volume24hFormatted: formatDappPrice(model[DappMetric.Volume24h]),
    volume7dFormatted: formatDappPrice(model[DappMetric.Volume7d]),
    volume30dFormatted: formatDappPrice(model[DappMetric.Volume30d]),
    volumeUSD24hFormatted: formatDappPrice(model[DappMetric.VolumeUSD24h]),
    volumeUSD7dFormatted: formatDappPrice(model[DappMetric.VolumeUSD7d]),
    volumeUSD30dFormatted: formatDappPrice(model[DappMetric.VolumeUSD30d]),
    totalUsers24hFormatted: resolveMetricNullishValue(
      model[DappMetric.TotalUsers24h],
      formatNumber,
      {
        formatterArgs: [locale, { notation: "compact", maximumFractionDigits: 2 }]
      }
    ),
    totalUsers7dFormatted: resolveMetricNullishValue(model[DappMetric.TotalUsers7d], formatNumber, {
      formatterArgs: [locale, { notation: "compact", maximumFractionDigits: 2 }]
    }),
    totalUsers30dFormatted: resolveMetricNullishValue(
      model[DappMetric.TotalUsers30d],
      formatNumber,
      {
        formatterArgs: [locale, { notation: "compact", maximumFractionDigits: 2 }]
      }
    ),
    balanceChange24hFormatted: resolveMetricNullishValue(
      model[DappMetric.BalanceChange24h],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    balanceChange7dFormatted: resolveMetricNullishValue(
      model[DappMetric.BalanceChange7d],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    balanceChange30dFormatted: resolveMetricNullishValue(
      model[DappMetric.BalanceChange30d],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    userChange24hFormatted: resolveMetricNullishValue(
      model[DappMetric.UserChange24h],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    userChange7dFormatted: resolveMetricNullishValue(
      model[DappMetric.UserChange7d],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    userChange30dFormatted: resolveMetricNullishValue(
      model[DappMetric.UserChange30d],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    volumeChange24hFormatted: resolveMetricNullishValue(
      model[DappMetric.VolumeChange24h],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    volumeChange7dFormatted: resolveMetricNullishValue(
      model[DappMetric.VolumeChange7d],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    ),
    volumeChange30dFormatted: resolveMetricNullishValue(
      model[DappMetric.VolumeChange30d],
      formatPercentage,
      {
        formatterArgs: [{ modular: true }]
      }
    )
  };
}
function createDappRankingModel(raw, locale = DEFAULT_LOCALE, currency = DEFAULT_CURRENCY) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2, _m2, _n2, _o2, _p2, _q2, _r2, _s2, _t2, _u2, _v, _w;
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  const baseModel = {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    icon: raw.icon,
    [DappMetric.Category]: (_a2 = raw.category_id) != null ? _a2 : null,
    [DappMetric.Blockchain]: (_b2 = raw.blockchain_id) != null ? _b2 : null,
    // [DappMetric.Platform]: raw.platform ?? null,
    [DappMetric.TotalUsers24h]: (_c2 = (_a = raw.dapp_data) == null ? void 0 : _a.total_users_24h) != null ? _c2 : null,
    [DappMetric.TotalUsers7d]: (_d2 = (_b = raw.dapp_data) == null ? void 0 : _b.total_users_7d) != null ? _d2 : null,
    [DappMetric.TotalUsers30d]: (_e2 = (_c = raw.dapp_data) == null ? void 0 : _c.total_users_30d) != null ? _e2 : null,
    [DappMetric.UserChange24h]: (_f2 = (_d = raw.dapp_data) == null ? void 0 : _d.users_change_24h) != null ? _f2 : null,
    [DappMetric.UserChange7d]: (_g2 = (_e = raw.dapp_data) == null ? void 0 : _e.users_change_7d) != null ? _g2 : null,
    [DappMetric.UserChange30d]: (_h2 = (_f = raw.dapp_data) == null ? void 0 : _f.users_change_30d) != null ? _h2 : null,
    [DappMetric.Volume24h]: (_i2 = (_g = raw.dapp_data) == null ? void 0 : _g.volume_24h) != null ? _i2 : null,
    [DappMetric.Volume7d]: (_j2 = (_h = raw.dapp_data) == null ? void 0 : _h.volume_7d) != null ? _j2 : null,
    [DappMetric.Volume30d]: (_k2 = (_i = raw.dapp_data) == null ? void 0 : _i.volume_30d) != null ? _k2 : null,
    [DappMetric.VolumeUSD24h]: (_l2 = (_j = raw.dapp_data) == null ? void 0 : _j.volume_usd_24h) != null ? _l2 : null,
    [DappMetric.VolumeUSD7d]: (_m2 = (_k = raw.dapp_data) == null ? void 0 : _k.volume_usd_7d) != null ? _m2 : null,
    [DappMetric.VolumeUSD30d]: (_n2 = (_l = raw.dapp_data) == null ? void 0 : _l.volume_usd_30d) != null ? _n2 : null,
    [DappMetric.VolumeChange24h]: (_o2 = (_m = raw.dapp_data) == null ? void 0 : _m.volume_change_24h) != null ? _o2 : null,
    [DappMetric.VolumeChange7d]: (_p2 = (_n = raw.dapp_data) == null ? void 0 : _n.volume_change_7d) != null ? _p2 : null,
    [DappMetric.VolumeChange30d]: (_q2 = (_o = raw.dapp_data) == null ? void 0 : _o.volume_change_30d) != null ? _q2 : null,
    [DappMetric.Balance24h]: (_r2 = (_p = raw.dapp_data) == null ? void 0 : _p.balance_24h) != null ? _r2 : null,
    [DappMetric.Balance7d]: (_s2 = (_q = raw.dapp_data) == null ? void 0 : _q.balance_7d) != null ? _s2 : null,
    [DappMetric.Balance30d]: (_t2 = (_r = raw.dapp_data) == null ? void 0 : _r.balance_30d) != null ? _t2 : null,
    [DappMetric.BalanceChange24h]: (_u2 = (_s = raw.dapp_data) == null ? void 0 : _s.balance_change_24h) != null ? _u2 : null,
    [DappMetric.BalanceChange7d]: (_v = (_t = raw.dapp_data) == null ? void 0 : _t.balance_change_7d) != null ? _v : null,
    [DappMetric.BalanceChange30d]: (_w = (_u = raw.dapp_data) == null ? void 0 : _u.balance_change_30d) != null ? _w : null
  };
  return {
    ...baseModel,
    ...formatDappRankingData(baseModel, locale, currency)
  };
}
function getDappsRequestParamsMapper(paginationData, sortData) {
  return {
    ...itemsListRequestParamsMapper(paginationData),
    sort_by: sortData.sortBy,
    sort_direction: sortData.sortDirection,
    blockchain_id: sortData.blockchainId,
    category_id: sortData.categoryId
  };
}
const dappFieldMapping = {
  title: "title",
  [DappMetric.TotalUsers24h]: "total_users_24h",
  [DappMetric.TotalUsers7d]: "total_users_7d",
  [DappMetric.TotalUsers30d]: "total_users_30d",
  [DappMetric.UserChange24h]: "users_change_24h",
  [DappMetric.UserChange7d]: "users_change_7d",
  [DappMetric.UserChange30d]: "users_change_30d",
  [DappMetric.Volume24h]: "volume_24h",
  [DappMetric.Volume7d]: "volume_7d",
  [DappMetric.Volume30d]: "volume_30d",
  [DappMetric.VolumeUSD24h]: "volume_usd_24h",
  [DappMetric.VolumeUSD7d]: "volume_usd_7d",
  [DappMetric.VolumeUSD30d]: "volume_usd_30d",
  [DappMetric.VolumeChange24h]: "volume_change_24h",
  [DappMetric.VolumeChange7d]: "volume_change_7d",
  [DappMetric.VolumeChange30d]: "volume_change_30d",
  [DappMetric.Balance24h]: "balance_24h",
  [DappMetric.Balance7d]: "balance_7d",
  [DappMetric.Balance30d]: "balance_30d",
  [DappMetric.BalanceChange24h]: "balance_change_24h",
  [DappMetric.BalanceChange7d]: "balance_change_7d",
  [DappMetric.BalanceChange30d]: "balance_change_30d",
  [DappMetric.Category]: "category_id",
  [DappMetric.Blockchain]: "blockchain_id"
  // [DappMetric.Platform]: 'platform',
};
function getDappFieldForBackend(feField) {
  return dappFieldMapping[feField];
}
function createDappModel(raw) {
  var _a2, _b2, _c2, _d2;
  var _a, _b, _c, _d;
  return {
    title: raw.title,
    icon: raw.icon,
    [DappMetric.Volume24h]: raw.volume,
    [DappMetric.TotalUsers24h]: raw.total_users_24h,
    [DappMetric.VolumeChange24h]: raw.volume_change_24h,
    [DappMetric.Balance24h]: raw.balance,
    [DappMetric.Blockchain]: raw.blockchain_name,
    [DappMetric.Category]: raw.category_name,
    [DappMetric.Platform]: raw.platform,
    website: raw.website,
    fullDescription: raw.full_description,
    socialLinks: raw.social_links,
    tags: raw.tags,
    token: {
      title: (_a2 = (_a = raw.crypto) == null ? void 0 : _a.title) != null ? _a2 : null,
      icon: (_b2 = (_b = raw.crypto) == null ? void 0 : _b.icon) != null ? _b2 : null,
      priceChange: (_c2 = (_c = raw.crypto) == null ? void 0 : _c.price_change) != null ? _c2 : null,
      volume: (_d2 = (_d = raw.crypto) == null ? void 0 : _d.volume) != null ? _d2 : null
    }
  };
}
const DappService = (fetch) => ({
  async getDappsTopVolume(locale, {
    queryKey: [{ currency }]
  }) {
    const dapps = await fetch("api/main-page/top-volume-dapps", {
      credentials: "include"
    });
    return dapps.map((item2, index) => ({
      position: index + 1,
      ...createDappRankingModelShort(item2, locale, currency)
    }));
  },
  async getDappsRanking({
    queryKey: [{ paginationData, sortData, currency }]
  }, locale) {
    const result = await fetch("api/ranking/dapps", {
      credentials: "include",
      params: getDappsRequestParamsMapper(paginationData, sortData)
    });
    return {
      total: result.total,
      data: result.data.map((item2) => {
        return createDappRankingModel(item2, locale, currency);
      })
    };
  },
  async getDapp({
    queryKey: [{ slug }]
  }) {
    const dapp = await fetch(`api/page/dapp/${slug}`, {
      credentials: "include"
    });
    return createDappModel(dapp);
  }
});
const dappKeys = {
  all: [{ scope: "dapp" }],
  lists: () => [{ ...dappKeys.all[0], entity: "list" }],
  topVolumeList: (currency) => [{ ...dappKeys.lists()[0], entity: "topVolumeList", currency }],
  rankingList: ({ paginationData, sortData, currency }) => [
    { ...dappKeys.lists()[0], entity: "rankingList", paginationData, sortData, currency }
  ],
  details: () => [{ ...dappKeys.all[0], entity: "detail" }],
  detail: (slug, currency, locale) => [{ ...dappKeys.details()[0], slug, currency, locale }]
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const route = useRoute();
    const userStore = useUserStore();
    const appStore = useAppStore();
    const queryClient = useQueryClient();
    const { $customFetch } = useNuxtApp();
    const dappRepo = DappService($customFetch);
    const isLoading = ref(false);
    const dapp = ref(null);
    async function fetchData() {
      try {
        isLoading.value = true;
        const data4 = await queryClient.fetchQuery({
          queryKey: dappKeys.detail(
            route.params.slug,
            userStore.user.currencyShortName,
            appStore.locale
          ),
          queryFn: async (queryKey) => await dappRepo.getDapp(queryKey),
          staleTime: THIRTY_MINUTES_IN_MILLISECONDS
        });
        dapp.value = data4;
      } finally {
        isLoading.value = false;
      }
    }
    [__temp, __restore] = withAsyncContext(() => fetchData()), await __temp, __restore();
    watch(
      () => userStore.user.currencyShortName,
      async () => {
        await fetchData();
      }
    );
    const dappTabs = computed(() => {
      var _a;
      const tabs = [{ id: "coin-news", label: t("news.title") }];
      if ((_a = dapp.value) == null ? void 0 : _a.fullDescription)
        tabs.push({
          id: "coin-about",
          label: t("common.about")
        });
      return tabs;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_safe_html = resolveDirective("safe-html");
      let _temp0;
      if (dapp.value) {
        _push(ssrRenderComponent(_sfc_main$7$2, mergeProps({ tabs: dappTabs.value }, _attrs), createSlots({
          stats: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (dapp.value) {
                _push2(ssrRenderComponent(_sfc_main$1$4, { dapp: dapp.value }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                dapp.value ? (openBlock(), createBlock(_sfc_main$1$4, {
                  key: 0,
                  dapp: dapp.value
                }, null, 8, ["dapp"])) : createCommentVNode("", true)
              ];
            }
          }),
          "coin-news": withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$3$3, null, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$3$3)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (isLoading.value) {
                _push2(ssrRenderComponent(_sfc_main$c$2, { class: "tw-mt-10 tw-w-1000 tw-h-1000" }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                isLoading.value ? (openBlock(), createBlock(_sfc_main$c$2, {
                  key: 0,
                  class: "tw-mt-10 tw-w-1000 tw-h-1000"
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, [
          dapp.value && dapp.value.fullDescription ? {
            name: "coin-about",
            fn: withCtx((_, _push2, _parent2, _scopeId) => {
              var _a;
              if (_push2) {
                _push2(`<h2 class="heading-h2 tw-mb-7.5"${_scopeId}>${ssrInterpolate(unref(t)("digitalAsset.about", { title: dapp.value.title }))}</h2><div${ssrRenderAttrs(_temp0 = mergeProps({ class: "text-content" }, ssrGetDirectiveProps(_ctx, _directive_safe_html, dapp.value.fullDescription)))}${_scopeId}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a = _temp0.innerHTML) != null ? _a : ""}</div>`);
              } else {
                return [
                  createVNode("h2", { class: "heading-h2 tw-mb-7.5" }, toDisplayString(unref(t)("digitalAsset.about", { title: dapp.value.title })), 1),
                  withDirectives(createVNode("div", { class: "text-content" }, null, 512), [
                    [_directive_safe_html, dapp.value.fullDescription]
                  ])
                ];
              }
            }),
            key: "0"
          } : void 0,
          dapp.value ? {
            name: "coin-screenshots",
            fn: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2)
                ;
              else {
                return [];
              }
            }),
            key: "1"
          } : void 0
        ]), _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(ranking)/dapp/[slug].vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _slug_$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));

const chunkPg__ranking_BFbtassj = /*#__PURE__*/Object.freeze({
  __proto__: null,
  D: DappMetric,
  F: FilterMatchMode,
  N: NewsService,
  O: OverlayEventBus,
  T: TimeVariations,
  _: _sfc_main$g$1,
  a: DappService,
  b: _sfc_main$6$2,
  c: _sfc_main$a$2,
  d: dappKeys,
  e: getDappFieldForBackend,
  f: formatDappRankingModelShortMetrics,
  g: getLocalizedTimeLabel,
  h: formatDappRankingData,
  i: itemsListRequestParamsMapper,
  j: _sfc_main$k,
  k: DAPP_METRICS_DEFAULT,
  l: DAPP_METRICS_OPTIONS,
  m: getDappMetricCategoryLabelKey,
  n: newsKeys,
  o: _sfc_main$l,
  p: script$3$2,
  q: script$4$1,
  r: useTypedLocale,
  s: script$6$1,
  t: formatPrice,
  u: useDeBreakpoints,
  v: formatNumber,
  w: ToastSeverities,
  x: dropdown_esm,
  y: _slug_$1,
  z: _slug_$2
});

const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (routeProps, override) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
const __nuxt_page_meta$3 = {
  layout: "default",
  middleware: ["auth"]
};
const __nuxt_page_meta$2 = {
  layout: "default"
};
const __nuxt_page_meta$1 = {
  layout: "default",
  middleware: ["auth"]
};
const __nuxt_page_meta$4 = {
  layout: "default"
};
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key]
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h$1(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_0$1 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h$1(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!((_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h$1(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h$1(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h$1(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index2 = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index2 < newRoute.matched.length - 1;
}
var script$3$1 = {
  name: "ChevronRightIcon",
  "extends": script$8$1
};
var _hoisted_1$1$1 = /* @__PURE__ */ createElementVNode("path", {
  d: "M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$1$1 = [_hoisted_1$1$1];
function render$2$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$1$1, 16);
}
script$3$1.render = render$2$1;
var classes$4 = {
  root: "p-accordion p-component",
  tab: {
    root: function root(_ref) {
      var instance = _ref.instance, index2 = _ref.index;
      return ["p-accordion-tab", {
        "p-accordion-tab-active": instance.isTabActive(index2)
      }];
    },
    header: function header(_ref2) {
      var instance = _ref2.instance, tab = _ref2.tab, index2 = _ref2.index;
      return ["p-accordion-header", {
        "p-highlight": instance.isTabActive(index2),
        "p-disabled": instance.getTabProp(tab, "disabled")
      }];
    },
    headerAction: "p-accordion-header-link p-accordion-header-action",
    headerIcon: "p-accordion-toggle-icon",
    headerTitle: "p-accordion-header-text",
    toggleableContent: "p-toggleable-content",
    content: "p-accordion-content"
  }
};
var AccordionStyle = BaseStyle.extend({
  name: "accordion",
  classes: classes$4
});
var script$1$1$1 = {
  name: "BaseAccordion",
  "extends": script$a,
  props: {
    multiple: {
      type: Boolean,
      "default": false
    },
    activeIndex: {
      type: [Number, Array],
      "default": null
    },
    lazy: {
      type: Boolean,
      "default": false
    },
    expandIcon: {
      type: String,
      "default": void 0
    },
    collapseIcon: {
      type: String,
      "default": void 0
    },
    tabindex: {
      type: Number,
      "default": 0
    },
    selectOnFocus: {
      type: Boolean,
      "default": false
    }
  },
  style: AccordionStyle,
  provide: function provide2() {
    return {
      $parentInstance: this
    };
  }
};
var script$2$1 = {
  name: "Accordion",
  "extends": script$1$1$1,
  inheritAttrs: false,
  emits: ["update:activeIndex", "tab-open", "tab-close", "tab-click"],
  data: function data() {
    return {
      id: this.$attrs.id,
      d_activeIndex: this.activeIndex
    };
  },
  watch: {
    "$attrs.id": function $attrsId(newValue) {
      this.id = newValue || UniqueComponentId();
    },
    activeIndex: function activeIndex(newValue) {
      this.d_activeIndex = newValue;
    }
  },
  mounted: function mounted() {
    this.id = this.id || UniqueComponentId();
  },
  methods: {
    isAccordionTab: function isAccordionTab(child) {
      return child.type.name === "AccordionTab";
    },
    isTabActive: function isTabActive(index2) {
      return this.multiple ? this.d_activeIndex && this.d_activeIndex.includes(index2) : this.d_activeIndex === index2;
    },
    getTabProp: function getTabProp(tab, name) {
      return tab.props ? tab.props[name] : void 0;
    },
    getKey: function getKey(tab, index2) {
      return this.getTabProp(tab, "header") || index2;
    },
    getTabHeaderActionId: function getTabHeaderActionId(index2) {
      return "".concat(this.id, "_").concat(index2, "_header_action");
    },
    getTabContentId: function getTabContentId(index2) {
      return "".concat(this.id, "_").concat(index2, "_content");
    },
    getTabPT: function getTabPT(tab, key, index2) {
      var count = this.tabs.length;
      var tabMetaData = {
        props: tab.props || {},
        parent: {
          instance: this,
          props: this.$props,
          state: this.$data
        },
        context: {
          index: index2,
          count,
          first: index2 === 0,
          last: index2 === count - 1,
          active: this.isTabActive(index2)
        }
      };
      return mergeProps(this.ptm("tab.".concat(key), {
        tab: tabMetaData
      }), this.ptm("accordiontab.".concat(key), {
        accordiontab: tabMetaData
      }), this.ptm("accordiontab.".concat(key), tabMetaData), this.ptmo(this.getTabProp(tab, "pt"), key, tabMetaData));
    },
    onTabClick: function onTabClick(event, tab, index2) {
      this.changeActiveIndex(event, tab, index2);
      this.$emit("tab-click", {
        originalEvent: event,
        index: index2
      });
    },
    onTabKeyDown: function onTabKeyDown(event, tab, index2) {
      switch (event.code) {
        case "ArrowDown":
          this.onTabArrowDownKey(event);
          break;
        case "ArrowUp":
          this.onTabArrowUpKey(event);
          break;
        case "Home":
          this.onTabHomeKey(event);
          break;
        case "End":
          this.onTabEndKey(event);
          break;
        case "Enter":
        case "NumpadEnter":
        case "Space":
          this.onTabEnterKey(event, tab, index2);
          break;
      }
    },
    onTabArrowDownKey: function onTabArrowDownKey(event) {
      var nextHeaderAction = this.findNextHeaderAction(event.target.parentElement.parentElement);
      nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction) : this.onTabHomeKey(event);
      event.preventDefault();
    },
    onTabArrowUpKey: function onTabArrowUpKey(event) {
      var prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement.parentElement);
      prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction) : this.onTabEndKey(event);
      event.preventDefault();
    },
    onTabHomeKey: function onTabHomeKey(event) {
      var firstHeaderAction = this.findFirstHeaderAction();
      this.changeFocusedTab(event, firstHeaderAction);
      event.preventDefault();
    },
    onTabEndKey: function onTabEndKey(event) {
      var lastHeaderAction = this.findLastHeaderAction();
      this.changeFocusedTab(event, lastHeaderAction);
      event.preventDefault();
    },
    onTabEnterKey: function onTabEnterKey(event, tab, index2) {
      this.changeActiveIndex(event, tab, index2);
      event.preventDefault();
    },
    findNextHeaderAction: function findNextHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var nextTabElement = selfCheck ? tabElement : tabElement.nextElementSibling;
      var headerElement = DomHandler.findSingle(nextTabElement, '[data-pc-section="header"]');
      return headerElement ? DomHandler.getAttribute(headerElement, "data-p-disabled") ? this.findNextHeaderAction(headerElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    },
    findPrevHeaderAction: function findPrevHeaderAction(tabElement) {
      var selfCheck = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var prevTabElement = selfCheck ? tabElement : tabElement.previousElementSibling;
      var headerElement = DomHandler.findSingle(prevTabElement, '[data-pc-section="header"]');
      return headerElement ? DomHandler.getAttribute(headerElement, "data-p-disabled") ? this.findPrevHeaderAction(headerElement.parentElement) : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]') : null;
    },
    findFirstHeaderAction: function findFirstHeaderAction() {
      return this.findNextHeaderAction(this.$el.firstElementChild, true);
    },
    findLastHeaderAction: function findLastHeaderAction() {
      return this.findPrevHeaderAction(this.$el.lastElementChild, true);
    },
    changeActiveIndex: function changeActiveIndex(event, tab, index2) {
      if (!this.getTabProp(tab, "disabled")) {
        var active = this.isTabActive(index2);
        var eventName = active ? "tab-close" : "tab-open";
        if (this.multiple) {
          if (active) {
            this.d_activeIndex = this.d_activeIndex.filter(function(i) {
              return i !== index2;
            });
          } else {
            if (this.d_activeIndex)
              this.d_activeIndex.push(index2);
            else
              this.d_activeIndex = [index2];
          }
        } else {
          this.d_activeIndex = this.d_activeIndex === index2 ? null : index2;
        }
        this.$emit("update:activeIndex", this.d_activeIndex);
        this.$emit(eventName, {
          originalEvent: event,
          index: index2
        });
      }
    },
    changeFocusedTab: function changeFocusedTab(event, element) {
      if (element) {
        DomHandler.focus(element);
        if (this.selectOnFocus) {
          var index2 = parseInt(element.parentElement.parentElement.dataset.pcIndex, 10);
          var tab = this.tabs[index2];
          this.changeActiveIndex(event, tab, index2);
        }
      }
    }
  },
  computed: {
    tabs: function tabs() {
      var _this = this;
      return this.$slots["default"]().reduce(function(tabs2, child) {
        if (_this.isAccordionTab(child)) {
          tabs2.push(child);
        } else if (child.children && child.children instanceof Array) {
          child.children.forEach(function(nestedChild) {
            if (_this.isAccordionTab(nestedChild)) {
              tabs2.push(nestedChild);
            }
          });
        }
        return tabs2;
      }, []);
    }
  },
  components: {
    ChevronDownIcon: script$6$1,
    ChevronRightIcon: script$3$1
  },
  directives: {
    ripple: Ripple
  }
};
function _typeof$6(o) {
  "@babel/helpers - typeof";
  return _typeof$6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$6(o);
}
function ownKeys$5(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$5(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$5(Object(t), true).forEach(function(r2) {
      _defineProperty$5(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$5(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$5(obj, key, value) {
  key = _toPropertyKey$5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$5(t) {
  var i = _toPrimitive$5(t, "string");
  return "symbol" == _typeof$6(i) ? i : String(i);
}
function _toPrimitive$5(t, r) {
  if ("object" != _typeof$6(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$6(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1$6 = ["data-pc-index", "data-p-active"];
var _hoisted_2$5 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_3$1 = ["id", "tabindex", "aria-disabled", "aria-expanded", "aria-controls", "onClick", "onKeydown"];
var _hoisted_4$1 = ["id", "aria-labelledby"];
function render$1$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.tabs, function(tab, i) {
    return openBlock(), createElementBlock("div", mergeProps({
      key: $options.getKey(tab, i),
      "class": _ctx.cx("tab.root", {
        tab,
        index: i
      })
    }, $options.getTabPT(tab, "root", i), {
      "data-pc-name": "accordiontab",
      "data-pc-index": i,
      "data-p-active": $options.isTabActive(i)
    }), [createElementVNode("div", mergeProps({
      style: $options.getTabProp(tab, "headerStyle"),
      "class": [_ctx.cx("tab.header", {
        tab,
        index: i
      }), $options.getTabProp(tab, "headerClass")]
    }, _objectSpread$5(_objectSpread$5({}, $options.getTabProp(tab, "headerProps")), $options.getTabPT(tab, "header", i)), {
      "data-p-highlight": $options.isTabActive(i),
      "data-p-disabled": $options.getTabProp(tab, "disabled")
    }), [createElementVNode("a", mergeProps({
      id: $options.getTabHeaderActionId(i),
      "class": _ctx.cx("tab.headerAction"),
      tabindex: $options.getTabProp(tab, "disabled") ? -1 : _ctx.tabindex,
      role: "button",
      "aria-disabled": $options.getTabProp(tab, "disabled"),
      "aria-expanded": $options.isTabActive(i),
      "aria-controls": $options.getTabContentId(i),
      onClick: function onClick($event) {
        return $options.onTabClick($event, tab, i);
      },
      onKeydown: function onKeydown($event) {
        return $options.onTabKeyDown($event, tab, i);
      }
    }, _objectSpread$5(_objectSpread$5({}, $options.getTabProp(tab, "headeractionprops")), $options.getTabPT(tab, "headeraction", i))), [tab.children && tab.children.headericon ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.headericon), {
      key: 0,
      isTabActive: $options.isTabActive(i),
      active: $options.isTabActive(i),
      index: i
    }, null, 8, ["isTabActive", "active", "index"])) : $options.isTabActive(i) ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.collapseicon ? _ctx.$slots.collapseicon : _ctx.collapseIcon ? "span" : "ChevronDownIcon"), mergeProps({
      key: 1,
      "class": [_ctx.cx("tab.headerIcon"), _ctx.collapseIcon],
      "aria-hidden": "true"
    }, $options.getTabPT(tab, "headericon", i)), null, 16, ["class"])) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.expandicon ? _ctx.$slots.expandicon : _ctx.expandIcon ? "span" : "ChevronRightIcon"), mergeProps({
      key: 2,
      "class": [_ctx.cx("tab.headerIcon"), _ctx.expandIcon],
      "aria-hidden": "true"
    }, $options.getTabPT(tab, "headericon", i)), null, 16, ["class"])), tab.props && tab.props.header ? (openBlock(), createElementBlock("span", mergeProps({
      key: 3,
      "class": _ctx.cx("tab.headerTitle")
    }, $options.getTabPT(tab, "headertitle", i)), toDisplayString(tab.props.header), 17)) : createCommentVNode("", true), tab.children && tab.children.header ? (openBlock(), createBlock(resolveDynamicComponent(tab.children.header), {
      key: 4
    })) : createCommentVNode("", true)], 16, _hoisted_3$1)], 16, _hoisted_2$5), createVNode(Transition, mergeProps({
      name: "p-toggleable-content"
    }, $options.getTabPT(tab, "transition", i)), {
      "default": withCtx(function() {
        return [(_ctx.lazy ? $options.isTabActive(i) : true) ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
          key: 0,
          id: $options.getTabContentId(i),
          style: $options.getTabProp(tab, "contentStyle"),
          "class": [_ctx.cx("tab.toggleableContent"), $options.getTabProp(tab, "contentClass")],
          role: "region",
          "aria-labelledby": $options.getTabHeaderActionId(i)
        }, _objectSpread$5(_objectSpread$5({}, $options.getTabProp(tab, "contentProps")), $options.getTabPT(tab, "toggleablecontent", i))), [createElementVNode("div", mergeProps({
          "class": _ctx.cx("tab.content")
        }, $options.getTabPT(tab, "content", i)), [(openBlock(), createBlock(resolveDynamicComponent(tab)))], 16)], 16, _hoisted_4$1)), [[vShow, _ctx.lazy ? true : $options.isTabActive(i)]]) : createCommentVNode("", true)];
      }),
      _: 2
    }, 1040)], 16, _hoisted_1$6);
  }), 128))], 16);
}
script$2$1.render = render$1$1;
const accordion_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$2$1
}, Symbol.toStringTag, { value: "Module" }));
var AccordionTabStyle = {};
var script$1$3 = {
  name: "BaseAccordionTab",
  "extends": script$a,
  props: {
    header: null,
    headerStyle: null,
    headerClass: null,
    headerProps: null,
    headerActionProps: null,
    contentStyle: null,
    contentClass: null,
    contentProps: null,
    disabled: Boolean
  },
  style: AccordionTabStyle,
  provide: function provide3() {
    return {
      $parentInstance: this
    };
  }
};
var script$7 = {
  name: "AccordionTab",
  "extends": script$1$3,
  inheritAttrs: false
};
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
script$7.render = render$6;
const accordiontab_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "DeAccordion",
  __ssrInlineRender: true,
  props: {
    tabs: {},
    activeIndex: {},
    headerClass: {},
    headerActionClass: {},
    headerIconClass: {},
    headerIconPosition: { default: "start" },
    contentClass: { type: Function, default: (_item) => "" }
  },
  setup(__props) {
    const props = __props;
    const headerClasses = computed(() => {
      const classes2 = [];
      if (props.headerClass) {
        classes2.push(props.headerClass);
      }
      return classes2;
    });
    const headerActionClasses = computed(() => {
      const classes2 = [props.headerActionClass];
      if (props.headerIconPosition === "end") {
        classes2.push("tw-flex-row-reverse");
      }
      if (props.headerIconPosition === "space-between") {
        classes2.push("tw-w-full tw-flex-row-reverse");
      }
      return classes2;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_accordion = script$2$1;
      const _component_prime_accordion_tab = script$7;
      _push(ssrRenderComponent(_component_prime_accordion, mergeProps({
        "active-index": _ctx.activeIndex,
        pt: {
          root: { class: ["de-accordion"] },
          accordiontab: {
            header: { class: ["de-accordion-tab-header heading-h3", headerClasses.value] },
            headerAction: { class: ["de-accordion-tab-header-action", headerActionClasses.value] },
            content: { class: ["de-accordion-tab-content body-b2"] },
            transition: {
              enterFromClass: "de-toggleable-content-enter-from",
              enterActiveClass: "de-toggleable-content-enter-active",
              enterToClass: "de-toggleable-content-enter-to",
              leaveFromClass: "de-toggleable-content-leave-from",
              leaveActiveClass: "de-toggleable-content-leave-active",
              leaveToClass: "de-toggleable-content-leave-to"
            }
          }
        }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.tabs, (tab) => {
              _push2(ssrRenderComponent(_component_prime_accordion_tab, {
                key: tab.title
              }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, `header-${tab.id}`, {}, () => {
                      ssrRenderSlot(_ctx.$slots, "header", { item: tab }, () => {
                        _push3(`${ssrInterpolate(tab.title)}`);
                      }, _push3, _parent3, _scopeId2);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, `header-${tab.id}`, {}, () => [
                        renderSlot(_ctx.$slots, "header", { item: tab }, () => [
                          createTextVNode(toDisplayString(tab.title), 1)
                        ])
                      ])
                    ];
                  }
                }),
                headericon: withCtx((scope, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "headericon", {}, () => {
                      _push3(ssrRenderComponent(_sfc_main$m$1, {
                        name: "chevron-down",
                        class: ["de-accordion-tab-header-icon", [{ "tw-transform tw-rotate-180": scope.active }, _ctx.headerIconClass]]
                      }, null, _parent3, _scopeId2));
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "headericon", {}, () => [
                        createVNode(_sfc_main$m$1, {
                          name: "chevron-down",
                          class: ["de-accordion-tab-header-icon", [{ "tw-transform tw-rotate-180": scope.active }, _ctx.headerIconClass]]
                        }, null, 8, ["class"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, `content-${tab.id}`, { item: tab }, () => {
                      ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                        var _a;
                        _push3(`<p class="${ssrRenderClass(_ctx.contentClass(tab))}"${_scopeId2}>${(_a = tab.content) != null ? _a : ""}</p>`);
                      }, _push3, _parent3, _scopeId2);
                    }, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, `content-${tab.id}`, { item: tab }, () => [
                        renderSlot(_ctx.$slots, "content", {}, () => [
                          createVNode("p", {
                            class: _ctx.contentClass(tab),
                            innerHTML: tab.content
                          }, null, 10, ["innerHTML"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.tabs, (tab) => {
                return openBlock(), createBlock(_component_prime_accordion_tab, {
                  key: tab.title
                }, {
                  header: withCtx(() => [
                    renderSlot(_ctx.$slots, `header-${tab.id}`, {}, () => [
                      renderSlot(_ctx.$slots, "header", { item: tab }, () => [
                        createTextVNode(toDisplayString(tab.title), 1)
                      ])
                    ])
                  ]),
                  headericon: withCtx((scope) => [
                    renderSlot(_ctx.$slots, "headericon", {}, () => [
                      createVNode(_sfc_main$m$1, {
                        name: "chevron-down",
                        class: ["de-accordion-tab-header-icon", [{ "tw-transform tw-rotate-180": scope.active }, _ctx.headerIconClass]]
                      }, null, 8, ["class"])
                    ])
                  ]),
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, `content-${tab.id}`, { item: tab }, () => [
                      renderSlot(_ctx.$slots, "content", {}, () => [
                        createVNode("p", {
                          class: _ctx.contentClass(tab),
                          innerHTML: tab.content
                        }, null, 10, ["innerHTML"])
                      ])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/accordion/DeAccordion.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "AppUserMenuListItem",
  __ssrInlineRender: true,
  props: {
    item: {},
    menuItemClass: {},
    headerIconClass: {},
    isActive: { type: Boolean }
  },
  emits: ["navigate"],
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const route = useRoute();
    const activeIndex2 = computed(() => {
      if (route.fullPath.includes(props.item.to))
        return 0;
      return null;
    });
    const headerIconClasses = computed(() => {
      const classes2 = ["!tw-w-450 !tw-h-450 tw-mr-5"];
      if (props.headerIconClass)
        classes2.push(props.headerIconClass);
      return classes2;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0$2;
      if (_ctx.item.items) {
        _push(ssrRenderComponent(_sfc_main$h, mergeProps({
          tabs: [
            {
              id: _ctx.item.label,
              title: unref(t)(_ctx.item.label)
            }
          ],
          "header-icon-position": "space-between",
          "header-action-class": "hover:tw-bg-primary-700 tw-cursor-pointer",
          "header-class": "!tw-py-0",
          "header-icon-class": headerIconClasses.value,
          "active-index": activeIndex2.value
        }, _attrs), {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="tw-flex tw-items-center tw-justify-between tw-w-full"${_scopeId}><div class="${ssrRenderClass([_ctx.menuItemClass, "tw-flex tw-items-center tw-w-full tw-text-left"])}"${_scopeId}>`);
              if (_ctx.item.icon) {
                _push2(ssrRenderComponent(_sfc_main$m$1, {
                  name: _ctx.item.icon,
                  class: "tw-text-primary-400 tw-mr-2"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="heading-h4 xl:heading-h5"${_scopeId}>${ssrInterpolate(unref(t)(_ctx.item.label))}</span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "tw-flex tw-items-center tw-justify-between tw-w-full" }, [
                  createVNode("div", {
                    class: ["tw-flex tw-items-center tw-w-full tw-text-left", _ctx.menuItemClass]
                  }, [
                    _ctx.item.icon ? (openBlock(), createBlock(_sfc_main$m$1, {
                      key: 0,
                      name: _ctx.item.icon,
                      class: "tw-text-primary-400 tw-mr-2"
                    }, null, 8, ["name"])) : createCommentVNode("", true),
                    createVNode("span", { class: "heading-h4 xl:heading-h5" }, toDisplayString(unref(t)(_ctx.item.label)), 1)
                  ], 2)
                ])
              ];
            }
          }),
          content: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="tw-flex tw-flex-col tw-gap-1.5 tw--mt-1"${_scopeId}><!--[-->`);
              ssrRenderList(_ctx.item.items, (child) => {
                _push2(ssrRenderComponent(_component_nuxt_link_locale, {
                  key: child.label,
                  to: child.to,
                  "active-class": "tw-bg-primary-700",
                  class: "heading-h6 tw-py-2 tw-pl-8 hover:tw-bg-primary-700 tw-cursor-pointer",
                  onClick: ($event) => _ctx.$emit("navigate")
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(t)(child.label, 2))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(t)(child.label, 2)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "tw-flex tw-flex-col tw-gap-1.5 tw--mt-1" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.item.items, (child) => {
                    return openBlock(), createBlock(_component_nuxt_link_locale, {
                      key: child.label,
                      to: child.to,
                      "active-class": "tw-bg-primary-700",
                      class: "heading-h6 tw-py-2 tw-pl-8 hover:tw-bg-primary-700 tw-cursor-pointer",
                      onClick: ($event) => _ctx.$emit("navigate")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)(child.label, 2)), 1)
                      ]),
                      _: 2
                    }, 1032, ["to", "onClick"]);
                  }), 128))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_nuxt_link_locale, mergeProps({
          to: _ctx.item.to,
          class: ["tw-flex tw-items-center tw-w-full hover:tw-bg-primary-700 tw-cursor-pointer tw-text-left", [
            {
              "tw-bg-primary-700": _ctx.isActive
            },
            _ctx.menuItemClass
          ]],
          onClick: ($event) => _ctx.$emit("navigate")
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (_ctx.item.icon) {
                _push2(ssrRenderComponent(_sfc_main$m$1, {
                  name: _ctx.item.icon,
                  class: "tw-text-primary-400 tw-mr-2"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<span class="heading-h4 xl:heading-h5"${_scopeId}>${ssrInterpolate(unref(t)(_ctx.item.label))}</span>`);
            } else {
              return [
                _ctx.item.icon ? (openBlock(), createBlock(_sfc_main$m$1, {
                  key: 0,
                  name: _ctx.item.icon,
                  class: "tw-text-primary-400 tw-mr-2"
                }, null, 8, ["name"])) : createCommentVNode("", true),
                createVNode("span", { class: "heading-h4 xl:heading-h5" }, toDisplayString(unref(t)(_ctx.item.label)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/menu/AppUserMenuListItem.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const USER_SETTINGS_MENU = [
  {
    label: "menu.user.profileSettings",
    to: "/settings",
    icon: "settings"
  },
  {
    label: "menu.user.accountSecurity",
    to: "/settings/account-security",
    icon: "shield-check"
  }
  // {
  //   label: 'menu.user.notifications',
  //   to: '/settings/notifications',
  //   icon: 'bell',
  // },
  // {
  //   label: 'menu.user.contribute',
  //   icon: 'menu-square',
  //   to: '/dashboard',
  //   items: [
  //     {
  //       label: 'coins.dappsAbbr',
  //       to: '/dashboard/my-dapps',
  //     },
  //     {
  //       label: 'articles.title',
  //       to: '/dashboard/my-articles',
  //     },
  //     {
  //       label: 'news.title',
  //       to: '/dashboard/my-news',
  //     },
  //   ],
  // },
];
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "UserSettingsMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const localePath = useLocalePath();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col tw-gap-1.5 max-lg:tw-hidden tw-sticky tw-top-7.5 tw-self-start tw-min-w-[270px]" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(USER_SETTINGS_MENU), (item) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_sfc_main$g, {
          item,
          "is-active": unref(route).fullPath === unref(localePath)(item.to),
          "menu-item-class": "tw-p-5",
          "header-icon-class": "!tw-w-5 !tw-h-5"
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></nav>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/settings/UserSettingsMenu.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_page = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-container tw-pt-7.5 tw-h-full" }, _attrs))}><div class="tw-flex tw-gap-7.5 tw-justify-center tw-h-full">`);
      _push(ssrRenderComponent(_sfc_main$f, null, null, _parent));
      _push(`<div class="tw-flex-grow lg:tw-max-w-[calc(100%-270px-30px)] tw-h-full">`);
      _push(ssrRenderComponent(_component_nuxt_page, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/dashboard.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const dashboard = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$e
}, Symbol.toStringTag, { value: "Module" }));
const useDevice = () => useNuxtApp().$device;
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "MainPageBanner",
  __ssrInlineRender: true,
  props: {
    title: {},
    image: {},
    slug: {},
    author: {},
    imageClass: {},
    lazyLoading: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const bannerLinkAriaLabel = computed(
      () => `${t("common.buttons.readMore")} ${t("common.about")} ${props.title}`
    );
    const bannerImageSrc = computed(() => {
      const imageSrc = props.image || "";
      return {
        x1_270: getResponsiveImageUrl(imageSrc, 270, 270),
        x2_270: getResponsiveImageUrl(imageSrc, 270, 270, 2),
        x1_500: getResponsiveImageUrl(imageSrc, 500, 500),
        x2_500: getResponsiveImageUrl(imageSrc, 500, 500, 2),
        default: getResponsiveImageUrl(imageSrc, 270, 270, 1.5)
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-relative" }, _attrs))}><div class="tw-absolute tw-z-10 tw-left-0 tw-top-0 tw-w-full tw-p-4 tw-bg-l-black-grad-1 tw-pointer-events-none tw-flex tw-items-center">`);
      _push(ssrRenderComponent(_sfc_main$k$1, {
        src: _ctx.author.image,
        class: "tw-mr-1.5",
        loading: "lazy"
      }, null, _parent));
      if (_ctx.author.name) {
        _push(`<p class="tw-font-semibold tw-text-300 tw-leading-400">${ssrInterpolate(_ctx.author.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.image) {
        _push(ssrRenderComponent(_component_nuxt_link_locale, {
          to: `/news/${_ctx.slug}`,
          "aria-label": bannerLinkAriaLabel.value,
          class: "tw-inline-block tw-w-full tw-h-full tw-overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<picture${_scopeId}><source media="(min-width: 576px)"${ssrRenderAttr("srcset", `${bannerImageSrc.value.x2_270} 2x, ${bannerImageSrc.value.x1_270} 1x`)}${_scopeId}><source media="(min-width: 480px)"${ssrRenderAttr("srcset", `${bannerImageSrc.value.x2_500} 2x, ${bannerImageSrc.value.x1_500} 1x`)}${_scopeId}><img${ssrRenderAttr("src", bannerImageSrc.value.default)}${ssrRenderAttr("srcset", `${bannerImageSrc.value.x2_500} 2x, ${bannerImageSrc.value.x1_500} 1x`)}${ssrRenderAttr("alt", _ctx.title)}${ssrRenderAttr("loading", _ctx.lazyLoading ? "lazy" : "eager")}${ssrRenderAttr("fetchpriority", _ctx.lazyLoading ? "low" : "high")}${ssrRenderAttr("height", 270)} class="${ssrRenderClass([_ctx.imageClass, "tw-h-full tw-w-full tw-object-cover hover:tw-scale-110 tw-transition"])}"${_scopeId}></picture>`);
            } else {
              return [
                createVNode("picture", null, [
                  createVNode("source", {
                    media: "(min-width: 576px)",
                    srcset: `${bannerImageSrc.value.x2_270} 2x, ${bannerImageSrc.value.x1_270} 1x`
                  }, null, 8, ["srcset"]),
                  createVNode("source", {
                    media: "(min-width: 480px)",
                    srcset: `${bannerImageSrc.value.x2_500} 2x, ${bannerImageSrc.value.x1_500} 1x`
                  }, null, 8, ["srcset"]),
                  createVNode("img", {
                    src: bannerImageSrc.value.default,
                    srcset: `${bannerImageSrc.value.x2_500} 2x, ${bannerImageSrc.value.x1_500} 1x`,
                    alt: _ctx.title,
                    loading: _ctx.lazyLoading ? "lazy" : "eager",
                    fetchpriority: _ctx.lazyLoading ? "low" : "high",
                    height: 270,
                    class: ["tw-h-full tw-w-full tw-object-cover hover:tw-scale-110 tw-transition", _ctx.imageClass]
                  }, null, 10, ["src", "srcset", "alt", "loading", "fetchpriority"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-absolute tw-z-10 tw-left-0 tw-bottom-0 tw-w-full tw-p-4 tw-bg-l-black-grad-2 tw-pointer-events-none"><p class="heading-h4 tw-line-clamp-5">${ssrInterpolate(_ctx.title)}</p></div></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/main-page/components/banners/MainPageBanner.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DeHorizontalCarousel",
  __ssrInlineRender: true,
  props: {
    items: {},
    paginatorClass: {}
  },
  setup(__props) {
    const horizontal = ref(null);
    const hasPrev = ref(false);
    const hasNext = ref(false);
    const scrollWidth = ref(0);
    const left = ref(0);
    const progress = ref(0);
    const index2 = ref(0);
    function onScrollDebounce({
      hasNext: newHasNext,
      hasPrev: newHasPrev,
      scrollWidth: newScrollWidth,
      width,
      left: newLeft
    }) {
      hasPrev.value = newHasPrev;
      hasNext.value = newHasNext;
      scrollWidth.value = newScrollWidth;
      left.value = newLeft;
      progress.value = newLeft / newScrollWidth;
      index2.value = Math.round(newLeft / width);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-relative" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(i), {
        ref_key: "horizontal",
        ref: horizontal,
        button: false,
        responsive: "",
        onScrollDebounce
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      if (_ctx.items.length > 1) {
        _push(`<div class="${ssrRenderClass([_ctx.paginatorClass, "tw-absolute tw-top-full tw-left-0 tw-right-0 tw-flex tw-justify-center tw-mt-2.5"])}"><!--[-->`);
        ssrRenderList(_ctx.items, (item, i) => {
          _push(`<div class="tw-p-1 tw-cursor-pointer"><div class="${ssrRenderClass([i === index2.value ? "tw-bg-primary-200" : "tw-bg-primary-500", "tw-rounded-full tw-w-150 tw-h-150"])}"></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/carousel/DeHorizontalCarousel.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b$1 = /* @__PURE__ */ defineComponent({
  __name: "DeSkeleton",
  __ssrInlineRender: true,
  props: {
    sizeClasses: { default: "tw-w-full tw-h-4" },
    borderRadius: {}
  },
  setup(__props) {
    const props = __props;
    const containerStyle = computed(() => {
      return { borderRadius: props.borderRadius };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["tw-overflow-hidden tw-animate-pulse tw-bg-primary-600 tw-rounded", _ctx.sizeClasses],
        style: containerStyle.value
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$b$1 = _sfc_main$b$1.setup;
_sfc_main$b$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/DeSkeleton.vue");
  return _sfc_setup$b$1 ? _sfc_setup$b$1(props, ctx) : void 0;
};
function createBannerModel(raw) {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    image: raw.image,
    author: {
      image: raw.author_image,
      name: raw.author_name
    }
  };
}
const MainPageService = (fetch) => ({
  async getBanners() {
    const banners = await fetch("api/main-page/slider-news", {
      credentials: "include"
    });
    return banners.map(createBannerModel);
  }
});
const mainPageKeys = {
  all: [{ scope: "mainPage" }],
  banners: (locale) => [{ ...mainPageKeys.all[0], entity: "banners", locale }],
  articles: () => [{ ...mainPageKeys.all[0], entity: "articles" }]
};
const _sfc_main$a$1 = /* @__PURE__ */ defineComponent({
  __name: "MainPageBanners",
  __ssrInlineRender: true,
  setup(__props) {
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const mainPageRepo = MainPageService($customFetch);
    const {
      data: banners,
      suspense,
      isLoading
    } = useQuery({
      queryKey: computed(() => mainPageKeys.banners(appStore.locale)),
      queryFn: () => mainPageRepo.getBanners(),
      staleTime: TWENTY_FOUR_HOURS_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      var _a, _b;
      await suspense();
      const firstBannerImage = (_b = (_a = banners.value) == null ? void 0 : _a[0]) == null ? void 0 : _b.image;
      if (!firstBannerImage)
        return;
      useHead({
        link: [
          {
            rel: "preload",
            href: firstBannerImage,
            as: "image"
          }
        ]
      });
    });
    const { isMobileOrTablet } = useDevice();
    const getShouldBannerLoadLazily = (idx) => {
      if (idx === 0)
        return false;
      return isMobileOrTablet;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "tw-container" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$c, {
        items: unref(banners) || [],
        "paginator-class": "xs:tw-hidden"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            if (unref(isLoading)) {
              _push2(`<!--[-->`);
              ssrRenderList(4, (i) => {
                _push2(ssrRenderComponent(_sfc_main$b$1, {
                  key: i,
                  "size-classes": "tw-w-full tw-h-[270px]",
                  class: "tw-flex-shrink-0 tw-mr-2.5 lg:tw-w-[calc((100%-40px)/4)]"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else if ((_a = unref(banners)) == null ? void 0 : _a.length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(banners), (item, idx) => {
                _push2(ssrRenderComponent(_sfc_main$d, {
                  key: item.id,
                  "lazy-loading": getShouldBannerLoadLazily(idx),
                  class: ["tw-w-full xs:tw-w-auto tw-h-[270px] tw-flex-shrink-0 tw-mr-2.5", {
                    "lg:tw-w-[calc((100%-20px)/2)]": unref(banners).length === 2,
                    "lg:tw-w-[calc((100%-30px)/3)]": unref(banners).length === 3,
                    "lg:tw-w-[calc((100%-40px)/4)]": unref(banners).length === 4
                  }],
                  title: item.title,
                  image: item.image,
                  slug: item.slug,
                  author: item.author
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(isLoading) ? (openBlock(), createBlock(Fragment, { key: 0 }, renderList(4, (i) => {
                return createVNode(_sfc_main$b$1, {
                  key: i,
                  "size-classes": "tw-w-full tw-h-[270px]",
                  class: "tw-flex-shrink-0 tw-mr-2.5 lg:tw-w-[calc((100%-40px)/4)]"
                });
              }), 64)) : ((_b = unref(banners)) == null ? void 0 : _b.length) ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(banners), (item, idx) => {
                return openBlock(), createBlock(_sfc_main$d, {
                  key: item.id,
                  "lazy-loading": getShouldBannerLoadLazily(idx),
                  class: ["tw-w-full xs:tw-w-auto tw-h-[270px] tw-flex-shrink-0 tw-mr-2.5", {
                    "lg:tw-w-[calc((100%-20px)/2)]": unref(banners).length === 2,
                    "lg:tw-w-[calc((100%-30px)/3)]": unref(banners).length === 3,
                    "lg:tw-w-[calc((100%-40px)/4)]": unref(banners).length === 4
                  }],
                  title: item.title,
                  image: item.image,
                  slug: item.slug,
                  author: item.author
                }, null, 8, ["lazy-loading", "class", "title", "image", "slug", "author"]);
              }), 128)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$a$1 = _sfc_main$a$1.setup;
_sfc_main$a$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/main-page/components/banners/MainPageBanners.vue");
  return _sfc_setup$a$1 ? _sfc_setup$a$1(props, ctx) : void 0;
};
var RankingCategory = /* @__PURE__ */ ((RankingCategory2) => {
  RankingCategory2["Dapps"] = "dapps";
  return RankingCategory2;
})(RankingCategory || {});
const categoryLabelKeys = {
  [
    "dapps"
    /* Dapps */
  ]: "coins.dapp"
  // [RankingCategory.Cryptocurrency]: 'coins.cryptocurrency',
  // [RankingCategory.Dex]: 'coins.dex',
  // [RankingCategory.Cex]: 'coins.cex',
  // [RankingCategory.Nft]: 'NFT',
};
const getCategoryLabelKey = (category) => {
  return categoryLabelKeys[category];
};
const RANKING_CATEGORIES = Object.values(RankingCategory).map(
  (category) => ({
    id: category,
    labelKey: getCategoryLabelKey(category)
  })
);
const MAX_RANKING_METRICS_NUMBER = 12;
var DataTableSizeOptions = /* @__PURE__ */ ((DataTableSizeOptions2) => {
  DataTableSizeOptions2["normal"] = "normal";
  DataTableSizeOptions2["small"] = "sm";
  return DataTableSizeOptions2;
})(DataTableSizeOptions || {});
const _sfc_main$9$1 = /* @__PURE__ */ defineComponent({
  __name: "DeTable",
  __ssrInlineRender: true,
  props: {
    table: {},
    type: { default: DataTableSizeOptions.normal },
    loading: { type: Boolean },
    theadClass: {},
    rowHover: { type: Boolean }
  },
  emits: ["sort", "rowClick"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { t } = useI18n();
    function getSlotName(colField, slotType) {
      const normalizedField = colField.replace(/\./g, "_");
      return `${slotType}_${normalizedField}`;
    }
    function getCommonPinningStyles(column) {
      const isPinned = column.getIsPinned();
      return {
        left: isPinned === "left" ? `${column.getStart("left")}px` : void 0,
        width: `${column.getSize()}px`,
        minWidth: `${column.columnDef.minSize}px`,
        maxWidth: `${column.columnDef.maxSize}px`
      };
    }
    const maxPagesToShow = ref(4);
    const totalPages = computed(() => props.table.getPageCount());
    const pageSize = computed(() => props.table.getState().pagination.pageSize);
    const pageIndex = computed(() => props.table.getState().pagination.pageIndex);
    const currentPage = computed(() => pageIndex.value + 1);
    const pages = computed(() => {
      const range = maxPagesToShow.value - 2;
      let start = Math.max(2, currentPage.value - Math.floor(range / 2));
      const end = Math.min(totalPages.value - 1, start + range);
      if (end - start < range) {
        start = Math.max(2, end - range);
      }
      const pageRange = [];
      if (totalPages.value > 1) {
        for (let i = start; i <= end; i++) {
          pageRange.push(i);
        }
      }
      return pageRange;
    });
    const showStartDots = computed(() => pages.value[0] > 2);
    const showEndDots = computed(() => pages.value[pages.value.length - 1] < totalPages.value - 1);
    const route = useRoute();
    function generatePaginationLink(newPage) {
      const query = { ...route.query };
      query.page = String(newPage);
      return { path: route.path, query };
    }
    const isShadowVisible = ref(false);
    const isScrolledRight = ref(false);
    const tableWrapper = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0$2;
      _push(`<!--[--><div${ssrRenderAttrs(mergeProps({
        ref_key: "tableWrapper",
        ref: tableWrapper,
        class: ["de-datatable tw-overflow-auto", {
          "de-datatable-ping-left": isShadowVisible.value,
          "de-datatable-scrolled-right": isScrolledRight.value,
          "de-datatable-hoverable-rows": _ctx.rowHover
        }]
      }, _ctx.$attrs))}><table class="${ssrRenderClass([`de-datatable-${_ctx.type}`, "de-datatable-table"])}"><thead class="${ssrRenderClass([_ctx.theadClass, "de-datatable-thead"])}"><!--[-->`);
      ssrRenderList(_ctx.table.getHeaderGroups(), (headerGroup) => {
        _push(`<tr><!--[-->`);
        ssrRenderList(headerGroup.headers, (header2) => {
          var _a;
          _push(`<th${ssrRenderAttr("colSpan", header2.colSpan)} class="${ssrRenderClass([
            (_a = header2.column.columnDef.meta) == null ? void 0 : _a.thClass,
            header2.column.getCanSort() ? "tw-cursor-pointer tw-select-none" : "",
            { "de-datatable-frozen-cell max-md:!tw-left-0": header2.column.getIsPinned() }
          ])}" style="${ssrRenderStyle(getCommonPinningStyles(header2.column))}">`);
          ssrRenderSlot(_ctx.$slots, getSlotName(header2.column.id, "header"), {}, () => {
            _push(`<div class="tw-whitespace-nowrap">`);
            if (!header2.isPlaceholder) {
              _push(ssrRenderComponent(unref(FlexRender), {
                render: header2.column.columnDef.header,
                props: header2.getContext()
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            if (header2.column.getIsSorted()) {
              _push(ssrRenderComponent(_sfc_main$m$1, {
                name: "chevron-down-filled",
                class: ["tw-w-300 tw-h-300", [{ "tw-transform tw-rotate-180": header2.column.getIsSorted() === "asc" }]]
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div>`);
          }, _push, _parent);
          _push(`</th>`);
        });
        _push(`<!--]--></tr>`);
      });
      _push(`<!--]--></thead><tbody class="de-datatable-tbody">`);
      if (_ctx.loading) {
        _push(`<!--[-->`);
        ssrRenderList(pageSize.value, (i) => {
          _push(`<tr><!--[-->`);
          ssrRenderList(_ctx.table.getFlatHeaders(), (header2) => {
            var _a;
            _push(`<td style="${ssrRenderStyle(getCommonPinningStyles(header2.column))}" class="${ssrRenderClass((_a = header2.column.columnDef.meta) == null ? void 0 : _a.thClass)}">`);
            _push(ssrRenderComponent(_sfc_main$b$1, null, null, _parent));
            _push(`</td>`);
          });
          _push(`<!--]--></tr>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(_ctx.table.getRowModel().rows, (row) => {
          _push(`<tr><!--[-->`);
          ssrRenderList(row.getVisibleCells(), (cell) => {
            var _a;
            _push(`<td style="${ssrRenderStyle(getCommonPinningStyles(cell.column))}" class="${ssrRenderClass([
              (_a = cell.column.columnDef.meta) == null ? void 0 : _a.tdClass,
              { "de-datatable-frozen-cell max-md:!tw-left-0": cell.column.getIsPinned() }
            ])}">`);
            ssrRenderSlot(_ctx.$slots, getSlotName(cell.column.id, "body"), mergeProps({ ref_for: true }, { data: cell.row.original }), () => {
              _push(ssrRenderComponent(unref(FlexRender), {
                render: cell.column.columnDef.cell,
                props: cell.getContext()
              }, null, _parent));
            }, _push, _parent);
            _push(`</td>`);
          });
          _push(`<!--]--></tr>`);
        });
        _push(`<!--]-->`);
      }
      if (totalPages.value < 1 && !_ctx.loading) {
        _push(`<tr><td${ssrRenderAttr("colspan", _ctx.table.getFlatHeaders().length)}>`);
        ssrRenderSlot(_ctx.$slots, "empty", {}, null, _push, _parent);
        _push(`</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div>`);
      if (totalPages.value > 1) {
        _push(`<nav class="de-paginator"><div class="tw-text-300 tw-leading-400 tw-text-primary-300 max-lg:tw-hidden">${ssrInterpolate(unref(t)("common.currentPageReportTemplate", {
          first: pageIndex.value * pageSize.value + 1,
          last: pageSize.value * currentPage.value,
          total: totalPages.value * pageSize.value
        }))}</div><div class="tw-flex tw-gap-x-4">`);
        _push(ssrRenderComponent(_component_nuxt_link_locale, {
          to: generatePaginationLink(currentPage.value - 1),
          class: ["de-paginator-page de-paginator-prev", { "is-disabled": !_ctx.table.getCanPreviousPage() }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: "chevron-down-filled",
                class: "tw-rotate-90"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$m$1, {
                  name: "chevron-down-filled",
                  class: "tw-rotate-90"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="tw-flex tw-gap-x-1">`);
        if (currentPage.value) {
          _push(ssrRenderComponent(_component_nuxt_link_locale, {
            to: generatePaginationLink(1),
            class: ["de-paginator-page", { "is-active tw-pointer-events-none": currentPage.value === 1 }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 1 `);
              } else {
                return [
                  createTextVNode(" 1 ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (showStartDots.value) {
          _push(`<div class="de-paginator-dots"><span>...</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(pages.value, (page) => {
          _push(ssrRenderComponent(_component_nuxt_link_locale, {
            key: page,
            to: generatePaginationLink(page),
            class: ["de-paginator-page", { "is-active tw-pointer-events-none": currentPage.value === page }]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(page)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(page), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (showEndDots.value) {
          _push(`<div class="de-paginator-dots"><span>...</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_nuxt_link_locale, {
          to: generatePaginationLink(totalPages.value),
          class: ["de-paginator-page", { "is-active tw-pointer-events-none": currentPage.value === totalPages.value }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(totalPages.value)}`);
            } else {
              return [
                createTextVNode(toDisplayString(totalPages.value), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_nuxt_link_locale, {
          to: generatePaginationLink(currentPage.value + 1),
          class: ["de-paginator-page de-paginator-next", { "is-disabled": !_ctx.table.getCanNextPage() }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_sfc_main$m$1, {
                name: "chevron-down-filled",
                class: "tw--rotate-90"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_sfc_main$m$1, {
                  name: "chevron-down-filled",
                  class: "tw--rotate-90"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$9$1 = _sfc_main$9$1.setup;
_sfc_main$9$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/table/DeTable.vue");
  return _sfc_setup$9$1 ? _sfc_setup$9$1(props, ctx) : void 0;
};
function sortArray(arr, key, isDesc = false, sortType) {
  return arr.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];
    if (isNullish(valueA) && isNullish(valueB))
      return 0;
    if (isNullish(valueA))
      return isDesc ? 1 : -1;
    if (isNullish(valueB))
      return isDesc ? -1 : 1;
    let comparison = 0;
    if (sortType === "alphanumeric") {
      comparison = compareAlphanumeric(valueA, valueB);
    } else if (sortType === "text") {
      comparison = compareText(String(valueA), String(valueB));
    }
    return isDesc ? -comparison : comparison;
  });
}
function compareAlphanumeric(a, b) {
  if (a === b) {
    const aStr = String(a);
    const bStr = String(b);
    return aStr.localeCompare(bStr);
  }
  return a - b;
}
function compareText(a, b) {
  return a.localeCompare(b, void 0, { sensitivity: "base" });
}
const _sfc_main$8$1 = /* @__PURE__ */ defineComponent({
  __name: "DappsTopVolumeTable",
  __ssrInlineRender: true,
  setup(__props) {
    const { $customFetch } = useNuxtApp();
    const { t } = useI18n();
    const appStore = useAppStore();
    const userStore = useUserStore();
    const dappRepo = DappService($customFetch);
    const {
      data: dapps,
      isLoading,
      suspense
    } = useQuery({
      queryKey: computed(() => dappKeys.topVolumeList(userStore.user.currencyShortName)),
      queryFn: (queryKey) => dappRepo.getDappsTopVolume(appStore.locale, queryKey),
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    const sortBy = ref("position");
    const isDesc = ref(false);
    const sortingFn = ref("alphanumeric");
    const sortedDappsList = computed(() => {
      const sorted = Array.isArray(dapps.value) ? [...dapps.value] : [];
      return sortArray(sorted, sortBy.value, isDesc.value, sortingFn.value);
    });
    const partData = computed(() => {
      var _a2;
      var _a;
      const middleIndex = ((_a2 = (_a = sortedDappsList.value) == null ? void 0 : _a.length) != null ? _a2 : 0) / 2;
      return splitAt(sortedDappsList.value || [], Math.ceil(middleIndex));
    });
    const timeLabel = getLocalizedTimeLabel(TimeVariations.Hours24, t);
    const columnHelper = createColumnHelper();
    const columns = [
      columnHelper.accessor("position", {
        cell: (info) => info.getValue(),
        header: "#",
        enableHiding: false,
        size: 40,
        minSize: 40,
        maxSize: 40,
        sortingFn: "alphanumeric",
        meta: {
          thClass: "!tw-pl-0 tw-text-center",
          tdClass: "!tw-pl-0"
        }
      }),
      columnHelper.accessor("title", {
        id: "title",
        cell: (info) => info.getValue(),
        header: t("coins.dapp"),
        minSize: 250,
        sortingFn: "text",
        meta: {
          thClass: "!tw-pl-0",
          tdClass: "!tw-pl-0"
        }
      }),
      columnHelper.accessor("balance24hFormatted", {
        id: DappMetric.Balance24h,
        cell: (info) => info.getValue(),
        header: t("coins.metrics.metricForXTime", { metric: "coins.metrics.balance", time: timeLabel }),
        sortingFn: "alphanumeric"
      }),
      columnHelper.accessor("volume24hFormatted", {
        id: DappMetric.Volume24h,
        cell: (info) => info.getValue(),
        header: t("coins.metrics.metricForXTime", { metric: "coins.metrics.volume", time: timeLabel }),
        sortingFn: "alphanumeric"
      })
    ];
    const pagination = ref({
      pageIndex: 0,
      pageSize: 5
    });
    const table1 = useVueTable({
      get data() {
        return partData.value[0];
      },
      get columns() {
        return columns;
      },
      manualSorting: true,
      getCoreRowModel: getCoreRowModel(),
      state: {
        get pagination() {
          return pagination.value;
        },
        get sorting() {
          return [
            {
              id: sortBy.value,
              desc: isDesc.value
            }
          ];
        }
      }
    });
    const table2 = useVueTable({
      get data() {
        return partData.value[1];
      },
      get columns() {
        return columns;
      },
      manualSorting: true,
      getCoreRowModel: getCoreRowModel(),
      state: {
        get pagination() {
          return pagination.value;
        },
        get sorting() {
          return [
            {
              id: sortBy.value,
              desc: isDesc.value
            }
          ];
        }
      }
    });
    function onSort(ev) {
      var _a;
      if (!((_a = dapps.value) == null ? void 0 : _a.length) || !ev.sortingFn)
        return;
      sortBy.value = ev.id;
      isDesc.value = !ev.desc;
      sortingFn.value = ev.sortingFn;
    }
    const queryClient = useQueryClient();
    function updateCache(locale) {
      queryClient.setQueryData(
        dappKeys.topVolumeList(userStore.user.currencyShortName),
        (oldData) => {
          if (oldData) {
            return oldData.map((item) => {
              return {
                ...item,
                ...formatDappRankingModelShortMetrics(item, locale, userStore.user.currencyShortName)
              };
            });
          }
          return oldData;
        }
      );
    }
    watch(
      () => appStore.locale,
      (val) => {
        updateCache(val);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0$2;
      if (partData.value.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-grid lg:tw-grid-cols-2 tw-gap-x-7.5 main-page-dapps-table" }, _attrs))}><!--[-->`);
        ssrRenderList(partData.value.length, (i) => {
          _push(ssrRenderComponent(_sfc_main$9$1, {
            key: i,
            table: i === 1 ? unref(table1) : unref(table2),
            loading: unref(isLoading),
            class: "tw-group",
            "thead-class": "max-lg:group-[&:not(:first-child)]:tw-hidden",
            onSort
          }, {
            body_title: withCtx(({ data: data2 }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_nuxt_link_locale, {
                  to: `/dapp/${data2.slug}`,
                  title: data2.title,
                  class: "tw-flex heading-h5"
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="tw-flex tw-items-center"${_scopeId2}>`);
                      if (data2.icon) {
                        _push3(ssrRenderComponent(_sfc_main$g$1, {
                          src: data2.icon,
                          alt: data2.title,
                          class: "tw-mr-2.5"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<span class="heading-h5 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-max-w-[250px]"${_scopeId2}>${ssrInterpolate(data2.title)}</span></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "tw-flex tw-items-center" }, [
                          data2.icon ? (openBlock(), createBlock(_sfc_main$g$1, {
                            key: 0,
                            src: data2.icon,
                            alt: data2.title,
                            class: "tw-mr-2.5"
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                          createVNode("span", { class: "heading-h5 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-max-w-[250px]" }, toDisplayString(data2.title), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_nuxt_link_locale, {
                    to: `/dapp/${data2.slug}`,
                    title: data2.title,
                    class: "tw-flex heading-h5"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "tw-flex tw-items-center" }, [
                        data2.icon ? (openBlock(), createBlock(_sfc_main$g$1, {
                          key: 0,
                          src: data2.icon,
                          alt: data2.title,
                          class: "tw-mr-2.5"
                        }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                        createVNode("span", { class: "heading-h5 tw-whitespace-nowrap tw-overflow-hidden tw-text-ellipsis tw-max-w-[250px]" }, toDisplayString(data2.title), 1)
                      ])
                    ]),
                    _: 2
                  }, 1032, ["to", "title"])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$8$1 = _sfc_main$8$1.setup;
_sfc_main$8$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/digital-asset/dapps/components/DappsTopVolumeTable.vue");
  return _sfc_setup$8$1 ? _sfc_setup$8$1(props, ctx) : void 0;
};
const _sfc_main$7$1 = /* @__PURE__ */ defineComponent({
  __name: "MainPageRanking",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const selectedTab = ref(RankingCategory.Dapps);
    const rankingUrl = computed(
      () => selectedTab.value === RankingCategory.Dapps ? "/ranking" : `/ranking/${selectedTab.value}`
    );
    const rankingCategories = RANKING_CATEGORIES.map((item) => ({
      ...item,
      label: t(item.labelKey, 2)
    }));
    const tableComponent = computed(() => {
      switch (selectedTab.value) {
        case RankingCategory.Dapps:
          return _sfc_main$8$1;
        default:
          return _sfc_main$8$1;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "tw-container" }, _attrs))}><div class="max-md:tw-hidden">`);
      _push(ssrRenderComponent(_sfc_main$7$3, {
        value: selectedTab.value,
        "onUpdate:value": ($event) => selectedTab.value = $event,
        model: unref(rankingCategories),
        variant: unref(TabVariantOptions).pills,
        "menu-class": "!tw-gap-2.5",
        class: "tw-mb-5"
      }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(tableComponent.value), null, null), _parent);
      _push(`<div class="tw-text-center tw-mt-7.5">`);
      _push(ssrRenderComponent(_sfc_main$b$3, {
        label: unref(t)("common.buttons.viewAll"),
        href: rankingUrl.value
      }, null, _parent));
      _push(`</div></div><div class="md:tw-hidden"><h2 class="heading-h2 tw-mb-4">${ssrInterpolate(unref(t)("mainPage.ranks"))}</h2><div class="tw-flex tw-flex-wrap tw-gap-2.5"><!--[-->`);
      ssrRenderList(unref(rankingCategories), (item) => {
        _push(ssrRenderComponent(_component_nuxt_link_locale, {
          key: item.id,
          to: item.id === unref(RankingCategory).Dapps ? "/ranking" : `/ranking/${item.id}`,
          class: "heading-5.1 tw-bg-primary-600 tw-p-5 tw-w-[calc(50%-5px)] md:tw-w-[calc(25%-30px/4)] tw-text-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
});
const _sfc_setup$7$1 = _sfc_main$7$1.setup;
_sfc_main$7$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/main-page/components/ranking/MainPageRanking.vue");
  return _sfc_setup$7$1 ? _sfc_setup$7$1(props, ctx) : void 0;
};
const _sfc_main$6$1 = /* @__PURE__ */ defineComponent({
  __name: "PublicationCardSkeleton",
  __ssrInlineRender: true,
  props: {
    showImage: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (_ctx.showImage) {
        _push(ssrRenderComponent(_sfc_main$b$1, {
          "size-classes": "tw-w-full tw-h-[160px]",
          class: "tw-mb-5"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-py-2 tw-flex tw-flex-col tw-gap-y-2.5 tw-mb-4">`);
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-full tw-h-3.5" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-3/5 tw-h-3.5" }, null, _parent));
      _push(`</div><div class="tw-flex tw-flex-col tw-gap-y-3 tw-mb-4">`);
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-full tw-h-2.5" }, null, _parent));
      if (_ctx.showImage) {
        _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-full tw-h-2.5" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-5/6 tw-h-2.5" }, null, _parent));
      _push(`</div><div class="tw-flex tw-items-center tw-gap-1.5">`);
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-4 tw-h-4 tw-rounded-full" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-1/6 tw-h-2.5" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-1 tw-h-1 tw-rounded-full" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$b$1, { "size-classes": "tw-w-7.5 tw-h-2.5" }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6$1 = _sfc_main$6$1.setup;
_sfc_main$6$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/publication/PublicationCardSkeleton.vue");
  return _sfc_setup$6$1 ? _sfc_setup$6$1(props, ctx) : void 0;
};
const _sfc_main$5$1 = /* @__PURE__ */ defineComponent({
  __name: "MainPageNews",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const newsRepo = NewsService($customFetch);
    const {
      data: news,
      isLoading,
      suspense
    } = useQuery({
      queryKey: computed(() => newsKeys.mainPage(appStore.locale)),
      queryFn: (queryKey) => newsRepo.getNewsMainPage(queryKey),
      staleTime: FIFTEEN_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "tw-container" }, _attrs))}><h2 class="heading-h1 tw-mb-2.5">${ssrInterpolate(unref(t)("news.title"))}</h2><p class="tw-text-primary-300 tw-text-350 tw-mb-7.5">${ssrInterpolate(unref(t)("news.subtitle"))}</p><div class="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">`);
      if (unref(isLoading)) {
        _push(`<!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(_sfc_main$6$1, { key: i }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        ssrRenderList(unref(news), (item, index2) => {
          _push(ssrRenderComponent(_sfc_main$a$3, {
            key: index2,
            href: `/news/${item.slug}`,
            author: item.author,
            title: item.title,
            content: item.shortDescription,
            "created-at": item.publishedAtFormatted,
            "content-class": "max-md:tw-hidden"
          }, null, _parent));
        });
        _push(`<!--]-->`);
      }
      _push(`</div><div class="tw-text-center tw-mt-7.5">`);
      _push(ssrRenderComponent(_sfc_main$b$3, { href: "/news" }, null, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$5$1 = _sfc_main$5$1.setup;
_sfc_main$5$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/news/components/sections/MainPageNews.vue");
  return _sfc_setup$5$1 ? _sfc_setup$5$1(props, ctx) : void 0;
};
const _sfc_main$4$1 = /* @__PURE__ */ defineComponent({
  __name: "MainPageArticles",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const appStore = useAppStore();
    const nuxtApp = useNuxtApp();
    const articleRepo = ArticleService(nuxtApp.$customFetch);
    const {
      data: articlesData,
      isLoading,
      suspense
    } = useQuery({
      queryKey: computed(() => articleKeys.mainPage(appStore.locale)),
      queryFn: (queryKey) => articleRepo.getArticlesMainPage(queryKey),
      staleTime: FIFTEEN_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    const selectedCategoryId = ref("recentlyAdded");
    const articles = computed(() => {
      var _a, _b;
      if (!articlesData.value) {
        return null;
      }
      if (selectedCategoryId.value === "recentlyAdded") {
        return (_a = articlesData.value) == null ? void 0 : _a.latestArticles;
      }
      return ((_b = articlesData.value) == null ? void 0 : _b.categoryArticles[selectedCategoryId.value]) || null;
    });
    const recentlyAddedCategory = {
      id: "recentlyAdded",
      label: t("articles.categories.recentlyAdded")
    };
    const categories = computed(() => {
      var _a;
      const initialCategories = [recentlyAddedCategory];
      const beCategories = (_a = articlesData.value) == null ? void 0 : _a.categories;
      if (beCategories) {
        initialCategories.push(...beCategories);
      }
      return initialCategories;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "tw-container" }, _attrs))}><h2 class="heading-h1 tw-mb-2.5">${ssrInterpolate(unref(t)("articles.title", 2))}</h2><p class="tw-text-primary-300 tw-text-350 tw-mb-7.5">${ssrInterpolate(unref(t)("articles.subtitle"))}</p>`);
      _push(ssrRenderComponent(_sfc_main$7$3, {
        value: selectedCategoryId.value,
        "onUpdate:value": ($event) => selectedCategoryId.value = $event,
        model: categories.value,
        variant: unref(TabVariantOptions).pills,
        "menu-class": "!tw-gap-x-2.5 tw-mb-7.5"
      }, null, _parent));
      _push(`<div class="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5">`);
      if (unref(isLoading)) {
        _push(`<!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(_sfc_main$6$1, { key: i }, null, _parent));
        });
        _push(`<!--]-->`);
      } else if (articles.value) {
        _push(`<!--[-->`);
        ssrRenderList(articles.value, (item, index2) => {
          _push(ssrRenderComponent(_sfc_main$a$3, {
            key: index2,
            image: item.image,
            href: `/analytics/${item.slug}`,
            author: item.author,
            title: item.title,
            content: item.shortDescription,
            "created-at": item.publishedAtFormatted,
            "content-class": "max-md:tw-hidden",
            "title-class": "max-md:tw-mb-0"
          }, null, _parent));
        });
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="tw-text-center tw-mt-7.5">`);
      _push(ssrRenderComponent(_sfc_main$b$3, { href: "/analytics" }, null, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$4$1 = _sfc_main$4$1.setup;
_sfc_main$4$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/article/components/MainPageArticles.vue");
  return _sfc_setup$4$1 ? _sfc_setup$4$1(props, ctx) : void 0;
};
const _sfc_main$3$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const appStore = useAppStore();
    const loginAction = useRouteQuery("action", null);
    if (loginAction.value === "login") {
      appStore.toggleAuthDialog(AuthTab.login, true);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-pt-7.5" }, _attrs))}><h1 class="tw-sr-only">${ssrInterpolate(unref(t)("common.site.metadata.homepage.h1"))}</h1>`);
      _push(ssrRenderComponent(_sfc_main$a$1, { class: "tw-mb-9" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$7$1, { class: "tw-mb-10" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$5$1, { class: "tw-mb-10" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4$1, { class: "tw-mb-10" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$g$2, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3$2 = _sfc_main$3$2.setup;
_sfc_main$3$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$3$2 ? _sfc_setup$3$2(props, ctx) : void 0;
};
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$3$2
}, Symbol.toStringTag, { value: "Module" }));
const PRIVACY_TERMS = [
  {
    title: "terms.privacy.content.0.title",
    content: [
      {
        type: "paragraph",
        text: [
          "terms.privacy.content.0.text.0",
          "terms.privacy.content.0.text.1",
          "terms.privacy.content.0.text.2",
          "terms.privacy.content.0.text.3",
          "terms.privacy.content.0.text.4"
        ]
      }
    ]
  },
  {
    title: "terms.privacy.content.1.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.privacy.content.1.text.0"]
      }
    ]
  },
  {
    title: "terms.privacy.content.2.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.privacy.content.2.text.0"]
      }
    ]
  },
  {
    title: "terms.privacy.content.3.title",
    content: [
      {
        type: "paragraph",
        text: [
          "terms.privacy.content.3.text.0",
          "terms.privacy.content.3.text.1",
          "terms.privacy.content.3.text.2",
          "terms.privacy.content.3.text.3",
          "terms.privacy.content.3.text.4",
          "terms.privacy.content.3.text.5",
          "terms.privacy.content.3.text.6",
          "terms.privacy.content.3.text.7",
          "terms.privacy.content.3.text.8",
          "terms.privacy.content.3.text.9",
          "terms.privacy.content.3.text.10",
          "terms.privacy.content.3.text.11",
          "terms.privacy.content.3.text.12",
          "terms.privacy.content.3.text.13",
          "terms.privacy.content.3.text.14",
          "terms.privacy.content.3.text.15"
        ]
      }
    ]
  },
  {
    title: "terms.privacy.content.4.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.privacy.content.4.text.0", "terms.privacy.content.4.text.1"]
      },
      {
        type: "unorderedList",
        text: [
          "terms.privacy.content.4.text.list1.0",
          "terms.privacy.content.4.text.list1.1",
          "terms.privacy.content.4.text.list1.2",
          "terms.privacy.content.4.text.list1.3",
          "terms.privacy.content.4.text.list1.4",
          "terms.privacy.content.4.text.list1.5",
          "terms.privacy.content.4.text.list1.6",
          "terms.privacy.content.4.text.list1.7",
          "terms.privacy.content.4.text.list1.8"
        ]
      },
      {
        type: "paragraph",
        text: ["terms.privacy.content.4.text.2"]
      }
    ]
  },
  {
    title: "terms.privacy.content.5.title",
    content: [
      {
        type: "paragraph",
        text: [
          "terms.privacy.content.5.text.0",
          "terms.privacy.content.5.text.1",
          "terms.privacy.content.5.text.2",
          "terms.privacy.content.5.text.3",
          "terms.privacy.content.5.text.4",
          "terms.privacy.content.5.text.5"
        ]
      }
    ]
  },
  {
    title: "terms.privacy.content.6.title",
    content: [
      {
        type: "paragraph",
        text: [
          "terms.privacy.content.6.text.0",
          "terms.privacy.content.6.text.1",
          "terms.privacy.content.6.text.2",
          "terms.privacy.content.6.text.3",
          "terms.privacy.content.6.text.4",
          "terms.privacy.content.6.text.5",
          "terms.privacy.content.6.text.6",
          "terms.privacy.content.6.text.7",
          "terms.privacy.content.6.text.8",
          "terms.privacy.content.6.text.9",
          "terms.privacy.content.6.text.10",
          "terms.privacy.content.6.text.11",
          "terms.privacy.content.6.text.12",
          "terms.privacy.content.6.text.13",
          "terms.privacy.content.6.text.14",
          "terms.privacy.content.6.text.15",
          "terms.privacy.content.6.text.16",
          "terms.privacy.content.6.text.17",
          "terms.privacy.content.6.text.18",
          "terms.privacy.content.6.text.19"
        ]
      }
    ]
  },
  {
    title: "terms.privacy.content.7.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.privacy.content.7.text.0"]
      }
    ]
  },
  {
    title: "terms.privacy.content.8.title",
    content: [
      {
        type: "paragraph",
        text: [
          "terms.privacy.content.8.text.0",
          "terms.privacy.content.8.text.1",
          "terms.privacy.content.8.text.2"
        ]
      }
    ]
  },
  {
    title: "terms.privacy.content.9.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.privacy.content.9.text.0"]
      }
    ]
  }
];
const keyOfLineWithEmail$1 = "terms.privacy.content.2.text.0";
const _sfc_main$2$3 = /* @__PURE__ */ defineComponent({
  __name: "privacy-policy",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useSeoMetaData({
      title: t("common.site.metadata.privatePrivacy.title"),
      description: t("common.site.metadata.privatePrivacy.description"),
      keywords: t("common.site.metadata.privatePrivacy.keywords"),
      relativeUrl: "privacy-policy"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<!--[--><h1 class="tw-sr-only">${ssrInterpolate(unref(t)("common.site.metadata.privatePrivacy.h1"))}</h1><div class="tw-container text-content tw-mb-12"><div class="heading-h1 tw-mt-5 md:tw-mt-7.5 tw-mb-2.5">${ssrInterpolate(_ctx.$t("terms.privacy.title"))}</div><div class="tw-text-350 tw-leading-500 tw-mb-7.5 tw-text-primary-300">${ssrInterpolate(_ctx.$t("terms.privacy.createdAt"))}</div><!--[-->`);
      ssrRenderList(unref(PRIVACY_TERMS), (section, key) => {
        _push(`<section class="tw-mb-5 tw-leading-650">`);
        if (section.title) {
          _push(`<h2 class="heading-h3 tw-mb-7.5">${ssrInterpolate(_ctx.$t(section.title))}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(section.content, (item, key2) => {
          _push(`<!--[-->`);
          if (item.type === "paragraph") {
            _push(`<!--[-->`);
            ssrRenderList(item.text, (par) => {
              _push(`<p class="tw-mb-7.5">`);
              if (par === keyOfLineWithEmail$1) {
                _push(ssrRenderComponent(_component_i18n_t, {
                  keypath: keyOfLineWithEmail$1,
                  scope: "global"
                }, {
                  email: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<a${ssrRenderAttr("href", `mailto:${unref(DE_EMAIL)}`)}${_scopeId}>${ssrInterpolate(unref(DE_EMAIL))}</a>`);
                    } else {
                      return [
                        createVNode("a", {
                          href: `mailto:${unref(DE_EMAIL)}`
                        }, toDisplayString(unref(DE_EMAIL)), 9, ["href"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else {
                _push(`<!--[-->${ssrInterpolate(_ctx.$t(par))}<!--]-->`);
              }
              _push(`</p>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (item.type === "unorderedList") {
            _push(`<!--[-->`);
            if (item.title) {
              _push(`<h3 class="tw-font-bold tw-mb-7.5">${ssrInterpolate(_ctx.$t(item.title))}</h3>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<ul class="tw-list-disc tw-ps-5 tw-mb-7.5"><!--[-->`);
            ssrRenderList(item.text, (listItem) => {
              _push(`<li>${ssrInterpolate(_ctx.$t(listItem))}</li>`);
            });
            _push(`<!--]--></ul><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></section>`);
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
});
const _sfc_setup$2$3 = _sfc_main$2$3.setup;
_sfc_main$2$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
  return _sfc_setup$2$3 ? _sfc_setup$2$3(props, ctx) : void 0;
};
const privacyPolicy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1$3 = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_page = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-container tw-mt-7.5" }, _attrs))}><div class="tw-flex tw-gap-7.5 tw-justify-center">`);
      _push(ssrRenderComponent(_sfc_main$f, null, null, _parent));
      _push(`<div class="tw-flex-grow tw-pb-16">`);
      _push(ssrRenderComponent(_component_nuxt_page, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1$3 = _sfc_main$1$3.setup;
_sfc_main$1$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings.vue");
  return _sfc_setup$1$3 ? _sfc_setup$1$3(props, ctx) : void 0;
};
const settings = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1$3
}, Symbol.toStringTag, { value: "Module" }));
const GENERAL_TERMS = [
  {
    title: "terms.general.content.0.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.general.content.0.text.0"]
      },
      {
        type: "orderedList",
        text: ["terms.general.content.0.text.list1.0", "terms.general.content.0.text.list1.1"]
      },
      {
        type: "paragraph",
        text: ["terms.general.content.0.text.1"]
      }
    ]
  },
  {
    title: "terms.general.content.1.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.general.content.1.text.0"]
      },
      {
        type: "orderedList",
        text: [
          "terms.general.content.1.text.list1.0",
          "terms.general.content.1.text.list1.1",
          "terms.general.content.1.text.list1.2"
        ]
      },
      {
        type: "paragraph",
        text: ["terms.general.content.1.text.1"]
      },
      {
        type: "orderedList",
        text: [
          "terms.general.content.1.text.list2.0",
          "terms.general.content.1.text.list2.1",
          "terms.general.content.1.text.list2.2",
          "terms.general.content.1.text.list2.3"
        ]
      },
      {
        type: "orderedList",
        title: "terms.general.content.1.text.list3.title",
        text: [
          "terms.general.content.1.text.list3.0",
          "terms.general.content.1.text.list3.1",
          "terms.general.content.1.text.list3.2",
          "terms.general.content.1.text.list3.3"
        ]
      },
      {
        type: "paragraph",
        text: ["terms.general.content.1.text.2"]
      }
    ]
  },
  {
    title: "terms.general.content.2.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.general.content.2.text.0"]
      },
      {
        type: "orderedList",
        text: [
          "terms.general.content.2.text.list1.0",
          "terms.general.content.2.text.list1.1",
          "terms.general.content.2.text.list1.2",
          "terms.general.content.2.text.list1.3"
        ]
      },
      {
        type: "paragraph",
        text: ["terms.general.content.2.text.1"]
      }
    ]
  },
  {
    title: "terms.general.content.3.title",
    content: [
      {
        type: "paragraph",
        text: ["terms.general.content.3.text.0"]
      }
    ]
  }
];
const keyOfLineWithEmail = "terms.general.content.3.text.0";
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "terms-conditions",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useSeoMetaData({
      title: t("common.site.metadata.termsConditions.title"),
      description: t("common.site.metadata.termsConditions.description"),
      keywords: t("common.site.metadata.termsConditions.keywords"),
      relativeUrl: "terms-conditions"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      _push(`<!--[--><h1 class="tw-sr-only">${ssrInterpolate(unref(t)("common.site.metadata.termsConditions.h1"))}</h1><div class="tw-container text-content tw-mb-20"><div class="heading-h1 tw-mt-7.5 tw-mb-2.5">${ssrInterpolate(_ctx.$t("terms.general.title"))}</div><div class="tw-text-350 tw-leading-500 tw-mb-7.5 tw-text-primary-300">${ssrInterpolate(_ctx.$t("terms.general.createdAt"))}</div><!--[-->`);
      ssrRenderList(unref(GENERAL_TERMS), (section, key) => {
        _push(`<section class="tw-mb-5">`);
        if (section.title) {
          _push(`<h2 class="heading-h3 tw-mb-7.5">${ssrInterpolate(_ctx.$t(section.title))}</h2>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(section.content, (item, key2) => {
          _push(`<!--[-->`);
          if (item.type === "paragraph") {
            _push(`<!--[-->`);
            ssrRenderList(item.text, (par) => {
              _push(`<p class="tw-mb-7.5">`);
              if (par === keyOfLineWithEmail) {
                _push(ssrRenderComponent(_component_i18n_t, {
                  keypath: keyOfLineWithEmail,
                  scope: "global"
                }, {
                  email: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`<a${ssrRenderAttr("href", `mailto:${unref(DE_EMAIL)}`)}${_scopeId}>${ssrInterpolate(unref(DE_EMAIL))}</a>`);
                    } else {
                      return [
                        createVNode("a", {
                          href: `mailto:${unref(DE_EMAIL)}`
                        }, toDisplayString(unref(DE_EMAIL)), 9, ["href"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
              } else {
                _push(`<!--[-->${ssrInterpolate(_ctx.$t(par))}<!--]-->`);
              }
              _push(`</p>`);
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (item.type === "orderedList") {
            _push(`<!--[-->`);
            if (item.title) {
              _push(`<h3 class="tw-font-bold tw-mb-7.5">${ssrInterpolate(_ctx.$t(item.title))}</h3>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<ol class="tw-list-decimal tw-ps-5 tw-mb-7.5"><!--[-->`);
            ssrRenderList(item.text, (listItem) => {
              _push(`<li>${ssrInterpolate(_ctx.$t(listItem))}</li>`);
            });
            _push(`<!--]--></ol><!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></section>`);
      });
      _push(`<!--]--></div><!--]-->`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/terms-conditions.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const termsConditions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));

const chunkPgMisc3QAbi6Xo = /*#__PURE__*/Object.freeze({
  __proto__: null,
  M: MAX_RANKING_METRICS_NUMBER,
  _: _sfc_main$9$1,
  a: _sfc_main$g,
  b: _sfc_main$h,
  c: _sfc_main$b$1,
  d: __nuxt_page_meta$3,
  e: __nuxt_page_meta$2,
  f: __nuxt_page_meta$1,
  g: __nuxt_page_meta$4,
  h: __nuxt_component_0$1,
  i: accordion_esm,
  j: accordiontab_esm,
  k: dashboard,
  l: index$2,
  m: settings,
  n: termsConditions,
  p: privacyPolicy,
  s: script$3$1,
  t: toArray,
  u: useDevice
});

const __nuxt_page_meta = {
  layout: "default"
};
const _sfc_main$3$1 = /* @__PURE__ */ defineComponent({
  __name: "OtherNews",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const newsRepo = NewsService($customFetch);
    const {
      data: news,
      isLoading,
      suspense
    } = useQuery({
      queryKey: computed(() => newsKeys.otherNewsList(route.params.slug, appStore.locale)),
      queryFn: (queryKey) => newsRepo.getOtherNewsList(queryKey),
      staleTime: FIFTEEN_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-7.5 tw-mb-15" }, _attrs))}><h2 class="heading-h2 md:heading-h1">${ssrInterpolate(_ctx.$t("news.otherNews"))}</h2>`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_sfc_main$c$2, { class: "tw-mb-7.5 tw-h-1500 tw-w-full tw-order-1" }, null, _parent));
      } else if ((_a = unref(news)) == null ? void 0 : _a.length) {
        _push(`<div class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5 tw-w-full"><!--[-->`);
        ssrRenderList(unref(news), (item) => {
          _push(ssrRenderComponent(_sfc_main$a$3, {
            key: item.id,
            image: item.image,
            href: `/analytics/${item.slug}`,
            author: item.author,
            title: item.title,
            content: item.shortDescription,
            "created-at": item.publishedAtFormatted
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$b$3, {
        href: "/analytics",
        class: "tw-mx-auto"
      }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$3$1 = _sfc_main$3$1.setup;
_sfc_main$3$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/news/components/sections/OtherNews.vue");
  return _sfc_setup$3$1 ? _sfc_setup$3$1(props, ctx) : void 0;
};
const _sfc_main$2$2 = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d;
    let __temp, __restore;
    const route = useRoute();
    const router = useRouter();
    const localePath = useLocalePath();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const newsRepo = NewsService($customFetch);
    const queryClient = useQueryClient();
    const queryKey = newsKeys.detail(route.params.slug);
    const dataFetcher = () => queryClient.fetchQuery({
      queryKey,
      queryFn: (queryKey2) => newsRepo.getNewsItemBySlug(queryKey2, appStore.locale),
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS
    });
    const { data: newsItem, status } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(JSON.stringify(queryKey), dataFetcher, "$mN2gziXVDH")), __temp = await __temp, __restore(), __temp);
    const redirectToHomeOnLocaleChange = () => {
      router.push(localePath("/"));
    };
    watch(() => appStore.locale, redirectToHomeOnLocaleChange);
    const handleLike = async (isLike) => {
      await newsRepo.like(newsItem.value.id, isLike);
    };
    useSeoMetaData({
      title: (_a = newsItem.value) == null ? void 0 : _a.title,
      description: (_b = newsItem.value) == null ? void 0 : _b.shortDescription,
      image: (_c = newsItem.value) == null ? void 0 : _c.image,
      relativeUrl: `news/${(_d = newsItem.value) == null ? void 0 : _d.slug}`
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _directive_safe_html = resolveDirective("safe-html");
      let _temp0;
      _push(`<!--[--><div class="tw-container tw-pt-5 md:tw-pt-7.5">`);
      if (unref(status) === "pending") {
        _push(ssrRenderComponent(_sfc_main$c$2, { class: "tw-mb-7.5 tw-w-1500 tw-h-1500" }, null, _parent));
      } else if (unref(newsItem)) {
        _push(`<div class="xl:tw-flex xl:tw-gap-7.5 tw-relative tw-mb-15"><div class="xl:tw-max-w-[770px]">`);
        if (unref(newsItem).image) {
          _push(`<div class="tw-mb-7.5 md:tw-mb-10"><img${ssrRenderAttr("src", unref(newsItem).image)}${ssrRenderAttr("alt", unref(newsItem).title)}${ssrRenderAttr("title", unref(newsItem).title)} class="tw-w-full lg:tw-min-w-[770px] tw-h-full tw-object-cover"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h1 class="heading-h2 md:heading-h1 tw-mb-5">${ssrInterpolate(unref(newsItem).title)}</h1><div class="tw-flex tw-items-center tw-gap-2.5 tw-text-300 tw-leading-400 tw-mt-2.5">`);
        _push(ssrRenderComponent(_sfc_main$k$1, {
          size: unref(AVATAR_SIZE_OPTIONS).medium,
          src: unref(newsItem).author.image
        }, null, _parent));
        _push(`<p class="body-b1 tw-text-primary-300 tw-capitalize">${ssrInterpolate(_ctx.$t("common.by"))} <span class="heading-h4 tw-text-primary-50 tw-normal-case">${ssrInterpolate(unref(newsItem).author.name)}</span></p><i class="tw-w-100 tw-h-100 tw-inline-block tw-rounded-full tw-bg-primary-400"></i><p class="body-b2 tw-text-primary-300">${ssrInterpolate(unref(newsItem).publishedAtFormatted)}</p></div><hr class="tw-my-7.5 xl:tw-my-10 tw-text-primary-600"><article${ssrRenderAttrs(_temp0 = mergeProps({ class: "text-content tw-mb-7.5 md:tw-mb-15" }, ssrGetDirectiveProps(_ctx, _directive_safe_html, unref(newsItem).content)))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a2 = _temp0.innerHTML) != null ? _a2 : ""}</article>`);
        _push(ssrRenderComponent(_sfc_main$f$2, {
          views: unref(newsItem).pageviews,
          likes: unref(newsItem).likes,
          "is-liked": unref(newsItem).isLiked,
          onLike: handleLike
        }, null, _parent));
        _push(`</div><div class="xl:tw-sticky xl:tw-top-7.5 tw-h-full tw-mt-10 xl:tw-mt-0">`);
        _push(ssrRenderComponent(_sfc_main$d$2, {
          title: unref(newsItem).title,
          class: "xl:tw-pl-7.5 tw-transition"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$3$1, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$g$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2$2 = _sfc_main$2$2.setup;
_sfc_main$2$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/[slug].vue");
  return _sfc_setup$2$2 ? _sfc_setup$2$2(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$2$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1$2 = /* @__PURE__ */ defineComponent({
  __name: "NewsGrid",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const { $customFetch } = useNuxtApp();
    const newsRepo = NewsService($customFetch);
    const appStore = useAppStore();
    const { t } = useI18n();
    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, suspense } = useInfiniteQuery({
      queryKey: newsKeys.list(appStore.locale),
      queryFn: ({ queryKey, pageParam = 1 }) => newsRepo.getNewsList(queryKey, pageParam),
      staleTime: FIFTEEN_MINUTES_IN_MILLISECONDS,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    const news = (_a = computed(() => {
      var _a2;
      return (_a2 = data.value) == null ? void 0 : _a2.pages.flatMap((page) => page.data);
    })) != null ? _a : [];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_sfc_main$c$2, { class: "tw-mt-10 tw-w-1500 tw-h-1500" }, null, _parent));
      } else {
        _push(`<div class="tw-grid sm:tw-grid-cols-2 tw-gap-7.5 lg:tw-gap-10"><!--[-->`);
        ssrRenderList(unref(news), (item) => {
          _push(ssrRenderComponent(_sfc_main$6$2, {
            key: item.id,
            item,
            class: "grid-item"
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (unref(hasNextPage)) {
        _push(`<div class="tw-flex tw-justify-center tw-mt-10">`);
        _push(ssrRenderComponent(_sfc_main$l$1, {
          icon: "refresh",
          "icon-class": "tw-text-primary-400 tw-w-300 tw-h-300 tw-mr-2",
          label: unref(t)("common.buttons.loadMore"),
          size: unref(ButtonSizeOptions).medium,
          loading: unref(isFetchingNextPage),
          onClick: unref(fetchNextPage)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1$2 = _sfc_main$1$2.setup;
_sfc_main$1$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/news/components/NewsGrid.vue");
  return _sfc_setup$1$2 ? _sfc_setup$1$2(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    useSeoMetaData({
      title: t("common.site.metadata.news.title"),
      description: t("common.site.metadata.news.description"),
      keywords: t("common.site.metadata.news.keywords"),
      relativeUrl: "news"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1 class="tw-sr-only">${ssrInterpolate(unref(t)("common.site.metadata.news.h1"))}</h1><div class="tw-container tw-mt-5 md:tw-mt-7.5 tw-mb-15 md:tw-mb-20"><div class="heading-h2 md:heading-h1 tw-mb-2.5 md:tw-mb-0.5">${ssrInterpolate(unref(t)("news.title"))}</div><div class="lg:tw-flex lg:tw-justify-between tw-mb-7.5"><div class="tw-flex tw-items-center"><p class="body-b1 tw-text-primary-300 tw-mr-1 tw-mb-4 lg:tw-mb-0">${ssrInterpolate(unref(t)("news.subtitle"))}</p></div></div>`);
      _push(ssrRenderComponent(_sfc_main$1$2, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$g$2, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/news/index.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$b
}, Symbol.toStringTag, { value: "Module" }));

const chunkPgNewsBCa9OUT9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _: __nuxt_page_meta,
  a: _slug_,
  i: index$1
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const E_000 = "000";
const E_400 = "400";
const E_401 = "401";
const E_403 = "403";
const E_404 = "404";
const E_409 = "409";
const E_412 = "412";
const E_429 = "429";
const E_500 = "500";
const E_CREDENTIALS_INCORRECT = "credentials_incorrect";
const E_EMAIL_NOT_CONFIRMED = "email_not_confirmed";
const E_EMAIL_ALREADY_REGISTERED = "email_has_been_taken";
const E_INVALID_CODE = "invalid_code";
const E_INCORRECT_CODE = "code_is_not_correct";
const E_WALLET_ADDRESS_NOT_FOUND = "wallet_address_not_found";
const E_REFRESH_TOKEN_NOT_FOUND = "refresh_token_not_found";
const E_NEWS_NOT_FOUND = "news_not_found";
const E_DAPP_NOT_FOUND = "dapp_not_found";
const E_WALLET_ADDRESS_TAKEN = "wallet_address_has_been_taken";
const E_EMAIL_CONFIRMATION_REQUIRED = "old_user_mail_confirmation";
const errorCodes = {
  E_000,
  E_400,
  E_401,
  E_403,
  E_404,
  E_409,
  E_412,
  E_429,
  E_500,
  E_CREDENTIALS_INCORRECT,
  E_EMAIL_NOT_CONFIRMED,
  E_EMAIL_ALREADY_REGISTERED,
  E_INVALID_CODE,
  E_WALLET_ADDRESS_NOT_FOUND,
  E_REFRESH_TOKEN_NOT_FOUND,
  E_NEWS_NOT_FOUND,
  E_WALLET_ADDRESS_TAKEN,
  E_INCORRECT_CODE,
  E_DAPP_NOT_FOUND,
  E_EMAIL_CONFIRMATION_REQUIRED
};
const errorMessages = {
  [errorCodes.E_000]: "Something went wrong when making your request. Please try again.",
  // [errorCodes.E_400]: 'We had trouble processing your request',
  // [errorCodes.E_401]: 'You cannot access this while logged out, please log in',
  // [errorCodes.E_403]: 'You are not allowed to access ',
  // [errorCodes.E_404]: "We couldn't find what you were looking for",
  // [errorCodes.E_409]:
  //   'We ran into a conflict, are you trying to create something that already exists?',
  // [errorCodes.E_412]:
  //   'We were not able to make your changes, please get in touch with tech support if this issue persists',
  // [errorCodes.E_429]:
  //   "We've limited how many times you can make this request. Please try again later",
  // [errorCodes.E_500]: 'errors.e500',
  [errorCodes.E_CREDENTIALS_INCORRECT]: "errors.credentialsIncorrect",
  [errorCodes.E_EMAIL_NOT_CONFIRMED]: "errors.emailNotConfirmed",
  [errorCodes.E_INVALID_CODE]: "errors.incorrectCode",
  [errorCodes.E_INCORRECT_CODE]: "errors.incorrectCode",
  [errorCodes.E_WALLET_ADDRESS_TAKEN]: "errors.walletAddressTaken"
};
const useErrorHandling = (customErrorMessages = {}) => {
  const { $i18n } = useNuxtApp();
  const messages = ref({
    ...errorMessages,
    ...customErrorMessages
  });
  const isErrorCode = (code) => {
    const errorCodes2 = Object.keys(messages.value);
    const parsedCode = String(code);
    const allowedKeys = Object.values(errorCodes2);
    return allowedKeys.includes(parsedCode);
  };
  const getErrorMessage = (errors = "", fallbackMessage) => {
    var _a, _b;
    let errorCode;
    if (Array.isArray(errors)) {
      errorCode = errors[0];
    } else {
      errorCode = errors;
    }
    const parsedCode = String(errorCode);
    if (!isErrorCode(parsedCode)) {
      return fallbackMessage != null ? fallbackMessage : $i18n.t((_a = messages.value[errorCodes.E_000]) != null ? _a : "Unknown error");
    }
    return $i18n.t((_b = messages.value[parsedCode]) != null ? _b : "Unknown error");
  };
  return {
    getErrorMessage
  };
};
const AuthService = (fetch) => {
  async function login(payload) {
    return await fetch("api/auth/login", {
      method: "POST",
      credentials: "include",
      localError: true,
      body: payload
    });
  }
  async function logout() {
    return await fetch("api/auth/logout", {
      method: "POST",
      credentials: "include"
    });
  }
  async function signUp(payload) {
    return await fetch("api/auth/registration", {
      method: "POST",
      credentials: "include",
      localError: true,
      body: payload
    });
  }
  async function confirmRegistration(payload) {
    return await fetch("api/auth/confirm-registration", {
      method: "POST",
      credentials: "include",
      localError: true,
      body: payload
    });
  }
  async function resendVerificationEmail(payload) {
    return await fetch("api/auth/resend-message", {
      method: "POST",
      body: payload
    });
  }
  async function refresh() {
    return await fetch("api/auth/token/refresh", {
      method: "POST",
      credentials: "include",
      localError: true,
      retry: false
    });
  }
  async function resetPassword(payload) {
    return await fetch("api/auth/reset-password", {
      method: "POST",
      body: payload,
      localError: true
    });
  }
  async function changePassword(payload) {
    return await fetch("api/auth/new-password", {
      method: "POST",
      body: payload,
      localError: true
    });
  }
  async function getMe() {
    return await fetch("api/identify/me", {
      method: "GET"
    });
  }
  async function google() {
    return await fetch("api/auth/google", {
      method: "GET",
      localError: true
    });
  }
  async function googleCallback(payload) {
    const queryParams = new URLSearchParams(
      payload
    ).toString();
    return await fetch(`api/auth/google/callback?${queryParams}`, {
      credentials: "include",
      method: "GET"
    });
  }
  return {
    login,
    logout,
    signUp,
    confirmRegistration,
    resendVerificationEmail,
    refresh,
    resetPassword,
    changePassword,
    getMe,
    google,
    googleCallback
  };
};
const useAuthReadyState = () => useState("de-auth-ready", () => false);
const useLogin = () => {
  const { $customFetch } = useNuxtApp();
  const authRepo = AuthService($customFetch);
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const toast = useToast();
  const authReadyState = useAuthReadyState();
  async function getUser() {
    const userData = await authRepo.getMe();
    userStore.setUser(createUserModelBase(userData));
  }
  async function makeUserLoggedIn(apiToken) {
    authStore.setToken(apiToken);
    await getUser();
  }
  async function makeUserLoggedOut() {
    authStore.setToken(null);
    userStore.clearUser();
  }
  const { getErrorMessage } = useErrorHandling();
  async function login(payload) {
    return await authRepo.login(payload);
  }
  async function recoveryPassword(payload) {
    await authRepo.resetPassword(payload);
  }
  async function changePassword(payload) {
    await authRepo.changePassword(payload);
  }
  async function logout() {
    await authRepo.logout();
    await makeUserLoggedOut();
  }
  async function googleLogin() {
    try {
      const url = await authRepo.google();
      if (url) {
        (void 0).location.href = url;
      }
    } catch (e) {
      console.error(e);
      toastErrorNotification(toast, {
        body: getErrorMessage(errorCodes.E_000)
      });
    }
  }
  async function refreshToken() {
    try {
      const response = await authRepo.refresh();
      await makeUserLoggedIn(response.access_token);
    } catch {
      await makeUserLoggedOut();
    } finally {
      if (!authReadyState.value) {
        authReadyState.value = true;
      }
    }
  }
  return {
    googleLogin,
    login,
    recoveryPassword,
    changePassword,
    logout,
    makeUserLoggedIn,
    makeUserLoggedOut,
    getUser,
    refreshToken,
    authReadyState
  };
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "UserSettingsMenuItemLayout",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "lg:tw-max-w-[570px]" }, _attrs))}><header class="heading-h1 tw-pb-4 tw-mb-7.5 tw-border-b tw-border-primary-600 tw-capitalize">`);
      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
        _push(`${ssrInterpolate(_ctx.title)}`);
      }, _push, _parent);
      _push(`</header><div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/settings/UserSettingsMenuItemLayout.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
function maskEmail(email) {
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) {
    return email;
  }
  const maskedLocalPart = localPart[0] + "***" + localPart.slice(-2);
  return `${maskedLocalPart}@${domain}`;
}
function maskWalletAddress(address) {
  const startLength = 8;
  const endLength = 10;
  if (address.length <= startLength + endLength) {
    return address;
  }
  const start = address.slice(0, startLength);
  const end = address.slice(-endLength);
  return `${start}...${end}`;
}
var WalletProvider = /* @__PURE__ */ ((WalletProvider2) => {
  WalletProvider2["trustWallet"] = "trust_wallet";
  WalletProvider2["metaMask"] = "metamask";
  WalletProvider2["WalletConnect"] = "wallet_connect";
  return WalletProvider2;
})(WalletProvider || {});
const BASE_WALLETS_CONFIG = [
  {
    id: "trust_wallet",
    label: "auth.wallet.trustWallet",
    pageHref: "https://trustwallet.com/browser-extension",
    icon: "trustwallet"
  },
  {
    id: "metamask",
    label: "auth.wallet.metaMask",
    pageHref: "https://metamask.io/download/",
    icon: "metamask"
  }
];
function getWalletPageHrefById(walletId) {
  const foundWallet = BASE_WALLETS_CONFIG.find((item) => item.id === walletId);
  if (!foundWallet) {
    throw new Error(`provided wallet with id ${walletId} doesnt exist in WALLET_CONFIG`);
  }
  return foundWallet.pageHref;
}
function openWalletInstallationPage(walletId) {
  const link = getWalletPageHrefById(walletId);
  if (link) {
    (void 0).open(link, "_blank");
  }
}
class BaseWalletProvider {
  constructor(walletProvider, options) {
    __publicField(this, "provider");
    __publicField(this, "showError");
    this.provider = new ethers.BrowserProvider(walletProvider);
    this.showError = options.showError;
  }
  async getSigner() {
    return await this.provider.getSigner();
  }
  async getAddress() {
    const accounts = await this.provider.send("eth_requestAccounts", []);
    return accounts[0];
  }
  async signMessage(message) {
    const signer = await this.getSigner();
    return signer.signMessage(message);
  }
  async getBalance(address) {
    return await this.provider.getBalance(address);
  }
}
class MetaMaskProvider extends BaseWalletProvider {
  constructor(options) {
    if (!(void 0).ethereum) {
      openWalletInstallationPage(WalletProvider.metaMask);
      options.showError("MetaMask is not available");
      throw new Error("metaMask is not installed");
    }
    super((void 0).ethereum, options);
  }
}
class TrustWalletProvider extends BaseWalletProvider {
  constructor(options) {
    if (!(void 0).trustwallet) {
      openWalletInstallationPage(WalletProvider.trustWallet);
      options.showError("trustwallet is not available");
      throw new Error("trustwallet is not installed");
    }
    super((void 0).trustwallet, options);
  }
}
function getWalletProvider(walletType, showErrorFn) {
  let walletProvider;
  switch (walletType) {
    case WalletProvider.metaMask:
      walletProvider = new MetaMaskProvider({ showError: showErrorFn });
      break;
    case WalletProvider.trustWallet:
      walletProvider = new TrustWalletProvider({ showError: showErrorFn });
      break;
    default:
      throw new Error("Unsupported wallet type");
  }
  return walletProvider;
}
const AuthWalletService = (fetch) => ({
  async bindWallet({
    address,
    signature,
    email,
    password,
    walletType
  }) {
    return await fetch("api/auth/bind-wallet", {
      method: "POST",
      localError: true,
      body: {
        wallet_address: address,
        wallet_provider: walletType,
        signature,
        email,
        password
      }
    });
  },
  async getNonce(address) {
    return await fetch("api/auth/nonce", {
      query: {
        wallet_address: address
      }
    });
  },
  async authorizeByWallet({
    walletType,
    address,
    signature
  }) {
    return await fetch("api/auth/wallet-authorize", {
      method: "POST",
      credentials: "include",
      localError: true,
      body: {
        wallet_address: address,
        wallet_provider: walletType,
        signature
      }
    });
  },
  async registerByWallet({
    walletType,
    address,
    signature
  }) {
    return await fetch("api/auth/wallet-registration", {
      method: "POST",
      localError: true,
      body: {
        wallet_address: address,
        wallet_provider: walletType,
        signature
      }
    });
  }
});
const UserWalletService = (fetch) => ({
  async bindWalletToCurrentUserAccount({
    address,
    signature,
    email,
    password,
    walletType
  }) {
    return await fetch("api/v1/user/settings/account-security/wallet/bind", {
      method: "POST",
      localError: true,
      body: {
        wallet_address: address,
        wallet_provider: walletType,
        signature,
        email,
        password
      }
    });
  },
  async attemptDisconnectWallet() {
    return await fetch("api/v1/user/settings/account-security/wallet/attempt-disconnect", {
      method: "POST"
    });
  },
  async confirmDisconnectWallet(code) {
    return await fetch("api/v1/user/settings/account-security/wallet/confirm-disconnect", {
      method: "POST",
      localError: true,
      body: {
        verify_code: code
      }
    });
  },
  async disconnectWallet({ address, signature }) {
    return await fetch("api/v1/user/settings/account-security/wallet/disconnect", {
      method: "POST",
      body: {
        wallet_address: address,
        signature
      }
    });
  }
});
const useWallet = () => {
  const toast = useToast();
  const { t } = useI18n();
  const { getErrorMessage } = useErrorHandling();
  const { makeUserLoggedIn } = useLogin();
  const { $customFetch } = useNuxtApp();
  const authWalletRepo = AuthWalletService($customFetch);
  const userWalletRepo = UserWalletService($customFetch);
  const store = useAppStore();
  const userStore = useUserStore();
  async function bindWalletToExistingAccount(payload) {
    try {
      const response = await authWalletRepo.bindWallet(payload);
      await makeUserLoggedIn(response.access_token);
    } catch (error) {
      console.error(error);
      const { errorCode } = error;
      throw getErrorMessage(errorCode);
    }
  }
  async function bindWalletToCurrentUserAccount(payload) {
    var _a;
    try {
      await userWalletRepo.bindWalletToCurrentUserAccount(payload);
      userStore.setUserWallet(payload.address, (_a = payload.walletType) != null ? _a : null);
    } catch (error) {
      console.error(error);
      const { errorCode } = error;
      toastErrorNotification(toast, {
        body: getErrorMessage(errorCode)
      });
    }
  }
  async function getNonce(address) {
    const { nonce } = await authWalletRepo.getNonce(address);
    return nonce;
  }
  async function authorizeByWallet(payload) {
    const response = await authWalletRepo.authorizeByWallet(payload);
    await makeUserLoggedIn(response.access_token);
  }
  async function registerByWallet(payload) {
    const response = await authWalletRepo.registerByWallet(payload);
    await makeUserLoggedIn(response.access_token);
    store.toggleAuthDialog(void 0, false);
  }
  async function handleWalletConnection(walletType) {
    const provider = getWalletProvider(
      walletType,
      () => toastErrorNotification(toast, {
        body: t("auth.wallet.connectWallet.notification")
      })
    );
    if (!provider)
      return null;
    const address = await provider.getAddress();
    if (userStore.user.wallet.address && address !== userStore.user.wallet.address) {
      toastErrorNotification(toast, {
        body: t("auth.wallet.incorrectWalletAddress")
      });
      return null;
    }
    try {
      const nonce = await getNonce(address);
      const signature = await provider.signMessage(nonce);
      return {
        address,
        signature,
        walletType
      };
    } catch (error) {
      console.error(error);
      toastErrorNotification(toast, {
        body: getErrorMessage(errorCodes.E_000)
      });
      return null;
    }
  }
  async function attemptDisconnectWallet() {
    await userWalletRepo.attemptDisconnectWallet();
  }
  async function confirmDisconnectWallet(code) {
    await userWalletRepo.confirmDisconnectWallet(code);
  }
  async function disconnectWallet(payload) {
    await userWalletRepo.disconnectWallet(payload);
  }
  return {
    getNonce,
    authorizeByWallet,
    handleWalletConnection,
    bindWalletToExistingAccount,
    bindWalletToCurrentUserAccount,
    registerByWallet,
    attemptDisconnectWallet,
    confirmDisconnectWallet,
    disconnectWallet
  };
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AccountInformation",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const userStore = useUserStore();
    const store = useAppStore();
    const isSetEmailDialogVisible = ref(false);
    const onContactUsClick = () => {
      store.showCustomerService(true);
    };
    function onSetEmailAndPasswordClick() {
      isSetEmailDialogVisible.value = true;
    }
    const isSetAddressDialogVisible = ref(false);
    function onSetAddress() {
      isSetAddressDialogVisible.value = true;
    }
    const { attemptDisconnectWallet } = useWallet();
    const isDisconnectWalletDialogVisible = ref(false);
    async function onDisconnect() {
      isDisconnectWalletDialogVisible.value = true;
      await attemptDisconnectWallet();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_client_only = __nuxt_component_0$2$1;
      _push(`<!--[--><header class="heading-h2 tw-mb-7.5">${ssrInterpolate(unref(t)("user.settings.profile.accountInfo.title"))}</header><div class="tw-flex max-md:tw-flex-col tw-gap-5 tw-items-start tw-justify-between tw-mb-7.5"><div class="tw-flex tw-flex-col tw-gap-y-1.5"><p class="heading-h5">${ssrInterpolate(unref(t)("form.emailAddress"))}</p>`);
      _push(ssrRenderComponent(_component_i18n_t, {
        keypath: "user.settings.profile.accountInfo.emailChangeHint",
        tag: "p",
        class: "body-b1 tw-text-primary-300",
        scope: "global"
      }, {
        link: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="tw-capitalize tw-font-semibold tw-underline tw-cursor-pointer"${_scopeId}>${ssrInterpolate(unref(t)("common.customerService"))}</button>`);
          } else {
            return [
              createVNode("button", {
                class: "tw-capitalize tw-font-semibold tw-underline tw-cursor-pointer",
                onClick: onContactUsClick
              }, toDisplayString(unref(t)("common.customerService")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(userStore).user.email) {
        _push(`<p class="heading-h5.1">${ssrInterpolate(unref(maskEmail)(unref(userStore).user.email))}</p>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$l$1, {
          variant: unref(ButtonVariantOptions).confirm,
          size: unref(ButtonSizeOptions).medium,
          label: unref(t)("common.buttons.setEmailAndPassword"),
          class: "tw-flex-shrink-0",
          onClick: onSetEmailAndPasswordClick
        }, null, _parent));
      }
      _push(`</div><div class="tw-flex max-md:tw-flex-col tw-flex-wrap tw-gap-y-2.5 tw-items-start tw-justify-between"><div class="tw-flex tw-flex-col tw-gap-y-1.5"><p class="heading-h5">${ssrInterpolate(unref(t)("auth.wallet.walletAddress"))}</p><p class="body-b1 tw-text-primary-300">${ssrInterpolate(unref(userStore).user.wallet.address ? unref(t)("auth.wallet.youLoggedInIntoThisAddr") : unref(t)("auth.wallet.loginWithWalletAddr"))}</p></div>`);
      if (unref(userStore).user.wallet.address) {
        _push(`<div class="tw-flex tw-w-full tw-justify-between tw-items-center"><p class="body-b1">${ssrInterpolate(unref(maskWalletAddress)(unref(userStore).user.wallet.address))}</p>`);
        if (unref(userStore).user.email) {
          _push(ssrRenderComponent(_sfc_main$l$1, {
            variant: unref(ButtonVariantOptions).confirm,
            size: unref(ButtonSizeOptions).medium,
            category: unref(ButtonCategoryOptions).secondary,
            label: unref(t)("auth.wallet.disconnect"),
            class: "tw-flex-shrink-0",
            onClick: onDisconnect
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$l$1, {
          variant: unref(ButtonVariantOptions).confirm,
          size: unref(ButtonSizeOptions).medium,
          label: unref(t)("common.buttons.setAddress"),
          onClick: onSetAddress
        }, null, _parent));
      }
      _push(`</div><hr class="tw-text-primary-600 tw-my-7.5">`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/settings/account-info/components/AccountInformation.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var inlineStyles$1 = {
  root: {
    position: "relative"
  }
};
var classes$2 = {
  root: function root(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-inputswitch p-component", {
      "p-highlight": instance.checked,
      "p-disabled": props.disabled,
      "p-invalid": props.invalid
    }];
  },
  input: "p-inputswitch-input",
  slider: "p-inputswitch-slider"
};
var InputSwitchStyle = BaseStyle.extend({
  name: "inputswitch",
  classes: classes$2,
  inlineStyles: inlineStyles$1
});
var script$1$2 = {
  name: "BaseInputSwitch",
  "extends": script$a,
  props: {
    modelValue: {
      type: null,
      "default": false
    },
    trueValue: {
      type: null,
      "default": true
    },
    falseValue: {
      type: null,
      "default": false
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    tabindex: {
      type: Number,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: InputSwitchStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  }
};
var script$6 = {
  name: "InputSwitch",
  "extends": script$1$2,
  inheritAttrs: false,
  emits: ["update:modelValue", "change", "focus", "blur"],
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      if (!this.disabled && !this.readonly) {
        var newValue = this.checked ? this.falseValue : this.trueValue;
        this.$emit("update:modelValue", newValue);
        this.$emit("change", event);
      }
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event);
    },
    onBlur: function onBlur(event) {
      this.$emit("blur", event);
    }
  },
  computed: {
    checked: function checked() {
      return this.modelValue === this.trueValue;
    }
  }
};
var _hoisted_1$5 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_2$4 = ["id", "checked", "tabindex", "disabled", "readonly", "aria-checked", "aria-labelledby", "aria-label", "aria-invalid"];
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    style: _ctx.sx("root")
  }, $options.getPTOptions("root"), {
    "data-p-highlight": $options.checked,
    "data-p-disabled": _ctx.disabled
  }), [createElementVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    role: "switch",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    "aria-checked": $options.checked,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || void 0,
    onFocus: _cache[0] || (_cache[0] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[1] || (_cache[1] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onChange: _cache[2] || (_cache[2] = function() {
      return $options.onChange && $options.onChange.apply($options, arguments);
    })
  }, $options.getPTOptions("input")), null, 16, _hoisted_2$4), createElementVNode("span", mergeProps({
    "class": _ctx.cx("slider")
  }, $options.getPTOptions("slider")), null, 16)], 16, _hoisted_1$5);
}
script$6.render = render$5;
const inputswitch_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DeFormInputSwitch",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    disabled: { type: Boolean }
  }, {
    "modelValue": { type: [String, Boolean] },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const checked2 = useModel(__props, "modelValue");
    const ptClasses = computed(() => {
      return {
        root: "de-form-input-switch",
        input: "de-form-input-switch-input",
        slider: "de-form-input-switch-slider"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_input_switch = script$6;
      _push(ssrRenderComponent(_component_prime_input_switch, mergeProps({
        modelValue: checked2.value,
        "onUpdate:modelValue": ($event) => checked2.value = $event,
        disabled: _ctx.disabled,
        pt: ptClasses.value,
        class: { "is-disabled": _ctx.disabled, "is-checked": !!checked2.value }
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/form/DeFormInputSwitch.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "SecuritySettings",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const userStore = useUserStore();
    const store = useAppStore();
    const isEmailAddressVerificationOn = ref(true);
    const isChangePasswordDialogVisible = ref(false);
    function toggleChangePasswordDialog(isVisible) {
      isChangePasswordDialogVisible.value = isVisible;
    }
    const onContactUsClick = () => {
      store.showCustomerService(true);
    };
    ref(false);
    useLogin();
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_client_only = __nuxt_component_0$2$1;
      _push(`<!--[--><header class="heading-h2 tw-mb-7.5">${ssrInterpolate(unref(t)("user.settings.security.title"))}</header><div class="tw-flex tw-gap-5 lg:tw-gap-20 tw-items-start tw-justify-between tw-mb-7.5"><div class="tw-flex tw-flex-col tw-gap-y-1.5"><p class="heading-h5">${ssrInterpolate(unref(t)("user.settings.security.emailAddressVerification.title"))}</p>`);
      if (unref(userStore).user.email) {
        _push(ssrRenderComponent(_component_i18n_t, {
          keypath: "user.settings.profile.accountInfo.emailChangeHint",
          tag: "p",
          class: "body-b1 tw-text-primary-300",
          scope: "global"
        }, {
          link: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="tw-capitalize tw-font-semibold tw-underline tw-cursor-pointer"${_scopeId}>${ssrInterpolate(unref(t)("common.customerService"))}</button>`);
            } else {
              return [
                createVNode("button", {
                  class: "tw-capitalize tw-font-semibold tw-underline tw-cursor-pointer",
                  onClick: onContactUsClick
                }, toDisplayString(unref(t)("common.customerService")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="body-b1 tw-text-primary-300">${ssrInterpolate(unref(t)("user.settings.security.emailAddressVerification.hint"))}</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$l, { placement: "top" }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("user.settings.functionCannotBedisabled"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("user.settings.functionCannotBedisabled")), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$7, {
              modelValue: isEmailAddressVerificationOn.value,
              "onUpdate:modelValue": ($event) => isEmailAddressVerificationOn.value = $event,
              disabled: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$7, {
                modelValue: isEmailAddressVerificationOn.value,
                "onUpdate:modelValue": ($event) => isEmailAddressVerificationOn.value = $event,
                disabled: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(userStore).user.email) {
        _push(`<div class="tw-flex max-md:tw-flex-col tw-gap-5 tw-items-start tw-justify-between tw-mb-7.5"><div class="tw-flex tw-flex-col tw-gap-y-1.5"><p class="heading-h5">${ssrInterpolate(unref(t)("form.password"))}</p><div class="body-b1 tw-text-primary-300">${ssrInterpolate(unref(t)("user.settings.security.password.hint"))}</div></div>`);
        _push(ssrRenderComponent(_sfc_main$l$1, {
          variant: unref(ButtonVariantOptions).confirm,
          size: unref(ButtonSizeOptions).medium,
          category: unref(ButtonCategoryOptions).secondary,
          label: unref(t)("user.settings.security.password.submitBtn"),
          class: "tw-flex-shrink-0",
          onClick: ($event) => toggleChangePasswordDialog(true)
        }, null, _parent));
        _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/settings/account-info/components/SecuritySettings.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "account-security",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$9, mergeProps({
        title: unref(t)("menu.user.accountSecurity")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$8, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$8),
              createVNode(_sfc_main$6)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/account-security.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const accountSecurity = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const DISPLAY_NAME_MAX_LENGTH = 20;
const DISPLAY_BIO_MAX_LENGTH = 160;
var script$5 = {
  name: "CalendarIcon",
  "extends": script$8$1
};
var _hoisted_1$4 = /* @__PURE__ */ createElementVNode("path", {
  d: "M10.7838 1.51351H9.83783V0.567568C9.83783 0.417039 9.77804 0.272676 9.6716 0.166237C9.56516 0.0597971 9.42079 0 9.27027 0C9.11974 0 8.97538 0.0597971 8.86894 0.166237C8.7625 0.272676 8.7027 0.417039 8.7027 0.567568V1.51351H5.29729V0.567568C5.29729 0.417039 5.2375 0.272676 5.13106 0.166237C5.02462 0.0597971 4.88025 0 4.72973 0C4.5792 0 4.43484 0.0597971 4.3284 0.166237C4.22196 0.272676 4.16216 0.417039 4.16216 0.567568V1.51351H3.21621C2.66428 1.51351 2.13494 1.73277 1.74467 2.12305C1.35439 2.51333 1.13513 3.04266 1.13513 3.59459V11.9189C1.13513 12.4709 1.35439 13.0002 1.74467 13.3905C2.13494 13.7807 2.66428 14 3.21621 14H10.7838C11.3357 14 11.865 13.7807 12.2553 13.3905C12.6456 13.0002 12.8649 12.4709 12.8649 11.9189V3.59459C12.8649 3.04266 12.6456 2.51333 12.2553 2.12305C11.865 1.73277 11.3357 1.51351 10.7838 1.51351ZM3.21621 2.64865H4.16216V3.59459C4.16216 3.74512 4.22196 3.88949 4.3284 3.99593C4.43484 4.10237 4.5792 4.16216 4.72973 4.16216C4.88025 4.16216 5.02462 4.10237 5.13106 3.99593C5.2375 3.88949 5.29729 3.74512 5.29729 3.59459V2.64865H8.7027V3.59459C8.7027 3.74512 8.7625 3.88949 8.86894 3.99593C8.97538 4.10237 9.11974 4.16216 9.27027 4.16216C9.42079 4.16216 9.56516 4.10237 9.6716 3.99593C9.77804 3.88949 9.83783 3.74512 9.83783 3.59459V2.64865H10.7838C11.0347 2.64865 11.2753 2.74831 11.4527 2.92571C11.6301 3.10311 11.7297 3.34371 11.7297 3.59459V5.67568H2.27027V3.59459C2.27027 3.34371 2.36993 3.10311 2.54733 2.92571C2.72473 2.74831 2.96533 2.64865 3.21621 2.64865ZM10.7838 12.8649H3.21621C2.96533 12.8649 2.72473 12.7652 2.54733 12.5878C2.36993 12.4104 2.27027 12.1698 2.27027 11.9189V6.81081H11.7297V11.9189C11.7297 12.1698 11.6301 12.4104 11.4527 12.5878C11.2753 12.7652 11.0347 12.8649 10.7838 12.8649Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$3 = [_hoisted_1$4];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$3, 16);
}
script$5.render = render$4;
var script$4 = {
  name: "ChevronLeftIcon",
  "extends": script$8$1
};
var _hoisted_1$3 = /* @__PURE__ */ createElementVNode("path", {
  d: "M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$2 = [_hoisted_1$3];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$2, 16);
}
script$4.render = render$3;
var script$3 = {
  name: "ChevronUpIcon",
  "extends": script$8$1
};
var _hoisted_1$2 = /* @__PURE__ */ createElementVNode("path", {
  d: "M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$1 = [_hoisted_1$2];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$1, 16);
}
script$3.render = render$2;
var inlineStyles = {
  root: function root2(_ref) {
    var props = _ref.props;
    return {
      position: props.appendTo === "self" ? "relative" : void 0
    };
  }
};
var classes$1$1 = {
  root: function root3(_ref2) {
    var props = _ref2.props, state = _ref2.state;
    return ["p-calendar p-component p-inputwrapper", {
      "p-calendar-w-btn": props.showIcon && props.iconDisplay === "button",
      "p-icon-field p-icon-field-right": props.showIcon && props.iconDisplay === "input",
      "p-calendar-timeonly": props.timeOnly,
      "p-calendar-disabled": props.disabled,
      "p-invalid": props.invalid,
      "p-inputwrapper-filled": props.modelValue,
      "p-inputwrapper-focus": state.focused,
      "p-focus": state.focused || state.overlayVisible
    }];
  },
  input: function input(_ref3) {
    var props = _ref3.props, instance = _ref3.instance;
    return ["p-inputtext p-component", {
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled"
    }];
  },
  dropdownButton: "p-datepicker-trigger",
  inputIcon: "p-datepicker-trigger-icon p-input-icon",
  panel: function panel(_ref4) {
    var instance = _ref4.instance, props = _ref4.props, state = _ref4.state;
    return ["p-datepicker p-component", {
      "p-datepicker-mobile": instance.queryMatches,
      "p-datepicker-inline": props.inline,
      "p-disabled": props.disabled,
      "p-datepicker-timeonly": props.timeOnly,
      "p-datepicker-multiple-month": props.numberOfMonths > 1,
      "p-datepicker-monthpicker": state.currentView === "month",
      "p-datepicker-yearpicker": state.currentView === "year",
      "p-datepicker-touch-ui": props.touchUI,
      "p-ripple-disabled": instance.$primevue.config.ripple === false
    }];
  },
  groupContainer: "p-datepicker-group-container",
  group: "p-datepicker-group",
  header: "p-datepicker-header",
  previousButton: "p-datepicker-prev p-link",
  previousIcon: "p-datepicker-prev-icon",
  title: "p-datepicker-title",
  monthTitle: "p-datepicker-month p-link",
  yearTitle: "p-datepicker-year p-link",
  decadeTitle: "p-datepicker-decade",
  nextButton: "p-datepicker-next p-link",
  nextIcon: "p-datepicker-next-icon",
  container: "p-datepicker-calendar-container",
  table: "p-datepicker-calendar",
  weekHeader: "p-datepicker-weekheader p-disabled",
  weekNumber: "p-datepicker-weeknumber",
  weekLabelContainer: "p-disabled",
  day: function day(_ref5) {
    var date = _ref5.date;
    return [{
      "p-datepicker-other-month": date.otherMonth,
      "p-datepicker-today": date.today
    }];
  },
  dayLabel: function dayLabel(_ref6) {
    var instance = _ref6.instance, date = _ref6.date;
    return [{
      "p-highlight": instance.isSelected(date) && date.selectable,
      "p-disabled": !date.selectable
    }];
  },
  monthPicker: "p-monthpicker",
  month: function month(_ref7) {
    var instance = _ref7.instance, _month = _ref7.month, index2 = _ref7.index;
    return ["p-monthpicker-month", {
      "p-highlight": instance.isMonthSelected(index2),
      "p-disabled": !_month.selectable
    }];
  },
  yearPicker: "p-yearpicker",
  year: function year(_ref8) {
    var instance = _ref8.instance, _year = _ref8.year;
    return ["p-yearpicker-year", {
      "p-highlight": instance.isYearSelected(_year.value),
      "p-disabled": !_year.selectable
    }];
  },
  timePicker: "p-timepicker",
  hourPicker: "p-hour-picker",
  incrementButton: "p-link",
  decrementButton: "p-link",
  separatorContainer: "p-separator",
  minutePicker: "p-minute-picker",
  secondPicker: "p-second-picker",
  ampmPicker: "p-ampm-picker",
  buttonbar: "p-datepicker-buttonbar",
  todayButton: "p-button-text",
  clearButton: "p-button-text"
};
var CalendarStyle = BaseStyle.extend({
  name: "calendar",
  classes: classes$1$1,
  inlineStyles
});
var script$1$1 = {
  name: "BaseCalendar",
  "extends": script$a,
  props: {
    modelValue: null,
    selectionMode: {
      type: String,
      "default": "single"
    },
    dateFormat: {
      type: String,
      "default": null
    },
    inline: {
      type: Boolean,
      "default": false
    },
    showOtherMonths: {
      type: Boolean,
      "default": true
    },
    selectOtherMonths: {
      type: Boolean,
      "default": false
    },
    showIcon: {
      type: Boolean,
      "default": false
    },
    iconDisplay: {
      type: String,
      "default": "button"
    },
    icon: {
      type: String,
      "default": void 0
    },
    previousIcon: {
      type: String,
      "default": void 0
    },
    nextIcon: {
      type: String,
      "default": void 0
    },
    incrementIcon: {
      type: String,
      "default": void 0
    },
    decrementIcon: {
      type: String,
      "default": void 0
    },
    numberOfMonths: {
      type: Number,
      "default": 1
    },
    responsiveOptions: Array,
    breakpoint: {
      type: String,
      "default": "769px"
    },
    view: {
      type: String,
      "default": "date"
    },
    touchUI: {
      type: Boolean,
      "default": false
    },
    monthNavigator: {
      type: Boolean,
      "default": false
    },
    yearNavigator: {
      type: Boolean,
      "default": false
    },
    yearRange: {
      type: String,
      "default": null
    },
    minDate: {
      type: Date,
      value: null
    },
    maxDate: {
      type: Date,
      value: null
    },
    disabledDates: {
      type: Array,
      value: null
    },
    disabledDays: {
      type: Array,
      value: null
    },
    maxDateCount: {
      type: Number,
      value: null
    },
    showOnFocus: {
      type: Boolean,
      "default": true
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    showButtonBar: {
      type: Boolean,
      "default": false
    },
    shortYearCutoff: {
      type: String,
      "default": "+10"
    },
    showTime: {
      type: Boolean,
      "default": false
    },
    timeOnly: {
      type: Boolean,
      "default": false
    },
    hourFormat: {
      type: String,
      "default": "24"
    },
    stepHour: {
      type: Number,
      "default": 1
    },
    stepMinute: {
      type: Number,
      "default": 1
    },
    stepSecond: {
      type: Number,
      "default": 1
    },
    showSeconds: {
      type: Boolean,
      "default": false
    },
    hideOnDateTimeSelect: {
      type: Boolean,
      "default": false
    },
    hideOnRangeSelection: {
      type: Boolean,
      "default": false
    },
    timeSeparator: {
      type: String,
      "default": ":"
    },
    showWeek: {
      type: Boolean,
      "default": false
    },
    manualInput: {
      type: Boolean,
      "default": true
    },
    appendTo: {
      type: [String, Object],
      "default": "body"
    },
    variant: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    readonly: {
      type: Boolean,
      "default": false
    },
    placeholder: {
      type: String,
      "default": null
    },
    id: {
      type: String,
      "default": null
    },
    inputId: {
      type: String,
      "default": null
    },
    inputClass: {
      type: [String, Object],
      "default": null
    },
    inputStyle: {
      type: Object,
      "default": null
    },
    inputProps: {
      type: null,
      "default": null
    },
    panelClass: {
      type: [String, Object],
      "default": null
    },
    panelStyle: {
      type: Object,
      "default": null
    },
    panelProps: {
      type: null,
      "default": null
    },
    name: {
      type: String,
      "default": null
    },
    ariaLabelledby: {
      type: String,
      "default": null
    },
    ariaLabel: {
      type: String,
      "default": null
    }
  },
  style: CalendarStyle,
  provide: function provide2() {
    return {
      $parentInstance: this
    };
  }
};
function _typeof$1$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1$1(o);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$2(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike) {
      if (it)
        o = it;
      var i = 0;
      var F = function F2() {
      };
      return { s: F, n: function n() {
        if (i >= o.length)
          return { done: true };
        return { done: false, value: o[i++] };
      }, e: function e(_e) {
        throw _e;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return { s: function s() {
    it = it.call(o);
  }, n: function n() {
    var step = it.next();
    normalCompletion = step.done;
    return step;
  }, e: function e(_e2) {
    didErr = true;
    err = _e2;
  }, f: function f() {
    try {
      if (!normalCompletion && it["return"] != null)
        it["return"]();
    } finally {
      if (didErr)
        throw err;
    }
  } };
}
function _unsupportedIterableToArray$2(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2(o, minLen);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var script$2 = {
  name: "Calendar",
  "extends": script$1$1,
  inheritAttrs: false,
  emits: ["show", "hide", "input", "month-change", "year-change", "date-select", "update:modelValue", "today-click", "clear-click", "focus", "blur", "keydown"],
  navigationState: null,
  timePickerChange: false,
  scrollHandler: null,
  outsideClickListener: null,
  maskClickListener: null,
  resizeListener: null,
  matchMediaListener: null,
  overlay: null,
  input: null,
  mask: null,
  previousButton: null,
  nextButton: null,
  timePickerTimer: null,
  preventFocus: false,
  typeUpdate: false,
  data: function data() {
    return {
      d_id: this.id,
      currentMonth: null,
      currentYear: null,
      currentHour: null,
      currentMinute: null,
      currentSecond: null,
      pm: null,
      focused: false,
      overlayVisible: false,
      currentView: this.view,
      query: null,
      queryMatches: false
    };
  },
  watch: {
    id: function id(newValue) {
      this.d_id = newValue || UniqueComponentId();
    },
    modelValue: {
      deep: true,
      handler: function handler(newValue) {
        this.updateCurrentMetaData();
        if (!this.typeUpdate && !this.inline && this.input) {
          this.input.value = this.formatValue(newValue);
        }
        this.typeUpdate = false;
      }
    },
    showTime: function showTime() {
      this.updateCurrentMetaData();
    },
    minDate: function minDate() {
      this.updateCurrentMetaData();
    },
    maxDate: function maxDate() {
      this.updateCurrentMetaData();
    },
    months: function months() {
      if (this.overlay) {
        if (!this.focused) {
          if (this.inline) {
            this.preventFocus = true;
          }
          setTimeout(this.updateFocus, 0);
        }
      }
    },
    numberOfMonths: function numberOfMonths() {
      this.destroyResponsiveStyleElement();
      this.createResponsiveStyle();
    },
    responsiveOptions: function responsiveOptions() {
      this.destroyResponsiveStyleElement();
      this.createResponsiveStyle();
    },
    currentView: function currentView() {
      var _this = this;
      Promise.resolve(null).then(function() {
        return _this.alignOverlay();
      });
    },
    view: function view(newValue) {
      this.currentView = newValue;
    }
  },
  created: function created() {
    this.updateCurrentMetaData();
  },
  mounted: function mounted() {
    this.d_id = this.d_id || UniqueComponentId();
    this.createResponsiveStyle();
    this.bindMatchMediaListener();
    if (this.inline) {
      this.overlay && this.overlay.setAttribute(this.attributeSelector, "");
      if (!this.disabled) {
        this.preventFocus = true;
        this.initFocusableCell();
      }
    } else {
      this.input.value = this.formatValue(this.modelValue);
    }
  },
  updated: function updated() {
    if (this.overlay) {
      this.preventFocus = true;
      setTimeout(this.updateFocus, 0);
    }
    if (this.input && this.selectionStart != null && this.selectionEnd != null) {
      this.input.selectionStart = this.selectionStart;
      this.input.selectionEnd = this.selectionEnd;
      this.selectionStart = null;
      this.selectionEnd = null;
    }
  },
  beforeUnmount: function beforeUnmount() {
    if (this.timePickerTimer) {
      clearTimeout(this.timePickerTimer);
    }
    if (this.mask) {
      this.destroyMask();
    }
    this.destroyResponsiveStyleElement();
    this.unbindOutsideClickListener();
    this.unbindResizeListener();
    this.unbindMatchMediaListener();
    if (this.scrollHandler) {
      this.scrollHandler.destroy();
      this.scrollHandler = null;
    }
    if (this.overlay && this.autoZIndex) {
      ZIndexUtils.clear(this.overlay);
    }
    this.overlay = null;
  },
  methods: {
    isComparable: function isComparable() {
      return this.modelValue != null && typeof this.modelValue !== "string";
    },
    isSelected: function isSelected(dateMeta) {
      if (!this.isComparable()) {
        return false;
      }
      if (this.modelValue) {
        if (this.isSingleSelection()) {
          return this.isDateEquals(this.modelValue, dateMeta);
        } else if (this.isMultipleSelection()) {
          var selected = false;
          var _iterator = _createForOfIteratorHelper(this.modelValue), _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var date = _step.value;
              selected = this.isDateEquals(date, dateMeta);
              if (selected) {
                break;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return selected;
        } else if (this.isRangeSelection()) {
          if (this.modelValue[1])
            return this.isDateEquals(this.modelValue[0], dateMeta) || this.isDateEquals(this.modelValue[1], dateMeta) || this.isDateBetween(this.modelValue[0], this.modelValue[1], dateMeta);
          else {
            return this.isDateEquals(this.modelValue[0], dateMeta);
          }
        }
      }
      return false;
    },
    isMonthSelected: function isMonthSelected(month2) {
      var _this2 = this;
      if (this.isComparable()) {
        var value = this.isRangeSelection() ? this.modelValue[0] : this.modelValue;
        if (this.isMultipleSelection()) {
          return value.some(function(currentValue) {
            return currentValue.getMonth() === month2 && currentValue.getFullYear() === _this2.currentYear;
          });
        } else {
          return value.getMonth() === month2 && value.getFullYear() === this.currentYear;
        }
      }
      return false;
    },
    isYearSelected: function isYearSelected(year2) {
      if (this.isComparable()) {
        var value = this.isRangeSelection() ? this.modelValue[0] : this.modelValue;
        if (this.isMultipleSelection()) {
          return value.some(function(currentValue) {
            return currentValue.getFullYear() === year2;
          });
        } else {
          return value.getFullYear() === year2;
        }
      }
      return false;
    },
    isDateEquals: function isDateEquals(value, dateMeta) {
      if (value)
        return value.getDate() === dateMeta.day && value.getMonth() === dateMeta.month && value.getFullYear() === dateMeta.year;
      else
        return false;
    },
    isDateBetween: function isDateBetween(start, end, dateMeta) {
      var between = false;
      if (start && end) {
        var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
        return start.getTime() <= date.getTime() && end.getTime() >= date.getTime();
      }
      return between;
    },
    getFirstDayOfMonthIndex: function getFirstDayOfMonthIndex(month2, year2) {
      var day2 = /* @__PURE__ */ new Date();
      day2.setDate(1);
      day2.setMonth(month2);
      day2.setFullYear(year2);
      var dayIndex = day2.getDay() + this.sundayIndex;
      return dayIndex >= 7 ? dayIndex - 7 : dayIndex;
    },
    getDaysCountInMonth: function getDaysCountInMonth(month2, year2) {
      return 32 - this.daylightSavingAdjust(new Date(year2, month2, 32)).getDate();
    },
    getDaysCountInPrevMonth: function getDaysCountInPrevMonth(month2, year2) {
      var prev = this.getPreviousMonthAndYear(month2, year2);
      return this.getDaysCountInMonth(prev.month, prev.year);
    },
    getPreviousMonthAndYear: function getPreviousMonthAndYear(month2, year2) {
      var m, y;
      if (month2 === 0) {
        m = 11;
        y = year2 - 1;
      } else {
        m = month2 - 1;
        y = year2;
      }
      return {
        month: m,
        year: y
      };
    },
    getNextMonthAndYear: function getNextMonthAndYear(month2, year2) {
      var m, y;
      if (month2 === 11) {
        m = 0;
        y = year2 + 1;
      } else {
        m = month2 + 1;
        y = year2;
      }
      return {
        month: m,
        year: y
      };
    },
    daylightSavingAdjust: function daylightSavingAdjust(date) {
      if (!date) {
        return null;
      }
      date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
      return date;
    },
    isToday: function isToday(today, day2, month2, year2) {
      return today.getDate() === day2 && today.getMonth() === month2 && today.getFullYear() === year2;
    },
    isSelectable: function isSelectable(day2, month2, year2, otherMonth) {
      var validMin = true;
      var validMax = true;
      var validDate = true;
      var validDay = true;
      if (otherMonth && !this.selectOtherMonths) {
        return false;
      }
      if (this.minDate) {
        if (this.minDate.getFullYear() > year2) {
          validMin = false;
        } else if (this.minDate.getFullYear() === year2) {
          if (this.minDate.getMonth() > month2) {
            validMin = false;
          } else if (this.minDate.getMonth() === month2) {
            if (this.minDate.getDate() > day2) {
              validMin = false;
            }
          }
        }
      }
      if (this.maxDate) {
        if (this.maxDate.getFullYear() < year2) {
          validMax = false;
        } else if (this.maxDate.getFullYear() === year2) {
          if (this.maxDate.getMonth() < month2) {
            validMax = false;
          } else if (this.maxDate.getMonth() === month2) {
            if (this.maxDate.getDate() < day2) {
              validMax = false;
            }
          }
        }
      }
      if (this.disabledDates) {
        validDate = !this.isDateDisabled(day2, month2, year2);
      }
      if (this.disabledDays) {
        validDay = !this.isDayDisabled(day2, month2, year2);
      }
      return validMin && validMax && validDate && validDay;
    },
    onOverlayEnter: function onOverlayEnter(el) {
      el.setAttribute(this.attributeSelector, "");
      var styles = this.touchUI ? {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      } : !this.inline ? {
        position: "absolute",
        top: "0",
        left: "0"
      } : void 0;
      DomHandler.addStyles(el, styles);
      if (this.autoZIndex) {
        if (this.touchUI)
          ZIndexUtils.set("modal", el, this.baseZIndex || this.$primevue.config.zIndex.modal);
        else
          ZIndexUtils.set("overlay", el, this.baseZIndex || this.$primevue.config.zIndex.overlay);
      }
      this.alignOverlay();
      this.$emit("show");
    },
    onOverlayEnterComplete: function onOverlayEnterComplete() {
      this.bindOutsideClickListener();
      this.bindScrollListener();
      this.bindResizeListener();
    },
    onOverlayAfterLeave: function onOverlayAfterLeave(el) {
      if (this.autoZIndex) {
        ZIndexUtils.clear(el);
      }
    },
    onOverlayLeave: function onOverlayLeave() {
      this.currentView = this.view;
      this.unbindOutsideClickListener();
      this.unbindScrollListener();
      this.unbindResizeListener();
      this.$emit("hide");
      if (this.mask) {
        this.disableModality();
      }
      this.overlay = null;
    },
    onPrevButtonClick: function onPrevButtonClick(event) {
      if (this.showOtherMonths) {
        this.navigationState = {
          backward: true,
          button: true
        };
        this.navBackward(event);
      }
    },
    onNextButtonClick: function onNextButtonClick(event) {
      if (this.showOtherMonths) {
        this.navigationState = {
          backward: false,
          button: true
        };
        this.navForward(event);
      }
    },
    navBackward: function navBackward(event) {
      event.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.currentView === "month") {
        this.decrementYear();
        this.$emit("year-change", {
          month: this.currentMonth,
          year: this.currentYear
        });
      } else if (this.currentView === "year") {
        this.decrementDecade();
      } else {
        if (event.shiftKey) {
          this.decrementYear();
        } else {
          if (this.currentMonth === 0) {
            this.currentMonth = 11;
            this.decrementYear();
          } else {
            this.currentMonth--;
          }
          this.$emit("month-change", {
            month: this.currentMonth + 1,
            year: this.currentYear
          });
        }
      }
    },
    navForward: function navForward(event) {
      event.preventDefault();
      if (!this.isEnabled()) {
        return;
      }
      if (this.currentView === "month") {
        this.incrementYear();
        this.$emit("year-change", {
          month: this.currentMonth,
          year: this.currentYear
        });
      } else if (this.currentView === "year") {
        this.incrementDecade();
      } else {
        if (event.shiftKey) {
          this.incrementYear();
        } else {
          if (this.currentMonth === 11) {
            this.currentMonth = 0;
            this.incrementYear();
          } else {
            this.currentMonth++;
          }
          this.$emit("month-change", {
            month: this.currentMonth + 1,
            year: this.currentYear
          });
        }
      }
    },
    decrementYear: function decrementYear() {
      this.currentYear--;
    },
    decrementDecade: function decrementDecade() {
      this.currentYear = this.currentYear - 10;
    },
    incrementYear: function incrementYear() {
      this.currentYear++;
    },
    incrementDecade: function incrementDecade() {
      this.currentYear = this.currentYear + 10;
    },
    switchToMonthView: function switchToMonthView(event) {
      this.currentView = "month";
      setTimeout(this.updateFocus, 0);
      event.preventDefault();
    },
    switchToYearView: function switchToYearView(event) {
      this.currentView = "year";
      setTimeout(this.updateFocus, 0);
      event.preventDefault();
    },
    isEnabled: function isEnabled() {
      return !this.disabled && !this.readonly;
    },
    updateCurrentTimeMeta: function updateCurrentTimeMeta(date) {
      var currentHour = date.getHours();
      if (this.hourFormat === "12") {
        this.pm = currentHour > 11;
        if (currentHour >= 12)
          currentHour = currentHour == 12 ? 12 : currentHour - 12;
        else
          currentHour = currentHour == 0 ? 12 : currentHour;
      }
      this.currentHour = Math.floor(currentHour / this.stepHour) * this.stepHour;
      this.currentMinute = Math.floor(date.getMinutes() / this.stepMinute) * this.stepMinute;
      this.currentSecond = Math.floor(date.getSeconds() / this.stepSecond) * this.stepSecond;
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this3 = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function(event) {
          if (_this3.overlayVisible && _this3.isOutsideClicked(event)) {
            _this3.overlayVisible = false;
          }
        };
        (void 0).addEventListener("mousedown", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        (void 0).removeEventListener("mousedown", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    bindScrollListener: function bindScrollListener() {
      var _this4 = this;
      if (!this.scrollHandler) {
        this.scrollHandler = new ConnectedOverlayScrollHandler(this.$refs.container, function() {
          if (_this4.overlayVisible) {
            _this4.overlayVisible = false;
          }
        });
      }
      this.scrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    },
    bindResizeListener: function bindResizeListener() {
      var _this5 = this;
      if (!this.resizeListener) {
        this.resizeListener = function() {
          if (_this5.overlayVisible && !DomHandler.isTouchDevice()) {
            _this5.overlayVisible = false;
          }
        };
        (void 0).addEventListener("resize", this.resizeListener);
      }
    },
    unbindResizeListener: function unbindResizeListener() {
      if (this.resizeListener) {
        (void 0).removeEventListener("resize", this.resizeListener);
        this.resizeListener = null;
      }
    },
    bindMatchMediaListener: function bindMatchMediaListener() {
      var _this6 = this;
      if (!this.matchMediaListener) {
        var query = matchMedia("(max-width: ".concat(this.breakpoint, ")"));
        this.query = query;
        this.queryMatches = query.matches;
        this.matchMediaListener = function() {
          _this6.queryMatches = query.matches;
          _this6.mobileActive = false;
        };
        this.query.addEventListener("change", this.matchMediaListener);
      }
    },
    unbindMatchMediaListener: function unbindMatchMediaListener() {
      if (this.matchMediaListener) {
        this.query.removeEventListener("change", this.matchMediaListener);
        this.matchMediaListener = null;
      }
    },
    isOutsideClicked: function isOutsideClicked(event) {
      return !(this.$el.isSameNode(event.target) || this.isNavIconClicked(event) || this.$el.contains(event.target) || this.overlay && this.overlay.contains(event.target));
    },
    isNavIconClicked: function isNavIconClicked(event) {
      return this.previousButton && (this.previousButton.isSameNode(event.target) || this.previousButton.contains(event.target)) || this.nextButton && (this.nextButton.isSameNode(event.target) || this.nextButton.contains(event.target));
    },
    alignOverlay: function alignOverlay() {
      if (this.touchUI) {
        this.enableModality();
      } else if (this.overlay) {
        if (this.appendTo === "self" || this.inline) {
          DomHandler.relativePosition(this.overlay, this.$el);
        } else {
          if (this.view === "date") {
            this.overlay.style.width = DomHandler.getOuterWidth(this.overlay) + "px";
            this.overlay.style.minWidth = DomHandler.getOuterWidth(this.$el) + "px";
          } else {
            this.overlay.style.width = DomHandler.getOuterWidth(this.$el) + "px";
          }
          DomHandler.absolutePosition(this.overlay, this.$el);
        }
      }
    },
    onButtonClick: function onButtonClick() {
      if (this.isEnabled()) {
        if (!this.overlayVisible) {
          this.input.focus();
          this.overlayVisible = true;
        } else {
          this.overlayVisible = false;
        }
      }
    },
    isDateDisabled: function isDateDisabled(day2, month2, year2) {
      if (this.disabledDates) {
        var _iterator2 = _createForOfIteratorHelper(this.disabledDates), _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
            var disabledDate = _step2.value;
            if (disabledDate.getFullYear() === year2 && disabledDate.getMonth() === month2 && disabledDate.getDate() === day2) {
              return true;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return false;
    },
    isDayDisabled: function isDayDisabled(day2, month2, year2) {
      if (this.disabledDays) {
        var weekday = new Date(year2, month2, day2);
        var weekdayNumber = weekday.getDay();
        return this.disabledDays.indexOf(weekdayNumber) !== -1;
      }
      return false;
    },
    onMonthDropdownChange: function onMonthDropdownChange(value) {
      this.currentMonth = parseInt(value);
      this.$emit("month-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      });
    },
    onYearDropdownChange: function onYearDropdownChange(value) {
      this.currentYear = parseInt(value);
      this.$emit("year-change", {
        month: this.currentMonth + 1,
        year: this.currentYear
      });
    },
    onDateSelect: function onDateSelect(event, dateMeta) {
      var _this7 = this;
      if (this.disabled || !dateMeta.selectable) {
        return;
      }
      DomHandler.find(this.overlay, 'table td span:not([data-p-disabled="true"])').forEach(function(cell) {
        return cell.tabIndex = -1;
      });
      if (event) {
        event.currentTarget.focus();
      }
      if (this.isMultipleSelection() && this.isSelected(dateMeta)) {
        var newValue = this.modelValue.filter(function(date) {
          return !_this7.isDateEquals(date, dateMeta);
        });
        this.updateModel(newValue);
      } else {
        if (this.shouldSelectDate(dateMeta)) {
          if (dateMeta.otherMonth) {
            this.currentMonth = dateMeta.month;
            this.currentYear = dateMeta.year;
            this.selectDate(dateMeta);
          } else {
            this.selectDate(dateMeta);
          }
        }
      }
      if (this.isSingleSelection() && (!this.showTime || this.hideOnDateTimeSelect)) {
        setTimeout(function() {
          if (_this7.input) {
            _this7.input.focus();
          }
          _this7.overlayVisible = false;
        }, 150);
      }
    },
    selectDate: function selectDate(dateMeta) {
      var _this8 = this;
      var date = new Date(dateMeta.year, dateMeta.month, dateMeta.day);
      if (this.showTime) {
        this.hourFormat === "12" && this.currentHour !== 12 && this.pm ? date.setHours(this.currentHour + 12) : date.setHours(this.currentHour);
        date.setMinutes(this.currentMinute);
        date.setSeconds(this.currentSecond);
      }
      if (this.minDate && this.minDate > date) {
        date = this.minDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      if (this.maxDate && this.maxDate < date) {
        date = this.maxDate;
        this.currentHour = date.getHours();
        this.currentMinute = date.getMinutes();
        this.currentSecond = date.getSeconds();
      }
      var modelVal = null;
      if (this.isSingleSelection()) {
        modelVal = date;
      } else if (this.isMultipleSelection()) {
        modelVal = this.modelValue ? [].concat(_toConsumableArray(this.modelValue), [date]) : [date];
      } else if (this.isRangeSelection()) {
        if (this.modelValue && this.modelValue.length) {
          var startDate = this.modelValue[0];
          var endDate = this.modelValue[1];
          if (!endDate && date.getTime() >= startDate.getTime()) {
            endDate = date;
          } else {
            startDate = date;
            endDate = null;
          }
          modelVal = [startDate, endDate];
        } else {
          modelVal = [date, null];
        }
      }
      if (modelVal !== null) {
        this.updateModel(modelVal);
      }
      if (this.isRangeSelection() && this.hideOnRangeSelection && modelVal[1] !== null) {
        setTimeout(function() {
          _this8.overlayVisible = false;
        }, 150);
      }
      this.$emit("date-select", date);
    },
    updateModel: function updateModel(value) {
      this.$emit("update:modelValue", value);
    },
    shouldSelectDate: function shouldSelectDate() {
      if (this.isMultipleSelection())
        return this.maxDateCount != null ? this.maxDateCount > (this.modelValue ? this.modelValue.length : 0) : true;
      else
        return true;
    },
    isSingleSelection: function isSingleSelection() {
      return this.selectionMode === "single";
    },
    isRangeSelection: function isRangeSelection() {
      return this.selectionMode === "range";
    },
    isMultipleSelection: function isMultipleSelection() {
      return this.selectionMode === "multiple";
    },
    formatValue: function formatValue(value) {
      if (typeof value === "string") {
        return value;
      }
      var formattedValue = "";
      if (value) {
        try {
          if (this.isSingleSelection()) {
            formattedValue = this.formatDateTime(value);
          } else if (this.isMultipleSelection()) {
            for (var i = 0; i < value.length; i++) {
              var dateAsString = this.formatDateTime(value[i]);
              formattedValue += dateAsString;
              if (i !== value.length - 1) {
                formattedValue += ", ";
              }
            }
          } else if (this.isRangeSelection()) {
            if (value && value.length) {
              var startDate = value[0];
              var endDate = value[1];
              formattedValue = this.formatDateTime(startDate);
              if (endDate) {
                formattedValue += " - " + this.formatDateTime(endDate);
              }
            }
          }
        } catch (err) {
          formattedValue = value;
        }
      }
      return formattedValue;
    },
    formatDateTime: function formatDateTime(date) {
      var formattedValue = null;
      if (date) {
        if (this.timeOnly) {
          formattedValue = this.formatTime(date);
        } else {
          formattedValue = this.formatDate(date, this.datePattern);
          if (this.showTime) {
            formattedValue += " " + this.formatTime(date);
          }
        }
      }
      return formattedValue;
    },
    formatDate: function formatDate(date, format) {
      if (!date) {
        return "";
      }
      var iFormat;
      var lookAhead = function lookAhead2(match) {
        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      }, formatNumber = function formatNumber2(match, value, len) {
        var num = "" + value;
        if (lookAhead(match)) {
          while (num.length < len) {
            num = "0" + num;
          }
        }
        return num;
      }, formatName = function formatName2(match, value, shortNames, longNames) {
        return lookAhead(match) ? longNames[value] : shortNames[value];
      };
      var output = "";
      var literal = false;
      if (date) {
        for (iFormat = 0; iFormat < format.length; iFormat++) {
          if (literal) {
            if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
              literal = false;
            } else {
              output += format.charAt(iFormat);
            }
          } else {
            switch (format.charAt(iFormat)) {
              case "d":
                output += formatNumber("d", date.getDate(), 2);
                break;
              case "D":
                output += formatName("D", date.getDay(), this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
                break;
              case "o":
                output += formatNumber("o", Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                break;
              case "m":
                output += formatNumber("m", date.getMonth() + 1, 2);
                break;
              case "M":
                output += formatName("M", date.getMonth(), this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
                break;
              case "y":
                output += lookAhead("y") ? date.getFullYear() : (date.getFullYear() % 100 < 10 ? "0" : "") + date.getFullYear() % 100;
                break;
              case "@":
                output += date.getTime();
                break;
              case "!":
                output += date.getTime() * 1e4 + this.ticksTo1970;
                break;
              case "'":
                if (lookAhead("'")) {
                  output += "'";
                } else {
                  literal = true;
                }
                break;
              default:
                output += format.charAt(iFormat);
            }
          }
        }
      }
      return output;
    },
    formatTime: function formatTime(date) {
      if (!date) {
        return "";
      }
      var output = "";
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if (this.hourFormat === "12" && hours > 11 && hours !== 12) {
        hours -= 12;
      }
      if (this.hourFormat === "12") {
        output += hours === 0 ? 12 : hours < 10 ? "0" + hours : hours;
      } else {
        output += hours < 10 ? "0" + hours : hours;
      }
      output += ":";
      output += minutes < 10 ? "0" + minutes : minutes;
      if (this.showSeconds) {
        output += ":";
        output += seconds < 10 ? "0" + seconds : seconds;
      }
      if (this.hourFormat === "12") {
        output += date.getHours() > 11 ? " ".concat(this.$primevue.config.locale.pm) : " ".concat(this.$primevue.config.locale.am);
      }
      return output;
    },
    onTodayButtonClick: function onTodayButtonClick(event) {
      var date = /* @__PURE__ */ new Date();
      var dateMeta = {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        otherMonth: date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear,
        today: true,
        selectable: true
      };
      this.onDateSelect(null, dateMeta);
      this.$emit("today-click", date);
      event.preventDefault();
    },
    onClearButtonClick: function onClearButtonClick(event) {
      this.updateModel(null);
      this.overlayVisible = false;
      this.$emit("clear-click", event);
      event.preventDefault();
    },
    onTimePickerElementMouseDown: function onTimePickerElementMouseDown(event, type, direction) {
      if (this.isEnabled()) {
        this.repeat(event, null, type, direction);
        event.preventDefault();
      }
    },
    onTimePickerElementMouseUp: function onTimePickerElementMouseUp(event) {
      if (this.isEnabled()) {
        this.clearTimePickerTimer();
        this.updateModelTime();
        event.preventDefault();
      }
    },
    onTimePickerElementMouseLeave: function onTimePickerElementMouseLeave() {
      this.clearTimePickerTimer();
    },
    repeat: function repeat(event, interval, type, direction) {
      var _this9 = this;
      var i = interval || 500;
      this.clearTimePickerTimer();
      this.timePickerTimer = setTimeout(function() {
        _this9.repeat(event, 100, type, direction);
      }, i);
      switch (type) {
        case 0:
          if (direction === 1)
            this.incrementHour(event);
          else
            this.decrementHour(event);
          break;
        case 1:
          if (direction === 1)
            this.incrementMinute(event);
          else
            this.decrementMinute(event);
          break;
        case 2:
          if (direction === 1)
            this.incrementSecond(event);
          else
            this.decrementSecond(event);
          break;
      }
    },
    convertTo24Hour: function convertTo24Hour(hours, pm) {
      if (this.hourFormat == "12") {
        if (hours === 12) {
          return pm ? 12 : 0;
        } else {
          return pm ? hours + 12 : hours;
        }
      }
      return hours;
    },
    validateTime: function validateTime(hour, minute, second, pm) {
      var value = this.isComparable() ? this.modelValue : this.viewDate;
      var convertedHour = this.convertTo24Hour(hour, pm);
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      var valueDateString = value ? value.toDateString() : null;
      if (this.minDate && valueDateString && this.minDate.toDateString() === valueDateString) {
        if (this.minDate.getHours() > convertedHour) {
          return false;
        }
        if (this.minDate.getHours() === convertedHour) {
          if (this.minDate.getMinutes() > minute) {
            return false;
          }
          if (this.minDate.getMinutes() === minute) {
            if (this.minDate.getSeconds() > second) {
              return false;
            }
          }
        }
      }
      if (this.maxDate && valueDateString && this.maxDate.toDateString() === valueDateString) {
        if (this.maxDate.getHours() < convertedHour) {
          return false;
        }
        if (this.maxDate.getHours() === convertedHour) {
          if (this.maxDate.getMinutes() < minute) {
            return false;
          }
          if (this.maxDate.getMinutes() === minute) {
            if (this.maxDate.getSeconds() < second) {
              return false;
            }
          }
        }
      }
      return true;
    },
    incrementHour: function incrementHour(event) {
      var prevHour = this.currentHour;
      var newHour = this.currentHour + Number(this.stepHour);
      var newPM = this.pm;
      if (this.hourFormat == "24")
        newHour = newHour >= 24 ? newHour - 24 : newHour;
      else if (this.hourFormat == "12") {
        if (prevHour < 12 && newHour > 11) {
          newPM = !this.pm;
        }
        newHour = newHour >= 13 ? newHour - 12 : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event.preventDefault();
    },
    decrementHour: function decrementHour(event) {
      var newHour = this.currentHour - this.stepHour;
      var newPM = this.pm;
      if (this.hourFormat == "24")
        newHour = newHour < 0 ? 24 + newHour : newHour;
      else if (this.hourFormat == "12") {
        if (this.currentHour === 12) {
          newPM = !this.pm;
        }
        newHour = newHour <= 0 ? 12 + newHour : newHour;
      }
      if (this.validateTime(newHour, this.currentMinute, this.currentSecond, newPM)) {
        this.currentHour = newHour;
        this.pm = newPM;
      }
      event.preventDefault();
    },
    incrementMinute: function incrementMinute(event) {
      var newMinute = this.currentMinute + Number(this.stepMinute);
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
        this.currentMinute = newMinute > 59 ? newMinute - 60 : newMinute;
      }
      event.preventDefault();
    },
    decrementMinute: function decrementMinute(event) {
      var newMinute = this.currentMinute - this.stepMinute;
      newMinute = newMinute < 0 ? 60 + newMinute : newMinute;
      if (this.validateTime(this.currentHour, newMinute, this.currentSecond, this.pm)) {
        this.currentMinute = newMinute;
      }
      event.preventDefault();
    },
    incrementSecond: function incrementSecond(event) {
      var newSecond = this.currentSecond + Number(this.stepSecond);
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
        this.currentSecond = newSecond > 59 ? newSecond - 60 : newSecond;
      }
      event.preventDefault();
    },
    decrementSecond: function decrementSecond(event) {
      var newSecond = this.currentSecond - this.stepSecond;
      newSecond = newSecond < 0 ? 60 + newSecond : newSecond;
      if (this.validateTime(this.currentHour, this.currentMinute, newSecond, this.pm)) {
        this.currentSecond = newSecond;
      }
      event.preventDefault();
    },
    updateModelTime: function updateModelTime() {
      var _this10 = this;
      this.timePickerChange = true;
      var value = this.isComparable() ? this.modelValue : this.viewDate;
      if (this.isRangeSelection()) {
        value = this.modelValue[1] || this.modelValue[0];
      }
      if (this.isMultipleSelection()) {
        value = this.modelValue[this.modelValue.length - 1];
      }
      value = value ? new Date(value.getTime()) : /* @__PURE__ */ new Date();
      if (this.hourFormat == "12") {
        if (this.currentHour === 12)
          value.setHours(this.pm ? 12 : 0);
        else
          value.setHours(this.pm ? this.currentHour + 12 : this.currentHour);
      } else {
        value.setHours(this.currentHour);
      }
      value.setMinutes(this.currentMinute);
      value.setSeconds(this.currentSecond);
      if (this.isRangeSelection()) {
        if (this.modelValue[1])
          value = [this.modelValue[0], value];
        else
          value = [value, null];
      }
      if (this.isMultipleSelection()) {
        value = [].concat(_toConsumableArray(this.modelValue.slice(0, -1)), [value]);
      }
      this.updateModel(value);
      this.$emit("date-select", value);
      setTimeout(function() {
        return _this10.timePickerChange = false;
      }, 0);
    },
    toggleAMPM: function toggleAMPM(event) {
      var validHour = this.validateTime(this.currentHour, this.currentMinute, this.currentSecond, !this.pm);
      if (!validHour && (this.maxDate || this.minDate))
        return;
      this.pm = !this.pm;
      this.updateModelTime();
      event.preventDefault();
    },
    clearTimePickerTimer: function clearTimePickerTimer() {
      if (this.timePickerTimer) {
        clearInterval(this.timePickerTimer);
      }
    },
    onMonthSelect: function onMonthSelect(event, index2) {
      if (this.view === "month") {
        this.onDateSelect(event, {
          year: this.currentYear,
          month: index2,
          day: 1,
          selectable: true
        });
      } else {
        this.currentMonth = index2;
        this.currentView = "date";
        this.$emit("month-change", {
          month: this.currentMonth + 1,
          year: this.currentYear
        });
      }
      setTimeout(this.updateFocus, 0);
    },
    onYearSelect: function onYearSelect(event, year2) {
      if (this.view === "year") {
        this.onDateSelect(event, {
          year: year2.value,
          month: 0,
          day: 1,
          selectable: true
        });
      } else {
        this.currentYear = year2.value;
        this.currentView = "month";
        this.$emit("year-change", {
          month: this.currentMonth + 1,
          year: this.currentYear
        });
      }
      setTimeout(this.updateFocus, 0);
    },
    enableModality: function enableModality() {
      var _this11 = this;
      if (!this.mask) {
        var styleClass = "p-datepicker-mask p-datepicker-mask-scrollblocker p-component-overlay p-component-overlay-enter";
        this.mask = DomHandler.createElement("div", {
          "class": !this.isUnstyled && styleClass,
          "p-bind": this.ptm("datepickermask")
        });
        this.mask.style.zIndex = String(parseInt(this.overlay.style.zIndex, 10) - 1);
        this.maskClickListener = function() {
          _this11.overlayVisible = false;
        };
        this.mask.addEventListener("click", this.maskClickListener);
        (void 0).body.appendChild(this.mask);
        DomHandler.blockBodyScroll();
      }
    },
    disableModality: function disableModality() {
      var _this12 = this;
      if (this.mask) {
        if (this.isUnstyled) {
          this.destroyMask();
        } else {
          DomHandler.addClass(this.mask, "p-component-overlay-leave");
          this.mask.addEventListener("animationend", function() {
            _this12.destroyMask();
          });
        }
      }
    },
    destroyMask: function destroyMask() {
      this.mask.removeEventListener("click", this.maskClickListener);
      this.maskClickListener = null;
      (void 0).body.removeChild(this.mask);
      this.mask = null;
      var bodyChildren = (void 0).body.children;
      var hasBlockerMasks;
      for (var i = 0; i < bodyChildren.length; i++) {
        var bodyChild = bodyChildren[i];
        if (DomHandler.isAttributeEquals(bodyChild, "data-pc-section", "datepickermask")) {
          hasBlockerMasks = true;
          break;
        }
      }
      if (!hasBlockerMasks) {
        DomHandler.unblockBodyScroll();
      }
    },
    updateCurrentMetaData: function updateCurrentMetaData() {
      var viewDate2 = this.viewDate;
      this.currentMonth = viewDate2.getMonth();
      this.currentYear = viewDate2.getFullYear();
      if (this.showTime || this.timeOnly) {
        this.updateCurrentTimeMeta(viewDate2);
      }
    },
    isValidSelection: function isValidSelection(value) {
      var _this13 = this;
      if (value == null) {
        return true;
      }
      var isValid = true;
      if (this.isSingleSelection()) {
        if (!this.isSelectable(value.getDate(), value.getMonth(), value.getFullYear(), false)) {
          isValid = false;
        }
      } else if (value.every(function(v) {
        return _this13.isSelectable(v.getDate(), v.getMonth(), v.getFullYear(), false);
      })) {
        if (this.isRangeSelection()) {
          isValid = value.length > 1 && value[1] > value[0] ? true : false;
        }
      }
      return isValid;
    },
    parseValue: function parseValue(text) {
      if (!text || text.trim().length === 0) {
        return null;
      }
      var value;
      if (this.isSingleSelection()) {
        value = this.parseDateTime(text);
      } else if (this.isMultipleSelection()) {
        var tokens = text.split(",");
        value = [];
        var _iterator3 = _createForOfIteratorHelper(tokens), _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var token = _step3.value;
            value.push(this.parseDateTime(token.trim()));
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      } else if (this.isRangeSelection()) {
        var _tokens = text.split(" - ");
        value = [];
        for (var i = 0; i < _tokens.length; i++) {
          value[i] = this.parseDateTime(_tokens[i].trim());
        }
      }
      return value;
    },
    parseDateTime: function parseDateTime(text) {
      var date;
      var parts = text.split(" ");
      if (this.timeOnly) {
        date = /* @__PURE__ */ new Date();
        this.populateTime(date, parts[0], parts[1]);
      } else {
        var dateFormat = this.datePattern;
        if (this.showTime) {
          date = this.parseDate(parts[0], dateFormat);
          this.populateTime(date, parts[1], parts[2]);
        } else {
          date = this.parseDate(text, dateFormat);
        }
      }
      return date;
    },
    populateTime: function populateTime(value, timeString, ampm) {
      if (this.hourFormat == "12" && !ampm) {
        throw "Invalid Time";
      }
      this.pm = ampm === this.$primevue.config.locale.pm || ampm === this.$primevue.config.locale.pm.toLowerCase();
      var time = this.parseTime(timeString);
      value.setHours(time.hour);
      value.setMinutes(time.minute);
      value.setSeconds(time.second);
    },
    parseTime: function parseTime(value) {
      var tokens = value.split(":");
      var validTokenLength = this.showSeconds ? 3 : 2;
      var regex = /^[0-9][0-9]$/;
      if (tokens.length !== validTokenLength || !tokens[0].match(regex) || !tokens[1].match(regex) || this.showSeconds && !tokens[2].match(regex)) {
        throw "Invalid time";
      }
      var h = parseInt(tokens[0]);
      var m = parseInt(tokens[1]);
      var s = this.showSeconds ? parseInt(tokens[2]) : null;
      if (isNaN(h) || isNaN(m) || h > 23 || m > 59 || this.hourFormat == "12" && h > 12 || this.showSeconds && (isNaN(s) || s > 59)) {
        throw "Invalid time";
      } else {
        if (this.hourFormat == "12" && h !== 12 && this.pm) {
          h += 12;
        } else if (this.hourFormat == "12" && h == 12 && !this.pm) {
          h = 0;
        }
        return {
          hour: h,
          minute: m,
          second: s
        };
      }
    },
    parseDate: function parseDate(value, format) {
      if (format == null || value == null) {
        throw "Invalid arguments";
      }
      value = _typeof$1$1(value) === "object" ? value.toString() : value + "";
      if (value === "") {
        return null;
      }
      var iFormat, dim, extra, iValue = 0, shortYearCutoff = typeof this.shortYearCutoff !== "string" ? this.shortYearCutoff : (/* @__PURE__ */ new Date()).getFullYear() % 100 + parseInt(this.shortYearCutoff, 10), year2 = -1, month2 = -1, day2 = -1, doy = -1, literal = false, date, lookAhead = function lookAhead2(match) {
        var matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === match;
        if (matches) {
          iFormat++;
        }
        return matches;
      }, getNumber = function getNumber2(match) {
        var isDoubled = lookAhead(match), size = match === "@" ? 14 : match === "!" ? 20 : match === "y" && isDoubled ? 4 : match === "o" ? 3 : 2, minSize = match === "y" ? size : 1, digits = new RegExp("^\\d{" + minSize + "," + size + "}"), num = value.substring(iValue).match(digits);
        if (!num) {
          throw "Missing number at position " + iValue;
        }
        iValue += num[0].length;
        return parseInt(num[0], 10);
      }, getName = function getName2(match, shortNames, longNames) {
        var index2 = -1;
        var arr = lookAhead(match) ? longNames : shortNames;
        var names = [];
        for (var i = 0; i < arr.length; i++) {
          names.push([i, arr[i]]);
        }
        names.sort(function(a, b) {
          return -(a[1].length - b[1].length);
        });
        for (var _i = 0; _i < names.length; _i++) {
          var name = names[_i][1];
          if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
            index2 = names[_i][0];
            iValue += name.length;
            break;
          }
        }
        if (index2 !== -1) {
          return index2 + 1;
        } else {
          throw "Unknown name at position " + iValue;
        }
      }, checkLiteral = function checkLiteral2() {
        if (value.charAt(iValue) !== format.charAt(iFormat)) {
          throw "Unexpected literal at position " + iValue;
        }
        iValue++;
      };
      if (this.currentView === "month") {
        day2 = 1;
      }
      for (iFormat = 0; iFormat < format.length; iFormat++) {
        if (literal) {
          if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
            literal = false;
          } else {
            checkLiteral();
          }
        } else {
          switch (format.charAt(iFormat)) {
            case "d":
              day2 = getNumber("d");
              break;
            case "D":
              getName("D", this.$primevue.config.locale.dayNamesShort, this.$primevue.config.locale.dayNames);
              break;
            case "o":
              doy = getNumber("o");
              break;
            case "m":
              month2 = getNumber("m");
              break;
            case "M":
              month2 = getName("M", this.$primevue.config.locale.monthNamesShort, this.$primevue.config.locale.monthNames);
              break;
            case "y":
              year2 = getNumber("y");
              break;
            case "@":
              date = new Date(getNumber("@"));
              year2 = date.getFullYear();
              month2 = date.getMonth() + 1;
              day2 = date.getDate();
              break;
            case "!":
              date = new Date((getNumber("!") - this.ticksTo1970) / 1e4);
              year2 = date.getFullYear();
              month2 = date.getMonth() + 1;
              day2 = date.getDate();
              break;
            case "'":
              if (lookAhead("'")) {
                checkLiteral();
              } else {
                literal = true;
              }
              break;
            default:
              checkLiteral();
          }
        }
      }
      if (iValue < value.length) {
        extra = value.substr(iValue);
        if (!/^\s+/.test(extra)) {
          throw "Extra/unparsed characters found in date: " + extra;
        }
      }
      if (year2 === -1) {
        year2 = (/* @__PURE__ */ new Date()).getFullYear();
      } else if (year2 < 100) {
        year2 += (/* @__PURE__ */ new Date()).getFullYear() - (/* @__PURE__ */ new Date()).getFullYear() % 100 + (year2 <= shortYearCutoff ? 0 : -100);
      }
      if (doy > -1) {
        month2 = 1;
        day2 = doy;
        do {
          dim = this.getDaysCountInMonth(year2, month2 - 1);
          if (day2 <= dim) {
            break;
          }
          month2++;
          day2 -= dim;
        } while (true);
      }
      date = this.daylightSavingAdjust(new Date(year2, month2 - 1, day2));
      if (date.getFullYear() !== year2 || date.getMonth() + 1 !== month2 || date.getDate() !== day2) {
        throw "Invalid date";
      }
      return date;
    },
    getWeekNumber: function getWeekNumber(date) {
      var checkDate = new Date(date.getTime());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      var time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      return Math.floor(Math.round((time - checkDate.getTime()) / 864e5) / 7) + 1;
    },
    onDateCellKeydown: function onDateCellKeydown(event, date, groupIndex) {
      var cellContent = event.currentTarget;
      var cell = cellContent.parentElement;
      var cellIndex = DomHandler.index(cell);
      switch (event.code) {
        case "ArrowDown": {
          cellContent.tabIndex = "-1";
          var nextRow = cell.parentElement.nextElementSibling;
          if (nextRow) {
            var tableRowIndex = DomHandler.index(cell.parentElement);
            var tableRows = Array.from(cell.parentElement.parentElement.children);
            var nextTableRows = tableRows.slice(tableRowIndex + 1);
            var hasNextFocusableDate = nextTableRows.find(function(el) {
              var focusCell2 = el.children[cellIndex].children[0];
              return !DomHandler.getAttribute(focusCell2, "data-p-disabled");
            });
            if (hasNextFocusableDate) {
              var focusCell = hasNextFocusableDate.children[cellIndex].children[0];
              focusCell.tabIndex = "0";
              focusCell.focus();
            } else {
              this.navigationState = {
                backward: false
              };
              this.navForward(event);
            }
          } else {
            this.navigationState = {
              backward: false
            };
            this.navForward(event);
          }
          event.preventDefault();
          break;
        }
        case "ArrowUp": {
          cellContent.tabIndex = "-1";
          if (event.altKey) {
            this.overlayVisible = false;
            this.focused = true;
          } else {
            var prevRow = cell.parentElement.previousElementSibling;
            if (prevRow) {
              var _tableRowIndex = DomHandler.index(cell.parentElement);
              var _tableRows = Array.from(cell.parentElement.parentElement.children);
              var prevTableRows = _tableRows.slice(0, _tableRowIndex).reverse();
              var _hasNextFocusableDate = prevTableRows.find(function(el) {
                var focusCell2 = el.children[cellIndex].children[0];
                return !DomHandler.getAttribute(focusCell2, "data-p-disabled");
              });
              if (_hasNextFocusableDate) {
                var _focusCell = _hasNextFocusableDate.children[cellIndex].children[0];
                _focusCell.tabIndex = "0";
                _focusCell.focus();
              } else {
                this.navigationState = {
                  backward: true
                };
                this.navBackward(event);
              }
            } else {
              this.navigationState = {
                backward: true
              };
              this.navBackward(event);
            }
          }
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          cellContent.tabIndex = "-1";
          var prevCell = cell.previousElementSibling;
          if (prevCell) {
            var cells = Array.from(cell.parentElement.children);
            var prevCells = cells.slice(0, cellIndex).reverse();
            var _hasNextFocusableDate2 = prevCells.find(function(el) {
              var focusCell2 = el.children[0];
              return !DomHandler.getAttribute(focusCell2, "data-p-disabled");
            });
            if (_hasNextFocusableDate2) {
              var _focusCell2 = _hasNextFocusableDate2.children[0];
              _focusCell2.tabIndex = "0";
              _focusCell2.focus();
            } else {
              this.navigateToMonth(event, true, groupIndex);
            }
          } else {
            this.navigateToMonth(event, true, groupIndex);
          }
          event.preventDefault();
          break;
        }
        case "ArrowRight": {
          cellContent.tabIndex = "-1";
          var nextCell = cell.nextElementSibling;
          if (nextCell) {
            var _cells = Array.from(cell.parentElement.children);
            var nextCells = _cells.slice(cellIndex + 1);
            var _hasNextFocusableDate3 = nextCells.find(function(el) {
              var focusCell2 = el.children[0];
              return !DomHandler.getAttribute(focusCell2, "data-p-disabled");
            });
            if (_hasNextFocusableDate3) {
              var _focusCell3 = _hasNextFocusableDate3.children[0];
              _focusCell3.tabIndex = "0";
              _focusCell3.focus();
            } else {
              this.navigateToMonth(event, false, groupIndex);
            }
          } else {
            this.navigateToMonth(event, false, groupIndex);
          }
          event.preventDefault();
          break;
        }
        case "Enter":
        case "NumpadEnter":
        case "Space": {
          this.onDateSelect(event, date);
          event.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = false;
          event.preventDefault();
          break;
        }
        case "Tab": {
          if (!this.inline) {
            this.trapFocus(event);
          }
          break;
        }
        case "Home": {
          cellContent.tabIndex = "-1";
          var currentRow = cell.parentElement;
          var _focusCell4 = currentRow.children[0].children[0];
          if (DomHandler.getAttribute(_focusCell4, "data-p-disabled")) {
            this.navigateToMonth(event, true, groupIndex);
          } else {
            _focusCell4.tabIndex = "0";
            _focusCell4.focus();
          }
          event.preventDefault();
          break;
        }
        case "End": {
          cellContent.tabIndex = "-1";
          var _currentRow = cell.parentElement;
          var _focusCell5 = _currentRow.children[_currentRow.children.length - 1].children[0];
          if (DomHandler.getAttribute(_focusCell5, "data-p-disabled")) {
            this.navigateToMonth(event, false, groupIndex);
          } else {
            _focusCell5.tabIndex = "0";
            _focusCell5.focus();
          }
          event.preventDefault();
          break;
        }
        case "PageUp": {
          cellContent.tabIndex = "-1";
          if (event.shiftKey) {
            this.navigationState = {
              backward: true
            };
            this.navBackward(event);
          } else
            this.navigateToMonth(event, true, groupIndex);
          event.preventDefault();
          break;
        }
        case "PageDown": {
          cellContent.tabIndex = "-1";
          if (event.shiftKey) {
            this.navigationState = {
              backward: false
            };
            this.navForward(event);
          } else
            this.navigateToMonth(event, false, groupIndex);
          event.preventDefault();
          break;
        }
      }
    },
    navigateToMonth: function navigateToMonth(event, prev, groupIndex) {
      if (prev) {
        if (this.numberOfMonths === 1 || groupIndex === 0) {
          this.navigationState = {
            backward: true
          };
          this.navBackward(event);
        } else {
          var prevMonthContainer = this.overlay.children[groupIndex - 1];
          var cells = DomHandler.find(prevMonthContainer, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
          var focusCell = cells[cells.length - 1];
          focusCell.tabIndex = "0";
          focusCell.focus();
        }
      } else {
        if (this.numberOfMonths === 1 || groupIndex === this.numberOfMonths - 1) {
          this.navigationState = {
            backward: false
          };
          this.navForward(event);
        } else {
          var nextMonthContainer = this.overlay.children[groupIndex + 1];
          var _focusCell6 = DomHandler.findSingle(nextMonthContainer, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
          _focusCell6.tabIndex = "0";
          _focusCell6.focus();
        }
      }
    },
    onMonthCellKeydown: function onMonthCellKeydown(event, index2) {
      var cell = event.currentTarget;
      switch (event.code) {
        case "ArrowUp":
        case "ArrowDown": {
          cell.tabIndex = "-1";
          var cells = cell.parentElement.children;
          var cellIndex = DomHandler.index(cell);
          var nextCell = cells[event.code === "ArrowDown" ? cellIndex + 3 : cellIndex - 3];
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          }
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          cell.tabIndex = "-1";
          var prevCell = cell.previousElementSibling;
          if (prevCell) {
            prevCell.tabIndex = "0";
            prevCell.focus();
          } else {
            this.navigationState = {
              backward: true
            };
            this.navBackward(event);
          }
          event.preventDefault();
          break;
        }
        case "ArrowRight": {
          cell.tabIndex = "-1";
          var _nextCell = cell.nextElementSibling;
          if (_nextCell) {
            _nextCell.tabIndex = "0";
            _nextCell.focus();
          } else {
            this.navigationState = {
              backward: false
            };
            this.navForward(event);
          }
          event.preventDefault();
          break;
        }
        case "PageUp": {
          if (event.shiftKey)
            return;
          this.navigationState = {
            backward: true
          };
          this.navBackward(event);
          break;
        }
        case "PageDown": {
          if (event.shiftKey)
            return;
          this.navigationState = {
            backward: false
          };
          this.navForward(event);
          break;
        }
        case "Enter":
        case "NumpadEnter":
        case "Space": {
          this.onMonthSelect(event, index2);
          event.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = false;
          event.preventDefault();
          break;
        }
        case "Tab": {
          this.trapFocus(event);
          break;
        }
      }
    },
    onYearCellKeydown: function onYearCellKeydown(event, index2) {
      var cell = event.currentTarget;
      switch (event.code) {
        case "ArrowUp":
        case "ArrowDown": {
          cell.tabIndex = "-1";
          var cells = cell.parentElement.children;
          var cellIndex = DomHandler.index(cell);
          var nextCell = cells[event.code === "ArrowDown" ? cellIndex + 2 : cellIndex - 2];
          if (nextCell) {
            nextCell.tabIndex = "0";
            nextCell.focus();
          }
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          cell.tabIndex = "-1";
          var prevCell = cell.previousElementSibling;
          if (prevCell) {
            prevCell.tabIndex = "0";
            prevCell.focus();
          } else {
            this.navigationState = {
              backward: true
            };
            this.navBackward(event);
          }
          event.preventDefault();
          break;
        }
        case "ArrowRight": {
          cell.tabIndex = "-1";
          var _nextCell2 = cell.nextElementSibling;
          if (_nextCell2) {
            _nextCell2.tabIndex = "0";
            _nextCell2.focus();
          } else {
            this.navigationState = {
              backward: false
            };
            this.navForward(event);
          }
          event.preventDefault();
          break;
        }
        case "PageUp": {
          if (event.shiftKey)
            return;
          this.navigationState = {
            backward: true
          };
          this.navBackward(event);
          break;
        }
        case "PageDown": {
          if (event.shiftKey)
            return;
          this.navigationState = {
            backward: false
          };
          this.navForward(event);
          break;
        }
        case "Enter":
        case "NumpadEnter":
        case "Space": {
          this.onYearSelect(event, index2);
          event.preventDefault();
          break;
        }
        case "Escape": {
          this.overlayVisible = false;
          event.preventDefault();
          break;
        }
        case "Tab": {
          this.trapFocus(event);
          break;
        }
      }
    },
    updateFocus: function updateFocus() {
      var cell;
      if (this.navigationState) {
        if (this.navigationState.button) {
          this.initFocusableCell();
          if (this.navigationState.backward)
            this.previousButton.focus();
          else
            this.nextButton.focus();
        } else {
          if (this.navigationState.backward) {
            var cells;
            if (this.currentView === "month") {
              cells = DomHandler.find(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"]:not([data-p-disabled="true"])');
            } else if (this.currentView === "year") {
              cells = DomHandler.find(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"]:not([data-p-disabled="true"])');
            } else {
              cells = DomHandler.find(this.overlay, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
            }
            if (cells && cells.length > 0) {
              cell = cells[cells.length - 1];
            }
          } else {
            if (this.currentView === "month") {
              cell = DomHandler.findSingle(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"]:not([data-p-disabled="true"])');
            } else if (this.currentView === "year") {
              cell = DomHandler.findSingle(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"]:not([data-p-disabled="true"])');
            } else {
              cell = DomHandler.findSingle(this.overlay, 'table td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
            }
          }
          if (cell) {
            cell.tabIndex = "0";
            cell.focus();
          }
        }
        this.navigationState = null;
      } else {
        this.initFocusableCell();
      }
    },
    initFocusableCell: function initFocusableCell() {
      var cell;
      if (this.currentView === "month") {
        var cells = DomHandler.find(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"]');
        var selectedCell = DomHandler.findSingle(this.overlay, '[data-pc-section="monthpicker"] [data-pc-section="month"][data-p-highlight="true"]');
        cells.forEach(function(cell2) {
          return cell2.tabIndex = -1;
        });
        cell = selectedCell || cells[0];
      } else if (this.currentView === "year") {
        var _cells2 = DomHandler.find(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"]');
        var _selectedCell = DomHandler.findSingle(this.overlay, '[data-pc-section="yearpicker"] [data-pc-section="year"][data-p-highlight="true"]');
        _cells2.forEach(function(cell2) {
          return cell2.tabIndex = -1;
        });
        cell = _selectedCell || _cells2[0];
      } else {
        cell = DomHandler.findSingle(this.overlay, 'span[data-p-highlight="true"]');
        if (!cell) {
          var todayCell = DomHandler.findSingle(this.overlay, 'td.p-datepicker-today span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
          if (todayCell)
            cell = todayCell;
          else
            cell = DomHandler.findSingle(this.overlay, '.p-datepicker-calendar td span:not([data-p-disabled="true"]):not([data-p-ink="true"])');
        }
      }
      if (cell) {
        cell.tabIndex = "0";
        if (!this.inline && (!this.navigationState || !this.navigationState.button) && !this.timePickerChange) {
          if (!this.manualInput)
            cell.focus();
        }
        this.preventFocus = false;
      }
    },
    trapFocus: function trapFocus(event) {
      event.preventDefault();
      var focusableElements = DomHandler.getFocusableElements(this.overlay);
      if (focusableElements && focusableElements.length > 0) {
        if (!(void 0).activeElement) {
          focusableElements[0].focus();
        } else {
          var focusedIndex = focusableElements.indexOf((void 0).activeElement);
          if (event.shiftKey) {
            if (focusedIndex === -1 || focusedIndex === 0)
              focusableElements[focusableElements.length - 1].focus();
            else
              focusableElements[focusedIndex - 1].focus();
          } else {
            if (focusedIndex === -1) {
              if (this.timeOnly) {
                focusableElements[0].focus();
              } else {
                var spanIndex = null;
                for (var i = 0; i < focusableElements.length; i++) {
                  if (focusableElements[i].tagName === "SPAN")
                    spanIndex = i;
                }
                focusableElements[spanIndex].focus();
              }
            } else if (focusedIndex === focusableElements.length - 1)
              focusableElements[0].focus();
            else
              focusableElements[focusedIndex + 1].focus();
          }
        }
      }
    },
    onContainerButtonKeydown: function onContainerButtonKeydown(event) {
      switch (event.code) {
        case "Tab":
          this.trapFocus(event);
          break;
        case "Escape":
          this.overlayVisible = false;
          event.preventDefault();
          break;
      }
      this.$emit("keydown", event);
    },
    onInput: function onInput(event) {
      try {
        this.selectionStart = this.input.selectionStart;
        this.selectionEnd = this.input.selectionEnd;
        var value = this.parseValue(event.target.value);
        if (this.isValidSelection(value)) {
          this.typeUpdate = true;
          this.updateModel(value);
        }
      } catch (err) {
      }
      this.$emit("input", event);
    },
    onInputClick: function onInputClick() {
      if (this.showOnFocus && this.isEnabled() && !this.overlayVisible) {
        this.overlayVisible = true;
      }
    },
    onFocus: function onFocus2(event) {
      if (this.showOnFocus && this.isEnabled()) {
        this.overlayVisible = true;
      }
      this.focused = true;
      this.$emit("focus", event);
    },
    onBlur: function onBlur2(event) {
      this.$emit("blur", {
        originalEvent: event,
        value: event.target.value
      });
      this.focused = false;
      event.target.value = this.formatValue(this.modelValue);
    },
    onKeyDown: function onKeyDown(event) {
      if (event.code === "ArrowDown" && this.overlay) {
        this.trapFocus(event);
      } else if (event.code === "ArrowDown" && !this.overlay) {
        this.overlayVisible = true;
      } else if (event.code === "Escape") {
        if (this.overlayVisible) {
          this.overlayVisible = false;
          event.preventDefault();
        }
      } else if (event.code === "Tab") {
        if (this.overlay) {
          DomHandler.getFocusableElements(this.overlay).forEach(function(el) {
            return el.tabIndex = "-1";
          });
        }
        if (this.overlayVisible) {
          this.overlayVisible = false;
        }
      } else if (event.code === "Enter") {
        var _event$target$value;
        if (this.manualInput && event.target.value !== null && ((_event$target$value = event.target.value) === null || _event$target$value === void 0 ? void 0 : _event$target$value.trim()) !== "") {
          try {
            var value = this.parseValue(event.target.value);
            if (this.isValidSelection(value)) {
              this.overlayVisible = false;
            }
          } catch (err) {
          }
        }
      }
    },
    overlayRef: function overlayRef(el) {
      this.overlay = el;
    },
    inputRef: function inputRef(el) {
      this.input = el;
    },
    previousButtonRef: function previousButtonRef(el) {
      this.previousButton = el;
    },
    nextButtonRef: function nextButtonRef(el) {
      this.nextButton = el;
    },
    getMonthName: function getMonthName(index2) {
      return this.$primevue.config.locale.monthNames[index2];
    },
    getYear: function getYear(month2) {
      return this.currentView === "month" ? this.currentYear : month2.year;
    },
    onOverlayClick: function onOverlayClick(event) {
      if (!this.inline) {
        OverlayEventBus.emit("overlay-click", {
          originalEvent: event,
          target: this.$el
        });
      }
    },
    onOverlayKeyDown: function onOverlayKeyDown(event) {
      switch (event.code) {
        case "Escape":
          if (!this.inline) {
            this.input.focus();
            this.overlayVisible = false;
          }
          break;
      }
    },
    onOverlayMouseUp: function onOverlayMouseUp(event) {
      this.onOverlayClick(event);
    },
    createResponsiveStyle: function createResponsiveStyle() {
      if (this.numberOfMonths > 1 && this.responsiveOptions && !this.isUnstyled) {
        if (!this.responsiveStyleElement) {
          var _this$$primevue;
          this.responsiveStyleElement = (void 0).createElement("style");
          this.responsiveStyleElement.type = "text/css";
          DomHandler.setAttribute(this.responsiveStyleElement, "nonce", (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.csp) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.nonce);
          (void 0).body.appendChild(this.responsiveStyleElement);
        }
        var innerHTML = "";
        if (this.responsiveOptions) {
          var comparer = ObjectUtils.localeComparator();
          var responsiveOptions2 = _toConsumableArray(this.responsiveOptions).filter(function(o) {
            return !!(o.breakpoint && o.numMonths);
          }).sort(function(o1, o2) {
            return -1 * comparer(o1.breakpoint, o2.breakpoint);
          });
          for (var i = 0; i < responsiveOptions2.length; i++) {
            var _responsiveOptions$i = responsiveOptions2[i], breakpoint = _responsiveOptions$i.breakpoint, numMonths = _responsiveOptions$i.numMonths;
            var styles = "\n                            .p-datepicker[".concat(this.attributeSelector, "] .p-datepicker-group:nth-child(").concat(numMonths, ") .p-datepicker-next {\n                                display: inline-flex;\n                            }\n                        ");
            for (var j = numMonths; j < this.numberOfMonths; j++) {
              styles += "\n                                .p-datepicker[".concat(this.attributeSelector, "] .p-datepicker-group:nth-child(").concat(j + 1, ") {\n                                    display: none;\n                                }\n                            ");
            }
            innerHTML += "\n                            @media screen and (max-width: ".concat(breakpoint, ") {\n                                ").concat(styles, "\n                            }\n                        ");
          }
        }
        this.responsiveStyleElement.innerHTML = innerHTML;
      }
    },
    destroyResponsiveStyleElement: function destroyResponsiveStyleElement() {
      if (this.responsiveStyleElement) {
        this.responsiveStyleElement.remove();
        this.responsiveStyleElement = null;
      }
    }
  },
  computed: {
    viewDate: function viewDate() {
      var propValue = this.modelValue;
      if (propValue && Array.isArray(propValue)) {
        if (this.isRangeSelection()) {
          propValue = this.inline ? propValue[0] : propValue[1] || propValue[0];
        } else if (this.isMultipleSelection()) {
          propValue = propValue[propValue.length - 1];
        }
      }
      if (propValue && typeof propValue !== "string") {
        return propValue;
      } else {
        var today = /* @__PURE__ */ new Date();
        if (this.maxDate && this.maxDate < today) {
          return this.maxDate;
        }
        if (this.minDate && this.minDate > today) {
          return this.minDate;
        }
        return today;
      }
    },
    inputFieldValue: function inputFieldValue() {
      return this.formatValue(this.modelValue);
    },
    months: function months2() {
      var months3 = [];
      for (var i = 0; i < this.numberOfMonths; i++) {
        var month2 = this.currentMonth + i;
        var year2 = this.currentYear;
        if (month2 > 11) {
          month2 = month2 % 11 - 1;
          year2 = year2 + 1;
        }
        var dates = [];
        var firstDay = this.getFirstDayOfMonthIndex(month2, year2);
        var daysLength = this.getDaysCountInMonth(month2, year2);
        var prevMonthDaysLength = this.getDaysCountInPrevMonth(month2, year2);
        var dayNo = 1;
        var today = /* @__PURE__ */ new Date();
        var weekNumbers = [];
        var monthRows = Math.ceil((daysLength + firstDay) / 7);
        for (var _i2 = 0; _i2 < monthRows; _i2++) {
          var week = [];
          if (_i2 == 0) {
            for (var j = prevMonthDaysLength - firstDay + 1; j <= prevMonthDaysLength; j++) {
              var prev = this.getPreviousMonthAndYear(month2, year2);
              week.push({
                day: j,
                month: prev.month,
                year: prev.year,
                otherMonth: true,
                today: this.isToday(today, j, prev.month, prev.year),
                selectable: this.isSelectable(j, prev.month, prev.year, true)
              });
            }
            var remainingDaysLength = 7 - week.length;
            for (var _j = 0; _j < remainingDaysLength; _j++) {
              week.push({
                day: dayNo,
                month: month2,
                year: year2,
                today: this.isToday(today, dayNo, month2, year2),
                selectable: this.isSelectable(dayNo, month2, year2, false)
              });
              dayNo++;
            }
          } else {
            for (var _j2 = 0; _j2 < 7; _j2++) {
              if (dayNo > daysLength) {
                var next = this.getNextMonthAndYear(month2, year2);
                week.push({
                  day: dayNo - daysLength,
                  month: next.month,
                  year: next.year,
                  otherMonth: true,
                  today: this.isToday(today, dayNo - daysLength, next.month, next.year),
                  selectable: this.isSelectable(dayNo - daysLength, next.month, next.year, true)
                });
              } else {
                week.push({
                  day: dayNo,
                  month: month2,
                  year: year2,
                  today: this.isToday(today, dayNo, month2, year2),
                  selectable: this.isSelectable(dayNo, month2, year2, false)
                });
              }
              dayNo++;
            }
          }
          if (this.showWeek) {
            weekNumbers.push(this.getWeekNumber(new Date(week[0].year, week[0].month, week[0].day)));
          }
          dates.push(week);
        }
        months3.push({
          month: month2,
          year: year2,
          dates,
          weekNumbers
        });
      }
      return months3;
    },
    weekDays: function weekDays() {
      var weekDays2 = [];
      var dayIndex = this.$primevue.config.locale.firstDayOfWeek;
      for (var i = 0; i < 7; i++) {
        weekDays2.push(this.$primevue.config.locale.dayNamesMin[dayIndex]);
        dayIndex = dayIndex == 6 ? 0 : ++dayIndex;
      }
      return weekDays2;
    },
    ticksTo1970: function ticksTo1970() {
      return ((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 1e7;
    },
    sundayIndex: function sundayIndex() {
      return this.$primevue.config.locale.firstDayOfWeek > 0 ? 7 - this.$primevue.config.locale.firstDayOfWeek : 0;
    },
    datePattern: function datePattern() {
      return this.dateFormat || this.$primevue.config.locale.dateFormat;
    },
    yearOptions: function yearOptions() {
      if (this.yearRange) {
        var $vm = this;
        var years = this.yearRange.split(":");
        var yearStart = parseInt(years[0]);
        var yearEnd = parseInt(years[1]);
        var yearOptions2 = [];
        if (this.currentYear < yearStart) {
          $vm.currentYear = yearEnd;
        } else if (this.currentYear > yearEnd) {
          $vm.currentYear = yearStart;
        }
        for (var i = yearStart; i <= yearEnd; i++) {
          yearOptions2.push(i);
        }
        return yearOptions2;
      } else {
        return null;
      }
    },
    monthPickerValues: function monthPickerValues() {
      var _this14 = this;
      var monthPickerValues2 = [];
      var isSelectableMonth = function isSelectableMonth2(baseMonth) {
        if (_this14.minDate) {
          var minMonth = _this14.minDate.getMonth();
          var minYear = _this14.minDate.getFullYear();
          if (_this14.currentYear < minYear || _this14.currentYear === minYear && baseMonth < minMonth) {
            return false;
          }
        }
        if (_this14.maxDate) {
          var maxMonth = _this14.maxDate.getMonth();
          var maxYear = _this14.maxDate.getFullYear();
          if (_this14.currentYear > maxYear || _this14.currentYear === maxYear && baseMonth > maxMonth) {
            return false;
          }
        }
        return true;
      };
      for (var i = 0; i <= 11; i++) {
        monthPickerValues2.push({
          value: this.$primevue.config.locale.monthNamesShort[i],
          selectable: isSelectableMonth(i)
        });
      }
      return monthPickerValues2;
    },
    yearPickerValues: function yearPickerValues() {
      var _this15 = this;
      var yearPickerValues2 = [];
      var base = this.currentYear - this.currentYear % 10;
      var isSelectableYear = function isSelectableYear2(baseYear) {
        if (_this15.minDate) {
          if (_this15.minDate.getFullYear() > baseYear)
            return false;
        }
        if (_this15.maxDate) {
          if (_this15.maxDate.getFullYear() < baseYear)
            return false;
        }
        return true;
      };
      for (var i = 0; i < 10; i++) {
        yearPickerValues2.push({
          value: base + i,
          selectable: isSelectableYear(base + i)
        });
      }
      return yearPickerValues2;
    },
    formattedCurrentHour: function formattedCurrentHour() {
      return this.currentHour < 10 ? "0" + this.currentHour : this.currentHour;
    },
    formattedCurrentMinute: function formattedCurrentMinute() {
      return this.currentMinute < 10 ? "0" + this.currentMinute : this.currentMinute;
    },
    formattedCurrentSecond: function formattedCurrentSecond() {
      return this.currentSecond < 10 ? "0" + this.currentSecond : this.currentSecond;
    },
    todayLabel: function todayLabel() {
      return this.$primevue.config.locale.today;
    },
    clearLabel: function clearLabel() {
      return this.$primevue.config.locale.clear;
    },
    weekHeaderLabel: function weekHeaderLabel() {
      return this.$primevue.config.locale.weekHeader;
    },
    monthNames: function monthNames() {
      return this.$primevue.config.locale.monthNames;
    },
    attributeSelector: function attributeSelector() {
      return UniqueComponentId();
    },
    switchViewButtonDisabled: function switchViewButtonDisabled() {
      return this.numberOfMonths > 1 || this.disabled;
    },
    panelId: function panelId() {
      return this.d_id + "_panel";
    }
  },
  components: {
    CalendarButton: script$6$2,
    Portal: script$3$2,
    CalendarIcon: script$5,
    ChevronLeftIcon: script$4,
    ChevronRightIcon: script$3$1,
    ChevronUpIcon: script$3,
    ChevronDownIcon: script$6$1
  },
  directives: {
    ripple: Ripple
  }
};
function _typeof$5(o) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$5(o);
}
function ownKeys$4(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$4(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$4(Object(t), true).forEach(function(r2) {
      _defineProperty$4(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$4(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$4(obj, key, value) {
  key = _toPropertyKey$4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$4(t) {
  var i = _toPrimitive$4(t, "string");
  return "symbol" == _typeof$5(i) ? i : String(i);
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$5(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$5(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var _hoisted_1$1 = ["id"];
var _hoisted_2 = ["id", "name", "placeholder", "aria-expanded", "aria-controls", "aria-labelledby", "aria-label", "aria-invalid", "disabled", "readonly"];
var _hoisted_3 = ["id", "role", "aria-modal", "aria-label"];
var _hoisted_4 = ["disabled", "aria-label"];
var _hoisted_5 = ["disabled", "aria-label"];
var _hoisted_6 = ["disabled", "aria-label"];
var _hoisted_7 = ["disabled", "aria-label"];
var _hoisted_8 = ["disabled", "aria-label"];
var _hoisted_9 = ["disabled", "aria-label"];
var _hoisted_10 = ["data-p-disabled"];
var _hoisted_11 = ["abbr"];
var _hoisted_12 = ["data-p-disabled"];
var _hoisted_13 = ["aria-label", "data-p-today", "data-p-other-month"];
var _hoisted_14 = ["onClick", "onKeydown", "aria-selected", "aria-disabled", "data-p-disabled", "data-p-highlight"];
var _hoisted_15 = ["onClick", "onKeydown", "data-p-disabled", "data-p-highlight"];
var _hoisted_16 = ["onClick", "onKeydown", "data-p-disabled", "data-p-highlight"];
var _hoisted_17 = ["aria-label"];
var _hoisted_18 = ["aria-label"];
var _hoisted_19 = ["aria-label", "disabled"];
var _hoisted_20 = ["aria-label", "disabled"];
var _hoisted_21 = ["aria-label", "disabled"];
var _hoisted_22 = ["aria-label", "disabled"];
var _hoisted_23 = ["aria-label", "disabled"];
var _hoisted_24 = ["aria-label", "disabled"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CalendarButton = resolveComponent("CalendarButton");
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("span", mergeProps({
    ref: "container",
    id: $data.d_id,
    "class": _ctx.cx("root"),
    style: _ctx.sx("root")
  }, _ctx.ptmi("root")), [!_ctx.inline ? (openBlock(), createElementBlock("input", mergeProps({
    key: 0,
    ref: $options.inputRef,
    id: _ctx.inputId,
    name: _ctx.name,
    type: "text",
    role: "combobox",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    placeholder: _ctx.placeholder,
    autocomplete: "off",
    "aria-autocomplete": "none",
    "aria-haspopup": "dialog",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $options.panelId,
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel,
    "aria-invalid": _ctx.invalid || void 0,
    inputmode: "none",
    disabled: _ctx.disabled,
    readonly: !_ctx.manualInput || _ctx.readonly,
    tabindex: 0,
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    }),
    onClick: _cache[1] || (_cache[1] = function() {
      return $options.onInputClick && $options.onInputClick.apply($options, arguments);
    }),
    onFocus: _cache[2] || (_cache[2] = function() {
      return $options.onFocus && $options.onFocus.apply($options, arguments);
    }),
    onBlur: _cache[3] || (_cache[3] = function() {
      return $options.onBlur && $options.onBlur.apply($options, arguments);
    }),
    onKeydown: _cache[4] || (_cache[4] = function() {
      return $options.onKeyDown && $options.onKeyDown.apply($options, arguments);
    })
  }, _objectSpread$4(_objectSpread$4({}, _ctx.inputProps), _ctx.ptm("input"))), null, 16, _hoisted_2)) : createCommentVNode("", true), _ctx.showIcon && _ctx.iconDisplay === "button" ? (openBlock(), createBlock(_component_CalendarButton, {
    key: 1,
    "class": normalizeClass(_ctx.cx("dropdownButton")),
    disabled: _ctx.disabled,
    onClick: $options.onButtonClick,
    type: "button",
    "aria-label": _ctx.$primevue.config.locale.chooseDate,
    "aria-haspopup": "dialog",
    "aria-expanded": $data.overlayVisible,
    "aria-controls": $options.panelId,
    unstyled: _ctx.unstyled,
    pt: _ctx.ptm("dropdownButton")
  }, {
    icon: withCtx(function() {
      return [renderSlot(_ctx.$slots, "dropdownicon", {
        "class": normalizeClass(_ctx.icon)
      }, function() {
        return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ? "span" : "CalendarIcon"), mergeProps({
          "class": _ctx.icon
        }, _ctx.ptm("dropdownButton")["icon"], {
          "data-pc-section": "dropdownicon"
        }), null, 16, ["class"]))];
      })];
    }),
    _: 3
  }, 8, ["class", "disabled", "onClick", "aria-label", "aria-expanded", "aria-controls", "unstyled", "pt"])) : _ctx.showIcon && _ctx.iconDisplay === "input" ? renderSlot(_ctx.$slots, "inputicon", {
    key: 2,
    "class": normalizeClass(_ctx.cx("inputIcon")),
    clickCallback: $options.onButtonClick
  }, function() {
    return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.icon ? "i" : "CalendarIcon"), mergeProps({
      "class": [_ctx.icon, _ctx.cx("inputIcon")],
      onClick: $options.onButtonClick
    }, _ctx.ptm("inputicon")), null, 16, ["class", "onClick"]))];
  }) : createCommentVNode("", true), createVNode(_component_Portal, {
    appendTo: _ctx.appendTo,
    disabled: _ctx.inline
  }, {
    "default": withCtx(function() {
      return [createVNode(Transition, mergeProps({
        name: "p-connected-overlay",
        onEnter: _cache[74] || (_cache[74] = function($event) {
          return $options.onOverlayEnter($event);
        }),
        onAfterEnter: $options.onOverlayEnterComplete,
        onAfterLeave: $options.onOverlayAfterLeave,
        onLeave: $options.onOverlayLeave
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [_ctx.inline || $data.overlayVisible ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.overlayRef,
            id: $options.panelId,
            "class": [_ctx.cx("panel"), _ctx.panelClass],
            style: _ctx.panelStyle,
            role: _ctx.inline ? null : "dialog",
            "aria-modal": _ctx.inline ? null : "true",
            "aria-label": _ctx.$primevue.config.locale.chooseDate,
            onClick: _cache[71] || (_cache[71] = function() {
              return $options.onOverlayClick && $options.onOverlayClick.apply($options, arguments);
            }),
            onKeydown: _cache[72] || (_cache[72] = function() {
              return $options.onOverlayKeyDown && $options.onOverlayKeyDown.apply($options, arguments);
            }),
            onMouseup: _cache[73] || (_cache[73] = function() {
              return $options.onOverlayMouseUp && $options.onOverlayMouseUp.apply($options, arguments);
            })
          }, _objectSpread$4(_objectSpread$4({}, _ctx.panelProps), _ctx.ptm("panel"))), [!_ctx.timeOnly ? (openBlock(), createElementBlock(Fragment, {
            key: 0
          }, [createElementVNode("div", mergeProps({
            "class": _ctx.cx("groupContainer")
          }, _ctx.ptm("groupContainer")), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.months, function(month2, groupIndex) {
            return openBlock(), createElementBlock("div", mergeProps({
              key: month2.month + month2.year,
              "class": _ctx.cx("group")
            }, _ctx.ptm("group")), [createElementVNode("div", mergeProps({
              "class": _ctx.cx("header")
            }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header"), withDirectives((openBlock(), createElementBlock("button", mergeProps({
              ref_for: true,
              ref: $options.previousButtonRef,
              "class": _ctx.cx("previousButton"),
              onClick: _cache[5] || (_cache[5] = function() {
                return $options.onPrevButtonClick && $options.onPrevButtonClick.apply($options, arguments);
              }),
              type: "button",
              onKeydown: _cache[6] || (_cache[6] = function() {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              disabled: _ctx.disabled,
              "aria-label": $data.currentView === "year" ? _ctx.$primevue.config.locale.prevDecade : $data.currentView === "month" ? _ctx.$primevue.config.locale.prevYear : _ctx.$primevue.config.locale.prevMonth
            }, _ctx.ptm("previousButton"), {
              "data-pc-group-section": "navigator"
            }), [renderSlot(_ctx.$slots, "previousicon", {
              "class": normalizeClass(_ctx.cx("previousIcon"))
            }, function() {
              return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.previousIcon ? "span" : "ChevronLeftIcon"), mergeProps({
                "class": [_ctx.cx("previousIcon"), _ctx.previousIcon]
              }, _ctx.ptm("previousIcon")), null, 16, ["class"]))];
            })], 16, _hoisted_4)), [[vShow, _ctx.showOtherMonths ? groupIndex === 0 : false], [_directive_ripple]]), createElementVNode("div", mergeProps({
              "class": _ctx.cx("title")
            }, _ctx.ptm("title")), [_ctx.$primevue.config.locale.showMonthAfterYear ? (openBlock(), createElementBlock(Fragment, {
              key: 0
            }, [$data.currentView !== "year" ? (openBlock(), createElementBlock("button", mergeProps({
              key: 0,
              type: "button",
              onClick: _cache[7] || (_cache[7] = function() {
                return $options.switchToYearView && $options.switchToYearView.apply($options, arguments);
              }),
              onKeydown: _cache[8] || (_cache[8] = function() {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              "class": _ctx.cx("yearTitle"),
              disabled: $options.switchViewButtonDisabled,
              "aria-label": _ctx.$primevue.config.locale.chooseYear
            }, _ctx.ptm("yearTitle"), {
              "data-pc-group-section": "view"
            }), toDisplayString($options.getYear(month2)), 17, _hoisted_5)) : createCommentVNode("", true), $data.currentView === "date" ? (openBlock(), createElementBlock("button", mergeProps({
              key: 1,
              type: "button",
              onClick: _cache[9] || (_cache[9] = function() {
                return $options.switchToMonthView && $options.switchToMonthView.apply($options, arguments);
              }),
              onKeydown: _cache[10] || (_cache[10] = function() {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              "class": _ctx.cx("monthTitle"),
              disabled: $options.switchViewButtonDisabled,
              "aria-label": _ctx.$primevue.config.locale.chooseMonth
            }, _ctx.ptm("monthTitle"), {
              "data-pc-group-section": "view"
            }), toDisplayString($options.getMonthName(month2.month)), 17, _hoisted_6)) : createCommentVNode("", true)], 64)) : (openBlock(), createElementBlock(Fragment, {
              key: 1
            }, [$data.currentView === "date" ? (openBlock(), createElementBlock("button", mergeProps({
              key: 0,
              type: "button",
              onClick: _cache[11] || (_cache[11] = function() {
                return $options.switchToMonthView && $options.switchToMonthView.apply($options, arguments);
              }),
              onKeydown: _cache[12] || (_cache[12] = function() {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              "class": _ctx.cx("monthTitle"),
              disabled: $options.switchViewButtonDisabled,
              "aria-label": _ctx.$primevue.config.locale.chooseMonth
            }, _ctx.ptm("monthTitle"), {
              "data-pc-group-section": "view"
            }), toDisplayString($options.getMonthName(month2.month)), 17, _hoisted_7)) : createCommentVNode("", true), $data.currentView !== "year" ? (openBlock(), createElementBlock("button", mergeProps({
              key: 1,
              type: "button",
              onClick: _cache[13] || (_cache[13] = function() {
                return $options.switchToYearView && $options.switchToYearView.apply($options, arguments);
              }),
              onKeydown: _cache[14] || (_cache[14] = function() {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              "class": _ctx.cx("yearTitle"),
              disabled: $options.switchViewButtonDisabled,
              "aria-label": _ctx.$primevue.config.locale.chooseYear
            }, _ctx.ptm("yearTitle"), {
              "data-pc-group-section": "view"
            }), toDisplayString($options.getYear(month2)), 17, _hoisted_8)) : createCommentVNode("", true)], 64)), $data.currentView === "year" ? (openBlock(), createElementBlock("span", mergeProps({
              key: 2,
              "class": _ctx.cx("decadeTitle")
            }, _ctx.ptm("decadeTitle")), [renderSlot(_ctx.$slots, "decade", {
              years: $options.yearPickerValues
            }, function() {
              return [createTextVNode(toDisplayString($options.yearPickerValues[0].value) + " - " + toDisplayString($options.yearPickerValues[$options.yearPickerValues.length - 1].value), 1)];
            })], 16)) : createCommentVNode("", true)], 16), withDirectives((openBlock(), createElementBlock("button", mergeProps({
              ref_for: true,
              ref: $options.nextButtonRef,
              "class": _ctx.cx("nextButton"),
              onClick: _cache[15] || (_cache[15] = function() {
                return $options.onNextButtonClick && $options.onNextButtonClick.apply($options, arguments);
              }),
              type: "button",
              onKeydown: _cache[16] || (_cache[16] = function() {
                return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
              }),
              disabled: _ctx.disabled,
              "aria-label": $data.currentView === "year" ? _ctx.$primevue.config.locale.nextDecade : $data.currentView === "month" ? _ctx.$primevue.config.locale.nextYear : _ctx.$primevue.config.locale.nextMonth
            }, _ctx.ptm("nextButton"), {
              "data-pc-group-section": "navigator"
            }), [renderSlot(_ctx.$slots, "nexticon", {
              "class": normalizeClass(_ctx.cx("nextIcon"))
            }, function() {
              return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.nextIcon ? "span" : "ChevronRightIcon"), mergeProps({
                "class": [_ctx.cx("nextIcon"), _ctx.nextIcon]
              }, _ctx.ptm("nextIcon")), null, 16, ["class"]))];
            })], 16, _hoisted_9)), [[vShow, _ctx.showOtherMonths ? _ctx.numberOfMonths === 1 ? true : groupIndex === _ctx.numberOfMonths - 1 : false], [_directive_ripple]])], 16), $data.currentView === "date" ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              "class": _ctx.cx("container")
            }, _ctx.ptm("container")), [createElementVNode("table", mergeProps({
              "class": _ctx.cx("table"),
              role: "grid"
            }, _ctx.ptm("table")), [createElementVNode("thead", normalizeProps(guardReactiveProps(_ctx.ptm("tableHeader"))), [createElementVNode("tr", normalizeProps(guardReactiveProps(_ctx.ptm("tableHeaderRow"))), [_ctx.showWeek ? (openBlock(), createElementBlock("th", mergeProps({
              key: 0,
              scope: "col",
              "class": _ctx.cx("weekHeader")
            }, _ctx.ptm("weekHeader", {
              context: {
                disabled: _ctx.showWeek
              }
            }), {
              "data-p-disabled": _ctx.showWeek,
              "data-pc-group-section": "tableheadercell"
            }), [renderSlot(_ctx.$slots, "weekheaderlabel", {}, function() {
              return [createElementVNode("span", mergeProps(_ctx.ptm("weekHeaderLabel", {
                context: {
                  disabled: _ctx.showWeek
                }
              }), {
                "data-pc-group-section": "tableheadercelllabel"
              }), toDisplayString($options.weekHeaderLabel), 17)];
            })], 16, _hoisted_10)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList($options.weekDays, function(weekDay) {
              return openBlock(), createElementBlock("th", mergeProps({
                key: weekDay,
                scope: "col",
                abbr: weekDay
              }, _ctx.ptm("tableHeaderCell"), {
                "data-pc-group-section": "tableheadercell"
              }), [createElementVNode("span", mergeProps(_ctx.ptm("weekDay"), {
                "data-pc-group-section": "tableheadercelllabel"
              }), toDisplayString(weekDay), 17)], 16, _hoisted_11);
            }), 128))], 16)], 16), createElementVNode("tbody", normalizeProps(guardReactiveProps(_ctx.ptm("tableBody"))), [(openBlock(true), createElementBlock(Fragment, null, renderList(month2.dates, function(week, i) {
              return openBlock(), createElementBlock("tr", mergeProps({
                key: week[0].day + "" + week[0].month
              }, _ctx.ptm("tableBodyRow")), [_ctx.showWeek ? (openBlock(), createElementBlock("td", mergeProps({
                key: 0,
                "class": _ctx.cx("weekNumber")
              }, _ctx.ptm("weekNumber"), {
                "data-pc-group-section": "tablebodycell"
              }), [createElementVNode("span", mergeProps({
                "class": _ctx.cx("weekLabelContainer")
              }, _ctx.ptm("weekLabelContainer", {
                context: {
                  disabled: _ctx.showWeek
                }
              }), {
                "data-p-disabled": _ctx.showWeek,
                "data-pc-group-section": "tablebodycelllabel"
              }), [renderSlot(_ctx.$slots, "weeklabel", {
                weekNumber: month2.weekNumbers[i]
              }, function() {
                return [month2.weekNumbers[i] < 10 ? (openBlock(), createElementBlock("span", mergeProps({
                  key: 0,
                  style: {
                    "visibility": "hidden"
                  }
                }, _ctx.ptm("weekLabel")), "0", 16)) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(month2.weekNumbers[i]), 1)];
              })], 16, _hoisted_12)], 16)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(week, function(date) {
                return openBlock(), createElementBlock("td", mergeProps({
                  key: date.day + "" + date.month,
                  "aria-label": date.day,
                  "class": _ctx.cx("day", {
                    date
                  })
                }, _ctx.ptm("day", {
                  context: {
                    date,
                    today: date.today,
                    otherMonth: date.otherMonth,
                    selected: $options.isSelected(date),
                    disabled: !date.selectable
                  }
                }), {
                  "data-p-today": date.today,
                  "data-p-other-month": date.otherMonth,
                  "data-pc-group-section": "tablebodycell"
                }), [withDirectives((openBlock(), createElementBlock("span", mergeProps({
                  "class": _ctx.cx("dayLabel", {
                    date
                  }),
                  onClick: function onClick($event) {
                    return $options.onDateSelect($event, date);
                  },
                  draggable: "false",
                  onKeydown: function onKeydown($event) {
                    return $options.onDateCellKeydown($event, date, groupIndex);
                  },
                  "aria-selected": $options.isSelected(date),
                  "aria-disabled": !date.selectable
                }, _ctx.ptm("dayLabel", {
                  context: {
                    date,
                    today: date.today,
                    otherMonth: date.otherMonth,
                    selected: $options.isSelected(date),
                    disabled: !date.selectable
                  }
                }), {
                  "data-p-disabled": !date.selectable,
                  "data-p-highlight": $options.isSelected(date),
                  "data-pc-group-section": "tablebodycelllabel"
                }), [renderSlot(_ctx.$slots, "date", {
                  date
                }, function() {
                  return [createTextVNode(toDisplayString(date.day), 1)];
                })], 16, _hoisted_14)), [[_directive_ripple]]), $options.isSelected(date) ? (openBlock(), createElementBlock("div", mergeProps({
                  key: 0,
                  "class": "p-hidden-accessible",
                  "aria-live": "polite"
                }, _ctx.ptm("hiddenSelectedDay"), {
                  "data-p-hidden-accessible": true
                }), toDisplayString(date.day), 17)) : createCommentVNode("", true)], 16, _hoisted_13);
              }), 128))], 16);
            }), 128))], 16)], 16)], 16)) : createCommentVNode("", true)], 16);
          }), 128))], 16), $data.currentView === "month" ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            "class": _ctx.cx("monthPicker")
          }, _ctx.ptm("monthPicker")), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.monthPickerValues, function(m, i) {
            return withDirectives((openBlock(), createElementBlock("span", mergeProps({
              key: m,
              onClick: function onClick($event) {
                return $options.onMonthSelect($event, i);
              },
              onKeydown: function onKeydown($event) {
                return $options.onMonthCellKeydown($event, {
                  month: m,
                  index: i
                });
              },
              "class": _ctx.cx("month", {
                month: m,
                index: i
              })
            }, _ctx.ptm("month", {
              context: {
                month: m,
                monthIndex: i,
                selected: $options.isMonthSelected(i),
                disabled: !m.selectable
              }
            }), {
              "data-p-disabled": !m.selectable,
              "data-p-highlight": $options.isMonthSelected(i)
            }), [createTextVNode(toDisplayString(m.value) + " ", 1), $options.isMonthSelected(i) ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              "class": "p-hidden-accessible",
              "aria-live": "polite"
            }, _ctx.ptm("hiddenMonth"), {
              "data-p-hidden-accessible": true
            }), toDisplayString(m.value), 17)) : createCommentVNode("", true)], 16, _hoisted_15)), [[_directive_ripple]]);
          }), 128))], 16)) : createCommentVNode("", true), $data.currentView === "year" ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            "class": _ctx.cx("yearPicker")
          }, _ctx.ptm("yearPicker")), [(openBlock(true), createElementBlock(Fragment, null, renderList($options.yearPickerValues, function(y) {
            return withDirectives((openBlock(), createElementBlock("span", mergeProps({
              key: y.value,
              onClick: function onClick($event) {
                return $options.onYearSelect($event, y);
              },
              onKeydown: function onKeydown($event) {
                return $options.onYearCellKeydown($event, y);
              },
              "class": _ctx.cx("year", {
                year: y
              })
            }, _ctx.ptm("year", {
              context: {
                year: y,
                selected: $options.isYearSelected(y.value),
                disabled: !y.selectable
              }
            }), {
              "data-p-disabled": !y.selectable,
              "data-p-highlight": $options.isYearSelected(y.value)
            }), [createTextVNode(toDisplayString(y.value) + " ", 1), $options.isYearSelected(y.value) ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              "class": "p-hidden-accessible",
              "aria-live": "polite"
            }, _ctx.ptm("hiddenYear"), {
              "data-p-hidden-accessible": true
            }), toDisplayString(y.value), 17)) : createCommentVNode("", true)], 16, _hoisted_16)), [[_directive_ripple]]);
          }), 128))], 16)) : createCommentVNode("", true)], 64)) : createCommentVNode("", true), (_ctx.showTime || _ctx.timeOnly) && $data.currentView === "date" ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            "class": _ctx.cx("timePicker")
          }, _ctx.ptm("timePicker")), [createElementVNode("div", mergeProps({
            "class": _ctx.cx("hourPicker")
          }, _ctx.ptm("hourPicker"), {
            "data-pc-group-section": "timepickerContainer"
          }), [withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("incrementButton"),
            "aria-label": _ctx.$primevue.config.locale.nextHour,
            onMousedown: _cache[17] || (_cache[17] = function($event) {
              return $options.onTimePickerElementMouseDown($event, 0, 1);
            }),
            onMouseup: _cache[18] || (_cache[18] = function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[19] || (_cache[19] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[21] || (_cache[21] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 0, 1);
            }, ["enter"])), _cache[22] || (_cache[22] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 0, 1);
            }, ["space"]))],
            onMouseleave: _cache[20] || (_cache[20] = function($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[23] || (_cache[23] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[24] || (_cache[24] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm("incrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "incrementicon", {}, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.incrementIcon ? "span" : "ChevronUpIcon"), mergeProps({
              "class": _ctx.incrementIcon
            }, _ctx.ptm("incrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_17)), [[_directive_ripple]]), createElementVNode("span", mergeProps(_ctx.ptm("hour"), {
            "data-pc-group-section": "timepickerlabel"
          }), toDisplayString($options.formattedCurrentHour), 17), withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("decrementButton"),
            "aria-label": _ctx.$primevue.config.locale.prevHour,
            onMousedown: _cache[25] || (_cache[25] = function($event) {
              return $options.onTimePickerElementMouseDown($event, 0, -1);
            }),
            onMouseup: _cache[26] || (_cache[26] = function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[27] || (_cache[27] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[29] || (_cache[29] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 0, -1);
            }, ["enter"])), _cache[30] || (_cache[30] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 0, -1);
            }, ["space"]))],
            onMouseleave: _cache[28] || (_cache[28] = function($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[31] || (_cache[31] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[32] || (_cache[32] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm("decrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "decrementicon", {}, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.decrementIcon ? "span" : "ChevronDownIcon"), mergeProps({
              "class": _ctx.decrementIcon
            }, _ctx.ptm("decrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_18)), [[_directive_ripple]])], 16), createElementVNode("div", mergeProps({
            "class": _ctx.cx("separatorContainer")
          }, _ctx.ptm("separatorContainer"), {
            "data-pc-group-section": "timepickerContainer"
          }), [createElementVNode("span", mergeProps(_ctx.ptm("separator"), {
            "data-pc-group-section": "timepickerlabel"
          }), toDisplayString(_ctx.timeSeparator), 17)], 16), createElementVNode("div", mergeProps({
            "class": _ctx.cx("minutePicker")
          }, _ctx.ptm("minutePicker"), {
            "data-pc-group-section": "timepickerContainer"
          }), [withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("incrementButton"),
            "aria-label": _ctx.$primevue.config.locale.nextMinute,
            onMousedown: _cache[33] || (_cache[33] = function($event) {
              return $options.onTimePickerElementMouseDown($event, 1, 1);
            }),
            onMouseup: _cache[34] || (_cache[34] = function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[35] || (_cache[35] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[37] || (_cache[37] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 1, 1);
            }, ["enter"])), _cache[38] || (_cache[38] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 1, 1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[36] || (_cache[36] = function($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[39] || (_cache[39] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[40] || (_cache[40] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm("incrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "incrementicon", {}, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.incrementIcon ? "span" : "ChevronUpIcon"), mergeProps({
              "class": _ctx.incrementIcon
            }, _ctx.ptm("incrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_19)), [[_directive_ripple]]), createElementVNode("span", mergeProps(_ctx.ptm("minute"), {
            "data-pc-group-section": "timepickerlabel"
          }), toDisplayString($options.formattedCurrentMinute), 17), withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("decrementButton"),
            "aria-label": _ctx.$primevue.config.locale.prevMinute,
            onMousedown: _cache[41] || (_cache[41] = function($event) {
              return $options.onTimePickerElementMouseDown($event, 1, -1);
            }),
            onMouseup: _cache[42] || (_cache[42] = function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[43] || (_cache[43] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[45] || (_cache[45] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 1, -1);
            }, ["enter"])), _cache[46] || (_cache[46] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 1, -1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[44] || (_cache[44] = function($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[47] || (_cache[47] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[48] || (_cache[48] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm("decrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "decrementicon", {}, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.decrementIcon ? "span" : "ChevronDownIcon"), mergeProps({
              "class": _ctx.decrementIcon
            }, _ctx.ptm("decrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_20)), [[_directive_ripple]])], 16), _ctx.showSeconds ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            "class": _ctx.cx("separatorContainer")
          }, _ctx.ptm("separatorContainer"), {
            "data-pc-group-section": "timepickerContainer"
          }), [createElementVNode("span", mergeProps(_ctx.ptm("separator"), {
            "data-pc-group-section": "timepickerlabel"
          }), toDisplayString(_ctx.timeSeparator), 17)], 16)) : createCommentVNode("", true), _ctx.showSeconds ? (openBlock(), createElementBlock("div", mergeProps({
            key: 1,
            "class": _ctx.cx("secondPicker")
          }, _ctx.ptm("secondPicker"), {
            "data-pc-group-section": "timepickerContainer"
          }), [withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("incrementButton"),
            "aria-label": _ctx.$primevue.config.locale.nextSecond,
            onMousedown: _cache[49] || (_cache[49] = function($event) {
              return $options.onTimePickerElementMouseDown($event, 2, 1);
            }),
            onMouseup: _cache[50] || (_cache[50] = function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[51] || (_cache[51] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[53] || (_cache[53] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 2, 1);
            }, ["enter"])), _cache[54] || (_cache[54] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 2, 1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[52] || (_cache[52] = function($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[55] || (_cache[55] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[56] || (_cache[56] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm("incrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "incrementicon", {}, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.incrementIcon ? "span" : "ChevronUpIcon"), mergeProps({
              "class": _ctx.incrementIcon
            }, _ctx.ptm("incrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_21)), [[_directive_ripple]]), createElementVNode("span", mergeProps(_ctx.ptm("second"), {
            "data-pc-group-section": "timepickerlabel"
          }), toDisplayString($options.formattedCurrentSecond), 17), withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("decrementButton"),
            "aria-label": _ctx.$primevue.config.locale.prevSecond,
            onMousedown: _cache[57] || (_cache[57] = function($event) {
              return $options.onTimePickerElementMouseDown($event, 2, -1);
            }),
            onMouseup: _cache[58] || (_cache[58] = function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }),
            onKeydown: [_cache[59] || (_cache[59] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }), _cache[61] || (_cache[61] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 2, -1);
            }, ["enter"])), _cache[62] || (_cache[62] = withKeys(function($event) {
              return $options.onTimePickerElementMouseDown($event, 2, -1);
            }, ["space"]))],
            disabled: _ctx.disabled,
            onMouseleave: _cache[60] || (_cache[60] = function($event) {
              return $options.onTimePickerElementMouseLeave();
            }),
            onKeyup: [_cache[63] || (_cache[63] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["enter"])), _cache[64] || (_cache[64] = withKeys(function($event) {
              return $options.onTimePickerElementMouseUp($event);
            }, ["space"]))],
            type: "button"
          }, _ctx.ptm("decrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "decrementicon", {}, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.decrementIcon ? "span" : "ChevronDownIcon"), mergeProps({
              "class": _ctx.decrementIcon
            }, _ctx.ptm("decrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_22)), [[_directive_ripple]])], 16)) : createCommentVNode("", true), _ctx.hourFormat == "12" ? (openBlock(), createElementBlock("div", mergeProps({
            key: 2,
            "class": _ctx.cx("separatorContainer")
          }, _ctx.ptm("separatorContainer"), {
            "data-pc-group-section": "timepickerContainer"
          }), [createElementVNode("span", mergeProps(_ctx.ptm("separator"), {
            "data-pc-group-section": "timepickerlabel"
          }), toDisplayString(_ctx.timeSeparator), 17)], 16)) : createCommentVNode("", true), _ctx.hourFormat == "12" ? (openBlock(), createElementBlock("div", mergeProps({
            key: 3,
            "class": _ctx.cx("ampmPicker")
          }, _ctx.ptm("ampmPicker")), [withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("incrementButton"),
            "aria-label": _ctx.$primevue.config.locale.am,
            onClick: _cache[65] || (_cache[65] = function($event) {
              return $options.toggleAMPM($event);
            }),
            onKeydown: _cache[66] || (_cache[66] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }),
            type: "button",
            disabled: _ctx.disabled
          }, _ctx.ptm("incrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "incrementicon", {
            "class": normalizeClass(_ctx.cx("incrementIcon"))
          }, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.incrementIcon ? "span" : "ChevronUpIcon"), mergeProps({
              "class": _ctx.cx("incrementIcon")
            }, _ctx.ptm("incrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_23)), [[_directive_ripple]]), createElementVNode("span", mergeProps(_ctx.ptm("ampm"), {
            "data-pc-group-section": "timepickerlabel"
          }), toDisplayString($data.pm ? _ctx.$primevue.config.locale.pm : _ctx.$primevue.config.locale.am), 17), withDirectives((openBlock(), createElementBlock("button", mergeProps({
            "class": _ctx.cx("decrementButton"),
            "aria-label": _ctx.$primevue.config.locale.pm,
            onClick: _cache[67] || (_cache[67] = function($event) {
              return $options.toggleAMPM($event);
            }),
            onKeydown: _cache[68] || (_cache[68] = function() {
              return $options.onContainerButtonKeydown && $options.onContainerButtonKeydown.apply($options, arguments);
            }),
            type: "button",
            disabled: _ctx.disabled
          }, _ctx.ptm("decrementButton"), {
            "data-pc-group-section": "timepickerbutton"
          }), [renderSlot(_ctx.$slots, "decrementicon", {
            "class": normalizeClass(_ctx.cx("decrementIcon"))
          }, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.decrementIcon ? "span" : "ChevronDownIcon"), mergeProps({
              "class": _ctx.cx("decrementIcon")
            }, _ctx.ptm("decrementIcon"), {
              "data-pc-group-section": "timepickerlabel"
            }), null, 16, ["class"]))];
          })], 16, _hoisted_24)), [[_directive_ripple]])], 16)) : createCommentVNode("", true)], 16)) : createCommentVNode("", true), _ctx.showButtonBar ? (openBlock(), createElementBlock("div", mergeProps({
            key: 2,
            "class": _ctx.cx("buttonbar")
          }, _ctx.ptm("buttonbar")), [createVNode(_component_CalendarButton, {
            type: "button",
            label: $options.todayLabel,
            onClick: _cache[69] || (_cache[69] = function($event) {
              return $options.onTodayButtonClick($event);
            }),
            "class": normalizeClass(_ctx.cx("todayButton")),
            onKeydown: $options.onContainerButtonKeydown,
            unstyled: _ctx.unstyled,
            pt: _ctx.ptm("todayButton"),
            "data-pc-group-section": "button"
          }, null, 8, ["label", "class", "onKeydown", "unstyled", "pt"]), createVNode(_component_CalendarButton, {
            type: "button",
            label: $options.clearLabel,
            onClick: _cache[70] || (_cache[70] = function($event) {
              return $options.onClearButtonClick($event);
            }),
            "class": normalizeClass(_ctx.cx("clearButton")),
            onKeydown: $options.onContainerButtonKeydown,
            unstyled: _ctx.unstyled,
            pt: _ctx.ptm("clearButton"),
            "data-pc-group-section": "button"
          }, null, 8, ["label", "class", "onKeydown", "unstyled", "pt"])], 16)) : createCommentVNode("", true), renderSlot(_ctx.$slots, "footer")], 16, _hoisted_3)) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onAfterEnter", "onAfterLeave", "onLeave"])];
    }),
    _: 3
  }, 8, ["appendTo", "disabled"])], 16, _hoisted_1$1);
}
script$2.render = render$1;
const calendar_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DeCalendar",
  __ssrInlineRender: true,
  props: {
    id: {},
    showIcon: { type: Boolean, default: true },
    manualInput: { type: Boolean, default: false },
    maxDate: {}
  },
  setup(__props) {
    const props = __props;
    const { errorMessage, value, handleChange, handleBlur } = useField(() => props.id, void 0, {
      validateOnValueUpdate: false
    });
    const validationListeners = {
      blur: (evt) => handleBlur(evt, true),
      change: handleChange,
      input: (evt) => handleChange(evt, !!errorMessage.value)
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_calendar = script$2;
      _push(ssrRenderComponent(_component_prime_calendar, mergeProps({
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        "show-icon": _ctx.showIcon,
        "manual-input": _ctx.manualInput,
        "max-date": _ctx.maxDate,
        "date-format": "dd.mm.yy",
        pt: {
          root: ["de-calendar", { "de-icon-field de-icon-field-left": _ctx.showIcon }],
          input: "de-calendar-input",
          inputicon: "de-input-icon",
          panel: "de-calendar-panel",
          header: "de-calendar-header",
          title: "de-calendar-title",
          previousbutton: "de-calendar-prev",
          nextbutton: "de-calendar-next",
          table: "de-calendar-table",
          monthTitle: "de-calendar-month",
          yearTitle: "de-calendar-year",
          daylabel: ({ context }) => ({
            class: [{ "is-disabled": context.disabled, "is-active": context.selected }]
          }),
          monthpicker: "de-monthpicker",
          month: ({ context }) => ({
            class: [
              "de-monthpicker-month",
              { "is-disabled": context.disabled, "is-active": context.selected }
            ]
          }),
          yearpicker: "de-yearpicker",
          year: ({ context }) => ({
            class: [
              "de-yearpicker-year",
              { "is-disabled": context.disabled, "is-active": context.selected }
            ]
          })
        }
      }, toHandlers(validationListeners), _attrs), null, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/calendar/DeCalendar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var classes$3 = {
  root: function root4(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-inputtextarea p-inputtext p-component", {
      "p-filled": instance.filled,
      "p-inputtextarea-resizable ": props.autoResize,
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled"
    }];
  }
};
var TextareaStyle = BaseStyle.extend({
  name: "textarea",
  classes: classes$3
});
var script$1 = {
  name: "BaseTextarea",
  "extends": script$a,
  props: {
    modelValue: null,
    autoResize: Boolean,
    invalid: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    }
  },
  style: TextareaStyle,
  provide: function provide3() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "Textarea",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:modelValue"],
  mounted: function mounted2() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  updated: function updated2() {
    if (this.$el.offsetParent && this.autoResize) {
      this.resize();
    }
  },
  methods: {
    resize: function resize() {
      this.$el.style.height = "auto";
      this.$el.style.height = this.$el.scrollHeight + "px";
      if (parseFloat(this.$el.style.height) >= parseFloat(this.$el.style.maxHeight)) {
        this.$el.style.overflowY = "scroll";
        this.$el.style.height = this.$el.style.maxHeight;
      } else {
        this.$el.style.overflow = "hidden";
      }
    },
    onInput: function onInput2(event) {
      if (this.autoResize) {
        this.resize();
      }
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    },
    ptmParams: function ptmParams() {
      return {
        context: {
          disabled: this.$attrs.disabled || this.$attrs.disabled === ""
        }
      };
    }
  }
};
var _hoisted_1 = ["value", "aria-invalid"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("textarea", mergeProps({
    "class": _ctx.cx("root"),
    value: _ctx.modelValue,
    "aria-invalid": _ctx.invalid || void 0,
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, _ctx.ptmi("root", $options.ptmParams)), null, 16, _hoisted_1);
}
script.render = render;
const textarea_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DeFormTextarea",
  __ssrInlineRender: true,
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    hintMessage: {
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: null
    },
    minlength: {
      type: Number,
      default: null
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: null
    },
    resizable: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const { errorMessage, value, handleChange, handleBlur } = useField(() => props.id, void 0, {
      validateOnValueUpdate: false
    });
    const validationListeners = {
      blur: (evt) => handleBlur(evt, true),
      change: handleChange,
      input: (evt) => handleChange(evt, !!errorMessage.value)
    };
    const isWordLimitShown = computed(() => {
      return props.showWordLimit && (props.maxlength || props.minlength) && value.value;
    });
    const wordLimitClass = computed(() => {
      var _a, _b;
      if (props.maxlength && ((_a = value.value) == null ? void 0 : _a.length) <= props.maxlength || props.minlength && ((_b = value.value) == null ? void 0 : _b.length) >= props.minlength) {
        return "tw-text-success-500";
      }
      return "tw-text-accent-500";
    });
    const textareaPlaceholder = computed(() => props.placeholder);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_textarea = script;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", __props.id)} class="de-form-input-text-label">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_prime_textarea, mergeProps({
        id: __props.id,
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null
      }, _ctx.$attrs, {
        placeholder: textareaPlaceholder.value,
        maxlength: __props.maxlength,
        minlength: __props.minlength,
        class: ["de-form-input-text", { "is-error": !!unref(errorMessage) || __props.isError, "tw-resize-none": !__props.resizable }]
      }, toHandlers(validationListeners)), null, _parent));
      if (unref(errorMessage)) {
        _push(`<div class="de-form-error">${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-flex tw-items-center tw-justify-between tw-text-300 tw-leading-400 tw-text-primary-300 tw-mt-1">`);
      if (__props.hintMessage) {
        _push(`<p>${ssrInterpolate(__props.hintMessage)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (isWordLimitShown.value) {
        _push(`<p><span class="${ssrRenderClass(wordLimitClass.value)}">${ssrInterpolate(unref(value).length)}</span><span>/${ssrInterpolate(__props.maxlength || __props.minlength)}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/form/form-textarea/DeFormTextarea.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col tw-gap-5" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$2$1 = _sfc_main$2$1.setup;
_sfc_main$2$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/form/form-group/DeFormGroup.vue");
  return _sfc_setup$2$1 ? _sfc_setup$2$1(props, ctx) : void 0;
};
const DeFormGroup = /* @__PURE__ */ _export_sfc(_sfc_main$2$1, [["ssrRender", _sfc_ssrRender]]);
const UserService = (fetch) => ({
  async uploadUserPhoto(payload) {
    return await fetch("api/v1/user/settings/profile/photo/upload", {
      method: "POST",
      localError: true,
      body: payload
    });
  },
  async updateUserName(name) {
    return await fetch("api/v1/user/settings/profile/update-username", {
      method: "PATCH",
      body: { name }
    });
  },
  async updateProfile(payload) {
    return await fetch("api/v1/user/settings/profile/update", {
      method: "PATCH",
      body: {
        display_name: payload.profile.name,
        bio: payload.profile.bio,
        birthday: payload.profile.birthday,
        website: payload.profile.website
      }
    });
  },
  async changeCurrency(currencyId) {
    return await fetch("api/v1/user/change-currency", {
      method: "PATCH",
      body: {
        currency_id: currencyId
      }
    });
  },
  async addCredentials(payload) {
    return await fetch("api/auth/add-credentials", {
      method: "POST",
      body: payload
    });
  }
});
const _sfc_main$1$1 = /* @__PURE__ */ defineComponent({
  __name: "UserSettingsProfileForm",
  __ssrInlineRender: true,
  setup(__props) {
    var _a;
    const UserSettingsCustomizeAvatarDialog = defineAsyncComponent(
      () => import('./UserSettingsCustomizeAvatarDialog-CkDjdBlR.mjs')
    );
    const { t } = useI18n();
    const { $customFetch } = useNuxtApp();
    const userRepository = UserService($customFetch);
    const userStore = useUserStore();
    const toast = useToast();
    const isCustomizeAvatarDialogVisible = ref(false);
    function openCustomizeProfile() {
      isCustomizeAvatarDialogVisible.value = true;
    }
    const isSubmitDisabled = computed(() => {
      return isDeepEqual(userStore.user.profile, {
        ...values.profile,
        birthday: getBirthdayBackendFormat()
      });
    });
    const { handleSubmit, values, isSubmitting } = useForm({
      validationSchema: object({
        profile: object({
          name: string().required(t("form.enterYourX", { field: "form.displayName" })),
          website: string().nullable().url(t("form.rules.validUrl", { field: "form.website" }))
        })
      }),
      initialValues: {
        username: userStore.user.username,
        profile: {
          name: (_a = userStore.user.profile.name) != null ? _a : "",
          photo: userStore.user.profile.photo,
          website: userStore.user.profile.website,
          bio: userStore.user.profile.bio,
          birthday: userStore.user.profile.birthday ? new Date(userStore.user.profile.birthday) : null
        }
      }
    });
    handleSubmit(async (values2) => {
      const data2 = {
        ...values2,
        profile: {
          ...values2.profile,
          birthday: values2.profile.birthday ? getBirthdayBackendFormat() : null
        }
      };
      await userRepository.updateProfile(data2);
      userStore.updateUserProfile(data2.profile);
      toastSuccessNotification(toast, {
        body: t("user.settings.profile.form.successUpdateMessage")
      });
    });
    function getBirthdayBackendFormat() {
      return dayjs(values.profile.birthday).format(BACKEND_DATE_FORMAT);
    }
    const maxDate2 = ref(/* @__PURE__ */ new Date());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><form><p class="heading-h5 tw-mb-4.5">${ssrInterpolate(unref(t)("form.yourX", { field: "common.avatar" }))}</p><div class="tw-flex tw-gap-7.5 tw-items-center tw-mb-5">`);
      _push(ssrRenderComponent(_sfc_main$k$1, {
        src: unref(userStore).user.profile.photo,
        size: unref(AVATAR_SIZE_OPTIONS).large
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$l$1, {
        variant: unref(ButtonVariantOptions).confirm,
        category: unref(ButtonCategoryOptions).secondary,
        size: unref(ButtonSizeOptions).medium,
        label: unref(t)("common.buttons.editX", { field: "common.avatar" }),
        class: "tw-capitalize",
        onClick: openCustomizeProfile
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(DeFormGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$i$2, {
              id: "profile.name",
              placeholder: unref(t)("form.chooseYourOwnNickname"),
              label: unref(t)("form.displayName"),
              maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
              "hint-message": unref(t)("form.rules.maxXChars", { max: unref(DISPLAY_NAME_MAX_LENGTH) }),
              "show-word-limit": "",
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$i$2, {
              id: "username",
              label: unref(t)("form.username"),
              maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
              "hint-message": unref(t)("user.settings.profile.form.usernameHint"),
              disabled: "",
              "show-word-limit": "",
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$3, {
              id: "profile.bio",
              rows: "6",
              resize: "none",
              label: unref(t)("form.bio"),
              placeholder: unref(t)("user.settings.profile.form.bioHint"),
              maxlength: unref(DISPLAY_BIO_MAX_LENGTH),
              "hint-message": unref(t)("form.rules.maxXChars", { max: unref(DISPLAY_BIO_MAX_LENGTH) }),
              "show-word-limit": "",
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><label for="id" class="de-form-input-text-label"${_scopeId}>${ssrInterpolate(unref(t)("form.birthday"))}</label>`);
            _push2(ssrRenderComponent(_sfc_main$4, {
              id: "profile.birthday",
              "show-icon": "",
              "icon-display": "input",
              "max-date": maxDate2.value
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$i$2, {
              id: "profile.website",
              label: unref(t)("form.website"),
              placeholder: "http://",
              class: "tw-w-full"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$i$2, {
                id: "profile.name",
                placeholder: unref(t)("form.chooseYourOwnNickname"),
                label: unref(t)("form.displayName"),
                maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
                "hint-message": unref(t)("form.rules.maxXChars", { max: unref(DISPLAY_NAME_MAX_LENGTH) }),
                "show-word-limit": "",
                class: "tw-w-full"
              }, null, 8, ["placeholder", "label", "maxlength", "hint-message"]),
              createVNode(_sfc_main$i$2, {
                id: "username",
                label: unref(t)("form.username"),
                maxlength: unref(DISPLAY_NAME_MAX_LENGTH),
                "hint-message": unref(t)("user.settings.profile.form.usernameHint"),
                disabled: "",
                "show-word-limit": "",
                class: "tw-w-full"
              }, null, 8, ["label", "maxlength", "hint-message"]),
              createVNode(_sfc_main$3, {
                id: "profile.bio",
                rows: "6",
                resize: "none",
                label: unref(t)("form.bio"),
                placeholder: unref(t)("user.settings.profile.form.bioHint"),
                maxlength: unref(DISPLAY_BIO_MAX_LENGTH),
                "hint-message": unref(t)("form.rules.maxXChars", { max: unref(DISPLAY_BIO_MAX_LENGTH) }),
                "show-word-limit": "",
                class: "tw-w-full"
              }, null, 8, ["label", "placeholder", "maxlength", "hint-message"]),
              createVNode("div", null, [
                createVNode("label", {
                  for: "id",
                  class: "de-form-input-text-label"
                }, toDisplayString(unref(t)("form.birthday")), 1),
                createVNode(_sfc_main$4, {
                  id: "profile.birthday",
                  "show-icon": "",
                  "icon-display": "input",
                  "max-date": maxDate2.value
                }, null, 8, ["max-date"])
              ]),
              createVNode(_sfc_main$i$2, {
                id: "profile.website",
                label: unref(t)("form.website"),
                placeholder: "http://",
                class: "tw-w-full"
              }, null, 8, ["label"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$l$1, {
        type: "submit",
        variant: unref(ButtonVariantOptions).confirm,
        size: unref(ButtonSizeOptions).medium,
        label: _ctx.$t("common.buttons.save"),
        loading: unref(isSubmitting),
        disabled: isSubmitDisabled.value,
        class: "max-lg:tw-w-full tw-mt-7.5"
      }, null, _parent));
      _push(`</form>`);
      if (isCustomizeAvatarDialogVisible.value) {
        _push(ssrRenderComponent(unref(UserSettingsCustomizeAvatarDialog), {
          modelValue: isCustomizeAvatarDialogVisible.value,
          "onUpdate:modelValue": ($event) => isCustomizeAvatarDialogVisible.value = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1$1 = _sfc_main$1$1.setup;
_sfc_main$1$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/user/settings/profile/components/UserSettingsProfileForm.vue");
  return _sfc_setup$1$1 ? _sfc_setup$1$1(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$9, mergeProps({
        title: unref(t)("menu.user.profileSettings")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header class="heading-h2 tw-mb-4.5 md:tw-mb-5"${_scopeId}>${ssrInterpolate(unref(t)("user.settings.profile.form.aboutMe"))}</header>`);
            _push2(ssrRenderComponent(_sfc_main$1$1, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("header", { class: "heading-h2 tw-mb-4.5 md:tw-mb-5" }, toDisplayString(unref(t)("user.settings.profile.form.aboutMe")), 1),
              createVNode(_sfc_main$1$1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/settings/index.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));

const chunkPgSettingsCL27nXzC = /*#__PURE__*/Object.freeze({
  __proto__: null,
  A: AuthService,
  B: BASE_WALLETS_CONFIG,
  D: DISPLAY_NAME_MAX_LENGTH,
  U: UserService,
  W: WalletProvider,
  _: _sfc_main$3,
  a: DeFormGroup,
  b: useErrorHandling,
  c: useWallet,
  d: _export_sfc,
  e: errorCodes,
  f: accountSecurity,
  g: calendar_esm,
  h: index,
  i: inputswitch_esm,
  m: maskEmail,
  t: textarea_esm,
  u: useLogin
});

var _a, _b;
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const payload_ygjqzWS29n = definePayloadPlugin(() => {
  definePayloadReducer(
    "JSONifiable",
    (data) => data && typeof data === "object" && "toJSON" in data && JSON.stringify(data.toJSON())
  );
});
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const component_45stub2a5tiDYHr6 = {};
const _routes = [
  {
    name: "analytics-slug___en",
    path: "/analytics/:slug()",
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.bW;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "analytics-slug___ru",
    path: "/ru/analytics/:slug()",
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.bW;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "analytics-all___en",
    path: "/analytics/all",
    meta: __nuxt_page_meta$1$1 || {},
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.bY;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "analytics-all___ru",
    path: "/ru/analytics/all",
    meta: __nuxt_page_meta$1$1 || {},
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.bY;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "analytics___en",
    path: "/analytics",
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.bZ;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "analytics___ru",
    path: "/ru/analytics",
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.bZ;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "analytics-recommended___en",
    path: "/analytics/recommended",
    meta: __nuxt_page_meta$5 || {},
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.b_;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "analytics-recommended___ru",
    path: "/ru/analytics/recommended",
    meta: __nuxt_page_meta$5 || {},
    component: () => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
      return n2.b_;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "crypto-slug___en",
    path: "/crypto/:slug()",
    component: () => Promise.resolve().then(function () { return chunkPg__ranking_BFbtassj; }).then(function(n2) {
      return n2.y;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "crypto-slug___ru",
    path: "/ru/crypto/:slug()",
    component: () => Promise.resolve().then(function () { return chunkPg__ranking_BFbtassj; }).then(function(n2) {
      return n2.y;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "dapp-slug___en",
    path: "/dapp/:slug()",
    component: () => Promise.resolve().then(function () { return chunkPg__ranking_BFbtassj; }).then(function(n2) {
      return n2.z;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "dapp-slug___ru",
    path: "/ru/dapp/:slug()",
    component: () => Promise.resolve().then(function () { return chunkPg__ranking_BFbtassj; }).then(function(n2) {
      return n2.z;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "dashboard___en",
    path: "/dashboard",
    meta: __nuxt_page_meta$3 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.k;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "dashboard___ru",
    path: "/ru/dashboard",
    meta: __nuxt_page_meta$3 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.k;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "index___en",
    path: "/",
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.l;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "index___ru",
    path: "/ru",
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.l;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "news-slug___en",
    path: "/news/:slug()",
    component: () => Promise.resolve().then(function () { return chunkPgNewsBCa9OUT9; }).then(function(n2) {
      return n2.a;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "news-slug___ru",
    path: "/ru/news/:slug()",
    component: () => Promise.resolve().then(function () { return chunkPgNewsBCa9OUT9; }).then(function(n2) {
      return n2.a;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "news___en",
    path: "/news",
    meta: __nuxt_page_meta || {},
    component: () => Promise.resolve().then(function () { return chunkPgNewsBCa9OUT9; }).then(function(n2) {
      return n2.i;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "news___ru",
    path: "/ru/news",
    meta: __nuxt_page_meta || {},
    component: () => Promise.resolve().then(function () { return chunkPgNewsBCa9OUT9; }).then(function(n2) {
      return n2.i;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "privacy-policy___en",
    path: "/privacy-policy",
    meta: __nuxt_page_meta$2 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.p;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "privacy-policy___ru",
    path: "/ru/privacy-policy",
    meta: __nuxt_page_meta$2 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.p;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "ranking___en",
    path: "/ranking",
    component: () => import('./chunk-pg-ranking-Cp9KKVZQ.mjs').then(function(n2) {
      return n2.i;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "ranking___ru",
    path: "/ru/ranking",
    component: () => import('./chunk-pg-ranking-Cp9KKVZQ.mjs').then(function(n2) {
      return n2.i;
    }).then((m2) => m2.default || m2)
  },
  {
    name: (_a = __nuxt_page_meta$1) == null ? void 0 : _a.name,
    path: "/settings",
    meta: __nuxt_page_meta$1 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.m;
    }).then((m2) => m2.default || m2),
    children: [
      {
        name: "settings-account-security___en",
        path: "account-security",
        component: () => Promise.resolve().then(function () { return chunkPgSettingsCL27nXzC; }).then(function(n2) {
          return n2.f;
        }).then((m2) => m2.default || m2)
      },
      {
        name: "settings___en",
        path: "",
        component: () => Promise.resolve().then(function () { return chunkPgSettingsCL27nXzC; }).then(function(n2) {
          return n2.h;
        }).then((m2) => m2.default || m2)
      }
    ]
  },
  {
    name: (_b = __nuxt_page_meta$1) == null ? void 0 : _b.name,
    path: "/ru/settings",
    meta: __nuxt_page_meta$1 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.m;
    }).then((m2) => m2.default || m2),
    children: [
      {
        name: "settings-account-security___ru",
        path: "account-security",
        component: () => Promise.resolve().then(function () { return chunkPgSettingsCL27nXzC; }).then(function(n2) {
          return n2.f;
        }).then((m2) => m2.default || m2)
      },
      {
        name: "settings___ru",
        path: "",
        component: () => Promise.resolve().then(function () { return chunkPgSettingsCL27nXzC; }).then(function(n2) {
          return n2.h;
        }).then((m2) => m2.default || m2)
      }
    ]
  },
  {
    name: "terms-conditions___en",
    path: "/terms-conditions",
    meta: __nuxt_page_meta$4 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.n;
    }).then((m2) => m2.default || m2)
  },
  {
    name: "terms-conditions___ru",
    path: "/ru/terms-conditions",
    meta: __nuxt_page_meta$4 || {},
    component: () => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
      return n2.n;
    }).then((m2) => m2.default || m2)
  },
  {
    name: void 0 ,
    path: "/sitemap.xml",
    component: component_45stub2a5tiDYHr6
  },
  {
    name: void 0 ,
    path: "/index-sitemap.xml",
    component: component_45stub2a5tiDYHr6
  },
  {
    name: void 0 ,
    path: "/en-sitemap.xml",
    component: component_45stub2a5tiDYHr6
  },
  {
    name: void 0 ,
    path: "/ru-sitemap.xml",
    component: component_45stub2a5tiDYHr6
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a2;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a2 = useRouter$1().options) == null ? void 0 : _a2.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve2) => setTimeout(resolve2, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter$1();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
const redirects_45global = defineNuxtRouteMiddleware((to) => {
  const directRedirects = {
    "/news/all": "/news",
    "/dapps/all": "/ranking",
    "/ru/dapps/all": "/ru/ranking",
    "/ru/news/all": "/ru/news"
  };
  const redirectToHomePage = [
    "/forgot-password",
    "/contact",
    "/gallery",
    "/register",
    "/what-is-internet-web-30",
    "/blockchains",
    "/ru/blockchains",
    "/video"
  ];
  const redirectToAnalytics = [
    "/blockchain",
    "/ru/ru_blockchain",
    "/ru/ru_blockchain_category",
    "/blockchain_category",
    "/posts",
    "/ru/posts"
  ];
  if (directRedirects[to.path]) {
    return navigateTo(directRedirects[to.path]);
  }
  if (redirectToHomePage.some((baseUrl) => to.path.startsWith(baseUrl))) {
    if (to.path.startsWith("/ru")) {
      return navigateTo("/ru");
    } else {
      return navigateTo("/");
    }
  }
  const shouldRedirectToAnalytics = (url) => {
    return redirectToAnalytics.some((baseUrl) => url.startsWith(baseUrl));
  };
  if (shouldRedirectToAnalytics(to.path)) {
    if (to.path.startsWith("/ru")) {
      return navigateTo("/ru/analytics");
    } else {
      return navigateTo("/analytics");
    }
  }
});
const manifest_45route_45rule = defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  redirects_45global,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-CqhRMrnS.mjs')
};
const plugin$1 = defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2, _b2, _c;
    let __temp, __restore;
    let routerBase = useRuntimeConfig().app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a3, _b3, _c2, _d;
      if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key]
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_b2 = nuxtApp.ssrContext) == null ? void 0 : _b2.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.matched.length === 0) {
          await nuxtApp.runWithContext(() => showError(createError$1({
            statusCode: 404,
            fatal: false,
            statusMessage: `Page not found: ${to.fullPath}`,
            data: {
              path: to.fullPath
            }
          })));
        } else if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a3, _b3;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a3 = nuxtApp.ssrContext) == null ? void 0 : _a3.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
const _0_siteConfig_MwZUzHrRNP = defineNuxtPlugin({
  name: "nuxt-site-config:init",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a2;
    const state = useState("site-config");
    {
      const context = (_a2 = useRequestEvent()) == null ? void 0 : _a2.context;
      nuxtApp.hooks.hook("app:rendered", () => {
        state.value = context == null ? void 0 : context.siteConfig.get({
          debug: useRuntimeConfig()["nuxt-site-config"].debug,
          resolveRefs: true
        });
      });
    }
    let stack = {};
    return {
      provide: {
        nuxtSiteConfig: stack
      }
    };
  }
});
const reducers = {
  NuxtError: (data) => isNuxtError(data) && data.toJSON(),
  EmptyShallowRef: (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  EmptyRef: (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_"),
  ShallowRef: (data) => isRef(data) && isShallow(data) && data.value,
  ShallowReactive: (data) => isReactive(data) && isShallow(data) && toRaw(data),
  Ref: (data) => isRef(data) && data.value,
  Reactive: (data) => isReactive(data) && toRaw(data)
};
{
  reducers.Island = (data) => data && (data == null ? void 0 : data.__nuxt_island);
}
const revive_payload_server_eJ33V7gbc6 = defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const reducer in reducers) {
      definePayloadReducer(reducer, reducers[reducer]);
    }
  }
});
const plugin = defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const LazyPrimeCalendar = defineAsyncComponent(() => Promise.resolve().then(function () { return chunkPgSettingsCL27nXzC; }).then(function(n2) {
  return n2.g;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeCheckbox = defineAsyncComponent(() => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
  return n2.bT;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeDropdown = defineAsyncComponent(() => Promise.resolve().then(function () { return chunkPg__ranking_BFbtassj; }).then(function(n2) {
  return n2.x;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeInputNumber = defineAsyncComponent(() => import('./inputnumber.esm-D-l5XaIq.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeInputSwitch = defineAsyncComponent(() => Promise.resolve().then(function () { return chunkPgSettingsCL27nXzC; }).then(function(n2) {
  return n2.i;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeInputText = defineAsyncComponent(() => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
  return n2.bU;
}).then((r) => r["default"] || r.default || r));
const LazyPrimePassword = defineAsyncComponent(() => import('./password.esm-F9-Vbrfa.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeSelectButton = defineAsyncComponent(() => import('./selectbutton.esm-BqFjQi92.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeTextarea = defineAsyncComponent(() => Promise.resolve().then(function () { return chunkPgSettingsCL27nXzC; }).then(function(n2) {
  return n2.t;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeButton = defineAsyncComponent(() => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
  return n2.bS;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeAccordion = defineAsyncComponent(() => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
  return n2.i;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeAccordionTab = defineAsyncComponent(() => Promise.resolve().then(function () { return chunkPgMisc3QAbi6Xo; }).then(function(n2) {
  return n2.j;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeDeferredContent = defineAsyncComponent(() => import('./deferredcontent.esm-BVe0xVE1.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeDialog = defineAsyncComponent(() => import('./dialog.esm-ClGlMgQg.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeOverlayPanel = defineAsyncComponent(() => import('./overlaypanel.esm-D4ofBjes.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeSidebar = defineAsyncComponent(() => import('./sidebar.esm-DjOWB8MN.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeFileUpload = defineAsyncComponent(() => import('./fileupload.esm-z9zbEHKG.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeMenu = defineAsyncComponent(() => import('./menu.esm-C0Qfn3t0.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeTabMenu = defineAsyncComponent(() => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
  return n2.bX;
}).then((r) => r["default"] || r.default || r));
const LazyPrimeToast = defineAsyncComponent(() => import('./toast.esm-Q52pdMeM.mjs').then((r) => r["default"] || r.default || r));
const LazyPrimeProgressSpinner = defineAsyncComponent(() => import('./chunk-pg-(articles)-D5MrPPlE.mjs').then(function(n2) {
  return n2.bV;
}).then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["PrimeCalendar", LazyPrimeCalendar],
  ["PrimeCheckbox", LazyPrimeCheckbox],
  ["PrimeDropdown", LazyPrimeDropdown],
  ["PrimeInputNumber", LazyPrimeInputNumber],
  ["PrimeInputSwitch", LazyPrimeInputSwitch],
  ["PrimeInputText", LazyPrimeInputText],
  ["PrimePassword", LazyPrimePassword],
  ["PrimeSelectButton", LazyPrimeSelectButton],
  ["PrimeTextarea", LazyPrimeTextarea],
  ["PrimeButton", LazyPrimeButton],
  ["PrimeAccordion", LazyPrimeAccordion],
  ["PrimeAccordionTab", LazyPrimeAccordionTab],
  ["PrimeDeferredContent", LazyPrimeDeferredContent],
  ["PrimeDialog", LazyPrimeDialog],
  ["PrimeOverlayPanel", LazyPrimeOverlayPanel],
  ["PrimeSidebar", LazyPrimeSidebar],
  ["PrimeFileUpload", LazyPrimeFileUpload],
  ["PrimeMenu", LazyPrimeMenu],
  ["PrimeTabMenu", LazyPrimeTabMenu],
  ["PrimeToast", LazyPrimeToast],
  ["PrimeProgressSpinner", LazyPrimeProgressSpinner]
];
const components_plugin_KR1HBZs4kY = defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
const REGEX_CRAWLER = new RegExp(/Googlebot\/|Googlebot-Mobile|Googlebot-Image|Googlebot-News|Googlebot-Video|AdsBot-Google([^-]|$)|AdsBot-Google-Mobile|Feedfetcher-Google|Mediapartners-Google|Mediapartners \(Googlebot\)|APIs-Google|Google-InspectionTool|Storebot-Google|GoogleOther|bingbot|Slurp|[wW]get|LinkedInBot|Python-urllib|python-requests|aiohttp|httpx|libwww-perl|httpunit|Nutch|Go-http-client|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|BIGLOTRON|Teoma|convera|seekbot|Gigabot|Gigablast|exabot|ia_archiver|GingerCrawler|webmon |HTTrack|grub\.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|findlink|msrbot|panscient|yacybot|AISearchBot|ips-agent|tagoobot|MJ12bot|woriobot|yanga|buzzbot|mlbot|yandex\.com\/bots|purebot|Linguee Bot|CyberPatrol|voilabot|Baiduspider|citeseerxbot|spbot|twengabot|postrank|Turnitin|scribdbot|page2rss|sitebot|linkdex|Adidxbot|ezooms|dotbot|Mail\.RU_Bot|discobot|heritrix|findthatfile|europarchive\.org|NerdByNature\.Bot|(sistrix|SISTRIX) [cC]rawler|Ahrefs(Bot|SiteAudit)|fuelbot|CrunchBot|IndeedBot|mappydata|woobot|ZoominfoBot|PrivacyAwareBot|Multiviewbot|SWIMGBot|Grobbot|eright|Apercite|semanticbot|Aboundex|domaincrawler|wbsearchbot|summify|CCBot|edisterbot|SeznamBot|ec2linkfinder|gslfbot|aiHitBot|intelium_bot|facebookexternalhit|Yeti|RetrevoPageAnalyzer|lb-spider|Sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net\.com\.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|it2media-domain-crawler|ip-web-crawler\.com|siteexplorer\.info|elisabot|proximic|changedetection|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|CC Metadata Scaper|g00g1e\.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Twitterbot|cXensebot|smtbot|bnf\.fr_bot|A6-Indexer|ADmantX|Facebot|OrangeBot\/|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive\.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|S[eE][mM]rushBot|yoozBot|lipperhey|Y!J|Domain Re-Animator Bot|AddThis|Screaming Frog SEO Spider|MetaURI|Scrapy|Livelap[bB]ot|OpenHoseBot|CapsuleChecker|collection@infegy\.com|IstellaBot|DeuSu\/|betaBot|Cliqzbot\/|MojeekBot\/|netEstate NE Crawler|SafeSearch microdata crawler|Gluten Free Crawler\/|Sonic|Sysomos|Trove|deadlinkchecker|Slack-ImgProxy|Embedly|RankActiveLinkBot|iskanie|SafeDNSBot|SkypeUriPreview|Veoozbot|Slackbot|redditbot|datagnionbot|Google-Adwords-Instant|adbeat_bot|WhatsApp|contxbot|pinterest\.com\/bot|electricmonk|GarlikCrawler|BingPreview\/|vebidoobot|FemtosearchBot|Yahoo Link Preview|MetaJobBot|DomainStatsBot|mindUpBot|Daum\/|Jugendschutzprogramm-Crawler|Xenu Link Sleuth|Pcore-HTTP|moatbot|KosmioBot|[pP]ingdom|AppInsights|PhantomJS|Gowikibot|PiplBot|Discordbot|TelegramBot|Jetslide|newsharecounts|James BOT|Bark[rR]owler|TinEye|SocialRankIOBot|trendictionbot|Ocarinabot|epicbot|Primalbot|DuckDuckGo-Favicons-Bot|GnowitNewsbot|Leikibot|LinkArchiver|YaK\/|PaperLiBot|Digg Deeper|dcrawl|Snacktory|AndersPinkBot|Fyrebot|EveryoneSocialBot|Mediatoolkitbot|Luminator-robots|ExtLinksBot|SurveyBot|NING\/|okhttp|Nuzzel|omgili|PocketParser|YisouSpider|um-LN|ToutiaoSpider|MuckRack|Jamie's Spider|AHC\/|NetcraftSurveyAgent|Laserlikebot|^Apache-HttpClient|AppEngine-Google|Jetty|Upflow|Thinklab|Traackr\.com|Twurly|Mastodon|http_get|DnyzBot|botify|007ac9 Crawler|BehloolBot|BrandVerity|check_http|BDCbot|ZumBot|EZID|ICC-Crawler|ArchiveBot|^LCC |filterdb\.iss\.net\/crawler|BLP_bbot|BomboraBot|Buck\/|Companybook-Crawler|Genieo|magpie-crawler|MeltwaterNews|Moreover|newspaper\/|ScoutJet|(^| )sentry\/|StorygizeBot|UptimeRobot|OutclicksBot|seoscanners|Hatena|Google Web Preview|MauiBot|AlphaBot|SBL-BOT|IAS crawler|adscanner|Netvibes|acapbot|Baidu-YunGuanCe|bitlybot|blogmuraBot|Bot\.AraTurka\.com|bot-pge\.chlooe\.com|BoxcarBot|BTWebClient|ContextAd Bot|Digincore bot|Disqus|Feedly|Fetch\/|Fever|Flamingo_SearchEngine|FlipboardProxy|g2reader-bot|G2 Web Services|imrbot|K7MLWCBot|Kemvibot|Landau-Media-Spider|linkapediabot|vkShare|Siteimprove\.com|BLEXBot\/|DareBoost|ZuperlistBot\/|Miniflux\/|Feedspot|Diffbot\/|SEOkicks|tracemyfile|Nimbostratus-Bot|zgrab|PR-CY\.RU|AdsTxtCrawler|Datafeedwatch|Zabbix|TangibleeBot|google-xrawler|axios|Amazon CloudFront|Pulsepoint|CloudFlare-AlwaysOnline|Google-Structured-Data-Testing-Tool|WordupInfoSearch|WebDataStats|HttpUrlConnection|ZoomBot|VelenPublicWebCrawler|MoodleBot|jpg-newsbot|outbrain|W3C_Validator|Validator\.nu|W3C-checklink|W3C-mobileOK|W3C_I18n-Checker|FeedValidator|W3C_CSS_Validator|W3C_Unicorn|Google-PhysicalWeb|Blackboard|ICBot\/|BazQux|Twingly|Rivva|Experibot|awesomecrawler|Dataprovider\.com|GroupHigh\/|theoldreader\.com|AnyEvent|Uptimebot\.org|Nmap Scripting Engine|2ip\.ru|Clickagy|Caliperbot|MBCrawler|online-webceo-bot|B2B Bot|AddSearchBot|Google Favicon|HubSpot|Chrome-Lighthouse|HeadlessChrome|CheckMarkNetwork\/|www\.uptime\.com|Streamline3Bot\/|serpstatbot\/|MixnodeCache\/|^curl|SimpleScraper|RSSingBot|Jooblebot|fedoraplanet|Friendica|NextCloud|Tiny Tiny RSS|RegionStuttgartBot|Bytespider|Datanyze|Google-Site-Verification|TrendsmapResolver|tweetedtimes|NTENTbot|Gwene|SimplePie|SearchAtlas|Superfeedr|feedbot|UT-Dorkbot|Amazonbot|SerendeputyBot|Eyeotabot|officestorebot|Neticle Crawler|SurdotlyBot|LinkisBot|AwarioSmartBot|AwarioRssBot|RyteBot|FreeWebMonitoring SiteChecker|AspiegelBot|NAVER Blog Rssbot|zenback bot|SentiBot|Domains Project\/|Pandalytics|VKRobot|bidswitchbot|tigerbot|NIXStatsbot|Atom Feed Robot|[Cc]urebot|PagePeeker\/|Vigil\/|rssbot\/|startmebot\/|JobboerseBot|seewithkids|NINJA bot|Cutbot|BublupBot|BrandONbot|RidderBot|Taboolabot|Dubbotbot|FindITAnswersbot|infoobot|Refindbot|BlogTraffic\/\d\.\d+ Feed-Fetcher|SeobilityBot|Cincraw|Dragonbot|VoluumDSP-content-bot|FreshRSS|BitBot|^PHP-Curl-Class|Google-Certificates-Bridge|centurybot|Viber|e\.ventures Investment Crawler|evc-batch|PetalBot|virustotal|(^| )PTST\/|minicrawler|Cookiebot|trovitBot|seostar\.co|IonCrawl|Uptime-Kuma|Seekport|FreshpingBot|Feedbin|CriteoBot|Snap URL Preview Service|Better Uptime Bot|RuxitSynthetic|Google-Read-Aloud|Valve\/Steam|OdklBot\/|GPTBot|ChatGPT-User|YandexRenderResourcesBot\/|LightspeedSystemsCrawler|ev-crawler\/|BitSightBot\/|woorankreview\/|Google-Safety|AwarioBot|DataForSeoBot|Linespider|WellKnownBot|A Patent Crawler|StractBot|search\.marginalia\.nu|YouBot|Nicecrawler|Neevabot|BrightEdge Crawler|SiteCheckerBotCrawler|TombaPublicWebCrawler|CrawlyProjectCrawler|KomodiaBot|KStandBot|CISPA Webcrawler|MTRobot|hyscore\.io|AlexandriaOrgBot|2ip bot|Yellowbrandprotectionbot|SEOlizer|vuhuvBot|INETDEX-BOT|Synapse|t3versionsBot|deepnoc|Cocolyzebot|hypestat|ReverseEngineeringBot|sempi\.tech|Iframely|MetaInspector|node-fetch|lkxscan|python-opengraph|OpenGraphCheck|developers\.google\.com\/\+\/web\/snippet|SenutoBot|MaCoCu|NewsBlur|inoreader|NetSystemsResearch|PageThing|WordPress\/|PhxBot|ImagesiftBot|Expanse|InternetMeasurement|^BW\/|GeedoBot|Audisto Crawler|PerplexityBot\/|[cC]laude[bB]ot|Monsidobot|GroupMeBot|Vercelbot|vercel-screenshot/);
const REGEX_MOBILE1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|FBAN|FBAV|fennec|hiptop|iemobile|ip(hone|od)|Instagram|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
const REGEX_MOBILE2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
const REGEX_MOBILE_OR_TABLET1 = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|FBAN|FBAV|fennec|hiptop|iemobile|ip(hone|od)|Instagram|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
const REGEX_MOBILE_OR_TABLET2 = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
function isMobile(userAgent) {
  return REGEX_MOBILE1.test(userAgent) || REGEX_MOBILE2.test(userAgent.slice(0, 4));
}
function isMobileOrTablet(userAgent) {
  return REGEX_MOBILE_OR_TABLET1.test(userAgent) || REGEX_MOBILE_OR_TABLET2.test(userAgent.slice(0, 4));
}
function isIos(userAgent) {
  return /iPad|iPhone|iPod/.test(userAgent);
}
function isAndroid(userAgent) {
  return /android/i.test(userAgent);
}
function isWindows(userAgent) {
  return /Windows/.test(userAgent);
}
function isMacOS(userAgent) {
  return /Mac OS X/.test(userAgent);
}
const browsers = [
  { name: "Samsung", regex: /SamsungBrowser/i },
  { name: "Edge", regex: /edg(?:[ea]|ios)?\//i },
  { name: "Firefox", regex: /firefox|iceweasel|fxios/i },
  { name: "Chrome", regex: /chrome|crios|crmo/i },
  { name: "Safari", regex: /safari|applewebkit/i }
];
function getBrowserName(userAgent) {
  for (const browser of browsers) {
    if (browser.regex.test(userAgent)) {
      return browser.name;
    }
  }
  return "";
}
function generateFlags(userAgent, headers = {}) {
  let mobile = false;
  let mobileOrTablet = false;
  let ios = false;
  let android = false;
  if (userAgent === "Amazon CloudFront") {
    if (headers["cloudfront-is-mobile-viewer"] === "true") {
      mobile = true;
      mobileOrTablet = true;
    }
    if (headers["cloudfront-is-tablet-viewer"] === "true") {
      mobile = false;
      mobileOrTablet = true;
    }
    if (headers["cloudfront-is-desktop-viewer"] === "true") {
      mobile = false;
      mobileOrTablet = false;
    }
    if (headers["cloudfront-is-ios-viewer"] === "true") {
      ios = true;
    }
    if (headers["cloudfront-is-android-viewer"] === "true") {
      android = true;
    }
  } else if (headers && headers["cf-device-type"]) {
    switch (headers["cf-device-type"]) {
      case "mobile":
        mobile = true;
        mobileOrTablet = true;
        break;
      case "tablet":
        mobile = false;
        mobileOrTablet = true;
        break;
      case "desktop":
        mobile = false;
        mobileOrTablet = false;
        break;
    }
  } else {
    mobile = isMobile(userAgent);
    mobileOrTablet = isMobileOrTablet(userAgent);
    ios = isIos(userAgent);
    android = isAndroid(userAgent);
  }
  const windows = isWindows(userAgent);
  const macOS = isMacOS(userAgent);
  const browserName = getBrowserName(userAgent);
  const isSafari = browserName === "Safari";
  const isFirefox = browserName === "Firefox";
  const isEdge = browserName === "Edge";
  const isChrome = browserName === "Chrome";
  const isSamsung = browserName === "Samsung";
  const isCrawler = REGEX_CRAWLER.test(userAgent);
  return {
    userAgent,
    isMobile: mobile,
    isMobileOrTablet: mobileOrTablet,
    isTablet: !mobile && mobileOrTablet,
    isDesktop: !mobileOrTablet,
    isIos: ios,
    isAndroid: android,
    isWindows: windows,
    isMacOS: macOS,
    isApple: macOS || ios,
    isDesktopOrTablet: !mobile,
    isSafari,
    isFirefox,
    isEdge,
    isChrome,
    isSamsung,
    isCrawler
  };
}
const plugin_ghbUAjaD3n = defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const defaultUserAgent = runtimeConfig.public.device.defaultUserAgent;
  let flags;
  {
    const headers = useRequestHeaders();
    const userAgent = headers["user-agent"] || defaultUserAgent;
    flags = reactive(generateFlags(userAgent, headers));
  }
  return {
    provide: {
      device: flags
    }
  };
});
function titleCase(s) {
  return s.replaceAll("-", " ").replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase());
}
const titles_dw2T9lEw4h = defineNuxtPlugin({
  name: "nuxt-seo:fallback-titles",
  env: {
    islands: false
  },
  setup() {
    const route = useRoute$1();
    const title = computed(() => {
      var _a2, _b2;
      if (typeof ((_a2 = route.meta) == null ? void 0 : _a2.title) === "string")
        return (_b2 = route.meta) == null ? void 0 : _b2.title;
      const path = withoutTrailingSlash(route.path || "/");
      const lastSegment = path.split("/").pop();
      return lastSegment ? titleCase(lastSegment) : null;
    });
    const minimalPriority = {
      // give nuxt.config values higher priority
      tagPriority: 101
    };
    useHead$1({ title: () => title.value }, minimalPriority);
  }
});
function useSiteConfig(options) {
  let stack;
  stack = useRequestEvent().context.siteConfig.get(defu({ resolveRefs: true }, options));
  return stack || {};
}
function useNitroOrigin(e) {
  {
    e = e || useRequestEvent();
    return e.context.siteConfigNitroOrigin;
  }
}
function resolveSitePath(pathOrUrl, options) {
  let path = pathOrUrl;
  if (hasProtocol(pathOrUrl, { strict: false, acceptRelative: true })) {
    const parsed = parseURL(pathOrUrl);
    path = parsed.pathname;
  }
  const base = withLeadingSlash(options.base || "/");
  if (base !== "/" && path.startsWith(base)) {
    path = path.slice(base.length);
  }
  let origin = withoutTrailingSlash(options.absolute ? options.siteUrl : "");
  if (base !== "/" && origin.endsWith(base)) {
    origin = origin.slice(0, origin.indexOf(base));
  }
  const baseWithOrigin = options.withBase ? withBase(base, origin || "/") : origin;
  const resolvedUrl = withBase(path, baseWithOrigin);
  return path === "/" && !options.withBase ? withTrailingSlash(resolvedUrl) : fixSlashes(options.trailingSlash, resolvedUrl);
}
function isPathFile(path) {
  var _a2;
  const lastSegment = path.split("/").pop();
  return !!((_a2 = (lastSegment || path).match(/\.[0-9a-z]+$/i)) == null ? void 0 : _a2[0]);
}
function fixSlashes(trailingSlash, pathOrUrl) {
  const $url = parseURL(pathOrUrl);
  if (isPathFile($url.pathname))
    return pathOrUrl;
  const fixedPath = trailingSlash ? withTrailingSlash($url.pathname) : withoutTrailingSlash($url.pathname);
  return `${$url.protocol ? `${$url.protocol}//` : ""}${$url.host || ""}${fixedPath}${$url.search || ""}${$url.hash || ""}`;
}
function createSitePathResolver(options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const nuxtBase = useRuntimeConfig().app.baseURL || "/";
  return (path) => {
    return computed(() => resolveSitePath(unref(path), {
      absolute: unref(options.absolute),
      withBase: unref(options.withBase),
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base: nuxtBase
    }));
  };
}
function withSiteUrl(path, options = {}) {
  const siteConfig = useSiteConfig();
  const nitroOrigin = useNitroOrigin();
  const base = useRuntimeConfig().app.baseURL || "/";
  return computed(() => {
    return resolveSitePath(unref(path), {
      absolute: true,
      siteUrl: unref(options.canonical) !== false || false ? siteConfig.url : nitroOrigin,
      trailingSlash: siteConfig.trailingSlash,
      base,
      withBase: unref(options.withBase)
    });
  });
}
function applyDefaults(i18n) {
  const { canonicalQueryWhitelist } = useRuntimeConfig().public["nuxt-seo"];
  const siteConfig = useSiteConfig();
  const route = useRoute$1();
  const resolveUrl = createSitePathResolver({ withBase: true, absolute: true });
  const canonicalUrl = computed(() => {
    const { query } = route;
    const url = resolveUrl(route.path || "/").value || route.path;
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([key]) => canonicalQueryWhitelist.includes(key))
    );
    return Object.keys(filteredQuery).length ? `${url}?${stringifyQuery(filteredQuery)}` : url;
  });
  const minimalPriority = {
    // give nuxt.config values higher priority
    tagPriority: 101
  };
  useHead$1({
    htmlAttrs: { lang: i18n.locale },
    templateParams: { site: siteConfig, siteName: siteConfig.name || "" },
    titleTemplate: "%s %separator %siteName",
    link: [{ rel: "canonical", href: () => canonicalUrl.value }]
  }, minimalPriority);
  const seoMeta = {
    ogType: "website",
    ogUrl: () => canonicalUrl.value,
    ogLocale: () => i18n.locale.value,
    ogSiteName: siteConfig.name
  };
  if (siteConfig.description)
    seoMeta.description = siteConfig.description;
  if (siteConfig.twitter) {
    const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter : `@${siteConfig.twitter}`;
    seoMeta.twitterCreator = id;
    seoMeta.twitterSite = id;
  }
  useSeoMeta(seoMeta, minimalPriority);
}
const defaultsWaitI18n_fcc0iSNKKy = defineNuxtPlugin({
  name: "nuxt-seo:defaults",
  env: {
    islands: false
  },
  // we need to wait for the i18n plugin to run first
  // @ts-expect-error dynamic
  dependsOn: [
    "nuxt-site-config:i18n"
  ],
  setup(nuxtApp) {
    var _a2, _b2;
    const siteConfig = useSiteConfig();
    const locale = ref(((_b2 = (_a2 = nuxtApp.$i18n) == null ? void 0 : _a2.locale) == null ? void 0 : _b2.value) || siteConfig.currentLocale || siteConfig.defaultLocale);
    nuxtApp.hook("i18n:localeSwitched", ({ newLocale }) => {
      locale.value = newLocale;
    });
    applyDefaults({ locale });
  }
});
const siteConfig_izaWKZ8rEu = defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  const siteConfig = useSiteConfig();
  const input = {
    meta: [],
    templateParams: {
      site: siteConfig,
      // support legacy
      siteUrl: siteConfig.url,
      siteName: siteConfig.name
    }
  };
  if (siteConfig.separator)
    input.templateParams.separator = siteConfig.separator;
  if (siteConfig.titleSeparator)
    input.templateParams.titleSeparator = siteConfig.titleSeparator;
  if (siteConfig.description) {
    input.templateParams.siteDescription = siteConfig.description;
    input.meta.push(
      {
        name: "description",
        content: "%site.description"
      }
    );
  }
  head.push(input, { tagPriority: 150 });
});
const inferSeoMetaPlugin_Uk9bcXDHeN = defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head)
    return;
  head.use(InferSeoMetaPlugin());
});
function useSchemaOrg(input) {
  var _a2;
  const _config = useRuntimeConfig();
  const config = _config["nuxt-schema-org"] || _config.public["nuxt-schema-org"];
  const script = {
    type: "application/ld+json",
    key: "schema-org-graph",
    nodes: input,
    ...(config == null ? void 0 : config.scriptAttributes) || {}
  };
  {
    const event = useRequestEvent();
    if (typeof (event == null ? void 0 : event.context.robots) !== "undefined" && !((_a2 = event.context.robots) == null ? void 0 : _a2.indexable)) {
      return;
    }
    return useServerHead({
      script: [script]
    });
  }
}
function initPlugin(nuxtApp) {
  const head = injectHead();
  const _config = useRuntimeConfig();
  const config = _config["nuxt-schema-org"] || _config.public["nuxt-schema-org"];
  const route = useRoute$1();
  const siteConfig = useSiteConfig();
  const resolvePath = createSitePathResolver({
    absolute: false,
    withBase: true
  });
  const resolveUrl = createSitePathResolver({
    canonical: true,
    absolute: true,
    withBase: true
  });
  const schemaOrg = computed(() => {
    var _a2;
    return {
      ...((_a2 = route.meta) == null ? void 0 : _a2.schemaOrg) || {},
      ...siteConfig,
      url: resolveUrl(route.path),
      host: withoutTrailingSlash(siteConfig.url),
      inLanguage: siteConfig.currentLocale || siteConfig.defaultLocale,
      path: resolvePath(route.path)
    };
  });
  head.push({ templateParams: { schemaOrg } });
  head.use(
    SchemaOrgUnheadPlugin({}, async () => {
      const meta = {};
      await nuxtApp.hooks.callHook("schema-org:meta", meta);
      return meta;
    }, {
      minify: config.minify,
      trailingSlash: siteConfig.trailingSlash
    })
  );
}
function maybeAddIdentitySchemaOrg() {
  const _config = useRuntimeConfig();
  const runtimeConfig = _config["nuxt-schema-org"] || _config.public["nuxt-schema-org"];
  const siteConfig = useSiteConfig();
  if (runtimeConfig.identity || siteConfig.identity) {
    const identity = runtimeConfig.identity || siteConfig.identity;
    let identityPayload = {
      name: siteConfig.name,
      url: siteConfig.url
    };
    let identityType;
    if (typeof identity !== "string") {
      identityPayload = defu(identity, identityPayload);
      identityType = identity.type;
      delete identityPayload.type;
    } else {
      identityType = identity;
    }
    if (siteConfig.twitter) {
      const id = siteConfig.twitter.startsWith("@") ? siteConfig.twitter.slice(1) : siteConfig.twitter;
      identityPayload.sameAs = [
        `https://twitter.com/${id}`
      ];
    }
    useSchemaOrg([
      identityType === "Person" ? definePerson(identityPayload) : defineOrganization(identityPayload)
    ]);
  }
}
const defaults_CcNrs0tTlX = defineNuxtPlugin({
  name: "nuxt-schema-org:defaults",
  dependsOn: [
    "nuxt-schema-org:init"
  ],
  setup(nuxtApp) {
    var _a2;
    const siteConfig = useSiteConfig();
    const pathResolver = createSitePathResolver({
      canonical: true,
      absolute: true
    });
    if (!nuxtApp.$i18n)
      return;
    const localePath2 = useLocalePath();
    const locales = ((_a2 = nuxtApp.$i18n) == null ? void 0 : _a2.locales.value) || [];
    const siteUrl = pathResolver(localePath2("index")).value;
    const websiteId = `${siteUrl}#website`;
    const website = defineWebSite({
      "@id": websiteId,
      "url": siteUrl,
      "name": (siteConfig == null ? void 0 : siteConfig.name) || "",
      "inLanguage": nuxtApp.$i18n.localeProperties.value.language || "",
      "description": siteConfig.description || ""
    });
    const nuxtBase = useRuntimeConfig().app.baseURL || "/";
    const resolveIdForLocale = (locale) => {
      if (locale.domain) {
        return resolveSitePath(localePath2("index", locale.code), {
          absolute: true,
          siteUrl: hasProtocol(locale.domain, { acceptRelative: false }) ? locale.domain : withHttps(locale.domain),
          trailingSlash: siteConfig.trailingSlash,
          base: nuxtBase
        });
      }
      return pathResolver(localePath2("index", locale.code)).value;
    };
    if (siteConfig.defaultLocale) {
      if (siteConfig.currentLocale && siteConfig.currentLocale !== siteConfig.defaultLocale) {
        website.translationOfWork = {
          "@type": "WebSite",
          "@id": `${resolveIdForLocale({ code: siteConfig.currentLocale })}#website`
        };
      } else {
        website.workTranslation = locales.filter((locale) => locale.code !== siteConfig.defaultLocale).map((locale) => {
          return {
            "@type": "WebSite",
            "@id": `${resolveIdForLocale(locale)}#website`
          };
        });
      }
    }
    useSchemaOrg([
      website,
      defineWebPage({
        isPartOf: {
          "@id": websiteId
        }
      })
    ]);
    maybeAddIdentitySchemaOrg();
  }
});
const componentNames = [{ "hash": "i0Vxmj8bqg", "pascalName": "BrandedLogo", "kebabName": "branded-logo", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "tBHg51xiAt", "pascalName": "Frame", "kebabName": "frame", "category": "community", "credits": "@arashsheyda <https://github.com/arashsheyda>" }, { "hash": "Sqc3OTP2KQ", "pascalName": "Nuxt", "kebabName": "nuxt", "category": "community", "credits": "NuxtLabs <https://nuxtlabs.com/>" }, { "hash": "i7kLnGApLD", "pascalName": "NuxtSeo", "kebabName": "nuxt-seo", "category": "community", "credits": "Nuxt SEO <https://nuxtseo.com/>" }, { "hash": "q432NYEB0T", "pascalName": "Pergel", "kebabName": "pergel", "category": "community", "credits": "Pergel <https://nuxtlabs.com/>" }, { "hash": "6bQOH7FKu2", "pascalName": "SimpleBlog", "kebabName": "simple-blog", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "wt558K6QyQ", "pascalName": "UnJs", "kebabName": "un-js", "category": "community", "credits": "UnJS <https://unjs.io/>" }, { "hash": "6RdQZcuwZZ", "pascalName": "Wave", "kebabName": "wave", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }, { "hash": "gaB1TrbtTl", "pascalName": "WithEmoji", "kebabName": "with-emoji", "category": "community", "credits": "Full Stack Heroes <https://fullstackheroes.com/>" }];
function isInternalRoute(path) {
  return path.startsWith("/_") || path.startsWith("@");
}
function filterIsOgImageOption(key) {
  const keys = [
    "url",
    "extension",
    "width",
    "height",
    "fonts",
    "alt",
    "props",
    "renderer",
    "html",
    "component",
    "renderer",
    "emojis",
    "_query",
    "satori",
    "resvg",
    "sharp",
    "screenshot",
    "cacheMaxAgeSeconds"
  ];
  return keys.includes(key);
}
function separateProps(options, ignoreKeys = []) {
  options = options || {};
  const _props = defu(options.props, Object.fromEntries(
    Object.entries({ ...options }).filter(([k2]) => !filterIsOgImageOption(k2) && !ignoreKeys.includes(k2))
  ));
  const props = {};
  Object.entries(_props).forEach(([key, val]) => {
    props[key.replace(/-([a-z])/g, (g2) => g2[1].toUpperCase())] = val;
  });
  return {
    ...Object.fromEntries(
      Object.entries({ ...options }).filter(([k2]) => filterIsOgImageOption(k2) || ignoreKeys.includes(k2))
    ),
    props
  };
}
function withoutQuery(path) {
  return path.split("?")[0];
}
function getExtension(path) {
  path = withoutQuery(path);
  const lastSegment = path.split("/").pop() || path;
  return lastSegment.split(".").pop() || lastSegment;
}
function getOgImagePath(pagePath, _options) {
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const options = defu(_options, useOgImageRuntimeConfig().defaults);
  return joinURL("/", baseURL2, `__og-image__/${"image"}`, pagePath, `og.${options.extension}`);
}
function useOgImageRuntimeConfig() {
  return useRuntimeConfig()["nuxt-og-image"];
}
function createOgImageMeta(src, input, resolvedOptions, ssrContext) {
  const _input = separateProps(defu(input, ssrContext._ogImagePayload));
  let url = src || input.url || resolvedOptions.url;
  if (!url)
    return;
  if (input._query && Object.keys(input._query).length && url)
    url = withQuery(url, { _query: input._query });
  let urlExtension = getExtension(url) || resolvedOptions.extension;
  if (urlExtension === "jpg")
    urlExtension = "jpeg";
  const meta = [
    { property: "og:image", content: url },
    { property: "og:image:type", content: `image/${urlExtension}` },
    { name: "twitter:card", content: "summary_large_image" },
    // we don't need this but avoids issue when using useSeoMeta({ twitterImage })
    { name: "twitter:image", content: url },
    { name: "twitter:image:src", content: url }
  ];
  if (resolvedOptions.width) {
    meta.push({ property: "og:image:width", content: resolvedOptions.width });
    meta.push({ name: "twitter:image:width", content: resolvedOptions.width });
  }
  if (resolvedOptions.height) {
    meta.push({ property: "og:image:height", content: resolvedOptions.height });
    meta.push({ name: "twitter:image:height", content: resolvedOptions.height });
  }
  if (resolvedOptions.alt) {
    meta.push({ property: "og:image:alt", content: resolvedOptions.alt });
    meta.push({ name: "twitter:image:alt", content: resolvedOptions.alt });
  }
  ssrContext._ogImageInstances = ssrContext._ogImageInstances || [];
  const script = [];
  if (src) {
    script.push({
      id: "nuxt-og-image-options",
      type: "application/json",
      processTemplateParams: true,
      innerHTML: () => {
        const payload = resolveUnrefHeadInput(_input);
        if (typeof payload.props.title === "undefined")
          payload.props.title = "%s";
        delete payload.url;
        return stringify(payload);
      },
      // we want this to be last in our head
      tagPosition: "bodyClose"
    });
  }
  const instance = useServerHead({
    script,
    meta
  }, {
    tagPriority: 35
  });
  ssrContext._ogImagePayload = _input;
  ssrContext._ogImageInstances.push(instance);
}
function normaliseOptions(_options) {
  var _a2;
  const options = { ...unref(_options) };
  if (!options)
    return options;
  if (options.component && componentNames) {
    const originalName = options.component;
    for (const component of componentNames) {
      if (component.pascalName.endsWith(originalName) || component.kebabName.endsWith(originalName)) {
        options.component = component.pascalName;
        break;
      }
    }
  } else if (!options.component) {
    options.component = (_a2 = componentNames[0]) == null ? void 0 : _a2.pascalName;
  }
  return options;
}
function ogImageCanonicalUrls(nuxtApp) {
  nuxtApp.hooks.hook("app:rendered", async (ctx) => {
    const { ssrContext } = ctx;
    const e = useRequestEvent();
    const path = parseURL(e.path).pathname;
    if (isInternalRoute(path))
      return;
    ssrContext == null ? void 0 : ssrContext.head.use({
      key: "nuxt-og-image:overrides-and-canonical-urls",
      hooks: {
        "tags:resolve": async (ctx2) => {
          const hasPrimaryPayload = ctx2.tags.some((tag) => tag.tag === "script" && tag.props.id === "nuxt-og-image-options");
          let overrides;
          for (const tag of ctx2.tags) {
            if (tag.tag === "script" && tag.props.id === "nuxt-og-image-overrides") {
              if (hasPrimaryPayload) {
                overrides = separateProps(parse(tag.innerHTML || "{}"));
                delete ctx2.tags[ctx2.tags.indexOf(tag)];
              } else {
                tag.props.id = "nuxt-og-image-options";
                tag.innerHTML = stringify(separateProps(parse(tag.innerHTML || "{}")));
                tag._d = "script:id:nuxt-og-image-options";
              }
              break;
            }
          }
          ctx2.tags = ctx2.tags.filter(Boolean);
          for (const tag of ctx2.tags) {
            if (tag.tag === "meta" && (tag.props.property === "og:image" || ["twitter:image:src", "twitter:image"].includes(tag.props.name))) {
              if (!tag.props.content.startsWith("https")) {
                await nuxtApp.runWithContext(() => {
                  tag.props.content = toValue(withSiteUrl(tag.props.content, {
                    withBase: true
                  }));
                });
              }
            } else if (overrides && tag.tag === "script" && tag.props.id === "nuxt-og-image-options") {
              tag.innerHTML = stringify(defu(overrides, parse(tag.innerHTML)));
            }
          }
        }
      }
    });
  });
}
function routeRuleOgImage(nuxtApp) {
  nuxtApp.hooks.hook("app:rendered", async (ctx) => {
    var _a2, _b2, _c, _d, _e, _f;
    const { ssrContext } = ctx;
    const e = useRequestEvent();
    const path = parseURL(e.path).pathname;
    if (isInternalRoute(path))
      return;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (_b2 = (_a2 = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _a2.nitro) == null ? void 0 : _b2.routeRules })
    );
    let routeRules = defu({}, ..._routeRulesMatcher.matchAll(
      withoutBase(path.split("?")[0], (_c = ssrContext == null ? void 0 : ssrContext.runtimeConfig) == null ? void 0 : _c.app.baseURL)
    ).reverse()).ogImage;
    if (typeof routeRules === "undefined")
      return;
    const ogImageInstances = nuxtApp.ssrContext._ogImageInstances || [];
    if (routeRules === false) {
      ogImageInstances == null ? void 0 : ogImageInstances.forEach((e2) => {
        e2.dispose();
      });
      nuxtApp.ssrContext._ogImagePayload = void 0;
      nuxtApp.ssrContext._ogImageInstances = void 0;
      return;
    }
    const { defaults } = useOgImageRuntimeConfig();
    routeRules = normaliseOptions(defu((_f = (_e = (_d = nuxtApp.ssrContext) == null ? void 0 : _d.event.context._nitro) == null ? void 0 : _e.routeRules) == null ? void 0 : _f.ogImage, routeRules, {
      component: defaults.component
    }));
    const resolvedOptions = normaliseOptions(defu(routeRules, defaults));
    const src = getOgImagePath(ssrContext.url, resolvedOptions);
    createOgImageMeta(src, routeRules, resolvedOptions, nuxtApp.ssrContext);
  });
}
const og_image_canonical_urls_server_YYKCE0iokV = defineNuxtPlugin({
  setup: ogImageCanonicalUrls
});
const route_rule_og_image_server_xL1rf4QeLE = defineNuxtPlugin({
  setup: routeRuleOgImage
});
const robot_meta_server_6Qhe4cPOr2 = defineNuxtPlugin({
  setup() {
    var _a2;
    const event = useRequestEvent();
    const ctx = (_a2 = event == null ? void 0 : event.context) == null ? void 0 : _a2.robots;
    if (!ctx)
      return;
    const config = useRuntimeConfig();
    useServerHead({
      meta: [
        {
          "name": "robots",
          "content": () => ctx.rule || "",
          "data-hint": () => {
            var _a3, _b2;
            return ((_a3 = config["nuxt-robots"]) == null ? void 0 : _a3.debug) ? (_b2 = ctx.debug) == null ? void 0 : _b2.source : void 0;
          }
        }
      ]
    });
  }
});
function updateSiteConfig(input = {}) {
  {
    const stack = useRequestEvent().context.siteConfig;
    stack.push(input);
    return;
  }
}
const i18n_server_bJBihSV2Mg = defineNuxtPlugin({
  name: "nuxt-site-config:i18n",
  // @ts-expect-error untyped
  dependsOn: ["i18n:plugin"],
  setup(nuxtApp) {
    const i18n = nuxtApp.$i18n;
    if (!i18n)
      return;
    useSiteConfig().url;
    try {
      const url = parseURL(i18n.baseUrl.value);
      if (false) ;
    } catch {
    }
    updateSiteConfig({
      _priority: -1,
      _context: "@nuxtjs/i18n",
      url: void 0,
      // @ts-expect-error untyped
      currentLocale: i18n.locale,
      // @ts-expect-error untyped
      description: computed(() => i18n.te("nuxtSiteConfig.description") ? i18n.t("nuxtSiteConfig.description") : void 0),
      // @ts-expect-error untyped
      name: computed(() => i18n.te("nuxtSiteConfig.name") ? i18n.t("nuxtSiteConfig.name") : void 0)
    });
  }
});
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x: x2,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y: y2
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min$1(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min$1(paddingObject[maxProp], largestPossiblePadding);
    const min$1$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1$1 ? center - min$1$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
const autoPlacement = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map((d2) => {
        const alignment2 = getAlignment(d2.placement);
        return [d2.placement, alignment2 && crossAxis ? (
          // Check along the mainAxis and main crossAxis side.
          d2.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
        ) : (
          // Check only the mainAxis.
          d2.overflows[0]
        ), d2.overflows];
      }).sort((a, b2) => a[1] - b2[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d2) => d2[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        getAlignment(d2[0]) ? 2 : 3
      ).every((v) => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
const flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d2) => d2.overflows[0] <= 0).sort((a, b2) => a.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d2) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d2.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d2) => [d2.placement, d2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b2) => a[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x2,
        y: y2,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x2 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x22,
              y: y22
            } = _ref;
            return {
              x: x22,
              y: y22
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y: y2
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y2,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min$1(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min$1(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max$1(overflow.left, 0);
        const xMax = max$1(overflow.right, 0);
        const yMin = max$1(overflow.top, 0);
        const yMax = max$1(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max$1(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max$1(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getWindow(node) {
  var _node$ownerDocument;
  return ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || void 0;
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
const min = Math.min;
const max = Math.max;
const round = Math.round;
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width);
  let height = parseFloat(css.height);
  const offsetWidth = element.offsetWidth;
  const offsetHeight = element.offsetHeight;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    fallback: shouldFallback
  };
}
function getNodeName(node) {
  return isNode(node) ? (node.nodeName || "").toLowerCase() : "";
}
let uaString;
function getUAString() {
  if (uaString) {
    return uaString;
  }
  const uaData = (void 0).userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    uaString = uaData.brands.map((item) => item.brand + "/" + item.version).join(" ");
    return uaString;
  }
  return (void 0).userAgent;
}
function isHTMLElement(value) {
  return value instanceof getWindow(value).HTMLElement;
}
function isElement(value) {
  return value instanceof getWindow(value).Element;
}
function isNode(value) {
  return value instanceof getWindow(value).Node;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  const OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isContainingBlock(element) {
  const isFirefox = /firefox/i.test(getUAString());
  const css = getComputedStyle$1(element);
  const backdropFilter = css.backdropFilter || css.WebkitBackdropFilter;
  return css.transform !== "none" || css.perspective !== "none" || (backdropFilter ? backdropFilter !== "none" : false) || isFirefox && css.willChange === "filter" || isFirefox && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective"].some((value) => css.willChange.includes(value)) || ["paint", "layout", "strict", "content"].some((value) => {
    const contain = css.contain;
    return contain != null ? contain.includes(value) : false;
  });
}
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
const FALLBACK_SCALE = {
  x: 1,
  y: 1
};
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return FALLBACK_SCALE;
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    fallback
  } = getCssDimensions(domElement);
  let x2 = (fallback ? round(rect.width) : rect.width) / width;
  let y2 = (fallback ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  var _win$visualViewport, _win$visualViewport2;
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = FALLBACK_SCALE;
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const win = domElement ? getWindow(domElement) : void 0;
  const addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  let x2 = (clientRect.left + (addVisualOffsets ? ((_win$visualViewport = win.visualViewport) == null ? void 0 : _win$visualViewport.offsetLeft) || 0 : 0)) / scale.x;
  let y2 = (clientRect.top + (addVisualOffsets ? ((_win$visualViewport2 = win.visualViewport) == null ? void 0 : _win$visualViewport2.offsetTop) || 0 : 0)) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win2 = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentIFrame = win2.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== win2) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle(currentIFrame);
      iframeRect.x += (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      iframeRect.y += (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += iframeRect.x;
      y2 += iframeRect.y;
      currentIFrame = getWindow(currentIFrame).frameElement;
    }
  }
  return {
    width,
    height,
    top: y2,
    right: x2 + width,
    bottom: y2 + height,
    left: x2,
    x: x2,
    y: y2
  };
}
function getDocumentElement(node) {
  return ((isNode(node) ? node.ownerDocument : node.document) || (void 0).document).documentElement;
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.pageXOffset,
    scrollTop: element.pageYOffset
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  if (offsetParent === documentElement) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = {
    x: 1,
    y: 1
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return parentNode.ownerDocument.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list) {
  var _node$ownerDocument;
  if (list === void 0) {
    list = [];
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : {
    x: 1,
    y: 1
  };
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  if (clippingAncestor === "viewport") {
    return rectToClientRect(getViewportRect(element, strategy));
  }
  if (isElement(clippingAncestor)) {
    return rectToClientRect(getInnerBoundingClientRect(clippingAncestor, strategy));
  }
  return rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const containingBlock = isContainingBlock(currentNode);
    const shouldDropCurrentNode = elementIsFixed ? !containingBlock && !currentContainingBlockComputedStyle : !containingBlock && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  if (isHTMLElement(element)) {
    return getCssDimensions(element);
  }
  return element.getBoundingClientRect();
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function getOffsetParent(element) {
  const window2 = getWindow(element);
  let offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const rect = getBoundingClientRect(element, true, strategy === "fixed", offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== "fixed") {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent, true);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
const platform = {
  getClippingRect,
  convertOffsetParentRelativeRectToViewportRelativeRect,
  isElement,
  getDimensions,
  getOffsetParent,
  getDocumentElement,
  getScale,
  async getElementRects(_ref) {
    let {
      reference,
      floating,
      strategy
    } = _ref;
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    return {
      reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
      floating: {
        x: 0,
        y: 0,
        ...await getDimensionsFn(floating)
      }
    };
  },
  getClientRects: (element) => Array.from(element.getClientRects()),
  isRTL: (element) => getComputedStyle$1(element).direction === "rtl"
};
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
function ye(e, t) {
  for (const o in t)
    Object.prototype.hasOwnProperty.call(t, o) && (typeof t[o] == "object" && e[o] ? ye(e[o], t[o]) : e[o] = t[o]);
}
const h = {
  // Disable popper components
  disabled: false,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: false,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 150,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: true,
  // Flip to the opposite placement if needed
  flip: true,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: true,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: true,
  /**
   * By default, compute autohide on 'click'.
   */
  autoHideOnMousedown: false,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e) => [...e, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: false,
      // Enable HTML content in directive
      html: false,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: true,
      // Hide on clock outside
      autoHide: true
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function S(e, t) {
  let o = h.themes[e] || {}, i;
  do
    i = o[t], typeof i > "u" ? o.$extend ? o = h.themes[o.$extend] || {} : (o = null, i = h[t]) : o = null;
  while (o);
  return i;
}
function Ze(e) {
  const t = [e];
  let o = h.themes[e] || {};
  do
    o.$extend && !o.$resetCss ? (t.push(o.$extend), o = h.themes[o.$extend] || {}) : o = null;
  while (o);
  return t.map((i) => `v-popper--theme-${i}`);
}
function re(e) {
  const t = [e];
  let o = h.themes[e] || {};
  do
    o.$extend ? (t.push(o.$extend), o = h.themes[o.$extend] || {}) : o = null;
  while (o);
  return t;
}
const Te = ["auto", "top", "bottom", "left", "right"].reduce((e, t) => e.concat([
  t,
  `${t}-start`,
  `${t}-end`
]), []), pe = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, ae = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function de(e, t) {
  const o = e.indexOf(t);
  o !== -1 && e.splice(o, 1);
}
function G() {
  return new Promise((e) => requestAnimationFrame(() => {
    requestAnimationFrame(e);
  }));
}
const d = [];
let g = null;
const le = {};
function he(e) {
  let t = le[e];
  return t || (t = le[e] = []), t;
}
let Y = function() {
};
function n(e) {
  return function(t) {
    return S(t.theme, e);
  };
}
const q = "__floating-vue__popper", Q = () => defineComponent({
  name: "VPopper",
  provide() {
    return {
      [q]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [q]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    targetNodes: {
      type: Function,
      required: true
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: true
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: n("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: n("positioningDisabled")
    },
    placement: {
      type: String,
      default: n("placement"),
      validator: (e) => Te.includes(e)
    },
    delay: {
      type: [String, Number, Object],
      default: n("delay")
    },
    distance: {
      type: [Number, String],
      default: n("distance")
    },
    skidding: {
      type: [Number, String],
      default: n("skidding")
    },
    triggers: {
      type: Array,
      default: n("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: n("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: n("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: n("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: n("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: n("popperHideTriggers")
    },
    container: {
      type: [String, Object, Y, Boolean],
      default: n("container")
    },
    boundary: {
      type: [String, Y],
      default: n("boundary")
    },
    strategy: {
      type: String,
      validator: (e) => ["absolute", "fixed"].includes(e),
      default: n("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: n("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: n("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: n("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: n("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: n("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: n("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: n("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: n("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: n("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: n("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: n("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: n("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: n("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: n("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: n("flip")
    },
    shift: {
      type: Boolean,
      default: n("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: n("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: n("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: n("disposeTimeout")
    }
  },
  emits: {
    show: () => true,
    hide: () => true,
    "update:shown": (e) => true,
    "apply-show": () => true,
    "apply-hide": () => true,
    "close-group": () => true,
    "close-directive": () => true,
    "auto-hide": () => true,
    resize: () => true
  },
  data() {
    return {
      isShown: false,
      isMounted: false,
      skipTransition: false,
      classes: {
        showFrom: false,
        showTo: false,
        hideFrom: false,
        hideTo: true
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      randomId: `popper_${[Math.random(), Date.now()].map((e) => e.toString(36).substring(2, 10)).join("_")}`,
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: true,
      pendingHide: false,
      containsGlobalTarget: false,
      isDisposed: true,
      mouseDownContains: false
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e;
      return (e = this[q]) == null ? void 0 : e.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e, t;
      return ((e = this.popperTriggers) == null ? void 0 : e.includes("hover")) || ((t = this.popperShowTriggers) == null ? void 0 : t.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e) {
      e ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: true
    },
    positioningDisabled: "$_refreshListeners",
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e, t) => (e[t] = "$_computePosition", e), {})
  },
  created() {
    this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e = null, skipDelay: t = false, force: o = false } = {}) {
      var i, s;
      (i = this.parentPopper) != null && i.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = false, (o || !this.disabled) && (((s = this.parentPopper) == null ? void 0 : s.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e, t), this.$emit("show"), this.$_showFrameLocked = true, requestAnimationFrame(() => {
        this.$_showFrameLocked = false;
      })), this.$emit("update:shown", true));
    },
    hide({ event: e = null, skipDelay: t = false } = {}) {
      var o;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = true;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o = this.parentPopper) == null ? void 0 : o.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = false, this.$_scheduleHide(e, t), this.$emit("hide"), this.$emit("update:shown", false);
      }
    },
    init() {
      var e;
      this.isDisposed && (this.isDisposed = false, this.isMounted = false, this.$_events = [], this.$_preventShow = false, this.$_referenceNode = ((e = this.referenceNode) == null ? void 0 : e.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t) => t.nodeType === t.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = true, this.$_removeEventListeners(), this.hide({ skipDelay: true }), this.$_detachPopperNode(), this.isMounted = false, this.isShown = false, this.$_updateParentShownChildren(false), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.isDisposed || this.positioningDisabled)
        return;
      const e = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e.middleware.push(offset({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t = this.placement.startsWith("auto");
      if (t ? e.middleware.push(autoPlacement({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e.placement = this.placement, this.preventOverflow && (this.shift && e.middleware.push(shift({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t && this.flip && e.middleware.push(flip({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e.middleware.push(arrow({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i, rects: s, middlewareData: r }) => {
          let p;
          const { centerOffset: a } = r.arrow;
          return i.startsWith("top") || i.startsWith("bottom") ? p = Math.abs(a) > s.reference.width / 2 : p = Math.abs(a) > s.reference.height / 2, {
            data: {
              overflow: p
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e.middleware.push({
          name: "autoSize",
          fn: ({ rects: s, placement: r, middlewareData: p }) => {
            var u;
            if ((u = p.autoSize) != null && u.skip)
              return {};
            let a, l;
            return r.startsWith("top") || r.startsWith("bottom") ? a = s.reference.width : l = s.reference.height, this.$_innerNode.style[i === "min" ? "minWidth" : i === "max" ? "maxWidth" : "width"] = a != null ? `${a}px` : null, this.$_innerNode.style[i === "min" ? "minHeight" : i === "max" ? "maxHeight" : "height"] = l != null ? `${l}px` : null, {
              data: {
                skip: true
              },
              reset: {
                rects: true
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e.middleware.push(size({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i, availableHeight: s }) => {
          this.$_innerNode.style.maxWidth = i != null ? `${i}px` : null, this.$_innerNode.style.maxHeight = s != null ? `${s}px` : null;
        }
      })));
      const o = await computePosition(this.$_referenceNode, this.$_popperNode, e);
      Object.assign(this.result, {
        x: o.x,
        y: o.y,
        placement: o.placement,
        strategy: o.strategy,
        arrow: {
          ...o.middlewareData.arrow,
          ...o.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e, t = false) {
      if (this.$_updateParentShownChildren(true), this.$_hideInProgress = false, clearTimeout(this.$_scheduleTimer), g && this.instantMove && g.instantMove && g !== this.parentPopper) {
        g.$_applyHide(true), this.$_applyShow(true);
        return;
      }
      t ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e, t = false) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = true;
        return;
      }
      this.$_updateParentShownChildren(false), this.$_hideInProgress = true, clearTimeout(this.$_scheduleTimer), this.isShown && (g = this), t ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e) {
      const t = this.delay;
      return parseInt(t && t[e] || t || 0);
    },
    async $_applyShow(e = false) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e, !this.isShown && (this.$_ensureTeleport(), await G(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...getOverflowAncestors(this.$_referenceNode),
        ...getOverflowAncestors(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t = this.$_referenceNode.getBoundingClientRect(), o = this.$_popperNode.querySelector(".v-popper__wrapper"), i = o.parentNode.getBoundingClientRect(), s = t.x + t.width / 2 - (i.left + o.offsetLeft), r = t.y + t.height / 2 - (i.top + o.offsetTop);
        this.result.transformOrigin = `${s}px ${r}px`;
      }
      this.isShown = true, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e = this.showGroup;
      if (e) {
        let t;
        for (let o = 0; o < d.length; o++)
          t = d[o], t.showGroup !== e && (t.hide(), t.$emit("close-group"));
      }
      d.push(this), (void 0).body.classList.add("v-popper--some-open");
      for (const t of re(this.theme))
        he(t).push(this), (void 0).body.classList.add(`v-popper--some-open--${t}`);
      this.$emit("apply-show"), this.classes.showFrom = true, this.classes.showTo = false, this.classes.hideFrom = false, this.classes.hideTo = false, await G(), this.classes.showFrom = false, this.classes.showTo = true, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e = false) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = true, this.$_hideInProgress = false;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e, de(d, this), d.length === 0 && (void 0).body.classList.remove("v-popper--some-open");
      for (const o of re(this.theme)) {
        const i = he(o);
        de(i, this), i.length === 0 && (void 0).body.classList.remove(`v-popper--some-open--${o}`);
      }
      g === this && (g = null), this.isShown = false, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t = this.disposeTimeout;
      t !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = false);
      }, t)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = false, this.classes.showTo = false, this.classes.hideFrom = true, this.classes.hideTo = false, await G(), this.classes.hideFrom = false, this.classes.hideTo = true;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let e = this.container;
      if (typeof e == "string" ? e = (void 0).document.querySelector(e) : e === false && (e = this.$_targetNodes[0].parentNode), !e)
        throw new Error("No container for popover: " + this.container);
      e.appendChild(this.$_popperNode), this.isMounted = true;
    },
    $_addEventListeners() {
      const e = (o) => {
        this.isShown && !this.$_hideInProgress || (o.usedByTooltip = true, !this.$_preventShow && this.show({ event: o }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, pe, this.triggers, this.showTriggers, e), this.$_registerTriggerListeners([this.$_popperNode], pe, this.popperTriggers, this.popperShowTriggers, e);
      const t = (o) => {
        o.usedByTooltip || this.hide({ event: o });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, ae, this.triggers, this.hideTriggers, t), this.$_registerTriggerListeners([this.$_popperNode], ae, this.popperTriggers, this.popperHideTriggers, t);
    },
    $_registerEventListeners(e, t, o) {
      this.$_events.push({ targetNodes: e, eventType: t, handler: o }), e.forEach((i) => i.addEventListener(t, o, void 0));
    },
    $_registerTriggerListeners(e, t, o, i, s) {
      let r = o;
      i != null && (r = typeof i == "function" ? i(r) : i), r.forEach((p) => {
        const a = t[p];
        a && this.$_registerEventListeners(e, a, s);
      });
    },
    $_removeEventListeners(e) {
      const t = [];
      this.$_events.forEach((o) => {
        const { targetNodes: i, eventType: s, handler: r } = o;
        !e || e === s ? i.forEach((p) => p.removeEventListener(s, r)) : t.push(o);
      }), this.$_events = t;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e, t = false) {
      this.$_showFrameLocked || (this.hide({ event: e }), e.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t && (this.$_preventShow = true, setTimeout(() => {
        this.$_preventShow = false;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e, t) {
      for (const o of this.$_targetNodes) {
        const i = o.getAttribute(e);
        i && (o.removeAttribute(e), o.setAttribute(t, i));
      }
    },
    $_applyAttrsToTarget(e) {
      for (const t of this.$_targetNodes)
        for (const o in e) {
          const i = e[o];
          i == null ? t.removeAttribute(o) : t.setAttribute(o, i);
        }
    },
    $_updateParentShownChildren(e) {
      let t = this.parentPopper;
      for (; t; )
        e ? t.shownChildren.add(this.randomId) : (t.shownChildren.delete(this.randomId), t.pendingHide && t.hide()), t = t.parentPopper;
    },
    $_isAimingPopper() {
      const e = this.$_referenceNode.getBoundingClientRect();
      if (y >= e.left && y <= e.right && _ >= e.top && _ <= e.bottom) {
        const t = this.$_popperNode.getBoundingClientRect(), o = y - c, i = _ - m, r = t.left + t.width / 2 - c + (t.top + t.height / 2) - m + t.width + t.height, p = c + o * r, a = m + i * r;
        return C(c, m, p, a, t.left, t.top, t.left, t.bottom) || // Left edge
        C(c, m, p, a, t.left, t.top, t.right, t.top) || // Top edge
        C(c, m, p, a, t.right, t.top, t.right, t.bottom) || // Right edge
        C(c, m, p, a, t.left, t.bottom, t.right, t.bottom);
      }
      return false;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
let c = 0, m = 0, y = 0, _ = 0;
function C(e, t, o, i, s, r, p, a) {
  const l = ((p - s) * (t - r) - (a - r) * (e - s)) / ((a - r) * (o - e) - (p - s) * (i - t)), u = ((o - e) * (t - r) - (i - t) * (e - s)) / ((a - r) * (o - e) - (p - s) * (i - t));
  return l >= 0 && l <= 1 && u >= 0 && u <= 1;
}
const ot = {
  extends: Q()
}, B = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [i, s] of t)
    o[i] = s;
  return o;
};
function it(e, t, o, i, s, r) {
  return openBlock(), createElementBlock("div", {
    ref: "reference",
    class: normalizeClass(["v-popper", {
      "v-popper--shown": e.slotData.isShown
    }])
  }, [
    renderSlot(e.$slots, "default", normalizeProps(guardReactiveProps(e.slotData)))
  ], 2);
}
const st = /* @__PURE__ */ B(ot, [["render", it]]);
function nt() {
  var e = (void 0).navigator.userAgent, t = e.indexOf("MSIE ");
  if (t > 0)
    return parseInt(e.substring(t + 5, e.indexOf(".", t)), 10);
  var o = e.indexOf("Trident/");
  if (o > 0) {
    var i = e.indexOf("rv:");
    return parseInt(e.substring(i + 3, e.indexOf(".", i)), 10);
  }
  var s = e.indexOf("Edge/");
  return s > 0 ? parseInt(e.substring(s + 5, e.indexOf(".", s)), 10) : -1;
}
let z;
function X() {
  X.init || (X.init = true, z = nt() !== -1);
}
var E = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: false
    },
    ignoreWidth: {
      type: Boolean,
      default: false
    },
    ignoreHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    X(), nextTick(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e = (void 0).createElement("object");
    this._resizeObject = e, e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", -1), e.onload = this.addResizeHandlers, e.type = "text/html", z && this.$el.appendChild(e), e.data = "about:blank", z || this.$el.appendChild(e);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!z && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const rt = /* @__PURE__ */ withScopeId("data-v-b329ee4c");
pushScopeId("data-v-b329ee4c");
const pt = {
  class: "resize-observer",
  tabindex: "-1"
};
popScopeId();
const at = /* @__PURE__ */ rt((e, t, o, i, s, r) => (openBlock(), createBlock("div", pt)));
E.render = at;
E.__scopeId = "data-v-b329ee4c";
E.__file = "src/components/ResizeObserver.vue";
const Z = (e = "theme") => ({
  computed: {
    themeClass() {
      return Ze(this[e]);
    }
  }
}), dt = defineComponent({
  name: "VPopperContent",
  components: {
    ResizeObserver: E
  },
  mixins: [
    Z()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e) {
      return e != null && !isNaN(e) ? `${e}px` : null;
    }
  }
}), lt = ["id", "aria-hidden", "tabindex", "data-popper-placement"], ht = {
  ref: "inner",
  class: "v-popper__inner"
}, ut = /* @__PURE__ */ createElementVNode("div", { class: "v-popper__arrow-outer" }, null, -1), ft = /* @__PURE__ */ createElementVNode("div", { class: "v-popper__arrow-inner" }, null, -1), ct = [
  ut,
  ft
];
function mt(e, t, o, i, s, r) {
  const p = resolveComponent("ResizeObserver");
  return openBlock(), createElementBlock("div", {
    id: e.popperId,
    ref: "popover",
    class: normalizeClass(["v-popper__popper", [
      e.themeClass,
      e.classes.popperClass,
      {
        "v-popper__popper--shown": e.shown,
        "v-popper__popper--hidden": !e.shown,
        "v-popper__popper--show-from": e.classes.showFrom,
        "v-popper__popper--show-to": e.classes.showTo,
        "v-popper__popper--hide-from": e.classes.hideFrom,
        "v-popper__popper--hide-to": e.classes.hideTo,
        "v-popper__popper--skip-transition": e.skipTransition,
        "v-popper__popper--arrow-overflow": e.result && e.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e.result
      }
    ]]),
    style: normalizeStyle(e.result ? {
      position: e.result.strategy,
      transform: `translate3d(${Math.round(e.result.x)}px,${Math.round(e.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e.shown ? "false" : "true",
    tabindex: e.autoHide ? 0 : void 0,
    "data-popper-placement": e.result ? e.result.placement : void 0,
    onKeyup: t[2] || (t[2] = withKeys((a) => e.autoHide && e.$emit("hide"), ["esc"]))
  }, [
    createElementVNode("div", {
      class: "v-popper__backdrop",
      onClick: t[0] || (t[0] = (a) => e.autoHide && e.$emit("hide"))
    }),
    createElementVNode("div", {
      class: "v-popper__wrapper",
      style: normalizeStyle(e.result ? {
        transformOrigin: e.result.transformOrigin
      } : void 0)
    }, [
      createElementVNode("div", ht, [
        e.mounted ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createElementVNode("div", null, [
            renderSlot(e.$slots, "default")
          ]),
          e.handleResize ? (openBlock(), createBlock(p, {
            key: 0,
            onNotify: t[1] || (t[1] = (a) => e.$emit("resize", a))
          })) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ], 512),
      createElementVNode("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: normalizeStyle(e.result ? {
          left: e.toPx(e.result.arrow.x),
          top: e.toPx(e.result.arrow.y)
        } : void 0)
      }, ct, 4)
    ], 4)
  ], 46, lt);
}
const ee = /* @__PURE__ */ B(dt, [["render", mt]]), te = {
  methods: {
    show(...e) {
      return this.$refs.popper.show(...e);
    },
    hide(...e) {
      return this.$refs.popper.hide(...e);
    },
    dispose(...e) {
      return this.$refs.popper.dispose(...e);
    },
    onResize(...e) {
      return this.$refs.popper.onResize(...e);
    }
  }
};
let K = function() {
};
const gt = defineComponent({
  name: "VPopperWrapper",
  components: {
    Popper: st,
    PopperContent: ee
  },
  mixins: [
    te,
    Z("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    referenceNode: {
      type: Function,
      default: null
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    positioningDisabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    delay: {
      type: [String, Number, Object],
      default: void 0
    },
    distance: {
      type: [Number, String],
      default: void 0
    },
    skidding: {
      type: [Number, String],
      default: void 0
    },
    triggers: {
      type: Array,
      default: void 0
    },
    showTriggers: {
      type: [Array, Function],
      default: void 0
    },
    hideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperTriggers: {
      type: Array,
      default: void 0
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    container: {
      type: [String, Object, K, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, K],
      default: void 0
    },
    strategy: {
      type: String,
      default: void 0
    },
    autoHide: {
      type: [Boolean, Function],
      default: void 0
    },
    handleResize: {
      type: Boolean,
      default: void 0
    },
    instantMove: {
      type: Boolean,
      default: void 0
    },
    eagerMount: {
      type: Boolean,
      default: void 0
    },
    popperClass: {
      type: [String, Array, Object],
      default: void 0
    },
    computeTransformOrigin: {
      type: Boolean,
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: void 0
    },
    autoSize: {
      type: [Boolean, String],
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: void 0
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: void 0
    },
    preventOverflow: {
      type: Boolean,
      default: void 0
    },
    overflowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowOverflow: {
      type: Boolean,
      default: void 0
    },
    flip: {
      type: Boolean,
      default: void 0
    },
    shift: {
      type: Boolean,
      default: void 0
    },
    shiftCrossAxis: {
      type: Boolean,
      default: void 0
    },
    noAutoFocus: {
      type: Boolean,
      default: void 0
    },
    disposeTimeout: {
      type: Number,
      default: void 0
    }
  },
  emits: {
    show: () => true,
    hide: () => true,
    "update:shown": (e) => true,
    "apply-show": () => true,
    "apply-hide": () => true,
    "close-group": () => true,
    "close-directive": () => true,
    "auto-hide": () => true,
    resize: () => true
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e) => e !== this.$refs.popperContent.$el);
    }
  }
});
function wt(e, t, o, i, s, r) {
  const p = resolveComponent("PopperContent"), a = resolveComponent("Popper");
  return openBlock(), createBlock(a, mergeProps({ ref: "popper" }, e.$props, {
    theme: e.finalTheme,
    "target-nodes": e.getTargetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    class: [
      e.themeClass
    ],
    onShow: t[0] || (t[0] = () => e.$emit("show")),
    onHide: t[1] || (t[1] = () => e.$emit("hide")),
    "onUpdate:shown": t[2] || (t[2] = (l) => e.$emit("update:shown", l)),
    onApplyShow: t[3] || (t[3] = () => e.$emit("apply-show")),
    onApplyHide: t[4] || (t[4] = () => e.$emit("apply-hide")),
    onCloseGroup: t[5] || (t[5] = () => e.$emit("close-group")),
    onCloseDirective: t[6] || (t[6] = () => e.$emit("close-directive")),
    onAutoHide: t[7] || (t[7] = () => e.$emit("auto-hide")),
    onResize: t[8] || (t[8] = () => e.$emit("resize"))
  }), {
    default: withCtx(({
      popperId: l,
      isShown: u,
      shouldMountContent: L,
      skipTransition: D,
      autoHide: I,
      show: F,
      hide: v,
      handleResize: R,
      onResize: j,
      classes: V,
      result: Ee
    }) => [
      renderSlot(e.$slots, "default", {
        shown: u,
        show: F,
        hide: v
      }),
      createVNode(p, {
        ref: "popperContent",
        "popper-id": l,
        theme: e.finalTheme,
        shown: u,
        mounted: L,
        "skip-transition": D,
        "auto-hide": I,
        "handle-resize": R,
        classes: V,
        result: Ee,
        onHide: v,
        onResize: j
      }, {
        default: withCtx(() => [
          renderSlot(e.$slots, "popper", {
            shown: u,
            hide: v
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const k = /* @__PURE__ */ B(gt, [["render", wt]]), Se = {
  ...k,
  name: "VDropdown",
  vPopperTheme: "dropdown"
}, be = {
  ...k,
  name: "VMenu",
  vPopperTheme: "menu"
}, Ce = {
  ...k,
  name: "VTooltip",
  vPopperTheme: "tooltip"
}, $t = defineComponent({
  name: "VTooltipDirective",
  components: {
    Popper: Q(),
    PopperContent: ee
  },
  mixins: [
    te
  ],
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e) => S(e.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e) => S(e.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(true);
      },
      immediate: true
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e) {
      if (typeof this.content == "function" && this.$_isShown && (e || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = true;
        const t = ++this.$_fetchId, o = this.content(this);
        o.then ? o.then((i) => this.onResult(t, i)) : this.onResult(t, o);
      }
    },
    onResult(e, t) {
      e === this.$_fetchId && (this.$_loading = false, this.asyncContent = t);
    },
    onShow() {
      this.$_isShown = true, this.fetchContent();
    },
    onHide() {
      this.$_isShown = false;
    }
  }
}), vt = ["innerHTML"], yt = ["textContent"];
function _t(e, t, o, i, s, r) {
  const p = resolveComponent("PopperContent"), a = resolveComponent("Popper");
  return openBlock(), createBlock(a, mergeProps({ ref: "popper" }, e.$attrs, {
    theme: e.theme,
    "target-nodes": e.targetNodes,
    "popper-node": () => e.$refs.popperContent.$el,
    onApplyShow: e.onShow,
    onApplyHide: e.onHide
  }), {
    default: withCtx(({
      popperId: l,
      isShown: u,
      shouldMountContent: L,
      skipTransition: D,
      autoHide: I,
      hide: F,
      handleResize: v,
      onResize: R,
      classes: j,
      result: V
    }) => [
      createVNode(p, {
        ref: "popperContent",
        class: normalizeClass({
          "v-popper--tooltip-loading": e.loading
        }),
        "popper-id": l,
        theme: e.theme,
        shown: u,
        mounted: L,
        "skip-transition": D,
        "auto-hide": I,
        "handle-resize": v,
        classes: j,
        result: V,
        onHide: F,
        onResize: R
      }, {
        default: withCtx(() => [
          e.html ? (openBlock(), createElementBlock("div", {
            key: 0,
            innerHTML: e.finalContent
          }, null, 8, vt)) : (openBlock(), createElementBlock("div", {
            key: 1,
            textContent: toDisplayString(e.finalContent)
          }, null, 8, yt))
        ]),
        _: 2
      }, 1032, ["class", "popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 1
  }, 16, ["theme", "target-nodes", "popper-node", "onApplyShow", "onApplyHide"]);
}
const ze = /* @__PURE__ */ B($t, [["render", _t]]), Ae = "v-popper--has-tooltip";
function Tt(e, t) {
  let o = e.placement;
  if (!o && t)
    for (const i of Te)
      t[i] && (o = i);
  return o || (o = S(e.theme || "tooltip", "placement")), o;
}
function Ne(e, t, o) {
  let i;
  const s = typeof t;
  return s === "string" ? i = { content: t } : t && s === "object" ? i = t : i = { content: false }, i.placement = Tt(i, o), i.targetNodes = () => [e], i.referenceNode = () => e, i;
}
let x, b, Pt = 0;
function St() {
  if (x)
    return;
  b = ref([]), x = createApp({
    name: "VTooltipDirectiveApp",
    setup() {
      return {
        directives: b
      };
    },
    render() {
      return this.directives.map((t) => h$1(ze, {
        ...t.options,
        shown: t.shown || t.options.shown,
        key: t.id
      }));
    },
    devtools: {
      hide: true
    }
  });
  const e = (void 0).createElement("div");
  (void 0).body.appendChild(e), x.mount(e);
}
function bt(e, t, o) {
  St();
  const i = ref(Ne(e, t, o)), s = ref(false), r = {
    id: Pt++,
    options: i,
    shown: s
  };
  return b.value.push(r), e.classList && e.classList.add(Ae), e.$_popper = {
    options: i,
    item: r,
    show() {
      s.value = true;
    },
    hide() {
      s.value = false;
    }
  };
}
function He(e) {
  if (e.$_popper) {
    const t = b.value.indexOf(e.$_popper.item);
    t !== -1 && b.value.splice(t, 1), delete e.$_popper, delete e.$_popperOldShown, delete e.$_popperMountTarget;
  }
  e.classList && e.classList.remove(Ae);
}
function me(e, { value: t, modifiers: o }) {
  const i = Ne(e, t, o);
  if (!i.content || S(i.theme || "tooltip", "disabled"))
    He(e);
  else {
    let s;
    e.$_popper ? (s = e.$_popper, s.options.value = i) : s = bt(e, t, o), typeof t.shown < "u" && t.shown !== e.$_popperOldShown && (e.$_popperOldShown = t.shown, t.shown ? s.show() : s.hide());
  }
}
const oe = {
  beforeMount: me,
  updated: me,
  beforeUnmount(e) {
    He(e);
  }
};
function ge(e) {
  e.addEventListener("mousedown", H), e.addEventListener("click", H), e.addEventListener("touchstart", Oe, false);
}
function we(e) {
  e.removeEventListener("mousedown", H), e.removeEventListener("click", H), e.removeEventListener("touchstart", Oe), e.removeEventListener("touchend", Me), e.removeEventListener("touchcancel", Be);
}
function H(e) {
  const t = e.currentTarget;
  e.closePopover = !t.$_vclosepopover_touch, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
}
function Oe(e) {
  if (e.changedTouches.length === 1) {
    const t = e.currentTarget;
    t.$_vclosepopover_touch = true;
    const o = e.changedTouches[0];
    t.$_vclosepopover_touchPoint = o, t.addEventListener("touchend", Me), t.addEventListener("touchcancel", Be);
  }
}
function Me(e) {
  const t = e.currentTarget;
  if (t.$_vclosepopover_touch = false, e.changedTouches.length === 1) {
    const o = e.changedTouches[0], i = t.$_vclosepopover_touchPoint;
    e.closePopover = Math.abs(o.screenY - i.screenY) < 20 && Math.abs(o.screenX - i.screenX) < 20, e.closeAllPopover = t.$_closePopoverModifiers && !!t.$_closePopoverModifiers.all;
  }
}
function Be(e) {
  const t = e.currentTarget;
  t.$_vclosepopover_touch = false;
}
const ie = {
  beforeMount(e, { value: t, modifiers: o }) {
    e.$_closePopoverModifiers = o, (typeof t > "u" || t) && ge(e);
  },
  updated(e, { value: t, oldValue: o, modifiers: i }) {
    e.$_closePopoverModifiers = i, t !== o && (typeof t > "u" || t ? ge(e) : we(e));
  },
  beforeUnmount(e) {
    we(e);
  }
};
function Ct(e, t = {}) {
  e.$_vTooltipInstalled || (e.$_vTooltipInstalled = true, ye(h, t), e.directive("tooltip", oe), e.directive("close-popper", ie), e.component("VTooltip", Ce), e.component("VDropdown", Se), e.component("VMenu", be));
}
const Gt = {
  // eslint-disable-next-line no-undef
  version: "5.2.2",
  install: Ct,
  options: h
};
const floating_vue_EIcJ7xiw0h = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Gt);
});
const plugin_Jozdw60ZsE = defineNuxtPlugin(async (nuxtApp) => nuxtApp.provide("dayjs", dayjs));
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$4(i) ? i : String(i);
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$4(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$4(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    // @deprecated Use 'emptySearchMessage' option instead.
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  pt: void 0,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  unstyled: false,
  csp: {
    nonce: void 0
  }
};
var PrimeVueSymbol = Symbol();
function usePrimeVue() {
  var PrimeVue2 = inject(PrimeVueSymbol);
  if (!PrimeVue2) {
    throw new Error("PrimeVue is not installed!");
  }
  return PrimeVue2;
}
function switchTheme(currentTheme, newTheme, linkElementId, callback) {
  if (currentTheme !== newTheme) {
    var linkElement = (void 0).getElementById(linkElementId);
    var cloneLinkElement = linkElement.cloneNode(true);
    var newThemeUrl = linkElement.getAttribute("href").replace(currentTheme, newTheme);
    cloneLinkElement.setAttribute("id", linkElementId + "-clone");
    cloneLinkElement.setAttribute("href", newThemeUrl);
    cloneLinkElement.addEventListener("load", function() {
      linkElement.remove();
      cloneLinkElement.setAttribute("id", linkElementId);
      if (callback) {
        callback();
      }
    });
    linkElement.parentNode && linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
  }
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = options ? _objectSpread$3(_objectSpread$3({}, defaultOptions), options) : _objectSpread$3({}, defaultOptions);
    var PrimeVue2 = {
      config: reactive(configOptions),
      changeTheme: switchTheme
    };
    app.config.globalProperties.$primevue = PrimeVue2;
    app.provide(PrimeVueSymbol, PrimeVue2);
  }
};
var ToastEventBus = primebus();
var ToastService = {
  install: function install2(app) {
    var ToastService2 = {
      add: function add(message) {
        ToastEventBus.emit("add", message);
      },
      remove: function remove2(message) {
        ToastEventBus.emit("remove", message);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
var classes$1 = {
  root: "p-badge p-component"
};
var BadgeDirectiveStyle = BaseStyle.extend({
  name: "badge",
  classes: classes$1
});
var BaseBadgeDirective = BaseDirective.extend({
  style: BadgeDirectiveStyle
});
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$3(i) ? i : String(i);
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BadgeDirective = BaseBadgeDirective.extend("badge", {
  mounted: function mounted(el, binding) {
    var id = UniqueComponentId() + "_badge";
    var badge = DomHandler.createElement("span", {
      id,
      "class": !this.isUnstyled() && this.cx("root"),
      "p-bind": this.ptm("root", {
        context: _objectSpread$2(_objectSpread$2({}, binding.modifiers), {}, {
          nogutter: String(binding.value).length === 1,
          dot: binding.value == null
        })
      })
    });
    el.$_pbadgeId = badge.getAttribute("id");
    for (var modifier in binding.modifiers) {
      !this.isUnstyled() && DomHandler.addClass(badge, "p-badge-" + modifier);
    }
    if (binding.value != null) {
      if (_typeof$3(binding.value) === "object") el.$_badgeValue = binding.value.value;
      else el.$_badgeValue = binding.value;
      badge.appendChild((void 0).createTextNode(el.$_badgeValue));
      if (String(el.$_badgeValue).length === 1 && !this.isUnstyled()) {
        !this.isUnstyled() && DomHandler.addClass(badge, "p-badge-no-gutter");
      }
    } else {
      !this.isUnstyled() && DomHandler.addClass(badge, "p-badge-dot");
    }
    el.setAttribute("data-pd-badge", true);
    !this.isUnstyled() && DomHandler.addClass(el, "p-overlay-badge");
    el.setAttribute("data-p-overlay-badge", "true");
    el.appendChild(badge);
    this.$el = badge;
  },
  updated: function updated(el, binding) {
    !this.isUnstyled() && DomHandler.addClass(el, "p-overlay-badge");
    el.setAttribute("data-p-overlay-badge", "true");
    if (binding.oldValue !== binding.value) {
      var badge = (void 0).getElementById(el.$_pbadgeId);
      if (_typeof$3(binding.value) === "object") el.$_badgeValue = binding.value.value;
      else el.$_badgeValue = binding.value;
      if (!this.isUnstyled()) {
        if (el.$_badgeValue) {
          if (DomHandler.hasClass(badge, "p-badge-dot")) DomHandler.removeClass(badge, "p-badge-dot");
          if (el.$_badgeValue.length === 1) DomHandler.addClass(badge, "p-badge-no-gutter");
          else DomHandler.removeClass(badge, "p-badge-no-gutter");
        } else if (!el.$_badgeValue && !DomHandler.hasClass(badge, "p-badge-dot")) {
          DomHandler.addClass(badge, "p-badge-dot");
        }
      }
      badge.innerHTML = "";
      badge.appendChild((void 0).createTextNode(el.$_badgeValue));
    }
  }
});
var classes = {
  root: "p-tooltip p-component",
  arrow: "p-tooltip-arrow",
  text: "p-tooltip-text"
};
var TooltipStyle = BaseStyle.extend({
  name: "tooltip",
  classes
});
var BaseTooltip = BaseDirective.extend({
  style: TooltipStyle
});
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor) n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n2, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n2 = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n2;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
var Tooltip = BaseTooltip.extend("tooltip", {
  beforeMount: function beforeMount(el, options) {
    var _options$instance$$pr;
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    if (!options.value) return;
    else if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipFitContent = true;
      target.$_ptooltipIdAttr = UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
    } else if (_typeof$2(options.value) === "object" && options.value) {
      if (ObjectUtils$1.isEmpty(options.value.value) || options.value.value.trim() === "") return;
      else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
      }
    }
    target.$_ptooltipZIndex = (_options$instance$$pr = options.instance.$primevue) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.config) === null || _options$instance$$pr === void 0 || (_options$instance$$pr = _options$instance$$pr.zIndex) === null || _options$instance$$pr === void 0 ? void 0 : _options$instance$$pr.tooltip;
    this.bindEvents(target, options);
    el.setAttribute("data-pd-tooltip", true);
  },
  updated: function updated2(el, options) {
    var target = this.getTarget(el);
    target.$_ptooltipModifiers = this.getModifiers(options);
    this.unbindEvents(target);
    if (!options.value) {
      return;
    }
    if (typeof options.value === "string") {
      target.$_ptooltipValue = options.value;
      target.$_ptooltipDisabled = false;
      target.$_ptooltipEscape = true;
      target.$_ptooltipClass = null;
      target.$_ptooltipIdAttr = target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
      target.$_ptooltipShowDelay = 0;
      target.$_ptooltipHideDelay = 0;
      target.$_ptooltipAutoHide = true;
      this.bindEvents(target, options);
    } else if (_typeof$2(options.value) === "object" && options.value) {
      if (ObjectUtils$1.isEmpty(options.value.value) || options.value.value.trim() === "") {
        this.unbindEvents(target, options);
        return;
      } else {
        target.$_ptooltipValue = options.value.value;
        target.$_ptooltipDisabled = !!options.value.disabled === options.value.disabled ? options.value.disabled : false;
        target.$_ptooltipEscape = !!options.value.escape === options.value.escape ? options.value.escape : true;
        target.$_ptooltipClass = options.value["class"] || "";
        target.$_ptooltipFitContent = !!options.value.fitContent === options.value.fitContent ? options.value.fitContent : true;
        target.$_ptooltipIdAttr = options.value.id || target.$_ptooltipIdAttr || UniqueComponentId() + "_tooltip";
        target.$_ptooltipShowDelay = options.value.showDelay || 0;
        target.$_ptooltipHideDelay = options.value.hideDelay || 0;
        target.$_ptooltipAutoHide = !!options.value.autoHide === options.value.autoHide ? options.value.autoHide : true;
        this.bindEvents(target, options);
      }
    }
  },
  unmounted: function unmounted(el, options) {
    var target = this.getTarget(el);
    this.remove(target);
    this.unbindEvents(target, options);
    if (target.$_ptooltipScrollHandler) {
      target.$_ptooltipScrollHandler.destroy();
      target.$_ptooltipScrollHandler = null;
    }
  },
  timer: void 0,
  methods: {
    bindEvents: function bindEvents(el, options) {
      var _this = this;
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.$_focusevent = function(event) {
          return _this.onFocus(event, options);
        };
        el.addEventListener("focus", el.$_focusevent);
        el.addEventListener("blur", this.onBlur.bind(this));
      } else {
        el.$_mouseenterevent = function(event) {
          return _this.onMouseEnter(event, options);
        };
        el.addEventListener("mouseenter", el.$_mouseenterevent);
        el.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.addEventListener("click", this.onClick.bind(this));
      }
      el.addEventListener("keydown", this.onKeydown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.focus) {
        el.removeEventListener("focus", el.$_focusevent);
        el.$_focusevent = null;
        el.removeEventListener("blur", this.onBlur.bind(this));
      } else {
        el.removeEventListener("mouseenter", el.$_mouseenterevent);
        el.$_mouseenterevent = null;
        el.removeEventListener("mouseleave", this.onMouseLeave.bind(this));
        el.removeEventListener("click", this.onClick.bind(this));
      }
      el.removeEventListener("keydown", this.onKeydown.bind(this));
    },
    bindScrollListener: function bindScrollListener(el) {
      var _this2 = this;
      if (!el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler = new ConnectedOverlayScrollHandler(el, function() {
          _this2.hide(el);
        });
      }
      el.$_ptooltipScrollHandler.bindScrollListener();
    },
    unbindScrollListener: function unbindScrollListener(el) {
      if (el.$_ptooltipScrollHandler) {
        el.$_ptooltipScrollHandler.unbindScrollListener();
      }
    },
    onMouseEnter: function onMouseEnter(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onMouseLeave: function onMouseLeave(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      var autoHide = el.$_ptooltipAutoHide;
      if (!autoHide) {
        var valid = DomHandler.getAttribute(event.target, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.target, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.target, "data-pc-section") === "text" || DomHandler.getAttribute(event.relatedTarget, "data-pc-name") === "tooltip" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "arrow" || DomHandler.getAttribute(event.relatedTarget, "data-pc-section") === "text";
        !valid && this.hide(el, hideDelay);
      } else {
        this.hide(el, hideDelay);
      }
    },
    onFocus: function onFocus(event, options) {
      var el = event.currentTarget;
      var showDelay = el.$_ptooltipShowDelay;
      this.show(el, options, showDelay);
    },
    onBlur: function onBlur(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onClick: function onClick(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      this.hide(el, hideDelay);
    },
    onKeydown: function onKeydown(event) {
      var el = event.currentTarget;
      var hideDelay = el.$_ptooltipHideDelay;
      event.code === "Escape" && this.hide(event.currentTarget, hideDelay);
    },
    tooltipActions: function tooltipActions(el, options) {
      if (el.$_ptooltipDisabled || !DomHandler.isExist(el)) {
        return;
      }
      var tooltipElement = this.create(el, options);
      this.align(el);
      !this.isUnstyled() && DomHandler.fadeIn(tooltipElement, 250);
      var $this = this;
      (void 0).addEventListener("resize", function onWindowResize() {
        if (!DomHandler.isTouchDevice()) {
          $this.hide(el);
        }
        (void 0).removeEventListener("resize", onWindowResize);
      });
      tooltipElement.addEventListener("mouseleave", function onTooltipLeave() {
        $this.hide(el);
        tooltipElement.removeEventListener("mouseleave", onTooltipLeave);
      });
      this.bindScrollListener(el);
      ZIndexUtils.set("tooltip", tooltipElement, el.$_ptooltipZIndex);
    },
    show: function show(el, options, showDelay) {
      var _this3 = this;
      if (showDelay !== void 0) {
        this.timer = setTimeout(function() {
          return _this3.tooltipActions(el, options);
        }, showDelay);
      } else {
        this.tooltipActions(el, options);
      }
    },
    tooltipRemoval: function tooltipRemoval(el) {
      this.remove(el);
      this.unbindScrollListener(el);
    },
    hide: function hide(el, hideDelay) {
      var _this4 = this;
      clearTimeout(this.timer);
      if (hideDelay !== void 0) {
        setTimeout(function() {
          return _this4.tooltipRemoval(el);
        }, hideDelay);
      } else {
        this.tooltipRemoval(el);
      }
    },
    getTooltipElement: function getTooltipElement(el) {
      return (void 0).getElementById(el.$_ptooltipId);
    },
    create: function create(el) {
      var modifiers = el.$_ptooltipModifiers;
      var tooltipArrow = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("arrow"),
        "p-bind": this.ptm("arrow", {
          context: modifiers
        })
      });
      var tooltipText = DomHandler.createElement("div", {
        "class": !this.isUnstyled() && this.cx("text"),
        "p-bind": this.ptm("text", {
          context: modifiers
        })
      });
      if (!el.$_ptooltipEscape) {
        tooltipText.innerHTML = el.$_ptooltipValue;
      } else {
        tooltipText.innerHTML = "";
        tooltipText.appendChild((void 0).createTextNode(el.$_ptooltipValue));
      }
      var container = DomHandler.createElement("div", {
        id: el.$_ptooltipIdAttr,
        role: "tooltip",
        style: {
          display: "inline-block",
          width: el.$_ptooltipFitContent ? "fit-content" : void 0,
          pointerEvents: !this.isUnstyled() && el.$_ptooltipAutoHide && "none"
        },
        "class": [!this.isUnstyled() && this.cx("root"), el.$_ptooltipClass],
        "p-bind": this.ptm("root", {
          context: modifiers
        })
      }, tooltipArrow, tooltipText);
      (void 0).body.appendChild(container);
      el.$_ptooltipId = container.id;
      this.$el = container;
      return container;
    },
    remove: function remove(el) {
      if (el) {
        var tooltipElement = this.getTooltipElement(el);
        if (tooltipElement && tooltipElement.parentElement) {
          ZIndexUtils.clear(tooltipElement);
          (void 0).body.removeChild(tooltipElement);
        }
        el.$_ptooltipId = null;
      }
    },
    align: function align(el) {
      var modifiers = el.$_ptooltipModifiers;
      if (modifiers.top) {
        this.alignTop(el);
        if (this.isOutOfBounds(el)) {
          this.alignBottom(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
          }
        }
      } else if (modifiers.left) {
        this.alignLeft(el);
        if (this.isOutOfBounds(el)) {
          this.alignRight(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignLeft(el);
              }
            }
          }
        }
      } else if (modifiers.bottom) {
        this.alignBottom(el);
        if (this.isOutOfBounds(el)) {
          this.alignTop(el);
          if (this.isOutOfBounds(el)) {
            this.alignBottom(el);
          }
        }
      } else {
        this.alignRight(el);
        if (this.isOutOfBounds(el)) {
          this.alignLeft(el);
          if (this.isOutOfBounds(el)) {
            this.alignTop(el);
            if (this.isOutOfBounds(el)) {
              this.alignBottom(el);
              if (this.isOutOfBounds(el)) {
                this.alignRight(el);
              }
            }
          }
        }
      }
    },
    getHostOffset: function getHostOffset(el) {
      var offset2 = el.getBoundingClientRect();
      var targetLeft = offset2.left + DomHandler.getWindowScrollLeft();
      var targetTop = offset2.top + DomHandler.getWindowScrollTop();
      return {
        left: targetLeft,
        top: targetTop
      };
    },
    alignRight: function alignRight(el) {
      this.preAlign(el, "right");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + DomHandler.getOuterWidth(el);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignLeft: function alignLeft(el) {
      this.preAlign(el, "left");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left - DomHandler.getOuterWidth(tooltipElement);
      var top = hostOffset.top + (DomHandler.getOuterHeight(el) - DomHandler.getOuterHeight(tooltipElement)) / 2;
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignTop: function alignTop(el) {
      this.preAlign(el, "top");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top - DomHandler.getOuterHeight(tooltipElement);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    alignBottom: function alignBottom(el) {
      this.preAlign(el, "bottom");
      var tooltipElement = this.getTooltipElement(el);
      var hostOffset = this.getHostOffset(el);
      var left = hostOffset.left + (DomHandler.getOuterWidth(el) - DomHandler.getOuterWidth(tooltipElement)) / 2;
      var top = hostOffset.top + DomHandler.getOuterHeight(el);
      tooltipElement.style.left = left + "px";
      tooltipElement.style.top = top + "px";
    },
    preAlign: function preAlign(el, position) {
      var tooltipElement = this.getTooltipElement(el);
      tooltipElement.style.left = "-999px";
      tooltipElement.style.top = "-999px";
      DomHandler.removeClass(tooltipElement, "p-tooltip-".concat(tooltipElement.$_ptooltipPosition));
      !this.isUnstyled() && DomHandler.addClass(tooltipElement, "p-tooltip-".concat(position));
      tooltipElement.$_ptooltipPosition = position;
      tooltipElement.setAttribute("data-p-position", position);
      var arrowElement = DomHandler.findSingle(tooltipElement, '[data-pc-section="arrow"]');
      arrowElement.style.top = position === "bottom" ? "0" : position === "right" || position === "left" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "50%" : null;
      arrowElement.style.bottom = position === "top" ? "0" : null;
      arrowElement.style.left = position === "right" || position !== "right" && position !== "left" && position !== "top" && position !== "bottom" ? "0" : position === "top" || position === "bottom" ? "50%" : null;
      arrowElement.style.right = position === "left" ? "0" : null;
    },
    isOutOfBounds: function isOutOfBounds(el) {
      var tooltipElement = this.getTooltipElement(el);
      var offset2 = tooltipElement.getBoundingClientRect();
      var targetTop = offset2.top;
      var targetLeft = offset2.left;
      var width = DomHandler.getOuterWidth(tooltipElement);
      var height = DomHandler.getOuterHeight(tooltipElement);
      var viewport = DomHandler.getViewport();
      return targetLeft + width > viewport.width || targetLeft < 0 || targetTop < 0 || targetTop + height > viewport.height;
    },
    getTarget: function getTarget(el) {
      return DomHandler.hasClass(el, "p-inputwrapper") ? DomHandler.findSingle(el, "input") : el;
    },
    getModifiers: function getModifiers(options) {
      if (options.modifiers && Object.keys(options.modifiers).length) {
        return options.modifiers;
      }
      if (options.arg && _typeof$2(options.arg) === "object") {
        return Object.entries(options.arg).reduce(function(acc, _ref) {
          var _ref2 = _slicedToArray$1(_ref, 2), key = _ref2[0], val = _ref2[1];
          if (key === "event" || key === "position") acc[val] = true;
          return acc;
        }, {});
      }
      return {};
    }
  }
});
var BaseStyleClass = BaseDirective.extend({});
var StyleClass = BaseStyleClass.extend("styleclass", {
  mounted: function mounted2(el, binding) {
    el.setAttribute("data-pd-styleclass", true);
    this.bind(el, binding);
  },
  unmounted: function unmounted2(el) {
    this.unbind(el);
  },
  methods: {
    bind: function bind(el, binding) {
      var _this = this;
      var target = this.resolveTarget(el, binding);
      this.$el = target;
      el.$_pstyleclass_clicklistener = function() {
        if (binding.value.toggleClass) {
          if (DomHandler.hasClass(target, binding.value.toggleClass)) DomHandler.removeClass(target, binding.value.toggleClass);
          else DomHandler.addClass(target, binding.value.toggleClass);
        } else {
          if (target.offsetParent === null) _this.enter(target, el, binding);
          else _this.leave(target, binding);
        }
      };
      el.addEventListener("click", el.$_pstyleclass_clicklistener);
    },
    unbind: function unbind(el) {
      if (el.$_pstyleclass_clicklistener) {
        el.removeEventListener("click", el.$_pstyleclass_clicklistener);
        el.$_pstyleclass_clicklistener = null;
      }
      this.unbindDocumentListener(el);
    },
    enter: function enter(target, el, binding) {
      if (binding.value.enterActiveClass) {
        if (!target.$_pstyleclass_animating) {
          target.$_pstyleclass_animating = true;
          if (binding.value.enterActiveClass === "slidedown") {
            target.style.height = "0px";
            DomHandler.removeClass(target, "hidden");
            target.style.maxHeight = target.scrollHeight + "px";
            DomHandler.addClass(target, "hidden");
            target.style.height = "";
          }
          DomHandler.addClass(target, binding.value.enterActiveClass);
          if (binding.value.enterClass) {
            DomHandler.removeClass(target, binding.value.enterClass);
          }
          if (binding.value.enterFromClass) {
            DomHandler.removeClass(target, binding.value.enterFromClass);
          }
          target.$p_styleclass_enterlistener = function() {
            DomHandler.removeClass(target, binding.value.enterActiveClass);
            if (binding.value.enterToClass) {
              DomHandler.addClass(target, binding.value.enterToClass);
            }
            target.removeEventListener("animationend", target.$p_styleclass_enterlistener);
            if (binding.value.enterActiveClass === "slidedown") {
              target.style.maxHeight = "";
            }
            target.$_pstyleclass_animating = false;
          };
          target.addEventListener("animationend", target.$p_styleclass_enterlistener);
        }
      } else {
        if (binding.value.enterClass) {
          DomHandler.removeClass(target, binding.value.enterClass);
        }
        if (binding.value.enterFromClass) {
          DomHandler.removeClass(target, binding.value.enterFromClass);
        }
        if (binding.value.enterToClass) {
          DomHandler.addClass(target, binding.value.enterToClass);
        }
      }
      if (binding.value.hideOnOutsideClick) {
        this.bindDocumentListener(target, el, binding);
      }
    },
    leave: function leave(target, binding) {
      if (binding.value.leaveActiveClass) {
        if (!target.$_pstyleclass_animating) {
          target.$_pstyleclass_animating = true;
          DomHandler.addClass(target, binding.value.leaveActiveClass);
          if (binding.value.leaveClass) {
            DomHandler.removeClass(target, binding.value.leaveClass);
          }
          if (binding.value.leaveFromClass) {
            DomHandler.removeClass(target, binding.value.leaveFromClass);
          }
          target.$p_styleclass_leavelistener = function() {
            DomHandler.removeClass(target, binding.value.leaveActiveClass);
            if (binding.value.leaveToClass) {
              DomHandler.addClass(target, binding.value.leaveToClass);
            }
            target.removeEventListener("animationend", target.$p_styleclass_leavelistener);
            target.$_pstyleclass_animating = false;
          };
          target.addEventListener("animationend", target.$p_styleclass_leavelistener);
        }
      } else {
        if (binding.value.leaveClass) {
          DomHandler.removeClass(target, binding.value.leaveClass);
        }
        if (binding.value.leaveFromClass) {
          DomHandler.removeClass(target, binding.value.leaveFromClass);
        }
        if (binding.value.leaveToClass) {
          DomHandler.addClass(target, binding.value.leaveToClass);
        }
      }
      if (binding.value.hideOnOutsideClick) {
        this.unbindDocumentListener(target);
      }
    },
    resolveTarget: function resolveTarget(el, binding) {
      switch (binding.value.selector) {
        case "@next":
          return el.nextElementSibling;
        case "@prev":
          return el.previousElementSibling;
        case "@parent":
          return el.parentElement;
        case "@grandparent":
          return el.parentElement.parentElement;
        default:
          return (void 0).querySelector(binding.value.selector);
      }
    },
    bindDocumentListener: function bindDocumentListener(target, el, binding) {
      var _this2 = this;
      if (!target.$p_styleclass_documentlistener) {
        target.$p_styleclass_documentlistener = function(event) {
          if (!_this2.isVisible(target) || getComputedStyle(target).getPropertyValue("position") === "static") {
            _this2.unbindDocumentListener(target);
          } else if (_this2.isOutsideClick(event, target, el)) {
            _this2.leave(target, binding);
          }
        };
        target.ownerDocument.addEventListener("click", target.$p_styleclass_documentlistener);
      }
    },
    unbindDocumentListener: function unbindDocumentListener(target) {
      if (target.$p_styleclass_documentlistener) {
        target.ownerDocument.removeEventListener("click", target.$p_styleclass_documentlistener);
        target.$p_styleclass_documentlistener = null;
      }
    },
    isVisible: function isVisible(target) {
      return target.offsetParent !== null;
    },
    isOutsideClick: function isOutsideClick(event, target, el) {
      return !el.isSameNode(event.target) && !el.contains(event.target) && !target.contains(event.target);
    }
  }
});
var FocusTrapStyle = {};
var BaseFocusTrap = BaseDirective.extend({
  style: FocusTrapStyle
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : String(i);
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var FocusTrap = BaseFocusTrap.extend("focustrap", {
  mounted: function mounted3(el, binding) {
    var _ref = binding.value || {}, disabled = _ref.disabled;
    if (!disabled) {
      this.createHiddenFocusableElements(el, binding);
      this.bind(el, binding);
      this.autoElementFocus(el, binding);
    }
    el.setAttribute("data-pd-focustrap", true);
    this.$el = el;
  },
  updated: function updated3(el, binding) {
    var _ref2 = binding.value || {}, disabled = _ref2.disabled;
    disabled && this.unbind(el);
  },
  unmounted: function unmounted3(el) {
    this.unbind(el);
  },
  methods: {
    getComputedSelector: function getComputedSelector(selector) {
      return ':not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])'.concat(selector !== null && selector !== void 0 ? selector : "");
    },
    bind: function bind2(el, binding) {
      var _this = this;
      var _ref3 = binding.value || {}, onFocusIn = _ref3.onFocusIn, onFocusOut = _ref3.onFocusOut;
      el.$_pfocustrap_mutationobserver = new MutationObserver(function(mutationList) {
        mutationList.forEach(function(mutation) {
          if (mutation.type === "childList" && !el.contains((void 0).activeElement)) {
            var findNextFocusableElement = function findNextFocusableElement2(_el) {
              var focusableElement = DomHandler.isFocusableElement(_el) ? DomHandler.isFocusableElement(_el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) ? _el : DomHandler.getFirstFocusableElement(el, _this.getComputedSelector(el.$_pfocustrap_focusableselector)) : DomHandler.getFirstFocusableElement(_el);
              return ObjectUtils$1.isNotEmpty(focusableElement) ? focusableElement : _el.nextSibling && findNextFocusableElement2(_el.nextSibling);
            };
            DomHandler.focus(findNextFocusableElement(mutation.nextSibling));
          }
        });
      });
      el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_mutationobserver.observe(el, {
        childList: true
      });
      el.$_pfocustrap_focusinlistener = function(event) {
        return onFocusIn && onFocusIn(event);
      };
      el.$_pfocustrap_focusoutlistener = function(event) {
        return onFocusOut && onFocusOut(event);
      };
      el.addEventListener("focusin", el.$_pfocustrap_focusinlistener);
      el.addEventListener("focusout", el.$_pfocustrap_focusoutlistener);
    },
    unbind: function unbind2(el) {
      el.$_pfocustrap_mutationobserver && el.$_pfocustrap_mutationobserver.disconnect();
      el.$_pfocustrap_focusinlistener && el.removeEventListener("focusin", el.$_pfocustrap_focusinlistener) && (el.$_pfocustrap_focusinlistener = null);
      el.$_pfocustrap_focusoutlistener && el.removeEventListener("focusout", el.$_pfocustrap_focusoutlistener) && (el.$_pfocustrap_focusoutlistener = null);
    },
    autoFocus: function autoFocus(options) {
      this.autoElementFocus(this.$el, {
        value: _objectSpread$1(_objectSpread$1({}, options), {}, {
          autoFocus: true
        })
      });
    },
    autoElementFocus: function autoElementFocus(el, binding) {
      var _ref4 = binding.value || {}, _ref4$autoFocusSelect = _ref4.autoFocusSelector, autoFocusSelector = _ref4$autoFocusSelect === void 0 ? "" : _ref4$autoFocusSelect, _ref4$firstFocusableS = _ref4.firstFocusableSelector, firstFocusableSelector = _ref4$firstFocusableS === void 0 ? "" : _ref4$firstFocusableS, _ref4$autoFocus = _ref4.autoFocus, autoFocus2 = _ref4$autoFocus === void 0 ? false : _ref4$autoFocus;
      var focusableElement = DomHandler.getFirstFocusableElement(el, "[autofocus]".concat(this.getComputedSelector(autoFocusSelector)));
      autoFocus2 && !focusableElement && (focusableElement = DomHandler.getFirstFocusableElement(el, this.getComputedSelector(firstFocusableSelector)));
      DomHandler.focus(focusableElement);
    },
    onFirstHiddenElementFocus: function onFirstHiddenElementFocus(event) {
      var _this$$el;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_lasthiddenfocusableelement || !((_this$$el = this.$el) !== null && _this$$el !== void 0 && _this$$el.contains(relatedTarget)) ? DomHandler.getFirstFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_lasthiddenfocusableelement;
      DomHandler.focus(focusableElement);
    },
    onLastHiddenElementFocus: function onLastHiddenElementFocus(event) {
      var _this$$el2;
      var currentTarget = event.currentTarget, relatedTarget = event.relatedTarget;
      var focusableElement = relatedTarget === currentTarget.$_pfocustrap_firsthiddenfocusableelement || !((_this$$el2 = this.$el) !== null && _this$$el2 !== void 0 && _this$$el2.contains(relatedTarget)) ? DomHandler.getLastFocusableElement(currentTarget.parentElement, this.getComputedSelector(currentTarget.$_pfocustrap_focusableselector)) : currentTarget.$_pfocustrap_firsthiddenfocusableelement;
      DomHandler.focus(focusableElement);
    },
    createHiddenFocusableElements: function createHiddenFocusableElements(el, binding) {
      var _this2 = this;
      var _ref5 = binding.value || {}, _ref5$tabIndex = _ref5.tabIndex, tabIndex = _ref5$tabIndex === void 0 ? 0 : _ref5$tabIndex, _ref5$firstFocusableS = _ref5.firstFocusableSelector, firstFocusableSelector = _ref5$firstFocusableS === void 0 ? "" : _ref5$firstFocusableS, _ref5$lastFocusableSe = _ref5.lastFocusableSelector, lastFocusableSelector = _ref5$lastFocusableSe === void 0 ? "" : _ref5$lastFocusableSe;
      var createFocusableElement = function createFocusableElement2(onFocus2) {
        return DomHandler.createElement("span", {
          "class": "p-hidden-accessible p-hidden-focusable",
          tabIndex,
          role: "presentation",
          "aria-hidden": true,
          "data-p-hidden-accessible": true,
          "data-p-hidden-focusable": true,
          onFocus: onFocus2 === null || onFocus2 === void 0 ? void 0 : onFocus2.bind(_this2)
        });
      };
      var firstFocusableElement = createFocusableElement(this.onFirstHiddenElementFocus);
      var lastFocusableElement = createFocusableElement(this.onLastHiddenElementFocus);
      firstFocusableElement.$_pfocustrap_lasthiddenfocusableelement = lastFocusableElement;
      firstFocusableElement.$_pfocustrap_focusableselector = firstFocusableSelector;
      firstFocusableElement.setAttribute("data-pc-section", "firstfocusableelement");
      lastFocusableElement.$_pfocustrap_firsthiddenfocusableelement = firstFocusableElement;
      lastFocusableElement.$_pfocustrap_focusableselector = lastFocusableSelector;
      lastFocusableElement.setAttribute("data-pc-section", "lastfocusableelement");
      el.prepend(firstFocusableElement);
      el.append(lastFocusableElement);
    }
  }
});
var BaseAnimateOnScroll = BaseDirective.extend({});
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : String(i);
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n2 = Object.prototype.toString.call(o).slice(8, -1);
  if (n2 === "Object" && o.constructor) n2 = o.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n2, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n2 = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n2;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
var AnimateOnScroll = BaseAnimateOnScroll.extend("animateonscroll", {
  created: function created() {
    this.$value = this.$value || {};
    this.$el.style.opacity = this.$value.enterClass ? "0" : "";
  },
  mounted: function mounted4() {
    this.$el.setAttribute("data-pd-animateonscroll", true);
    this.bindIntersectionObserver();
  },
  unmounted: function unmounted4() {
    this.unbindAnimationEvents();
    this.unbindIntersectionObserver();
  },
  observer: void 0,
  resetObserver: void 0,
  isObserverActive: false,
  animationState: void 0,
  animationEndListener: void 0,
  methods: {
    bindAnimationEvents: function bindAnimationEvents() {
      var _this = this;
      if (!this.animationEndListener) {
        this.animationEndListener = function() {
          DomHandler.removeMultipleClasses(_this.$el, [_this.$value.enterClass, _this.$value.leaveClass]);
          !_this.$modifiers.once && _this.resetObserver.observe(_this.$el);
          _this.unbindAnimationEvents();
        };
        this.$el.addEventListener("animationend", this.animationEndListener);
      }
    },
    bindIntersectionObserver: function bindIntersectionObserver() {
      var _this2 = this;
      var _this$$value = this.$value, root = _this$$value.root, rootMargin = _this$$value.rootMargin, _this$$value$threshol = _this$$value.threshold, threshold = _this$$value$threshol === void 0 ? 0.5 : _this$$value$threshol;
      var options = {
        root,
        rootMargin,
        threshold
      };
      this.observer = new IntersectionObserver(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 1), entry2 = _ref2[0];
        if (_this2.isObserverActive) {
          if (entry2.boundingClientRect.top > 0) {
            entry2.isIntersecting ? _this2.enter() : _this2.leave();
          }
        } else if (entry2.isIntersecting) {
          _this2.enter();
        }
        _this2.isObserverActive = true;
      }, options);
      setTimeout(function() {
        return _this2.observer.observe(_this2.$el);
      }, 0);
      this.resetObserver = new IntersectionObserver(function(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 1), entry2 = _ref4[0];
        if (entry2.boundingClientRect.top > 0 && !entry2.isIntersecting) {
          _this2.$el.style.opacity = _this2.$value.enterClass ? "0" : "";
          DomHandler.removeMultipleClasses(_this2.$el, [_this2.$value.enterClass, _this2.$value.leaveClass]);
          _this2.resetObserver.unobserve(_this2.$el);
        }
        _this2.animationState = void 0;
      }, _objectSpread(_objectSpread({}, options), {}, {
        threshold: 0
      }));
    },
    enter: function enter2() {
      if (this.animationState !== "enter" && this.$value.enterClass) {
        this.$el.style.opacity = "";
        DomHandler.removeMultipleClasses(this.$el, this.$value.leaveClass);
        DomHandler.addMultipleClasses(this.$el, this.$value.enterClass);
        this.$modifiers.once && this.unbindIntersectionObserver(this.$el);
        this.bindAnimationEvents();
        this.animationState = "enter";
      }
    },
    leave: function leave2() {
      if (this.animationState !== "leave" && this.$value.leaveClass) {
        this.$el.style.opacity = this.$value.enterClass ? "0" : "";
        DomHandler.removeMultipleClasses(this.$el, this.$value.enterClass);
        DomHandler.addMultipleClasses(this.$el, this.$value.leaveClass);
        this.bindAnimationEvents();
        this.animationState = "leave";
      }
    },
    unbindAnimationEvents: function unbindAnimationEvents() {
      if (this.animationEndListener) {
        this.$el.removeEventListener("animationend", this.animationEndListener);
        this.animationEndListener = void 0;
      }
    },
    unbindIntersectionObserver: function unbindIntersectionObserver() {
      var _this$observer, _this$resetObserver;
      (_this$observer = this.observer) === null || _this$observer === void 0 || _this$observer.unobserve(this.$el);
      (_this$resetObserver = this.resetObserver) === null || _this$resetObserver === void 0 || _this$resetObserver.unobserve(this.$el);
      this.isObserverActive = false;
    }
  }
});
const primevue_plugin_egKpok8Auk = defineNuxtPlugin(({ vueApp }) => {
  var _a2;
  const runtimeConfig = useRuntimeConfig();
  const config = ((_a2 = runtimeConfig == null ? void 0 : runtimeConfig.public) == null ? void 0 : _a2.primevue) ?? {};
  const { usePrimeVue: usePrimeVue2 = true, options = {} } = config;
  const pt2 = {};
  usePrimeVue2 && vueApp.use(PrimeVue, { ...options, ...pt2 });
  vueApp.use(ToastService);
  vueApp.directive("primebadge", BadgeDirective);
  vueApp.directive("primetooltip", Tooltip);
  vueApp.directive("primeripple", Ripple);
  vueApp.directive("primestyleclass", StyleClass);
  vueApp.directive("primefocustrap", FocusTrap);
  vueApp.directive("primeanimateonscroll", AnimateOnScroll);
});
const switch_locale_path_ssr_5csfIgkrBP = defineNuxtPlugin({
  name: "i18n:plugin:switch-locale-path-ssr",
  dependsOn: ["i18n:plugin"],
  setup(nuxt) {
    if (nuxt.$config.public.i18n.experimental.switchLocalePathLinkSSR !== true) return;
    const switchLocalePath2 = useSwitchLocalePath();
    const switchLocalePathLinkWrapperExpr = new RegExp(
      [
        `<!--${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-\\[(\\w+)\\]-->`,
        `.+?`,
        `<!--/${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-->`
      ].join(""),
      "g"
    );
    nuxt.hook("app:rendered", (ctx) => {
      var _a2;
      if (((_a2 = ctx.renderResult) == null ? void 0 : _a2.html) == null) return;
      ctx.renderResult.html = ctx.renderResult.html.replaceAll(
        switchLocalePathLinkWrapperExpr,
        (match, p1) => match.replace(/href="([^"]+)"/, `href="${encodeURI(switchLocalePath2(p1 ?? ""))}"`)
      );
    });
  }
});
function extendI18n(i18n, {
  locales = [],
  localeCodes: localeCodes2 = [],
  baseUrl = "",
  hooks = {},
  context = {}
} = {}) {
  const scope = effectScope();
  const orgInstall = i18n.install;
  i18n.install = (vue, ...options) => {
    const pluginOptions = isPluginOptions(options[0]) ? assign({}, options[0]) : { inject: true };
    if (pluginOptions.inject == null) {
      pluginOptions.inject = true;
    }
    const orgComposerExtend = pluginOptions.__composerExtend;
    pluginOptions.__composerExtend = (localComposer) => {
      const globalComposer2 = getComposer$3(i18n);
      localComposer.locales = computed(() => globalComposer2.locales.value);
      localComposer.localeCodes = computed(() => globalComposer2.localeCodes.value);
      localComposer.baseUrl = computed(() => globalComposer2.baseUrl.value);
      let orgComposerDispose;
      if (isFunction(orgComposerExtend)) {
        orgComposerDispose = Reflect.apply(orgComposerExtend, pluginOptions, [localComposer]);
      }
      return () => {
        orgComposerDispose && orgComposerDispose();
      };
    };
    if (i18n.mode === "legacy") {
      const orgVueI18nExtend = pluginOptions.__vueI18nExtend;
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendVueI18n(vueI18n, hooks.onExtendVueI18n);
        let orgVueI18nDispose;
        if (isFunction(orgVueI18nExtend)) {
          orgVueI18nDispose = Reflect.apply(orgVueI18nExtend, pluginOptions, [vueI18n]);
        }
        return () => {
          orgVueI18nDispose && orgVueI18nDispose();
        };
      };
    }
    options[0] = pluginOptions;
    Reflect.apply(orgInstall, i18n, [vue, ...options]);
    const globalComposer = getComposer$3(i18n);
    scope.run(() => {
      extendComposer(globalComposer, { locales, localeCodes: localeCodes2, baseUrl, hooks, context });
      if (i18n.mode === "legacy" && isVueI18n(i18n.global)) {
        extendVueI18n(i18n.global, hooks.onExtendVueI18n);
      }
    });
    const app = vue;
    const exported = i18n.mode === "composition" ? app.config.globalProperties.$i18n : null;
    if (exported) {
      extendExportedGlobal(exported, globalComposer, hooks.onExtendExportedGlobal);
    }
    if (pluginOptions.inject) {
      const common = initCommonComposableOptions(i18n);
      vue.mixin({
        methods: {
          getRouteBaseName: wrapComposable(getRouteBaseName, common),
          resolveRoute: wrapComposable(resolveRoute, common),
          localePath: wrapComposable(localePath, common),
          localeRoute: wrapComposable(localeRoute, common),
          localeLocation: wrapComposable(localeLocation, common),
          switchLocalePath: wrapComposable(switchLocalePath, common),
          localeHead: wrapComposable(localeHead, common)
        }
      });
    }
    if (app.unmount) {
      const unmountApp = app.unmount;
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
  return scope;
}
function extendComposer(composer, options) {
  const { locales, localeCodes: localeCodes2, baseUrl, context } = options;
  const _locales = ref(locales);
  const _localeCodes = ref(localeCodes2);
  const _baseUrl = ref("");
  composer.locales = computed(() => _locales.value);
  composer.localeCodes = computed(() => _localeCodes.value);
  composer.baseUrl = computed(() => _baseUrl.value);
  {
    _baseUrl.value = resolveBaseUrl(baseUrl, context);
  }
  if (options.hooks && options.hooks.onExtendComposer) {
    options.hooks.onExtendComposer(composer);
  }
}
function extendPropertyDescriptors(composer, exported, hook) {
  const properties = [
    {
      locales: {
        get() {
          return composer.locales.value;
        }
      },
      localeCodes: {
        get() {
          return composer.localeCodes.value;
        }
      },
      baseUrl: {
        get() {
          return composer.baseUrl.value;
        }
      }
    }
  ];
  hook && properties.push(hook(composer));
  for (const property of properties) {
    for (const [key, descriptor] of Object.entries(property)) {
      Object.defineProperty(exported, key, descriptor);
    }
  }
}
function extendExportedGlobal(exported, g2, hook) {
  extendPropertyDescriptors(g2, exported, hook);
}
function extendVueI18n(vueI18n, hook) {
  const c2 = getComposer$3(vueI18n);
  extendPropertyDescriptors(c2, vueI18n, hook);
}
function isPluginOptions(options) {
  return isObject$1(options) && ("inject" in options || "__composerExtend" in options || "__vueI18nExtend" in options);
}
const i18n_sq1MuCrqbC = defineNuxtPlugin({
  name: "i18n:plugin",
  parallel: parallelPlugin,
  async setup(nuxt) {
    let __temp, __restore;
    const route = useRoute$1();
    const { vueApp: app } = nuxt;
    const nuxtContext = nuxt;
    const host = getHost();
    const { configLocales, defaultLocale, multiDomainLocales, strategy } = nuxtContext.$config.public.i18n;
    const hasDefaultForDomains = configLocales.some(
      (l) => typeof l !== "string" && Array.isArray(l.defaultForDomains)
    );
    let defaultLocaleDomain;
    if (defaultLocale) {
      defaultLocaleDomain = defaultLocale;
    } else if (hasDefaultForDomains) {
      const findDefaultLocale = configLocales.find(
        (l) => typeof l === "string" || !Array.isArray(l.defaultForDomains) ? false : l.defaultForDomains.includes(host ?? "")
      );
      defaultLocaleDomain = (findDefaultLocale == null ? void 0 : findDefaultLocale.code) ?? "";
    } else {
      defaultLocaleDomain = "";
    }
    if (multiDomainLocales && (strategy === "prefix_except_default" || strategy === "prefix_and_default")) {
      const router = useRouter$1();
      router.getRoutes().forEach((route2) => {
        var _a2;
        if ((_a2 = route2.name) == null ? void 0 : _a2.toString().includes("___default")) {
          const routeNameLocale = route2.name.toString().split("___")[1];
          if (routeNameLocale !== defaultLocaleDomain) {
            router.removeRoute(route2.name);
          } else {
            const newRouteName = route2.name.toString().replace("___default", "");
            route2.name = newRouteName;
          }
        }
      });
    }
    const runtimeI18n = { ...nuxtContext.$config.public.i18n, defaultLocale: defaultLocaleDomain };
    runtimeI18n.baseUrl = extendBaseUrl();
    const _detectBrowserLanguage = runtimeDetectBrowserLanguage();
    const vueI18nOptions = ([__temp, __restore] = executeAsync(() => loadVueI18nOptions(vueI18nConfigs, useNuxtApp())), __temp = await __temp, __restore(), __temp);
    vueI18nOptions.messages = vueI18nOptions.messages || {};
    vueI18nOptions.fallbackLocale = vueI18nOptions.fallbackLocale ?? false;
    const getLocaleFromRoute = createLocaleFromRouteGetter();
    const getDefaultLocale = (locale) => locale || vueI18nOptions.locale || "en-US";
    const localeCookie = getI18nCookie();
    let initialLocale = detectLocale(
      route,
      getLocaleFromRoute,
      getDefaultLocale(runtimeI18n.defaultLocale),
      {
        ssg: "normal",
        callType: "setup",
        firstAccess: true,
        localeCookie: getLocaleCookie(localeCookie, _detectBrowserLanguage, runtimeI18n.defaultLocale)
      },
      runtimeI18n
    );
    vueI18nOptions.messages = ([__temp, __restore] = executeAsync(() => loadInitialMessages(vueI18nOptions.messages, localeLoaders, {
      localeCodes,
      initialLocale,
      lazy: runtimeI18n.lazy,
      defaultLocale: runtimeI18n.defaultLocale,
      fallbackLocale: vueI18nOptions.fallbackLocale
    })), __temp = await __temp, __restore(), __temp);
    initialLocale = getDefaultLocale(initialLocale);
    const i18n = createI18n({ ...vueI18nOptions, locale: initialLocale });
    let notInitialSetup = true;
    const isInitialLocaleSetup = (locale) => initialLocale !== locale && notInitialSetup;
    extendI18n(i18n, {
      locales: runtimeI18n.configLocales,
      localeCodes,
      baseUrl: runtimeI18n.baseUrl,
      context: nuxtContext,
      hooks: {
        onExtendComposer(composer) {
          composer.strategy = runtimeI18n.strategy;
          composer.localeProperties = computed(
            () => normalizedLocales.find((l) => l.code === composer.locale.value) || { code: composer.locale.value }
          );
          composer.setLocale = async (locale) => {
            const localeSetup = isInitialLocaleSetup(locale);
            const modified = await loadAndSetLocale(locale, i18n, runtimeI18n, localeSetup);
            if (modified && localeSetup) {
              notInitialSetup = false;
            }
            const redirectPath = await nuxtContext.runWithContext(
              () => detectRedirect({
                route: { to: route },
                targetLocale: locale,
                routeLocaleGetter: getLocaleFromRoute
              })
            );
            await nuxtContext.runWithContext(
              async () => await navigate(
                {
                  nuxtApp: nuxtContext,
                  i18n,
                  redirectPath,
                  locale,
                  route
                },
                { enableNavigate: true }
              )
            );
          };
          composer.loadLocaleMessages = async (locale) => {
            const setter = (locale2, message) => mergeLocaleMessage(i18n, locale2, message);
            await loadLocale(locale, localeLoaders, setter);
          };
          composer.differentDomains = runtimeI18n.differentDomains;
          composer.defaultLocale = runtimeI18n.defaultLocale;
          composer.getBrowserLocale = () => getBrowserLocale();
          composer.getLocaleCookie = () => getLocaleCookie(localeCookie, _detectBrowserLanguage, runtimeI18n.defaultLocale);
          composer.setLocaleCookie = (locale) => setLocaleCookie(localeCookie, locale, _detectBrowserLanguage);
          composer.onBeforeLanguageSwitch = (oldLocale, newLocale, initialSetup, context) => nuxt.callHook("i18n:beforeLocaleSwitch", { oldLocale, newLocale, initialSetup, context });
          composer.onLanguageSwitched = (oldLocale, newLocale) => nuxt.callHook("i18n:localeSwitched", { oldLocale, newLocale });
          composer.finalizePendingLocaleChange = async () => {
            if (!i18n.__pendingLocale) {
              return;
            }
            setLocale(i18n, i18n.__pendingLocale);
            if (i18n.__resolvePendingLocalePromise) {
              await i18n.__resolvePendingLocalePromise();
            }
            i18n.__pendingLocale = void 0;
          };
          composer.waitForPendingLocaleChange = async () => {
            if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
              await i18n.__pendingLocalePromise;
            }
          };
        },
        onExtendExportedGlobal(g2) {
          return {
            strategy: {
              get() {
                return g2.strategy;
              }
            },
            localeProperties: {
              get() {
                return g2.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(g2.setLocale, g2, [locale]);
              }
            },
            differentDomains: {
              get() {
                return g2.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return g2.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(g2.getBrowserLocale, g2, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(g2.getLocaleCookie, g2, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(g2.setLocaleCookie, g2, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(g2.onBeforeLanguageSwitch, g2, [oldLocale, newLocale, initialSetup, context]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(g2.onLanguageSwitched, g2, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(g2.finalizePendingLocaleChange, g2, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(g2.waitForPendingLocaleChange, g2, []);
              }
            }
          };
        },
        onExtendVueI18n(composer) {
          return {
            strategy: {
              get() {
                return composer.strategy;
              }
            },
            localeProperties: {
              get() {
                return composer.localeProperties.value;
              }
            },
            setLocale: {
              get() {
                return async (locale) => Reflect.apply(composer.setLocale, composer, [locale]);
              }
            },
            loadLocaleMessages: {
              get() {
                return async (locale) => Reflect.apply(composer.loadLocaleMessages, composer, [locale]);
              }
            },
            differentDomains: {
              get() {
                return composer.differentDomains;
              }
            },
            defaultLocale: {
              get() {
                return composer.defaultLocale;
              }
            },
            getBrowserLocale: {
              get() {
                return () => Reflect.apply(composer.getBrowserLocale, composer, []);
              }
            },
            getLocaleCookie: {
              get() {
                return () => Reflect.apply(composer.getLocaleCookie, composer, []);
              }
            },
            setLocaleCookie: {
              get() {
                return (locale) => Reflect.apply(composer.setLocaleCookie, composer, [locale]);
              }
            },
            onBeforeLanguageSwitch: {
              get() {
                return (oldLocale, newLocale, initialSetup, context) => Reflect.apply(composer.onBeforeLanguageSwitch, composer, [
                  oldLocale,
                  newLocale,
                  initialSetup,
                  context
                ]);
              }
            },
            onLanguageSwitched: {
              get() {
                return (oldLocale, newLocale) => Reflect.apply(composer.onLanguageSwitched, composer, [oldLocale, newLocale]);
              }
            },
            finalizePendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.finalizePendingLocaleChange, composer, []);
              }
            },
            waitForPendingLocaleChange: {
              get() {
                return () => Reflect.apply(composer.waitForPendingLocaleChange, composer, []);
              }
            }
          };
        }
      }
    });
    const pluginOptions = {
      __composerExtend: (c2) => {
        const g2 = getComposer$3(i18n);
        c2.strategy = g2.strategy;
        c2.localeProperties = computed(() => g2.localeProperties.value);
        c2.setLocale = g2.setLocale;
        c2.differentDomains = g2.differentDomains;
        c2.getBrowserLocale = g2.getBrowserLocale;
        c2.getLocaleCookie = g2.getLocaleCookie;
        c2.setLocaleCookie = g2.setLocaleCookie;
        c2.onBeforeLanguageSwitch = g2.onBeforeLanguageSwitch;
        c2.onLanguageSwitched = g2.onLanguageSwitched;
        c2.finalizePendingLocaleChange = g2.finalizePendingLocaleChange;
        c2.waitForPendingLocaleChange = g2.waitForPendingLocaleChange;
        return () => {
        };
      }
    };
    app.use(i18n, pluginOptions);
    injectNuxtHelpers(nuxtContext, i18n);
    let routeChangeCount = 0;
    addRouteMiddleware(
      "locale-changing",
      defineNuxtRouteMiddleware(async (to, from) => {
        let __temp2, __restore2;
        const locale = detectLocale(
          to,
          getLocaleFromRoute,
          () => {
            return getLocale$1(i18n) || getDefaultLocale(runtimeI18n.defaultLocale);
          },
          {
            ssg: "normal",
            callType: "routing",
            firstAccess: routeChangeCount === 0,
            localeCookie: getLocaleCookie(localeCookie, _detectBrowserLanguage, runtimeI18n.defaultLocale)
          },
          runtimeI18n
        );
        const localeSetup = isInitialLocaleSetup(locale);
        const modified = ([__temp2, __restore2] = executeAsync(() => loadAndSetLocale(locale, i18n, runtimeI18n, localeSetup)), __temp2 = await __temp2, __restore2(), __temp2);
        if (modified && localeSetup) {
          notInitialSetup = false;
        }
        const redirectPath = ([__temp2, __restore2] = executeAsync(() => nuxtContext.runWithContext(
          () => detectRedirect({
            route: { to, from },
            targetLocale: locale,
            routeLocaleGetter: runtimeI18n.strategy === "no_prefix" ? () => locale : getLocaleFromRoute,
            calledWithRouting: true
          })
        )), __temp2 = await __temp2, __restore2(), __temp2);
        routeChangeCount++;
        return [__temp2, __restore2] = executeAsync(() => nuxtContext.runWithContext(
          async () => navigate({ nuxtApp: nuxtContext, i18n, redirectPath, locale, route: to })
        )), __temp2 = await __temp2, __restore2(), __temp2;
      }),
      { global: true }
    );
  }
});
const number_input_xUrWT2CU4C = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("number-input", {
    mounted(el) {
      el.addEventListener("input", (event) => {
        const target = event.target;
        const value = target.value;
        let newValue = value.replace(/[^0-9.]/g, "");
        newValue = newValue.replace(/^0+(\d)/, "$1");
        const parts = newValue.split(".");
        if (parts.length > 2) {
          newValue = parts[0] + "." + parts.slice(1).join("");
        }
        if (newValue !== value) {
          target.value = newValue;
          target.dispatchEvent(new Event("input"));
        }
      });
    }
  });
});
const safe_html_CjW4kCB3wM = defineNuxtPlugin((nuxtApp) => {
  const config = {
    ADD_ATTR: ["target"]
  };
  nuxtApp.vueApp.directive("safe-html", {
    // Client-side DOM manipulation (mounted)
    mounted(el, binding) {
      el.innerHTML = DOMPurify.sanitize(binding.value, config);
    },
    // Server-side rendering (SSR)
    getSSRProps(binding) {
      return {
        // works only in vue 3.5.4, so nuxt needed to be updated for it to work
        innerHTML: DOMPurify.sanitize(binding.value, config)
      };
    }
  });
});
function parseAndSetCookies(cookies, event) {
  for (const cookie of cookies) {
    const [nameValue, ...attributes] = cookie.split(";").map((part) => part.trim());
    const [cookieName, cookieValue] = nameValue.split("=");
    const options = {};
    for (const attribute of attributes) {
      const [key, value] = attribute.split("=").map((part) => part.trim().toLowerCase());
      switch (key) {
        case "path":
          options.path = value;
          break;
        case "samesite":
          options.sameSite = value;
          break;
        case "domain":
          options.domain = value;
          break;
        case "httponly":
          options.httpOnly = true;
          break;
        case "secure":
          options.secure = true;
          break;
        case "max-age":
          options.maxAge = parseInt(value, 10);
          break;
        case "expires":
          options.expires = new Date(value);
          break;
      }
    }
    setCookie(event, cookieName, cookieValue, options);
  }
}
function setBaseHeaders(locale, options) {
  const reqHeaders = useRequestHeaders(["cookie", "referer"]);
  let passedHeaders = { ...reqHeaders };
  if (options == null ? void 0 : options.headers) {
    passedHeaders = {
      ...passedHeaders,
      ...options.headers
    };
  }
  const headers = new Headers(passedHeaders);
  headers.set("Accept", "application/json");
  headers.set("X-User-Language-Id", String(getLocaleId(locale)));
  return headers;
}
function getError(response, request, options) {
  var _a2, _b2, _c, _d;
  const message = Array.isArray((_a2 = response._data) == null ? void 0 : _a2.errorCode) ? (_c = (_b2 = response._data) == null ? void 0 : _b2.errorCode) == null ? void 0 : _c[0] : (_d = response._data) == null ? void 0 : _d.errorCode;
  const statusCode = message !== errorCodes.E_REFRESH_TOKEN_NOT_FOUND && (message == null ? void 0 : message.includes("not_found")) ? 404 : response.status;
  if (statusCode === 404) {
    throw showError({
      statusCode: 404,
      fatal: true,
      statusMessage: message
    });
  }
  return createError({
    statusCode,
    message,
    statusMessage: message,
    data: {
      request,
      method: (options == null ? void 0 : options.method) ?? null,
      params: (options == null ? void 0 : options.params) ?? null,
      body: (options == null ? void 0 : options.body) ?? null,
      response: response._data || null
    }
  });
}
const _01_fetch_hkVDifFWlF = defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  useToast();
  const authStore = useAuthStore();
  const appStore = useAppStore();
  useErrorHandling();
  const instance = $fetch.create({
    baseURL: config.public.baseURL
  });
  const customFetch = async (request, options) => {
    var _a2, _b2, _c;
    const headers = setBaseHeaders(appStore.locale, options);
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event.context.locale) {
      const localeId = nuxtApp.ssrContext.event.context.localeId;
      const existingCookies = headers.get("Cookie") || "";
      const cookiesArray = existingCookies.split("; ").map((cookie) => cookie.trim());
      const updatedCookiesArray = cookiesArray.filter(
        (cookie) => !cookie.startsWith(`${DEFAULT_LOCALE_ID_COOKIE}=`)
      );
      updatedCookiesArray.push(`${DEFAULT_LOCALE_ID_COOKIE}=${localeId}`);
      const updatedCookies = updatedCookiesArray.join("; ");
      headers.set("Cookie", updatedCookies);
    }
    if (authStore.accessToken) {
      headers.set("Authorization", `Bearer ${authStore.accessToken}`);
    }
    try {
      const response = await instance.raw(request, { headers, ...options });
      if (response._data && ((_a2 = response._data) == null ? void 0 : _a2.success) === false) {
        const data = response._data;
        if (options == null ? void 0 : options.localError) throw data;
        if (false) ;
        throw getError(response, request, options);
      }
      const cookies = response.headers.getSetCookie();
      if ((_b2 = nuxtApp.ssrContext) == null ? void 0 : _b2.event) {
        parseAndSetCookies(cookies, nuxtApp.ssrContext.event);
      }
      return ((_c = response._data) == null ? void 0 : _c.data) !== void 0 ? response._data.data : response._data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return {
    provide: {
      customFetch
    }
  };
});
const _02_auth_server_ihNwLqPCb4 = defineNuxtPlugin(async (nuxtApp) => {
  var _a2;
  let __temp, __restore;
  nuxtApp.payload.isCached = Boolean((_a2 = useRequestEvent()) == null ? void 0 : _a2.context.cache);
  if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt && !nuxtApp.payload.isCached) {
    const { makeUserLoggedIn, makeUserLoggedOut, authReadyState } = useLogin();
    const { $customFetch } = useNuxtApp();
    const authRepo = AuthService($customFetch);
    try {
      const response = ([__temp, __restore] = executeAsync(() => authRepo.refresh()), __temp = await __temp, __restore(), __temp);
      ;
      [__temp, __restore] = executeAsync(() => makeUserLoggedIn(response.access_token)), await __temp, __restore();
      ;
    } catch {
      [__temp, __restore] = executeAsync(() => makeUserLoggedOut()), await __temp, __restore();
    } finally {
      if (!authReadyState.value) {
        authReadyState.value = true;
      }
    }
  }
});
const floating_vue_BiOD74u9sH = defineNuxtPlugin(() => {
  Gt.options.themes = {
    "info-tooltip": {
      ...Gt.options.themes.tooltip,
      popperTriggers: ["hover"],
      $extend: "menu",
      $resetCss: true
    }
  };
});
const vue_i18n_4tPQ9Bsubn = defineNuxtPlugin(() => {
  return {
    modifiers: {
      capitalizeAllLetters: (str) => str.replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase())
    }
  };
});
const vue_query_wrmMkNpEpe = defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState("vue-query");
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        experimental_prefetchInRender: true,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: 0
        // retry logic is in fetch plugin
      }
    }
  });
  const options = { queryClient };
  nuxt.vueApp.use(VueQueryPlugin, options);
  {
    nuxt.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient);
    });
  }
});
const _1_absoluteImageUrls_server_fFRzzZyk5x = defineNuxtPlugin({
  enforce: "post",
  setup() {
    const head = injectHead();
    if (!head)
      return;
    const resolver = createSitePathResolver({
      withBase: true,
      absolute: true,
      canonical: true
    });
    head.use({
      hooks: {
        "tags:resolve": async ({ tags }) => {
          for (const tag of tags) {
            if (tag.tag !== "meta")
              continue;
            if (tag.props.property !== "og:image:url" && tag.props.property !== "og:image" && tag.props.name !== "twitter:image")
              continue;
            if (typeof tag.props.content !== "string" || !tag.props.content.trim() || tag.props.content.startsWith("http") || tag.props.content.startsWith("//"))
              continue;
            tag.props.content = unref(resolver(tag.props.content));
          }
        }
      }
    });
  }
});
const _0_routeRules_server_BfMGGJG5SO = defineNuxtPlugin({
  enforce: "post",
  async setup() {
    const head = injectHead();
    if (!head)
      return;
    const event = useRequestEvent();
    if (event.context._nitro.routeRules.head)
      head.push(event.context._nitro.routeRules.head, { mode: "server" });
    if (event.context._nitro.routeRules.seoMeta) {
      const meta = unpackMeta({ ...event.context._nitro.routeRules.seoMeta });
      head.push({
        meta
      }, { mode: "server" });
    }
  }
});
const init_4azZLOG1sb = defineNuxtPlugin({
  name: "nuxt-schema-org:init",
  order: 999,
  dependsOn: ["i18n:plugin"],
  setup(nuxtApp) {
    initPlugin(nuxtApp);
  }
});
const plugins = [
  payload_ygjqzWS29n,
  unhead_KgADcZ0jPj,
  plugin$1,
  _0_siteConfig_MwZUzHrRNP,
  revive_payload_server_eJ33V7gbc6,
  plugin,
  components_plugin_KR1HBZs4kY,
  plugin_ghbUAjaD3n,
  titles_dw2T9lEw4h,
  defaultsWaitI18n_fcc0iSNKKy,
  siteConfig_izaWKZ8rEu,
  inferSeoMetaPlugin_Uk9bcXDHeN,
  defaults_CcNrs0tTlX,
  og_image_canonical_urls_server_YYKCE0iokV,
  route_rule_og_image_server_xL1rf4QeLE,
  robot_meta_server_6Qhe4cPOr2,
  i18n_server_bJBihSV2Mg,
  floating_vue_EIcJ7xiw0h,
  plugin_Jozdw60ZsE,
  primevue_plugin_egKpok8Auk,
  switch_locale_path_ssr_5csfIgkrBP,
  i18n_sq1MuCrqbC,
  number_input_xUrWT2CU4C,
  safe_html_CjW4kCB3wM,
  _01_fetch_hkVDifFWlF,
  _02_auth_server_ihNwLqPCb4,
  floating_vue_BiOD74u9sH,
  vue_i18n_4tPQ9Bsubn,
  vue_query_wrmMkNpEpe,
  _1_absoluteImageUrls_server_fFRzzZyk5x,
  _0_routeRules_server_BfMGGJG5SO,
  init_4azZLOG1sb
];
const layouts = {
  "default-compact": () => import('./default-compact-ChMGwmqh.mjs').then((m2) => m2.default || m2),
  default: () => import('./default-B9ZyIfnq.mjs').then((m2) => m2.default || m2),
  "parts-app-contact-us": () => import('./AppContactUs-B-14loH_.mjs').then((m2) => m2.default || m2),
  "parts-app-cookies-notification": () => import('./AppCookiesNotification-ZRtfifmf.mjs').then((m2) => m2.default || m2),
  "parts-app-disclaimer": () => import('./AppDisclaimer-BmRg8DmM.mjs').then((m2) => m2.default || m2),
  "parts-app-sidebar": () => import('./AppSidebar-C-UcNw2b.mjs').then((m2) => m2.default || m2),
  "parts-main-footer": () => import('./MainFooter-CYqpUsTi.mjs').then((m2) => m2.default || m2),
  "parts-main-header": () => import('./MainHeader-DkgEjI3j.mjs').then((m2) => m2.default || m2),
  "parts-header-desktop": () => import('./HeaderDesktop-DhWAqAeo.mjs').then((m2) => m2.default || m2),
  "parts-header-mobile": () => import('./HeaderMobile-BdCk1dMW.mjs').then((m2) => m2.default || m2),
  "parts-header-nav-bar": () => import('./HeaderNavBar-CdlXkfsu.mjs').then((m2) => m2.default || m2),
  "parts-header-submit-dialog": () => import('./HeaderSubmitDialog-_fF5nG7P.mjs').then((m2) => m2.default || m2),
  "parts-header-top-bar": () => import('./HeaderTopBar-C3yuotEY.mjs').then((m2) => m2.default || m2),
  "parts-header-submit-dialog-config": () => import('./entry-styles-1.mjs-DgBF4tXX.mjs').then(function(n2) {
    return n2.d;
  }).then((m2) => m2.default || m2)
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h$1(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_0 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute$1() ? useRoute() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h$1(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h$1(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a2, _b2;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b2 = (_a2 = context.slots).default) == null ? void 0 : _b2.call(_a2);
      }
      return h$1(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_0$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(VueQueryDevtools), null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _imports_0 = "" + __buildAssetsURL("404.CQtPJJYU.gif");
const _imports_1 = "" + __buildAssetsURL("500.CNiqEWyS.gif");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const { t } = useI18n();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_layout = __nuxt_component_0;
      _push(ssrRenderComponent(_component_nuxt_layout, mergeProps({ name: "default" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-flex-grow tw-py-10"${_scopeId}><div class="tw-mb-15 tw-flex tw-flex-col"${_scopeId}>`);
            if (((_a2 = __props.error) == null ? void 0 : _a2.statusCode) === 404) {
              _push2(`<!--[--><img${ssrRenderAttr("src", _imports_0)} alt="404"${_scopeId}><p class="heading-h4.1 tw-text-center"${_scopeId}>${ssrInterpolate(unref(t)("errors.errorPage404"))}</p><!--]-->`);
            } else if (((_b2 = __props.error) == null ? void 0 : _b2.statusCode) === 500) {
              _push2(`<!--[--><img${ssrRenderAttr("src", _imports_1)} alt="500"${_scopeId}><p class="tw-text-center tw-text-accent-500"${_scopeId}>${ssrInterpolate((_c = __props.error) == null ? void 0 : _c.message)}</p><p class="heading-h4.1 tw-mt-4"${_scopeId}>${ssrInterpolate(unref(t)("errors.errorPage500"))}</p><!--]-->`);
            } else {
              _push2(`<!--[-->${ssrInterpolate((_d = __props.error) == null ? void 0 : _d.statusCode)} ${ssrInterpolate((_e = __props.error) == null ? void 0 : _e.message)}<!--]-->`);
            }
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$l$1, {
              category: unref(ButtonCategoryOptions).secondary,
              variant: unref(ButtonVariantOptions).confirm,
              size: unref(ButtonSizeOptions).medium,
              label: unref(t)("common.buttons.backToX", { field: "common.home" }),
              onClick: ($event) => unref(clearError)({ redirect: "/" })
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-flex-grow tw-py-10" }, [
                createVNode("div", { class: "tw-mb-15 tw-flex tw-flex-col" }, [
                  ((_f = __props.error) == null ? void 0 : _f.statusCode) === 404 ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                    createVNode("img", {
                      src: _imports_0,
                      alt: "404"
                    }),
                    createVNode("p", { class: "heading-h4.1 tw-text-center" }, toDisplayString(unref(t)("errors.errorPage404")), 1)
                  ], 64)) : ((_g = __props.error) == null ? void 0 : _g.statusCode) === 500 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode("img", {
                      src: _imports_1,
                      alt: "500"
                    }),
                    createVNode("p", { class: "tw-text-center tw-text-accent-500" }, toDisplayString((_h = __props.error) == null ? void 0 : _h.message), 1),
                    createVNode("p", { class: "heading-h4.1 tw-mt-4" }, toDisplayString(unref(t)("errors.errorPage500")), 1)
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createTextVNode(toDisplayString((_i = __props.error) == null ? void 0 : _i.statusCode) + " " + toDisplayString((_j = __props.error) == null ? void 0 : _j.message), 1)
                  ], 64))
                ]),
                createVNode(_sfc_main$l$1, {
                  category: unref(ButtonCategoryOptions).secondary,
                  variant: unref(ButtonVariantOptions).confirm,
                  size: unref(ButtonSizeOptions).medium,
                  label: unref(t)("common.buttons.backToX", { field: "common.home" }),
                  onClick: ($event) => unref(clearError)({ redirect: "/" })
                }, null, 8, ["category", "variant", "size", "label", "onClick"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = defineAsyncComponent(() => import('./island-renderer-D_3nByth.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute$1());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

const server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  F: FocusTrap,
  T: ToastEventBus,
  a: useOgImageRuntimeConfig,
  b: usePrimeVue,
  default: entry$1,
  u: useSiteConfig
});

export { AuthService as A, _sfc_main$h as B, _export_sfc as C, DappMetric as D, useTypedLocale as E, FocusTrap as F, useDeBreakpoints as G, errorCodes as H, maskEmail as I, useOgImageRuntimeConfig as J, useSiteConfig as K, useWallet as L, MAX_RANKING_METRICS_NUMBER as M, BASE_WALLETS_CONFIG as N, OverlayEventBus as O, server as P, TimeVariations as T, UserService as U, WalletProvider as W, _sfc_main$a$2 as _, _sfc_main$9$1 as a, _sfc_main$k as b, DAPP_METRICS_OPTIONS as c, dappKeys as d, getDappMetricCategoryLabelKey as e, formatDappRankingData as f, getDappFieldForBackend as g, DAPP_METRICS_DEFAULT as h, itemsListRequestParamsMapper as i, getLocalizedTimeLabel as j, DappService as k, script$3$2 as l, ToastEventBus as m, useLogin as n, useErrorHandling as o, ToastSeverities as p, _sfc_main$b$1 as q, useDevice as r, script$4$1 as s, formatPrice as t, usePrimeVue as u, formatNumber as v, _sfc_main$g as w, DeFormGroup as x, DISPLAY_NAME_MAX_LENGTH as y, _sfc_main$3 as z };
//# sourceMappingURL=server.mjs.map
