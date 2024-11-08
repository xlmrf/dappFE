import { b as useAppStore, v as useNuxtApp, a6 as useToast, Y as useLazyAsyncData, w as _sfc_main$c, a1 as _sfc_main$l, aa as ButtonVariantOptions, a2 as ButtonSizeOptions, _ as _sfc_main$m, d as __nuxt_component_0$2, V as AuthTab } from './chunk-pg-(articles)-D5MrPPlE.mjs';
import { u as usePrimeVue, n as useLogin, o as useErrorHandling, p as ToastSeverities, A as AuthService } from './server.mjs';
import { useSSRContext, defineComponent, defineAsyncComponent, watch, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderSuspense, ssrInterpolate } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
import _sfc_main$4 from './MainHeader-DkgEjI3j.mjs';
import _sfc_main$5 from './MainFooter-CYqpUsTi.mjs';
import _sfc_main$6 from './AppDisclaimer-BmRg8DmM.mjs';
import script from './toast.esm-Q52pdMeM.mjs';

const en = {
  accept: "Yes",
  addRule: "Add Rule",
  am: "AM",
  apply: "Apply",
  cancel: "Cancel",
  choose: "Choose",
  chooseDate: "Choose Date",
  chooseMonth: "Choose Month",
  chooseYear: "Choose Year",
  clear: "Clear",
  completed: "Completed",
  contains: "Contains",
  custom: "Custom",
  dateAfter: "Date is after",
  dateBefore: "Date is before",
  dateFormat: "mm/dd/yy",
  dateIs: "Date is",
  dateIsNot: "Date is not",
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  dayNamesMin: [
    "Su",
    "Mo",
    "Tu",
    "We",
    "Th",
    "Fr",
    "Sa"
  ],
  dayNamesShort: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ],
  emptyFilterMessage: "No results found",
  emptyMessage: "No available options",
  emptySearchMessage: "No results found",
  emptySelectionMessage: "No selected item",
  endsWith: "Ends with",
  equals: "Equals",
  fileSizeTypes: [
    "B",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB"
  ],
  filter: "Filter",
  firstDayOfWeek: 0,
  gt: "Greater than",
  gte: "Greater than or equal to",
  lt: "Less than",
  lte: "Less than or equal to",
  matchAll: "Match All",
  matchAny: "Match Any",
  medium: "Medium",
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  nextDecade: "Next Decade",
  nextHour: "Next Hour",
  nextMinute: "Next Minute",
  nextMonth: "Next Month",
  nextSecond: "Next Second",
  nextYear: "Next Year",
  noFilter: "No Filter",
  notContains: "Not contains",
  notEquals: "Not equals",
  now: "Now",
  passwordPrompt: "Enter a password",
  pending: "Pending",
  pm: "PM",
  prevDecade: "Previous Decade",
  prevHour: "Previous Hour",
  prevMinute: "Previous Minute",
  prevMonth: "Previous Month",
  prevSecond: "Previous Second",
  prevYear: "Previous Year",
  reject: "No",
  removeRule: "Remove Rule",
  searchMessage: "{0} results are available",
  selectionMessage: "{0} items selected",
  showMonthAfterYear: false,
  startsWith: "Starts with",
  strong: "Strong",
  today: "Today",
  upload: "Upload",
  weak: "Weak",
  weekHeader: "Wk",
  aria: {
    cancelEdit: "Cancel Edit",
    close: "Close",
    collapseLabel: "Collapse",
    collapseRow: "Row Collapsed",
    editRow: "Edit Row",
    expandLabel: "Expand",
    expandRow: "Row Expanded",
    falseLabel: "False",
    filterConstraint: "Filter Constraint",
    filterOperator: "Filter Operator",
    firstPageLabel: "First Page",
    gridView: "Grid View",
    hideFilterMenu: "Hide Filter Menu",
    jumpToPageDropdownLabel: "Jump to Page Dropdown",
    jumpToPageInputLabel: "Jump to Page Input",
    lastPageLabel: "Last Page",
    listView: "List View",
    moveAllToSource: "Move All to Source",
    moveAllToTarget: "Move All to Target",
    moveBottom: "Move Bottom",
    moveDown: "Move Down",
    moveToSource: "Move to Source",
    moveToTarget: "Move to Target",
    moveTop: "Move Top",
    moveUp: "Move Up",
    navigation: "Navigation",
    next: "Next",
    nextPageLabel: "Next Page",
    nullLabel: "Not Selected",
    otpLabel: "Please enter one time password character {0}",
    pageLabel: "Page {page}",
    passwordHide: "Hide Password",
    passwordShow: "Show Password",
    previous: "Previous",
    previousPageLabel: "Previous Page",
    removeLabel: "Remove",
    rotateLeft: "Rotate Left",
    rotateRight: "Rotate Right",
    rowsPerPageLabel: "Rows per page",
    saveEdit: "Save Edit",
    scrollTop: "Scroll Top",
    selectAll: "All items selected",
    selectLabel: "Select",
    selectRow: "Row Selected",
    showFilterMenu: "Show Filter Menu",
    slide: "Slide",
    slideNumber: "{slideNumber}",
    star: "1 star",
    stars: "{star} stars",
    trueLabel: "True",
    unselectAll: "All items unselected",
    unselectLabel: "Unselect",
    unselectRow: "Row Unselected",
    zoomImage: "Zoom Image",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out"
  }
};
const enLocales = {
  en
};
const ru = {
  accept: "\u0414\u0430",
  addRule: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u043E",
  am: "\u0434\u043E \u043F\u043E\u043B\u0443\u0434\u043D\u044F",
  apply: "\u041F\u0440\u0438\u043D\u044F\u0442\u044C",
  cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
  choose: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
  chooseDate: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u0430\u0442\u0443",
  chooseMonth: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043C\u0435\u0441\u044F\u0446",
  chooseYear: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0433\u043E\u0434",
  clear: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C",
  completed: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E",
  contains: "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u0442",
  custom: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439",
  dateAfter: "\u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u043B\u0435",
  dateBefore: "\u0414\u0430\u0442\u0430 \u0434\u043E",
  dateFormat: "dd.mm.yy",
  dateIs: "\u0414\u0430\u0442\u0430 \u0440\u0430\u0432\u043D\u0430",
  dateIsNot: "\u0414\u0430\u0442\u0430 \u043D\u0435 \u0440\u0430\u0432\u043D\u0430",
  dayNames: [
    "\u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435",
    "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A",
    "\u0412\u0442\u043E\u0440\u043D\u0438\u043A",
    "\u0421\u0440\u0435\u0434\u0430",
    "\u0427\u0435\u0442\u0432\u0435\u0440\u0433",
    "\u041F\u044F\u0442\u043D\u0438\u0446\u0430",
    "\u0421\u0443\u0431\u0431\u043E\u0442\u0430"
  ],
  dayNamesMin: [
    "\u0412\u0441",
    "\u041F\u043D",
    "\u0412\u0442",
    "\u0421\u0440",
    "\u0427\u0442",
    "\u041F\u0442",
    "\u0421\u0431"
  ],
  dayNamesShort: [
    "\u0412\u0441\u043A",
    "\u041F\u043D\u0434",
    "\u0412\u0442\u0440",
    "\u0421\u0440\u0434",
    "\u0427\u0442\u0432",
    "\u041F\u0442\u043D",
    "\u0421\u0431\u0442"
  ],
  emptyFilterMessage: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  emptyMessage: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
  emptySearchMessage: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  emptySelectionMessage: "\u041D\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
  endsWith: "\u0417\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F",
  equals: "\u0420\u0430\u0432\u043D\u043E",
  fileSizeTypes: [
    "\u0411",
    "\u041A\u0431",
    "\u041C\u0431",
    "\u0413\u0431",
    "\u0422\u0431",
    "\u041F\u0431",
    "\u042D\u0431",
    "\u0417\u0431",
    "\u0419\u0431"
  ],
  filter: "\u0424\u0438\u043B\u044C\u0442\u0440",
  firstDayOfWeek: 1,
  gt: "\u0411\u043E\u043B\u0435\u0435 \u0447\u0435\u043C",
  gte: "\u0411\u043E\u043B\u0435\u0435 \u0447\u0435\u043C \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E",
  lt: "\u041C\u0435\u043D\u044C\u0448\u0435 \u0447\u0435\u043C",
  lte: "\u041C\u0435\u043D\u044C\u0448\u0435 \u0447\u0435\u043C \u0438\u043B\u0438 \u0440\u0430\u0432\u043D\u043E",
  matchAll: "\u0421\u043E\u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u0441\u0435",
  matchAny: "\u0421\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u0435 \u0441 \u043B\u044E\u0431\u044B\u043C",
  medium: "\u041D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u044B\u0439",
  monthNames: [
    "\u042F\u043D\u0432\u0430\u0440\u044C",
    "\u0424\u0435\u0432\u0440\u0430\u043B\u044C",
    "\u041C\u0430\u0440\u0442",
    "\u0410\u043F\u0440\u0435\u043B\u044C",
    "\u041C\u0430\u0439",
    "\u0418\u044E\u043D\u044C",
    "\u0418\u044E\u043B\u044C",
    "\u0410\u0432\u0433\u0443\u0441\u0442",
    "\u0421\u0435\u043D\u0442\u044F\u0431\u0440\u044C",
    "\u041E\u043A\u0442\u044F\u0431\u0440\u044C",
    "\u041D\u043E\u044F\u0431\u0440\u044C",
    "\u0414\u0435\u043A\u0430\u0431\u0440\u044C"
  ],
  monthNamesShort: [
    "\u042F\u043D\u0432",
    "\u0424\u0435\u0432",
    "\u041C\u0430\u0440",
    "\u0410\u043F\u0440",
    "\u041C\u0430\u0439",
    "\u0418\u044E\u043D",
    "\u0418\u044E\u043B",
    "\u0410\u0432\u0433",
    "\u0421\u0435\u043D",
    "\u041E\u043A\u0442",
    "\u041D\u043E\u044F",
    "\u0414\u0435\u043A"
  ],
  nextDecade: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0434\u0435\u0441\u044F\u0442\u0438\u043B\u0435\u0442\u0438\u0435",
  nextHour: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0447\u0430\u0441",
  nextMinute: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u043C\u0438\u043D\u0443\u0442\u0430",
  nextMonth: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446",
  nextSecond: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0435\u043A\u0443\u043D\u0434\u0430",
  nextYear: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0433\u043E\u0434",
  noFilter: "\u041D\u0435\u0442 \u0444\u0438\u043B\u044C\u0442\u0440\u0430",
  notContains: "\u041D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442",
  notEquals: "\u041D\u0435 \u0440\u0430\u0432\u043D\u043E",
  now: "\u0421\u0435\u0439\u0447\u0430\u0441",
  passwordPrompt: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C",
  pending: "\u0412 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0438",
  pm: "\u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u043B\u0443\u0434\u043D\u044F",
  prevDecade: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0435 \u0434\u0435\u0441\u044F\u0442\u0438\u043B\u0435\u0442\u0438\u0435",
  prevHour: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u0447\u0430\u0441",
  prevMinute: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u043C\u0438\u043D\u0443\u0442\u0430",
  prevMonth: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446",
  prevSecond: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0441\u0435\u043A\u0443\u043D\u0434\u0430",
  prevYear: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u0433\u043E\u0434",
  reject: "\u041D\u0435\u0442",
  removeRule: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u043E",
  searchMessage: "{0} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E",
  selectionMessage: "{0} \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432 \u0432\u044B\u0431\u0440\u0430\u043D\u043E",
  showMonthAfterYear: false,
  startsWith: "\u041D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441",
  strong: "\u0425\u043E\u0440\u043E\u0448\u0438\u0439",
  today: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F",
  upload: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C",
  weak: "\u041F\u0440\u043E\u0441\u0442\u043E\u0439",
  weekHeader: "\u041D\u0435\u0434.",
  aria: {
    cancelEdit: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u043A\u0443",
    close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
    collapseLabel: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
    collapseRow: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443",
    editRow: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443",
    expandLabel: "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
    expandRow: "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443",
    falseLabel: "\u041D\u0435\u0432\u0435\u0440\u043D\u043E",
    filterConstraint: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435 \u0444\u0438\u043B\u044C\u0442\u0440\u0430",
    filterOperator: "\u041E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u0444\u0438\u043B\u044C\u0442\u0440\u0430",
    firstPageLabel: "\u041F\u0435\u0440\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
    gridView: "\u0412 \u0432\u0438\u0434\u0435 \u0441\u0435\u0442\u043A\u0438",
    hideFilterMenu: "\u0421\u043A\u0440\u044B\u0442\u044C \u043C\u0435\u043D\u044E \u0444\u0438\u043B\u044C\u0442\u0440\u0430",
    jumpToPageDropdownLabel: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u044E\u0449\u0435\u043C\u0443\u0441\u044F \u0441\u043F\u0438\u0441\u043A\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446",
    jumpToPageInputLabel: "\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0432\u0432\u043E\u0434\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
    lastPageLabel: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
    listView: "\u0412 \u0432\u0438\u0434\u0435 \u0441\u043F\u0438\u0441\u043A\u0430",
    moveAllToSource: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0441\u0451 \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A",
    moveAllToTarget: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0441\u0451 \u0432 \u043F\u0440\u0438\u0451\u043C\u043D\u0438\u043A",
    moveBottom: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432 \u043A\u043E\u043D\u0435\u0446",
    moveDown: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u043D\u0438\u0437",
    moveTop: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432 \u043D\u0430\u0447\u0430\u043B\u043E",
    moveToSource: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A",
    moveToTarget: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432 \u043F\u0440\u0438\u0451\u043C\u043D\u0438\u043A",
    moveUp: "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0432\u0435\u0440\u0445",
    navigation: "\u041D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F",
    next: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439",
    nextPageLabel: "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
    nullLabel: "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D",
    otpLabel: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0438\u043C\u0432\u043E\u043B \u043E\u0434\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u043E\u0433\u043E \u043F\u0430\u0440\u043E\u043B\u044F {0}",
    pageLabel: "{page}",
    passwordHide: "\u0421\u043A\u0440\u044B\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",
    passwordShow: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C",
    previous: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439",
    previousPageLabel: "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
    removeLabel: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
    rotateLeft: "\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u043B\u0435\u0432\u043E",
    rotateRight: "\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u043F\u0440\u0430\u0432\u043E",
    rowsPerPageLabel: "\u0421\u0442\u0440\u043E\u043A \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435",
    saveEdit: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043F\u0440\u0430\u0432\u043A\u0443",
    scrollTop: "\u041F\u0440\u043E\u043A\u0440\u0443\u0442\u0438\u0442\u044C \u0432 \u043D\u0430\u0447\u0430\u043B\u043E",
    selectAll: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435 \u0441\u0442\u0440\u043E\u043A\u0438",
    selectLabel: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C",
    selectRow: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0443",
    showFilterMenu: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043C\u0435\u043D\u044E \u0444\u0438\u043B\u044C\u0442\u0440\u0430",
    slide: "\u0421\u043B\u0430\u0439\u0434",
    slideNumber: "{slideNumber}",
    star: "1 \u0437\u0432\u0435\u0437\u0434\u0430",
    stars: "{star} \u0437\u0432\u0451\u0437\u0434",
    trueLabel: "\u0412\u0435\u0440\u043D\u043E",
    unselectAll: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0432\u0441\u0435\u0445 \u0441\u0442\u0440\u043E\u043A",
    unselectLabel: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440",
    unselectRow: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0441\u0442\u0440\u043E\u043A\u0438",
    zoomImage: "\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435",
    zoomIn: "\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C",
    zoomOut: "\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C"
  }
};
const ruLocales = {
  ru
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AuthFlow",
  __ssrInlineRender: true,
  setup(__props) {
    const AuthDialog = defineAsyncComponent(() => import('./AuthDialog-CE6cBa-b.mjs'));
    const WalletInactiveWalletDialog = defineAsyncComponent(
      () => import('./WalletInactiveWalletDialog-44XkAdo5.mjs')
    );
    const WalletBoundSuccessfully = defineAsyncComponent(
      () => import('./WalletBoundSuccessfully-BrFw01ff.mjs')
    );
    const ChangePasswordDialog = defineAsyncComponent(
      () => import('./ChangePasswordDialog-Z5K9-Zgj.mjs')
    );
    const UserCompleteProfile = defineAsyncComponent(
      () => import('./UserCompleteProfile-D4ge_IjV.mjs')
    );
    const EmailReceivedDialog = defineAsyncComponent(
      () => import('./EmailReceivedDialog-kqvK-Xje.mjs')
    );
    const PasswordSavedDialog = defineAsyncComponent(
      () => import('./PasswordSavedDialog-Cnlf8C4K.mjs')
    );
    const store = useAppStore();
    const closeAuthDialog = () => {
      if (store.authDialog.isVisible)
        store.toggleAuthDialog(void 0, false);
    };
    const isInactiveWalletDialogVisible = ref(false);
    const onInactiveWallet = () => {
      closeAuthDialog();
      isInactiveWalletDialogVisible.value = true;
    };
    const isWalletBoundSuccessfullyDialogVisible = ref(false);
    const boundWalletAddress = ref();
    const userEmail = ref();
    const onWalletBound = (walletAddress, email) => {
      boundWalletAddress.value = walletAddress;
      userEmail.value = email;
      closeAuthDialog();
      isWalletBoundSuccessfullyDialogVisible.value = true;
    };
    const isEmailReceivedDialogVisible = ref(false);
    const confirmEmail = ref("");
    const isEmailConfirmForFormerUsersRequired = ref(false);
    const onForgotPassword = (email) => {
      confirmEmail.value = email;
      isEmailReceivedDialogVisible.value = true;
      closeAuthDialog();
    };
    function onBackClick() {
      store.toggleAuthDialog(AuthTab.login, true);
      isEmailReceivedDialogVisible.value = false;
    }
    function onEmailConfirmForFormerUsersRequired(email) {
      isEmailConfirmForFormerUsersRequired.value = true;
      isEmailReceivedDialogVisible.value = true;
      confirmEmail.value = email;
    }
    const isChangePasswordFormVisible = ref(false);
    const route = useRoute();
    const isPasswordSavedVisible = ref(false);
    const onPasswordSaved = () => {
      isPasswordSavedVisible.value = true;
    };
    const isUserCompleteProfileShown = ref(false);
    const onVerificationSuccess = () => {
      isUserCompleteProfileShown.value = true;
    };
    const passwordSaveddialogTitle = ref();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(store).authDialog.isVisible) {
        _push(ssrRenderComponent(unref(AuthDialog), {
          visible: unref(store).authDialog.isVisible,
          "onUpdate:visible": ($event) => unref(store).authDialog.isVisible = $event,
          onInactiveWallet,
          onWalletBound,
          onForgotPassword,
          onVerificationSuccess,
          onEmailConfirmRequired: onEmailConfirmForFormerUsersRequired
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isInactiveWalletDialogVisible.value) {
        _push(ssrRenderComponent(unref(WalletInactiveWalletDialog), {
          visible: isInactiveWalletDialogVisible.value,
          "onUpdate:visible": ($event) => isInactiveWalletDialogVisible.value = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (isWalletBoundSuccessfullyDialogVisible.value) {
        _push(ssrRenderComponent(unref(WalletBoundSuccessfully), {
          visible: isWalletBoundSuccessfullyDialogVisible.value,
          "onUpdate:visible": ($event) => isWalletBoundSuccessfullyDialogVisible.value = $event,
          address: boundWalletAddress.value,
          email: userEmail.value
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSuspense(_push, {
        fallback: () => {
          _push(ssrRenderComponent(_sfc_main$c, null, null, _parent));
        },
        default: () => {
          if (isEmailReceivedDialogVisible.value) {
            _push(ssrRenderComponent(unref(EmailReceivedDialog), {
              visible: isEmailReceivedDialogVisible.value,
              "onUpdate:visible": ($event) => isEmailReceivedDialogVisible.value = $event,
              "show-hint": isEmailConfirmForFormerUsersRequired.value,
              email: confirmEmail.value
            }, {
              submitButton: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_sfc_main$l, {
                    variant: unref(ButtonVariantOptions).confirm,
                    size: unref(ButtonSizeOptions).medium,
                    label: _ctx.$t("common.buttons.backToX", { field: "common.buttons.logIn" }),
                    class: "tw-w-full tw-mt-10",
                    onClick: onBackClick
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_sfc_main$l, {
                      variant: unref(ButtonVariantOptions).confirm,
                      size: unref(ButtonSizeOptions).medium,
                      label: _ctx.$t("common.buttons.backToX", { field: "common.buttons.logIn" }),
                      class: "tw-w-full tw-mt-10",
                      onClick: onBackClick
                    }, null, 8, ["variant", "size", "label"])
                  ];
                }
              }),
              _: 1
            }, _parent));
          } else {
            _push(`<!---->`);
          }
        },
        _: 1
      });
      if (isChangePasswordFormVisible.value && unref(route).query.hash) {
        _push(ssrRenderComponent(unref(ChangePasswordDialog), {
          visible: isChangePasswordFormVisible.value,
          "onUpdate:visible": ($event) => isChangePasswordFormVisible.value = $event,
          hash: unref(route).query.hash.toString(),
          onPasswordSaved
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      ssrRenderSuspense(_push, {
        fallback: () => {
          _push(ssrRenderComponent(_sfc_main$c, null, null, _parent));
        },
        default: () => {
          if (isPasswordSavedVisible.value) {
            _push(ssrRenderComponent(unref(PasswordSavedDialog), {
              visible: isPasswordSavedVisible.value,
              "onUpdate:visible": ($event) => isPasswordSavedVisible.value = $event,
              title: passwordSaveddialogTitle.value
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
        },
        _: 1
      });
      if (isUserCompleteProfileShown.value) {
        _push(ssrRenderComponent(unref(UserCompleteProfile), {
          visible: isUserCompleteProfileShown.value,
          "onUpdate:visible": ($event) => isUserCompleteProfileShown.value = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("features/auth/AuthFlow.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DeToast",
  __ssrInlineRender: true,
  props: {
    position: {
      type: String,
      default: "top-center"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_prime_toast = script;
      _push(ssrRenderComponent(_component_prime_toast, mergeProps(_ctx.$attrs, {
        position: "top-center",
        pt: {
          root: { class: ["de-toast", `de-toast-${__props.position}`] },
          container: ({ props }) => ({
            class: [
              {
                "de-toast-error": props.message.severity === unref(ToastSeverities).ERROR,
                "de-toast-success": props.message.severity === unref(ToastSeverities).SUCCESS,
                "de-toast-info": props.message.severity === unref(ToastSeverities).INFO
              }
            ]
          }),
          content: { class: ["de-toast-content"] },
          detail: { class: ["de-toast-body"] }
        }
      }, _attrs), {
        message: withCtx(({ message }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="de-toast-body tw-flex tw-items-center"${_scopeId}>`);
            if (message.iconName) {
              _push2(ssrRenderComponent(_sfc_main$m, {
                name: message.iconName,
                class: ["tw-w-350 tw-h-350 tw-mr-2.5", message.iconClass]
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span${_scopeId}>${ssrInterpolate(message.detail)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "de-toast-body tw-flex tw-items-center" }, [
                message.iconName ? (openBlock(), createBlock(_sfc_main$m, {
                  key: 0,
                  name: message.iconName,
                  class: ["tw-w-350 tw-h-350 tw-mr-2.5", message.iconClass]
                }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                createVNode("span", null, toDisplayString(message.detail), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/toast/DeToast.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ScrollUpButton",
  __ssrInlineRender: true,
  setup(__props) {
    const isScrollButtonVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      if (isScrollButtonVisible.value) {
        _push(`<button${ssrRenderAttrs(mergeProps({
          class: "tw-fixed tw-bottom-7.5 tw-right-7.5 tw-bg-primary-700 tw-rounded-full tw-w-[46px] tw-h-[46px]",
          "aria-label": "Scroll to top"
        }, _attrs))}>`);
        _push(ssrRenderComponent(_sfc_main$m, {
          name: "chevron-down",
          class: "tw--rotate-180"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/lib/scroll-up-button/ScrollUpButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CommonLayout",
  __ssrInlineRender: true,
  props: {
    footerClass: {},
    disclaimerClass: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const HeaderSubmitDialog = defineAsyncComponent(
      () => import('./HeaderSubmitDialog-_fF5nG7P.mjs')
    );
    const store = useAppStore();
    const primevue = usePrimeVue();
    function changePrimevueLocale() {
      switch (store.locale) {
        case "en":
          primevue.config.locale = { ...enLocales.en };
          return;
        case "ru":
          primevue.config.locale = { ...ruLocales.ru };
          return;
        default:
          primevue.config.locale = { ...enLocales.en };
      }
    }
    watch(() => store.locale, changePrimevueLocale, {
      immediate: true
    });
    const { $customFetch } = useNuxtApp();
    const authRepo = AuthService($customFetch);
    const { makeUserLoggedIn } = useLogin();
    useErrorHandling();
    useToast();
    const route = useRoute();
    const router = useRouter();
    const googleLoginError = ref(null);
    if (route.query.code) {
      const { data, error } = ([__temp, __restore] = withAsyncContext(() => useLazyAsyncData(
        () => authRepo.googleCallback(route.query),
        "$BRe9Comt6E"
      )), __temp = await __temp, __restore(), __temp);
      if (data.value) {
        [__temp, __restore] = withAsyncContext(() => makeUserLoggedIn(data.value.access_token)), await __temp, __restore();
      }
      if (error.value) {
        googleLoginError.value = error.value;
      }
      router.replace(route.path);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "tw-min-h-screen tw-flex tw-flex-col" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(`<main class="tw-flex tw-flex-col tw-flex-grow">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_sfc_main$5, { class: _ctx.footerClass }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$6, { class: _ctx.disclaimerClass }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      if (unref(store).submitDialog.isVisible) {
        _push(ssrRenderComponent(unref(HeaderSubmitDialog), {
          visible: unref(store).submitDialog.isVisible,
          "onUpdate:visible": ($event) => unref(store).submitDialog.isVisible = $event
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("shared/components/CommonLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=CommonLayout-CBP29FFy.mjs.map
