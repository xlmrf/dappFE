import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import _sfc_main$1 from './HeaderMobile-BdCk1dMW.mjs';
import _sfc_main$2 from './HeaderDesktop-DhWAqAeo.mjs';
import './AppLogo-nf5qLJNl.mjs';
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
import './AppSidebar-C-UcNw2b.mjs';
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
import './HeaderTopBar-C3yuotEY.mjs';
import './AppUserMenu-ATPhV3yc.mjs';
import './HeaderNavBar-CdlXkfsu.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MainHeader",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "max-lg:tw-sticky tw-top-0 tw-z-50" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, { class: "[@media(min-width:1140px)]:tw-hidden" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { class: "tw-hidden [@media(min-width:1140px)]:tw-flex" }, null, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/MainHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=MainHeader-DkgEjI3j.mjs.map
