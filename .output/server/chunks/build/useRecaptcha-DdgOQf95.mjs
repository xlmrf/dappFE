import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { w as _sfc_main$c } from './chunk-pg-(articles)-D5MrPPlE.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeRecaptcha",
  __ssrInlineRender: true,
  emits: ["verifyCallback"],
  setup(__props, { emit: __emit }) {
    const isRecaptchaLoading = ref(true);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (isRecaptchaLoading.value) {
        _push(ssrRenderComponent(_sfc_main$c, { class: "tw-mt-10 tw-w-1000 tw-h-1000" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div style="${ssrRenderStyle(!isRecaptchaLoading.value ? null : { display: "none" })}" class="tw-flex tw-justify-center tw-mt-10"></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/DeRecaptcha.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const useRecaptcha = () => {
  const captchaResponseToken = ref(null);
  function onVerifyCallback(token) {
    captchaResponseToken.value = token;
  }
  return {
    captchaResponseToken,
    onVerifyCallback
  };
};

export { _sfc_main as _, useRecaptcha as u };
//# sourceMappingURL=useRecaptcha-DdgOQf95.mjs.map
