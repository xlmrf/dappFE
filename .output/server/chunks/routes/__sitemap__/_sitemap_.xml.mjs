import { y as defineEventHandler, z as useSimpleSitemapRuntimeConfig, C as withoutLeadingSlash, D as withoutTrailingSlash, E as getRouterParam, h as createError, F as createSitemap } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'vue';
import 'consola/core';
import 'node:url';

const _sitemap__xml = defineEventHandler(async (e) => {
  const runtimeConfig = useSimpleSitemapRuntimeConfig(e);
  const { sitemaps } = runtimeConfig;
  const sitemapName = withoutLeadingSlash(withoutTrailingSlash((getRouterParam(e, "sitemap") || e.path)?.replace(".xml", "").replace(runtimeConfig.sitemapsPathPrefix, "")));
  const isChunking = typeof sitemaps.chunks !== "undefined" && !Number.isNaN(Number(sitemapName));
  if (!sitemapName || !(sitemapName in sitemaps) && !isChunking) {
    return createError({
      statusCode: 404,
      message: `Sitemap "${sitemapName}" not found.`
    });
  }
  return createSitemap(e, isChunking ? {
    ...sitemaps.chunks,
    sitemapName
  } : sitemaps[sitemapName], runtimeConfig);
});

export { _sitemap__xml as default };
//# sourceMappingURL=_sitemap_.xml.mjs.map
