import script from './overlaypanel.esm-D4ofBjes.mjs';
import { defineComponent, ref, mergeProps, createSlots, renderList, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import './server.mjs';
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
import './chunk-pg-(articles)-D5MrPPlE.mjs';
import 'vue-router';
import '@tanstack/vue-query';
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
import '@tanstack/vue-table';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@unhead/schema-org';
import '@floating-ui/utils';
import 'isomorphic-dompurify';
import 'ethers';
import '@tanstack/vue-query-devtools';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeOverlayPanel",
  __ssrInlineRender: true,
  setup(__props, { expose: __expose }) {
    const op = ref(null);
    function toggle(event) {
      var _a;
      (_a = op.value) == null ? void 0 : _a.toggle(event);
    }
    function hide() {
      var _a;
      (_a = op.value) == null ? void 0 : _a.hide();
    }
    __expose({
      toggle,
      hide
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_overlay_panel = script;
      _push(ssrRenderComponent(_component_prime_overlay_panel, mergeProps({
        ref_key: "op",
        ref: op,
        pt: {
          root: { class: ["de-overlay-panel", _ctx.$attrs.class] },
          transition: {
            enterFromClass: "de-connected-overlay-enter-from",
            enterActiveClass: "de-connected-overlay-enter-active",
            leaveActiveClass: "de-connected-overlay-leave-active",
            leaveToClass: "de-connected-overlay-leave-to"
          }
        }
      }, _attrs), createSlots({ _: 2 }, [
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/overlay-panel/DeOverlayPanel.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=DeOverlayPanel-Bg8dzZvW.mjs.map
