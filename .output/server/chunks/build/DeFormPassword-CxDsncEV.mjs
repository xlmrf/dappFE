import script from './password.esm-F9-Vbrfa.mjs';
import { defineComponent, mergeProps, unref, isRef, toHandlers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
import { useField } from 'vee-validate';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "DeFormPassword",
  __ssrInlineRender: true,
  props: {
    feedback: {
      type: Boolean,
      default: false
    },
    toggleMask: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    inputClass: {
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const { errorMessage, value, handleChange, handleBlur } = useField(() => props.id, void 0, {
      validateOnValueUpdate: false
    });
    const validationListeners = {
      blur: (evt) => handleBlur(evt, true),
      input: (evt) => handleChange(evt, !!errorMessage.value)
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_password = script;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="de-form-input-text-label-wrapper">`);
      if (__props.label) {
        _push(`<label${ssrRenderAttr("for", __props.id)} class="de-form-input-text-label">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "append-label", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_prime_password, mergeProps(_ctx.$attrs, {
        modelValue: unref(value),
        "onUpdate:modelValue": ($event) => isRef(value) ? value.value = $event : null,
        feedback: __props.feedback,
        "toggle-mask": __props.toggleMask,
        placeholder: __props.placeholder,
        "input-id": __props.id,
        "input-class": ["de-form-input-text", __props.inputClass, { "is-error": !!unref(errorMessage) || __props.isError }],
        pt: {
          root: {
            class: ["de-input-password"]
          },
          showicon: { class: ["de-form-input-password-icon"] },
          hideicon: { class: ["de-form-input-password-icon"] }
        },
        "input-props": validationListeners
      }, toHandlers(validationListeners)), null, _parent));
      if (unref(errorMessage)) {
        _push(`<div class="de-form-error">${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/form/form-password/DeFormPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=DeFormPassword-CxDsncEV.mjs.map
