import { ag as defineNuxtRouteMiddleware, ah as storeToRefs, a5 as useAuthStore, ai as navigateTo } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import 'vue';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'consola/core';
import 'node:url';
import 'vue-router';
import 'vue/server-renderer';
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

const auth = defineNuxtRouteMiddleware((to) => {
  const { isLoggedIn } = storeToRefs(useAuthStore());
  if (isLoggedIn.value && (to == null ? void 0 : to.name) === "login") {
    return navigateTo("/");
  }
  if (!isLoggedIn.value && (to == null ? void 0 : to.name) !== "login") {
    return navigateTo("/?action=login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-CqhRMrnS.mjs.map
