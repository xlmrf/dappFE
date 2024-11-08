import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './AppLogo-nf5qLJNl.mjs';
import _sfc_main$2 from './AppSidebar-C-UcNw2b.mjs';
import './chunk-pg-(articles)-D5MrPPlE.mjs';
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
import './AppMainMenu-xpd5N17_.mjs';
import './SocialsList-U76nsQei.mjs';
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
import './SelectCurrencyList-B96zD89i.mjs';
import './chunk-pg-ranking-Cp9KKVZQ.mjs';
import './DeSidebar-CwFoj49S.mjs';
import './sidebar.esm-DjOWB8MN.mjs';
import './LanguageSwitcher-BexZ-A2o.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HeaderMobile",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-items-center tw-justify-between tw-p-2.5 md:tw-py-3.5 md:tw-px-5 tw-bg-primary-700" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, { "lazy-loaded": false }, null, _parent));
      _push(`<div class="tw-flex tw-items-center tw-gap-x-5">`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/header/HeaderMobile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HeaderMobile-BdCk1dMW.mjs.map