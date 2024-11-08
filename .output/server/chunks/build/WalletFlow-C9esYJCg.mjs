import { defineComponent, defineAsyncComponent, ref, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "WalletFlow",
  __ssrInlineRender: true,
  emits: ["back-to-login", "forgot-password", "inactive-wallet", "wallet-bound"],
  setup(__props, { emit: __emit }) {
    const AuthWalletList = defineAsyncComponent(
      () => import('./AuthWalletList-BwVdgQrj.mjs')
    );
    const WalletBindAccount = defineAsyncComponent(
      () => import('./WalletBindAccount-Bygn1xfp.mjs')
    );
    const emit = __emit;
    function onBackToLogin() {
      emit("back-to-login");
    }
    const isWalletBindAccountShown = ref(false);
    const isWalletListShown = ref(true);
    const toggleWalletBindAccountVisibility = () => {
      isWalletBindAccountShown.value = !isWalletBindAccountShown.value;
    };
    const selectedWallet = ref(null);
    function onForgotPassword() {
      isWalletBindAccountShown.value = false;
      isWalletListShown.value = false;
      emit("forgot-password");
    }
    function onInactiveWallet() {
      emit("inactive-wallet");
    }
    function onWalletBound(walletAddress, email) {
      emit("wallet-bound", walletAddress, email);
    }
    const boundWalletAddress = ref("");
    const boundWalletSignature = ref("");
    function onWalletNotFound({
      address,
      signature,
      walletType
    }) {
      selectedWallet.value = walletType;
      boundWalletAddress.value = address;
      boundWalletSignature.value = signature;
      toggleWalletBindAccountVisibility();
    }
    return (_ctx, _push, _parent, _attrs) => {
      if (isWalletBindAccountShown.value) {
        _push(ssrRenderComponent(unref(WalletBindAccount), mergeProps({
          "wallet-id": selectedWallet.value,
          address: boundWalletAddress.value,
          signature: boundWalletSignature.value,
          onBack: toggleWalletBindAccountVisibility,
          onForgotPassword,
          onInactiveWallet,
          onWalletBound
        }, _attrs), null, _parent));
      } else if (isWalletListShown.value) {
        _push(ssrRenderComponent(unref(AuthWalletList), mergeProps({
          onBackToLogin,
          onWalletNotFound
        }, _attrs), null, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/wallet/WalletFlow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=WalletFlow-C9esYJCg.mjs.map
