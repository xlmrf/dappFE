import { defineComponent, useModel, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './DeDialog-Cpcyaeou.mjs';
import { _ as _sfc_main$2 } from './SelectCurrencyList-B96zD89i.mjs';
import './dialog.esm-ClGlMgQg.mjs';
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
import './chunk-pg-ranking-Cp9KKVZQ.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SelectCurrencyDialog",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean, ...{ required: true } },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const isVisible = useModel(__props, "modelValue");
    const onCurrencyChange = () => {
      isVisible.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({
        visible: isVisible.value,
        "onUpdate:visible": ($event) => isVisible.value = $event,
        header: _ctx.$t("common.selectCurrency"),
        class: "tw-w-[798px]"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { onCurrencyChange }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { onCurrencyChange })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/select-currency/SelectCurrencyDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=SelectCurrencyDialog-CdwWXzrI.mjs.map
