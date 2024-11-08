import { y as defineEventHandler } from '../../../runtime.mjs';
import { f as fontEventHandler } from '../../../_/eventHandlers.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import 'vue';
import 'consola/core';
import 'node:url';
import 'lru-cache';
import 'devalue';
import '@unhead/ssr';
import 'unhead';

const font = defineEventHandler(fontEventHandler);

export { font as default };
//# sourceMappingURL=font.mjs.map
