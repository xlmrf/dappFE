import { useSSRContext, defineComponent, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, ref, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './DeDialog-Cpcyaeou.mjs';
import QrCode from 'qrcode.vue';
import { a1 as _sfc_main$l } from './chunk-pg-(articles)-D5MrPPlE.mjs';
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

const foreground = "#fff";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "QrView",
  __ssrInlineRender: true,
  props: {
    uri: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const message = ref("Copy to clipboard");
    const copyLink = async () => {
      await (void 0).clipboard.writeText(props.uri);
      message.value = "Copied!";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-space-y-8 tw-w-full" }, _attrs))}>`);
      _push(ssrRenderComponent(QrCode, {
        background: "transparent",
        foreground,
        class: "qr-code tw-py-4",
        value: __props.uri,
        size: 400
      }, null, _parent));
      _push(`<hr class="tw-mx-12"><div class="tw-space-y-4 tw-flex tw-flex-col tw-items-center"><div class="tw-text-center"><h3 class="heading-h3">Scan with your phone</h3><p class="body-b1">Open your camera app or mobile wallet and scan the code to connect</p></div>`);
      _push(ssrRenderComponent(_sfc_main$l, {
        class: "tw-w-full sm:tw-min-w-[7em]",
        onClick: copyLink
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(message.value)}`);
          } else {
            return [
              createTextVNode(toDisplayString(message.value), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/QrView.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletQrDialog",
  __ssrInlineRender: true,
  props: {
    wcConnectUri: {
      type: String,
      required: true
    }
  },
  emits: ["hide"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function updateVisible(val) {
      if (!val) {
        emit("hide");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({ "onUpdate:visible": updateVisible }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.wcConnectUri) {
              _push2(ssrRenderComponent(_sfc_main$1, { uri: __props.wcConnectUri }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.wcConnectUri ? (openBlock(), createBlock(_sfc_main$1, {
                key: 0,
                uri: __props.wcConnectUri
              }, null, 8, ["uri"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/wallet/WalletQrDialog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=WalletQrDialog-DSVv4t1V.mjs.map
