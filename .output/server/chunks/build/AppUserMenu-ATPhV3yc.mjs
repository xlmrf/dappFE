import { defineComponent, computed, unref, useSSRContext } from 'vue';
import { ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { a as useI18n, c as useUserStore, o as _sfc_main$k, _ as _sfc_main$m } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { n as useLogin, w as _sfc_main$g } from './server.mjs';
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

const USER_MENU = [
  {
    label: "menu.user.profileSettings",
    to: "/settings",
    icon: "settings"
  },
  {
    label: "menu.user.accountSecurity",
    to: "/settings/account-security",
    icon: "shield-check"
  }
  // {
  //   label: 'menu.user.notifications',
  //   to: '/settings/notifications',
  //   icon: 'bell',
  // },
  // {
  //   label: 'menu.user.contribute',
  //   icon: 'menu-square',
  //   items: [
  //     {
  //       label: 'coins.dapp',
  //       to: '/dashboard/my-dapps',
  //     },
  //     {
  //       label: 'articles.title',
  //       to: '/dashboard/my-articles',
  //     },
  //     {
  //       label: 'news.title',
  //       to: '/dashboard/my-news',
  //     },
  //   ],
  // },
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppUserMenu",
  __ssrInlineRender: true,
  props: {
    headerClasses: {
      type: String,
      default: null
    },
    menuItemClasses: {
      type: String,
      default: null
    }
  },
  emits: ["navigate"],
  setup(__props) {
    const { t } = useI18n();
    const userStore = useUserStore();
    useLogin();
    const userName = computed(
      () => {
        var _a;
        return userStore.user.profile.name || userStore.user.username || ((_a = userStore.user.email) == null ? void 0 : _a.split("@")[0]);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="${ssrRenderClass([__props.headerClasses, "tw-flex tw-items-center tw-gap-3.5 tw-pb-3.5"])}">`);
      _push(ssrRenderComponent(_sfc_main$k, {
        src: unref(userStore).user.profile.photo
      }, null, _parent));
      _push(`<div><p class="heading-h5">${ssrInterpolate(unref(t)("common.hiX", { name: userName.value }))}</p>`);
      if (unref(userStore).user.email) {
        _push(`<p class="body-b1 tw-text-primary-300">${ssrInterpolate(unref(userStore).user.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><ul class="tw-flex tw-flex-col tw-gap-1.5 tw-pt-1.5 xl:tw-pt-3.5"><!--[-->`);
      ssrRenderList(unref(USER_MENU), (item) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_sfc_main$g, {
          item,
          "menu-item-class": __props.menuItemClasses,
          onNavigate: ($event) => _ctx.$emit("navigate")
        }, null, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--><li><button class="${ssrRenderClass([__props.menuItemClasses, "tw-flex tw-items-center tw-w-full tw-p-2 hover:tw-bg-primary-700 tw-cursor-pointer tw-text-left"])}">`);
      _push(ssrRenderComponent(_sfc_main$m, {
        name: "power-button",
        class: "tw-text-primary-400 tw-mr-2"
      }, null, _parent));
      _push(`<span class="heading-h4 xl:heading-h5">${ssrInterpolate(unref(t)("menu.user.logOut"))}</span></button></li></ul><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/menu/AppUserMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AppUserMenu-ATPhV3yc.mjs.map
