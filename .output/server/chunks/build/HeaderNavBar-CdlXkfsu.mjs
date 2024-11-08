import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './AppLogo-nf5qLJNl.mjs';
import { _ as _sfc_main$2 } from './AppMainMenu-xpd5N17_.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HeaderNavBar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "tw-flex tw-justify-between tw-px-10 tw-py-2.5 tw-bg-primary-700 tw-border-b-2 tw-border-primary-800 tw-tracking-wider" }, _attrs))}><div class="tw-flex tw-items-center">`);
      _push(ssrRenderComponent(_sfc_main$1, {
        "lazy-loaded": false,
        class: "tw-mr-8"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</div></nav>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/parts/header/HeaderNavBar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=HeaderNavBar-CdlXkfsu.mjs.map
