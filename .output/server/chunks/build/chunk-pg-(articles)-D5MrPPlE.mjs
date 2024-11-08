import { version, defineComponent, ref, provide, createElementBlock, h, getCurrentInstance, inject, useSSRContext, computed, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, toDisplayString as toDisplayString$1, renderSlot, createVNode, mergeModels, useModel, resolveDynamicComponent, effectScope, shallowReactive, reactive, getCurrentScope, hasInjectionContext, toRef, watchEffect, watch, isRef, markRaw, toRaw, isReactive, Fragment, readonly, toRefs, toHandlers, resolveComponent, createTextVNode, onServerPrefetch, withAsyncContext, resolveDirective, customRef, nextTick, shallowRef, onMounted, withDirectives, normalizeClass, createElementVNode, onScopeDispose, renderList, Text } from 'vue';
import { a0 as createHooks, h as createError$1, a1 as getRequestHeaders, a2 as klona, a3 as parse$1, a4 as getRequestHeader, J as toRouteMatcher, K as createRouter, p as defu, a5 as sanitizeStatusCode, l as destr, a6 as isEqual$1, Y as setCookie, a7 as getCookie, a8 as deleteCookie } from '../runtime.mjs';
import { START_LOCATION, useRoute as useRoute$1, useRouter as useRouter$1 } from 'vue-router';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderSlot, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrGetDirectiveProps } from 'vue/server-renderer';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { getActiveHead, useHead as useHead$1 } from 'unhead';
import { defineHeadPlugin, composableNames, unpackMeta } from '@unhead/shared';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import duration from 'dayjs/plugin/duration.js';
import isToday from 'dayjs/plugin/isToday.js';
import { object, string, boolean } from 'yup';
import { useField, useForm } from 'vee-validate';
import { isNonNullish } from 'remeda';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'node:url';

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
const globalKey$1 = "__unctx__";
const defaultNamespace = _globalThis[globalKey$1] || (_globalThis[globalKey$1] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

const appLayoutTransition = false;
const appPageTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink", "prefetch": true, "prefetchOn": { "visibility": true } };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const nuxtDefaultErrorValue = null;
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.13.0";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name2 = "$" + name;
    defineGetter$1(nuxtApp, $name2, value);
    defineGetter$1(nuxtApp.vueApp.config.globalProperties, $name2, value);
  };
  defineGetter$1(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter$1(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
      nuxtApp.ssrContext._payloadReducers = {};
      nuxtApp.payload.path = nuxtApp.ssrContext.url;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin) {
  if (plugin.hooks) {
    nuxtApp.hooks.addHooks(plugin.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin === "function") {
    const { provide: provide8 } = await nuxtApp.runWithContext(() => plugin(nuxtApp)) || {};
    if (provide8 && typeof provide8 === "object") {
      for (const key in provide8) {
        nuxtApp.provide(key, provide8[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin) {
    var _a3;
    var _a2;
    const unresolvedPluginsForThisPlugin = (_a3 = (_a2 = plugin.dependsOn) == null ? void 0 : _a2.filter((name) => plugins.some((p) => p._name === name) && !resolvedPlugins.includes(name))) != null ? _a3 : [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin).then(async () => {
        if (plugin._name) {
          resolvedPlugins.push(plugin._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin._name)) {
              dependsOn.delete(plugin._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin of plugins) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin);
  }
  for (const plugin of plugins) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin) {
  if (typeof plugin === "function") {
    return plugin;
  }
  const _name = plugin._name || plugin.name;
  delete plugin.name;
  return Object.assign(plugin.setup || (() => {
  }), plugin, { [NuxtPluginIndicator]: true, _name });
}
const definePayloadPlugin = defineNuxtPlugin;
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter$1(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object2 = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object2[key] === void 0) {
      object2[key] = value;
    } else if (Array.isArray(object2[key])) {
      object2[key].push(value);
    } else {
      object2[key] = [object2[key], value];
    }
  }
  return object2;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function withHttps(input) {
  return withProtocol(input, "https://");
}
function withProtocol(input, protocol) {
  let match = input.match(PROTOCOL_REGEX);
  if (!match) {
    match = input.match(/^\/{2,}/);
  }
  if (!match) {
    return protocol + input;
  }
  return protocol + input.slice(match[0].length);
}
function isEqual(a, b, options = {}) {
  if (!options.trailingSlash) {
    a = withTrailingSlash(a);
    b = withTrailingSlash(b);
  }
  if (!options.leadingSlash) {
    a = withLeadingSlash(a);
    b = withLeadingSlash(b);
  }
  if (!options.encoding) {
    a = decode(a);
    b = decode(b);
  }
  return a === b;
}
const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false)
      ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const clearError = async (options = {}) => {
  const nuxtApp = useNuxtApp();
  const error = useError();
  nuxtApp.callHook("app:error:cleared", options);
  if (options.redirect) {
    await useRouter().replace(options.redirect);
  }
  error.value = nuxtDefaultErrorValue;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root5 = resolveUnref(ref2);
  if (!ref2 || !root5)
    return root5;
  if (Array.isArray(root5))
    return root5.map((r) => resolveUnrefHeadInput(r));
  if (typeof root5 === "object") {
    const resolved = {};
    for (const k in root5) {
      if (!Object.prototype.hasOwnProperty.call(root5, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root5[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root5[k]);
    }
    return resolved;
  }
  return root5;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry of ctx.entries)
        entry.resolvedInput = resolveUnrefHeadInput(entry.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler3) {
  _global[globalKey] = handler3;
}
function injectHead() {
  if (globalKey in _global) {
    return _global[globalKey]();
  }
  const head = inject(headSymbol);
  if (!head && false)
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  getCurrentInstance();
  return entry;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
function useSeoMeta(input, options) {
  const { title, titleTemplate, ...meta } = input;
  return useHead({
    title,
    titleTemplate,
    // @ts-expect-error runtime type
    _flatMeta: meta
  }, {
    ...options,
    transform(t) {
      const meta2 = unpackMeta({ ...t._flatMeta });
      delete t._flatMeta;
      return {
        // @ts-expect-error runtime type
        ...t,
        meta: meta2
      };
    }
  });
}
function useServerHead(input, options = {}) {
  const head = options.head || injectHead();
  delete options.head;
  if (head)
    return head.push(input, { ...options, mode: "server" });
}
function useServerSeoMeta(input, options) {
  return useSeoMeta(input, { ...options, mode: "server" });
}
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler3 = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = asyncDataDefaults.errorValue;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve2, reject) => {
        try {
          resolve2(handler3(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function useLazyAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [key, handler3, options = {}] = args;
  return useAsyncData(key, handler3, { ...options, lazy: true }, null);
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2, _b;
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  (_a2 = opts.filter) != null ? _a2 : opts.filter = (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : (_b = cookies[name]) != null ? _b : (_a = opts.default) == null ? void 0 : _a.call(opts));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual$1(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse$1(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
async function preloadRouteComponents(to, router = useRouter()) {
  {
    return;
  }
}
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  var _a;
  const source = (_a = route == null ? void 0 : route.meta.key) != null ? _a : route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a2;
    return ((_a2 = route.params[r.slice(1)]) == null ? void 0 : _a2.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index3) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index3]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0$2 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted4 = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted4.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const ATTR_KEY = "data-n-ids";
const SEPARATOR = "-";
function useId(key) {
  var _a;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [useId] key must be a string.");
  }
  key = `n${key.slice(1)}`;
  const nuxtApp = useNuxtApp();
  const instance = getCurrentInstance();
  if (!instance) {
    throw new TypeError("[nuxt] `useId` must be called within a component setup function.");
  }
  nuxtApp._genId || (nuxtApp._genId = 0);
  instance._nuxtIdIndex || (instance._nuxtIdIndex = {});
  (_a = instance._nuxtIdIndex)[key] || (_a[key] = 0);
  const instanceIndex = key + SEPARATOR + instance._nuxtIdIndex[key]++;
  {
    const ids = JSON.parse(instance.attrs[ATTR_KEY] || "{}");
    ids[instanceIndex] = key + SEPARATOR + nuxtApp._genId++;
    instance.attrs[ATTR_KEY] = JSON.stringify(ids);
    return ids[instanceIndex];
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve2) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve2(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    var _a, _b, _c;
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink == null ? void 0 : useBuiltinLink({ ...props, to });
    const href = computed(() => {
      var _a3;
      var _a2;
      if (!to.value || isAbsoluteUrl.value) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return resolveTrailingSlashBehavior(
          href2,
          router.resolve
          /* will not be called */
        );
      }
      if (typeof to.value === "object") {
        return (_a3 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _a3 : null;
      }
      return resolveTrailingSlashBehavior(
        joinURL(config.app.baseURL, to.value),
        router.resolve
        /* will not be called */
      );
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: (_a = link == null ? void 0 : link.isActive) != null ? _a : computed(() => to.value === router.currentRoute.value.path),
      isExactActive: (_b = link == null ? void 0 : link.isExactActive) != null ? _b : computed(() => to.value === router.currentRoute.value.path),
      route: (_c = link == null ? void 0 : link.route) != null ? _c : computed(() => router.resolve(to.value)),
      async navigate() {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate: navigate2, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      function shouldPrefetch(mode) {
        var _a2, _b2;
        var _a, _b;
        return !prefetched.value && (typeof props.prefetchOn === "string" ? props.prefetchOn === mode : (_a2 = (_a = props.prefetchOn) == null ? void 0 : _a[mode]) != null ? _a2 : (_b = options.prefetchOn) == null ? void 0 : _b[mode]) && ((_b2 = props.prefetch) != null ? _b2 : options.prefetch) !== false && props.noPrefetch !== true && props.target !== "_blank" && !isSlowConnection();
      }
      async function prefetch(nuxtApp = useNuxtApp()) {
        if (prefetched.value) {
          return;
        }
        prefetched.value = true;
        const path = typeof to.value === "string" ? to.value : isExternal.value ? resolveRouteObject(to.value) : router.resolve(to.value).fullPath;
        await Promise.all([
          nuxtApp.hooks.callHook("link:prefetch", path).catch(() => {
          }),
          !isExternal.value && !hasTarget.value && preloadRouteComponents(to.value, router).catch(() => {
          })
        ]);
      }
      return () => {
        var _a;
        if (!isExternal.value && !hasTarget.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom,
            onPointerenter: shouldPrefetch("interaction") ? prefetch.bind(null, void 0) : void 0,
            onFocus: shouldPrefetch("interaction") ? prefetch.bind(null, void 0) : void 0
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate: navigate2,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href: href.value || null, rel, target }, (_a = slots.default) == null ? void 0 : _a.call(slots));
      };
    }
  });
}
const __nuxt_component_0$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
function isSlowConnection() {
  {
    return;
  }
}
const __nuxt_page_meta$1 = {
  layout: "default"
};
const __nuxt_page_meta = {
  layout: "default"
};
const isVue2 = false;
/*!
 * pinia v2.2.4
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject$1(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$2 } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && true) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign$2(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$2({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && true) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$2($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop$1
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$2({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign$2(store, setupStore);
    assign$2(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign$2($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign$2(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function storeToRefs(store) {
  {
    store = toRaw(store);
    const refs = {};
    for (const key in store) {
      const value = store[key];
      if (isRef(value) || isReactive(value)) {
        refs[key] = // ---
        toRef(store, key);
      }
    }
    return refs;
  }
}
/*!
  * shared v9.14.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = false;
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign = Object.assign;
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => {
  if (!isObject$1(val))
    return false;
  const proto = Object.getPrototypeOf(val);
  return proto === null || proto.constructor === Object;
};
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
  return items.reduce((str, item, index3) => index3 === 0 ? str + item : str + separator + item, "");
}
function incrementer(code2) {
  let current = code2;
  return () => ++current;
}
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const isNotObjectOrIsArray = (val) => !isObject$1(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (isObject$1(src2[key]) && !isObject$1(des2[key])) {
        des2[key] = Array.isArray(src2[key]) ? [] : {};
      }
      if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
function isHTTPS(req, trustProxy = true) {
  const _xForwardedProto = trustProxy && req.headers ? req.headers["x-forwarded-proto"] : void 0;
  const protoCheck = typeof _xForwardedProto === "string" ? _xForwardedProto.includes("https") : void 0;
  if (protoCheck) {
    return true;
  }
  const _encrypted = req.connection ? req.connection.encrypted : void 0;
  const encryptedCheck = _encrypted !== void 0 ? _encrypted === true : void 0;
  if (encryptedCheck) {
    return true;
  }
  if (protoCheck === void 0 && encryptedCheck === void 0) {
    return void 0;
  }
  return false;
}
const resource$1 = {
  "common": {
    "locale": {
      "en": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "English" } },
      "ru": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Russian" } },
      "ch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Chinese" } },
      "jp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Japanese" } },
      "kr": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Korean" } }
    },
    "selectCurrency": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Select Currency" } },
    "copyright": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\xA9 2020-" }, { "t": 4, "k": "currentYear" }, { "t": 3, "v": ". DappExpert. All rights reserved." }] } },
    "disclaimer": {
      "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Important disclaimer" } },
      "content": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The information presented on the Dapp.Expert portal is intended solely for informational purposes and does not constitute an investment recommendation or a guide to action in the field of cryptocurrencies. The Dapp.Expert team is not responsible for any potential losses or missed profits associated with the use of materials published on the site. Before making investment decisions in cryptocurrencies, we recommend consulting a qualified financial advisor." } }
    },
    "content": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Content" } },
    "or": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "or" } },
    "by": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "by" } },
    "all": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All" } },
    "none": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "None" } },
    "search": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Search" } },
    "share": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Share" } },
    "google": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Google" } },
    "wallet": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Wallet" } },
    "enter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Enter" } },
    "repeat": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Repeat" } },
    "new": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New" } },
    "hiX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hi, " }, { "t": 4, "k": "name" }] } },
    "changes": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Changes" } },
    "submitDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contribute" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Submit dapps, articles or news." } },
      "buttons": {
        "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.add" } }, { "t": 3, "v": " DAPP" }] } },
        "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.add" } }, { "t": 3, "v": " Article" }] } },
        "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.add" } }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 7, "v": "news.title" }, "m": { "t": 8, "v": "capitalize" } }] } }
      }
    },
    "latest": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Latest" } },
    "recommended": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recommended" } },
    "recommendation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recommendation" } },
    "globalStats": {
      "dapps": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapps" } },
      "blockchains": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Blockchains" } },
      "activeUsers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Active users" } },
      "volume30d": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "30d volume" } },
      "transactions30d": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "30d transactions" } }
    },
    "avatar": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "avatar" } },
    "allBlockchains": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All Blockchains" } },
    "time": {
      "h": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "h" } },
      "d": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "d" } },
      "m": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "m" } },
      "y": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "y" } }
    },
    "metrics": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Metrics" } },
    "exchange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Exchange" } },
    "available": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "Available" }, { "t": 2, "i": [{ "t": 3 }], "s": "Not available" }] } },
    "coin": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Coin" } },
    "more": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "More" } },
    "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Language" } },
    "officialLinks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Official links" } },
    "socialMedia": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Social media" } },
    "tags": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tags" } },
    "copied": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Copied" } },
    "rating": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rating" } },
    "about": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "About" } },
    "overview": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Overview" } },
    "markets": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Markets" } },
    "currentPageReportTemplate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Showing " }, { "t": 4, "k": "first" }, { "t": 3, "v": " - " }, { "t": 4, "k": "last" }, { "t": 3, "v": " out of " }, { "t": 4, "k": "total" }, { "t": 3, "v": " entries" }] } },
    "showRows": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": " Show rows" } },
    "updated": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Updated" } },
    "expiryDate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Expiry date" } },
    "loadingX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Loading " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
    "data": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Data" } },
    "screenshots": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Screenshots" } },
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Home" } },
    "image": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Image" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact" } },
    "leaveDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Are you sure you want to leave this page?" } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All the data you've entered will be lost." } },
      "submitText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Yes, leave" } },
      "cancelText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cancel" } }
    },
    "joined": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Joined" } },
    "customerService": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Customer service" } },
    "buttons": {
      "logIn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Log in" } },
      "signUp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Sign up" } },
      "showLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Show less" } },
      "readMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Read more" } },
      "subscribe": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Subscribe" } },
      "viewMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "View more" } },
      "viewAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "View all" } },
      "forgotPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Forgot " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }] } },
      "sendInstructions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Send instructions" } },
      "back": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Back" } },
      "backToX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Back to " }, { "t": 6, "k": { "t": 4, "k": "field" } }] } },
      "createAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Create an account" } },
      "resendX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Resend " }, { "t": 6, "k": { "t": 4, "k": "field" } }] } },
      "next": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Next" } },
      "bindNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Bind Now" } },
      "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Submit" } },
      "add": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add" } },
      "gotIt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Got it" } },
      "upload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Upload" } },
      "save": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Save" } },
      "saveAndProceed": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.save" } }, { "t": 3, "v": " and proceed" }] } },
      "goBack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Go back" } },
      "loadMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Load more" } },
      "editX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Edit " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
      "applyX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Apply " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "capitalize" } }] } },
      "customize": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Customize" } },
      "addMetric": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add metric" } },
      "resetToDefault": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Reset to default" } },
      "cancel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cancel" } },
      "showAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Show all" } },
      "copy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Copy" } },
      "copyLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.copy" } }, { "t": 3, "v": " link" }] } },
      "showFullWidth": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Show full width" } },
      "send": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Send" } },
      "edit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Edit" } },
      "delete": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delete" } },
      "changeImage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Change " }, { "t": 6, "k": { "t": 7, "v": "common.image" }, "m": { "t": 8, "v": "lower" } }] } },
      "report": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Report" } },
      "shareOnX": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.share" } }, { "t": 3, "v": " on " }, { "t": 4, "k": "platform" }] } },
      "setAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Set address" } },
      "setEmailAndPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Set " }, { "t": 6, "k": { "t": 7, "v": "form.email" } }, { "t": 3, "v": " & " }, { "t": 6, "k": { "t": 7, "v": "form.password" } }] } }
    },
    "site": {
      "metadata": {
        "homepage": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Blockchain Applications (DApps) News and Analytics" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Complete List of Top Blockchain Applications" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert - up-to-date data on dapps on Ethereum, Tron, Ton, BSC, SOL, Cosmos, Sui blockchains. Get analytics on DeFi, NFT, blockchain games and other dapps" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "dapps, DeFi, NFT, DEX, decentralized applications, dapp on Ethereum blockchain, dapp on BSC blockchain, blockhain games,cryptocurrencies, cryptocurrency news, dapps news, ethereum, tron, bsc, solana, toncoin, sui, sei, coscmos atom." } }
        },
        "news": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Latest Cryptocurrency and Decentralized Application News" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Latest news on cryptocurrencies and decentralized applications" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Get the latest cryptocurrency and DApps news: trends, analytics, market reviews and blockchain industry updates." } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421rypto news, DeFi, DEX, CEX, Cryptocurrency, NFT, GameFi, Play to earn, Move to earn, dapp news" } }
        },
        "analytics": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Analytical articles on cryptocurrencies and DApps" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Analytical articles on cryptocurrencies and dapps" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "analytical articles on cryptocurrencies, DeFi, DEX, CEX, Cryptocurrency, NFT, GameFi, Play to earn, Move to earn, BTC, ETH, Dapp, analytical articles on dapps" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "analytical articles on cryptocurrencies, DeFi, DEX, CEX, Cryptocurrency, NFT, GameFi, Play to earn, Move to earn, BTC, ETH, Dapp, analytical articles on dapps" } }
        },
        "analyticsAll": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Analytical materials on cryptocurrencies and DApps" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Analytical publications on DApps and cryptocurrencies" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Latest analytics and educational materials on cryptocurrencies, DApps, blockchains, exchanges and NFT games. Learn everything about the world of digital assets." } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "analytical articles on cryptocurrencies, DeFi, DEX, CEX, Cryptocurrency, NFT, GameFi, Play to earn, Move to earn, BTC, ETH, Dapp, analytical articles on dapps" } }
        },
        "termsConditions": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp Expert Terms and Conditions" } },
          "title": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "Terms of Use of the dapps resource" }, { "t": 2, "i": [{ "t": 3 }], "s": "DAPP.EXPERT" }] } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Terms of Use for the Decentralized Application Project - Dapp.Expert" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "dapp, NFT, DeFi, decentralized applications, decentralized finance, blockchain games" } }
        },
        "privatePrivacy": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.Expert Privacy Policy" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Privacy Policy of the dapps site - DAPP.EXPERT" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Privacy policy page of the decentralized application project dapp.expert" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "privacy, policy, dapp, NFT, DeFi, decentralized applications, decentralized finance, blockchain games" } }
        },
        "ranking": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ranking of the best cryptocurrencies and dapps" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Top ranking dapps and cryptocurrencies. List of DEX and Cex exchanges" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Top ranking dapps and cryptocurrencies. List of centralized and decentralized cryptocurrency exchanges with the most important metrics." } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cryptocurrency rankings, DApps rankings, crypto exchange rankings, DEX rankings, blockchain game rankings, DeFi application rankings" } }
        }
      }
    },
    "noDataAvailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "No data available." } },
    "shortLocale": {
      "en": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En" } },
      "ru": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ru" } }
    }
  },
  "auth": {
    "forgotPasswordDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Forgot your password?" } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Enter your email below, you will receive an email with instructions on how to reset your password in a few minutes. You can also set a new password if you\u2019ve never set one before." } }
    },
    "emailReceivedDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You\u2019ve got mail :)" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Instructions have been sent to " }, { "t": 4, "k": "email" }, { "t": 3, "v": "." }] } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "If you don\u2019t see it Inbox, try the Junk Mail/Spam folder. Otherwise, make sure you entered the same e-mail address you used to sign in." } },
      "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "To Log In, you need to update your password." } }
    },
    "changePassword": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Change your password" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "For added security, your new password should have min. 8 characters that contain letters, numbers and symbols." } },
      "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Save new " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }] } }
    },
    "passwordSavedDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your new password has been saved" } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Try log in with your new password now." } }
    },
    "emailVerificationDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Verify " }, { "t": 6, "k": { "t": 7, "v": "form.yourEmail" }, "m": { "t": 8, "v": "capitalizeAllLetters" } }] } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "We\u2019ve sent an email to " }, { "t": 4, "k": "email" }, { "t": 3, "v": " with a link to verify your email. You may click the button in the email or enter the verification code below." }] } },
      "resendEmailCounterText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Resend your email if it doesn't arrive in" } }
    },
    "wallet": {
      "walletAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Wallet address" } },
      "loginWithWalletAddr": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Log in with your preferred " }, { "t": 6, "k": { "t": 7, "v": "auth.wallet.walletAddress" }, "m": { "t": 8, "v": "lower" } }] } },
      "trustWallet": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "TrustWallet" } },
      "metaMask": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "MetaMask" } },
      "walletConnect": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "WalletConnect" } },
      "connectWallet": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Connect Wallet" } },
        "notification": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please install Wallet to connect" } }
      },
      "bindingDialog": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Do you have an existing account?" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You may bind your wallet to an existing account or create a new account." } },
        "note": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please note, if you create a new account with your wallet, you will no longer be able to bind it yo an existing Email account." } },
        "buttons": {
          "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Yes, I have an existing account" } },
          "cancel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "No, I\u2019d like to create a new account" } }
        }
      },
      "bindingForm": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Bind to existing account" } }
      },
      "bindingActiveWalletDialog": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please use an active wallet address" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "To create a valid account with your wallet, please make sure you hold more than $1 worth of crypto assets in your wallet including:" } }
      },
      "boundSuccessfullyDialog": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Bound successfully!" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You\u2019ve bound your wallet " }, { "t": 4, "k": "walletId" }, { "t": 3, "v": " to the existing Email account " }, { "t": 4, "k": "email" }, { "t": 3, "v": ". You can now use either way to log in." }] } }
      },
      "signMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello, welcome to Dapp Expert. \\nPlease sign this message to verify your wallet. \\nThis action will not cost you any transaction fee. \\n \\nAddress: " }, { "t": 4, "k": "address" }, { "t": 3, "v": " \\n \\nNonce: " }, { "t": 4, "k": "nonce" }] } },
      "disconnect": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Disconnect" } }
    },
    "emailAlreadyRegisteredDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The user with this email is already registered." } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Try logging in using this email. If you forgot your password, you can always recover it by clicking on \u201CForgot Password\u201D." } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Try to log in" } }
    },
    "updatePassword": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please update your password." } }
    }
  },
  "menu": {
    "header": {
      "ranking": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ranking" } },
      "news": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "News" } },
      "articles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Articles" } },
      "defight": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Defight" } }
    },
    "footer": {
      "items": {
        "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.submit" } }] } },
        "contactUs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact Us" } },
        "deFight": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DeFight" } }
      }
    },
    "user": {
      "profileSettings": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Profile settings" } },
      "accountSecurity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Account security" } },
      "notifications": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Notifications" } },
      "contribute": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contribute" } },
      "logOut": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Log out" } }
    }
  },
  "search": {
    "placeholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Search coin, pair or exchange" } },
    "trending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Trending" } },
    "recentSearches": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recent searches" } },
    "noResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "No results for \u2018" }, { "t": 4, "k": "search" }, { "t": 3, "v": "\u2019" }] } },
    "emptyHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "We couldn\u2019t find anything matching your search.\\n Try again with a different term." } },
    "seeAllResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "See all results" } }
  },
  "user": {
    "settings": {
      "profile": {
        "form": {
          "aboutMe": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "About me" } },
          "usernameHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This username is unique. Only the administrator can change username." } },
          "bioHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "A brief introduction about yourself" } },
          "successUpdateMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your personal information has been updated" } }
        },
        "completeProfile": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Complete your profile" } },
          "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Set your avatar and nickname to let others know you better!" } },
          "hint": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "JPEG or PNG format only" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The maximum file size is 5 MB" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The size of the uploaded image should be at least 100*100 pixels" } }
          },
          "presetAvatar": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Preset Avatar" } }
        },
        "customizeYourAvatar": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Customize your avatar" } },
          "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Let\u2019s face it, we\u2019re all good lookin\u2019 people so upload your\nbest profile photo :)" } }
        },
        "accountInfo": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Account information" } },
          "emailChangeHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "If you need to change your e-mail address, please contact " }, { "t": 4, "k": "link" }, { "t": 3, "v": "." }] } }
        }
      },
      "account": {
        "verifyEmailStep": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Step " }, { "t": 4, "k": "step" }, { "t": 3, "v": " - Verify Your " }, { "t": 6, "k": { "t": 7, "v": "form.email" } }] } },
          "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "A 6-digit code has been sent to " }, { "t": 4, "k": "email" }, { "t": 3, "v": ". You may click the button in the e-mail or enter the code manually below." }] } },
          "successStep": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Step " }, { "t": 4, "k": "step" }, { "t": 3, "v": " - Verified successfully" }] } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You have verified your email and you can continue now." } }
          }
        },
        "setEmailAndPasswordDialog": {
          "step1": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Step 1/3 - Enter your " }, { "t": 6, "k": { "t": 7, "v": "form.emailAddress" }, "m": { "t": 8, "v": "lower" } }] } },
            "emailPlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Enter a permanent " }, { "t": 6, "k": { "t": 7, "v": "form.emailAddress" }, "m": { "t": 8, "v": "lower" } }] } },
            "submitBtn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Send verification " }, { "t": 6, "k": { "t": 7, "v": "form.email" } }] } }
          },
          "step3": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Step 3/3 - Set Your " }, { "t": 6, "k": { "t": 7, "v": "form.password" } }] } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "For added security, your new password should have min. 8 characters that contain letters, numbers and symbols." } }
          },
          "success": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You have added an " }, { "t": 6, "k": { "t": 7, "v": "form.email" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " and " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " !" }] } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You have successfully added an " }, { "t": 6, "k": { "t": 7, "v": "form.email" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " and " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " to your account. Now you can log in using your " }, { "t": 6, "k": { "t": 7, "v": "form.email" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " and " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }] } }
          }
        },
        "disconnectWalletDialog": {
          "step2": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Step 2/2 - Verify Your Wallet" } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "We will send a verification request to your wallet " }, { "t": 4, "k": "walletAddress" }, { "t": 3, "v": ". Please authorize in your wallet app to disconnect. This will not cost network fees." }] } },
            "submitBtn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Disconnect Wallet" } }
          }
        }
      },
      "security": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Security settings" } },
        "emailAddressVerification": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email address verification (2FA)" } },
          "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Set your email address to enable two-factor authentication." } }
        },
        "password": {
          "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Set a unique " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " for better protection." }] } },
          "submitBtn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Change " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }] } },
          "changePasswordDialog": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "user.settings.security.password.submitBtn" } }] } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You will receive instructions via e-mail on how to change your password. Create a new password if this is your first time doing so." } }
          }
        }
      },
      "notifications": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Notification settings" } },
        "global": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Global" } },
          "updates": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Updates & Promotions" } },
            "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Receive important Dappexpert promotions and updates." } }
          }
        }
      },
      "functionCannotBedisabled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This function cannot be disabled." } }
    },
    "contribute": {
      "form": {
        "newEntityTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.new" } }, { "t": 3, "v": " " }, { "t": 4, "k": "entity" }] } },
        "entityContent": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "entity" }, { "t": 3, "v": " content" }] } },
        "coverImage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Cover " }, { "t": 6, "k": { "t": 7, "v": "common.image" } }] } },
        "mainPostImage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Main post " }, { "t": 6, "k": { "t": 7, "v": "common.image" }, "m": { "t": 8, "v": "lower" } }] } },
        "coverImageHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "JPEG or PNG format only. The maximum file size is 5 MB." } },
        "coverImageDescLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "form.imageDescription" } }, { "t": 3, "v": " (SEO)" }] } },
        "entityLanguage": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "entity" }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 7, "v": "common.language" }, "m": { "t": 8, "v": "lower" } }] } },
        "entityLanguageHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "The " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " must be created in one of the languages supported by our platform. If your content doesn't match the languages supported by our platform, it will not be published. Please choose a language." }] } },
        "entityOtherInfo": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Other information" } },
          "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This information will help promote your Article and increase its popularity and views." } }
        },
        "entityStatus": {
          "new": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New" } },
          "published": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Published" } },
          "updated": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Updated" } },
          "rejected": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rejected" } }
        }
      },
      "emptyMessage": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You haven't submitted any " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " yet." }] } },
        "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "All your submitted " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " will be displayed here." }] } },
        "hint2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You can submit your " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " on our platform to increase its popularity." }] } }
      }
    },
    "activity": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Activity" } },
      "emptyMessage": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The user has not been active yet." } },
        "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Here will be displayed user activity such as likes, comments, and more." } }
      },
      "message": {
        "like": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "liked the " }, { "t": 4, "k": "entity" }] } }
      }
    }
  },
  "editor": {
    "openingLogic": {
      "openInSameTab": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Open in same tab" } },
      "openInNewTab": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Open in new tab" } },
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Opening logic" } }
    },
    "linkDialog": {
      "linkUrl": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Link URL" } },
      "modalTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Insert link" } }
    },
    "headings": {
      "h6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Heading 6" } },
      "h5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Heading 5" } },
      "h4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Heading 4" } },
      "h3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Heading 3" } },
      "h2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Heading 2" } },
      "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Heading 1" } },
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Headings" } }
    }
  },
  "terms": {
    "cookie": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "We use cookies. By using our site you agree to our " }, { "t": 4, "k": "link" }] } },
    "affiliateDisclosure": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Affiliate Disclosure" } },
    "affiliateLinksDisclaimer": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Disclaimer: This page may contain affiliate links. Dapp.expert may be compensated if you visit any affiliate links and you take certain actions such as signing up and transacting with these affiliate platforms. Please refer to " }, { "t": 4, "k": "link" }, { "t": 3, "v": "." }] } },
    "privacy": {
      "content": {
        "0": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.1 This Privacy Policy sets out the conditions for the processing of the user's personal data while using the site. By submitting personal data, you also give DappExpert consent to the collection, storage, use and disclosure of your personal data in accordance with the terms of this Privacy Policy." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.2 DappExpert respects your privacy and is committed to protecting it by adhering to this Privacy Policy. This policy describes:" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.2.1 the types of information we may collect from you when you access or use our website and other online services;" } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.2.2 our methods of collecting, using, storing, protecting and disclosing this information." } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.3 This policy only applies to information that we collect through our Services and in electronic communications, sent through or in connection with our Services." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1. GENERAL INFORMATION" } }
        },
        "1": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "If you are not a user of the Site from the United States, by visiting the Site and providing us with data, you acknowledge and agree that your Personal Data may be processed for the purposes, specified in the Privacy Policy. In addition, your Personal Data may be processed in the country where it was collected and in other countries, including the United States, where the laws, regarding the processing of Personal Data, may be less strict than the laws of your country. By providing your data, you consent to such transfer." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "2. NOTE TO USERS OUTSIDE THE UNITED STATES" } }
        },
        "2": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "We do not intentionally collect Personal Data from visitors under the age of 13. If a child under the age of 13 transfers Personal Data to the Company and we find out that the Personal Data is information from a child under the age of 13, we will try to delete that information as soon as possible. If you think we may have any Personal Information from a child under the age of 13, please contact us by email " }, { "t": 4, "k": "email" }, { "t": 3, "v": "." }] } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "3. NOTE ABOUT CHILDREN" } }
        },
        "3": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.1 DappExpert may collect and use information about its Users. We only collect the data that is necessary for our business and allows us to improve the user experience." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.2 Personally identifiable information may include data that the User enters voluntarily, uses or provides, using the Services of the DappExpert website. DappExpert also collects and uses information for the purposes, set out in this Privacy Policy, offering new Services to the User or introducing him to new features on the Site." } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.3 We may also use certain performance tracking tools such as Google Analytics. Using Google Analytics, we collect information about your decisions and preferences whie using our online platform." } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.4. We collect two types of information from and about our users, including information:" } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.4.1 Information that you provide to us and we can identify you;" } },
            "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.4.2 Log files. Like most websites, we automatically collect certain information and store it in log files. This information includes IP addresses, browser type, Internet Service Provider (\u201CISP\u201D), referring/exit pages, operating system, date/time stamp and clickstream data. We use this information to administer the Site, analyze trends, track user activity on the Site, collect demographic information about our user base as a whole and better tailor our Services to the needs of our users. Suv" } },
            "6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": `4.4.3 Cookies. Like so many online services, we use cookies to gather information. \\"Cookies\\" are small pieces of information that the website sends to your computer's hard drive when you browse a website. We can use both session Cookies (which expire as you close your web browser) and persistent Cookies (which remain on your computer until you remove them) to give you more interactive and personal experience with our website. We coolecct this kind of information to make the Site more valuable to you and to adapt your engagement with us in accordance with your specific interests and requirements.` } },
            "7": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5 Information we collect on or through our Services may include:" } },
            "8": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.1 Contact information: Name, surname, login, dappexpert password, email address, mobile number and other means of communication.We collect this information to provide you with access to certain features of our Services and to inform you of relevant information, regarding your use of our Services." } },
            "9": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.2 Preferences: your preferences and settings such as time zone and language; We collect this information to improve your user experience." } },
            "10": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.3 Searches and other activities: the searches you have made and the results you have selected; We collect this information to improve your user experience and provide you with more relevant content and Services." } },
            "11": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.4 Browsing information: how long have you been using our Services, what features have you used, etc.; We collect this information to analyze the preferences of our users and to improve our Services." } },
            "12": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.5 If you leave us a review or contact us by email, we will collect your name and email address, as well as any other content, included in the email, in order to provide you with a response." } },
            "13": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.6 Location data: we may collect information about your location if you have instructed your mobile device or computer to send such information through the privacy settings on that mobile device or computer. We may use the collected location data to improve your use of the Services by serving you relevant content and contextual advertising." } },
            "14": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.7 Transaction information: if you make payments or purchases through our Services, we may collect and store information about you to process your requests and fill out forms for future possible transactions automatically;" } },
            "15": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.8. Information, received from you, about others. Information, received from the third party companies. We may receive Personal and/or Anonymous Data about you from companies that provide our Services through a joint or private website, or from companies that offer their products and/or services on our Site." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4. WHAT INFORMATION WE COLLECT FROM OUR USERS" } }
        },
        "4": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.1 Like other websites, we collect information to improve your visit to us and provide more personalized content. We respect your privacy and do not give your information to anyone, except for cases when it is necessary." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.2 DappExpert undertakes to store the User's Personal Data for the period, specified in this Privacy Policy, but no longer as required under the applicable laws and regulations in accordance with this Privacy Policy in order to achieve the purposes of Data processing. We will retain the information we collect from you for a maximum of 5/five/years or less if it is no longer needed to provide you with the DappExpert Services. After this period, we undertake to remove any information that we receive from you. We use your Personal Data as follows:" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.3 Aggregate information and information that does not personally identify you may be used in different ways. For example, DappExpert may combine information about your usage patterns on the Website with equivalent information, received from other users, to help to enhance your experience with our site and Services (for example, to find out which pages are visited most often or which features users find most addictive). We reserve our right to use anonymous data for any goal and disclose anonymous data to third parties without restriction." } },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "to create and protect your Account on our network;" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "identify you as a system user;" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "give you an improved administration of our Site and Services;" } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "improve the quality of interaction with our website and services;" } },
              "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "send you a welcome letter to establish ownership of the email address, specified while creating your account;" } },
              "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "secure you and other users from any behavior that contravene the Terms of Use or prevent misuse or persecution of any user;" } },
              "6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "send you administrative email alert such as support or security and service recommendations;" } },
              "7": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "respond to your requests by email or other communication channels;" } },
              "8": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "send email newsletters, offers, surveys, and other advertising materials, connected to our Services and for other Company\u2019s marketing goals. We can use your Personal Data to be in touch with you about our products and services, as well as products and services of third parties that may interest you." } }
            }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5. HOW WE USE PERSONAL DATA" } }
        },
        "5": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DappExpert will not share information about you with third parties for the purpose of providing or facilitating third party advertising. We disclose your Personal Information as it will be described below and as it described anywhere in our Privacy Policy. Third-party Service Providers." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "We may give your Personal Data to the third-party service providers in order to: give you the Services that we offer you on our Site; do quality assurance testing; ease the account creation; give a technical support; and/or provide other services to the Company. Corporate restructuring." } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "We may share your Personal Data in connection with or during talks in any divestments, funding, acquisition or dissolution, or procedural action, involving the sale, transfer, disposal or disclosure of all or part of our assets or business. In the case of bankruptcy or insolvency, Personal Data can also be referred to the business asset." } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "If another company buys our company, assets or business, that company will own the Personal Data we collect and will undertake the rights and responsibilities in relation to your Personal Data, described in our Privacy Policy. In accordance with legal requirements." } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Whether the choices you make about your Personal Data (as it has been described below). For instance, pursuant to a subpoena or other legal process. Also, when we believe in good faith that it will help to prevent an imminent harm to anybody. Other information." } },
            "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "To add, we can disclose your Personal Data to achieve the purpose for which you provide it; for any other goals, exposed by us while providing it; or with your permission (consent)." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "6. DISCLOSURE OF DATA" } }
        },
        "6": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1 The User on the Site has the next rights:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1.1 be aware of what exactly and for what purpose is processed from his Personal Data;" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1.2 request the correction or deletion of Personal Data;" } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1.3 demand DappExpert to limit the processing of the User's Personal Data for one of the legit reasons;" } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.2 Any queries and orders, regarding the processing of the User's data, the User must send in writing to DappExpert, using the contact info, specified in this Privacy Policy (email). Next to the query, the User must provide his / her identification document, or identify himself, using acceptable electronic means, in case if a written query is submitted in the presence of the User, when it is possible to identify him." } },
            "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.3 The User has the right to request the deletion of all User Data, stored in DappExpert." } },
            "6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4 When the User requires to delete his Data, DappExpert pledges to, without unreasonable delay, to remove all Personal Data if one of the next grounds reasons" } },
            "7": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.1 Personal data is no longer needed in connection with the goals for which it was collected or processed in another way;" } },
            "8": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.2 The user revokes the consent on which the processing runs and in the absence of other legal basis for the processing;" } },
            "9": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.3 The User opposes to the processing of his Data and DappExpert does not define the overriding legal basis for further processing;" } },
            "10": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.4 Personal data has been processed illegally;" } },
            "11": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.5 The User has the right to demand that DappExpert restrict the processing of User Data in one of the next cases:" } },
            "12": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.5.1 The User disputes the accuracy of the Personal Data for the duration that allows DappExpert to check the accuracy of the Personal Data;" } },
            "13": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.5.2 the processing of the Data is illegal and the User objects to the deletion of the Data and requires the restriction of their use;" } },
            "14": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.6 The data is processed with the consent of the user or for the establishment, execution or defense of legal claims or for the defence of the rights of another natural or legal person or for reasons of essential public curiosity." } },
            "15": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.7 After receiving the request, DappExpert must respond and follow the steps, specified in the request or refuse to perform, indicating the reasons for the denial, no later than 30 (thirty) days from the receipt date. If it is necessary, the specified period can be prolonged for another 2 (two) months, depending on the challenge and number of queries. In that case, within 30 (thirty) days from the query date of the application, DappExpert tells the User about any such prolongation, together with the delaying reason." } },
            "16": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8 DappExpert may not meet the User's requests in ways, where it is necessary to provide:" } },
            "17": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8.1 fulfillment of the established legal commitments of DappExpert;" } },
            "18": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8.2 crime prevention;" } },
            "19": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8.3 liberties and rights of other Users or third parties." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7. USER RIGHTS" } }
        },
        "7": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Our site may have references to the third party sites. In case when you click on any other website or location links, you go from our Site and appear at another site, and another person may collect Personal or Anonymous Data from you. We do not control, review and are not responsible for these third party websites and their content. Please, remember that the terms of this Privacy Policy do not apply to these third party websites or content, or to any collection of your Personal Data after you click on such an external website. We strongly recommend you to get acquainted with the privacy policy of each website you are going to visit. Links to third-party websites or locations are for your comfort and do not imply that we endorse these third parties/their products, websites or content." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "8. THIRD PARTY WEBSITES" } }
        },
        "8": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9.1 The copyright for our website is owned by DappExpert." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9.2 Texts, animations, graphics, photographs, videos and clips of the Site are subject to copyright and are part of the IP of DappExpert. You must not add, replicate, use or represent them without the express written permission of DappExpert. Any sharing of files, received by Users in accordance with the Terms of Use of the Website, or parts thereof, is a violation of the relevant laws on the protection of intellectual property and is prosecuted." } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9.3 Nothing of this website should be construed as a license grant or trademark right without DappExpert's prior express written consent." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9. COPYRIGHTS" } }
        },
        "9": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This Privacy Policy can be renewed from time to time for whatever reason. We will tell you about any developments to our Privacy Policy, posting the new Privacy Policy page on the site. The last revision date of the Privacy Policy is indicated at the beginning of this Privacy Policy. You have a responsibility that you have an actual, active and valid email address and for periodic visits to our Site and this Privacy Policy to check for any developments." } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "10. DEVELOPMENTS TO THIS PRIVACY POLICY" } }
        }
      },
      "createdAt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Created at: Nov 24, 2021" } },
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Privacy Policy" } }
    },
    "general": {
      "content": {
        "0": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This agreement governs your access and use of the website. Each time the Visitor accesses the Website, it irrevocably agrees to comply with these Terms posted on this Website. The Website is offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, Dapp.expert\u2019s Privacy Policy) and procedures that may be published from time to time on this Site by Dapp.expert (collectively, the Agreement). If the Visitor does not agree to any of the provisions set out in these Terms, it should not use the Website, dapps or any of the services available on the Website. By using and exploring Dapp.expert you guarantee that:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert will strive to ensure accuracy of information listed on the Website, although it will not hold any responsibility for any missing or wrong information about the dapps. Visitors understand and acknowledge that they are using any and all information available on the Website at their own risk. All materials on the Website are for informational purposes only. Neither the Dapp.expert nor any of the persons or entities involved in any way in respect of the Website provide for legal, fiscal, trading, economical and/or any other kind of advice or recommendation that may be relied upon. It means that the information from the Website cannot be used as a basis of investment strategy and nothing in this information can be ensured to contain no errors, mistakes, mispresentations or failures." } },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "your use of the Website will be in strict accordance with the Dapp.expert Privacy Policy, with this Agreement and with all applicable laws and regulations (including without limitation any local laws or regulations in your country, state, city, or other governmental area, regarding online conduct and acceptable content, and including all applicable laws regarding the transmission of technical data exported from the United States or the country in which you reside)" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "your use of the Website will not infringe or misappropriate the intellectual property rights of any third party." } }
            }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GENERAL INFORMATION" } }
        },
        "1": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The Dapp Developer submits an application for listing and/or advertising the dapp on the Website, it has to agree and comply with these Terms. Dapp.expert could without advance notice and at any time:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u201CDapp Developer\u201D means an individual or a company whose dapp is listed on the Website by Dapp.expert or an individual or a company who submitted an application to Dapp.expert for advertising and/or listing the dapp on the Website. We are not responsible for any decisions you make based on something you read on our website. You may find commercial links, coupons, deals, advertisements and other third-party offers on Dapp.expert. Dapp.expert may have affiliate relationships with certain of these third parties. Dapp.expert is not responsible for any transactions you have with these third parties. If you create an account on the Website, you are responsible for maintaining the security of your account and its content, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the Website. You must not describe or assign content to your account in a misleading or unlawful manner, including in a manner intended to trade on the name or reputation of others, and Dapp.expert may change or remove any description or keyword that it considers inappropriate or unlawful, or otherwise likely to cause Dapp.expert liability. You must immediately notify Dapp.expert of any unauthorized uses of your account or any other breaches of security. Dapp.expert will not be liable for any acts or omissions by You, including any damages of any kind incurred as a result of such acts or omissions. Every Dapp Developer warrants to Dapp.expert that:" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert reserves the right to remove any images and information, comments, messages, avatars, etc.) for any reason whatsoever. Dapp.expert is not responsible for any Third-Party Websites or Third-Party Applications. Dapp.expert may terminate your access to all or any part of the Website at any time, with or without cause, with or without notice, effective immediately. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability. Dapp.expert reserves the right to modify or replace any part of this Agreement. It is your responsibility to check this Agreement periodically for changes. Dapp.expert does not claim any ownership rights in the listed dapps, and Dapp Developers acknowledge and agree that they remain solely responsible to damage caused by their dapps." } },
            "list3": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "the dapp and the content thereof that is abusive, libellous, defamatory, pornographic or obscene, that promotes or incites violence, terrorism, illegal acts, or hatred on the grounds of race, ethnicity, cultural identity, religious belief, disability, gender, identity or sexual orientation, or is otherwise objectionable in Dapp.expert\u2019s reasonable discretion;" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "any information or other material about the dapp that violates or infringes the rights of third parties including, without limitation, copyright, trademark rights, rights of privacy or publicity, confidential information or any other right;" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "any content about the dapp that violates, breaches or is contrary to any law, rule or regulation, or is otherwise illegal;" } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "any material about the dapp that contains any virus, Trojan horse, spyware, adware, malware, bot, worm, or other harmful or malicious component, which might impair or disrupt the Website or Visitor\u2019s computer." } },
              "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Every Dapp Developer undertakes not to use the Website to advertise, display, promote, make available or otherwise communicate to the public:" } }
            },
            "list2": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "their dapp, and each and every part thereof, is an original work of the Dapp Developer, or the Dapp Developer has obtained all rights, licenses, consents and permissions necessary in order to use, submit and advertise the dapp and that the dapp does not and will not create any liability on the part of Dapp.expert;" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "the information about the Dapp Developer \u2013 its name, surname (for individual) or company name, company code, business address, e-mail address, wallet address, is complete, accurate and correct" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "the Content is not spam, is not machine- or randomly-generated, and does not contain unethical or unwanted commercial content designed to drive traffic to third party sites or boost the search engine rankings of third party sites, or to further unlawful acts (such as phishing) or mislead recipients as to the source of the material (such as spoofing);" } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "the Content is not obscene, libelous or defamatory, hateful or racially or ethnically objectionable, and does not violate the privacy or publicity rights of any third party;" } },
              "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Every Dapp Developer warrants to Dapp.expert that:" } }
            },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "suspend your access to Dapp.expert," } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "suspend or terminate Your Account," } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "remove any of your content from Dapp.expert. Your use of the Service means you agree to Dapp.expert monitoring and Dapp.expert score." } }
            }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "FOR DEVELOPERS" } }
        },
        "2": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The Website is provided \u201Cas is\u201D. Nor Dapp.expert nor its suppliers and licensors, makes any warranty that the Website will be error free or that access thereto will be continuous or uninterrupted. You understand that you download from, or otherwise obtain content or services through, the Website at your own discretion and risk. Dapp.expert or its suppliers or licensors, not liable with respect to any subject matter of this agreement under any contract, negligence, strict liability or other legal or equitable theory for:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert is not responsible for reviewing of the material posted to the Website. You are responsible for taking precautions as necessary to protect yourself and your computer systems from viruses, worms, Trojan horses, and other harmful or destructive content. The Website may contain content that is offensive, indecent, or otherwise objectionable, as well as content containing technical inaccuracies, typographical mistakes, and other errors. The Website may also contain material that violates the privacy or publicity rights, or infringes the intellectual property and other proprietary rights, of third parties, or the downloading, copying or use of which is subject to additional terms and conditions, stated or unstated." } },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "any special, incidental or consequential damages;" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "for interuption of use or loss or corruption of data;" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "for any amounts that exceed the fees paid by you to Dapp.expert under this agreement during the twelve month period prior to the cause of action." } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert disclaims any and all liability for the acts, omissions and conduct of any Dapp Developer or other third parties in connection with or related to Visitor\u2019s use of the Website The foregoing shall not apply to the extent prohibited by applicable law. Visitors take full responsibility for the use of dapps accessible one the Website." } }
            }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DISCLAMER OF WARANTIES" } }
        },
        "3": {
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "In order to address a question, to resolve an any issue, please contact Dapp.expert via e-mail at " }, { "t": 4, "k": "email" }, { "t": 3, "v": "." }] } }
          },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "CONTACT" } }
        }
      },
      "createdAt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Created at: Feb 18, 2020" } },
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Terms & Conditions" } }
    },
    "agreement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "By proceeding, you agree to Dapp.expert " }, { "t": 4, "k": "termsLink" }, { "t": 3, "v": " & " }, { "t": 4, "k": "privacyLink" }, { "t": 3, "v": "." }] } },
    "marketingUpdatesAgreement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "I agree to receive marketing updates from Dapp.expert." } },
    "termsOfUse": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Terms of Use" } }
  },
  "mainPage": {
    "ranks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ranks" } },
    "subscribe": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Be the first to know about crypto news every day" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Get crypto analysis, news and updates right to your inbox! Sign up here so you don\u2019t miss a single newsletter" } },
      "termsAgreement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "I have read the Privacy Policy and I understand that I can unsubscribe anytime." } },
      "joinCommunity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Join the community" } },
      "subscriptionSuccessfullyCompleted": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your subscription has been successfully completed!" } }
    },
    "contactUs": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "menu.footer.items.contactUs" } }] } },
      "sendSuccessfully": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your message has been sent successfully!" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "We will process your message as soon as possible." } }
      },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Leave your message, and we will get back to you shortly." } }
    }
  },
  "form": {
    "email": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email" } },
    "name": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Name" } },
    "emailAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email Address" } },
    "password": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Password" } },
    "confirmPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Confirm " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }] } },
    "yourEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Your " }, { "t": 6, "k": { "t": 7, "v": "form.email" }, "m": { "t": 8, "v": "lower" } }] } },
    "enterYourX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Enter your " }, { "t": 6, "k": { "t": 4, "k": "subj" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
    "iHaveReadTerms": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "I have read the " }, { "t": 4, "k": "termLink" }, { "t": 3, "v": " and I understand that I can unsubscribe anytime." }] } },
    "displayName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Display name" } },
    "yourX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Your " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
    "chooseX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Choose " }, { "t": 4, "k": "field" }] } },
    "chooseYourOwnNickname": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choose your own nickname" } },
    "chooseLanguage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Choose " }, { "t": 6, "k": { "t": 7, "v": "common.language" }, "m": { "t": 8, "v": "lower" } }] } },
    "chooseTopics": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choose Topics" } },
    "username": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Username" } },
    "bio": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Bio" } },
    "website": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Website" } },
    "birthday": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Birthday" } },
    "rules": {
      "required": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Required field" } },
      "acceptTerms": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You need to accept our terms and privacy policy" } },
      "passwordStrengthValidation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Must Contain min. 8 characters, that contain letters and numbers." } },
      "passwordDoestMatch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Passwords does not match" } },
      "maxXChars": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Maximum " }, { "t": 4, "k": "max" }, { "t": 3, "v": " characters." }] } },
      "minXChars": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Minimum " }, { "t": 4, "k": "min" }, { "t": 3, "v": " characters." }] } },
      "invalidField": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Field value is invalid" } },
      "uploadX": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.upload" } }, { "t": 3, "v": " the " }, { "t": 6, "k": { "t": 4, "k": "entity" }, "m": { "t": 8, "v": "lower" } }] } },
      "minParamsRequred": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "At least one parameter must be selected." } },
      "maxFieldsReached": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "A maximum of " }, { "t": 4, "k": "count" }, { "t": 3, "v": " fields can be selected" }] } },
      "validUrl": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " must be a valid url" }] } },
      "validEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " must be a valid email" }] } }
    },
    "rows": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rows" } },
    "noResultsFor": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "No results for \u2018" }, { "t": 4, "k": "text" }, { "t": 3, "v": "\u2019" }] } },
    "message": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Message" } },
    "id": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Id" } },
    "status": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Status" } },
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Title" } },
    "imageDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.image" } }, { "t": 3, "v": " description" }] } },
    "shortDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Short description" } },
    "seo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "SEO" } },
    "slug": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Slug" } },
    "tags": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tags" } },
    "tagsPlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "tag1, tag2, tag3..." } },
    "separateHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "use \u2018,\u2019 to separate" } },
    "slugHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "If you leave it blank, it will be generated automatically." } },
    "summaryAndDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Summary & Description" } },
    "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Keywords" } },
    "metaTag": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Meta Tag" } },
    "fullDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Full description" } },
    "fillBothLanguagesHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This platform uses two language versions. We recommend you fill out both language versions manually. Otherwise, the translation of the empty version will be done automatically." } },
    "noXFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "No " }, { "t": 4, "k": "field" }, { "t": 3, "v": " found" }] } }
  },
  "news": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "News" } },
    "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Insights into the biggest events shaping the crypto industry." } },
    "otherNews": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Other " }, { "t": 6, "k": { "t": 7, "v": "news.title" }, "m": { "t": 8, "v": "lower" } }] } },
    "submitForm": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Submitted " }, { "t": 6, "k": { "t": 7, "v": "news.title" } }] } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.submit" } }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 7, "v": "news.title" } }] } },
      "category": {
        "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Choose the category for your " }, { "t": 6, "k": { "t": 7, "v": "news.title" } }, { "t": 3, "v": " for more effective promotion." }] } }
      }
    }
  },
  "articles": {
    "title": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "Article" }, { "t": 2, "i": [{ "t": 3 }], "s": "Articles" }] } },
    "otherArticles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Other articles" } },
    "linkCopied": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Link Copied!" } },
    "latestCryptoUpdates": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Latest Crypto Updates" } },
    "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Community showcases the latest cryptocurrency updates published by projects from all parts of the crypto universe." } },
    "categories": {
      "recentlyAdded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recently added" } },
      "exchange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Exchange" } },
      "crypto": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Crypto" } },
      "nft": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "NFT" } },
      "deFi": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DeFi" } },
      "gameFi": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GameFi" } },
      "education": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Education" } }
    },
    "submitForm": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Submitted " }, { "t": 6, "k": { "t": 7, "v": "articles.title" } }] } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.submit" } }, { "t": 3, "v": " an " }, { "t": 6, "k": { "t": 7, "v": "articles.title" } }] } },
      "topic": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Topic" } },
        "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Choose appropriate topics from those available for your " }, { "t": 6, "k": { "t": 7, "v": "articles.title." } }] } }
      }
    }
  },
  "dapp": {
    "mainnetContractLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mainnet contract link" } },
    "platform": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Platform" } },
      "ios": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "iOS" } },
      "android": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Android" } },
      "web": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Web" } }
    },
    "submitForm": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Submitted " }, { "t": 6, "k": { "t": 7, "v": "coins.dappsAbbr" } }] } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.submit" } }, { "t": 3, "v": " a " }, { "t": 6, "k": { "t": 7, "v": "coins.dapp" }, "m": { "t": 8, "v": "upper" } }] } },
      "logo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Logo" } },
      "logoDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "dapp.submitForm.logo" } }, { "t": 3, "v": " description" }] } },
      "logoDescriptionLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "dapp.submitForm.logoDescription" } }, { "t": 3, "v": " (SEO)" }] } },
      "basicInformation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Basic information" } },
      "otherInformation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Other information" } },
      "contactDetails": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.contact" } }, { "t": 3, "v": " details" }] } },
      "teamLocation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Team location" } },
      "contactEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.contact" } }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 7, "v": "form.email" } }] } },
      "contactPersonsName": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.contact" } }, { "t": 3, "v": " person's name" }] } },
      "seoInfoHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This information will help promote your DAPP and increase its popularity and views. We recommend filling out this information for both language versions." } },
      "yourDappName": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "form.yourX" } }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 7, "v": "coins.dapp" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 7, "v": "form.name" }, "m": { "t": 8, "v": "lower" } }] } },
      "screenshotRequirement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Requirements: Min 1 image, Max 5 images; Recommendation: 3 images." } },
      "errors": {
        "logo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Upload the " }, { "t": 6, "k": { "t": 7, "v": "dapp.submitForm.logo" }, "m": { "t": 8, "v": "lower" } }] } },
        "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You need to select the " }, { "t": 6, "k": { "t": 7, "v": "common.language" }, "m": { "t": 8, "v": "lower" } }] } },
        "platform": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You need to select the " }, { "t": 6, "k": { "t": 7, "v": "coins.metrics.platform" }, "m": { "t": 8, "v": "lower" } }] } },
        "screenshot": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You need to upload at least one screenshot" } }
      }
    },
    "rankingTableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Top Dapps" } },
    "shareDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Share it with your friends" } },
      "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "The price of <b>" }, { "t": 4, "k": "name" }, { "t": 3, "v": "</b> is " }, { "t": 4, "k": "price" }, { "t": 3, "v": "!" }] } },
      "orCopyLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Or copy link" } }
    },
    "hints": {
      "volume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The fiat value of incoming dapp transactions over a period of time" } },
      "balance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The total fiat value of assets in a dapp's smart contracts" } }
    }
  },
  "errors": {
    "credentialsIncorrect": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "User not found or password invalid." } },
    "emailNotConfirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email is not confirmed." } },
    "emailAlreadyTaken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The user with this email is already registered." } },
    "incorrectCode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Incorrect code" } },
    "invalidFileSize": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "The maximum file size is " }, { "t": 4, "k": "size" }] } },
    "invalidFileLimit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "The maximum is " }, { "t": 4, "k": "limit" }, { "t": 3, "v": " files" }] } },
    "errorPage404": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Oops! We can\u2019t find this page :(" } },
    "errorPage500": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This was unexpected. We are trying to fix the problem!" } },
    "walletAddressTaken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This Wallet has already been bound to another Email account." } },
    "e000": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Something went wrong when making your request. Please try again." } }
  },
  "coins": {
    "dapp": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "Dapp" }, { "t": 2, "i": [{ "t": 3 }], "s": "Dapps" }] } },
    "dappsAbbr": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DAPPs" } },
    "cryptocurrency": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cryptocurrency" } },
    "dex": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DEX" } },
    "cex": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "CEX" } },
    "markets": {
      "tradingPairsOnXExchanges": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Trading pairs on " }, { "t": 6, "k": { "t": 4, "k": "type" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " exchanges" }] } },
      "centralized": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Centralized" } },
      "decentralized": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Decentralized" } },
      "exchange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Exchange" } },
      "depthNegativeTwo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "-2% Depth" } },
      "depthPositiveTwo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "+2% Depth" } },
      "confidence": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Confidence" } },
      "confidenceIndicators": {
        "high": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "High" } },
        "low": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Low" } },
        "moderate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Moderate" } }
      },
      "liquidityScore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Liquidity score" } },
      "indexPrice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Index price" } },
      "basis": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Basis" } },
      "fundingRate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Funding rate" } },
      "openInterest": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Open interest" } },
      "categories": {
        "perpetual": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Perpetual" } },
        "spot": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Spot" } },
        "futures": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Futures" } }
      },
      "allPairs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "All " }, { "t": 6, "k": { "t": 7, "v": "coins.metrics.pairs" }, "m": { "t": 8, "v": "lower" } }] } }
    },
    "exchanges": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Exchanges" } },
    "cryptocoins": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cryptocoins" } },
    "customizeMetricsDialog": {
      "fromLibraryOfOurMetrics": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "From the library of our metrics" } },
      "yourTable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your table" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add, delete and sort metrics just how you need it" } },
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Add up to " }, { "t": 4, "k": "number" }, { "t": 3, "v": " metrics" }] } }
    },
    "metrics": {
      "turnover": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Turnover" } },
      "allTimeLow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All-time low" } },
      "allTimeHigh": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All-time high" } },
      "pricePerformance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Price performance" } },
      "balance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Balance" } },
      "totalAssets": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Total assets" } },
      "balanceChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Balance Change" } },
      "spotTradingVolume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Spot Trading Volume" } },
      "totalUsers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Total Users" } },
      "userChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "User Change" } },
      "explanations": {
        "maxSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": 'The maximum amount of coins that will ever exist in the lifetime of the cryptocurrency. It is analogous to the fully diluted shares in the stock market. <br /><br /> If the project did not submit this data nor was it verified by CoinMarketCap, max. supply shows \\"--\\".' } },
        "totalSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Total supply = Total coins created - coins that have been burned (if any) It is comparable to outstanding shares in the stock market. <br /><br /> If the project did not submit this data nor was it verified by CoinMarketCap, total supply shows \u201C--\u201D." } },
        "volume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "A measure of how much of a cryptocurrency was traded in the last 24 hours." } },
        "fullyDilluttedMarketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The market cap if the max supply was in circulation. <br /><br /> Fully-diluted market cap (FDMC) = price x max supply. If max supply is null, FDMC = price x total supply. if max supply and total supply are infinite or not available, fully-diluted market cap shows - -." } },
        "marketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The total market value of a cryptocurrenc's circulating supply. It is analogous to the free-float capitalization in the stock market. <br /><br /> Market cap = Current price x Circulating supply" } },
        "circulatingSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The amount of coins that are circulating in the market and are in public hands. It is analogous to the flowing shares in the stock market.'," } },
        "volumeMarketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Indicator of liquidity. The higher the ratio, the more liquid the cryptocurrency is, which should make it easier for it to be bought/sold on an exchange close to its value. <br /><br />Cryptocurrencies with a low ratio are less liquid and most likely present less stable markets." } }
      },
      "change": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Change" } },
      "volume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Volume" } },
      "volumeUSD": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "coins.metrics.volume" } }, { "t": 3, "v": " USD" }] } },
      "volumeChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Volume Change" } },
      "volumePercent": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Volume %" } },
      "other": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Other" } },
      "platform": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Platform" } },
      "category": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Category" } },
      "subcategory": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Subcategory" } },
      "blockchain": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Blockchain" } },
      "metricForXTime": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 4, "k": "metric" }, "m": { "t": 8, "v": "capitalize" } }, { "t": 3, "v": " (" }, { "t": 4, "k": "time" }, { "t": 3, "v": ")" }] } },
      "marketShare": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Market Share" } },
      "contractBalance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contract Balance" } },
      "weeklyVisits": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Weekly Visits" } },
      "pair": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pair" } },
      "priceChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Price Change" } },
      "pairs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pairs" } },
      "audited": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Audited" } },
      "supply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Supply" } },
      "numCoins": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "# Coins" } },
      "charts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Charts" } },
      "type": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Type" } },
      "chart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Chart" } },
      "tvl": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "TVL" } },
      "low24H": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "24h Low" } },
      "launched": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Launched" } },
      "high24": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "24h High" } },
      "blockchains": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Blockchains" } },
      "dominance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dominance" } },
      "blockchainsCategory": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Blockchain's " }, { "t": 6, "k": { "t": 7, "v": "coins.metrics.category" }, "m": { "t": 8, "v": "lower" } }] } },
      "maxSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Max Supply" } },
      "token": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Token" } },
      "totalSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Total Supply" } },
      "exchangeToken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Exchange " }, { "t": 6, "k": { "t": 7, "v": "coins.metrics.token" } }] } },
      "tvlFull": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Total Value Locked" } },
      "score": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Score" } },
      "p2p": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "P2P" } },
      "fiatSupported": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Fiat Supported" } },
      "volumeMCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "coins.metrics.volume" } }, { "t": 3, "v": " / " }, { "t": 6, "k": { "t": 7, "v": "coins.metrics.mcap" } }] } },
      "volumeGraph": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Volume Graph" } },
      "fullyDilluttedMarketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Fully Diluted " }, { "t": 6, "k": { "t": 7, "v": "coins.metrics.marketCap" } }] } },
      "fees": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Fees" } },
      "mcap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mcap" } },
      "reserveData": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Reserve Data" } },
      "circulatingSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Circulating supply" } },
      "price": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Price" } },
      "pricePercentChange1H": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1h %" } },
      "marketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Market cap" } },
      "ytdPriceChangePercentage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "YTD %" } },
      "pricePercentChange90D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "90d %" } },
      "pricePercentChange60D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "60d %" } },
      "pricePercentChange30D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "30d %" } },
      "pricePercentChange7D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7d %" } },
      "pricePercentChange24H": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "24h %" } },
      "high": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "High" } },
      "low": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Low" } }
    }
  },
  "digitalAsset": {
    "about": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "What is " }, { "t": 4, "k": "title" }, { "t": 3, "v": "?" }] } },
    "whitepaper": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Whitepaper" } },
    "assetToUserCurrencyConverter": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "asset" }, { "t": 3, "v": " to " }, { "t": 4, "k": "userCurrency" }, { "t": 3, "v": " Converter" }] } }
  }
};
const resource = {
  "common": {
    "locale": {
      "en": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043D\u0433\u043B\u0438\u0439\u0441\u043A\u0438\u0439" } },
      "ru": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" } },
      "ch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0438\u0442\u0430\u0439\u0441\u043A\u0438\u0439" } },
      "jp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042F\u043F\u043E\u043D\u0441\u043A\u0438\u0439" } },
      "kr": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u0440\u0435\u0439\u0441\u043A\u0438\u0439" } }
    },
    "selectCurrency": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u043B\u044E\u0442\u0443" } },
    "copyright": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\xA9 2020-" }, { "t": 4, "k": "currentYear" }, { "t": 3, "v": ". DappExpert. \u0412\u0441\u0435 \u043F\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B." }] } },
    "disclaimer": {
      "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0430\u0436\u043D\u043E\u0435 \u043F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435" } },
      "content": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u043D\u0430 \u043F\u043E\u0440\u0442\u0430\u043B\u0435 Dapp.Expert, \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0430 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0446\u0435\u043B\u0435\u0439 \u0438 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0435\u0439 \u043A \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u044F\u043C \u0438\u043B\u0438 \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E\u043C \u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044E. \u041A\u043E\u043C\u0430\u043D\u0434\u0430 Dapp.Expert \u043D\u0435 \u043D\u0435\u0441\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0435 \u0443\u0431\u044B\u0442\u043A\u0438 \u0438\u043B\u0438 \u0443\u043F\u0443\u0449\u0435\u043D\u043D\u0443\u044E \u0432\u044B\u0433\u043E\u0434\u0443, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432, \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u041F\u0435\u0440\u0435\u0434 \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u0435\u043C \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0440\u0435\u0448\u0435\u043D\u0438\u0439 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u043F\u0440\u043E\u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u0444\u0438\u043D\u0430\u043D\u0441\u043E\u0432\u044B\u043C \u0441\u043E\u0432\u0435\u0442\u043D\u0438\u043A\u043E\u043C." } }
    },
    "content": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043D\u0442\u0435\u043D\u0442" } },
    "or": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0438\u043B\u0438" } },
    "by": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043E\u0442" } },
    "all": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0441\u0435" } },
    "none": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0438\u0447\u0435\u0433\u043E" } },
    "search": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0438\u0441\u043A" } },
    "share": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F" } },
    "google": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Google" } },
    "wallet": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Wallet" } },
    "enter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u043E\u0439\u0442\u0438" } },
    "repeat": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C" } },
    "new": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u043E\u0432\u044B\u0439" } },
    "hiX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u0440\u0438\u0432\u0435\u0442, " }, { "t": 4, "k": "name" }] } },
    "changes": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F" } },
    "submitDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u043D\u0435\u0441\u0442\u0438 \u0432\u043A\u043B\u0430\u0434" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C dapps, \u0441\u0442\u0430\u0442\u044C\u0438 \u0438\u043B\u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u0438." } },
      "buttons": {
        "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.add" } }, { "t": 3, "v": " DAPP" }] } },
        "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.add" } }, { "t": 3, "v": " \u0441\u0442\u0430\u0442\u044C\u044E" }] } },
        "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.add" } }, { "t": 3, "v": " \u043D\u043E\u0432\u043E\u0441\u0442\u044C" }] } }
      }
    },
    "latest": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435" } },
    "recommended": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C\u044B\u0435" } },
    "recommendation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F" } },
    "globalStats": {
      "dapps": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapps" } },
      "blockchains": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u044B" } },
      "activeUsers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438" } },
      "volume30d": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u044A\u0435\u043C \u0437\u0430 30 \u0434\u043D\u0435\u0439" } },
      "transactions30d": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438 \u0437\u0430 30 \u0434\u043D\u0435\u0439" } }
    },
    "avatar": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0430\u0432\u0430\u0442\u0430\u0440" } },
    "allBlockchains": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0441\u0435 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u044B" } },
    "time": {
      "h": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0447" } },
      "d": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0434" } },
      "m": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043C" } },
      "y": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0433" } }
    },
    "metrics": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0435\u0442\u0440\u0438\u043A\u0438" } },
    "exchange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u043C\u0435\u043D" } },
    "available": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E" }, { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E" }] } },
    "coin": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u043E\u043D\u0435\u0442\u0430" } },
    "more": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u043E\u043B\u044C\u0448\u0435" } },
    "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042F\u0437\u044B\u043A" } },
    "officialLinks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438" } },
    "socialMedia": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0442\u0438" } },
    "tags": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u0435\u0433\u0438" } },
    "copied": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E" } },
    "rating": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u0439\u0442\u0438\u043D\u0433" } },
    "about": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E \u043D\u0430\u0441" } },
    "overview": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0437\u043E\u0440" } },
    "markets": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u044B\u043D\u043A\u0438" } },
    "currentPageReportTemplate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0437\u0430\u043F\u0438\u0441\u0438 \u0441 " }, { "t": 4, "k": "first" }, { "t": 3, "v": " \u043F\u043E " }, { "t": 4, "k": "last" }, { "t": 3, "v": " \u0438\u0437 " }, { "t": 4, "k": "total" }] } },
    "showRows": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0438" } },
    "updated": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u043E" } },
    "expiryDate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0430\u0442\u0430 \u0438\u0441\u0442\u0435\u0447\u0435\u043D\u0438\u044F \u0441\u0440\u043E\u043A\u0430" } },
    "loadingX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
    "data": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0430\u043D\u043D\u044B\u0435" } },
    "screenshots": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B" } },
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0413\u043B\u0430\u0432\u043D\u0430\u044F" } },
    "image": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043D\u0442\u0430\u043A\u0442" } },
    "leaveDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B \u0443\u0432\u0435\u0440\u0435\u043D\u044B, \u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u043E\u043A\u0438\u043D\u0443\u0442\u044C \u044D\u0442\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443?" } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0441\u0435 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0442\u0435\u0440\u044F\u043D\u044B." } },
      "submitText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0430, \u043F\u043E\u043A\u0438\u043D\u0443\u0442\u044C" } },
      "cancelText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043C\u0435\u043D\u0430" } }
    },
    "joined": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u043B\u0441\u044F" } },
    "customerService": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043B\u0443\u0436\u0431\u0430 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438" } },
    "buttons": {
      "logIn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F" } },
      "showLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435" } },
      "readMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435" } },
      "subscribe": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" } },
      "viewMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435" } },
      "viewAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435" } },
      "forgotPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0417\u0430\u0431\u044B\u043B\u0438 " }, { "t": 6, "k": { "t": 7, "v": "form.password" }, "m": { "t": 8, "v": "lower" } }] } },
      "sendInstructions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438" } },
      "back": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0437\u0430\u0434" } },
      "backToX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041D\u0430\u0437\u0430\u0434 \u043A " }, { "t": 6, "k": { "t": 4, "k": "field" } }] } },
      "createAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442" } },
      "resendX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C " }, { "t": 6, "k": { "t": 4, "k": "field" } }] } },
      "next": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0430\u043B\u0435\u0435" } },
      "bindNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441" } },
      "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" } },
      "add": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" } },
      "gotIt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043D\u044F\u043B" } },
      "upload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C" } },
      "save": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" } },
      "saveAndProceed": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.save" } }, { "t": 3, "v": " \u0438 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" }] } },
      "goBack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430\u0437\u0430\u0434" } },
      "loadMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435" } },
      "editX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
      "applyX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "capitalize" } }] } },
      "customize": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C" } },
      "addMetric": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0435\u0442\u0440\u0438\u043A\u0443" } },
      "resetToDefault": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E" } },
      "cancel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043C\u0435\u043D\u0430" } },
      "showAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435" } },
      "copy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C" } },
      "copyLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443" } },
      "showFullWidth": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432 \u043F\u043E\u043B\u043D\u044B\u0439 \u044D\u043A\u0440\u0430\u043D" } },
      "send": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" } },
      "edit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" } },
      "delete": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C" } },
      "changeImage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C " }, { "t": 6, "k": { "t": 7, "v": "common.image" }, "m": { "t": 8, "v": "lower" } }] } },
      "report": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u043E\u0431\u0449\u0438\u0442\u044C" } },
      "shareOnX": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.share" } }, { "t": 3, "v": " \u043D\u0430 " }, { "t": 4, "k": "platform" }] } },
      "setAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0430\u0434\u0440\u0435\u0441" } },
      "setEmailAndPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C " }, { "t": 6, "k": { "t": 7, "v": "form.email" } }, { "t": 3, "v": " & " }, { "t": 6, "k": { "t": 7, "v": "form.password" } }] } },
      "signUp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" } }
    },
    "noDataAvailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0430\u043D\u043D\u044B\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0442." } },
    "site": {
      "metadata": {
        "homepage": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u043E\u0432\u043E\u0441\u0442\u0438 \u0438 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u043F\u043E \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C (DApps)" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u0442\u043E\u043F \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert -  \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E dapps \u043D\u0430 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0430\u0445 Ethereum, Tron, Ton, BSC, SOL, Cosmos, Sui. \u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443 \u043F\u043E DeFi, NFT, \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0430\u043C \u0438\u0433\u0440\u0430\u043C \u0438 \u043F\u0440\u043E\u0447\u0438\u043C dapps" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "dapps,  DeFi, NFT, DEX, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F,  dapp \u043D\u0430 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0435  Ethereum,  dapp \u043D\u0430 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0435  BSC,  blockhain \u0438\u0433\u0440\u044B, \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u044B, \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442, \u043D\u043E\u0432\u043E\u0441\u0442\u0438 dapps, ethereum, tron, bsc, solana, toncoin, sui, sei, coscmos atom." } }
        },
        "news": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442 \u0438 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0432\u0435\u0436\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u043F\u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430\u043C \u0438 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0437\u043D\u0430\u0432\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442 \u0438 DApps: \u0442\u0440\u0435\u043D\u0434\u044B, \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430, \u043E\u0431\u0437\u043E\u0440\u044B \u0440\u044B\u043D\u043A\u0430 \u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D-\u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u0438." } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u043D\u044B\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438, DeFi, DEX, CEX, Cryptocurrency, NFT, GameFi, Play to earn, Move to earn, \u043D\u043E\u0432\u043E\u0441\u0442\u0438 dapps" } }
        },
        "analytics": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438 \u043F\u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430\u043C \u0438 DApps" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u043F\u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430\u043C \u0438 dApps" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0438 \u043E\u0431\u0443\u0447\u0430\u0449\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043F\u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u043C, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C, \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u043D\u044B\u043C \u0431\u0438\u0440\u0436\u0430\u043C, \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0430\u043C \u0438 NFT \u0438\u0433\u0440\u0430\u043C" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "analytical articles on cryptocurrencies, DeFi, DEX, CEX, Cryptocurrency, NFT, GameFi, Play to earn, Move to earn, BTC, ETH, Dapp, analytical materials on dapps" } }
        },
        "analyticsAll": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043F\u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430\u043C \u0438 DApps" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u043F\u043E DApps \u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430\u043C" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438 \u043E\u0431\u0443\u0447\u0430\u044E\u0449\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043F\u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430\u043C, DApps, \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u0430\u043C, \u0431\u0438\u0440\u0436\u0430\u043C \u0438 NFT-\u0438\u0433\u0440\u0430\u043C. \u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0432\u0441\u0451 \u043E \u043C\u0438\u0440\u0435 \u0446\u0438\u0444\u0440\u043E\u0432\u044B\u0445 \u0430\u043A\u0442\u0438\u0432\u043E\u0432." } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "analytical articles on cryptocurrencies, DeFi, DEX, CEX, Cryptocurrency, NFT, GameFi, Play to earn, Move to earn, BTC, ETH, Dapp, analytical materials on dapps" } }
        },
        "termsConditions": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F Dapp Expert" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0440\u0435\u0441\u0443\u0440\u0441\u0430 \u043F\u043E dapps" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043F\u043E \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C - Dapp.Expert" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "dapp, NFT, DeFi, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u044B, \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D \u0438\u0433\u0440\u044B" } }
        },
        "privatePrivacy": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 Dapp.Expert" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Privacy Policy \u0441\u0430\u0439\u0442\u0430 \u043F\u043E dapps" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043F\u043E \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C dapp.expert" } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "privacy, policy, dapp, NFT, DeFi, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0444\u0438\u043D\u0430\u043D\u0441\u044B, \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D \u0438\u0433\u0440\u044B" } }
        },
        "ranking": {
          "h1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043B\u0443\u0447\u0448\u0438\u0445 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442 \u0438 dapps" } },
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u043E\u043F \u0440\u0435\u0439\u0442\u0438\u043D\u0433 dapps \u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442. \u0421\u043F\u0438\u0441\u043E\u043A DEX \u0438 Cex \u0431\u0438\u0440\u0436" } },
          "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u043E\u043F \u0440\u0435\u0439\u0442\u0438\u043D\u0433 dapps \u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442. \u0421\u043F\u0438\u0441\u043E\u043A \u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u044B\u0445 \u0438 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u043D\u044B\u0445 \u0431\u0438\u0440\u0436 \u0441 \u043D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u0432\u0430\u0436\u043D\u044B\u043C\u0438 \u043C\u0435\u0442\u0440\u0438\u043A\u0430\u043C\u0438." } },
          "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 dapps, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u043A\u0440\u0438\u043F\u0442\u043E \u0431\u0438\u0440\u0436, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0434\u0435\u0445 \u0431\u0438\u0440\u0436, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D \u0438\u0433\u0440, \u0440\u0435\u0439\u0442\u0438\u043D\u0433 DeFi \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439." } }
        }
      }
    },
    "shortLocale": {
      "en": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En" } },
      "ru": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ru" } }
    }
  },
  "auth": {
    "forgotPasswordDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C?" } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email \u043D\u0438\u0436\u0435, \u0438 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043F\u0438\u0441\u044C\u043C\u043E \u0441 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F\u043C\u0438 \u043F\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044E \u043F\u0430\u0440\u043E\u043B\u044F \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u0445 \u043C\u0438\u043D\u0443\u0442. \u0412\u044B \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C, \u0435\u0441\u043B\u0438 \u0440\u0430\u043D\u0435\u0435 \u0435\u0433\u043E \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u043B\u0438." } }
    },
    "emailReceivedDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423 \u0432\u0430\u0441 \u043F\u0438\u0441\u044C\u043C\u043E :)" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u0431\u044B\u043B\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u044B \u043D\u0430 " }, { "t": 4, "k": "email" }, { "t": 3, "v": "." }] } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": '\u0415\u0441\u043B\u0438 \u0432\u044B \u043D\u0435 \u0432\u0438\u0434\u0438\u0442\u0435 \u043F\u0438\u0441\u044C\u043C\u043E \u0432\u043E \\"\u0412\u0445\u043E\u0434\u044F\u0449\u0438\u0445\\", \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0430\u043F\u043A\u0443 \\"\u0421\u043F\u0430\u043C\\". \u0422\u0430\u043A\u0436\u0435 \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0432\u044B \u0432\u0432\u0435\u043B\u0438 \u0442\u043E\u0442 \u0436\u0435 email, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438 \u043F\u0440\u0438 \u0432\u0445\u043E\u0434\u0435.' } },
      "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0427\u0442\u043E\u0431\u044B \u0432\u043E\u0439\u0442\u0438 \u0432 \u0441\u0438\u0441\u0442\u0435\u043C\u0443, \u0432\u0430\u043C \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C." } }
    },
    "changePassword": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": '\u0414\u043B\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0432\u0430\u0448 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0431\u0443\u043A\u0432\u044B, \u0446\u0438\u0444\u0440\u044B \u0438 \u0441\u0438\u043C\u0432\u043E\u043B\u044B."' } },
      "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" } }
    },
    "passwordSavedDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0430\u0448 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D" } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432\u043E\u0439\u0442\u0438 \u0441 \u043D\u043E\u0432\u044B\u043C \u043F\u0430\u0440\u043E\u043B\u0435\u043C." } }
    },
    "emailVerificationDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email" } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0438 \u043F\u0438\u0441\u044C\u043C\u043E \u043D\u0430 " }, { "t": 4, "k": "email" }, { "t": 3, "v": " \u0441 \u0441\u0441\u044B\u043B\u043A\u043E\u0439 \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0432\u0430\u0448\u0435\u0433\u043E email. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0436\u0430\u0442\u044C \u043D\u0430 \u043A\u043D\u043E\u043F\u043A\u0443 \u0432 \u043F\u0438\u0441\u044C\u043C\u0435 \u0438\u043B\u0438 \u0432\u0432\u0435\u0441\u0442\u0438 \u043A\u043E\u0434 \u043D\u0438\u0436\u0435." }] } },
      "resendEmailCounterText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u0438\u0441\u044C\u043C\u043E \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u043E, \u0435\u0441\u043B\u0438 \u043E\u043D\u043E \u043D\u0435 \u043F\u0440\u0438\u0448\u043B\u043E \u0447\u0435\u0440\u0435\u0437" } }
    },
    "wallet": {
      "walletAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u0434\u0440\u0435\u0441 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430" } },
      "loginWithWalletAddr": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u043E\u0439\u0442\u0438 \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u043E\u0433\u043E \u0430\u0434\u0440\u0435\u0441\u0430 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430" } },
      "trustWallet": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "TrustWallet" } },
      "metaMask": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "MetaMask" } },
      "walletConnect": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "WalletConnect" } },
      "connectWallet": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0435\u043A" } },
        "notification": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u043A\u043E\u0448\u0435\u043B\u0435\u043A \u0434\u043B\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F" } }
      },
      "bindingDialog": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442?" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0432\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A \u043A \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u043C\u0443 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0443 \u0438\u043B\u0438 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439." } },
        "note": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435, \u0447\u0442\u043E \u0435\u0441\u043B\u0438 \u0432\u044B \u0441\u043E\u0437\u0434\u0430\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0441 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u043E\u043C, \u0432\u044B \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0441\u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u0435\u0433\u043E \u043A \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u043C\u0443 Email \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0443." } },
        "buttons": {
          "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0430, \u0443 \u043C\u0435\u043D\u044F \u0435\u0441\u0442\u044C \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442" } },
          "cancel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u0442, \u044F \u0445\u043E\u0447\u0443 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0430\u043A\u043A\u0430\u0443\u043D\u0442" } }
        }
      },
      "bindingForm": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u0438\u0432\u044F\u0437\u0430\u0442\u044C \u043A \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u043C\u0443 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0443" } }
      },
      "bindingActiveWalletDialog": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430 \u0441 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u043E\u043C \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u043D\u0430 \u0432\u0430\u0448\u0435\u043C \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0435 \u0431\u043E\u043B\u0435\u0435 $1 \u0432 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0435, \u0432\u043A\u043B\u044E\u0447\u0430\u044F:" } }
      },
      "boundSuccessfullyDialog": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u043E!" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043B\u0438 \u043A\u043E\u0448\u0435\u043B\u0435\u043A " }, { "t": 4, "k": "walletId" }, { "t": 3, "v": " \u043A \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u043C\u0443 Email \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0443 " }, { "t": 4, "k": "email" }, { "t": 3, "v": ". \u0422\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u0445\u043E\u0434\u0438\u0442\u044C \u043B\u044E\u0431\u044B\u043C \u0438\u0437 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u0432." }] } }
      },
      "signMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u0440\u0438\u0432\u0435\u0442, \u0434\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 Dapp Expert. \\n\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435 \u044D\u0442\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430. \\n\u042D\u0442\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u0441\u0442\u043E\u0438\u0442\u044C \u0432\u0430\u043C \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u0441\u0431\u043E\u0440\u043E\u0432. \\n \\n\u0410\u0434\u0440\u0435\u0441: " }, { "t": 4, "k": "address" }, { "t": 3, "v": " \\n \\nNonce: " }, { "t": 4, "k": "nonce" }] } },
      "disconnect": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C" } },
      "incorrectWalletAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043A \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0443, \u043F\u0440\u0438\u0432\u044F\u0437\u0430\u043D\u043D\u043E\u043C\u0443 \u043A \u044D\u0442\u043E\u0439 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438." } }
    },
    "emailAlreadyRegisteredDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u044D\u0442\u0438\u043C email \u0443\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D." } },
      "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": '\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0432\u043E\u0439\u0442\u0438, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u044D\u0442\u043E\u0442 email. \u0415\u0441\u043B\u0438 \u0432\u044B \u0437\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C, \u0432\u0441\u0435\u0433\u0434\u0430 \u043C\u043E\u0436\u043D\u043E \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0435\u0433\u043E, \u043D\u0430\u0436\u0430\u0432 \u043D\u0430 \\"\u0417\u0430\u0431\u044B\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C\\".' } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0432\u043E\u0439\u0442\u0438" } }
    },
    "updatePassword": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u0430\u0440\u043E\u043B\u044C." } }
    }
  },
  "menu": {
    "header": {
      "ranking": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u0439\u0442\u0438\u043D\u0433" } },
      "news": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u043E\u0432\u043E\u0441\u0442\u0438" } },
      "articles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u0430\u0442\u044C\u0438" } },
      "defight": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Defight" } }
    },
    "footer": {
      "items": {
        "submit": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.buttons.submit" } }] } },
        "contactUs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438" } },
        "deFight": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DeFight" } }
      }
    },
    "user": {
      "profileSettings": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F" } },
      "accountSecurity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430" } },
      "notifications": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F" } },
      "contribute": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u043D\u0435\u0441\u0442\u0438 \u0432\u043A\u043B\u0430\u0434" } },
      "logOut": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0439\u0442\u0438" } }
    }
  },
  "search": {
    "placeholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0438\u0441\u043A \u043C\u043E\u043D\u0435\u0442\u044B, \u043F\u0430\u0440\u044B \u0438\u043B\u0438 \u0431\u0438\u0440\u0436\u0438" } },
    "trending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0435" } },
    "recentSearches": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u0434\u0430\u0432\u043D\u0438\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B" } },
    "noResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": '\u041D\u0435\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0434\u043B\u044F \\"' }, { "t": 4, "k": "search" }, { "t": 3, "v": '\\"' }] } },
    "emptyHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u044B \u043D\u0435 \u0441\u043C\u043E\u0433\u043B\u0438 \u043D\u0430\u0439\u0442\u0438 \u043D\u0438\u0447\u0435\u0433\u043E, \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0433\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443.\\n \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u043E\u0439 \u0442\u0435\u0440\u043C\u0438\u043D." } },
    "seeAllResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0432\u0441\u0435 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B" } }
  },
  "user": {
    "settings": {
      "profile": {
        "form": {
          "aboutMe": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u043E \u043C\u043D\u0435" } },
          "usernameHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u0442\u043E \u0438\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E. \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0435\u0433\u043E \u043C\u043E\u0436\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440." } },
          "bioHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E \u0441\u0435\u0431\u0435" } },
          "successUpdateMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0430\u0448\u0430 \u043B\u0438\u0447\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430" } }
        },
        "completeProfile": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u043F\u0440\u043E\u0444\u0438\u043B\u044C" } },
          "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0430\u0432\u0430\u0442\u0430\u0440 \u0438 \u043D\u0438\u043A\u043D\u0435\u0439\u043C, \u0447\u0442\u043E\u0431\u044B \u0432\u0430\u0441 \u043B\u0443\u0447\u0448\u0435 \u0443\u0437\u043D\u0430\u0432\u0430\u043B\u0438!" } },
          "hint": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u043E\u043B\u044C\u043A\u043E JPEG \u0438\u043B\u0438 PNG \u0444\u043E\u0440\u043C\u0430\u0442" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 \u2014 5 \u041C\u0411." } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0430\u0437\u043C\u0435\u0440 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C\u043E\u0433\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 100*100 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439" } }
          },
          "presetAvatar": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u0435\u0434\u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0430\u0432\u0430\u0442\u0430\u0440" } }
        },
        "customizeYourAvatar": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u0441\u0432\u043E\u0439 \u0430\u0432\u0430\u0442\u0430\u0440" } },
          "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0441\u0435 \u043C\u044B \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u043C \u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u043E, \u0442\u0430\u043A \u0447\u0442\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0432\u043E\u0435\n\u043B\u0443\u0447\u0448\u0435\u0435 \u0444\u043E\u0442\u043E \u043F\u0440\u043E\u0444\u0438\u043B\u044F :)" } }
        },
        "accountInfo": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430" } },
          "emailChangeHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0415\u0441\u043B\u0438 \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B, \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 " }, { "t": 4, "k": "link" }, { "t": 3, "v": "." }] } }
        }
      },
      "account": {
        "verifyEmailStep": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0428\u0430\u0433 " }, { "t": 4, "k": "step" }, { "t": 3, "v": " - \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 email" }] } },
          "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0431\u044B\u043B \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D \u043D\u0430 " }, { "t": 4, "k": "email" }, { "t": 3, "v": ". \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0436\u0430\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \u0432 \u043F\u0438\u0441\u044C\u043C\u0435 \u0438\u043B\u0438 \u0432\u0432\u0435\u0441\u0442\u0438 \u043A\u043E\u0434 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u043D\u0438\u0436\u0435." }] } },
          "successStep": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0428\u0430\u0433 " }, { "t": 4, "k": "step" }, { "t": 3, "v": " - \u0423\u0441\u043F\u0435\u0448\u043D\u043E \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E" }] } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u043B\u0438 \u0441\u0432\u043E\u0439 email \u0438 \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C." } }
          }
        },
        "setEmailAndPasswordDialog": {
          "step1": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0428\u0430\u0433 1/3 - \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0443 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443" } },
            "emailPlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B" } },
            "submitBtn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u043D\u0430 email" } }
          },
          "step3": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0428\u0430\u0433 3/3 - \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0432\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C" } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043B\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0432\u0430\u0448 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0438\u043D\u0438\u043C\u0443\u043C 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0431\u0443\u043A\u0432\u044B, \u0446\u0438\u0444\u0440\u044B \u0438 \u0441\u0438\u043C\u0432\u043E\u043B\u044B." } }
          },
          "success": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 email \u0438 \u043F\u0430\u0440\u043E\u043B\u044C!" } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 email \u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043A \u0432\u0430\u0448\u0435\u043C\u0443 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0443. \u0422\u0435\u043F\u0435\u0440\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0432\u043E\u0439\u0442\u0438, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F email \u0438 \u043F\u0430\u0440\u043E\u043B\u044C." } }
          }
        },
        "disconnectWalletDialog": {
          "step2": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0428\u0430\u0433 2/2 - \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A" } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": '"\u0428\u0430\u0433 2/2 - \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A",\n  "user.settings.account.disconnectWalletDialog.step2.text": "\u041C\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u0432 \u0432\u0430\u0448 \u043A\u043E\u0448\u0435\u043B\u0435\u043A ' }, { "t": 4, "k": "walletAddress" }, { "t": 3, "v": ". \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0443\u0439\u0442\u0435\u0441\u044C \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0435\u0433\u043E. \u042D\u0442\u043E \u043D\u0435 \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0441\u0435\u0442\u0435\u0432\u044B\u0445 \u0441\u0431\u043E\u0440\u043E\u0432." }] } },
            "submitBtn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043A\u043E\u0448\u0435\u043B\u0435\u043A" } }
          }
        }
      },
      "security": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438" } },
        "emailAddressVerification": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0435 \u0430\u0434\u0440\u0435\u0441\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B (2FA)" } },
          "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0432\u0430\u0448 email \u0434\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0434\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u043E\u0439 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438." } }
        },
        "password": {
          "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u0434\u043B\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0437\u0430\u0449\u0438\u0442\u044B." } },
          "submitBtn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C" } },
          "changePasswordDialog": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C" } },
            "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u0438 \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435 \u043E \u0442\u043E\u043C, \u043A\u0430\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u0430\u0448 \u043F\u0430\u0440\u043E\u043B\u044C. \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C, \u0435\u0441\u043B\u0438 \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u044D\u0442\u043E \u0432\u043F\u0435\u0440\u0432\u044B\u0435." } }
          }
        }
      },
      "notifications": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0439" } },
        "global": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0413\u043B\u043E\u0431\u0430\u043B\u044C\u043D\u044B\u0435" } },
          "updates": {
            "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438 \u043F\u0440\u043E\u043C\u043E\u0430\u043A\u0446\u0438\u0438" } },
            "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0432\u0430\u0436\u043D\u044B\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0438 \u0430\u043A\u0446\u0438\u0438 \u043E\u0442 DappExpert." } }
          }
        }
      },
      "functionCannotBedisabled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u0442\u0430 \u0444\u0443\u043D\u043A\u0446\u0438\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430." } }
    },
    "contribute": {
      "form": {
        "newEntityTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "common.new" } }, { "t": 3, "v": " " }, { "t": 4, "k": "entity" }] } },
        "entityContent": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "entity" }, { "t": 3, "v": " content" }] } },
        "coverImage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Cover " }, { "t": 6, "k": { "t": 7, "v": "common.image" } }] } },
        "mainPostImage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Main post " }, { "t": 6, "k": { "t": 7, "v": "common.image" }, "m": { "t": 8, "v": "lower" } }] } },
        "coverImageHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "JPEG or PNG format only. The maximum file size is 5 MB." } },
        "coverImageDescLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 7, "v": "form.imageDescription" } }, { "t": 3, "v": " (SEO)" }] } },
        "entityLanguage": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "entity" }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 7, "v": "common.language" }, "m": { "t": 8, "v": "lower" } }] } },
        "entityLanguageHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "The " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " must be created in one of the languages supported by our platform. If your content doesn't match the languages supported by our platform, it will not be published. Please choose a language." }] } },
        "entityOtherInfo": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Other information" } },
          "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This information will help promote your Article and increase its popularity and views." } }
        },
        "entityStatus": {
          "new": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New" } },
          "published": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Published" } },
          "updated": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Update" } },
          "rejected": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rejected" } }
        }
      },
      "emptyMessage": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You haven't submitted any " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " yet." }] } },
        "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "All your submitted " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " will be displayed here." }] } },
        "hint2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "You can submit your " }, { "t": 4, "k": "entity" }, { "t": 3, "v": " on our platform to increase its popularity." }] } }
      }
    },
    "activity": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C" } },
      "emptyMessage": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u043E\u043A\u0430 \u043D\u0435 \u0431\u044B\u043B \u0430\u043A\u0442\u0438\u0432\u0435\u043D." } },
        "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0417\u0434\u0435\u0441\u044C \u0431\u0443\u0434\u0435\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u0442\u0430\u043A\u0430\u044F \u043A\u0430\u043A \u043B\u0430\u0439\u043A\u0438, \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u0438 \u0434\u0440\u0443\u0433\u043E\u0435." } }
      },
      "message": {
        "like": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u0441\u044F " }, { "t": 4, "k": "entity" }] } }
      }
    }
  },
  "mainPage": {
    "ranks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0435\u0439\u0442\u0438\u043D\u0433\u0438" } },
    "subscribe": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0437\u043D\u0430\u0432\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u043C\u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0435 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C" } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u0443\u0447\u0430\u0439\u0442\u0435 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443, \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442 \u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u0441\u0432\u043E\u044E \u043F\u043E\u0447\u0442\u0443! \u041F\u043E\u0434\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u0437\u0434\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u043D\u0435 \u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043D\u0438 \u043E\u0434\u043D\u043E\u0439 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438." } },
      "termsAgreement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042F \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0438 \u043F\u043E\u043D\u0438\u043C\u0430\u044E, \u0447\u0442\u043E \u043C\u043E\u0433\u0443 \u043E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442." } },
      "joinCommunity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u044F\u0439\u0442\u0435\u0441\u044C \u043A \u0441\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0443" } },
      "subscriptionSuccessfullyCompleted": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0430\u0448\u0430 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0430!" } }
    },
    "contactUs": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438" } },
      "sendSuccessfully": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E!" } },
        "text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u044B \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u0441\u043A\u043E\u0440\u0435\u0435." } }
      },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435, \u0438 \u043C\u044B \u0441\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0432 \u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u0432\u0440\u0435\u043C\u044F." } }
    }
  },
  "form": {
    "email": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430" } },
    "name": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043C\u044F" } },
    "emailAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B" } },
    "password": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0430\u0440\u043E\u043B\u044C" } },
    "confirmPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" } },
    "yourEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0430\u0448\u0430 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430" } },
    "enterYourX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 " }, { "t": 6, "k": { "t": 4, "k": "subj" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
    "iHaveReadTerms": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u042F \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B " }, { "t": 4, "k": "termLink" }, { "t": 3, "v": " \u0438 \u043F\u043E\u043D\u0438\u043C\u0430\u044E, \u0447\u0442\u043E \u044F \u043C\u043E\u0433\u0443 \u043E\u0442\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F." }] } },
    "displayName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043C\u044F \u0434\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F" } },
    "yourX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0412\u0430\u0448 " }, { "t": 6, "k": { "t": 4, "k": "field" }, "m": { "t": 8, "v": "lower" } }] } },
    "chooseX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 " }, { "t": 4, "k": "field" }] } },
    "chooseYourOwnNickname": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u0438\u043C\u044F" } },
    "chooseLanguage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u044F\u0437\u044B\u043A" } },
    "chooseTopics": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0442\u0435\u043C\u044B" } },
    "username": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" } },
    "bio": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0438\u043E\u0433\u0440\u0430\u0444\u0438\u044F" } },
    "website": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0435\u0431-\u0441\u0430\u0439\u0442" } },
    "birthday": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0435\u043D\u044C \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F" } },
    "rules": {
      "required": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435" } },
      "acceptTerms": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u043D\u0430\u0448\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u0438 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" } },
      "passwordStrengthValidation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0431\u0443\u043A\u0432\u044B \u0438 \u0446\u0438\u0444\u0440\u044B." } },
      "passwordDoestMatch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442" } },
      "maxXChars": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C " }, { "t": 4, "k": "max" }, { "t": 3, "v": " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432." }] } },
      "minXChar": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u0438\u043D\u0438\u043C\u0443\u043C " }, { "t": 4, "k": "min" }, { "t": 3, "v": " \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432." }] } },
      "invalidField": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F" } },
      "uploadX": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 " }, { "t": 4, "k": "entity" }] } },
      "minParamsRequred": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440." } },
      "maxFieldsReached": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C " }, { "t": 4, "k": "count" }, { "t": 3, "v": " \u043F\u043E\u043B\u0435\u0439" }] } },
      "validUrl": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u043E\u043B\u0435 \xAB" }, { "t": 4, "k": "field" }, { "t": 3, "v": "\xBB \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C URL" }] } },
      "validEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u043E\u043B\u0435 \xAB" }, { "t": 4, "k": "field" }, { "t": 3, "v": "\xBB \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u0430\u0434\u0440\u0435\u0441\u043E\u043C \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B" }] } }
    },
    "rows": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u0440\u043E\u043A\u0438" } },
    "noResultsFor": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041D\u0435\u0442 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0434\u043B\u044F \u2018" }, { "t": 4, "k": "text" }, { "t": 3, "v": "\u2019" }] } },
    "message": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" } },
    "id": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440" } },
    "status": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u0430\u0442\u0443\u0441" } },
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" } },
    "imageDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F" } },
    "shortDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" } },
    "seo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "SEO" } },
    "slug": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0427\u041F\u0423" } },
    "tags": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u0435\u0433\u0438" } },
    "tagsPlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0442\u0435\u04331, \u0442\u0435\u04332, \u0442\u0435\u04333..." } },
    "separateHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u2018,\u2019 \u0434\u043B\u044F \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u044F" } },
    "slugHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0415\u0441\u043B\u0438 \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u044D\u0442\u043E \u043F\u043E\u043B\u0435 \u043F\u0443\u0441\u0442\u044B\u043C, \u043E\u043D\u043E \u0431\u0443\u0434\u0435\u0442 \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438." } },
    "summaryAndDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u043D\u043D\u043E\u0442\u0430\u0446\u0438\u044F \u0438 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" } },
    "keywords": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043B\u043E\u0432\u0430" } },
    "metaTag": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0435\u0442\u0430-\u0442\u0435\u0433" } },
    "fullDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" } },
    "fillBothLanguagesHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u0442\u0430 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0434\u0432\u0435 \u044F\u0437\u044B\u043A\u043E\u0432\u044B\u0435 \u0432\u0435\u0440\u0441\u0438\u0438. \u041C\u044B \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0432\u0430\u043C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043E\u0431\u0435 \u0432\u0435\u0440\u0441\u0438\u0438 \u0432\u0440\u0443\u0447\u043D\u0443\u044E. \u0412 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u043E\u043C \u0441\u043B\u0443\u0447\u0430\u0435 \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \u043F\u0443\u0441\u0442\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438 \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438." } },
    "noXFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0434\u043B\u044F " }, { "t": 4, "k": "field" }] } }
  },
  "news": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u043E\u0432\u043E\u0441\u0442\u0438" } },
    "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0437\u043E\u0440 \u043A\u0440\u0443\u043F\u043D\u0435\u0439\u0448\u0438\u0445 \u0441\u043E\u0431\u044B\u0442\u0438\u0439, \u0444\u043E\u0440\u043C\u0438\u0440\u0443\u044E\u0449\u0438\u0445 \u0438\u043D\u0434\u0443\u0441\u0442\u0440\u0438\u044E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442." } },
    "otherNews": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0440\u0443\u0433\u0438\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438" } },
    "submitForm": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043E" } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u0438" } },
      "category": {
        "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044E \u0434\u043B\u044F \u0432\u0430\u0448\u0438\u0445 \u043D\u043E\u0432\u043E\u0441\u0442\u0435\u0439 \u0434\u043B\u044F \u0431\u043E\u043B\u0435\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F." } }
      }
    }
  },
  "articles": {
    "title": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u0430\u0442\u044C\u044F" }, { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u0430\u0442\u044C\u0438" }] } },
    "otherArticles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0440\u0443\u0433\u0438\u0435 \u0441\u0442\u0430\u0442\u044C\u0438" } },
    "linkCopied": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0441\u044B\u043B\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430!" } },
    "latestCryptoUpdates": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442" } },
    "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u043E\u0431\u0449\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442, \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u043C\u0438 \u0441\u043E \u0432\u0441\u0435\u0445 \u0443\u0433\u043E\u043B\u043A\u043E\u0432 \u043A\u0440\u0438\u043F\u0442\u043E-\u0432\u0441\u0435\u043B\u0435\u043D\u043D\u043E\u0439." } },
    "categories": {
      "recentlyAdded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u0434\u0430\u0432\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0435" } },
      "exchange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0438\u0440\u0436\u0430" } },
      "crypto": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430" } },
      "nft": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "NFT" } },
      "deFi": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DeFi" } },
      "gameFi": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GameFi" } },
      "education": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0440\u0430\u0437\u043E\u0432\u0430\u043D\u0438\u0435" } }
    },
    "submitForm": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0441\u0442\u0430\u0442\u044C\u044F" } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u0442\u0430\u0442\u044C\u044E" } },
      "topic": {
        "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u0435\u043C\u0430" } },
        "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0442\u0435\u043C\u044B \u0438\u0437 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0439 \u0441\u0442\u0430\u0442\u044C\u0438." } }
      }
    }
  },
  "dapp": {
    "mainnetContractLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442 Mainnet" } },
    "platform": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430" } },
      "ios": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "iOS" } },
      "android": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Android" } },
      "web": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0435\u0431" } }
    },
    "submitForm": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 " }, { "t": 6, "k": { "t": 7, "v": "coins.dappsAbbr" } }] } },
      "submitButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C " }, { "t": 6, "k": { "t": 7, "v": "coins.dap" }, "m": { "t": 8, "v": "upper" } }] } },
      "logo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041B\u043E\u0433\u043E\u0442\u0438\u043F" } },
      "logoDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430" } },
      "logoDescriptionLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430 (SEO)" } },
      "basicInformation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" } },
      "otherInformation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0440\u0443\u0433\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F" } },
      "contactDetails": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" } },
      "teamLocation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B" } },
      "contactEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u044B\u0439 email" } },
      "contactPersonsName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043C\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0433\u043E \u043B\u0438\u0446\u0430" } },
      "seoInfoHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u0442\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u043E\u0434\u0432\u0438\u0433\u0430\u0442\u044C \u0432\u0430\u0448 DAPP \u0438 \u043F\u043E\u0432\u044B\u0441\u0438\u0442\u044C \u0435\u0433\u043E \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u044B. \u041C\u044B \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0434\u043B\u044F \u043E\u0431\u0435\u0438\u0445 \u044F\u0437\u044B\u043A\u043E\u0432\u044B\u0445 \u0432\u0435\u0440\u0441\u0438\u0439." } },
      "yourDappName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0412\u0430\u0448\u0435 " }, { "t": 4, "k": "field" }, { "t": 3, "v": " " }, { "t": 4, "k": "name" }] } },
      "screenshotRequirement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F: \u043C\u0438\u043D\u0438\u043C\u0443\u043C 1 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435, \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C 5 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0439; \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F: 3 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F." } },
      "errors": {
        "logo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u043B\u043E\u0433\u043E\u0442\u0438\u043F" } },
        "language": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u044F\u0437\u044B\u043A" } },
        "platform": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0443" } },
        "screenshot": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442" } }
      }
    },
    "rankingTableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u043E\u043F Dapps" } },
    "shareDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u0435\u043B\u0438\u0442\u0435\u0441\u044C \u044D\u0442\u0438\u043C \u0441 \u0434\u0440\u0443\u0437\u044C\u044F\u043C\u0438" } },
      "hint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0426\u0435\u043D\u0430 <b>" }, { "t": 4, "k": "name" }, { "t": 3, "v": "</b> - " }, { "t": 4, "k": "price" }, { "t": 3, "v": "!" }] } },
      "orCopyLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043B\u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443" } }
    },
    "hints": {
      "volume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0424\u0438\u0430\u0442\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0432\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439 dapp \u0437\u0430 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0439 \u043F\u0435\u0440\u0438\u043E\u0434 \u0432\u0440\u0435\u043C\u0435\u043D\u0438" } },
      "balance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0449\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u043A\u0442\u0438\u0432\u043E\u0432 \u0432 \u0441\u043C\u0430\u0440\u0442-\u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0430\u0445 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F" } }
    }
  },
  "errors": {
    "credentialsIncorrect": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043D\u0435\u0432\u0435\u0440\u0435\u043D." } },
    "emailNotConfirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D." } },
    "emailAlreadyTaken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C email \u0443\u0436\u0435 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D." } },
    "incorrectCode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u0434" } },
    "invalidFileSize": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 \u2014 " }, { "t": 4, "k": "size" }] } },
    "invalidFileLimit": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C " }, { "t": 4, "k": "limit" }, { "t": 3, "v": " \u0444\u0430\u0439\u043B\u043E\u0432" }] } },
    "errorPage404": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u043F\u0441! \u041C\u044B \u043D\u0435 \u043C\u043E\u0436\u0435\u043C \u043D\u0430\u0439\u0442\u0438 \u044D\u0442\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 :(" } },
    "errorPage500": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u0442\u043E \u0431\u044B\u043B\u043E \u043D\u0435\u043E\u0436\u0438\u0434\u0430\u043D\u043D\u043E. \u041C\u044B \u043F\u044B\u0442\u0430\u0435\u043C\u0441\u044F \u0443\u0441\u0442\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443!" } },
    "e000": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0447\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435 \u0440\u0430\u0437." } }
  },
  "coins": {
    "dapp": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "Dapp" }, { "t": 2, "i": [{ "t": 3 }], "s": "Dapps" }] } },
    "dappsAbbr": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DAPPs" } },
    "cryptocurrency": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442" } },
    "dex": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DEX" } },
    "cex": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "CEX" } },
    "markets": {
      "tradingPairsOnXExchanges": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0422\u043E\u0440\u0433\u043E\u0432\u044B\u0435 \u043F\u0430\u0440\u044B \u043D\u0430 " }, { "t": 6, "k": { "t": 4, "k": "type" }, "m": { "t": 8, "v": "lower" } }, { "t": 3, "v": " \u0431\u0438\u0440\u0436\u0430\u0445" }] } },
      "centralized": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435" } },
      "decentralized": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435" } },
      "exchange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0438\u0440\u0436\u0430" } },
      "depthNegativeTwo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "-2% \u0413\u043B\u0443\u0431\u0438\u043D\u0430" } },
      "depthPositiveTwo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "+2% \u0413\u043B\u0443\u0431\u0438\u043D\u0430" } },
      "confidence": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u0432\u0435\u0440\u0438\u0435" } },
      "confidenceIndicators": {
        "high": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u044B\u0441\u043E\u043A\u043E\u0435" } },
        "low": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0438\u0437\u043A\u043E\u0435" } },
        "moderate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u043C\u0435\u0440\u0435\u043D\u043D\u043E\u0435" } }
      },
      "liquidityScore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0446\u0435\u043D\u043A\u0430 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438" } },
      "indexPrice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043D\u0434\u0435\u043A\u0441\u043D\u0430\u044F \u0446\u0435\u043D\u0430" } },
      "basis": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0430\u0437\u0430" } },
      "fundingRate": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u0430\u0432\u043A\u0430 \u0444\u0438\u043D\u0430\u043D\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" } },
      "openInterest": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441" } },
      "categories": {
        "perpetual": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435" } },
        "spot": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043F\u043E\u0442\u043E\u0432\u044B\u0435" } },
        "futures": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0424\u044C\u044E\u0447\u0435\u0440\u0441\u044B" } }
      },
      "allPairs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0412\u0441\u0435 " }, { "t": 6, "k": { "t": 7, "v": "coins.metrics.pairs" }, "m": { "t": 8, "v": "lower" } }] } }
    },
    "metrics": {
      "balance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0430\u043B\u0430\u043D\u0441" } },
      "balanceChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0431\u0430\u043B\u0430\u043D\u0441\u0430" } },
      "totalUsers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0441\u0435\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439" } },
      "userChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439" } },
      "change": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435" } },
      "volume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u044A\u0435\u043C" } },
      "volumeUSD": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u044A\u0435\u043C \u0432 USD" } },
      "volumeChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043E\u0431\u044A\u0435\u043C\u0430" } },
      "volumePercent": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u044A\u0435\u043C %" } },
      "other": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0440\u0443\u0433\u043E\u0435" } },
      "platform": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430" } },
      "category": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" } },
      "subcategory": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F" } },
      "blockchain": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u043B\u043E\u043A\u0447\u0435\u0439\u043D" } },
      "metricForXTime": { "t": 0, "b": { "t": 2, "i": [{ "t": 6, "k": { "t": 4, "k": "metric" }, "m": { "t": 8, "v": "capitalize" } }, { "t": 3, "v": " (" }, { "t": 4, "k": "time" }, { "t": 3, "v": ")" }] } },
      "marketShare": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u043B\u044F \u0440\u044B\u043D\u043A\u0430" } },
      "weeklyVisits": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0415\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F" } },
      "pair": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0430\u0440\u0430" } },
      "pairs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0430\u0440\u044B" } },
      "numCoins": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "# \u041C\u043E\u043D\u0435\u0442" } },
      "type": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u0438\u043F" } },
      "tvl": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "TVL" } },
      "launched": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0417\u0430\u043F\u0443\u0449\u0435\u043D" } },
      "blockchains": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u044B" } },
      "blockchainsCategory": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F \u0431\u043B\u043E\u043A\u0447\u0435\u0439\u043D\u043E\u0432" } },
      "token": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u043E\u043A\u0435\u043D" } },
      "exchangeToken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0422\u043E\u043A\u0435\u043D \u0431\u0438\u0440\u0436\u0438" } },
      "score": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0446\u0435\u043D\u043A\u0430" } },
      "p2p": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "P2P" } },
      "fiatSupported": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u0444\u0438\u0430\u0442\u043D\u044B\u0445 \u0432\u0430\u043B\u044E\u0442" } },
      "volumeGraph": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0413\u0440\u0430\u0444\u0438\u043A \u043E\u0431\u044A\u0435\u043C\u0430" } },
      "fees": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043C\u0438\u0441\u0441\u0438\u0438" } },
      "reserveData": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u0430\u043D\u043D\u044B\u0435 \u0440\u0435\u0437\u0435\u0440\u0432\u0430" } },
      "price": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0426\u0435\u043D\u0430" } },
      "pricePercentChange1H": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1\u0447 %" } },
      "pricePercentChange24H": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "24\u0447 %" } },
      "pricePercentChange7D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7\u0434 %" } },
      "pricePercentChange30D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "30\u0434 %" } },
      "pricePercentChange60D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "60\u0434 %" } },
      "pricePercentChange90D": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "90\u0434 %" } },
      "ytdPriceChangePercentage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "YTD %" } },
      "marketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F" } },
      "circulatingSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0426\u0438\u0440\u043A\u0443\u043B\u0438\u0440\u0443\u044E\u0449\u0435\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435" } },
      "mcap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mcap" } },
      "fullyDilluttedMarketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0440\u0430\u0437\u0432\u043E\u0434\u043D\u0435\u043D\u043D\u0430\u044F \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F" } },
      "volumeMCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u044A\u0435\u043C / \u0420\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F" } },
      "tvlFull": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0449\u0430\u044F \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C" } },
      "totalSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0449\u0435\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435" } },
      "maxSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438" } },
      "dominance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435" } },
      "high24H": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C \u0437\u0430 24\u0447" } },
      "low24H": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u0437\u0430 24\u0447" } },
      "chart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0413\u0440\u0430\u0444\u0438\u043A" } },
      "charts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0413\u0440\u0430\u0444\u0438\u043A\u0438" } },
      "suppl": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435" } },
      "audited": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0410\u0443\u0434\u0438\u0440\u043E\u0432\u0430\u043D" } },
      "priceChange": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0446\u0435\u043D\u044B" } },
      "contractBalance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0430\u043B\u0430\u043D\u0441 \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0430" } },
      "explanations": {
        "volumeMarketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u043E\u0441\u0442\u0438. \u0427\u0435\u043C \u0432\u044B\u0448\u0435 \u043A\u043E\u044D\u0444\u0444\u0438\u0446\u0438\u0435\u043D\u0442, \u0442\u0435\u043C \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u0435\u0435 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u0430, \u0447\u0442\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u043E\u0431\u043B\u0435\u0433\u0447\u0438\u0442\u044C \u0435\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0443/\u043F\u0440\u043E\u0434\u0430\u0436\u0443 \u043D\u0430 \u0431\u0438\u0440\u0436\u0435 \u0431\u043B\u0438\u0437\u043A\u043E \u043A \u0435\u0435 \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u0438. <br /><br /> \u041A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u044B \u0441 \u043D\u0438\u0437\u043A\u0438\u043C \u043A\u043E\u044D\u0444\u0444\u0438\u0446\u0438\u0435\u043D\u0442\u043E\u043C \u043C\u0435\u043D\u0435\u0435 \u043B\u0438\u043A\u0432\u0438\u0434\u043D\u044B \u0438, \u0441\u043A\u043E\u0440\u0435\u0435 \u0432\u0441\u0435\u0433\u043E, \u0438\u043C\u0435\u044E\u0442 \u043C\u0435\u043D\u0435\u0435 \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u044B\u0435 \u0440\u044B\u043D\u043A\u0438." } },
        "circulatingSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u043E\u043D\u0435\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0446\u0438\u0440\u043A\u0443\u043B\u0438\u0440\u0443\u044E\u0442 \u043D\u0430 \u0440\u044B\u043D\u043A\u0435 \u0438 \u043D\u0430\u0445\u043E\u0434\u044F\u0442\u0441\u044F \u0432 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0445 \u0440\u0443\u043A\u0430\u0445. \u042D\u0442\u043E \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u043E \u043F\u043B\u0430\u0432\u0430\u044E\u0449\u0438\u043C \u0430\u043A\u0446\u0438\u044F\u043C \u043D\u0430 \u0444\u043E\u043D\u0434\u043E\u0432\u043E\u043C \u0440\u044B\u043D\u043A\u0435." } },
        "marketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0449\u0430\u044F \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0446\u0438\u0440\u043A\u0443\u043B\u0438\u0440\u0443\u044E\u0449\u0435\u0433\u043E \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u044B. \u042D\u0442\u043E \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u043E \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u044F \u043D\u0430 \u0444\u043E\u043D\u0434\u043E\u0432\u043E\u043C \u0440\u044B\u043D\u043A\u0435. <br /><br /> \u0420\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F = \u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0446\u0435\u043D\u0430 x \u0426\u0438\u0440\u043A\u0443\u043B\u0438\u0440\u0443\u044E\u0449\u0435\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438" } },
        "fullyDilluttedMarketCap": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F, \u0435\u0441\u043B\u0438 \u0431\u044B \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0431\u044B\u043B\u043E \u0432 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438. <br /><br /> \u041F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0440\u0430\u0437\u0432\u043E\u0434\u043D\u0435\u043D\u043D\u0430\u044F \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F (FDMC) = \u0446\u0435\u043D\u0430 x \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435. \u0415\u0441\u043B\u0438 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442, FDMC = \u0446\u0435\u043D\u0430 x \u043E\u0431\u0449\u0435\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435. \u0415\u0441\u043B\u0438 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0438 \u043E\u0431\u0449\u0435\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0431\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u044B \u0438\u043B\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B, \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0440\u0430\u0437\u0432\u043E\u0434\u043D\u0435\u043D\u043D\u0430\u044F \u0440\u044B\u043D\u043E\u0447\u043D\u0430\u044F \u043A\u0430\u043F\u0438\u0442\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 - -." } },
        "volume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0435\u0440\u0430 \u0442\u043E\u0433\u043E, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u044B \u0431\u044B\u043B\u043E \u0442\u043E\u0440\u0433\u043E\u0432\u0430\u043D\u043E \u0437\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 24 \u0447\u0430\u0441\u0430." } },
        "totalSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0449\u0435\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 = \u041E\u0431\u0449\u0435\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0445 \u043C\u043E\u043D\u0435\u0442 - \u043C\u043E\u043D\u0435\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0431\u044B\u043B\u0438 \u0441\u043E\u0436\u0436\u0435\u043D\u044B (\u0435\u0441\u043B\u0438 \u0442\u0430\u043A\u043E\u0432\u044B\u0435 \u0438\u043C\u0435\u044E\u0442\u0441\u044F). \u042D\u0442\u043E \u0441\u0440\u0430\u0432\u043D\u0438\u043C\u043E \u0441 \u0430\u043A\u0446\u0438\u044F\u043C\u0438 \u0432 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043D\u0430 \u0444\u043E\u043D\u0434\u043E\u0432\u043E\u043C \u0440\u044B\u043D\u043A\u0435. <br /><br /> \u0415\u0441\u043B\u0438 \u043F\u0440\u043E\u0435\u043A\u0442 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u043B \u044D\u0442\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043E\u043D\u0438 \u043D\u0435 \u0431\u044B\u043B\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u044B CoinMarketCap, \u043E\u0431\u0449\u0435\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u201C--\u201D." } },
        "maxSupply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043C\u043E\u043D\u0435\u0442, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043A\u043E\u0433\u0434\u0430-\u043B\u0438\u0431\u043E \u0431\u0443\u0434\u0435\u0442 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0436\u0438\u0437\u043D\u0438 \u043A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u044B. \u042D\u0442\u043E \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u043E \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0440\u0430\u0437\u0432\u043E\u0434\u043D\u0435\u043D\u043D\u044B\u043C \u0430\u043A\u0446\u0438\u044F\u043C \u043D\u0430 \u0444\u043E\u043D\u0434\u043E\u0432\u043E\u043C \u0440\u044B\u043D\u043A\u0435. <br /><br /> \u0415\u0441\u043B\u0438 \u043F\u0440\u043E\u0435\u043A\u0442 \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u043B \u044D\u0442\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u043B\u0438 \u043E\u043D\u0438 \u043D\u0435 \u0431\u044B\u043B\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u044B CoinMarketCap, \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u201C--\u201D." } }
      },
      "spotTradingVolume": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u044A\u0435\u043C \u0441\u043F\u043E\u0442\u043E\u0432\u043E\u0439 \u0442\u043E\u0440\u0433\u043E\u0432\u043B\u0438" } },
      "totalAssets": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u0449\u0438\u0435 \u0430\u043A\u0442\u0438\u0432\u044B" } },
      "pricePerformance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0426\u0435\u043D\u043E\u0432\u044B\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438" } },
      "allTimeHigh": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C" } },
      "allTimeLow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0441\u0442\u043E\u0440\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043C\u0438\u043D\u0438\u043C\u0443\u043C" } },
      "turnover": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0431\u043E\u0440\u043E\u0442" } },
      "high": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ma\u043A\u0441" } },
      "low": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u0438\u043D" } }
    },
    "customizeMetricsDialog": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0434\u043E " }, { "t": 4, "k": "number" }, { "t": 3, "v": " \u043C\u0435\u0442\u0440\u0438\u043A" }] } },
      "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0439\u0442\u0435, \u0443\u0434\u0430\u043B\u044F\u0439\u0442\u0435 \u0438 \u0441\u043E\u0440\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u0442\u0430\u043A, \u043A\u0430\u043A \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E" } },
      "yourTable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412\u0430\u0448\u0430 \u0442\u0430\u0431\u043B\u0438\u0446\u0430" } },
      "fromLibraryOfOurMetrics": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0418\u0437 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u043D\u0430\u0448\u0438\u0445 \u043C\u0435\u0442\u0440\u0438\u043A" } }
    },
    "cryptocoins": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0440\u0438\u043F\u0442\u043E\u0432\u0430\u043B\u044E\u0442\u044B" } },
    "exchanges": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0438\u0440\u0436\u0438" } }
  },
  "terms": {
    "termsOfUse": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Terms of Use" } },
    "marketingUpdatesAgreement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042F \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0435 \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u043E\u0442 Dapp.expert." } },
    "agreement": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u044F, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 Dapp.expert " }, { "t": 4, "k": "termsLink" }, { "t": 3, "v": " \u0438 " }, { "t": 4, "k": "privacyLink" }, { "t": 3, "v": "." }] } },
    "general": {
      "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F" } },
      "createdAt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u0437\u0434\u0430\u043D\u043E: 18 \u0444\u0435\u0432, 2020" } },
      "content": {
        "0": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0411\u0429\u0410\u042F \u0418\u041D\u0424\u041E\u0420\u041C\u0410\u0426\u0418\u042F" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u0442\u043E \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0412\u0430\u0448\u0438\u043C \u0434\u043E\u0441\u0442\u0443\u043F \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0430. \u041A\u0430\u0436\u0434\u044B\u0439 \u0440\u0430\u0437, \u043A\u043E\u0433\u0434\u0430 \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0443, \u043E\u043D \u0431\u0435\u0437\u043E\u0433\u043E\u0432\u043E\u0440\u043E\u0447\u043D\u043E \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u0442\u044C \u0423\u0441\u043B\u043E\u0432\u0438\u044F, \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043D\u044B\u0435 \u043D\u0430 \u044D\u0442\u043E\u043C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435. \u0412\u0435\u0431-\u0441\u0430\u0439\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043F\u0440\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u044F \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u0439, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0449\u0438\u0445\u0441\u044F \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u043C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0435, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0432\u0441\u0435\u0445 \u0434\u0440\u0443\u0433\u0438\u0445 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u043F\u0440\u0430\u0432\u0438\u043B, \u043F\u043E\u043B\u0438\u0442\u0438\u043A (\u0432\u043A\u043B\u044E\u0447\u0430\u044F, \u043F\u043E\u043C\u0438\u043C\u043E \u043F\u0440\u043E\u0447\u0435\u0433\u043E, \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 Dapp.expert) \u0438 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u0440\u0435\u043C\u044F \u043E\u0442 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043C\u043E\u0436\u0435\u0442 \u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C Dapp.expert \u043D\u0430 \u044D\u0442\u043E\u043C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435 (\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u043D\u043E \u2014 \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435). \u0415\u0441\u043B\u0438 \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C \u043D\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 \u043A\u0430\u043A\u0438\u043C-\u043B\u0438\u0431\u043E \u0438\u0437 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0439, \u0438\u0437\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0445 \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0445 \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u0445, \u043E\u043D \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043B\u044E\u0431\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438, \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0438 \u0438\u0437\u0443\u0447\u0430\u044F Dapp.expert, \u0432\u044B \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u0442\u0435, \u0447\u0442\u043E:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert \u0431\u0443\u0434\u0435\u0442 \u0441\u0442\u0440\u0435\u043C\u0438\u0442\u044C\u0441\u044F \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0442\u044C \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0439 \u043D\u0430 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0435, \u043D\u043E \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u0441\u0442\u0438 \u043D\u0438\u043A\u0430\u043A\u043E\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0443\u044E \u0438\u043B\u0438 \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u0445. \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438 \u043F\u043E\u043D\u0438\u043C\u0430\u044E\u0442 \u0438 \u043F\u0440\u0438\u0437\u043D\u0430\u044E\u0442, \u0447\u0442\u043E \u043E\u043D\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u043B\u044E\u0431\u0443\u044E \u0438 \u0432\u0441\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0443\u044E \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435, \u043D\u0430 \u0441\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u0445 \u0438 \u0440\u0438\u0441\u043A. \u0412\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043D\u0430 \u0421\u0430\u0439\u0442\u0435 \u043D\u043E\u0441\u044F\u0442 \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440. \u041D\u0438 Dapp.expert, \u043D\u0438 \u043A\u0430\u043A\u0438\u0435-\u043B\u0438\u0431\u043E \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0438\u043B\u0438 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043B\u0438\u0446\u0430, \u043A\u0430\u043A\u0438\u043C-\u043B\u0438\u0431\u043E \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430, \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0442 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0445, \u043D\u0430\u043B\u043E\u0433\u043E\u0432\u044B\u0445, \u0442\u043E\u0440\u0433\u043E\u0432\u044B\u0445, \u044D\u043A\u043E\u043D\u043E\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0438/\u0438\u043B\u0438 \u043B\u044E\u0431\u044B\u0445 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u043E\u0432\u0435\u0442\u043E\u0432 \u0438\u043B\u0438 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0439, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u044C\u0441\u044F. \u042D\u0442\u043E \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442, \u0447\u0442\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0441 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0430 \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u043E\u0441\u043D\u043E\u0432\u044B \u0434\u043B\u044F \u0438\u043D\u0432\u0435\u0441\u0442\u0438\u0446\u0438\u043E\u043D\u043D\u043E\u0439 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438, \u0438 \u043D\u0438\u0447\u0442\u043E \u0432 \u044D\u0442\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u043E\u0448\u0438\u0431\u043E\u043A, \u0438\u0441\u043A\u0430\u0436\u0435\u043D\u0438\u0439 \u0438\u043B\u0438 \u0441\u0431\u043E\u0435\u0432." } },
            "": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u042D\u0442\u043E \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0412\u0430\u0448\u0438\u043C \u0434\u043E\u0441\u0442\u0443\u043F \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0430. \u041A\u0430\u0436\u0434\u044B\u0439 \u0440\u0430\u0437, \u043A\u043E\u0433\u0434\u0430 \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0443, \u043E\u043D \u0431\u0435\u0437\u043E\u0433\u043E\u0432\u043E\u0440\u043E\u0447\u043D\u043E \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0441\u044F \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u0442\u044C \u0423\u0441\u043B\u043E\u0432\u0438\u044F, \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043D\u044B\u0435 \u043D\u0430 \u044D\u0442\u043E\u043C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435. \u0412\u0435\u0431-\u0441\u0430\u0439\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043F\u0440\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u044F \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u0439, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0449\u0438\u0445\u0441\u044F \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u043C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0435, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0432\u0441\u0435\u0445 \u0434\u0440\u0443\u0433\u0438\u0445 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u0445 \u043F\u0440\u0430\u0432\u0438\u043B, \u043F\u043E\u043B\u0438\u0442\u0438\u043A (\u0432\u043A\u043B\u044E\u0447\u0430\u044F, \u043F\u043E\u043C\u0438\u043C\u043E \u043F\u0440\u043E\u0447\u0435\u0433\u043E, \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 Dapp.expert) \u0438 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u0440\u0435\u043C\u044F \u043E\u0442 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043C\u043E\u0436\u0435\u0442 \u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C Dapp.expert \u043D\u0430 \u044D\u0442\u043E\u043C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435 (\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u043D\u043E \u2014 \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435). \u0415\u0441\u043B\u0438 \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C \u043D\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u0441 \u043A\u0430\u043A\u0438\u043C-\u043B\u0438\u0431\u043E \u0438\u0437 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0439, \u0438\u0437\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0445 \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0445 \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u0445, \u043E\u043D \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442, \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043B\u044E\u0431\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438, \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u0438 \u0438\u0437\u0443\u0447\u0430\u044F Dapp.expert, \u0432\u044B \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u0442\u0435, \u0447\u0442\u043E:" } },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u043C\u0438 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430 \u0431\u0443\u0434\u0435\u0442 \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0442\u044C\u0441\u044F \u0432 \u0441\u0442\u0440\u043E\u0433\u043E\u043C \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 Dapp.expert, \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u043C \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435\u043C \u0438 \u0432\u0441\u0435\u043C\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u043C\u044B\u043C\u0438 \u0437\u0430\u043A\u043E\u043D\u0430\u043C\u0438 \u0438 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F\u043C\u0438 (\u0432\u043A\u043B\u044E\u0447\u0430\u044F, \u043F\u043E\u043C\u0438\u043C\u043E \u043F\u0440\u043E\u0447\u0435\u0433\u043E, \u043B\u044E\u0431\u044B\u0435 \u043C\u0435\u0441\u0442\u043D\u044B\u0435 \u0437\u0430\u043A\u043E\u043D\u044B \u0438\u043B\u0438 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u0412\u0430\u0448\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u0435, \u0448\u0442\u0430\u0442\u0435, \u0433\u043E\u0440\u043E\u0434\u0435 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u043E\u043C \u043F\u0440\u0430\u0432\u0438\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u043C \u0440\u0430\u0439\u043E\u043D\u0435, \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0432 \u0418\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435 \u0438 \u043F\u0440\u0438\u0435\u043C\u043B\u0435\u043C\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0432\u0441\u0435\u0445 \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u043C\u044B\u0445 \u0437\u0430\u043A\u043E\u043D\u043E\u0432, \u043A\u0430\u0441\u0430\u044E\u0449\u0438\u0445\u0441\u044F \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0438 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u044D\u043A\u0441\u043F\u043E\u0440\u0442\u0438\u0440\u0443\u0435\u043C\u044B\u0445 \u0438\u0437 \u0421\u0428\u0410 \u0438\u043B\u0438 \u0441\u0442\u0440\u0430\u043D\u044B, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0412\u044B \u043F\u0440\u043E\u0436\u0438\u0432\u0430\u0435\u0442\u0435)." } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0412\u0430\u043C\u0438 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u043D\u0430\u0440\u0443\u0448\u0430\u0442\u044C \u0438\u043B\u0438 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E \u043F\u0440\u0438\u0441\u0432\u0430\u0438\u0432\u0430\u0442\u044C \u043F\u0440\u0430\u0432\u0430 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043A\u0430\u043A\u043E\u0439-\u043B\u0438\u0431\u043E \u0442\u0440\u0435\u0442\u044C\u0435\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u044B." } }
            }
          }
        },
        "1": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0414\u041B\u042F \u0420\u0410\u0417\u0420\u0410\u0411\u041E\u0422\u0427\u0418\u041A\u041E\u0412" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u0434\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0443 \u043D\u0430 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0438/\u0438\u043B\u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435, \u043E\u043D \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0442\u044C\u0441\u044F \u0438 \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u0442\u044C \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u0423\u0441\u043B\u043E\u0432\u0438\u044F. Dapp.expert \u043C\u043E\u0436\u0435\u0442 \u0431\u0435\u0437 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0438 \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u201C\u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u201D \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043B\u0438\u0446\u043E \u0438\u043B\u0438 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E, \u0447\u044C\u0435 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435 Dapp.expert, \u0438\u043B\u0438 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043B\u0438\u0446\u043E \u0438\u043B\u0438 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u043E\u0434\u0430\u043B\u0438 \u0437\u0430\u044F\u0432\u043A\u0443 \u0432 Dapp.expert \u0434\u043B\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0438/\u0438\u043B\u0438 \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u044F \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435. \u041C\u044B \u043D\u0435 \u043D\u0435\u0441\u0435\u043C \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u043B\u044E\u0431\u044B\u0435 \u043F\u0440\u0438\u043D\u044F\u0442\u044B\u0435 \u0412\u0430\u043C\u0438 \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0438 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u0412\u044B \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043B\u0438 \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0435. \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0439\u0442\u0438 \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438, \u043A\u0443\u043F\u043E\u043D\u044B, \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0440\u0435\u043A\u043B\u0430\u043C\u0443 \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0430 Dapp.expert. Dapp.expert \u043C\u043E\u0436\u0435\u0442 \u0438\u043C\u0435\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u0435 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F \u0441 \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u0438\u0437 \u044D\u0442\u0438\u0445 \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446. Dapp.expert \u043D\u0435 \u043D\u0435\u0441\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u043B\u044E\u0431\u044B\u0435 \u0412\u0430\u0448\u0438 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0438 \u0441 \u044D\u0442\u0438\u043C\u0438 \u0442\u0440\u0435\u0442\u044C\u0438\u043C\u0438 \u043B\u0438\u0446\u0430\u043C\u0438. \u0415\u0441\u043B\u0438 \u0412\u044B \u0441\u043E\u0437\u0434\u0430\u0435\u0442\u0435 \u0443\u0447\u0435\u0442\u043D\u0443\u044E \u0437\u0430\u043F\u0438\u0441\u044C \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435, \u0412\u044B \u043D\u0435\u0441\u0435\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0441\u0432\u043E\u0435\u0439 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0438 \u0435\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E, \u0438 \u0412\u044B \u043D\u0435\u0441\u0435\u0442\u0435 \u043F\u043E\u043B\u043D\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0432\u0441\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u044F\u0442 \u043F\u043E\u0434 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u044C\u044E, \u0438 \u043B\u044E\u0431\u044B\u0435 \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0441 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u043E\u043C. \u0412\u044B \u043D\u0435 \u0434\u043E\u043B\u0436\u043D\u044B \u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0442\u044C \u0438 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0441\u0432\u043E\u0435\u0439 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432\u0432\u043E\u0434\u044F\u0449\u0438\u043C \u0432 \u0437\u0430\u0431\u043B\u0443\u0436\u0434\u0435\u043D\u0438\u0435 \u0438\u043B\u0438 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C, \u0432 \u0442\u043E\u043C \u0447\u0438\u0441\u043B\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u043E\u043C, \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044B\u043C \u0434\u043B\u044F \u0442\u043E\u0440\u0433\u043E\u0432\u043B\u0438 \u0438\u043C\u0435\u043D\u0435\u043C \u0438 \u0440\u0435\u043F\u0443\u0442\u0430\u0446\u0438\u0435\u0439 \u0434\u0440\u0443\u0433\u0438\u0445 \u043B\u0438\u0446, \u0438 Dapp.expert \u043C\u043E\u0436\u0435\u0442 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043B\u044E\u0431\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0438\u043B\u0438 \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u0435 \u0441\u043B\u043E\u0432\u043E, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043E\u043D \u0441\u0447\u0438\u0442\u0430\u0435\u0442 \u043D\u0435\u0443\u043C\u0435\u0441\u0442\u043D\u044B\u043C \u0438\u043B\u0438 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C, \u0438\u043B\u0438 \u0438\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043A \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 Dapp.expert. \u0412\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E \u0443\u0432\u0435\u0434\u043E\u043C\u0438\u0442\u044C Dapp.expert \u043E \u043B\u044E\u0431\u043E\u043C \u043D\u0435\u0441\u0430\u043D\u043A\u0446\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0412\u0430\u0448\u0435\u0439 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0438\u043B\u0438 \u043B\u044E\u0431\u044B\u0445 \u0434\u0440\u0443\u0433\u0438\u0445 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F\u0445 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438. Dapp.expert \u043D\u0435 \u043D\u0435\u0441\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u043B\u044E\u0431\u044B\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0438\u043B\u0438 \u0431\u0435\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u0412\u0430\u0448\u0435\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u044B, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0432\u0441\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0439 \u0443\u0449\u0435\u0440\u0431 \u043B\u044E\u0431\u043E\u0433\u043E \u0440\u043E\u0434\u0430, \u043F\u043E\u043D\u0435\u0441\u0435\u043D\u043D\u044B\u0439 \u0432 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0435 \u0442\u0430\u043A\u0438\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u0438\u043B\u0438 \u0431\u0435\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F. \u041A\u0430\u0436\u0434\u044B\u0439 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u0442 Dapp.expert, \u0447\u0442\u043E:" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0437\u0430 \u0441\u043E\u0431\u043E\u0439 \u043F\u0440\u0430\u0432\u043E \u0443\u0434\u0430\u043B\u044F\u0442\u044C \u043B\u044E\u0431\u044B\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E (\u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438, \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F, \u0430\u0432\u0430\u0442\u0430\u0440\u044B \u0438 \u0442. \u0434.) \u043F\u043E \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0438\u0447\u0438\u043D\u0435. Dapp.expert \u043D\u0435 \u043D\u0435\u0441\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u044B \u0438\u043B\u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F. Dapp.expert \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0435\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0412\u0430\u0448 \u0434\u043E\u0441\u0442\u0443\u043F \u043A\u043E \u0432\u0441\u0435\u043C\u0443 \u0438\u043B\u0438 \u043B\u044E\u0431\u043E\u0439 \u0447\u0430\u0441\u0442\u0438 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430 \u0432 \u043B\u044E\u0431\u043E\u0435 \u0432\u0440\u0435\u043C\u044F, \u0441 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0435\u043C \u043F\u0440\u0438\u0447\u0438\u043D\u044B \u0438\u043B\u0438 \u0431\u0435\u0437 \u043D\u0435\u0435, \u0441 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435\u043C \u0438\u043B\u0438 \u0431\u0435\u0437 \u043D\u0435\u0433\u043E, \u0441 \u043D\u0435\u043C\u0435\u0434\u043B\u0435\u043D\u043D\u044B\u043C \u0432\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0435\u043C \u0432 \u0441\u0438\u043B\u0443. \u0412\u0441\u0435 \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0433\u043E \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u043E \u0441\u0432\u043E\u0435\u043C\u0443 \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0443 \u0434\u043E\u043B\u0436\u043D\u044B \u043E\u0441\u0442\u0430\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u0441\u0438\u043B\u0435 \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0441\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u044F, \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u0432 \u0441\u0438\u043B\u0435 \u043F\u043E\u0441\u043B\u0435 \u0440\u0430\u0441\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u044F, \u0432\u043A\u043B\u044E\u0447\u0430\u044F, \u043F\u043E\u043C\u0438\u043C\u043E \u043F\u0440\u043E\u0447\u0435\u0433\u043E, \u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043E \u043F\u0440\u0430\u0432\u0435 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438, \u043E\u0442\u043A\u0430\u0437 \u043E\u0442 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0439, \u0432\u043E\u0437\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u0443\u0431\u044B\u0442\u043A\u043E\u0432 \u0438 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438. Dapp.expert \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0437\u0430 \u0441\u043E\u0431\u043E\u0439 \u043F\u0440\u0430\u0432\u043E \u0438\u0437\u043C\u0435\u043D\u044F\u0442\u044C \u0438\u043B\u0438 \u0437\u0430\u043C\u0435\u043D\u044F\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u0447\u0430\u0441\u0442\u044C \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0433\u043E \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F. \u0412\u044B \u043E\u0431\u044F\u0437\u0430\u043D\u044B \u043F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0421\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u0435 \u043D\u0430 \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439. Dapp.expert \u043D\u0435 \u043F\u0440\u0435\u0442\u0435\u043D\u0434\u0443\u0435\u0442 \u043D\u0430 \u043A\u0430\u043A\u0438\u0435-\u043B\u0438\u0431\u043E \u043F\u0440\u0430\u0432\u0430 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043D\u0430 \u043F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0435\u043D\u043D\u044B\u0435 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0430 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0438 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u043F\u0440\u0438\u0437\u043D\u0430\u044E\u0442 \u0438 \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u044E\u0442\u0441\u044F \u0441 \u0442\u0435\u043C, \u0447\u0442\u043E \u043E\u043D\u0438 \u043D\u0435\u0441\u0443\u0442 \u0435\u0434\u0438\u043D\u043E\u043B\u0438\u0447\u043D\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0443\u0449\u0435\u0440\u0431, \u043F\u0440\u0438\u0447\u0438\u043D\u0435\u043D\u043D\u044B\u0439 \u0438\u0445 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u043C\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C\u0438." } },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0432\u0430\u0448 \u0434\u043E\u0441\u0442\u0443\u043F \u043A Dapp.expert," } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u043B\u0438 \u043F\u0440\u0435\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0412\u0430\u0448\u0435\u0439 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438," } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043B\u044E\u0431\u043E\u0439 \u0412\u0430\u0448 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438\u0437 Dapp.expert. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0412\u0430\u043C\u0438 \u0421\u0435\u0440\u0432\u0438\u0441\u0430 \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442, \u0447\u0442\u043E \u0412\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 \u043C\u043E\u043D\u0438\u0442\u043E\u0440\u0438\u043D\u0433\u043E\u043C Dapp.expert \u0438 \u043E\u0446\u0435\u043D\u043A\u043E\u0439 Dapp.expert." } }
            },
            "list2": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0438\u0445 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0438 \u043A\u0430\u0436\u0434\u0430\u044F \u0435\u0433\u043E \u0447\u0430\u0441\u0442\u044C \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u043E\u0439 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0438\u043B\u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u0443\u0447\u0438\u043B \u0432\u0441\u0435 \u043F\u0440\u0430\u0432\u0430, \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0438, \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0435 \u0434\u043B\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F, \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0438 \u0447\u0442\u043E \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u0435\u0442 \u0438 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C \u043D\u0438\u043A\u0430\u043A\u043E\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0441\u043E \u0441\u0442\u043E\u0440\u043E\u043D\u044B Dapp.expert;" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0435 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F - \u0435\u0433\u043E \u0438\u043C\u044F, \u0444\u0430\u043C\u0438\u043B\u0438\u044F (\u0434\u043B\u044F \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043B\u0438\u0446\u0430) \u0438\u043B\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u043A\u043E\u0434 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u0441\u043B\u0443\u0436\u0435\u0431\u043D\u044B\u0439 \u0430\u0434\u0440\u0435\u0441, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B, \u0430\u0434\u0440\u0435\u0441 \u043A\u043E\u0448\u0435\u043B\u044C\u043A\u0430, \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u043E\u043B\u043D\u043E\u0439, \u0442\u043E\u0447\u043D\u043E\u0439 \u0438 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0439;" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043D\u0442\u0435\u043D\u0442 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441\u043F\u0430\u043C\u043E\u043C, \u043D\u0435 \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043E\u043C \u0438\u043B\u0438 \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u0438 \u043D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043D\u0435\u044D\u0442\u0438\u0447\u043D\u043E\u0433\u043E \u0438\u043B\u0438 \u043D\u0435\u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430, \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u043E\u0433\u043E \u0434\u043B\u044F \u043F\u0440\u0438\u0432\u043B\u0435\u0447\u0435\u043D\u0438\u044F \u0442\u0440\u0430\u0444\u0438\u043A\u0430 \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u044B \u0438\u043B\u0438 \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u044F \u0440\u0435\u0439\u0442\u0438\u043D\u0433\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0445 \u0441\u0430\u0439\u0442\u043E\u0432 \u0432 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C\u0430\u0445, \u0438\u043B\u0438 \u0434\u043B\u044F \u0441\u043E\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0438\u0445 \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 (\u0442\u0430\u043A\u0438\u0445 \u043A\u0430\u043A \u043A\u0430\u043A \u0444\u0438\u0448\u0438\u043D\u0433) \u0438\u043B\u0438 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u0435\u043B\u0435\u0439 \u0432 \u0437\u0430\u0431\u043B\u0443\u0436\u0434\u0435\u043D\u0438\u0435 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0441\u043F\u0443\u0444\u0438\u043D\u0433);" } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u043D\u0442\u0435\u043D\u0442 \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u043F\u0440\u0438\u0441\u0442\u043E\u0439\u043D\u044B\u043C, \u043A\u043B\u0435\u0432\u0435\u0442\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u0438\u043B\u0438 \u0434\u0438\u0444\u0444\u0430\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u043C, \u0440\u0430\u0437\u0436\u0438\u0433\u0430\u044E\u0449\u0438\u043C \u043D\u0435\u043D\u0430\u0432\u0438\u0441\u0442\u044C \u0438\u043B\u0438 \u043D\u0435\u043F\u0440\u0438\u0435\u043C\u043B\u0435\u043C\u044B\u043C \u043F\u043E \u0440\u0430\u0441\u043E\u0432\u043E\u043C\u0443 \u0438\u043B\u0438 \u044D\u0442\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u043C\u0443 \u043F\u0440\u0438\u0437\u043D\u0430\u043A\u0443, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043D\u0435 \u043D\u0430\u0440\u0443\u0448\u0430\u0435\u0442 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u043D\u0435\u043F\u0440\u0438\u043A\u043E\u0441\u043D\u043E\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0447\u0430\u0441\u0442\u043D\u043E\u0439 \u0436\u0438\u0437\u043D\u0438 \u0438\u043B\u0438 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u043A\u043E\u0439-\u043B\u0438\u0431\u043E \u0442\u0440\u0435\u0442\u044C\u0435\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u044B;" } }
            },
            "list3": {
              "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u0430\u0436\u0434\u044B\u0439 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043E\u0431\u044F\u0437\u0443\u0435\u0442\u0441\u044F \u043D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442 \u0434\u043B\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u044B, \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F, \u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0438\u043D\u043E\u0433\u043E \u0438\u043D\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438:" } },
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0438 \u0435\u0433\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C, \u043A\u043B\u0435\u0432\u0435\u0442\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u043C, \u0434\u0438\u0444\u0444\u0430\u043C\u0430\u0446\u0438\u043E\u043D\u043D\u044B\u043C, \u043F\u043E\u0440\u043D\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u043C \u0438\u043B\u0438 \u043D\u0435\u043F\u0440\u0438\u0441\u0442\u043E\u0439\u043D\u044B\u043C, \u043F\u0440\u043E\u043F\u0430\u0433\u0430\u043D\u0434\u0438\u0440\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u043E\u0434\u0441\u0442\u0440\u0435\u043A\u0430\u0435\u0442 \u043A \u043D\u0430\u0441\u0438\u043B\u0438\u044E, \u0442\u0435\u0440\u0440\u043E\u0440\u0438\u0437\u043C\u0443, \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F\u043C \u0438\u043B\u0438 \u043D\u0435\u043D\u0430\u0432\u0438\u0441\u0442\u0438 \u043F\u043E \u043F\u0440\u0438\u0437\u043D\u0430\u043A\u0443 \u0440\u0430\u0441\u044B, \u044D\u0442\u043D\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u043D\u043E\u0441\u0442\u0438, \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u043D\u043E\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u0438, \u0440\u0435\u043B\u0438\u0433\u0438\u043E\u0437\u043D\u044B\u0445 \u0443\u0431\u0435\u0436\u0434\u0435\u043D\u0438\u0439, \u0438\u043D\u0432\u0430\u043B\u0438\u0434\u043D\u043E\u0441\u0442\u0438, \u043F\u043E\u043B\u0430, \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u043E\u0441\u0442\u0438 \u0438\u043B\u0438 \u0441\u0435\u043A\u0441\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u0440\u0438\u0435\u043D\u0442\u0430\u0446\u0438\u0438, \u0438\u043B\u0438 \u0438\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C, \u043D\u0435\u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C \u043F\u043E \u0440\u0430\u0437\u0443\u043C\u043D\u043E\u043C\u0443 \u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0438\u044E Dapp.expert;" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043B\u044E\u0431\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u043E \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0442 \u0438\u043B\u0438 \u0443\u0449\u0435\u043C\u043B\u044F\u044E\u0442 \u043F\u0440\u0430\u0432\u0430 \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446, \u0432\u043A\u043B\u044E\u0447\u0430\u044F, \u043F\u043E\u043C\u0438\u043C\u043E \u043F\u0440\u043E\u0447\u0435\u0433\u043E, \u0430\u0432\u0442\u043E\u0440\u0441\u043A\u0438\u0435 \u043F\u0440\u0430\u0432\u0430, \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0442\u043E\u0432\u0430\u0440\u043D\u044B\u0435 \u0437\u043D\u0430\u043A\u0438, \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u043D\u0435\u043F\u0440\u0438\u043A\u043E\u0441\u043D\u043E\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0447\u0430\u0441\u0442\u043D\u043E\u0439 \u0436\u0438\u0437\u043D\u0438 \u0438\u043B\u0438 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C, \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0438\u043B\u0438 \u043B\u044E\u0431\u044B\u0435 \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u0440\u0430\u0432\u0430;" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043B\u044E\u0431\u043E\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043E \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043D\u0430\u0440\u0443\u0448\u0430\u0435\u0442 \u0438\u043B\u0438 \u043F\u0440\u043E\u0442\u0438\u0432\u043E\u0440\u0435\u0447\u0438\u0442 \u043A\u0430\u043A\u043E\u043C\u0443-\u043B\u0438\u0431\u043E \u0437\u0430\u043A\u043E\u043D\u0443, \u043F\u0440\u0430\u0432\u0438\u043B\u0443 \u0438\u043B\u0438 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044E \u0438\u043B\u0438 \u0438\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u044B\u043C;" } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043B\u044E\u0431\u043E\u0439 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B \u043E \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u043C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043B\u044E\u0431\u043E\u0439 \u0432\u0438\u0440\u0443\u0441, \u0442\u0440\u043E\u044F\u043D\u0441\u043A\u0443\u044E \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u043C\u0443, \u0448\u043F\u0438\u043E\u043D\u0441\u043A\u043E\u0435 \u041F\u041E, \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u043E\u0435 \u041F\u041E, \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u043E\u0435 \u041F\u041E, \u0431\u043E\u0442\u0430, \u0447\u0435\u0440\u0432\u044F \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u043E\u0439 \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u044B\u0439 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u0432\u0440\u0435\u0434\u0438\u0442\u044C \u0438\u043B\u0438 \u043D\u0430\u0440\u0443\u0448\u0438\u0442\u044C \u0440\u0430\u0431\u043E\u0442\u0443 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430 \u0438\u043B\u0438 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430 \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044F." } }
            }
          }
        },
        "2": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041E\u0422\u041A\u0410\u0417 \u041E\u0422 \u0413\u0410\u0420\u0410\u041D\u0422\u0418\u0419" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0430\u0439\u0442 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \xAB\u043A\u0430\u043A \u0435\u0441\u0442\u044C\xBB. \u041D\u0438 Dapp.expert, \u043D\u0438 \u0435\u0433\u043E \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0438 \u0438 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0430\u0440\u044B \u043D\u0435 \u0434\u0430\u044E\u0442 \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0439, \u0447\u0442\u043E \u0412\u0435\u0431-\u0441\u0430\u0439\u0442 \u0431\u0443\u0434\u0435\u0442 \u0431\u0435\u0437\u043E\u0448\u0438\u0431\u043E\u0447\u043D\u044B\u043C \u0438\u043B\u0438 \u0447\u0442\u043E \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043D\u0435\u043C\u0443 \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u043F\u0440\u0435\u0440\u044B\u0432\u043D\u044B\u043C. \u0412\u044B \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442\u0435, \u0447\u0442\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0435 \u0438\u043B\u0438 \u0438\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0435 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438\u043B\u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u0447\u0435\u0440\u0435\u0437 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442 \u043D\u0430 \u0441\u0432\u043E\u0435 \u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u0438\u0435 \u0438 \u0440\u0438\u0441\u043A. Dapp.expert \u0438\u043B\u0438 \u0435\u0433\u043E \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0438 \u0438\u043B\u0438 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0430\u0440\u044B \u043D\u0435 \u043D\u0435\u0441\u0443\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0432 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0438 \u043B\u044E\u0431\u043E\u0433\u043E \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044F \u043F\u043E \u043A\u0430\u043A\u043E\u043C\u0443-\u043B\u0438\u0431\u043E \u043A\u043E\u043D\u0442\u0440\u0430\u043A\u0442\u0443, \u043D\u0435\u0431\u0440\u0435\u0436\u043D\u043E\u0441\u0442\u0438, \u0441\u0442\u0440\u043E\u0433\u043E\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u043E\u0439 \u043F\u0440\u0430\u0432\u043E\u0432\u043E\u0439 \u0438\u043B\u0438 \u0441\u043F\u0440\u0430\u0432\u0435\u0434\u043B\u0438\u0432\u043E\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u0437\u0430:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert \u043D\u0435 \u043D\u0435\u0441\u0435\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432, \u0440\u0430\u0437\u043C\u0435\u0449\u0435\u043D\u043D\u044B\u0445 \u043D\u0430 \u0421\u0430\u0439\u0442\u0435. \u0412\u044B \u043D\u0435\u0441\u0435\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B\u0445 \u043C\u0435\u0440 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B \u0441\u0435\u0431\u044F \u0438 \u0441\u0432\u043E\u0438\u0445 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043D\u044B\u0445 \u0441\u0438\u0441\u0442\u0435\u043C \u043E\u0442 \u0432\u0438\u0440\u0443\u0441\u043E\u0432, \u0447\u0435\u0440\u0432\u0435\u0439, \u0442\u0440\u043E\u044F\u043D\u0441\u043A\u0438\u0445 \u043A\u043E\u043D\u0435\u0439 \u0438 \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u043E\u0433\u043E \u0438\u043B\u0438 \u0434\u0435\u0441\u0442\u0440\u0443\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0433\u043E. \u0412\u0435\u0431-\u0441\u0430\u0439\u0442 \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043E\u0441\u043A\u043E\u0440\u0431\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439, \u043D\u0435\u043F\u0440\u0438\u0441\u0442\u043E\u0439\u043D\u044B\u0439 \u0438\u043B\u0438 \u0438\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u043D\u0435\u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0449\u0438\u0439 \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043D\u0435\u0442\u043E\u0447\u043D\u043E\u0441\u0442\u0438, \u043E\u043F\u0435\u0447\u0430\u0442\u043A\u0438 \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043E\u0448\u0438\u0431\u043A\u0438. \u0412\u0435\u0431-\u0441\u0430\u0439\u0442 \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0442 \u043F\u0440\u0430\u0432\u043E \u043D\u0430 \u043D\u0435\u043F\u0440\u0438\u043A\u043E\u0441\u043D\u043E\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0447\u0430\u0441\u0442\u043D\u043E\u0439 \u0436\u0438\u0437\u043D\u0438 \u0438\u043B\u0438 \u043F\u0440\u0430\u0432\u043E \u043D\u0430 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u043E\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435, \u0438\u043B\u0438 \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0442 \u043F\u0440\u0430\u0432\u0430 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u043F\u0440\u0430\u0432\u0430 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446, \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430, \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0440\u0435\u0433\u0443\u043B\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C\u0438 \u0438\u043B\u0438 \u043D\u0435\u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C\u0438." } },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043B\u044E\u0431\u044B\u0435 \u043E\u0441\u043E\u0431\u044B\u0435, \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u0435 \u0438\u043B\u0438 \u043A\u043E\u0441\u0432\u0435\u043D\u043D\u044B\u0435 \u0443\u0431\u044B\u0442\u043A\u0438;3" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0437\u0430 \u043F\u0440\u0435\u0440\u044B\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u043E\u0442\u0435\u0440\u044E \u0438\u043B\u0438 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445;" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043B\u043B\u044E\u0431\u044B\u0435 \u0441\u0443\u043C\u043C\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u044E\u0442 \u0441\u0431\u043E\u0440\u044B, \u0443\u043F\u043B\u0430\u0447\u0435\u043D\u043D\u044B\u0435 \u0412\u0430\u043C\u0438 Dapp.expert \u043F\u043E \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u043C\u0443 \u0441\u043E\u0433\u043B\u0430\u0448\u0435\u043D\u0438\u044E \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u0432\u0435\u043D\u0430\u0434\u0446\u0430\u0442\u0438 \u043C\u0435\u0441\u044F\u0446\u0435\u0432 \u0434\u043E \u043F\u043E\u0434\u0430\u0447\u0438 \u0438\u0441\u043A\u0430." } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dapp.expert \u043E\u0442\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0442 \u043B\u044E\u0431\u043E\u0439 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u0431\u0435\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0438 \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u043B\u044E\u0431\u043E\u0433\u043E \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446 \u0432 \u0441\u0432\u044F\u0437\u0438 \u0441 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430 \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u043C. \u0412\u044B\u0448\u0435\u0438\u0437\u043B\u043E\u0436\u0435\u043D\u043D\u043E\u0435 \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u0442\u043E\u0439 \u043C\u0435\u0440\u0435, \u0432 \u043A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u043C\u044B\u043C \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u043E\u043C. \u041F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438 \u043D\u0435\u0441\u0443\u0442 \u043F\u043E\u043B\u043D\u0443\u044E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u0435\u0446\u0435\u043D\u0442\u0440\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439, \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435." } }
            }
          }
        },
        "3": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u041E\u041D\u0422\u0410\u041A\u0422\u042B" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0414\u043B\u044F \u0442\u043E\u0433\u043E, \u0447\u0442\u043E\u0431\u044B \u0437\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441, \u0440\u0435\u0448\u0438\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 Dapp.expert \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435 " }, { "t": 4, "k": "email" }, { "t": 3, "v": "." }] } }
          }
        }
      }
    },
    "privacy": {
      "title": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }, { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }] } },
      "createdAt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u043E\u0437\u0434\u0430\u043D\u043E: 24 \u043D\u043E\u044F\u0431\u0440\u044F 2021 \u0433." } },
      "content": {
        "0": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1. \u041E\u0411\u0429\u0410\u042F \u0418\u041D\u0424\u041E\u0420\u041C\u0410\u0426\u0418\u042F" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.1 \u041D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0443\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0441\u0430\u0439\u0442\u0430. \u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u0432\u044B \u0442\u0430\u043A\u0436\u0435 \u0434\u0430\u0435\u0442\u0435 DappExpert \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435 \u043D\u0430 \u0441\u0431\u043E\u0440, \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0438 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u0435 \u0432\u0430\u0448\u0438\u0445 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u0443\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.2 DappExpert \u0443\u0432\u0430\u0436\u0430\u0435\u0442 \u0432\u0430\u0448\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438 \u043E\u0431\u044F\u0437\u0443\u0435\u0442\u0441\u044F \u0437\u0430\u0449\u0438\u0449\u0430\u0442\u044C \u0435\u0435, \u0441\u043E\u0431\u043B\u044E\u0434\u0430\u044F \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0443\u044E \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438. \u042D\u0442\u0430 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043E\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442:" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.2.1 \u0442\u0438\u043F\u044B \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u044B \u043C\u043E\u0436\u0435\u043C \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u043E\u0442 \u0432\u0430\u0441, \u043A\u043E\u0433\u0434\u0430 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0435 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043D\u0430\u0448\u0435\u043C\u0443 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0443 \u0438 \u0434\u0440\u0443\u0433\u0438\u043C \u043E\u043D\u043B\u0430\u0439\u043D-\u0441\u0435\u0440\u0432\u0438\u0441\u0430\u043C \u0438\u043B\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0435 \u0438\u0445; " } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.2.2 \u043D\u0430\u0448\u0438 \u043C\u0435\u0442\u043E\u0434\u044B \u0441\u0431\u043E\u0440\u0430, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F, \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F, \u0437\u0430\u0449\u0438\u0442\u044B \u0438 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u044F \u044D\u0442\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438." } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "1.3 \u042D\u0442\u0430 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u043A \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0448\u0438 \u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F\u0445, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0445 \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0448\u0438 \u0423\u0441\u043B\u0443\u0433\u0438 \u0438\u043B\u0438 \u0432 \u0441\u0432\u044F\u0437\u0438 \u0441 \u043D\u0438\u043C\u0438." } }
          }
        },
        "1": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "2. \u041F\u0420\u0418\u041C\u0415\u0427\u0410\u041D\u0418\u0415 \u0414\u041B\u042F \u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u0415\u0419 \u0417\u0410 \u041F\u0420\u0415\u0414\u0415\u041B\u0410\u041C\u0418 \u0421\u0428\u0410" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0415\u0441\u043B\u0438 \u0432\u044B \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0435\u0441\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C \u0421\u0430\u0439\u0442\u0430 \u0438\u0437 \u0421\u0428\u0410, \u043F\u043E\u0441\u0435\u0449\u0430\u044F \u0421\u0430\u0439\u0442 \u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044F \u043D\u0430\u043C \u0434\u0430\u043D\u043D\u044B\u0435, \u0432\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0430\u0435\u0442\u0435 \u0438 \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 \u0442\u0435\u043C, \u0447\u0442\u043E \u0432\u0430\u0448\u0438 \u041B\u0438\u0447\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043C\u043E\u0433\u0443\u0442 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u0446\u0435\u043B\u0435\u0439, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u0432 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438. \u041A\u0440\u043E\u043C\u0435 \u0442\u043E\u0433\u043E, \u0432\u0430\u0448\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043C\u043E\u0433\u0443\u0442 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0432 \u0441\u0442\u0440\u0430\u043D\u0435, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043E\u043D\u0438 \u0431\u044B\u043B\u0438 \u0441\u043E\u0431\u0440\u0430\u043D\u044B, \u0438 \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u0442\u0440\u0430\u043D\u0430\u0445, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0421\u0428\u0410, \u0433\u0434\u0435 \u0437\u0430\u043A\u043E\u043D\u044B, \u043A\u0430\u0441\u0430\u044E\u0449\u0438\u0435\u0441\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u0435\u0435 \u0441\u0442\u0440\u043E\u0433\u0438\u043C\u0438, \u0447\u0435\u043C \u0437\u0430\u043A\u043E\u043D\u044B \u0432\u0430\u0448\u0435\u0439 \u0441\u0442\u0440\u0430\u043D\u044B. \u041F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044F \u0441\u0432\u043E\u0438 \u0434\u0430\u043D\u043D\u044B\u0435, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u043D\u0430 \u0442\u0430\u043A\u0443\u044E \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0443." } }
          }
        },
        "2": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "3. \u041F\u0420\u0418\u041C\u0415\u0427\u0410\u041D\u0418\u0415 \u041E \u0414\u0415\u0422\u042F\u0425" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u044B \u043D\u0435 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043D\u0430\u043C\u0435\u0440\u0435\u043D\u043D\u043E \u041B\u0438\u0447\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E\u0442 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439 \u043C\u043B\u0430\u0434\u0448\u0435 14 \u043B\u0435\u0442. \u0415\u0441\u043B\u0438 \u0440\u0435\u0431\u0435\u043D\u043E\u043A \u043C\u043B\u0430\u0434\u0448\u0435 14 \u043B\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u041B\u0438\u0447\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438, \u0438 \u043C\u044B \u0443\u0437\u043D\u0430\u0435\u043C, \u0447\u0442\u043E \u041B\u0438\u0447\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439 \u0440\u0435\u0431\u0435\u043D\u043A\u0430 \u043C\u043B\u0430\u0434\u0448\u0435 13 \u043B\u0435\u0442, \u043C\u044B \u043F\u043E\u043F\u044B\u0442\u0430\u0435\u043C\u0441\u044F \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u043A\u0430\u043A \u043C\u043E\u0436\u043D\u043E \u0431\u044B\u0441\u0442\u0440\u0435\u0435. \u0415\u0441\u043B\u0438 \u0432\u044B \u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0435, \u0447\u0442\u043E \u0443 \u043D\u0430\u0441 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043A\u0430\u043A\u0438\u0435-\u043B\u0438\u0431\u043E \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E\u0442 \u0440\u0435\u0431\u0435\u043D\u043A\u0430 \u043C\u043B\u0430\u0434\u0448\u0435 14 \u043B\u0435\u0442, \u0441\u0432\u044F\u0436\u0438\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443, " }, { "t": 4, "k": "email" }, { "t": 3, "v": "." }] } }
          }
        },
        "3": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4. \u041A\u0410\u041A\u0423\u042E \u0418\u041D\u0424\u041E\u0420\u041C\u0410\u0426\u0418\u042E \u041C\u042B \u0421\u041E\u0411\u0418\u0420\u0410\u0415\u041C \u041E\u0422 \u041D\u0410\u0428\u0418\u0425 \u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u0415\u0419" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.1 DappExpert \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0441\u0432\u043E\u0438\u0445 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u0445. \u041C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u044B \u0434\u043B\u044F \u043D\u0430\u0448\u0435\u0439 \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0438 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u044E\u0442 \u043D\u0430\u043C \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.2 \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C, \u043C\u043E\u0436\u0435\u0442 \u0432\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0434\u043E\u0431\u0440\u043E\u0432\u043E\u043B\u044C\u043D\u043E \u0432\u0432\u043E\u0434\u0438\u0442, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u0421\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0430 DappExpert. DappExpert \u0442\u0430\u043A\u0436\u0435 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0434\u043B\u044F \u0446\u0435\u043B\u0435\u0439, \u0438\u0437\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0445 \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044F \u043D\u043E\u0432\u044B\u0435 \u0423\u0441\u043B\u0443\u0433\u0438 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E \u0438\u043B\u0438 \u0437\u043D\u0430\u043A\u043E\u043C\u044F \u0435\u0433\u043E \u0441 \u043D\u043E\u0432\u044B\u043C\u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u044F\u043C\u0438 \u043D\u0430 \u0421\u0430\u0439\u0442\u0435." } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.3 \u041C\u044B \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u0442\u0430\u043A\u0438\u0435 \u043A\u0430\u043A Google Analytics. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F Google Analytics, \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0432\u0430\u0448\u0438\u0445 \u0440\u0435\u0448\u0435\u043D\u0438\u044F\u0445 \u0438 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F\u0445 \u043F\u0440\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0438 \u043D\u0430\u0448\u0435\u0439 \u043E\u043D\u043B\u0430\u0439\u043D-\u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B." } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.4 \u041C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0434\u0432\u0430 \u0442\u0438\u043F\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E\u0442 \u043D\u0430\u0448\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0438 \u043E \u043D\u0438\u0445, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E:" } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.4.1 \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0432\u044B \u043D\u0430\u043C \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0435 \u0438 \u043C\u044B \u043C\u043E\u0436\u0435\u043C \u0412\u0430\u0441 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C;" } },
            "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.4.2 \u041B\u043E\u0433-\u0444\u0430\u0439\u043B\u044B. \u041A\u0430\u043A \u0438 \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u043E\u0432, \u043C\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u0435\u0435 \u0432 \u0444\u0430\u0439\u043B\u0430\u0445 \u0436\u0443\u0440\u043D\u0430\u043B\u0430. \u042D\u0442\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0432\u043A\u043B\u044E\u0447\u0430\u0435\u0442 IP-\u0430\u0434\u0440\u0435\u0441\u0430, \u0442\u0438\u043F \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430, \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430 (\xABISP\xBB), \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 / \u0432\u044B\u0445\u043E\u0434\u0430, \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u043E\u043D\u043D\u0443\u044E \u0441\u0438\u0441\u0442\u0435\u043C\u0443, \u0434\u0430\u0442\u0443 / \u0432\u0440\u0435\u043C\u044F \u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u0442\u043E\u043A\u0430 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0439. \u041C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0437\u0430 \u0442\u0435\u043D\u0434\u0435\u043D\u0446\u0438\u0439, \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0421\u0430\u0439\u0442\u0430, \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043D\u0430 \u0421\u0430\u0439\u0442\u0435, \u0441\u0431\u043E\u0440\u0430 \u0434\u0435\u043C\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u043D\u0430\u0448\u0435\u0439 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0439 \u0431\u0430\u0437\u0435 \u0432 \u0446\u0435\u043B\u043E\u043C \u0438 \u0431\u043E\u043B\u0435\u0435 \u0442\u043E\u0447\u043D\u043E\u0439 \u0430\u0434\u0430\u043F\u0442\u0430\u0446\u0438\u0438 \u043D\u0430\u0448\u0438\u0445 \u0421\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u043A \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u044F\u043C \u043D\u0430\u0448\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439." } },
            "6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.4.3 Cookies. \u041A\u0430\u043A \u0438 \u043C\u043D\u043E\u0433\u0438\u0435 \u043E\u043D\u043B\u0430\u0439\u043D-\u0441\u0435\u0440\u0432\u0438\u0441\u044B, \u043C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0444\u0430\u0439\u043B\u044B cookie \u0434\u043B\u044F \u0441\u0431\u043E\u0440\u0430 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438. \xAB\u0424\u0430\u0439\u043B\u044B cookie\xBB - \u044D\u0442\u043E \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u0444\u0440\u0430\u0433\u043C\u0435\u043D\u0442\u044B \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u043D\u0430 \u0436\u0435\u0441\u0442\u043A\u0438\u0439 \u0434\u0438\u0441\u043A \u0432\u0430\u0448\u0435\u0433\u043E \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0430 \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0430. \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043A\u0430\u043A \u0441\u0435\u0430\u043D\u0441\u043E\u0432\u044B\u0435 \u0444\u0430\u0439\u043B\u044B cookie (\u0441\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0438\u0441\u0442\u0435\u043A\u0430\u0435\u0442 \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F \u0432\u0435\u0431-\u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430), \u0442\u0430\u043A \u0438 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B cookie (\u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0432\u0430\u0448\u0435\u043C \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0435 \u0434\u043E \u0442\u0435\u0445 \u043F\u043E\u0440, \u043F\u043E\u043A\u0430 \u0432\u044B \u0438\u0445 \u043D\u0435 \u0443\u0434\u0430\u043B\u0438\u0442\u0435), \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u043C \u0431\u043E\u043B\u0435\u0435 \u043B\u0438\u0447\u043D\u044B\u0439 \u0438 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043E\u043F\u044B\u0442 \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u043D\u0430\u0448\u0438\u043C \u0441\u0430\u0439\u0442\u043E\u043C. \u042D\u0442\u043E\u0442 \u0442\u0438\u043F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0421\u0430\u0439\u0442 \u0431\u043E\u043B\u0435\u0435 \u043F\u043E\u043B\u0435\u0437\u043D\u044B\u043C \u0434\u043B\u044F \u0432\u0430\u0441 \u0438 \u0430\u0434\u0430\u043F\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u043D\u0430\u043C\u0438 \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u0432\u0430\u0448\u0438\u043C\u0438 \u043E\u0441\u043E\u0431\u044B\u043C\u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430\u043C\u0438 \u0438 \u043F\u043E\u0442\u0440\u0435\u0431\u043D\u043E\u0441\u0442\u044F\u043C\u0438." } },
            "7": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5 \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0432 \u043D\u0430\u0448\u0438\u0445 \u0421\u0435\u0440\u0432\u0438\u0441\u0430\u0445 \u0438\u043B\u0438 \u0441 \u0438\u0445 \u043F\u043E\u043C\u043E\u0449\u044C\u044E, \u043C\u043E\u0436\u0435\u0442 \u0432\u043A\u043B\u044E\u0447\u0430\u0442\u044C:" } },
            "8": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.1 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E: \u0418\u043C\u044F, \u0444\u0430\u043C\u0438\u043B\u0438\u044F, \u043B\u043E\u0433\u0438\u043D, \u043F\u0430\u0440\u043E\u043B\u044C \u043E\u0442 dappexpert, \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B, \u043D\u043E\u043C\u0435\u0440 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u044B \u0441\u0432\u044F\u0437\u0438.\n\u041C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u043C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u043C \u0444\u0443\u043D\u043A\u0446\u0438\u044F\u043C \u043D\u0430\u0448\u0438\u0445 \u0421\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u0438 \u043F\u0440\u043E\u0438\u043D\u0444\u043E\u0440\u043C\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0430\u0441 \u043E \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0435\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438, \u043A\u0430\u0441\u0430\u044E\u0449\u0435\u0439\u0441\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0430\u0448\u0438\u0445 \u0421\u0435\u0440\u0432\u0438\u0441\u043E\u0432." } },
            "9": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.2 \u041F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F: \u0432\u0430\u0448\u0438 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438, \u0442\u0430\u043A\u0438\u0435 \u043A\u0430\u043A \u0447\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441 \u0438 \u044F\u0437\u044B\u043A; \u041C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0447\u0442\u043E\u0431\u044B \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0432\u0430\u0448\u0435 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C." } },
            "10": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.3 \u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F: \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0432\u044B \u0434\u0435\u043B\u0430\u043B\u0438, \u0438 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0432\u0430\u043C\u0438 \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B; \u041C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0447\u0442\u043E\u0431\u044B \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0432\u0430\u0448\u0435 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u043C \u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u043C \u0431\u043E\u043B\u0435\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u0423\u0441\u043B\u0443\u0433\u0438." } },
            "11": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.4 \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435: \u043A\u0430\u043A \u0434\u043E\u043B\u0433\u043E \u0432\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438 \u043D\u0430\u0448\u0438 \u0423\u0441\u043B\u0443\u0433\u0438, \u043A\u0430\u043A\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u0432\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043B\u0438 \u0438 \u0442.\u0434.; \u041C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u044D\u0442\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0447\u0442\u043E\u0431\u044B \u0430\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F \u043D\u0430\u0448\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0438 \u0443\u043B\u0443\u0447\u0448\u0430\u0442\u044C \u043D\u0430\u0448\u0438 \u0423\u0441\u043B\u0443\u0433\u0438." } },
            "12": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.5 \u0415\u0441\u043B\u0438 \u0432\u044B \u043E\u0441\u0442\u0430\u0432\u0438\u0442\u0435 \u043D\u0430\u043C \u043E\u0442\u0437\u044B\u0432 \u0438\u043B\u0438 \u0441\u0432\u044F\u0436\u0435\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435, \u043C\u044B \u0441\u043E\u0431\u0435\u0440\u0435\u043C \u0432\u0430\u0448\u0435 \u0438\u043C\u044F \u0438 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043B\u044E\u0431\u043E\u0439 \u0434\u0440\u0443\u0433\u043E\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442, \u0432\u043A\u043B\u044E\u0447\u0435\u043D\u043D\u044B\u0439 \u0432 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u043C \u043E\u0442\u0432\u0435\u0442." } },
            "13": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.6 \u0414\u0430\u043D\u043D\u044B\u0435 \u043E \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0438: \u043C\u044B \u043C\u043E\u0436\u0435\u043C \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0432\u0430\u0448\u0435\u043C \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0438, \u0435\u0441\u043B\u0438 \u0432\u044B \u0434\u0430\u043B\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0435 \u0441\u0432\u043E\u0435\u043C\u0443 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C\u0443 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0443 \u0438\u043B\u0438 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0443 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0442\u0430\u043A\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043D\u0430 \u044D\u0442\u043E\u043C \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435 \u0438\u043B\u0438 \u043A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u0435. \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u0438, \u0447\u0442\u043E\u0431\u044B \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u043C\u0438 \u0421\u0435\u0440\u0432\u0438\u0441\u043E\u0432, \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044F \u0432\u0430\u043C \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u043D\u0443\u044E \u0440\u0435\u043A\u043B\u0430\u043C\u0443." } },
            "14": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.7 \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u044F\u0445: \u0435\u0441\u043B\u0438 \u0432\u044B \u0441\u043E\u0432\u0435\u0440\u0448\u0430\u0435\u0442\u0435 \u043F\u043B\u0430\u0442\u0435\u0436\u0438 \u0438\u043B\u0438 \u043F\u043E\u043A\u0443\u043F\u043A\u0438 \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0448\u0438 \u0423\u0441\u043B\u0443\u0433\u0438, \u043C\u044B \u043C\u043E\u0436\u0435\u043C \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0438 \u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0432\u0430\u0441 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0432\u0430\u0448\u0438\u0445 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0444\u043E\u0440\u043C \u0434\u043B\u044F \u0431\u0443\u0434\u0443\u0449\u0438\u0445 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439;" } },
            "15": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "4.5.8 \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u0430\u044F \u043E\u0442 \u0432\u0430\u0441, \u043E \u0434\u0440\u0443\u0433\u0438\u0445. \u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u0430\u044F \u043E\u0442 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0445 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439. \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0438 / \u0438\u043B\u0438 \u0410\u043D\u043E\u043D\u0438\u043C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E \u0432\u0430\u0441 \u043E\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u044E\u0442 \u043D\u0430\u0448\u0438 \u0423\u0441\u043B\u0443\u0433\u0438 \u0447\u0435\u0440\u0435\u0437 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u043D\u044B\u0439 \u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u043D\u044B\u0439 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442, \u0438\u043B\u0438 \u043E\u0442 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E\u0442 \u0441\u0432\u043E\u0438 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u0438 / \u0438\u043B\u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0421\u0430\u0439\u0442\u0435." } }
          }
        },
        "4": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5. \u041A\u0410\u041A \u041C\u042B \u0418\u0421\u041F\u041E\u041B\u042C\u0417\u0423\u0415\u041C \u041F\u0415\u0420\u0421\u041E\u041D\u0410\u041B\u042C\u041D\u042B\u0415 \u0414\u0410\u041D\u041D\u042B\u0415" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.1 \u041A\u0430\u043A \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u044B, \u043C\u044B \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0447\u0442\u043E\u0431\u044B \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u0432\u0430\u0448 \u0432\u0438\u0437\u0438\u0442 \u043A \u043D\u0430\u043C \u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0431\u043E\u043B\u0435\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442. \u041C\u044B \u0443\u0432\u0430\u0436\u0430\u0435\u043C \u0432\u0430\u0448\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0438 \u043D\u0438\u043A\u043E\u043C\u0443 \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0435\u043C \u0432\u0430\u0448\u0443 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0437\u0430 \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435\u043C \u0441\u043B\u0443\u0447\u0430\u0435\u0432, \u043A\u043E\u0433\u0434\u0430 \u044D\u0442\u043E \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.2 DappExpert \u043E\u0431\u044F\u0437\u0443\u0435\u0442\u0441\u044F \u0445\u0440\u0430\u043D\u0438\u0442\u044C \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0438\u043E\u0434\u0430, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u043E\u0433\u043E \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u043D\u043E \u043D\u0435 \u0434\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u043C\u0438 \u0437\u0430\u043A\u043E\u043D\u0430\u043C\u0438 \u0438 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F\u043C\u0438 \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u0446\u0435\u043B\u0435\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0414\u0430\u043D\u043D\u044B\u0445. \u041C\u044B \u0431\u0443\u0434\u0435\u043C \u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u043E\u0442 \u0432\u0430\u0441, \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0443\u043C 5 / \u043F\u044F\u0442\u0438 / \u043B\u0435\u0442 \u0438\u043B\u0438 \u043C\u0435\u043D\u044C\u0448\u0435, \u0435\u0441\u043B\u0438 \u043E\u043D\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043D\u0443\u0436\u043D\u0430 \u0434\u043B\u044F \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432\u0430\u043C \u0423\u0441\u043B\u0443\u0433 DappExpert. \u041F\u043E \u0438\u0441\u0442\u0435\u0447\u0435\u043D\u0438\u0438 \u044D\u0442\u043E\u0433\u043E \u0441\u0440\u043E\u043A\u0430 \u043C\u044B \u043E\u0431\u044F\u0437\u0443\u0435\u043C\u0441\u044F \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u043B\u044E\u0431\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043C\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u043E\u0442 \u0432\u0430\u0441.\n\u041C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0432\u0430\u0448\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C:" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.12 \u0421\u0432\u043E\u0434\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0438 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F, \u043A\u043E\u0442\u043E\u0440\u0430\u044F \u043D\u0435 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u0435\u0442 \u0432\u0430\u0441 \u043B\u0438\u0447\u043D\u043E, \u043C\u043E\u0436\u0435\u0442 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0440\u0430\u0437\u043D\u044B\u043C\u0438 \u0441\u043F\u043E\u0441\u043E\u0431\u0430\u043C\u0438. \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, DappExpert \u043C\u043E\u0436\u0435\u0442 \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u044F\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0432\u0430\u0448\u0438\u0445 \u0448\u0430\u0431\u043B\u043E\u043D\u0430\u0445 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043D\u0430 \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0435 \u0441 \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u043E\u0439 \u043E\u0442 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043C\u043E\u0447\u044C \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u043D\u0430\u0448 \u0441\u0430\u0439\u0442 \u0438 \u0423\u0441\u043B\u0443\u0433\u0438 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0447\u0442\u043E\u0431\u044B \u0443\u0437\u043D\u0430\u0442\u044C, \u043A\u0430\u043A\u0438\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u043E\u0441\u0435\u0449\u0430\u044E\u0442 \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E \u0438\u043B\u0438 \u043A\u0430\u043A\u0438\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u043D\u0430\u0445\u043E\u0434\u044F\u0442 \u043D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u043F\u0440\u0438\u0432\u043B\u0435\u043A\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u043C\u0438). \u041C\u044B \u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u043C \u0437\u0430 \u0441\u043E\u0431\u043E\u0439 \u043F\u0440\u0430\u0432\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0430\u043D\u043E\u043D\u0438\u043C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u043B\u044E\u0431\u044B\u0445 \u0446\u0435\u043B\u0435\u0439 \u0438 \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0430\u043D\u043E\u043D\u0438\u043C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439." } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.3.1 \u0414\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438 \u0423\u0441\u043B\u0443\u0433, \u0442\u0430\u043A\u0438\u0445 \u043A\u0430\u043A \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0438 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u043D\u0430\u0448\u0438\u0445 \u0423\u0441\u043B\u0443\u0433;" } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.3.2 \u0414\u043B\u044F \u043F\u043E\u0432\u044B\u0448\u0435\u043D\u0438\u044F \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430 \u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u043D\u0430\u0448\u0438\u0445 \u0423\u0441\u043B\u0443\u0433, \u0432\u043A\u043B\u044E\u0447\u0430\u044F \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0449\u0435\u043D\u0438\u0435 \u043C\u043E\u0448\u0435\u043D\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0438 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u043D\u0430\u0448\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439;" } },
            "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.3.3 \u0414\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 \u0438 \u0440\u0435\u043A\u043B\u0430\u043C\u044B \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u0432\u0430\u0448\u0438\u043C\u0438 \u043F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0435\u043D\u0438\u044F\u043C\u0438 \u0438 \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430\u043C\u0438;" } },
            "6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.3.4 \u0414\u043B\u044F \u0441\u0432\u044F\u0437\u0438 \u0441 \u0432\u0430\u043C\u0438 \u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u043D\u043E\u0432\u044B\u0445 \u0444\u0443\u043D\u043A\u0446\u0438\u044F\u0445 \u0438 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F\u0445 \u043D\u0430\u0448\u0438\u0445 \u0423\u0441\u043B\u0443\u0433;" } },
            "7": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.3.5 \u0414\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043E\u043F\u044B\u0442\u0430 \u043D\u0430 \u043D\u0430\u0448\u0435\u043C \u0441\u0430\u0439\u0442\u0435 \u0438 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u0445;" } },
            "8": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.3.6 \u0414\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0438 \u0430\u043D\u0430\u043B\u0438\u0437\u0430 \u0442\u0440\u0430\u043D\u0437\u0430\u043A\u0446\u0438\u0439, \u0435\u0441\u043B\u0438 \u0432\u044B \u0441\u043E\u0432\u0435\u0440\u0448\u0430\u0435\u0442\u0435 \u043F\u043E\u043A\u0443\u043F\u043A\u0438 \u0438\u043B\u0438 \u043F\u043B\u0430\u0442\u0435\u0436\u0438 \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0448 \u0441\u0430\u0439\u0442." } },
            "9": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "5.4 \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435, \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0435 \u0447\u0435\u0440\u0435\u0437 \u0444\u0430\u0439\u043B\u044B cookie \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0430\u043D\u0430\u043B\u043E\u0433\u0438\u0447\u043D\u044B\u0435 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438, \u0434\u043B\u044F \u043E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u044F \u0438 \u0430\u043D\u0430\u043B\u0438\u0437\u0430 \u0442\u0435\u043D\u0434\u0435\u043D\u0446\u0438\u0439, \u0440\u0430\u0431\u043E\u0442\u044B \u0441\u0430\u0439\u0442\u0430 \u0438 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043E\u043F\u044B\u0442\u0430. \u042D\u0442\u043E \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043D\u0430\u043C \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0442\u044C \u0431\u043E\u043B\u0435\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0435 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0438 \u0443\u043B\u0443\u0447\u0448\u0430\u0442\u044C \u043D\u0430\u0448\u0438 \u0423\u0441\u043B\u0443\u0433\u0438." } },
            "list1": {
              "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0438 \u0437\u0430\u0449\u0438\u0442\u044B \u0432\u0430\u0448\u0435\u0439 \u0423\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432 \u043D\u0430\u0448\u0435\u0439 \u0441\u0435\u0442\u0438;" } },
              "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0412\u0430\u0441, \u043A\u0430\u043A \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0430\u0448\u0435\u0439 \u0441\u0438\u0441\u0442\u0435\u043C\u044B;" } },
              "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0442\u044C \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u043D\u043E\u0435 \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043D\u0430\u0448\u0435\u0433\u043E \u0421\u0430\u0439\u0442\u0430 \u0438 \u0423\u0441\u043B\u0443\u0433;" } },
              "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441 \u043D\u0430\u0448\u0438\u043C \u0441\u0430\u0439\u0442\u043E\u043C \u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438;" } },
              "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\u0430\u043C \u043F\u0440\u0438\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u043E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u043D\u0430 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0432\u0430\u0448\u0435\u0439 \u0443\u0447\u0435\u0442\u043D\u043E\u0439 \u0437\u0430\u043F\u0438\u0441\u0438;" } },
              "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0437\u0430\u0449\u0438\u0449\u0430\u0442\u044C \u0432\u0430\u0441 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u043E\u0442 \u043B\u044E\u0431\u043E\u0433\u043E \u043F\u043E\u0432\u0435\u0434\u0435\u043D\u0438\u044F, \u043D\u0430\u0440\u0443\u0448\u0430\u044E\u0449\u0435\u0433\u043E \u0423\u0441\u043B\u043E\u0432\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F, \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0449\u0430\u0442\u044C \u0437\u043B\u043E\u0443\u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u043F\u0440\u0435\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u043B\u044E\u0431\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F;" } },
              "6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0432\u0430\u043C \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u0438\u0432\u043D\u044B\u0435 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435, \u0442\u0430\u043A\u0438\u0435 \u043A\u0430\u043A \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u043F\u043E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0438\u043B\u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0435 \u0438 \u043E\u0431\u0441\u043B\u0443\u0436\u0438\u0432\u0430\u043D\u0438\u044E;" } },
              "7": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043E\u0442\u0432\u0435\u0447\u0430\u0442\u044C \u043D\u0430 \u0432\u0430\u0448\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u0438\u043C \u043A\u0430\u043D\u0430\u043B\u0430\u043C \u0441\u0432\u044F\u0437\u0438" } },
              "8": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u043D\u0443\u044E \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443 \u043F\u043E \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u0435, \u043E\u043F\u0440\u043E\u0441\u044B, \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u044B\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0441 \u043D\u0430\u0448\u0438\u043C\u0438 \u0423\u0441\u043B\u0443\u0433\u0430\u043C\u0438 \u0438 \u0434\u043B\u044F \u0434\u0440\u0443\u0433\u0438\u0445 \u043C\u0430\u0440\u043A\u0435\u0442\u0438\u043D\u0433\u043E\u0432\u044B\u0445 \u0446\u0435\u043B\u0435\u0439 \u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438. \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0430\u0448\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u043D\u0430\u0448\u0438\u0445 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0438 \u0443\u0441\u043B\u0443\u0433, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0442\u043E\u0432\u0430\u0440\u043E\u0432 \u0438 \u0443\u0441\u043B\u0443\u0433 \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u043E\u0433\u0443\u0442 \u0432\u0430\u0441 \u0437\u0430\u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043E\u0432\u0430\u0442\u044C." } }
            }
          }
        },
        "5": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "6. \u0420\u0410\u0421\u041A\u0420\u042B\u0422\u0418\u0415 \u0414\u0410\u041D\u041D\u042B\u0425" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DappExpert \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0432\u0430\u0441 \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C \u0441 \u0446\u0435\u043B\u044C\u044E \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0432\u0430\u043C \u0438\u043B\u0438 \u0441\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0435\u0439 \u0440\u0435\u043A\u043B\u0430\u043C\u0435." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041C\u044B \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0435\u043C \u0432\u0430\u0448\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u043A\u0430\u043A \u043E\u043F\u0438\u0441\u0430\u043D\u043E \u043D\u0438\u0436\u0435 \u0438 \u043A\u0430\u043A \u043E\u043F\u0438\u0441\u0430\u043D\u043E \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u0440\u0430\u0437\u0434\u0435\u043B\u0430\u0445 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438." } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0421\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0438 \u0443\u0441\u043B\u0443\u0433. \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0442\u044C \u0432\u0430\u0448\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u043C \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430\u043C \u0443\u0441\u043B\u0443\u0433, \u0447\u0442\u043E\u0431\u044B: \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0432\u0430\u043C \u0423\u0441\u043B\u0443\u0433\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0432\u0430\u043C \u0447\u0435\u0440\u0435\u0437 \u043D\u0430\u0448 \u0421\u0430\u0439\u0442; \u043F\u0440\u043E\u0432\u043E\u0434\u0438\u0442\u044C \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u044F \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430; \u0434\u043B\u044F \u043E\u0431\u043B\u0435\u0433\u0447\u0435\u043D\u0438\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0443\u0447\u0435\u0442\u043D\u044B\u0445 \u0437\u0430\u043F\u0438\u0441\u0435\u0439; \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443; \u0438 / \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0434\u0440\u0443\u0433\u0438\u0435 \u0443\u0441\u043B\u0443\u0433\u0438 \u041A\u043E\u043C\u043F\u0430\u043D\u0438\u0438." } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0430\u044F \u0440\u0435\u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0438\u0437\u0430\u0446\u0438\u044F. \u041C\u044B \u043C\u043E\u0436\u0435\u043C \u0434\u0435\u043B\u0438\u0442\u044C\u0441\u044F \u043D\u0435\u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u0438\u043B\u0438 \u0432\u0441\u0435\u043C\u0438 \u0432\u0430\u0448\u0438\u043C\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0432 \u0441\u0432\u044F\u0437\u0438 \u0438\u043B\u0438 \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u0435\u0440\u0435\u0433\u043E\u0432\u043E\u0440\u043E\u0432 \u043F\u043E \u043B\u044E\u0431\u044B\u043C \u0441\u0434\u0435\u043B\u043A\u0430\u043C \u0441\u043B\u0438\u044F\u043D\u0438\u044F, \u0444\u0438\u043D\u0430\u043D\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, \u043F\u0440\u0438\u043E\u0431\u0440\u0435\u0442\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0440\u043E\u0441\u043F\u0443\u0441\u043A\u0430, \u0438\u043B\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u0443\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439, \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0441 \u043F\u0440\u043E\u0434\u0430\u0436\u0435\u0439, \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0435\u0439, \u043E\u0442\u0447\u0443\u0436\u0434\u0435\u043D\u0438\u0435\u043C \u0438\u043B\u0438 \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u0435\u043C \u0432\u0441\u0435\u0433\u043E \u0438\u043B\u0438 \u0447\u0430\u0441\u0442\u0438 \u043D\u0430\u0448\u0435\u0433\u043E \u0431\u0438\u0437\u043D\u0435\u0441\u0430 \u0438\u043B\u0438 \u0430\u043A\u0442\u0438\u0432\u043E\u0432. \u0412 \u0441\u043B\u0443\u0447\u0430\u0435 \u043D\u0435\u0441\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0438\u043B\u0438 \u0431\u0430\u043D\u043A\u0440\u043E\u0442\u0441\u0442\u0432\u0430 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u044B \u043A\u0430\u043A \u0431\u0438\u0437\u043D\u0435\u0441-\u0430\u043A\u0442\u0438\u0432. \u0415\u0441\u043B\u0438 \u0434\u0440\u0443\u0433\u0430\u044F \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u043F\u0440\u0438\u043E\u0431\u0440\u0435\u0442\u0430\u0435\u0442 \u043D\u0430\u0448\u0443 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044E, \u0431\u0438\u0437\u043D\u0435\u0441 \u0438\u043B\u0438 \u0430\u043A\u0442\u0438\u0432\u044B, \u044D\u0442\u0430 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u044F \u0431\u0443\u0434\u0435\u0442 \u0432\u043B\u0430\u0434\u0435\u0442\u044C \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u043C\u0438 \u043D\u0430\u043C\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438 \u0438 \u043F\u0440\u0438\u043C\u0435\u0442 \u043D\u0430 \u0441\u0435\u0431\u044F \u043F\u0440\u0430\u0432\u0430 \u0438 \u043E\u0431\u044F\u0437\u0430\u043D\u043D\u043E\u0441\u0442\u0438 \u0432 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0438 \u0432\u0430\u0448\u0438\u0445 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445, \u043A\u0430\u043A \u043E\u043F\u0438\u0441\u0430\u043D\u043E \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438." } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0412 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C\u0438 \u0437\u0430\u043A\u043E\u043D\u043E\u0434\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432\u0430. \u041D\u0435\u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E \u043E\u0442 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A\u043E\u0439 \u0432\u044B\u0431\u043E\u0440 \u0432\u044B \u0441\u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u0432 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u0438 \u0441\u0432\u043E\u0438\u0445 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 (\u043A\u0430\u043A \u043E\u043F\u0438\u0441\u0430\u043D\u043E \u043D\u0438\u0436\u0435). \u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u043F\u043E\u0432\u0435\u0441\u0442\u043A\u043E\u0439 \u0432 \u0441\u0443\u0434 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u0438\u043C \u0441\u0443\u0434\u0435\u0431\u043D\u044B\u043C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u043C. \u0410 \u0442\u0430\u043A\u0436\u0435 \u043A\u043E\u0433\u0434\u0430 \u043C\u044B \u0434\u043E\u0431\u0440\u043E\u0441\u043E\u0432\u0435\u0441\u0442\u043D\u043E \u043F\u043E\u043B\u0430\u0433\u0430\u0435\u043C, \u0447\u0442\u043E \u044D\u0442\u043E \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0435\u0434\u043E\u0442\u0432\u0440\u0430\u0442\u0438\u0442\u044C \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0443-\u043B\u0438\u0431\u043E \u043D\u0435\u043C\u0438\u043D\u0443\u0435\u043C\u043E\u0433\u043E \u0432\u0440\u0435\u0434\u0430." } },
            "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041F\u0440\u043E\u0447\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F. \u041C\u044B \u0442\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u0435\u043C \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044C \u0432\u0430\u0448\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F \u0446\u0435\u043B\u0438, \u0434\u043B\u044F \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u0432\u044B \u0438\u0445 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442\u0435; \u0434\u043B\u044F \u043B\u044E\u0431\u044B\u0445 \u0434\u0440\u0443\u0433\u0438\u0445 \u0446\u0435\u043B\u0435\u0439, \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043D\u0430\u043C\u0438 \u043F\u0440\u0438 \u0435\u0433\u043E \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0438; \u0438\u043B\u0438 \u0441 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F." } }
          }
        },
        "6": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7. \u041F\u0420\u0410\u0412\u0410 \u041F\u041E\u041B\u042C\u0417\u041E\u0412\u0410\u0422\u0415\u041B\u0415\u0419" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043D\u0430 \u0421\u0430\u0439\u0442\u0435 \u0438\u043C\u0435\u0435\u0442 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0435 \u043F\u0440\u0430\u0432\u0430:" } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1.1 \u0437\u043D\u0430\u0442\u044C, \u0447\u0442\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u0438 \u0441 \u043A\u0430\u043A\u043E\u0439 \u0446\u0435\u043B\u044C\u044E \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0438\u0437 \u0435\u0433\u043E  \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445;" } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1.2 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u0442\u044C \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445;" } },
            "3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.1.3 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u0442\u044C \u043E\u0442 DappExpert \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043F\u043E \u043E\u0434\u043D\u043E\u0439 \u0438\u0437 \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0445 \u043F\u0440\u0438\u0447\u0438\u043D;" } },
            "4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.2 \u041B\u044E\u0431\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u0438 \u0437\u0430\u043A\u0430\u0437\u044B, \u043A\u0430\u0441\u0430\u044E\u0449\u0438\u0435\u0441\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0432 \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u043C \u0432\u0438\u0434\u0435 \u0432 DappExpert, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u0443\u044E \u0432 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 (\u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u0430\u044F \u043F\u043E\u0447\u0442\u0430). \u0420\u044F\u0434\u043E\u043C \u0441 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u043C \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442, \u0443\u0434\u043E\u0441\u0442\u043E\u0432\u0435\u0440\u044F\u044E\u0449\u0438\u0439 \u043B\u0438\u0447\u043D\u043E\u0441\u0442\u044C, \u0438\u043B\u0438 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0435\u0431\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0445 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432, \u0435\u0441\u043B\u0438 \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0435 \u043F\u043E\u0434\u0430\u043D \u043D\u0435\u043F\u043E\u0441\u0440\u0435\u0434\u0441\u0442\u0432\u0435\u043D\u043D\u043E \u0432 \u043F\u0440\u0438\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0438 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F, \u043A\u043E\u0433\u0434\u0430 \u0435\u0441\u0442\u044C \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0435\u0433\u043E \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u043E\u0432\u0430\u0442\u044C." } },
            "5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.3 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0438\u043C\u0435\u0435\u0442 \u043F\u0440\u0430\u0432\u043E \u043F\u043E\u0442\u0440\u0435\u0431\u043E\u0432\u0430\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0432\u0441\u0435\u0445 \u0414\u0430\u043D\u043D\u044B\u0445 \u043E \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435, \u0445\u0440\u0430\u043D\u044F\u0449\u0438\u0445\u0441\u044F \u0432 DappExpert." } },
            "6": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4 \u041A\u043E\u0433\u0434\u0430 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0441\u0432\u043E\u0438\u0445 \u0414\u0430\u043D\u043D\u044B\u0445, DappExpert \u043E\u0431\u044F\u0437\u0443\u0435\u0442\u0441\u044F \u0431\u0435\u0437 \u043D\u0435\u043E\u043F\u0440\u0430\u0432\u0434\u0430\u043D\u043D\u043E\u0439 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438 \u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435 \u041B\u0438\u0447\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u0435\u0441\u043B\u0438 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043E\u0434\u043D\u043E \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0439:" } },
            "7": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.1 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043D\u0443\u0436\u043D\u044B \u0432 \u0441\u0432\u044F\u0437\u0438 \u0441 \u0446\u0435\u043B\u044F\u043C\u0438, \u0434\u043B\u044F \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u043E\u043D\u0438 \u0431\u044B\u043B\u0438 \u0441\u043E\u0431\u0440\u0430\u043D\u044B \u0438\u043B\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u044B \u0438\u043D\u044B\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C;" } },
            "8": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.2 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0442\u043C\u0435\u043D\u044F\u0435\u0442 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430, \u0438 \u043F\u0440\u0438 \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u043F\u0440\u0430\u0432\u043E\u0432\u044B\u0445 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0439 \u0434\u043B\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438;" } },
            "9": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.3 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0432\u043E\u0437\u0440\u0430\u0436\u0430\u0435\u0442 \u043F\u0440\u043E\u0442\u0438\u0432 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438 \u0441\u0432\u043E\u0438\u0445 \u0414\u0430\u043D\u043D\u044B\u0445 \u0438 DappExpert \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u043A\u043E\u043D\u043D\u044B\u0435 \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0434\u0430\u043B\u044C\u043D\u0435\u0439\u0448\u0435\u0439 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0438;" } },
            "10": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.4.4 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0431\u044B\u043B\u0438 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u044B \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E;" } },
            "11": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.5 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0438\u043C\u0435\u0435\u0442 \u043F\u0440\u0430\u0432\u043E \u043F\u043E\u0442\u0440\u0435\u0431\u043E\u0432\u0430\u0442\u044C, \u0447\u0442\u043E\u0431\u044B DappExpert \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u043B \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0414\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0432 \u043E\u0434\u043D\u043E\u043C \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0441\u043B\u0443\u0447\u0430\u0435\u0432:" } },
            "12": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.5.1 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0441\u043F\u0430\u0440\u0438\u0432\u0430\u0435\u0442 \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0438\u043E\u0434\u0430, \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u044E\u0449\u0435\u0433\u043E DappExpert \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445;" } },
            "13": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.5.2 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0414\u0430\u043D\u043D\u044B\u0445 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u0437\u0430\u043A\u043E\u043D\u043D\u043E\u0439, \u0438 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0432\u043E\u0437\u0440\u0430\u0436\u0430\u0435\u0442 \u043F\u0440\u043E\u0442\u0438\u0432 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0414\u0430\u043D\u043D\u044B\u0445 \u0438 \u0432\u043C\u0435\u0441\u0442\u043E \u044D\u0442\u043E\u0433\u043E \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u044F \u0438\u0445 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F;" } },
            "14": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.6 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0441 \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0438\u043B\u0438 \u0434\u043B\u044F \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F, \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0438\u043B\u0438 \u0437\u0430\u0449\u0438\u0442\u044B \u0441\u0443\u0434\u0435\u0431\u043D\u044B\u0445 \u0438\u0441\u043A\u043E\u0432 \u0438\u043B\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u044B \u043F\u0440\u0430\u0432 \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u0438\u043B\u0438 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0433\u043E \u043B\u0438\u0446\u0430 \u0438\u043B\u0438 \u043F\u043E \u043F\u0440\u0438\u0447\u0438\u043D\u0430\u043C \u0432\u0430\u0436\u043D\u043E\u0433\u043E \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0433\u043E \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0430." } },
            "15": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.7 DappExpert \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430 \u0434\u043E\u043B\u0436\u0435\u043D \u043E\u0442\u0432\u0435\u0442\u0438\u0442\u044C \u0438 \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0435 \u0432 \u0437\u0430\u043F\u0440\u043E\u0441\u0435 \u0448\u0430\u0433\u0438 \u0438\u043B\u0438 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C \u0432 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438 \u0441 \u0443\u043A\u0430\u0437\u0430\u043D\u0438\u0435\u043C \u043F\u0440\u0438\u0447\u0438\u043D \u043E\u0442\u043A\u0430\u0437\u0430 \u043D\u0435 \u043F\u043E\u0437\u0434\u043D\u0435\u0435, \u0447\u0435\u043C \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 30 (\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u0438) \u0434\u043D\u0435\u0439 \u0441 \u0434\u0430\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F. \u041F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0439 \u0441\u0440\u043E\u043A \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0440\u043E\u0434\u043B\u0435\u043D \u0435\u0449\u0435 \u043D\u0430 2 (\u0434\u0432\u0430) \u043C\u0435\u0441\u044F\u0446\u0430 \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0441\u043B\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0438 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u0412 \u044D\u0442\u043E\u043C \u0441\u043B\u0443\u0447\u0430\u0435, \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 30 (\u0442\u0440\u0438\u0434\u0446\u0430\u0442\u0438) \u0434\u043D\u0435\u0439 \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u0430 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0437\u0430\u044F\u0432\u043A\u0438 DappExpert \u0438\u043D\u0444\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043E \u043B\u044E\u0431\u043E\u043C \u0442\u0430\u043A\u043E\u043C \u043F\u0440\u043E\u0434\u043B\u0435\u043D\u0438\u0438 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043F\u0440\u0438\u0447\u0438\u043D\u043E\u0439 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u0438." } },
            "16": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8 DappExpert \u043C\u043E\u0436\u0435\u0442 \u043D\u0435 \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0432 \u0441\u043B\u0443\u0447\u0430\u044F\u0445, \u043A\u043E\u0433\u0434\u0430 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0438\u0442\u044C:" } },
            "17": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8.1 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u044B\u0445 \u044E\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u0441\u0442\u0432 DappExpert;" } },
            "18": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8.2 \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u0435 \u043F\u0440\u0435\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u0439;" } },
            "19": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "7.8.3 \u043F\u0440\u0430\u0432\u0430 \u0438 \u0441\u0432\u043E\u0431\u043E\u0434\u044B \u0434\u0440\u0443\u0433\u0438\u0445 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439 \u0438\u043B\u0438 \u0438\u043D\u044B\u0445 \u0442\u0440\u0435\u0442\u044C\u0438\u0445 \u043B\u0438\u0446." } }
          }
        },
        "7": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "8. \u0421\u0422\u041E\u0420\u041E\u041D\u041D\u0418\u0415 \u0412\u0415\u0411-\u0421\u0410\u0419\u0422\u042B" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0448 \u0441\u0430\u0439\u0442 \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u044B. \u041A\u043E\u0433\u0434\u0430 \u0432\u044B \u043D\u0430\u0436\u0438\u043C\u0430\u0435\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u0434\u0440\u0443\u0433\u043E\u0439 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442 \u0438\u043B\u0438 \u043C\u0435\u0441\u0442\u043E, \u0432\u044B \u043F\u043E\u043A\u0438\u0434\u0430\u0435\u0442\u0435 \u043D\u0430\u0448 \u0421\u0430\u0439\u0442 \u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442\u0435 \u043D\u0430 \u0434\u0440\u0443\u0433\u043E\u0439 \u0441\u0430\u0439\u0442, \u0438 \u0434\u0440\u0443\u0433\u043E\u0435 \u043B\u0438\u0446\u043E \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u043E\u0442 \u0432\u0430\u0441 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0438\u043B\u0438 \u0410\u043D\u043E\u043D\u0438\u043C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435. \u041C\u044B \u043D\u0435 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C, \u043D\u0435 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C \u0438 \u043D\u0435 \u043D\u0435\u0441\u0435\u043C \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0437\u0430 \u044D\u0442\u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u044B \u0438\u043B\u0438 \u0438\u0445 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435. \u041F\u043E\u043C\u043D\u0438\u0442\u0435, \u0447\u0442\u043E \u0443\u0441\u043B\u043E\u0432\u0438\u044F \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u043A \u044D\u0442\u0438\u043C \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u043C \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0430\u043C \u0438\u043B\u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0443, \u0430 \u0442\u0430\u043A\u0436\u0435 \u043A \u043B\u044E\u0431\u043E\u043C\u0443 \u0441\u0431\u043E\u0440\u0443 \u0432\u0430\u0448\u0438\u0445 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u0432\u044B \u043D\u0430\u0436\u043C\u0435\u0442\u0435 \u043D\u0430 \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0442\u0430\u043A\u0438\u0435 \u0432\u043D\u0435\u0448\u043D\u0438\u0435 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u044B. \u041C\u044B \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C \u0432\u0430\u043C \u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0441 \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u043E\u0441\u0435\u0449\u0430\u0435\u043C\u043E\u0433\u043E \u0432\u0430\u043C\u0438 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0430. \u0421\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0435 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u044B \u0438\u043B\u0438 \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u0440\u0435\u0434\u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u044B \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0434\u043E\u0431\u0441\u0442\u0432\u0430 \u0438 \u043D\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u044E\u0442, \u0447\u0442\u043E \u043C\u044B \u043E\u0434\u043E\u0431\u0440\u044F\u0435\u043C \u0442\u0430\u043A\u0438\u0435 \u0442\u0440\u0435\u0442\u044C\u0438 \u0441\u0442\u043E\u0440\u043E\u043D\u044B \u0438\u043B\u0438 \u0438\u0445 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B, \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438\u043B\u0438 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u044B." } }
          }
        },
        "8": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9. \u0410\u0412\u0422\u041E\u0420\u0421\u041A\u0418\u0415 \u041F\u0420\u0410\u0412\u0410" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9.1 \u0410\u0432\u0442\u043E\u0440\u0441\u043A\u0438\u0435 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u043D\u0430\u0448 \u0432\u0435\u0431-\u0441\u0430\u0439\u0442 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C\u044E DappExpert." } },
            "1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9.2 \u0422\u0435\u043A\u0441\u0442\u044B, \u0433\u0440\u0430\u0444\u0438\u043A\u0430, \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438, \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044F, \u0432\u0438\u0434\u0435\u043E \u0438 \u043A\u043B\u0438\u043F\u044B, \u0432\u0438\u0434\u0438\u043C\u044B\u0435 \u043D\u0430 \u0421\u0430\u0439\u0442\u0435, \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u043E\u0431\u044A\u0435\u043A\u0442\u043E\u043C \u0430\u0432\u0442\u043E\u0440\u0441\u043A\u043E\u0433\u043E \u043F\u0440\u0430\u0432\u0430 \u0438 \u044F\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0447\u0430\u0441\u0442\u044C\u044E \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 DappExpert. \u0418\u0445 \u043D\u0435\u043B\u044C\u0437\u044F \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u044C, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0438\u043B\u0438 \u043F\u0440\u0435\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0431\u0435\u0437 \u044F\u0432\u043D\u043E\u0433\u043E \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u044F DappExpert. \u041B\u044E\u0431\u043E\u0435 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0444\u0430\u0439\u043B\u043E\u0432, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043D\u044B\u0445 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F\u043C\u0438 \u0432 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0438 \u0441 \u0423\u0441\u043B\u043E\u0432\u0438\u044F\u043C\u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u0412\u0435\u0431-\u0441\u0430\u0439\u0442\u0430, \u0438\u043B\u0438 \u0438\u0445 \u0447\u0430\u0441\u0442\u0435\u0439 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u0435\u043C \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u0437\u0430\u043A\u043E\u043D\u043E\u0432 \u043E \u0437\u0430\u0449\u0438\u0442\u0435 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438 \u0438 \u043F\u0440\u0435\u0441\u043B\u0435\u0434\u0443\u0435\u0442\u0441\u044F \u043F\u043E \u0437\u0430\u043A\u043E\u043D\u0443." } },
            "2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "9.3 \u041D\u0438\u0447\u0442\u043E, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0449\u0435\u0435\u0441\u044F \u043D\u0430 \u044D\u0442\u043E\u043C \u0432\u0435\u0431-\u0441\u0430\u0439\u0442\u0435, \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0438\u0441\u0442\u043E\u043B\u043A\u043E\u0432\u0430\u043D\u043E \u043A\u0430\u043A \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043B\u0438\u0446\u0435\u043D\u0437\u0438\u0438 \u0438\u043B\u0438 \u043F\u0440\u0430\u0432\u0430 \u043D\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u0432 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435 \u0442\u043E\u0432\u0430\u0440\u043D\u043E\u0433\u043E \u0437\u043D\u0430\u043A\u0430 \u0431\u0435\u0437 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0433\u043E \u044F\u0432\u043D\u043E\u0433\u043E \u043F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u043E\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u0438\u044F DappExpert." } }
          }
        },
        "9": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "10. \u0418\u0417\u041C\u0415\u041D\u0415\u041D\u0418\u042F \u0412 \u041D\u0410\u0421\u0422\u041E\u042F\u0429\u0415\u0419 \u041F\u041E\u041B\u0418\u0422\u0418\u041A\u0415 \u041A\u041E\u041D\u0424\u0418\u0414\u0415\u041D\u0426\u0418\u0410\u041B\u042C\u041D\u041E\u0421\u0422\u0418" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u041D\u0430\u0441\u0442\u043E\u044F\u0449\u0430\u044F \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043C\u043E\u0436\u0435\u0442 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0442\u044C\u0441\u044F \u0432\u0440\u0435\u043C\u044F \u043E\u0442 \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u043F\u043E \u043B\u044E\u0431\u043E\u0439 \u043F\u0440\u0438\u0447\u0438\u043D\u0435. \u041C\u044B \u0443\u0432\u0435\u0434\u043E\u043C\u0438\u043C \u0432\u0430\u0441 \u043E \u043B\u044E\u0431\u044B\u0445 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F\u0445 \u0432 \u043D\u0430\u0448\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u0440\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0432 \u043D\u043E\u0432\u0443\u044E \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0443 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0441\u0430\u0439\u0442\u0430. \u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0441\u043C\u043E\u0442\u0440\u0430 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0443\u043A\u0430\u0437\u0430\u043D\u0430 \u0432 \u043D\u0430\u0447\u0430\u043B\u0435 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438. \u0412\u044B \u043D\u0435\u0441\u0435\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0442\u043E, \u0447\u0442\u043E\u0431\u044B \u0443 \u0412\u0430\u0441 \u0431\u044B\u043B \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0437\u0430 \u043F\u0435\u0440\u0438\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u043E\u0435 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0435 \u043D\u0430\u0448\u0435\u0433\u043E \u0421\u0430\u0439\u0442\u0430 \u0438 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u0434\u043B\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043B\u044E\u0431\u044B\u0445 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0439." } }
          }
        },
        "10": {
          "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "11. \u041A\u041E\u041D\u0422\u0410\u041A\u0422\u041D\u042B\u0415 \u0414\u0410\u041D\u041D\u042B\u0415" } },
          "text": {
            "0": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "11.1 \u0415\u0441\u043B\u0438 \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u0438\u043B\u0438 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 \u043F\u043E \u043F\u043E\u0432\u043E\u0434\u0443 \u044D\u0442\u043E\u0439 \u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0438 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438, \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0441\u0432\u044F\u0437\u0430\u0442\u044C\u0441\u044F \u0441 \u043D\u0430\u043C\u0438 \u043F\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C\u0443 \u0430\u0434\u0440\u0435\u0441\u0443 \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0439 \u043F\u043E\u0447\u0442\u044B: " }, { "t": 4, "k": "email" }, { "t": 3, "v": "." }] } }
          }
        }
      }
    },
    "affiliateLinksDisclaimer": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041E\u0442\u043A\u0430\u0437 \u043E\u0442 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u0438: \u042D\u0442\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043C\u043E\u0436\u0435\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438. Dapp.expert \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0442\u044C \u0432\u043E\u0437\u043D\u0430\u0433\u0440\u0430\u0436\u0434\u0435\u043D\u0438\u0435, \u0435\u0441\u043B\u0438 \u0432\u044B \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435 \u043B\u044E\u0431\u044B\u0435 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u0438 \u0441\u043E\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043D\u044B\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F, \u0442\u0430\u043A\u0438\u0435 \u043A\u0430\u043A \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0438 \u0441\u0434\u0435\u043B\u043A\u0438 \u0441 \u044D\u0442\u0438\u043C\u0438 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u043C\u0438 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u0430\u043C\u0438. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u043A " }, { "t": 4, "k": "link" }, { "t": 3, "v": "." }] } },
    "affiliateDisclosure": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0420\u0430\u0441\u043A\u0440\u044B\u0442\u0438\u0435 \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0441\u043A\u0438\u0445 \u0441\u0441\u044B\u043B\u043E\u043A" } },
    "cookie": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041C\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u0444\u0430\u0439\u043B\u044B cookie. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044F \u043D\u0430\u0448 \u0441\u0430\u0439\u0442, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u0441 \u043D\u0430\u0448\u0435\u0439 " }, { "t": 4, "k": "link" }] } }
  },
  "digitalAsset": {
    "about": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u0427\u0442\u043E \u0442\u0430\u043A\u043E\u0435 " }, { "t": 4, "k": "title" }, { "t": 3, "v": "?" }] } },
    "whitepaper": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "\u0411\u0435\u043B\u0430\u044F \u043A\u043D\u0438\u0433\u0430" } },
    "assetToUserCurrencyConverter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "\u041A\u043E\u043D\u0432\u0435\u0440\u0442\u0435\u0440 " }, { "t": 4, "k": "asset" }, { "t": 3, "v": " \u0432 " }, { "t": 4, "k": "userCurrency" }] } }
  }
};
const localeCodes = [
  "en",
  "ru"
];
const localeLoaders = {
  "en": [{ key: "../locales/en.json", load: () => Promise.resolve(resource$1), cache: true }],
  "ru": [{ key: "../locales/ru.json", load: () => Promise.resolve(resource), cache: true }]
};
const vueI18nConfigs = [
  () => import(
    './entry-styles-1.mjs-DgBF4tXX.mjs'
    /* webpackChunkName: "~_plugins_vue_i18n_js_feb0fd71" */
  ).then(function(n) {
    return n.v;
  })
];
const normalizedLocales = [
  {
    "code": "en",
    "language": "en",
    "files": [
      {
        "path": "/builds/dapp.expert/front-nuxt/locales/en.json"
      }
    ]
  },
  {
    "code": "ru",
    "language": "ru",
    "files": [
      {
        "path": "/builds/dapp.expert/front-nuxt/locales/ru.json"
      }
    ]
  }
];
const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n";
const parallelPlugin = false;
const isSSG = false;
const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18n";
const DEFAULT_COOKIE_KEY = "i18n_redirected";
const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp";
function getNormalizedLocales(locales2) {
  locales2 = locales2 || [];
  const normalized = [];
  for (const locale of locales2) {
    if (isString(locale)) {
      normalized.push({ code: locale });
    } else {
      normalized.push(locale);
    }
  }
  return normalized;
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && "locale" in target && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function getI18nTarget(i18n) {
  return isI18nInstance(i18n) ? i18n.global : i18n;
}
function getComposer$3(i18n) {
  const target = getI18nTarget(i18n);
  if (isComposer(target))
    return target;
  if (isVueI18n(target))
    return target.__composer;
  return target;
}
function getLocale$1(i18n) {
  return unref(getI18nTarget(i18n).locale);
}
function getLocales(i18n) {
  return unref(getI18nTarget(i18n).locales);
}
function getLocaleCodes(i18n) {
  return unref(getI18nTarget(i18n).localeCodes);
}
function setLocale(i18n, locale) {
  const target = getI18nTarget(i18n);
  if (isRef(target.locale)) {
    target.locale.value = locale;
  } else {
    target.locale = locale;
  }
}
function getRouteName(routeName) {
  if (isString(routeName))
    return routeName;
  if (isSymbol(routeName))
    return routeName.toString();
  return "(null)";
}
function getLocaleRouteName(routeName, locale, {
  defaultLocale,
  strategy,
  routesNameSeparator,
  defaultLocaleRouteNameSuffix,
  differentDomains
}) {
  const localizedRoutes = strategy !== "no_prefix" || differentDomains;
  let name = getRouteName(routeName) + (localizedRoutes ? routesNameSeparator + locale : "");
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    name += routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function resolveBaseUrl(baseUrl, context) {
  if (isFunction(baseUrl)) {
    return baseUrl(context);
  }
  return baseUrl;
}
function matchBrowserLocale(locales2, browserLocales) {
  const matchedLocales = [];
  for (const [index3, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales2.find((l) => l.language.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index3 / browserLocales.length });
      break;
    }
  }
  for (const [index3, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales2.find((l) => l.language.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index3 / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
const DefaultBrowserLocaleMatcher = matchBrowserLocale;
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
const DefaultBrowerLocaleComparer = compareBrowserLocale;
function findBrowserLocale(locales2, browserLocales, { matcher = DefaultBrowserLocaleMatcher, comparer = DefaultBrowerLocaleComparer } = {}) {
  const normalizedLocales2 = [];
  for (const l of locales2) {
    const { code: code2 } = l;
    const language = l.language || code2;
    normalizedLocales2.push({ code: code2, language });
  }
  const matchedLocales = matcher(normalizedLocales2, browserLocales);
  if (matchedLocales.length > 1) {
    matchedLocales.sort(comparer);
  }
  return matchedLocales.length ? matchedLocales[0].code : "";
}
function getLocalesRegex(localeCodes2) {
  return new RegExp(`^/(${localeCodes2.join("|")})(?:/|$)`, "i");
}
const cacheMessages = /* @__PURE__ */ new Map();
async function loadVueI18nOptions(vueI18nConfigs2, nuxt) {
  const vueI18nOptions = { messages: {} };
  for (const configFile of vueI18nConfigs2) {
    const { default: resolver } = await configFile();
    const resolved = isFunction(resolver) ? await nuxt.runWithContext(async () => await resolver()) : resolver;
    deepCopy(resolved, vueI18nOptions);
  }
  return vueI18nOptions;
}
function makeFallbackLocaleCodes(fallback, locales2) {
  let fallbackLocales = [];
  if (isArray(fallback)) {
    fallbackLocales = fallback;
  } else if (isObject$1(fallback)) {
    const targets = [...locales2, "default"];
    for (const locale of targets) {
      if (fallback[locale]) {
        fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
      }
    }
  } else if (isString(fallback) && locales2.every((locale) => locale !== fallback)) {
    fallbackLocales.push(fallback);
  }
  return fallbackLocales;
}
async function loadInitialMessages(messages, localeLoaders2, options) {
  const { defaultLocale, initialLocale, localeCodes: localeCodes2, fallbackLocale, lazy } = options;
  if (lazy && fallbackLocale) {
    const fallbackLocales = makeFallbackLocaleCodes(fallbackLocale, [defaultLocale, initialLocale]);
    await Promise.all(fallbackLocales.map((locale) => loadAndSetLocaleMessages(locale, localeLoaders2, messages)));
  }
  const locales2 = lazy ? [...(/* @__PURE__ */ new Set()).add(defaultLocale).add(initialLocale)] : localeCodes2;
  await Promise.all(locales2.map((locale) => loadAndSetLocaleMessages(locale, localeLoaders2, messages)));
  return messages;
}
async function loadMessage(locale, { key, load }) {
  let message = null;
  try {
    const getter = await load().then((r) => r.default || r);
    if (isFunction(getter)) {
      message = await getter(locale);
    } else {
      message = getter;
      if (message != null && cacheMessages) {
        cacheMessages.set(key, message);
      }
    }
  } catch (e) {
    console.error("Failed locale loading: " + e.message);
  }
  return message;
}
async function loadLocale(locale, localeLoaders2, setter) {
  const loaders = localeLoaders2[locale];
  if (loaders == null) {
    console.warn("Could not find messages for locale code: " + locale);
    return;
  }
  const targetMessage = {};
  for (const loader of loaders) {
    let message = null;
    if (cacheMessages && cacheMessages.has(loader.key) && loader.cache) {
      message = cacheMessages.get(loader.key);
    } else {
      message = await loadMessage(locale, loader);
    }
    if (message != null) {
      deepCopy(message, targetMessage);
    }
  }
  setter(locale, targetMessage);
}
async function loadAndSetLocaleMessages(locale, localeLoaders2, messages) {
  const setter = (locale2, message) => {
    const base = messages[locale2] || {};
    deepCopy(message, base);
    messages[locale2] = base;
  };
  await loadLocale(locale, localeLoaders2, setter);
}
function split(str, index3) {
  const result = [str.slice(0, index3), str.slice(index3)];
  return result;
}
function routeToObject(route) {
  const { fullPath, query, hash, name, path, params, meta, redirectedFrom, matched } = route;
  return {
    fullPath,
    params,
    query,
    hash,
    name,
    path,
    meta,
    matched,
    redirectedFrom
  };
}
function resolve({ router }, route, strategy, locale) {
  var _a, _b;
  if (strategy !== "prefix") {
    return router.resolve(route);
  }
  const [rootSlash, restPath] = split(route.path, 1);
  const targetPath = `${rootSlash}${locale}${restPath === "" ? restPath : `/${restPath}`}`;
  const _route = (_b = (_a = router.options) == null ? void 0 : _a.routes) == null ? void 0 : _b.find((r) => r.path === targetPath);
  if (_route == null) {
    return route;
  }
  const _resolvableRoute = assign({}, route, _route);
  _resolvableRoute.path = targetPath;
  return router.resolve(_resolvableRoute);
}
const RESOLVED_PREFIXED = /* @__PURE__ */ new Set(["prefix_and_default", "prefix_except_default"]);
function prefixable(options) {
  const { currentLocale, defaultLocale, strategy } = options;
  const isDefaultLocale = currentLocale === defaultLocale;
  return !(isDefaultLocale && RESOLVED_PREFIXED.has(strategy)) && // no prefix for any language
  !(strategy === "no_prefix");
}
const DefaultPrefixable = prefixable;
function getRouteBaseName(common, givenRoute) {
  const { routesNameSeparator } = common.runtimeConfig.public.i18n;
  const route = unref(givenRoute);
  if (route == null || !route.name) {
    return;
  }
  const name = getRouteName(route.name);
  return name.split(routesNameSeparator)[0];
}
function localePath(common, route, locale) {
  var _a;
  if (typeof route === "string" && hasProtocol(route, { acceptRelative: true })) {
    return route;
  }
  const localizedRoute = resolveRoute(common, route, locale);
  return localizedRoute == null ? "" : ((_a = localizedRoute.redirectedFrom) == null ? void 0 : _a.fullPath) || localizedRoute.fullPath;
}
function localeRoute(common, route, locale) {
  const resolved = resolveRoute(common, route, locale);
  return resolved != null ? resolved : void 0;
}
function localeLocation(common, route, locale) {
  const resolved = resolveRoute(common, route, locale);
  return resolved != null ? resolved : void 0;
}
function resolveRoute(common, route, locale) {
  const { router, i18n } = common;
  const _locale = locale || getLocale$1(i18n);
  const { defaultLocale, strategy, trailingSlash } = common.runtimeConfig.public.i18n;
  const prefixable2 = extendPrefixable(common.runtimeConfig);
  let _route;
  if (isString(route)) {
    if (route[0] === "/") {
      const { pathname: path, search, hash } = parsePath(route);
      const query = parseQuery(search);
      _route = { path, query, hash };
    } else {
      _route = { name: route };
    }
  } else {
    _route = route;
  }
  let localizedRoute = assign({}, _route);
  const isRouteLocationPathRaw = (val) => "path" in val && !!val.path && !("name" in val);
  if (isRouteLocationPathRaw(localizedRoute)) {
    const resolvedRoute = resolve(common, localizedRoute, strategy, _locale);
    const resolvedRouteName = getRouteBaseName(common, resolvedRoute);
    if (isString(resolvedRouteName)) {
      localizedRoute = {
        name: getLocaleRouteName(resolvedRouteName, _locale, common.runtimeConfig.public.i18n),
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
        params: resolvedRoute.params,
        query: resolvedRoute.query,
        hash: resolvedRoute.hash
      };
      localizedRoute.state = resolvedRoute.state;
    } else {
      if (prefixable2({ currentLocale: _locale, defaultLocale, strategy })) {
        localizedRoute.path = `/${_locale}${localizedRoute.path}`;
      }
      localizedRoute.path = trailingSlash ? withTrailingSlash(localizedRoute.path, true) : withoutTrailingSlash(localizedRoute.path, true);
    }
  } else {
    if (!localizedRoute.name && !("path" in localizedRoute)) {
      localizedRoute.name = getRouteBaseName(common, router.currentRoute.value);
    }
    localizedRoute.name = getLocaleRouteName(localizedRoute.name, _locale, common.runtimeConfig.public.i18n);
  }
  try {
    const resolvedRoute = router.resolve(localizedRoute);
    if (resolvedRoute.name) {
      return resolvedRoute;
    }
    return router.resolve(route);
  } catch (e) {
    if (typeof e === "object" && "type" in e && e.type === 1) {
      return null;
    }
  }
}
const DefaultSwitchLocalePathIntercepter = (path) => path;
function getLocalizableMetaFromDynamicParams(common, route) {
  var _a;
  if (common.runtimeConfig.public.i18n.experimental.switchLocalePathLinkSSR) {
    return unref(common.metaState.value);
  }
  const meta = route.meta || {};
  return ((_a = unref(meta)) == null ? void 0 : _a[DEFAULT_DYNAMIC_PARAMS_KEY]) || {};
}
function switchLocalePath(common, locale, _route) {
  const route = _route != null ? _route : common.router.currentRoute.value;
  const name = getRouteBaseName(common, route);
  if (!name) {
    return "";
  }
  const switchLocalePathIntercepter = extendSwitchLocalePathIntercepter(common.runtimeConfig);
  const routeCopy = routeToObject(route);
  const resolvedParams = getLocalizableMetaFromDynamicParams(common, route)[locale];
  const baseRoute = { ...routeCopy, name, params: { ...routeCopy.params, ...resolvedParams } };
  const path = localePath(common, baseRoute, locale);
  return switchLocalePathIntercepter(path, locale);
}
function localeHead(common, {
  addDirAttribute = false,
  addSeoAttributes: seoAttributes = true,
  identifierAttribute: idAttribute = "hid"
}) {
  const { defaultDirection } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const i18n = getComposer$3(common.i18n);
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  if (unref(i18n.locales) == null || unref(i18n.baseUrl) == null) {
    return metaObject;
  }
  const locale = getLocale$1(common.i18n);
  const locales2 = getLocales(common.i18n);
  const currentLocale = getNormalizedLocales(locales2).find((l) => l.code === locale) || {
    code: locale
  };
  const currentLanguage = currentLocale.language;
  const currentDir = currentLocale.dir || defaultDirection;
  if (addDirAttribute) {
    metaObject.htmlAttrs.dir = currentDir;
  }
  if (seoAttributes && locale && unref(i18n.locales)) {
    if (currentLanguage) {
      metaObject.htmlAttrs.lang = currentLanguage;
    }
    metaObject.link.push(
      ...getHreflangLinks(common, unref(locales2), idAttribute),
      ...getCanonicalLink(common, idAttribute, seoAttributes)
    );
    metaObject.meta.push(
      ...getOgUrl(common, idAttribute, seoAttributes),
      ...getCurrentOgLocale(currentLocale, currentLanguage, idAttribute),
      ...getAlternateOgLocales(unref(locales2), currentLanguage, idAttribute)
    );
  }
  return metaObject;
}
function getBaseUrl() {
  const nuxtApp = useNuxtApp();
  const i18n = getComposer$3(nuxtApp.$i18n);
  return joinURL(unref(i18n.baseUrl), nuxtApp.$config.app.baseURL);
}
function getHreflangLinks(common, locales2, idAttribute) {
  const baseUrl = getBaseUrl();
  const { defaultLocale, strategy } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const links = [];
  if (strategy === "no_prefix")
    return links;
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of locales2) {
    const localeLanguage = locale.language;
    if (!localeLanguage) {
      console.warn("Locale `language` ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = localeLanguage.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(localeLanguage, locale);
  }
  for (const [language, mapLocale] of localeMap.entries()) {
    const localePath2 = switchLocalePath(common, mapLocale.code);
    if (localePath2) {
      links.push({
        [idAttribute]: `i18n-alt-${language}`,
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: language
      });
    }
  }
  if (defaultLocale) {
    const localePath2 = switchLocalePath(common, defaultLocale);
    if (localePath2) {
      links.push({
        [idAttribute]: "i18n-xd",
        rel: "alternate",
        href: toAbsoluteUrl(localePath2, baseUrl),
        hreflang: "x-default"
      });
    }
  }
  return links;
}
function getCanonicalUrl(common, baseUrl, seoAttributes) {
  const route = common.router.currentRoute.value;
  const currentRoute = localeRoute(common, {
    ...route,
    path: void 0,
    name: getRouteBaseName(common, route)
  });
  if (!currentRoute)
    return "";
  let href = toAbsoluteUrl(currentRoute.path, baseUrl);
  const canonicalQueries = isObject$1(seoAttributes) && seoAttributes.canonicalQueries || [];
  const currentRouteQueryParams = currentRoute.query;
  const params = new URLSearchParams();
  for (const queryParamName of canonicalQueries) {
    if (queryParamName in currentRouteQueryParams) {
      const queryParamValue = currentRouteQueryParams[queryParamName];
      if (isArray(queryParamValue)) {
        queryParamValue.forEach((v) => params.append(queryParamName, v || ""));
      } else {
        params.append(queryParamName, queryParamValue || "");
      }
    }
  }
  const queryString = params.toString();
  if (queryString) {
    href = `${href}?${queryString}`;
  }
  return href;
}
function getCanonicalLink(common, idAttribute, seoAttributes) {
  const baseUrl = getBaseUrl();
  const href = getCanonicalUrl(common, baseUrl, seoAttributes);
  if (!href)
    return [];
  return [{ [idAttribute]: "i18n-can", rel: "canonical", href }];
}
function getOgUrl(common, idAttribute, seoAttributes) {
  const baseUrl = getBaseUrl();
  const href = getCanonicalUrl(common, baseUrl, seoAttributes);
  if (!href)
    return [];
  return [{ [idAttribute]: "i18n-og-url", property: "og:url", content: href }];
}
function getCurrentOgLocale(currentLocale, currentLanguage, idAttribute) {
  if (!currentLocale || !currentLanguage)
    return [];
  return [{ [idAttribute]: "i18n-og", property: "og:locale", content: hypenToUnderscore(currentLanguage) }];
}
function getAlternateOgLocales(locales2, currentLanguage, idAttribute) {
  const alternateLocales = locales2.filter((locale) => locale.language && locale.language !== currentLanguage);
  return alternateLocales.map((locale) => ({
    [idAttribute]: `i18n-og-alt-${locale.language}`,
    property: "og:locale:alternate",
    content: hypenToUnderscore(locale.language)
  }));
}
function hypenToUnderscore(str) {
  return (str || "").replace(/-/g, "_");
}
function toAbsoluteUrl(urlOrPath, baseUrl) {
  if (urlOrPath.match(/^https?:\/\//))
    return urlOrPath;
  return joinURL(baseUrl, urlOrPath);
}
function createLocaleFromRouteGetter() {
  const { routesNameSeparator, defaultLocaleRouteNameSuffix } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const localesPattern = `(${localeCodes.join("|")})`;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  const regexpPath = getLocalesRegex(localeCodes);
  const getLocaleFromRoute = (route) => {
    if (isObject$1(route)) {
      if (route.name) {
        const name = isString(route.name) ? route.name : route.name.toString();
        const matches = name.match(regexpName);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      } else if (route.path) {
        const matches = route.path.match(regexpPath);
        if (matches && matches.length > 1) {
          return matches[1];
        }
      }
    } else if (isString(route)) {
      const matches = route.match(regexpPath);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    }
    return "";
  };
  return getLocaleFromRoute;
}
function setCookieLocale(i18n, locale) {
  return callVueI18nInterfaces(i18n, "setLocaleCookie", locale);
}
function mergeLocaleMessage(i18n, locale, messages) {
  return callVueI18nInterfaces(i18n, "mergeLocaleMessage", locale, messages);
}
async function onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, context) {
  return callVueI18nInterfaces(i18n, "onBeforeLanguageSwitch", oldLocale, newLocale, initial, context);
}
function onLanguageSwitched(i18n, oldLocale, newLocale) {
  return callVueI18nInterfaces(i18n, "onLanguageSwitched", oldLocale, newLocale);
}
function initCommonComposableOptions(i18n) {
  return {
    i18n: i18n != null ? i18n : useNuxtApp().$i18n,
    router: useRouter(),
    runtimeConfig: /* @__PURE__ */ useRuntimeConfig(),
    metaState: useState("nuxt-i18n-meta", () => ({}))
  };
}
async function loadAndSetLocale(newLocale, i18n, runtimeI18n, initial = false) {
  const { differentDomains, skipSettingLocaleOnNavigate, lazy } = runtimeI18n;
  const opts = runtimeDetectBrowserLanguage(runtimeI18n);
  const nuxtApp = useNuxtApp();
  const oldLocale = getLocale$1(i18n);
  const localeCodes2 = getLocaleCodes(i18n);
  function syncCookie(locale = oldLocale) {
    if (opts === false || !opts.useCookie)
      return;
    if (skipSettingLocaleOnNavigate)
      return;
    setCookieLocale(i18n, locale);
  }
  if (!newLocale) {
    syncCookie();
    return false;
  }
  if (!initial && differentDomains) {
    syncCookie();
    return false;
  }
  if (oldLocale === newLocale) {
    syncCookie();
    return false;
  }
  const localeOverride = await onBeforeLanguageSwitch(i18n, oldLocale, newLocale, initial, nuxtApp);
  if (localeOverride && localeCodes2.includes(localeOverride)) {
    if (oldLocale === localeOverride) {
      syncCookie();
      return false;
    }
    newLocale = localeOverride;
  }
  if (lazy) {
    const i18nFallbackLocales = getVueI18nPropertyValue(i18n, "fallbackLocale");
    const setter = (locale, message) => mergeLocaleMessage(i18n, locale, message);
    if (i18nFallbackLocales) {
      const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
      await Promise.all(fallbackLocales.map((locale) => loadLocale(locale, localeLoaders, setter)));
    }
    await loadLocale(newLocale, localeLoaders, setter);
  }
  if (skipSettingLocaleOnNavigate) {
    return false;
  }
  syncCookie(newLocale);
  setLocale(i18n, newLocale);
  await onLanguageSwitched(i18n, oldLocale, newLocale);
  return true;
}
function createLogger(label2) {
  return {
    log: console.log.bind(console, `${label2}:`)
    // change to this after implementing logger across runtime code
    // log: console.log.bind(console, `[i18n:${label}]`)
  };
}
function detectLocale(route, routeLocaleGetter, initialLocaleLoader, detectLocaleContext, runtimeI18n) {
  const { strategy, defaultLocale, differentDomains, multiDomainLocales } = runtimeI18n;
  const { localeCookie } = detectLocaleContext;
  const _detectBrowserLanguage = runtimeDetectBrowserLanguage(runtimeI18n);
  createLogger("detectLocale");
  const initialLocale = isFunction(initialLocaleLoader) ? initialLocaleLoader() : initialLocaleLoader;
  const detectedBrowser = detectBrowserLanguage(route, detectLocaleContext, initialLocale);
  if (detectedBrowser.reason === DetectFailure.SSG_IGNORE) {
    return initialLocale;
  }
  if (detectedBrowser.locale && detectedBrowser.from != null) {
    return detectedBrowser.locale;
  }
  let detected = "";
  if (differentDomains || multiDomainLocales) {
    detected || (detected = getLocaleDomain(normalizedLocales, strategy, route));
  } else if (strategy !== "no_prefix") {
    detected || (detected = routeLocaleGetter(route));
  }
  const cookieLocale = _detectBrowserLanguage && _detectBrowserLanguage.useCookie && localeCookie;
  detected || (detected = cookieLocale || initialLocale || defaultLocale || "");
  return detected;
}
function detectRedirect({
  route,
  targetLocale,
  routeLocaleGetter,
  calledWithRouting = false
}) {
  const nuxtApp = useNuxtApp();
  const common = initCommonComposableOptions();
  const { strategy, differentDomains } = common.runtimeConfig.public.i18n;
  let redirectPath = "";
  const { fullPath: toFullPath } = route.to;
  if (!differentDomains && (calledWithRouting || strategy !== "no_prefix") && routeLocaleGetter(route.to) !== targetLocale) {
    const routePath = nuxtApp.$switchLocalePath(targetLocale) || nuxtApp.$localePath(toFullPath, targetLocale);
    if (isString(routePath) && routePath && !isEqual(routePath, toFullPath) && !routePath.startsWith("//")) {
      redirectPath = !(route.from && route.from.fullPath === routePath) ? routePath : "";
    }
  }
  if ((differentDomains || isSSG) && routeLocaleGetter(route.to) !== targetLocale) {
    const routePath = switchLocalePath(common, targetLocale, route.to);
    if (isString(routePath) && routePath && !isEqual(routePath, toFullPath) && !routePath.startsWith("//")) {
      redirectPath = routePath;
    }
  }
  return redirectPath;
}
function isRootRedirectOptions(rootRedirect) {
  return isObject$1(rootRedirect) && "path" in rootRedirect && "statusCode" in rootRedirect;
}
const useRedirectState = () => useState(NUXT_I18N_MODULE_ID + ":redirect", () => "");
function _navigate(redirectPath, status) {
  return navigateTo(redirectPath, { redirectCode: status });
}
async function navigate(args, { status = 302, enableNavigate = false } = {}) {
  const { nuxtApp, i18n, locale, route } = args;
  const { rootRedirect, differentDomains, multiDomainLocales, skipSettingLocaleOnNavigate, configLocales, strategy } = nuxtApp.$config.public.i18n;
  let { redirectPath } = args;
  if (route.path === "/" && rootRedirect) {
    if (isString(rootRedirect)) {
      redirectPath = "/" + rootRedirect;
    } else if (isRootRedirectOptions(rootRedirect)) {
      redirectPath = "/" + rootRedirect.path;
      status = rootRedirect.statusCode;
    }
    redirectPath = nuxtApp.$localePath(redirectPath, locale);
    return _navigate(redirectPath, status);
  }
  if (multiDomainLocales && strategy === "prefix_except_default") {
    const host = getHost();
    const currentDomain = configLocales.find((locale2) => {
      var _a;
      if (typeof locale2 !== "string") {
        return (_a = locale2.defaultForDomains) == null ? void 0 : _a.find((domain) => domain === host);
      }
      return false;
    });
    const defaultLocaleForDomain = typeof currentDomain !== "string" ? currentDomain == null ? void 0 : currentDomain.code : void 0;
    if (route.path.startsWith(`/${defaultLocaleForDomain}`)) {
      return _navigate(route.path.replace(`/${defaultLocaleForDomain}`, ""), status);
    } else if (!route.path.startsWith(`/${locale}`) && locale !== defaultLocaleForDomain) {
      const getLocaleFromRoute = createLocaleFromRouteGetter();
      const oldLocale = getLocaleFromRoute(route.path);
      if (oldLocale !== "") {
        return _navigate(`/${locale + route.path.replace(`/${oldLocale}`, "")}`, status);
      } else {
        return _navigate(`/${locale + (route.path === "/" ? "" : route.path)}`, status);
      }
    } else if (redirectPath && route.path !== redirectPath) {
      return _navigate(redirectPath, status);
    }
    return;
  }
  if (!differentDomains) {
    if (redirectPath) {
      return _navigate(redirectPath, status);
    }
  } else {
    const state = useRedirectState();
    if (state.value && state.value !== redirectPath) {
      {
        state.value = redirectPath;
      }
    }
  }
}
function injectNuxtHelpers(nuxt, i18n) {
  defineGetter(nuxt, "$i18n", getI18nTarget(i18n));
  defineGetter(nuxt, "$getRouteBaseName", wrapComposable(getRouteBaseName));
  defineGetter(nuxt, "$localePath", wrapComposable(localePath));
  defineGetter(nuxt, "$localeRoute", wrapComposable(localeRoute));
  defineGetter(nuxt, "$switchLocalePath", wrapComposable(switchLocalePath));
  defineGetter(nuxt, "$localeHead", wrapComposable(localeHead));
}
function extendPrefixable(runtimeConfig = /* @__PURE__ */ useRuntimeConfig()) {
  return (opts) => {
    return DefaultPrefixable(opts) && !runtimeConfig.public.i18n.differentDomains;
  };
}
function extendSwitchLocalePathIntercepter(runtimeConfig = /* @__PURE__ */ useRuntimeConfig()) {
  return (path, locale) => {
    if (runtimeConfig.public.i18n.differentDomains) {
      const domain = getDomainFromLocale(locale);
      if (domain) {
        return joinURL(domain, path);
      } else {
        return path;
      }
    } else {
      return DefaultSwitchLocalePathIntercepter(path);
    }
  };
}
function extendBaseUrl() {
  return () => {
    const ctx = useNuxtApp();
    const { baseUrl, defaultLocale, differentDomains } = ctx.$config.public.i18n;
    if (isFunction(baseUrl)) {
      const baseUrlResult = baseUrl(ctx);
      return baseUrlResult;
    }
    const localeCode = isFunction(defaultLocale) ? defaultLocale() : defaultLocale;
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode);
      if (domain) {
        return domain;
      }
    }
    if (baseUrl) {
      return baseUrl;
    }
    return baseUrl;
  };
}
function formatMessage(message) {
  return NUXT_I18N_MODULE_ID + " " + message;
}
function callVueI18nInterfaces(i18n, name, ...args) {
  const target = getI18nTarget(i18n);
  const [obj, method] = [target, target[name]];
  return Reflect.apply(method, obj, [...args]);
}
function getVueI18nPropertyValue(i18n, name) {
  const target = getI18nTarget(i18n);
  return unref(target[name]);
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function wrapComposable(fn, common = initCommonComposableOptions()) {
  return (...args) => fn(common, ...args);
}
function parseAcceptLanguage(input) {
  return input.split(",").map((tag) => tag.split(";")[0]);
}
function getBrowserLocale() {
  let ret;
  {
    const header = useRequestHeaders(["accept-language"]);
    const accept = header["accept-language"];
    if (accept) {
      ret = findBrowserLocale(normalizedLocales, parseAcceptLanguage(accept));
    }
  }
  return ret;
}
function getI18nCookie() {
  const detect = runtimeDetectBrowserLanguage();
  const cookieKey = detect && detect.cookieKey || DEFAULT_COOKIE_KEY;
  const date = /* @__PURE__ */ new Date();
  const cookieOptions = {
    expires: new Date(date.setDate(date.getDate() + 365)),
    path: "/",
    sameSite: detect && detect.cookieCrossOrigin ? "none" : "lax",
    secure: detect && detect.cookieCrossOrigin || detect && detect.cookieSecure
  };
  if (detect && detect.cookieDomain) {
    cookieOptions.domain = detect.cookieDomain;
  }
  return useCookie(cookieKey, cookieOptions);
}
function getLocaleCookie(cookieRef, detect, defaultLocale) {
  var _a;
  if (detect === false || !detect.useCookie) {
    return;
  }
  const localeCode = (_a = cookieRef.value) != null ? _a : void 0;
  if (localeCode == null) {
    return;
  }
  if (localeCodes.includes(localeCode)) {
    return localeCode;
  }
  if (defaultLocale) {
    cookieRef.value = defaultLocale;
    return defaultLocale;
  }
  cookieRef.value = void 0;
  return;
}
function setLocaleCookie(cookieRef, locale, detect) {
  if (detect === false || !detect.useCookie) {
    return;
  }
  cookieRef.value = locale;
}
var DetectFailure = /* @__PURE__ */ ((DetectFailure2) => {
  DetectFailure2["NOT_FOUND"] = "not_found_match";
  DetectFailure2["FIRST_ACCESS"] = "first_access_only";
  DetectFailure2["NO_REDIRECT_ROOT"] = "not_redirect_on_root";
  DetectFailure2["NO_REDIRECT_NO_PREFIX"] = "not_redirect_on_no_prefix";
  DetectFailure2["SSG_IGNORE"] = "detect_ignore_on_ssg";
  return DetectFailure2;
})(DetectFailure || {});
const DefaultDetectBrowserLanguageFromResult = { locale: "" };
function detectBrowserLanguage(route, detectLocaleContext, locale = "") {
  createLogger("detectBrowserLanguage");
  const _detect = runtimeDetectBrowserLanguage();
  if (!_detect) {
    return DefaultDetectBrowserLanguageFromResult;
  }
  const { strategy } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const { ssg, callType, firstAccess, localeCookie } = detectLocaleContext;
  if (!firstAccess) {
    return {
      locale: strategy === "no_prefix" ? locale : "",
      reason: "first_access_only"
      /* FIRST_ACCESS */
    };
  }
  const { redirectOn, alwaysRedirect, useCookie: useCookie2, fallbackLocale } = _detect;
  const path = isString(route) ? route : route.path;
  if (strategy !== "no_prefix") {
    if (redirectOn === "root" && path !== "/") {
      return {
        locale: "",
        reason: "not_redirect_on_root"
        /* NO_REDIRECT_ROOT */
      };
    }
    if (redirectOn === "no prefix" && !alwaysRedirect && path.match(getLocalesRegex(localeCodes))) {
      return {
        locale: "",
        reason: "not_redirect_on_no_prefix"
        /* NO_REDIRECT_NO_PREFIX */
      };
    }
  }
  let from;
  const cookieMatch = useCookie2 && localeCookie || void 0;
  if (useCookie2) {
    from = "cookie";
  }
  const browserMatch = getBrowserLocale();
  if (!cookieMatch) {
    from = "navigator_or_header";
  }
  const matchedLocale = cookieMatch || browserMatch;
  const resolved = matchedLocale || fallbackLocale || "";
  if (!matchedLocale && fallbackLocale) {
    from = "fallback";
  }
  return { locale: resolved, from };
}
function getHost() {
  let host;
  {
    const header = useRequestHeaders(["x-forwarded-host", "host"]);
    let detectedHost;
    if ("x-forwarded-host" in header) {
      detectedHost = header["x-forwarded-host"];
    } else if ("host" in header) {
      detectedHost = header["host"];
    }
    host = isArray(detectedHost) ? detectedHost[0] : detectedHost;
  }
  return host;
}
function getLocaleDomain(locales2, strategy, route) {
  let host = getHost() || "";
  if (host) {
    let matchingLocale;
    const matchingLocales = locales2.filter((locale) => {
      if (locale && locale.domain) {
        let domain = locale.domain;
        if (hasProtocol(locale.domain)) {
          domain = locale.domain.replace(/(http|https):\/\//, "");
        }
        return domain === host;
      } else if (Array.isArray(locale == null ? void 0 : locale.domains)) {
        return locale.domains.includes(host);
      }
      return false;
    });
    if (matchingLocales.length === 1) {
      matchingLocale = matchingLocales[0];
    } else if (matchingLocales.length > 1) {
      if (strategy === "no_prefix") {
        console.warn(
          formatMessage(
            "Multiple matching domains found! This is not supported for no_prefix strategy in combination with differentDomains!"
          )
        );
        matchingLocale = matchingLocales[0];
      } else {
        if (route) {
          const routePath = isObject$1(route) ? route.path : isString(route) ? route : "";
          if (routePath && routePath !== "") {
            const matches = routePath.match(getLocalesRegex(matchingLocales.map((l) => l.code)));
            if (matches && matches.length > 1) {
              matchingLocale = matchingLocales.find((l) => l.code === matches[1]);
            }
          }
        }
        if (!matchingLocale) {
          matchingLocale = matchingLocales.find(
            (l) => Array.isArray(l.defaultForDomains) ? l.defaultForDomains.includes(host) : l.domainDefault
          );
        }
      }
    }
    if (matchingLocale) {
      return matchingLocale.code;
    } else {
      host = "";
    }
  }
  return host;
}
function getDomainFromLocale(localeCode) {
  var _a, _b, _c, _d, _e, _f;
  const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  const host = getHost();
  const config = runtimeConfig.public.i18n;
  const lang = normalizedLocales.find((locale) => locale.code === localeCode);
  const domain = ((_b = (_a = config == null ? void 0 : config.locales) == null ? void 0 : _a[localeCode]) == null ? void 0 : _b.domain) || (lang == null ? void 0 : lang.domain) || ((_e = (_d = (_c = config == null ? void 0 : config.locales) == null ? void 0 : _c[localeCode]) == null ? void 0 : _d.domains) == null ? void 0 : _e.find((v) => v === host)) || ((_f = lang == null ? void 0 : lang.domains) == null ? void 0 : _f.find((v) => v === host));
  if (domain) {
    if (hasProtocol(domain, { strict: true })) {
      return domain;
    }
    let protocol;
    {
      const {
        node: { req }
      } = useRequestEvent(nuxtApp);
      protocol = req && isHTTPS(req) ? "https:" : "http:";
    }
    return protocol + "//" + domain;
  }
  console.warn(formatMessage("Could not find domain name for locale " + localeCode));
}
const runtimeDetectBrowserLanguage = (opts = (/* @__PURE__ */ useRuntimeConfig()).public.i18n) => {
  if ((opts == null ? void 0 : opts.detectBrowserLanguage) === false)
    return false;
  return opts == null ? void 0 : opts.detectBrowserLanguage;
};
/*!
  * message-compiler v9.14.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  return loc;
}
const CompileWarnCodes = {
  USE_MODULO_SYNTAX: 1,
  __EXTEND_POINT__: 2
};
function createCompileWarn(code2, loc, ...args) {
  const msg = code2;
  const message = { message: String(msg), code: code2 };
  if (loc) {
    message.location = loc;
  }
  return message;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  // generator error codes
  UNHANDLED_CODEGEN_NODE_TYPE: 15,
  // minifier error codes
  UNHANDLED_MINIFIER_NODE_TYPE: 16,
  // Special value for higher-order compilers to pick up the last code
  // to avoid collision of error codes. This should always be kept as the last
  // item.
  __EXTEND_POINT__: 17
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = code2;
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index22) => _buf[index22] === CHAR_CR && _buf[index22 + 1] === CHAR_LF;
  const isLF = (index22) => _buf[index22] === CHAR_LF;
  const isPS = (index22) => _buf[index22] === CHAR_PS;
  const isLS = (index22) => _buf[index22] === CHAR_LS;
  const isLineEnd = (index22) => isCRLF(index22) || isLF(index22) || isPS(index22) || isLS(index22);
  const index3 = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index: index3,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 14,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 14,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code2, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    14
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 8 || currentType === 12)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 10) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "%" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function detectModuloStart(scnr) {
    const spaces = peekSpaces(scnr);
    const ret = scnr.currentPeek() === "%" && scnr.peek() === "{";
    scnr.resetPeek();
    return {
      isModulo: ret,
      hasSpace: spaces.length > 0
    };
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "", detectModulo = false) => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return prev === "%" ? false : hasSpace;
      } else if (ch === "@" || !ch) {
        return prev === "%" ? true : hasSpace;
      } else if (ch === "%") {
        scnr.peek();
        return fn(hasSpace, "%", true);
      } else if (ch === "|") {
        return prev === "%" || detectModulo ? true : !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP, detectModulo);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF, detectModulo);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36 || // $
    cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || // 0-9
    cc >= 65 && cc <= 70 || // A-F
    cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readModulo(scnr) {
    skipSpaces(scnr);
    const ch = scnr.currentChar();
    if (ch !== "%") {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
    }
    scnr.next();
    return "%";
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === "%") {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else {
          break;
        }
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "%" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 5 || context2.currentType === 6 || context2.currentType === 7)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 6, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 7, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 13, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 8 || currentType === 9 || currentType === 12 || currentType === 10) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          8,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          10,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 12, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 11, readLinkedRefer(scnr));
          }
        }
        if (currentType === 8) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 14
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        const { isModulo, hasSpace } = detectModuloStart(scnr);
        if (isModulo) {
          return hasSpace ? getToken(context2, 0, readText(scnr)) : getToken(context2, 4, readModulo(scnr));
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        14
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "\uFFFD";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError, onWarn } = options;
  function emitError(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code2, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function emitWarn(tokenzer, code2, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onWarn) {
      const loc = location ? createLocation(start, end) : null;
      onWarn(createCompileWarn(code2, loc, args));
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index3) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index3, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key, modulo) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    if (modulo === true) {
      node.modulo = true;
    }
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 12) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 9) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 10) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 11:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 7:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    let modulo = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          modulo = true;
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || "", !!modulo));
          if (modulo) {
            emitWarn(tokenizer, CompileWarnCodes.USE_MODULO_SYNTAX, context.lastStartLoc, 0, getTokenCaption(token));
            modulo = null;
          }
          break;
        case 7:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 8: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 14 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 14);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 14) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 14) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 14) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "\u2026" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource2 = node;
      minify(resource2.body);
      resource2.b = resource2.body;
      delete resource2.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
  }
  delete node.type;
}
function createCodeGenerator(ast, options) {
  const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code2, node) {
    _context.code += code2;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  const sourceMap = !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    mode,
    filename,
    sourceMap,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code: code2, map } = generator.context();
  return {
    ast,
    code: code2,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index3 = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index3 + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index3++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index3++;
    c = path[index3];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject$1(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject$1(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index3 = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index3 : index3;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject$1(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index3) => _list[index3];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject$1(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject$1(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign({}, _list, _named)
  };
  return ctx;
}
const code$1$1 = CompileWarnCodes.__EXTEND_POINT__;
const inc$1$1 = incrementer(code$1$1);
const CoreWarnCodes = {
  NOT_FOUND_KEY: code$1$1,
  // 2
  FALLBACK_TO_TRANSLATE: inc$1$1(),
  // 3
  CANNOT_FORMAT_NUMBER: inc$1$1(),
  // 4
  FALLBACK_TO_NUMBER_FORMAT: inc$1$1(),
  // 5
  CANNOT_FORMAT_DATE: inc$1$1(),
  // 6
  FALLBACK_TO_DATE_FORMAT: inc$1$1(),
  // 7
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: inc$1$1(),
  // 8
  __EXTEND_POINT__: inc$1$1()
  // 9
};
const code$2 = CompileErrorCodes.__EXTEND_POINT__;
const inc$2 = incrementer(code$2);
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$2,
  // 17
  INVALID_DATE_ARGUMENT: inc$2(),
  // 18
  INVALID_ISO_DATE_ARGUMENT: inc$2(),
  // 19
  NOT_SUPPORT_NON_STRING_MESSAGE: inc$2(),
  // 20
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: inc$2(),
  // 21
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: inc$2(),
  // 22
  NOT_SUPPORT_LOCALE_TYPE: inc$2(),
  // 23
  __EXTEND_POINT__: inc$2()
  // 24
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve2 = locale();
        if (isPromise(resolve2)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve2;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject$1(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE$1;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.14.1";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE$1 = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject$1(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
};
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version2 = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE$1;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE$1 : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject(options.messages) ? options.messages : { [_locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject$1(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject$1(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject$1(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject$1(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version: version2,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales2) {
  const index3 = locales2.indexOf(targetLocale);
  if (index3 === -1) {
    return false;
  }
  for (let i = index3 + 1; i < locales2.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales2[i])) {
      return true;
    }
  }
  return false;
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = ast.b || ast.body;
  if ((body.t || body.type) === 1) {
    const plural = body;
    const cases = plural.c || plural.cases;
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const _static = node.s || node.static;
  if (_static) {
    return ctx.type === "text" ? _static : ctx.normalize([_static]);
  } else {
    const messages = (node.i || node.items).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = node.t || node.type;
  switch (type) {
    case 3: {
      const text = node;
      return text.v || text.value;
    }
    case 9: {
      const literal = node;
      return literal.v || literal.value;
    }
    case 4: {
      const named = node;
      return ctx.interpolate(ctx.named(named.k || named.key));
    }
    case 5: {
      const list = node;
      return ctx.interpolate(ctx.list(list.i != null ? list.i : list.index));
    }
    case 6: {
      const linked = node;
      const modifier = linked.m || linked.modifier;
      return ctx.linked(formatMessagePart(ctx, linked.k || linked.key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      const linkedKey = node;
      return linkedKey.v || linkedKey.value;
    }
    case 8: {
      const linkedModifier = node;
      return linkedModifier.v || linkedModifier.value;
    }
    default:
      throw new Error(`unhandled node type on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = /* @__PURE__ */ Object.create(null);
const isMessageAST = (val) => isObject$1(val) && (val.t === 0 || val.type === 0) && ("b" in val || "body" in val);
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
function compile(message, context) {
  if (isString(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: false,
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || {}
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject$1(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales2 = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales2.length; i++) {
    targetLocale = locales2[i];
    message = messages[targetLocale] || {};
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales2)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format2;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales2 = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales2.length; i++) {
    targetLocale = locales2[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales2 = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales2.length; i++) {
    targetLocale = locales2[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
/*!
  * vue-i18n v9.14.1
  * (c) 2024 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.14.1";
const code$1 = CoreWarnCodes.__EXTEND_POINT__;
const inc$1 = incrementer(code$1);
({
  FALLBACK_TO_ROOT: code$1,
  // 9
  NOT_SUPPORTED_PRESERVE: inc$1(),
  // 10
  NOT_SUPPORTED_FORMATTER: inc$1(),
  // 11
  NOT_SUPPORTED_PRESERVE_DIRECTIVE: inc$1(),
  // 12
  NOT_SUPPORTED_GET_CHOICE_INDEX: inc$1(),
  // 13
  COMPONENT_NAME_LEGACY_COMPATIBLE: inc$1(),
  // 14
  NOT_FOUND_PARENT_SCOPE: inc$1(),
  // 15
  IGNORE_OBJ_FLATTEN: inc$1(),
  // 16
  NOTICE_DROP_ALLOW_COMPOSITION: inc$1(),
  // 17
  NOTICE_DROP_TRANSLATE_EXIST_COMPATIBLE_FLAG: inc$1()
  // 18
});
const code = CoreErrorCodes.__EXTEND_POINT__;
const inc = incrementer(code);
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: code,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: inc(),
  // 25
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: inc(),
  // 26
  NOT_INSTALLED: inc(),
  // 27
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  // 28
  // directive module errors
  REQUIRED_VALUE: inc(),
  // 29
  INVALID_VALUE: inc(),
  // 30
  // vue-devtools errors
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  // 31
  NOT_INSTALLED_WITH_PROVIDE: inc(),
  // 32
  // unexpected error
  UNEXPECTED_ERROR: inc(),
  // 33
  // not compatible legacy vue-i18n constructor
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  // 34
  // bridge support vue 2.x only
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  // 35
  // need to define `i18n` option in `allowComposition: true` and `useScope: 'local' at `useI18n``
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  // 36
  // Not available Compostion API in Legacy API mode. Please make sure that the legacy API mode is working properly
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  // 37
  // for enhancement
  __EXTEND_POINT__: inc()
  // 38
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject$1(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject$1(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        if (!isObject$1(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        currentObj[subKeys[lastIndex]] = obj[key];
        delete obj[key];
      }
      if (isObject$1(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource: resource2 } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource2, ret[locale2]);
        } else {
          deepCopy(resource2, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject$1(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales2 = Object.keys(messages);
  if (locales2.length) {
    locales2.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject$1(options.datetimeFormats)) {
      const locales22 = Object.keys(options.datetimeFormats);
      if (locales22.length) {
        locales22.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject$1(options.numberFormats)) {
      const locales22 = Object.keys(options.numberFormats);
      if (locales22.length) {
        locales22.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = shallowRef;
  const translateExistCompatible = !!options.translateExistCompatible;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE$1
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler3) {
    _postTranslation = handler3;
    _context.postTranslation = handler3;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler3) {
    if (handler3 !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler3);
    }
    _missing = handler3;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if (false) ;
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root5) => Reflect.apply(root5.t, root5, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject$1(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root5) => Reflect.apply(root5.d, root5, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root5) => Reflect.apply(root5.n, root5, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root5) => root5[TranslateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root5) => root5[NumberPartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (root5) => root5[DatetimePartsSymbol](...args),
      NOOP_RETURN_ARRAY,
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return !translateExistCompatible ? isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved) : resolved != null;
    }, () => [key], "translate exists", (root5) => {
      return Reflect.apply(root5.te, root5, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales2 = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales2.length; i++) {
      const targetLocaleMessages = _messages.value[locales2[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage2(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage: mergeLocaleMessage2,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign({}, attrs);
      const tag = isString(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject$1(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index3) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index: index3, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index3}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    const tag = isString(props.tag) || isObject$1(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$2(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [!useI18nComponentName ? Translation.name : "i18n", "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n = {
      // mode
      get mode() {
        return "composition";
      },
      // allowComposition
      get allowComposition() {
        return __allowComposition;
      },
      // install plugin
      async install(app, ...options2) {
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n);
        if (isPlainObject(options2[0])) {
          const opts = options2[0];
          i18n.__composerExtend = opts.__composerExtend;
          i18n.__vueI18nExtend = opts.__vueI18nExtend;
        }
        let globalReleaseHandler = null;
        if (__globalInjection) {
          globalReleaseHandler = injectGlobalFields(app, i18n.global);
        }
        {
          apply(app, i18n, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          globalReleaseHandler && globalReleaseHandler();
          i18n.dispose();
          unmountApp();
        };
      },
      // global accessor
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      // @internal
      __instances,
      // @internal
      __getInstance,
      // @internal
      __setInstance,
      // @internal
      __deleteInstance
    };
    return i18n;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
    }
    return i18n;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root5 = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root5 === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  {
    return !useComponent ? target.parent : target.vnode.ctx || target.parent;
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
{
  registerMessageCompiler(compile);
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
function useLocaleHead({
  addDirAttribute = false,
  addSeoAttributes = false,
  identifierAttribute = "hid"
} = {}) {
  const common = initCommonComposableOptions();
  const metaObject = ref({
    htmlAttrs: {},
    link: [],
    meta: []
  });
  function updateMeta() {
    metaObject.value = localeHead(common, {
      addDirAttribute,
      addSeoAttributes,
      identifierAttribute
    });
  }
  {
    updateMeta();
  }
  return metaObject;
}
function useLocalePath() {
  return wrapComposable(localePath);
}
function useSwitchLocalePath() {
  return wrapComposable(switchLocalePath);
}
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(isToday);
dayjs.updateLocale("en");
dayjs.locale("en");
function _createForOfIteratorHelper$1(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$3$1(o)) || allowArrayLike) {
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
function _toConsumableArray$3(arr) {
  return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _unsupportedIterableToArray$3$1(arr) || _nonIterableSpread$3();
}
function _nonIterableSpread$3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$3(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$3$1(arr);
}
function _typeof$3$1(o) {
  "@babel/helpers - typeof";
  return _typeof$3$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3$1(o);
}
function _slicedToArray$1$1(arr, i) {
  return _arrayWithHoles$1$1(arr) || _iterableToArrayLimit$1$1(arr, i) || _unsupportedIterableToArray$3$1(arr, i) || _nonIterableRest$1$1();
}
function _nonIterableRest$1$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$3$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$3$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$3$1(o, minLen);
}
function _arrayLikeToArray$3$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1$1(arr) {
  if (Array.isArray(arr))
    return arr;
}
var DomHandler = {
  innerWidth: function innerWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  width: function width(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      return width2;
    }
    return 0;
  },
  getWindowScrollTop: function getWindowScrollTop() {
    var doc = (void 0).documentElement;
    return ((void 0).pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  },
  getWindowScrollLeft: function getWindowScrollLeft() {
    var doc = (void 0).documentElement;
    return ((void 0).pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  },
  getOuterWidth: function getOuterWidth(el, margin) {
    if (el) {
      var width2 = el.offsetWidth;
      if (margin) {
        var style = getComputedStyle(el);
        width2 += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      }
      return width2;
    }
    return 0;
  },
  getOuterHeight: function getOuterHeight(el, margin) {
    if (el) {
      var height = el.offsetHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getClientHeight: function getClientHeight(el, margin) {
    if (el) {
      var height = el.clientHeight;
      if (margin) {
        var style = getComputedStyle(el);
        height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }
      return height;
    }
    return 0;
  },
  getViewport: function getViewport() {
    var win = void 0, d = void 0, e = d.documentElement, g = d.getElementsByTagName("body")[0], w = win.innerWidth || e.clientWidth || g.clientWidth, h2 = win.innerHeight || e.clientHeight || g.clientHeight;
    return {
      width: w,
      height: h2
    };
  },
  getOffset: function getOffset(el) {
    if (el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + ((void 0).pageYOffset || (void 0).documentElement.scrollTop || (void 0).body.scrollTop || 0),
        left: rect.left + ((void 0).pageXOffset || (void 0).documentElement.scrollLeft || (void 0).body.scrollLeft || 0)
      };
    }
    return {
      top: "auto",
      left: "auto"
    };
  },
  index: function index(element) {
    if (element) {
      var _this$getParentNode;
      var children = (_this$getParentNode = this.getParentNode(element)) === null || _this$getParentNode === void 0 ? void 0 : _this$getParentNode.childNodes;
      var num = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i] === element)
          return num;
        if (children[i].nodeType === 1)
          num++;
      }
    }
    return -1;
  },
  addMultipleClasses: function addMultipleClasses(element, classNames) {
    var _this = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this.addClass(element, className);
        });
      });
    }
  },
  removeMultipleClasses: function removeMultipleClasses(element, classNames) {
    var _this2 = this;
    if (element && classNames) {
      [classNames].flat().filter(Boolean).forEach(function(cNames) {
        return cNames.split(" ").forEach(function(className) {
          return _this2.removeClass(element, className);
        });
      });
    }
  },
  addClass: function addClass(element, className) {
    if (element && className && !this.hasClass(element, className)) {
      if (element.classList)
        element.classList.add(className);
      else
        element.className += " " + className;
    }
  },
  removeClass: function removeClass(element, className) {
    if (element && className) {
      if (element.classList)
        element.classList.remove(className);
      else
        element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
  },
  hasClass: function hasClass(element, className) {
    if (element) {
      if (element.classList)
        return element.classList.contains(className);
      else
        return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    return false;
  },
  addStyles: function addStyles(element) {
    var styles = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (element) {
      Object.entries(styles).forEach(function(_ref) {
        var _ref2 = _slicedToArray$1$1(_ref, 2), key = _ref2[0], value = _ref2[1];
        return element.style[key] = value;
      });
    }
  },
  find: function find(element, selector) {
    return this.isElement(element) ? element.querySelectorAll(selector) : [];
  },
  findSingle: function findSingle(element, selector) {
    return this.isElement(element) ? element.querySelector(selector) : null;
  },
  createElement: function createElement(type) {
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (type) {
      var element = (void 0).createElement(type);
      this.setAttributes(element, attributes);
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }
      element.append.apply(element, children);
      return element;
    }
    return void 0;
  },
  setAttribute: function setAttribute(element) {
    var attribute = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var value = arguments.length > 2 ? arguments[2] : void 0;
    if (this.isElement(element) && value !== null && value !== void 0) {
      element.setAttribute(attribute, value);
    }
  },
  setAttributes: function setAttributes(element) {
    var _this3 = this;
    var attributes = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.isElement(element)) {
      var computedStyles = function computedStyles2(rule, value) {
        var _element$$attrs, _element$$attrs2;
        var styles = element !== null && element !== void 0 && (_element$$attrs = element.$attrs) !== null && _element$$attrs !== void 0 && _element$$attrs[rule] ? [element === null || element === void 0 || (_element$$attrs2 = element.$attrs) === null || _element$$attrs2 === void 0 ? void 0 : _element$$attrs2[rule]] : [];
        return [value].flat().reduce(function(cv, v) {
          if (v !== null && v !== void 0) {
            var type = _typeof$3$1(v);
            if (type === "string" || type === "number") {
              cv.push(v);
            } else if (type === "object") {
              var _cv = Array.isArray(v) ? computedStyles2(rule, v) : Object.entries(v).map(function(_ref3) {
                var _ref4 = _slicedToArray$1$1(_ref3, 2), _k = _ref4[0], _v = _ref4[1];
                return rule === "style" && (!!_v || _v === 0) ? "".concat(_k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), ":").concat(_v) : !!_v ? _k : void 0;
              });
              cv = _cv.length ? cv.concat(_cv.filter(function(c) {
                return !!c;
              })) : cv;
            }
          }
          return cv;
        }, styles);
      };
      Object.entries(attributes).forEach(function(_ref5) {
        var _ref6 = _slicedToArray$1$1(_ref5, 2), key = _ref6[0], value = _ref6[1];
        if (value !== void 0 && value !== null) {
          var matchedEvent = key.match(/^on(.+)/);
          if (matchedEvent) {
            element.addEventListener(matchedEvent[1].toLowerCase(), value);
          } else if (key === "p-bind") {
            _this3.setAttributes(element, value);
          } else {
            value = key === "class" ? _toConsumableArray$3(new Set(computedStyles("class", value))).join(" ").trim() : key === "style" ? computedStyles("style", value).join(";").trim() : value;
            (element.$attrs = element.$attrs || {}) && (element.$attrs[key] = value);
            element.setAttribute(key, value);
          }
        }
      });
    }
  },
  getAttribute: function getAttribute(element, name) {
    if (this.isElement(element)) {
      var value = element.getAttribute(name);
      if (!isNaN(value)) {
        return +value;
      }
      if (value === "true" || value === "false") {
        return value === "true";
      }
      return value;
    }
    return void 0;
  },
  isAttributeEquals: function isAttributeEquals(element, name, value) {
    return this.isElement(element) ? this.getAttribute(element, name) === value : false;
  },
  isAttributeNotEquals: function isAttributeNotEquals(element, name, value) {
    return !this.isAttributeEquals(element, name, value);
  },
  getHeight: function getHeight(el) {
    if (el) {
      var height = el.offsetHeight;
      var style = getComputedStyle(el);
      height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      return height;
    }
    return 0;
  },
  getWidth: function getWidth(el) {
    if (el) {
      var width2 = el.offsetWidth;
      var style = getComputedStyle(el);
      width2 -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
      return width2;
    }
    return 0;
  },
  absolutePosition: function absolutePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var elementOuterHeight = elementDimensions.height;
      var elementOuterWidth = elementDimensions.width;
      var targetOuterHeight = target.offsetHeight;
      var targetOuterWidth = target.offsetWidth;
      var targetOffset = target.getBoundingClientRect();
      var windowScrollTop = this.getWindowScrollTop();
      var windowScrollLeft = this.getWindowScrollLeft();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
        top = targetOffset.top + windowScrollTop - elementOuterHeight;
        origin = "bottom";
        if (top < 0) {
          top = windowScrollTop;
        }
      } else {
        top = targetOuterHeight + targetOffset.top + windowScrollTop;
      }
      if (targetOffset.left + elementOuterWidth > viewport.width)
        left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
      else
        left = targetOffset.left + windowScrollLeft;
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  relativePosition: function relativePosition(element, target) {
    var gutter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
    if (element) {
      var elementDimensions = element.offsetParent ? {
        width: element.offsetWidth,
        height: element.offsetHeight
      } : this.getHiddenElementDimensions(element);
      var targetHeight = target.offsetHeight;
      var targetOffset = target.getBoundingClientRect();
      var viewport = this.getViewport();
      var top, left, origin = "top";
      if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) {
        top = -1 * elementDimensions.height;
        origin = "bottom";
        if (targetOffset.top + top < 0) {
          top = -1 * targetOffset.top;
        }
      } else {
        top = targetHeight;
      }
      if (elementDimensions.width > viewport.width) {
        left = targetOffset.left * -1;
      } else if (targetOffset.left + elementDimensions.width > viewport.width) {
        left = (targetOffset.left + elementDimensions.width - viewport.width) * -1;
      } else {
        left = 0;
      }
      element.style.top = top + "px";
      element.style.left = left + "px";
      element.style.transformOrigin = origin;
      gutter && (element.style.marginTop = origin === "bottom" ? "calc(var(--p-anchor-gutter) * -1)" : "calc(var(--p-anchor-gutter))");
    }
  },
  nestedPosition: function nestedPosition(element, level) {
    if (element) {
      var parentItem = element.parentElement;
      var elementOffset = this.getOffset(parentItem);
      var viewport = this.getViewport();
      var sublistWidth = element.offsetParent ? element.offsetWidth : this.getHiddenElementOuterWidth(element);
      var itemOuterWidth = this.getOuterWidth(parentItem.children[0]);
      var left;
      if (parseInt(elementOffset.left, 10) + itemOuterWidth + sublistWidth > viewport.width - this.calculateScrollbarWidth()) {
        if (parseInt(elementOffset.left, 10) < sublistWidth) {
          if (level % 2 === 1) {
            left = parseInt(elementOffset.left, 10) ? "-" + parseInt(elementOffset.left, 10) + "px" : "100%";
          } else if (level % 2 === 0) {
            left = viewport.width - sublistWidth - this.calculateScrollbarWidth() + "px";
          }
        } else {
          left = "-100%";
        }
      } else {
        left = "100%";
      }
      element.style.top = "0px";
      element.style.left = left;
    }
  },
  getParentNode: function getParentNode(element) {
    var parent = element === null || element === void 0 ? void 0 : element.parentNode;
    if (parent && parent instanceof ShadowRoot && parent.host) {
      parent = parent.host;
    }
    return parent;
  },
  getParents: function getParents(element) {
    var parents = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var parent = this.getParentNode(element);
    return parent === null ? parents : this.getParents(parent, parents.concat([parent]));
  },
  getScrollableParents: function getScrollableParents(element) {
    var scrollableParents = [];
    if (element) {
      var parents = this.getParents(element);
      var overflowRegex = /(auto|scroll)/;
      var overflowCheck = function overflowCheck2(node) {
        try {
          var styleDeclaration = (void 0)["getComputedStyle"](node, null);
          return overflowRegex.test(styleDeclaration.getPropertyValue("overflow")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowX")) || overflowRegex.test(styleDeclaration.getPropertyValue("overflowY"));
        } catch (err) {
          return false;
        }
      };
      var _iterator = _createForOfIteratorHelper$1(parents), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var parent = _step.value;
          var scrollSelectors = parent.nodeType === 1 && parent.dataset["scrollselectors"];
          if (scrollSelectors) {
            var selectors = scrollSelectors.split(",");
            var _iterator2 = _createForOfIteratorHelper$1(selectors), _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var selector = _step2.value;
                var el = this.findSingle(parent, selector);
                if (el && overflowCheck(el)) {
                  scrollableParents.push(el);
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
          if (parent.nodeType !== 9 && overflowCheck(parent)) {
            scrollableParents.push(parent);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return scrollableParents;
  },
  getHiddenElementOuterHeight: function getHiddenElementOuterHeight(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementHeight = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementHeight;
    }
    return 0;
  },
  getHiddenElementOuterWidth: function getHiddenElementOuterWidth(element) {
    if (element) {
      element.style.visibility = "hidden";
      element.style.display = "block";
      var elementWidth = element.offsetWidth;
      element.style.display = "none";
      element.style.visibility = "visible";
      return elementWidth;
    }
    return 0;
  },
  getHiddenElementDimensions: function getHiddenElementDimensions(element) {
    if (element) {
      var dimensions = {};
      element.style.visibility = "hidden";
      element.style.display = "block";
      dimensions.width = element.offsetWidth;
      dimensions.height = element.offsetHeight;
      element.style.display = "none";
      element.style.visibility = "visible";
      return dimensions;
    }
    return 0;
  },
  fadeIn: function fadeIn(element, duration2) {
    if (element) {
      element.style.opacity = 0;
      var last = +/* @__PURE__ */ new Date();
      var opacity = 0;
      var tick = function tick2() {
        opacity = +element.style.opacity + ((/* @__PURE__ */ new Date()).getTime() - last) / duration2;
        element.style.opacity = opacity;
        last = +/* @__PURE__ */ new Date();
        if (+opacity < 1) {
          (void 0).requestAnimationFrame && requestAnimationFrame(tick2) || setTimeout(tick2, 16);
        }
      };
      tick();
    }
  },
  fadeOut: function fadeOut(element, ms) {
    if (element) {
      var opacity = 1, interval = 50, duration2 = ms, gap = interval / duration2;
      var fading = setInterval(function() {
        opacity -= gap;
        if (opacity <= 0) {
          opacity = 0;
          clearInterval(fading);
        }
        element.style.opacity = opacity;
      }, interval);
    }
  },
  getUserAgent: function getUserAgent() {
    return (void 0).userAgent;
  },
  appendChild: function appendChild(element, target) {
    if (this.isElement(target))
      target.appendChild(element);
    else if (target.el && target.elElement)
      target.elElement.appendChild(element);
    else
      throw new Error("Cannot append " + target + " to " + element);
  },
  isElement: function isElement(obj) {
    return (typeof HTMLElement === "undefined" ? "undefined" : _typeof$3$1(HTMLElement)) === "object" ? obj instanceof HTMLElement : obj && _typeof$3$1(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
  },
  scrollInView: function scrollInView(container, item) {
    var borderTopValue = getComputedStyle(container).getPropertyValue("borderTopWidth");
    var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
    var paddingTopValue = getComputedStyle(container).getPropertyValue("paddingTop");
    var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
    var containerRect = container.getBoundingClientRect();
    var itemRect = item.getBoundingClientRect();
    var offset = itemRect.top + (void 0).body.scrollTop - (containerRect.top + (void 0).body.scrollTop) - borderTop - paddingTop;
    var scroll = container.scrollTop;
    var elementHeight = container.clientHeight;
    var itemHeight = this.getOuterHeight(item);
    if (offset < 0) {
      container.scrollTop = scroll + offset;
    } else if (offset + itemHeight > elementHeight) {
      container.scrollTop = scroll + offset - elementHeight + itemHeight;
    }
  },
  clearSelection: function clearSelection() {
    if ((void 0).getSelection) {
      if ((void 0).getSelection().empty) {
        (void 0).getSelection().empty();
      } else if ((void 0).getSelection().removeAllRanges && (void 0).getSelection().rangeCount > 0 && (void 0).getSelection().getRangeAt(0).getClientRects().length > 0) {
        (void 0).getSelection().removeAllRanges();
      }
    } else if ((void 0)["selection"] && (void 0)["selection"].empty) {
      try {
        (void 0)["selection"].empty();
      } catch (error) {
      }
    }
  },
  getSelection: function getSelection() {
    if ((void 0).getSelection)
      return (void 0).getSelection().toString();
    else if ((void 0).getSelection)
      return (void 0).getSelection().toString();
    else if ((void 0)["selection"])
      return (void 0)["selection"].createRange().text;
    return null;
  },
  calculateScrollbarWidth: function calculateScrollbarWidth() {
    if (this.calculatedScrollbarWidth != null)
      return this.calculatedScrollbarWidth;
    var scrollDiv = (void 0).createElement("div");
    this.addStyles(scrollDiv, {
      width: "100px",
      height: "100px",
      overflow: "scroll",
      position: "absolute",
      top: "-9999px"
    });
    (void 0).body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    (void 0).body.removeChild(scrollDiv);
    this.calculatedScrollbarWidth = scrollbarWidth;
    return scrollbarWidth;
  },
  calculateBodyScrollbarWidth: function calculateBodyScrollbarWidth() {
    return (void 0).innerWidth - (void 0).documentElement.offsetWidth;
  },
  getBrowser: function getBrowser() {
    if (!this.browser) {
      var matched = this.resolveUserAgent();
      this.browser = {};
      if (matched.browser) {
        this.browser[matched.browser] = true;
        this.browser["version"] = matched.version;
      }
      if (this.browser["chrome"]) {
        this.browser["webkit"] = true;
      } else if (this.browser["webkit"]) {
        this.browser["safari"] = true;
      }
    }
    return this.browser;
  },
  resolveUserAgent: function resolveUserAgent() {
    var ua = (void 0).userAgent.toLowerCase();
    var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: match[2] || "0"
    };
  },
  isVisible: function isVisible(element) {
    return element && element.offsetParent != null;
  },
  invokeElementMethod: function invokeElementMethod(element, methodName, args) {
    element[methodName].apply(element, args);
  },
  isExist: function isExist(element) {
    return !!(element !== null && typeof element !== "undefined" && element.nodeName && this.getParentNode(element));
  },
  isClient: function isClient() {
    return false;
  },
  focus: function focus(el, options) {
    el && (void 0).activeElement !== el && el.focus(options);
  },
  isFocusableElement: function isFocusableElement(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.isElement(element) ? element.matches('button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector)) : false;
  },
  getFocusableElements: function getFocusableElements(element) {
    var selector = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var focusableElements = this.find(element, 'button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])'.concat(selector, ',\n                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector, ',\n                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])').concat(selector));
    var visibleFocusableElements = [];
    var _iterator3 = _createForOfIteratorHelper$1(focusableElements), _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var focusableElement = _step3.value;
        if (getComputedStyle(focusableElement).display != "none" && getComputedStyle(focusableElement).visibility != "hidden")
          visibleFocusableElements.push(focusableElement);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    return visibleFocusableElements;
  },
  getFirstFocusableElement: function getFirstFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  },
  getLastFocusableElement: function getLastFocusableElement(element, selector) {
    var focusableElements = this.getFocusableElements(element, selector);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  },
  getNextFocusableElement: function getNextFocusableElement(container, element, selector) {
    var focusableElements = this.getFocusableElements(container, selector);
    var index22 = focusableElements.length > 0 ? focusableElements.findIndex(function(el) {
      return el === element;
    }) : -1;
    var nextIndex = index22 > -1 && focusableElements.length >= index22 + 1 ? index22 + 1 : -1;
    return nextIndex > -1 ? focusableElements[nextIndex] : null;
  },
  getPreviousElementSibling: function getPreviousElementSibling(element, selector) {
    var previousElement = element.previousElementSibling;
    while (previousElement) {
      if (previousElement.matches(selector)) {
        return previousElement;
      } else {
        previousElement = previousElement.previousElementSibling;
      }
    }
    return null;
  },
  getNextElementSibling: function getNextElementSibling(element, selector) {
    var nextElement = element.nextElementSibling;
    while (nextElement) {
      if (nextElement.matches(selector)) {
        return nextElement;
      } else {
        nextElement = nextElement.nextElementSibling;
      }
    }
    return null;
  },
  isClickable: function isClickable(element) {
    if (element) {
      var targetNode = element.nodeName;
      var parentNode = element.parentElement && element.parentElement.nodeName;
      return targetNode === "INPUT" || targetNode === "TEXTAREA" || targetNode === "BUTTON" || targetNode === "A" || parentNode === "INPUT" || parentNode === "TEXTAREA" || parentNode === "BUTTON" || parentNode === "A" || !!element.closest(".p-button, .p-checkbox, .p-radiobutton");
    }
    return false;
  },
  applyStyle: function applyStyle(element, style) {
    if (typeof style === "string") {
      element.style.cssText = style;
    } else {
      for (var prop in style) {
        element.style[prop] = style[prop];
      }
    }
  },
  isIOS: function isIOS() {
    return /iPad|iPhone|iPod/.test((void 0).userAgent) && !(void 0)["MSStream"];
  },
  isAndroid: function isAndroid() {
    return /(android)/i.test((void 0).userAgent);
  },
  isTouchDevice: function isTouchDevice() {
    return "ontouchstart" in void 0 || (void 0).maxTouchPoints > 0 || (void 0).msMaxTouchPoints > 0;
  },
  hasCSSAnimation: function hasCSSAnimation(element) {
    if (element) {
      var style = getComputedStyle(element);
      var animationDuration = parseFloat(style.getPropertyValue("animation-duration") || "0");
      return animationDuration > 0;
    }
    return false;
  },
  hasCSSTransition: function hasCSSTransition(element) {
    if (element) {
      var style = getComputedStyle(element);
      var transitionDuration = parseFloat(style.getPropertyValue("transition-duration") || "0");
      return transitionDuration > 0;
    }
    return false;
  },
  exportCSV: function exportCSV(csv, filename) {
    var blob = new Blob([csv], {
      type: "application/csv;charset=utf-8;"
    });
    if ((void 0).navigator.msSaveOrOpenBlob) {
      (void 0).msSaveOrOpenBlob(blob, filename + ".csv");
    } else {
      var link = (void 0).createElement("a");
      if (link.download !== void 0) {
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", filename + ".csv");
        link.style.display = "none";
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
      } else {
        csv = "data:text/csv;charset=utf-8," + csv;
        (void 0).open(encodeURI(csv));
      }
    }
  },
  blockBodyScroll: function blockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    (void 0).body.style.setProperty("--scrollbar-width", this.calculateBodyScrollbarWidth() + "px");
    this.addClass((void 0).body, className);
  },
  unblockBodyScroll: function unblockBodyScroll() {
    var className = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "p-overflow-hidden";
    (void 0).body.style.removeProperty("--scrollbar-width");
    this.removeClass((void 0).body, className);
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
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1$2(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey$1$2(t) {
  var i = _toPrimitive$1$2(t, "string");
  return "symbol" == _typeof$2$1(i) ? i : String(i);
}
function _toPrimitive$1$2(t, r) {
  if ("object" != _typeof$2$1(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2$1(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var ConnectedOverlayScrollHandler = /* @__PURE__ */ function() {
  function ConnectedOverlayScrollHandler2(element) {
    var listener = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : function() {
    };
    _classCallCheck$1(this, ConnectedOverlayScrollHandler2);
    this.element = element;
    this.listener = listener;
  }
  _createClass$1(ConnectedOverlayScrollHandler2, [{
    key: "bindScrollListener",
    value: function bindScrollListener() {
      this.scrollableParents = DomHandler.getScrollableParents(this.element);
      for (var i = 0; i < this.scrollableParents.length; i++) {
        this.scrollableParents[i].addEventListener("scroll", this.listener);
      }
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollableParents) {
        for (var i = 0; i < this.scrollableParents.length; i++) {
          this.scrollableParents[i].removeEventListener("scroll", this.listener);
        }
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.unbindScrollListener();
      this.element = null;
      this.listener = null;
      this.scrollableParents = null;
    }
  }]);
  return ConnectedOverlayScrollHandler2;
}();
function primebus() {
  var allHandlers = /* @__PURE__ */ new Map();
  return {
    on: function on(type, handler22) {
      var handlers = allHandlers.get(type);
      if (!handlers)
        handlers = [handler22];
      else
        handlers.push(handler22);
      allHandlers.set(type, handlers);
    },
    off: function off(type, handler22) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler22) >>> 0, 1);
      }
    },
    emit: function emit(type, evt) {
      var handlers = allHandlers.get(type);
      if (handlers) {
        handlers.slice().map(function(handler22) {
          handler22(evt);
        });
      }
    }
  };
}
function _slicedToArray$3(arr, i) {
  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$2$1(arr, i) || _nonIterableRest$3();
}
function _nonIterableRest$3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArrayLimit$3(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$3(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _toConsumableArray$2(arr) {
  return _arrayWithoutHoles$2(arr) || _iterableToArray$2$1(arr) || _unsupportedIterableToArray$2$1(arr) || _nonIterableSpread$2();
}
function _nonIterableSpread$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray$2$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$2(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$2$1(arr);
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray$2$1(o)) || allowArrayLike) {
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
function _unsupportedIterableToArray$2$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$2$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$2$1(o, minLen);
}
function _arrayLikeToArray$2$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _typeof$1$2(o) {
  "@babel/helpers - typeof";
  return _typeof$1$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1$2(o);
}
var ObjectUtils = {
  equals: function equals(obj1, obj2, field) {
    if (field)
      return this.resolveFieldData(obj1, field) === this.resolveFieldData(obj2, field);
    else
      return this.deepEquals(obj1, obj2);
  },
  deepEquals: function deepEquals(a, b) {
    if (a === b)
      return true;
    if (a && b && _typeof$1$2(a) == "object" && _typeof$1$2(b) == "object") {
      var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
      if (arrA && arrB) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!this.deepEquals(a[i], b[i]))
            return false;
        return true;
      }
      if (arrA != arrB)
        return false;
      var dateA = a instanceof Date, dateB = b instanceof Date;
      if (dateA != dateB)
        return false;
      if (dateA && dateB)
        return a.getTime() == b.getTime();
      var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
      if (regexpA != regexpB)
        return false;
      if (regexpA && regexpB)
        return a.toString() == b.toString();
      var keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        key = keys[i];
        if (!this.deepEquals(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  },
  resolveFieldData: function resolveFieldData(data2, field) {
    if (!data2 || !field) {
      return null;
    }
    try {
      var value = data2[field];
      if (this.isNotEmpty(value))
        return value;
    } catch (_unused) {
    }
    if (Object.keys(data2).length) {
      if (this.isFunction(field)) {
        return field(data2);
      } else if (field.indexOf(".") === -1) {
        return data2[field];
      } else {
        var fields = field.split(".");
        var _value = data2;
        for (var i = 0, len = fields.length; i < len; ++i) {
          if (_value == null) {
            return null;
          }
          _value = _value[fields[i]];
        }
        return _value;
      }
    }
    return null;
  },
  getItemValue: function getItemValue(obj) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }
    return this.isFunction(obj) ? obj.apply(void 0, params) : obj;
  },
  filter: function filter(value, fields, filterValue) {
    var filteredItems = [];
    if (value) {
      var _iterator = _createForOfIteratorHelper(value), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var item = _step.value;
          var _iterator2 = _createForOfIteratorHelper(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              if (String(this.resolveFieldData(item, field)).toLowerCase().indexOf(filterValue.toLowerCase()) > -1) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return filteredItems;
  },
  reorderArray: function reorderArray(value, from, to) {
    if (value && from !== to) {
      if (to >= value.length) {
        to %= value.length;
        from %= value.length;
      }
      value.splice(to, 0, value.splice(from, 1)[0]);
    }
  },
  findIndexInList: function findIndexInList(value, list) {
    var index22 = -1;
    if (list) {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === value) {
          index22 = i;
          break;
        }
      }
    }
    return index22;
  },
  contains: function contains(value, list) {
    if (value != null && list && list.length) {
      var _iterator3 = _createForOfIteratorHelper(list), _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
          var val = _step3.value;
          if (this.equals(value, val))
            return true;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
    return false;
  },
  insertIntoOrderedArray: function insertIntoOrderedArray(item, index22, arr, sourceArr) {
    if (arr.length > 0) {
      var injected = false;
      for (var i = 0; i < arr.length; i++) {
        var currentItemIndex = this.findIndexInList(arr[i], sourceArr);
        if (currentItemIndex > index22) {
          arr.splice(i, 0, item);
          injected = true;
          break;
        }
      }
      if (!injected) {
        arr.push(item);
      }
    } else {
      arr.push(item);
    }
  },
  removeAccents: function removeAccents(str) {
    if (str && str.search(/[\xC0-\xFF]/g) > -1) {
      str = str.replace(/[\xC0-\xC5]/g, "A").replace(/[\xC6]/g, "AE").replace(/[\xC7]/g, "C").replace(/[\xC8-\xCB]/g, "E").replace(/[\xCC-\xCF]/g, "I").replace(/[\xD0]/g, "D").replace(/[\xD1]/g, "N").replace(/[\xD2-\xD6\xD8]/g, "O").replace(/[\xD9-\xDC]/g, "U").replace(/[\xDD]/g, "Y").replace(/[\xDE]/g, "P").replace(/[\xE0-\xE5]/g, "a").replace(/[\xE6]/g, "ae").replace(/[\xE7]/g, "c").replace(/[\xE8-\xEB]/g, "e").replace(/[\xEC-\xEF]/g, "i").replace(/[\xF1]/g, "n").replace(/[\xF2-\xF6\xF8]/g, "o").replace(/[\xF9-\xFC]/g, "u").replace(/[\xFE]/g, "p").replace(/[\xFD\xFF]/g, "y");
    }
    return str;
  },
  getVNodeProp: function getVNodeProp(vnode, prop) {
    if (vnode) {
      var props = vnode.props;
      if (props) {
        var kebabProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        var propName = Object.prototype.hasOwnProperty.call(props, kebabProp) ? kebabProp : prop;
        return vnode.type["extends"].props[prop].type === Boolean && props[propName] === "" ? true : props[propName];
      }
    }
    return null;
  },
  toFlatCase: function toFlatCase(str) {
    return this.isString(str) ? str.replace(/(-|_)/g, "").toLowerCase() : str;
  },
  toKebabCase: function toKebabCase(str) {
    return this.isString(str) ? str.replace(/(_)/g, "-").replace(/[A-Z]/g, function(c, i) {
      return i === 0 ? c : "-" + c.toLowerCase();
    }).toLowerCase() : str;
  },
  toCapitalCase: function toCapitalCase(str) {
    return this.isString(str, {
      empty: false
    }) ? str[0].toUpperCase() + str.slice(1) : str;
  },
  isEmpty: function isEmpty(value) {
    return value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0 || !(value instanceof Date) && _typeof$1$2(value) === "object" && Object.keys(value).length === 0;
  },
  isNotEmpty: function isNotEmpty(value) {
    return !this.isEmpty(value);
  },
  isFunction: function isFunction2(value) {
    return !!(value && value.constructor && value.call && value.apply);
  },
  isObject: function isObject(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return value instanceof Object && value.constructor === Object && (empty || Object.keys(value).length !== 0);
  },
  isDate: function isDate2(value) {
    return value instanceof Date && value.constructor === Date;
  },
  isArray: function isArray2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return Array.isArray(value) && (empty || value.length !== 0);
  },
  isString: function isString2(value) {
    var empty = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    return typeof value === "string" && (empty || value !== "");
  },
  isPrintableCharacter: function isPrintableCharacter() {
    var _char = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    return this.isNotEmpty(_char) && _char.length === 1 && _char.match(/\S| /);
  },
  /**
   * Firefox-v103 does not currently support the "findLast" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlast
   */
  findLast: function findLast(arr, callback) {
    var item;
    if (this.isNotEmpty(arr)) {
      try {
        item = arr.findLast(callback);
      } catch (_unused2) {
        item = _toConsumableArray$2(arr).reverse().find(callback);
      }
    }
    return item;
  },
  /**
   * Firefox-v103 does not currently support the "findLastIndex" method. It is stated that this method will be supported with Firefox-v104.
   * https://caniuse.com/mdn-javascript_builtins_array_findlastindex
   */
  findLastIndex: function findLastIndex(arr, callback) {
    var index22 = -1;
    if (this.isNotEmpty(arr)) {
      try {
        index22 = arr.findLastIndex(callback);
      } catch (_unused3) {
        index22 = arr.lastIndexOf(_toConsumableArray$2(arr).reverse().find(callback));
      }
    }
    return index22;
  },
  sort: function sort(value1, value2) {
    var order = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var comparator = arguments.length > 3 ? arguments[3] : void 0;
    var nullSortOrder = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 1;
    var result = this.compare(value1, value2, comparator, order);
    var finalSortOrder = order;
    if (this.isEmpty(value1) || this.isEmpty(value2)) {
      finalSortOrder = nullSortOrder === 1 ? order : nullSortOrder;
    }
    return finalSortOrder * result;
  },
  compare: function compare(value1, value2, comparator) {
    var order = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1;
    var result = -1;
    var emptyValue1 = this.isEmpty(value1);
    var emptyValue2 = this.isEmpty(value2);
    if (emptyValue1 && emptyValue2)
      result = 0;
    else if (emptyValue1)
      result = order;
    else if (emptyValue2)
      result = -order;
    else if (typeof value1 === "string" && typeof value2 === "string")
      result = comparator(value1, value2);
    else
      result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
    return result;
  },
  localeComparator: function localeComparator() {
    return new Intl.Collator(void 0, {
      numeric: true
    }).compare;
  },
  nestedKeys: function nestedKeys() {
    var _this = this;
    var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var parentKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return Object.entries(obj).reduce(function(o, _ref) {
      var _ref2 = _slicedToArray$3(_ref, 2), key = _ref2[0], value = _ref2[1];
      var currentKey = parentKey ? "".concat(parentKey, ".").concat(key) : key;
      _this.isObject(value) ? o = o.concat(_this.nestedKeys(value, currentKey)) : o.push(currentKey);
      return o;
    }, []);
  },
  stringify: function stringify(value) {
    var _this2 = this;
    var indent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
    var currentIndent = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    var currentIndentStr = " ".repeat(currentIndent);
    var nextIndentStr = " ".repeat(currentIndent + indent);
    if (this.isArray(value)) {
      return "[" + value.map(function(v) {
        return _this2.stringify(v, indent, currentIndent + indent);
      }).join(", ") + "]";
    } else if (this.isDate(value)) {
      return value.toISOString();
    } else if (this.isFunction(value)) {
      return value.toString();
    } else if (this.isObject(value)) {
      return "{\n" + Object.entries(value).map(function(_ref3) {
        var _ref4 = _slicedToArray$3(_ref3, 2), k = _ref4[0], v = _ref4[1];
        return "".concat(nextIndentStr).concat(k, ": ").concat(_this2.stringify(v, indent, currentIndent + indent));
      }).join(",\n") + "\n".concat(currentIndentStr) + "}";
    } else {
      return JSON.stringify(value);
    }
  }
};
var lastId = 0;
function UniqueComponentId() {
  var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "pv_id_";
  lastId++;
  return "".concat(prefix).concat(lastId);
}
function _toConsumableArray$4(arr) {
  return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _unsupportedIterableToArray$5(arr) || _nonIterableSpread$4();
}
function _nonIterableSpread$4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$5(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$5(o, minLen);
}
function _iterableToArray$4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$4(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$5(arr);
}
function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function handler() {
  var zIndexes = [];
  var generateZIndex = function generateZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 999;
    var lastZIndex = getLastZIndex(key, autoZIndex, baseZIndex);
    var newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
    zIndexes.push({
      key,
      value: newZIndex
    });
    return newZIndex;
  };
  var revertZIndex = function revertZIndex2(zIndex) {
    zIndexes = zIndexes.filter(function(obj) {
      return obj.value !== zIndex;
    });
  };
  var getCurrentZIndex = function getCurrentZIndex2(key, autoZIndex) {
    return getLastZIndex(key, autoZIndex).value;
  };
  var getLastZIndex = function getLastZIndex2(key, autoZIndex) {
    var baseZIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
    return _toConsumableArray$4(zIndexes).reverse().find(function(obj) {
      return true;
    }) || {
      key,
      value: baseZIndex
    };
  };
  var getZIndex = function getZIndex2(el) {
    return el ? parseInt(el.style.zIndex, 10) || 0 : 0;
  };
  return {
    get: getZIndex,
    set: function set2(key, el, baseZIndex) {
      if (el) {
        el.style.zIndex = String(generateZIndex(key, true, baseZIndex));
      }
    },
    clear: function clear(el) {
      if (el) {
        revertZIndex(getZIndex(el));
        el.style.zIndex = "";
      }
    },
    getCurrent: function getCurrent(key) {
      return getCurrentZIndex(key, true);
    }
  };
}
var ZIndexUtils = handler();
var PrimeVueToastSymbol = Symbol();
function useToast() {
  var PrimeVueToast = inject(PrimeVueToastSymbol);
  if (!PrimeVueToast) {
    throw new Error("No PrimeVue Toast provided!");
  }
  return PrimeVueToast;
}
function _typeof$5(o) {
  "@babel/helpers - typeof";
  return _typeof$5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$5(o);
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
  return "symbol" == _typeof$5(i) ? i : String(i);
}
function _toPrimitive$5(t, r) {
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
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance())
    onMounted(fn);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
var _id = 0;
function useStyle(css2) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css2);
  var styleRef = ref(null);
  var defaultDocument = DomHandler.isClient() ? (void 0).document : void 0;
  var _options$document = options.document, document = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load = function load2(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document)
      return;
    var _styleProps = _objectSpread$5(_objectSpread$5({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document.getElementById(_id2) || document.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css2;
      DomHandler.setAttributes(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      document.head.appendChild(styleRef.value);
      DomHandler.setAttribute(styleRef.value, "data-primevue-style-id", name);
      DomHandler.setAttributes(styleRef.value, _styleProps);
    }
    if (isLoaded.value)
      return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document || !isLoaded.value)
      return;
    stop();
    DomHandler.isExist(styleRef.value) && document.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual)
    tryOnMounted(load);
  return {
    id,
    name,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
function _typeof$4(o) {
  "@babel/helpers - typeof";
  return _typeof$4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$4(o);
}
function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$4(arr, i) || _nonIterableRest$2();
}
function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$4(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$4(o, minLen);
}
function _arrayLikeToArray$4(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$2(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr))
    return arr;
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
  return "symbol" == _typeof$4(i) ? i : String(i);
}
function _toPrimitive$4(t, r) {
  if ("object" != _typeof$4(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$4(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var css$1 = "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: var(--scrollbar-width);\n}\n";
var classes$7 = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css: css$1,
  classes: classes$7,
  inlineStyles,
  loadStyle: function loadStyle() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.css ? useStyle(this.css, _objectSpread$4({
      name: this.name
    }, options)) : {};
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _props = Object.entries(props).reduce(function(acc, _ref) {
        var _ref2 = _slicedToArray$2(_ref, 2), k = _ref2[0], v = _ref2[1];
        return acc.push("".concat(k, '="').concat(v, '"')) && acc;
      }, []).join(" ");
      return '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(this.css).concat(extendedCSS, "</style>");
    }
    return "";
  },
  extend: function extend(style) {
    return _objectSpread$4(_objectSpread$4({}, this), {}, {
      css: void 0
    }, style);
  }
};
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _arrayLikeToArray$3(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit$1(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l)
        ;
      else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr))
    return arr;
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
  return "symbol" == _typeof$3(i) ? i : String(i);
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BaseDirective = {
  _getMeta: function _getMeta() {
    return [ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? void 0 : arguments.length <= 0 ? void 0 : arguments[0], ObjectUtils.getItemValue(ObjectUtils.isObject(arguments.length <= 0 ? void 0 : arguments[0]) ? arguments.length <= 0 ? void 0 : arguments[0] : arguments.length <= 1 ? void 0 : arguments[1])];
  },
  _getConfig: function _getConfig(binding, vnode) {
    var _ref, _binding$instance, _vnode$ctx;
    return (_ref = (binding === null || binding === void 0 || (_binding$instance = binding.instance) === null || _binding$instance === void 0 ? void 0 : _binding$instance.$primevue) || (vnode === null || vnode === void 0 || (_vnode$ctx = vnode.ctx) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.appContext) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.config) === null || _vnode$ctx === void 0 || (_vnode$ctx = _vnode$ctx.globalProperties) === null || _vnode$ctx === void 0 ? void 0 : _vnode$ctx.$primevue)) === null || _ref === void 0 ? void 0 : _ref.config;
  },
  _getOptionValue: function _getOptionValue(options) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var fKeys = ObjectUtils.toFlatCase(key).split(".");
    var fKey = fKeys.shift();
    return fKey ? ObjectUtils.isObject(options) ? BaseDirective._getOptionValue(ObjectUtils.getItemValue(options[Object.keys(options).find(function(k) {
      return ObjectUtils.toFlatCase(k) === fKey;
    }) || ""], params), fKeys.join("."), params) : void 0 : ObjectUtils.getItemValue(options, params);
  },
  _getPTValue: function _getPTValue() {
    var _instance$binding, _instance$$primevueCo;
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var obj = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var key = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "";
    var params = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    var searchInDefaultPT = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : true;
    var getValue = function getValue2() {
      var value = BaseDirective._getOptionValue.apply(BaseDirective, arguments);
      return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? {
        "class": value
      } : value;
    };
    var _ref2 = ((_instance$binding = instance.binding) === null || _instance$binding === void 0 || (_instance$binding = _instance$binding.value) === null || _instance$binding === void 0 ? void 0 : _instance$binding.ptOptions) || ((_instance$$primevueCo = instance.$primevueConfig) === null || _instance$$primevueCo === void 0 ? void 0 : _instance$$primevueCo.ptOptions) || {}, _ref2$mergeSections = _ref2.mergeSections, mergeSections = _ref2$mergeSections === void 0 ? true : _ref2$mergeSections, _ref2$mergeProps = _ref2.mergeProps, useMergeProps = _ref2$mergeProps === void 0 ? false : _ref2$mergeProps;
    var global2 = searchInDefaultPT ? BaseDirective._useDefaultPT(instance, instance.defaultPT(), getValue, key, params) : void 0;
    var self2 = BaseDirective._usePT(instance, BaseDirective._getPT(obj, instance.$name), getValue, key, _objectSpread$3(_objectSpread$3({}, params), {}, {
      global: global2 || {}
    }));
    var datasets = BaseDirective._getPTDatasets(instance, key);
    return mergeSections || !mergeSections && self2 ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, global2, self2, datasets) : _objectSpread$3(_objectSpread$3(_objectSpread$3({}, global2), self2), datasets) : _objectSpread$3(_objectSpread$3({}, self2), datasets);
  },
  _getPTDatasets: function _getPTDatasets() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var datasetPrefix = "data-pc-";
    return _objectSpread$3(_objectSpread$3({}, key === "root" && _defineProperty$3({}, "".concat(datasetPrefix, "name"), ObjectUtils.toFlatCase(instance.$name))), {}, _defineProperty$3({}, "".concat(datasetPrefix, "section"), ObjectUtils.toFlatCase(key)));
  },
  _getPT: function _getPT(pt) {
    var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var getValue = function getValue2(value) {
      var _computedValue$_key;
      var computedValue = callback ? callback(value) : value;
      var _key = ObjectUtils.toFlatCase(key);
      return (_computedValue$_key = computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _computedValue$_key !== void 0 ? _computedValue$_key : computedValue;
    };
    return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
      _usept: pt["_usept"],
      originalValue: getValue(pt.originalValue),
      value: getValue(pt.value)
    } : getValue(pt);
  },
  _usePT: function _usePT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var pt = arguments.length > 1 ? arguments[1] : void 0;
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    var fn = function fn2(value2) {
      return callback(value2, key, params);
    };
    if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
      var _instance$$primevueCo2;
      var _ref4 = pt["_usept"] || ((_instance$$primevueCo2 = instance.$primevueConfig) === null || _instance$$primevueCo2 === void 0 ? void 0 : _instance$$primevueCo2.ptOptions) || {}, _ref4$mergeSections = _ref4.mergeSections, mergeSections = _ref4$mergeSections === void 0 ? true : _ref4$mergeSections, _ref4$mergeProps = _ref4.mergeProps, useMergeProps = _ref4$mergeProps === void 0 ? false : _ref4$mergeProps;
      var originalValue = fn(pt.originalValue);
      var value = fn(pt.value);
      if (originalValue === void 0 && value === void 0)
        return void 0;
      else if (ObjectUtils.isString(value))
        return value;
      else if (ObjectUtils.isString(originalValue))
        return originalValue;
      return mergeSections || !mergeSections && value ? useMergeProps ? BaseDirective._mergeProps(instance, useMergeProps, originalValue, value) : _objectSpread$3(_objectSpread$3({}, originalValue), value) : value;
    }
    return fn(pt);
  },
  _useDefaultPT: function _useDefaultPT() {
    var instance = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var defaultPT2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var callback = arguments.length > 2 ? arguments[2] : void 0;
    var key = arguments.length > 3 ? arguments[3] : void 0;
    var params = arguments.length > 4 ? arguments[4] : void 0;
    return BaseDirective._usePT(instance, defaultPT2, callback, key, params);
  },
  _hook: function _hook(directiveName, hookName, el, binding, vnode, prevVnode) {
    var _binding$value, _config$pt;
    var name = "on".concat(ObjectUtils.toCapitalCase(hookName));
    var config = BaseDirective._getConfig(binding, vnode);
    var instance = el === null || el === void 0 ? void 0 : el.$instance;
    var selfHook = BaseDirective._usePT(instance, BaseDirective._getPT(binding === null || binding === void 0 || (_binding$value = binding.value) === null || _binding$value === void 0 ? void 0 : _binding$value.pt, directiveName), BaseDirective._getOptionValue, "hooks.".concat(name));
    var defaultHook = BaseDirective._useDefaultPT(instance, config === null || config === void 0 || (_config$pt = config.pt) === null || _config$pt === void 0 || (_config$pt = _config$pt.directives) === null || _config$pt === void 0 ? void 0 : _config$pt[directiveName], BaseDirective._getOptionValue, "hooks.".concat(name));
    var options = {
      el,
      binding,
      vnode,
      prevVnode
    };
    selfHook === null || selfHook === void 0 || selfHook(instance, options);
    defaultHook === null || defaultHook === void 0 || defaultHook(instance, options);
  },
  _mergeProps: function _mergeProps() {
    var fn = arguments.length > 1 ? arguments[1] : void 0;
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }
    return ObjectUtils.isFunction(fn) ? fn.apply(void 0, args) : mergeProps.apply(void 0, args);
  },
  _extend: function _extend(name) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var handleHook = function handleHook2(hook, el, binding, vnode, prevVnode) {
      var _el$$instance$hook, _el$$instance7;
      el._$instances = el._$instances || {};
      var config = BaseDirective._getConfig(binding, vnode);
      var $prevInstance = el._$instances[name] || {};
      var $options = ObjectUtils.isEmpty($prevInstance) ? _objectSpread$3(_objectSpread$3({}, options), options === null || options === void 0 ? void 0 : options.methods) : {};
      el._$instances[name] = _objectSpread$3(_objectSpread$3({}, $prevInstance), {}, {
        /* new instance variables to pass in directive methods */
        $name: name,
        $host: el,
        $binding: binding,
        $modifiers: binding === null || binding === void 0 ? void 0 : binding.modifiers,
        $value: binding === null || binding === void 0 ? void 0 : binding.value,
        $el: $prevInstance["$el"] || el || void 0,
        $style: _objectSpread$3({
          classes: void 0,
          inlineStyles: void 0,
          loadStyle: function loadStyle2() {
          }
        }, options === null || options === void 0 ? void 0 : options.style),
        $primevueConfig: config,
        /* computed instance variables */
        defaultPT: function defaultPT2() {
          return BaseDirective._getPT(config === null || config === void 0 ? void 0 : config.pt, void 0, function(value) {
            var _value$directives;
            return value === null || value === void 0 || (_value$directives = value.directives) === null || _value$directives === void 0 ? void 0 : _value$directives[name];
          });
        },
        isUnstyled: function isUnstyled2() {
          var _el$$instance, _el$$instance2;
          return ((_el$$instance = el.$instance) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.$binding) === null || _el$$instance === void 0 || (_el$$instance = _el$$instance.value) === null || _el$$instance === void 0 ? void 0 : _el$$instance.unstyled) !== void 0 ? (_el$$instance2 = el.$instance) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.$binding) === null || _el$$instance2 === void 0 || (_el$$instance2 = _el$$instance2.value) === null || _el$$instance2 === void 0 ? void 0 : _el$$instance2.unstyled : config === null || config === void 0 ? void 0 : config.unstyled;
        },
        /* instance's methods */
        ptm: function ptm2() {
          var _el$$instance3;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return BaseDirective._getPTValue(el.$instance, (_el$$instance3 = el.$instance) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.$binding) === null || _el$$instance3 === void 0 || (_el$$instance3 = _el$$instance3.value) === null || _el$$instance3 === void 0 ? void 0 : _el$$instance3.pt, key, _objectSpread$3({}, params));
        },
        ptmo: function ptmo2() {
          var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
          var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return BaseDirective._getPTValue(el.$instance, obj, key, params, false);
        },
        cx: function cx2() {
          var _el$$instance4, _el$$instance5;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return !((_el$$instance4 = el.$instance) !== null && _el$$instance4 !== void 0 && _el$$instance4.isUnstyled()) ? BaseDirective._getOptionValue((_el$$instance5 = el.$instance) === null || _el$$instance5 === void 0 || (_el$$instance5 = _el$$instance5.$style) === null || _el$$instance5 === void 0 ? void 0 : _el$$instance5.classes, key, _objectSpread$3({}, params)) : void 0;
        },
        sx: function sx2() {
          var _el$$instance6;
          var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
          var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
          var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          return when ? BaseDirective._getOptionValue((_el$$instance6 = el.$instance) === null || _el$$instance6 === void 0 || (_el$$instance6 = _el$$instance6.$style) === null || _el$$instance6 === void 0 ? void 0 : _el$$instance6.inlineStyles, key, _objectSpread$3({}, params)) : void 0;
        }
      }, $options);
      el.$instance = el._$instances[name];
      (_el$$instance$hook = (_el$$instance7 = el.$instance)[hook]) === null || _el$$instance$hook === void 0 || _el$$instance$hook.call(_el$$instance7, el, binding, vnode, prevVnode);
      el["$".concat(name)] = el.$instance;
      BaseDirective._hook(name, hook, el, binding, vnode, prevVnode);
    };
    return {
      created: function created2(el, binding, vnode, prevVnode) {
        handleHook("created", el, binding, vnode, prevVnode);
      },
      beforeMount: function beforeMount2(el, binding, vnode, prevVnode) {
        var _config$csp, _el$$instance8, _el$$instance9, _config$csp2;
        var config = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp = config.csp) === null || _config$csp === void 0 ? void 0 : _config$csp.nonce
        });
        !((_el$$instance8 = el.$instance) !== null && _el$$instance8 !== void 0 && _el$$instance8.isUnstyled()) && ((_el$$instance9 = el.$instance) === null || _el$$instance9 === void 0 || (_el$$instance9 = _el$$instance9.$style) === null || _el$$instance9 === void 0 ? void 0 : _el$$instance9.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp2 = config.csp) === null || _config$csp2 === void 0 ? void 0 : _config$csp2.nonce
        }));
        handleHook("beforeMount", el, binding, vnode, prevVnode);
      },
      mounted: function mounted4(el, binding, vnode, prevVnode) {
        var _config$csp3, _el$$instance10, _el$$instance11, _config$csp4;
        var config = BaseDirective._getConfig(binding, vnode);
        BaseStyle.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp3 = config.csp) === null || _config$csp3 === void 0 ? void 0 : _config$csp3.nonce
        });
        !((_el$$instance10 = el.$instance) !== null && _el$$instance10 !== void 0 && _el$$instance10.isUnstyled()) && ((_el$$instance11 = el.$instance) === null || _el$$instance11 === void 0 || (_el$$instance11 = _el$$instance11.$style) === null || _el$$instance11 === void 0 ? void 0 : _el$$instance11.loadStyle({
          nonce: config === null || config === void 0 || (_config$csp4 = config.csp) === null || _config$csp4 === void 0 ? void 0 : _config$csp4.nonce
        }));
        handleHook("mounted", el, binding, vnode, prevVnode);
      },
      beforeUpdate: function beforeUpdate2(el, binding, vnode, prevVnode) {
        handleHook("beforeUpdate", el, binding, vnode, prevVnode);
      },
      updated: function updated3(el, binding, vnode, prevVnode) {
        handleHook("updated", el, binding, vnode, prevVnode);
      },
      beforeUnmount: function beforeUnmount3(el, binding, vnode, prevVnode) {
        handleHook("beforeUnmount", el, binding, vnode, prevVnode);
      },
      unmounted: function unmounted3(el, binding, vnode, prevVnode) {
        handleHook("unmounted", el, binding, vnode, prevVnode);
      }
    };
  },
  extend: function extend2() {
    var _BaseDirective$_getMe = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe2 = _slicedToArray$1(_BaseDirective$_getMe, 2), name = _BaseDirective$_getMe2[0], options = _BaseDirective$_getMe2[1];
    return _objectSpread$3({
      extend: function extend3() {
        var _BaseDirective$_getMe3 = BaseDirective._getMeta.apply(BaseDirective, arguments), _BaseDirective$_getMe4 = _slicedToArray$1(_BaseDirective$_getMe3, 2), _name = _BaseDirective$_getMe4[0], _options = _BaseDirective$_getMe4[1];
        return BaseDirective.extend(_name, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options), options === null || options === void 0 ? void 0 : options.methods), _options));
      }
    }, BaseDirective._extend(name, options));
  }
};
var classes$6 = {
  root: "p-ink"
};
var RippleStyle = BaseStyle.extend({
  name: "ripple",
  classes: classes$6
});
var BaseRipple = BaseDirective.extend({
  style: RippleStyle
});
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$2(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread$1();
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _iterableToArray$2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray$2(arr);
}
function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var Ripple = BaseRipple.extend("ripple", {
  mounted: function mounted(el) {
    var _el$$instance;
    var config = el === null || el === void 0 || (_el$$instance = el.$instance) === null || _el$$instance === void 0 ? void 0 : _el$$instance.$primevueConfig;
    if (config && config.ripple) {
      this.create(el);
      this.bindEvents(el);
      el.setAttribute("data-pd-ripple", true);
    }
  },
  unmounted: function unmounted(el) {
    this.remove(el);
  },
  timeout: void 0,
  methods: {
    bindEvents: function bindEvents(el) {
      el.addEventListener("mousedown", this.onMouseDown.bind(this));
    },
    unbindEvents: function unbindEvents(el) {
      el.removeEventListener("mousedown", this.onMouseDown.bind(this));
    },
    create: function create(el) {
      var ink = DomHandler.createElement("span", {
        role: "presentation",
        "aria-hidden": true,
        "data-p-ink": true,
        "data-p-ink-active": false,
        "class": !this.isUnstyled() && this.cx("root"),
        onAnimationEnd: this.onAnimationEnd.bind(this),
        "p-bind": this.ptm("root")
      });
      el.appendChild(ink);
      this.$el = ink;
    },
    remove: function remove(el) {
      var ink = this.getInk(el);
      if (ink) {
        this.unbindEvents(el);
        ink.removeEventListener("animationend", this.onAnimationEnd);
        ink.remove();
      }
    },
    onMouseDown: function onMouseDown(event) {
      var _this = this;
      var target = event.currentTarget;
      var ink = this.getInk(target);
      if (!ink || getComputedStyle(ink, null).display === "none") {
        return;
      }
      !this.isUnstyled() && DomHandler.removeClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "false");
      if (!DomHandler.getHeight(ink) && !DomHandler.getWidth(ink)) {
        var d = Math.max(DomHandler.getOuterWidth(target), DomHandler.getOuterHeight(target));
        ink.style.height = d + "px";
        ink.style.width = d + "px";
      }
      var offset = DomHandler.getOffset(target);
      var x = event.pageX - offset.left + (void 0).body.scrollTop - DomHandler.getWidth(ink) / 2;
      var y = event.pageY - offset.top + (void 0).body.scrollLeft - DomHandler.getHeight(ink) / 2;
      ink.style.top = y + "px";
      ink.style.left = x + "px";
      !this.isUnstyled() && DomHandler.addClass(ink, "p-ink-active");
      ink.setAttribute("data-p-ink-active", "true");
      this.timeout = setTimeout(function() {
        if (ink) {
          !_this.isUnstyled() && DomHandler.removeClass(ink, "p-ink-active");
          ink.setAttribute("data-p-ink-active", "false");
        }
      }, 401);
    },
    onAnimationEnd: function onAnimationEnd(event) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      !this.isUnstyled() && DomHandler.removeClass(event.currentTarget, "p-ink-active");
      event.currentTarget.setAttribute("data-p-ink-active", "false");
    },
    getInk: function getInk(el) {
      return el && el.children ? _toConsumableArray$1(el.children).find(function(child) {
        return DomHandler.getAttribute(child, "data-pc-name") === "ripple";
      }) : void 0;
    }
  }
});
var AppCurrency = /* @__PURE__ */ ((AppCurrency2) => {
  AppCurrency2["USD"] = "USD";
  AppCurrency2["UAH"] = "UAH";
  AppCurrency2["JPY"] = "JPY";
  AppCurrency2["BTC"] = "BTC";
  AppCurrency2["EUR"] = "EUR";
  AppCurrency2["RUB"] = "RUB";
  AppCurrency2["CNY"] = "CNY";
  AppCurrency2["ETH"] = "ETH";
  AppCurrency2["GBR"] = "GBR";
  AppCurrency2["CHF"] = "CHF";
  AppCurrency2["Fantic"] = "Fantic";
  return AppCurrency2;
})(AppCurrency || {});
const imageStumpPath = "" + __buildAssetsURL("image-stump.RTtB_9Kb.jpg");
const userAvatarStumpPath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAA7hSURBVHgB7Z3Jb1NZFsZPnCCCxBAGoQIxmCAmgSAgFtlhWIEEJFX/AClWhZhr1d0bQrGpHSkQa0KLRe/KASS6V5hesQBhJJAgEsRBAlogQRgkqEzu8z3uSxzHw7P9hnvPuz/JeIgBv7zP3xnuffc2kWWK7u7uNr5Ljo+PJxOJxFp+vK6pqWkRXuNbm7qRel6KkeJbPp8f5vuhycnJ4ZaWllw6nc6SZYomiikQGwstxULrYJHt4Jc6qLyw/AYizLE4H7EwMyzMLAtzhGJIbAQIwU1MTHSz2CC4LgpPbF6BKLP8GQeUIHMUA0QLkEWXYofZw4JL8dMUmUWGHTLNDn1XctgWJ0AWXZJFd4RF10P6uVy9IFwPsBj7pDmjCAEivCrRdZN5TlcrcMb+GzduXCMBGC3AArc7Q9MValzI8S3Dx37eZFc0UoDI7dgFzpF8t/NKv6lCNEqAVnhVMU6IRggQoZaFd5Ws8LxijBC1FqAqLs6pHM9SO9oLsZk0hcV3Gn0w1cOz1AdGd7o3bdo08uzZs0ekIdo5IAuvg4V3kWy49Zscf5n36uaGCdKIw4cPn2PxPSQrviBAHj2E3zFphBYOqIqMP+l7yLAEjzZuGHkOqHK9f5GcYTMTQNO+Z+PGjX8NDg7eowiJzAFthasH/OXv4zHm81FNB4tEgDbkakdkITn0IkSNZqDQsOLTBxjCHXQgKGRCzQH5AI+gt8cPW8miG8gLf+G88GOYeWFoAmTxocXSRxat4VC8nxvXxI3ruxQCoQhQia+XLEaA0aewRBi4ALnxiVGNv5HFKMISYaAC7OrqusoH8gtZjAQi3Lx5c5JFOEABEZgAEXb5zvb4zKeDnbCNRfgfCoBABGhzPlmwE3YGFY59F6AVn0yCygl9FaAa1/2dLCKBCLds2ZJ7+vSpb3MLfRuKU/P4HpJFPBMTE3tv3bqVIR/wRYBqbPcO2RktcWGE3XCnH2PHDQsQs1qU8yXJEieyagJDQ7NoGp6MgClVZMUXRzrUuW+IhooQFB1810uWWIL2TKOTF+oOwSrvQ+iN25IYlpk0lA/WHYJV0WHFZ2lTk4vroq4QrIbZusli+c4P3KRu4iZ1hmqk5hCsQu8QxZTW1laaM2cOtbS00Lx582h8fJzGxsacn33+/Nl5HldUKK5pMc0WqhEVemMBRLZgwQJavny5cz9//nxHfJWAGL98+eKI8cOHD/T27VuKC2pBgb21/J2aHPDQoUM9iUTiKgln8eLFjuhWrFhRVXBeeP36tXODIKXDrZmzN2/e9Dzz3bMA4zDaAeGtX7/euQ+Cr1+/0osXLxwxCgZV8TqvDWrPRQj3e/qkLhQEwW3bts0RH/K6oICbwllXrlzpuOHo6CgJpJWNqtXr/EFPDii18ECOB9GtWbOGouDly5f0/PlzkYWLcsFctfd56gNyXO8lYaCa7ezsjEx8AP83PgM+izTUgqJVqeqAEt0PIXfHjh2+FBh+AAfMZrPiihQv07aqOqA090P+tXv3bm3EB5AK4DPhs0miubm56mSFikUI3I/vxLRdcIK3bt1KuoIC5du3b04PUQjJDRs23B0cHMyVe0NFB5Tkfmgk6yw+F1x3gc8qhWouWDYHlJT7IclHiAuyxeIn6Bfev3/fcUMJVKqIyzqgJPfr6OgwRnwAnxV9SSmwlnrK/aysAFm1e0gA6POZGNJQqa9du5YkwFo6rTYDn0VJAWLMlwQMuSH0tre3k6ngswvpEWKv5p5SPygpwEQicYQEAPczGbRnpIRi1lRXydeLX1CtlxQZDkKYhL4ajiOoyREhk1LamsEsAXLCKGJBIdPdrxApx1KqGJklQE4Yu8hwkDcJcQ0HHAvCsemwto4cPHhwxmszBKgWqU6S4UhyP5coJ034SJKK0rtiB0yRACS5n4uUlgwXI6kZzwuf8MiH8eEX4jOp6ewVhGAJXyz0lznSTj2fEqCU6lfajJJCpFTDVHA9+ZQAx8fHRWwcI2kgv5glS5aQBLgpPWWBUwLk2Gz8hebuZZRSkXJsHIanzC5R8OIOMhzJ4gP4gkkYmkOrz80DHQGqgWLjQ7B0AQIheWCSVB7oOqCI/E9Cs7YaOl1K0AjubCtHgDxEkiIBSGy/FCPlGLkQ2Yl7R4AS8j8QBwcUdIxO1HVDcJIEICU8xQGYHgoRUTmgxSiSfGtLRLFLtsWiSCZ4BCRJFksEcBhem+CkNklCwOWMFnNg81uX4BZMkizGIGklLXbAZAI2SEKIgwO661FLgLW3CFWwmK0WpKwkUAmsPy2IpCgBSnKHcgg7xjZRAhTmDiURtHIWkCVA5ICSXRAFiLTlfEUJEEh2wU+fPpEwkg1v16obAk/SFBL3GREnQMmbwVgBGoBkAQorQBzECRBJukQRvn//XuR+IuIECHCypPHmzRuSCASYI2FIPFlCU4sRkQ6IfqCkEwZHFzrO7QjQ066GpiFpn16p4ZckCxBbokoYFUHhIXjT65FEPp8fJoHgxEnYlxfik1j9AtbeR7EOCN69e0emgw2uBZNLMDkSCgoRk4sROLjkSbbsgDlclJQjwWBDaFMR7n64yH4IFyXlSDCmuqB09wOoP0Q2oot58uQJmYZ09wPpdDqb4D9QhORIMHASk0IxPmsMLrDK4o9E4RPJvHz50oiTis8YB/dz238J9eQRCQe9NBNCsYnpQp1MO+Dk5KR4BwQoRoaH9e27w6Ulz2cshDWXwb0jQK6EMxQTEN50DMX4TM+ePaO4wJqbdsA4FCIuCMUPHjzQapwY4sNnihFZpbnpCamcBw5QTMAJ1ynXGhwcjNvCSlMpX6EAY5EHumCcWIeQh88geLZLSXj4Nz312H3Q3NycppiBpD/Kk4//H7e4Udh1aXYfPH369NvmzZtTJGS96Gpgse8NGzZEurfcokWLsEKUE36lTrkqQWZgYOAP98mMJdf5l3GX1ZkiwUB42Pp09erVWixq3t7eTitWrHCqcwnzF6vB7ZcZtUbxmv8Zvp0jocDtcMJ122sDn2fr1q3OZ5MuRE71MoXPm4rf0NXVNUSCwrBujucFdzhOoBBzHH7XFb4wa9cTDsPXOAwb74ImCs+l0BFxQdKrV69ELL5ZqtVXatudfjI4DGMzv+XLlzt5lekb10CIECFucEPMkjFZiNx+6St+ranUGzkM3yHDdk+H8NavXy9lN8myYKwYYjQwPKP63Vv8YsmNxzgMD5hQDSPMorDALQ5btQJ8wXBzCxZTrppjTfWXfL3Ui9g/mAWIYkTLxStNzu/8xl0FQvPwPKv4cGku9SKa0lu2bEGvIkUa4YbZ7du3O4+5pKe4gy8g3B9fSOSMWMJNQ0dM85BjybkGlfb+7CdNipG45HeN4qYjriPqMreQw+/5sj+r8PciL0as8BpDk35iP4ffn8v9sOLux1BuFMWIFZ4/FPYTMeUriokXldzP+TlVIUwXRC6zadMmK7yAQEh+/PhxmMVKRfcDVbN4LkZwEUUPBYg7MwXfVt3GaSWB322YxQq7349c0FZce6iqA4IgXRBJ88aNG2PfTgmbEPLDqu4HWsgDrOSfVV/QN+B6cDwMm1nCx80Pke4E0UOslvu5eGqkwUY5N1vM/2gn+QAOeteuXdTWJmqTJiNB3g0TQH44OjpKPgH3u+bljZ7XiOaB5F7yYS3BNWvW0O7du22upxE4F52dnU5+6ANDXt0PeB5KUKMjf/HD/VQnaK2g2LDoydKlS51LBBppYPPfP5tOp+96fX9NY1kswnv1XjcC8aEfZdEbpEcTExP08eNHqoMhDr1Ha/kLNW/TAIVTjbizNyxmgK5EPbOLWBv7qEZqHs1nF/wfh2K0b1Je3o9qFwWHbbOYBcIxWjSTk5Oe3s9dkvPsfjVf2lvXdBIWYYZDcTc//KHae5HzLVu2jCxmAcOA+Dzmg0M3btz4keqg7p2S0OWmKlVxa2urU/VazAR5O85hFT7UE3pd6p5Qh95gtaoY7Za5c+eSxVwWLlxYcbSExfcPrnr/TXXS0IxOVMXlGtQYYlu1ahVZzAY9QoThUiMlnPf1cd7nuedXioY3K1QN6lkLG9mqVw4IxSUY4nPfkPhAwwLEOm/F+SDaLnakQw44n0W5IEY79rlr/DWCL9u18gfJKRE6RLngjyUYCs5pns/1Tzjn5AO+7RfMHyiDWTPupZIWWbjjxHyOf8X+HuQTvl5WxkVJdv/+/U1LlixJkUUUnO9hDuH569ev/04+4vt1jffu3cscOHCAvyhNKbKIASMdFy5c6CWf8TQjuh4uX77cxyI8TRbjgfhOnjzZSwEQmAABi7CfRXiELMbC4utn8VWdWl8vvhUhpeAP3oNvD1mMBI3mIMUHAl/b4vbt2zYnNBAVdv9OARPK4ipWhEbB2sv/FlTOV0ygOWAxly5dOsPl/EWy6AqazEePHz/eTyERqgDBlStXOiYnJ//kA02SRRvY9T6Mj4/vO3v2bKgbFgVahJSCv11ZPtC9fMA5sujCQz4nu8IWHwhdgIAPNMcHvJNF+AdZogT5Xt/Y2BicL0cREHoILkblhViH0F6lHiIIuZwG/XbixIk+ipDIBQguXryYbGlpuWPzwtB4yK73U1SuV4gWAnThkZNeFqHYnZo0INQWixe0EiCwbhgIeb5l2PV+jaLQqIR2AnTh3LAHbmiF2Bi65HrliKQK9sKpU6f6VbvG0ypLllk4FS7/Dtt1FR/Q1gELUWG5186s8YQbbo/qUGRUwwgBulghVsQRnioyMmQIRgnQxQpxBkYKz8VIAbq4QuSHe2JWrCC/wyWRlzjH6zch1JbDaAEWgqqZR1TgiCmSi+t2Ayy8ayy8hq/LjRoxAnRRrniGHx4ucEWTjzOvJm78k4+r/9ixYzkShDgBFqKmfiE8d9G0M+p+zHl1D6f7L+5NzO28IlqAhShn7OCHXSzIHXzfoX4U5e8gP/Xgu8thn+ZHExMTaQnh1QuxEWAxLMg2JcgU547b+cQnaVqULn79fvIznrDY+P/MsjtjMe9hzucycRFcMbEVYDlU2E7yQ6xFkWShrGXBYKpYm3vPDlpy6pg7yZZ/DjFh0aYc/1tY7RuvD/O/lRsdHc3FVWyl+D+FeoRUCTaJtgAAAABJRU5ErkJggg==";
const IMAGE_STUMP_PATH = imageStumpPath;
const USER_AVATAR_STUMP_PATH = userAvatarStumpPath;
const DE_EMAIL = "inbox@dapp.expert";
const DEFAULT_LOCALE = "en";
const DEFAULT_LOCALE_ID = 1;
const DEFAULT_CURRENCY = AppCurrency.USD;
const DEFAULT_CURRENCY_ID = 1;
const DEFAULT_LOCALE_ID_COOKIE = "language_id";
const DEFAULT_CURRENCY_ID_COOKIE = "currency_id";
const DEFAULT_CURRENCY_SHORT_NAME_COOKIE = "de_currency_short_name";
const COOKIE_CONSENT_TOKEN = "de_cookie_consent";
const PASSWORD_STRENGTH_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/;
const WALLET_CRYPTOS = [
  "ETH",
  "BNB",
  "TRX",
  "SOL",
  "MATIC",
  "AVAX",
  "FTM",
  "CRO",
  "KLAY",
  "AURORA"
];
function createUserModelBase(raw) {
  var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h, _i, _j, _k, _l;
  var _a, _b, _c, _d, _e, _f, _g;
  return {
    id: (_a2 = raw.id) != null ? _a2 : null,
    username: (_b2 = raw.username) != null ? _b2 : null,
    email: (_c2 = raw.email) != null ? _c2 : null,
    currencyId: (_d2 = raw.currency_id) != null ? _d2 : DEFAULT_CURRENCY_ID,
    currencyShortName: (_e2 = raw.currency_short_name) != null ? _e2 : AppCurrency.USD,
    wallet: {
      type: (_f2 = (_a = raw.user_wallet) == null ? void 0 : _a.method) != null ? _f2 : null,
      address: (_g2 = (_b = raw.user_wallet) == null ? void 0 : _b.wallet_address) != null ? _g2 : null
    },
    profile: {
      name: (_h = (_c = raw.profile) == null ? void 0 : _c.name) != null ? _h : null,
      photo: (_i = (_d = raw.profile) == null ? void 0 : _d.image_url) != null ? _i : USER_AVATAR_STUMP_PATH,
      website: (_j = (_e = raw.profile) == null ? void 0 : _e.website) != null ? _j : null,
      bio: (_k = (_f = raw.profile) == null ? void 0 : _f.bio) != null ? _k : null,
      birthday: (_l = (_g = raw.profile) == null ? void 0 : _g.birthday) != null ? _l : null
    }
  };
}
const CONSENT_COOKIE_DURATION_DAYS = 365;
const CURRENCY_COOKIE_DURATION_DAYS = 365;
const LOCALE_COOKIE_DURATION_DAYS = 365;
const useUserStore = /* @__PURE__ */ defineStore("user", () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const currencyIdCookie = useCookie(DEFAULT_CURRENCY_ID_COOKIE, {
    default: () => DEFAULT_CURRENCY_ID,
    maxAge: CURRENCY_COOKIE_DURATION_DAYS * 24 * 60 * 60,
    domain: config.public.rootDomain
  });
  const currencyShortNameCookie = useCookie(DEFAULT_CURRENCY_SHORT_NAME_COOKIE, {
    default: () => DEFAULT_CURRENCY,
    maxAge: CURRENCY_COOKIE_DURATION_DAYS * 24 * 60 * 60
  });
  const defaultUserState = createUserModelBase({
    id: null,
    username: null,
    email: null,
    currency_id: currencyIdCookie.value,
    currency_short_name: currencyShortNameCookie.value,
    user_wallet: {
      wallet_address: null,
      method: null
    }
  });
  const user = ref({
    ...defaultUserState
  });
  watch(
    () => user.value.currencyId,
    (val) => {
      currencyIdCookie.value = val;
    }
  );
  watch(
    () => user.value.currencyShortName,
    (val) => {
      currencyShortNameCookie.value = val;
    }
  );
  function setUser(data2) {
    user.value = data2;
  }
  function updateUserProfile(newValues) {
    user.value.profile = {
      ...user.value.profile,
      ...newValues
    };
  }
  function setUserEmail(email) {
    user.value.email = email;
  }
  function setUserWallet(address, type) {
    user.value.wallet.address = address;
    user.value.wallet.type = type;
  }
  function clearUser() {
    user.value = defaultUserState;
  }
  function updateUserPhoto(newPhoto) {
    user.value.profile.photo = newPhoto != null ? newPhoto : USER_AVATAR_STUMP_PATH;
  }
  function updateUserCurrency(currencyId, currencyShortName) {
    user.value.currencyId = currencyId;
    user.value.currencyShortName = currencyShortName;
  }
  return {
    user,
    setUser,
    clearUser,
    updateUserPhoto,
    setUserEmail,
    updateUserCurrency,
    setUserWallet,
    updateUserProfile,
    currencyShortNameCookie,
    currencyIdCookie
  };
});
const useAuthStore = /* @__PURE__ */ defineStore("auth", () => {
  const userStore = useUserStore();
  const isLoggedIn = computed(() => {
    var _a;
    return !!((_a = userStore.user) == null ? void 0 : _a.id);
  });
  const accessToken = ref(null);
  function setToken(token) {
    accessToken.value = token;
  }
  return {
    isLoggedIn,
    setToken,
    accessToken
  };
});
const defaultLifeTime = 3e3;
function toastErrorNotification(toastInstance, {
  title = "",
  body = "",
  lifeTime = defaultLifeTime,
  closable = false,
  iconName,
  iconClass = ""
}) {
  toastInstance.add({
    severity: "error",
    summary: title,
    detail: body,
    life: lifeTime,
    closable,
    iconName,
    iconClass
  });
}
function toastSuccessNotification(toastInstance, {
  title = "",
  body = "",
  lifeTime = defaultLifeTime,
  closable = false,
  iconName = "check",
  iconClass = "tw-w-350 tw-h-350 tw-text-success-500"
}) {
  toastInstance.add({
    severity: "success",
    summary: title,
    detail: body,
    life: lifeTime,
    closable,
    iconName,
    iconClass
  });
}
function toastInfoNotification(toastInstance, {
  title = "",
  body = "",
  lifeTime = defaultLifeTime,
  closable = false,
  iconName,
  iconClass = ""
}) {
  toastInstance.add({
    severity: "info",
    summary: title,
    detail: body,
    life: lifeTime,
    closable,
    iconName,
    iconClass
  });
}
var AuthTab = /* @__PURE__ */ ((AuthTab2) => {
  AuthTab2["login"] = "login";
  AuthTab2["signUp"] = "signUp";
  return AuthTab2;
})(AuthTab || {});
const locales = [
  {
    id: 1,
    name: "English",
    code: "en"
  },
  {
    id: 2,
    name: "Russian",
    code: "ru"
  }
];
const typedLocales = locales;
function getLocaleId(locale) {
  var _a;
  return ((_a = locales.find((item) => item.code === locale)) == null ? void 0 : _a.id) || DEFAULT_LOCALE_ID;
}
const useAppStore = /* @__PURE__ */ defineStore("app", () => {
  const { $i18n } = useNuxtApp();
  const config = /* @__PURE__ */ useRuntimeConfig();
  const authDialog = ref({
    isVisible: false,
    activeTab: AuthTab.login
  });
  const submitDialog = ref({
    isVisible: false
  });
  const customerService = ref({
    isVisible: false
  });
  const cookieConsent = useCookie(COOKIE_CONSENT_TOKEN, {
    default: () => false,
    maxAge: CONSENT_COOKIE_DURATION_DAYS * 24 * 60 * 60
  });
  const localeIdCookie = useCookie(DEFAULT_LOCALE_ID_COOKIE, {
    default: () => DEFAULT_LOCALE_ID,
    maxAge: LOCALE_COOKIE_DURATION_DAYS * 24 * 60 * 60,
    domain: config.public.rootDomain
  });
  const locale = computed(() => $i18n.locale.value);
  watch(
    locale,
    (val) => {
      var _a;
      localeIdCookie.value = ((_a = typedLocales.find((locale2) => locale2.code === val)) == null ? void 0 : _a.id) || DEFAULT_LOCALE_ID;
    },
    {
      immediate: true
    }
  );
  const isCookiesNotificationShown = computed(() => !cookieConsent.value);
  function toggleAuthDialog(activeTab = AuthTab.login, isVisible2) {
    const isDialogVisible = isNonNullish(isVisible2) ? isVisible2 : !authDialog.value.isVisible;
    authDialog.value = {
      isVisible: isDialogVisible,
      activeTab
    };
  }
  function toggleSubmitDialog(isVisible2) {
    const isDialogVisible = isNonNullish(isVisible2) ? isVisible2 : !submitDialog.value.isVisible;
    submitDialog.value = {
      isVisible: isDialogVisible
    };
  }
  function showCustomerService(isVisible2) {
    const isCustomerServiceVisible = isNonNullish(isVisible2) ? isVisible2 : !customerService.value.isVisible;
    customerService.value = {
      isVisible: isCustomerServiceVisible
    };
  }
  function setCookieConsent() {
    cookieConsent.value = true;
  }
  return {
    authDialog,
    submitDialog,
    toggleAuthDialog,
    toggleSubmitDialog,
    isCookiesNotificationShown,
    setCookieConsent,
    locale,
    localeIdCookie,
    showCustomerService,
    customerService
  };
});
var classes$5 = {
  root: function root(_ref) {
    var props = _ref.props, instance = _ref.instance;
    return ["p-badge p-component", {
      "p-badge-no-gutter": ObjectUtils.isNotEmpty(props.value) && String(props.value).length === 1,
      "p-badge-dot": ObjectUtils.isEmpty(props.value) && !instance.$slots["default"],
      "p-badge-lg": props.size === "large",
      "p-badge-xl": props.size === "xlarge",
      "p-badge-info": props.severity === "info",
      "p-badge-success": props.severity === "success",
      "p-badge-warning": props.severity === "warning",
      "p-badge-danger": props.severity === "danger",
      "p-badge-secondary": props.severity === "secondary",
      "p-badge-contrast": props.severity === "contrast"
    }];
  }
};
var BadgeStyle = BaseStyle.extend({
  name: "badge",
  classes: classes$5
});
function _typeof$1$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1$1(o);
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
      _defineProperty$1$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
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
  return "symbol" == _typeof$1$1(i) ? i : String(i);
}
function _toPrimitive$1$1(t, r) {
  if ("object" != _typeof$1$1(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1$1(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var BaseComponentStyle = BaseStyle.extend({
  name: "common",
  loadGlobalStyle: function loadGlobalStyle(globalCSS) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return useStyle(globalCSS, _objectSpread$1({
      name: "global"
    }, options));
  }
});
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableRest();
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t)
          return;
        f = false;
      } else
        for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
          ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
          return;
      } finally {
        if (o)
          throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
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
  return "symbol" == _typeof$2(i) ? i : String(i);
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$a = {
  name: "BaseComponent",
  props: {
    pt: {
      type: Object,
      "default": void 0
    },
    ptOptions: {
      type: Object,
      "default": void 0
    },
    unstyled: {
      type: Boolean,
      "default": void 0
    }
  },
  inject: {
    $parentInstance: {
      "default": void 0
    }
  },
  watch: {
    isUnstyled: {
      immediate: true,
      handler: function handler2(newValue) {
        if (!newValue) {
          var _this$$primevueConfig, _this$$primevueConfig2;
          BaseComponentStyle.loadStyle({
            nonce: (_this$$primevueConfig = this.$primevueConfig) === null || _this$$primevueConfig === void 0 || (_this$$primevueConfig = _this$$primevueConfig.csp) === null || _this$$primevueConfig === void 0 ? void 0 : _this$$primevueConfig.nonce
          });
          this.$options.style && this.$style.loadStyle({
            nonce: (_this$$primevueConfig2 = this.$primevueConfig) === null || _this$$primevueConfig2 === void 0 || (_this$$primevueConfig2 = _this$$primevueConfig2.csp) === null || _this$$primevueConfig2 === void 0 ? void 0 : _this$$primevueConfig2.nonce
          });
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    var _this$pt, _this$pt2, _this$pt3, _ref, _ref$onBeforeCreate, _this$$primevueConfig3, _this$$primevue, _this$$primevue2, _this$$primevue3, _ref2, _ref2$onBeforeCreate;
    var _usept = (_this$pt = this.pt) === null || _this$pt === void 0 ? void 0 : _this$pt["_usept"];
    var originalValue = _usept ? (_this$pt2 = this.pt) === null || _this$pt2 === void 0 || (_this$pt2 = _this$pt2.originalValue) === null || _this$pt2 === void 0 ? void 0 : _this$pt2[this.$.type.name] : void 0;
    var value = _usept ? (_this$pt3 = this.pt) === null || _this$pt3 === void 0 || (_this$pt3 = _this$pt3.value) === null || _this$pt3 === void 0 ? void 0 : _this$pt3[this.$.type.name] : this.pt;
    (_ref = value || originalValue) === null || _ref === void 0 || (_ref = _ref.hooks) === null || _ref === void 0 || (_ref$onBeforeCreate = _ref["onBeforeCreate"]) === null || _ref$onBeforeCreate === void 0 || _ref$onBeforeCreate.call(_ref);
    var _useptInConfig = (_this$$primevueConfig3 = this.$primevueConfig) === null || _this$$primevueConfig3 === void 0 || (_this$$primevueConfig3 = _this$$primevueConfig3.pt) === null || _this$$primevueConfig3 === void 0 ? void 0 : _this$$primevueConfig3["_usept"];
    var originalValueInConfig = _useptInConfig ? (_this$$primevue = this.$primevue) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.config) === null || _this$$primevue === void 0 || (_this$$primevue = _this$$primevue.pt) === null || _this$$primevue === void 0 ? void 0 : _this$$primevue.originalValue : void 0;
    var valueInConfig = _useptInConfig ? (_this$$primevue2 = this.$primevue) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.config) === null || _this$$primevue2 === void 0 || (_this$$primevue2 = _this$$primevue2.pt) === null || _this$$primevue2 === void 0 ? void 0 : _this$$primevue2.value : (_this$$primevue3 = this.$primevue) === null || _this$$primevue3 === void 0 || (_this$$primevue3 = _this$$primevue3.config) === null || _this$$primevue3 === void 0 ? void 0 : _this$$primevue3.pt;
    (_ref2 = valueInConfig || originalValueInConfig) === null || _ref2 === void 0 || (_ref2 = _ref2[this.$.type.name]) === null || _ref2 === void 0 || (_ref2 = _ref2.hooks) === null || _ref2 === void 0 || (_ref2$onBeforeCreate = _ref2["onBeforeCreate"]) === null || _ref2$onBeforeCreate === void 0 || _ref2$onBeforeCreate.call(_ref2);
  },
  created: function created() {
    this._hook("onCreated");
  },
  beforeMount: function beforeMount() {
    var _this$$primevueConfig4;
    BaseStyle.loadStyle({
      nonce: (_this$$primevueConfig4 = this.$primevueConfig) === null || _this$$primevueConfig4 === void 0 || (_this$$primevueConfig4 = _this$$primevueConfig4.csp) === null || _this$$primevueConfig4 === void 0 ? void 0 : _this$$primevueConfig4.nonce
    });
    this._loadGlobalStyles();
    this._hook("onBeforeMount");
  },
  mounted: function mounted2() {
    this._hook("onMounted");
  },
  beforeUpdate: function beforeUpdate() {
    this._hook("onBeforeUpdate");
  },
  updated: function updated() {
    this._hook("onUpdated");
  },
  beforeUnmount: function beforeUnmount() {
    this._hook("onBeforeUnmount");
  },
  unmounted: function unmounted2() {
    this._hook("onUnmounted");
  },
  methods: {
    _hook: function _hook2(hookName) {
      if (!this.$options.hostName) {
        var selfHook = this._usePT(this._getPT(this.pt, this.$.type.name), this._getOptionValue, "hooks.".concat(hookName));
        var defaultHook = this._useDefaultPT(this._getOptionValue, "hooks.".concat(hookName));
        selfHook === null || selfHook === void 0 || selfHook();
        defaultHook === null || defaultHook === void 0 || defaultHook();
      }
    },
    _mergeProps: function _mergeProps2(fn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return ObjectUtils.isFunction(fn) ? fn.apply(void 0, args) : mergeProps.apply(void 0, args);
    },
    _loadGlobalStyles: function _loadGlobalStyles() {
      var _this$$primevueConfig5;
      var globalCSS = this._useGlobalPT(this._getOptionValue, "global.css", this.$params);
      ObjectUtils.isNotEmpty(globalCSS) && BaseComponentStyle.loadGlobalStyle(globalCSS, {
        nonce: (_this$$primevueConfig5 = this.$primevueConfig) === null || _this$$primevueConfig5 === void 0 || (_this$$primevueConfig5 = _this$$primevueConfig5.csp) === null || _this$$primevueConfig5 === void 0 ? void 0 : _this$$primevueConfig5.nonce
      });
    },
    _getHostInstance: function _getHostInstance(instance) {
      return instance ? this.$options.hostName ? instance.$.type.name === this.$options.hostName ? instance : this._getHostInstance(instance.$parentInstance) : instance.$parentInstance : void 0;
    },
    _getPropValue: function _getPropValue(name) {
      var _this$_getHostInstanc;
      return this[name] || ((_this$_getHostInstanc = this._getHostInstance(this)) === null || _this$_getHostInstanc === void 0 ? void 0 : _this$_getHostInstanc[name]);
    },
    _getOptionValue: function _getOptionValue2(options) {
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var fKeys = ObjectUtils.toFlatCase(key).split(".");
      var fKey = fKeys.shift();
      return fKey ? ObjectUtils.isObject(options) ? this._getOptionValue(ObjectUtils.getItemValue(options[Object.keys(options).find(function(k) {
        return ObjectUtils.toFlatCase(k) === fKey;
      }) || ""], params), fKeys.join("."), params) : void 0 : ObjectUtils.getItemValue(options, params);
    },
    _getPTValue: function _getPTValue2() {
      var _this$$primevueConfig6;
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var searchInDefaultPT = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      var searchOut = /./g.test(key) && !!params[key.split(".")[0]];
      var _ref3 = this._getPropValue("ptOptions") || ((_this$$primevueConfig6 = this.$primevueConfig) === null || _this$$primevueConfig6 === void 0 ? void 0 : _this$$primevueConfig6.ptOptions) || {}, _ref3$mergeSections = _ref3.mergeSections, mergeSections = _ref3$mergeSections === void 0 ? true : _ref3$mergeSections, _ref3$mergeProps = _ref3.mergeProps, useMergeProps = _ref3$mergeProps === void 0 ? false : _ref3$mergeProps;
      var global2 = searchInDefaultPT ? searchOut ? this._useGlobalPT(this._getPTClassValue, key, params) : this._useDefaultPT(this._getPTClassValue, key, params) : void 0;
      var self2 = searchOut ? void 0 : this._getPTSelf(obj, this._getPTClassValue, key, _objectSpread$2(_objectSpread$2({}, params), {}, {
        global: global2 || {}
      }));
      var datasets = this._getPTDatasets(key);
      return mergeSections || !mergeSections && self2 ? useMergeProps ? this._mergeProps(useMergeProps, global2, self2, datasets) : _objectSpread$2(_objectSpread$2(_objectSpread$2({}, global2), self2), datasets) : _objectSpread$2(_objectSpread$2({}, self2), datasets);
    },
    _getPTSelf: function _getPTSelf() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return mergeProps(
        this._usePT.apply(this, [this._getPT(obj, this.$name)].concat(args)),
        // Exp; <component :pt="{}"
        this._usePT.apply(this, [this.$_attrsPT].concat(args))
        // Exp; <component :pt:[passthrough_key]:[attribute]="{value}" or <component :pt:[passthrough_key]="() =>{value}"
      );
    },
    _getPTDatasets: function _getPTDatasets2() {
      var _this$pt4, _this$pt5;
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var datasetPrefix = "data-pc-";
      var isExtended = key === "root" && ObjectUtils.isNotEmpty((_this$pt4 = this.pt) === null || _this$pt4 === void 0 ? void 0 : _this$pt4["data-pc-section"]);
      return key !== "transition" && _objectSpread$2(_objectSpread$2({}, key === "root" && _objectSpread$2(_defineProperty$2({}, "".concat(datasetPrefix, "name"), ObjectUtils.toFlatCase(isExtended ? (_this$pt5 = this.pt) === null || _this$pt5 === void 0 ? void 0 : _this$pt5["data-pc-section"] : this.$.type.name)), isExtended && _defineProperty$2({}, "".concat(datasetPrefix, "extend"), ObjectUtils.toFlatCase(this.$.type.name)))), {}, _defineProperty$2({}, "".concat(datasetPrefix, "section"), ObjectUtils.toFlatCase(key)));
    },
    _getPTClassValue: function _getPTClassValue() {
      var value = this._getOptionValue.apply(this, arguments);
      return ObjectUtils.isString(value) || ObjectUtils.isArray(value) ? {
        "class": value
      } : value;
    },
    _getPT: function _getPT2(pt) {
      var _this = this;
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var callback = arguments.length > 2 ? arguments[2] : void 0;
      var getValue = function getValue2(value) {
        var _ref5;
        var checkSameKey = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        var computedValue = callback ? callback(value) : value;
        var _key = ObjectUtils.toFlatCase(key);
        var _cKey = ObjectUtils.toFlatCase(_this.$name);
        return (_ref5 = checkSameKey ? _key !== _cKey ? computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key] : void 0 : computedValue === null || computedValue === void 0 ? void 0 : computedValue[_key]) !== null && _ref5 !== void 0 ? _ref5 : computedValue;
      };
      return pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept") ? {
        _usept: pt["_usept"],
        originalValue: getValue(pt.originalValue),
        value: getValue(pt.value)
      } : getValue(pt, true);
    },
    _usePT: function _usePT2(pt, callback, key, params) {
      var fn = function fn2(value2) {
        return callback(value2, key, params);
      };
      if (pt !== null && pt !== void 0 && pt.hasOwnProperty("_usept")) {
        var _this$$primevueConfig7;
        var _ref6 = pt["_usept"] || ((_this$$primevueConfig7 = this.$primevueConfig) === null || _this$$primevueConfig7 === void 0 ? void 0 : _this$$primevueConfig7.ptOptions) || {}, _ref6$mergeSections = _ref6.mergeSections, mergeSections = _ref6$mergeSections === void 0 ? true : _ref6$mergeSections, _ref6$mergeProps = _ref6.mergeProps, useMergeProps = _ref6$mergeProps === void 0 ? false : _ref6$mergeProps;
        var originalValue = fn(pt.originalValue);
        var value = fn(pt.value);
        if (originalValue === void 0 && value === void 0)
          return void 0;
        else if (ObjectUtils.isString(value))
          return value;
        else if (ObjectUtils.isString(originalValue))
          return originalValue;
        return mergeSections || !mergeSections && value ? useMergeProps ? this._mergeProps(useMergeProps, originalValue, value) : _objectSpread$2(_objectSpread$2({}, originalValue), value) : value;
      }
      return fn(pt);
    },
    _useGlobalPT: function _useGlobalPT(callback, key, params) {
      return this._usePT(this.globalPT, callback, key, params);
    },
    _useDefaultPT: function _useDefaultPT2(callback, key, params) {
      return this._usePT(this.defaultPT, callback, key, params);
    },
    ptm: function ptm() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this._getPTValue(this.pt, key, _objectSpread$2(_objectSpread$2({}, this.$params), params));
    },
    ptmi: function ptmi() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return mergeProps(this.$_attrsNoPT, this.ptm(key, params));
    },
    ptmo: function ptmo() {
      var obj = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var key = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this._getPTValue(obj, key, _objectSpread$2({
        instance: this
      }, params), false);
    },
    cx: function cx() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return !this.isUnstyled ? this._getOptionValue(this.$style.classes, key, _objectSpread$2(_objectSpread$2({}, this.$params), params)) : void 0;
    },
    sx: function sx() {
      var key = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      var when = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      var params = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (when) {
        var self2 = this._getOptionValue(this.$style.inlineStyles, key, _objectSpread$2(_objectSpread$2({}, this.$params), params));
        var base = this._getOptionValue(BaseComponentStyle.inlineStyles, key, _objectSpread$2(_objectSpread$2({}, this.$params), params));
        return [base, self2];
      }
      return void 0;
    }
  },
  computed: {
    globalPT: function globalPT() {
      var _this$$primevueConfig8, _this2 = this;
      return this._getPT((_this$$primevueConfig8 = this.$primevueConfig) === null || _this$$primevueConfig8 === void 0 ? void 0 : _this$$primevueConfig8.pt, void 0, function(value) {
        return ObjectUtils.getItemValue(value, {
          instance: _this2
        });
      });
    },
    defaultPT: function defaultPT() {
      var _this$$primevueConfig9, _this3 = this;
      return this._getPT((_this$$primevueConfig9 = this.$primevueConfig) === null || _this$$primevueConfig9 === void 0 ? void 0 : _this$$primevueConfig9.pt, void 0, function(value) {
        return _this3._getOptionValue(value, _this3.$name, _objectSpread$2({}, _this3.$params)) || ObjectUtils.getItemValue(value, _objectSpread$2({}, _this3.$params));
      });
    },
    isUnstyled: function isUnstyled() {
      var _this$$primevueConfig10;
      return this.unstyled !== void 0 ? this.unstyled : (_this$$primevueConfig10 = this.$primevueConfig) === null || _this$$primevueConfig10 === void 0 ? void 0 : _this$$primevueConfig10.unstyled;
    },
    $params: function $params() {
      var parentInstance = this._getHostInstance(this) || this.$parent;
      return {
        instance: this,
        props: this.$props,
        state: this.$data,
        attrs: this.$attrs,
        parent: {
          instance: parentInstance,
          props: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$props,
          state: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$data,
          attrs: parentInstance === null || parentInstance === void 0 ? void 0 : parentInstance.$attrs
        },
        /* @deprecated since v3.43.0. Use the `parent.instance` instead of the `parentInstance`.*/
        parentInstance
      };
    },
    $style: function $style() {
      return _objectSpread$2(_objectSpread$2({
        classes: void 0,
        inlineStyles: void 0,
        loadStyle: function loadStyle2() {
        },
        loadCustomStyle: function loadCustomStyle() {
        }
      }, (this._getHostInstance(this) || {}).$style), this.$options.style);
    },
    $primevueConfig: function $primevueConfig() {
      var _this$$primevue4;
      return (_this$$primevue4 = this.$primevue) === null || _this$$primevue4 === void 0 ? void 0 : _this$$primevue4.config;
    },
    $name: function $name() {
      return this.$options.hostName || this.$.type.name;
    },
    $_attrsPT: function $_attrsPT() {
      return Object.entries(this.$attrs || {}).filter(function(_ref7) {
        var _ref8 = _slicedToArray(_ref7, 1), key = _ref8[0];
        return key === null || key === void 0 ? void 0 : key.startsWith("pt:");
      }).reduce(function(result, _ref9) {
        var _ref10 = _slicedToArray(_ref9, 2), key = _ref10[0], value = _ref10[1];
        var _key$split = key.split(":"), _key$split2 = _toArray(_key$split), rest = _key$split2.slice(1);
        rest === null || rest === void 0 || rest.reduce(function(currentObj, nestedKey, index3, array) {
          !currentObj[nestedKey] && (currentObj[nestedKey] = index3 === array.length - 1 ? value : {});
          return currentObj[nestedKey];
        }, result);
        return result;
      }, {});
    },
    $_attrsNoPT: function $_attrsNoPT() {
      return Object.entries(this.$attrs || {}).filter(function(_ref11) {
        var _ref12 = _slicedToArray(_ref11, 1), key = _ref12[0];
        return !(key !== null && key !== void 0 && key.startsWith("pt:"));
      }).reduce(function(acc, _ref13) {
        var _ref14 = _slicedToArray(_ref13, 2), key = _ref14[0], value = _ref14[1];
        acc[key] = value;
        return acc;
      }, {});
    }
  }
};
var script$1$5 = {
  name: "BaseBadge",
  "extends": script$a,
  props: {
    value: {
      type: [String, Number],
      "default": null
    },
    severity: {
      type: String,
      "default": null
    },
    size: {
      type: String,
      "default": null
    }
  },
  style: BadgeStyle,
  provide: function provide2() {
    return {
      $parentInstance: this
    };
  }
};
var script$9 = {
  name: "Badge",
  "extends": script$1$5,
  inheritAttrs: false
};
function render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [createTextVNode(toDisplayString$1(_ctx.value), 1)];
  })], 16);
}
script$9.render = render$7;
var css = "\n.p-icon {\n    display: inline-block;\n}\n\n.p-icon-spin {\n    -webkit-animation: p-icon-spin 2s infinite linear;\n    animation: p-icon-spin 2s infinite linear;\n}\n\n@-webkit-keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n\n@keyframes p-icon-spin {\n    0% {\n        -webkit-transform: rotate(0deg);\n        transform: rotate(0deg);\n    }\n    100% {\n        -webkit-transform: rotate(359deg);\n        transform: rotate(359deg);\n    }\n}\n";
var BaseIconStyle = BaseStyle.extend({
  name: "baseicon",
  css
});
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
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
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
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
  if ("object" != _typeof$1(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var script$8 = {
  name: "BaseIcon",
  "extends": script$a,
  props: {
    label: {
      type: String,
      "default": void 0
    },
    spin: {
      type: Boolean,
      "default": false
    }
  },
  style: BaseIconStyle,
  methods: {
    pti: function pti() {
      var isLabelEmpty = ObjectUtils.isEmpty(this.label);
      return _objectSpread(_objectSpread({}, !this.isUnstyled && {
        "class": ["p-icon", {
          "p-icon-spin": this.spin
        }]
      }), {}, {
        role: !isLabelEmpty ? "img" : void 0,
        "aria-label": !isLabelEmpty ? this.label : void 0,
        "aria-hidden": isLabelEmpty
      });
    }
  }
};
var script$7 = {
  name: "SpinnerIcon",
  "extends": script$8
};
var _hoisted_1$6 = /* @__PURE__ */ createElementVNode("path", {
  d: "M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$3 = [_hoisted_1$6];
function render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$3, 16);
}
script$7.render = render$6;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
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
  if ("object" != _typeof(t) || !t)
    return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i))
      return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var classes$4 = {
  root: function root2(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-button p-component", _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      "p-button-icon-only": instance.hasIcon && !props.label && !props.badge,
      "p-button-vertical": (props.iconPos === "top" || props.iconPos === "bottom") && props.label,
      "p-disabled": instance.$attrs.disabled || instance.$attrs.disabled === "" || props.loading,
      "p-button-loading": props.loading,
      "p-button-loading-label-only": props.loading && !instance.hasIcon && props.label,
      "p-button-link": props.link
    }, "p-button-".concat(props.severity), props.severity), "p-button-raised", props.raised), "p-button-rounded", props.rounded), "p-button-text", props.text), "p-button-outlined", props.outlined), "p-button-sm", props.size === "small"), "p-button-lg", props.size === "large"), "p-button-plain", props.plain)];
  },
  loadingIcon: "p-button-loading-icon pi-spin",
  icon: function icon(_ref3) {
    var props = _ref3.props;
    return ["p-button-icon", {
      "p-button-icon-left": props.iconPos === "left" && props.label,
      "p-button-icon-right": props.iconPos === "right" && props.label,
      "p-button-icon-top": props.iconPos === "top" && props.label,
      "p-button-icon-bottom": props.iconPos === "bottom" && props.label
    }];
  },
  label: "p-button-label"
};
var ButtonStyle = BaseStyle.extend({
  name: "button",
  classes: classes$4
});
var script$1$4 = {
  name: "BaseButton",
  "extends": script$a,
  props: {
    label: {
      type: String,
      "default": null
    },
    icon: {
      type: String,
      "default": null
    },
    iconPos: {
      type: String,
      "default": "left"
    },
    iconClass: {
      type: String,
      "default": null
    },
    badge: {
      type: String,
      "default": null
    },
    badgeClass: {
      type: String,
      "default": null
    },
    badgeSeverity: {
      type: String,
      "default": null
    },
    loading: {
      type: Boolean,
      "default": false
    },
    loadingIcon: {
      type: String,
      "default": void 0
    },
    link: {
      type: Boolean,
      "default": false
    },
    severity: {
      type: String,
      "default": null
    },
    raised: {
      type: Boolean,
      "default": false
    },
    rounded: {
      type: Boolean,
      "default": false
    },
    text: {
      type: Boolean,
      "default": false
    },
    outlined: {
      type: Boolean,
      "default": false
    },
    size: {
      type: String,
      "default": null
    },
    plain: {
      type: Boolean,
      "default": false
    }
  },
  style: ButtonStyle,
  provide: function provide3() {
    return {
      $parentInstance: this
    };
  }
};
var script$6 = {
  name: "Button",
  "extends": script$1$4,
  inheritAttrs: false,
  methods: {
    getPTOptions: function getPTOptions(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          disabled: this.disabled
        }
      });
    }
  },
  computed: {
    disabled: function disabled() {
      return this.$attrs.disabled || this.$attrs.disabled === "" || this.loading;
    },
    defaultAriaLabel: function defaultAriaLabel() {
      return this.label ? this.label + (this.badge ? " " + this.badge : "") : this.$attrs.ariaLabel;
    },
    hasIcon: function hasIcon() {
      return this.icon || this.$slots.icon;
    }
  },
  components: {
    SpinnerIcon: script$7,
    Badge: script$9
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1$5 = ["aria-label", "disabled", "data-p-severity"];
function render$5(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_SpinnerIcon = resolveComponent("SpinnerIcon");
  var _component_Badge = resolveComponent("Badge");
  var _directive_ripple = resolveDirective("ripple");
  return withDirectives((openBlock(), createElementBlock("button", mergeProps({
    "class": _ctx.cx("root"),
    type: "button",
    "aria-label": $options.defaultAriaLabel,
    disabled: $options.disabled
  }, $options.getPTOptions("root"), {
    "data-p-severity": _ctx.severity
  }), [renderSlot(_ctx.$slots, "default", {}, function() {
    return [_ctx.loading ? renderSlot(_ctx.$slots, "loadingicon", {
      key: 0,
      "class": normalizeClass([_ctx.cx("loadingIcon"), _ctx.cx("icon")])
    }, function() {
      return [_ctx.loadingIcon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 0,
        "class": [_ctx.cx("loadingIcon"), _ctx.cx("icon"), _ctx.loadingIcon]
      }, _ctx.ptm("loadingIcon")), null, 16)) : (openBlock(), createBlock(_component_SpinnerIcon, mergeProps({
        key: 1,
        "class": [_ctx.cx("loadingIcon"), _ctx.cx("icon")],
        spin: ""
      }, _ctx.ptm("loadingIcon")), null, 16, ["class"]))];
    }) : renderSlot(_ctx.$slots, "icon", {
      key: 1,
      "class": normalizeClass([_ctx.cx("icon")])
    }, function() {
      return [_ctx.icon ? (openBlock(), createElementBlock("span", mergeProps({
        key: 0,
        "class": [_ctx.cx("icon"), _ctx.icon, _ctx.iconClass]
      }, _ctx.ptm("icon")), null, 16)) : createCommentVNode("", true)];
    }), createElementVNode("span", mergeProps({
      "class": _ctx.cx("label")
    }, _ctx.ptm("label")), toDisplayString$1(_ctx.label || "\xA0"), 17), _ctx.badge ? (openBlock(), createBlock(_component_Badge, mergeProps({
      key: 2,
      value: _ctx.badge,
      "class": _ctx.badgeClass,
      severity: _ctx.badgeSeverity,
      unstyled: _ctx.unstyled
    }, _ctx.ptm("badge")), null, 16, ["value", "class", "severity", "unstyled"])) : createCommentVNode("", true)];
  })], 16, _hoisted_1$5)), [[_directive_ripple]]);
}
script$6.render = render$5;
const button_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "DeSvgIcon",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: "de-icon",
        "aria-hidden": "true"
      }, _attrs))}><use${ssrRenderAttr("xlink:href", `/images/sprite.svg#${__props.name}`)}></use></svg>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/svg-icon/DeSvgIcon.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
var ButtonCategoryOptions = /* @__PURE__ */ ((ButtonCategoryOptions2) => {
  ButtonCategoryOptions2["primary"] = "primary";
  ButtonCategoryOptions2["secondary"] = "secondary";
  ButtonCategoryOptions2["tertiary"] = "tertiary";
  return ButtonCategoryOptions2;
})(ButtonCategoryOptions || {});
var ButtonVariantOptions = /* @__PURE__ */ ((ButtonVariantOptions2) => {
  ButtonVariantOptions2["default"] = "default";
  ButtonVariantOptions2["confirm"] = "confirm";
  ButtonVariantOptions2["link"] = "link";
  ButtonVariantOptions2["text"] = "text";
  return ButtonVariantOptions2;
})(ButtonVariantOptions || {});
var ButtonSizeOptions = /* @__PURE__ */ ((ButtonSizeOptions2) => {
  ButtonSizeOptions2["normal"] = "normal";
  ButtonSizeOptions2["medium"] = "md";
  return ButtonSizeOptions2;
})(ButtonSizeOptions || {});
var ButtonIconPositionOptions = /* @__PURE__ */ ((ButtonIconPositionOptions2) => {
  ButtonIconPositionOptions2["left"] = "left";
  ButtonIconPositionOptions2["right"] = "right";
  ButtonIconPositionOptions2["center"] = "center";
  return ButtonIconPositionOptions2;
})(ButtonIconPositionOptions || {});
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DeButton",
  __ssrInlineRender: true,
  props: {
    label: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      default: ButtonCategoryOptions.primary,
      validator: (value) => Object.values(ButtonCategoryOptions).includes(value)
    },
    variant: {
      type: String,
      default: ButtonVariantOptions.default,
      validator: (value) => Object.values(ButtonVariantOptions).includes(value)
    },
    size: {
      type: String,
      default: ButtonSizeOptions.normal,
      validator: (value) => Object.values(ButtonSizeOptions).includes(value)
    },
    icon: {
      type: String,
      default: ""
    },
    iconPos: {
      type: String,
      default: ButtonIconPositionOptions.left,
      validator: (value) => Object.values(ButtonIconPositionOptions).includes(value)
    },
    iconClass: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    link: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "button"
    }
    // selected: {
    //   type: Boolean,
    //   default: false,
    // },
    // buttonTextClasses: {
    //   type: String,
    //   default: '',
    // },
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const isButtonDisabled = computed(() => {
      return props.disabled || props.loading;
    });
    const buttonClasses = computed(() => {
      const classes2 = {
        root: ["de-button", `de-button-${props.variant}`],
        label: ["de-button-label"],
        icon: ["de-icon"],
        loadingIcon: ["de-button-icon-loading"],
        badge: []
      };
      const nonCategoryVariants = [ButtonVariantOptions.link];
      if (!nonCategoryVariants.includes(props.variant) && props.category !== ButtonCategoryOptions.primary) {
        classes2.root.push(`de-button-${props.variant}-${props.category}`);
      }
      if (props.size) {
        classes2.root.push(`de-button-${props.size}`);
      }
      if (props.icon) {
        classes2.icon.push("de-button-icon", `de-button-icon-${props.iconPos}`, props.iconClass);
      }
      if (props.loading) {
        classes2.loadingIcon.push(props.iconClass, `de-button-icon-${props.iconPos}`);
      }
      return classes2;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_button = script$6;
      _push(ssrRenderComponent(_component_prime_button, mergeProps({
        label: __props.label,
        disabled: unref(isButtonDisabled),
        type: __props.type,
        loading: __props.loading,
        link: __props.link,
        pt: {
          root: { class: unref(buttonClasses).root }
        },
        class: _ctx.$attrs.class,
        onClick: ($event) => _ctx.$emit("click")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.icon && !__props.loading) {
              _push2(ssrRenderComponent(_sfc_main$m, {
                name: __props.icon,
                class: unref(buttonClasses).icon
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.loading) {
              _push2(ssrRenderComponent(_sfc_main$m, {
                name: "loader",
                class: unref(buttonClasses).loadingIcon
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.label) {
              _push2(`<span class="${ssrRenderClass(unref(buttonClasses).label)}"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
            } else {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            }
          } else {
            return [
              __props.icon && !__props.loading ? (openBlock(), createBlock(_sfc_main$m, {
                key: 0,
                name: __props.icon,
                class: unref(buttonClasses).icon
              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
              __props.loading ? (openBlock(), createBlock(_sfc_main$m, {
                key: 1,
                name: "loader",
                class: unref(buttonClasses).loadingIcon
              }, null, 8, ["class"])) : createCommentVNode("", true),
              __props.label ? (openBlock(), createBlock("span", {
                key: 2,
                class: unref(buttonClasses).label
              }, toDisplayString$1(__props.label), 3)) : renderSlot(_ctx.$slots, "default", { key: 3 })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/button/DeButton.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const NuxtLinkLocale = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLinkLocale" });
const __nuxt_component_0 = defineComponent({
  name: "NuxtLinkLocale",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- FIXME
  props: {
    ...NuxtLinkLocale.props,
    locale: {
      type: String,
      default: void 0,
      required: false
    }
  },
  setup(props, { slots }) {
    const localePath2 = useLocalePath();
    const resolvedPath = computed(() => {
      var _a;
      const destination = (_a = props.to) != null ? _a : props.href;
      return destination != null ? localePath2(destination, props.locale) : destination;
    });
    const isExternal = computed(() => {
      var _a;
      if (props.external) {
        return true;
      }
      if (props.target && props.target !== "_self") {
        return true;
      }
      const destination = (_a = props.to) != null ? _a : props.href;
      if (typeof destination === "object") {
        return false;
      }
      return destination === "" || destination == null || hasProtocol(destination, { acceptRelative: true });
    });
    const getNuxtLinkProps = () => {
      const _props = {
        ...props
      };
      if (!isExternal.value) {
        _props.to = resolvedPath.value;
      }
      delete _props.href;
      delete _props.locale;
      return _props;
    };
    return () => h(NuxtLinkLocale, getNuxtLinkProps(), slots.default);
  }
});
const AVATAR_SIZE_OPTIONS = {
  normal: "normal",
  //32x32px
  small: "sm",
  //16x16px
  medium: "md",
  //24x24px
  large: "lg"
  //80x80px
};
const AVATAR_SHAPE_OPTIONS = {
  circle: "circle",
  rect: "rect"
};
function getResponsiveImageUrl(src, width2, height, multiplier = 1) {
  const scaledWidth = width2 * multiplier;
  const scaledHeight = height ? height * multiplier : scaledWidth;
  return `${src}?w=${scaledWidth}&h=${scaledHeight}`;
}
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "DeAvatar",
  __ssrInlineRender: true,
  props: {
    src: {},
    size: { default: AVATAR_SIZE_OPTIONS.normal },
    label: {},
    alt: { default: "user avatar" },
    loading: { default: "eager" },
    fallbackOnError: { type: Boolean },
    shape: { default: AVATAR_SHAPE_OPTIONS.circle },
    iconClass: {}
  },
  emits: ["load-error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const avatarSrc = computed(() => {
      const sizeMapping = {
        [AVATAR_SIZE_OPTIONS.small]: { width: 16, height: 16 },
        [AVATAR_SIZE_OPTIONS.medium]: { width: 24, height: 24 },
        [AVATAR_SIZE_OPTIONS.large]: { width: 80, height: 80 },
        [AVATAR_SIZE_OPTIONS.normal]: { width: 32, height: 32 }
      };
      const { width: width2, height } = sizeMapping[props.size] || { width: 32, height: 32 };
      const avatarSrc2 = props.src || "";
      return {
        x1: getResponsiveImageUrl(avatarSrc2, width2, height),
        x2: getResponsiveImageUrl(avatarSrc2, width2, height, 2)
      };
    });
    const imageLoadError = ref(false);
    const showImage = computed(() => {
      if (!props.src) {
        return false;
      }
      if (props.src && props.fallbackOnError && imageLoadError.value) {
        return false;
      }
      return true;
    });
    const isCircle = computed(() => {
      return props.shape === AVATAR_SHAPE_OPTIONS.circle;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["de-avatar", [`de-avatar-${_ctx.size}`, { "de-avatar-circle": unref(isCircle) }]]
      }, _attrs))}>`);
      if (_ctx.label) {
        _push(`<span class="de-avatar-label">${ssrInterpolate(_ctx.label)}</span>`);
      } else if (unref(showImage) && _ctx.src) {
        _push(`<picture><source${ssrRenderAttr("srcset", `${unref(avatarSrc).x2} 2x, ${unref(avatarSrc).x1} 1x`)}><img${ssrRenderAttr("src", unref(avatarSrc).x1)}${ssrRenderAttr("alt", _ctx.alt)}${ssrRenderAttr("loading", _ctx.loading)}${ssrRenderAttr("fetchpriority", _ctx.loading === "lazy" ? "low" : "high")} class="de-avatar-image"></picture>`);
      } else {
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "user-filled",
          class: ["de-avatar-icon-default", _ctx.iconClass]
        }, null, _parent));
      }
      _push(`</span>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/avatar/DeAvatar.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
var script$5 = {
  name: "CheckIcon",
  "extends": script$8
};
var _hoisted_1$4 = /* @__PURE__ */ createElementVNode("path", {
  d: "M4.86199 11.5948C4.78717 11.5923 4.71366 11.5745 4.64596 11.5426C4.57826 11.5107 4.51779 11.4652 4.46827 11.4091L0.753985 7.69483C0.683167 7.64891 0.623706 7.58751 0.580092 7.51525C0.536478 7.44299 0.509851 7.36177 0.502221 7.27771C0.49459 7.19366 0.506156 7.10897 0.536046 7.03004C0.565935 6.95111 0.613367 6.88 0.674759 6.82208C0.736151 6.76416 0.8099 6.72095 0.890436 6.69571C0.970973 6.67046 1.05619 6.66385 1.13966 6.67635C1.22313 6.68886 1.30266 6.72017 1.37226 6.76792C1.44186 6.81567 1.4997 6.8786 1.54141 6.95197L4.86199 10.2503L12.6397 2.49483C12.7444 2.42694 12.8689 2.39617 12.9932 2.40745C13.1174 2.41873 13.2343 2.47141 13.3251 2.55705C13.4159 2.64268 13.4753 2.75632 13.4938 2.87973C13.5123 3.00315 13.4888 3.1292 13.4271 3.23768L5.2557 11.4091C5.20618 11.4652 5.14571 11.5107 5.07801 11.5426C5.01031 11.5745 4.9368 11.5923 4.86199 11.5948Z",
  fill: "currentColor"
}, null, -1);
var _hoisted_2$2 = [_hoisted_1$4];
function render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("svg", mergeProps({
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, _ctx.pti()), _hoisted_2$2, 16);
}
script$5.render = render$4;
var classes$3 = {
  root: function root3(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-checkbox p-component", {
      "p-highlight": instance.checked,
      "p-disabled": props.disabled,
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled"
    }];
  },
  box: "p-checkbox-box",
  input: "p-checkbox-input",
  icon: "p-checkbox-icon"
};
var CheckboxStyle = BaseStyle.extend({
  name: "checkbox",
  classes: classes$3
});
var script$1$3 = {
  name: "BaseCheckbox",
  "extends": script$a,
  props: {
    value: null,
    modelValue: null,
    binary: Boolean,
    name: {
      type: String,
      "default": null
    },
    trueValue: {
      type: null,
      "default": true
    },
    falseValue: {
      type: null,
      "default": false
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
    required: {
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
  style: CheckboxStyle,
  provide: function provide4() {
    return {
      $parentInstance: this
    };
  }
};
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
var script$4 = {
  name: "Checkbox",
  "extends": script$1$3,
  inheritAttrs: false,
  emits: ["update:modelValue", "change", "focus", "blur"],
  methods: {
    getPTOptions: function getPTOptions2(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          checked: this.checked,
          disabled: this.disabled
        }
      });
    },
    onChange: function onChange(event) {
      var _this = this;
      if (!this.disabled && !this.readonly) {
        var newModelValue;
        if (this.binary) {
          newModelValue = this.checked ? this.falseValue : this.trueValue;
        } else {
          if (this.checked)
            newModelValue = this.modelValue.filter(function(val) {
              return !ObjectUtils.equals(val, _this.value);
            });
          else
            newModelValue = this.modelValue ? [].concat(_toConsumableArray(this.modelValue), [this.value]) : [this.value];
        }
        this.$emit("update:modelValue", newModelValue);
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
      return this.binary ? this.modelValue === this.trueValue : ObjectUtils.contains(this.value, this.modelValue);
    }
  },
  components: {
    CheckIcon: script$5
  }
};
var _hoisted_1$3 = ["data-p-highlight", "data-p-disabled"];
var _hoisted_2$1 = ["id", "value", "name", "checked", "tabindex", "disabled", "readonly", "required", "aria-labelledby", "aria-label", "aria-invalid"];
function render$3(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_CheckIcon = resolveComponent("CheckIcon");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, $options.getPTOptions("root"), {
    "data-p-highlight": $options.checked,
    "data-p-disabled": _ctx.disabled
  }), [createElementVNode("input", mergeProps({
    id: _ctx.inputId,
    type: "checkbox",
    "class": [_ctx.cx("input"), _ctx.inputClass],
    style: _ctx.inputStyle,
    value: _ctx.value,
    name: _ctx.name,
    checked: $options.checked,
    tabindex: _ctx.tabindex,
    disabled: _ctx.disabled,
    readonly: _ctx.readonly,
    required: _ctx.required,
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
  }, $options.getPTOptions("input")), null, 16, _hoisted_2$1), createElementVNode("div", mergeProps({
    "class": _ctx.cx("box")
  }, $options.getPTOptions("box")), [renderSlot(_ctx.$slots, "icon", {
    checked: $options.checked,
    "class": normalizeClass(_ctx.cx("icon"))
  }, function() {
    return [$options.checked ? (openBlock(), createBlock(_component_CheckIcon, mergeProps({
      key: 0,
      "class": _ctx.cx("icon")
    }, $options.getPTOptions("icon")), null, 16, ["class"])) : createCommentVNode("", true)];
  })], 16)], 16, _hoisted_1$3);
}
script$4.render = render$3;
const checkbox_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$4
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "DeFormCheckbox",
  __ssrInlineRender: true,
  props: {
    value: { type: [Boolean, String] },
    name: {},
    binary: { type: Boolean },
    inputId: {},
    label: {},
    inputClass: {},
    labelClass: {},
    disabled: { type: Boolean },
    showError: { type: Boolean },
    beforeChange: { type: Function }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { name } = toRefs(props);
    const {
      checked: checked2,
      handleChange,
      errorMessage,
      value: checkboxValue
    } = useField(name, void 0, {
      // 👇 These are important
      type: "checkbox",
      checkedValue: props.value
    });
    const emit = __emit;
    const onChange2 = () => {
      if (props.beforeChange && typeof props.beforeChange === "function") {
        const isProceed = props.beforeChange(!!(checked2 == null ? void 0 : checked2.value));
        if (isProceed) {
          handleChange(props.value);
          emit("change", checkboxValue.value, !!(checked2 == null ? void 0 : checked2.value));
        }
        return;
      }
      handleChange(props.value);
      emit("change", checkboxValue.value, !!(checked2 == null ? void 0 : checked2.value));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_checkbox = script$4;
      _push(`<!--[--><div class="${ssrRenderClass([_ctx.$attrs.class, "tw-flex tw-items-center"])}">`);
      _push(ssrRenderComponent(_component_prime_checkbox, {
        "input-id": _ctx.inputId,
        binary: _ctx.binary,
        disabled: _ctx.disabled,
        name: unref(name),
        value: _ctx.value,
        pt: {
          root: ["de-form-checkbox", { "is-checked": unref(checked2) }, props.inputClass],
          input: "de-form-checkbox-input"
        },
        onClick: onChange2
      }, {
        icon: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(checked2)) {
              _push2(ssrRenderComponent(_sfc_main$m, {
                name: "check",
                class: "de-form-checkbox-icon"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(checked2) ? (openBlock(), createBlock(_sfc_main$m, {
                key: 0,
                name: "check",
                class: "de-form-checkbox-icon"
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (_ctx.inputId) {
        _push(`<label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass([props.labelClass, "de-form-checkbox-label"])}">`);
        ssrRenderSlot(_ctx.$slots, "label", {}, () => {
          _push(`${ssrInterpolate(_ctx.label)}`);
        }, _push, _parent);
        _push(`</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (_ctx.showError && unref(errorMessage)) {
        _push(`<div class="de-form-error">${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/form/form-checkbox/DeFormCheckbox.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
var classes$2 = {
  root: function root4(_ref) {
    var instance = _ref.instance, props = _ref.props;
    return ["p-inputtext p-component", {
      "p-filled": instance.filled,
      "p-inputtext-sm": props.size === "small",
      "p-inputtext-lg": props.size === "large",
      "p-invalid": props.invalid,
      "p-variant-filled": props.variant ? props.variant === "filled" : instance.$primevue.config.inputStyle === "filled"
    }];
  }
};
var InputTextStyle = BaseStyle.extend({
  name: "inputtext",
  classes: classes$2
});
var script$1$2 = {
  name: "BaseInputText",
  "extends": script$a,
  props: {
    modelValue: null,
    size: {
      type: String,
      "default": null
    },
    invalid: {
      type: Boolean,
      "default": false
    },
    variant: {
      type: String,
      "default": null
    }
  },
  style: InputTextStyle,
  provide: function provide5() {
    return {
      $parentInstance: this
    };
  }
};
var script$3 = {
  name: "InputText",
  "extends": script$1$2,
  inheritAttrs: false,
  emits: ["update:modelValue"],
  methods: {
    getPTOptions: function getPTOptions3(key) {
      var _ptm = key === "root" ? this.ptmi : this.ptm;
      return _ptm(key, {
        context: {
          filled: this.filled,
          disabled: this.$attrs.disabled || this.$attrs.disabled === ""
        }
      });
    },
    onInput: function onInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  },
  computed: {
    filled: function filled() {
      return this.modelValue != null && this.modelValue.toString().length > 0;
    }
  }
};
var _hoisted_1$2 = ["value", "aria-invalid"];
function render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("input", mergeProps({
    "class": _ctx.cx("root"),
    value: _ctx.modelValue,
    "aria-invalid": _ctx.invalid || void 0,
    onInput: _cache[0] || (_cache[0] = function() {
      return $options.onInput && $options.onInput.apply($options, arguments);
    })
  }, $options.getPTOptions("root")), null, 16, _hoisted_1$2);
}
script$3.render = render$2;
const inputtext_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DeFormInputText",
  __ssrInlineRender: true,
  props: {
    id: {},
    label: {},
    hintMessage: {},
    isError: { type: Boolean },
    wrapperClass: {},
    maxlength: {},
    minlength: {},
    showWordLimit: { type: Boolean },
    placeholder: {},
    autofocus: { type: Boolean }
  },
  setup(__props, { expose: __expose }) {
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
    const input = ref(null);
    async function focus2() {
      var _a, _b;
      await nextTick();
      (_b = (_a = input.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.focus();
    }
    __expose({ focus: focus2 });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _attrs))}>`);
      if (_ctx.label) {
        _push(`<label${ssrRenderAttr("for", _ctx.id)} class="de-form-input-text-label">${ssrInterpolate(_ctx.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(script$3), mergeProps({
        id: _ctx.id,
        ref_key: "input",
        ref: input,
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        autofocus: _ctx.autofocus
      }, _ctx.$attrs, {
        placeholder: _ctx.placeholder,
        maxlength: _ctx.maxlength,
        minlength: _ctx.minlength,
        class: ["de-form-input-text", { "is-error": !!unref(errorMessage) || _ctx.isError }]
      }, toHandlers(validationListeners)), null, _parent));
      if (unref(errorMessage)) {
        _push(`<div class="de-form-error">${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.hintMessage || isWordLimitShown.value) {
        _push(`<div class="tw-flex tw-items-center tw-justify-between tw-text-300 tw-leading-400 tw-text-primary-300 tw-mt-1">`);
        if (_ctx.hintMessage) {
          _push(`<p>${ssrInterpolate(_ctx.hintMessage)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (isWordLimitShown.value) {
          _push(`<p><span class="${ssrRenderClass(wordLimitClass.value)}">${ssrInterpolate(unref(value).length)}</span><span>/${ssrInterpolate(_ctx.maxlength || _ctx.minlength)}</span></p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/form/form-input/DeFormInputText.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const CommunityService = (fetch) => ({
  async newsSubscribe(email) {
    return await fetch("api/community/news-subscribe", {
      method: "POST",
      body: {
        email
      }
    });
  }
});
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "SubscribeSectionForm",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const { handleSubmit, resetForm } = useForm({
      validationSchema: object({
        email: string().required(t("form.enterYourX", { field: "form.emailAddress" })).email(t("form.rules.validEmail", { field: "form.emailAddress" })),
        isTermsAccepted: boolean().required(t("form.rules.acceptTerms"))
      })
    });
    const { $customFetch } = useNuxtApp();
    const communityRepo = CommunityService($customFetch);
    const isPending = ref(false);
    const isSubmitted = ref(false);
    handleSubmit(async (values) => {
      isPending.value = true;
      try {
        await communityRepo.newsSubscribe(values.email);
        isSubmitted.value = true;
        resetForm();
      } finally {
        isPending.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_i18n_t = resolveComponent("i18n-t");
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(isSubmitted)) {
        _push(`<p class="tw-flex tw-items-center tw-mb-16"><span class="tw-flex tw-items-center tw-justify-center tw-bg-success-500/25 tw-w-6 tw-h-6 tw-p-1">`);
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "check",
          class: "tw-text-success-500"
        }, null, _parent));
        _push(`</span><span class="tw-ml-3 heading-h4 tw-text-success-500">${ssrInterpolate(unref(t)("mainPage.subscribe.subscriptionSuccessfullyCompleted"))}</span></p>`);
      } else {
        _push(`<form><div class="tw-flex tw-items-start tw-mb-5">`);
        _push(ssrRenderComponent(_sfc_main$i, {
          id: "email",
          placeholder: unref(t)("form.yourEmail"),
          type: "email",
          "wrapper-class": "tw-w-full sm:tw-w-auto",
          class: "tw-w-full sm:tw-w-[300px]"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$l, {
          type: "submit",
          variant: unref(ButtonVariantOptions).confirm,
          size: unref(ButtonSizeOptions).medium,
          loading: unref(isPending),
          label: unref(t)("common.buttons.subscribe"),
          class: "tw-ml-2.5 tw-overflow-visible"
        }, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$j, {
          value: true,
          name: "isTermsAccepted",
          "show-error": "",
          "input-id": "terms",
          binary: ""
        }, {
          label: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_i18n_t, {
                keypath: "form.iHaveReadTerms",
                scope: "global"
              }, {
                termLink: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_nuxt_link_locale, {
                      to: "/privacy-policy",
                      class: "tw-text-primary-300 tw-border-b tw-font-semibold"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(t)("terms.privacy.title"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString$1(unref(t)("terms.privacy.title")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_nuxt_link_locale, {
                        to: "/privacy-policy",
                        class: "tw-text-primary-300 tw-border-b tw-font-semibold"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString$1(unref(t)("terms.privacy.title")), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_i18n_t, {
                  keypath: "form.iHaveReadTerms",
                  scope: "global"
                }, {
                  termLink: withCtx(() => [
                    createVNode(_component_nuxt_link_locale, {
                      to: "/privacy-policy",
                      class: "tw-text-primary-300 tw-border-b tw-font-semibold"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString$1(unref(t)("terms.privacy.title")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</form>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/subscribe/SubscribeSectionForm.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "SubscribeSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "tw-bg-primary-700 tw-py-7.5 md:tw-py-10 xl:tw-py-28 main-landing-subscribe-section" }, _attrs))}><div class="tw-container"><div class="subscribe-section__content"><div class="tw-max-w-[770px]"><h2 class="heading-h2 xl:heading-h1 tw-mb-2.5">${ssrInterpolate(_ctx.$t("mainPage.subscribe.title"))}</h2><p class="tw-text-350 tw-leading-550 tw-text-primary-300 tw-mb-7.5">${ssrInterpolate(_ctx.$t("mainPage.subscribe.subtitle"))}</p></div>`);
      _push(ssrRenderComponent(_sfc_main$h, null, null, _parent));
      _push(`</div></div></section>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/subscribe/SubscribeSection.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "PublicationMetaData",
  __ssrInlineRender: true,
  props: {
    likes: {},
    views: {},
    isLiked: { type: Boolean }
  },
  emits: ["like"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const i18n = useI18n();
    const likesCount = ref(props.likes);
    const isContentLiked = ref(props.isLiked);
    const numberFormatter = Intl.NumberFormat(i18n.locale.value, {
      notation: "compact",
      maximumFractionDigits: 2
    });
    useAuthStore();
    useAppStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-justify-between tw-py-5 tw-border-y xl:tw-border-b-0 tw-border-primary-600" }, _attrs))}><div class="tw-flex tw-items-center tw-justify-center tw-gap-1.5"><button>`);
      if (isContentLiked.value) {
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "like-filled",
          class: "tw-w-600 tw-h-600 tw-text-accent-500"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "like",
          class: "tw-w-600 tw-h-600 tw-text-primary-400"
        }, null, _parent));
      }
      _push(`</button><span class="body-b2">${ssrInterpolate(unref(numberFormatter).format(likesCount.value))}</span></div></div>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/publication/PublicationMetaData.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject2 = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function createSingletonPromise(fn) {
  let _promise;
  function wrapper() {
    if (!_promise)
      _promise = fn();
    return _promise;
  }
  wrapper.reset = async () => {
    const _prev = _promise;
    _promise = void 0;
    if (_prev)
      await _prev;
  };
  return wrapper;
}
function increaseWithUnit(target, delta) {
  var _a;
  if (typeof target === "number")
    return target + delta;
  const value = ((_a = target.match(/^-?\d+\.?\d*/)) == null ? void 0 : _a[0]) || "";
  const unit = target.slice(value.length);
  const result = Number.parseFloat(value) + delta;
  if (Number.isNaN(result))
    return target;
  return result + unit;
}
function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, toValue(interval));
  }
  if (immediate) {
    isPending.value = true;
  }
  tryOnScopeDispose(stop);
  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
const defaultNavigator = void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject2(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function useMounted() {
  const isMounted = ref(false);
  getCurrentInstance();
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  let mediaQuery;
  const matches = ref(false);
  const handler3 = (event) => {
    matches.value = event.matches;
  };
  const cleanup = () => {
    if (!mediaQuery)
      return;
    if ("removeEventListener" in mediaQuery)
      mediaQuery.removeEventListener("change", handler3);
    else
      mediaQuery.removeListener(handler3);
  };
  const stopWatch = watchEffect(() => {
    if (!isSupported.value)
      return;
    cleanup();
    mediaQuery = window2.matchMedia(toValue(query));
    if ("addEventListener" in mediaQuery)
      mediaQuery.addEventListener("change", handler3);
    else
      mediaQuery.addListener(handler3);
    matches.value = mediaQuery.matches;
  });
  tryOnScopeDispose(() => {
    stopWatch();
    cleanup();
    mediaQuery = void 0;
  });
  return matches;
}
const breakpointsTailwind = {
  "sm": 640,
  "md": 768,
  "lg": 1024,
  "xl": 1280,
  "2xl": 1536
};
function useBreakpoints(breakpoints, options = {}) {
  function getValue2(k, delta) {
    let v = toValue(breakpoints[toValue(k)]);
    if (delta != null)
      v = increaseWithUnit(v, delta);
    if (typeof v === "number")
      v = `${v}px`;
    return v;
  }
  const { window: window2 = defaultWindow, strategy = "min-width" } = options;
  function match(query) {
    if (!window2)
      return false;
    return window2.matchMedia(query).matches;
  }
  const greaterOrEqual = (k) => {
    return useMediaQuery(() => `(min-width: ${getValue2(k)})`, options);
  };
  const smallerOrEqual = (k) => {
    return useMediaQuery(() => `(max-width: ${getValue2(k)})`, options);
  };
  const shortcutMethods = Object.keys(breakpoints).reduce((shortcuts, k) => {
    Object.defineProperty(shortcuts, k, {
      get: () => strategy === "min-width" ? greaterOrEqual(k) : smallerOrEqual(k),
      enumerable: true,
      configurable: true
    });
    return shortcuts;
  }, {});
  function current() {
    const points = Object.keys(breakpoints).map((i) => [i, greaterOrEqual(i)]);
    return computed(() => points.filter(([, v]) => v.value).map(([k]) => k));
  }
  return Object.assign(shortcutMethods, {
    greaterOrEqual,
    smallerOrEqual,
    greater(k) {
      return useMediaQuery(() => `(min-width: ${getValue2(k, 0.1)})`, options);
    },
    smaller(k) {
      return useMediaQuery(() => `(max-width: ${getValue2(k, -0.1)})`, options);
    },
    between(a, b) {
      return useMediaQuery(() => `(min-width: ${getValue2(a)}) and (max-width: ${getValue2(b, -0.1)})`, options);
    },
    isGreater(k) {
      return match(`(min-width: ${getValue2(k, 0.1)})`);
    },
    isGreaterOrEqual(k) {
      return match(`(min-width: ${getValue2(k)})`);
    },
    isSmaller(k) {
      return match(`(max-width: ${getValue2(k, -0.1)})`);
    },
    isSmallerOrEqual(k) {
      return match(`(max-width: ${getValue2(k)})`);
    },
    isInBetween(a, b) {
      return match(`(min-width: ${getValue2(a)}) and (max-width: ${getValue2(b, -0.1)})`);
    },
    current,
    active() {
      const bps = current();
      return computed(() => bps.value.length === 0 ? "" : bps.value.at(-1));
    }
  });
}
function usePermission(permissionDesc, options = {}) {
  const {
    controls = false,
    navigator = defaultNavigator
  } = options;
  const isSupported = useSupported(() => navigator && "permissions" in navigator);
  let permissionStatus;
  const desc = typeof permissionDesc === "string" ? { name: permissionDesc } : permissionDesc;
  const state = ref();
  const onChange2 = () => {
    if (permissionStatus)
      state.value = permissionStatus.state;
  };
  const query = createSingletonPromise(async () => {
    if (!isSupported.value)
      return;
    if (!permissionStatus) {
      try {
        permissionStatus = await navigator.permissions.query(desc);
        useEventListener(permissionStatus, "change", onChange2);
        onChange2();
      } catch (e) {
        state.value = "prompt";
      }
    }
    return permissionStatus;
  });
  query();
  if (controls) {
    return {
      state,
      isSupported,
      query
    };
  } else {
    return state;
  }
}
function useClipboard(options = {}) {
  const {
    navigator = defaultNavigator,
    read = false,
    source,
    copiedDuring = 1500,
    legacy = false
  } = options;
  const isClipboardApiSupported = useSupported(() => navigator && "clipboard" in navigator);
  const permissionRead = usePermission("clipboard-read");
  const permissionWrite = usePermission("clipboard-write");
  const isSupported = computed(() => isClipboardApiSupported.value || legacy);
  const text = ref("");
  const copied = ref(false);
  const timeout = useTimeoutFn(() => copied.value = false, copiedDuring);
  function updateText() {
    if (isClipboardApiSupported.value && isAllowed(permissionRead.value)) {
      navigator.clipboard.readText().then((value) => {
        text.value = value;
      });
    } else {
      text.value = legacyRead();
    }
  }
  if (isSupported.value && read)
    useEventListener(["copy", "cut"], updateText);
  async function copy(value = toValue(source)) {
    if (isSupported.value && value != null) {
      if (isClipboardApiSupported.value && isAllowed(permissionWrite.value))
        await navigator.clipboard.writeText(value);
      else
        legacyCopy(value);
      text.value = value;
      copied.value = true;
      timeout.start();
    }
  }
  function legacyCopy(value) {
    const ta = (void 0).createElement("textarea");
    ta.value = value != null ? value : "";
    ta.style.position = "absolute";
    ta.style.opacity = "0";
    (void 0).body.appendChild(ta);
    ta.select();
    (void 0).execCommand("copy");
    ta.remove();
  }
  function legacyRead() {
    var _a, _b, _c;
    return (_c = (_b = (_a = void 0) == null ? void 0 : _a.call(void 0)) == null ? void 0 : _b.toString()) != null ? _c : "";
  }
  function isAllowed(status) {
    return status === "granted" || status === "prompt";
  }
  return {
    isSupported,
    text,
    copied,
    copy
  };
}
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DeCopyButton",
  __ssrInlineRender: true,
  props: {
    source: {},
    successMessage: {}
  },
  setup(__props) {
    const props = __props;
    const { copy, copied } = useClipboard({ source: props.source });
    const { t } = useI18n();
    const toast = useToast();
    const toastBody = computed(() => {
      return props.successMessage || t("common.copied");
    });
    function onCopyClick() {
      copy(props.source);
      toastSuccessNotification(toast, {
        body: toastBody.value
      });
    }
    function copyValue() {
      copy(props.source);
    }
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSlot(_ctx.$slots, "default", {
        copy: copyValue,
        copied: unref(copied),
        action: onCopyClick
      }, () => {
        _push(ssrRenderComponent(_sfc_main$l, {
          size: unref(ButtonSizeOptions).medium,
          variant: unref(ButtonVariantOptions).confirm,
          label: _ctx.$t("common.buttons.copy"),
          class: _ctx.$attrs.class,
          onClick: onCopyClick
        }, null, _parent));
      }, _push, _parent);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/DeCopyButton.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
function generateFacebookShareLink(newsUrl) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(newsUrl)}`;
}
function generateTwitterShareLink(newsUrl, newsTitle) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(newsTitle)}&url=${encodeURIComponent(newsUrl)}`;
}
function generateTelegramShareLink(newsUrl, newsTitle) {
  return `https://t.me/share/url?url=${encodeURIComponent(newsUrl)}&text=${encodeURIComponent(newsTitle)}`;
}
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "PublicationSocialSharing",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const route = useRoute$1();
    const newsUrl = `${config.public.frontendDomain}${route.fullPath}`;
    const facebookShareLink = generateFacebookShareLink(newsUrl);
    const twitterShareLink = generateTwitterShareLink(newsUrl, props.title);
    const telegramShareLink = generateTelegramShareLink(newsUrl, props.title);
    const shareConfig = [
      { id: "facebook", link: facebookShareLink },
      { id: "twitter", link: twitterShareLink },
      { id: "telegram", link: telegramShareLink }
    ];
    const toast = useToast();
    const onCopyClick = (copy) => {
      copy();
      toastSuccessNotification(toast, {
        body: t("articles.linkCopied")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><h3 class="heading-h2 md:heading-h1 lg:heading-h2 tw-mb-5">${ssrInterpolate(unref(t)("common.share"))}</h3><ul class="tw-flex tw-gap-6"><!--[-->`);
      ssrRenderList(shareConfig, (item) => {
        _push(`<li><a${ssrRenderAttr("href", item.link)} target="_blank" class="tw-inline-flex tw-items-center tw-justify-center tw-w-10 tw-h-10 tw-rounded-full tw-bg-primary-600">`);
        _push(ssrRenderComponent(_sfc_main$m, {
          name: `socials--${item.id}`,
          class: "tw-w-5 tw-h-5"
        }, null, _parent));
        _push(`</a></li>`);
      });
      _push(`<!--]--><li>`);
      _push(ssrRenderComponent(_sfc_main$e, { source: newsUrl }, {
        default: withCtx(({ copy }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="tw-w-10 tw-h-10 tw-rounded-full tw-bg-primary-600"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "copy",
              class: "tw-w-5 tw-h-5"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                class: "tw-w-10 tw-h-10 tw-rounded-full tw-bg-primary-600",
                onClick: ($event) => onCopyClick(copy)
              }, [
                createVNode(_sfc_main$m, {
                  name: "copy",
                  class: "tw-w-5 tw-h-5"
                })
              ], 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/publication/PublicationSocialSharing.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
var classes$1 = {
  root: "p-progress-spinner",
  spinner: "p-progress-spinner-svg",
  circle: "p-progress-spinner-circle"
};
var ProgressSpinnerStyle = BaseStyle.extend({
  name: "progressspinner",
  classes: classes$1
});
var script$1$1 = {
  name: "BaseProgressSpinner",
  "extends": script$a,
  props: {
    strokeWidth: {
      type: String,
      "default": "2"
    },
    fill: {
      type: String,
      "default": "none"
    },
    animationDuration: {
      type: String,
      "default": "2s"
    }
  },
  style: ProgressSpinnerStyle,
  provide: function provide6() {
    return {
      $parentInstance: this
    };
  }
};
var script$2 = {
  name: "ProgressSpinner",
  "extends": script$1$1,
  inheritAttrs: false,
  computed: {
    svgStyle: function svgStyle() {
      return {
        "animation-duration": this.animationDuration
      };
    }
  }
};
var _hoisted_1$1 = ["fill", "stroke-width"];
function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root"),
    role: "progressbar"
  }, _ctx.ptmi("root")), [(openBlock(), createElementBlock("svg", mergeProps({
    "class": _ctx.cx("spinner"),
    viewBox: "25 25 50 50",
    style: $options.svgStyle
  }, _ctx.ptm("spinner")), [createElementVNode("circle", mergeProps({
    "class": _ctx.cx("circle"),
    cx: "50",
    cy: "50",
    r: "20",
    fill: _ctx.fill,
    "stroke-width": _ctx.strokeWidth,
    strokeMiterlimit: "10"
  }, _ctx.ptm("circle")), null, 16, _hoisted_1$1)], 16))], 16);
}
script$2.render = render$1;
const progressspinner_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script$2
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DeProgressSpinner",
  __ssrInlineRender: true,
  props: {
    fill: {
      type: String,
      default: "none"
    },
    animationDuration: {
      type: String,
      default: "1s"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_progress_spinner = script$2;
      _push(ssrRenderComponent(_component_prime_progress_spinner, mergeProps({
        class: "tw-text-primary-500",
        fill: __props.fill,
        pt: {
          root: "de-progress-spinner",
          spinner: "de-progress-spinner-svg",
          circle: "de-progress-spinner-circle"
        }
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/progress/DeProgressSpinner.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const useSeoMetaData = ({
  title,
  description,
  image,
  relativeUrl,
  ogImageWidth,
  ogImageHeight,
  keywords
}) => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const { t } = useI18n();
  const pageTitle = title || t("common.site.metadata.homepage.title");
  const pageDescription = description || t("common.site.metadata.homepage.description");
  const url = `${config.public.frontendDomain}${relativeUrl}`;
  const commonMetaData = {
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogUrl: url
  };
  const metaData = { ...commonMetaData };
  if (image) {
    metaData.ogImage = image;
    metaData.ogImageWidth = ogImageWidth != null ? ogImageWidth : 150;
    metaData.ogImageHeight = ogImageHeight != null ? ogImageHeight : 150;
  }
  if (keywords) {
    metaData.keywords = keywords;
  }
  return useServerSeoMeta({
    ...metaData
  });
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DeViewMoreButton",
  __ssrInlineRender: true,
  props: {
    href: {
      type: String,
      default: null
    },
    buttonSize: {
      type: String,
      default: ButtonSizeOptions.medium
    },
    type: {
      type: String,
      default: "button"
    },
    label: {
      type: String,
      default: null
    }
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const isLinkType = computed(() => props.type === "link");
    const btnLabel = computed(() => props.label || t("common.buttons.viewMore"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      if (isLinkType.value) {
        _push(`<!--[-->`);
        if (__props.href) {
          _push(ssrRenderComponent(_component_nuxt_link_locale, {
            to: __props.href,
            class: ["tw-text-primary-300 tw-font-semibold tw-underline", _ctx.$attrs.class]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                ssrRenderSlot(_ctx.$slots, "default", {}, () => {
                  _push2(`<span class="tw-text-300 tw-leading-400"${_scopeId}>${ssrInterpolate(btnLabel.value)}</span>`);
                }, _push2, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "default", {}, () => [
                    createVNode("span", { class: "tw-text-300 tw-leading-400" }, toDisplayString$1(btnLabel.value), 1)
                  ])
                ];
              }
            }),
            _: 3
          }, _parent));
        } else {
          _push(`<button class="${ssrRenderClass([_ctx.$attrs.class, "tw-text-primary-300 tw-font-semibold tw-underline"])}">`);
          ssrRenderSlot(_ctx.$slots, "default", {}, () => {
            _push(`<span class="tw-text-300 tw-leading-400">${ssrInterpolate(btnLabel.value)}</span>`);
          }, _push, _parent);
          _push(`</button>`);
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!--[-->`);
        if (__props.href) {
          _push(ssrRenderComponent(_component_nuxt_link_locale, {
            to: __props.href,
            class: ["tw-inline-block", _ctx.$attrs.class]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_sfc_main$l, {
                  size: __props.buttonSize,
                  label: btnLabel.value
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_sfc_main$l, {
                    size: __props.buttonSize,
                    label: btnLabel.value
                  }, null, 8, ["size", "label"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(_sfc_main$l, {
            size: __props.buttonSize,
            label: btnLabel.value,
            class: _ctx.$attrs.class
          }, null, _parent));
        }
        _push(`<!--]-->`);
      }
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/DeViewMoreButton.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "PublicationCard",
  __ssrInlineRender: true,
  props: {
    href: {},
    image: {},
    title: {},
    content: {},
    author: {},
    createdAt: {},
    wrapperClass: {},
    contentClass: {},
    imageClass: {},
    titleClass: {}
  },
  setup(__props) {
    const props = __props;
    const cardImageSrc = computed(() => {
      const imageSrc = props.image || "";
      const imageHeight = 160;
      return {
        x1_370: getResponsiveImageUrl(imageSrc, 370, imageHeight),
        x2_370: getResponsiveImageUrl(imageSrc, 370, imageHeight, 2),
        x1_500: getResponsiveImageUrl(imageSrc, 500, imageHeight),
        x2_500: getResponsiveImageUrl(imageSrc, 500, imageHeight, 2),
        default: getResponsiveImageUrl(imageSrc, 370, imageHeight, 1.5)
      };
    });
    const { t } = useI18n();
    const publicationLinkAriaLabel = computed(
      () => `${t("common.buttons.readMore")} ${t("common.about")} ${props.title}`
    );
    ref(null);
    const numberOfLines = ref(3);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-relative" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<div class="${ssrRenderClass([_ctx.wrapperClass, "tw-h-full tw-overflow-hidden tw-flex tw-flex-col"])}">`);
      if (_ctx.image) {
        _push(`<div class="${ssrRenderClass([_ctx.imageClass, "tw-mb-5 tw-w-full tw-h-[160px]"])}"><picture><source media="(min-width: 576px)"${ssrRenderAttr("srcset", `${cardImageSrc.value.x2_370} 2x, ${cardImageSrc.value.x1_370} 1x`)}><source media="(min-width: 480px)"${ssrRenderAttr("srcset", `${cardImageSrc.value.x2_500} 2x, ${cardImageSrc.value.x1_500} 1x`)}><img${ssrRenderAttr("src", cardImageSrc.value.default)}${ssrRenderAttr("srcset", `${cardImageSrc.value.x2_370} 2x, ${cardImageSrc.value.x2_370} 1x`)}${ssrRenderAttr("alt", _ctx.title)}${ssrRenderAttr("height", 160)} loading="lazy" fetchpriority="low" class="tw-w-full tw-h-full tw-object-cover"></picture></div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.title) {
        _push(`<p class="${ssrRenderClass([_ctx.titleClass, "heading-h3 tw-line-clamp-3 tw-mb-2.5"])}">${ssrInterpolate(_ctx.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.content) {
        _push(`<p class="${ssrRenderClass([[_ctx.contentClass, `tw-line-clamp-${numberOfLines.value}`], "body-b1 tw-text-primary-300 js-content"])}">${ssrInterpolate(_ctx.content)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-mt-auto">`);
      if (_ctx.author) {
        _push(`<div class="tw-flex tw-items-center tw-gap-1.5 tw-text-300 tw-leading-400 tw-mt-2.5">`);
        _push(ssrRenderComponent(_sfc_main$k, {
          size: unref(AVATAR_SIZE_OPTIONS).small,
          src: _ctx.author.image,
          loading: "lazy"
        }, null, _parent));
        _push(`<span class="tw-inline-block tw-relative tw-z-10">${ssrInterpolate(_ctx.author.name)}</span><i class="tw-w-100 tw-h-100 tw-inline-block tw-rounded-full tw-bg-primary-400"></i><p class="tw-text-primary-300">${ssrInterpolate(_ctx.createdAt)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, {
        "aria-label": publicationLinkAriaLabel.value,
        to: _ctx.href,
        class: "tw-absolute tw-top-0 tw-w-full tw-h-full"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/publication/PublicationCard.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
function createArticleModelBase(raw, locale) {
  var _a;
  return {
    id: raw.id,
    title: raw.title,
    shortDescription: raw.short_description,
    image: raw.image_url || raw.image,
    publishedAt: raw.published_at,
    publishedAtFormatted: dayjs(raw.published_at).locale(locale).fromNow(),
    author: {
      image: (_a = raw.author_avatar) != null ? _a : USER_AVATAR_STUMP_PATH,
      name: raw.author_name
    },
    slug: raw.slug
  };
}
function createArticleModel(raw, locale) {
  const baseModel = createArticleModelBase(raw, locale);
  return {
    ...baseModel,
    content: raw.content,
    likes: raw.likes,
    pageviews: raw.pageviews,
    categoryId: raw.category_id,
    isLiked: raw.isLiked
  };
}
const ArticleService = (fetch) => ({
  async getArticlesMainPage({
    queryKey: [{ locale }]
  }) {
    const data2 = await fetch("api/main-page/top-articles", {
      credentials: "include"
    });
    const categoryArticles = Object.fromEntries(
      Object.entries(data2.categoryArticles).map(([categorySlug, articles]) => [
        categorySlug,
        articles.map((item) => createArticleModelBase(item, locale))
      ])
    );
    const categories = Object.keys(data2.categoryArticles).map((categorySlug) => {
      var _a;
      return {
        id: categorySlug,
        label: ((_a = data2.categories.find((item) => item.slug === categorySlug)) == null ? void 0 : _a.title) || categorySlug
      };
    });
    return {
      latestArticles: data2.latestArticles.map((item) => createArticleModel(item, locale)),
      categoryArticles,
      categories
    };
  },
  async getArticlesRecommended(locale) {
    const articles = await fetch("api/list/articles/recommended", {
      credentials: "include"
    });
    return articles.map((item) => createArticleModel(item, locale));
  },
  async getArticlesLatest(locale) {
    const articles = await fetch("api/list/articles/latest", {
      credentials: "include"
    });
    return articles.map((item) => createArticleModel(item, locale));
  },
  async getArticleBySlug({ queryKey: [{ slug }] }, locale) {
    const response = await fetch(`api/page/article/${slug}`, {
      credentials: "include"
    });
    return createArticleModel(response, locale);
  },
  async getOtherArticles({
    queryKey: [{ slug, locale }]
  }) {
    const response = await fetch(`api/page/article/${slug}/other`, {
      credentials: "include"
    });
    return response.map((item) => createArticleModelBase(item, locale));
  },
  async getArticlesAllRecommended(locale) {
    const response = await fetch(
      "api/list/articles/all-recommended",
      {
        credentials: "include"
      }
    );
    const result = {};
    for (const date in response) {
      result[date] = response[date].map((item) => createArticleModel(item, locale));
    }
    return result;
  },
  async getArticlesAll(categoryId, locale) {
    const articles = await fetch("api/list/articles/all", {
      credentials: "include",
      params: {
        category_id: categoryId
      }
    });
    return articles.map((item) => createArticleModel(item, locale));
  },
  async getArticleCategories() {
    const categories = await fetch("api/list/articles/categories", {
      credentials: "include"
    });
    return categories.map((item) => ({
      id: String(item.id),
      label: item.title
    }));
  },
  async like(id, like = true) {
    const apiPath = like ? `api/v1/like/article/${id}` : `api/v1/unlike/article/${id}`;
    return await fetch(apiPath, {
      localError: true,
      method: "POST"
    });
  }
});
const ONE_MINUTE_IN_MILLISECONDS = 60 * 1e3;
const FIFTEEN_MINUTES_IN_MILLISECONDS = 15 * 60 * 1e3;
const THIRTY_MINUTES_IN_MILLISECONDS = 30 * 60 * 1e3;
const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 24 * 60 * 60 * 1e3;
const articleKeys = {
  all: [{ scope: "articles" }],
  mainPage: (locale) => [{ ...articleKeys.all[0], entity: "mainPage", locale }],
  lists: () => [{ ...articleKeys.all[0], entity: "list" }],
  list: (locale) => [{ ...articleKeys.lists()[0], locale }],
  otherArticleList: (slug, locale) => [{ ...articleKeys.lists()[0], entity: "otherArticleList", slug, locale }],
  details: () => [{ ...articleKeys.all[0], entity: "detail" }],
  detail: (slug) => [{ ...articleKeys.details()[0], slug }]
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "OtherArticles",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const articleRepo = ArticleService($customFetch);
    const {
      data: articles,
      isLoading,
      suspense
    } = useQuery({
      queryKey: articleKeys.otherArticleList(route.params.slug, appStore.locale),
      queryFn: (queryKey) => articleRepo.getOtherArticles(queryKey),
      staleTime: FIFTEEN_MINUTES_IN_MILLISECONDS
    });
    onServerPrefetch(async () => {
      await suspense();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-7.5 tw-mb-15" }, _attrs))}><h2 class="heading-h2 md:heading-h1">${ssrInterpolate(_ctx.$t("articles.otherArticles"))}</h2>`);
      if (unref(isLoading)) {
        _push(ssrRenderComponent(_sfc_main$c, { class: "tw-mb-7.5 tw-h-1500 tw-w-full tw-order-1" }, null, _parent));
      } else if ((_a = unref(articles)) == null ? void 0 : _a.length) {
        _push(`<div class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5 tw-w-full"><!--[-->`);
        ssrRenderList(unref(articles), (item) => {
          _push(ssrRenderComponent(_sfc_main$a, {
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
      _push(ssrRenderComponent(_sfc_main$b, {
        href: "/analytics",
        class: "tw-mx-auto"
      }, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/article/components/OtherArticles.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e;
    let __temp, __restore;
    const route = useRoute$1();
    const router = useRouter$1();
    const localePath2 = useLocalePath();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const articleRepo = ArticleService($customFetch);
    const queryClient = useQueryClient();
    const queryKey = articleKeys.detail(route.params.slug);
    const dataFetcher = () => queryClient.fetchQuery({
      queryKey,
      queryFn: (queryKey2) => articleRepo.getArticleBySlug(queryKey2, appStore.locale),
      staleTime: THIRTY_MINUTES_IN_MILLISECONDS
    });
    const { data: article, status } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(JSON.stringify(queryKey), dataFetcher, "$MD0t8pnvBQ")), __temp = await __temp, __restore(), __temp);
    if ((_a = article.value) == null ? void 0 : _a.image) {
      useHead$1({
        link: [
          {
            rel: "preload",
            href: article.value.image,
            as: "image"
          }
        ]
      });
    }
    const articleImageSrc = computed(() => {
      var _a2;
      const imageSrc = ((_a2 = article.value) == null ? void 0 : _a2.image) || "";
      const imageHeight = 194;
      return {
        x1_450: getResponsiveImageUrl(imageSrc, 450, imageHeight),
        x2_450: getResponsiveImageUrl(imageSrc, 450, imageHeight, 2),
        x1_550: getResponsiveImageUrl(imageSrc, 550, imageHeight),
        x2_550: getResponsiveImageUrl(imageSrc, 500, imageHeight, 2),
        x1_700: getResponsiveImageUrl(imageSrc, 700, imageHeight),
        x2_700: getResponsiveImageUrl(imageSrc, 700, imageHeight, 2),
        x1_800: getResponsiveImageUrl(imageSrc, 800, 350),
        x2_800: getResponsiveImageUrl(imageSrc, 700, 350, 2),
        default: getResponsiveImageUrl(imageSrc, 450, imageHeight, 1.5)
      };
    });
    const redirectToHomeOnLocaleChange = () => {
      router.push(localePath2("/"));
    };
    watch(() => appStore.locale, redirectToHomeOnLocaleChange);
    useSeoMetaData({
      title: (_b = article.value) == null ? void 0 : _b.title,
      description: (_c = article.value) == null ? void 0 : _c.shortDescription,
      image: (_d = article.value) == null ? void 0 : _d.image,
      relativeUrl: `articles/${(_e = article.value) == null ? void 0 : _e.slug}`
    });
    const handleLike = async (isLike) => {
      await articleRepo.like(article.value.id, isLike);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      const _component_nuxt_link_locale = __nuxt_component_0;
      const _directive_safe_html = resolveDirective("safe-html");
      let _temp0;
      _push(`<!--[--><div class="tw-container tw-pt-5 md:tw-pt-7.5">`);
      if (unref(status) === "pending") {
        _push(ssrRenderComponent(_sfc_main$c, { class: "tw-mb-7.5 tw-w-1500 tw-h-1500" }, null, _parent));
      } else if (unref(article)) {
        _push(`<div class="xl:tw-flex xl:tw-gap-7.5 tw-relative tw-mb-15"><div class="xl:tw-max-w-[770px] tw-flex-shrink-0 tw-w-full">`);
        if (unref(article).image) {
          _push(`<div class="tw-mb-7.5 md:tw-mb-10 tw-w-full tw-h-[194px] md:tw-h-[400px]"><picture><source media="(min-width: 768px)"${ssrRenderAttr("srcset", `${articleImageSrc.value.x2_800} 2x, ${articleImageSrc.value.x1_800} 1x`)}><source media="(min-width: 562px)"${ssrRenderAttr("srcset", `${articleImageSrc.value.x2_700} 2x, ${articleImageSrc.value.x1_700} 1x`)}><source media="(min-width: 480px)"${ssrRenderAttr("srcset", `${articleImageSrc.value.x2_550} 2x, ${articleImageSrc.value.x1_550} 1x`)}><img${ssrRenderAttr("src", articleImageSrc.value.default)}${ssrRenderAttr("srcset", `${articleImageSrc.value.x2_450} 2x, ${articleImageSrc.value.x1_450} 1x`)}${ssrRenderAttr("alt", unref(article).title)}${ssrRenderAttr("title", unref(article).title)} class="tw-w-full tw-h-full tw-object-cover"></picture></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h1 class="heading-h2 md:heading-h1 tw-mb-5">${ssrInterpolate(unref(article).title)}</h1><div class="tw-flex tw-items-center tw-gap-2.5 tw-text-300 tw-leading-400 tw-mt-2.5">`);
        _push(ssrRenderComponent(_sfc_main$k, {
          size: unref(AVATAR_SIZE_OPTIONS).medium,
          src: unref(article).author.image
        }, null, _parent));
        _push(`<p class="body-b1 tw-text-primary-300 tw-capitalize">${ssrInterpolate(_ctx.$t("common.by"))} `);
        _push(ssrRenderComponent(_component_nuxt_link_locale, { class: "heading-h4 tw-text-primary-50 tw-normal-case" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(article).author.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString$1(unref(article).author.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p><i class="tw-w-100 tw-h-100 tw-inline-block tw-rounded-full tw-bg-primary-400"></i><p class="body-b2 tw-text-primary-300">${ssrInterpolate(unref(article).publishedAtFormatted)}</p></div><hr class="tw-my-7.5 xl:tw-my-10 tw-text-primary-600"><article${ssrRenderAttrs(_temp0 = mergeProps({ class: "text-content tw-mb-7.5 md:tw-mb-15" }, ssrGetDirectiveProps(_ctx, _directive_safe_html, unref(article).content)))}>${"textContent" in _temp0 ? ssrInterpolate(_temp0.textContent) : (_a2 = _temp0.innerHTML) != null ? _a2 : ""}</article>`);
        _push(ssrRenderComponent(_sfc_main$f, {
          views: unref(article).pageviews,
          likes: unref(article).likes,
          "is-liked": unref(article).isLiked,
          onLike: handleLike
        }, null, _parent));
        _push(`</div><div class="xl:tw-sticky xl:tw-top-7.5 tw-h-full tw-w-full tw-mt-10 xl:tw-mt-0">`);
        _push(ssrRenderComponent(_sfc_main$d, {
          title: unref(article).title,
          class: "xl:tw-pl-7.5 tw-transition"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$9, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$g, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(articles)/analytics/[slug].vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _queue = /* @__PURE__ */ new WeakMap();
function useRouteQuery(name, defaultValue, options = {}) {
  const {
    mode = "replace",
    route = useRoute$1(),
    router = useRouter$1(),
    transform: transform2 = (value) => value
  } = options;
  if (!_queue.has(router))
    _queue.set(router, /* @__PURE__ */ new Map());
  const _queriesQueue = _queue.get(router);
  let query = route.query[name];
  tryOnScopeDispose(() => {
    query = void 0;
  });
  let _trigger;
  const proxy = customRef((track, trigger) => {
    _trigger = trigger;
    return {
      get() {
        track();
        return transform2(query !== void 0 ? query : toValue(defaultValue));
      },
      set(v) {
        if (query === v)
          return;
        query = v === defaultValue || v === null ? void 0 : v;
        _queriesQueue.set(name, v === defaultValue || v === null ? void 0 : v);
        trigger();
        nextTick(() => {
          if (_queriesQueue.size === 0)
            return;
          const newQueries = Object.fromEntries(_queriesQueue.entries());
          _queriesQueue.clear();
          const { params, query: query2, hash } = route;
          router[toValue(mode)]({
            params,
            query: { ...query2, ...newQueries },
            hash
          });
        });
      }
    };
  });
  watch(
    () => route.query[name],
    (v) => {
      query = v;
      _trigger();
    },
    { flush: "sync" }
  );
  return proxy;
}
var TabSizeOptions = /* @__PURE__ */ ((TabSizeOptions2) => {
  TabSizeOptions2["normal"] = "normal";
  TabSizeOptions2["medium"] = "md";
  return TabSizeOptions2;
})(TabSizeOptions || {});
var TabVariantOptions = /* @__PURE__ */ ((TabVariantOptions2) => {
  TabVariantOptions2["default"] = "default";
  TabVariantOptions2["pills"] = "pills";
  TabVariantOptions2["mobileDefautlTabletPills"] = "mobileDefaultTabletPills";
  return TabVariantOptions2;
})(TabVariantOptions || {});
var classes = {
  root: "p-tabmenu p-component",
  menu: "p-tabmenu-nav p-reset",
  menuitem: function menuitem(_ref) {
    var instance = _ref.instance, index3 = _ref.index, item = _ref.item;
    return ["p-tabmenuitem", {
      "p-highlight": instance.d_activeIndex === index3,
      "p-disabled": instance.disabled(item)
    }];
  },
  action: "p-menuitem-link",
  icon: "p-menuitem-icon",
  label: "p-menuitem-text",
  inkbar: "p-tabmenu-ink-bar"
};
var TabMenuStyle = BaseStyle.extend({
  name: "tabmenu",
  classes
});
var script$1 = {
  name: "BaseTabMenu",
  "extends": script$a,
  props: {
    model: {
      type: Array,
      "default": null
    },
    activeIndex: {
      type: Number,
      "default": 0
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
  style: TabMenuStyle,
  provide: function provide7() {
    return {
      $parentInstance: this
    };
  }
};
var script = {
  name: "TabMenu",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:activeIndex", "tab-change"],
  timeout: null,
  data: function data() {
    return {
      d_activeIndex: this.activeIndex
    };
  },
  watch: {
    activeIndex: function activeIndex(newValue) {
      this.d_activeIndex = newValue;
    }
  },
  mounted: function mounted3() {
    this.updateInkBar();
    var activeItem = this.findActiveItem();
    activeItem && (activeItem.tabIndex = "0");
  },
  updated: function updated2() {
    this.updateInkBar();
  },
  beforeUnmount: function beforeUnmount2() {
    clearTimeout(this.timeout);
  },
  methods: {
    getPTOptions: function getPTOptions4(key, item, index3) {
      return this.ptm(key, {
        context: {
          item,
          index: index3
        }
      });
    },
    onItemClick: function onItemClick(event, item, index3) {
      if (this.disabled(item)) {
        event.preventDefault();
        return;
      }
      if (item.command) {
        item.command({
          originalEvent: event,
          item
        });
      }
      if (index3 !== this.d_activeIndex) {
        this.d_activeIndex = index3;
        this.$emit("update:activeIndex", this.d_activeIndex);
      }
      this.$emit("tab-change", {
        originalEvent: event,
        index: index3
      });
    },
    onKeydownItem: function onKeydownItem(event, item, index3) {
      switch (event.code) {
        case "ArrowRight": {
          this.navigateToNextItem(event.target);
          event.preventDefault();
          break;
        }
        case "ArrowLeft": {
          this.navigateToPrevItem(event.target);
          event.preventDefault();
          break;
        }
        case "Home": {
          this.navigateToFirstItem(event.target);
          event.preventDefault();
          break;
        }
        case "End": {
          this.navigateToLastItem(event.target);
          event.preventDefault();
          break;
        }
        case "Space":
        case "NumpadEnter":
        case "Enter": {
          this.onItemClick(event, item, index3);
          event.preventDefault();
          break;
        }
        case "Tab": {
          this.onTabKey();
          break;
        }
      }
    },
    navigateToNextItem: function navigateToNextItem(target) {
      var nextItem = this.findNextItem(target);
      nextItem && this.setFocusToMenuitem(target, nextItem);
    },
    navigateToPrevItem: function navigateToPrevItem(target) {
      var prevItem = this.findPrevItem(target);
      prevItem && this.setFocusToMenuitem(target, prevItem);
    },
    navigateToFirstItem: function navigateToFirstItem(target) {
      var firstItem = this.findFirstItem(target);
      firstItem && this.setFocusToMenuitem(target, firstItem);
    },
    navigateToLastItem: function navigateToLastItem(target) {
      var lastItem = this.findLastItem(target);
      lastItem && this.setFocusToMenuitem(target, lastItem);
    },
    findNextItem: function findNextItem(item) {
      var nextItem = item.parentElement.nextElementSibling;
      return nextItem ? DomHandler.getAttribute(nextItem, "data-p-disabled") === true ? this.findNextItem(nextItem.children[0]) : nextItem.children[0] : null;
    },
    findPrevItem: function findPrevItem(item) {
      var prevItem = item.parentElement.previousElementSibling;
      return prevItem ? DomHandler.getAttribute(prevItem, "data-p-disabled") === true ? this.findPrevItem(prevItem.children[0]) : prevItem.children[0] : null;
    },
    findFirstItem: function findFirstItem() {
      var firstSibling = DomHandler.findSingle(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"]');
      return firstSibling ? firstSibling.children[0] : null;
    },
    findLastItem: function findLastItem() {
      var siblings = DomHandler.find(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"]');
      return siblings ? siblings[siblings.length - 1].children[0] : null;
    },
    findActiveItem: function findActiveItem() {
      var activeItem = DomHandler.findSingle(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]');
      return activeItem ? activeItem.children[0] : null;
    },
    setFocusToMenuitem: function setFocusToMenuitem(target, focusableItem) {
      target.tabIndex = "-1";
      focusableItem.tabIndex = "0";
      focusableItem.focus();
    },
    onTabKey: function onTabKey() {
      var activeItem = DomHandler.findSingle(this.$refs.nav, '[data-pc-section="menuitem"][data-p-disabled="false"][data-p-highlight="true"]');
      var focusedItem = DomHandler.findSingle(this.$refs.nav, '[data-pc-section="action"][tabindex="0"]');
      if (focusedItem !== activeItem.children[0]) {
        activeItem && (activeItem.children[0].tabIndex = "0");
        focusedItem.tabIndex = "-1";
      }
    },
    visible: function visible(item) {
      return typeof item.visible === "function" ? item.visible() : item.visible !== false;
    },
    disabled: function disabled2(item) {
      return typeof item.disabled === "function" ? item.disabled() : item.disabled === true;
    },
    label: function label(item) {
      return typeof item.label === "function" ? item.label() : item.label;
    },
    updateInkBar: function updateInkBar() {
      var tabs = this.$refs.nav.children;
      var inkHighlighted = false;
      for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        if (DomHandler.getAttribute(tab, "data-p-highlight")) {
          this.$refs.inkbar.style.width = DomHandler.getWidth(tab) + "px";
          this.$refs.inkbar.style.left = DomHandler.getOffset(tab).left - DomHandler.getOffset(this.$refs.nav).left + "px";
          inkHighlighted = true;
        }
      }
      if (!inkHighlighted) {
        this.$refs.inkbar.style.width = "0px";
        this.$refs.inkbar.style.left = "0px";
      }
    },
    getMenuItemProps: function getMenuItemProps(item, index3) {
      var _this = this;
      return {
        action: mergeProps({
          "class": this.cx("action"),
          tabindex: -1,
          onClick: function onClick($event) {
            return _this.onItemClick($event, item, index3);
          },
          onKeyDown: function onKeyDown($event) {
            return _this.onKeydownItem($event, item, index3);
          }
        }, this.getPTOptions("action", item, index3)),
        icon: mergeProps({
          "class": [this.cx("icon"), item.icon]
        }, this.getPTOptions("icon", item, index3)),
        label: mergeProps({
          "class": this.cx("label")
        }, this.getPTOptions("label", item, index3))
      };
    }
  },
  directives: {
    ripple: Ripple
  }
};
var _hoisted_1 = ["aria-labelledby", "aria-label"];
var _hoisted_2 = ["onClick", "onKeydown", "data-p-highlight", "data-p-disabled"];
var _hoisted_3 = ["href", "target", "aria-label", "aria-disabled"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _directive_ripple = resolveDirective("ripple");
  return openBlock(), createElementBlock("div", mergeProps({
    "class": _ctx.cx("root")
  }, _ctx.ptmi("root")), [createElementVNode("ul", mergeProps({
    ref: "nav",
    "class": _ctx.cx("menu"),
    role: "menubar",
    "aria-labelledby": _ctx.ariaLabelledby,
    "aria-label": _ctx.ariaLabel
  }, _ctx.ptm("menu")), [(openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.model, function(item, i) {
    return openBlock(), createElementBlock(Fragment, {
      key: $options.label(item) + "_" + i.toString()
    }, [$options.visible(item) ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      ref_for: true,
      ref: "tab",
      "class": [_ctx.cx("menuitem", {
        item,
        index: i
      }), item["class"]],
      role: "presentation",
      onClick: function onClick($event) {
        return $options.onItemClick($event, item, i);
      },
      onKeydown: function onKeydown($event) {
        return $options.onKeydownItem($event, item, i);
      }
    }, $options.getPTOptions("menuitem", item, i), {
      "data-p-highlight": $data.d_activeIndex === i,
      "data-p-disabled": $options.disabled(item)
    }), [!_ctx.$slots.item ? withDirectives((openBlock(), createElementBlock("a", mergeProps({
      key: 0,
      ref_for: true,
      ref: "tabLink",
      role: "menuitem",
      href: item.url,
      "class": _ctx.cx("action"),
      target: item.target,
      "aria-label": $options.label(item),
      "aria-disabled": $options.disabled(item),
      tabindex: -1
    }, $options.getPTOptions("action", item, i)), [_ctx.$slots.itemicon ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.itemicon), {
      key: 0,
      item,
      "class": normalizeClass(_ctx.cx("icon"))
    }, null, 8, ["item", "class"])) : item.icon ? (openBlock(), createElementBlock("span", mergeProps({
      key: 1,
      "class": [_ctx.cx("icon"), item.icon]
    }, $options.getPTOptions("icon", item, i)), null, 16)) : createCommentVNode("", true), createElementVNode("span", mergeProps({
      "class": _ctx.cx("label")
    }, $options.getPTOptions("label", item, i)), toDisplayString$1($options.label(item)), 17)], 16, _hoisted_3)), [[_directive_ripple]]) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.$slots.item), {
      key: 1,
      item,
      index: i,
      active: i === $data.d_activeIndex,
      label: $options.label(item),
      props: $options.getMenuItemProps(item, i)
    }, null, 8, ["item", "index", "active", "label", "props"]))], 16, _hoisted_2)) : createCommentVNode("", true)], 64);
  }), 128)), createElementVNode("li", mergeProps({
    ref: "inkbar",
    role: "none",
    "class": _ctx.cx("inkbar")
  }, _ctx.ptm("inkbar")), null, 16)], 16, _hoisted_1)], 16);
}
script.render = render;
const tabmenu_esm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: script
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DeTabs",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    model: {},
    menuClass: {},
    variant: { default: TabVariantOptions.default },
    size: { default: TabSizeOptions.normal },
    tabClass: { type: Function, default: (_item) => void 0 },
    actionClass: { type: Function, default: (_item) => void 0 }
  }, {
    "value": {},
    "valueModifiers": {},
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["tab-change"], ["update:value", "update:modelValue"]),
  setup(__props, { emit: __emit }) {
    var _a;
    const props = __props;
    const emit = __emit;
    const modelValue = useModel(__props, "value");
    const modelActiveIndex = useModel(__props, "modelValue");
    if (modelValue.value) {
      const foundIndex = (_a = props.model) == null ? void 0 : _a.findIndex((item) => item.id === modelValue.value);
      modelActiveIndex.value = foundIndex > 0 ? foundIndex : 0;
    }
    const onTabChange = (event) => {
      modelActiveIndex.value = event.index;
      modelValue.value = props.model[event.index].id;
      emit("tab-change", event.index, modelValue.value);
    };
    function getTabItemComponent(item) {
      if (item.url)
        return __nuxt_component_0;
      return "div";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_tab_menu = script;
      _push(ssrRenderComponent(_component_prime_tab_menu, mergeProps({
        model: _ctx.model,
        "active-index": modelActiveIndex.value,
        class: _ctx.$attrs.class,
        pt: {
          root: { class: ["de-tabs", `de-tabs-${_ctx.size}`, `de-tabs-${_ctx.variant}`] },
          menu: { class: ["de-tabs-menu", _ctx.menuClass] },
          menuitem: (menuItemProps) => ({
            class: [
              "de-tabs-menu-item tw-leading-400",
              _ctx.tabClass(menuItemProps.context.item),
              menuItemProps.context.item.class
            ]
          }),
          inkbar: { class: ["de-tabs-ink-bar"] },
          action: ({ context, state }) => ({
            class: {
              "is-active": state.d_activeIndex === context.index
            }
          })
        },
        onTabChange
      }, _attrs), {
        item: withCtx(({ item, active }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(getTabItemComponent(item)), {
              href: item.url || void 0,
              class: "tw-leading-400"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<button class="${ssrRenderClass([[{ "is-active": active }, _ctx.actionClass(item)], "de-menu-item-action"])}" role="menuitem"${_scopeId2}>${ssrInterpolate(item.label)}</button>`);
                } else {
                  return [
                    createVNode("button", {
                      class: ["de-menu-item-action", [{ "is-active": active }, _ctx.actionClass(item)]],
                      role: "menuitem"
                    }, toDisplayString$1(item.label), 3)
                  ];
                }
              }),
              _: 2
            }), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(getTabItemComponent(item)), {
                href: item.url || void 0,
                class: "tw-leading-400"
              }, {
                default: withCtx(() => [
                  createVNode("button", {
                    class: ["de-menu-item-action", [{ "is-active": active }, _ctx.actionClass(item)]],
                    role: "menuitem"
                  }, toDisplayString$1(item.label), 3)
                ]),
                _: 2
              }, 1032, ["href"]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/DeTabs.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "all",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const appStore = useAppStore();
    const categoryId = useRouteQuery("category_id", "");
    const { $customFetch } = useNuxtApp();
    const articleRepo = ArticleService($customFetch);
    const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => articleRepo.getArticleCategories(), "$kO7q203E8R")), __temp = await __temp, __restore(), __temp);
    const recentlyAddedCategory = {
      id: "",
      label: t("articles.categories.recentlyAdded")
    };
    const articleCategories = computed(() => {
      const initialCategories = [recentlyAddedCategory];
      if (categories.value) {
        initialCategories.push(...categories.value);
      }
      return initialCategories;
    });
    const { data: articles, status } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(
      () => articleRepo.getArticlesAll(categoryId.value, appStore.locale),
      {
        watch: [categoryId]
      },
      "$zndB7hZJra"
    )), __temp = await __temp, __restore(), __temp);
    useSeoMetaData({
      title: t("common.site.metadata.analyticsAll.title"),
      description: t("common.site.metadata.analyticsAll.description"),
      keywords: t("common.site.metadata.analyticsAll.keywords"),
      relativeUrl: "analytics/all"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<!--[--><h1 class="tw-sr-only">${ssrInterpolate(unref(t)("common.site.metadata.analyticsAll.h1"))}</h1><div class="tw-container tw-mt-5 md:tw-mt-7.5 tw-mb-15 xl:tw-mb-24"><div class="tw-flex tw-items-center tw-pb-5 tw-border-b tw-border-primary-600 tw-mb-7.5">`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, { to: "/analytics" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "chevron-down",
              class: "tw-w-600 tw-h-600 tw-transform tw-rotate-90 tw-text-primary-400 tw-mr-1.5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$m, {
                name: "chevron-down",
                class: "tw-w-600 tw-h-600 tw-transform tw-rotate-90 tw-text-primary-400 tw-mr-1.5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="heading-h3 tw-text-white">${ssrInterpolate(unref(t)("common.all"))}</p></div>`);
      _push(ssrRenderComponent(_sfc_main$7, {
        value: unref(categoryId),
        "onUpdate:value": ($event) => isRef(categoryId) ? categoryId.value = $event : null,
        model: articleCategories.value,
        variant: unref(TabVariantOptions).pills,
        "menu-class": "!tw-gap-x-2.5 tw-mb-7.5"
      }, null, _parent));
      if (unref(status) === "pending") {
        _push(ssrRenderComponent(_sfc_main$c, { class: "tw-mt-10 tw-w-1000 tw-h-1000" }, null, _parent));
      } else {
        _push(`<div class="tw-flex tw-flex-col tw-gap-7.5 xl:tw-gap-10"><div class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5"><!--[-->`);
        ssrRenderList(unref(articles), (item, index3) => {
          _push(ssrRenderComponent(_sfc_main$a, {
            key: index3,
            image: item.image,
            href: `/analytics/${item.slug}`,
            author: item.author,
            title: item.title,
            content: item.content,
            "created-at": item.publishedAtFormatted
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
        _push(ssrRenderComponent(_sfc_main$l, {
          label: unref(t)("common.buttons.loadMore"),
          icon: "refresh",
          size: unref(ButtonSizeOptions).medium,
          "icon-class": "tw-text-primary-400 tw-w-300 tw-h-300 tw-mr-2",
          class: "tw-self-center"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(articles)/analytics/all.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const all = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ArticleLatest",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const articleRepo = ArticleService($customFetch);
    const { data: articles, status } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(
      () => articleRepo.getArticlesLatest(appStore.locale),
      "$F7a4IHYfMh"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-mb-20" }, _attrs))}><section class="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-7.5 tw-mb-8"><h2 class="heading-h2">${ssrInterpolate(unref(t)("common.latest"))}</h2>`);
      if (unref(status) === "pending") {
        _push(ssrRenderComponent(_sfc_main$c, { class: "tw-my-10 tw-h-1500 md:tw-order-2 tw-w-full" }, null, _parent));
      } else {
        _push(`<div class="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-7.5 md:tw-order-2 tw-w-full"><!--[-->`);
        ssrRenderList(unref(articles), (item) => {
          _push(ssrRenderComponent(_sfc_main$a, {
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
      }
      _push(ssrRenderComponent(_sfc_main$b, {
        href: "/analytics/all",
        class: "tw-mx-auto md:tw-mr-0"
      }, null, _parent));
      _push(`</section>`);
      _push(ssrRenderComponent(_sfc_main$b, {
        href: "/analytics/all",
        class: "tw-mx-auto tw-justify-center md:tw-mr-0 md:tw-flex tw-hidden"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/article/components/recomended/ArticleLatest.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "OtherArticle",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (_ctx.article.image) {
        _push(ssrRenderComponent(_component_nuxt_link_locale, {
          to: `/analytics/${_ctx.article.slug}`,
          class: "tw-hidden md:tw-inline-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", _ctx.article.image)}${ssrRenderAttr("alt", _ctx.article.title)}${ssrRenderAttr("title", _ctx.article.title)} width="170px" height="100px" loading="lazy" class="tw-w-full tw-h-2500 tw-object-cover"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: _ctx.article.image,
                  alt: _ctx.article.title,
                  title: _ctx.article.title,
                  width: "170px",
                  height: "100px",
                  loading: "lazy",
                  class: "tw-w-full tw-h-2500 tw-object-cover"
                }, null, 8, ["src", "alt", "title"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-flex tw-flex-col tw-w-full">`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, {
        to: `/analytics/${_ctx.article.slug}`,
        class: "heading-h3 tw-line-clamp-2 tw-mb-2.5"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.article.title)}`);
          } else {
            return [
              createTextVNode(toDisplayString$1(_ctx.article.title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tw-flex tw-items-center tw-gap-1.5 tw-text-300 tw-leading-400 tw-mt-auto">`);
      _push(ssrRenderComponent(_sfc_main$k, {
        size: unref(AVATAR_SIZE_OPTIONS).small,
        src: _ctx.article.author.image
      }, null, _parent));
      _push(`<p>${ssrInterpolate(_ctx.article.author.name)}</p><i class="tw-w-100 tw-h-100 tw-inline-block tw-rounded-full tw-bg-primary-400"></i><p class="tw-text-primary-300">${ssrInterpolate(_ctx.article.publishedAtFormatted)}</p></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/article/components/recomended/OtherArticle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "HeroArticle",
  __ssrInlineRender: true,
  props: {
    article: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-relative tw-h-[194px] md:tw-h-[340px]" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, {
        to: `/analytics/${_ctx.article.slug}`,
        class: "tw-inline-block tw-w-full tw-h-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _ctx.article.image)}${ssrRenderAttr("alt", _ctx.article.title)}${ssrRenderAttr("title", _ctx.article.title)} class="tw-w-full tw-h-full tw-object-cover"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _ctx.article.image,
                alt: _ctx.article.title,
                title: _ctx.article.title,
                class: "tw-w-full tw-h-full tw-object-cover"
              }, null, 8, ["src", "alt", "title"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="tw-absolute tw-z-10 tw-left-0 tw-bottom-0 tw-w-full tw-px-5 tw-pb-5 tw-pt-7.5 tw-bg-l-black-grad-3 tw-pointer-events-none"><p class="heading-h3 tw-line-clamp-2 tw-mb-2.5">${ssrInterpolate(_ctx.article.title)}</p><div class="tw-flex tw-items-center tw-gap-1.5 tw-text-300 tw-leading-400 tw-mt-2.5">`);
      _push(ssrRenderComponent(_sfc_main$k, {
        size: unref(AVATAR_SIZE_OPTIONS).small,
        src: _ctx.article.author.image
      }, null, _parent));
      _push(`<p>${ssrInterpolate(_ctx.article.author.name)}</p><i class="tw-w-100 tw-h-100 tw-inline-block tw-rounded-full tw-bg-primary-400"></i><p class="tw-text-primary-300">${ssrInterpolate(_ctx.article.publishedAtFormatted)}</p></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/article/components/recomended/HeroArticle.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ArticleRecommendedList",
  __ssrInlineRender: true,
  props: {
    articles: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      if ((_a = _ctx.articles) == null ? void 0 : _a.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-flex-col lg:tw-grid tw-grid-cols-2 tw-gap-7.5" }, _attrs))}>`);
        _push(ssrRenderComponent(_sfc_main$3, {
          article: _ctx.articles[0]
        }, null, _parent));
        _push(`<div class="tw-flex tw-flex-col tw-gap-7.5 md:tw-gap-5"><!--[-->`);
        ssrRenderList(_ctx.articles.slice(1), (article) => {
          _push(ssrRenderComponent(_sfc_main$4, {
            key: article.id,
            article,
            class: "md:tw-h-2500 tw-flex md:tw-grid tw-grid-cols-[170px_1fr] tw-gap-5"
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/article/components/recomended/ArticleRecommendedList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const articleRepo = ArticleService($customFetch);
    const { data: articles, status } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(
      () => articleRepo.getArticlesRecommended(appStore.locale),
      "$abXehyIsUh"
    )), __temp = await __temp, __restore(), __temp);
    useSeoMetaData({
      title: t("common.site.metadata.analytics.title"),
      description: t("common.site.metadata.analytics.description"),
      keywords: t("common.site.metadata.analytics.keywords"),
      relativeUrl: "analytics"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="tw-sr-only">${ssrInterpolate(unref(t)("common.site.metadata.analytics.h1"))}</h1><div class="tw-container tw-pt-5 md:tw-pt-7.5"><div class="heading-h2 tw-mb-2.5">${ssrInterpolate(unref(t)("articles.title"))}</div><p class="tw-text-primary-300 tw-text-350 tw-mb-7.5">${ssrInterpolate(unref(t)("articles.subtitle"))}</p>`);
      if (unref(status) === "pending") {
        _push(ssrRenderComponent(_sfc_main$c, { class: "tw-my-10 tw-w-1500 tw-h-1500" }, null, _parent));
      } else if ((_a = unref(articles)) == null ? void 0 : _a.length) {
        _push(`<section class="tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-7.5 tw-mb-10"><h2 class="heading-h2">${ssrInterpolate(unref(t)("common.recommended"))}</h2>`);
        _push(ssrRenderComponent(_sfc_main$2, {
          articles: unref(articles),
          class: "md:tw-order-2 tw-w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_sfc_main$b, {
          href: "/analytics/recommended",
          class: "tw-mx-auto md:tw-mr-0"
        }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$5, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$g, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(articles)/analytics/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const index2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$1
}, Symbol.toStringTag, { value: "Module" }));
function useDayjs() {
  return dayjs;
}
const FULL_DATE = "ddd MMM D YYYY";
const SHORT_DATE_WITH_YEAR = "MMM DD, YYYY";
const BACKEND_DATE_FORMAT = "YYYY-MM-DD";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "recommended",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const dayjs2 = useDayjs();
    const { t } = useI18n();
    const appStore = useAppStore();
    const { $customFetch } = useNuxtApp();
    const articleRepo = ArticleService($customFetch);
    const { data: data2, status } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(
      () => articleRepo.getArticlesAllRecommended(appStore.locale),
      "$W67kTZ3YTB"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_link_locale = __nuxt_component_0;
      _push(`<!--[--><div class="tw-container tw-mt-5 md:tw-mt-7.5"><div class="tw-flex tw-items-center tw-pb-5 tw-border-b tw-border-primary-600 tw-mb-7.5">`);
      _push(ssrRenderComponent(_component_nuxt_link_locale, { to: "/analytics" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$m, {
              name: "chevron-down",
              class: "tw-w-600 tw-h-600 tw-transform tw-rotate-90 tw-text-primary-400 tw-mr-1.5"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$m, {
                name: "chevron-down",
                class: "tw-w-600 tw-h-600 tw-transform tw-rotate-90 tw-text-primary-400 tw-mr-1.5"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="heading-h3 tw-text-white">${ssrInterpolate(unref(t)("common.recommendation"))}</p></div>`);
      if (unref(status) === "pending" && !unref(data2)) {
        _push(ssrRenderComponent(_sfc_main$c, { class: "tw-mt-10 tw-w-1000 tw-h-1000" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="tw-flex tw-flex-col tw-gap-7.5 tw-mb-15"><!--[-->`);
      ssrRenderList(unref(data2), (articles, date) => {
        _push(`<div><p class="heading-h2 tw-mb-7.5">${ssrInterpolate(unref(dayjs2)(date).format(unref(FULL_DATE)))}</p>`);
        _push(ssrRenderComponent(_sfc_main$2, { articles }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_sfc_main$g, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(articles)/analytics/recommended.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const recommended = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { _sfc_main$f as $, AppCurrency as A, BaseStyle as B, ConnectedOverlayScrollHandler as C, DEFAULT_LOCALE as D, appPageTransition as E, FIFTEEN_MINUTES_IN_MILLISECONDS as F, appKeepalive as G, _wrapIf as H, TWENTY_FOUR_HOURS_IN_MILLISECONDS as I, TabVariantOptions as J, _sfc_main$a as K, LayoutMetaSymbol as L, ArticleService as M, articleKeys as N, ObjectUtils as O, PageRouteSymbol as P, useRouteQuery as Q, Ripple as R, SHORT_DATE_WITH_YEAR as S, THIRTY_MINUTES_IN_MILLISECONDS as T, UniqueComponentId as U, AuthTab as V, _sfc_main$g as W, DE_EMAIL as X, useLazyAsyncData as Y, ZIndexUtils as Z, _sfc_main$m as _, useI18n as a, withHttps as a$, _sfc_main$d as a0, _sfc_main$l as a1, ButtonSizeOptions as a2, defineStore as a3, useCookie as a4, useAuthStore as a5, useToast as a6, useState as a7, createUserModelBase as a8, toastErrorNotification as a9, ONE_MINUTE_IN_MILLISECONDS as aA, script$9 as aB, definePayloadPlugin as aC, definePayloadReducer as aD, defineNuxtPlugin as aE, setHeadInjectionHandler as aF, __nuxt_page_meta$1 as aG, __nuxt_page_meta as aH, useRouter as aI, isChangingPage as aJ, showError as aK, useError as aL, getRouteRules as aM, useRequestEvent as aN, isNuxtError as aO, createPinia as aP, setActivePinia as aQ, useRequestHeaders as aR, useRoute as aS, withoutTrailingSlash as aT, hasProtocol as aU, withLeadingSlash as aV, withBase as aW, withTrailingSlash as aX, stringifyQuery as aY, useSeoMeta as aZ, useServerHead as a_, ButtonVariantOptions as aa, ButtonCategoryOptions as ab, script$6 as ac, toastSuccessNotification as ad, BACKEND_DATE_FORMAT as ae, _sfc_main$i as af, defineNuxtRouteMiddleware as ag, storeToRefs as ah, navigateTo as ai, useLocaleHead as aj, useHead as ak, parseURL as al, useSwitchLocalePath as am, typedLocales as an, __nuxt_component_0$1 as ao, injectHead as ap, createError as aq, WALLET_CRYPTOS as ar, PASSWORD_STRENGTH_REGEX as as, ButtonIconPositionOptions as at, locales as au, useRuntimeConfig as av, IMAGE_STUMP_PATH as aw, script$3 as ax, _sfc_main$j as ay, toastInfoNotification as az, useAppStore as b, joinURL as b0, withQuery as b1, resolveUnrefHeadInput as b2, withoutBase as b3, PrimeVueToastSymbol as b4, BaseDirective as b5, SWITCH_LOCALE_PATH_LINK_IDENTIFIER as b6, assign as b7, getComposer$3 as b8, isFunction as b9, localeCodes as bA, localeLoaders as bB, normalizedLocales as bC, loadAndSetLocale as bD, detectRedirect as bE, navigate as bF, loadLocale as bG, getBrowserLocale as bH, setLocaleCookie as bI, setLocale as bJ, getLocale$1 as bK, mergeLocaleMessage as bL, DEFAULT_LOCALE_ID_COOKIE as bM, getLocaleId as bN, appLayoutTransition as bO, clearError as bP, createNuxtApp as bQ, applyPlugins as bR, button_esm as bS, checkbox_esm as bT, inputtext_esm as bU, progressspinner_esm as bV, _slug_ as bW, tabmenu_esm as bX, all as bY, index2 as bZ, recommended as b_, isVueI18n as ba, initCommonComposableOptions as bb, wrapComposable as bc, getRouteBaseName as bd, resolveRoute as be, localePath as bf, localeRoute as bg, localeLocation as bh, switchLocalePath as bi, localeHead as bj, resolveBaseUrl as bk, isObject$1 as bl, parallelPlugin as bm, getHost as bn, runtimeDetectBrowserLanguage as bo, createLocaleFromRouteGetter as bp, getI18nCookie as bq, detectLocale as br, getLocaleCookie as bs, createI18n as bt, injectNuxtHelpers as bu, addRouteMiddleware as bv, extendBaseUrl as bw, loadVueI18nOptions as bx, vueI18nConfigs as by, loadInitialMessages as bz, useUserStore as c, __nuxt_component_0$2 as d, _sfc_main$b as e, DomHandler as f, getResponsiveImageUrl as g, script$7 as h, script$a as i, script$5 as j, useDayjs as k, useBreakpoints as l, breakpointsTailwind as m, _sfc_main$7 as n, _sfc_main$k as o, primebus as p, AVATAR_SIZE_OPTIONS as q, __nuxt_component_0 as r, script$8 as s, USER_AVATAR_STUMP_PATH as t, useId as u, useNuxtApp as v, _sfc_main$c as w, useLocalePath as x, useSeoMetaData as y, DEFAULT_CURRENCY as z };
//# sourceMappingURL=chunk-pg-(articles)-D5MrPPlE.mjs.map
