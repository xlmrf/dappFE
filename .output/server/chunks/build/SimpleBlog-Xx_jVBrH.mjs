import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { K as useSiteConfig } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { al as parseURL } from './chunk-pg-(articles)-D5MrPPlE.mjs';
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
import 'dayjs/plugin/updateLocale.js';
import 'dayjs/plugin/utc.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isToday.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SimpleBlog",
  __ssrInlineRender: true,
  props: {
    title: { default: "title" },
    website: {}
  },
  setup(__props) {
    const props = __props;
    const website = computed(() => {
      return props.website || parseURL(useSiteConfig().url).host;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full w-full flex items-start justify-start border-solid border-blue-500 border-[12px] bg-gray-50" }, _attrs))}><div class="flex items-start justify-start h-full"><div class="flex flex-col justify-between w-full h-full"><h1 class="text-[80px] p-20 font-black text-left">${ssrInterpolate(_ctx.title)}</h1><p class="text-2xl pb-10 px-20 font-bold mb-0">${ssrInterpolate(unref(website))}</p></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt-og-image/dist/runtime/nuxt/components/Templates/Community/SimpleBlog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SimpleBlog-Xx_jVBrH.mjs.map
