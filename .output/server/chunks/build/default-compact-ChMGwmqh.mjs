import { defineComponent, mergeProps, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './CommonLayout-CBP29FFy.mjs';
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
import './MainHeader-DkgEjI3j.mjs';
import './HeaderMobile-BdCk1dMW.mjs';
import './AppLogo-nf5qLJNl.mjs';
import './AppSidebar-C-UcNw2b.mjs';
import './AppMainMenu-xpd5N17_.mjs';
import './SocialsList-U76nsQei.mjs';
import './SelectCurrencyList-B96zD89i.mjs';
import './chunk-pg-ranking-Cp9KKVZQ.mjs';
import './DeSidebar-CwFoj49S.mjs';
import './sidebar.esm-DjOWB8MN.mjs';
import './LanguageSwitcher-BexZ-A2o.mjs';
import './HeaderDesktop-DhWAqAeo.mjs';
import './HeaderTopBar-C3yuotEY.mjs';
import './AppUserMenu-ATPhV3yc.mjs';
import './HeaderNavBar-CdlXkfsu.mjs';
import './MainFooter-CYqpUsTi.mjs';
import './AppDisclaimer-BmRg8DmM.mjs';
import './toast.esm-Q52pdMeM.mjs';
import './index.esm-D6FAEgJb.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default-compact",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        "footer-class": "max-md:tw-hidden",
        "disclaimer-class": "max-md:tw-hidden"
      }, _attrs), {
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default-compact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-compact-ChMGwmqh.mjs.map
