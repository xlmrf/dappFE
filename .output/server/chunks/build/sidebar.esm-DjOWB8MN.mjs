import { F as FocusTrap, l as script$3, s as script$4 } from './server.mjs';
import { B as BaseStyle, Z as ZIndexUtils, f as DomHandler, R as Ripple, i as script$a } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { resolveComponent, resolveDirective, openBlock, createBlock, withCtx, createElementBlock, mergeProps, createVNode, Transition, withDirectives, renderSlot, Fragment, createElementVNode, normalizeClass, toDisplayString, createCommentVNode, resolveDynamicComponent } from 'vue';
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
import 'vue/server-renderer';
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

var inlineStyles = {
  mask: function mask(_ref) {
    var position = _ref.position;
    return {
      position: "fixed",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      display: "flex",
      justifyContent: position === "left" ? "flex-start" : position === "right" ? "flex-end" : "center",
      alignItems: position === "top" ? "flex-start" : position === "bottom" ? "flex-end" : "center"
    };
  }
};
var classes = {
  mask: function mask2(_ref2) {
    var instance = _ref2.instance, props = _ref2.props;
    var positions = ["left", "right", "top", "bottom"];
    var pos = positions.find(function(item) {
      return item === props.position;
    });
    return ["p-sidebar-mask", {
      "p-component-overlay p-component-overlay-enter": props.modal,
      "p-sidebar-mask-scrollblocker": props.blockScroll,
      "p-sidebar-visible": instance.containerVisible,
      "p-sidebar-full": instance.fullScreen
    }, pos ? "p-sidebar-".concat(pos) : ""];
  },
  root: function root(_ref3) {
    var instance = _ref3.instance;
    return ["p-sidebar p-component", {
      "p-ripple-disabled": instance.$primevue.config.ripple === false,
      "p-sidebar-full": instance.fullScreen
    }];
  },
  header: "p-sidebar-header",
  title: "p-sidebar-header-content",
  closeButton: "p-sidebar-close p-sidebar-icon p-link",
  closeIcon: "p-sidebar-close-icon",
  content: "p-sidebar-content"
};
var SidebarStyle = BaseStyle.extend({
  name: "sidebar",
  classes,
  inlineStyles
});
var script$1 = {
  name: "BaseSidebar",
  "extends": script$a,
  props: {
    visible: {
      type: Boolean,
      "default": false
    },
    position: {
      type: String,
      "default": "left"
    },
    header: {
      type: null,
      "default": null
    },
    baseZIndex: {
      type: Number,
      "default": 0
    },
    autoZIndex: {
      type: Boolean,
      "default": true
    },
    dismissable: {
      type: Boolean,
      "default": true
    },
    showCloseIcon: {
      type: Boolean,
      "default": true
    },
    closeIcon: {
      type: String,
      "default": void 0
    },
    modal: {
      type: Boolean,
      "default": true
    },
    blockScroll: {
      type: Boolean,
      "default": false
    }
  },
  style: SidebarStyle,
  provide: function provide() {
    return {
      $parentInstance: this
    };
  },
  watch: {
    dismissable: function dismissable(newValue) {
      if (newValue) {
        this.bindOutsideClickListener();
      } else {
        this.unbindOutsideClickListener();
      }
    }
  }
};
var script = {
  name: "Sidebar",
  "extends": script$1,
  inheritAttrs: false,
  emits: ["update:visible", "show", "hide", "after-hide"],
  data: function data() {
    return {
      containerVisible: this.visible
    };
  },
  container: null,
  mask: null,
  content: null,
  headerContainer: null,
  closeButton: null,
  outsideClickListener: null,
  documentKeydownListener: null,
  updated: function updated() {
    if (this.visible) {
      this.containerVisible = this.visible;
    }
  },
  beforeUnmount: function beforeUnmount() {
    this.disableDocumentSettings();
    if (this.mask && this.autoZIndex) {
      ZIndexUtils.clear(this.mask);
    }
    this.container = null;
    this.mask = null;
  },
  methods: {
    hide: function hide() {
      this.$emit("update:visible", false);
    },
    onEnter: function onEnter() {
      this.$emit("show");
      this.focus();
      this.bindDocumentKeyDownListener();
      if (this.autoZIndex) {
        ZIndexUtils.set("modal", this.mask, this.baseZIndex || this.$primevue.config.zIndex.modal);
      }
    },
    onAfterEnter: function onAfterEnter() {
      this.enableDocumentSettings();
    },
    onBeforeLeave: function onBeforeLeave() {
      if (this.modal) {
        !this.isUnstyled && DomHandler.addClass(this.mask, "p-component-overlay-leave");
      }
    },
    onLeave: function onLeave() {
      this.$emit("hide");
    },
    onAfterLeave: function onAfterLeave() {
      if (this.autoZIndex) {
        ZIndexUtils.clear(this.mask);
      }
      this.unbindDocumentKeyDownListener();
      this.containerVisible = false;
      this.disableDocumentSettings();
      this.$emit("after-hide");
    },
    onMaskClick: function onMaskClick(event) {
      if (this.dismissable && this.modal && this.mask === event.target) {
        this.hide();
      }
    },
    focus: function focus() {
      var findFocusableElement = function findFocusableElement2(container) {
        return container && container.querySelector("[autofocus]");
      };
      var focusTarget = this.$slots.header && findFocusableElement(this.headerContainer);
      if (!focusTarget) {
        focusTarget = this.$slots["default"] && findFocusableElement(this.container);
        if (!focusTarget) {
          focusTarget = this.closeButton;
        }
      }
      focusTarget && DomHandler.focus(focusTarget);
    },
    enableDocumentSettings: function enableDocumentSettings() {
      if (this.dismissable && !this.modal) {
        this.bindOutsideClickListener();
      }
      if (this.blockScroll) {
        DomHandler.blockBodyScroll();
      }
    },
    disableDocumentSettings: function disableDocumentSettings() {
      this.unbindOutsideClickListener();
      if (this.blockScroll) {
        DomHandler.unblockBodyScroll();
      }
    },
    onKeydown: function onKeydown(event) {
      if (event.code === "Escape") {
        this.hide();
      }
    },
    containerRef: function containerRef(el) {
      this.container = el;
    },
    maskRef: function maskRef(el) {
      this.mask = el;
    },
    contentRef: function contentRef(el) {
      this.content = el;
    },
    headerContainerRef: function headerContainerRef(el) {
      this.headerContainer = el;
    },
    closeButtonRef: function closeButtonRef(el) {
      this.closeButton = el;
    },
    bindDocumentKeyDownListener: function bindDocumentKeyDownListener() {
      if (!this.documentKeydownListener) {
        this.documentKeydownListener = this.onKeydown;
        (void 0).addEventListener("keydown", this.documentKeydownListener);
      }
    },
    unbindDocumentKeyDownListener: function unbindDocumentKeyDownListener() {
      if (this.documentKeydownListener) {
        (void 0).removeEventListener("keydown", this.documentKeydownListener);
        this.documentKeydownListener = null;
      }
    },
    bindOutsideClickListener: function bindOutsideClickListener() {
      var _this = this;
      if (!this.outsideClickListener) {
        this.outsideClickListener = function(event) {
          if (_this.isOutsideClicked(event)) {
            _this.hide();
          }
        };
        (void 0).addEventListener("click", this.outsideClickListener);
      }
    },
    unbindOutsideClickListener: function unbindOutsideClickListener() {
      if (this.outsideClickListener) {
        (void 0).removeEventListener("click", this.outsideClickListener);
        this.outsideClickListener = null;
      }
    },
    isOutsideClicked: function isOutsideClicked(event) {
      return this.container && !this.container.contains(event.target);
    }
  },
  computed: {
    fullScreen: function fullScreen() {
      return this.position === "full";
    },
    closeAriaLabel: function closeAriaLabel() {
      return this.$primevue.config.locale.aria ? this.$primevue.config.locale.aria.close : void 0;
    }
  },
  directives: {
    focustrap: FocusTrap,
    ripple: Ripple
  },
  components: {
    Portal: script$3,
    TimesIcon: script$4
  }
};
var _hoisted_1 = ["aria-modal"];
var _hoisted_2 = ["aria-label"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_Portal = resolveComponent("Portal");
  var _directive_ripple = resolveDirective("ripple");
  var _directive_focustrap = resolveDirective("focustrap");
  return openBlock(), createBlock(_component_Portal, null, {
    "default": withCtx(function() {
      return [$data.containerVisible ? (openBlock(), createElementBlock("div", mergeProps({
        key: 0,
        ref: $options.maskRef,
        onMousedown: _cache[1] || (_cache[1] = function() {
          return $options.onMaskClick && $options.onMaskClick.apply($options, arguments);
        }),
        "class": _ctx.cx("mask"),
        style: _ctx.sx("mask", true, {
          position: _ctx.position
        })
      }, _ctx.ptm("mask")), [createVNode(Transition, mergeProps({
        name: "p-sidebar",
        onEnter: $options.onEnter,
        onAfterEnter: $options.onAfterEnter,
        onBeforeLeave: $options.onBeforeLeave,
        onLeave: $options.onLeave,
        onAfterLeave: $options.onAfterLeave,
        appear: ""
      }, _ctx.ptm("transition")), {
        "default": withCtx(function() {
          return [_ctx.visible ? withDirectives((openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            ref: $options.containerRef,
            "class": _ctx.cx("root"),
            role: "complementary",
            "aria-modal": _ctx.modal
          }, _ctx.ptmi("root")), [_ctx.$slots.container ? renderSlot(_ctx.$slots, "container", {
            key: 0,
            onClose: $options.hide,
            closeCallback: $options.hide
          }) : (openBlock(), createElementBlock(Fragment, {
            key: 1
          }, [createElementVNode("div", mergeProps({
            ref: $options.headerContainerRef,
            "class": _ctx.cx("header")
          }, _ctx.ptm("header")), [renderSlot(_ctx.$slots, "header", {
            "class": normalizeClass(_ctx.cx("title"))
          }, function() {
            return [_ctx.header ? (openBlock(), createElementBlock("div", mergeProps({
              key: 0,
              "class": _ctx.cx("title")
            }, _ctx.ptm("title")), toDisplayString(_ctx.header), 17)) : createCommentVNode("", true)];
          }), _ctx.showCloseIcon ? withDirectives((openBlock(), createElementBlock("button", mergeProps({
            key: 0,
            ref: $options.closeButtonRef,
            type: "button",
            "class": _ctx.cx("closeButton"),
            "aria-label": $options.closeAriaLabel,
            onClick: _cache[0] || (_cache[0] = function() {
              return $options.hide && $options.hide.apply($options, arguments);
            })
          }, _ctx.ptm("closeButton"), {
            "data-pc-group-section": "iconcontainer"
          }), [renderSlot(_ctx.$slots, "closeicon", {
            "class": normalizeClass(_ctx.cx("closeIcon"))
          }, function() {
            return [(openBlock(), createBlock(resolveDynamicComponent(_ctx.closeIcon ? "span" : "TimesIcon"), mergeProps({
              "class": [_ctx.cx("closeIcon"), _ctx.closeIcon]
            }, _ctx.ptm("closeIcon")), null, 16, ["class"]))];
          })], 16, _hoisted_2)), [[_directive_ripple]]) : createCommentVNode("", true)], 16), createElementVNode("div", mergeProps({
            ref: $options.contentRef,
            "class": _ctx.cx("content")
          }, _ctx.ptm("content")), [renderSlot(_ctx.$slots, "default")], 16)], 64))], 16, _hoisted_1)), [[_directive_focustrap]]) : createCommentVNode("", true)];
        }),
        _: 3
      }, 16, ["onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])], 16)) : createCommentVNode("", true)];
    }),
    _: 3
  });
}
script.render = render;

export { script as default };
//# sourceMappingURL=sidebar.esm-DjOWB8MN.mjs.map
